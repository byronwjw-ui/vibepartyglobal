// VibeType · 派对人格（1分钟12题）
// 4 维度 x 3 题 — 全部派对情境化，不使用标准 MBTI 题库。
// 免责：仅供派对娱乐，不代表人格测评。

export type Axis = 'EI' | 'SN' | 'TF' | 'JP';
export type AxisLetter = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface VibeQuestion {
  id: string;
  axis: Axis;
  prompt: string;
  optionA: { text: string; letter: AxisLetter };
  optionB: { text: string; letter: AxisLetter };
}

export const VIBE_QUESTIONS: VibeQuestion[] = [
  // === E/I 外放 vs 内秀 ===
  {
    id: 'ei1', axis: 'EI',
    prompt: '朋友突然把你拉进一个 8 人新群，里面只有 2 个你认识的人。',
    optionA: { text: '先@大家自我介绍一下', letter: 'E' },
    optionB: { text: '默默潜水观察两天再说', letter: 'I' },
  },
  {
    id: 'ei2', axis: 'EI',
    prompt: '派对开了 1 小时，你开始觉得累了。',
    optionA: { text: '去人最多的地方再充会儿电', letter: 'E' },
    optionB: { text: '偷偷躲到阳台缓一下', letter: 'I' },
  },
  {
    id: 'ei3', axis: 'EI',
    prompt: 'KTV 包间里别人正在唱，你心里在想——',
    optionA: { text: '下一首点什么最炸', letter: 'E' },
    optionB: { text: '等下别让我接麦', letter: 'I' },
  },

  // === S/N 现实派 vs 想象派 ===
  {
    id: 'sn1', axis: 'SN',
    prompt: '朋友说“我们去趟丽江吧”，你的第一反应是——',
    optionA: { text: '几号走？请几天假？机票多少？', letter: 'S' },
    optionB: { text: '哇好浪漫，我都在想象在那里发呆了', letter: 'N' },
  },
  {
    id: 'sn2', axis: 'SN',
    prompt: '看到一间老房子，你脑子里冒出的是——',
    optionA: { text: '这房子结构、墙体、采光怎么样', letter: 'S' },
    optionB: { text: '这里以前是不是住过一个会写诗的人', letter: 'N' },
  },
  {
    id: 'sn3', axis: 'SN',
    prompt: '朋友讲了一个梦给你听。',
    optionA: { text: '“你是不是昨天吃太饱了”', letter: 'S' },
    optionB: { text: '“等等，这个梦可能在暗示什么”', letter: 'N' },
  },

  // === T/F 理性 vs 感性 ===
  {
    id: 'tf1', axis: 'TF',
    prompt: '朋友失恋了找你倾诉，你大概率会——',
    optionA: { text: '帮 ta 分析问题出在哪、下一步怎么办', letter: 'T' },
    optionB: { text: '先抱一下，让 ta 哭完再说', letter: 'F' },
  },
  {
    id: 'tf2', axis: 'TF',
    prompt: '你最讨厌的一种朋友是——',
    optionA: { text: '情绪化、讲话不讲逻辑', letter: 'T' },
    optionB: { text: '说话很有道理但完全不顾别人感受', letter: 'F' },
  },
  {
    id: 'tf3', axis: 'TF',
    prompt: '你做重要决定时更相信——',
    optionA: { text: '利弊清单和数据', letter: 'T' },
    optionB: { text: '心里那个“就是它了”的感觉', letter: 'F' },
  },

  // === J/P 计划狂 vs 即兴派 ===
  {
    id: 'jp1', axis: 'JP',
    prompt: '周五下班朋友说“今晚出来玩吗”。',
    optionA: { text: '我看一下我的日程…', letter: 'J' },
    optionB: { text: '几点？在哪？我现在就出门', letter: 'P' },
  },
  {
    id: 'jp2', axis: 'JP',
    prompt: '旅行前一晚，你的状态是——',
    optionA: { text: '行李、攻略、订单截图全部整理好', letter: 'J' },
    optionB: { text: '明天早上再说，反正都能现买', letter: 'P' },
  },
  {
    id: 'jp3', axis: 'JP',
    prompt: '你最不能忍受的事是——',
    optionA: { text: '计划被人临时打乱', letter: 'J' },
    optionB: { text: '一整天被安排得满满的没有空隙', letter: 'P' },
  },
];

/** 16 型·派对外号 */
export interface Archetype {
  type: string;       // ENFP 等
  emoji: string;
  nickname: string;   // 气氛组组长
  oneLiner: string;   // 一句点评
  advice: string;     // 今晚建议干嘛
  color: string;      // 贴纸颜色 class
}

