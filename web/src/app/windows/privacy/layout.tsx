import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — DiskWarren for Windows',
  description: 'Zero-knowledge, 100% on-device local storage analysis for Windows 10 & 11. No telemetry, no cloud tracking, and complete privacy.',
  alternates: {
    canonical: 'https://windows.diskwarren.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy — DiskWarren for Windows',
    description: 'Zero-knowledge, 100% on-device local storage analysis for Windows 10 & 11. No telemetry, no cloud tracking.',
    url: 'https://windows.diskwarren.com/privacy',
    siteName: 'DiskWarren',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — DiskWarren for Windows',
    description: 'Zero-telemetry NTFS storage analysis for Windows PCs. No files, paths, or telemetry are ever uploaded.',
  },
};

export default function WindowsPrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
