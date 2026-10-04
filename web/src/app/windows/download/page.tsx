'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Download, 
  ShieldCheck, 
  Terminal, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Info, 
  HardDrive,
  Cpu,
  RefreshCw
} from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export default function WindowsDownloadPage() {
  const sha256Installer = "7362425d5a1f624fdc5f4c1692996c7d05d0f18f7a046a01583730f7788706c2";
  const [copiedInstaller, setCopiedInstaller] = useState(false);

  const handleCopyInstaller = () => {
    navigator.clipboard.writeText(sha256Installer);
    setCopiedInstaller(true);
    setTimeout(() => setCopiedInstaller(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <HardDrive className="w-4 h-4 text-blue-600" />
          <span>Windows Official Release v1.0.0</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Download DiskWarren for Windows
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          High-speed NTFS storage intelligence, Squarified Treemap partition analysis, and reversible developer cleanup. 
          Starts install upon opening. Automatically uninstalls previous versions and updates seamlessly.
        </p>
      </div>

      {/* Main Download Card - EXE Tile Only */}
      <div className="max-w-2xl mx-auto bg-white border-2 border-blue-600/30 rounded-2xl p-8 sm:p-10 shadow-xl shadow-blue-500/5 text-center relative overflow-hidden">
        <div className="space-y-6 max-w-xl mx-auto relative z-10">
          <div className="inline-flex p-4 rounded-2xl bg-blue-50 text-blue-600 mb-2 border border-blue-100">
            <Download className="w-10 h-10 animate-bounce" />
          </div>
          
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
              Official Windows Release • 1-Click Setup
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              DiskWarren Setup (.exe)
            </h2>
          </div>
          
          <p className="text-sm text-slate-600 leading-relaxed">
            Starts installation immediately upon opening. Automatically detects and cleanly uninstalls any previous version before installing the latest update.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-600">
            <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
              Windows 10 &amp; Windows 11
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
              64-bit (x64) &amp; ARM64
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
              Size: ~62.9 MB EXE
            </span>
          </div>

          <div className="pt-2">
            <a
              href="/downloads/DiskWarren-Setup-1.0.0.exe"
              download="DiskWarren-Setup-1.0.0.exe"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base transition-all shadow-md shadow-blue-600/25 active:scale-95 cursor-pointer"
            >
              <Download className="w-5 h-5 stroke-[2.5]" />
              <span>Download DiskWarren-Setup.exe</span>
            </a>
          </div>

          <p className="text-xs text-slate-500">
            Free disk scan &amp; interactive treemap exploration included. Desktop &amp; Start Menu shortcuts created automatically.
          </p>
        </div>

        {/* SHA-256 Checksum Box */}
        <div className="mt-8 pt-8 border-t border-slate-200 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-600" />
              Cryptographic SHA-256 Checksum Verification (.exe)
            </span>
            <button
              onClick={handleCopyInstaller}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
            >
              {copiedInstaller ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Hash</span>
                </>
              )}
            </button>
          </div>
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-blue-400 break-all select-all shadow-inner">
            {sha256Installer}
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            Verify integrity in PowerShell: <code className="text-blue-800 bg-blue-50 px-1 py-0.5 rounded border border-blue-200/60">Get-FileHash DiskWarren-Setup-1.0.0.exe -Algorithm SHA256</code>
          </p>
        </div>
      </div>

      {/* Terminal / WinGet Installation */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-slate-800 text-blue-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Install via Windows Package Manager (WinGet)</h3>
            <p className="text-xs text-slate-400">Automate your Windows workstation setup in one command</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-1.5">Official WinGet Community Repository:</span>
            <CodeBlock code="winget install DiskWarren.DiskWarren" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-1.5">PowerShell silent install:</span>
            <CodeBlock code="winget install DiskWarren.DiskWarren --silent --accept-package-agreements" />
          </div>
        </div>
      </div>

      {/* Windows Safety & Integrity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">Win32 Recycle Bin Safety</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All user and developer cleanups route through Win32 <code className="text-slate-800 font-mono">SHFileOperationW</code> with undo support. Reversible anytime from your desktop Recycle Bin.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">System32 Write-Block</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Immutable safety gate permanently blocks access to <code className="text-slate-800 font-mono">C:\Windows\System32</code>, <code className="text-slate-800 font-mono">WinSxS</code>, and system pagefiles.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">Native .NET 8 Performance</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Zero Chromium bloat. Starts up in under 200ms and utilizes native Win32 NTFS metadata enumeration for lightning-fast scan speeds.
          </p>
        </div>
      </div>

      {/* Verification Instructions */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" />
          How to Verify the SHA-256 Checksum on Windows
        </h3>
        <p className="text-sm text-slate-600">
          Open PowerShell in your Downloads folder and run the built-in <code className="text-slate-800 font-mono font-semibold">Get-FileHash</code> command:
        </p>
        <CodeBlock code="Get-FileHash -Algorithm SHA256 .\DiskWarren-Setup-1.0.0.exe" />
        <p className="text-xs text-slate-500">
          Compare the output hash against the string listed above. If the hashes match exactly, your installer binary is 100% authentic and uncorrupted.
        </p>
      </div>
    </div>
  );
}
