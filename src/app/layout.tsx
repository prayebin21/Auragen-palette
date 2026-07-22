import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ColorProvider } from '@/context/ColorContext';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AuraGen - Color Palette Generator & Tailwind Studio',
  description: 'The super fast color palette engine and Tailwind scale generator for designers and developers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
      <body className={`${jakarta.className} bg-[#FAF6EE] min-h-screen antialiased selection:bg-orange-500 selection:text-white`}>
        <ColorProvider>
          {children}
        </ColorProvider>
      </body>
    </html>
  );
}
