// lib/flashcardService.ts

// Định nghĩa Types
export type Flashcard = {
  id: string;
  front: string;
  back: string;
  example?: string;
  learned?: boolean; // Đánh dấu đã thuộc
  createdAt: number;
};

export type Deck = {
  id: string;
  userId: string;
  name: string;
  cards: Flashcard[];
  createdAt: number;
};

// SERVICE GỌI API SERVER
export const FlashcardService = {
  // 1. Lấy dữ liệu từ Server
  getDecks: async (email: string): Promise<Deck[]> => {
    try {
      const res = await fetch(`/api/decks?email=${email}`, { cache: 'no-store' });
      if (!res.ok) return [];
      const data = await res.json();
      return data.decks || [];
    } catch (error) {
      console.error("Lỗi lấy decks:", error);
      return [];
    }
  },

  // 2. Hàm lưu dữ liệu lên Server (Helper nội bộ)
  saveDecks: async (email: string, newDecks: Deck[]) => {
    try {
      await fetch('/api/decks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, decks: newDecks }),
      });
    } catch (error) {
      console.error("Lỗi lưu decks:", error);
    }
  },

  // --- CÁC HÀM CRUD (Bây giờ đều là Async) ---

  createDeck: async (email: string, name: string): Promise<Deck[]> => {
    const decks = await FlashcardService.getDecks(email);
    const newDeck: Deck = {
      id: Date.now().toString(),
      userId: email,
      name,
      cards: [],
      createdAt: Date.now(),
    };
    const updatedDecks = [...decks, newDeck];
    await FlashcardService.saveDecks(email, updatedDecks);
    return updatedDecks;
  },

  deleteDeck: async (email: string, deckId: string): Promise<Deck[]> => {
    const decks = await FlashcardService.getDecks(email);
    const updatedDecks = decks.filter(d => d.id !== deckId);
    await FlashcardService.saveDecks(email, updatedDecks);
    return updatedDecks;
  },

  renameDeck: async (email: string, deckId: string, newName: string): Promise<Deck[]> => {
    const decks = await FlashcardService.getDecks(email);
    const updatedDecks = decks.map(d => 
      d.id === deckId ? { ...d, name: newName } : d
    );
    await FlashcardService.saveDecks(email, updatedDecks);
    return updatedDecks;
  },

  addCardToDeck: async (email: string, deckId: string, cardData: { front: string, back: string, example?: string }): Promise<Deck[]> => {
    const decks = await FlashcardService.getDecks(email);
    const updatedDecks = decks.map(d => {
      if (d.id === deckId) {
        return {
          ...d,
          cards: [...d.cards, { 
            id: Date.now().toString(), 
            front: cardData.front,
            back: cardData.back,
            example: cardData.example,
            learned: false,
            createdAt: Date.now() 
          }]
        };
      }
      return d;
    });
    await FlashcardService.saveDecks(email, updatedDecks);
    return updatedDecks;
  },

  deleteCard: async (email: string, deckId: string, cardId: string): Promise<Deck[]> => {
    const decks = await FlashcardService.getDecks(email);
    const updatedDecks = decks.map(d => {
      if (d.id === deckId) {
        return {
          ...d,
          cards: d.cards.filter(c => c.id !== cardId)
        };
      }
      return d;
    });
    await FlashcardService.saveDecks(email, updatedDecks);
    return updatedDecks;
  },

  markCardLearned: async (email: string, deckId: string, cardId: string): Promise<Deck[]> => {
    const decks = await FlashcardService.getDecks(email);
    const updatedDecks = decks.map(d => {
      if (d.id === deckId) {
        return {
          ...d,
          cards: d.cards.map(c => c.id === cardId ? { ...c, learned: true } : c)
        };
      }
      return d;
    });
    await FlashcardService.saveDecks(email, updatedDecks);
    return updatedDecks;
  }
};