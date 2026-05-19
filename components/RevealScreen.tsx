'use client';
import { useState } from 'react';
import NeonButton from './NeonButton';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export default function RevealScreen({ playerName, label, content, onDone, tone = 'paper' }: { playerName: string; label: string; content: string; onDone: () => void; tone?: 'paper'|'yellow'|'pink'|'cyan'|'lime'|'orange' }) {
  const [revealed, setRevealed] = useState(false);
  const toneCls: Record<string,string> = {
    paper: 'bg-paper-100',
    yellow: 'bg-sticker-yellow',
    pink: 'bg-sticker-pink',
    cyan: 'bg-sticker-cyan',
    lime: 'bg-sticker-lime',
    orange: 'bg-sticker-orange',
  };
  return (
    <div className="px-4 py-8">
      <div className="text-center text-sm text-paper-900/70 font-bold">手机交给</div>
      <div className="text-center text-3xl font-black doodle-title mt-1">{playerName}</div>
      <motion.div
        onClick={() => setRevealed(true)}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 mx-auto h-72 max-w-md rounded-3xl border-3 border-paper-900 shadow-sticker-lg relative cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className={cn('absolute inset-0 grid place-items-center rounded-3xl', toneCls[tone])} style={{ backfaceVisibility: 'hidden' }}>
          <div className="text-center">
            <div className="text-6xl">👀</div>
            <div className="mt-3 font-black text-xl">点击查看身份</div>
            <div className="mt-1 text-xs text-paper-900/70">看完记得点&ldquo;我看完了&rdquo;再传下一位</div>
          </div>
        </div>
        <div className="absolute inset-0 grid place-items-center rounded-3xl bg-paper-50" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
          <div className="text-center px-6">
            <div className="text-sm font-bold text-paper-900/70">{label}</div>
            <div className="mt-3 text-3xl font-black doodle-title break-words">{content}</div>
          </div>
        </div>
      </motion.div>
      <div className="mt-6 max-w-md mx-auto">
        <NeonButton full disabled={!revealed} onClick={onDone} className={!revealed ? 'opacity-40' : ''}>我看完了，传给下一位</NeonButton>
      </div>
    </div>
  );
}