export const ARCHETYPES: Record<string, Archetype> = {
  ENFP: { type: 'ENFP', emoji: '🎈', nickname: '气氛组组长',     oneLiner: '全场的电量都靠你充。',                    advice: '今晚说代接下一场。',         color: 'bg-sticker-yellow' },
  ENFJ: { type: 'ENFJ', emoji: '🎤', nickname: '温柔主持人',     oneLiner: '你一发言，现场就转场了。',          advice: '今晚负责推一个害羞的人上热座。', color: 'bg-sticker-pink' },
  ENTP: { type: 'ENTP', emoji: '🎤', nickname: '杠精发言人',     oneLiner: '你不是不同意，你只是想再讨论 10 分钟。', advice: '今晚负责发起一场轩。',     color: 'bg-sticker-orange' },
  ENTJ: { type: 'ENTJ', emoji: '👑', nickname: '派对总调度',     oneLiner: '你不太说话，但今晚去哪是你定的。',  advice: '今晚说代插一场热座拷问。',         color: 'bg-sticker-orange' },
  INFP: { type: 'INFP', emoji: '🌙', nickname: '月亮观察员',     oneLiner: '你看着安静，其实心里上演了三部电影。',  advice: '今晚试试心动雷达。',           color: 'bg-sticker-cyan' },
  INFJ: { type: 'INFJ', emoji: '🔮', nickname: '派对预言家',     oneLiner: '你在观察每个人，并准确知道谁喜欢谁。',advice: '今晚去玩“谁是卧底”，你赢面很大。', color: 'bg-sticker-pink' },
  INTP: { type: 'INTP', emoji: '🔬', nickname: '冷默思考侜',     oneLiner: '你全程听，听到点你才说一句，一句护场。', advice: '今晚去当谁画的的竞猜者。',         color: 'bg-sticker-cyan' },
  INTJ: { type: 'INTJ', emoji: '🧊', nickname: '沉默主谋',         oneLiner: '你不说话，但今晚的局其实是你定的。',     advice: '今晚去当主持人。',                   color: 'bg-sticker-teal' },
  ESFP: { type: 'ESFP', emoji: '💃', nickname: '全场显眼包',     oneLiner: '现场没人比你更投入。',                  advice: '今晚去开一场跳舞。',           color: 'bg-sticker-yellow' },
  ESFJ: { type: 'ESFJ', emoji: '🍵', nickname: '默默续杯人',     oneLiner: '你不抢话，但每个人的杯子都是满的。',  advice: '今晚去开一场“谁最可能”。',       color: 'bg-sticker-teal' },
  ESTP: { type: 'ESTP', emoji: '🔥', nickname: '现场点火器',     oneLiner: '你一来，气氛上线。',                    advice: '今晚去开一场传递炸弹。',       color: 'bg-sticker-orange' },
  ESTJ: { type: 'ESTJ', emoji: '📊', nickname: '派对总管',         oneLiner: '你是那个“几点几分”咨问处。',          advice: '今晚负责计时。',                   color: 'bg-sticker-cyan' },
  ISFP: { type: 'ISFP', emoji: '🌿', nickname: '轻描淡写人',     oneLiner: '你看着淡，其实是今晚接住所有情绪的人。', advice: '今晚去玩真心话信箱。',       color: 'bg-sticker-lime' },
  ISFJ: { type: 'ISFJ', emoji: '☕️', nickname: '温度供应商',     oneLiner: '你不抢镜头，但你一走现场温度就变低了。', advice: '今晚去玩干杯链。',                 color: 'bg-sticker-yellow' },
  ISTP: { type: 'ISTP', emoji: '🤖', nickname: '冷眼手工人',     oneLiner: '你不说话，但什么坏了你都能修。',          advice: '今晚去当“谁画的”主抽。',     color: 'bg-sticker-teal' },
  ISTJ: { type: 'ISTJ', emoji: '📐', nickname: '靠谱本人',         oneLiner: '你是那个“根据口口口”开场的人。',      advice: '今晚去开一场鬼话侦探。',                   color: 'bg-sticker-cyan' },
};

/** 根据选项计算最终类型 */
export function computeType(answers: Record<string, AxisLetter>): string {
  const tally: Record<AxisLetter, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  Object.values(answers).forEach((l) => { tally[l]++; });
  const ei = tally.E >= tally.I ? 'E' : 'I';
  const sn = tally.S >= tally.N ? 'S' : 'N';
  const tf = tally.T >= tally.F ? 'T' : 'F';
  const jp = tally.J >= tally.P ? 'J' : 'P';
  return ei + sn + tf + jp;
}

/** 今晚配置：统计一组玩家类型的“派对色彩” */
export function summarizeParty(types: string[]): string {
  if (!types.length) return '';
  const counts: Record<string, number> = {};
  types.forEach((t) => { counts[t] = (counts[t] || 0) + 1; });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);
  return top.map(([t, n]) => {
    const a = ARCHETYPES[t];
    return a ? `${n}× ${a.emoji}${a.nickname}` : `${n}× ${t}`;
  }).join('  ·  ');
}
