'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import PlayerSelector from '@/components/PlayerSelector';
import { shuffle } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';

type Role = 'mafia' | 'doctor' | 'detective' | 'civilian';
type Phase = 'setup' | 'view' | 'night-mafia' | 'night-doctor' | 'night-detective' | 'day' | 'vote' | 'end';

interface Assignment { playerId: string; role: Role; alive: boolean; }

function rolesForN(n: number): Role[] {
  // 5: mafia 1 / doctor 1 / detective 1 / civilian 2
  // 6-8: mafia 2 / doctor 1 / detective 1 / rest civilian
  const mafias = n >= 6 ? 2 : 1;
  const arr: Role[] = [];
  for (let i = 0; i < mafias; i++) arr.push('mafia');
  arr.push('doctor');
  arr.push('detective');
  while (arr.length < n) arr.push('civilian');
  return shuffle(arr);
}

const ROLE_LABEL: Record<Role, string> = {
  mafia: '黑手党',
  doctor: '医生',
  detective: '警探',
  civilian: '平民',
};
const ROLE_DESC: Record<Role, string> = {
  mafia: '夜晚选择一名玩家作为目标。',
  doctor: '夜晚选择一名玩家保护，可保护自己。',
  detective: '夜晚选择一名玩家查验阵营。',
  civilian: '白天讨论，找出黑手党。',
};

