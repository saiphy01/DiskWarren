import React from 'react';
import Link from 'next/link';
import { Download, Sparkles, Terminal } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'ComfyUI & Stable Diffusion Storage Cleaner for Mac | DiskWarren',
  description: 'Manage massive safetensors checkpoints, LoRA adapters, and VAE models in ComfyUI and Automatic1111 on macOS.',
  alternates: { canonical: '/comfyui-storage' }
};

export default function ComfyUIStoragePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Generative Diffusion Storage
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Manage ComfyUI &amp; Diffusion Storage on Mac
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          SDXL checkpoints, Flux.1 weights, LoRA adapters, and generated output batches easily consume 100+ GB on Apple Silicon Macs. DiskWarren organizes your models directory with instant size visibility.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/download"
            className="px-7 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-purple-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Scan Diffusion Storage Free</span>
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Check ComfyUI Checkpoints &amp; LoRAs</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Diffusion models frequently include duplicate safetensors files copied across different UI tools (Draw Things, ComfyUI, WebUI). You can inspect folder usage via terminal:
        </p>
        <CodeBlock 
          code={`# Find all .safetensors files in your user directory\nfind ~ -name "*.safetensors" -exec du -sh {} + 2>/dev/null | sort -hr | head -n 15`}
          title="Find Safetensors Checkpoints"
        />
      </div>
    </div>
  );
}
