'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Layers, 
  Code2, 
  Copy, 
  HardDrive, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Terminal,
  Cpu,
  Monitor
} from 'lucide-react';

export default function WindowsFeaturesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Windows Capabilities &amp; Architecture</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Built for Power Users, Developers, &amp; Creators on Windows
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Engineered from the ground up in native .NET 8. DiskWarren bypasses slow legacy Win32 file enumeration to deliver sub-second partition analysis and developer cache discovery.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Feature 1 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">High-Speed NTFS Metadata Scanner</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Standard Windows Explorer takes minutes to calculate folder sizes. DiskWarren utilizes optimized parallel NTFS directory traversal to index over 1,000,000 files across internal and external NVMe SSDs in seconds.
          </p>
          <div className="pt-2 text-xs font-mono text-blue-600 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
            ✓ Multi-drive support (C:, D:, E:, network shares, USB 3.2 drives)
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Interactive Squarified Treemap</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            See your entire drive laid out in proportional geometric tiles. Click into any folder block to drill down seamlessly, identify rogue ISOs, large game installs, and hidden virtual machines in real time.
          </p>
          <div className="pt-2 text-xs font-mono text-indigo-600 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
            ✓ Color-coded by file category (Executables, Media, Code, Caches)
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Code2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Windows Developer Workspace Intelligence</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Windows developer tools quietly accumulate tens of gigabytes of hidden caches. DiskWarren automatically unearths:
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 font-mono bg-slate-50 p-3 rounded-xl border border-slate-100">
            <li>• Visual Studio (.vs hidden IntelliSense database)</li>
            <li>• NuGet global package cache (%USERPROFILE%\.nuget\packages)</li>
            <li>• WSL2 Docker virtual disk bloat (ext4.vhdx)</li>
            <li>• Node.js node_modules, Yarn, pnpm store</li>
            <li>• Rust Cargo target &amp; Gradle cache directories</li>
          </ul>
        </div>

        {/* Feature 4 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Copy className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Cryptographic Duplicate Finder</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Avoid simple name-based matching that causes false positives. DiskWarren uses a 3-tier verification pipeline: exact file size $\to$ 4KB header comparison $\to$ full cryptographic SHA-256 byte hashing.
          </p>
          <div className="pt-2 text-xs font-mono text-purple-600 bg-purple-50/50 p-3 rounded-xl border border-purple-100">
            ✓ Safe 1-click batch selection keeping newest or oldest original
          </div>
        </div>

        {/* Feature 5 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Monitor className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Windows 11 Fluent Design &amp; Mica UI</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            No clunky web wrappers or Electron memory hogs. DiskWarren is a lightweight, responsive native Windows desktop application with Mica material, system dark mode support, and sub-100MB RAM usage.
          </p>
          <div className="pt-2 text-xs font-mono text-cyan-600 bg-cyan-50/50 p-3 rounded-xl border border-cyan-100">
            ✓ ARM64 native binary for Snapdragon X Elite Copilot+ PCs
          </div>
        </div>

        {/* Feature 6 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Terminal className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Explorer Context Menu &amp; WinGet CLI</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Right-click any folder or drive directly in Windows File Explorer and select "Analyze with DiskWarren" for instant scoped audits. Supports silent deployment via WinGet and automation flags.
          </p>
          <div className="pt-2 text-xs font-mono text-amber-600 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
            ✓ Integrates with modern Windows 11 cascaded context menus
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-3xl font-bold">Experience the Fastest Windows Disk Analyzer</h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Scan your PC in under 10 seconds. Free forever for storage visualization and duplicate auditing.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/windows/download"
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            Download Free for Windows
          </Link>
          <Link
            href="/windows/pricing"
            className="px-6 py-3.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-bold text-sm transition-all"
          >
            View Windows Pricing ($9.99)
          </Link>
        </div>
      </div>
    </div>
  );
}
