import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Android Safety by Design — Scoped Storage & 30-Day Gallery Trash | DiskWarren',
  description: 'Safety architecture of DiskWarren for Android. Native MediaStore.createTrashRequest integration, root-free sandbox, and zero battery drain.',
  alternates: {
    canonical: 'https://android.diskwarren.com/safety',
  },
  openGraph: {
    title: 'Android Safety by Design — Scoped Storage & 30-Day Gallery Trash | DiskWarren',
    description: 'Safety architecture of DiskWarren for Android. Native MediaStore.createTrashRequest integration, root-free sandbox, and zero battery drain.',
    url: 'https://android.diskwarren.com/safety',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Android Safety by Design — Scoped Storage & 30-Day Gallery Trash | DiskWarren',
    description: 'Safety architecture of DiskWarren for Android. Native MediaStore.createTrashRequest integration, root-free sandbox, and zero battery drain.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}