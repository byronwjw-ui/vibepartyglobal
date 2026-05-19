'use client';
import { useMemo, useState } from 'react';
import { usePartyStore } from '@/store/usePartyStore';
import { useTurn } from '@/lib/useTurn';
import GameLayout from '@/components/GameLayout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import RevealScreen from '@/components/RevealScreen';
import { DOODLE_ITEMS } from '@/data/zh-CN/guessDoodle';
import { filterByModeAndLevel } from '@/lib/modeFilter';
import { pick } from '@/lib/random';
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react';

type Phase = 'showName' | 'reveal' | 'describe';

export default function GuessDoodleGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const bumpScore = usePartyStore((s) => s.bumpScore);
  const turn = useTurn(players);

  const pool = useMemo(() => filterByModeAndLevel(
    DOODLE_ITEMS.map((d) => ({ ...d, level: 'soft' as const })),
    settings.mode, settings.contentLevel
  ), [settings.mode, settings.contentLevel]);

  const [item, setItem] = useState(() => pick(pool.length ? pool : DOODLE_ITEMS));
  const [phase, setPhase] = useState<Phase>('showName');

  const reroll = () => { setItem(pick(pool.length ? pool : DOODLE_ITEMS)); setPhase('showName'); };
  const nextPlayer = () => { turn.next(); reroll(); };

  if (phase === 'reveal' && turn.current) {
    return (
      <GameLayout title="谁画的？🎨">
        <RevealScreen
          playerName={turn.current.name}
          label="你要描述的词（不能说名字）"
          content={item.word}
          tone="cyan"
          onDone={() => setPhase('describe')}
        />
      </GameLayout>
    );
  }

  return (
    <GameLayout title="谁画的？🎨"
      footer={phase === 'describe' ? (
        <div className="flex gap-2">
          <NeonButton onClick={() => { if (turn.current) bumpScore(turn.current.id, 1); nextPlayer(); }}><Check size={16}/> 猜中</NeonButton>
          <NeonButton variant="secondary" onClick={nextPlayer}><X size={16}/> 没猜中</NeonButton>
          <NeonButton variant="secondary" onClick={reroll}><RotateCcw size={16}/> 换词</NeonButton>
        </div>
      ) : (
        <NeonButton full onClick={() => setPhase('reveal')}><ArrowRight size={16}/> 把手机交给「{turn.current?.name}」</NeonButton>
      )}
    >
      <div className="space-y-4">
        <GlassCard tone="cyan" tilt="l">
          <div className="text-xs text-paper-900/70 font-bold">这一轮</div>
          <div className="text-2xl font-black doodle-title mt-1">{turn.current?.name ?? '－'} 来描述</div>
          <div className="mt-2 text-sm font-semibold text-paper-900/85">规则：只能用语言/手势描述，不能说出名字、首字母、谐音。</div>
        </GlassCard>
        {phase === 'describe' && (
          <GlassCard tone="yellow" tilt="r">
            <div className="text-sm font-bold text-paper-900/70">提示分类</div>
            <div className="text-xl font-black mt-1">{item.category}</div>
            <div className="text-xs text-paper-900/65 font-semibold mt-2">其他玩家开始抢答，60 秒内未猜中算失败。</div>
          </GlassCard>
        )}
      </div>
    </GameLayout>
  );
}
