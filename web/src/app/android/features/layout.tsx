import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Android Features — WhatsApp Media, Duplicate Photos & 4K Video Cleaner | DiskWarren',
  description: 'Android storage features: perceptual photo deduplication, WhatsApp sent media inspector, oversized 4K video compression, and leftover APK detection.',
  alternates: {
    canonical: 'https://android.diskwarren.com/features',
  },
  openGraph: {
    title: 'Android Features — WhatsApp Media, Duplicate Photos & 4K Video Cleaner | DiskWarren',
    description: 'Android storage features: perceptual photo deduplication, WhatsApp sent media inspector, oversized 4K video compression, and leftover APK detection.',
    url: 'https://android.diskwarren.com/features',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Android Features — WhatsApp Media, Duplicate Photos & 4K Video Cleaner | DiskWarren',
    description: 'Android storage features: perceptual photo deduplication, WhatsApp sent media inspector, oversized 4K video compression, and leftover APK detection.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}