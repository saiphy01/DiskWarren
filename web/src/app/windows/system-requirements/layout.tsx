import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Windows System Requirements — Windows 10 & 11 Hardware Compatibility | DiskWarren',
  description: 'Hardware and OS requirements for DiskWarren Windows Edition. Compatible with Windows 10 (20H2+) and Windows 11 x64 and ARM64 Copilot+ PCs.',
  alternates: {
    canonical: 'https://windows.diskwarren.com/system-requirements',
  },
  openGraph: {
    title: 'Windows System Requirements — Windows 10 & 11 Hardware Compatibility | DiskWarren',
    description: 'Hardware and OS requirements for DiskWarren Windows Edition. Compatible with Windows 10 (20H2+) and Windows 11 x64 and ARM64 Copilot+ PCs.',
    url: 'https://windows.diskwarren.com/system-requirements',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Windows System Requirements — Windows 10 & 11 Hardware Compatibility | DiskWarren',
    description: 'Hardware and OS requirements for DiskWarren Windows Edition. Compatible with Windows 10 (20H2+) and Windows 11 x64 and ARM64 Copilot+ PCs.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}