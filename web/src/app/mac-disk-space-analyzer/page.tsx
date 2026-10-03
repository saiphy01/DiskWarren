import React from 'react';
import Link from 'next/link';
import { Download, Layers, Lock, ShieldCheck, HardDrive, CheckCircle2, Terminal, ArrowRight } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'Mac Disk Space Analyzer — Fast, Visual Storage Treemap | DiskWarren',
  description: 'Understand exactly what is filling your Mac hard drive. Interactive squarified treemap, instant large files explorer, and 100% local privacy.',
  alternates: { canonical: '/mac-disk-space-analyzer' }
};

export default function MacDiskSpaceAnalyzerPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Storage Visualization
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Visual Disk Space Analyzer for macOS
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          See your entire APFS container mapped as physical interactive space. Drill down through directories, isolate runaway caches, and locate mystery files in seconds.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/download"
            className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-cyan-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Free Disk Analyzer</span>
          </Link>
        </div>
      </div>

      {/* Feature Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-cyan-200 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Squarified Treemap</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Folders and files render proportional to their byte weight. Golden-ratio rectangles make large culprits jump out visually.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-emerald-200 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">100% Local &amp; Private</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All directory traversal occurs entirely on your device. Zero cloud uploads, zero telemetry of filenames or disk contents.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-purple-200 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Trash-First Safety</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Move unwanted items to the native macOS Trash with full Put Back restoration capability. Permanent barriers protect macOS system folders.
          </p>
        </div>
      </div>

      {/* Deep Dive Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Why Traditional Disk Tree Lists Fail</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Standard text list utilities force you to sort through thousands of folders line by line. Squarified treemaps compute area geometry based on byte allocation. A 40 GB Xcode cache block physically occupies 40x more screen area than a 1 GB document folder, allowing you to identify what is devouring space in less than three seconds.
        </p>

        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900">Checking Disk Usage via CLI</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            While DiskWarren provides an interactive GUI, you can also inspect folder byte usage via terminal:
          </p>
          <CodeBlock 
            code={`# Find top 10 largest folders in user Library\ndu -sh ~/Library/* 2>/dev/null | sort -hr | head -n 10`}
            title="Terminal Disk Usage Check"
          />
        </div>
      </div>
    </div>
  );
}
