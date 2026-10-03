import React from 'react';
import Link from 'next/link';
import { Download, CheckCircle2, ShieldCheck, Zap, HardDrive, Layers, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'DaisyDisk Alternative — Modern Treemap with Developer & AI Intelligence | DiskWarren',
  description: 'Looking for a modern DaisyDisk alternative? DiskWarren matches the $9.99 one-time price while adding built-in developer cleanup rules, local AI model detection, and Trash-first safety.',
  alternates: { canonical: '/daisydisk-alternative' }
};

export default function DaisyDiskAlternativePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-12">
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Honest Comparison
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          An Intelligent, Developer-First Alternative to DaisyDisk
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          DaisyDisk pioneered visual disk space exploration on the Mac with its iconic sunburst rings. DiskWarren builds on that heritage by pairing visual navigation with domain intelligence for developer tools, local AI model weights, duplicate files, and safe Trash recycling—for the exact same <strong className="text-slate-900">$9.99 one-time price</strong>.
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

      {/* Comparison Table */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 overflow-x-auto">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-slate-900">Head-to-Head Comparison ($9.99 vs $9.99)</h3>
          <span className="text-xs text-slate-500 font-mono">Updated October 2026</span>
        </div>
        
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
              <th className="py-3 px-4 font-semibold rounded-l-lg">Feature</th>
              <th className="py-3 px-4 font-bold text-cyan-800 bg-cyan-50/60">DiskWarren Pro</th>
              <th className="py-3 px-4 font-semibold text-slate-600 rounded-r-lg">DaisyDisk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Price</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20">$9.99 one-time (lifetime)</td>
              <td className="py-3.5 px-4 text-slate-700 font-medium">$9.99 one-time (lifetime)</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Storage Visualizations</td>
              <td className="py-3.5 px-4 text-slate-900 font-semibold bg-cyan-50/20">
                macOS Partition Ring + Squarified Treemap
              </td>
              <td className="py-3.5 px-4">Concentric Sunburst Rings</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Developer Toolchain Caches</td>
              <td className="py-3.5 px-4 text-emerald-700 font-semibold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 
                Built-in rules: Xcode DerivedData, node_modules, Cargo, Docker.raw
              </td>
              <td className="py-3.5 px-4 text-slate-500">
                Shows raw folders only; requires manual navigation and knowledge of what to delete
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Local AI Model Weights</td>
              <td className="py-3.5 px-4 text-emerald-700 font-semibold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 
                Decodes Ollama SHA blobs into human model names (Llama, DeepSeek)
              </td>
              <td className="py-3.5 px-4 text-slate-500">
                Displays unreadable hex blob filenames
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Duplicate Finder</td>
              <td className="py-3.5 px-4 text-emerald-700 font-semibold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 
                Built-in SHA-256 duplicate scanner
              </td>
              <td className="py-3.5 px-4 text-slate-400">None</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">App Leftover Cleaner</td>
              <td className="py-3.5 px-4 text-emerald-700 font-semibold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 
                Finds orphaned ~/Library remnants from deleted apps
              </td>
              <td className="py-3.5 px-4 text-slate-400">None</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Deletion Safety</td>
              <td className="py-3.5 px-4 text-emerald-700 font-semibold bg-cyan-50/20">
                Trash-first routing with Finder &ldquo;Put Back&rdquo; support
              </td>
              <td className="py-3.5 px-4 text-slate-700">Collector drawer with permanent deletion option</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Privacy</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 
                100% On-device, zero telemetry
              </td>
              <td className="py-3.5 px-4 text-slate-700">100% On-device</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Safety by Design Note */}
      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <h3 className="text-xl font-bold text-slate-900">The Power of Domain Knowledge</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          DaisyDisk tells you that a folder is 35GB, but leaves you guessing whether it&apos;s safe to delete. DiskWarren identifies whether that 35GB is an active iOS project cache, an orphaned Node dependency tree, or a temporary Docker layer—and tells you if deleting it will break a project or if it will simply regenerate on your next build.
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
            <span>Download DiskWarren for macOS</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
