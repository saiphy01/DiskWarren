import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — DiskWarren for Android',
  description: 'Root-free, Scoped Storage compliant on-device storage privacy for Android 10 to 15. Zero telemetry, zero ad tracking, and 30-day OS trash recovery.',
  alternates: {
    canonical: 'https://android.diskwarren.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy — DiskWarren for Android',
    description: 'Root-free, Scoped Storage compliant on-device storage privacy for Android 10 to 15. Zero telemetry, zero ad tracking.',
    url: 'https://android.diskwarren.com/privacy',
    siteName: 'DiskWarren',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — DiskWarren for Android',
    description: 'Private Android storage cleaner. Zero ads, zero telemetry, and 100% on-device Scoped Storage intelligence.',
  },
};

export default function AndroidPrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
