import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download DiskWarren for Android — Free Storage Cleaner & APK (v1.0.0)',
  description: 'Download DiskWarren for Android. Google Play Store release and direct APK download. Scoped Storage compliant with 30-day OS Trash recovery.',
  alternates: {
    canonical: 'https://android.diskwarren.com/download',
  },
  openGraph: {
    title: 'Download DiskWarren for Android — Free Storage Cleaner & APK (v1.0.0)',
    description: 'Download DiskWarren for Android. Google Play Store release and direct APK download. Scoped Storage compliant with 30-day OS Trash recovery.',
    url: 'https://android.diskwarren.com/download',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download DiskWarren for Android — Free Storage Cleaner & APK (v1.0.0)',
    description: 'Download DiskWarren for Android. Google Play Store release and direct APK download. Scoped Storage compliant with 30-day OS Trash recovery.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}