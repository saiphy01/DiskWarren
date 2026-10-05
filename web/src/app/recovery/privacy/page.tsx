'use client';

import React from 'react';
import Link from 'next/link';
import { Lock, ShieldCheck, CheckCircle2, Download } from 'lucide-react';

export default function RecoveryPrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Lock className="w-3.5 h-3.5 text-teal-600" />
          <span>Zero-Telemetry Commitment</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Your Recovered Data Stays on Your PC
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Data recovery often deals with sensitive personal memories, financial records, client databases, and confidential business documents. DiskWarren operates on a strict zero-knowledge architecture.
        </p>
      </div>

      {/* Core Privacy Commitments */}
      <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          <span>What We Never Collect or Transmit</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block">No File Contents</span>
            <p className="text-slate-600">The contents of your recovered files are written directly from source blocks to your chosen export directory. No data is sent to external servers.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block">No File Names or Paths</span>
            <p className="text-slate-600">Directory hierarchies, file names, and folder structures stay strictly in volatile local memory during your scan session.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block">No Hardware Serials</span>
            <p className="text-slate-600">Physical drive serial numbers and volume labels are queried locally via Win32 APIs for display purposes only.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block">Offline License Checks</span>
            <p className="text-slate-600">Pro and Technician licenses use local cryptographic key verification. No internet connection is required to scan or export files.</p>
          </div>
        </div>
      </div>

      {/* Sandboxed Previews */}
      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Isolated In-Memory Previews</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          To protect your system from potentially corrupted or hostile binary structures, file previews (images, documents, and media headers) are parsed in isolated, sandboxed memory buffers with strict memory bounding limits.
        </p>
      </div>

      {/* CTA Box */}
      <div className="text-center space-y-4 pt-4">
        <Link
          href="/recovery/download"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download Free Scanner</span>
        </Link>
      </div>
    </div>
  );
}
