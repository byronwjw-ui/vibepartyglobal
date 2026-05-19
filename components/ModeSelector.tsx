'use client';
import { PARTY_MODES } from '@/lib/constants';
import type { PartyMode } from '@/types';
import { cn } from '@/lib/cn';

export default function ModeSelector({ value, onChange }: { value: PartyMode; onChange: (m: PartyMode) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {PARTY_MODES.map((m) => (
        <button key={m.id} onClick={() => onChange(m.id)} className={cn('text-left rounded-2xl p-4 border transition', value === m.id ? 'border-neon-pink bg-neon-pink/10 shadow-neon' : 'border-white/10 bg-white/5')}>
          <div className="text-2xl">{m.emoji}</div>
          <div className="mt-2 font-semibold">{m.label}</div>
          <div className="text-xs text-white/60 mt-1">{m.desc}</div>
        </button>
      ))}
    </div>
  );
}
