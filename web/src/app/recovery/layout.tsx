import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DiskWarren Recover — Safe, Read-Only Data Recovery for Windows 10 & 11',
  description: 'Professional Windows data recovery without forensic complexity. Scan NTFS, FAT32, and exFAT drives with 100% read-only block access. Evidence-based recovery confidence, deep signature carving, and SHA-256 verified file restore.',
  keywords: [
    'data recovery windows',
    'recover deleted files',
    'ntfs file recovery',
    'fat32 recovery tool',
    'exfat sd card recovery',
    'photo recovery software',
    'read only data recovery',
    'file carving tool'
  ],
  alternates: {
    canonical: 'https://recovery.diskwarren.com',
  },
  openGraph: {
    title: 'DiskWarren Recover — Safe, Read-Only Data Recovery',
    description: 'Find deleted and lost files, explain recovery likelihood, preview them in memory, and safely recover them to an external drive.',
    url: 'https://recovery.diskwarren.com',
    siteName: 'DiskWarren Recover',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DiskWarren Recover — Windows Data Recovery',
    description: '100% read-only block scanning, partition detection, raw signature carving, and SHA-256 verification.',
  }
};

export default function RecoveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
