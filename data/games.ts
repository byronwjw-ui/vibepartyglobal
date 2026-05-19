import type { GameDefinition } from '@/types';

export const GAMES: GameDefinition[] = [
  // ============ 热场游戏 ============
  { id: 'vibe-cards', title: 'Vibe Cards', subtitle: '派对卡牌：随机挑战、反转、保护卡', category: '热场游戏', minPlayers: 2, duration: '10-20分', difficulty: '简单', tags: ['全员','轻松','随机'], modeAffinity: ['friends','funny'], icon: '🎴', isPremium: false, enabled: true },
  { id: 'truth-or-dare', title: 'Truth or Dare', subtitle: '真心话大冒险：轻松、搞笑、暧昧', category: '热场游戏', minPlayers: 2, duration: '10-20分', difficulty: '简单', tags: ['经典','互动'], modeAffinity: ['friends','spicy'], icon: '🔥', isPremium: false, enabled: true },
  { id: 'never-have-i-ever', title: 'Never Have I Ever', subtitle: '我从来没有……做过的举手', category: '热场游戏', minPlayers: 2, duration: '10分', difficulty: '简单', tags: ['破冰','闲聊'], modeAffinity: ['icebreaker','friends'], icon: '✋', isPremium: false, enabled: true },
  { id: 'would-you-rather', title: 'Would You Rather', subtitle: '二选一：你会选哪个？', category: '热场游戏', minPlayers: 2, duration: '5-10分', difficulty: '简单', tags: ['投票','思考'], modeAffinity: ['icebreaker','friends'], icon: '⚖️', isPremium: false, enabled: true },
  { id: 'five-second', title: 'Five Second Challenge', subtitle: '5秒挑战：快速说出3个答案', category: '热场游戏', minPlayers: 2, duration: '10分', difficulty: '中等', tags: ['节奏','反应'], modeAffinity: ['funny','friends'], icon: '⏱️', isPremium: false, enabled: true },

  // ============ 运气游戏 ============
  { id: 'higher-lower', title: 'Higher or Lower', subtitle: '高低牌：猜下一张是更大还是更小', category: '运气游戏', minPlayers: 2, duration: '5-10分', difficulty: '简单', tags: ['牌面','猜测'], modeAffinity: ['friends','drinking'], icon: '🂠', isPremium: false, enabled: true },
  { id: 'mine-trap', title: 'Mine Trap', subtitle: '地雷陷阱：踩中气氛炸弹接挑战', category: '运气游戏', minPlayers: 2, duration: '5分', difficulty: '简单', tags: ['网格','心跳'], modeAffinity: ['funny','drinking'], icon: '💣', isPremium: false, enabled: true },
  { id: 'number-bomb', title: 'Number Bomb', subtitle: '数字炸弹：猜中的人接挑战', category: '运气游戏', minPlayers: 2, duration: '5分', difficulty: '简单', tags: ['数字','经典'], modeAffinity: ['friends','drinking'], icon: '🔢', isPremium: false, enabled: true },
  { id: 'oracle-book', title: 'Oracle Book', subtitle: '答案之书：默念一个问题再翻开', category: '运气游戏', minPlayers: 1, duration: '随意', difficulty: '简单', tags: ['占卜','神秘'], modeAffinity: ['spicy','friends'], icon: '🔮', isPremium: false, enabled: true },

  // ============ 投票互动 ============
  { id: 'most-likely-to', title: 'Most Likely To', subtitle: '谁最可能：全场投票选出本场答案', category: '投票互动', minPlayers: 3, duration: '10分', difficulty: '简单', tags: ['投票','吐槽'], modeAffinity: ['friends','funny'], icon: '🗳️', isPremium: false, enabled: true },
  { id: 'hot-seat', title: 'Hot Seat', subtitle: '热座拷问：连玩3、5、7题', category: '投票互动', minPlayers: 3, duration: '10分', difficulty: '中等', tags: ['提问','深聊'], modeAffinity: ['spicy','friends'], icon: '🪑', isPremium: false, enabled: true },
  { id: 'kings-command', title: "King's Command", subtitle: '国王指令：随机指定编号执行', category: '投票互动', minPlayers: 3, duration: '15分', difficulty: '中等', tags: ['身份','隐藏'], modeAffinity: ['friends','funny'], icon: '👑', isPremium: false, enabled: true },
  { id: 'blind-vote', title: 'Blind Vote 盲投票', subtitle: '所有人闭眼指认：今晚最适合……的人', category: '投票互动', minPlayers: 3, duration: '10分', difficulty: '简单', tags: ['投票','无声'], modeAffinity: ['icebreaker','friends'], icon: '🙈', isPremium: false, enabled: true },

  // ============ 表演 / 创意 ============
  { id: 'charades', title: 'Charades 你演我猜', subtitle: '只能表演不能说话', category: '表演 / 创意', minPlayers: 3, duration: '15分', difficulty: '中等', tags: ['表演','计时'], modeAffinity: ['funny','friends'], icon: '🎭', isPremium: false, enabled: true },
  { id: 'chain-poet', title: '接龙诗人', subtitle: '每人接一句，组成一首荒谬的诗', category: '表演 / 创意', minPlayers: 3, duration: '10分', difficulty: '简单', tags: ['创意','接龙'], modeAffinity: ['icebreaker','funny'], icon: '✍️', isPremium: false, enabled: true },
  { id: 'three-sentence', title: '三句话故事', subtitle: '三个人各说一句，连成一个故事', category: '表演 / 创意', minPlayers: 3, duration: '10分', difficulty: '简单', tags: ['即兴','合作'], modeAffinity: ['funny','friends'], icon: '📖', isPremium: false, enabled: true },
  { id: 'two-truths', title: '谎言侦探', subtitle: '说三件事（两真一假），其他人猜哪句假', category: '表演 / 创意', minPlayers: 3, duration: '10分', difficulty: '简单', tags: ['破冰','推理'], modeAffinity: ['icebreaker','friends'], icon: '🕵️‍♀️', isPremium: false, enabled: true },
  { id: 'guess-doodle', title: '谁画的？', subtitle: '一人口述描述一个图形，其他人猜', category: '表演 / 创意', minPlayers: 3, duration: '10分', difficulty: '简单', tags: ['想象','猜词'], modeAffinity: ['funny','icebreaker'], icon: '🎨', isPremium: false, enabled: true },
  { id: 'slideshow-story', title: '故事接龙·一句一图', subtitle: '每人接一句配一张现场拍的照片，看幻灯片', category: '表演 / 创意', minPlayers: 3, duration: '15分', difficulty: '中等', tags: ['创意','拍照'], modeAffinity: ['friends','icebreaker','funny'], icon: '📸', isPremium: false, enabled: true },

  // ============ 反应 / 手速 ============
  { id: 'pass-bomb', title: '传递炸弹', subtitle: '随机倒计时，结束时拿手机的人挑战', category: '反应 / 手速', minPlayers: 3, duration: '10分', difficulty: '简单', tags: ['倒计时','紧张'], modeAffinity: ['funny','drinking'], icon: '💥', isPremium: false, enabled: true },
  { id: 'taboo-word', title: '禁忌词', subtitle: '系统给你一个词不能说，违规接挑战', category: '反应 / 手速', minPlayers: 3, duration: '15分', difficulty: '中等', tags: ['全程','监督'], modeAffinity: ['funny','friends'], icon: '🤐', isPremium: false, enabled: true },
  { id: 'rhythm-clap', title: '节奏拍拍', subtitle: '按系统节奏拍手拍腿，跟不上挑战', category: '反应 / 手速', minPlayers: 2, duration: '5分', difficulty: '简单', tags: ['节奏','身体'], modeAffinity: ['funny','friends'], icon: '👏', isPremium: false, enabled: true },

  // ============ 暧昧 / 心动 ============
  { id: 'heart-radar', title: '心动雷达', subtitle: '所有人同时指：现场你最想……的人', category: '暧昧 / 心动', minPlayers: 3, duration: '10分', difficulty: '简单', tags: ['暧昧','同步'], modeAffinity: ['spicy'], icon: '💘', isPremium: false, enabled: true },
  { id: 'secret-mailbox', title: '真心话信箱', subtitle: '匿名向某人提问，被问的人可跳过', category: '暧昧 / 心动', minPlayers: 3, duration: '15分', difficulty: '中等', tags: ['匿名','真心话'], modeAffinity: ['spicy','friends'], icon: '💌', isPremium: false, enabled: true },

  // ============ 喝酒 / 无酒精 ============
  { id: 'cheers-chain', title: '干杯链', subtitle: '符合条件的人做出动作（自动切换喝/不喝）', category: '喝酒 / 无酒精', minPlayers: 3, duration: '10分', difficulty: '简单', tags: ['全员','切换'], modeAffinity: ['drinking','sober','friends'], icon: '🥂', isPremium: false, enabled: true },
  { id: 'party-rps', title: '派对猜拳', subtitle: '石头剪刀布 + 派对牌（暴击/反弹/保护）', category: '喝酒 / 无酒精', minPlayers: 2, duration: '5分', difficulty: '简单', tags: ['对决','快速'], modeAffinity: ['funny','drinking'], icon: '✊', isPremium: false, enabled: true },

  // ============ 推理游戏 ============
  { id: 'undercover', title: 'Undercover 谁是卧底', subtitle: '迷与伺之争', category: '推理游戏', minPlayers: 3, duration: '15-25分', difficulty: '较难', tags: ['身份','讨论'], modeAffinity: ['friends','funny'], icon: '🕵️', isPremium: false, enabled: true },
  { id: 'secret-location', title: 'Secret Location 间谍地点', subtitle: '猜出现场是哪里', category: '推理游戏', minPlayers: 4, duration: '15-25分', difficulty: '较难', tags: ['身份','隐藏'], modeAffinity: ['friends','funny'], icon: '🗺️', isPremium: false, enabled: true },
  { id: 'mafia-lite', title: 'Mafia Lite 黑手党极速版', subtitle: '五个角色、一夜一白', category: '推理游戏', minPlayers: 5, duration: '20-30分', difficulty: '较难', tags: ['夜晚','投票'], modeAffinity: ['friends'], icon: '🌙', isPremium: false, enabled: true },

  // ============ 派对实验室（新增） ============
  { id: 'vibe-type', title: 'VibeType · 派对人格', subtitle: '12题测出你今晚的派对角色 · 可选盲猜', category: '派对实验室', minPlayers: 2, duration: '5-10分', difficulty: '简单', tags: ['性格','揭晓','传播'], modeAffinity: ['icebreaker','friends','funny'], icon: '🧬', isPremium: false, enabled: true },
  { id: 'who-is-ai', title: '谁是 AI', subtitle: '一人被分配为 AI，要伪装机器魂回答', category: '派对实验室', minPlayers: 4, duration: '10-15分', difficulty: '中等', tags: ['推理','讨论','玩棗'], modeAffinity: ['funny','friends','icebreaker'], icon: '🤖', isPremium: false, enabled: true },
  { id: 'tier-list', title: '现场 Tier List', subtitle: '全场一起给一组东西排 S/A/B/C/D', category: '派对实验室', minPlayers: 2, duration: '10分', difficulty: '简单', tags: ['讨论','共识','吐槽'], modeAffinity: ['friends','funny','icebreaker'], icon: '📊', isPremium: false, enabled: true },
];

export const GAME_CATEGORIES: { id: string; label: string }[] = [
  { id: '热场游戏',       label: '🔥 热场游戏' },
  { id: '派对实验室',   label: '🧬 派对实验室' },
  { id: '反应 / 手速',     label: '⚡ 反应 / 手速' },
  { id: '表演 / 创意',     label: '🎭 表演 / 创意' },
  { id: '投票互动',       label: '🗳️ 投票互动' },
  { id: '暧昧 / 心动',     label: '💘 暧昧 / 心动' },
  { id: '喝酒 / 无酒精', label: '🥂 喝酒 / 无酒精' },
  { id: '运气游戏',       label: '🎲 运气游戏' },
  { id: '推理游戏',       label: '🕵️ 推理游戏' },
];

export function getGame(id: string): GameDefinition | undefined {
  return GAMES.find((g) => g.id === id);
}
