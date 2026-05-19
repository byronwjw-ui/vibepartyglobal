'use client';
import AppShell from './AppShell';
import PageHeader from './PageHeader';
import BottomActionBar from './BottomActionBar';
import { usePartyStore } from '@/store/usePartyStore';
import { MODE_THEME } from '@/lib/constants';

export default function GameLayout({
  title, children, footer, rules, currentPlayer,
}: {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** 顶部可显示的简短规则 */
  rules?: string;
  /** 顶部可显示当前轮到的玩家名 */
  currentPlayer?: string;
}) {
  const settings = usePartyStore((s) => s.settings);
  const theme = MODE_THEME[settings.mode];

  return (
    <AppShell>
      <PageHeader title={title} backHref="/lobby" />
      <main className="px-4 pb-24">
        {/* 顶部小信息条：当前模式 / 玩家 / 规则 */}
        {(rules || currentPlayer) && (
          <div className={`mb-3 rounded-2xl border-3 border-paper-900 px-3 py-2 ${theme.bg} shadow-sticker-sm tilt-l-sm`}>
            <div className="flex items-center gap-2 text-xs font-bold text-paper-900">
              <span>{theme.emoji} {theme.label}</span>
              {currentPlayer && <span>· 轮到 <b>{currentPlayer}</b></span>}
            </div>
            {rules && <div className="text-[11px] mt-0.5 text-paper-900/75 font-semibold">{rules}</div>}
          </div>
        )}
        {children}
      </main>
      {footer && <BottomActionBar>{footer}</BottomActionBar>}
    </AppShell>
  );
}
