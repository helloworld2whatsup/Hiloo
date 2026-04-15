import { useState, useEffect } from 'react';

export function useSearchHistory(key: string, maxItems = 5) {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse search history', e);
      }
    }
  }, [key]);

  const addToHistory = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setHistory((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, maxItems);
      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromHistory = (term: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item !== term);
      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(key);
  };

  return { history, addToHistory, removeFromHistory, clearHistory };
}
