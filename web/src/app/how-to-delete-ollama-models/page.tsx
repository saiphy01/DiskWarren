import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Download, AlertTriangle, Cpu } from 'lucide-react';

export const metadata = {
  title: 'How to Manage & Delete Ollama Models on Mac — DiskWarren',
  description: 'Step-by-step guide to finding and deleting local Ollama model blobs and freeing up 20–80 GB of SSD space on macOS.',
  alternates: { canonical: '/how-to-delete-ollama-models' }
};

export default function DeleteOllamaModelsGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Storage Guides</span>
      </Link>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-400 font-medium">Local AI Guide</span>
          <span className="text-slate-500">• 5 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
          How to Manage and Delete Local Ollama Models on Mac
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Running local LLMs with Ollama is seamless, but model weights are huge. A single 70B quant is 40+ GB, and multiple models will rapidly fill even a 1TB SSD. Here is how Ollama organizes storage and how to prune it.
        </p>
      </div>

      <div className="prose prose-invert prose-slate text-sm space-y-6 text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Where Ollama Stores Model Weights on macOS</h2>
          <p>
            By default on macOS, Ollama stores its manifests and binary layer blobs inside your home directory:
          </p>
          <pre className="p-3.5 rounded-lg bg-[#141A25] border border-[#232C3D] text-purple-300 font-mono text-xs overflow-x-auto">
            ~/.ollama/models/blobs
          </pre>
          <p>
            Because Ollama splits models into content-addressed SHA-256 blobs (similar to Docker), you cannot simply look inside this folder with Finder and see human-readable model names.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Method 1: Visual Management with DiskWarren</h2>
          <p>
            DiskWarren includes native Ollama intelligence. It parses your local manifests and translates cryptographic blob hashes back into human-readable model tags (e.g. <code className="text-cyan-300">llama3.3:70b-instruct-q4_K_M</code>), showing exact sizes, parameter counts, and last accessed dates.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Method 2: Command Line CLI</h2>
          <p>
            You can also list and delete models via the Ollama CLI:
          </p>
          <pre className="p-3.5 rounded-lg bg-[#141A25] border border-[#232C3D] text-slate-200 font-mono text-xs overflow-x-auto">
            ollama list{"\n"}ollama rm &lt;model-name&gt;
          </pre>
        </section>
      </div>

      <div className="p-6 rounded-2xl bg-[#111622] border border-[#20293A] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Inspect Local AI Storage Visually</h4>
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
