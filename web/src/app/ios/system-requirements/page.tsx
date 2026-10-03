'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Smartphone, 
  Tablet, 
  Cpu, 
  HardDrive, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function IOSSystemRequirementsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Smartphone className="w-4 h-4 text-purple-600" />
          <span>iOS Compatibility</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          iOS &amp; iPadOS System Requirements
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          DiskWarren is engineered natively using Swift and SwiftUI. Review supported iPhone models, iPad models, and minimum iOS versions below.
        </p>
      </div>

      {/* Requirements Specs Table / Cards */}
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <Smartphone className="w-5 h-5 text-purple-600" />
            Supported iPhone Models
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 block">iPhone 14, 15, &amp; 16 Series</span>
              <p className="text-xs text-slate-600">
                Full hardware acceleration on A16 Bionic, A17 Pro, and A18 chips. Instant 4K 60fps ProRes indexing.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 block">iPhone 11, 12, &amp; 13 Series</span>
              <p className="text-xs text-slate-600">
                Supported on iPhone 11, 12, 13 (including mini, Pro, Pro Max) and iPhone SE (2nd &amp; 3rd Gen).
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <Tablet className="w-5 h-5 text-indigo-600" />
            Supported iPad Models
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 block">iPad Pro (M1, M2, &amp; M4)</span>
              <p className="text-xs text-slate-600">
                Full desktop-class performance with Stage Manager, external display support, and multi-window multitasking.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 block">iPad Air, iPad, &amp; iPad mini</span>
              <p className="text-xs text-slate-600">
                iPad Air (3rd Gen+), iPad (8th Gen+), and iPad mini (5th Gen+) running iPadOS 17 or higher.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-emerald-600" />
            Operating System &amp; Architecture
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block uppercase">Operating System</span>
              <span className="font-bold text-slate-900 block">iOS 17.0+ &amp; iOS 18</span>
              <p className="text-[11px] text-slate-600">
                Requires iOS 17.0 or iPadOS 17.0 or higher.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block uppercase">Processor</span>
              <span className="font-bold text-slate-900 block">Apple Silicon 64-bit</span>
              <p className="text-[11px] text-slate-600">
                A12 Bionic or newer with 16-core Apple Neural Engine.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block uppercase">App Footprint</span>
              <span className="font-bold text-slate-900 block">~9 MB Total</span>
              <p className="text-[11px] text-slate-600">
                Ultra-lightweight native Swift package with zero bloat.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          href="/ios/download"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-md shadow-purple-600/25 transition-all"
        >
          <span>Download on App Store</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
