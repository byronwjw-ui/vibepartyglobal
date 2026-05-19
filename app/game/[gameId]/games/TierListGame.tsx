'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { usePartyStore } from '@/store/usePartyStore';
import { TIER_TOPICS, type TierTopic } from '@/data/zh-CN/tierLists';
import { filterByModeAndLevel } from '@/lib/modeFilter';
import { pick, shuffle } from '@/lib/random';
import { Shuffle, RotateCcw } from 'lucide-react';

type Phase = 'intro' | 'rank' | 'reveal';
const TIERS = ['S','A','B','C','D'] as const;
type Tier = typeof TIERS[number];

const TIER_COLOR: Record<Tier, string> = {
  S: 'bg-sticker-pink',
  A: 'bg-sticker-orange',
  B: 'bg-sticker-yellow',
  C: 'bg-sticker-cyan',
  D: 'bg-sticker-teal',
};

export default function TierListGame() {
  const settings = usePartyStore((s) => s.settings);
  const pool = useMemo(() => filterByModeAndLevel(TIER_TOPICS, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);

  const [phase, setPhase] = useState<Phase>('intro');
  const [topic, setTopic] = useState<TierTopic | null>(null);
  const [pool2, setPool2] = useState<string[]>([]);
  const [placed, setPlaced] = useState<Record<Tier, string[]>>({ S: [], A: [], B: [], C: [], D: [] });
  const [selected, setSelected] = useState<{ from: 'pool' | Tier; item: string } | null>(null);

  const start = () => {
    const t = pick(pool.length ? pool : TIER_TOPICS);
    setTopic(t);
    setPool2(shuffle(t.items));
    setPlaced({ S: [], A: [], B: [], C: [], D: [] });
    setSelected(null);
    setPhase('rank');
  };
  const reset = () => {
    if (!topic) return;
    setPool2(shuffle(topic.items));
    setPlaced({ S: [], A: [], B: [], C: [], D: [] });
    setSelected(null);
  };
  const reshuffle = () => start();

  const placeTo = (tier: Tier) => {
    if (!selected) return;
    if (selected.from === 'pool') {
      setPool2(pool2.filter((x) => x !== selected.item));
      setPlaced({ ...placed, [tier]: [...placed[tier], selected.item] });
    } else if (selected.from !== tier) {
      setPlaced({
        ...placed,
        [selected.from]: placed[selected.from].filter((x) => x !== selected.item),
        [tier]: [...placed[tier], selected.item],
      });
    }
    setSelected(null);
  };
  const sendBack = () => {
    if (!selected || selected.from === 'pool') return;
    setPool2([...pool2, selected.item]);
    setPlaced({ ...placed, [selected.from]: placed[selected.from].filter((x) => x !== selected.item) });
    setSelected(null);
  };

  if (phase === 'intro') {
    return (
      <GameLayout title="现场 Tier List 📊" subtitle="全场一起给一组东西排 S/A/B/C/D">
        <div className="px-4 space-y-3">
          <GlassCard tone="yellow">
            <div className="font-black text-lg">玩法</div>
            <ol className="mt-2 text-sm font-bold text-paper-900/85 space-y-1">
              <li>1）系统随机一个主题（如“奶茶品牌”/“KTV必点”）</li>
              <li>2）全场讨论，将东西从“待选”点进 S/A/B/C/D</li>
              <li>3）看看大家是共识还是互相拆台 🍿</li>
            </ol>
          </GlassCard>
          <NeonButton full size="lg" onClick={start}>随机一个主题 →</NeonButton>
        </div>
      </GameLayout>
    );
  }

  if (phase === 'rank' && topic) {
    return (
      <GameLayout title="现场 Tier List" subtitle={topic.title}>
        <div className="px-4 space-y-3 pb-6">
          <GlassCard tone="cyan">
            <div className="flex items-center gap-2">
              <div className="flex-1 min-w-0">
                <div className="text-xs font-black text-paper-900/60">今轮主题</div>
                <div className="font-black text-paper-900 text-lg">{topic.title}</div>
              </div>
              <button onClick={reshuffle} className="h-9 px-3 rounded-xl border-3 border-paper-900 bg-paper-50 shadow-sticker-sm font-black text-xs press-down flex items-center gap-1"><Shuffle size={14}/>换题</button>
              <button onClick={reset} className="h-9 px-3 rounded-xl border-3 border-paper-900 bg-paper-50 shadow-sticker-sm font-black text-xs press-down flex items-center gap-1"><RotateCcw size={14}/>重排</button>
            </div>
          </GlassCard>

          {/* tier rows */}
          <div className="space-y-2">
            {TIERS.map((t) => (
              <button key={t} onClick={() => placeTo(t)}
                className={`w-full text-left border-3 border-paper-900 rounded-2xl shadow-sticker-sm ${TIER_COLOR[t]} p-2 min-h-[64px] flex items-start gap-2 ${selected ? 'press-down' : ''}`}>
                <div className="h-12 w-12 rounded-xl border-3 border-paper-900 bg-paper-50 grid place-items-center font-black text-xl">{t}</div>
                <div className="flex-1 flex flex-wrap gap-1.5 pt-1">
                  {placed[t].map((it) => (
                    <Chip key={it} text={it} active={selected?.item === it} onClick={(e) => { e.stopPropagation(); setSelected({ from: t, item: it }); }} />
                  ))}
                  {placed[t].length === 0 && <span className="text-xs font-bold text-paper-900/60 px-1">点下面选一个→点这里放进来</span>}
                </div>
              </button>
            ))}
          </div>

          {/* pool */}
          <GlassCard>
            <div className="flex items-center justify-between mb-2">
              <div className="font-black">待选 ({pool2.length})</div>
              {selected && selected.from !== 'pool' && (
                <button onClick={sendBack} className="text-xs font-black underline">退回待选</button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {pool2.length === 0 && <div className="text-xs font-bold text-paper-900/60">全部排完了 🎉</div>}
              {pool2.map((it) => (
                <Chip key={it} text={it} active={selected?.item === it} onClick={() => setSelected({ from: 'pool', item: it })} />
              ))}
            </div>
          </GlassCard>

          <NeonButton full size="lg" onClick={() => setPhase('reveal')}>完成 · 看今晚的榜单 →</NeonButton>
        </div>
      </GameLayout>
    );
  }

  if (phase === 'reveal' && topic) {
    return (
      <GameLayout title="今晚的榜单" subtitle={topic.title}>
        <div className="px-4 space-y-2">
          {TIERS.map((t) => (
            <motion.div key={t} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              className={`border-3 border-paper-900 rounded-2xl shadow-sticker-sm ${TIER_COLOR[t]} p-3 flex items-start gap-2`}>
              <div className="h-12 w-12 rounded-xl border-3 border-paper-900 bg-paper-50 grid place-items-center font-black text-xl">{t}</div>
              <div className="flex-1 flex flex-wrap gap-1.5 pt-1">
                {placed[t].length === 0 ? (
                  <span className="text-xs font-bold text-paper-900/60 px-1">—</span>
                ) : placed[t].map((it) => (
                  <span key={it} className="px-2 py-1 rounded-xl border-3 border-paper-900 bg-paper-50 text-xs font-black">{it}</span>
                ))}
              </div>
            </motion.div>
          ))}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <NeonButton full variant="secondary" onClick={() => setPhase('rank')}>返回修改</NeonButton>
            <NeonButton full onClick={start}>换个主题</NeonButton>
          </div>
          <p className="text-center text-[11px] text-paper-900/50 font-bold pt-1">跳过争论，仅供玩乐 🍿</p>
        </div>
      </GameLayout>
    );
  }

  return null;
}

function Chip({ text, active, onClick }: { text: string; active?: boolean; onClick: (e: React.MouseEvent) => void }) {
  return (
    <button onClick={onClick}
      className={`px-2 py-1 rounded-xl border-3 border-paper-900 text-xs font-black press-down ${active ? 'bg-paper-900 text-paper-50' : 'bg-paper-50 text-paper-900'}`}>
      {text}
    </button>
  );
}
