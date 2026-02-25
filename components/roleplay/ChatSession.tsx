// components/roleplay/ChatSession.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Loader2,
  Mic,
  MicOff,
  Send,
  User,
  Volume2,
  Flag // Added Flag import
} from 'lucide-react';
import {
  Character,
  FeedbackData,
  Message,
  getGradingPrompt,
  getChatOnlyPrompt,
  getLogicOnlyPrompt,
  getTriggerMessage,
  getSystemInstruction,
  TOPICS
} from '@/app/roleplay/logic';
import FeedbackModal from './FeedbackModal';

type Props = {
  character: Character;
  topic: string;
  assignedMissions: string[];
  onBack: () => void;
};

const MAX_TURNS = 20;
const MAX_HISTORY = 8;

export default function ChatSession({ character, topic, assignedMissions, onBack }: Props) {
  /* =========================
   * STATE
   * ========================= */
  const [showConfirmEnd, setShowConfirmEnd] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false); // STT State

  // ✅ STATE: Khởi tạo missions ngay từ prop được truyền vào
  const [missions, setMissions] = useState<string[]>(assignedMissions);
  const [completedMissions, setCompletedMissions] = useState<boolean[]>([false, false, false]);

  const [showFeedback, setShowFeedback] = useState<FeedbackData | null>(null);
  const [turnCount, setTurnCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      initChat();
    }
    return () => { isMounted.current = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * =========================
   * HELPERS (DEFENSIVE)
   * =========================
   */
  const sanitizeMissions = (arr: any): string[] => {
    if (!Array.isArray(arr)) return [];
    return arr.slice(0, 3).map((m) => {
      if (typeof m === 'string') return m;
      if (typeof m === 'object' && m !== null) return m.content || m.text || m.mission || JSON.stringify(m);
      return String(m);
    });
  };

  const sanitizeCompletedIndices = (arr: any): number[] => {
    if (!Array.isArray(arr)) return [];
    const out: number[] = [];
    for (const raw of arr) {
      const n = Math.floor(Number(raw));
      if (!Number.isFinite(n)) continue;
      if (n < 0 || n > 2) continue;
      if (!out.includes(n)) out.push(n);
    }
    return out;
  };

  const normalizeFeedback = (fb: any): FeedbackData | null => {
    if (!fb || typeof fb !== 'object') return null;

    const score = Number.isFinite(Number(fb.score))
      ? Math.max(0, Math.min(100, Math.floor(Number(fb.score))))
      : 0;

    const good_points = typeof fb.good_points === 'string' ? fb.good_points : '';

    const mistakesRaw = Array.isArray(fb.mistakes) ? fb.mistakes : [];
    const mistakes = mistakesRaw
      .filter((x: any) => x && typeof x === 'object')
      .map((x: any) => ({
        original: typeof x.original === 'string' ? x.original : '',
        fixed: typeof x.fixed === 'string' ? x.fixed : '',
        reason: typeof x.reason === 'string' ? x.reason : ''
      }))
      .filter((x: any) => x.original || x.fixed || x.reason);

    const nextMissions = Array.isArray(fb.next_missions) ? fb.next_missions : [];
    const comment = typeof fb.comment === 'string' ? fb.comment : '';

    return { score, good_points, mistakes, next_missions: nextMissions, comment };
  };

  /**
   * =========================
   * INIT
   * =========================
   */
  const initChat = async () => {
    setIsLoading(true);
    setMessages([]);
    setInput('');
    setTurnCount(0);
    setShowFeedback(null);
    setCompletedMissions([false, false, false]);

    // Đảm bảo state missions đồng bộ với prop mới nhất
    setMissions(assignedMissions);

    const systemInstruction = getSystemInstruction(character, topic);

    // GỬI NHIỆM VỤ CHO AI: Để AI biết đường theo dõi
    const triggerMessage = getTriggerMessage(topic, assignedMissions);

    // ⛔ QUAN TRỌNG: Truyền false để CHẶN AI đánh dấu nhiệm vụ lúc chào
    // Dùng 'logic' key vì đây là bước setup
    await callAI(triggerMessage as any, systemInstruction, false, false, 'logic');
  };

  /**
   * =========================
   * CALL AI (STREAM + PARSE JSON)
   * =========================
   */
  // ✅ UPDATE: Thêm tham số isForceEnd để phân biệt tự hết lượt hay user bấm
  // ✅ UPDATE 2: Thêm tham số agentType để chọn Key phù hợp
  const callAI = async (
    history: any[],
    systemPrompt: string,
    isCheckMission = true,
    isForceEnd = false,
    agentType: 'chat' | 'logic' | 'grading' = 'chat',
    silent = false
  ) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, systemPrompt, agentType })
      });

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      const assistantId = Date.now().toString();
      if (!silent) {
        if (isMounted.current) {
          setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '...' }]);
        }
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;

        // Lấy phần lời thoại sau [DATA_END] hoặc trước [DATA_START]
        let displayText = '';
        const jsonMatch = fullText.match(/\[DATA_START\]([\s\S]*?)\[DATA_END\]/);
        if (jsonMatch) {
          const parts = fullText.split('[DATA_END]');
          if (parts.length > 1) {
            displayText = parts[1].trim();
          } else {
            displayText = '';
          }
        } else {
          displayText = fullText.split('[DATA_START]')[0];
        }

        if (!silent) {
          if (isMounted.current) {
            setMessages((prev) =>
              prev.map((msg) => (msg.id === assistantId ? { ...msg, content: displayText } : msg))
            );
          }
        }
      }

      if (!fullText.trim()) {
        if (!silent && isMounted.current) setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        return;
      }

      // --- PARSE JSON ---
      const jsonMatch = fullText.match(/\[DATA_START\]([\s\S]*?)\[DATA_END\]/);
      if (!jsonMatch || !jsonMatch[1]) return;

      let cleanJson = jsonMatch[1].trim();
      cleanJson = cleanJson.replace(/^```json /, '').replace(/^```/, '').replace(/```$/, '');
      const data = JSON.parse(cleanJson);

      // ✅ LOGIC CHẶN CẬP NHẬT NHIỆM VỤ
      // Chỉ cập nhật nếu isCheckMission = true (User đã chat)
      if (isCheckMission && Array.isArray(data.completed_indices)) {
        const indices = sanitizeCompletedIndices(data.completed_indices);
        if (indices.length) {
          setCompletedMissions((prev) => {
            const next = [...prev];
            // Chỉ đánh dấu true, không bao giờ đánh dấu ngược lại false
            indices.forEach((i) => (next[i] = true));
            return next;
          });
        }
      }

      // Updated: Chặn feedback sớm nếu chưa xong nhiệm vụ và chưa hết lượt
      if (data.feedback) {
        // Tính toán trạng thái nhiệm vụ dự kiến sau lượt này
        let projectedCompleted = [...completedMissions];
        if (isCheckMission && Array.isArray(data.completed_indices)) {
          const indices = sanitizeCompletedIndices(data.completed_indices);
          indices.forEach(i => projectedCompleted[i] = true);
        }
        const isAllDone = projectedCompleted.every(Boolean);

        // Chỉ hiện feedback nếu:
        // 1. User chủ động kết thúc (isForceEnd = true)
        // 2. Hoặc đã xong hết nhiệm vụ (isAllDone = true)
        if (isForceEnd || isAllDone) {
          const fb = normalizeFeedback(data.feedback);
          if (fb) setShowFeedback(fb);
        } else {
          console.warn("AI sent feedback prematurely. Ignoring because missions are pending.");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * =========================
   * SUBMIT
   * =========================
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || showFeedback) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const currentTurn = turnCount + 1;
    setTurnCount(currentTurn);
    const isOutOfTurns = currentTurn >= MAX_TURNS;

    const history = [...messages.filter((m) => m.content !== '...'), userMsg]
      .slice(-MAX_HISTORY)
      .map((m) => ({ role: m.role, content: m.content }));


    // ✅ Parallel Agents
    if (isOutOfTurns) {
      // Hết lượt → Grading agent chấm điểm theo thang S/A/B/C/D
      const gradingHistory = [
        ...history,
        { role: 'user', content: '[GRADING REQUEST] Roleplay đã kết thúc vì hết lượt. Hãy chấm điểm toàn bộ hội thoại theo định dạng yêu cầu.' }
      ];
      const gradingPrompt = getGradingPrompt(missions, completedMissions);
      await callAI(gradingHistory, gradingPrompt, true, true, 'grading', false);
    } else {
      // 1. Agent Logic (Check mission & language) - Silent
      const logicPrompt = getLogicOnlyPrompt(missions, input);
      callAI([userMsg], logicPrompt, true, false, 'logic', true); // Silent = true

      // 2. Agent Chat (Roleplay) - Visible
      // Dùng ChatOnlyPrompt để phản hồi nhanh, không JSON
      const chatPrompt = getChatOnlyPrompt(character, input);
      await callAI(history, chatPrompt, false, isOutOfTurns, 'chat', false); // Silent = false
    }
  };

  /**
   * =========================
   * NEXT LEVEL / RESTART
   * =========================
   */
  /**
   * =========================
   * NEXT LEVEL / RESTART
   * =========================
   */
  const handleNextLevel = () => {
    // 1. Get current topic from title
    const currentTopic = TOPICS.find(t => t.title === topic);
    if (!currentTopic) {
      onBack(); // Fallback
      return;
    }

    // 2. Pick 3 new random missions
    const allMissions = currentTopic.missionPool;
    const newMissions = [...allMissions].sort(() => 0.5 - Math.random()).slice(0, 3);

    // 3. Reset State for new round
    setMissions(newMissions);
    setCompletedMissions([false, false, false]);
    setTurnCount(0); // Reset turns
    setShowFeedback(null);
    setShowConfirmEnd(false);

    // 4. Inject System Message to History (Hidden from UI but visible to AI)
    const systemMsg: Message = {
      id: Date.now().toString(),
      role: 'system',
      content: `Create 3 new missions: ${newMissions.join(', ')}. Continue the roleplay naturally.`
    };

    // We add this to messages so it's included in history for next API call
    setMessages((prev) => [...prev, systemMsg]);
  };

  /**
   * =========================
   * SPEAK (TTS)
   * =========================
   */
  const handleSpeak = (text: string) => {
    const cleanText = text.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* =========================
   * AUTO FINISH (Client-side Fallback)
   * ========================= */
  useEffect(() => {
    // Nếu hoàn thành hết nhiệm vụ mà chưa có feedback -> Tự động kết thúc
    // Thêm delay nhỏ để tránh xung đột state
    if (completedMissions.every(Boolean) && !showFeedback && !isLoading && turnCount > 0) {
      const timer = setTimeout(() => {
        confirmForceFinish();
      }, 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedMissions, showFeedback, isLoading]);

  /* =========================
   * FORCE FINISH LOGIC
   * ========================= */
  const handleForceFinish = () => {
    setShowConfirmEnd(true);
  };

  const confirmForceFinish = async () => {
    setShowConfirmEnd(false);
    if (showFeedback) return;
    setIsLoading(true);

    const baseHistory = [
      ...messages.filter((m) => m.content !== '...').slice(-MAX_HISTORY),
    ].map((m) => ({ role: m.role, content: m.content }));

    // Thêm trigger cuối để AI hiểu phải xuất JSON chấm điểm
    const gradingHistory = [
      ...baseHistory,
      { role: 'user', content: '[GRADING REQUEST] Người dùng chủ động kết thúc. Hãy chấm điểm toàn bộ hội thoại theo định dạng yêu cầu, không trả lời bằng tiếng Nhật.' }
    ];

    // silent=true: không hiện '...' trong chat
    const gradingPrompt = getGradingPrompt(missions, completedMissions);
    await callAI(gradingHistory, gradingPrompt, true, true, 'grading', true);
  };

  /**
   * =========================
   * SPEECH TO TEXT (STT)
   * =========================
   */
  const handleMicClick = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    // Check browser support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Trình duyệt của bạn không hỗ trợ chức năng này (Hãy thử Chrome/Edge).");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ja-JP'; // Set language to Japanese
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + (prev ? ' ' : '') + transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const confirmEndDialog = showConfirmEnd && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-xs w-full flex flex-col items-center">
        <div className="text-lg font-bold mb-2 text-slate-800">Kết thúc & chấm điểm?</div>
        <div className="text-slate-600 text-sm mb-4 text-center">Bạn có chắc chắn muốn kết thúc đoạn hội thoại và nhận chấm điểm ngay bây giờ không?</div>
        <div className="flex gap-3 w-full">
          <button
            onClick={confirmForceFinish}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all"
          >
            Đồng ý
          </button>
          <button
            onClick={() => setShowConfirmEnd(false)}
            className="flex-1 py-2 bg-slate-200 text-slate-700 rounded-lg font-bold hover:bg-slate-300 transition-all"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );

  /* =========================
   * RENDER
   * ========================= */

  return (
    <>
      {confirmEndDialog}
      <div className="flex flex-col h-[calc(100vh-80px)] md:h-[600px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative z-10">
        {/* HEADER */}
        <div className="bg-white border-b border-slate-100 p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
              <ArrowLeft size={20} />
            </button>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${character.color}`}>
              {character.avatar}
            </div>
            <div>
              <h3 className="font-bold text-slate-800">{character.name}</h3>
              <p className="text-xs text-slate-500">
                Lượt: <span className={`${turnCount >= 15 ? 'text-red-500 font-bold' : 'text-blue-600'}`}>
                  {turnCount}/{MAX_TURNS}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* MISSIONS BAR (Hiển thị nhiệm vụ đã nhận từ prop) */}
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex gap-2 overflow-x-auto">
          {missions.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border whitespace-nowrap transition-all ${completedMissions[idx]
                ? 'bg-green-100 text-green-700 border-green-200'
                : 'bg-white text-slate-600 border-slate-200'
                }`}
            >
              {completedMissions[idx] ? (
                <CheckCircle2 size={14} />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300"></div>
              )}
              {m}
            </div>
          ))}
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.filter(m => m.role !== 'system').map((m) => (
            <div key={m.id} className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] gap-2 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div
                  className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs shadow-sm ${m.role === 'user' ? 'bg-blue-600' : 'bg-slate-400'
                    }`}
                >
                  {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className="flex flex-col gap-1">
                  <div
                    className={`p-3 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                      }`}
                  >
                    {m.content}
                  </div>
                  {m.role !== 'user' && m.content && (
                    <button
                      onClick={() => handleSpeak(String(m.content))}
                      className="self-start text-slate-400 hover:text-blue-600 ml-1"
                    >
                      <Volume2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-slate-400 text-sm ml-10">
              <Loader2 size={14} className="animate-spin" /> {character.name} đang nhập...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* FEEDBACK MODAL */}
        {showFeedback && (
          <FeedbackModal data={showFeedback} turnCount={turnCount} maxTurns={MAX_TURNS} onNext={handleNextLevel} />
        )}

        {/* INPUT + NÚT KẾT THÚC */}
        <div className="bg-white p-3 border-t border-slate-100 flex gap-2">
          {/* MIC BUTTON */}
          <button
            onClick={handleMicClick}
            className={`p-3 rounded-full transition-colors ${isListening
              ? 'bg-red-500 text-white animate-pulse shadow-lg ring-2 ring-red-300'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            title="Nói tiếng Nhật (Voice Input)"
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <form onSubmit={handleSubmit} className="relative flex items-end gap-2 flex-1">
            <input
              className="flex-1 bg-slate-100 border-0 rounded-xl py-3 pl-4 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn tiếng Nhật..."
              disabled={isLoading || !!showFeedback}
              autoFocus
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim() || !!showFeedback}
              className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all"
            >
              <Send size={20} />
            </button>
          </form>
          <button
            type="button"
            onClick={handleForceFinish}
            disabled={isLoading || !!showFeedback}
            className="ml-1 p-2 rounded-full bg-slate-100 hover:bg-red-100 text-red-500 transition-all"
            title="Kết thúc & chấm điểm"
          >
            <Flag size={18} />
          </button>
        </div>
      </div>
    </>
  );
}