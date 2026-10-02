import React from 'react';
import Link from 'next/link';
import { Download, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Mac Cleaner for Developers — Xcode, Docker & Node Intelligence | DiskWarren',
  description: 'The disk cleaner built specifically for software engineers. Safely reclaim 40+ GB of Xcode DerivedData, stale node_modules, Cargo targets, and Docker data.',
  alternates: { canonical: '/mac-cleaner-for-developers' }
};

export default function MacCleanerForDevelopersPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-12">
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Developer Workflows
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          The Mac Storage Utility Built for Software Engineers
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Generic cleaners ignore what actually devours developer SSDs. DiskWarren natively targets Xcode DerivedData, archived simulators, orphaned node_modules, Rust targets, and Docker container layers.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/download"
            className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-cyan-600/25 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download for Developers</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {[
          {
            title: "Xcode DerivedData & Archives",
            desc: "Xcode accumulates dozens of gigabytes of intermediate build products and symbol files. DiskWarren safely categorizes them and provides one-click trash recycling."
          },
          {
            title: "Orphaned node_modules Trees",
            desc: "Discover uncommitted client repositories and abandoned projects quietly holding gigabytes of stale node dependencies."
          },
          {
            title: "Rust Cargo Targets & Registry",
            desc: "Target folders in Rust projects multiply quickly. Easily locate target/debug and target/release directories across your workspace."
          },
          {
            title: "Homebrew & Python Wheel Caches",
            desc: "Clean up cached Homebrew tarball downloads and stale pip wheel archives without breaking existing active environments."
          }
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2.5 hover:border-cyan-200 hover:shadow-md transition-all">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-600" />
              {item.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
