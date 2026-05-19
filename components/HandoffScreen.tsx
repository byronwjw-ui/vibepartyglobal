'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { vibrate } from '@/lib/gameUtils';

/**
 * 传手机仪式页（Option B）
 * - 全屏变暗
 * - 大字“传给 XXX” + 倒数 3 秒
 * - 点任意处可提前跳过
 * - 倍主用于：VibeType / 谁是 AI / 谁是卧底 / 黑手党 等需要在玩家间传递手机的阶段
 */
export default function HandoffScreen({
  nextPlayerName,
  hint,
  open,
  onDone,
  seconds = 3,
}: {
  nextPlayerName: string;
  /** 可选提示，例如“查看你的词” / “完成你的测试” */
  hint?: string;
  open: boolean;
  onDone: () => void;
  seconds?: number;
}) {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    if (!open) return;
    setCount(seconds);
    vibrate(30);
    const id = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(id);
          setTimeout(() => onDone(), 150);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onDone}
          className="fixed inset-0 z-50 grid place-items-center cursor-pointer"
          style={{ background: 'rgba(11,6,20,0.92)' }}
        >
          <div className="px-6 text-center">
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="text-paper-50/80 text-sm font-bold tracking-wide"
            >
              📲 请传手机给
            </motion.div>
            <motion.div
              key={nextPlayerName}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 14 }}
              className="mt-3 text-5xl font-black text-paper-50 leading-tight"
            >
              {nextPlayerName}
            </motion.div>
            {hint && (
              <motion.div
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="mt-4 text-paper-50/70 font-semibold text-base"
              >
                {hint}
              </motion.div>
            )}
            <motion.div
              key={count}
              initial={{ scale: 1.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-8 text-7xl font-black"
              style={{ color: '#FFD93D' }}
            >
              {count > 0 ? count : '·'}
            </motion.div>
            <div className="mt-6 text-paper-50/50 text-xs font-bold">点击任意处跳过</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
