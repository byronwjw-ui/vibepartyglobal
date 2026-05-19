'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { GameDefinition } from '@/types';
import { Users, Clock } from 'lucide-react';

export default function GameCard({ game, index = 0 }: { game: GameDefinition; index?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04, duration: 0.35 }}>
      <Link href={`/game/${game.id}`} className="block">
        <div className="glass p-4 active:scale-[0.99] transition">
          <div className="flex items-start gap-3">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-neon-pink/30 via-neon-purple/30 to-neon-cyan/30 grid place-items-center text-3xl">{game.icon}</div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2"><div className="font-semibold truncate">{game.title}</div><span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/70">{game.difficulty}</span></div>
              <div className="text-xs text-white/60 mt-1 line-clamp-2">{game.subtitle}</div>
              <div className="mt-2 flex items-center gap-3 text-[11px] text-white/60">
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
