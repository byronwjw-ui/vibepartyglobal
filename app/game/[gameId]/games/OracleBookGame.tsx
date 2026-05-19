'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import { ORACLE_ANSWERS } from '@/data/zh-CN/oracle';
import { pick, randomId } from '@/lib/random';
import { vibrate } from '@/lib/gameUtils';

export default function OracleBookGame() {
  const [answer, setAnswer] = useState<{ k: string; text: string } | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [count, setCount] = useState(0);

  const reveal = () => {
    setFlipping(true);
    vibrate(15);
    setTimeout(() => {
      setAnswer({ k: randomId(), text: pick(ORACLE_ANSWERS) });
      setCount((c) => c + 1);
      setFlipping(false);
    }, 700);
  };

  return (
    <GameLayout title="答案之书 📖" rules={`默念一个问题，然后翻开。已翻 ${count} 页。`}>
      <div className="py-6 grid place-items-center min-h-[280px]">
        <AnimatePresence mode="wait">
          {flipping ? (
            <motion.div
              key="flip"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 180 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="sticker p-10 bg-neon-grad text-paper-50 text-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="text-6xl">📖</div>
              <div className="font-black mt-2 doodle-title">翻开中…</div>
            </motion.div>
          ) : answer ? (
            <motion.div
              key={answer.k}
              initial={{ scale: 0.7, opacity: 0, rotateY: -30 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 16 }}
              className="sticker p-8 text-center min-h-[220px] grid place-items-center bg-sticker-yellow w-full"
            >
              <div>
                <div className="text-xs font-bold text-paper-900/70 mb-2">答案是</div>
                <div className="text-2xl font-black doodle-title leading-relaxed text-paper-900">“{answer.text}”</div>
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="closed"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: [-1, 1, -1], y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              onClick={reveal}
              className="sticker p-10 bg-neon-grad text-paper-50 text-center cursor-pointer"
            >
              <div className="text-7xl">📖</div>
              <div className="font-black mt-2 text-xl doodle-title">点击翻开</div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <NeonButton size="lg" variant="secondary" onClick={() => { setAnswer(null); setCount(0); }}>重置</NeonButton>
        <NeonButton size="lg" onClick={reveal}>{answer ? '再抽一条' : '翻开答案'}</NeonButton>
      </div>
      <div className="mt-3 text-center text-xs font-bold text-paper-900/50">答案仅供佐酒剧本，不代表现实决策。</div>
    </GameLayout>
  );
}
