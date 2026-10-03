'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Download, ShieldCheck, Terminal, CheckCircle2, Copy, Check, Sparkles, ArrowRight, Info, HardDrive } from 'lucide-react';
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
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <HardDrive className="w-4 h-4 text-cyan-600" />
          <span>Official Universal Release v1.0.0</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Download DiskWarren for macOS
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Reclaim gigabytes of developer caches, local AI weights, and uninstalled app leftovers. 
          100% native Swift, air-gapped indexing, and zero cloud telemetry.
        </p>
      </div>

      {/* Main Download Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 text-center relative overflow-hidden">
        <div className="space-y-6 max-w-xl mx-auto relative z-10">
          <div className="inline-flex p-4 rounded-2xl bg-cyan-50 text-cyan-600 mb-2 border border-cyan-100">
            <Download className="w-10 h-10 animate-bounce" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            DiskWarren v1.0.0 (Universal DMG)
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-600">
            <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
              Universal 2 (Apple Silicon M1-M4 &amp; Intel)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
              macOS 14.0 Sonoma &amp; macOS 15.0+ Sequoia
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
              Size: ~2.09 MB DMG
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
            Free disk scan &amp; interactive treemap exploration included. <Link href="/pricing" className="text-cyan-600 font-semibold hover:underline">Pro lifetime license ($9.99)</Link> unlocks one-click batch recycling.
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
                    <span>Copy Hash</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-cyan-400 break-all select-all shadow-inner">
            {sha256Checksum}
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            Verify integrity via macOS Terminal: <code className="text-cyan-800 bg-cyan-50 px-1 py-0.5 rounded border border-cyan-200/60">shasum -a 256 DiskWarren-1.0.0.dmg</code>
          </p>
        </div>
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
              Open the downloaded <code className="text-cyan-800 bg-cyan-50 px-1 py-0.5 rounded font-mono text-xs border border-cyan-200/60">.dmg</code> image and drag the <strong className="text-slate-900">DiskWarren</strong> app into your Applications folder.
            </p>
          </div>

          <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-4">
            <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-700 font-bold flex items-center justify-center text-sm">
              2
            </div>
            <h4 className="text-base font-semibold text-slate-900">First Launch &amp; Gatekeeper</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Launch DiskWarren from Applications. If macOS displays a standard security verification prompt, click <strong className="text-slate-900">Open</strong> (or right-click DiskWarren.app &gt; Open).
            </p>
          </div>

          <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-4">
            <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-700 font-bold flex items-center justify-center text-sm">
              3
            </div>
            <h4 className="text-base font-semibold text-slate-900">Grant Full Disk Access</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Go to <strong className="text-slate-900">System Settings &gt; Privacy &amp; Security &gt; Full Disk Access</strong> and toggle DiskWarren ON to allow indexing of hidden Xcode caches and library files.
            </p>
          </div>
        </div>
      </div>

      {/* Honest Technical Specifications */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-600" />
            Native Architecture &amp; Privacy Standards
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            DiskWarren is compiled natively using Apple Swift 6.0 and SwiftUI. It operates as an independent, standalone desktop utility with zero network dependencies for core indexing.
          </p>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Zero external telemetry or cloud uploads — completely air-gapped processing</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Trash-first architecture — files recycled via native macOS Trash where supported</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Permanent system directory safeguards protecting critical OS files</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-3.5 text-xs">
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
            <span className="font-semibold text-slate-900 font-mono">macOS 14.0 Sonoma</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Target macOS:</span>
            <span className="font-semibold text-slate-900 font-mono">macOS 15.0+ Sequoia</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Architecture:</span>
            <span className="font-semibold text-slate-900 font-mono">arm64 + x86_64 (Universal 2)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">License Verification:</span>
            <span className="font-semibold text-slate-900 font-mono">On-device Cryptographic (Ed25519)</span>
          </div>
        </div>
      </div>

      {/* Support & Release Notes Callout */}
      <div className="text-center text-sm text-slate-500 pt-4 flex flex-wrap items-center justify-center gap-4">
        <span>Need a perpetual license? <Link href="/pricing" className="text-cyan-600 hover:underline font-semibold">View Pro Pricing ($9.99 One-Time)</Link></span>
        <span>•</span>
        <Link href="/release-notes" className="text-cyan-600 hover:underline font-semibold">Release Notes (v1.0.0)</Link>
        <span>•</span>
        <Link href="/system-requirements" className="text-cyan-600 hover:underline font-semibold">System Requirements</Link>
        <span>•</span>
        <Link href="/support" className="text-cyan-600 hover:underline font-semibold">Support &amp; Help Center</Link>
      </div>
    </div>
  );
}
