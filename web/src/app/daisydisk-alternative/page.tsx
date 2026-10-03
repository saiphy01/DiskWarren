import React from 'react';
import Link from 'next/link';
import { Download, CheckCircle2, XCircle, ShieldCheck, Zap } from 'lucide-react';

export const metadata = {
  title: 'DaisyDisk Alternative — Modern Treemap with Developer & AI Intelligence | DiskWarren',
  description: 'Looking for a DaisyDisk alternative? DiskWarren matches DaisyDisk’s $9.99 price while adding dedicated developer cleanup, local AI model detection, and zero-telemetry privacy.',
  alternates: { canonical: '/daisydisk-alternative' }
};

export default function DaisyDiskAlternativePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-12">
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Software Comparison
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          A Modern, Intelligent Alternative to DaisyDisk
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          While DaisyDisk popularized radial sunburst rings, modern Macs need intelligence beyond simple geometry. 
          DiskWarren matches DaisyDisk&apos;s <strong className="text-slate-900">$9.99 price point</strong> while adding dedicated developer cleanup, local AI model detection, and native Trash safety.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/download"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-cyan-600/25 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Try Free Disk Scanner</span>
          </Link>

          <Link
            href="/pricing"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Get Pro Lifetime ($9.99)</span>
          </Link>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 overflow-x-auto">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Feature Comparison ($9.99 vs $9.99)</h3>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
              <th className="py-3 px-4 font-semibold rounded-l-lg">Capability</th>
              <th className="py-3 px-4 font-bold text-cyan-800 bg-cyan-50/60">DiskWarren Pro</th>
              <th className="py-3 px-4 font-semibold text-slate-600 rounded-r-lg">DaisyDisk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Pricing Model</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20">$9.99 One-Time Lifetime</td>
              <td className="py-3.5 px-4 text-slate-700 font-medium">$9.99 One-Time</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Visual Paradigms</td>
              <td className="py-3.5 px-4 text-slate-900 font-semibold bg-cyan-50/20">
                macOS Partition Ring (Pie) + Squarified Treemap
              </td>
              <td className="py-3.5 px-4">Radial Sunburst Rings only</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Developer Caches (Xcode, Node, Rust)</td>
              <td className="py-3.5 px-4 text-emerald-700 font-semibold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 
                Built-in Rule Engine (DerivedData, node_modules)
              </td>
              <td className="py-3.5 px-4 text-slate-400 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-slate-400" /> 
                Manual directory hunting only
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Local AI Storage (Ollama, LM Studio)</td>
              <td className="py-3.5 px-4 text-emerald-700 font-semibold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 
                Automatic GGUF &amp; blob weight detection
              </td>
              <td className="py-3.5 px-4 text-slate-400 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-slate-400" /> 
                None (shows obscure SHA hashes)
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Deep Application Uninstaller</td>
              <td className="py-3.5 px-4 text-emerald-700 font-semibold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 
                Sweeps orphaned ~/Library leftovers
              </td>
              <td className="py-3.5 px-4 text-slate-400 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-slate-400" /> 
                None
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Duplicate File Eliminator</td>
              <td className="py-3.5 px-4 text-emerald-700 font-semibold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 
                Block-level SHA-256 Duplicate Finder
              </td>
              <td className="py-3.5 px-4 text-slate-400 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-slate-400" /> 
                None
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Safety Guarantee</td>
              <td className="py-3.5 px-4 text-emerald-700 font-semibold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 
                Trash-First with native Put Back support
              </td>
              <td className="py-3.5 px-4">Direct deletion collector</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
