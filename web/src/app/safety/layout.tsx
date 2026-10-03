import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Safety by Design — Reversible Cleanup Architecture | DiskWarren',
  description: 'Learn how DiskWarren prevents accidental deletion. APFS Trash routing, system file protection barriers, protected paths, and zero data-loss architecture.',
  alternates: {
    canonical: 'https://diskwarren.com/safety',
  },
  openGraph: {
    title: 'Safety by Design — Reversible Cleanup Architecture | DiskWarren',
    description: 'Learn how DiskWarren prevents accidental deletion. APFS Trash routing, system file protection barriers, protected paths, and zero data-loss architecture.',
    url: 'https://diskwarren.com/safety',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Safety by Design — Reversible Cleanup Architecture | DiskWarren',
    description: 'Learn how DiskWarren prevents accidental deletion. APFS Trash routing, system file protection barriers, protected paths, and zero data-loss architecture.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}