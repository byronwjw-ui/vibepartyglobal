'use client';
import AppShell from '@/components/AppShell';
import PageHeader from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { useRouter } from 'next/navigation';
import { usePartyStore } from '@/store/usePartyStore';
import { SAFETY_POINTS } from '@/data/safety';

export default function SafetyPage() {
  const router = useRouter();
  const markSafetySeen = usePartyStore((s) => s.markSafetySeen);
  return (
    <AppShell>
      <PageHeader title="安全参与指南" backHref="/" />
      <main className="px-4 pb-24 space-y-4">
        <GlassCard>
          <ul className="space-y-3 text-sm text-white/85 list-disc pl-5">
            {SAFETY_POINTS.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </GlassCard>
        <NeonButton full size="lg" onClick={() => { markSafetySeen(); router.back(); }}>我知道了</NeonButton>
      </main>
    </AppShell>
  );
}
