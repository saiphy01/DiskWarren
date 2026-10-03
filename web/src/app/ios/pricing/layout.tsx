import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DiskWarren for iOS Pricing — Free PhotoKit Scan & .99 Pro Lifetime',
  description: 'Free iPhone storage insights. .99 one-time In-App Purchase via StoreKit 2 with Apple Family Sharing support. Zero subscriptions.',
  alternates: {
    canonical: 'https://ios.diskwarren.com/pricing',
  },
  openGraph: {
    title: 'DiskWarren for iOS Pricing — Free PhotoKit Scan & .99 Pro Lifetime',
    description: 'Free iPhone storage insights. .99 one-time In-App Purchase via StoreKit 2 with Apple Family Sharing support. Zero subscriptions.',
    url: 'https://ios.diskwarren.com/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DiskWarren for iOS Pricing — Free PhotoKit Scan & .99 Pro Lifetime',
    description: 'Free iPhone storage insights. .99 one-time In-App Purchase via StoreKit 2 with Apple Family Sharing support. Zero subscriptions.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}