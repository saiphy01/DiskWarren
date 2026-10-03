import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'iOS System Requirements — iPhone & iPad Compatibility (iOS 17+) | DiskWarren',
  description: 'Compatibility specifications for DiskWarren iOS Edition. Requires iOS 17.0+ or iPadOS 17.0+. Compatible with iPhone XS through iPhone 16 Pro Max.',
  alternates: {
    canonical: 'https://ios.diskwarren.com/system-requirements',
  },
  openGraph: {
    title: 'iOS System Requirements — iPhone & iPad Compatibility (iOS 17+) | DiskWarren',
    description: 'Compatibility specifications for DiskWarren iOS Edition. Requires iOS 17.0+ or iPadOS 17.0+. Compatible with iPhone XS through iPhone 16 Pro Max.',
    url: 'https://ios.diskwarren.com/system-requirements',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iOS System Requirements — iPhone & iPad Compatibility (iOS 17+) | DiskWarren',
    description: 'Compatibility specifications for DiskWarren iOS Edition. Requires iOS 17.0+ or iPadOS 17.0+. Compatible with iPhone XS through iPhone 16 Pro Max.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}