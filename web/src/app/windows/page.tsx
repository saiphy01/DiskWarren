import { Metadata } from 'next';
import Link from 'next/link';
import { 
  HardDrive, 
  Trash2, 
  ShieldCheck, 
  Download, 
  Terminal, 
  Gamepad2, 
  Code2, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Cpu,
  RefreshCw
} from 'lucide-react';

export const metadata: Metadata = {
  title: "DiskWarren for Windows — Find What's Filling Your PC | Windows Storage Intelligence",
  description: "Native Windows storage intelligence and drive analysis. Find hidden gigabytes in Visual Studio, NuGet, npm, Docker WSL2, Steam shader caches, and temporary files. Recycle Bin-first safe cleanup.",
  alternates: {
    canonical: 'https://diskwarren.com/windows',
  },
};

export default function WindowsLandingPage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-6 max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
          <span>Windows Storage Intelligence • .NET 8 Native</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1]">
          Find what's filling your PC. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600">
            Clean safely.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Drive-by-drive NTFS analysis, interactive squarified treemaps, and deep intelligence for Visual Studio, NuGet, Docker WSL2, npm, and Steam shader caches. All cleanups route through the Windows Recycle Bin first.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="https://github.com/saiphy01/DiskWarren/releases"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-base transition-all shadow-md shadow-cyan-600/25 flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
          >
            <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Download for Windows (x64)</span>
          </a>
          <Link
            href="/pricing"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span>View Windows Pro ($9.99)</span>
            <ArrowRight className="w-4 h-4 text-cyan-600" />
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 pt-4 font-medium">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-cyan-600" /> Windows 10 & 11 (64-bit / ARM64)
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <Trash2 className="w-4 h-4 text-emerald-600" /> Recycle Bin-First (100% Reversible)
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" /> No Telemetry • Offline-First
          </span>
        </div>
      </section>

      {/* Drive-by-Drive & Treemap Showcase */}
      <section className="px-6 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-cyan-700 uppercase tracking-widest">Multi-Volume Visualization</span>
          <h2 className="text-3xl font-extrabold text-slate-900">See Your C: and D: Drives at a Glance</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm">
            Instant volume discovery for NVMe SSDs, SATA drives, and external USB storage. Fast NTFS traversal with zero freeze.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">System (C:) — 554.2 GB</h3>
                  <span className="text-xs text-slate-500 font-mono">NTFS • NVMe PCIe Gen4</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">385.8 GB Free</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div className="bg-cyan-600 h-full rounded-full" style={{ width: '30.4%' }}></div>
            </div>
            <div className="text-xs text-slate-500 flex justify-between">
              <span>168.3 GB Used (30.4%)</span>
              <span>Protected Windows System</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Games & Data (E:) — 398.4 GB</h3>
                  <span className="text-xs text-slate-500 font-mono">NTFS • Secondary SSD</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">317.5 GB Free</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '20.3%' }}></div>
            </div>
            <div className="text-xs text-slate-500 flex justify-between">
              <span>80.9 GB Used (20.3%)</span>
              <span>Steam & Media Libraries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Developer & Gaming Footprint Focus */}
      <section className="px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold text-cyan-700 uppercase tracking-widest">Built for Windows Creators & Developers</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">What's Actually Filling Your Windows PC?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base">
            It isn't just browser cookies. It is multi-gigabyte build artifacts, virtual disk images, package downloads, and pre-compiled shaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Visual Studio & .NET</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Global NuGet package caches in <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded text-[11px]">~/.nuget/packages</code>, hidden <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded text-[11px]">.vs</code> solution states, and diagnostic profiling memory dumps.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> NuGet Global Packages</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> .vs Solution State Caches</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> MSBuild bin & obj artifacts</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Docker & WSL2</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Virtual hard disk images (<code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded text-[11px]">ext4.vhdx</code>) that expand dynamically but never automatically shrink when files are deleted inside Linux.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Docker Desktop ext4.vhdx</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> WSL Distribution VHDX Compaction</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Dangling image layers</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Gaming & Steam</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Shader pre-caching directories, uninstalled game workshop mods, DirectX and VC++ redistributable installers left in game folders.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Steam shadercache archives</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Orphaned workshop items</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Epic Games launcher vaults</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Safety by Design: Windows Edition */}
      <section className="px-6 max-w-4xl mx-auto p-8 rounded-2xl bg-slate-900 text-white space-y-6">
        <div className="flex items-center gap-3 text-cyan-400">
          <ShieldCheck className="w-6 h-6" />
          <h2 className="text-xl font-bold">Safety by Design on Windows</h2>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          DiskWarren is engineered to prevent accidental data loss. We permanently write-block critical Windows OS directories (<code className="text-cyan-300 bg-slate-800 px-1 py-0.5 rounded text-xs">C:\Windows\System32</code>, <code className="text-cyan-300 bg-slate-800 px-1 py-0.5 rounded text-xs">WinSxS</code>, <code className="text-cyan-300 bg-slate-800 px-1 py-0.5 rounded text-xs">pagefile.sys</code>, Registry hives).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-xs font-bold text-emerald-400 block">Recycle Bin-First</span>
            <p className="text-xs text-slate-300">Cleanups are sent to the Windows Recycle Bin using native Win32 APIs, allowing 100% reversible recovery.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-xs font-bold text-cyan-400 block">Zero Telemetry</span>
            <p className="text-xs text-slate-300">Scanning and duplicate matching operate completely offline on your PC. No file paths or names are ever uploaded.</p>
          </div>
        </div>
      </section>

      {/* Technical FAQ */}
      <section className="px-6 max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center">Windows Technical FAQ</h2>
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Does DiskWarren require Administrator privileges?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No. Standard drive analysis, user temp cleanup, developer caches, duplicate detection, and personal file management run entirely under standard user permissions. Administrator elevation is only requested if you explicitly choose to clean system-wide Windows Update caches.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">How does DiskWarren handle Docker and WSL2 virtual disks?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              WSL2 and Docker create dynamic VHDX virtual hard disks (<code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">ext4.vhdx</code>). Even if you delete Docker images inside Linux, Windows doesn't reclaim the host disk space. DiskWarren measures the actual physical size vs inside allocation and provides automated safe compaction instructions via <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">wsl --compact</code>.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Can I recover files deleted by DiskWarren?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes. All file cleanups route through the Windows Recycle Bin by default. You can open the Windows Recycle Bin at any time and click "Restore" to recover any item.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="px-6 max-w-4xl mx-auto text-center p-10 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white space-y-6 shadow-xl shadow-cyan-600/20">
        <h2 className="text-3xl font-extrabold">Ready to reclaim gigabytes on your PC?</h2>
        <p className="text-cyan-100 text-sm max-w-xl mx-auto">
          Download DiskWarren for Windows. Fast, private, and designed for developers and power users.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://github.com/saiphy01/DiskWarren/releases"
            className="px-8 py-3.5 rounded-xl bg-white text-cyan-900 font-bold text-sm hover:bg-cyan-50 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Download v1.0 Preview (Free)
          </a>
          <Link
            href="/pricing"
            className="px-6 py-3.5 rounded-xl bg-cyan-700/60 hover:bg-cyan-700 text-white font-semibold text-sm border border-cyan-400/40 transition-all cursor-pointer"
          >
            Get Windows Pro License ($9.99)
          </Link>
        </div>
      </section>
    </div>
  );
}
