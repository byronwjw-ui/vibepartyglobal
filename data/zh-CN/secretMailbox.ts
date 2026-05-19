// 真心话信箱：匿名向某人提问。被问可公开回答或跳过。
import type { ModeTag } from '@/types';

export interface MailQ { text: string; level: 'soft'|'funny'|'spicy'; modeTags: ModeTag[]; }

export const MAILBOX_PROMPTS: MailQ[] = [
  { text: '你最近一次心动是因为什么？', level: 'spicy', modeTags: ['spicy'] },
  { text: '你最近一次失眠是因为什么？', level: 'spicy', modeTags: ['spicy','friends'] },
  { text: '你最近一次偏执是因为什么？', level: 'soft',  modeTags: ['friends','spicy'] },
  { text: '你最近一次“偷偷高兴”是什么事？', level: 'soft',  modeTags: ['friends','icebreaker','sober'] },
  { text: '你最近一次“装作没事”是什么时候？', level: 'spicy', modeTags: ['spicy','friends'] },
  { text: '你心里最近反复出现的一句话是什么？', level: 'soft',  modeTags: ['friends','spicy'] },
  { text: '你心里有一句一直没机会说出口的谢谢想送给谁？', level: 'soft',  modeTags: ['friends','icebreaker','sober'] },
  { text: '你心里有一句一直没机会说出口的对不起想送给谁？', level: 'soft',  modeTags: ['friends','sober','spicy'] },
  { text: '你现在最想重启一件什么事？', level: 'soft',  modeTags: ['friends','sober','icebreaker'] },
  { text: '你现在最想放下一件什么事？', level: 'soft',  modeTags: ['friends','sober'] },
  { text: '你最近一次“成熟了一点”的瞬间是什么？', level: 'soft',  modeTags: ['friends','sober','icebreaker'] },
  { text: '你对现场某个人最想说的一句话是什么？可以不说名字。', level: 'spicy', modeTags: ['spicy','friends'] },
  { text: '你最近一次为别人破例是什么事？', level: 'spicy', modeTags: ['spicy','friends'] },
  { text: '你最近一次为自己设边界是什么事？', level: 'soft',  modeTags: ['friends','sober'] },
  { text: '你最近一次“幸好我没说出口”是什么事？', level: 'spicy', modeTags: ['spicy','friends'] },
  { text: '你最近一次“我应该说出口”是什么事？', level: 'spicy', modeTags: ['spicy'] },
  { text: '现场谁让你觉得最安心？可以不说名字。', level: 'soft',  modeTags: ['friends','icebreaker'] },
  { text: '现场谁让你觉得最能一起吃一顿饭的？', level: 'soft',  modeTags: ['friends','icebreaker'] },
  { text: '你如果只能告诉现场一个人你今晚的状态，你会告诉谁？', level: 'spicy', modeTags: ['spicy','friends'] },
  { text: '你最近“希望有人看出来但你没说”的一件事是什么？', level: 'spicy', modeTags: ['spicy'] },
];
