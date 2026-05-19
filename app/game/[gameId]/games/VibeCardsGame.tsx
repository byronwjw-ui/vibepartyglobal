'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import SkipButton from '@/components/SkipButton';
import { VIBE_CARDS, type VibeCard } from '@/data/zh-CN/vibeCards';
import { shuffle, randomId } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { useTurn } from '@/lib/useTurn';

const KIND_LABEL: Record<string, { label: string; tone: string }> = {
  challenge: { label: '挑战', tone: 'bg-sticker-pink' },
  vote:      { label: '投票', tone: 'bg-sticker-cyan' },
  rule:      { label: '规则', tone: 'bg-sticker-purple/70' },
  twist:     { label: '反转', tone: 'bg-sticker-orange' },
  shield:    { label: '保护', tone: 'bg-sticker-lime' },
  all:       { label: '全员', tone: 'bg-sticker-yellow' },
};

export default function VibeCardsGame() {
  const players = usePartyStore((s) => s.players);
  const { current, next } = useTurn(players);
  const [deck, setDeck] = useState<VibeCard[]>(() => shuffle(VIBE_CARDS));
  const [card, setCard] = useState<{ k: string; data: VibeCard } | null>(null);

  const draw = () => {
    let d = deck;
    if (d.length === 0) d = shuffle(VIBE_CARDS);
    const [head, ...rest] = d;
    setDeck(rest);
    setCard({ k: randomId(), data: head });
  };

  const tag = useMemo(() => card ? KIND_LABEL[card.data.kind] : null, [card]);

  return (
    <GameLayout title="派对卡牙 🎴" currentPlayer={current?.name} rules="轮到的玩家抽一张卡，按卡面执行。可跳过。">
      <div className="py-4">
        <AnimatePresence mode="wait">
          {!card ? (
            <motion.div key="deck" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="sticker p-8 min-h-[200px] grid place-items-center text-center">
              <div>
                <div className="text-5xl mb-2">🎴</div>
                <div className="text-paper-900/70 font-semibold">点击下方抽一张卡</div>
              </div>
            </motion.div>
          ) : (
            <motion.div key={card.k} initial={{ rotateY: -90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: 90, opacity: 0 }} transition={{ duration: 0.45 }} className="sticker p-6 min-h-[200px]">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] px-2 py-0.5 rounded-full border-2 border-paper-900 font-black ${tag?.tone}`}>{tag?.label}</span>
                <span className="text-sm font-black">{card.data.title}</span>
              </div>
              <div className="text-lg font-bold leading-relaxed">{card.data.text}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {card ? <SkipButton onClick={() => { setCard(null); next(); }} /> : <div/>}
        <NeonButton onClick={() => { setCard(null); next(); }} variant="secondary">下一位</NeonButton>
        <NeonButton onClick={draw}>{card ? '再抽一张' : '抽卡'}</NeonButton>
      </div>
    </GameLayout>
  );
}
