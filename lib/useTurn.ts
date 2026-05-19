'use client';
import { useState, useCallback } from 'react';
import type { Player } from '@/types';

export function useTurn(players: Player[]) {
  const [index, setIndex] = useState(0);
  const current = players.length ? players[index % players.length] : undefined;
  const next = useCallback(() => setIndex((i) => (i + 1) % Math.max(players.length, 1)), [players.length]);
  const reset = useCallback(() => setIndex(0), []);
  return { index, current, next, reset, setIndex };
}
