import React from 'react';
import Link from 'next/link';
import { Cpu, Download, CheckCircle2, ShieldCheck, Database, HardDrive } from 'lucide-react';

export const metadata = {
  title: 'Mac AI Storage Cleaner — Ollama, LM Studio & GGUF Model Management | DiskWarren',
  description: 'The first macOS utility built to track and manage local AI model footprints: Ollama model blobs, LM Studio checkpoints, Hugging Face Hub, and ComfyUI.',
  alternates: { canonical: '/mac-ai-storage-cleaner' }
};

export default function MacAIStorageCleanerPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-12">
      <div className="space-y-4 text-center">
        <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-wider">
          Local AI Footprint
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Manage Gigabytes of Local AI Models on macOS
        </h1>
        <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Running 7B, 13B, and 70B models eats high-speed Mac SSD space fast. DiskWarren automatically uncovers Ollama blobs, LM Studio GGUFs, Hugging Face snapshots, and ComfyUI checkpoints.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/#download"
            className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-purple-500/25"
          >
            <Download className="w-4 h-4" />
            <span>Download AI Storage Cleaner</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {[
          {
            title: "Ollama Models (~/.ollama/models)",
            desc: "Ollama stores model weights as SHA-256 binary blobs without recognizable names. DiskWarren parses the manifest index to show exact model names, sizes, and last modified dates."
          },
          {
            title: "LM Studio & GGUF Weight Files",
            desc: "Locate quantized GGUF weights, verify their binary headers, and identify duplicate quantizations (e.g. Q4_K_M vs Q8_0) consuming redundant space."
          },
          {
            title: "Hugging Face Hub Snapshots",
            desc: "Hugging Face caches full model revisions in ~/.cache/huggingface/hub. Identify unused transformer weights and safely reclaim space."
          },
          {
            title: "ComfyUI Checkpoints & LoRAs",
            desc: "Diffusion models and LoRA adapters take up massive space. DiskWarren indexes your models folder to give you complete visibility."
          }
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-xl bg-[#111622] border border-[#20293A] space-y-2.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              {item.title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
