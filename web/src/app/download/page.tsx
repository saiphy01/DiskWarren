'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Download, ShieldCheck, Terminal, CheckCircle2, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export default function DownloadPage() {
  const sha256Checksum = "f38922e895d9b1f5cc8c34ca7f46a2c82f364da6540fa19d07adf9769ef64303";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(sha256Checksum);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <ShieldCheck className="w-4 h-4 text-cyan-600" />
          <span>Official Production Release v1.0.0</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Download DiskWarren for macOS
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Reclaim gigabytes of developer caches, local AI weights, and uninstalled app leftovers. 
          100% native Swift, Apple Notarized, and zero cloud telemetry.
        </p>
      </div>

      {/* Main Download Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 text-center relative overflow-hidden">
        <div className="space-y-6 max-w-xl mx-auto relative z-10">
          <div className="inline-flex p-4 rounded-2xl bg-cyan-50 text-cyan-600 mb-2 border border-cyan-100">
            <Download className="w-10 h-10 animate-bounce" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            DiskWarren v1.0.0 (Production Universal DMG)
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-600">
            <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
              Universal 2 Binary (Apple Silicon &amp; Intel)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
              macOS 14.0 Sonoma &amp; macOS 15.0+ Sequoia
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
              Size: ~2.09 MB DMG Payload
            </span>
          </div>

          <div className="pt-2">
            <a
              href="/downloads/DiskWarren-1.0.0.dmg"
              download="DiskWarren-1.0.0.dmg"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-base transition-all shadow-md shadow-cyan-600/25 active:scale-95 w-full sm:w-auto cursor-pointer"
            >
              <Download className="w-5 h-5 stroke-[2.5]" />
              <span>Download DiskWarren-1.0.0.dmg</span>
            </a>
          </div>

          <p className="text-xs text-slate-500">
            Free inspection &amp; treemap exploration included. <Link href="/pricing" className="text-cyan-600 font-semibold hover:underline">Pro upgrade available</Link> for 1-click batch cleanup.
          </p>
        </div>

        {/* SHA-256 Checksum Box with 1-Click Copy */}
        <div className="mt-8 pt-8 border-t border-slate-200 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-600" />
              Cryptographic SHA-256 Checksum Verification
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-emerald-700 font-mono font-semibold">Apple Notary Verified</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy SHA</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-cyan-400 break-all select-all shadow-inner">
            {sha256Checksum}
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            Verify integrity via terminal: <code className="text-cyan-800 bg-cyan-50 px-1 py-0.5 rounded border border-cyan-200/60">shasum -a 256 DiskWarren-1.0.0.dmg</code>
          </p>
        </div>
      </div>

      {/* Developer Terminal & Homebrew Option */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-600" />
            <h3 className="text-base font-bold text-slate-900">Install via Homebrew</h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Terminal Fast-Path</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Prefer managing Mac apps from your command line? Install the native application and companion CLI binary via Homebrew Cask:
        </p>
        <CodeBlock 
          code={`# Install DiskWarren desktop app\nbrew install --cask diskwarren\n\n# Optional: install the terminal CLI companion\nbrew install diskwarren/tap/warren`}
          title="Homebrew Cask & CLI Install"
        />
      </div>

      {/* 3-Step Installation Guide */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-slate-900 text-center">
          Quick 3-Step Installation Guide
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-4">
            <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-700 font-bold flex items-center justify-center text-sm">
              1
            </div>
            <h4 className="text-base font-semibold text-slate-900">Drag to Applications</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Open the downloaded <code className="text-cyan-800 bg-cyan-50 px-1 py-0.5 rounded font-mono text-xs border border-cyan-200/60">.dmg</code> file and drag the <strong className="text-slate-900">DiskWarren</strong> icon into your Applications folder.
            </p>
          </div>

          <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-4">
            <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-700 font-bold flex items-center justify-center text-sm">
              2
            </div>
            <h4 className="text-base font-semibold text-slate-900">Grant Full Disk Access</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Open <strong className="text-slate-900">System Settings &gt; Privacy &amp; Security &gt; Full Disk Access</strong> and toggle DiskWarren ON. Required to index Xcode caches and hidden library paths.
            </p>
          </div>

          <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-4">
            <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-700 font-bold flex items-center justify-center text-sm">
              3
            </div>
            <h4 className="text-base font-semibold text-slate-900">Scan &amp; Safely Clean</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Click <strong className="text-slate-900">Scan Storage</strong>. DiskWarren indexes your drive at 12,000+ files/sec. Review candidates with Trash-first safety and zero accidental deletion risk.
            </p>
          </div>
        </div>
      </div>

      {/* Security & Notarization Specs */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-600" />
            Apple Notarization &amp; Hardened Runtime
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every build of DiskWarren is compiled with Apple Hardened Runtime, signed with an official Apple Developer ID Application certificate, and notarized by Apple Ticket Service.
          </p>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Zero external telemetry or cloud uploads — completely air-gapped indexing</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Trash-first architecture — files recycled via macOS Trash, never permanent rm -rf</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Strict system directory blacklist protecting macOS integrity</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-4 text-xs">
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Application Name:</span>
            <span className="font-semibold text-slate-900 font-mono">DiskWarren.app</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Bundle Identifier:</span>
            <span className="font-semibold text-slate-900 font-mono">com.diskwarren.app</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Minimum macOS:</span>
            <span className="font-semibold text-slate-900 font-mono">14.0 Sonoma</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Architecture:</span>
            <span className="font-semibold text-slate-900 font-mono">arm64 + x86_64 (Universal 2)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Update Mechanism:</span>
            <span className="font-semibold text-slate-900 font-mono">Sparkle 2 EdDSA Signed</span>
          </div>
        </div>
      </div>

      {/* Support & Pricing Callout */}
      <div className="text-center text-sm text-slate-500 pt-4 flex flex-wrap items-center justify-center gap-4">
        <span>Need a perpetual license? <Link href="/pricing" className="text-cyan-600 hover:underline font-semibold">View Pro Pricing ($29)</Link></span>
        <span>•</span>
        <span>Questions? Visit <Link href="/support" className="text-cyan-600 hover:underline font-semibold">Support &amp; Help Center</Link></span>
        <span>•</span>
        <Link href="/privacy" className="text-cyan-600 hover:underline font-semibold">Zero-Telemetry Privacy</Link>
      </div>
    </div>
  );
}
