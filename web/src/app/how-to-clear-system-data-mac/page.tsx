import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Download, AlertTriangle, HardDrive } from 'lucide-react';

export const metadata = {
  title: 'How to Clear "System Data" on Mac (macOS Sonoma & Sequoia) — DiskWarren',
  description: 'Learn what macOS System Data actually contains and how to safely reclaim 40+ GB of Time Machine local snapshots, caches, and developer build products.',
  alternates: { canonical: '/how-to-clear-system-data-mac' }
};

export default function ClearSystemDataGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Storage Guides</span>
      </Link>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-medium">macOS Deep Dive</span>
          <span className="text-slate-500">• 6 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
          What is "System Data" on Mac and How Do You Actually Clear It?
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Open System Settings &gt; General &gt; Storage on any Mac used for work, and you will almost certainly see a giant grey bar labeled &quot;System Data&quot; consuming 50 GB to 150 GB. Here is what is actually inside and how to take it back.
        </p>
      </div>

      <div className="prose prose-invert prose-slate text-sm space-y-6 text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">What macOS Bundles Under "System Data"</h2>
          <p>
            Apple’s storage view categorizes known media formats (Photos, Apps, Documents) into color-coded segments. Everything that does not strictly match those standard categories is dumped into <strong>System Data</strong>, including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li><strong>Time Machine Local Snapshots:</strong> APFS delta backups stored locally when your external drive is disconnected.</li>
            <li><strong>Developer Build Artifacts:</strong> Xcode DerivedData, simulator device images, and node_modules trees.</li>
            <li><strong>Local AI Model Weights:</strong> Ollama blobs and LM Studio GGUFs stored inside hidden <code className="text-cyan-300">~/.cache</code> or <code className="text-cyan-300">~/.ollama</code> directories.</li>
            <li><strong>Application Caches & Residual Support Files:</strong> Stored under <code className="text-cyan-300">~/Library/Caches</code> and <code className="text-cyan-300">~/Library/Application Support</code>.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">How DiskWarren Demystifies System Data</h2>
          <p>
            Standard macOS System Settings provides zero insight into which folders make up System Data. DiskWarren traverses the APFS volume directly and breaks down System Data into recognizable, actionable categories:
          </p>
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
            <h4 className="text-sm font-semibold text-white">The DiskWarren Advantage:</h4>
            <p className="text-xs text-slate-300">
              Instead of guessing which mystery folder in ~/Library is safe to touch, DiskWarren’s rule engine identifies safe caches, separates user build products from protected OS files, and lets you move them to the Trash with full restoration confidence.
            </p>
          </div>
        </section>
      </div>

      <div className="p-6 rounded-2xl bg-[#111622] border border-[#20293A] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Clear System Data Safely</h4>
          <p className="text-xs text-slate-400">Download DiskWarren for macOS • 100% Native & Private</p>
        </div>
        <Link 
          href="/#download"
          className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Get Free App</span>
        </Link>
      </div>
    </div>
  );
}
