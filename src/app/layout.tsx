import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ColorProvider } from '@/context/ColorContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tailwind Color Generator',
  description: 'Generate perfect Tailwind CSS color scales with live UI previews',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f0f2f5] min-h-screen`}>
        <ColorProvider>
          {children}
        </ColorProvider>
      </body>
    </html>
  );
}
