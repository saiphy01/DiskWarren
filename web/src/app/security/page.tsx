import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, FolderLock, RotateCcw, Terminal } from 'lucide-react';

export const metadata = {
  title: 'Security & Safety Architecture — DiskWarren',
  description: 'Learn how DiskWarren guards your files through air-gapped local processing, protected system path blacklists, and Trash-first recycling.',
  alternates: { canonical: '/security' }
};

export default function SecurityPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-12">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 font-medium transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to DiskWarren</span>
      </Link>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Security &amp; Safety by Design</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          DiskWarren Security Architecture
        </h1>
        <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
          Storage utilities interact with sensitive personal files. We built DiskWarren with a defense-in-depth safety model: 100% on-device processing, hardcoded OS protection barriers, and reversible Trash routing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Air-Gapped Indexing</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All filesystem traversal, inode inspection, size calculation, and duplicate matching run exclusively in local Mac memory. DiskWarren contains zero network telemetry beacons, zero analytics trackers, and zero cloud synchronization hooks.
          </p>
        </div>

        <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
            <FolderLock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Permanent Protected System Paths</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our engine implements hardcoded protection barriers preventing deletion of critical macOS locations: <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">/System</code>, <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">/usr</code>, <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">/bin</code>, <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">/sbin</code>, user keychains, and cryptographically sealed APFS snapshots.
          </p>
        </div>

        <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
            <RotateCcw className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Trash-First Reversibility</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            By default, DiskWarren recycles candidate files directly to the native macOS Trash (~/.Trash). If you need an item back, simply open Trash in Finder, right-click, and choose &quot;Put Back&quot; to restore it to its exact original directory.
          </p>
        </div>

        <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Offline Cryptographic Licensing</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            License keys are verified mathematically using on-device public-key cryptography (Ed25519). The application does not phone home to activate or validate licenses, ensuring seamless operation in classified, corporate, or offline environments.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Transparency, Consent &amp; Control (TCC)</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          DiskWarren requests Full Disk Access strictly to index System Data, local snapshots, and hidden developer caches like Xcode DerivedData. DiskWarren never accesses network sockets during scan operations and respects user revocations at all times.
        </p>
        <div className="pt-2">
          <Link href="/privacy" className="text-xs font-bold text-cyan-700 hover:underline">
            Read our complete Zero-Telemetry Privacy Policy &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
