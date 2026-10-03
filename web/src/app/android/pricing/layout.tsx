import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DiskWarren for Android Pricing — Free Core Scanner & .99 Pro Lifetime',
  description: 'Free Android storage breakdown and duplicate photo scanner. One-time .99 in-app purchase with Google Play Family Library support.',
  alternates: {
    canonical: 'https://android.diskwarren.com/pricing',
  },
  openGraph: {
    title: 'DiskWarren for Android Pricing — Free Core Scanner & .99 Pro Lifetime',
    description: 'Free Android storage breakdown and duplicate photo scanner. One-time .99 in-app purchase with Google Play Family Library support.',
    url: 'https://android.diskwarren.com/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DiskWarren for Android Pricing — Free Core Scanner & .99 Pro Lifetime',
    description: 'Free Android storage breakdown and duplicate photo scanner. One-time .99 in-app purchase with Google Play Family Library support.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}