'use client';
import { motion, AnimatePresence } from 'framer-motion';
import type { Player } from '@/types';

/**
 * "轮到谁"的统一头部指示。游戏内顶部使用，确保所有打磨游戏看起来一致。
 * - 大字玩家名 + 头像色块
 * - round / total 可选小角标
 */
export default function TurnIndicator({
  player,
  round,
  totalRounds,
  label = '本轮玩家',
}: {
  player?: Player;
  round?: number;
  totalRounds?: number;
  label?: string;
}) {
  if (!player) return null;
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <motion.div
        key={player.id}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16 }}
        className="h-12 w-12 rounded-2xl border-3 border-paper-900 grid place-items-center text-base font-black shadow-sticker-sm"
        style={{ background: player.avatarColor }}
      >
        {player.name.slice(0, 2)}
      </motion.div>
      <div className="text-left">
        <div className="text-[10px] font-black text-paper-900/60 uppercase tracking-wide">{label}</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={player.id}
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -6, opacity: 0 }}
            className="text-2xl font-black doodle-title text-paper-900 leading-tight"
          >
            {player.name}
          </motion.div>
        </AnimatePresence>
        {typeof round === 'number' && (
          <div className="text-[11px] font-bold text-paper-900/60 mt-0.5">
            第 {round}{typeof totalRounds === 'number' ? ` / ${totalRounds}` : ''} 轮
          </div>
        )}
      </div>
    </div>
  );
}
