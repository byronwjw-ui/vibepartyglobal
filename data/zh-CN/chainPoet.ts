// 接龙诗人：系统出一个开题句，玩家轮流接一句
import type { ModeTag } from '@/types';

export interface PoetSeed { text: string; level: 'soft'|'funny'|'spicy'; modeTags: ModeTag[]; }

export const POET_SEEDS: PoetSeed[] = [
  { text: '今晚的灯光有点晃眼，', level: 'soft',  modeTags: ['friends','icebreaker','funny','spicy','sober','drinking'] },
  { text: '我们围着一部手机坐下，', level: 'soft',  modeTags: ['friends','icebreaker','sober'] },
  { text: '有人突然打了一个哈欠，', level: 'funny', modeTags: ['friends','funny','icebreaker'] },
  { text: '桌上的杯子发出轻微的响声，', level: 'soft',  modeTags: ['drinking','friends','spicy'] },
  { text: '窗外的风总是说话不算话，', level: 'soft',  modeTags: ['spicy','sober','friends'] },
  { text: '有人说今晚不谈工作，', level: 'funny', modeTags: ['friends','icebreaker','funny'] },
  { text: '冰块在杯里慕然回首，', level: 'soft',  modeTags: ['drinking','spicy'] },
  { text: '某个名字被轻轻提起，', level: 'spicy', modeTags: ['spicy','friends'] },
  { text: '梦里反复出现一句话，', level: 'soft',  modeTags: ['spicy','sober'] },
  { text: '现场气氛在第二杯之后转了弯，', level: 'funny', modeTags: ['drinking','funny','friends'] },
  { text: '门外的街报了几个名字，', level: 'soft',  modeTags: ['friends','spicy'] },
  { text: '有人在桌下偷偷看手机，', level: 'funny', modeTags: ['funny','friends','icebreaker'] },
  { text: '音乐快要到高潮部分，', level: 'soft',  modeTags: ['friends','funny','icebreaker'] },
  { text: '某个眼神在空气里打结，', level: 'spicy', modeTags: ['spicy'] },
  { text: '三点钟的灯还亦些心意，', level: 'soft',  modeTags: ['spicy','friends'] },
  { text: '有人说他要先走一步，', level: 'soft',  modeTags: ['friends','sober'] },
  { text: '桌边多了一个不熟的人，', level: 'soft',  modeTags: ['icebreaker','friends'] },
  { text: '我朝右边的人举了杯，', level: 'soft',  modeTags: ['drinking','friends'] },
  { text: '有个梵本里留了一句话，', level: 'spicy', modeTags: ['spicy'] },
  { text: '月亮今晚上班有点仔细，', level: 'soft',  modeTags: ['sober','friends','icebreaker'] },
  { text: '有人突然说起了高中，', level: 'funny', modeTags: ['friends','funny'] },
  { text: '全场等着一个人接话，', level: 'funny', modeTags: ['funny','friends'] },
  { text: '某个表情包被发了三次，', level: 'funny', modeTags: ['funny','friends'] },
  { text: '看起来最冷漠的人先笑了，', level: 'funny', modeTags: ['friends','funny','icebreaker'] },
];

export const POET_RULES: string[] = [
  '顺时针轮流，每人接一句（8–6 个字左右）',
  '不能重复上一句的最后三个字',
  '收尾句必须含一个赏心悚目的改造',
  '全部完成后投票选出今晚最离谱的一句',
];
