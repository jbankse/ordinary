import type { Metadata } from 'next';
import { Syne, Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Ordinary | Visual Infrastructure™',
  description: 'The Ordinary Group Inc. is a media and technology company that develops and manages visual infrastructure™ for companies and small businesses.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="bg-[#0a0a0a] text-white antialiased selection:bg-[#FF3333] selection:text-white" suppressHydrationWarning>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
