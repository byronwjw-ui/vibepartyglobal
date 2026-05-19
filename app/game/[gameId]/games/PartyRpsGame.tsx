'use client';
import { useMemo, useState } from 'react';
import { usePartyStore } from '@/store/usePartyStore';
import GameLayout from '@/components/GameLayout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import PlayerSelector from '@/components/PlayerSelector';
import { RPS_CHALLENGES, RPS_LABEL, type RpsMove } from '@/data/zh-CN/partyRps';
import { filterByModeAndLevel } from '@/lib/modeFilter';
import { localizeDrinkCopy } from '@/lib/modeFilter';
import { pick } from '@/lib/random';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

const MOVES: RpsMove[] = ['rock','paper','scissors','bomb','shield','mirror'];

/**
 * 规则简化：
 *  - 常规：rock > scissors > paper > rock
 *  - bomb：克 rock & scissors，被 shield/mirror 反制
 *  - shield：化解 bomb；其他正常比；shield vs shield 平
 *  - mirror：复制对手出的牌 -> 同结果（即对手赢的牌反弹给对手）
 */
function judge(a: RpsMove, b: RpsMove): 'A' | 'B' | 'tie' {
  if (a === b) return 'tie';
  // mirror: 把对手的牌复制回去（即如果对手的牌能赢 mirror，则反弹）
  if (a === 'mirror') return judge(b, b) === 'tie' ? 'tie' : 'A';
  if (b === 'mirror') return judge(a, a) === 'tie' ? 'tie' : 'B';
  // shield 化解 bomb
  if (a === 'shield' && b === 'bomb') return 'A';
  if (b === 'shield' && a === 'bomb') return 'B';
  // shield vs 普通：shield 平局
  if (a === 'shield' || b === 'shield') return 'tie';
  // bomb 克 rock & scissors，输给 paper
  if (a === 'bomb') return b === 'paper' ? 'B' : 'A';
  if (b === 'bomb') return a === 'paper' ? 'A' : 'B';
  // 经典
  const beats: Record<string, string> = { rock: 'scissors', scissors: 'paper', paper: 'rock' };
  return beats[a] === b ? 'A' : 'B';
}

export default function PartyRpsGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const pool = useMemo(() => filterByModeAndLevel(RPS_CHALLENGES, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);

  const [aId, setAId] = useState(players[0]?.id ?? '');
  const [bId, setBId] = useState(players[1]?.id ?? '');
  const [aMove, setAMove] = useState<RpsMove | null>(null);
  const [bMove, setBMove] = useState<RpsMove | null>(null);
  const [challenge, setChallenge] = useState(() => localizeDrinkCopy(pick(pool.length ? pool : RPS_CHALLENGES).text, settings.mode, settings.drinkingEnabled));

  const a = players.find((p) => p.id === aId);
  const b = players.find((p) => p.id === bId);
  const result = aMove && bMove ? judge(aMove, bMove) : null;
  const winner = result === 'A' ? a?.name : result === 'B' ? b?.name : null;
  const loser  = result === 'A' ? b?.name : result === 'B' ? a?.name : null;

  const reset = () => {
    setAMove(null); setBMove(null);
    setChallenge(localizeDrinkCopy(pick(pool.length ? pool : RPS_CHALLENGES).text, settings.mode, settings.drinkingEnabled));
  };

  return (
    <GameLayout title="派对猜拳 ✊"
      footer={<NeonButton full onClick={reset}><RotateCcw size={16}/> 下一回合</NeonButton>}>
      <div className="space-y-4">
        <GlassCard>
          <div className="font-black mb-2">选两位对决</div>
          <div className="grid grid-cols-2 gap-3">
            <div><div className="text-xs font-bold text-paper-900/70 mb-1">A 方</div><PlayerSelector players={players} selectedId={aId} onSelect={setAId} /></div>
            <div><div className="text-xs font-bold text-paper-900/70 mb-1">B 方</div><PlayerSelector players={players} selectedId={bId} onSelect={setBId} /></div>
          </div>
        </GlassCard>

        {(['A','B'] as const).map((side) => {
          const player = side === 'A' ? a : b;
          const move = side === 'A' ? aMove : bMove;
          const setMove = side === 'A' ? setAMove : setBMove;
          if (!player) return null;
          return (
            <GlassCard key={side} tone={side === 'A' ? 'yellow' : 'cyan'} tilt={side === 'A' ? 'l' : 'r'}>
              <div className="font-black">{side} 方：{player.name}{move ? '（已出）' : ''}</div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {MOVES.map((m) => (
                  <button key={m} onClick={() => setMove(m)}
                    className={`rounded-2xl border-3 border-paper-900 px-2 py-3 text-sm font-bold press-down ${move === m ? 'bg-sticker-pink shadow-sticker' : 'bg-paper-50 shadow-sticker-sm'}`}>
                    {RPS_LABEL[m]}
                  </button>
                ))}
              </div>
            </GlassCard>
          );
        })}

        <AnimatePresence>
          {result && (
            <motion.div initial={{ scale: 0.9, opacity: 0, rotate: -3 }} animate={{ scale: 1, opacity: 1, rotate: 0 }}>
              <GlassCard tone="lime">
                {result === 'tie' ? (
                  <div className="text-xl font-black">🤝 平局！再来一局</div>
                ) : (
                  <>
                    <div className="text-xl font-black">🏆 {winner} 胜！</div>
                    <div className="mt-2 text-sm font-semibold text-paper-900/85">{loser} 接挑战：</div>
                    <div className="mt-1 text-base font-black">{challenge}</div>
                  </>
                )}
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GameLayout>
  );
}
