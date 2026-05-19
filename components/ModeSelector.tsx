'use client';
import { PARTY_MODES } from '@/lib/constants';
import type { PartyMode } from '@/types';
import { cn } from '@/lib/cn';

const tones: Record<PartyMode, string> = {
  friends:    'bg-sticker-yellow',
  icebreaker: 'bg-sticker-cyan',
  funny:      'bg-sticker-lime',
  spicy:      'bg-sticker-pink',
  sober:      'bg-sticker-teal',
  drinking:   'bg-sticker-orange',
};

export default function ModeSelector({ value, onChange }: { value: PartyMode; onChange: (m: PartyMode) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {PARTY_MODES.map((m, i) => (
        <button
          key={m.id}
          onClick={() => onChange(m.id)}
          className={cn(
            'text-left rounded-2xl p-4 border-3 border-paper-900 transition press-down',
            tones[m.id],
            value === m.id ? 'shadow-sticker-lg ring-4 ring-paper-900/15' : 'shadow-sticker-sm',
            i % 2 === 0 ? 'tilt-l-sm' : 'tilt-r-sm'
          )}
        >
          <div className="text-3xl">{m.emoji}</div>
          <div className="mt-2 font-black text-paper-900">{m.label}</div>
          <div className="text-xs text-paper-900/75 mt-1 font-semibold">{m.desc}</div>
        </button>
      ))}
    </div>
  );
}
