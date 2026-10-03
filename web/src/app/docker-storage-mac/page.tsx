import React from 'react';
import Link from 'next/link';
import { Download, Container, CheckCircle2, Terminal } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'Docker Storage Cleaner for Mac — Reclaim Docker.raw Space | DiskWarren',
  description: 'Understand and reclaim space consumed by Docker Desktop on macOS. Inspect dangling images, build caches, and virtual disk allocations.',
  alternates: { canonical: '/docker-storage-mac' }
};

export default function DockerStorageMacPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Container Intelligence
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Manage Docker Storage on macOS
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Docker Desktop on Mac stores containers and images inside a massive virtual disk file (<code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">Docker.raw</code>) that frequently balloons to 64 GB+ and rarely shrinks automatically.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/download"
            className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-blue-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Scan Mac Storage Free</span>
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Why Docker.raw Keeps Growing</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          On macOS, Docker runs inside a lightweight Linux virtual machine managed by HyperKit or Apple Virtualization framework. Deleted containers and images free blocks inside the virtual filesystem, but the outer macOS APFS file (<code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">Docker.raw</code>) does not automatically release sparse blocks back to APFS without explicit trimming.
        </p>

        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900">Official Docker CLI Prune Commands</h3>
          <CodeBlock 
            code={`# Remove dangling images, stopped containers, and build cache\ndocker system prune -a --volumes\n\n# Inspect exact Docker disk footprint\ndocker system df`}
            title="Docker Disk Pruning"
          />
        </div>
      </div>
    </div>
  );
}
