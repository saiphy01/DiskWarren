import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download DiskWarren for Windows — Official MSI & Portable (v1.0.0)',
  description: 'Download DiskWarren for Windows 10 and Windows 11. Native x64 & ARM64 Copilot+ PC MSI installer, portable ZIP, and WinGet support.',
  alternates: {
    canonical: 'https://windows.diskwarren.com/download',
  },
  openGraph: {
    title: 'Download DiskWarren for Windows — Official MSI & Portable (v1.0.0)',
    description: 'Download DiskWarren for Windows 10 and Windows 11. Native x64 & ARM64 Copilot+ PC MSI installer, portable ZIP, and WinGet support.',
    url: 'https://windows.diskwarren.com/download',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download DiskWarren for Windows — Official MSI & Portable (v1.0.0)',
    description: 'Download DiskWarren for Windows 10 and Windows 11. Native x64 & ARM64 Copilot+ PC MSI installer, portable ZIP, and WinGet support.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}