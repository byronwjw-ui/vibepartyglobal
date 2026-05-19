'use client';
import NeonButton from './NeonButton';
import { SkipForward } from 'lucide-react';

/**
 * 统一跳过按钮：固定样式，所有游戏都用同一个视觉。
 * 默认 full，size=md，主色次按钮。
 */
export default function SkipButton({
  onClick,
  label = '跳过 · 下一位',
  full = true,
  size = 'md',
}: {
  onClick: () => void;
  label?: string;
  full?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <NeonButton variant="secondary" full={full} size={size} onClick={onClick}>
      <SkipForward size={16}/> {label}
    </NeonButton>
  );
}
