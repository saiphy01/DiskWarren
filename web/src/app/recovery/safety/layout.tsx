import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Safety Architecture — DiskWarren Recover',
  description: 'How DiskWarren Recover guarantees data integrity: 100% read-only block drivers, destination physical disk isolation, SHA-256 verification, and zero source writes.',
  alternates: {
    canonical: 'https://recovery.diskwarren.com/safety',
  },
  openGraph: {
    title: 'Safety Architecture — DiskWarren Recover',
    description: 'Read-only block readers, same-device hard stops, and cryptographic SHA-256 integrity verification.',
    url: 'https://recovery.diskwarren.com/safety',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DiskWarren Recover Safety Architecture',
    description: 'Non-negotiable data safety standards for Windows recovery.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
