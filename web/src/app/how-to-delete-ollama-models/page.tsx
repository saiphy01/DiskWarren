import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Cpu } from 'lucide-react';

export const metadata = {
  title: 'How to Manage & Delete Ollama Models on Mac — DiskWarren',
  description: 'Step-by-step guide to finding and deleting local Ollama model blobs and freeing up 20–80 GB of SSD space on macOS.',
  alternates: { canonical: '/how-to-delete-ollama-models' }
};

export default function DeleteOllamaModelsGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 font-medium transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Storage Guides</span>
      </Link>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 sm:p-12 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 font-medium">Local AI Guide</span>
            <span className="text-slate-500">• 5 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            How to Manage and Delete Local Ollama Models on Mac
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Running local LLMs with Ollama is seamless, but model weights are huge. A single 70B quant is 40+ GB, and multiple models will rapidly fill even a 1TB SSD. Here is how Ollama organizes storage and how to prune it.
          </p>
        </div>

        <div className="text-sm space-y-6 text-slate-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Where Ollama Stores Model Weights on macOS</h2>
            <p>
              By default on macOS, Ollama stores its manifests and binary layer blobs inside your home directory:
            </p>
            <pre className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-purple-300 font-mono text-xs overflow-x-auto shadow-inner">
              ~/.ollama/models/blobs
            </pre>
            <p>
              Because Ollama splits models into content-addressed SHA-256 blobs (similar to Docker), you cannot simply look inside this folder with Finder and see human-readable model names.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Method 1: Visual Management with DiskWarren</h2>
            <p>
              DiskWarren includes native Ollama intelligence. It parses your local manifests and translates cryptographic blob hashes back into human-readable model tags (e.g. <code className="text-cyan-800 bg-cyan-50 px-1 py-0.5 rounded font-mono text-xs border border-cyan-200/60">llama3.3:70b-instruct-q4_K_M</code>), showing exact sizes, parameter counts, and last accessed dates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Method 2: Command Line CLI</h2>
            <p>
              You can also list and delete models via the Ollama CLI:
            </p>
            <pre className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto shadow-inner">
              ollama list{"\n"}ollama rm &lt;model-name&gt;
            </pre>
          </section>
        </div>

        {/* Download Banner */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
              <Cpu className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Inspect Local AI Storage Visually</h4>
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
