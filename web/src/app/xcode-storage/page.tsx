import React from 'react';
import Link from 'next/link';
import { Download, Hammer, ShieldCheck, CheckCircle2, Terminal } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'Xcode Storage Cleaner — DerivedData, Simulators & Archives | DiskWarren',
  description: 'Safely clear 30+ GB of Xcode DerivedData, legacy iOS simulators, and module caches on macOS. Native Swift utility with Trash Put Back protection.',
  alternates: { canonical: '/xcode-storage' }
};

export default function XcodeStoragePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Apple Developer Tooling
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Reclaim 30+ GB of Xcode Storage Safely
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Every build, index, and simulator runtime in Xcode adds gigabytes to your drive. DiskWarren categorizes your Xcode caches by project, allowing you to recycle them safely without breaking project settings.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/download"
            className="px-7 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-cyan-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Scan Xcode Storage Free</span>
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">What Xcode Hides in ~/Library/Developer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block text-sm">DerivedData</span>
            <p className="text-slate-600">Intermediate compilation artifacts, module maps, and project indexes. Rebuilt automatically on next compile.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block text-sm">Simulator Runtimes</span>
            <p className="text-slate-600">Old iOS, watchOS, and tvOS system images often taking 8 GB to 15 GB per version.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block text-sm">Archives &amp; DSYMs</span>
            <p className="text-slate-600">Historical builds and symbol maps from previous test and App Store submissions.</p>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Safe Terminal Command to Delete DerivedData</h3>
          <CodeBlock 
            code={`# Delete all Xcode DerivedData (Xcode will re-index on next launch)\nrm -rf ~/Library/Developer/Xcode/DerivedData/*`}
            title="Clear DerivedData via Terminal"
          />
        </div>
      </div>
    </div>
  );
}
