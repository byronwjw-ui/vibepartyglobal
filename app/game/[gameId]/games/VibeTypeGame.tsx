'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import GlassCard from '@/components/GlassCard';
import SkipButton from '@/components/SkipButton';
import HandoffScreen from '@/components/HandoffScreen';
import PhaseProgress from '@/components/PhaseProgress';
import ShareResultCard from '@/components/ShareResultCard';
import { usePartyStore } from '@/store/usePartyStore';
import { VIBE_QUESTIONS, ARCHETYPES, computeType, summarizeParty, type AxisLetter } from '@/data/zh-CN/vibeType';
import { vibrate } from '@/lib/gameUtils';

type Phase =
  | 'intro'
  | 'handoff'
  | 'test'
  | 'playerComplete'   // ← 新增：当前玩家答完，展示自己的人格 + 明确的"换人"按钮
  | 'reveal'
  | 'blindGuess'
  | 'blindHandoff'
  | 'blindResult';

interface PlayerResult { playerId: string; type: string; answers: Record<string, AxisLetter>; }

export default function VibeTypeGame() {
  const players = usePartyStore((s) => s.players);
  const [phase, setPhase] = useState<Phase>('intro');
  const [playerIdx, setPlayerIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AxisLetter>>({});
  const [results, setResults] = useState<PlayerResult[]>([]);
  // 盲猜阶段
  const [guessTargetIdx, setGuessTargetIdx] = useState(0);
  const [guessAxisIdx, setGuessAxisIdx] = useState(0);
  const [guessScores, setGuessScores] = useState<Record<string, number>>({});
  const [currentGuess, setCurrentGuess] = useState<Record<string, AxisLetter | null>>({});

  const current = players[playerIdx];
  const nextPlayer = players[playerIdx + 1];
  const question = VIBE_QUESTIONS[qIdx];
  const totalQ = VIBE_QUESTIONS.length;
  const justFinished = results[results.length - 1];
  const justFinishedArchetype = justFinished ? ARCHETYPES[justFinished.type] : null;

  const startTest = () => {
    setPhase('handoff'); setPlayerIdx(0); setQIdx(0); setAnswers({}); setResults([]);
  };

  const pickOption = (letter: AxisLetter) => {
    vibrate(15);
    const nextAnswers = { ...answers, [question.id]: letter };
    setAnswers(nextAnswers);
    if (qIdx < totalQ - 1) {
      setQIdx(qIdx + 1);
    } else {
      // 当前玩家测完 → 不再瞬间跳走，停在"个人完成屏"
      const type = computeType(nextAnswers);
      const finished: PlayerResult = { playerId: current.id, type, answers: nextAnswers };
      setResults([...results, finished]);
      vibrate([20, 40, 80]);
      setPhase('playerComplete');
    }
  };

  // 个人完成屏 → 主动推进
  const goNextPlayerOrReveal = () => {
    setAnswers({});
    setQIdx(0);
    if (playerIdx < players.length - 1) {
      setPlayerIdx(playerIdx + 1);
      setPhase('handoff');
    } else {
      setPhase('reveal');
    }
  };

  const skipQuestion = () => { pickOption(question.optionA.letter); };

  // 进入盲猜阶段
  const startBlind = () => {
    setPhase('blindHandoff');
    setGuessTargetIdx(0);
    setGuessAxisIdx(0);
    setGuessScores({});
    setCurrentGuess({});
  };

  const guessTarget = players[guessTargetIdx];
  const axes: { key: 'EI'|'SN'|'TF'|'JP'; a: AxisLetter; b: AxisLetter; aLabel: string; bLabel: string }[] = [
    { key: 'EI', a: 'E', b: 'I', aLabel: '外放 E', bLabel: '内秀 I' },
    { key: 'SN', a: 'S', b: 'N', aLabel: '现实 S', bLabel: '想象 N' },
    { key: 'TF', a: 'T', b: 'F', aLabel: '理性 T', bLabel: '感性 F' },
    { key: 'JP', a: 'J', b: 'P', aLabel: '计划 J', bLabel: '即兴 P' },
  ];
  const currentAxis = axes[guessAxisIdx];

  const submitGuess = (letter: AxisLetter) => {
    vibrate(15);
    const nextGuess = { ...currentGuess, [currentAxis.key]: letter };
    setCurrentGuess(nextGuess);
    if (guessAxisIdx < axes.length - 1) {
      setGuessAxisIdx(guessAxisIdx + 1);
    } else {
      const target = results.find((r) => r.playerId === guessTarget.id);
      if (target) {
        const correct = axes.reduce((acc, ax) => {
          const counts: Record<AxisLetter, number> = { E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0 };
          Object.entries(target.answers).forEach(([qid, l]) => {
            const q = VIBE_QUESTIONS.find((x) => x.id === qid);
            if (q && q.axis === ax.key) counts[l]++;
          });
          const dominant: AxisLetter = counts[ax.a] >= counts[ax.b] ? ax.a : ax.b;
          return acc + (nextGuess[ax.key] === dominant ? 1 : 0);
        }, 0);
        setGuessScores((s) => ({ ...s, [guessTarget.id]: correct }));
      }
      if (guessTargetIdx < players.length - 1) {
        setGuessTargetIdx(guessTargetIdx + 1);
        setGuessAxisIdx(0);
        setCurrentGuess({});
        setPhase('blindHandoff');
      } else {
        setPhase('blindResult');
      }
    }
  };

  const restart = () => { setPhase('intro'); };

  // ============ 渲染 ============
  if (phase === 'intro') {
    return (
      <GameLayout title="VibeType · 派对人格" subtitle={`12题 · 大约 1 分钟 · 共 ${players.length} 位玩家依次测`}>
        <div className="space-y-4">
          <GlassCard tone="pink">
            <div className="text-2xl font-black">今晚你是谁？ 🔮</div>
            <p className="mt-2 text-sm font-semibold text-paper-900/80">
              12 道派对情境题，测出你今晚的派对角色。所有玩家依次传手机测，全部测完一起揭晓今晚配置。
            </p>
            <p className="mt-2 text-xs font-semibold text-paper-900/60">仅供派对娱乐，不代表真实人格测评。</p>
          </GlassCard>
          <GlassCard>
            <div className="font-black">会玩到的 4 个维度</div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-bold">
              <Pill>🎈 外放 E / 内秀 I</Pill>
              <Pill>🔮 现实 S / 想象 N</Pill>
              <Pill>🧊 理性 T / 感性 F</Pill>
              <Pill>📅 计划 J / 即兴 P</Pill>
            </div>
          </GlassCard>
          <NeonButton full size="lg" onClick={startTest}>开始测 →</NeonButton>
        </div>
      </GameLayout>
    );
  }

  // 传手机过渡（每个玩家做题前）
  if (phase === 'handoff' && current) {
    return (
      <>
        <GameLayout title="VibeType 测试" subtitle={`即将进入：${current.name}`}>
          <PhaseProgress value={playerIdx} total={players.length} label={`已完成 ${playerIdx} / ${players.length} 位玩家`} tone="pink" />
        </GameLayout>
        <HandoffScreen
          open
          nextPlayerName={current.name}
          hint={`接下来轮到你测 12 道题 · 第 ${playerIdx + 1} / ${players.length} 位`}
          onDone={() => setPhase('test')}
        />
      </>
    );
  }

  if (phase === 'test' && current && question) {
    return (
      <GameLayout title="VibeType 测试" subtitle={`${current.name} · 第 ${playerIdx + 1} / ${players.length} 位玩家`}>
        <div className="space-y-4">
          {/* 双进度：玩家进度 + 题目进度 */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1">
              <PhaseProgress value={playerIdx + 1} total={players.length} label={`👥 第 ${playerIdx + 1} / ${players.length} 位玩家`} tone="cyan" />
            </div>
          </div>
          <PhaseProgress value={qIdx + 1} total={totalQ} label={`📝 第 ${qIdx + 1} / ${totalQ} 题`} tone="pink" />
          <GlassCard tone="yellow">
            <div className="text-[11px] font-black text-paper-900/60">情境</div>
            <div className="mt-1 text-lg font-black leading-relaxed">{question.prompt}</div>
          </GlassCard>
          <AnimatePresence mode="wait">
            <motion.div key={question.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-3">
              <button onClick={() => pickOption(question.optionA.letter)} className="w-full text-left p-4 rounded-2xl border-3 border-paper-900 bg-sticker-cyan shadow-sticker press-down tilt-l-sm">
                <div className="text-xs font-black text-paper-900/60">A</div>
                <div className="font-black text-paper-900">{question.optionA.text}</div>
              </button>
              <button onClick={() => pickOption(question.optionB.letter)} className="w-full text-left p-4 rounded-2xl border-3 border-paper-900 bg-sticker-pink shadow-sticker press-down tilt-r-sm">
                <div className="text-xs font-black text-paper-900/60">B</div>
                <div className="font-black text-paper-900">{question.optionB.text}</div>
              </button>
            </motion.div>
          </AnimatePresence>
          {/* 最后一题的明确提示 */}
          {qIdx === totalQ - 1 && (
            <div className="text-center text-xs font-black text-paper-900/70 animate-pulse">
              🏁 最后一题，答完会出你的派对人格！
            </div>
          )}
          <div className="pt-2"><SkipButton onClick={skipQuestion} /></div>
        </div>
      </GameLayout>
    );
  }

  // ✅ 新增：当前玩家完成屏 —— 这才是真正"换人"的信号
  if (phase === 'playerComplete' && current && justFinished && justFinishedArchetype) {
    const isLast = playerIdx >= players.length - 1;
    const a = justFinishedArchetype;
    return (
      <GameLayout title="测完啦 🎉" subtitle={`${current.name} 答完 12 题`}>
        <div className="space-y-4">
          {/* 撒花横幅 */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 14 }}
            className="text-center"
          >
            <div className="text-6xl">🎉</div>
            <div className="text-xs font-black text-paper-900/70 mt-1">{current.name} 的派对人格揭晓</div>
          </motion.div>

          {/* 个人人格卡 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 180, delay: 0.2 }}
            className={`border-3 border-paper-900 rounded-3xl shadow-sticker p-5 ${a.color} tilt-r-sm`}
          >
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl border-3 border-paper-900 grid place-items-center text-4xl bg-paper-50">{a.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-black text-paper-900/60">你是</div>
                <div className="text-xl font-black text-paper-900 truncate doodle-title">{a.nickname}</div>
                <div className="text-xs font-bold text-paper-900/70">{a.type}</div>
              </div>
            </div>
            <div className="mt-3 text-sm font-bold text-paper-900">"{a.oneLiner}"</div>
            <div className="mt-2 text-xs font-bold text-paper-900/70">今晚建议：{a.advice}</div>
          </motion.div>

          {/* 进度提示 */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <PhaseProgress
              value={playerIdx + 1}
              total={players.length}
              label={`已完成 ${playerIdx + 1} / ${players.length} 位玩家`}
              tone="cyan"
            />
          </motion.div>

          {/* 明确的换人按钮 —— 不再让用户困惑 */}
          {!isLast ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <div className="sticker p-4 bg-sticker-yellow text-center">
                <div className="text-2xl mb-1">📱➡️</div>
                <div className="text-sm font-black text-paper-900">把手机递给</div>
                <div className="text-2xl font-black doodle-title text-paper-900 mt-1">{nextPlayer?.name}</div>
                <div className="text-[11px] font-bold text-paper-900/70 mt-1">轮到 TA 测了</div>
              </div>
              <NeonButton full size="lg" onClick={goNextPlayerOrReveal}>
                好了，给 {nextPlayer?.name} →
              </NeonButton>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="sticker p-4 bg-sticker-mint text-center mb-2">
                <div className="text-3xl mb-1">🏁</div>
                <div className="text-sm font-black text-paper-900">全员测完啦！</div>
                <div className="text-[11px] font-bold text-paper-900/70 mt-1">一起来看今晚的派对配置</div>
              </div>
              <NeonButton full size="lg" onClick={goNextPlayerOrReveal}>
                🎊 揭晓今晚配置 →
              </NeonButton>
            </motion.div>
          )}
        </div>
      </GameLayout>
    );
  }

  if (phase === 'reveal') {
    const summary = summarizeParty(results.map((r) => r.type));
    const shareLines = results.map((r) => {
      const p = players.find((x) => x.id === r.playerId);
      const a = ARCHETYPES[r.type];
      return p && a ? `${p.name} · ${a.emoji}${a.nickname}（${a.type}）` : '';
    }).filter(Boolean).join('\n');
    const shareText = `🎈 今晚的 VibeType 派对人格揭晓\n\n${shareLines}\n\n来 vibepartyglobal.vercel.app 测测你的派对角色`;

    return (
      <GameLayout title="今晚配置" subtitle="所有人的派对人格揭晓">
        <ShareResultCard shareText={shareText} filename="vibetype-result.png">
          <div className="space-y-3 p-3 rounded-3xl bg-paper-50 border-3 border-paper-900">
            <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 180 }}
              className="border-3 border-paper-900 rounded-2xl shadow-sticker p-4 bg-sticker-yellow text-center tilt-r-sm">
              <div className="text-3xl">🎈</div>
              <div className="text-xs font-black text-paper-900/70 mt-1">今晚 VibeParty 配置</div>
              <div className="font-black text-paper-900 mt-1">{summary || '—'}</div>
            </motion.div>
            {results.map((r, idx) => {
              const player = players.find((p) => p.id === r.playerId);
              const a = ARCHETYPES[r.type];
              if (!player || !a) return null;
              return (
                <motion.div key={r.playerId}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 180, delay: 0.1 + idx * 0.08 }}
                  className={`border-3 border-paper-900 rounded-2xl shadow-sticker-sm p-3 ${a.color}`}>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl border-3 border-paper-900 grid place-items-center text-3xl bg-paper-50">{a.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-black text-paper-900/60">{player.name}</div>
                      <div className="font-black text-paper-900 truncate">{a.nickname} · {a.type}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-bold text-paper-900">"{a.oneLiner}"</div>
                  <div className="mt-1 text-xs font-bold text-paper-900/70">今晚建议：{a.advice}</div>
                </motion.div>
              );
            })}
            <div className="text-center text-[10px] font-bold text-paper-900/50">vibepartyglobal.vercel.app</div>
          </div>
        </ShareResultCard>
        <div className="pt-3 grid grid-cols-2 gap-3">
          <NeonButton full variant="secondary" onClick={restart}>重新测</NeonButton>
          <NeonButton full onClick={startBlind}>进入盲猜 🙈</NeonButton>
        </div>
        <p className="text-center text-[11px] text-paper-900/50 font-bold pt-2">仅供派对娱乐，不代表真实人格测评。</p>
      </GameLayout>
    );
  }

  if (phase === 'blindHandoff' && guessTarget) {
    return (
      <>
        <GameLayout title="盲猜 · 谁是派对人精" subtitle={`即将猜：${guessTarget.name}`}>
          <PhaseProgress value={guessTargetIdx} total={players.length} label={`已猜 ${guessTargetIdx} / ${players.length} 位`} tone="cyan" />
        </GameLayout>
        <HandoffScreen
          open
          nextPlayerName={guessTarget.name}
          hint="全场一起猜这个人是哪一面"
          onDone={() => setPhase('blindGuess')}
        />
      </>
    );
  }

  if (phase === 'blindGuess' && guessTarget && currentAxis) {
    return (
      <GameLayout title="盲猜 · 谁是派对人精" subtitle={`猜 · ${guessTarget.name} · ${guessAxisIdx + 1} / 4`}>
        <div className="space-y-4">
          <PhaseProgress value={guessAxisIdx + 1} total={4} label="维度" tone="cyan" />
          <GlassCard tone="pink">
            <div className="text-xs font-black text-paper-900/60">全场一起猜</div>
            <div className="mt-1 text-2xl font-black">{guessTarget.name} 是哪一面？</div>
          </GlassCard>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => submitGuess(currentAxis.a)} className="p-6 rounded-3xl border-3 border-paper-900 bg-sticker-cyan shadow-sticker press-down tilt-l-sm">
              <div className="text-3xl mb-1">{axisEmoji(currentAxis.a)}</div>
              <div className="font-black text-paper-900">{currentAxis.aLabel}</div>
            </button>
            <button onClick={() => submitGuess(currentAxis.b)} className="p-6 rounded-3xl border-3 border-paper-900 bg-sticker-pink shadow-sticker press-down tilt-r-sm">
              <div className="text-3xl mb-1">{axisEmoji(currentAxis.b)}</div>
              <div className="font-black text-paper-900">{currentAxis.bLabel}</div>
            </button>
          </div>
        </div>
      </GameLayout>
    );
  }

  if (phase === 'blindResult') {
    const ranked = [...players].map((p) => ({ p, score: guessScores[p.id] ?? 0 })).sort((a, b) => b.score - a.score);
    const top = ranked[0];
    return (
      <GameLayout title="盲猜结果" subtitle="今晚的派对人精是…">
        <div className="space-y-3">
          {top && (
            <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 180 }}
              className="border-3 border-paper-900 rounded-3xl shadow-sticker p-5 bg-sticker-yellow text-center tilt-r-sm">
              <div className="text-5xl">🏆</div>
              <div className="mt-2 font-black text-paper-900">今晚派对人精</div>
              <div className="text-2xl font-black neon-text mt-1">{top.p.name}</div>
              <div className="text-xs font-bold text-paper-900/70 mt-1">猜对 {top.score} / {players.length * 4}</div>
            </motion.div>
          )}
          <GlassCard>
            <div className="font-black text-paper-900 mb-2">详细得分</div>
            <ul className="space-y-1 text-sm font-bold text-paper-900/85">
              {ranked.map(({ p, score }) => (
                <li key={p.id} className="flex items-center justify-between">
                  <span>{p.name}</span><span>{score} / {players.length * 4}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
          <div className="pt-3 grid grid-cols-2 gap-3">
            <NeonButton full variant="secondary" onClick={restart}>再玩一局</NeonButton>
            <a href="/lobby" className="contents"><NeonButton full>返回大厅</NeonButton></a>
          </div>
        </div>
      </GameLayout>
    );
  }

  return null;
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="px-3 py-2 rounded-full border-3 border-paper-900 bg-paper-50 shadow-sticker-sm text-center">{children}</span>;
}

function axisEmoji(l: AxisLetter): string {
  return ({ E: '📢', I: '🌙', S: '📏', N: '💫', T: '🧊', F: '💖', J: '📅', P: '🎲' } as Record<string, string>)[l];
}
