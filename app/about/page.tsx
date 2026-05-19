import AppShell from '@/components/AppShell';
import PageHeader from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';

export default function AboutPage() {
  return (
    <AppShell>
      <PageHeader title="关于 VibeParty" backHref="/settings" />
      <main className="px-4 pb-24 space-y-4">
        <GlassCard tone="pink">
          <div className="font-black text-lg">VibeParty</div>
          <p className="mt-2 text-sm font-semibold text-paper-900/85">为现实聚会设计的多人互动游戏平台。不同的机机能组出不一样的今晚。</p>
        </GlassCard>
        <GlassCard>
          <ul className="text-sm font-semibold space-y-1 text-paper-900/90">
            <li>当前版本：v0.2 MVP</li>
            <li>语言：中文</li>
            <li>模式：完全免费试玩版</li>
          </ul>
        </GlassCard>
        <GlassCard tone="cyan">
          <div className="font-black">未来计划</div>
          <ul className="mt-2 text-sm font-semibold space-y-1 text-paper-900/90">
            <li>· 英文 / 多语言版</li>
            <li>· 更多题库与自定义卡组</li>
            <li>· 大屏模式 / Venue 商业版</li>
            <li>· 二维码开局</li>
          </ul>
        </GlassCard>
      </main>
    </AppShell>
  );
}
