import Link from 'next/link';
import NeonButton from './NeonButton';

export default function EmptyState({ title, desc, actionHref, actionLabel }: { title: string; desc?: string; actionHref?: string; actionLabel?: string }) {
  return (
    <div className="sticker p-8 text-center mt-6">
      <div className="text-5xl">🪧</div>
      <div className="mt-3 font-black text-lg doodle-title">{title}</div>
      {desc && <div className="text-sm text-paper-900/70 mt-2 font-medium">{desc}</div>}
      {actionHref && actionLabel && (
        <div className="mt-5"><Link href={actionHref}><NeonButton>{actionLabel}</NeonButton></Link></div>
      )}
    </div>
  );
}
