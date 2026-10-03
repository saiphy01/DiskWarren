import React from 'react';
import Link from 'next/link';
import { Download, Brain, Terminal, CheckCircle2 } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'Hugging Face Cache Cleaner for Mac — Manage ~/.cache/huggingface | DiskWarren',
  description: 'Inspect and clean cached transformer models, snapshots, and weight files in ~/.cache/huggingface on macOS. Safe, fast, and visual.',
  alternates: { canonical: '/huggingface-cache-mac' }
};

export default function HuggingFaceCacheMacPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Machine Learning Caches
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Manage Hugging Face Cache on macOS
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          The <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">transformers</code>, <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">diffusers</code>, and <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">datasets</code> Python packages cache model snapshots in <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">~/.cache/huggingface</code>, frequently consuming 30 GB to 80 GB without warning.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/download"
            className="px-7 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-purple-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Scan Hugging Face Cache</span>
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Understanding the Hugging Face Hub Cache Structure</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Hugging Face uses a content-addressable storage structure with blobs and symlink snapshots. Deleting individual files manually can break existing Python scripts. DiskWarren identifies complete abandoned revisions so they can be recycled safely.
        </p>
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900">Using the Hugging Face CLI Cache Tool</h3>
          <CodeBlock 
            code={`# Inspect and manage Hugging Face cache interactively\nhuggingface-cli delete-cache`}
            title="Hugging Face Cache CLI"
          />
        </div>
      </div>
    </div>
  );
}
