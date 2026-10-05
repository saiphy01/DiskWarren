import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DiskWarren Recover Pricing — Perpetual Licenses, No Subscriptions',
  description: 'Simple, transparent pricing for DiskWarren Recover. Free scanner with 500 MB recovery allowance, $39 Pro lifetime license, and $149 Technician edition. Zero monthly subscriptions.',
  alternates: {
    canonical: 'https://recovery.diskwarren.com/pricing',
  },
  openGraph: {
    title: 'DiskWarren Recover Pricing — Zero Subscriptions',
    description: 'Pay once, own forever. Unlimited file recovery, deep signature carving, and SHA-256 verification reports.',
    url: 'https://recovery.diskwarren.com/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DiskWarren Recover Pricing',
    description: 'Transparent lifetime licenses for Windows data recovery.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
