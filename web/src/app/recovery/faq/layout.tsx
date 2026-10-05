import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — DiskWarren Recover',
  description: 'Common questions about data recovery on Windows: TRIM and SSDs, BitLocker encrypted drives, formatted USBs, read-only guarantees, and offline licensing.',
  alternates: {
    canonical: 'https://recovery.diskwarren.com/faq',
  },
  openGraph: {
    title: 'FAQ — DiskWarren Recover',
    description: 'Technical and licensing questions answered honestly.',
    url: 'https://recovery.diskwarren.com/faq',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DiskWarren Recover FAQ',
    description: 'Everything you need to know about safe data recovery.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
