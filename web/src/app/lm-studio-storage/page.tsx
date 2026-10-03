import React from 'react';
import Link from 'next/link';
import { Download, Cpu, CheckCircle2, Terminal } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'LM Studio & GGUF Storage Manager for Mac | DiskWarren',
  description: 'Locate duplicate GGUF quants across your Mac. Inspect LM Studio, llama.cpp, and Hugging Face local model weight directories.',
  alternates: { canonical: '/lm-studio-storage' }
};

export default function LMStudioStoragePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          GGUF Quantization Intelligence
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Manage LM Studio &amp; GGUF Weights on macOS
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          LM Studio downloads quantized GGUF models into <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">~/.cache/lm-studio/models</code>. Over time, multiple quantizations of the same model (e.g. Q4_K_M vs Q8_0) quietly consume over 50 GB.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/download"
            className="px-7 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-purple-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Scan GGUF Models Free</span>
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Locating LM Studio Models on Mac</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          LM Studio defaults to saving models organized by Hugging Face publisher handles. You can check total size via terminal:
        </p>
        <CodeBlock 
          code={`# Check size of LM Studio models\ndu -sh ~/.cache/lm-studio/models 2>/dev/null || du -sh ~/.lmstudio/models 2>/dev/null`}
          title="Inspect LM Studio Storage"
        />
      </div>
    </div>
  );
}
