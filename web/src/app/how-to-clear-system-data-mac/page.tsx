import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, HardDrive } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'How to Clear "System Data" on Mac (macOS Sonoma & Sequoia) — DiskWarren',
  description: 'Learn what macOS System Data actually contains and how to safely reclaim 40+ GB of Time Machine local snapshots, caches, and developer build products.',
  alternates: { canonical: '/how-to-clear-system-data-mac' }
};

export default function ClearSystemDataGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 font-medium transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Storage Guides</span>
      </Link>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 sm:p-12 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-medium">macOS Deep Dive</span>
            <span className="text-slate-500">• 6 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            What is &quot;System Data&quot; on Mac and How Do You Actually Clear It?
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Open System Settings &gt; General &gt; Storage on any Mac used for work, and you will almost certainly see a giant grey bar labeled &quot;System Data&quot; consuming 50 GB to 150 GB. Here is what is actually inside and how to take it back.
          </p>
        </div>

        <div className="text-sm space-y-6 text-slate-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">What macOS Bundles Under &quot;System Data&quot;</h2>
            <p>
              Apple’s storage view categorizes known media formats (Photos, Apps, Documents) into color-coded segments. Everything that does not strictly match those standard categories is dumped into <strong className="text-slate-900">System Data</strong>, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Time Machine Local Snapshots:</strong> APFS delta backups stored locally when your external drive is disconnected.</li>
              <li><strong>Developer Build Artifacts:</strong> Xcode DerivedData, simulator device images, and node_modules trees.</li>
              <li><strong>Local AI Model Weights:</strong> Ollama blobs and LM Studio GGUFs stored inside hidden <code className="text-cyan-800 bg-cyan-50 px-1 py-0.5 rounded font-mono text-xs border border-cyan-200/60">~/.cache</code> or <code className="text-cyan-800 bg-cyan-50 px-1 py-0.5 rounded font-mono text-xs border border-cyan-200/60">~/.ollama</code> directories.</li>
              <li><strong>Application Caches &amp; Residual Support Files:</strong> Stored under <code className="text-cyan-800 bg-cyan-50 px-1 py-0.5 rounded font-mono text-xs border border-cyan-200/60">~/Library/Caches</code> and <code className="text-cyan-800 bg-cyan-50 px-1 py-0.5 rounded font-mono text-xs border border-cyan-200/60">~/Library/Application Support</code>.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Checking Time Machine Local Snapshots</h2>
            <p>
              You can inspect local APFS snapshots hoarding gigabytes via terminal:
            </p>
            <CodeBlock 
              code="tmutil listlocalsnapshots /" 
              title="List APFS Snapshots" 
            />
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">How DiskWarren Demystifies System Data</h2>
            <p>
              Standard macOS System Settings provides zero insight into which folders make up System Data. DiskWarren traverses the APFS volume directly and breaks down System Data into recognizable, actionable categories:
            </p>
            <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200 space-y-2 text-cyan-950">
              <h4 className="text-sm font-semibold text-slate-900">The DiskWarren Advantage:</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instead of guessing which mystery folder in ~/Library is safe to touch, DiskWarren’s rule engine identifies safe caches, separates user build products from protected OS files, and lets you move them to the Trash with full restoration confidence.
              </p>
            </div>
          </section>
        </div>

        {/* Download Banner */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
              <HardDrive className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Clear System Data Safely</h4>
              <p className="text-xs text-slate-500">Download DiskWarren for macOS • 100% Native &amp; Private</p>
            </div>
          </div>
          <Link 
            href="/download"
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-sm shadow-cyan-600/25 flex items-center gap-1.5 shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Get Free App</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
