'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { usePartyStore } from '@/store/usePartyStore';
import { AI_PROMPTS, AI_STYLE_TIPS } from '@/data/zh-CN/whoIsAi';
import { filterByModeAndLevel } from '@/lib/modeFilter';
import { pick } from '@/lib/random';
import { vibrate } from '@/lib/gameUtils';

type Phase = 'intro' | 'assign' | 'prompt' | 'vote' | 'reveal';

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

  // 揭晓阶段加分（只结算一次）
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
    setPhase('assign');
  };

  const current = players[viewIdx];
  const isAi = current && current.id === aiPlayerId;

  if (phase === 'intro') {
    return (
      <GameLayout title="谁是 AI 🤖" subtitle="一人被分配为 AI，要伪装“机器魂”回答">
        <div className="px-4 space-y-3">
          <GlassCard tone="cyan">
            <div className="font-black text-lg">玩法</div>
            <ol className="mt-2 text-sm font-bold text-paper-900/85 space-y-1">
              <li>1）随机 1 人被分配为 AI，其他人是人</li>
              <li>2）系统出题，所有人轮流“回答”</li>
              <li>3）AI 需要装出 AI 风、人只需正常回答</li>
              <li>4）全场猜谁是 AI，投对加分，AI 蒙混过关也加分</li>
            </ol>
          </GlassCard>
          <NeonButton full size="lg" onClick={start}>随机分配身份 →</NeonButton>
        </div>
      </GameLayout>
    );
  }

  if (phase === 'assign' && current) {
    return (
      <GameLayout title="传手机" subtitle={`${current.name} · ${viewIdx + 1} / ${players.length}`}>
        <div className="px-4 space-y-3">
          <GlassCard tone="yellow">
            <div className="text-center font-black text-lg">📢 请传手机给 {current.name}</div>
            <div className="text-center text-sm text-paper-900/70 font-bold mt-1">点下面查看你的身份，看完合上传下一位</div>
          </GlassCard>
          {!revealed ? (
            <button onClick={() => { setRevealed(true); vibrate(20); }} className="w-full p-8 rounded-3xl border-3 border-paper-900 bg-paper-50 shadow-sticker font-black text-xl press-down">
              🔍 点击查看我的身份
            </button>
          ) : (
            <motion.div initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} transition={{ duration: 0.4 }}
              className={`p-6 rounded-3xl border-3 border-paper-900 shadow-sticker text-center ${isAi ? 'bg-sticker-pink' : 'bg-sticker-cyan'}`}>
              <div className="text-5xl">{isAi ? '🤖' : '🧑'}</div>
              <div className="mt-2 font-black text-2xl">{isAi ? '你是 AI' : '你是人'}</div>
              {isAi && (
                <div className="mt-3 text-left text-xs font-bold text-paper-900/85 space-y-1">
                  <div className="text-center text-paper-900/60 mb-1">伪装提示（可选看）</div>
                  {AI_STYLE_TIPS.slice(0, 4).map((t, i) => <div key={i}>· {t}</div>)}
                </div>
              )}
              <button onClick={() => {
                setRevealed(false);
                if (viewIdx < players.length - 1) setViewIdx(viewIdx + 1);
                else setPhase('prompt');
              }} className="mt-4 w-full h-12 rounded-2xl border-3 border-paper-900 bg-paper-900 text-paper-50 font-black press-down">
                {viewIdx < players.length - 1 ? '看完了 · 传给下一位' : '看完了 · 开始答题'}
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
        <div className="px-4 space-y-3">
          <GlassCard tone="pink">
            <div className="text-xs font-black text-paper-900/60">题目</div>
            <div className="mt-1 text-lg font-black leading-relaxed">{prompt}</div>
          </GlassCard>
          <div className="grid grid-cols-2 gap-3">
            <NeonButton full variant="secondary" onClick={() => setPrompt(pick(pool.length ? pool : AI_PROMPTS).text)}>换一题</NeonButton>
            <NeonButton full onClick={() => setPhase('vote')}>答完了 · 投票 →</NeonButton>
          </div>
        </div>
      </GameLayout>
    );
  }

  if (phase === 'vote') {
    return (
      <GameLayout title="猜谁是 AI" subtitle="全场讨论后选一人">
        <div className="px-4 space-y-2">
          {players.map((p) => (
            <button key={p.id} onClick={() => { setVotedId(p.id); setPhase('reveal'); }}
              className="w-full text-left p-4 rounded-2xl border-3 border-paper-900 bg-paper-50 shadow-sticker-sm press-down flex items-center gap-3">
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
        <div className="px-4 space-y-3">
          <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }}
            className="p-5 rounded-3xl border-3 border-paper-900 shadow-sticker bg-sticker-yellow text-center">
            <div className="text-5xl">{success ? '🎯' : '🤖'}</div>
            <div className="mt-2 font-black">今轮的 AI 是</div>
            <div className="text-2xl font-black neon-text mt-1">{aiPlayer?.name}</div>
            <div className="text-sm font-bold text-paper-900/70 mt-2">全场投了：{voted?.name}</div>
          </motion.div>
          <div className="grid grid-cols-2 gap-3">
            <NeonButton full variant="secondary" onClick={() => setPhase('intro')}>返回说明</NeonButton>
            <NeonButton full onClick={start}>再玩一局</NeonButton>
          </div>
        </div>
      </GameLayout>
    );
  }

  return null;
}
