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
      // Cách 1: Tìm session_token
      const cookieArray = document.cookie.split(';');
      
      for (let cookie of cookieArray) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'session_token' && value) {
          const decoded = decodeURIComponent(value);
          return decoded;
        }
      }
      
      return null;
    } catch (error) {
      console.error('[FlashcardService] Error retrieving token:', error);
      return null;
    }
  },

  // 1. Lấy dữ liệu từ Server
  getDecks: async (): Promise<Deck[]> => {
    try {
      const token = FlashcardService.getToken();
      
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`/api/flashcards/decks`, { 
        headers,
        cache: 'no-store' 
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('[FlashcardService.getDecks] Error:', res.status, errorText);
        return [];
      }
      const data = await res.json();
      return data.decks || [];
    } catch (error) {
      console.error("[FlashcardService.getDecks] Exception:", error);
      return [];
    }
  },

  // --- CÁC HÀM CRUD ---

  createDeck: async (title: string, description?: string): Promise<Deck> => {
    try {
      const token = FlashcardService.getToken();
      
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      
      const res = await fetch('/api/flashcards/decks', {
        method: 'POST',
        headers,
        body: JSON.stringify({ title, description }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        console.error('[FlashcardService.createDeck] API error:', res.status, data);
        throw new Error(data.error || data.details || `Lỗi tạo deck (${res.status})`);
      }
      
      return data;
    } catch (error: any) {
      console.error('[FlashcardService.createDeck] Error:', error);
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
      console.error("Error adding card:", error);
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
      console.error("Error updating card:", error);
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
      console.error("Error deleting card:", error);
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
      console.error("Error deleting deck:", error);
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
      console.error("Error updating deck:", error);
      throw error;
    }
  },
};