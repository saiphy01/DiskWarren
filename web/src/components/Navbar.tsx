import Link from 'next/link';
import { HardDrive, Download } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <HardDrive className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Disk<span className="text-cyan-600">Warren</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/#features" className="hover:text-cyan-600 transition-colors">Features</Link>
          <Link href="/#simulator" className="hover:text-cyan-600 transition-colors">Interactive Demo</Link>
          <Link href="/#developer" className="hover:text-cyan-600 transition-colors">Developer &amp; AI</Link>
          <Link href="/#safety" className="hover:text-cyan-600 transition-colors">Safety First</Link>
          <Link href="/#pricing" className="hover:text-cyan-600 transition-colors">Pricing</Link>
          <Link href="/blog" className="hover:text-cyan-600 transition-colors">Guides</Link>
          <Link href="/support" className="hover:text-cyan-600 transition-colors">Support</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/download"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold transition-all shadow-sm shadow-cyan-600/25 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download v1.0</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
