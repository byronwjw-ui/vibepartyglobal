import Link from 'next/link';
import NeonButton from './NeonButton';

export default function EmptyState({
  title,
  desc,
  actionHref,
  actionLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  desc?: string;
  actionHref?: string;
  actionLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="sticker p-8 text-center mt-6 tilt-r-sm">
      <div className="text-5xl">🪧</div>
      <div className="mt-3 font-black text-lg text-paper-900">{title}</div>
      {desc && <div className="text-sm text-paper-900/70 mt-2 font-semibold">{desc}</div>}
      <div className="mt-5 flex flex-col gap-2">
        {actionHref && actionLabel && (
          <Link href={actionHref}><NeonButton full>{actionLabel}</NeonButton></Link>
        )}
        {secondaryHref && secondaryLabel && (
          <Link href={secondaryHref}><NeonButton full variant="secondary">{secondaryLabel}</NeonButton></Link>
        )}
      </div>
    </div>
  );
}
