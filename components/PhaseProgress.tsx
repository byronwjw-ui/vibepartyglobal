'use client';
import { motion } from 'framer-motion';

/**
 * 阶段进度条 + 文字说明
 * 用于：VibeType / 谁是 AI / 其他多阶段游戏
 */
export default function PhaseProgress({
  value,
  total,
  label,
  tone = 'pink',
}: {
  value: number;
  total: number;
  label?: string;
  tone?: 'pink' | 'cyan' | 'yellow' | 'lime' | 'orange';
}) {
  const pct = total > 0 ? Math.min(100, Math.max(0, (value / total) * 100)) : 0;
  const toneCls: Record<string, string> = {
    pink:   'bg-sticker-pink',
    cyan:   'bg-sticker-cyan',
    yellow: 'bg-sticker-yellow',
    lime:   'bg-sticker-lime',
    orange: 'bg-sticker-orange',
  };
  return (
    <div>
      {label && (
        <div className="flex items-center justify-between mb-1 px-1">
          <div className="text-[11px] font-black text-paper-900/70">{label}</div>
          <div className="text-[11px] font-black text-paper-900/70">{value} / {total}</div>
        </div>
      )}
      <div className="h-3 rounded-full border-3 border-paper-900 bg-paper-50 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className={`h-full ${toneCls[tone]}`}
        />
      </div>
    </div>
  );
}
