import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, CheckCircle2, Download } from 'lucide-react';

export const metadata = {
  title: 'Release Notes & Changelog — DiskWarren',
  description: 'Version history, updates, and changelogs for the native macOS DiskWarren application.',
  alternates: { canonical: '/release-notes' }
};

export default function ReleaseNotesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-14 space-y-10">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 font-medium transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to DiskWarren</span>
      </Link>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
          <span>Product Updates</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Release Notes
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Track the latest improvements, engine updates, and cleanup rules added to DiskWarren.
        </p>
      </div>

      <div className="space-y-8">
        {/* Version 1.0.0 */}
        <article className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                Official Production Release
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-2">DiskWarren v1.0.0</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">October 2026</span>
          </div>

          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <h3 className="text-sm font-bold text-slate-900">What&apos;s New in v1.0.0:</h3>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span><strong>Multi-Threaded APFS Scanner:</strong> High-speed traversal of internal SSD containers and external APFS volumes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span><strong>Squarified Treemap &amp; Partition Ring:</strong> Interactive visual inspection with golden-ratio block hierarchy and radial slice drilldown.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span><strong>Developer Rule Engine:</strong> Native discovery for Xcode DerivedData, archives, simulator runtimes, Cargo target directories, and orphaned node_modules trees.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span><strong>Local AI Model Intelligence:</strong> Automatic detection for Ollama blob weights (~/.ollama/models), LM Studio GGUF checkpoints, and Hugging Face Hub revisions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span><strong>Safety by Design:</strong> Native macOS Trash recycling with Put Back support, hardcoded protected path blacklists, and three-tier risk guidance.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span><strong>Cryptographic Duplicate Finder:</strong> Multi-stage progressive SHA-256 duplicate detection.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span><strong>Offline Licensing:</strong> Zero-telemetry on-device cryptographic key verification (Ed25519).</span>
              </li>
            </ul>
          </div>

          <div className="pt-2 flex justify-start">
            <Link
              href="/download"
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-all shadow-sm shadow-cyan-600/25 flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download DiskWarren v1.0.0 DMG</span>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
