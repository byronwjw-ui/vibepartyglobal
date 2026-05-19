import Link from 'next/link';
import NeonButton from './NeonButton';

export default function EmptyState({ title, desc, actionHref, actionLabel }: { title: string; desc?: string; actionHref?: string; actionLabel?: string }) {
  return (
    <div className="glass p-6 text-center">
      <div className="text-lg font-bold">{title}</div>
      {desc ? <div className="text-sm text-white/70 mt-2">{desc}</div> : null}
      {actionHref ? (
        <div className="mt-4"><Link href={actionHref}><NeonButton>{actionLabel || '去设置'}</NeonButton></Link></div>
      ) : null}
    </div>
  );
}
