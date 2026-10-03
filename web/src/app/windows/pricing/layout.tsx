import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DiskWarren for Windows Pricing — Single PC & Workstation Pro Licenses',
  description: 'Perpetual Windows storage intelligence licensing. Free partition treemap scan, .99 Single PC Pro lifetime license, .99 Workstation 3-PC bundle.',
  alternates: {
    canonical: 'https://windows.diskwarren.com/pricing',
  },
  openGraph: {
    title: 'DiskWarren for Windows Pricing — Single PC & Workstation Pro Licenses',
    description: 'Perpetual Windows storage intelligence licensing. Free partition treemap scan, .99 Single PC Pro lifetime license, .99 Workstation 3-PC bundle.',
    url: 'https://windows.diskwarren.com/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DiskWarren for Windows Pricing — Single PC & Workstation Pro Licenses',
    description: 'Perpetual Windows storage intelligence licensing. Free partition treemap scan, .99 Single PC Pro lifetime license, .99 Workstation 3-PC bundle.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}