'use client';
import { useRef, useState } from 'react';
import NeonButton from './NeonButton';
import { Camera, Share2 } from 'lucide-react';

/**
 * 结果分享卡片·贴纸风
 * - children = 卡片内容（任意 JSX，包括标题、结果、嘴头等）
 * - 提供两个动作：复制文本 / 保存图片（使用 html-to-image 动态加载）
 * - 不依赖额外 npm 包，使用 SVG foreignObject 嵌入内容转为 PNG
 */
export default function ShareResultCard({
  children,
  shareText,
  filename = 'vibeparty-result.png',
}: {
  children: React.ReactNode;
  /** 复制到剪贴板的文本（不传则隐藏复制按钮） */
  shareText?: string;
  filename?: string;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const onCopy = async () => {
    if (!shareText) return;
    try {
      await navigator.clipboard.writeText(shareText);
      showToast('已复制，可发朋友圈 📝');
    } catch {
      showToast('复制失败，请手动选中');
    }
  };

  /** 使用 SVG foreignObject 将 DOM 片段串行化为 PNG */
  const onSaveImage = async () => {
    if (!cardRef.current || busy) return;
    setBusy(true);
    try {
      const node = cardRef.current;
      const rect = node.getBoundingClientRect();
      const w = Math.ceil(rect.width);
      const h = Math.ceil(rect.height);
      // 克隆节点 + inline 计算样式，否则 SVG 内不能访问外部 CSS
      const clone = node.cloneNode(true) as HTMLElement;
      const styleAll = (src: HTMLElement, dst: HTMLElement) => {
        const cs = window.getComputedStyle(src);
        let s = '';
        for (let i = 0; i < cs.length; i++) {
          const k = cs.item(i);
          s += `${k}:${cs.getPropertyValue(k)};`;
        }
        dst.setAttribute('style', s);
        const sc = Array.from(src.children) as HTMLElement[];
        const dc = Array.from(dst.children) as HTMLElement[];
        sc.forEach((c, i) => { if (dc[i]) styleAll(c, dc[i]); });
      };
      styleAll(node, clone);
      const xml = new XMLSerializer().serializeToString(clone);
      const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">${xml}</div>
  </foreignObject>
</svg>`;
      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('image load failed'));
        img.src = url;
      });
      const canvas = document.createElement('canvas');
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('no ctx');
      ctx.scale(dpr, dpr);
      ctx.fillStyle = '#FFFBF0';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      const pngBlob: Blob = await new Promise((res, rej) => canvas.toBlob((b) => b ? res(b) : rej(new Error('toBlob failed')), 'image/png'));
      // 优先调用原生分享
      const file = new File([pngBlob], filename, { type: 'image/png' });
      const nav = navigator as Navigator & { canShare?: (data?: ShareData) => boolean; share?: (data: ShareData) => Promise<void> };
      if (nav.canShare && nav.canShare({ files: [file] }) && nav.share) {
        try {
          await nav.share({ files: [file], title: 'VibeParty', text: shareText });
          showToast('分享已打开 🎉');
          setBusy(false);
          return;
        } catch { /* fallthrough to download */ }
      }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(pngBlob);
      a.download = filename;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      showToast('已保存图片 📸');
    } catch (e) {
      showToast('保存失败，请截屏分享');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3">
      <div ref={cardRef}>{children}</div>
      <div className={`grid ${shareText ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
        {shareText && (
          <NeonButton variant="secondary" full onClick={onCopy}>
            <Share2 size={16} /> 复制文案
          </NeonButton>
        )}
        <NeonButton full onClick={onSaveImage} disabled={busy}>
          <Camera size={16} /> {busy ? '生成中…' : '保存图片'}
        </NeonButton>
      </div>
      {toast && (
        <div className="fixed left-1/2 bottom-24 -translate-x-1/2 z-50 px-4 py-2 rounded-full border-3 border-paper-900 bg-paper-50 shadow-sticker text-sm font-black">
          {toast}
        </div>
      )}
    </div>
  );
}
