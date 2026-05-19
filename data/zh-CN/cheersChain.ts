// 干杯链：系统出一个条件。符合的人按当前模式做动作。
// {drink} 占位会被运行时替换：
// - drinking + ageConfirmed：小酌一口
// - sober 或 未启动酒精：拍一下手 / 做个鬼脸
import type { ModeTag } from '@/types';

export interface CheerLine { text: string; modeTags: ModeTag[]; level: 'soft'|'funny'|'spicy'; }

export const CHEERS_LINES: CheerLine[] = [
  { text: '今年去过海边的人——{drink}', level: 'soft', modeTags: ['friends','icebreaker','sober','drinking'] },
  { text: '今年职业有变动的人——{drink}', level: 'soft', modeTags: ['icebreaker','friends','sober','drinking'] },
  { text: '今年发过朝州圈但倒按不动超过10分钟的人——{drink}', level: 'funny', modeTags: ['friends','funny','drinking','sober'] },
  { text: '今年点赞过前任动态的人——{drink}', level: 'spicy', modeTags: ['spicy','funny','drinking'] },
  { text: '今年快递被送错过一次的人——{drink}', level: 'soft',  modeTags: ['friends','icebreaker','sober','drinking'] },
  { text: '今年凌晨三点后还在加班过的人——{drink}', level: 'soft',  modeTags: ['friends','funny','drinking','sober'] },
  { text: '看过竟赛现场的人——{drink}', level: 'soft',  modeTags: ['friends','icebreaker','sober','drinking'] },
  { text: '在KTV邀过话筒的人——{drink}', level: 'funny', modeTags: ['friends','funny','drinking'] },
  { text: '处过异地恋的人——{drink}', level: 'spicy', modeTags: ['spicy','friends','drinking'] },
  { text: '现场身上带过商场会员卡超过五张的人——{drink}', level: 'funny', modeTags: ['funny','friends','drinking','sober'] },
  { text: '上个月吃过火锅超过三次的人——{drink}', level: 'funny', modeTags: ['friends','funny','drinking','sober'] },
  { text: '本周一件事也没取消过的人——{drink}', level: 'soft',  modeTags: ['friends','sober','icebreaker','drinking'] },
  { text: '手机剧本人名友超过三个“报告”的人——{drink}', level: 'funny', modeTags: ['funny','friends','drinking','sober'] },
  { text: '上过友同学生日会被闻到然后被合唱的人——{drink}', level: 'funny', modeTags: ['friends','funny','drinking','sober'] },
  { text: '上个月被同事/同学叫错名字的人——{drink}', level: 'funny', modeTags: ['friends','funny','icebreaker','drinking','sober'] },
  { text: '上个月为了某个人改过路线的人——{drink}', level: 'spicy', modeTags: ['spicy','friends','drinking'] },
  { text: '现场穿黑色超过三件的人——{drink}', level: 'soft',  modeTags: ['friends','funny','drinking','sober'] },
  { text: '手机电量少于30%的人——{drink}', level: 'soft',  modeTags: ['friends','funny','drinking','sober'] },
  { text: '今天这句话被说中思绪了一下的人——{drink}', level: 'spicy', modeTags: ['spicy','friends','drinking'] },
];
