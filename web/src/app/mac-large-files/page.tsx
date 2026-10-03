import React from 'react';
import Link from 'next/link';
import { Download, Search, HardDrive, ShieldCheck, CheckCircle2, ArrowRight, Terminal } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'Find Large Files on Mac — Fast In-Memory Discovery | DiskWarren',
  description: 'Locate forgotten virtual machines, DMG installers, local AI weights, and video archives over 500 MB on macOS. Fast, private, and safe.',
  alternates: { canonical: '/mac-large-files' }
};

export default function MacLargeFilesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Storage Discovery
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Find and Review Large Files on Mac
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Over 60% of wasted space on developer and creator Macs is trapped in a handful of massive files: abandoned ISO images, old DMG installers, uncompressed 4K video exports, and dormant model weights.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/download"
            className="px-7 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-cyan-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Find Large Files Free</span>
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Common Large File Culprits on macOS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block text-sm">Virtual Machine Disks (.raw, .qcow2, .vdi)</span>
            <p className="text-slate-600">Old UTM, Parallels, or Docker desktop virtual disk bundles consuming 30 GB to 80 GB each.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block text-sm">Local AI Model Weights (.gguf, .bin, .safetensors)</span>
            <p className="text-slate-600">Quantized LLM weight files and diffusion models often taking 4 GB to 45 GB per checkpoint.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block text-sm">Stale Disk Images (.dmg, .pkg, .iso)</span>
            <p className="text-slate-600">Installers downloaded months ago left lingering inside ~/Downloads or hidden temp folders.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block text-sm">Simulator Device Runtimes</span>
            <p className="text-slate-600">Archived Xcode simulator runtimes (iOS 16, watchOS 9) consuming 10 GB to 15 GB each.</p>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Manual Terminal Search for Large Files</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            You can search your home directory for files larger than 1 GB using the macOS find utility:
          </p>
          <CodeBlock 
            code={`# Find all files larger than 1 GB in your home directory\nfind ~ -type f -size +1G -exec ls -lh {} + 2>/dev/null | awk '{print $5, $9}' | sort -hr`}
            title="Find Files Larger than 1 GB"
          />
        </div>
      </div>
    </div>
  );
}
