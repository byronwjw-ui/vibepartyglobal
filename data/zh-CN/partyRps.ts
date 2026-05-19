// 派对猜拳：石头剪刀布 + 派对牌
import type { ModeTag } from '@/types';

export type RpsMove = 'rock' | 'paper' | 'scissors' | 'bomb' | 'shield' | 'mirror';
export const RPS_LABEL: Record<RpsMove, string> = {
  rock: '🚧 石头', paper: '📜 布', scissors: '✂️ 剪刀',
  bomb: '💥 炸裂', shield: '🛡️ 护盾', mirror: '🪞 反弹',
};

export interface RpsChallenge { text: string; level: 'soft'|'funny'|'spicy'; modeTags: ModeTag[]; }

export const RPS_CHALLENGES: RpsChallenge[] = [
  { text: '输的人表演一种动物 5 秒。', level: 'funny', modeTags: ['friends','funny','icebreaker'] },
  { text: '输的人用播音腔念一句菜单。', level: 'funny', modeTags: ['friends','funny'] },
  { text: '输的人赢者深情告白一句。', level: 'spicy', modeTags: ['spicy','funny'] },
  { text: '输的人帮赢家抽下一张牌。', level: 'soft',  modeTags: ['friends','funny'] },
  { text: '输的人接挑战：其他人代抽下一张。', level: 'funny', modeTags: ['friends','funny'] },
  { text: '输的人跳一段 5 秒的“今天上班很开心”舞。', level: 'funny', modeTags: ['funny','friends'] },
  { text: '输的人说出一个现场人的反差点。', level: 'funny', modeTags: ['friends','funny'] },
  { text: '输的人被全场夸 10 秒。', level: 'soft',  modeTags: ['friends','icebreaker','funny'] },
  { text: '输的人下一轮代赢家出拳。', level: 'funny', modeTags: ['friends','funny'] },
  { text: '输的人点一首歌送给现场最安静的人。', level: 'soft',  modeTags: ['friends','icebreaker'] },
  { text: '输的人“小酌一口 / 拍一下手”（随模式切换）。', level: 'soft',  modeTags: ['drinking','sober','friends'] },
];
