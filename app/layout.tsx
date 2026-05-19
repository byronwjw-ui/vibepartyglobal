import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VibeParty - 让聚会马上热起来',
  description: '28款多人派对游戏，适合朋友聚会、KTV、酒吧、破冰、暧昧局和无酒精聚会。打开网页即可开始组局。',
  keywords: ['派对游戏','聚会游戏','真心话大冒险','谁是卧底','国王游戏','数字炸弹','KTV游戏','破冰游戏'],
  manifest: '/manifest.json',
  applicationName: 'VibeParty',
  appleWebApp: { capable: true, title: 'VibeParty', statusBarStyle: 'black-translucent' },
  formatDetection: { telephone: false },
  openGraph: { title: 'VibeParty - 让聚会马上热起来', description: '28款多人派对游戏，打开网页即可开始组局。', type: 'website' },
};

export const viewport: Viewport = {
  themeColor: '#FFFBF0',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="mx-auto w-full max-w-[720px] min-h-[100dvh]">{children}</div>
      </body>
    </html>
  );
}
