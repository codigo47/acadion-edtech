'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'acadion-favorite-colors';
const MAX_FAVORITES = 10;

function readFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_FAVORITES) : [];
  } catch {
    return [];
  }
}

function writeFavorites(colors: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(colors.slice(0, MAX_FAVORITES)));
  } catch {
    // localStorage full or unavailable
  }
}

export function useFavoriteColors() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(readFavorites());
  }, []);

  const addFavorite = useCallback((color: string) => {
    setFavorites((prev) => {
      const normalized = color.toUpperCase();
      if (prev.some((c) => c.toUpperCase() === normalized)) return prev;
      const next = [color, ...prev].slice(0, MAX_FAVORITES);
      writeFavorites(next);
      return next;
    });
  }, []);

  const removeFavorite = useCallback((color: string) => {
    setFavorites((prev) => {
      const normalized = color.toUpperCase();
      const next = prev.filter((c) => c.toUpperCase() !== normalized);
      writeFavorites(next);
      return next;
    });
  }, []);

  return { favorites, addFavorite, removeFavorite };
}
