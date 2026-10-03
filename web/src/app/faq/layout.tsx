import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Full Disk Access, Safety & Pricing | DiskWarren',
  description: 'Answers to common questions about DiskWarren: Full Disk Access permission, system safety, offline functionality, Apple Silicon support, and perpetual licensing.',
  alternates: {
    canonical: 'https://diskwarren.com/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions — Full Disk Access, Safety & Pricing | DiskWarren',
    description: 'Answers to common questions about DiskWarren: Full Disk Access permission, system safety, offline functionality, Apple Silicon support, and perpetual licensing.',
    url: 'https://diskwarren.com/faq',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions — Full Disk Access, Safety & Pricing | DiskWarren',
    description: 'Answers to common questions about DiskWarren: Full Disk Access permission, system safety, offline functionality, Apple Silicon support, and perpetual licensing.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}