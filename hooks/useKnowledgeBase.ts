
import { useState, useEffect } from 'react';
import { KnowledgeBase } from '../types';

export const useKnowledgeBase = () => {
  const [kb, setKb] = useState<KnowledgeBase | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchKb = async () => {
      try {
        const response = await fetch('/parkinson_kb.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: KnowledgeBase = await response.json();
        setKb(data);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchKb();
  }, []);

  return { kb, loading, error };
};
