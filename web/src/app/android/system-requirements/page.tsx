'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Smartphone, 
  Cpu, 
  HardDrive, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function AndroidSystemRequirementsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Smartphone className="w-4 h-4 text-emerald-600" />
          <span>Android Compatibility</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Android System Requirements
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          DiskWarren is engineered natively using Kotlin and Jetpack Compose. Review device, OS, and permission specifications below.
        </p>
      </div>

      {/* Requirements Specs Table / Cards */}
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <Smartphone className="w-5 h-5 text-emerald-600" />
            Supported Operating Systems
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 block">Modern Android (11 to 15)</span>
              <p className="text-xs text-slate-600">
                Full native support including 30-Day OS Trash (<code className="text-slate-800 font-mono">MediaStore.createTrashRequest</code>), Material You dynamic theme, and predictive back animations.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 block">Android 10 (API 29)</span>
              <p className="text-xs text-slate-600">
                Legacy Scoped Storage mode supported. Deletions require standard system confirmation.
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
              <span className="font-bold text-slate-900 block">ARM64 &amp; x86_64</span>
              <p className="text-[11px] text-slate-600">
                Qualcomm Snapdragon, MediaTek Dimensity, Google Tensor, Samsung Exynos.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block uppercase">RAM</span>
              <span className="font-bold text-slate-900 block">3 GB Min / 6 GB Rec</span>
              <p className="text-[11px] text-slate-600">
                Smooth 120Hz scrolling even on large galleries with &gt;40,000 items.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block uppercase">App Footprint</span>
              <span className="font-bold text-slate-900 block">~12 MB Total</span>
              <p className="text-[11px] text-slate-600">
                Compact, efficient native binary with ProGuard tree-shaking applied.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <HardDrive className="w-5 h-5 text-blue-600" />
            Supported Storage Media
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 block">Internal Flash (UFS / eMMC)</span>
              <p className="text-xs text-slate-600">
                High-speed parallel indexing across all standard media directories (DCIM, Pictures, Movies, Download).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 block">Removable MicroSD Cards &amp; USB OTG</span>
              <p className="text-xs text-slate-600">
                Audits external SD cards and connected USB flash storage via the Android Storage Access Framework.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          href="/android/download"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition-all"
        >
          <span>Get DiskWarren for Android</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
