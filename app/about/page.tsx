import AppShell from '@/components/AppShell';
import PageHeader from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';

export default function AboutPage() {
  return (
    <AppShell>
      <PageHeader title="关于 VibeParty" backHref="/settings" />
      <main className="px-4 pb-24 space-y-4">
        <GlassCard>
          <p className="text-white/80 leading-relaxed text-sm">VibeParty 是一个为现实聚会设计的多人互动游戏平台。我们希望它适合朋友、同事、旅行者、情侣、活动主持和线下场所使用。</p>
        </GlassCard>
        <GlassCard>
          <div className="text-sm space-y-2">
            <div><span className="text-white/50">当前版本：</span>v0.1 MVP</div>
            <div><span className="text-white/50">语言：</span>中文</div>
            <div><span className="text-white/50">模式：</span>免费试玩版</div>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="font-semibold mb-2">未来计划</div>
          <ul className="text-sm text-white/80 list-disc pl-5 space-y-1">
            <li>英文版与多语言</li>
            <li>更多题库与卡组</li>
            <li>大屏模式</li>
            <li>自定义卡组</li>
            <li>场地方 Venue 版</li>
          </ul>
        </GlassCard>
      </main>
    </AppShell>
  );
}
