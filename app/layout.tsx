import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Future Gadget Laboratory',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang='zh'>
      <body>
        <nav className="fixed top-0 left-0 z-50 flex gap-5 w-full p-3 bg-zinc-100 opacity-5 overflow-x-auto hover:opacity-100">
          <Link href="/design-patterns">设计模式</Link>
          <Link href="/aspect-scale">子元素固定比例并撑大容器</Link>
          <Link href="/masonry">瀑布流</Link>
          <Link href="/square-grid">正方形网格</Link>
          <Link href="/rgba-mix">RGBA混合</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}