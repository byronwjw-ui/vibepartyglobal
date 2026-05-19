import type { GameDefinition } from '@/types';

export const GAMES: GameDefinition[] = [
  // 热场
  { id: 'vibe-cards', title: 'Vibe Cards', subtitle: '派对卡牌：随机挑战、反转、保护卡', category: '热场游戏', minPlayers: 2, duration: '10-20分', difficulty: '简单', tags: ['全员','轻松','随机'], icon: '🎴', isPremium: false, enabled: true },
  { id: 'truth-or-dare', title: 'Truth or Dare', subtitle: '真心话大冒险：轻松、搞笑、暧昧', category: '热场游戏', minPlayers: 2, duration: '10-20分', difficulty: '简单', tags: ['经典','互动'], icon: '🔥', isPremium: false, enabled: true },
  { id: 'never-have-i-ever', title: 'Never Have I Ever', subtitle: '我从来没有……做过的举手', category: '热场游戏', minPlayers: 2, duration: '10分', difficulty: '简单', tags: ['破冰','闲聊'], icon: '✋', isPremium: false, enabled: true },
  { id: 'would-you-rather', title: 'Would You Rather', subtitle: '二选一：你会选哪个？', category: '热场游戏', minPlayers: 2, duration: '5-10分', difficulty: '简单', tags: ['投票','思考'], icon: '⚖️', isPremium: false, enabled: true },
  { id: 'five-second', title: 'Five Second Challenge', subtitle: '5秒挑战：快速说出3个答案', category: '热场游戏', minPlayers: 2, duration: '10分', difficulty: '中等', tags: ['节奏','反应'], icon: '⏱️', isPremium: false, enabled: true },
  // 运气
  { id: 'higher-lower', title: 'Higher or Lower', subtitle: '高低牌：猜下一张是更大还是更小', category: '运气游戏', minPlayers: 2, duration: '5-10分', difficulty: '简单', tags: ['牌面','猜测'], icon: '🂠', isPremium: false, enabled: true },
  { id: 'mine-trap', title: 'Mine Trap', subtitle: '地雷陷阱：踩中气氛炸弹接挑战', category: '运气游戏', minPlayers: 2, duration: '5分', difficulty: '简单', tags: ['网格','心跳'], icon: '💣', isPremium: false, enabled: true },
  { id: 'number-bomb', title: 'Number Bomb', subtitle: '数字炸弹：猜中的人接挑战', category: '运气游戏', minPlayers: 2, duration: '5分', difficulty: '简单', tags: ['数字','经典'], icon: '🔢', isPremium: false, enabled: true },
  { id: 'oracle-book', title: 'Oracle Book', subtitle: '答案之书：默念一个问题再翻开', category: '运气游戏', minPlayers: 1, duration: '随意', difficulty: '简单', tags: ['占卜','神秘'], icon: '🔮', isPremium: false, enabled: true },
  // 投票
  { id: 'most-likely-to', title: 'Most Likely To', subtitle: '谁最可能：全场投票选出本场答案', category: '投票互动', minPlayers: 3, duration: '10分', difficulty: '简单', tags: ['投票','夕阳红'], icon: '🗳️', isPremium: false, enabled: true },
  { id: 'hot-seat', title: 'Hot Seat', subtitle: '热座拷问：连玩3、5、7题', category: '投票互动', minPlayers: 3, duration: '10分', difficulty: '中等', tags: ['提问','深聊'], icon: '🪑', isPremium: false, enabled: true },
  { id: 'kings-command', title: "King's Command", subtitle: '国王指令：随机指定编号执行', category: '投票互动', minPlayers: 3, duration: '15分', difficulty: '中等', tags: ['身份','隐藏'], icon: '👑', isPremium: false, enabled: true },
  // 表演
  { id: 'charades', title: 'Charades', subtitle: '你演我猜：只能表演不能说话', category: '表演游戏', minPlayers: 3, duration: '15分', difficulty: '中等', tags: ['表演','计时'], icon: '🎭', isPremium: false, enabled: true },
  // 推理
  { id: 'undercover', title: 'Undercover', subtitle: '谁是卧底：迷与伺之争', category: '推理游戏', minPlayers: 3, duration: '15-25分', difficulty: '较难', tags: ['身份','讨论'], icon: '🕵️', isPremium: false, enabled: true },
  { id: 'secret-location', title: 'Secret Location', subtitle: '间谍地点：猜出现场是哪里', category: '推理游戏', minPlayers: 4, duration: '15-25分', difficulty: '较难', tags: ['身份','隐藏'], icon: '🗺️', isPremium: false, enabled: true },
  { id: 'mafia-lite', title: 'Mafia Lite', subtitle: '黑手党极速版：五个角色、一夜一白', category: '推理游戏', minPlayers: 5, duration: '20-30分', difficulty: '较难', tags: ['夜晚','投票'], icon: '🌙', isPremium: false, enabled: true },
];

export const GAME_CATEGORIES: { id: string; label: string }[] = [
  { id: '热场游戏', label: '热场游戏' },
  { id: '运气游戏', label: '运气游戏' },
  { id: '投票互动', label: '投票互动' },
  { id: '表演游戏', label: '表演游戏' },
  { id: '推理游戏', label: '推理游戏' },
];

export function getGame(id: string): GameDefinition | undefined {
  return GAMES.find((g) => g.id === id);
}
