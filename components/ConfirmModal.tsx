'use client';
import { motion, AnimatePresence } from 'framer-motion';
import NeonButton from './NeonButton';

export default function ConfirmModal({ open, title, desc, confirmText = '确认', cancelText = '取消', onConfirm, onCancel }: { open: boolean; title: string; desc?: string; confirmText?: string; cancelText?: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center px-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} className="relative glass p-6 w-full max-w-md">
            <div className="text-lg font-bold">{title}</div>
            {desc ? <div className="text-sm text-white/70 mt-2">{desc}</div> : null}
            <div className="mt-5 flex gap-2">
              <NeonButton full variant="secondary" onClick={onCancel}>{cancelText}</NeonButton>
              <NeonButton full onClick={onConfirm}>{confirmText}</NeonButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
