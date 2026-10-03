import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download DiskWarren for Mac — Official Universal 2 Release (v1.0.0)',
  description: 'Download DiskWarren for macOS 14 Sonoma and macOS 15 Sequoia. Native Apple Silicon (M1/M2/M3/M4) & Intel 64-bit installer. Safe, private, and offline.',
  alternates: {
    canonical: 'https://diskwarren.com/download',
  },
  openGraph: {
    title: 'Download DiskWarren for Mac — Official Universal 2 Release (v1.0.0)',
    description: 'Download DiskWarren for macOS 14 Sonoma and macOS 15 Sequoia. Native Apple Silicon (M1/M2/M3/M4) & Intel 64-bit installer. Safe, private, and offline.',
    url: 'https://diskwarren.com/download',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download DiskWarren for Mac — Official Universal 2 Release (v1.0.0)',
    description: 'Download DiskWarren for macOS 14 Sonoma and macOS 15 Sequoia. Native Apple Silicon (M1/M2/M3/M4) & Intel 64-bit installer. Safe, private, and offline.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}