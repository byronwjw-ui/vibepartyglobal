'use client';
import { motion, AnimatePresence } from 'framer-motion';
import NeonButton from './NeonButton';

export default function SafetyModal({ open, onConfirm, onCancel }: { open: boolean; onConfirm: () => void; onCancel: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center px-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} className="relative glass p-6 w-full max-w-md">
            <div className="text-xl font-bold">请理性参与</div>
            <ul className="mt-3 text-sm text-white/80 space-y-2 list-disc pl-5">
              <li>请确认你已达到当地法定饮酒年龄。</li>
              <li>请勿劝酒、拼酒或酒后驾驶。</li>
              <li>所有挑战都可以跳过。</li>
              <li>尊重每个人的边界和选择。</li>
            </ul>
            <div className="mt-5 flex flex-col gap-2">
              <NeonButton full onClick={onConfirm}>我已了解并确认</NeonButton>
              <NeonButton full variant="secondary" onClick={onCancel}>返回选择其他模式</NeonButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
