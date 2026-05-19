import Link from 'next/link';
import AppShell from '@/components/AppShell';
import PageHeader from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';

export default function SafetyPage() {
  return (
    <AppShell>
      <PageHeader title="安全参与指南" backHref="/" />
      <main className="px-4 pb-24 space-y-4">
        <GlassCard tone="yellow">
          <div className="font-black text-lg">玩得开心，也玩得安心 ✌️</div>
          <p className="mt-2 text-sm font-semibold text-paper-900/85">VibeParty 是为了让聚会更轻松，不是为了强迫任何人。</p>
        </GlassCard>
        <GlassCard>
          <ul className="space-y-2 text-sm font-semibold text-paper-900/90">
            <li>· 所有挑战都可以跳过，不需要理由。</li>
            <li>· 请尊重每个人的边界，不勉强亲密接触。</li>
            <li>· 如果开启喝酒模式，请确认达到当地法定饮酒年龄。</li>
            <li>· 不要劰酒、拼酒或酒后驾驶。</li>
            <li>· 某个问题让你不舒服，请直接跳过。</li>
            <li>· 主持人、朋友应该照顾现场气氛，而不是制造压力。</li>
          </ul>
        </GlassCard>
        <div className="mt-2"><Link href="/"><NeonButton full size="lg">我知道了</NeonButton></Link></div>
      </main>
    </AppShell>
  );
}
