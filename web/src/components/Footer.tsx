import Link from 'next/link';
import { HardDrive, ShieldCheck, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-12 text-slate-600 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-sm">
                <HardDrive className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">DiskWarren</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 max-w-sm">
              The native macOS storage intelligence utility. Reclaim gigabytes across developer files, Xcode caches, Docker containers, and local AI model weights safely with zero cloud telemetry.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
              <span>Universal 2 (Apple Silicon &amp; Intel)</span>
              <span>•</span>
              <span>macOS 14+</span>
              <span>•</span>
              <span>No Subscriptions</span>
            </div>
          </div>

          {/* Core Features */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Storage Utilities</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/mac-storage-analyzer" className="hover:text-cyan-600 transition-colors">Mac Storage Analyzer</Link></li>
              <li><Link href="/mac-disk-space-analyzer" className="hover:text-cyan-600 transition-colors">Disk Space Analyzer</Link></li>
              <li><Link href="/mac-large-files" className="hover:text-cyan-600 transition-colors">Large Files Discovery</Link></li>
              <li><Link href="/mac-cleaner" className="hover:text-cyan-600 transition-colors">Mac Cleaner</Link></li>
              <li><Link href="/mac-app-uninstaller" className="hover:text-cyan-600 transition-colors">App Uninstaller &amp; Leftovers</Link></li>
              <li><Link href="/mac-duplicate-finder" className="hover:text-cyan-600 transition-colors">Duplicate File Finder</Link></li>
            </ul>
          </div>

          {/* Developer & AI */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Developer &amp; AI</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/developer-cleanup-mac" className="hover:text-cyan-600 transition-colors">Developer Cleanup</Link></li>
              <li><Link href="/xcode-storage" className="hover:text-cyan-600 transition-colors">Xcode Storage &amp; DerivedData</Link></li>
              <li><Link href="/docker-storage-mac" className="hover:text-cyan-600 transition-colors">Docker Storage on Mac</Link></li>
              <li><Link href="/node-modules-disk-space" className="hover:text-cyan-600 transition-colors">node_modules Disk Space</Link></li>
              <li><Link href="/ollama-storage" className="hover:text-cyan-600 transition-colors">Ollama Model Storage</Link></li>
              <li><Link href="/lm-studio-storage" className="hover:text-cyan-600 transition-colors">LM Studio &amp; GGUF Weights</Link></li>
              <li><Link href="/huggingface-cache-mac" className="hover:text-cyan-600 transition-colors">Hugging Face Cache</Link></li>
              <li><Link href="/comfyui-storage" className="hover:text-cyan-600 transition-colors">ComfyUI Diffusion Storage</Link></li>
            </ul>
          </div>

          {/* Trust, Legal & Support */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Trust &amp; Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/pricing" className="hover:text-cyan-600 transition-colors">Pricing &amp; Perpetual License</Link></li>
              <li><Link href="/download" className="hover:text-cyan-600 transition-colors">Download DiskWarren</Link></li>
              <li><Link href="/security" className="hover:text-cyan-600 transition-colors">Security Architecture</Link></li>
              <li><Link href="/privacy" className="hover:text-cyan-600 transition-colors">Zero-Telemetry Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-cyan-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="hover:text-cyan-600 transition-colors">30-Day Refund Policy</Link></li>
              <li><Link href="/system-requirements" className="hover:text-cyan-600 transition-colors">System Requirements</Link></li>
              <li><Link href="/release-notes" className="hover:text-cyan-600 transition-colors">Release Notes (v1.0.0)</Link></li>
              <li><Link href="/support" className="hover:text-cyan-600 transition-colors">Support &amp; Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} DiskWarren. All rights reserved. Built natively in Swift for macOS.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-emerald-600" /> 100% Local Processing</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-cyan-600" /> Zero Telemetry</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
