export type PartyMode = 'friends' | 'icebreaker' | 'funny' | 'spicy' | 'sober' | 'drinking';
export type ContentLevel = 'soft' | 'funny' | 'spicy';

export interface Player {
  id: string;
  name: string;
  avatarColor: string;
  score: number;
  isActive?: boolean;
}

export interface PartySettings {
  mode: PartyMode;
  drinkingEnabled: boolean;
  ageConfirmed: boolean;
  contentLevel: ContentLevel;
  language: 'zh-CN';
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

export interface GameDefinition {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  minPlayers: number;
  maxPlayers?: number;
  duration: string;
  difficulty: '简单' | '中等' | '较难';
  tags: string[];
  icon: string;
  isPremium: boolean;
  enabled: boolean;
}

export interface ContentItem {
  id: string;
  gameId: string;
  text: string;
  level: ContentLevel;
  modeTags: string[];
  safetyLevel: 'safe' | 'mature';
}

export interface AppConfig {
  pricingEnabled: false;
  proEnabled: false;
  partyPassEnabled: false;
  venueEnabled: false;
  i18nReady: true;
}
