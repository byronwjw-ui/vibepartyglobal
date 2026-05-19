'use client';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import { CHALLENGES } from '@/data/zh-CN/challenges';
import { pick, pickN } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { useTurn } from '@/lib/useTurn';
import { vibrate } from '@/lib/gameUtils';
import { filterByModeAndLevel } from '@/lib/modeFilter';

type Difficulty = 'easy' | 'normal' | 'hard';
const SIZE = 16;
const MINE_COUNT: Record<Difficulty, number> = { easy: 1, normal: 2, hard: 3 };

export default function MineTrapGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const { current, next } = useTurn(players);
  const [diff, setDiff] = useState<Difficulty>('normal');
  const [mines, setMines] = useState<number[]>(() => pickN(Array.from({ length: SIZE }, (_, i) => i), MINE_COUNT['normal']));
  const [opened, setOpened] = useState<number[]>([]);
  const [hit, setHit] = useState<number | null>(null);
  const [penalty, setPenalty] = useState<string>('');

  const penalties = useMemo(() => filterByModeAndLevel(CHALLENGES, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);

  const reset = (d: Difficulty = diff) => {
    setMines(pickN(Array.from({ length: SIZE }, (_, i) => i), MINE_COUNT[d]));
    setOpened([]); setHit(null); setPenalty('');
  };
  useEffect(() => { reset(diff); /* eslint-disable-next-line */ }, [diff]);

  const click = (i: number) => {
    if (hit !== null || opened.includes(i)) return;
    if (mines.includes(i)) {
      setHit(i);
      if (settings.vibrationEnabled) vibrate([40, 80, 40, 80]);
      setPenalty(pick(penalties.length ? penalties : CHALLENGES).text);
    } else {
      setOpened((o) => [...o, i]);
      next();
    }
  };

  const cells = useMemo(() => Array.from({ length: SIZE }, (_, i) => i), []);
  const TONES = ['bg-sticker-yellow','bg-sticker-pink','bg-sticker-cyan','bg-sticker-lime','bg-sticker-orange','bg-sticker-purple/60','bg-sticker-coral','bg-sticker-teal'];

  return (
    <GameLayout title="地雷陷阱 💣" currentPlayer={current?.name} rules="轮流点格子，踩到「气氛炸弹」接受轻挑战。">
      <div className="flex gap-2 mt-2">
        {(['easy','normal','hard'] as const).map((d) => (
          <button key={d} onClick={() => setDiff(d)} className={`flex-1 h-10 rounded-2xl text-sm font-black border-3 border-paper-900 press-down ${diff === d ? 'bg-sticker-yellow shadow-sticker' : 'bg-paper-50 shadow-sticker-sm'}`}>
            {d === 'easy' ? '简单 1雷' : d === 'normal' ? '普通 2雷' : '刺激 3雷'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4">
        {cells.map((i) => {
          const isOpen = opened.includes(i);
          const isHit = hit === i;
          return (
            <motion.button key={i} whileTap={{ scale: 0.92 }} onClick={() => click(i)}
              className={`aspect-square rounded-2xl border-3 border-paper-900 text-2xl grid place-items-center font-black press-down ${isHit ? 'bg-sticker-red shadow-sticker' : isOpen ? `${TONES[i % TONES.length]} shadow-sticker-sm` : 'bg-paper-100 shadow-sticker-sm'}`}>
              {isHit ? '💥' : isOpen ? '✨' : ''}
            </motion.button>
          );
        })}
      </div>

      {hit !== null && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 sticker p-5 bg-sticker-pink">
          <div className="text-xs font-bold text-paper-900/70 mb-1">{current?.name} 踩到 Bad Vibe 了 · 轻挑战</div>
          <div className="font-black">{penalty}</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <NeonButton variant="secondary" onClick={() => { reset(); next(); }}>跳过重开</NeonButton>
            <NeonButton onClick={() => { reset(); next(); }}>完成重开</NeonButton>
          </div>
        </motion.div>
      )}
    </GameLayout>
  );
}
