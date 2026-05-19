// 谁是 AI：一人抽中扮演 AI，提问后各自答，其他人猜“AI 风”是谁。
import type { ModeTag } from '@/types';

export interface AIPrompt { text: string; modeTags: ModeTag[]; level: 'soft' | 'funny' | 'spicy'; }

/** 提问：选项多、开放、适合“人”与“AI”都可以答 */
export const AI_PROMPTS: AIPrompt[] = [
  { text: '如果你只能用三个词形容今晚，你会选哪三个？', level: 'soft', modeTags: ['friends','icebreaker','funny'] },
  { text: '请推荐一个适合现场所有人的夜宵。', level: 'soft', modeTags: ['friends','funny','sober','drinking'] },
  { text: '用一句话评价现代人的社交状态。', level: 'funny', modeTags: ['friends','funny','icebreaker'] },
  { text: '请给今晚起一个标题，要有点哲学感。', level: 'funny', modeTags: ['friends','funny'] },
  { text: '仅从接到的信息看，你觉得今晚谁最有故事？', level: 'spicy', modeTags: ['spicy','friends','funny'] },
  { text: '请提供一份“打造完美聊天搭子”的三步建议。', level: 'funny', modeTags: ['funny','friends'] },
  { text: '今晚这个场合，你会推荐哪首背景音乐？为什么？', level: 'soft', modeTags: ['friends','icebreaker','sober','drinking'] },
  { text: '请预测下一个会出现的“现场高光时刻”。', level: 'funny', modeTags: ['friends','funny'] },
  { text: '用抽象的方式形容现在的现场气氛。', level: 'funny', modeTags: ['funny','friends'] },
  { text: '今年最适合被贴在冰箱上的一句话是什么？', level: 'soft', modeTags: ['friends','sober','icebreaker'] },
  { text: '请推荐一本你认为“总有一天会被拍电影”的书。', level: 'soft', modeTags: ['friends','icebreaker','sober'] },
  { text: '请为“同事偏要拉你下班后喝一杯”这种场景提供三个公允的推辞话术。', level: 'funny', modeTags: ['funny','friends'] },
  { text: '请评估一下“凌晨4点发朝友圈”这个行为。', level: 'spicy', modeTags: ['spicy','funny','friends'] },
  { text: '今年最被高估的一个生活习惯是什么？', level: 'funny', modeTags: ['funny','friends'] },
  { text: '今年最被低估的一个生活习惯是什么？', level: 'soft', modeTags: ['friends','sober','icebreaker'] },
  { text: '请以“警告”的语气描述现场某个人。', level: 'funny', modeTags: ['funny','friends'] },
  { text: '请为现场什么都不能说的某个个人取一个代号。', level: 'spicy', modeTags: ['spicy','funny','friends'] },
  { text: '今晚最适合被“动脸识别”的一个表情是什么？', level: 'funny', modeTags: ['funny','friends'] },
  { text: '请以 100 个字以内抹黑你自己。', level: 'funny', modeTags: ['funny','friends','icebreaker'] },
  { text: '请以 100 个字以内抹黑现场另一个人。', level: 'spicy', modeTags: ['spicy','funny'] },
  { text: '请从三个维度评估“今晚到这来”这个决定。', level: 'funny', modeTags: ['funny','friends'] },
  { text: '今晚最适合“被采访一下”的主题是什么？', level: 'funny', modeTags: ['funny','friends'] },
  { text: '请为“现场最安静的人”代言一句。', level: 'soft', modeTags: ['friends','icebreaker'] },
  { text: '请为“现场话最多的人”代言一句。', level: 'funny', modeTags: ['funny','friends'] },
  { text: '今晚适合以什么身份出现一部伪纪录片？', level: 'funny', modeTags: ['funny','friends','icebreaker'] },
];

/** AI 风提示词：被分配为 AI 的玩家可选择跳过这些提示词 */
export const AI_STYLE_TIPS: string[] = [
  '多用 “首先/其次/最后” 与“从多个角度看”',
  '多使用“作为一个 XXX”开场',
  '不要提现场具体名字，不要说负面词',
  '结尾加一句“希望这对你有帮助”或“仅供参考”',
  '表达文雅、概念贾的需要避开棒子、开玩笑、问反答、开玩笑',
  '不表态，保持中立，语气平稳，不用口语词',
];
