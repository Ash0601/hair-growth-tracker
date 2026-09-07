import { useState, useEffect } from 'react';

export const STREAK_KEY = 'hair_flow_streak';
export const WEEK_KEY = 'hair_flow_week_v1';
export const CUPS_KEY = 'hair_flow_cups_today';
export const PROTEIN_KEY = 'hair_flow_protein_today';
export const FORTUNE_KEY = 'hair_flow_fortune_date';
export const FORTUNE_TEXT_KEY = 'hair_flow_fortune_text';

export function useHairStorage() {
  // Streak State
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem(STREAK_KEY)) || 1;
  });

  // Weekly Completion State
  const [completedDays, setCompletedDays] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(WEEK_KEY)) || [];
    } catch {
      return [];
    }
  });

  // Daily Cups (0 to 7)
  const [cups, setCups] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CUPS_KEY)) || [];
    } catch {
      return [];
    }
  });

  // Daily Protein Grams
  const [protein, setProtein] = useState(() => {
    return parseInt(localStorage.getItem(PROTEIN_KEY)) || 0;
  });

  // Fortune Revealed State
  const [fortuneRevealed, setFortuneRevealed] = useState(() => {
    const today = new Date().toDateString();
    return localStorage.getItem(FORTUNE_KEY) === today;
  });

  const [fortuneText, setFortuneText] = useState(() => {
    return localStorage.getItem(FORTUNE_TEXT_KEY) || '';
  });

  // Sync Streak
  const updateStreak = (val) => {
    setStreak(val);
    localStorage.setItem(STREAK_KEY, val);
  };

  // Toggle Day
  const toggleDay = (dayId) => {
    setCompletedDays((prev) => {
      const next = prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId];
      localStorage.setItem(WEEK_KEY, JSON.stringify(next));
      return next;
    });
  };

  // Toggle Cup
  const toggleCup = (idx) => {
    setCups((prev) => {
      const next = prev.includes(idx) ? prev.filter((c) => c !== idx) : [...prev, idx];
      localStorage.setItem(CUPS_KEY, JSON.stringify(next));
      return next;
    });
  };

  // Adjust Protein
  const adjustProtein = (delta) => {
    setProtein((prev) => {
      const next = Math.max(0, prev + delta);
      localStorage.setItem(PROTEIN_KEY, next);
      return next;
    });
  };

  // Reveal Fortune
  const revealFortune = (text) => {
    const today = new Date().toDateString();
    setFortuneRevealed(true);
    setFortuneText(text);
    localStorage.setItem(FORTUNE_KEY, today);
    localStorage.setItem(FORTUNE_TEXT_KEY, text);
  };

  // Reset Week
  const resetWeek = () => {
    setCompletedDays([]);
    localStorage.setItem(WEEK_KEY, JSON.stringify([]));
  };

  return {
    streak,
    updateStreak,
    completedDays,
    toggleDay,
    cups,
    toggleCup,
    protein,
    adjustProtein,
    fortuneRevealed,
    fortuneText,
    revealFortune,
    resetWeek
  };
}
