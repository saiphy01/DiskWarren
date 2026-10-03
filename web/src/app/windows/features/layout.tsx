import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Windows Features & Architecture — NTFS MFT & WSL2 Optimization | DiskWarren',
  description: 'Native Windows storage analyzer features: NTFS Master File Table traversal, Visual Studio .vs cleanup, WSL2 disk compaction, and Steam shader caches.',
  alternates: {
    canonical: 'https://windows.diskwarren.com/features',
  },
  openGraph: {
    title: 'Windows Features & Architecture — NTFS MFT & WSL2 Optimization | DiskWarren',
    description: 'Native Windows storage analyzer features: NTFS Master File Table traversal, Visual Studio .vs cleanup, WSL2 disk compaction, and Steam shader caches.',
    url: 'https://windows.diskwarren.com/features',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Windows Features & Architecture — NTFS MFT & WSL2 Optimization | DiskWarren',
    description: 'Native Windows storage analyzer features: NTFS Master File Table traversal, Visual Studio .vs cleanup, WSL2 disk compaction, and Steam shader caches.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}