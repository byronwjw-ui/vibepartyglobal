'use client';
import type { Player } from '@/types';
import { cn } from '@/lib/cn';

export default function PlayerSelector({ players, selectedId, onSelect }: { players: Player[]; selectedId?: string; onSelect: (id: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {players.map((p) => (
        <button key={p.id} onClick={() => onSelect(p.id)} className={cn('flex items-center gap-2 px-3 py-2 rounded-2xl border', selectedId === p.id ? 'border-neon-pink bg-neon-pink/20' : 'border-white/10 bg-white/5')}>
          <span className="h-6 w-6 rounded-full grid place-items-center text-xs font-bold" style={{ backgroundColor: p.avatarColor }}>{p.name.slice(0,1)}</span>
          <span className="text-sm">{p.name}</span>
        </button>
      ))}
    </div>
  );
}
