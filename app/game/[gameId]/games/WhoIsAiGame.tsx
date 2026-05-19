'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import HandoffScreen from '@/components/HandoffScreen';
import PhaseProgress from '@/components/PhaseProgress';
import { usePartyStore } from '@/store/usePartyStore';
import { AI_PROMPTS, AI_STYLE_TIPS } from '@/data/zh-CN/whoIsAi';
import { filterByModeAndLevel } from '@/lib/modeFilter';
import { pick } from '@/lib/random';
import { vibrate } from '@/lib/gameUtils';

type Phase = 'intro' | 'handoff' | 'assign' | 'prompt' | 'vote' | 'reveal';

export default function WhoIsAiGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const bumpScore = usePartyStore((s) => s.bumpScore);

  const pool = useMemo(
    () => filterByModeAndLevel(AI_PROMPTS, settings.mode, settings.contentLevel),
    [settings.mode, settings.contentLevel]
  );

  const [phase, setPhase] = useState<Phase>('intro');
  const [aiPlayerId, setAiPlayerId] = useState<string | null>(null);
  const [viewIdx, setViewIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [prompt, setPrompt] = useState<string>('');
  const [votedId, setVotedId] = useState<string | null>(null);
  const scoredRef = useRef(false);

  useEffect(() => {
    if (phase !== 'reveal' || scoredRef.current) return;
    scoredRef.current = true;
    const ai = players.find((p) => p.id === aiPlayerId);
    const voted = players.find((p) => p.id === votedId);
    if (votedId && votedId === aiPlayerId && voted) bumpScore(voted.id, 1);
    else if (ai) bumpScore(ai.id, 1);
  }, [phase, aiPlayerId, votedId, players, bumpScore]);

  const start = () => {
    const ai = pick(players);
    setAiPlayerId(ai.id);
    setPrompt(pick(pool.length ? pool : AI_PROMPTS).text);
    setViewIdx(0);
    setRevealed(false);
    setVotedId(null);
    scoredRef.current = false;
    setPhase('handoff');
  };

  const current = players[viewIdx];
  const isAi = current && current.id === aiPlayerId;

  if (phase === 'intro') {
    return (
      <GameLayout title="谁是 AI 🤖" subtitle="一人被分配为 AI，要伪装"机器魂"回答">
        <div className="space-y-3">
          <GlassCard tone="cyan">
            <div className="font-black text-lg">玩法</div>
            <ol className="mt-2 text-sm font-bold text-paper-900/85 space-y-1">
              <li>1）随机 1 人被分配为 AI，其他人是人</li>
              <li>2）系统出题，所有人轮流"回答"</li>
              <li>3）AI 需要装出 AI 风、人只需正常回答</li>
              <li>4）全场猜谁是 AI，投对加分，AI 蒙混过关也加分</li>
            </ol>
          </GlassCard>
          <NeonButton full size="lg" onClick={start}>🎲 随机分配身份 →</NeonButton>
        </div>
      </GameLayout>
    );
  }

  if (phase === 'handoff' && current) {
    return (
      <>
        <GameLayout title="传手机" subtitle={`即将查身份：${current.name}`}>
          <PhaseProgress value={viewIdx} total={players.length} label={`已查 ${viewIdx} / ${players.length} 人`} tone="cyan" />
        </GameLayout>
        <HandoffScreen
          open
          nextPlayerName={current.name}
          hint="点开查看你是 人 还是 AI"
          onDone={() => { setRevealed(false); setPhase('assign'); }}
        />
      </>
    );
  }

  if (phase === 'assign' && current) {
    return (
      <GameLayout title="查身份" subtitle={`${current.name} · ${viewIdx + 1} / ${players.length}`}>
        <div className="space-y-3">
          <PhaseProgress value={viewIdx + 1} total={players.length} label="进度" tone="cyan" />
          {!revealed ? (
            <button onClick={() => { setRevealed(true); vibrate(20); }} className="w-full p-8 rounded-3xl border-3 border-paper-900 bg-paper-50 shadow-sticker font-black text-xl press-down">
              🔍 点击查看我的身份
            </button>
          ) : (
            <motion.div
              initial={{ rotateY: 90, scale: 0.9 }}
              animate={{ rotateY: 0, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className={`p-6 rounded-3xl border-3 border-paper-900 shadow-sticker text-center ${isAi ? 'bg-sticker-pink' : 'bg-sticker-cyan'}`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-7xl"
              >
                {isAi ? '🤖' : '🧑'}
              </motion.div>
              <div className="mt-3 font-black text-3xl">{isAi ? '你是 AI' : '你是人'}</div>
              {isAi && (
                <div className="mt-3 text-left text-xs font-bold text-paper-900/85 space-y-1 bg-paper-50/60 rounded-2xl p-3">
                  <div className="text-center text-paper-900/70 mb-1 font-black">伪装提示</div>
                  {AI_STYLE_TIPS.slice(0, 4).map((t, i) => <div key={i}>· {t}</div>)}
                </div>
              )}
              <button
                onClick={() => {
                  setRevealed(false);
                  if (viewIdx < players.length - 1) {
                    setViewIdx(viewIdx + 1);
                    setPhase('handoff');
                  } else {
                    setPhase('prompt');
                  }
                }}
                className="mt-4 w-full h-12 rounded-2xl border-3 border-paper-900 bg-paper-900 text-paper-50 font-black press-down"
              >
                {viewIdx < players.length - 1 ? '✓ 看完 · 传下一位' : '✓ 全员看完 · 开始答题'}
              </button>
            </motion.div>
          )}
        </div>
      </GameLayout>
    );
  }

  if (phase === 'prompt') {
    return (
      <GameLayout title="今轮题目" subtitle="轮流回答，可以口说或随意发挥">
        <div className="space-y-3">
          <GlassCard tone="pink">
            <div className="text-xs font-black text-paper-900/60">题目</div>
            <div className="mt-1 text-lg font-black leading-relaxed">{prompt}</div>
          </GlassCard>
          <div className="grid grid-cols-2 gap-3">
            <NeonButton full variant="secondary" onClick={() => setPrompt(pick(pool.length ? pool : AI_PROMPTS).text)}>🔄 换一题</NeonButton>
            <NeonButton full onClick={() => setPhase('vote')}>答完 · 投票 →</NeonButton>
          </div>
        </div>
      </GameLayout>
    );
  }

  if (phase === 'vote') {
    return (
      <GameLayout title="猜谁是 AI" subtitle="全场讨论后选一人">
        <div className="space-y-2">
          {players.map((p) => (
            <button
              key={p.id}
              onClick={() => { vibrate(15); setVotedId(p.id); setPhase('reveal'); }}
              className="w-full text-left p-4 rounded-2xl border-3 border-paper-900 bg-paper-50 shadow-sticker-sm press-down flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-xl border-3 border-paper-900" style={{ background: p.avatarColor }} />
              <div className="font-black">{p.name}</div>
            </button>
          ))}
        </div>
      </GameLayout>
    );
  }

  if (phase === 'reveal') {
    const aiPlayer = players.find((p) => p.id === aiPlayerId);
    const voted = players.find((p) => p.id === votedId);
    const success = votedId === aiPlayerId;
    return (
      <GameLayout title="揭晓" subtitle={success ? '人类赢 🎉' : 'AI 蒙混过关 🤖'}>
        <div className="space-y-3">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 180 }}
            className={`p-6 rounded-3xl border-3 border-paper-900 shadow-sticker text-center ${success ? 'bg-sticker-lime' : 'bg-sticker-pink'} tilt-r-sm`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, -15, 15, 0] }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-7xl"
            >
              {success ? '🎯' : '🤖'}
            </motion.div>
            <div className="mt-3 font-black text-paper-900">今轮的 AI 是</div>
            <div className="text-3xl font-black mt-1 text-paper-900">{aiPlayer?.name}</div>
            <div className="text-sm font-bold text-paper-900/70 mt-3">全场投了：{voted?.name}</div>
            <div className="mt-3 text-xs font-black text-paper-900/85">
              {success ? `+1 分给 ${voted?.name}` : `+1 分给 ${aiPlayer?.name}（蒙混奖励）`}
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-3">
            <NeonButton full variant="secondary" onClick={() => setPhase('intro')}>返回说明</NeonButton>
            <NeonButton full onClick={start}>🔄 再玩一局</NeonButton>
          </div>
        </div>
      </GameLayout>
    );
  }

  return null;
}
