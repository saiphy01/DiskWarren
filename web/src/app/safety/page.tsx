'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  RefreshCw, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  HardDrive,
  Cpu,
  Layers,
  FileCheck
} from 'lucide-react';

export default function MacSafetyPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <ShieldCheck className="w-4 h-4 text-cyan-600" />
          <span>Safety by Design</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Designed to Prevent Accidental Deletion
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Generic Mac cleaners promise "one-click magic" and risk breaking developer environments or erasing critical system caches. 
          DiskWarren is engineered around explicit user review, macOS Trash-first reversibility, and immutable APFS protection.
        </p>
      </div>

      {/* Safety Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pillar 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">1. macOS Trash-First Deletion</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            DiskWarren never uses destructive raw unlinks (<code className="text-slate-800 font-mono text-xs">rm -rf</code>) on user files. Cleanups route through macOS <code className="text-slate-800 font-mono text-xs">NSFileManager.trashItem</code>, allowing you to instantly restore any item from your Mac's Dock Trash with "Put Back".
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">2. Protected System Whitelist</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our safety gate enforces an immutable hardcoded blocklist that physically rejects scans and modifications inside Apple SIP (System Integrity Protection) volumes, including <code className="text-slate-800 font-mono text-xs">/System</code>, <code className="text-slate-800 font-mono text-xs">/usr/bin</code>, and critical kernel extensions.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">3. Safe Rebuilding Guarantee</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            DiskWarren targets only 100% reproducible developer artifacts (Xcode DerivedData, CocoaPods, node_modules, Cargo build targets, and Docker build caches). Source repositories, git commits, and uncommitted code are strictly whitelisted and never touched.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">4. 100% Air-Gapped Local Operation</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Zero telemetry. No file paths, directory structures, code names, or personal documents are ever uploaded to cloud servers. DiskWarren operates fully offline without requiring network connectivity.
          </p>
        </div>
      </div>

      {/* Safety Summary Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Engineered for Mac Professionals</span>
          <h3 className="text-2xl sm:text-3xl font-bold">Explicit Review Before Every Action</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            DiskWarren provides granular itemized previews displaying the exact file path, size, and category. You can uncheck individual items or entire directories before confirming cleanup.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Apple Silicon M1-M4 Optimized</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Native macOS Notarization</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Reversible via macOS Trash</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-2xl font-bold text-slate-900">Scan Your Mac Safely</h3>
        <p className="text-sm text-slate-600">Free download for macOS Monterey through macOS Sequoia.</p>
        <div>
          <Link
            href="/download"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md shadow-cyan-600/25 transition-all"
          >
            <span>Download DiskWarren Universal DMG</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
