'use client';
import { useMemo, useState } from 'react';
import { usePartyStore } from '@/store/usePartyStore';
import { useTurn } from '@/lib/useTurn';
import GameLayout from '@/components/GameLayout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { STORY_PROMPTS, STORY_HINTS } from '@/data/zh-CN/threeSentence';
import { filterByModeAndLevel } from '@/lib/modeFilter';
import { pick } from '@/lib/random';
import { RotateCcw, ArrowRight } from 'lucide-react';

export default function ThreeSentenceGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const turn = useTurn(players);
  const pool = useMemo(() => filterByModeAndLevel(STORY_PROMPTS, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);
  const [theme, setTheme] = useState(() => pool[0]?.theme ?? STORY_PROMPTS[0].theme);
  const [step, setStep] = useState(0); // 0 开场 / 1 发生 / 2 结尾

  const reroll = () => { setTheme(pick(pool).theme); setStep(0); turn.reset(); };
  const advance = () => {
    if (step >= 2) { setStep(0); turn.next(); }
    else { setStep((s) => s + 1); turn.next(); }
  };

  return (
    <GameLayout title="三句话故事 📖"
      footer={(
        <div className="flex gap-2">
          <NeonButton full onClick={advance}><ArrowRight size={16}/> {step >= 2 ? '新一轮' : '下一句'}</NeonButton>
          <NeonButton variant="secondary" onClick={reroll}><RotateCcw size={16}/> 换主题</NeonButton>
        </div>
      )}>
      <div className="space-y-4">
        <GlassCard tone="pink" tilt="l">
          <div className="text-xs text-paper-900/70 font-bold">主题</div>
          <div className="mt-2 text-2xl font-black doodle-title">{theme}</div>
        </GlassCard>
        <GlassCard tone="yellow" tilt="r">
          <div className="text-xs text-paper-900/70 font-bold">轮到</div>
          <div className="text-xl font-black mt-1">{turn.current?.name ?? '－'}</div>
          <div className="mt-2 text-sm font-bold text-paper-900/85">{STORY_HINTS[step]}</div>
        </GlassCard>
        <GlassCard>
          <div className="text-sm font-semibold text-paper-900/80">建议每句不超过 15 个字；后接句要呼应前一句。</div>
        </GlassCard>
      </div>
    </GameLayout>
  );
}
