'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { GameDefinition } from '@/types';
import { Users, Clock } from 'lucide-react';
import { cn } from '@/lib/cn';

const TONES = [
  'bg-sticker-yellow', 'bg-sticker-pink', 'bg-sticker-cyan', 'bg-sticker-lime',
  'bg-sticker-orange', 'bg-sticker-purple/70', 'bg-sticker-coral', 'bg-sticker-teal',
];

function toneFor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return TONES[h % TONES.length];
}
function tiltFor(idx: number) {
  const tilts = ['rotate-[-1.2deg]', 'rotate-[1.4deg]', 'rotate-[-0.6deg]', 'rotate-[0.8deg]'];
  return tilts[idx % tilts.length];
}

export default function GameCard({ game, index = 0 }: { game: GameDefinition; index?: number }) {
  const tone = toneFor(game.id);
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04, duration: 0.3 }}>
      <Link href={`/game/${game.id}`} className="block">
        <div className={cn(
          'border-3 border-paper-900 rounded-3xl shadow-sticker p-4 bg-paper-100 press-down',
          tiltFor(index),
        )}>
          <div className="flex items-start gap-3">
            <div className={cn('h-14 w-14 rounded-2xl grid place-items-center text-3xl border-3 border-paper-900 shrink-0', tone)}>
              {game.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="font-black text-paper-900 truncate text-base">{game.title}</div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-paper-50 border-2 border-paper-900 text-paper-900">{game.difficulty}</span>
              </div>
              <div className="text-xs text-paper-900/75 mt-1 line-clamp-2 font-medium">{game.subtitle}</div>
              <div className="mt-2 flex items-center gap-3 text-[11px] text-paper-900/70 font-semibold">
                <span className="flex items-center gap-1"><Users size={12}/> {game.minPlayers}{game.maxPlayers ? `-${game.maxPlayers}` : '+'}人</span>
                <span className="flex items-center gap-1"><Clock size={12}/> {game.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
