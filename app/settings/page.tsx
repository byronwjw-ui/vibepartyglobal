'use client';
import AppShell from '@/components/AppShell';
import PageHeader from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import ModeSelector from '@/components/ModeSelector';
import SafetyModal from '@/components/SafetyModal';
import ConfirmModal from '@/components/ConfirmModal';
import Link from 'next/link';
import { useState } from 'react';
import { usePartyStore } from '@/store/usePartyStore';

export default function SettingsPage() {
  const settings = usePartyStore((s) => s.settings);
  const setMode = usePartyStore((s) => s.setMode);
  const setDrinking = usePartyStore((s) => s.setDrinking);
  const setAgeConfirmed = usePartyStore((s) => s.setAgeConfirmed);
  const setContentLevel = usePartyStore((s) => s.setContentLevel);
  const setSound = usePartyStore((s) => s.setSound);
  const setVibration = usePartyStore((s) => s.setVibration);
  const clearPlayers = usePartyStore((s) => s.clearPlayers);
  const resetAll = usePartyStore((s) => s.resetAll);
  const [safetyOpen, setSafetyOpen] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <AppShell>
      <PageHeader title="设置" backHref="/lobby" />
      <main className="px-4 pb-24 space-y-4">
        <GlassCard>
          <div className="font-semibold mb-3">聚会模式</div>
          <ModeSelector value={settings.mode} onChange={(m) => {
            if (m === 'drinking' && !settings.ageConfirmed) setSafetyOpen(true);
            else { setMode(m); setDrinking(m === 'drinking'); }
          }}/>
        </GlassCard>

        <GlassCard>
          <Row label="喝酒模式" desc={settings.ageConfirmed ? '年龄已确认' : '需年龄确认'}>
            <Switch checked={settings.drinkingEnabled} onChange={(v) => {
              if (v && !settings.ageConfirmed) setSafetyOpen(true);
              else { setDrinking(v); setMode(v ? 'drinking' : 'friends'); }
            }}/>
          </Row>
          <Row label="内容强度" desc="轻松 / 搞笑 / 暧昧">
            <div className="flex gap-2">
              {(['soft','funny','spicy'] as const).map((l) => (
                <button key={l} onClick={() => setContentLevel(l)} className={`px-3 h-9 rounded-xl text-sm ${settings.contentLevel===l?'bg-neon-grad text-white':'bg-white/10'}`}>{l==='soft'?'轻松':l==='funny'?'搞笑':'暧昧'}</button>
              ))}
            </div>
          </Row>
          <Row label="声音"><Switch checked={settings.soundEnabled} onChange={setSound}/></Row>
          <Row label="震动"><Switch checked={settings.vibrationEnabled} onChange={setVibration}/></Row>
        </GlassCard>

        <GlassCard>
          <Link href="/safety" className="block py-3 border-b border-white/10">查看安全提示</Link>
          <Link href="/about" className="block py-3">关于 VibeParty</Link>
        </GlassCard>

        <GlassCard>
          <NeonButton full variant="secondary" onClick={() => setConfirmClear(true)}>清空玩家数据</NeonButton>
          <div className="h-2"/>
          <NeonButton full variant="danger" onClick={() => setConfirmReset(true)}>重置全部本地数据</NeonButton>
        </GlassCard>
      </main>
      <SafetyModal open={safetyOpen} onConfirm={() => { setAgeConfirmed(true); setDrinking(true); setMode('drinking'); setSafetyOpen(false); }} onCancel={() => setSafetyOpen(false)}/>
      <ConfirmModal open={confirmClear} title="清空玩家？" desc="玩家名单将被清除。" onCancel={() => setConfirmClear(false)} onConfirm={() => { clearPlayers(); setConfirmClear(false); }}/>
      <ConfirmModal open={confirmReset} title="重置全部数据？" desc="将清除玩家、设置与历史。" onCancel={() => setConfirmReset(false)} onConfirm={() => { resetAll(); setConfirmReset(false); }}/>
    </AppShell>
  );
}

function Row({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
      <div className="min-w-0 flex-1">
        <div className="font-medium">{label}</div>
        {desc ? <div className="text-xs text-white/50">{desc}</div> : null}
      </div>
      {children}
    </div>
  );
}

function Switch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} className={`h-7 w-12 rounded-full p-0.5 transition ${checked ? 'bg-neon-grad' : 'bg-white/15'}`}>
      <span className={`block h-6 w-6 rounded-full bg-white transition ${checked ? 'translate-x-5' : ''}`}/>
    </button>
  );
}
