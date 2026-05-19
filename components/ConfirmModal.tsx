'use client';
import { motion, AnimatePresence } from 'framer-motion';
import NeonButton from './NeonButton';

export default function ConfirmModal({ open, title, desc, confirmLabel = '确认', cancelLabel = '取消', onConfirm, onCancel, danger }: {
  open: boolean; title: string; desc?: string;
  confirmLabel?: string; cancelLabel?: string;
  onConfirm: () => void; onCancel: () => void;
  danger?: boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center p-5 bg-paper-900/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }} className="w-full max-w-sm sticker p-6">
            <div className="text-xl font-black doodle-title">{title}</div>
            {desc && <div className="text-sm text-paper-900/80 mt-2 font-medium">{desc}</div>}
            <div className="mt-5 flex flex-col gap-2">
              <NeonButton full variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>{confirmLabel}</NeonButton>
              <NeonButton full variant="secondary" onClick={onCancel}>{cancelLabel}</NeonButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
