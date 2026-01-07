'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2, ArrowLeft, User, Bot, Loader2, CheckCircle2 } from 'lucide-react';
import { Character, FeedbackData, Message } from '@/app/roleplay/types';
import { getSystemInstruction, getTriggerMessage, getRemindPrompt } from '@/app/roleplay/utils';
import FeedbackModal from './FeedbackModal';

type Props = {
  character: Character;
  topic: string;
  onBack: () => void;
};

export default function ChatSession({ character, topic, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [missions, setMissions] = useState<string[]>([]);
  const [completedMissions, setCompletedMissions] = useState<boolean[]>([false, false, false]);

  const [showFeedback, setShowFeedback] = useState<FeedbackData | null>(null);
  const [turnCount, setTurnCount] = useState(0);
  const MAX_TURNS = 20;

  useEffect(() => {
    initChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * =========================
   * HELPERS (DEFENSIVE)
   * =========================
   */

  // Missions: luôn ép về string để tránh object
  const sanitizeMissions = (arr: any): string[] => {
    if (!Array.isArray(arr)) return [];
    return arr.slice(0, 3).map((m) => {
      if (typeof m === 'string') return m;
      if (typeof m === 'object' && m !== null) return m.content || m.text || m.mission || JSON.stringify(m);
      return String(m);
    });
  };

  // completed_indices: ép number + floor + clamp 0..2 + unique
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

  // feedback: fill default để FeedbackModal không crash
  const normalizeFeedback = (fb: any): FeedbackData | null => {
    if (!fb || typeof fb !== 'object') return null;

    const score = Number.isFinite(Number(fb.score)) ? Math.max(0, Math.min(100, Math.floor(Number(fb.score)))) : 0;
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

    const nextMissions = sanitizeMissions(fb.next_missions);
    // Nếu thiếu next_missions, vẫn trả mảng 3 phần tử để UI ổn định
    const next_missions = nextMissions.length === 3 ? nextMissions : ['', '', ''];

    return { score, good_points, mistakes, next_missions } as FeedbackData;
  };

  /**
   * =========================
   * INIT
   * =========================
   */
  const initChat = async () => {
    setIsLoading(true);

    // ✅ Reset toàn bộ state để tránh dính vòng cũ
    setMessages([]);
    setInput('');
    setMissions([]);
    setCompletedMissions([false, false, false]);
    setShowFeedback(null);
    setTurnCount(0);

    const systemInstruction = getSystemInstruction(character, topic);
    const triggerMessage = getTriggerMessage(topic);

    await callAI(triggerMessage as any, systemInstruction);
  };

  /**
   * =========================
   * CALL AI (STREAM + PARSE JSON)
   * =========================
   */
  const callAI = async (history: any[], systemPrompt: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, systemPrompt })
      });

      if (!response.body) return;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      const assistantId = Date.now().toString();
      setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '...' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;

        const [displayText] = fullText.split('[DATA_START]');
        setMessages((prev) => prev.map((msg) => (msg.id === assistantId ? { ...msg, content: displayText } : msg)));
      }

      // --- PARSE JSON ---
      const jsonMatch = fullText.match(/\[DATA_START\]([\s\S]*?)\[DATA_END\]/);
      if (!jsonMatch || !jsonMatch[1]) return;

      try {
        let cleanJson = jsonMatch[1].trim();
        cleanJson = cleanJson.replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '');
        const data = JSON.parse(cleanJson);

        // missions
        if (data.missions && Array.isArray(data.missions)) {
          const sanitized = sanitizeMissions(data.missions);
          if (sanitized.length) setMissions(sanitized);
        }

        // completed_indices (cộng dồn)
        if (data.completed_indices && Array.isArray(data.completed_indices)) {
          const indices = sanitizeCompletedIndices(data.completed_indices);
          if (indices.length) {
            setCompletedMissions((prev) => {
              const next = [...prev];
              indices.forEach((i) => (next[i] = true));
              return next;
            });
          }
        }

        // feedback
        if (data.feedback) {
          const fb = normalizeFeedback(data.feedback);
          if (fb) setShowFeedback(fb);
        }
      } catch (e) {
        console.error('JSON Parse Error', e);
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
    if (!input.trim() || isLoading || !!showFeedback) return;

    const userMsg = { id: Date.now().toString(), role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const currentTurn = turnCount + 1;
    setTurnCount(currentTurn);
    const isOutOfTurns = currentTurn >= MAX_TURNS;

    const history = [...messages.filter((m) => m.content !== '...'), userMsg].map((m) => ({
      role: m.role,
      content: m.content
    }));

    const remindPrompt = getRemindPrompt(character, input, isOutOfTurns, missions, completedMissions);

    await callAI(history, remindPrompt);
  };

  /**
   * =========================
   * NEXT LEVEL
   * =========================
   */
  const handleNextLevel = () => {
    if (!showFeedback) return;

    // Sanitize next missions
    const nextMissionsSanitized = sanitizeMissions((showFeedback as any).next_missions);

    setMissions(nextMissionsSanitized);
    setCompletedMissions([false, false, false]);
    setShowFeedback(null);
    setTurnCount(0);

    // Optional: thông báo vòng mới (giữ nguyên tiếng Việt như code cũ của bạn)
    const nextMsg = {
      id: Date.now().toString(),
      role: 'assistant' as const,
      content: `(Bắt đầu vòng mới) Nhiệm vụ tiếp theo: ${nextMissionsSanitized.join(', ')}. Cùng cố gắng nhé!`
    };
    setMessages((prev) => [...prev, nextMsg]);
  };

  /**
   * =========================
   * SPEAK (TTS)
   * =========================
   */
  const handleSpeak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
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
              Lượt:{' '}
              <span className={`${turnCount >= 15 ? 'text-red-500 font-bold' : 'text-blue-600'}`}>
                {turnCount}/{MAX_TURNS}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* MISSIONS BAR */}
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex gap-2 overflow-x-auto">
        {missions.length === 0 ? (
          <span className="text-xs text-slate-400 italic">Đang tải nhiệm vụ...</span>
        ) : (
          missions.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border whitespace-nowrap transition-all ${
                completedMissions[idx]
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
          ))
        )}
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((m) => (
          <div key={m.id} className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] gap-2 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div
                className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs shadow-sm ${
                  m.role === 'user' ? 'bg-blue-600' : 'bg-slate-400'
                }`}
              >
                {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className="flex flex-col gap-1">
                <div
                  className={`p-3 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                  }`}
                >
                  {typeof m.content === 'string' ? m.content : JSON.stringify(m.content)}
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

      {/* INPUT */}
      <div className="bg-white p-3 border-t border-slate-100">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
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
      </div>
    </div>
  );
}
