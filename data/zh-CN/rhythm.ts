// 节奏拍拍：序列中随机出拍手/拍腿/跨拍
import type { ModeTag } from '@/types';

export type Beat = 'C' | 'L' | 'X'; // clap / lap / cross
export const BEAT_LABEL: Record<Beat, string> = { C: '👏 拍手', L: '🧜 拍腿', X: '🔀 跨拍' };

export interface RhythmPattern {
  bpm: number;
  pattern: Beat[];
  level: 'soft'|'funny'|'spicy';
  modeTags: ModeTag[];
}

export const RHYTHM_PATTERNS: RhythmPattern[] = [
  { bpm: 80,  pattern: ['C','L','C','L'], level: 'soft', modeTags: ['friends','icebreaker','sober','funny'] },
  { bpm: 100, pattern: ['C','C','L','L'], level: 'soft', modeTags: ['friends','funny','icebreaker'] },
  { bpm: 110, pattern: ['C','L','X','L'], level: 'funny',modeTags: ['friends','funny'] },
  { bpm: 120, pattern: ['C','L','C','X'], level: 'funny',modeTags: ['friends','funny'] },
  { bpm: 130, pattern: ['C','C','L','X','L'], level: 'funny', modeTags: ['friends','funny'] },
  { bpm: 140, pattern: ['X','L','C','L','C','X'], level: 'funny', modeTags: ['funny','friends'] },
  { bpm: 90,  pattern: ['C','C','C','L'], level: 'soft', modeTags: ['friends','sober','icebreaker'] },
  { bpm: 95,  pattern: ['L','L','C','C'], level: 'soft', modeTags: ['friends','icebreaker'] },
  { bpm: 150, pattern: ['C','X','C','L','X','L'], level: 'funny', modeTags: ['funny','friends','drinking'] },
  { bpm: 160, pattern: ['C','X','L','X','C','L','X'], level: 'funny', modeTags: ['funny','drinking'] },
];
