import React from 'react';
import Link from 'next/link';
import { Download, CheckCircle2, Zap, Lock, DollarSign, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'CleanMyMac Alternative — No Subscriptions, Native Developer Storage Tool | DiskWarren',
  description: 'Looking for a one-time purchase CleanMyMac alternative? DiskWarren offers a $9.99 lifetime license, zero background daemons, native Swift speed, and developer cache intelligence.',
  alternates: { canonical: '/cleanmymac-alternative' }
};

export default function CleanMyMacAlternativePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      {/* Hero Header */}
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Honest Comparison
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          A Focused, No-Subscription Alternative to CleanMyMac
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          CleanMyMac is a large, all-in-one suite with menu bar helpers and an annual subscription. If you want a lightweight native tool that actually understands developer caches and charges a fair <strong className="text-slate-900">$9.99 one-time price</strong>, here is how DiskWarren compares.
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
          <h3 className="text-base font-bold text-slate-900">No Annual Rent</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            CleanMyMac costs $39.95 every single year (or $89.95 for a one-time license). DiskWarren is $9.99 once for life on your Mac, with zero recurring charges.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Understands Developer Caches</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            CleanMyMac targets user caches and browser history. DiskWarren goes after the real 50GB space hogs: Xcode DerivedData, local AI weights, Docker sparse images, and node_modules.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Zero Background Daemons</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No permanent menu bar icons, no constant disk monitoring services, and no background network connections. DiskWarren only runs when you ask it to.
          </p>
        </div>
      </div>

      {/* Head-to-Head Comparison Table */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 overflow-x-auto">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-slate-900">Feature-by-Feature Breakdown</h3>
          <span className="text-xs text-slate-500 font-mono">Updated October 2026</span>
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
              <th className="py-3 px-4 font-semibold rounded-l-lg">Feature</th>
              <th className="py-3 px-4 font-bold text-cyan-800 bg-cyan-50/60">DiskWarren Pro</th>
              <th className="py-3 px-4 font-semibold text-slate-600 rounded-r-lg">CleanMyMac</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Pricing</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20">$9.99 one-time (lifetime)</td>
              <td className="py-3.5 px-4 text-slate-700">$39.95 / year subscription (or $89.95 one-time)</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Developer Toolchain Cleanup</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Xcode DerivedData, node_modules, Cargo target/, Docker.raw
              </td>
              <td className="py-3.5 px-4 text-slate-500">
                General user caches only; does not index build artifacts
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Local AI Models (Ollama, LM Studio)</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Resolves SHA blobs to human model names &amp; sizes
              </td>
              <td className="py-3.5 px-4 text-slate-500">
                None; treated as unclassified hidden files
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Storage Visualization</td>
              <td className="py-3.5 px-4 text-slate-900 font-semibold bg-cyan-50/20">
                Interactive partition ring &amp; squarified treemap
              </td>
              <td className="py-3.5 px-4">Categorized lists &amp; summary dials</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Duplicate Finder</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Three-stage SHA-256 hash verification
              </td>
              <td className="py-3.5 px-4 text-slate-700">Included in Gemini companion app</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">App Uninstaller &amp; Leftovers</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Finds hidden ~/Library/Application Support traces
              </td>
              <td className="py-3.5 px-4 text-slate-700">Included</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Background Resource Usage</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20">
                Zero daemons, zero menu bar processes
              </td>
              <td className="py-3.5 px-4 text-slate-700">Running menu bar monitor &amp; background service</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Data Privacy</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                100% On-device, zero telemetry
              </td>
              <td className="py-3.5 px-4 text-slate-500">Collects product analytics &amp; activation telemetry</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Safety Section */}
      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Trash-First Safety by Default</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Unlike utilities that run instant raw unlinks, DiskWarren routes all cleaned items to your native macOS Trash. If you ever need a file back, just open Trash and select &ldquo;Put Back.&rdquo; Critical system directories (<code className="text-slate-800 bg-white px-1 py-0.5 rounded font-mono text-xs border border-slate-200">/System</code>, <code className="text-slate-800 bg-white px-1 py-0.5 rounded font-mono text-xs border border-slate-200">/usr</code>, <code className="text-slate-800 bg-white px-1 py-0.5 rounded font-mono text-xs border border-slate-200">/bin</code>) are hardcoded as protected and cannot be selected.
        </p>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-cyan-950 text-white text-center space-y-4 shadow-xl">
        <h3 className="text-2xl font-bold">Try DiskWarren Free on Your Mac</h3>
        <p className="text-xs text-slate-300 max-w-lg mx-auto">
          Scan and inspect your entire storage footprint for free. Upgrade to Pro Lifetime for $9.99 whenever you want automated one-click cleanup.
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
