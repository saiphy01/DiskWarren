import React from 'react';
import Link from 'next/link';
import { Download, CheckCircle2, ShieldCheck, Zap, Lock, DollarSign } from 'lucide-react';

export const metadata = {
  title: 'CleanMyMac Alternative — No Subscriptions, Lightweight Mac Storage Intelligence | DiskWarren',
  description: 'Looking for a one-time purchase CleanMyMac alternative? DiskWarren offers a $9.99 perpetual license, native Swift speed, developer storage intelligence, and 100% local privacy.',
  alternates: { canonical: '/cleanmymac-alternative' }
};

export default function CleanMyMacAlternativePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      {/* Hero Header */}
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Software Comparison
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          A Focused, No-Subscription Alternative to CleanMyMac
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          If you prefer single-purpose utilities without ongoing subscription commitments, DiskWarren provides dedicated macOS storage intelligence, developer-first cleanup, and complete offline privacy for a single <strong className="text-slate-900">$9.99 lifetime purchase</strong>.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/download"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-cyan-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Scan Your Mac Free</span>
          </Link>

          <Link
            href="/pricing"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <span>View Pro Pricing ($9.99)</span>
          </Link>
        </div>
      </div>

      {/* 3 Core Pillars Why Users Choose DiskWarren */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Perpetual Pricing Model</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            CleanMyMac offers an annual subscription ($39.95/yr) or a higher one-time tier ($89.95). DiskWarren is $9.99 for a perpetual single-Mac license with zero recurring costs.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Developer &amp; AI Intelligence</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            DiskWarren targets modern workstation workloads: Xcode DerivedData, local AI model weights (Ollama, LM Studio), Cargo targets, and orphaned node_modules.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">100% Local Architecture</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            DiskWarren indexes storage completely on-device. No filenames, folder structures, or disk usage data are ever sent over the network.
          </p>
        </div>
      </div>

      {/* Head-to-Head 8-Point Factual Comparison Table (Prompt #9) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 overflow-x-auto">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-slate-900">Factual Feature Comparison</h3>
          <span className="text-xs text-slate-500 font-mono">Updated October 2026</span>
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
              <th className="py-3 px-4 font-semibold rounded-l-lg">Category</th>
              <th className="py-3 px-4 font-bold text-cyan-800 bg-cyan-50/60">DiskWarren Pro</th>
              <th className="py-3 px-4 font-semibold text-slate-600 rounded-r-lg">CleanMyMac</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Storage Visualization</td>
              <td className="py-3.5 px-4 text-slate-900 font-semibold bg-cyan-50/20">
                macOS Partition Ring (Pie) + Squarified Treemap
              </td>
              <td className="py-3.5 px-4">Categories &amp; List views</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Developer Cleanup</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Native Xcode, node_modules, Cargo &amp; Docker
              </td>
              <td className="py-3.5 px-4 text-slate-500">
                See vendor documentation
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">AI-Model Detection</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Ollama blobs, GGUF weights, Hugging Face
              </td>
              <td className="py-3.5 px-4 text-slate-500">
                See vendor documentation
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Duplicate Finder</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Cryptographic SHA-256
              </td>
              <td className="py-3.5 px-4 text-slate-700">Included</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">App Leftovers</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Sweeps orphaned ~/Library caches &amp; support files
              </td>
              <td className="py-3.5 px-4 text-slate-700">Included (App Uninstaller)</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Pricing Model</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20">$9.99 One-Time Lifetime</td>
              <td className="py-3.5 px-4 text-slate-700">$39.95 / year subscription (or $89.95 one-time)</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Native macOS</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20">Native Swift &amp; SwiftUI (Universal 2)</td>
              <td className="py-3.5 px-4 text-slate-700">Native macOS application</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Privacy Approach</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                100% Local processing, zero telemetry
              </td>
              <td className="py-3.5 px-4 text-slate-500">See vendor documentation</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Safety Section */}
      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Designed to Prevent Accidental Deletions</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          DiskWarren routes cleaned files through the native macOS Trash where supported, allowing you to restore items with Finder&apos;s &quot;Put Back&quot; command. Critical system folders (<code className="text-slate-800 bg-white px-1 py-0.5 rounded font-mono text-xs border border-slate-200">/System</code>, <code className="text-slate-800 bg-white px-1 py-0.5 rounded font-mono text-xs border border-slate-200">/usr</code>, <code className="text-slate-800 bg-white px-1 py-0.5 rounded font-mono text-xs border border-slate-200">/bin</code>) are guarded by hardcoded safety barriers.
        </p>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-cyan-950 text-white text-center space-y-4 shadow-xl">
        <h3 className="text-2xl font-bold">Try DiskWarren Free on Your Mac</h3>
        <p className="text-xs text-slate-300 max-w-lg mx-auto">
          Download DiskWarren to analyze your storage for free. Upgrade to Pro Lifetime for $9.99 with an unconditional 30-day money-back guarantee.
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
