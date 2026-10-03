import React from 'react';
import Link from 'next/link';
import { Download, Brain, CheckCircle2, Terminal } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'Ollama Storage Manager — Inspect and Delete Model Blobs on Mac | DiskWarren',
  description: 'Understand how Ollama stores model weights in ~/.ollama/models/blobs. Inspect SHA-256 hashes, translate them to human model names, and clean unused quants.',
  alternates: { canonical: '/ollama-storage' }
};

export default function OllamaStoragePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Local LLM Storage
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Manage Ollama Model Storage on macOS
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Ollama stores model weights as raw SHA-256 binary blobs without recognizable file names. DiskWarren translates the JSON manifests in <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">~/.ollama/models</code> into clear model names, parameter counts, and dates.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/download"
            className="px-7 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-purple-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Scan Ollama Models Free</span>
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">How Ollama Organizes Model Layers</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Inside <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">~/.ollama/models/blobs</code>, weights are stored as cryptographically hashed files with names like <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">sha256-a94f83...</code>. A 70B parameter quant takes over 40 GB in a single file. Deleting a model via standard file browsers is impossible without deciphering the manifest files.
        </p>

        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900">Official Ollama CLI Commands</h3>
          <CodeBlock 
            code={`# List all installed local models with sizes\nollama list\n\n# Remove an unused model cleanly\nollama rm llama3:70b`}
            title="Ollama CLI Model Management"
          />
        </div>
      </div>
    </div>
  );
}
