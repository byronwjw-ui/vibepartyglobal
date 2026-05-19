'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePartyStore } from '@/store/usePartyStore';
import { useTurn } from '@/lib/useTurn';
import GameLayout from '@/components/GameLayout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { BOMB_CATEGORIES } from '@/data/zh-CN/passBomb';
import { filterByModeAndLevel } from '@/lib/modeFilter';
import { pick, randomInt } from '@/lib/random';
import { vibrate } from '@/lib/gameUtils';
import { Play, RotateCcw, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PassBombGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const turn = useTurn(players);
  const pool = useMemo(() => filterByModeAndLevel(BOMB_CATEGORIES, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);
  const [category, setCategory] = useState(() => pick(pool.length ? pool : BOMB_CATEGORIES).title);
  const [running, setRunning] = useState(false);
  const [exploded, setExploded] = useState(false);
  const explodeAt = useRef<number>(0);
  const [tick, setTick] = useState(0);

  // 隐藏的倒计时（10-30 秒），玩家看不到剩余时间
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((t) => t + 1), 200);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (!running) return;
    if (Date.now() >= explodeAt.current) {
      setRunning(false);
      setExploded(true);
      vibrate([60, 40, 80]);
    }
  }, [tick, running]);

  const start = () => {
    setCategory(pick(pool.length ? pool : BOMB_CATEGORIES).title);
    setExploded(false);
    explodeAt.current = Date.now() + randomInt(10, 30) * 1000;
    setRunning(true);
  };

  const passAndExplode = () => {
    setRunning(false);
    setExploded(true);
    vibrate([60, 40, 80]);
  };

  return (
    <GameLayout title="传递炸弹 💥"
      footer={(
        <div className="flex gap-2">
          {!running && !exploded && <NeonButton full onClick={start}><Play size={16}/> 点燃炸弹</NeonButton>}
          {running && <NeonButton full variant="danger" onClick={passAndExplode}>炸了！</NeonButton>}
          {exploded && <NeonButton full onClick={() => { turn.next(); start(); }}><ArrowRight size={16}/> 下一位 / 新一轮</NeonButton>}
          {!running && exploded && <NeonButton variant="secondary" onClick={start}><RotateCcw size={16}/> 同一轮重来</NeonButton>}
        </div>
      )}>
      <div className="space-y-4">
        <GlassCard tone="orange" tilt="l">
          <div className="text-xs text-paper-900/70 font-bold">本轮主题</div>
          <div className="text-2xl font-black doodle-title mt-1">{category}</div>
          <div className="mt-2 text-sm font-semibold text-paper-900/85">轮流回答，不能重复，递给下一个人。倒计时随机 10-30 秒，结束时拿着手机的人接挑战。</div>
        </GlassCard>

        <div className="grid place-items-center py-6">
          <motion.div
            animate={running ? { rotate: [-2, 2, -2], scale: [1, 1.02, 1] } : { rotate: 0, scale: 1 }}
            transition={running ? { duration: 0.6, repeat: Infinity } : { duration: 0.2 }}
            className="text-[120px]"
          >
            {exploded ? '💥' : running ? '🧨' : '💣'}
          </motion.div>
          <div className="text-sm font-bold text-paper-900/70 mt-3">
            {!running && !exploded && '准备好就点燃炸弹'}
            {running && '快传给下一位！'}
            {exploded && '炸了！持有人接受随机挑战'}
          </div>
        </div>

        <GlassCard>
          <div className="text-xs text-paper-900/70 font-bold">当前持有者</div>
          <div className="text-lg font-black mt-1">{turn.current?.name ?? '－'}</div>
          <NeonButton size="sm" variant="secondary" className="mt-3" onClick={turn.next}>传给下一位 →</NeonButton>
        </GlassCard>
      </div>
    </GameLayout>
  );
}
