import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'iOS Safety by Design — Apple Photos 30-Day Recently Deleted | DiskWarren',
  description: 'Learn how DiskWarren protects your iPhone photos and media. Full integration with Apple Photos 30-day Recently Deleted album and sandbox honesty.',
  alternates: {
    canonical: 'https://ios.diskwarren.com/safety',
  },
  openGraph: {
    title: 'iOS Safety by Design — Apple Photos 30-Day Recently Deleted | DiskWarren',
    description: 'Learn how DiskWarren protects your iPhone photos and media. Full integration with Apple Photos 30-day Recently Deleted album and sandbox honesty.',
    url: 'https://ios.diskwarren.com/safety',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iOS Safety by Design — Apple Photos 30-Day Recently Deleted | DiskWarren',
    description: 'Learn how DiskWarren protects your iPhone photos and media. Full integration with Apple Photos 30-day Recently Deleted album and sandbox honesty.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}