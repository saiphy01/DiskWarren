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
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Cpu
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
          Find what&apos;s filling your PC. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600">
            Clean safely.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Drive-by-drive NTFS analysis, interactive squarified treemaps, and deep intelligence for Visual Studio, NuGet, Docker WSL2, npm, and Steam shader caches. All cleanups route through the Windows Recycle Bin first.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/windows/download"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-base transition-all shadow-md shadow-cyan-600/25 flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
          >
            <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Download for Windows (x64)</span>
          </Link>
          <Link
            href="/windows/pricing"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span>View Windows Pro ($9.99)</span>
            <ArrowRight className="w-4 h-4 text-cyan-600" />
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 pt-4 font-medium">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-cyan-600" /> Windows 10 &amp; 11 (64-bit / ARM64)
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
              <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200">
                82% Used
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full" style={{ width: '82%' }}></div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Windows updates, Visual Studio packages, and WSL2 images account for over 180 GB of consumption.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Games &amp; Data (D:) — 1.8 TB</h3>
                  <span className="text-xs text-slate-500 font-mono">NTFS • SATA SSD</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                48% Used
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full rounded-full" style={{ width: '48%' }}></div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Steam shader caches, unlinked workshop mods, and redundant installation packages.
            </p>
          </div>
        </div>
      </section>

      {/* Developer & Gaming Ecosystem Intelligence */}
      <section className="px-6 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-cyan-700 uppercase tracking-widest">Windows Ecosystem Intelligence</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Targeting the Actual Bloat on Windows PCs</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm">
            Modern PCs don&apos;t run out of space because of temporary internet files. They get overwhelmed by IDE caches, container virtual disks, and shader pre-compilations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Visual Studio &amp; .NET</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Global NuGet package caches in <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded text-[11px]">%USERPROFILE%\.nuget\packages</code>, hidden <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded text-[11px]">.vs</code> solution states, and diagnostic profiling memory dumps.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> NuGet Global Packages</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> .vs Solution State Caches</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> MSBuild bin &amp; obj artifacts</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Docker &amp; WSL2</h3>
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
            <h3 className="text-lg font-bold text-slate-900">Gaming &amp; Steam</h3>
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
              WSL2 and Docker create dynamic VHDX virtual hard disks (<code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">ext4.vhdx</code>). Even if you delete Docker images inside Linux, Windows doesn&apos;t reclaim the host disk space. DiskWarren measures the actual physical size vs inside allocation and provides automated safe compaction instructions via <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">wsl --compact</code>.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Can I recover files deleted by DiskWarren?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes. All file cleanups route through the Windows Recycle Bin by default. You can open the Windows Recycle Bin at any time and click &ldquo;Restore&rdquo; to recover any item.
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
          <Link
            href="/windows/download"
            className="px-8 py-3.5 rounded-xl bg-white text-cyan-900 font-bold text-sm hover:bg-cyan-50 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Download Free for Windows
          </Link>
          <Link
            href="/windows/pricing"
            className="px-6 py-3.5 rounded-xl bg-cyan-700/60 hover:bg-cyan-700 text-white font-semibold text-sm border border-cyan-400/40 transition-all cursor-pointer"
          >
            Get Windows Pro License ($9.99)
          </Link>
        </div>
      </section>
    </div>
  );
}
