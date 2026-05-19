'use client';
import AppShell from './AppShell';
import PageHeader from './PageHeader';
import BottomActionBar from './BottomActionBar';

export default function GameLayout({ title, children, footer }: { title: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <AppShell>
      <PageHeader title={title} backHref="/lobby" />
      <main className="px-4 pb-24">{children}</main>
      {footer && <BottomActionBar>{footer}</BottomActionBar>}
    </AppShell>
  );
}
