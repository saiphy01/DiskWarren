import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Windows Safety by Design — Recycle Bin Protection & Zero Registry Edits | DiskWarren',
  description: 'How DiskWarren safely cleans PC storage. Win32 SHFileOperationW Recycle Bin protection, System32 safety barriers, and zero registry tampering.',
  alternates: {
    canonical: 'https://windows.diskwarren.com/safety',
  },
  openGraph: {
    title: 'Windows Safety by Design — Recycle Bin Protection & Zero Registry Edits | DiskWarren',
    description: 'How DiskWarren safely cleans PC storage. Win32 SHFileOperationW Recycle Bin protection, System32 safety barriers, and zero registry tampering.',
    url: 'https://windows.diskwarren.com/safety',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Windows Safety by Design — Recycle Bin Protection & Zero Registry Edits | DiskWarren',
    description: 'How DiskWarren safely cleans PC storage. Win32 SHFileOperationW Recycle Bin protection, System32 safety barriers, and zero registry tampering.',
  }
};

export default function SubrouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}