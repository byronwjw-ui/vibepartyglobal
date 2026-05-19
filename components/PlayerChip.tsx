'use client';
import { X, Pencil } from 'lucide-react';
import type { Player } from '@/types';

export default function PlayerChip({ player, onRemove, onEdit }: { player: Player; onRemove?: () => void; onEdit?: () => void; }) {
  return (
    <div className="inline-flex items-center gap-2 pl-1 pr-2 py-1 rounded-full bg-paper-50 border-3 border-paper-900 shadow-sticker-sm">
      <span className="h-7 w-7 rounded-full grid place-items-center text-[11px] font-black text-paper-900 border-2 border-paper-900" style={{ background: player.avatarColor }}>{player.name.slice(0, 2)}</span>
      <span className="text-sm font-bold text-paper-900 max-w-[7rem] truncate">{player.name}</span>
      {onEdit && <button onClick={onEdit} aria-label="编辑" className="h-6 w-6 grid place-items-center rounded-full hover:bg-paper-200"><Pencil size={12}/></button>}
      {onRemove && <button onClick={onRemove} aria-label="删除" className="h-6 w-6 grid place-items-center rounded-full hover:bg-sticker-red/30"><X size={12}/></button>}
    </div>
  );
}
