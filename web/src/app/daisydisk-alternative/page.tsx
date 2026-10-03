import React from 'react';
import Link from 'next/link';
import { Download, CheckCircle2, ShieldCheck, Zap, HardDrive, Layers } from 'lucide-react';

export const metadata = {
  title: 'DaisyDisk Alternative — Modern Treemap with Developer & AI Intelligence | DiskWarren',
  description: 'Looking for a modern DaisyDisk alternative? DiskWarren matches the $9.99 perpetual price while adding dedicated developer cleanup rules, local AI model detection, and Trash-first safety.',
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
          An Intelligent, Developer-First Alternative to DaisyDisk
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          DaisyDisk pioneered radial sunburst storage visualization. DiskWarren builds upon visual disk exploration by introducing squarified treemaps, dedicated developer rule sets, local AI model detection, and native Trash safety for the exact same <strong className="text-slate-900">$9.99 one-time price point</strong>.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/download"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-cyan-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Scan Your Mac Free</span>
          </Link>

          <Link
            href="/pricing"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span>View Pro Pricing ($9.99)</span>
          </Link>
        </div>
      </div>

      {/* Comparison Table (Prompt #9) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 overflow-x-auto">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-slate-900">Factual Feature Comparison ($9.99 vs $9.99)</h3>
          <span className="text-xs text-slate-500 font-mono">Updated October 2026</span>
        </div>
        
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
              <th className="py-3 px-4 font-semibold rounded-l-lg">Category</th>
              <th className="py-3 px-4 font-bold text-cyan-800 bg-cyan-50/60">DiskWarren Pro</th>
              <th className="py-3 px-4 font-semibold text-slate-600 rounded-r-lg">DaisyDisk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Storage Visualization</td>
              <td className="py-3.5 px-4 text-slate-900 font-semibold bg-cyan-50/20">
                macOS Partition Ring (Pie) + Squarified Treemap
              </td>
              <td className="py-3.5 px-4">Radial Sunburst Rings</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Developer Cleanup</td>
              <td className="py-3.5 px-4 text-emerald-700 font-semibold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 
                Built-in Rule Engine (DerivedData, node_modules, Cargo)
              </td>
              <td className="py-3.5 px-4 text-slate-500">
                Manual directory navigation
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">AI-Model Detection</td>
              <td className="py-3.5 px-4 text-emerald-700 font-semibold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 
                Automatic Ollama, LM Studio &amp; GGUF detection
              </td>
              <td className="py-3.5 px-4 text-slate-500">
                Manual directory navigation
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Duplicate Finder</td>
              <td className="py-3.5 px-4 text-emerald-700 font-semibold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 
                Cryptographic SHA-256 Duplicate Finder
              </td>
              <td className="py-3.5 px-4 text-slate-400">None</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">App Leftovers</td>
              <td className="py-3.5 px-4 text-emerald-700 font-semibold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 
                Sweeps orphaned ~/Library application data
              </td>
              <td className="py-3.5 px-4 text-slate-400">None</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Pricing Model</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20">$9.99 One-Time Lifetime</td>
              <td className="py-3.5 px-4 text-slate-700 font-medium">$9.99 One-Time Lifetime</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Native macOS</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20">Native Swift &amp; SwiftUI (Universal 2)</td>
              <td className="py-3.5 px-4 text-slate-700 font-medium">Native macOS application</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Privacy Approach</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 
                100% Local processing, zero telemetry
              </td>
              <td className="py-3.5 px-4 text-slate-700 font-medium">Local processing</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Safety by Design Note */}
      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <h3 className="text-xl font-bold text-slate-900">Safety by Design</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Both DiskWarren and DaisyDisk support visual exploration, but DiskWarren incorporates Trash-first routing by default with Finder &quot;Put Back&quot; reversibility and permanent system directory protections for <code className="text-slate-800 bg-white px-1 py-0.5 rounded font-mono text-xs border border-slate-200">/System</code> and <code className="text-slate-800 bg-white px-1 py-0.5 rounded font-mono text-xs border border-slate-200">/usr</code>.
        </p>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-cyan-950 text-white text-center space-y-4 shadow-xl">
        <h3 className="text-2xl font-bold">Discover Where Your Space Went</h3>
        <p className="text-xs text-slate-300 max-w-lg mx-auto">
          Download DiskWarren for free to explore your drive. Upgrade to Pro Lifetime for $9.99 with a 30-day money-back guarantee.
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
