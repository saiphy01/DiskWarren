import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'DiskWarren — Native Mac Storage Intelligence & Safe Cleanup',
  description: 'Know exactly where your Mac\'s storage went — and safely take it back. Deep intelligence for Xcode, Docker, Node.js, and local AI models (Ollama, LM Studio). 100% native, private, and safe.',
  keywords: [
    'mac disk analyzer',
    'mac storage intelligence',
    'mac cleaner for developers',
    'delete xcode deriveddata',
    'delete ollama models mac',
    'clean node_modules mac',
    'mac duplicate finder',
    'mac uninstaller'
  ],
  authors: [{ name: 'DiskWarren Team' }],
  metadataBase: new URL('https://diskwarren.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DiskWarren — Native Mac Storage Intelligence',
    description: 'Know exactly where your Mac storage went — and safely take it back. Built for developers, creators, and AI power users.',
    url: 'https://diskwarren.com',
    siteName: 'DiskWarren',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DiskWarren — Mac Storage Intelligence',
    description: 'Safely reclaim gigabytes of developer caches and local AI model weights on macOS.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#0A0D12] text-slate-100 min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
