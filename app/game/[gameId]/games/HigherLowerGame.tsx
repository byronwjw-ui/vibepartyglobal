'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import ScoreBoard from '@/components/ScoreBoard';
import { CHALLENGES } from '@/data/zh-CN/challenges';
import { pick, randomInt } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { useTurn } from '@/lib/useTurn';
import { filterByModeAndLevel } from '@/lib/modeFilter';

const FACES = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
const SUITS = ['♠','♥','♦','♣'];

function drawCard() {
  const v = randomInt(0, FACES.length - 1);
  const s = SUITS[randomInt(0, 3)];
  return { v, face: FACES[v], suit: s, isRed: s === '♥' || s === '♦' };
}

export default function HigherLowerGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const bumpScore = usePartyStore((s) => s.bumpScore);
  const { current, next } = useTurn(players);
  const [card, setCard] = useState(() => drawCard());
  const [streak, setStreak] = useState(0);
  const [penalty, setPenalty] = useState<string | null>(null);

  const penalties = useMemo(() => filterByModeAndLevel(CHALLENGES, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);

  const guess = (kind: 'higher' | 'lower' | 'equal') => {
    const nextCard = drawCard();
    let correct = false;
    if (kind === 'higher') correct = nextCard.v > card.v;
    if (kind === 'lower') correct = nextCard.v < card.v;
    if (kind === 'equal') correct = nextCard.v === card.v;
    setCard(nextCard);
    if (correct) { if (current) bumpScore(current.id, 1); setStreak((s) => s + 1); setPenalty(null); next(); }
    else { setStreak(0); setPenalty(pick(penalties.length ? penalties : CHALLENGES).text); }
  };

  return (
    <GameLayout title="高低牌 🂠" currentPlayer={current?.name} rules="猜下一张牌是更大、更小还是相同。A 最大。">
      <div className="py-4 grid place-items-center">
        <AnimatePresence mode="wait">
          <motion.div key={card.face + card.suit + Math.random()} initial={{ rotateY: -90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="sticker w-44 aspect-[3/4] grid place-items-center bg-paper-50">
            <div className="text-center">
              <div className={`text-7xl font-black ${card.isRed ? 'text-sticker-red' : 'text-paper-900'}`}>{card.face}</div>
              <div className={`text-3xl ${card.isRed ? 'text-sticker-red' : 'text-paper-900/80'}`}>{card.suit}</div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-3 text-xs font-bold text-paper-900/70">连胜：<b className="text-paper-900">{streak}</b></div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-2">
        <NeonButton variant="secondary" onClick={() => guess('lower')}>更小</NeonButton>
        <NeonButton onClick={() => guess('equal')}>相同</NeonButton>
        <NeonButton variant="secondary" onClick={() => guess('higher')}>更大</NeonButton>
      </div>
      {penalty && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 sticker p-5 bg-sticker-pink">
          <div className="text-xs font-bold text-paper-900/70 mb-1">{current?.name} 猜错了 · 轻挑战</div>
          <div className="font-black">{penalty}</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <NeonButton variant="secondary" onClick={() => { setPenalty(null); next(); }}>跳过</NeonButton>
            <NeonButton onClick={() => { setPenalty(null); next(); }}>完成</NeonButton>
          </div>
        </motion.div>
      )}
      <div className="mt-4"><ScoreBoard players={players} /></div>
    </GameLayout>
  );
}
