import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'iOS Features — Neural Engine Photo Deduplication & 4K ProRes Inspector | DiskWarren',
  description: 'iPhone storage analysis features: on-device Apple Neural Engine duplicate detection, burst photo picker, 4K 60fps ProRes inspector, and iCloud optimization.',
  alternates: {
    canonical: 'https://ios.diskwarren.com/features',
  },
  openGraph: {
    title: 'iOS Features — Neural Engine Photo Deduplication & 4K ProRes Inspector | DiskWarren',
    description: 'iPhone storage analysis features: on-device Apple Neural Engine duplicate detection, burst photo picker, 4K 60fps ProRes inspector, and iCloud optimization.',
    url: 'https://ios.diskwarren.com/features',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iOS Features — Neural Engine Photo Deduplication & 4K ProRes Inspector | DiskWarren',
    description: 'iPhone storage analysis features: on-device Apple Neural Engine duplicate detection, burst photo picker, 4K 60fps ProRes inspector, and iCloud optimization.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}