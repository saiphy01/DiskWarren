import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Android System Requirements — Android 10 to Android 15 Compatibility | DiskWarren',
  description: 'Hardware and OS specifications for DiskWarren Android Edition. Supports Samsung Galaxy, Google Pixel, OnePlus, Xiaomi, and tablets on Android 10+.',
  alternates: {
    canonical: 'https://android.diskwarren.com/system-requirements',
  },
  openGraph: {
    title: 'Android System Requirements — Android 10 to Android 15 Compatibility | DiskWarren',
    description: 'Hardware and OS specifications for DiskWarren Android Edition. Supports Samsung Galaxy, Google Pixel, OnePlus, Xiaomi, and tablets on Android 10+.',
    url: 'https://android.diskwarren.com/system-requirements',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Android System Requirements — Android 10 to Android 15 Compatibility | DiskWarren',
    description: 'Hardware and OS specifications for DiskWarren Android Edition. Supports Samsung Galaxy, Google Pixel, OnePlus, Xiaomi, and tablets on Android 10+.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}