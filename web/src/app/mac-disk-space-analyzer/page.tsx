import React from 'react';
import Link from 'next/link';
import { HardDrive, Download, CheckCircle2, ArrowRight, Layers, Lock, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Mac Disk Space Analyzer — Fast, Visual Storage Treemap | DiskWarren',
  description: 'Understand exactly what is filling your Mac hard drive. Interactive squarified treemap, instant large files explorer, and 100% local privacy.',
  alternates: { canonical: '/mac-disk-space-analyzer' }
};

export default function MacDiskSpaceAnalyzerPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-12">
      <div className="space-y-4 text-center">
        <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          Storage Visualization
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          The Fastest Visual Disk Space Analyzer for macOS
        </h1>
        <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          See your entire APFS container mapped as physical interactive space. Drill down through directories, isolate runaway caches, and locate mystery files in seconds.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/#download"
            className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-cyan-400/25"
          >
            <Download className="w-4 h-4" />
            <span>Download Free Disk Analyzer</span>
          </Link>
        </div>
      </div>

      {/* Feature Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 rounded-xl bg-[#10151F] border border-[#212B3B] space-y-3">
          <Layers className="w-6 h-6 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">Squarified Treemap</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Folders and files render proportional to their byte weight. Golden-ratio rectangles make large culprits jump out visually.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#10151F] border border-[#212B3B] space-y-3">
          <Lock className="w-6 h-6 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">100% Local & Private</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All directory traversal occurs entirely on your device. Zero cloud uploads, zero telemetry of filenames.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#10151F] border border-[#212B3B] space-y-3">
          <ShieldCheck className="w-6 h-6 text-purple-400" />
          <h3 className="text-lg font-bold text-white">Trash-First Safety</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            No accidental unlinks. Move unwanted items to the macOS Trash with full Put Back restoration capability.
          </p>
        </div>
      </div>
    </div>
  );
}
