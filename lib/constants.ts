import type { AppConfig, PartyMode } from '@/types';

export const APP_CONFIG: AppConfig = {
  pricingEnabled: false,
  proEnabled: false,
  partyPassEnabled: false,
  venueEnabled: false,
  i18nReady: true,
};

export const STORAGE_KEYS = {
  players: 'vibeparty.players',
  settings: 'vibeparty.settings',
  recentGames: 'vibeparty.recentGames',
  hasSeenSafety: 'vibeparty.hasSeenSafety',
} as const;

export const AVATAR_COLORS = [
  '#FFD93D','#FF6FB8','#5DC8FF','#9BE36D','#FFB020',
  '#9B6BFF','#FF7A59','#22D3BB','#FF5252','#4F86FF',
];

export const PARTY_MODES: { id: PartyMode; label: string; desc: string; emoji: string }[] = [
  { id: 'friends',    label: '朋友局',     desc: '熟人聚会，轻松开玩', emoji: '🎈' },
  { id: 'icebreaker', label: '破冰局',     desc: '新朋友、团建、社交', emoji: '❄️' },
  { id: 'funny',      label: '搞笑局',     desc: '抓马、整活、爆笑', emoji: '😂' },
  { id: 'spicy',      label: '暧昧局',     desc: '心动局，注意边界', emoji: '💋' },
  { id: 'sober',      label: '无酒精局', desc: '不喝酒也能很嗨', emoji: '🧃' },
  { id: 'drinking',   label: '喝酒模式', desc: '需年龄确认，理性饮酒', emoji: '🍻' },
];

/** 模式主题色，供大厅、氛围条、游戏页使用 */
export const MODE_THEME: Record<PartyMode, { bg: string; chip: string; emoji: string; label: string; tagline: string }> = {
  friends:    { bg: 'bg-sticker-yellow',  chip: 'bg-sticker-yellow',  emoji: '🎈', label: '朋友局',    tagline: '熟人开玩，随便玩' },
  icebreaker: { bg: 'bg-sticker-cyan',    chip: 'bg-sticker-cyan',    emoji: '❄️', label: '破冰局',    tagline: '新朋友，轻轻热' },
  funny:      { bg: 'bg-sticker-lime',    chip: 'bg-sticker-lime',    emoji: '😂', label: '搞笑局',    tagline: '今晚抓马现场' },
  spicy:      { bg: 'bg-sticker-pink',    chip: 'bg-sticker-pink',    emoji: '💋', label: '暧昧局',    tagline: '心动局，保持边界' },
  sober:      { bg: 'bg-sticker-teal',    chip: 'bg-sticker-teal',    emoji: '🧃', label: '无酒精局', tagline: '不喝酒也很嗨' },
  drinking:   { bg: 'bg-sticker-orange',  chip: 'bg-sticker-orange',  emoji: '🍻', label: '喝酒模式', tagline: '理性饮酒，不劝不驾' },
};
