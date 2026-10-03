import React from 'react';
import Link from 'next/link';
import { Download, CheckCircle2, XCircle, ShieldCheck, Zap, Lock, DollarSign } from 'lucide-react';

export const metadata = {
  title: 'CleanMyMac Alternative — No Subscriptions, Zero Background Bloat | DiskWarren',
  description: 'Tired of CleanMyMac’s $39.95/year subscription and heavy background daemons? Switch to DiskWarren: $9.99 one-time lifetime, 100% native Swift, and zero telemetry.',
  alternates: { canonical: '/cleanmymac-alternative' }
};

export default function CleanMyMacAlternativePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      {/* Hero Header */}
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Honest Software Comparison
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          A Lightweight, No-Subscription Alternative to CleanMyMac
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Why pay $39.95 every single year for a disk cleaner that runs heavy background daemons and sends telemetry? 
          DiskWarren gives you native Swift speed, developer intelligence, and 100% offline privacy for a single <strong className="text-slate-900">$9.99 lifetime payment</strong>.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/download"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-cyan-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Try Free Disk Scanner</span>
          </Link>

          <Link
            href="/pricing"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Get Pro Lifetime ($9.99)</span>
          </Link>
        </div>
      </div>

      {/* 3 Core Pillars Why Users Switch */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Pay $9.99 Once, Not $39.95/Year</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            CleanMyMac traps you in an ongoing annual subscription ($39.95/yr) or charges $89.95 for a one-time license. DiskWarren is just $9.99 forever.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Zero Background Daemons</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            CleanMyMac installs persistent background helpers eating 300MB–500MB of RAM and battery. DiskWarren runs strictly on-demand with 0 background daemons.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">100% Local &amp; Private</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            CleanMyMac collects cloud telemetry and requires user account management. DiskWarren operates on a zero-knowledge architecture with zero analytics beacons.
          </p>
        </div>
      </div>

      {/* Head-to-Head Comparison Matrix Table */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 overflow-x-auto">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-slate-900">Head-to-Head Feature Comparison</h3>
          <span className="text-xs text-slate-500 font-mono">Updated October 2026</span>
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
              <th className="py-3 px-4 font-semibold rounded-l-lg">Feature / Capability</th>
              <th className="py-3 px-4 font-bold text-cyan-800 bg-cyan-50/60">DiskWarren Pro</th>
              <th className="py-3 px-4 font-semibold text-slate-600 rounded-r-lg">CleanMyMac X</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Pricing Model</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20">$9.99 One-Time Lifetime</td>
              <td className="py-3.5 px-4 text-red-600 font-medium">$39.95 / year subscription (or $89.95 one-time)</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Background Resource Usage</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                0 background daemons (0% RAM when closed)
              </td>
              <td className="py-3.5 px-4 text-red-600 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-red-500" />
                Heavy 24/7 background monitor (~400 MB RAM)
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Developer Storage Intelligence</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Native Xcode, node_modules, Cargo &amp; Docker
              </td>
              <td className="py-3.5 px-4 text-slate-400 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-slate-400" />
                None (ignores developer directories)
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Local AI Models (Ollama, LM Studio)</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Ollama blobs, GGUF weights, Hugging Face
              </td>
              <td className="py-3.5 px-4 text-slate-400 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-slate-400" />
                None (categorizes AI weights as mystery data)
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Visual Storage Paradigms</td>
              <td className="py-3.5 px-4 text-slate-800 font-medium bg-cyan-50/20">
                macOS Partition Ring (Pie) + Squarified Treemap
              </td>
              <td className="py-3.5 px-4">Circular bubbles / list view only</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Privacy &amp; Telemetry</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                100% Local, zero analytics, air-gapped
              </td>
              <td className="py-3.5 px-4 text-slate-500">Cloud analytics, device telemetry, account login</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-medium text-slate-900">Deletion Safety</td>
              <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Trash-First with native Put Back restoration
              </td>
              <td className="py-3.5 px-4">Direct unlinking collector</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-cyan-950 text-white text-center space-y-4 shadow-xl">
        <h3 className="text-2xl font-bold">Ready to replace CleanMyMac?</h3>
        <p className="text-xs text-slate-300 max-w-lg mx-auto">
          Download DiskWarren for free, inspect your drive, and upgrade to Pro Lifetime for just $9.99 with a 30-day money-back guarantee.
        </p>
        <div className="pt-2 flex justify-center">
          <Link
            href="/download"
            className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download DiskWarren Universal DMG</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
