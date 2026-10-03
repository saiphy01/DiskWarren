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
  FolderLock,
  RotateCcw,
  Container,
  Brain,
  Code2,
  FolderTree,
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
      q: "Why does macOS show 80GB of mysterious 'System Data'?",
      a: "When macOS doesn't have a neat label for a file, it dumps it into 'System Data'. In reality, that category is usually made of Xcode DerivedData, old iOS simulator runtimes, local Time Machine snapshots, Docker virtual disk files (Docker.raw), and unpruned package manager caches in your ~/Library folder. DiskWarren digs into those exact paths and shows you what is actually sitting on your drive."
    },
    {
      q: "Does DiskWarren need Full Disk Access to work?",
      a: "Yes, if you want an accurate scan. Apple's Transparency, Consent, and Control (TCC) system locks down folders like ~/Library/Developer, Time Machine metadata, and application caches from standard apps. Without Full Disk Access, any storage tool will give you incomplete numbers. DiskWarren works 100% locally and you can revoke the permission in System Settings whenever you like."
    },
    {
      q: "Can this accidentally delete something macOS needs to boot?",
      a: "No. Critical operating system directories (/System, /usr, /bin, keychains, and sealed APFS snapshots) are hard-locked in the code. Even if you tried, DiskWarren will never touch them. On top of that, everything you choose to delete gets sent to your native macOS Trash first—so you can always right-click and choose 'Put Back' if you change your mind."
    },
    {
      q: "Is DiskWarren really a one-time purchase, or is there a subscription?",
      a: "There are zero subscriptions. We're developers ourselves and we hate paying monthly rent for utilities sitting in our menu bar. You can scan and explore your drive for free forever. If you want one-click batch recycling, the duplicate cleaner, and the uninstaller, DiskWarren Pro is a single $9.99 payment for life on your Mac."
    },
    {
      q: "Does DiskWarren send any of my filenames or data to the cloud?",
      a: "Never. Not a single byte leaves your machine. DiskWarren doesn't even have a telemetry or analytics server to talk to. Scanning, size calculations, and SHA-256 duplicate hashing all happen purely in memory on your Mac's CPU."
    },
    {
      q: "Does it work on Apple Silicon (M1/M2/M3/M4) and Intel Macs?",
      a: "Yes. DiskWarren is compiled as a native Universal 2 binary for macOS 14 Sonoma and macOS 15 Sequoia. It runs at full hardware speed on Apple Silicon without Rosetta, and has full native support for 64-bit Intel Macs as well."
    },
    {
      q: "How does it handle local AI models (Ollama, LM Studio)?",
      a: "Local AI weights live in hidden folders—Ollama stores them in ~/.ollama/models/blobs as hexadecimal hashes rather than human-readable names. DiskWarren parses the manifest files to correlate each multi-gigabyte blob with its actual model name (e.g. Llama 3 8B, DeepSeek Coder 33B, Mistral 7B) so you know exactly which model to prune."
    },
    {
      q: "Does DiskWarren run in the background when I close it?",
      a: "No background helpers, no menu bar daemons, no launch agents, and no startup nags. When you close DiskWarren, it's completely gone from memory and uses zero CPU or battery."
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
            Find out what&apos;s actually taking the space.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          You bought a 512GB or 1TB SSD thinking it would last years. Now macOS says you have 14GB left, and half of it is lumped into &ldquo;System Data.&rdquo; DiskWarren unmasks the real culprits: Xcode build caches, Docker virtual disks, forgotten Ollama weights, dormant node_modules, and application leftovers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/download"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-base transition-all shadow-md shadow-cyan-600/25 flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
          >
            <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Download Free</span>
          </Link>

          <a
            href="#simulator"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span>Try the Interactive Demo</span>
            <ArrowRight className="w-4 h-4 text-cyan-600" />
          </a>
        </div>

        <p className="text-xs text-slate-500 pt-1 font-medium">
          Available for <Link href="/download" className="text-cyan-700 underline font-semibold">macOS (Universal DMG)</Link> and <Link href="/windows/download" className="text-blue-700 underline font-semibold">Windows (1-Click Installer)</Link>
        </p>

        {/* Trust Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 pt-4 font-medium">
          <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-emerald-600" /> 100% Local &amp; Private</span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-cyan-600" /> Recycles to Trash First</span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-600" /> One-Time Purchase, No Subscriptions</span>
        </div>
      </section>

      {/* 2. INTERACTIVE STORAGE DEMO */}
      <section id="simulator" className="px-6 max-w-7xl mx-auto space-y-6 scroll-mt-24">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-cyan-600" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            See How DiskWarren Categorizes Your Drive
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Try the interactive sandbox below. Switch between the partition ring and the squarified treemap, inspect realistic developer files, and see how safe recycling to Trash works in real time.
          </p>
        </div>
        <SimulatedStorageAnalyzer />
      </section>

      {/* 3. MAJOR SECTION: YOUR MAC ISN'T JUST FULL OF "JUNK" */}
      <section id="developer-ai" className="px-6 max-w-6xl mx-auto space-y-12 scroll-mt-24">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold text-cyan-700 uppercase tracking-widest">Built for Real Workstations</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Your Mac Isn&apos;t Full of Junk. It&apos;s Full of Tools.
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base">
            Traditional disk cleaners search for browser cookies and language translation files to boast that they reclaimed 400MB. Real developer machines run out of space because our modern toolchains never clean up after themselves.
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
              <span className="text-xs text-cyan-700 font-mono font-medium">Often 25 GB – 70 GB</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every build dumps intermediate object files and index stores into <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">~/Library/Developer</code>. Add two forgotten watchOS simulator runtimes from last year, and Xcode is quietly holding onto 50GB of dead weight.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" /> DerivedData &amp; module compilation caches</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" /> Unused iOS, watchOS &amp; tvOS simulator runtimes</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" /> Archived release builds and dSYM symbol files</li>
            </ul>
            <div className="pt-1">
              <Link href="/xcode-storage" className="text-xs font-bold text-cyan-700 hover:underline inline-flex items-center gap-1">
                <span>See Xcode cleanup guide</span>
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
              <h3 className="text-xl font-bold text-slate-900">Docker Desktop</h3>
              <span className="text-xs text-blue-700 font-mono font-medium">Often 20 GB – 60 GB</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Docker allocates a virtual disk (<code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">Docker.raw</code>) on macOS that inflates dynamically but rarely shrinks on its own, even after you prune unused containers and images.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Bloated virtual disk sparse files (Docker.raw)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Dangling image layers from failed builds</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> BuildKit cache stores accumulating invisibly</li>
            </ul>
            <div className="pt-1">
              <Link href="/docker-storage-mac" className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1">
                <span>See Docker storage guide</span>
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
              <span className="text-xs text-emerald-700 font-mono font-medium">Often 15 GB – 50 GB</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              A standard Next.js or React repo can easily hold 50,000 files in <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">node_modules</code>. Across 20 client projects you haven&apos;t touched in six months, that&apos;s tens of gigabytes of duplicate dependencies.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Inactive node_modules folders grouped by last modified</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Global npm and Yarn cache tarballs</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Unreferenced pnpm content-addressable blobs</li>
            </ul>
            <div className="pt-1">
              <Link href="/node-modules-disk-space" className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1">
                <span>Clean node_modules safely</span>
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
              <h3 className="text-xl font-bold text-slate-900">Local AI &amp; LLM Weights</h3>
              <span className="text-xs text-purple-700 font-mono font-medium">Often 30 GB – 120 GB</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Testing out Llama, DeepSeek, or Flux? A single 70B model checkpoint is 40GB. Ollama hides them under obscure SHA blob filenames in <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">~/.ollama/models</code>, making manual cleanup tedious.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" /> Correlates Ollama SHA blobs to actual model names</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" /> LM Studio downloaded GGUF weight files</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" /> Hugging Face Hub snapshots and ComfyUI checkpoints</li>
            </ul>
            <div className="pt-1">
              <Link href="/ollama-storage" className="text-xs font-bold text-purple-700 hover:underline inline-flex items-center gap-1">
                <span>Inspect local AI weight manager</span>
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
              <h3 className="text-xl font-bold text-slate-900">Rust, Python, Go &amp; Homebrew Toolchains</h3>
              <span className="text-xs text-amber-700 font-mono font-medium">Often 15 GB – 45 GB</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every modern build tool keeps local archives. Rust Cargo stores gigabytes in <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">target/</code> per crate. Python wheels pile up in pip cache, and Homebrew keeps downloaded bottles in <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">~/Library/Caches/Homebrew</code>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Rust Cargo target/ and registry archives</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Go build caches and module downloads</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Python pip wheel cache and orphaned virtual environments</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Homebrew downloaded bottles and formula caches</div>
            </div>
            <div className="pt-2">
              <Link href="/developer-cleanup-mac" className="text-xs font-bold text-amber-700 hover:underline inline-flex items-center gap-1">
                <span>View all supported toolchain rules</span>
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
            <span>Engine Architecture</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Safety by Design: We Never Break Your Mac
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base">
            Running a disk utility shouldn&apos;t feel like Russian roulette. DiskWarren is designed with strict guardrails so you always stay in control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Everything Goes to Trash</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cleaned items are moved to your native macOS Trash. If you ever realize you needed an old build or archive, just open Trash, right-click, and click &ldquo;Put Back.&rdquo; Zero immediate raw unlinks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
              <FolderLock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Hardcoded System Locks</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The engine explicitly refuses to touch core macOS directories (<code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">/System</code>, <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">/usr</code>, <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">/bin</code>), keychains, and sealed APFS system snapshots.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Three-Tier Risk Badges</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every folder is tagged: <strong className="text-emerald-700">Safe</strong> (rebuildable caches), <strong className="text-amber-700">Review</strong> (uninstalled app remnants), or <strong className="text-red-700">Restricted</strong> (system &amp; config files).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Zero Background Daemons</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No hidden services eating your battery or monitoring your filesystem. DiskWarren runs when you double-click it, and shuts down completely when you press Cmd+Q.
            </p>
          </div>
        </div>
      </section>

      {/* 5. VISUAL SQUARIFIED TREEMAP & SEARCH */}
      <section id="treemap" className="px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center scroll-mt-24">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono font-semibold">
            <Layers className="w-3.5 h-3.5 text-cyan-600" />
            <span>Squarified Treemap &amp; Inspector</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
            See your disk as physical territory. Zoom into what matters.
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Finding lost space with nested Finder lists is like reading a phone book. DiskWarren maps your drive into an interactive squarified treemap where larger rectangles mean more disk consumed. Click into any folder to zoom down to the exact files eating your storage.
          </p>
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-700 mt-0.5"><Search className="w-4 h-4" /></div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Instant In-Memory Search</h4>
                <p className="text-xs text-slate-500">Filter millions of indexed files by name, extension, or size with instant keyboard response.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-700 mt-0.5"><FileCheck className="w-4 h-4" /></div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Cryptographic Duplicate Detection</h4>
                <p className="text-xs text-slate-500">A three-stage filter (size bucket &rarr; chunk sample &rarr; full SHA-256) confirms duplicates with 100% mathematical certainty before you touch anything.</p>
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
          <span className="text-xs font-semibold text-cyan-700 uppercase tracking-widest">Fair Pricing</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Buy It Once. Keep It Forever.</h2>
          <p className="text-sm text-slate-600">No monthly fees. No annual renewals. Offline cryptographic license key that never expires.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Scan Tier */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Free Edition</h3>
              <p className="text-xs text-slate-500 mt-1">Full disk exploration and storage intelligence</p>
              <div className="mt-4">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">$0</span>
                <span className="text-xs text-slate-500 ml-1">forever</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Complete APFS and HFS+ drive scanning</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Interactive partition ring and treemap zoom</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Full breakdown of Xcode, Docker, Node, and AI models</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Large file finder (&gt;100MB) with Finder reveal</li>
              <li className="flex items-center gap-2 text-slate-400"><span>• Automated batch recycling &amp; duplicates (Pro)</span></li>
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
              <p className="text-xs text-slate-500 mt-1">Automated safe cleanup, deep uninstaller, and duplicate remover</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-cyan-700 font-mono">$9.99</span>
                <span className="text-xs text-slate-500 ml-1">single payment</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-600" /> Everything in Free Edition</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-600" /> One-click safe batch recycling to Trash</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-600" /> Deep application uninstaller that clears hidden Library leftovers</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-600" /> Cryptographic SHA-256 duplicate file remover</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-600" /> Lifetime license for your Mac with offline license key</li>
            </ul>

            <Link
              href="/pricing"
              className="w-full py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-600/25 block text-center cursor-pointer"
            >
              Get DiskWarren Pro ($9.99)
            </Link>
          </div>
        </div>
      </section>

      {/* 7. COMPLETE FAQ SECTION */}
      <section id="faq" className="px-6 max-w-4xl mx-auto space-y-10 scroll-mt-24">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-600" />
            <span>Clear Answers</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
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
            Download DiskWarren natively for macOS or Windows. Discover gigabytes of hidden caches, old simulator runtimes, and local AI checkpoints in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/download"
              className="px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-400/25 flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download DiskWarren (macOS &amp; Windows)</span>
            </Link>
          </div>

          <div className="text-xs text-slate-400 pt-2 font-medium">
            macOS Universal DMG • Windows MSI Installer • 100% Local Privacy
          </div>
        </div>
      </section>
    </div>
  );
}
