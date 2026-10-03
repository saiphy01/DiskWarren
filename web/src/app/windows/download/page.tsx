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
  RefreshCw,
  FolderArchive
} from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export default function WindowsDownloadPage() {
  const sha256Installer = "1868057cae96ef4665079895a2a5bf55e055b9c2c93db35d36f0f7aabe4d85f9";
  const sha256Portable = "8e6ceb7580cd9974d17b7512a2fcf05aa82f83e0525574493e41e1d245c5d943";
  const [copiedInstaller, setCopiedInstaller] = useState(false);
  const [copiedPortable, setCopiedPortable] = useState(false);

  const handleCopyInstaller = () => {
    navigator.clipboard.writeText(sha256Installer);
    setCopiedInstaller(true);
    setTimeout(() => setCopiedInstaller(false), 2000);
  };

  const handleCopyPortable = () => {
    navigator.clipboard.writeText(sha256Portable);
    setCopiedPortable(true);
    setTimeout(() => setCopiedPortable(false), 2000);
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
          100% native .NET 8, air-gapped local indexing, and zero third-party telemetry.
        </p>
      </div>

      {/* Main Download Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* MSI Installer Card */}
        <div className="bg-white border-2 border-blue-600/30 rounded-2xl p-8 shadow-xl shadow-blue-500/5 text-center relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-6">
            <div className="inline-flex p-4 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
              <Download className="w-8 h-8 animate-bounce" />
            </div>
            
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Recommended for most users</span>
              <h2 className="text-2xl font-bold text-slate-900">
                DiskWarren Installer (.msi)
              </h2>
            </div>
            
            <p className="text-sm text-slate-600">
              Full desktop installation with Start Menu shortcuts, Windows 11 context menu integration, and automatic update notifications.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-600 pt-2">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                x64 &amp; ARM64 (Copilot+ PCs)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                Windows 10 &amp; Windows 11
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                Size: ~61.8 MB MSI
              </span>
            </div>

            <div className="pt-2">
              <a
                href="/downloads/DiskWarren-Setup-1.0.0.msi"
                download="DiskWarren-Setup-1.0.0.msi"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-600/25 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>Download Windows Installer (.msi)</span>
              </a>
            </div>

            {/* SHA-256 Checksum */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-left">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  SHA-256 Checksum (MSI)
                </span>
                <button
                  onClick={handleCopyInstaller}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors"
                >
                  {copiedInstaller ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="font-mono text-[11px] text-slate-600 break-all select-all bg-white p-2 rounded border border-slate-200/80">
                {sha256Installer}
              </p>
            </div>
          </div>
        </div>

        {/* Portable Zip Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg shadow-slate-200/40 text-center relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-6">
            <div className="inline-flex p-4 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200">
              <FolderArchive className="w-8 h-8" />
            </div>
            
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Zero-Installation Portable</span>
              <h2 className="text-2xl font-bold text-slate-900">
                Portable Edition (.zip)
              </h2>
            </div>
            
            <p className="text-sm text-slate-600">
              Self-contained executable. Extract to any directory or USB drive and run without registry modification or admin installer privileges.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-600 pt-2">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                Single Folder Self-Contained
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                No Admin Setup Needed
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                Size: ~63.4 MB
              </span>
            </div>

              <div className="pt-2">
                <a
                  href="/downloads/DiskWarren-v1.0.0-win-x64-portable.zip"
                  download="DiskWarren-v1.0.0-win-x64-portable.zip"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-lg shadow-slate-900/10 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Portable (.zip)</span>
                </a>
              </div>

              {/* SHA-256 Checksum */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    SHA-256 Checksum
                  </span>
                  <button
                    onClick={handleCopyPortable}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors"
                  >
                    {copiedPortable ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="font-mono text-[11px] text-slate-600 break-all select-all bg-white p-2 rounded border border-slate-200/80">
                  {sha256Portable}
                </p>
              </div>
            </div>
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
        <CodeBlock code="Get-FileHash -Algorithm SHA256 .\DiskWarren-Setup-1.0.0.msi" />
        <p className="text-xs text-slate-500">
          Compare the output hash against the string listed above. If the hashes match exactly, your installer binary is 100% authentic and uncorrupted.
        </p>
      </div>
    </div>
  );
}
