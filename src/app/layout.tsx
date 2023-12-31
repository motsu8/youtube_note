import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';

import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YouTube Note',
  description:
    'YouTubeの動画を見ながらノートをとることできるWebアプリケーションです。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`font-sans ${inter.className}`}>
        <NextTopLoader showSpinner={false} color="#BD3246" />
        {children}
      </body>
      <Script src="https://apis.google.com/js/api.js" />
    </html>
  );
}
