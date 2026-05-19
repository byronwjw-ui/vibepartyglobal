import type { ContentLevel, PartyMode, ModeTag } from '@/types';

/**
 * 与模式是否匹配：包含 'all' 或明确含当前模式则进入候选。
 */
export function matchesMode(modeTags: ModeTag[] | undefined, mode: PartyMode): boolean {
  if (!modeTags || !modeTags.length) return true;
  if (modeTags.includes('all')) return true;
  return modeTags.includes(mode);
}

/**
 * 内容强度与模式的默认可用强度序。
 * - spicy/drinking 允许 spicy
 * - 其他默认到 funny
 */
export function defaultAllowedLevels(mode: PartyMode): ContentLevel[] {
  switch (mode) {
    case 'spicy':
    case 'drinking':
      return ['soft', 'funny', 'spicy'];
    default:
      return ['soft', 'funny'];
  }
}

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
 * 兜底：把老题库的中文 tags（朋友/搞笑/暧昧/破冰/校园/职场）映射成 modeTags。
 * 这样不用重写每一行题，模式也能真正起作用。
 */
const TAG_TO_MODE: Record<string, ModeTag[]> = {
  '朋友': ['friends', 'icebreaker', 'funny', 'sober', 'drinking'],
  '搞笑': ['funny', 'friends'],
  '暧昧': ['spicy'],
  '破冰': ['icebreaker', 'friends', 'sober'],
  '校园': ['icebreaker', 'funny', 'friends'],
  '职场': ['icebreaker', 'funny', 'friends'],
  '全员': ['friends', 'funny', 'icebreaker', 'spicy', 'sober', 'drinking'],
  '轻松': ['friends', 'icebreaker', 'sober', 'funny'],
  '随机': ['friends', 'funny', 'icebreaker'],
};

export function inferModeTagsFromTags(tags?: string[]): ModeTag[] | undefined {
  if (!tags || !tags.length) return undefined;
  const out = new Set<ModeTag>();
  for (const t of tags) {
    const mapped = TAG_TO_MODE[t];
    if (mapped) mapped.forEach((m) => out.add(m));
  }
  return out.size ? Array.from(out) : undefined;
}

/**
 * 通用过滤器：支持显式 modeTags，或从中文 tags 推断。
 */
export function filterByModeAndLevel<T extends { level?: ContentLevel; modeTags?: ModeTag[]; tags?: string[] }>(
  items: T[],
  mode: PartyMode,
  level: ContentLevel,
): T[] {
  const levels = new Set(effectiveLevels(mode, level));
  const out = items.filter((it) => {
    const lvOk = it.level ? levels.has(it.level) : true;
    const modeTags = it.modeTags ?? inferModeTagsFromTags(it.tags);
    const mtOk = matchesMode(modeTags, mode);
    return lvOk && mtOk;
  });
  // 兜底：过滤后太空，回退只看 level
  if (out.length >= Math.max(8, Math.floor(items.length * 0.1))) {
    return stripBoozeIfSober(out, mode);
  }
  return stripBoozeIfSober(items.filter((it) => (it.level ? levels.has(it.level) : true)), mode);
}

/** 酒精关键字 — 用于"无酒精局"过滤 */
const BOOZE_RE = /(酒(?!店|楼|吧台|窝)|啤酒|拼酒|劝酒|喝一口|酒精|麦酒|香槟|鸡尾酒|小酌|伏特加|威士忌|龙舌兰|清酒|烧酒)/;
export function isBoozeText(text: string) { return BOOZE_RE.test(text); }

export function stripBoozeIfSober<T extends { text?: string }>(items: T[], mode: PartyMode): T[] {
  if (mode !== 'sober') return items;
  return items.filter((it) => !it.text || !isBoozeText(it.text));
}

/**
 * 喝酒 / 无酒精双文案切换（占位 {drink}）。
 */
export function localizeDrinkCopy(text: string, mode: PartyMode, drinkingEnabled: boolean): string {
  if (!text.includes('{drink}')) return text;
  if (mode === 'drinking' && drinkingEnabled) return text.replace(/\{drink\}/g, '小酌一口');
  if (mode === 'sober') return text.replace(/\{drink\}/g, '做一个鬼脸');
  return text.replace(/\{drink\}/g, '拍一下手');
}
