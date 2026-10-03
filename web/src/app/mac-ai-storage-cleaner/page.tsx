import React from 'react';
import Link from 'next/link';
import { Download, CheckCircle2, Brain, Sparkles, Terminal, ArrowRight } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'Mac AI Storage Cleaner — Ollama, LM Studio, Hugging Face & GGUF Models | DiskWarren',
  description: 'The first macOS utility built to track, correlate, and clean local AI model footprints: Ollama SHA blobs, LM Studio checkpoints, Hugging Face Hub symlinks, and ComfyUI models.',
  alternates: { canonical: '/mac-ai-storage-cleaner' }
};

export default function MacAIStorageCleanerPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      {/* Hero */}
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Local AI Workflows
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Where Did 120GB of Mac Storage Go? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600">
            Check Your Local AI Models.
          </span>
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Running local LLMs on Apple Silicon is incredible—until you realize three versions of Llama 3.1, a DeepSeek checkpoint, and two Flux diffusion models just consumed 100GB of your SSD. DiskWarren maps hidden SHA blobs back to human names so you know exactly what to keep.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/download"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-purple-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Scan AI Storage Free</span>
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span>View Pricing ($9.99)</span>
          </Link>
        </div>
      </div>

      {/* Grid of AI Frameworks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-purple-300 transition-all">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
            Ollama Model Blobs (~/.ollama/models)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ollama stores weights as SHA-256 content hashes (e.g. <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">sha256-6a0746d16...</code>) inside hidden subdirectories. When you open Finder, it looks like an unidentifiable 35GB blob. DiskWarren parses the manifest hierarchy to show the real model tag, context length, quantization, and disk footprint.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-purple-300 transition-all">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
            LM Studio GGUF Quantizations
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            It is common to download multiple quantizations of the same model to test speed (e.g. Q4_K_M vs Q6_K vs Q8_0). DiskWarren clusters variants of the same base architecture together, making it simple to keep the fastest one and recycle the redundant 15GB files.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-purple-300 transition-all">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
            Hugging Face Hub Symlink Caches
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Hugging Face caches checkpoints in <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">~/.cache/huggingface/hub</code> using Git LFS pointer symlinks that point into a shared <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">blobs/</code> folder. Deleting a snapshot folder in Finder doesn&apos;t free the disk space—DiskWarren resolves the actual underlying blobs and cleans them cleanly.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-purple-300 transition-all">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
            ComfyUI Checkpoints &amp; LoRAs
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Image generation pipelines hoard massive weights: SDXL, Flux Schnell, Flux Dev checkpoints (12GB – 24GB each), plus dozens of downloaded LoRA adapters. DiskWarren indexes your ComfyUI models directory with last-used timestamps so you can clear dormant experiments.
          </p>
        </div>
      </div>

      {/* Terminal Inspection Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-purple-600" />
          Check Your AI Storage via Terminal
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Curious how much space your local AI tools are holding right now? Paste these into Terminal:
        </p>
        <CodeBlock 
          code={`# Check Ollama storage size
du -sh ~/.ollama/models

# Check Hugging Face hub cache size
du -sh ~/.cache/huggingface/hub

# Check LM Studio downloaded models
du -sh ~/.cache/lm-studio/models 2>/dev/null || du -sh ~/Library/Application\\ Support/LM-Studio/models 2>/dev/null`}
          title="Terminal AI Storage Audit"
        />
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-purple-950 text-white text-center space-y-4 shadow-xl">
        <h3 className="text-2xl font-bold">Take Control of Your AI Storage</h3>
        <p className="text-xs text-slate-300 max-w-lg mx-auto">
          Scan your Mac for free. Correlate Ollama blobs and discover duplicate GGUFs in seconds.
        </p>
        <div className="pt-2 flex justify-center">
          <Link
            href="/download"
            className="px-6 py-3 rounded-xl bg-purple-400 hover:bg-purple-300 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download DiskWarren Free</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
