'use client';
import type { Player } from '@/types';
import { cn } from '@/lib/cn';

export default function PlayerSelector({ players, selectedId, onSelect, label }: { players: Player[]; selectedId?: string; onSelect: (id: string) => void; label?: string }) {
  return (
    <div>
      {label && <div className="text-sm font-bold text-paper-900/80 mb-2">{label}</div>}
      <div className="flex flex-wrap gap-2">
        {players.map((p) => (
          <button key={p.id} onClick={() => onSelect(p.id)} className={cn(
            'inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border-3 border-paper-900 press-down',
            selectedId === p.id ? 'bg-sticker-yellow shadow-sticker' : 'bg-paper-50 shadow-sticker-sm'
          )}>
            <span className="h-7 w-7 rounded-full border-2 border-paper-900 grid place-items-center text-[10px] font-black" style={{ background: p.avatarColor }}>{p.name.slice(0,2)}</span>
            <span className="text-sm font-bold">{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
