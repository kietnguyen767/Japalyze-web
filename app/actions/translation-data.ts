'use server'

// getTranslationHistory: calls backend dashboard endpoint and extracts translation history
export async function getTranslationHistory(userId: string) {
  if (!userId) return { success: false, data: [] };

  try {
    const res = await fetch('http://localhost:5062/api/user/dashboard', {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return { success: false, data: [] };
    const json = await res.json();
    // Dashboard returns { history: { translation: [...] } }
    const history = json?.history?.translation ?? [];
    return { success: true, data: history };
  } catch {
    return { success: false, data: [] };
  }
}

// getDashboardVocabulary: calls backend random-vocabulary endpoint
export async function getDashboardVocabulary() {
  try {
    const res = await fetch('http://localhost:5062/api/dictionary/random-vocabulary', {
      cache: 'no-store',
    });
    if (!res.ok) return { success: false, data: null };
    const json = await res.json();
    if (!json?.success) return { success: false, data: null };
    // Backend returns { success: true, data: { Nouns, Verbs, Adjs, Others } } (PascalCase from C# records)
    // Map to camelCase to match frontend expectations
    const d = json.data;
    return {
      success: true,
      data: {
        nouns: d.nouns ?? d.Nouns ?? [],
        verbs: d.verbs ?? d.Verbs ?? [],
        adjs:  d.adjs  ?? d.Adjs  ?? [],
        others: d.others ?? d.Others ?? [],
      }
    };
  } catch {
    return { success: false, data: null };
  }
}
