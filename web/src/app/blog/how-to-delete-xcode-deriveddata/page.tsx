import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertTriangle, Download, HardDrive } from 'lucide-react';

export const metadata = {
  title: 'How to Safely Delete Xcode DerivedData (And Reclaim 30+ GB) — DiskWarren',
  description: 'Complete guide to finding and safely deleting Xcode DerivedData and module caches on macOS Sonoma and Sequoia without breaking your builds.',
};

export default function XcodeDerivedDataGuide() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Storage Guides</span>
      </Link>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-medium">Developer Guide</span>
          <span className="text-slate-500">• 4 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
          How to Safely Delete Xcode DerivedData and Reclaim 30+ GB
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          If you develop iOS or macOS apps, your disk space is likely disappearing into a directory called DerivedData. Here is why it grows so large, what happens when you purge it, and how to do it safely.
        </p>
      </div>

      <div className="prose prose-invert prose-slate text-sm space-y-6 text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">What is Xcode DerivedData?</h2>
          <p>
            Whenever you build, test, or index a project in Xcode, macOS stores intermediate compilation objects, precompiled headers, Swift module caches, and index stores in:
          </p>
          <pre className="p-3.5 rounded-lg bg-[#141A25] border border-[#232C3D] text-cyan-300 font-mono text-xs overflow-x-auto">
            ~/Library/Developer/Xcode/DerivedData
          </pre>
          <p>
            For active developers working on multiple branches or dependencies (Swift Packages, CocoaPods), this single directory frequently explodes to <strong>30 GB to 100 GB</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Is It Safe to Delete?</h2>
          <p>
            <strong>Yes, 100% safe.</strong> DerivedData does not contain your source code, Git commits, or project settings. It contains only cached compilation outputs.
          </p>
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300">
              <strong className="text-white block mb-0.5">The only consequence:</strong>
              The next time you open and compile a project in Xcode, it will rebuild from scratch and re-index. The initial build may take 1–2 minutes longer.
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Method 1: Safe Automatic Cleanup with DiskWarren</h2>
          <p>
            Instead of navigating hidden Library directories or writing risky terminal scripts, DiskWarren automatically detects Xcode DerivedData, simulator device logs, and old archive symbols:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Launch <strong>DiskWarren</strong>.</li>
            <li>Click <strong>Developer Storage Intelligence</strong>.</li>
            <li>Review the exact size and age of your DerivedData folder.</li>
            <li>Click <strong>Move to Trash</strong>. Items are safely recycled, giving you instant Put Back protection.</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Method 2: Manual Deletion via Terminal</h2>
          <p>
            If you prefer manual deletion, close Xcode first, then run:
          </p>
          <pre className="p-3.5 rounded-lg bg-[#141A25] border border-[#232C3D] text-slate-200 font-mono text-xs overflow-x-auto">
            rm -rf ~/Library/Developer/Xcode/DerivedData/*
          </pre>
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <span className="text-xs text-slate-300">
              Caution: Running <code className="text-amber-300">rm -rf</code> permanently deletes files without placing them in the macOS Trash.
            </span>
          </div>
        </section>
      </div>

      {/* In-Article Download Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-400 text-black flex items-center justify-center font-bold">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Clean Xcode & Developer Caches Safely</h4>
            <p className="text-xs text-slate-400">Download DiskWarren for macOS • 100% Native & Private</p>
          </div>
        </div>
        <Link 
          href="/#download"
          className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Get Free App</span>
        </Link>
      </div>
    </div>
  );
}
