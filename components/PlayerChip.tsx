'use client';
import { X } from 'lucide-react';
import type { Player } from '@/types';
import { cn } from '@/lib/cn';

export default function PlayerChip({ player, onRemove, onEdit, active }: { player: Player; onRemove?: () => void; onEdit?: () => void; active?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-white/10 bg-white/5', active && 'ring-2 ring-neon-pink/70')}>
      <span className="h-7 w-7 rounded-full grid place-items-center text-xs font-bold" style={{ backgroundColor: player.avatarColor }}>{player.name.slice(0,1)}</span>
      <button onClick={onEdit} className="text-sm font-medium max-w-[110px] truncate">{player.name}</button>
      {onRemove ? (
        <button onClick={onRemove} className="h-6 w-6 grid place-items-center rounded-full bg-white/10 text-white/70"><X size={12}/></button>
      ) : null}
    </div>
  );
}
