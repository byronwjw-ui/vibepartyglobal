'use client';
import { usePartyStore } from '@/store/usePartyStore';
import { MODE_THEME } from '@/lib/constants';

/** 读取当前模式 + 主题色的便捷 hook */
export function useThemedMode() {
  const settings = usePartyStore((s) => s.settings);
  const theme = MODE_THEME[settings.mode];
  return { mode: settings.mode, drinking: settings.drinkingEnabled, level: settings.contentLevel, theme };
}
