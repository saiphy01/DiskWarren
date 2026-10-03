import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — DiskWarren for iPhone & iPad',
  description: '100% on-device Apple Neural Engine photo clustering and storage privacy for iOS 17 & 18. Zero analytics, zero cloud syncing, and StoreKit 2 privacy.',
  alternates: {
    canonical: 'https://ios.diskwarren.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy — DiskWarren for iPhone & iPad',
    description: '100% on-device Apple Neural Engine photo clustering and storage privacy for iOS 17 & 18. Zero analytics, zero cloud syncing.',
    url: 'https://ios.diskwarren.com/privacy',
    siteName: 'DiskWarren',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — DiskWarren for iPhone & iPad',
    description: 'Private iPhone storage intelligence. 100% on-device Neural Engine photo duplicate clustering with Apple Photos Recently Deleted safety.',
  },
};

export default function IosPrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
