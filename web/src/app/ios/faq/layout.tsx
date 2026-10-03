import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'iOS FAQ — System Data Sandboxing, Photo Safety & StoreKit | DiskWarren',
  description: 'Honest answers about iPhone storage: why third-party apps cannot purge iOS System Data directly, PhotoKit safety, and Apple Family Sharing.',
  alternates: {
    canonical: 'https://ios.diskwarren.com/faq',
  },
  openGraph: {
    title: 'iOS FAQ — System Data Sandboxing, Photo Safety & StoreKit | DiskWarren',
    description: 'Honest answers about iPhone storage: why third-party apps cannot purge iOS System Data directly, PhotoKit safety, and Apple Family Sharing.',
    url: 'https://ios.diskwarren.com/faq',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iOS FAQ — System Data Sandboxing, Photo Safety & StoreKit | DiskWarren',
    description: 'Honest answers about iPhone storage: why third-party apps cannot purge iOS System Data directly, PhotoKit safety, and Apple Family Sharing.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}