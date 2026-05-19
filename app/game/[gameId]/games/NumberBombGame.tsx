'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import { CHALLENGES } from '@/data/zh-CN/challenges';
import { pick, randomInt } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { useTurn } from '@/lib/useTurn';
import { vibrate } from '@/lib/gameUtils';
import { filterByModeAndLevel } from '@/lib/modeFilter';

export default function NumberBombGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const { current, next, reset: resetTurn } = useTurn(players);
  const [bomb, setBomb] = useState<number>(() => randomInt(1, 100));
  const [low, setLow] = useState(1);
  const [high, setHigh] = useState(100);
  const [guess, setGuess] = useState('');
  const [hit, setHit] = useState(false);
  const [penalty, setPenalty] = useState<string>('');

  const penalties = useMemo(() => filterByModeAndLevel(CHALLENGES, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);

  const submit = () => {
    const n = parseInt(guess, 10);
    if (Number.isNaN(n) || n < low || n > high) { setGuess(''); return; }
    if (n === bomb) {
      setHit(true);
      if (settings.vibrationEnabled) vibrate([30, 60, 120]);
      setPenalty(pick(penalties.length ? penalties : CHALLENGES).text);
    } else if (n < bomb) { setLow(n + 1); next(); }
    else { setHigh(n - 1); next(); }
    setGuess('');
  };

  const restart = () => { setBomb(randomInt(1, 100)); setLow(1); setHigh(100); setHit(false); setPenalty(''); setGuess(''); resetTurn(); };

  return (
    <GameLayout title="数字炸弹 🔢" currentPlayer={current?.name} rules={`输入 ${low} 到 ${high} 之间的数字；猜中有轻挑战。`}>
      <div className="py-4 space-y-4">
        <div className="sticker p-6 text-center bg-sticker-yellow">
          <div className="text-xs font-bold text-paper-900/70">当前范围</div>
          <div className="text-4xl font-black doodle-title mt-1">{low} ~ {high}</div>
        </div>
        {!hit ? (
          <>
            <div className="flex gap-2">
              <input inputMode="numeric" pattern="[0-9]*" value={guess} onChange={(e) => setGuess(e.target.value.replace(/[^0-9]/g, ''))} placeholder="输入一个数字" className="flex-1 h-14 px-4 rounded-2xl bg-paper-50 border-3 border-paper-900 text-xl text-center font-black outline-none focus:bg-sticker-yellow"/>
              <NeonButton size="lg" onClick={submit}>猜</NeonButton>
            </div>
            <div className="text-center text-xs font-bold text-paper-900/60">猜错会缩小范围，轮到下一位。</div>
          </>
        ) : (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="sticker p-6 bg-sticker-pink">
            <div className="text-center">
              <div className="text-6xl mb-2">💥</div>
              <div className="text-2xl font-black doodle-title">{current?.name} 中弹了</div>
              <div className="text-xs font-bold text-paper-900/70 mt-1">炸弹数字是 {bomb}</div>
              <div className="mt-4 sticker-sm p-4 bg-paper-50">
                <div className="text-xs font-bold text-paper-900/70 mb-1">轻挑战</div>
                <div className="font-black">{penalty}</div>
              </div>
            </div>
          </motion.div>
        )}
        <div className="grid grid-cols-2 gap-2">
          <NeonButton variant="secondary" size="lg" onClick={restart}>重新开始</NeonButton>
          {hit && <NeonButton size="lg" onClick={restart}>再来一局</NeonButton>}
        </div>
      </div>
    </GameLayout>
  );
}
