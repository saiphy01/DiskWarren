import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertTriangle, Download, HardDrive } from 'lucide-react';

export const metadata = {
  title: 'How to Find & Delete node_modules Recursively on Mac — DiskWarren',
  description: 'Learn how to locate and safely remove bloated node_modules directories across your Mac without accidentally deleting active project builds.',
  alternates: { canonical: '/blog/delete-node-modules-recursively' }
};

export default function DeleteNodeModulesGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 font-medium transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Storage Guides</span>
      </Link>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 sm:p-12 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-medium">Developer Guide</span>
            <span className="text-slate-500">• 5 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            How to Find &amp; Delete node_modules Recursively on macOS
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Every web developer has experienced it: months of prototyping, tutorial projects, and archived client repositories secretly consuming 50+ GB of SSD space in duplicate <code className="text-cyan-800 bg-cyan-50 px-1 py-0.5 rounded font-mono text-xs border border-cyan-200/60">node_modules</code> directories.
          </p>
        </div>

        <div className="text-sm space-y-6 text-slate-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Why Do node_modules Folders Grow So Enormous?</h2>
            <p>
              In modern JavaScript and TypeScript development, even a small utility application pulls in thousands of transitive dependencies. Because npm, yarn, and older pnpm setups often duplicate packages per project, having 20–30 inactive repositories on your Mac can easily occupy <strong>40 GB to 100 GB</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">The Danger of Naive Terminal Scripts</h2>
            <p>
              Developers often attempt to purge dependencies using generic bash scripts:
            </p>
            <pre className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto shadow-inner">
              find . -name &quot;node_modules&quot; -type d -prune -exec rm -rf &apos;{}&apos; +
            </pre>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950">
                <strong className="text-slate-900 block mb-0.5">High Risk:</strong>
                Blind <code className="text-amber-800 bg-amber-100 px-1 py-0.5 rounded font-mono">rm -rf</code> commands permanently delete directories without using the macOS Trash. If you run this in the wrong parent folder or delete packages from an unpushed branch with uncommitted dependency patches, the work is unrecoverable.
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">The Safe Solution: DiskWarren Storage Intelligence</h2>
            <p>
              DiskWarren provides a dedicated developer scanner that indexes projects across your drive:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-slate-600">
              <li>Scans <code className="text-cyan-800 bg-cyan-50 px-1 py-0.5 rounded font-mono text-xs border border-cyan-200/60">~/Projects</code> and custom developer directories in sub-second time.</li>
              <li>Checks Git commit recency and file access times to classify projects as <strong>Active</strong> versus <strong>Dormant</strong>.</li>
              <li>Presents exact sizes and item counts before any action is taken.</li>
              <li>Recycles chosen folders to the native macOS Trash so you can instantly click <strong>Put Back</strong> if ever needed.</li>
            </ol>
          </section>
        </div>

        {/* Download Banner */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
              <HardDrive className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Clean Stale node_modules Safely</h4>
              <p className="text-xs text-slate-500">Download DiskWarren for macOS • 100% Native &amp; Private</p>
            </div>
          </div>
          <Link 
            href="/download"
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-sm shadow-cyan-600/25 flex items-center gap-1.5 shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Get Free App</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
