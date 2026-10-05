import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features & Architecture — DiskWarren Recover',
  description: 'Technical architecture of DiskWarren Recover: NTFS MFT traversal, FAT32/exFAT cluster chain parsing, 20+ file signature carving definitions, and raw disk imaging.',
  alternates: {
    canonical: 'https://recovery.diskwarren.com/features',
  },
  openGraph: {
    title: 'Features & Architecture — DiskWarren Recover',
    description: 'Filesystem-aware recovery plus deep sector carving for Windows 10 & 11.',
    url: 'https://recovery.diskwarren.com/features',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DiskWarren Recover Technical Features',
    description: 'Deep dive into our dual-engine recovery architecture.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
