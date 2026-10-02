import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, ShieldCheck, Cpu, Terminal, CheckCircle2, ArrowRight, ExternalLink, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Download DiskWarren v1.0.0 — Native Mac Storage Intelligence',
  description: 'Download DiskWarren for macOS Sonoma and Sequoia. Universal binary for Apple Silicon (M1/M2/M3/M4) and Intel Macs. Apple Notarized, Hardened Runtime, and 100% private.',
  alternates: {
    canonical: '/download',
  },
};

export default function DownloadPage() {
  const sha256Checksum = "9e5c46b5a796e625a2e5ff4d46cfcbfd12f1708170c991e32626e2e2ec8b6cb0";

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Official Production Release v1.0.0</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Download DiskWarren for macOS
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Reclaim gigabytes of developer caches, local AI weights, and uninstalled app leftovers. 
          100% native Swift, Apple Notarized, and zero cloud telemetry.
        </p>
      </div>

      {/* Main Download Card */}
      <div className="bg-[#10141D] border border-cyan-500/30 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-cyan-500/10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-6 max-w-xl mx-auto relative z-10">
          <div className="inline-flex p-4 rounded-2xl bg-cyan-400/10 text-cyan-400 mb-2">
            <Download className="w-10 h-10 animate-bounce" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            DiskWarren v1.0.0 (Production Universal DMG)
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="px-2.5 py-1 rounded bg-[#171D27] border border-[#2A3342] text-slate-300">
              Universal 2 Binary (Apple Silicon &amp; Intel)
            </span>
            <span className="px-2.5 py-1 rounded bg-[#171D27] border border-[#2A3342] text-slate-300">
              macOS 14.0 Sonoma &amp; macOS 15.0+ Sequoia
            </span>
            <span className="px-2.5 py-1 rounded bg-[#171D27] border border-[#2A3342] text-slate-300">
              Size: ~24.8 MB
            </span>
          </div>

          <div className="pt-2">
            <a
              href="/downloads/DiskWarren-1.0.0.dmg"
              download
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-base transition-all shadow-lg shadow-cyan-400/25 active:scale-95 w-full sm:w-auto"
            >
              <Download className="w-5 h-5 stroke-[2.5]" />
              <span>Download DiskWarren-1.0.0.dmg</span>
            </a>
          </div>

          <p className="text-xs text-slate-400">
            Free inspection &amp; treemap exploration included. Pro upgrade available for 1-click batch cleanup.
          </p>
        </div>

        {/* SHA-256 Checksum Box */}
        <div className="mt-8 pt-8 border-t border-[#1F2733] text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Cryptographic SHA-256 Checksum Verification
            </span>
            <span className="text-[11px] text-emerald-400 font-mono">Apple Notary Verified</span>
          </div>
          <div className="p-3 bg-[#0A0D12] rounded-lg border border-[#232B38] font-mono text-xs text-slate-400 break-all select-all">
            {sha256Checksum}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Verify integrity via terminal: <code className="text-cyan-300 bg-[#161C26] px-1 py-0.5 rounded">shasum -a 256 DiskWarren-1.0.0.dmg</code>
          </p>
        </div>
      </div>

      {/* 3-Step Installation Guide */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-white text-center">
          Quick 3-Step Installation Guide
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121722] border border-[#222A38] rounded-xl p-6 space-y-4">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-sm">
              1
            </div>
            <h4 className="text-base font-semibold text-white">Drag to Applications</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Open the downloaded <code className="text-cyan-300 bg-[#0A0D12] px-1 py-0.5 rounded">.dmg</code> file and drag the <strong className="text-white">DiskWarren</strong> icon into your Applications folder.
            </p>
          </div>

          <div className="bg-[#121722] border border-[#222A38] rounded-xl p-6 space-y-4">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-sm">
              2
            </div>
            <h4 className="text-base font-semibold text-white">Grant Full Disk Access</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Open <strong className="text-white">System Settings &gt; Privacy &amp; Security &gt; Full Disk Access</strong> and toggle DiskWarren ON. Required to index Xcode caches and hidden library paths.
            </p>
          </div>

          <div className="bg-[#121722] border border-[#222A38] rounded-xl p-6 space-y-4">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-sm">
              3
            </div>
            <h4 className="text-base font-semibold text-white">Scan &amp; Safely Clean</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Click <strong className="text-white">Scan Storage</strong>. DiskWarren indexes your drive at 12,000+ files/sec. Review candidates with Trash-first safety and zero accidental deletion risk.
            </p>
          </div>
        </div>
      </div>

      {/* Security & Notarization Specs */}
      <div className="bg-[#0C1017] border border-[#1E2634] rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            Apple Notarization &amp; Hardened Runtime
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Every build of DiskWarren is compiled with Apple Hardened Runtime, signed with an official Apple Developer ID Application certificate, and notarized by Apple Ticket Service.
          </p>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Zero external telemetry or cloud uploads — completely air-gapped indexing</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Trash-first architecture — files recycled via macOS Trash, never permanent rm -rf</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Strict system directory blacklist protecting macOS integrity</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#131924] border border-[#263142] rounded-lg p-6 space-y-4 text-xs">
          <div className="flex justify-between border-b border-[#202937] pb-2">
            <span className="text-slate-400">Application Name:</span>
            <span className="font-semibold text-white font-mono">DiskWarren.app</span>
          </div>
          <div className="flex justify-between border-b border-[#202937] pb-2">
            <span className="text-slate-400">Bundle Identifier:</span>
            <span className="font-semibold text-white font-mono">com.diskwarren.app</span>
          </div>
          <div className="flex justify-between border-b border-[#202937] pb-2">
            <span className="text-slate-400">Minimum macOS:</span>
            <span className="font-semibold text-white font-mono">14.0 Sonoma</span>
          </div>
          <div className="flex justify-between border-b border-[#202937] pb-2">
            <span className="text-slate-400">Architecture:</span>
            <span className="font-semibold text-white font-mono">arm64 + x86_64 (Universal 2)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Update Mechanism:</span>
            <span className="font-semibold text-white font-mono">Sparkle 2 EdDSA Signed</span>
          </div>
        </div>
      </div>

      {/* Support Callout */}
      <div className="text-center text-sm text-slate-400 pt-4">
        Need assistance or have questions before installing? Visit our{' '}
        <Link href="/support" className="text-cyan-400 hover:underline font-medium">
          Support &amp; Help Center
        </Link>{' '}
        or read our{' '}
        <Link href="/privacy" className="text-cyan-400 hover:underline font-medium">
          Zero-Telemetry Privacy Policy
        </Link>.
      </div>
    </div>
  );
}
