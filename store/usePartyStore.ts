'use client';
import { create } from 'zustand';
import type { Player, PartySettings, PartyMode, ContentLevel } from '@/types';
import { AVATAR_COLORS, STORAGE_KEYS } from '@/lib/constants';
import { loadJSON, saveJSON, clearAll } from '@/lib/storage';
import { randomId, pick } from '@/lib/random';
import { NICKNAMES } from '@/data/nicknames';

const defaultSettings: PartySettings = {
  mode: 'friends',
  drinkingEnabled: false,
  ageConfirmed: false,
  contentLevel: 'funny',
  language: 'zh-CN',
  soundEnabled: true,
  vibrationEnabled: true,
};

interface State {
  hydrated: boolean;
  players: Player[];
  settings: PartySettings;
  recentGames: string[];
  hasSeenSafety: boolean;
  hydrate: () => void;
  addPlayer: (name?: string) => void;
  addRandomPlayer: () => void;
  fillFour: () => void;
  removePlayer: (id: string) => void;
  renamePlayer: (id: string, name: string) => void;
  clearPlayers: () => void;
  bumpScore: (id: string, delta: number) => void;
  setMode: (mode: PartyMode) => void;
  setDrinking: (on: boolean) => void;
  setAgeConfirmed: (v: boolean) => void;
  setContentLevel: (l: ContentLevel) => void;
  setSound: (v: boolean) => void;
  setVibration: (v: boolean) => void;
  pushRecent: (gameId: string) => void;
  markSafetySeen: () => void;
  resetAll: () => void;
}

function randomNick(existing: string[]): string {
  const pool = NICKNAMES.filter((n) => !existing.includes(n));
  if (!pool.length) return pick(NICKNAMES) + Math.floor(Math.random() * 99);
  return pick(pool);
}
function makePlayer(name: string, idx: number): Player {
  return { id: randomId(), name, avatarColor: AVATAR_COLORS[idx % AVATAR_COLORS.length], score: 0 };
}

export const usePartyStore = create<State>((set, get) => ({
  hydrated: false,
  players: [],
  settings: defaultSettings,
  recentGames: [],
  hasSeenSafety: false,
  hydrate: () => {
    if (get().hydrated) return;
    const players = loadJSON<Player[]>(STORAGE_KEYS.players, []);
    const settings = { ...defaultSettings, ...loadJSON<Partial<PartySettings>>(STORAGE_KEYS.settings, {}) } as PartySettings;
    const recentGames = loadJSON<string[]>(STORAGE_KEYS.recentGames, []);
    const hasSeenSafety = loadJSON<boolean>(STORAGE_KEYS.hasSeenSafety, false);
    set({ players, settings, recentGames, hasSeenSafety, hydrated: true });
  },
  addPlayer: (name) => set((s) => {
    const existing = s.players.map((p) => p.name);
    const finalName = (name && name.trim()) || randomNick(existing);
    const next = [...s.players, makePlayer(finalName, s.players.length)];
    saveJSON(STORAGE_KEYS.players, next); return { players: next };
  }),
  addRandomPlayer: () => set((s) => {
    const next = [...s.players, makePlayer(randomNick(s.players.map((p) => p.name)), s.players.length)];
    saveJSON(STORAGE_KEYS.players, next); return { players: next };
  }),
  fillFour: () => set((s) => {
    const next = [...s.players];
    while (next.length < 4) next.push(makePlayer(randomNick(next.map((p) => p.name)), next.length));
    saveJSON(STORAGE_KEYS.players, next); return { players: next };
  }),
  removePlayer: (id) => set((s) => {
    const next = s.players.filter((p) => p.id !== id);
    saveJSON(STORAGE_KEYS.players, next); return { players: next };
  }),
  renamePlayer: (id, name) => set((s) => {
    const next = s.players.map((p) => p.id === id ? { ...p, name } : p);
    saveJSON(STORAGE_KEYS.players, next); return { players: next };
  }),
  clearPlayers: () => { saveJSON(STORAGE_KEYS.players, []); set({ players: [] }); },
  bumpScore: (id, delta) => set((s) => {
    const next = s.players.map((p) => p.id === id ? { ...p, score: p.score + delta } : p);
    saveJSON(STORAGE_KEYS.players, next); return { players: next };
  }),
  setMode: (mode) => set((s) => {
    const settings = { ...s.settings, mode, drinkingEnabled: mode === 'drinking' ? s.settings.drinkingEnabled : false };
    saveJSON(STORAGE_KEYS.settings, settings); return { settings };
  }),
  setDrinking: (on) => set((s) => { const settings = { ...s.settings, drinkingEnabled: on }; saveJSON(STORAGE_KEYS.settings, settings); return { settings }; }),
  setAgeConfirmed: (v) => set((s) => { const settings = { ...s.settings, ageConfirmed: v }; saveJSON(STORAGE_KEYS.settings, settings); return { settings }; }),
  setContentLevel: (l) => set((s) => { const settings = { ...s.settings, contentLevel: l }; saveJSON(STORAGE_KEYS.settings, settings); return { settings }; }),
  setSound: (v) => set((s) => { const settings = { ...s.settings, soundEnabled: v }; saveJSON(STORAGE_KEYS.settings, settings); return { settings }; }),
  setVibration: (v) => set((s) => { const settings = { ...s.settings, vibrationEnabled: v }; saveJSON(STORAGE_KEYS.settings, settings); return { settings }; }),
  pushRecent: (gameId) => set((s) => {
    const next = [gameId, ...s.recentGames.filter((g) => g !== gameId)].slice(0, 8);
    saveJSON(STORAGE_KEYS.recentGames, next); return { recentGames: next };
  }),
  markSafetySeen: () => { saveJSON(STORAGE_KEYS.hasSeenSafety, true); set({ hasSeenSafety: true }); },
  resetAll: () => { clearAll('vibeparty.'); set({ players: [], settings: defaultSettings, recentGames: [], hasSeenSafety: false }); },
}));
