'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { usePartyStore } from '@/store/usePartyStore';
import { STORY_OPENERS } from '@/data/zh-CN/storyOpeners';
import { pick } from '@/lib/random';
import { Camera, ImagePlus } from 'lucide-react';

type Phase = 'intro' | 'turn' | 'slideshow';
interface Slide { playerId: string; line: string; image: string | null; }

export default function SlideshowStoryGame() {
  const players = usePartyStore((s) => s.players);
  const [phase, setPhase] = useState<Phase>('intro');
  const [opener, setOpener] = useState<string>('');
  const [slides, setSlides] = useState<Slide[]>([]);
  const [turnIdx, setTurnIdx] = useState(0);
  const [line, setLine] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [showIdx, setShowIdx] = useState(0);

  const start = () => {
    setOpener(pick(STORY_OPENERS));
    setSlides([]); setTurnIdx(0); setLine(''); setImage(null); setShowIdx(0);
    setPhase('turn');
  };

  const onPick = (file: File | null) => {
    if (!file) { setImage(null); return; }
    const reader = new FileReader();
    reader.onload = (e) => { setImage(String(e.target?.result || '')); };
    reader.readAsDataURL(file);
  };

  const submit = () => {
    const p = players[turnIdx];
    if (!p) return;
    const next: Slide = { playerId: p.id, line: line.trim() || '…', image };
    const nextSlides = [...slides, next];
    setSlides(nextSlides);
    setLine(''); setImage(null);
    if (turnIdx < players.length - 1) setTurnIdx(turnIdx + 1);
    else { setShowIdx(0); setPhase('slideshow'); }
  };

  if (phase === 'intro') {
    return (
      <GameLayout title="故事接龙 · 一句一图 📸" subtitle="每人接一句故事，配一张现场拍的照片">
        <div className="px-4 space-y-3">
          <GlassCard tone="lime">
            <div className="font-black text-lg">玩法</div>
            <ol className="mt-2 text-sm font-bold text-paper-900/85 space-y-1">
              <li>1）系统给一个故事开头</li>
              <li>2）每个人轮流接一句，并拍一张现场照片</li>
              <li>3）全部接完后看幻灯片 🎦</li>
            </ol>
            <div className="text-[11px] font-bold text-paper-900/60 mt-2">照片仅存本机，不上传、不保存。</div>
          </GlassCard>
          <NeonButton full size="lg" onClick={start}>开始 →</NeonButton>
        </div>
      </GameLayout>
    );
  }

  if (phase === 'turn') {
    const p = players[turnIdx];
    const last = slides[slides.length - 1];
    return (
      <GameLayout title="接龙中" subtitle={`${p?.name} · 第 ${turnIdx + 1} / ${players.length} 句`}>
        <div className="px-4 space-y-3">
          <GlassCard tone="yellow">
            <div className="text-xs font-black text-paper-900/60">上一句</div>
            <div className="mt-1 font-black text-paper-900">{last ? last.line : opener}</div>
          </GlassCard>
          <GlassCard>
            <div className="font-black mb-2">你接一句</div>
            <textarea value={line} onChange={(e) => setLine(e.target.value)} rows={3}
              className="w-full p-3 rounded-2xl border-3 border-paper-900 bg-paper-50 font-bold focus:outline-none"
              placeholder="接一句。那颗星星坚决不开。" />
            <div className="mt-3 font-black">配一张现场照片</div>
            <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden"
              onChange={(e) => onPick(e.target.files?.[0] || null)} />
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button onClick={() => fileRef.current?.click()}
                className="h-12 rounded-2xl border-3 border-paper-900 bg-sticker-cyan shadow-sticker-sm font-black press-down flex items-center justify-center gap-2">
                <Camera size={18} /> 现场拍
              </button>
              <button onClick={() => fileRef.current?.click()}
                className="h-12 rounded-2xl border-3 border-paper-900 bg-sticker-pink shadow-sticker-sm font-black press-down flex items-center justify-center gap-2">
                <ImagePlus size={18} /> 从相册选
              </button>
            </div>
            {image && (
              <div className="mt-3 rounded-2xl border-3 border-paper-900 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="slide" className="w-full max-h-64 object-cover" />
              </div>
            )}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <NeonButton full variant="secondary" onClick={() => { setLine(''); setImage(null); }}>重写</NeonButton>
              <NeonButton full onClick={submit}>提交 →</NeonButton>
            </div>
          </GlassCard>
        </div>
      </GameLayout>
    );
  }

  if (phase === 'slideshow') {
    const slide = slides[showIdx];
    const p = players.find((x) => x.id === slide?.playerId);
    return (
      <GameLayout title="今晚的故事" subtitle={`${showIdx + 1} / ${slides.length}`}>
        <div className="px-4 space-y-3">
          <AnimatePresence mode="wait">
            <motion.div key={showIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="rounded-3xl border-3 border-paper-900 shadow-sticker overflow-hidden bg-paper-50">
              {slide?.image ? (
                <>{/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={slide.image} alt="slide" className="w-full max-h-80 object-cover" />
                </>
              ) : (
                <div className="h-40 bg-sticker-cyan grid place-items-center text-5xl">📸</div>
              )}
              <div className="p-4">
                <div className="text-xs font-black text-paper-900/60">{p?.name}</div>
                <div className="mt-1 font-black text-paper-900 leading-relaxed">{showIdx === 0 ? opener + ' ' : ''}{slide?.line}</div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="grid grid-cols-2 gap-3">
            <NeonButton full variant="secondary" disabled={showIdx === 0} onClick={() => setShowIdx(showIdx - 1)}>上一张</NeonButton>
            {showIdx < slides.length - 1 ? (
              <NeonButton full onClick={() => setShowIdx(showIdx + 1)}>下一张</NeonButton>
            ) : (
              <NeonButton full onClick={start}>再来一轮</NeonButton>
            )}
          </div>
        </div>
      </GameLayout>
    );
  }

  return null;
}
