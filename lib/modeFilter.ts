import type { ContentLevel, PartyMode, ModeTag } from '@/types';

/**
 * 与模式是否匹配：包含 'all' 或明确含当前模式则进入候选。
 * 主调用于各题库转化的统一接口。
 */
export function matchesMode(modeTags: ModeTag[] | undefined, mode: PartyMode): boolean {
  if (!modeTags || !modeTags.length) return true; // 未标默认通用
  if (modeTags.includes('all')) return true;
  return modeTags.includes(mode);
}

/**
 * 内容强度与模式的默认可用强度序。
 * - sober/icebreaker/friends/funny：默认不跳出 spicy
 * - spicy/drinking：允许 spicy
 * - 用户手动 contentLevel 会在 store 覆盖
 */
export function defaultAllowedLevels(mode: PartyMode): ContentLevel[] {
  switch (mode) {
    case 'spicy':
    case 'drinking':
      return ['soft', 'funny', 'spicy'];
    case 'funny':
      return ['soft', 'funny'];
    case 'icebreaker':
    case 'friends':
    case 'sober':
      return ['soft', 'funny'];
    default:
      return ['soft', 'funny'];
  }
}

/**
 * 根据用户选择的 contentLevel 进一步限制。
 * - contentLevel='soft'：只 soft
 * - contentLevel='funny'： soft + funny
 * - contentLevel='spicy'： soft + funny + spicy
 */
export function levelsForContent(level: ContentLevel): ContentLevel[] {
  if (level === 'soft') return ['soft'];
  if (level === 'funny') return ['soft', 'funny'];
  return ['soft', 'funny', 'spicy'];
}

export function effectiveLevels(mode: PartyMode, level: ContentLevel): ContentLevel[] {
  const a = new Set(defaultAllowedLevels(mode));
  const b = new Set(levelsForContent(level));
  return Array.from(a).filter((x) => b.has(x));
}

/**
 * 通用过滤器：适用于带有 { level, modeTags? } 的列表项
 */
export function filterByModeAndLevel<T extends { level?: ContentLevel; modeTags?: ModeTag[] }>(
  items: T[],
  mode: PartyMode,
  level: ContentLevel,
): T[] {
  const levels = new Set(effectiveLevels(mode, level));
  const out = items.filter((it) => {
    const lvOk = it.level ? levels.has(it.level) : true;
    const mtOk = matchesMode(it.modeTags, mode);
    return lvOk && mtOk;
  });
  // 充底：如果过滤后太空，退回只看 level，避免玩到一半抽不出题
  if (out.length >= Math.max(8, Math.floor(items.length * 0.1))) return out;
  return items.filter((it) => (it.level ? levels.has(it.level) : true));
}

/**
 * 酒精关键字检测— 用于“无酒精局”过滤。
 */
const BOOZE_RE = /(酒|喇酒|拼酒|喝一口|酒精|麥酒|香槟|鸡尾酒|小酯|伏特加|威士忌|廈门|酒后驾|廅酒|麦酒|责酒)/;
export function isBoozeText(text: string) { return BOOZE_RE.test(text); }

/** 在 sober 模式下去除任何与酒精明确相关的项 */
export function stripBoozeIfSober<T extends { text?: string }>(items: T[], mode: PartyMode): T[] {
  if (mode !== 'sober') return items;
  return items.filter((it) => !it.text || !isBoozeText(it.text));
}

/**
 * 喝酒 / 无酒精双文案切换。默认文案采用中性表述。
 * - 喝酒模式：允许主动迫加 “可选：小酌一口” 后缀
 * - 无酒精 / 其他模式：使用 “做鬼脸 / 拍一下手” 替代
 */
export function localizeDrinkCopy(text: string, mode: PartyMode, drinkingEnabled: boolean): string {
  // 只处理含有占位 {drink} 的文案；另一些题库不动
  if (!text.includes('{drink}')) return text;
  if (mode === 'drinking' && drinkingEnabled) return text.replace('{drink}', '小酌一口');
  if (mode === 'sober') return text.replace('{drink}', '做一个鬼脸');
  return text.replace('{drink}', '拍一下手');
}
