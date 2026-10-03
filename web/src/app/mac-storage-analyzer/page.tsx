import React from 'react';
import Link from 'next/link';
import { Download, Layers, ShieldCheck, Lock, HardDrive, CheckCircle2, ArrowRight, Terminal } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'Mac Storage Analyzer — Visual APFS Intelligence & Safe Cleanup | DiskWarren',
  description: 'Understand your Mac’s true storage breakdown. Interactive squarified treemaps, partition rings, hidden developer cache discovery, and Trash-first safety.',
  alternates: { canonical: '/mac-storage-analyzer' }
};

export default function MacStorageAnalyzerPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      {/* Hero */}
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          macOS Storage Intelligence
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          The Comprehensive Mac Storage Analyzer
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          macOS System Settings tells you that storage is full, but lumps gigabytes of vital data into an impenetrable &quot;System Data&quot; bar. DiskWarren decodes your entire APFS container into clear, actionable visual categories.
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

      {/* Deep Technical Explanation */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">How macOS Organizes Storage (And Why It Gets Confusing)</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          On modern Macs running APFS (Apple File System), storage is shared across multiple volumes inside a single APFS Container. The sealed system snapshot resides on a cryptographically signed read-only volume, while user files, caches, and application support data reside on the Data volume.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">APFS Purgeable Space</span>
            <p className="text-slate-600">Blocks macOS considers reclaimable when disk pressure rises, including local snapshots and expired caches.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">TCC Protected Folders</span>
            <p className="text-slate-600">Hidden user library directories requiring Full Disk Access permission to calculate actual disk footprints.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Developer Artifacts</span>
            <p className="text-slate-600">Uncommitted client repositories, build caches, and simulator runtimes that standard tools ignore.</p>
          </div>
        </div>
      </div>

      {/* Visual Paradigms Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Two Visual Paradigms in One Native App</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Squarified Treemap Matrix</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Visualize folder hierarchies as nested rectangles scaled to exact byte weight. Zoom into any subfolder to inspect dense caches or runaway log files in seconds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <HardDrive className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">macOS Partition Ring (Pie)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inspect your overall APFS container balance at a glance: system sealed blocks, user documents, developer artifacts, local AI models, and available free space.
            </p>
          </div>
        </div>
      </div>

      {/* Safety Section */}
      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          Safety by Design: Trash-First Recycling
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          DiskWarren recycles user-confirmed items to the native macOS Trash (~/.Trash) with full Put Back support. Critical system directories (/System, /usr, /bin) are guarded by permanent engine barriers.
        </p>
      </div>

      {/* Terminal Inspection Commands */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-600" />
          Helpful Terminal Commands for Mac Storage
        </h3>
        <CodeBlock 
          code={`# Check APFS Container volume usage\ndiskutil apfs list\n\n# Inspect local Time Machine snapshots taking up space\ntmutil listlocalsnapshots /`}
          title="Terminal Storage Inspection"
        />
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-cyan-950 text-white text-center space-y-4 shadow-xl">
        <h3 className="text-2xl font-bold">Ready to analyze your Mac storage?</h3>
        <p className="text-xs text-slate-300 max-w-lg mx-auto">
          Download DiskWarren for macOS. Free storage scanner, squarified treemaps, and zero cloud telemetry.
        </p>
        <div className="pt-2 flex justify-center">
          <Link
            href="/download"
            className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download DiskWarren Universal DMG</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
