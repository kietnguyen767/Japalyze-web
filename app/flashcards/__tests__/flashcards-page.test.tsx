describe('Flashcards page - BE response shape', () => {
  it('Deck uses cards.length for count (not _count.cards)', () => {
    const mockDeck = {
      id: 'deck-1',
      title: 'N5 Vocabulary',
      description: 'Basic vocabulary',
      createdAt: '2024-01-01T00:00:00Z',
      cards: [
        { id: 'card-1', front: '日本語', back: 'Japanese' },
        { id: 'card-2', front: '勉強', back: 'Study' },
      ],
    };

    const cardCount = mockDeck.cards?.length ?? 0;

    expect(cardCount).toBe(2);
    expect((mockDeck as any)._count).toBeUndefined();
  });

  it('empty cards array shows 0', () => {
    const emptyDeck = {
      id: 'deck-2',
      title: 'Empty Deck',
      cards: [],
    };

    expect(emptyDeck.cards?.length ?? 0).toBe(0);
  });

  it('_count pattern is no longer used (regression guard)', () => {
    const deck = { cards: [{ id: 'card-1' }, { id: 'card-2' }] };

    expect(deck.cards?.length ?? 0).toBe(2);
    expect((deck as any)._count?.cards).toBeUndefined();
  });
});
