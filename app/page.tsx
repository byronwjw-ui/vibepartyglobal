import Link from 'next/link';
import AppShell from '@/components/AppShell';
import NeonButton from '@/components/NeonButton';
import { Sparkles, Users, Wine } from 'lucide-react';

export default function HomePage() {
  return (
    <AppShell>
      <main className="px-5 pt-8 pb-24">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-2xl bg-sticker-yellow border-3 border-paper-900 shadow-sticker-sm grid place-items-center font-black text-paper-900">V</div>
          <span className="text-xl font-black tracking-wider doodle-title">VibeParty</span>
        </div>

        {/* 主标题 */}
        <section className="mt-12">
          <h1 className="text-5xl font-black leading-[1.05] doodle-title">
            让聚会<br/>
            <span className="inline-block bg-sticker-pink border-3 border-paper-900 rounded-2xl px-3 py-1 -rotate-2 shadow-sticker-sm mt-2">马上热起来</span>
          </h1>
          <p className="mt-6 text-paper-900/80 leading-relaxed font-semibold">28 款多人派对游戏，适合朋友局、KTV、酒吧、破冰、暧昧局和无酒精聚会。</p>
        </section>

        {/* CTA */}
        <section className="mt-10 flex flex-col gap-3">
          <Link href="/setup"><NeonButton full size="lg">🎉 开始组局</NeonButton></Link>
          <Link href="/lobby"><NeonButton full size="lg" variant="secondary">先看看游戏</NeonButton></Link>
        </section>

        {/* 卖点贴纸 */}
        <section className="mt-10 grid gap-4">
          <div className="border-3 border-paper-900 rounded-3xl shadow-sticker p-5 bg-sticker-yellow tilt-l-sm">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-2xl bg-paper-50 grid place-items-center border-3 border-paper-900"><Sparkles size={20} /></div>
              <div>
                <div className="font-black">无需下载，打开就玩</div>
                <div className="text-sm text-paper-900/75 mt-1 font-semibold">扫码或分享链接即可加入，不用注册账号。</div>
              </div>
            </div>
          </div>
          <div className="border-3 border-paper-900 rounded-3xl shadow-sticker p-5 bg-sticker-cyan tilt-r-sm">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-2xl bg-paper-50 grid place-items-center border-3 border-paper-900"><Users size={20} /></div>
              <div>
                <div className="font-black">支持多人轮流互动</div>
                <div className="text-sm text-paper-900/75 mt-1 font-semibold">围着一台手机就能开局，2 到 8 人都好玩。</div>
              </div>
            </div>
          </div>
          <div className="border-3 border-paper-900 rounded-3xl shadow-sticker p-5 bg-sticker-pink tilt-l-sm">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-2xl bg-paper-50 grid place-items-center border-3 border-paper-900"><Wine size={20} /></div>
              <div>
                <div className="font-black">喝酒 / 无酒精自由切换</div>
                <div className="text-sm text-paper-900/75 mt-1 font-semibold">默认安全，开启喝酒模式需年龄确认，无酒精局自动屏蔽酒精相关。</div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 text-center text-xs text-paper-900/60 font-semibold">
          <Link href="/safety" className="underline underline-offset-4 decoration-2 decoration-paper-900">理性游戏，尊重边界，所有挑战都可以跳过</Link>
        </div>
      </main>
    </AppShell>
  );
}
