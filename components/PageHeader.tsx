'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PageHeader({ title, backHref, right }: { title: string; backHref?: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 pt-6 pb-3">
      <div className="flex items-center gap-2 min-w-0">
        {backHref ? (
          <Link href={backHref} className="h-10 w-10 grid place-items-center rounded-full bg-white/10 border border-white/10">
            <ArrowLeft size={18} />
          </Link>
        ) : null}
        <h1 className="text-xl font-bold truncate">{title}</h1>
      </div>
      <div>{right}</div>
    </div>
  );
}
