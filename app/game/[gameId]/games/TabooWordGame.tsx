'use client';
import { useMemo, useState } from 'react';
import { usePartyStore } from '@/store/usePartyStore';
import GameLayout from '@/components/GameLayout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import RevealScreen from '@/components/RevealScreen';
import { TABOO_WORDS } from '@/data/zh-CN/taboo';
import { filterByModeAndLevel } from '@/lib/modeFilter';
import { pickN } from '@/lib/random';
import { ArrowRight, RotateCcw } from 'lucide-react';

interface Assignment { playerId: string; word: string }

export default function TabooWordGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const pool = useMemo(() => filterByModeAndLevel(TABOO_WORDS, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [revealIdx, setRevealIdx] = useState<number | null>(null);

  const generate = () => {
    const words = pickN(pool.length ? pool : TABOO_WORDS, players.length);
    setAssignments(players.map((p, i) => ({ playerId: p.id, word: words[i].word })));
    setRevealIdx(0);
  };

  if (revealIdx !== null && assignments[revealIdx]) {
    const a = assignments[revealIdx];
    const p = players.find((x) => x.id === a.playerId)!;
    return (
      <GameLayout title="禁忌词 🤐">
        <RevealScreen
          playerName={p.name}
          label="你不能说出的词"
          content={a.word}
          tone="pink"
          onDone={() => setRevealIdx(revealIdx + 1 < assignments.length ? revealIdx + 1 : null)}
        />
      </GameLayout>
    );
  }

  return (
    <GameLayout title="禁忌词 🤐"
      footer={(
        <div className="flex gap-2">
          <NeonButton full onClick={generate}><ArrowRight size={16}/> {assignments.length ? '重新分配' : '开始本局'}</NeonButton>
          {!!assignments.length && <NeonButton variant="secondary" onClick={() => { setAssignments([]); setRevealIdx(null); }}><RotateCcw size={16}/> 结束</NeonButton>}
        </div>
      )}>
      <div className="space-y-4">
        <GlassCard tone="pink" tilt="l">
          <div className="font-black text-lg doodle-title">每人一个不能说的词</div>
          <div className="mt-2 text-sm font-semibold text-paper-900/85">
            点&ldquo;开始本局&rdquo;后，手机会依次传给每位玩家秘密查看。游戏全程不能说出自己的词，被任何人抓到就接受随机挑战。
          </div>
        </GlassCard>

        {assignments.length > 0 && (
          <GlassCard>
            <div className="font-black mb-2">玩家清单（只显示名字，不显示词）</div>
            <div className="flex flex-wrap gap-2">
              {players.map((p) => (
                <span key={p.id} className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-paper-50 border-3 border-paper-900 shadow-sticker-sm text-sm font-bold">
                  <span className="h-5 w-5 rounded-full border-2 border-paper-900" style={{ background: p.avatarColor }}/>
                  {p.name}
                </span>
              ))}
            </div>
            <div className="text-xs text-paper-900/65 font-semibold mt-3">已分配完，全场开聊。监督彼此！</div>
          </GlassCard>
        )}
      </div>
    </GameLayout>
  );
}
