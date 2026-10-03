'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Monitor, 
  Cpu, 
  HardDrive, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function WindowsSystemRequirementsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Monitor className="w-4 h-4 text-blue-600" />
          <span>Windows Compatibility</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Windows System Requirements
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          DiskWarren is engineered as a lightweight, native 64-bit .NET 8 desktop application. Review hardware, OS, and filesystem requirements below.
        </p>
      </div>

      {/* Requirements Specs Table / Cards */}
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <Monitor className="w-5 h-5 text-blue-600" />
            Supported Operating Systems
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 block">Windows 11 (All Editions)</span>
              <p className="text-xs text-slate-600">
                Fully supported: 21H2, 22H2, 23H2, and Windows 11 24H2. Supports Mica, system dark theme, and cascaded context menus.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 block">Windows 10 (64-bit)</span>
              <p className="text-xs text-slate-600">
                Supported on Windows 10 Version 20H2, 21H1, 21H2, 22H2 (Build 19042 or higher).
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-indigo-600" />
            Hardware &amp; Architecture
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block uppercase">Processor</span>
              <span className="font-bold text-slate-900 block">x64 &amp; ARM64</span>
              <p className="text-[11px] text-slate-600">
                Intel Core, AMD Ryzen, and Qualcomm Snapdragon X Elite / Plus native.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block uppercase">Memory (RAM)</span>
              <span className="font-bold text-slate-900 block">4 GB Min / 8 GB Rec</span>
              <p className="text-[11px] text-slate-600">
                8 GB recommended for drives indexing &gt;2,000,000 file nodes.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block uppercase">App Storage</span>
              <span className="font-bold text-slate-900 block">35 MB Available</span>
              <p className="text-[11px] text-slate-600">
                Lightweight self-contained installation. No external runtime needed.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <HardDrive className="w-5 h-5 text-emerald-600" />
            Supported Filesystems &amp; Drives
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 block">NTFS (Primary)</span>
              <p className="text-xs text-slate-600">
                High-speed metadata scanning, sparse files, alternate data streams, and Recycle Bin integration.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 block">exFAT, FAT32, &amp; ReFS</span>
              <p className="text-xs text-slate-600">
                Supports external USB hard drives, high-capacity SD cards, and Windows Server / Dev Drive ReFS volumes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          href="/windows/download"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all"
        >
          <span>Download DiskWarren for Windows</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
