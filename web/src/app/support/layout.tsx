import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support Center — Knowledge Base & Direct Assistance | DiskWarren',
  description: 'Get help with DiskWarren for Mac, Windows, Android, and iOS. Search our technical FAQ, troubleshooting guides, or submit a support ticket.',
  alternates: {
    canonical: 'https://diskwarren.com/support',
  },
  openGraph: {
    title: 'Support Center — Knowledge Base & Direct Assistance | DiskWarren',
    description: 'Get help with DiskWarren for Mac, Windows, Android, and iOS. Search our technical FAQ, troubleshooting guides, or submit a support ticket.',
    url: 'https://diskwarren.com/support',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Support Center — Knowledge Base & Direct Assistance | DiskWarren',
    description: 'Get help with DiskWarren for Mac, Windows, Android, and iOS. Search our technical FAQ, troubleshooting guides, or submit a support ticket.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}