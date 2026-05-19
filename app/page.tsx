import Link from 'next/link';
import AppShell from '@/components/AppShell';
import NeonButton from '@/components/NeonButton';
import GlassCard from '@/components/GlassCard';
import { Sparkles, Users, Wine } from 'lucide-react';

export default function HomePage() {
  return (
    <AppShell>
      <main className="px-5 pt-10 pb-24">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-neon-grad shadow-neon grid place-items-center font-black">V</div>
          <span className="text-lg font-extrabold tracking-wider neon-text">VibeParty</span>
        </div>
        <section className="mt-14">
          <h1 className="text-4xl font-black leading-tight">让聚会<br/><span className="neon-text">马上热起来</span></h1>
          <p className="mt-4 text-paper-900/70 font-semibold leading-relaxed">32 款多人派对游戏·派对人格测试·谁是 AI · 现场 Tier List。适合朋友局、KTV、酒吧、破冰、暧昧局和无酒精聚会。</p>
        </section>
        <section className="mt-10 flex flex-col gap-3">
          <Link href="/setup"><NeonButton full size="lg">开始组局</NeonButton></Link>
          <Link href="/lobby"><NeonButton full size="lg" variant="secondary">先看看游戏</NeonButton></Link>
        </section>
        <section className="mt-10 grid gap-3">
          <GlassCard tone="yellow" className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-paper-50 border-3 border-paper-900 grid place-items-center"><Sparkles size={18} /></div>
            <div><div className="font-black text-paper-900">新增派对实验室 🧬</div><div className="text-sm text-paper-900/70 font-semibold mt-1">VibeType 人格 · 谁是 AI · 一句一图 · 现场 Tier List。</div></div>
          </GlassCard>
          <GlassCard tone="cyan" className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-paper-50 border-3 border-paper-900 grid place-items-center"><Users size={18} /></div>
            <div><div className="font-black text-paper-900">支持多人轮流互动</div><div className="text-sm text-paper-900/70 font-semibold mt-1">围着一台手机就能开局，2 人到 8 人都好玩。</div></div>
          </GlassCard>
          <GlassCard tone="orange" className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-paper-50 border-3 border-paper-900 grid place-items-center"><Wine size={18} /></div>
            <div><div className="font-black text-paper-900">喝酒与无酒精模式自由切换</div><div className="text-sm text-paper-900/70 font-semibold mt-1">默认安全，开启喝酒模式需年龄确认。</div></div>
          </GlassCard>
        </section>
        <div className="mt-12 text-center text-xs text-paper-900/60 font-bold">
          <Link href="/safety" className="underline underline-offset-4">理性游戏，尊重边界，所有挑战都可以跳过</Link>
        </div>
      </main>
    </AppShell>
  );
}
