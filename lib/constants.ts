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
  '#FF2DAA','#8B5CF6','#22D3EE','#FB923C','#A3E635',
  '#F472B6','#60A5FA','#FDE047','#34D399','#F87171',
];

export const PARTY_MODES: { id: PartyMode; label: string; desc: string; emoji: string }[] = [
  { id: 'friends', label: '朋友局', desc: '熟人聚会，轻松开玩', emoji: '🎈' },
  { id: 'icebreaker', label: '破冰局', desc: '新朋友、团建、社交', emoji: '❄️' },
  { id: 'funny', label: '搞笑局', desc: '抓马、整活、爆笑', emoji: '😂' },
  { id: 'spicy', label: '暧昧局', desc: '心动局，注意边界', emoji: '💋' },
  { id: 'sober', label: '无酒精局', desc: '不喝酒也能很嗨', emoji: '🧃' },
  { id: 'drinking', label: '喝酒模式', desc: '需年龄确认，理性饮酒', emoji: '🍻' },
];
