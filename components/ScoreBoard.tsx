'use client';
import type { Player } from '@/types';

export default function ScoreBoard({ players }: { players: Player[] }) {
  const sorted = [...players].sort((a,b) => b.score - a.score);
  return (
    <div className="sticker p-4">
      <div className="font-black mb-2 doodle-title text-lg">本局得分</div>
      <div className="space-y-2">
        {sorted.map((p, i) => (
          <div key={p.id} className="flex items-center gap-3">
            <div className="w-6 text-center font-black">{i + 1}</div>
            <div className="h-7 w-7 rounded-full border-2 border-paper-900 grid place-items-center text-[10px] font-black" style={{ background: p.avatarColor }}>{p.name.slice(0,2)}</div>
            <div className="flex-1 font-bold truncate">{p.name}</div>
            <div className="font-black">{p.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
