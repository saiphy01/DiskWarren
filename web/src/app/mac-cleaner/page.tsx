import React from 'react';
import Link from 'next/link';
import { Download, ShieldCheck, Lock, Zap, HardDrive, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Safe Mac Cleaner — No Subscriptions, Native Swift | DiskWarren',
  description: 'Clean your Mac safely with DiskWarren. Trash-first recycling, protected system blacklists, deep developer & AI cache detection, and a one-time $9.99 lifetime license.',
  alternates: { canonical: '/mac-cleaner' }
};

export default function MacCleanerPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Safe macOS Cleaning
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          A Mac Cleaner Designed to Never Break Your System
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Most Mac cleaners operate like blunt instruments, blindly deleting caches and running heavy background daemons. DiskWarren is a modern, transparent utility built on native macOS Trash safety and developer-grade rules.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/download"
            className="px-7 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-cyan-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Scan Your Mac Free</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Trash-First Safety</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All cleaned files are recycled to your native macOS Trash where supported. Restore any file with native &quot;Put Back&quot; at any time.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Developer &amp; AI Intelligence</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Natively targets Xcode DerivedData, Docker layers, orphaned node_modules, and Ollama/LM Studio model checkpoints.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">100% Local Privacy</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Completely air-gapped indexing. No file names, directory paths, or personal data ever leave your Mac.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Why DiskWarren Has No Background Daemons</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Traditional cleaning utilities install background agents that run constantly in your menu bar, consuming 300 MB to 500 MB of RAM and draining laptop battery life. DiskWarren launches when you want it, cleans with high-speed multi-threaded Swift, and releases 100% of its resources the moment you close it.
        </p>
      </div>
    </div>
  );
}
