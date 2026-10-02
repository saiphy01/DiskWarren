import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — DiskWarren',
  description: 'Our zero-telemetry architecture ensures your files and disk paths never leave your Mac.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 font-medium transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to DiskWarren</span>
      </Link>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 sm:p-12 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero-Telemetry Architectural Guarantee</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Privacy Policy</h1>
          <p className="text-xs text-slate-500">Last updated: October 2026</p>
        </div>

        <div className="text-sm space-y-6 text-slate-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Local-Only Filesystem Processing</h2>
            <p>
              DiskWarren was designed from day one on the principle that your storage data is personal and confidential. All scanning, directory traversal, file size calculations, categorization, and duplicate detection happen entirely locally on your Mac’s processor.
            </p>
            <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-900 font-medium text-xs leading-relaxed">
              DiskWarren never uploads, logs, transmits, or mirrors your filenames, file paths, directory structures, or file contents to any remote server or analytics service.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Full Disk Access &amp; macOS Permissions</h2>
            <p>
              DiskWarren requests Full Disk Access strictly to index System Data and application caches protected by macOS Transparency, Consent, and Control (TCC). This permission is used exclusively for on-device read operations and user-directed moves to the Trash.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Network Communication</h2>
            <p>
              The native macOS application initiates network requests only in the following explicit scenarios:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Software Updates:</strong> Checking our static appcast feed for new versions (can be disabled in Settings).</li>
              <li><strong>License Activation:</strong> Validating your purchase key against our offline cryptographic license validation algorithm. Zero telemetry is transmitted.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Website Analytics</h2>
            <p>
              The marketing website (<code className="text-cyan-800 bg-cyan-50 px-1 py-0.5 rounded font-mono text-xs border border-cyan-200/60">diskwarren.com</code>) uses cookieless, aggregated analytics with anonymized IP addresses to measure page visits and conversion rates. We do not use cross-site trackers or behavioral advertising networks.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
