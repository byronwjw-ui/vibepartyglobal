'use client';
import NeonButton from './NeonButton';
import { SkipForward } from 'lucide-react';

export default function SkipButton({ onClick, label = '跳过' }: { onClick: () => void; label?: string }) {
  return (
    <NeonButton variant="secondary" onClick={onClick}><SkipForward size={16}/> {label}</NeonButton>
  );
}
