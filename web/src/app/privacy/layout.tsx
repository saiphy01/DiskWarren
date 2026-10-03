import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — DiskWarren for Mac',
  description: 'Our zero-telemetry architecture ensures your files, APFS metadata, and disk paths never leave your Mac.',
  alternates: {
    canonical: 'https://diskwarren.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy — DiskWarren for Mac',
    description: 'Our zero-telemetry architecture ensures your files and disk paths never leave your Mac.',
    url: 'https://diskwarren.com/privacy',
    siteName: 'DiskWarren',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — DiskWarren for Mac',
    description: 'Zero-knowledge macOS storage intelligence. No telemetry, no cloud tracking, 100% on-device.',
  },
};

export default function MacPrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
