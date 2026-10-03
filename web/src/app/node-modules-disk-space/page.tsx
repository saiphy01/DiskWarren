import React from 'react';
import Link from 'next/link';
import { Download, FolderTree, CheckCircle2, Terminal } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'Find & Delete node_modules on Mac — Free Disk Space | DiskWarren',
  description: 'Locate dormant node_modules trees across all your coding projects on macOS. Clean orphaned dependencies safely with Trash Put Back protection.',
  alternates: { canonical: '/node-modules-disk-space' }
};

export default function NodeModulesDiskSpacePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Web Development Storage
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Find and Reclaim node_modules Disk Space on Mac
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Every JavaScript project accumulates hundreds of megabytes of nested dependencies. DiskWarren recursively indexes your projects folder, detects stale repositories, and lets you recycle them to Trash with native restoration.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/download"
            className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-emerald-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Scan node_modules Free</span>
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Why node_modules Consumes Extreme Space</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          A single standard Next.js or React application frequently contains over 40,000 files inside its <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">node_modules</code> folder. In addition to raw byte size, these thousands of small files exhaust filesystem inode allocations and slow down Spotlight indexing.
        </p>

        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900">Find and Delete via Terminal (Without DiskWarren)</h3>
          <CodeBlock 
            code={`# Find all node_modules older than 60 days in ~/Projects\nfind ~/Projects -name "node_modules" -type d -mtime +60 -prune -exec du -sh {} +\n\n# Danger: Raw recursive deletion without Trash recovery\n# find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +`}
            title="Terminal node_modules Search"
          />
        </div>
      </div>
    </div>
  );
}
