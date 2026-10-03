import React from 'react';
import Link from 'next/link';
import { Download, Trash2, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Mac App Uninstaller — Deep Leftover & Cache Sweep | DiskWarren',
  description: 'Uninstall Mac apps completely. Sweep orphaned ~/Library/Application Support, Caches, and Preferences files left behind by deleted applications.',
  alternates: { canonical: '/mac-app-uninstaller' }
};

export default function MacAppUninstallerPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Application Management
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Uninstall Mac Apps &amp; Eliminate Leftovers
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Dragging an application to the Trash only removes the outer <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">.app</code> bundle. Gigabytes of caches, crash logs, autosaves, and container data remain scattered across ~/Library.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/download"
            className="px-7 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-cyan-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Scan App Leftovers Free</span>
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Where macOS Applications Hide Leftover Data</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">~/Library/Application Support</span>
            <p className="text-slate-600">Autosaves, downloaded assets, internal databases, and extension packages.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">~/Library/Caches</span>
            <p className="text-slate-600">Intermediate network caches and compiled UI elements.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">~/Library/Containers</span>
            <p className="text-slate-600">Sandboxed application state directories on modern macOS.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">~/Library/Preferences</span>
            <p className="text-slate-600">Property list (.plist) configuration files.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
