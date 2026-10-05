import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — DiskWarren Recover',
  description: 'DiskWarren Recover zero-telemetry policy: 100% on-device processing. No filenames, folder paths, disk serials, or recovered file contents are ever uploaded.',
  alternates: {
    canonical: 'https://recovery.diskwarren.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy — DiskWarren Recover',
    description: '100% local, offline-first data recovery without cloud telemetry.',
    url: 'https://recovery.diskwarren.com/privacy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DiskWarren Recover Privacy Policy',
    description: 'Zero telemetry, 100% private data recovery.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