export default function MafiaLiteGame() {
  const players = usePartyStore((s) => s.players);
  const [phase, setPhase] = useState<Phase>('setup');
  const [assigns, setAssigns] = useState<Assignment[]>([]);
  const [viewIdx, setViewIdx] = useState(0);
  const [shown, setShown] = useState(false);

  const [mafiaTarget, setMafiaTarget] = useState<string | null>(null);
  const [doctorTarget, setDoctorTarget] = useState<string | null>(null);
  const [detectiveTarget, setDetectiveTarget] = useState<string | null>(null);
  const [detectiveResult, setDetectiveResult] = useState<string | null>(null);
  const [nightOutcome, setNightOutcome] = useState<string>('');
  const [voteId, setVoteId] = useState<string | null>(null);
  const [winner, setWinner] = useState<'mafia' | 'town' | null>(null);

  const alive = useMemo(() => assigns.filter((a) => a.alive), [assigns]);
  const aliveCivilianSide = alive.filter((a) => a.role !== 'mafia').length;
  const aliveMafia = alive.filter((a) => a.role === 'mafia').length;
  const alivePlayers = (filter: (a: Assignment) => boolean = () => true) =>
    alive.filter(filter).map((a) => players.find((p) => p.id === a.playerId)!).filter(Boolean);

  const start = () => {
    const roles = rolesForN(players.length);
    const list: Assignment[] = players.map((p, i) => ({ playerId: p.id, role: roles[i], alive: true }));
    setAssigns(list);
    setViewIdx(0); setShown(false);
    setMafiaTarget(null); setDoctorTarget(null); setDetectiveTarget(null); setDetectiveResult(null);
    setNightOutcome(''); setVoteId(null); setWinner(null);
    setPhase('view');
  };

  const cur = assigns[viewIdx];
  const curPlayer = cur ? players.find((p) => p.id === cur.playerId) : undefined;

  const aliveMafiaPlayers = alivePlayers((a) => a.role === 'mafia');
  const aliveDoctorPlayers = alivePlayers((a) => a.role === 'doctor');
  const aliveDetectivePlayers = alivePlayers((a) => a.role === 'detective');

  const startNight = () => setPhase(aliveMafiaPlayers.length ? 'night-mafia' : aliveDoctorPlayers.length ? 'night-doctor' : aliveDetectivePlayers.length ? 'night-detective' : 'day');

  const resolveNight = () => {
    let outcome = '一切平静，没有人出局。';
    let next = [...assigns];
    if (mafiaTarget && mafiaTarget !== doctorTarget) {
      next = next.map((a) => a.playerId === mafiaTarget ? { ...a, alive: false } : a);
      const out = players.find((p) => p.id === mafiaTarget);
      outcome = `昨晚 ${out?.name} 出局了。`;
    } else if (mafiaTarget && mafiaTarget === doctorTarget) {
      outcome = '医生成功保护了目标，无人出局。';
    }
    setAssigns(next);
    setNightOutcome(outcome);
    setPhase('day');
  };

  const checkWin = (list: Assignment[]) => {
    const aliveList = list.filter((a) => a.alive);
    const m = aliveList.filter((a) => a.role === 'mafia').length;
    const others = aliveList.length - m;
    if (m === 0) { setWinner('town'); setPhase('end'); return true; }
    if (m >= others) { setWinner('mafia'); setPhase('end'); return true; }
    return false;
  };

  const doVote = () => {
    if (!voteId) return;
    const next = assigns.map((a) => a.playerId === voteId ? { ...a, alive: false } : a);
    setAssigns(next);
    setVoteId(null);
    if (!checkWin(next)) {
      setMafiaTarget(null); setDoctorTarget(null); setDetectiveTarget(null); setDetectiveResult(null);
      startNight();
    }
  };

  return (
    <GameLayout title="Mafia Lite 黑手党极速版" rules="夜晚黑手党/医生/警探依次行动；白天讨论投票。出局/淘汰用语，无血腥。">
      <AnimatePresence mode="wait">
        {phase === 'setup' && (
          <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 space-y-4 text-center">
            <div className="text-6xl">🌙</div>
            <div className="text-white/70">{players.length} 人配置：{players.length >= 6 ? '2 黑手党' : '1 黑手党'} · 1 医生 · 1 警探 · 其余平民</div>
            <NeonButton full size="lg" onClick={start}>分配身份</NeonButton>
          </motion.div>
        )}
        {phase === 'view' && cur && (
          <motion.div key={'v' + viewIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 space-y-4 text-center">
            <div className="text-sm text-white/60">轮到：<b>{curPlayer?.name}</b></div>
            <div className="glass p-8 min-h-[180px] grid place-items-center">
              {!shown ? (
                <div><div className="text-white/70 mb-3">手机传给 {curPlayer?.name}</div><NeonButton onClick={() => setShown(true)}>查看我的身份</NeonButton></div>
              ) : (
                <div>
                  <div className="text-xs text-white/60">你的身份</div>
                  <div className="text-3xl font-black neon-text mt-2">{ROLE_LABEL[cur.role]}</div>
                  <div className="text-xs text-white/60 mt-2">{ROLE_DESC[cur.role]}</div>
                </div>
              )}
            </div>
            <NeonButton full size="lg" disabled={!shown} onClick={() => {
              setShown(false);
              if (viewIdx + 1 >= assigns.length) startNight(); else setViewIdx((i) => i + 1);
            }}>{viewIdx + 1 >= assigns.length ? '进入夜晚' : '下一位查看'}</NeonButton>
          </motion.div>
        )}
        {phase === 'night-mafia' && (
          <motion.div key="nm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4 space-y-4">
            <div className="glass p-5 text-center"><div className="text-5xl mb-2">🌙</div><div className="text-white/80">夜晚 · 黑手党行动</div><div className="text-xs text-white/60 mt-1">{aliveMafiaPlayers.map((p) => p.name).join(' / ')} 醒来，选择目标。</div></div>
            <PlayerSelector players={alivePlayers((a) => a.role !== 'mafia')} selectedId={mafiaTarget || undefined} onSelect={setMafiaTarget}/>
            <NeonButton full size="lg" disabled={!mafiaTarget} onClick={() => setPhase(aliveDoctorPlayers.length ? 'night-doctor' : aliveDetectivePlayers.length ? 'night-detective' : 'day')}>确认 · 黑手党闭眼</NeonButton>
          </motion.div>
        )}
        {phase === 'night-doctor' && (
          <motion.div key="nd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4 space-y-4">
            <div className="glass p-5 text-center"><div className="text-5xl mb-2">💊</div><div className="text-white/80">夜晚 · 医生行动</div><div className="text-xs text-white/60 mt-1">{aliveDoctorPlayers.map((p) => p.name).join(' / ')} 醒来，选择保护对象。</div></div>
            <PlayerSelector players={alivePlayers()} selectedId={doctorTarget || undefined} onSelect={setDoctorTarget}/>
            <NeonButton full size="lg" disabled={!doctorTarget} onClick={() => setPhase(aliveDetectivePlayers.length ? 'night-detective' : 'day')}>确认 · 医生闭眼</NeonButton>
          </motion.div>
        )}
        {phase === 'night-detective' && (
          <motion.div key="ndet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4 space-y-4">
            <div className="glass p-5 text-center"><div className="text-5xl mb-2">🔎</div><div className="text-white/80">夜晚 · 警探行动</div><div className="text-xs text-white/60 mt-1">{aliveDetectivePlayers.map((p) => p.name).join(' / ')} 醒来，选择查验对象。</div></div>
            <PlayerSelector players={alivePlayers((a) => a.role !== 'detective')} selectedId={detectiveTarget || undefined} onSelect={(id) => {
              setDetectiveTarget(id);
              const r = assigns.find((a) => a.playerId === id)?.role;
              setDetectiveResult(r === 'mafia' ? '是黑手党' : '不是黑手党');
            }}/>
            {detectiveResult && <div className="glass p-4 text-center">查验结果：<b className="neon-text">{detectiveResult}</b></div>}
            <NeonButton full size="lg" disabled={!detectiveTarget} onClick={resolveNight}>确认 · 进入白天</NeonButton>
          </motion.div>
        )}
        {phase === 'day' && (
          <motion.div key="day" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4 space-y-4">
            <div className="glass p-5 text-center"><div className="text-5xl mb-2">☀️</div><div className="text-white/80">白天 · 公告</div><div className="text-sm text-white/70 mt-2">{nightOutcome}</div></div>
            <div className="text-xs text-white/60">存活：{alive.length} 人 · 黑手党 {aliveMafia} · 其他 {aliveCivilianSide}</div>
            <NeonButton full size="lg" onClick={() => setPhase('vote')}>讨论完毕 · 进入投票</NeonButton>
          </motion.div>
        )}
        {phase === 'vote' && (
          <motion.div key="vote" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4 space-y-4">
            <div className="text-sm text-white/60">投票淘汰一名玩家</div>
            <PlayerSelector players={alivePlayers()} selectedId={voteId || undefined} onSelect={setVoteId}/>
            <NeonButton full size="lg" disabled={!voteId} onClick={doVote}>确认淘汰</NeonButton>
          </motion.div>
        )}
        {phase === 'end' && (
          <motion.div key="end" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-6 space-y-4 text-center">
            <div className="text-6xl">{winner === 'mafia' ? '🌙' : '☀️'}</div>
            <div className="text-3xl font-black neon-text">{winner === 'mafia' ? '黑手党胜利' : '平民阵营胜利'}</div>
            <div className="glass p-4 text-left text-sm">
              <div className="text-white/60 mb-2">身份揭晓</div>
              {assigns.map((a) => {
                const p = players.find((x) => x.id === a.playerId);
                return <div key={a.playerId} className="flex justify-between py-1"><span>{p?.name}{!a.alive && <span className="text-white/40"> · 出局</span>}</span><b>{ROLE_LABEL[a.role]}</b></div>;
              })}
            </div>
            <NeonButton full size="lg" onClick={() => setPhase('setup')}>再来一局</NeonButton>
          </motion.div>
        )}
      </AnimatePresence>
    </GameLayout>
  );
}
