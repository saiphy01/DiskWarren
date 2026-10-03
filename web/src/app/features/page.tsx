'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Layers, 
  Code2, 
  Copy, 
  Sparkles, 
  ArrowRight,
  Brain,
  Trash2,
  Cpu,
  Download
} from 'lucide-react';

export default function MacFeaturesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-4 h-4 text-cyan-600" />
          <span>Macintosh HD Capabilities &amp; Architecture</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Native Mac Storage Intelligence
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Written in native Swift for Apple Silicon and modern Intel Macs. DiskWarren cuts through vague &ldquo;System Data&rdquo; warnings to deliver exact visibility into build caches, local AI weights, container storage, and uninstalled application remnants.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Feature 1 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">High-Speed APFS Storage Scanner</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Crawls your internal SSD using parallel Swift concurrency. DiskWarren understands APFS copy-on-write clone blocks, local Time Machine snapshot reservations, and purgeable disk space to report true, actionable free space.
          </p>
          <div className="pt-2 text-xs font-mono text-cyan-700 bg-cyan-50/50 p-3 rounded-xl border border-cyan-100">
            ✓ Universal 2 binary for Apple Silicon (M1–M4) and Intel Macs
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Interactive Squarified Treemap</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            See your filesystem as physical space. Proportional geometric tiles let you instantly spot runaway log files, multi-gigabyte build artifacts, and deep folder trees without clicking through endless Finder lists.
          </p>
          <div className="pt-2 text-xs font-mono text-blue-700 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
            ✓ Visualizes system volumes, user directories, and external drives
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Code2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Developer Toolchain Intelligence</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Software development tools quietly hoard tens of gigabytes across your home directory. DiskWarren uncovers:
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 font-mono bg-slate-50 p-3 rounded-xl border border-slate-100">
            <li>• Xcode DerivedData, Archives &amp; old iOS simulator runtimes</li>
            <li>• Docker images, stopped containers &amp; BuildKit layer stores</li>
            <li>• node_modules trees, global npm/yarn/pnpm package caches</li>
            <li>• Rust Cargo target/ folders, Go module caches &amp; Homebrew bottles</li>
          </ul>
        </div>

        {/* Feature 4 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Local AI Model Weight Cleaner</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Running LLMs and diffusion models locally quickly fills high-speed SSDs. DiskWarren detects and correlates model weights from Ollama, LM Studio, Hugging Face (<code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">~/.cache/huggingface</code>), ComfyUI, and raw GGUF files.
          </p>
          <div className="pt-2 text-xs font-mono text-purple-700 bg-purple-50/50 p-3 rounded-xl border border-purple-100">
            ✓ Maps cryptic SHA hashes to human model tags (7B, 13B, 70B) &amp; quantizations
          </div>
        </div>

        {/* Feature 5 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Trash2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Application Leftover Uninstaller</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Dragging an app icon to the Trash leaves behind gigabytes in <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">~/Library/Application Support</code>, Caches, Preferences, and background LaunchAgents. DiskWarren traces all orphaned remnants for complete removal.
          </p>
          <div className="pt-2 text-xs font-mono text-rose-700 bg-rose-50/50 p-3 rounded-xl border border-rose-100">
            ✓ Trashes leftovers safely with Finder &ldquo;Put Back&rdquo; reversibility
          </div>
        </div>

        {/* Feature 6 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Copy className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">APFS-Aware Duplicate Finder</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Finds true redundant files using three progressive verification gates: exact byte size &rarr; initial chunk hash &rarr; full SHA-256 confirmation. Differentiates zero-cost APFS copy-on-write clones from real duplicated disk blocks.
          </p>
          <div className="pt-2 text-xs font-mono text-amber-700 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
            ✓ Prevents false space claims on cloned APFS files
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-3xl font-bold">Take Back 40+ GB on Your Mac Today</h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Scan your drive in under 30 seconds. Free forever for storage visualization, treemap analysis, and developer cache inspection.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/download"
            className="px-6 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-lg shadow-cyan-600/30 transition-all cursor-pointer"
          >
            Download Free Universal DMG
          </Link>
          <Link
            href="/pricing"
            className="px-6 py-3.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-bold text-sm transition-all"
          >
            View Pro Pricing ($9.99 Lifetime)
          </Link>
        </div>
      </div>
    </div>
  );
}
