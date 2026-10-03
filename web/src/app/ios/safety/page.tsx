'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  RefreshCw, 
  Lock, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight,
  Cpu,
  EyeOff
} from 'lucide-react';

export default function IOSSafetyPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <ShieldCheck className="w-4 h-4 text-purple-600" />
          <span>iOS Safety Architecture</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Safety First on iPhone. 100% Reversible.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          The Apple ecosystem is built on rigorous security principles. 
          DiskWarren strictly adheres to iOS sandboxing, Apple PhotoKit authorizations, and 30-day Recently Deleted protection.
        </p>
      </div>

      {/* Safety Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pillar 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">1. Built-in &ldquo;Recently Deleted&rdquo; Album</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            DiskWarren never permanently erases your photos. Every cleanup moves media to the official Apple Photos <strong>&ldquo;Recently Deleted&rdquo;</strong> album. 
            If you ever change your mind, open Photos &gt; Albums &gt; Recently Deleted to recover your items with a single tap.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">2. Mandatory iOS System Confirmation</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            By design, Apple prohibits any third-party app from deleting media silently. Whenever a cleanup is executed, iOS displays its native system confirmation modal: 
            <em>&ldquo;Allow DiskWarren to delete X items?&rdquo;</em> No media can be moved without your direct biometric or passcode confirmation.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">3. Strict Apple Sandbox Isolation</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            On iOS, each app runs in its own private cryptographic container. DiskWarren has zero access to your messages, passwords, health data, or system files. 
            It operates exclusively on the photos and videos you explicitly allow.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">4. Apple Neural Engine Processing</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Photo similarity analysis and duplicate hashing are calculated locally on your iPhone&apos;s Apple Silicon Neural Engine. 
            DiskWarren requires no internet connection to analyze your photos, ensuring total confidentiality.
          </p>
        </div>
      </div>

      {/* Privacy Nutrition Label */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Zero Cloud Telemetry</span>
          <h3 className="text-2xl sm:text-3xl font-bold">Data Not Collected Guarantee</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            We don&apos;t collect diagnostics, user IDs, or advertising identifiers. DiskWarren does not include third-party marketing SDKs or analytics trackers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Zero Third-Party SDKs</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Works 100% Offline</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>30-Day Recovery in Photos</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-2xl font-bold text-slate-900">Audit Your iPhone Storage Safely</h3>
        <p className="text-sm text-slate-600">Download DiskWarren on the App Store or join the public beta.</p>
        <div>
          <Link
            href="/ios/download"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-md shadow-purple-600/25 transition-all"
          >
            <span>Get DiskWarren for iOS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
