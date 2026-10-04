import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Windows FAQ — Administrator Permissions, Safety & WinGet | DiskWarren',
  description: 'Frequently asked questions about DiskWarren for Windows: permissions, smart 1-click setup, WSL2 compaction, and WinGet package manager support.',
  alternates: {
    canonical: 'https://windows.diskwarren.com/faq',
  },
  openGraph: {
    title: 'Windows FAQ — Administrator Permissions, Safety & WinGet | DiskWarren',
    description: 'Frequently asked questions about DiskWarren for Windows: permissions, smart 1-click setup, WSL2 compaction, and WinGet package manager support.',
    url: 'https://windows.diskwarren.com/faq',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Windows FAQ — Administrator Permissions, Safety & WinGet | DiskWarren',
    description: 'Frequently asked questions about DiskWarren for Windows: permissions, smart 1-click setup, WSL2 compaction, and WinGet package manager support.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}