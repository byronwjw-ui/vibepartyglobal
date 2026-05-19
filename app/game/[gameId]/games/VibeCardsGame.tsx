'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import SkipButton from '@/components/SkipButton';
import TurnIndicator from '@/components/TurnIndicator';
import HandoffScreen from '@/components/HandoffScreen';
import { VIBE_CARDS, type VibeCard } from '@/data/zh-CN/vibeCards';
import { pick, randomId } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { useTurn } from '@/lib/useTurn';
import { vibrate } from '@/lib/gameUtils';
import { filterByModeAndLevel } from '@/lib/modeFilter';

const TYPE_META: Record<VibeCard['type'], { label: string; emoji: string; tone: string }> = {
  challenge: { label: '挑战', emoji: '🔥', tone: 'bg-sticker-pink' },
  vote:      { label: '投票', emoji: '🗳️', tone: 'bg-sticker-cyan' },
  rule:      { label: '规则', emoji: '📏', tone: 'bg-sticker-yellow' },
  flip:      { label: '反转', emoji: '🔄', tone: 'bg-sticker-orange' },
  shield:    { label: '保护', emoji: '🛡️', tone: 'bg-paper-50' },
  all:       { label: '全员', emoji: '🎉', tone: 'bg-sticker-mint' },
};

export default function VibeCardsGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const { current, next } = useTurn(players);
  const [card, setCard] = useState<(VibeCard & { k: string }) | null>(null);
  const [recent, setRecent] = useState<string[]>([]);
  const [drawn, setDrawn] = useState(0);
  const [handoff, setHandoff] = useState(false);

  const pool = useMemo(() => filterByModeAndLevel(VIBE_CARDS, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);

  const draw = () => {
    vibrate(15);
    const usable = (pool.length ? pool : VIBE_CARDS).filter((c) => !recent.includes(c.text));
    const base = usable.length ? usable : (pool.length ? pool : VIBE_CARDS);
    const c = pick(base);
    setCard({ ...c, k: randomId() });
    setRecent((r) => [c.text, ...r].slice(0, 24));
    setDrawn((d) => d + 1);
  };

  const advance = () => { setCard(null); next(); setHandoff(true); };

  return (
    <GameLayout title="Vibe Cards 派对卡牌 🎴" rules={`已抽 ${drawn} 张· 轮到下一位玩家抽卡`}>
      <TurnIndicator player={current} label="本轮抽卡" />
      <AnimatePresence mode="wait">
        {card ? (
          <motion.div
            key={card.k}
            initial={{ rotateY: -180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 180, opacity: 0 }}
            transition={{ duration: 0.55, type: 'spring', stiffness: 120 }}
            className="py-4"
          >
            <div className={`sticker p-6 ${TYPE_META[card.type].tone}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-black px-2 py-0.5 rounded-full border-2 border-paper-900 bg-paper-50">
                  {TYPE_META[card.type].emoji} {TYPE_META[card.type].label}卡
                </span>
                <span className="text-[10px] font-bold text-paper-900/60">轮到 {current?.name}</span>
              </div>
              <div className="text-xl font-black doodle-title leading-relaxed text-paper-900">{card.text}</div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <SkipButton onClick={advance} label="跳过 · 下一位" />
              <NeonButton onClick={advance}>✓ 完成 · 下一位</NeonButton>
            </div>
            <div className="mt-2">
              <NeonButton variant="secondary" size="sm" full onClick={draw}>🔄 重抽一张</NeonButton>
            </div>
          </motion.div>
        ) : (
          <motion.div key="deck" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-6 grid place-items-center">
            <motion.button
              whileTap={{ scale: 0.95, rotate: -2 }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              onClick={draw}
              className="sticker p-10 bg-neon-grad text-paper-50 cursor-pointer"
            >
              <div className="text-6xl mb-2 text-center">🎴</div>
              <div className="text-xl font-black doodle-title text-center">点击抽卡</div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      {current && (
        <HandoffScreen open={handoff} nextPlayerName={current.name} hint="轮到你抽一张" seconds={2} onDone={() => setHandoff(false)} />
      )}
    </GameLayout>
  );
}
