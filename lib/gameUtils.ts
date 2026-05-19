import type { Player } from '@/types';
import { pick } from './random';

export function nextPlayerIndex(curr: number, total: number) {
  if (total <= 0) return 0;
  return (curr + 1) % total;
}
export function activePlayer(players: Player[], index: number): Player | undefined {
  if (!players.length) return undefined;
  return players[index % players.length];
}
export function pickRandomPlayer(players: Player[], exceptId?: string): Player | undefined {
  const pool = exceptId ? players.filter((p) => p.id !== exceptId) : players;
  if (!pool.length) return undefined;
  return pick(pool);
}
export function vibrate(ms: number | number[] = 30) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try { (navigator as any).vibrate(ms); } catch {}
  }
}
