import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — DiskWarren',
  description: 'Our zero-telemetry architecture ensures your files and disk paths never leave your Mac.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to DiskWarren</span>
      </Link>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
          <Lock className="w-3.5 h-3.5" />
          <span>Zero-Telemetry Architectural Guarantee</span>
        </div>
        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: October 2026</p>
      </div>

      <div className="prose prose-invert prose-slate text-sm space-y-6 text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">1. Local-Only Filesystem Processing</h2>
          <p>
            DiskWarren was designed from day one on the principle that your storage data is personal and confidential. All scanning, directory traversal, file size calculations, categorization, and duplicate detection happen entirely locally on your Mac’s processor.
          </p>
          <p className="font-semibold text-cyan-300">
            DiskWarren never uploads, logs, transmits, or mirrors your filenames, file paths, directory structures, or file contents to any remote server or analytics service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">2. Full Disk Access & macOS Permissions</h2>
          <p>
            DiskWarren requests Full Disk Access strictly to index System Data and application caches protected by macOS Transparency, Consent, and Control (TCC). This permission is used exclusively for on-device read operations and user-directed moves to the Trash.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">3. Network Communication</h2>
          <p>
            The native macOS application initiates network requests only in the following explicit scenarios:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li><strong>Software Updates:</strong> Checking our static appcast feed for new versions (can be disabled in Settings).</li>
            <li><strong>License Activation:</strong> Validating your purchase key against our license endpoint once upon activation. Offline operation is supported thereafter.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">4. Website Analytics</h2>
          <p>
            The marketing website (<code className="text-cyan-400">diskwarren.com</code>) uses cookieless, aggregated analytics with anonymized IP addresses to measure page visits and conversion rates. We do not use cross-site trackers or behavioral advertising networks.
          </p>
        </section>
      </div>
    </div>
  );
}
