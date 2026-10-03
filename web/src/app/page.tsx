'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HardDrive, 
  ShieldCheck, 
  Cpu, 
  Hammer, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Layers, 
  Search, 
  Zap, 
  FileCheck, 
  HelpCircle,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  FolderLock,
  Terminal,
  RotateCcw,
  Container,
  PackageCheck,
  Brain,
  Code2,
  FolderTree,
  FileCode,
  ShieldAlert
} from 'lucide-react';
import SimulatedStorageAnalyzer from '@/components/SimulatedStorageAnalyzer';

export default function HomePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "Does DiskWarren request Full Disk Access?",
      a: "Yes. macOS Transparency, Consent, and Control (TCC) restricts utilities from reading specific system directories, application caches, and developer build products (such as Xcode DerivedData in ~/Library/Developer). Full Disk Access allows DiskWarren to accurately calculate your true storage footprint and reveal hidden System Data bloat. DiskWarren remains fully functional with limited access if you choose not to grant it, and you retain complete control over this permission in macOS System Settings."
    },
    {
      q: "Can DiskWarren delete important system files?",
      a: "DiskWarren is engineered with strict safeguards to prevent accidental deletions. Critical operating system directories (/System, /usr, /bin, keychains, and sealed APFS system snapshots) are permanently protected by hardcoded safety barriers. Furthermore, all user-approved cleanups route through the native macOS Trash where supported, allowing you to restore files instantly with native Put Back."
    },
    {
      q: "Which Macs and macOS versions are supported?",
      a: "DiskWarren is built for macOS 14.0 Sonoma and macOS 15.0+ Sequoia. It runs as a native Universal 2 binary on all Apple Silicon chips (M1, M2, M3, M4) and supported 64-bit Intel Mac computers."
    },
    {
      q: "Does DiskWarren upload my files or telemetry?",
      a: "Never. DiskWarren operates on a strict zero-knowledge architecture. All scanning, metadata parsing, size calculation, and duplicate matching execute 100% locally on your Mac's processor. No filenames, folder paths, or file contents are ever transmitted to any remote server or third-party analytics provider."
    },
    {
      q: "Does DiskWarren scan file contents?",
      a: "No. DiskWarren scans filesystem metadata (file sizes, inode paths, modification timestamps, and APFS allocation blocks). In the duplicate finder module, cryptographic SHA-256 hashes are calculated strictly locally in memory to identify identical files, but file contents are never read for any other purpose or shared off-device."
    },
    {
      q: "Can I undo cleanup actions?",
      a: "Yes. By default, DiskWarren recycles cleaned items directly to the native macOS Trash (~/.Trash). To restore any cleaned item to its exact original directory, simply open macOS Trash, right-click the item, and choose 'Put Back'."
    },
    {
      q: "Is DiskWarren a subscription?",
      a: "No. DiskWarren is sold as a transparent, perpetual one-time purchase. Free Community Edition provides full storage analysis and treemap exploration for $0 forever. DiskWarren Pro is a one-time purchase of $9.99 for a single Mac lifetime license, or $14.99 for a 3-Mac family/workstation pack. There are no recurring monthly or annual subscription fees."
    },
    {
      q: "Does DiskWarren work offline?",
      a: "Yes. DiskWarren is completely air-gapped and requires zero internet connection to index your storage, visualize directories, or validate perpetual license keys. License verification uses on-device public-key cryptography (Ed25519) with zero server roundtrips."
    },
    {
      q: "Does DiskWarren support Apple Silicon and Intel?",
      a: "Yes. DiskWarren is distributed as a Universal 2 application package containing native machine code optimized for Apple Silicon (ARM64) and modern Intel (x86_64) Macs."
    },
    {
      q: "Why does DiskWarren need Full Disk Access?",
      a: "Modern versions of macOS place user library caches, Time Machine local snapshots, and package manager folders behind Apple TCC security barriers. Without Full Disk Access, macOS hides these directories from disk analyzers, misattributing them to mystery 'System Data'. Full Disk Access allows DiskWarren to illuminate where your space actually went."
    }
  ];

  return (
    <div className="space-y-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 px-6 max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
          <span>Native macOS Storage Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1]">
          Your Mac is full. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600">
            Find out why.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          DiskWarren analyzes your Mac&apos;s storage, finds hidden space hogs and helps you reclaim space safely — including developer files, Xcode data, Docker, Node modules, local AI models, duplicates and application leftovers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/download"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-base transition-all shadow-md shadow-cyan-600/25 flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
          >
            <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Scan Your Mac Free</span>
          </Link>

          <a
            href="#simulator"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span>See How It Works</span>
            <ArrowRight className="w-4 h-4 text-cyan-600" />
          </a>
        </div>

        {/* Trust Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 pt-4 font-medium">
          <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-emerald-600" /> Native macOS</span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-cyan-600" /> Privacy-first</span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-600" /> No subscription</span>
        </div>
      </section>

      {/* 2. INTERACTIVE STORAGE DEMO */}
      <section id="simulator" className="px-6 max-w-7xl mx-auto space-y-6 scroll-mt-24">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-cyan-600" />
            <span>Live Storage Visualization Demo</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Interactive Storage Demo
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            This demonstration uses synthetic storage data and does not access your Mac. Toggle between the macOS Radial Partition Ring (Pie) and Treemap matrix to inspect candidate items and test safe recycling to Trash.
          </p>
        </div>
        <SimulatedStorageAnalyzer />
      </section>

      {/* 3. MAJOR SECTION: YOUR MAC ISN'T JUST FULL OF "JUNK" */}
      <section id="developer-ai" className="px-6 max-w-6xl mx-auto space-y-12 scroll-mt-24">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold text-cyan-700 uppercase tracking-widest">Beyond Traditional Cleaners</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Your Mac Isn&apos;t Just Full of &quot;Junk.&quot;
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base">
            Modern workstations don&apos;t run out of space because of browser cookies. They are consumed by build caches, simulator runtimes, virtual environments, container images, and local AI weights.
          </p>
        </div>

        {/* 5 Distinct Culprit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Xcode */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-cyan-300 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
              <Hammer className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Xcode</h3>
              <span className="text-xs text-cyan-700 font-mono">Typically 20 GB – 60 GB</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dozens of gigabytes quietly accumulate from previous compilations, legacy iOS simulator runtimes, and intermediate module archives.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" /> DerivedData &amp; Module Caches</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" /> Unused iOS &amp; watchOS Simulators</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" /> Archived Builds &amp; Symbol Maps</li>
            </ul>
            <div className="pt-1">
              <Link href="/xcode-storage" className="text-xs font-bold text-cyan-700 hover:underline inline-flex items-center gap-1">
                <span>Inspect Xcode cleanup rules</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* 2. Docker */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Container className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Docker</h3>
              <span className="text-xs text-blue-700 font-mono">Typically 15 GB – 50 GB</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dangling layers, abandoned build caches, and unused containers inflate your virtual disk image (<code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">Docker.raw</code>).
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Dangling &amp; Untagged Images</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Stoppped Container Overheads</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> BuildKit Intermediate Layer Caches</li>
            </ul>
            <div className="pt-1">
              <Link href="/docker-storage-mac" className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1">
                <span>Inspect Docker storage analysis</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* 3. Node & Web */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-emerald-300 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <FolderTree className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Node &amp; JavaScript</h3>
              <span className="text-xs text-emerald-700 font-mono">Typically 10 GB – 40 GB</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hundreds of thousands of nested files across archived project repositories and package manager tarball caches.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Dormant node_modules Trees</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Global npm &amp; Yarn Cache Directories</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> pnpm Content-Addressable Stores</li>
            </ul>
            <div className="pt-1">
              <Link href="/node-modules-disk-space" className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1">
                <span>Inspect Node storage rules</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* 4. Local AI Models */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-purple-300 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Local AI &amp; LLMs</h3>
              <span className="text-xs text-purple-700 font-mono">Typically 30 GB – 100+ GB</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              7B, 13B, and 70B parameter weights, GGUF files, Hugging Face snapshots, and diffusion checkpoints eating internal SSD blocks.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" /> Ollama SHA Blobs (~/.ollama/models)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" /> LM Studio GGUF Weights</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" /> Hugging Face Hub &amp; ComfyUI Models</li>
            </ul>
            <div className="pt-1">
              <Link href="/ollama-storage" className="text-xs font-bold text-purple-700 hover:underline inline-flex items-center gap-1">
                <span>Inspect AI model detection</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* 5. Development Ecosystems */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-amber-300 hover:shadow-md transition-all lg:col-span-2">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Modern Development Toolchains</h3>
              <span className="text-xs text-amber-700 font-mono">Typically 15 GB – 45 GB</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every package manager and toolchain maintains local download tarballs and build targets across your home directory.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Rust Cargo target/ &amp; registry archives</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Go build caches &amp; module downloads</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Python pip wheel caches &amp; virtual environments</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Homebrew bottled package download caches</div>
            </div>
            <div className="pt-2">
              <Link href="/developer-cleanup-mac" className="text-xs font-bold text-amber-700 hover:underline inline-flex items-center gap-1">
                <span>Explore all developer toolchain rules</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SAFETY BY DESIGN SECTION */}
      <section id="safety" className="px-6 max-w-6xl mx-auto space-y-12 scroll-mt-24">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Architecture &amp; Integrity</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Safety by Design: Built to Prevent Accidental Deletions
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base">
            Never fear running a disk utility again. DiskWarren is architected around transparent review, native macOS Trash routing, and permanent operating system safeguards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Trash-First Routing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All cleaned items are recycled to the native macOS Trash where supported. Restore any file instantly with Finder&apos;s native &quot;Put Back&quot; command. Zero raw unlinks by default.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
              <FolderLock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Protected System Paths</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hardcoded engine barriers strictly protect macOS operating system folders (<code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">/System</code>, <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">/usr</code>, <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">/bin</code>), keychains, and sealed APFS snapshots.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Three-Tier Risk Guidance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every candidate is classified as <strong className="text-emerald-700">Low Risk</strong> (rebuildable caches), <strong className="text-amber-700">Review Required</strong> (uninstalled app data), or <strong className="text-red-700">Restricted</strong>, with full preview before action.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Explicit User Review</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              DiskWarren never runs background background deletion daemons or automated sweeps. Every operation requires your conscious inspection, selection, and confirmation.
            </p>
          </div>
        </div>
      </section>

      {/* 5. VISUAL SQUARIFIED TREEMAP & SEARCH */}
      <section id="treemap" className="px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center scroll-mt-24">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono font-semibold">
            <Layers className="w-3.5 h-3.5 text-cyan-600" />
            <span>Interactive Treemap &amp; Uninstaller</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
            See your filesystem as physical space. Zoom, inspect, and drill down.
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Our squarified treemap visualizes deep directory hierarchies and file density. Click into any directory to reveal exact storage density, locate runaway log files, or sweep away uninstalled application leftovers.
          </p>
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-700 mt-0.5"><Search className="w-4 h-4" /></div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Instant In-Memory Search</h4>
                <p className="text-xs text-slate-500">Filter by filename, extension, or category with sub-millisecond response.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-700 mt-0.5"><FileCheck className="w-4 h-4" /></div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Cryptographic Duplicate Finder</h4>
                <p className="text-xs text-slate-500">Three-stage progressive filter: Size bucket &rarr; chunk hash &rarr; full SHA-256 confirmation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Mock Box */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs font-mono text-slate-400 ml-2">Treemap Explorer</span>
            </div>
            <span className="text-xs text-cyan-400 font-mono">/Users/developer</span>
          </div>

          <div className="grid grid-cols-3 gap-2 h-64">
            <div className="col-span-2 bg-cyan-950/70 border border-cyan-500/50 rounded-lg p-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-300 block">Developer / Xcode</span>
                <span className="text-[11px] font-mono text-cyan-400">DerivedData • 24.1 GB</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">1,420 files</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex-1 bg-purple-950/70 border border-purple-500/50 rounded-lg p-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-purple-300 block">AI Models</span>
                  <span className="text-[11px] font-mono text-purple-400">Ollama • 22.5 GB</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">GGUF weights</span>
              </div>
              <div className="h-20 bg-blue-950/70 border border-blue-500/50 rounded-lg p-2.5 flex flex-col justify-between">
                <span className="text-xs font-bold text-blue-300">Apps</span>
                <span className="text-[11px] font-mono text-blue-400">14.8 GB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRANSPARENT PRICING SECTION */}
      <section id="pricing" className="px-6 max-w-4xl mx-auto space-y-12 scroll-mt-24">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold text-cyan-700 uppercase tracking-widest">Pricing</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Simple, Honest Pricing. No Subscriptions.</h2>
          <p className="text-sm text-slate-600">Pay once, own it forever. Free updates for v1.x with 100% offline license support.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Scan Tier */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Free Edition</h3>
              <p className="text-xs text-slate-500 mt-1">Full disk exploration &amp; storage intelligence</p>
              <div className="mt-4">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">$0</span>
                <span className="text-xs text-slate-500 ml-1">forever</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Full Filesystem Scanning</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Interactive Treemap Exploration</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Developer &amp; AI Storage Inspection</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Large Files Detector (&gt;100MB)</li>
              <li className="flex items-center gap-2 text-slate-400"><span>• One-click safe batch cleanup (Pro)</span></li>
            </ul>

            <Link
              href="/download"
              className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors block text-center"
            >
              Download Free Version
            </Link>
          </div>

          {/* Pro Lifetime Tier */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-white to-cyan-50/60 border-2 border-cyan-500 shadow-lg shadow-cyan-500/10 space-y-6 relative">
            <div>
              <h3 className="text-lg font-bold text-slate-900">DiskWarren Pro</h3>
              <p className="text-xs text-slate-500 mt-1">Unlimited safe cleanup, uninstaller &amp; duplicates</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-cyan-700 font-mono">$9.99</span>
                <span className="text-xs text-slate-500 ml-1">one-time payment</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-600" /> Everything in Free Edition</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-600" /> One-Click Safe Batch Trash Cleanup</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-600" /> Application Uninstaller &amp; Leftovers</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-600" /> SHA-256 Duplicate File Eliminator</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-600" /> No Monthly or Yearly Subscriptions</li>
            </ul>

            <Link
              href="/pricing"
              className="w-full py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-600/25 block text-center cursor-pointer"
            >
              Get Pro License ($9.99)
            </Link>
          </div>
        </div>
      </section>

      {/* 7. COMPLETE FAQ SECTION */}
      <section id="faq" className="px-6 max-w-4xl mx-auto space-y-10 scroll-mt-24">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">Questions &amp; Answers</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div 
                key={i} 
                className="rounded-xl bg-white border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-base font-semibold text-slate-900">{faq.q}</h3>
                  <div className="p-1 rounded-md bg-slate-100 text-slate-600 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-600" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. FINAL DOWNLOAD CALL TO ACTION */}
      <section className="px-6 max-w-5xl mx-auto">
        <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-cyan-400 text-slate-950 flex items-center justify-center mx-auto shadow-md">
            <HardDrive className="w-8 h-8 stroke-[2.5]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Take back your Mac&apos;s storage today.
          </h2>

          <p className="text-base text-slate-300 max-w-xl mx-auto">
            Download the native macOS app and discover gigabytes of hidden caches, old simulator runtimes, and local AI checkpoints.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/download"
              className="px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-400/25 flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download DiskWarren Universal DMG (macOS 14+)</span>
            </Link>
          </div>

          <div className="text-xs text-slate-400 pt-2 font-medium">
            Universal 2 DMG • 100% Local Privacy • 30-Day Money Back Guarantee
          </div>
        </div>
      </section>
    </div>
  );
}
