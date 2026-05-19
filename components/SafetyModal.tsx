'use client';
import { motion, AnimatePresence } from 'framer-motion';
import NeonButton from './NeonButton';

export default function SafetyModal({ open, onConfirm, onCancel }: { open: boolean; onConfirm: () => void; onCancel: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center p-5 bg-paper-900/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ y: 30, opacity: 0, rotate: -1 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: 30, opacity: 0 }} className="w-full max-w-md sticker p-6">
            <div className="text-2xl font-black doodle-title">请理性参与 🍻</div>
            <ul className="mt-4 text-sm space-y-2 text-paper-900/90 font-medium">
              <li>· 请确认你已达到当地法定饮酒年龄。</li>
              <li>· 请勿劝酒、拼酒或酒后驾驶。</li>
              <li>· 所有挑战都可以跳过。</li>
              <li>· 尊重每个人的边界和选择。</li>
            </ul>
            <div className="mt-6 flex flex-col gap-2">
              <NeonButton full onClick={onConfirm}>我已了解并确认</NeonButton>
              <NeonButton full variant="secondary" onClick={onCancel}>返回选择其他模式</NeonButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
