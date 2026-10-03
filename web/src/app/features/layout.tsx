import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features & Architecture — Native Mac Storage Intelligence | DiskWarren',
  description: 'Explore DiskWarren\'s storage analysis features: squarified treemaps, Xcode DerivedData cleanup, Docker builder pruning, local AI model detection, and zero-telemetry privacy.',
  alternates: {
    canonical: 'https://diskwarren.com/features',
  },
  openGraph: {
    title: 'Features & Architecture — Native Mac Storage Intelligence | DiskWarren',
    description: 'Explore DiskWarren\'s storage analysis features: squarified treemaps, Xcode DerivedData cleanup, Docker builder pruning, local AI model detection, and zero-telemetry privacy.',
    url: 'https://diskwarren.com/features',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Features & Architecture — Native Mac Storage Intelligence | DiskWarren',
    description: 'Explore DiskWarren\'s storage analysis features: squarified treemaps, Xcode DerivedData cleanup, Docker builder pruning, local AI model detection, and zero-telemetry privacy.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}