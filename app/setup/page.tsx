'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/AppShell';
import PageHeader from '@/components/PageHeader';
import NeonButton from '@/components/NeonButton';
import GlassCard from '@/components/GlassCard';
import PlayerChip from '@/components/PlayerChip';
import ModeSelector from '@/components/ModeSelector';
import SafetyModal from '@/components/SafetyModal';
import { usePartyStore } from '@/store/usePartyStore';
import { Dice5, UserPlus, Users } from 'lucide-react';

export default function SetupPage() {
  const router = useRouter();
  const players = usePartyStore((s) => s.players);
  const addPlayer = usePartyStore((s) => s.addPlayer);
  const addRandomPlayer = usePartyStore((s) => s.addRandomPlayer);
  const fillFour = usePartyStore((s) => s.fillFour);
  const removePlayer = usePartyStore((s) => s.removePlayer);
  const renamePlayer = usePartyStore((s) => s.renamePlayer);
  const settings = usePartyStore((s) => s.settings);
  const setMode = usePartyStore((s) => s.setMode);
  const setDrinking = usePartyStore((s) => s.setDrinking);
  const setAgeConfirmed = usePartyStore((s) => s.setAgeConfirmed);

  const [name, setName] = useState('');
  const [safetyOpen, setSafetyOpen] = useState(false);

  return (
    <AppShell>
      <PageHeader title="玩家设置" backHref="/" />
      <main className="px-4 pb-32 space-y-6">
        <GlassCard>
          <div className="flex items-center gap-2">
            <Users size={18}/>
            <div className="font-black">加人玩🎉</div>
            <span className="ml-auto text-xs font-bold text-paper-900/60">{players.length} 人</span>
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="输入昵称或随机"
              className="flex-1 h-11 px-3 rounded-2xl bg-paper-50 border-3 border-paper-900 outline-none focus:bg-sticker-yellow font-bold"
              maxLength={12}
            />
            <NeonButton size="md" onClick={() => { addPlayer(name); setName(''); }}><UserPlus size={16}/> 加入</NeonButton>
          </div>
          <div className="mt-3 flex gap-2">
            <NeonButton size="sm" variant="secondary" onClick={addRandomPlayer}><Dice5 size={14}/> 随机一位</NeonButton>
            <NeonButton size="sm" variant="secondary" onClick={fillFour}>一键生成4人</NeonButton>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {players.map((p) => (
              <PlayerChip key={p.id} player={p} onRemove={() => removePlayer(p.id)} onEdit={() => {
                const v = window.prompt('修改昵称', p.name);
                if (v && v.trim()) renamePlayer(p.id, v.trim().slice(0, 12));
              }}/>
            ))}
            {!players.length && <div className="text-sm text-paper-900/60 font-semibold">还没有玩家，点击上方按钮添加。</div>}
          </div>
        </GlassCard>

        <GlassCard tone="yellow">
          <div className="font-black mb-3">选个氛围眼神👀</div>
          <div className="text-xs text-paper-900/70 font-semibold mb-3">不同模式会真的影响按题库、大厅顺序和主题色 — 不是装饰。</div>
          <ModeSelector value={settings.mode} onChange={(m) => {
            if (m === 'drinking' && !settings.ageConfirmed) {
              setSafetyOpen(true);
            } else {
              setMode(m);
              setDrinking(m === 'drinking');
            }
          }}/>
        </GlassCard>
      </main>
      <div className="sticky bottom-0 inset-x-0 px-4 pt-3 pb-6 bg-gradient-to-t from-paper-50 via-paper-50/95 to-transparent">
        <NeonButton full size="lg" disabled={players.length < 2} onClick={() => router.push('/lobby')} className={players.length < 2 ? 'opacity-60' : ''}>
          {players.length < 2 ? '至少需要 2 位玩家' : '🚀 进入游戏大厅'}
        </NeonButton>
      </div>
      <SafetyModal open={safetyOpen} onConfirm={() => { setAgeConfirmed(true); setMode('drinking'); setDrinking(true); setSafetyOpen(false); }} onCancel={() => setSafetyOpen(false)} />
    </AppShell>
  );
}
