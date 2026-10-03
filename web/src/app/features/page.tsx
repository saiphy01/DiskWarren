'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Layers, 
  Code2, 
  Copy, 
  HardDrive, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Brain,
  Trash2,
  Cpu
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
          Engineered natively in Swift for Apple Silicon and macOS. DiskWarren moves beyond generic "junk cleaners" to deliver deep intelligence for developer caches, local AI weights, and uninstalled app leftovers.
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
            Crawls your internal SSD with parallel Swift concurrency. DiskWarren understands APFS clone blocks, snapshot overhead, and purgeable disk space to report honest, accurate disk usage.
          </p>
          <div className="pt-2 text-xs font-mono text-cyan-700 bg-cyan-50/50 p-3 rounded-xl border border-cyan-100">
            ✓ Universal binary for Apple Silicon (M1-M4) &amp; Intel Macs
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Interactive Squarified Treemap</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Visualize your entire disk in proportional geometric tiles. Click into any directory to drill down smoothly, discover hidden system data hogs, and inspect file trees in real time.
          </p>
          <div className="pt-2 text-xs font-mono text-blue-700 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
            ✓ Visualizes system partitions, user directories, and external drives
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Code2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Developer Storage Intelligence</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Mac development tools secretly consume tens of gigabytes of hidden disk space. DiskWarren unearths:
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 font-mono bg-slate-50 p-3 rounded-xl border border-slate-100">
            <li>• Xcode DerivedData, Archives &amp; iOS Simulators</li>
            <li>• Docker images, containers &amp; buildx build caches</li>
            <li>• node_modules, npm, pnpm, &amp; Yarn global stores</li>
            <li>• Rust Cargo build targets, Go module cache &amp; Homebrew</li>
          </ul>
        </div>

        {/* Feature 4 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Local AI Model Weight Cleaner</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Running LLMs and diffusion models locally quickly fills modern SSDs. DiskWarren detects and groups models from Ollama, LM Studio, Hugging Face (<code className="text-slate-800 font-mono">~/.cache/huggingface</code>), ComfyUI, and raw GGUF weights.
          </p>
          <div className="pt-2 text-xs font-mono text-purple-700 bg-purple-50/50 p-3 rounded-xl border border-purple-100">
            ✓ Displays model parameters (7B, 13B, 70B), quantizations, and size
          </div>
        </div>

        {/* Feature 5 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Trash2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Native Application Uninstaller</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Dragging an app to the Trash leaves behind gigabytes in <code className="text-slate-800 font-mono">~/Library/Application Support</code>, Caches, and LaunchAgents. DiskWarren maps all associated leftovers for clean, total uninstallation.
          </p>
          <div className="pt-2 text-xs font-mono text-rose-700 bg-rose-50/50 p-3 rounded-xl border border-rose-100">
            ✓ Trashes leftovers safely; restorable via macOS Trash
          </div>
        </div>

        {/* Feature 6 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Copy className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">APFS-Aware Duplicate Finder</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Finds identical files using a 3-step verification (exact byte size $\to$ 4KB header check $\to$ full SHA-256 hash). Differentiates APFS zero-cost copy-on-write clones from real duplicated disk blocks.
          </p>
          <div className="pt-2 text-xs font-mono text-amber-700 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
            ✓ Prevents false space claims on cloned APFS files
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-3xl font-bold">Reclaim Up to 50 GB on Your Mac</h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Scan your Mac in under 30 seconds. Free forever for storage visualization, treemap analysis, and duplicate detection.
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
            View Pricing ($9.99 Lifetime)
          </Link>
        </div>
      </div>
    </div>
  );
}
