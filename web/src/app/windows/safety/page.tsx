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

export default function WindowsSafetyPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Windows Safety by Design</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Reversible PC Cleanup. Zero Broken Installs.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Most Windows cleanup tools recklessly wipe registry keys and delete system files. 
          DiskWarren is architected with strict immutable safety gates, Win32 Recycle Bin reversible deletion, and zero registry tampering.
        </p>
      </div>

      {/* Safety Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pillar 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">1. Win32 Recycle Bin Reversibility</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            DiskWarren never calls destructive raw file APIs on user data. Every cleanup action is dispatched through the official Win32 shell API (<code className="text-slate-800 font-mono text-xs">SHFileOperationW</code> with <code className="text-slate-800 font-mono text-xs">FOF_ALLOWUNDO</code>). 
            If you ever need a file back, open the Windows Recycle Bin on your desktop and click <strong>Restore</strong>.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">2. Hardcoded System Write-Blocks</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our safety gate maintains an immutable blocklist embedded directly into the native C# engine. DiskWarren is physically prevented from modifying or deleting files inside:
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 font-mono bg-slate-50 p-3 rounded-xl border border-slate-100">
            <li>• C:\Windows\System32</li>
            <li>• C:\Windows\SysWOW64</li>
            <li>• C:\Windows\WinSxS</li>
            <li>• C:\pagefile.sys, hiberfil.sys, swapfile.sys</li>
          </ul>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">3. Zero Registry Tampering</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Legacy PC cleaners gained a notorious reputation by aggressively deleting &ldquo;unused&rdquo; registry keys, breaking COM registrations and leading to Blue Screens of Death (BSOD). 
            DiskWarren <strong>never modifies or deletes the Windows Registry</strong>. We strictly focus on multi-gigabyte build artifacts and orphaned developer caches.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">4. Transparent Review &amp; Pre-Scan Audit</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            DiskWarren never performs automated background wipes without your explicit consent. Every scan provides an itemized list of exact file paths, creation timestamps, and reclaimable bytes, allowing you to uncheck any file before taking action.
          </p>
        </div>
      </div>

      {/* Developer Safety Policy */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Engineered for Developers</span>
          <h3 className="text-2xl sm:text-3xl font-bold">Safe Rebuilding Guarantee</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Every developer category targeted by DiskWarren (Visual Studio <code className="text-blue-300 font-mono">.vs</code> folders, NuGet caches, <code className="text-blue-300 font-mono">node_modules</code>, and Cargo target directories) contains 100% reproducible artifacts. 
            Source code, git history, and environment variables are never touched.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Git Repositories Untouched</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>.env &amp; Secrets Protected</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Air-Gapped Local Analysis</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-2xl font-bold text-slate-900">Audit Your Windows PC Safely</h3>
        <p className="text-sm text-slate-600">Run a complete NTFS storage scan for free. No credit card, no risk.</p>
        <div>
          <Link
            href="/windows/download"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all"
          >
            <span>Download Free Edition</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
