import React from 'react';
import Link from 'next/link';
import { Download, Hammer, CheckCircle2, Terminal, FolderTree, Code2, Container, ArrowRight } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'Developer Storage Cleanup for Mac — Xcode, Node, Cargo, Python & Docker | DiskWarren',
  description: 'The native Mac storage tool built for software engineers. Safely reclaim 50+ GB of Xcode DerivedData, stale node_modules, Rust target folders, Python wheels, and Docker sparse disks.',
  alternates: { canonical: '/developer-cleanup-mac' }
};

export default function DeveloperCleanupMacPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      {/* Hero */}
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Developer Workflows
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Mac Storage Cleanup for Software Engineers
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Standard consumer disk cleaners look for Safari cookies and trash bins. Real developer workstations run out of disk because our build tools, compilers, package managers, and container daemons silently hoard gigabytes of unindexed artifacts.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/download"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-cyan-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Scan Developer Storage Free</span>
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span>Pro Lifetime ($9.99)</span>
          </Link>
        </div>
      </div>

      {/* Toolchain Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Xcode */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Hammer className="w-5 h-5 text-cyan-600" />
            Xcode &amp; Apple Toolchains
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every compile appends intermediate objects, module caches, and symbol index files into <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">~/Library/Developer</code>. Add legacy iOS simulator runtimes from past betas, and you quickly lose 40GB+.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
            <li>• <code className="font-mono text-cyan-700">DerivedData/</code> — Safe to delete anytime; regenerates on build</li>
            <li>• <code className="font-mono text-cyan-700">CoreSimulator/Devices/</code> — Orphaned simulator instances</li>
            <li>• <code className="font-mono text-cyan-700">Archives/</code> — Old ad-hoc and App Store release builds</li>
          </ul>
        </div>

        {/* Node & JS */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-emerald-600" />
            Node.js, npm, Yarn &amp; pnpm
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            A single client repo can have 40,000 nested files in <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">node_modules</code>. Across 20 side projects in <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">~/Projects</code>, you are hoarding tens of gigabytes of duplicate dependencies.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
            <li>• Dormant <code className="font-mono text-emerald-700">node_modules</code> sorted by last project access</li>
            <li>• Global npm tarball cache (<code className="font-mono text-emerald-700">~/.npm/_cacache</code>)</li>
            <li>• Yarn and pnpm global virtual store directories</li>
          </ul>
        </div>

        {/* Rust & Cargo */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-amber-600" />
            Rust Cargo &amp; Go Module Caches
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Rust builds are notoriously disk-heavy. A small microservice with 30 crate dependencies easily generates an 8GB <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">target/</code> folder in debug mode.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
            <li>• Stale <code className="font-mono text-amber-700">target/debug</code> and <code className="font-mono text-amber-700">target/release</code> builds</li>
            <li>• Cargo downloaded git repos &amp; crates in <code className="font-mono text-amber-700">~/.cargo/registry</code></li>
            <li>• Go build cache and module cache in <code className="font-mono text-amber-700">~/go/pkg/mod</code></li>
          </ul>
        </div>

        {/* Docker Desktop */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Container className="w-5 h-5 text-blue-600" />
            Docker Desktop &amp; Virtual Disks
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Docker on macOS runs inside a lightweight Linux hypervisor. Its virtual disk (<code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">Docker.raw</code>) grows as you pull images, but rarely shrinks when you delete them.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
            <li>• Identifies bloated <code className="font-mono text-blue-700">Docker.raw</code> sparse disk files</li>
            <li>• Flags unpruned BuildKit layer caches</li>
            <li>• Explains when APFS compaction will actually reclaim host bytes</li>
          </ul>
        </div>
      </div>

      {/* Terminal Inspection Snippets */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyan-600" />
          Terminal Inspection Commands
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Want to inspect your storage right now before installing anything? Run these commands in your macOS Terminal:
        </p>
        <CodeBlock 
          code={`# Check your total Xcode DerivedData size
du -sh ~/Library/Developer/Xcode/DerivedData

# Inspect Docker virtual disk file size on your host SSD
ls -lh ~/Library/Containers/com.docker.docker/Data/vms/0/data/Docker.raw

# Find total gigabytes in dormant node_modules across ~/Projects
find ~/Projects -name "node_modules" -type d -prune -exec du -sh {} + 2>/dev/null | sort -hr | head -n 10

# Check Homebrew cached formula downloads
du -sh ~/Library/Caches/Homebrew`}
          title="Terminal Storage Audit"
        />
      </div>

      {/* Safety Guarantee */}
      <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-3">
        <h3 className="text-lg font-bold text-slate-900">Why DiskWarren is Safe for Developers</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          DiskWarren understands what each cache does. We know that deleting Xcode DerivedData is completely harmless because Xcode simply recompiles on next launch, whereas deleting your Git repositories or active virtual environments would disrupt your day. That is why every item is categorized by risk tier, with zero automatic background deletions.
        </p>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-cyan-950 text-white text-center space-y-4 shadow-xl">
        <h3 className="text-2xl font-bold">Reclaim Your SSD in Minutes</h3>
        <p className="text-xs text-slate-300 max-w-lg mx-auto">
          Scan your entire developer directory for free. Free edition lets you browse and inspect all caches without spending a dime.
        </p>
        <div className="pt-2 flex justify-center">
          <Link
            href="/download"
            className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download DiskWarren Free</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
