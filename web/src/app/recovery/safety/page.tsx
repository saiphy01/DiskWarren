'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  HardDrive, 
  Hash, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Download, 
  ArrowRight,
  Cpu,
  FileCheck
} from 'lucide-react';

export default function RecoverySafetyPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>Non-Negotiable Data Safety Architecture</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          The First Rule of Recovery: Do No Harm
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Flawed recovery utilities often overwrite deleted data while attempting to read it. DiskWarren Recover is built from the ground up to guarantee 100% read-only isolation of your source storage.
        </p>
      </div>

      {/* 4 Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pillar 1 */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">1. Strict Read-Only Block Layer</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Physical drives (<code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-[11px]">\\.\PhysicalDriveX</code>) and volumes (<code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-[11px]">\\.\C:</code>) are opened via Win32 <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-[11px]">CreateFileW</code> using <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-[11px]">GENERIC_READ</code> only.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Zero write handles requested from the OS</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Core engine exposes no write APIs whatsoever</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Filesystem access timestamps are never updated</li>
          </ul>
        </div>

        {/* Pillar 2 */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <HardDrive className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">2. Destination Physical Isolation</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Many users mistakenly save recovered files to a different folder or partition on the same drive. If Drive C: and Drive D: are partitions on the same physical SSD, writing to D: will permanently destroy recoverable clusters on C:.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Queries Win32 IOCTL_STORAGE_GET_DEVICE_NUMBER</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Blocks same-disk export even if drive letters differ</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Pre-checks available free space on target drive</li>
          </ul>
        </div>

        {/* Pillar 3 */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Hash className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">3. Cryptographic SHA-256 Verification</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            During file extraction, DiskWarren streams sectors through a streaming SHA-256 digest. Once the file is written to the destination disk, the engine re-reads the written bytes to guarantee cryptographic parity.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Identifies silent storage write corruption</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Exports timestamped verification audit manifest</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Forensic-grade chain of custody support</li>
          </ul>
        </div>

        {/* Pillar 4 */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">4. Zero In-Place Repairs</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Windows built-in <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-[11px]">chkdsk /f</code> attempts to force filesystem consistency by truncating orphan chains and overwriting damaged directory tables.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> DiskWarren NEVER runs CHKDSK or partition repairs</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> Never writes metadata back to the damaged volume</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> All recovery operates strictly via read-and-export</li>
          </ul>
        </div>
      </div>

      {/* Failing Drives Section */}
      <div className="p-8 sm:p-10 rounded-2xl bg-slate-900 text-white space-y-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <HardDrive className="w-6 h-6 text-teal-400" />
          <span>Specialized Handling for Physically Degraded Drives</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          When a hard drive suffers from bad sectors or failing magnetic heads, conventional scan operations hammer the damaged surface, causing catastrophic media collapse.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
            <span className="text-xs font-bold text-teal-400 block">Bounded Retries</span>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Configurable read timeout and bad-sector skip policy prevents the OS from hanging in infinite I/O retry loops.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
            <span className="text-xs font-bold text-teal-400 block">Pass-Through Disk Imaging</span>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Creates a raw byte-for-byte image file (.raw/.dd) in a single linear pass, recording a damaged sector map.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
            <span className="text-xs font-bold text-teal-400 block">Zero Live Scan Stress</span>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Once imaged, you can disconnect the dying drive immediately and conduct all deep carving against the image file.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center space-y-4 pt-8 border-t border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900">Experience Safe Data Recovery Today</h3>
        <p className="text-xs text-slate-600 max-w-lg mx-auto">
          Scan your drive without risk. Download the free community scanner to preview your recoverable files.
        </p>
        <div className="pt-2">
          <Link
            href="/recovery/download"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Free Scanner</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
