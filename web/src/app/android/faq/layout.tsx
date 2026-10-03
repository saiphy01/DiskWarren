import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Android FAQ — Root Access, Photo Safety & Permissions | DiskWarren',
  description: 'Technical questions answered for DiskWarren Android: why no root is needed, how Gallery Trash protects deleted photos, and privacy safeguards.',
  alternates: {
    canonical: 'https://android.diskwarren.com/faq',
  },
  openGraph: {
    title: 'Android FAQ — Root Access, Photo Safety & Permissions | DiskWarren',
    description: 'Technical questions answered for DiskWarren Android: why no root is needed, how Gallery Trash protects deleted photos, and privacy safeguards.',
    url: 'https://android.diskwarren.com/faq',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Android FAQ — Root Access, Photo Safety & Permissions | DiskWarren',
    description: 'Technical questions answered for DiskWarren Android: why no root is needed, how Gallery Trash protects deleted photos, and privacy safeguards.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}