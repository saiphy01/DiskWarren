import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download DiskWarren for iPhone & iPad — App Store & TestFlight Beta',
  description: 'Download DiskWarren on the Apple App Store or join the public TestFlight beta. On-device Apple Neural Engine photo clustering and ProRes cleanup.',
  alternates: {
    canonical: 'https://ios.diskwarren.com/download',
  },
  openGraph: {
    title: 'Download DiskWarren for iPhone & iPad — App Store & TestFlight Beta',
    description: 'Download DiskWarren on the Apple App Store or join the public TestFlight beta. On-device Apple Neural Engine photo clustering and ProRes cleanup.',
    url: 'https://ios.diskwarren.com/download',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download DiskWarren for iPhone & iPad — App Store & TestFlight Beta',
    description: 'Download DiskWarren on the Apple App Store or join the public TestFlight beta. On-device Apple Neural Engine photo clustering and ProRes cleanup.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}