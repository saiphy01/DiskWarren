import React from 'react';
import Link from 'next/link';
import { Download, CheckCircle2, XCircle } from 'lucide-react';

export const metadata = {
  title: 'DaisyDisk Alternative — Modern Treemap with Developer & AI Intelligence | DiskWarren',
  description: 'Looking for a DaisyDisk alternative? DiskWarren combines high-speed treemap visualization with dedicated developer cleanup, AI model detection, and zero-telemetry privacy.',
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
          While DaisyDisk popularized circular sunburst storage maps, modern Macs need intelligence beyond simple visual rings. DiskWarren was built from scratch for today’s developer and AI workflows.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/download"
            className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-cyan-600/25 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Try DiskWarren for macOS</span>
          </Link>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 overflow-x-auto">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Feature Comparison</h3>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
              <th className="py-3 px-4 font-semibold rounded-l-lg">Capability</th>
              <th className="py-3 px-4 font-semibold text-cyan-800 bg-cyan-50/50">DiskWarren</th>
              <th className="py-3 px-4 font-semibold rounded-r-lg">DaisyDisk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Visual Paradigm</td>
              <td className="py-3.5 px-4 text-cyan-900 font-semibold bg-cyan-50/20">Squarified Treemap (proportional aspect ratios)</td>
              <td className="py-3.5 px-4">Sunburst Radial Rings</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Developer Caches (Xcode, Node, Rust)</td>
              <td className="py-3.5 px-4 text-emerald-700 font-semibold bg-cyan-50/20 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Built-in Rule Engine</td>
              <td className="py-3.5 px-4 text-slate-400 flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5 text-slate-400" /> Manual directory hunting only</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Local AI Storage (Ollama, LM Studio)</td>
              <td className="py-3.5 px-4 text-emerald-700 font-semibold bg-cyan-50/20 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Automatic blob/quant detection</td>
              <td className="py-3.5 px-4 text-slate-400 flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5 text-slate-400" /> None (shows obscure blob hashes)</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Safety Guarantee</td>
              <td className="py-3.5 px-4 text-emerald-700 font-semibold bg-cyan-50/20 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Trash-first with Put Back support</td>
              <td className="py-3.5 px-4">Direct deletion collector</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Pricing Model</td>
              <td className="py-3.5 px-4 text-cyan-900 font-semibold bg-cyan-50/20">$0 Free Scan / $29 Lifetime</td>
              <td className="py-3.5 px-4">Paid only</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
