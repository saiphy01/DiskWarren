'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  RotateCcw, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Cpu,
  Layers,
  Download
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
          Built to Prevent Accidental Deletions
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Generic cleaner utilities often promise &ldquo;one-click magic&rdquo; and end up wiping active development projects or breaking local developer environments. DiskWarren is designed around explicit user review, native macOS Trash reversibility, and protected APFS system boundaries.
        </p>
      </div>

      {/* Safety Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pillar 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <RotateCcw className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">1. macOS Trash-First Deletion</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            DiskWarren never uses destructive raw unlinks (<code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">rm -rf</code>) on user files. Cleanups route directly through the macOS Trash system (<code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">NSFileManager.trashItem</code>). If you ever need an item back, open Trash in Finder, right-click, and select &ldquo;Put Back.&rdquo;
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">2. Hardcoded System Protections</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our safety gate enforces an immutable blocklist that explicitly rejects any modifications inside Apple SIP (System Integrity Protection) volumes, including <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">/System</code>, <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">/usr/bin</code>, user keychains, and sealed APFS system snapshots.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">3. Safe Rebuilding Guarantee</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            DiskWarren flags cleanable developer caches that are 100% reproducible: Xcode DerivedData, CocoaPods, node_modules, Cargo build targets, and Docker build layers. Your source repositories, Git commits, and uncommitted code are strictly protected and never targeted.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">4. 100% On-Device Privacy</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Zero telemetry. No filenames, directory structures, repository names, or personal documents are ever transmitted over the network. DiskWarren operates completely offline without needing an internet connection.
          </p>
        </div>
      </div>

      {/* Safety Summary Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Engineered for Mac Professionals</span>
          <h3 className="text-2xl sm:text-3xl font-bold">Explicit Review Before Every Action</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            DiskWarren provides clear itemized previews displaying the exact file path, size, and category. You can uncheck individual items or entire directories before confirming any action.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Apple Silicon M1–M4 Native</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Reversible via macOS Trash</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Zero Background Processes</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-2xl font-bold text-slate-900">Scan Your Mac Safely</h3>
        <p className="text-sm text-slate-600">Free download for macOS 14 Sonoma and macOS 15 Sequoia.</p>
        <div>
          <Link
            href="/download"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md shadow-cyan-600/25 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download DiskWarren Universal DMG</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
