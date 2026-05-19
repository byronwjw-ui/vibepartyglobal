// 谎言侦探：提示玩家说三件事（两真一假）
import type { ModeTag } from '@/types';

export interface TwoTruthsHint { text: string; level: 'soft'|'funny'|'spicy'; modeTags: ModeTag[]; }

export const TWO_TRUTHS_HINTS: TwoTruthsHint[] = [
  { text: '说三件你“听起来不太像你”的有趣经历。', level: 'funny', modeTags: ['funny','icebreaker','friends'] },
  { text: '说三件你上学时期的奇葵事。', level: 'funny', modeTags: ['funny','icebreaker','friends'] },
  { text: '说三件你在工作中遇到的鮔鮎事。', level: 'funny', modeTags: ['funny','friends'] },
  { text: '说三件你在旅行中发生过的意外。', level: 'soft',  modeTags: ['icebreaker','friends','sober'] },
  { text: '说三件你学过一半就放弃的手艺。', level: 'funny', modeTags: ['funny','friends'] },
  { text: '说三件你偷偷热衷的小品牌。', level: 'soft',  modeTags: ['icebreaker','friends','sober'] },
  { text: '说三件你被以为会但实际不太会的事。', level: 'funny', modeTags: ['funny','friends'] },
  { text: '说三件你被以为不会但其实很会的事。', level: 'soft',  modeTags: ['icebreaker','friends'] },
  { text: '说三件你偶尔犯贱的小习惯。', level: 'funny', modeTags: ['funny','friends'] },
  { text: '说三件你心里偏爱但从未公开说过的东西。', level: 'soft',  modeTags: ['icebreaker','friends','spicy'] },
  { text: '说三件你在某个领域偏执的观点。', level: 'soft',  modeTags: ['friends','icebreaker'] },
  { text: '说三件你最近偼偼定下的小目标。', level: 'soft',  modeTags: ['friends','sober','icebreaker'] },
  { text: '说三件你对某个年代的迷恋。', level: 'soft',  modeTags: ['friends','icebreaker'] },
  { text: '说三件你看过但不好意思承认的作品。', level: 'funny', modeTags: ['funny','friends'] },
  { text: '说三件你被朋友骂过但现在还是朋友的事。', level: 'funny', modeTags: ['friends','funny'] },
  { text: '说三件你曾经梦想的职业。', level: 'soft',  modeTags: ['icebreaker','friends','sober'] },
  { text: '说三件你偶尔会哻哻自语的话。', level: 'soft',  modeTags: ['friends','sober'] },
  { text: '说三件你“不点但其实很熟”的领域。', level: 'soft',  modeTags: ['friends','icebreaker'] },
  { text: '说三件你决不会再经历一次的事。', level: 'soft',  modeTags: ['friends','spicy'] },
  { text: '说三件你一直想学但迟迟没开始的事。', level: 'soft',  modeTags: ['friends','sober'] },
];
