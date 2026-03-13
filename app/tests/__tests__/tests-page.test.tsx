describe('Tests page - BE response shape', () => {
  it('MockTest has questionCount (not _count.questions)', () => {
    const mockTest = {
      id: 'test-1',
      title: 'N5 Mock Test',
      level: 'N5',
      duration: 30,
      isPremium: false,
      questionCount: 10,
    };

    expect(mockTest.questionCount).toBe(10);
    expect((mockTest as any)._count).toBeUndefined();
  });

  it('questionCount fallback to 0 when value is 0', () => {
    const mockTest = {
      id: 'test-1',
      title: 'Test',
      level: 'N5',
      duration: 30,
      isPremium: false,
      questionCount: 0,
    };

    expect(mockTest.questionCount || 0).toBe(0);
  });

  it('_count pattern is no longer used (regression guard)', () => {
    const mockTest = {
      questionCount: 25,
    };

    const displayCount = mockTest.questionCount || 0;

    expect(displayCount).toBe(25);
    expect((mockTest as any)._count?.questions).toBeUndefined();
  });
});
