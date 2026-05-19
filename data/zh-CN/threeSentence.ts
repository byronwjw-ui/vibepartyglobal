// 三句话故事：随机选着 3 人，根据提示各说一句连成故事
import type { ModeTag } from '@/types';

export interface StoryPrompt { theme: string; modeTags: ModeTag[]; level: 'soft'|'funny'|'spicy'; }

export const STORY_PROMPTS: StoryPrompt[] = [
  { theme: '一场失败的第一次约会', level: 'spicy', modeTags: ['spicy','funny','friends'] },
  { theme: '一场走错片场的面试', level: 'funny', modeTags: ['funny','friends'] },
  { theme: '一部谁也看不懂的电影预告', level: 'funny', modeTags: ['funny','friends','icebreaker'] },
  { theme: '一场被始终迟到持20分钟的聚会', level: 'funny', modeTags: ['friends','funny'] },
  { theme: '一个都市传说的起源', level: 'soft',  modeTags: ['icebreaker','sober','friends'] },
  { theme: '一次凌晨三点的便利店黑影', level: 'spicy', modeTags: ['spicy','friends'] },
  { theme: '一场看起来不太靠谱的创业路演', level: 'funny', modeTags: ['funny','friends'] },
  { theme: '一段被刪除的聊天记录', level: 'spicy', modeTags: ['spicy'] },
  { theme: '一次被黑车司机送到错误城市', level: 'funny', modeTags: ['funny','friends'] },
  { theme: '一场在 KTV 发生的深夜敦伦', level: 'funny', modeTags: ['funny','friends','drinking'] },
  { theme: '一份在耳机里听到一半的推荐', level: 'soft',  modeTags: ['icebreaker','sober','friends'] },
  { theme: '一场被取消三次的旅行', level: 'soft',  modeTags: ['friends','sober','icebreaker'] },
  { theme: '一份忘了密码的补上密码提示', level: 'funny', modeTags: ['funny'] },
  { theme: '一只跳出冰箱的夜宵', level: 'funny', modeTags: ['funny','friends'] },
  { theme: '一份突然出现的包裹', level: 'soft',  modeTags: ['icebreaker','friends'] },
  { theme: '一场被误报的生日惊喜', level: 'funny', modeTags: ['funny','friends'] },
  { theme: '一段被误传为告白的礼貌', level: 'spicy', modeTags: ['spicy','funny'] },
  { theme: '一只不说话的宠物', level: 'soft',  modeTags: ['icebreaker','sober','friends'] },
  { theme: '一份贴在电梯里的奇怪告示', level: 'funny', modeTags: ['funny','friends'] },
  { theme: '一颗被二次接入的公司灯', level: 'funny', modeTags: ['funny','friends'] },
];

export const STORY_HINTS = [
  '开场：什么时间，什么人，在什么地方',
  '发生：发生了一件出乎意料的事',
  '结尾：一句让全场哄笑或枖眼的收尾',
];
