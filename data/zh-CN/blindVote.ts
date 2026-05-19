// 盲投票：闭眼同时指认“谁最适合…”
import type { ModeTag } from '@/types';

export interface BlindQ { text: string; level: 'soft'|'funny'|'spicy'; modeTags: ModeTag[]; }

export const BLIND_VOTE: BlindQ[] = [
  { text: '今晚最适合做侦探的是谁？', level: 'soft',  modeTags: ['friends','icebreaker','funny'] },
  { text: '今晚最适合当主持人的是谁？', level: 'soft',  modeTags: ['friends','icebreaker','funny'] },
  { text: '今晚最适合为现场拍照的是谁？', level: 'soft',  modeTags: ['friends','icebreaker'] },
  { text: '今晚最适合发起下一场的是谁？', level: 'soft',  modeTags: ['friends','icebreaker','sober'] },
  { text: '今晚最适合代现场说出“我们走吧”的是谁？', level: 'funny', modeTags: ['funny','friends'] },
  { text: '今晚最适合被采访一下的是谁？', level: 'funny', modeTags: ['funny','friends','icebreaker'] },
  { text: '今晚最适合被“抖个包袖”的是谁？', level: 'funny', modeTags: ['funny','friends'] },
  { text: '今晚最适合当“气氛担当”的是谁？', level: 'soft',  modeTags: ['friends','funny','icebreaker'] },
  { text: '今晚最适合“静静听你讲”的是谁？', level: 'soft',  modeTags: ['friends','sober','spicy'] },
  { text: '今晚最适合“拉你一下吃夜宵”的是谁？', level: 'soft',  modeTags: ['friends','spicy'] },
  { text: '今晚最适合“今晚静遙遙冷却”的是谁？', level: 'spicy', modeTags: ['spicy','sober'] },
  { text: '今晚最适合“发起一场冲动出行”的是谁？', level: 'soft',  modeTags: ['friends','funny','icebreaker'] },
];
