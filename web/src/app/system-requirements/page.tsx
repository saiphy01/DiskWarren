import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cpu, HardDrive, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'System Requirements — DiskWarren for macOS',
  description: 'Technical specifications, supported macOS versions, chip architectures, and permission requirements for DiskWarren.',
  alternates: { canonical: '/system-requirements' }
};

export default function SystemRequirementsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-14 space-y-10">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 font-medium transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to DiskWarren</span>
      </Link>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold">
          <Cpu className="w-3.5 h-3.5 text-cyan-600" />
          <span>Technical Specifications</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          System Requirements
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          DiskWarren is built specifically for modern macOS architectures and filesystems. Below are the verified minimum and recommended system requirements.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Hardware &amp; Platform Support</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-500 block">Minimum Operating System</span>
            <span className="text-sm font-bold text-slate-900">macOS 14.0 Sonoma</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-500 block">Recommended Operating System</span>
            <span className="text-sm font-bold text-slate-900">macOS 15.0+ Sequoia</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-500 block">Chip Architecture</span>
            <span className="text-sm font-bold text-slate-900">Apple Silicon (M1/M2/M3/M4) &amp; Intel x86_64</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-500 block">Filesystem Support</span>
            <span className="text-sm font-bold text-slate-900">APFS (Apple File System) &amp; HFS+</span>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Required macOS Permissions</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            To index system directories, Time Machine snapshots, and application caches located in user library paths, DiskWarren requires:
          </p>
          <ul className="text-xs text-slate-700 space-y-2 list-disc pl-5">
            <li><strong>Full Disk Access (FDA):</strong> Configured via System Settings &gt; Privacy &amp; Security &gt; Full Disk Access.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
