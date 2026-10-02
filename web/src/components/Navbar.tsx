import Link from 'next/link';
import { HardDrive, ShieldCheck, Download } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0D12]/80 backdrop-blur-md border-b border-[#2A3342]/60">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <HardDrive className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Disk<span className="text-cyan-400">Warren</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="#features" className="hover:text-cyan-400 transition-colors">Features</Link>
          <Link href="#simulator" className="hover:text-cyan-400 transition-colors">Interactive Demo</Link>
          <Link href="#developer" className="hover:text-cyan-400 transition-colors">Developer & AI</Link>
          <Link href="#safety" className="hover:text-cyan-400 transition-colors">Safety First</Link>
          <Link href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing</Link>
          <Link href="/blog" className="hover:text-cyan-400 transition-colors">Guides</Link>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#download"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black text-sm font-semibold transition-all shadow-md shadow-cyan-400/25 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download v1.0</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
