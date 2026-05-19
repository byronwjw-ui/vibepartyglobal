'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NeonButton from './NeonButton';

/**
 * 统一的"本局结束"屏。
 * - 每个游戏在玩家自然结束时调用，给予一致的出口。
 * - 三个按钮：再来一局 / 换个游戏 / 返回大厅
 */
export default function GameEndScreen({
  title = '本局结束',
  emoji = '🎉',
  subtitle,
  stats,
  onRestart,
}: {
  title?: string;
  emoji?: string;
  subtitle?: string;
  stats?: { label: string; value: string | number }[];
  onRestart: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      className="py-6 space-y-4"
    >
      <div className="sticker p-6 text-center bg-sticker-yellow tilt-r-sm">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="text-6xl"
        >
          {emoji}
        </motion.div>
        <div className="mt-2 text-2xl font-black doodle-title text-paper-900">{title}</div>
        {subtitle && <div className="mt-1 text-sm font-bold text-paper-900/70">{subtitle}</div>}
        {stats && stats.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {stats.map((s, i) => (
              <div key={i} className="border-3 border-paper-900 rounded-2xl bg-paper-50 p-2">
                <div className="text-[10px] font-bold text-paper-900/60">{s.label}</div>
                <div className="text-lg font-black text-paper-900">{s.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <NeonButton size="md" variant="secondary" onClick={onRestart}>🔄 再来</NeonButton>
        <Link href="/lobby" className="contents"><NeonButton size="md" variant="secondary" full>🎲 换个</NeonButton></Link>
        <Link href="/lobby" className="contents"><NeonButton size="md" full>← 大厅</NeonButton></Link>
      </div>
    </motion.div>
  );
}
