// 禁忌词：玩家获得一个不能说的词，全场监督
import type { ModeTag } from '@/types';

export interface TabooWord { word: string; level: 'soft'|'funny'|'spicy'; modeTags: ModeTag[]; }

/** 亲和、高频、难免说；挑到才有意思 */
export const TABOO_WORDS: TabooWord[] = [
  { word: '我', level: 'soft', modeTags: ['friends','icebreaker','funny','spicy','sober','drinking'] },
  { word: '你', level: 'soft', modeTags: ['friends','funny','icebreaker'] },
  { word: '哈哈', level: 'funny', modeTags: ['funny','friends','icebreaker'] },
  { word: '真的', level: 'funny', modeTags: ['funny','friends'] },
  { word: '那个', level: 'funny', modeTags: ['funny','friends'] },
  { word: '反正', level: 'funny', modeTags: ['funny','friends'] },
  { word: '其实', level: 'funny', modeTags: ['funny','friends'] },
  { word: '然后', level: 'funny', modeTags: ['funny','friends'] },
  { word: '有点', level: 'funny', modeTags: ['funny','friends'] },
  { word: '好的', level: 'funny', modeTags: ['funny','friends'] },
  { word: '快乐', level: 'soft',  modeTags: ['friends','funny'] },
  { word: '吃', level: 'soft',  modeTags: ['friends','funny'] },
  { word: '喝', level: 'soft',  modeTags: ['drinking','friends','funny'] },
  { word: '手机', level: 'soft',  modeTags: ['friends','funny','icebreaker'] },
  { word: '今晚', level: 'soft',  modeTags: ['friends','icebreaker','spicy'] },
  { word: '朋友', level: 'soft',  modeTags: ['friends','icebreaker'] },
  { word: '喜欢', level: 'spicy', modeTags: ['spicy'] },
  { word: '心动', level: 'spicy', modeTags: ['spicy'] },
  { word: '前任', level: 'spicy', modeTags: ['spicy','funny'] },
  { word: '暗恋', level: 'spicy', modeTags: ['spicy'] },
  { word: '加班', level: 'funny', modeTags: ['funny','friends'] },
  { word: '老板', level: 'funny', modeTags: ['funny','friends'] },
  { word: '饭', level: 'soft',  modeTags: ['friends','funny','sober'] },
  { word: '到了', level: 'soft',  modeTags: ['friends','icebreaker'] },
  { word: '刚刚', level: 'funny', modeTags: ['friends','funny'] },
  { word: '表情包', level: 'funny', modeTags: ['funny','friends'] },
  { word: '中午', level: 'soft',  modeTags: ['friends','sober'] },
  { word: '饭圈', level: 'soft',  modeTags: ['friends','icebreaker'] },
  { word: '美女', level: 'spicy', modeTags: ['spicy','funny'] },
  { word: '帅哥', level: 'spicy', modeTags: ['spicy','funny'] },
];
