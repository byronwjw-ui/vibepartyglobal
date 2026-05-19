'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import TurnIndicator from '@/components/TurnIndicator';
import { CHALLENGES } from '@/data/zh-CN/challenges';
import { pick, randomInt } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { useTurn } from '@/lib/useTurn';
import { vibrate } from '@/lib/gameUtils';
import { filterByModeAndLevel } from '@/lib/modeFilter';

type Card = { v: number; label: string; suit: '♠'|'♥'|'♦'|'♣' };

const LABELS = ['','','2','3','4','5','6','7','8','9','10','J','Q','K','A'];
const SUITS: Card['suit'][] = ['♠','♥','♦','♣'];

function makeCard(): Card {
  const v = randomInt(2, 14);
  return { v, label: LABELS[v], suit: pick(SUITS) };
}

export default function HigherLowerGame() {
  const players = usePartyStore((s) => s.players);
  const bumpScore = usePartyStore((s) => s.bumpScore);
  const settings = usePartyStore((s) => s.settings);
  const { current, next } = useTurn(players);
  const [cur, setCur] = useState<Card>(() => makeCard());
  const [revealing, setRevealing] = useState<Card | null>(null);
  const [streak, setStreak] = useState(0);
  const [penalty, setPenalty] = useState<string>('');
  const [phase, setPhase] = useState<'guess'|'fail'>('guess');

  const penalties = useMemo(() => filterByModeAndLevel(CHALLENGES, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);

  const guess = (g: 'higher' | 'lower' | 'equal') => {
    const nc = makeCard();
    setRevealing(nc);
    setTimeout(() => {
      const correct = g === 'higher' ? nc.v > cur.v : g === 'lower' ? nc.v < cur.v : nc.v === cur.v;
      if (correct) {
        if (current) bumpScore(current.id, 1);
        setStreak((s) => s + 1);
        if (settings.vibrationEnabled) vibrate(20);
        setCur(nc); setRevealing(null); next();
      } else {
        setPenalty(pick(penalties.length ? penalties : CHALLENGES).text);
        setStreak(0);
        setPhase('fail');
      }
    }, 600);
  };

  const continueFail = () => { setCur(makeCard()); setRevealing(null); setPenalty(''); setPhase('guess'); next(); };

  const isRed = (s: Card['suit']) => s === '♥' || s === '♦';

  return (
    <GameLayout title="高低牌 🃏" rules="猜下一张是更大 / 更小 / 相同">
      <TurnIndicator player={current} label="本轮玩家" />
      <div className="py-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-paper-900/70">当前牌</div>
          {streak > 0 && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-xs font-black px-3 py-1 rounded-full border-2 border-paper-900 bg-sticker-yellow shadow-sticker-sm">
              🔥 连对 {streak}
            </motion.div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <CardView card={cur} />
          <AnimatePresence mode="wait">
            {revealing ? (
              <motion.div key={`${revealing.v}-${revealing.suit}`} initial={{ rotateY: -180, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <CardView card={revealing} />
              </motion.div>
            ) : (
              <div className="sticker p-4 grid place-items-center bg-paper-50">
                <div className="text-5xl">?</div>
              </div>
            )}
          </AnimatePresence>
        </div>
        {phase === 'guess' && !revealing && (
          <div className="grid grid-cols-3 gap-2">
            <NeonButton size="lg" variant="secondary" onClick={() => guess('lower')}>↓ 更小</NeonButton>
            <NeonButton size="lg" variant="secondary" onClick={() => guess('equal')}>= 相同</NeonButton>
            <NeonButton size="lg" onClick={() => guess('higher')}>↑ 更大</NeonButton>
          </div>
        )}
        {phase === 'fail' && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="sticker p-5 bg-sticker-pink">
            <div className="text-center text-3xl mb-1">💥</div>
            <div className="text-center text-sm font-bold text-paper-900/70 mb-2">{current?.name} 猜错 · 轻挑战</div>
            <div className="font-black text-center">{penalty}</div>
            <NeonButton full size="lg" onClick={continueFail} className="mt-3">下一位</NeonButton>
          </motion.div>
        )}
      </div>
    </GameLayout>
  );
}

function CardView({ card }: { card: { v: number; label: string; suit: '♠'|'♥'|'♦'|'♣' } }) {
  const red = card.suit === '♥' || card.suit === '♦';
  return (
    <div className={`sticker p-4 grid place-items-center min-h-[140px] ${red ? 'bg-sticker-pink' : 'bg-paper-50'}`}>
      <div className={`text-5xl font-black doodle-title ${red ? 'text-red-700' : 'text-paper-900'}`}>{card.label}</div>
      <div className={`text-3xl mt-1 ${red ? 'text-red-700' : 'text-paper-900'}`}>{card.suit}</div>
    </div>
  );
}
