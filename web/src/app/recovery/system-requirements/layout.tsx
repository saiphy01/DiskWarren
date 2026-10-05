import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'System Requirements & Media Compatibility — DiskWarren Recover',
  description: 'Hardware requirements, Windows OS versions, filesystems, and storage media supported by DiskWarren Recover.',
  alternates: {
    canonical: 'https://recovery.diskwarren.com/system-requirements',
  },
  openGraph: {
    title: 'System Requirements — DiskWarren Recover',
    description: 'Windows 10/11 x64, NTFS, FAT32, exFAT, and physical media compatibility.',
    url: 'https://recovery.diskwarren.com/system-requirements',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DiskWarren Recover System Requirements',
    description: 'Detailed storage hardware and OS compatibility matrix.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
