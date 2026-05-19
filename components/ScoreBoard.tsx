'use client';
import type { Player } from '@/types';

export default function ScoreBoard({ players }: { players: Player[] }) {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  return (
    <div className="glass p-4">
      <div className="text-sm text-white/60 mb-2">计分板</div>
      <div className="space-y-2">
        {sorted.map((p, i) => (
          <div key={p.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 text-white/50 text-xs">{i + 1}</span>
              <span className="h-6 w-6 rounded-full grid place-items-center text-xs font-bold" style={{ backgroundColor: p.avatarColor }}>{p.name.slice(0,1)}</span>
              <span className="text-sm">{p.name}</span>
            </div>
            <span className="text-sm font-bold tabular-nums">{p.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
