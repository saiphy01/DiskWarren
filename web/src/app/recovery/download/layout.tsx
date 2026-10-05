import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download DiskWarren Recover for Windows — Free Scanner v1.0.0',
  description: 'Download DiskWarren Recover for Windows 10 and Windows 11 (64-bit). Scan internal SSDs, external HDDs, SD cards, and USB drives with 100% read-only safety.',
  alternates: {
    canonical: 'https://recovery.diskwarren.com/download',
  },
  openGraph: {
    title: 'Download DiskWarren Recover — Free Scanner v1.0.0',
    description: 'Instant read-only filesystem scanning, in-memory preview, and transparent recovery likelihood scoring.',
    url: 'https://recovery.diskwarren.com/download',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download DiskWarren Recover for Windows',
    description: 'Free scanner with in-memory file preview and SHA-256 verification.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
