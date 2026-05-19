import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VibeParty - 让聚会马上热起来',
  description: '16款多人派对游戏，适合朋友聚会、KTV、酒吧、破冰、暧昧局和无酒精聚会。打开网页即可开始组局。',
  keywords: ['派对游戏','聚会游戏','真心话大冒险','谁是卧底','国王游戏','数字炸弹','KTV游戏','破冰游戏'],
  manifest: '/manifest.json',
  applicationName: 'VibeParty',
  appleWebApp: { capable: true, title: 'VibeParty', statusBarStyle: 'black-translucent' },
  formatDetection: { telephone: false },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg' }],
    shortcut: ['/icon.svg'],
  },
  openGraph: {
    title: 'VibeParty - 让聚会马上热起来',
    description: '16款多人派对游戏，打开网页即可开始组局。',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0614',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <div className="mx-auto w-full max-w-[720px] min-h-[100dvh]">{children}</div>
      </body>
    </html>
  );
}
