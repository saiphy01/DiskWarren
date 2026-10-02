import React from 'react';
import Link from 'next/link';
import { HardDrive, Download, CheckCircle2, ArrowRight, XCircle } from 'lucide-react';

export const metadata = {
  title: 'DaisyDisk Alternative — Modern Treemap with Developer & AI Intelligence | DiskWarren',
  description: 'Looking for a DaisyDisk alternative? DiskWarren combines high-speed treemap visualization with dedicated developer cleanup, AI model detection, and zero-telemetry privacy.',
  alternates: { canonical: '/daisydisk-alternative' }
};

export default function DaisyDiskAlternativePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-12">
      <div className="space-y-4 text-center">
        <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          Software Comparison
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          A Modern, Intelligent Alternative to DaisyDisk
        </h1>
        <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          While DaisyDisk popularized circular sunburst storage maps, modern Macs need intelligence beyond simple visual rings. DiskWarren was built from scratch for today’s developer and AI workflows.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/#download"
            className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-cyan-400/25"
          >
            <Download className="w-4 h-4" />
            <span>Try DiskWarren for macOS</span>
          </Link>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="p-6 rounded-2xl bg-[#111622] border border-[#20293A] space-y-4 overflow-x-auto">
        <h3 className="text-lg font-bold text-white mb-2">Feature Comparison</h3>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#20293A] text-slate-400">
              <th className="py-3 px-4 font-semibold">Capability</th>
              <th className="py-3 px-4 font-semibold text-cyan-400">DiskWarren</th>
              <th className="py-3 px-4 font-semibold">DaisyDisk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1D2534] text-slate-300">
            <tr>
              <td className="py-3.5 px-4 font-medium text-white">Visual Paradigm</td>
              <td className="py-3.5 px-4 text-cyan-300 font-semibold">Squarified Treemap (proportional aspect ratios)</td>
              <td className="py-3.5 px-4">Sunburst Radial Rings</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-white">Developer Caches (Xcode, Node, Rust)</td>
              <td className="py-3.5 px-4 text-emerald-400 font-semibold flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Built-in Rule Engine</td>
              <td className="py-3.5 px-4 text-slate-500 flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" /> Manual directory hunting only</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-white">Local AI Storage (Ollama, LM Studio)</td>
              <td className="py-3.5 px-4 text-emerald-400 font-semibold flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Automatic blob/quant detection</td>
              <td className="py-3.5 px-4 text-slate-500 flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" /> None (shows obscure blob hashes)</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-white">Safety Guarantee</td>
              <td className="py-3.5 px-4 text-emerald-400 font-semibold flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Trash-first with Put Back support</td>
              <td className="py-3.5 px-4">Direct deletion collector</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-white">Pricing Model</td>
              <td className="py-3.5 px-4 text-cyan-300 font-semibold">$0 Free Scan / $29 Lifetime</td>
              <td className="py-3.5 px-4">Paid only</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
