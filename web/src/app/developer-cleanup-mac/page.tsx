import React from 'react';
import Link from 'next/link';
import { Download, Hammer, CheckCircle2, Terminal, FolderTree, Code2 } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'Developer Storage Cleanup for Mac — Xcode, Node, Cargo & Docker | DiskWarren',
  description: 'The native Mac storage cleaner built for software engineers. Safely reclaim 40+ GB of Xcode DerivedData, stale node_modules, Rust targets, and Docker caches.',
  alternates: { canonical: '/developer-cleanup-mac' }
};

export default function DeveloperCleanupMacPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Developer Workflows
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Developer Storage Cleanup for macOS
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Standard disk utilities ignore the folders that actually consume engineer storage. DiskWarren targets Xcode DerivedData, dormant node_modules trees, Cargo debug targets, and Docker container caches.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/download"
            className="px-7 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-cyan-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Scan Developer Storage Free</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Hammer className="w-5 h-5 text-cyan-600" />
            Xcode Ecosystem
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            DerivedData, module caches, build logs, and simulator runtimes accumulate silently until compiling becomes sluggish. DiskWarren categorizes each project cache independently.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
            <li>• ~/Library/Developer/Xcode/DerivedData</li>
            <li>• ~/Library/Developer/Xcode/Archives</li>
            <li>• ~/Library/Developer/CoreSimulator/Devices</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-emerald-600" />
            Node &amp; JavaScript Workspaces
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dormant client repositories and abandoned prototypes retain heavy <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">node_modules</code> folders. DiskWarren reveals orphaned dependency trees across your home directory.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
            <li>• Dormant node_modules across ~/Projects</li>
            <li>• Global npm and Yarn cache directories</li>
            <li>• pnpm virtual stores and hard link maps</li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-600" />
          Terminal One-Liners for Developers
        </h3>
        <CodeBlock 
          code={`# Measure total DerivedData size\ndu -sh ~/Library/Developer/Xcode/DerivedData\n\n# Count all node_modules folders in Projects\nfind ~/Projects -name "node_modules" -type d -prune | wc -l`}
          title="Developer Storage Inspection"
        />
      </div>
    </div>
  );
}
