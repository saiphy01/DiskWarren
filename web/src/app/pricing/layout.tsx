import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DiskWarren Pricing — Free Storage Scan & Perpetual Pro License',
  description: 'Transparent one-time pricing for Mac storage intelligence. Free exploration with squarified treemaps. Perpetual .99 Single Mac or .99 3-Mac Pro license. No subscriptions.',
  alternates: {
    canonical: 'https://diskwarren.com/pricing',
  },
  openGraph: {
    title: 'DiskWarren Pricing — Free Storage Scan & Perpetual Pro License',
    description: 'Transparent one-time pricing for Mac storage intelligence. Free exploration with squarified treemaps. Perpetual .99 Single Mac or .99 3-Mac Pro license. No subscriptions.',
    url: 'https://diskwarren.com/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DiskWarren Pricing — Free Storage Scan & Perpetual Pro License',
    description: 'Transparent one-time pricing for Mac storage intelligence. Free exploration with squarified treemaps. Perpetual .99 Single Mac or .99 3-Mac Pro license. No subscriptions.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}