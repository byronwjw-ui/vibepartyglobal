// 心动雷达：所有人同时指向某个人。题目保持边界、允许跳过。
import type { ModeTag } from '@/types';

export interface RadarQ { text: string; level: 'soft'|'funny'|'spicy'; modeTags: ModeTag[]; }

export const HEART_RADAR: RadarQ[] = [
  { text: '现场你最想单独约一杯咖啡的人是谁？', level: 'spicy', modeTags: ['spicy','friends'] },
  { text: '现场你最想带去旅行的人是谁？', level: 'spicy', modeTags: ['spicy','friends'] },
  { text: '现场你最想一起吃夜宵的人是谁？', level: 'soft',  modeTags: ['friends','spicy'] },
  { text: '现场你觉得最靠谱的人是谁？', level: 'soft',  modeTags: ['friends','icebreaker','spicy'] },
  { text: '现场你最想多了解一点的人是谁？', level: 'spicy', modeTags: ['spicy','icebreaker'] },
  { text: '现场谁的眼神让你今晚多看了一眼？', level: 'spicy', modeTags: ['spicy'] },
  { text: '现场谁的笑声让你轻松？', level: 'soft',  modeTags: ['friends','icebreaker','spicy'] },
  { text: '现场谁穿着最拿手？', level: 'soft',  modeTags: ['friends','spicy','icebreaker'] },
  { text: '现场谁最适合做你的聊天搭子？', level: 'soft',  modeTags: ['icebreaker','friends','spicy'] },
  { text: '现场谁最适合做你的心事对象？', level: 'spicy', modeTags: ['spicy','friends'] },
  { text: '现场谁最适合与你一起看夜景？', level: 'spicy', modeTags: ['spicy'] },
  { text: '现场谁让你觉得“可能一起创业不靠谱但会很热闹”？', level: 'funny', modeTags: ['funny','friends'] },
  { text: '现场谁今晚状态最佳？', level: 'soft',  modeTags: ['friends','icebreaker','funny','spicy','sober','drinking'] },
  { text: '现场谁今晚看起来最需要一个拥抱？', level: 'soft',  modeTags: ['friends','spicy','sober'] },
  { text: '现场谁是今晚你最想在朋友圈里合影的人？', level: 'soft',  modeTags: ['friends','spicy','icebreaker'] },
  { text: '现场谁是今晚你最不想被看穿的人？', level: 'spicy', modeTags: ['spicy'] },
  { text: '现场谁最适合为你点一首深夜里的歌？', level: 'spicy', modeTags: ['spicy','friends'] },
  { text: '现场谁今晚讲话最让你愿意认真听？', level: 'soft',  modeTags: ['friends','spicy','icebreaker'] },
  { text: '现场谁看起来“心里藏了点事但什么都没说”？', level: 'spicy', modeTags: ['spicy','friends'] },
  { text: '现场谁适合做你的“今晚发言人”？', level: 'soft',  modeTags: ['friends','icebreaker','funny'] },
];
