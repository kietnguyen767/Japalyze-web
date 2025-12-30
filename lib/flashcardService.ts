// lib/flashcardService.ts

// Định nghĩa Types (Match Prisma schema)
export type Card = {
  id: string;
  front: string;
  back: string;
  example?: string | null;
  isLearned: boolean;
  createdAt?: Date;
};

export type Deck = {
  id: string;
  title: string;
  description?: string | null;
  cards: Card[];
  createdAt?: Date;
};

// SERVICE GỌI API SERVER (Dùng Prisma API)
export const FlashcardService = {
  // Helper: Lấy token từ cookie (cải tiến)
  getToken: (): string | null => {
    if (typeof document === 'undefined') return null;
    
    try {
      console.log('🔍 [FlashcardService] getToken() - Đang tìm token từ cookie');
      console.log('🔍 [FlashcardService] document.cookie:', document.cookie || '(empty)');
      
      // Cách 1: Tìm session_token
      const cookieArray = document.cookie.split(';');
      console.log('🔍 [FlashcardService] cookieArray.length:', cookieArray.length);
      
      for (let cookie of cookieArray) {
        const [name, value] = cookie.trim().split('=');
        console.log(`🔍 [FlashcardService] Cookie: name='${name}', hasValue=${!!value}`);
        if (name === 'session_token' && value) {
          const decoded = decodeURIComponent(value);
          console.log('✅ [FlashcardService] Tìm thấy token:', decoded.substring(0, 20) + '...');
          return decoded;
        }
      }
      
      console.warn('⚠️ [FlashcardService] Không tìm thấy session_token trong cookie');
      return null;
    } catch (error) {
      console.error('❌ [FlashcardService] Lỗi lấy token:', error);
      return null;
    }
  },

  // 1. Lấy dữ liệu từ Server
  getDecks: async (): Promise<Deck[]> => {
    try {
      const token = FlashcardService.getToken();
      console.log('🔑 [FlashcardService.getDecks] token:', token ? token.substring(0, 20) + '...' : 'NULL');
      
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('🔑 [FlashcardService.getDecks] Gửi Authorization header: Bearer ' + token.substring(0, 20) + '...');
      } else {
        console.warn('⚠️ [FlashcardService.getDecks] ⚠️ KHÔNG CÓ TOKEN - Gửi request mà không Authorization');
      }

      console.log('📤 [FlashcardService.getDecks] GET /api/flashcards/decks');
      console.log('📤 [FlashcardService.getDecks] Headers:', {
        'Content-Type': headers['Content-Type'],
        'Authorization': headers['Authorization'] ? headers['Authorization'].substring(0, 30) + '...' : 'NONE'
      });
      
      const res = await fetch(`/api/flashcards/decks`, { 
        headers,
        cache: 'no-store' 
      });
      
      console.log('📥 [FlashcardService.getDecks] Response status:', res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('❌ [FlashcardService.getDecks] Lỗi:', res.status, errorText);
        return [];
      }
      const data = await res.json();
      console.log('✅ [FlashcardService.getDecks] Lấy thành công:', data.decks?.length || 0, 'decks');
      return data.decks || [];
    } catch (error) {
      console.error("❌ [FlashcardService.getDecks] Exception:", error);
      return [];
    }
  },

  // --- CÁC HÀM CRUD ---

  createDeck: async (title: string, description?: string): Promise<Deck> => {
    try {
      console.log('🎴 Tạo deck:', { title, description });
      
      const token = FlashcardService.getToken();
      console.log('🔑 Token:', token ? 'có' : 'không');
      
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      
      const res = await fetch('/api/flashcards/decks', {
        method: 'POST',
        headers,
        body: JSON.stringify({ title, description }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        console.error('❌ API lỗi:', res.status, data);
        throw new Error(data.error || data.details || `Lỗi tạo deck (${res.status})`);
      }
      
      console.log('✅ Deck tạo thành công:', data.id);
      return data;
    } catch (error: any) {
      console.error('❌ Lỗi createDeck:', error);
      throw error;
    }
  },

  addCardToDeck: async (deckId: string, card: Omit<Card, 'id' | 'isLearned' | 'createdAt'>): Promise<Card> => {
    try {
      const token = FlashcardService.getToken();
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/flashcards/cards`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ deckId, ...card }),
      });
      if (!res.ok) throw new Error('Lỗi thêm thẻ');
      return await res.json();
    } catch (error) {
      console.error("Lỗi thêm thẻ:", error);
      throw error;
    }
  },

  updateCard: async (cardId: string, updates: Partial<Card>): Promise<Card> => {
    try {
      const token = FlashcardService.getToken();
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/flashcards/cards/${cardId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Lỗi cập nhật thẻ');
      return await res.json();
    } catch (error) {
      console.error("Lỗi cập nhật thẻ:", error);
      throw error;
    }
  },

  deleteCard: async (cardId: string): Promise<void> => {
    try {
      const token = FlashcardService.getToken();
      const headers: HeadersInit = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/flashcards/cards/${cardId}`, {
        method: 'DELETE',
        headers,
      });
      if (!res.ok) throw new Error('Lỗi xóa thẻ');
    } catch (error) {
      console.error("Lỗi xóa thẻ:", error);
      throw error;
    }
  },

  deleteDeck: async (deckId: string): Promise<void> => {
    try {
      const token = FlashcardService.getToken();
      const headers: HeadersInit = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/flashcards/decks/${deckId}`, {
        method: 'DELETE',
        headers,
      });
      if (!res.ok) throw new Error('Lỗi xóa deck');
    } catch (error) {
      console.error("Lỗi xóa deck:", error);
      throw error;
    }
  },

  renameDeck: async (deckId: string, title: string, description?: string): Promise<Deck> => {
    try {
      const token = FlashcardService.getToken();
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/flashcards/decks/${deckId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error('Lỗi cập nhật deck');
      return await res.json();
    } catch (error) {
      console.error("Lỗi cập nhật deck:", error);
      throw error;
    }
  },
};