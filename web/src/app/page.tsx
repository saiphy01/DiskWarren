import React from 'react';
import Link from 'next/link';
import { 
  HardDrive, 
  ShieldCheck, 
  Cpu, 
  Hammer, 
  Lock, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Layers, 
  Search, 
  Zap, 
  FileCheck, 
  HelpCircle,
  FolderOpen
} from 'lucide-react';
import SimulatedStorageAnalyzer from '@/components/SimulatedStorageAnalyzer';

export default function HomePage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-6 max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Native macOS Storage Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Know exactly where your Mac&apos;s storage went — <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">and safely take it back.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          The first storage analyzer designed for modern workflows. Understand gigabytes eaten by Xcode DerivedData, Docker layers, Node modules, and local AI model weights (Ollama, LM Studio).
        </p>

        {/* CTA Buttons */}
        <div id="download" className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#download"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-base transition-all shadow-xl shadow-cyan-400/20 flex items-center justify-center gap-2 group active:scale-95"
          >
            <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Download DiskWarren for macOS</span>
          </a>

          <a
            href="#simulator"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#161D28] hover:bg-[#1E2837] border border-[#2B3547] text-white font-medium text-base transition-all flex items-center justify-center gap-2"
          >
            <span>Try Interactive Demo</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </a>
        </div>

        {/* Pillar Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-4">
          <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-emerald-400" /> 100% Local & Zero Telemetry</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-cyan-400" /> Trash-First Protection</span>
          <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-400" /> Universal 2 (Apple Silicon & Intel)</span>
          <span className="flex items-center gap-1.5"><Cpu className="w-4 h-4 text-purple-400" /> Built for macOS 14 & 15+</span>
        </div>
      </section>

      {/* Interactive Simulation Section */}
      <section className="px-6 max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Experience DiskWarren Live</h2>
          <p className="text-sm text-slate-400">Interact with a simulated macOS volume to see how intelligence categorization works.</p>
        </div>
        <SimulatedStorageAnalyzer />
      </section>

      {/* Core Differentiator Grid */}
      <section id="features" className="px-6 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Why DiskWarren</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Engineered for the Modern Mac</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">Traditional disk cleaners look for 10-year-old browser caches. DiskWarren targets the actual culprits devouring modern SSDs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Developer Cleanup */}
          <div id="developer" className="p-7 rounded-2xl bg-[#111622] border border-[#20293A] space-y-4 hover:border-cyan-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Hammer className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Developer Ecosystems</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Detect and reclaim Xcode DerivedData, archived simulators, stale <code className="text-cyan-300 font-mono text-xs">node_modules</code> trees, Cargo target directories, pip wheel caches, and Docker desktop images.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-[#1C2433]">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Xcode DerivedData & Simulators</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Rust target & Go build caches</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Homebrew bottled package archives</li>
            </ul>
          </div>

          {/* Card 2: AI Storage */}
          <div id="ai" className="p-7 rounded-2xl bg-[#111622] border border-[#20293A] space-y-4 hover:border-purple-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Local AI Storage Intelligence</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Local LLMs are SSD monsters. DiskWarren tracks Ollama model blobs, LM Studio GGUF weight files, Hugging Face Hub snapshots, and ComfyUI diffusion checkpoints.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-[#1C2433]">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Ollama (~/.ollama/models)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> LM Studio & Hugging Face Hub</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Standalone GGUF & Safetensors weights</li>
            </ul>
          </div>

          {/* Card 3: Safety Architecture */}
          <div id="safety" className="p-7 rounded-2xl bg-[#111622] border border-[#20293A] space-y-4 hover:border-emerald-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Trash-First Safety Engine</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Never worry about accidental deletion. DiskWarren categorizes all items into Low, Review, and Restricted tiers. Purged files move to the macOS Trash for instant restoration.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-[#1C2433]">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Zero permanent unlinks by default</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Permanent blacklist on /System & /usr</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Full Put Back support via macOS Trash</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Visual Treemap & Uninstaller Showcase */}
      <section className="px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-300 text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Treemap</span>
          </div>
          <h2 className="text-3xl font-bold text-white leading-tight">
            See your filesystem as physical space. Zoom, inspect, and drill down.
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Our high-speed squarified treemap visualizes millions of files in real time. Click into any directory to reveal exact storage density, locate runaway log files, or inspect media folders.
          </p>
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <div className="p-1 rounded bg-cyan-500/20 text-cyan-400 mt-0.5"><Search className="w-4 h-4" /></div>
              <div>
                <h4 className="text-sm font-semibold text-white">Instant In-Memory Search</h4>
                <p className="text-xs text-slate-400">Search by filename, extension, or category with sub-10ms response time.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1 rounded bg-cyan-500/20 text-cyan-400 mt-0.5"><FileCheck className="w-4 h-4" /></div>
              <div>
                <h4 className="text-sm font-semibold text-white">Duplicate Finder (SHA-256)</h4>
                <p className="text-xs text-slate-400">Three-stage progressive filter: Size bucket → chunk hash → full cryptographic verification.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Mock Box */}
        <div className="p-6 rounded-2xl bg-[#0F141E] border border-[#232C3D] shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#202836]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2">Treemap Explorer</span>
            </div>
            <span className="text-xs text-cyan-400 font-mono">/Users/saiph</span>
          </div>

          <div className="grid grid-cols-3 gap-2 h-64">
            <div className="col-span-2 bg-cyan-950/40 border border-cyan-500/40 rounded-lg p-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-300 block">Developer / Xcode</span>
                <span className="text-[11px] font-mono text-cyan-400/80">DerivedData • 24.1 GB</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">1,420 files</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex-1 bg-purple-950/40 border border-purple-500/40 rounded-lg p-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-purple-300 block">AI Models</span>
                  <span className="text-[11px] font-mono text-purple-400/80">Ollama • 22.5 GB</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">GGUF weights</span>
              </div>
              <div className="h-20 bg-blue-950/40 border border-blue-500/40 rounded-lg p-2.5 flex flex-col justify-between">
                <span className="text-xs font-bold text-blue-300">Apps</span>
                <span className="text-[11px] font-mono text-blue-400/80">14.8 GB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Pricing Placeholder */}
      <section id="pricing" className="px-6 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Pricing</span>
          <h2 className="text-3xl font-bold text-white">Simple, Honest Pricing. No Subscriptions.</h2>
          <p className="text-sm text-slate-400">Pay once, own it forever. Free updates for v1.x with 100% offline license support.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Scan Tier */}
          <div className="p-8 rounded-2xl bg-[#10151E] border border-[#212938] space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Free Edition</h3>
              <p className="text-xs text-slate-400 mt-1">Full disk exploration & intelligence</p>
              <div className="mt-4">
                <span className="text-3xl font-extrabold text-white font-mono">$0</span>
                <span className="text-xs text-slate-400 ml-1">forever</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Full Filesystem Scanning</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Interactive Treemap Exploration</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Developer & AI Storage Inspection</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Large Files Detector (&gt;100MB)</li>
              <li className="flex items-center gap-2 text-slate-500"><span>• One-click safe batch cleanup (Pro)</span></li>
            </ul>

            <button className="w-full py-2.5 rounded-lg bg-[#1B2330] hover:bg-[#253042] text-white text-xs font-semibold transition-colors">
              Download Free Version
            </button>
          </div>

          {/* Pro Lifetime Tier */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#141E2D] to-[#0E141E] border-2 border-cyan-500/50 shadow-xl shadow-cyan-500/10 space-y-6 relative">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-cyan-400 text-black font-bold text-[10px] uppercase tracking-wider">
              Lifetime License
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">DiskWarren Pro</h3>
              <p className="text-xs text-slate-400 mt-1">Unlimited safe cleanup, uninstaller & duplicates</p>
              <div className="mt-4">
                <span className="text-3xl font-extrabold text-cyan-400 font-mono">$29</span>
                <span className="text-xs text-slate-400 ml-1">one-time payment</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Everything in Free Edition</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> One-Click Safe Batch Trash Cleanup</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Application Uninstaller & Leftovers</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> SHA-256 Duplicate File Eliminator</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Use on up to 3 Personal Macs</li>
            </ul>

            <button className="w-full py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold transition-all shadow-md shadow-cyan-400/20">
              Get Pro License ($29)
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#161D28] text-slate-400 text-xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl font-bold text-white">Questions & Answers</h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Does DiskWarren upload any of my files or directory names?",
              a: "Never. DiskWarren operates on a strict zero-knowledge architecture. All scanning, metadata parsing, size calculation, and duplicate matching run 100% locally on your Mac's CPU. No filenames, folder names, or file contents are ever sent to any remote server or analytics provider."
            },
            {
              q: "Why does DiskWarren request Full Disk Access?",
              a: "macOS Transparency, Consent, and Control (TCC) restricts utilities from reading specific system directories, application caches, and Time Machine snapshots. Full Disk Access allows DiskWarren to accurately calculate your true storage footprint and reveal hidden System Data bloat. DiskWarren remains fully functional with limited access if you choose not to grant it."
            },
            {
              q: "Can DiskWarren accidentally delete important system files?",
              a: "No. DiskWarren permanently protects critical operating system directories (/System, /usr, /bin, keychains, active databases) through hardcoded engine safeguards. Furthermore, all user-approved cleanup operations route through the macOS Trash, allowing you to restore files instantly with native Put Back."
            },
            {
              q: "Which Mac models and macOS versions are supported?",
              a: "DiskWarren is compiled as a native Universal 2 binary supporting all Apple Silicon chips (M1, M2, M3, M4) and modern Intel Macs running macOS 14 Sonoma or macOS 15 Sequoia."
            }
          ].map((faq, i) => (
            <div key={i} className="p-6 rounded-xl bg-[#10151E] border border-[#212A3A] space-y-2">
              <h4 className="text-base font-semibold text-white">{faq.q}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Download Call to Action */}
      <section className="px-6 max-w-5xl mx-auto">
        <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-[#101622] to-blue-950/60 border border-cyan-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-cyan-400 text-black flex items-center justify-center mx-auto shadow-lg shadow-cyan-400/30">
            <HardDrive className="w-8 h-8 stroke-[2.5]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Take back your Mac&apos;s storage today.
          </h2>

          <p className="text-base text-slate-300 max-w-xl mx-auto">
            Download the native macOS app and discover dozens of gigabytes in hidden caches, old simulator runtimes, and local AI checkpoints.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#download"
              className="px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-sm transition-all shadow-xl shadow-cyan-400/25 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download DiskWarren DMG (macOS 14+)</span>
            </a>
          </div>

          <div className="text-xs text-slate-500 pt-2">
            Universal 2 DMG • Apple Notarized • 14-Day Money Back Guarantee
          </div>
        </div>
      </section>
    </div>
  );
}
