'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import SkipButton from '@/components/SkipButton';
import HandoffScreen from '@/components/HandoffScreen';
import { VIBE_CARDS, type VibeCard } from '@/data/zh-CN/vibeCards';
import { shuffle, randomId } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { useTurn } from '@/lib/useTurn';
import { vibrate } from '@/lib/gameUtils';

const KIND_LABEL: Record<string, { label: string; emoji: string; tone: string }> = {
  challenge: { label: '挑战', emoji: '🔥', tone: 'bg-sticker-pink' },
  vote:      { label: '投票', emoji: '🗳️', tone: 'bg-sticker-cyan' },
  rule:      { label: '规则', emoji: '📜', tone: 'bg-sticker-purple' },
  twist:     { label: '反转', emoji: '🔀', tone: 'bg-sticker-orange' },
  shield:    { label: '保护', emoji: '🛡️', tone: 'bg-sticker-lime' },
  all:       { label: '全员', emoji: '👥', tone: 'bg-sticker-yellow' },
};

export default function VibeCardsGame() {
  const players = usePartyStore((s) => s.players);
  const { current, next } = useTurn(players);
  const [deck, setDeck] = useState<VibeCard[]>(() => shuffle(VIBE_CARDS));
  const [card, setCard] = useState<{ k: string; data: VibeCard } | null>(null);
  const [handoff, setHandoff] = useState(false);
  const [drawn, setDrawn] = useState(0);

  const draw = () => {
    vibrate(15);
    let d = deck;
    if (d.length === 0) d = shuffle(VIBE_CARDS);
    const [head, ...rest] = d;
    setDeck(rest);
    setCard({ k: randomId(), data: head });
    setDrawn((n) => n + 1);
  };

  const goNext = () => {
    setCard(null);
    next();
    setHandoff(true);
  };

  const tag = useMemo(() => card ? KIND_LABEL[card.data.kind] : null, [card]);

  return (
    <GameLayout title="派对卡牌 🎴" currentPlayer={current?.name} rules={`已抽 ${drawn} 张 · 可跳过`}>
      <div className="py-4">
        <AnimatePresence mode="wait">
          {!card ? (
            <motion.div
              key="deck"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="sticker p-8 min-h-[220px] grid place-items-center text-center bg-sticker-yellow"
            >
              <div>
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-6xl mb-3"
                >
                  🎴
                </motion.div>
                <div className="font-black text-paper-900">轮到 {current?.name}</div>
                <div className="text-sm text-paper-900/70 font-semibold mt-1">点击下方抽一张卡</div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={card.k}
              initial={{ rotateY: -90, opacity: 0, scale: 0.9 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`sticker p-6 min-h-[220px] ${tag?.tone}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2.5 py-1 rounded-full border-3 border-paper-900 bg-paper-50 font-black">
                  {tag?.emoji} {tag?.label}
                </span>
                <span className="text-sm font-black text-paper-900 truncate">{card.data.title}</span>
              </div>
              <div className="text-lg font-bold leading-relaxed text-paper-900">{card.data.text}</div>
              <div className="mt-3 text-[11px] font-bold text-paper-900/60">轮到 {current?.name}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {card ? <SkipButton onClick={goNext} /> : <div />}
        <NeonButton onClick={goNext} variant="secondary">下一位</NeonButton>
        <NeonButton onClick={draw}>{card ? '🔄 再抽' : '🎴 抽卡'}</NeonButton>
      </div>

      {current && (
        <HandoffScreen
          open={handoff}
          nextPlayerName={current.name}
          hint="轮到你抽卡了"
          seconds={2}
          onDone={() => setHandoff(false)}
        />
      )}
    </GameLayout>
  );
}
