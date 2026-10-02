import Link from 'next/link';
import { HardDrive, Shield, Lock, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#07090D] border-t border-[#1F2733] pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <HardDrive className="w-4 h-4 text-black stroke-[2.5]" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">DiskWarren</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              The premium native macOS disk storage intelligence utility. Reclaim gigabytes safely with zero cloud telemetry.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span>Universal 2 (M1/M2/M3/M4 & Intel)</span>
              <span>•</span>
              <span>macOS 14+</span>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Features</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="#features" className="hover:text-cyan-400 transition-colors">Interactive Treemap</Link></li>
              <li><Link href="#developer" className="hover:text-cyan-400 transition-colors">Developer Caches (Xcode, Node)</Link></li>
              <li><Link href="#ai" className="hover:text-cyan-400 transition-colors">AI Model Intelligence (Ollama, LM Studio)</Link></li>
              <li><Link href="#uninstaller" className="hover:text-cyan-400 transition-colors">Application Uninstaller</Link></li>
              <li><Link href="#duplicates" className="hover:text-cyan-400 transition-colors">Duplicate File Finder</Link></li>
            </ul>
          </div>

          {/* Guides / Problem Pages */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Storage Guides</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/blog/how-to-delete-xcode-deriveddata" className="hover:text-cyan-400 transition-colors">Clear Xcode DerivedData</Link></li>
              <li><Link href="/blog/how-to-delete-ollama-models" className="hover:text-cyan-400 transition-colors">Manage Ollama & GGUF Models</Link></li>
              <li><Link href="/blog/how-to-clear-mac-system-data" className="hover:text-cyan-400 transition-colors">Demystify macOS System Data</Link></li>
              <li><Link href="/blog/delete-node-modules-recursively" className="hover:text-cyan-400 transition-colors">Find Stale node_modules</Link></li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Trust & Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/download" className="hover:text-cyan-400 transition-colors">Download DiskWarren</Link></li>
              <li><Link href="/support" className="hover:text-cyan-400 transition-colors">Customer & Engineering Support</Link></li>
              <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">Zero-Telemetry Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="#safety" className="hover:text-cyan-400 transition-colors">Trash-First Safety Architecture</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1A212D] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} DiskWarren. All rights reserved. Built natively with Swift & Next.js.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-emerald-400" /> 100% Local Processing</span>
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-cyan-400" /> Apple Notarized</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
