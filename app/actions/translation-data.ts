'use server'

import { getApiUrl } from '@/lib/apiClient';
import { headers } from 'next/headers';

// getTranslationHistory: calls backend dashboard endpoint and extracts translation history
export async function getTranslationHistory(userId: string) {
  if (!userId) return { success: false, data: [] };

  try {
    const headerList = await headers();
    const host = headerList.get('host') || 'localhost:3000';
    const protocol = host.startsWith('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https';

    const url = getApiUrl('/api/user/dashboard');
    // Ensure absolute URL on server
    const finalUrl = url.startsWith('/') ? `${protocol}://${host}${url}` : url;

    const res = await fetch(finalUrl, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error(`Fetch failed for history: ${res.status} ${res.statusText}`);
      return { success: false, data: [] };
    }
    const json = await res.json();
    const history = json?.history?.translation ?? [];
    return { success: true, data: history };
  } catch (error) {
    console.error("getTranslationHistory Error:", error);
    return { success: false, data: [] };
  }
}

// getDashboardVocabulary: calls backend random-vocabulary endpoint
export async function getDashboardVocabulary() {
  try {
    const headerList = await headers();
    const host = headerList.get('host') || 'localhost:3000';
    const protocol = host.startsWith('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https';

    const url = getApiUrl('/api/dictionary/random-vocabulary');
    // Ensure absolute URL on server
    const finalUrl = url.startsWith('/') ? `${protocol}://${host}${url}` : url;

    const res = await fetch(finalUrl, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error(`Fetch failed for vocabulary: ${res.status} ${res.statusText}`);
      return { success: false, data: null };
    }
    const json = await res.json();
    if (!json?.success) return { success: false, data: null };
    const d = json.data;
    return {
      success: true,
      data: {
        nouns: d.nouns ?? d.Nouns ?? [],
        verbs: d.verbs ?? d.Verbs ?? [],
        adjs: d.adjs ?? d.Adjs ?? [],
        others: d.others ?? d.Others ?? [],
      }
    };
  } catch (error) {
    console.error("getDashboardVocabulary Error:", error);
    return { success: false, data: null };
  }
}
