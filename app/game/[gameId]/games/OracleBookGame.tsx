'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import { ORACLE_ANSWERS } from '@/data/zh-CN/oracle';
import { pick, randomId } from '@/lib/random';
import { vibrate } from '@/lib/gameUtils';
import { usePartyStore } from '@/store/usePartyStore';

export default function OracleBookGame() {
  const settings = usePartyStore((s) => s.settings);
  const [answer, setAnswer] = useState<{ k: string; t: string } | null>(null);
  const [flipping, setFlipping] = useState(false);

  const reveal = () => {
    if (settings.vibrationEnabled) vibrate(20);
    setFlipping(true);
    setTimeout(() => {
      setAnswer({ k: randomId(), t: pick(ORACLE_ANSWERS) });
      setFlipping(false);
    }, 350);
  };

  return (
    <GameLayout title="Oracle Book 答案之书" rules="心里默念一个问题，再翻开答案。">
      <div className="grid place-items-center py-6">
        <div className="text-center text-sm text-white/60 mb-4">先在心里默念一个问题</div>
        <div className="relative w-full max-w-sm aspect-[3/4]">
          <AnimatePresence mode="wait">
            {!answer ? (
              <motion.div
                key="cover"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 glass grid place-items-center text-center p-8"
                style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(34,211,238,0.15))' }}
              >
                <div>
                  <div className="text-5xl mb-3">🔮</div>
                  <div className="text-xl font-black neon-text">Oracle Book</div>
                  <div className="text-xs text-white/60 mt-2">让它替你回答</div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={answer.k}
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 glass grid place-items-center p-8 text-center"
              >
                <div className="text-xl leading-relaxed font-semibold">{answer.t}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <NeonButton full size="lg" onClick={reveal} disabled={flipping}>
          {answer ? '再翻一次' : '翻开答案'}
        </NeonButton>
        {answer && (
          <NeonButton variant="secondary" size="lg" onClick={() => setAnswer(null)}>合上</NeonButton>
        )}
      </div>
    </GameLayout>
  );
}
