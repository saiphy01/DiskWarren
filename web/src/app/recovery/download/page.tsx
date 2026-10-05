'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  HardDrive,
  Cpu,
  Lock,
  Hash,
  AlertTriangle
} from 'lucide-react';

export default function RecoveryDownloadPage() {
  const sha256Installer = "ec545f611905c2c0b73201ef64fa0fc2150f2e3f0d1b23321f2e2219d0c29bb8";
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Windows Official Release v1.0.0</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Download DiskWarren Recover
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Free unlimited drive scanning, in-memory file preview, and evidence-based recovery scoring. 
          100% read-only block reads guarantee zero modification to your source drive.
        </p>
      </div>

      {/* Main Download Card - EXE Tile */}
      <div className="max-w-2xl mx-auto bg-white border-2 border-teal-600/30 rounded-2xl p-8 sm:p-10 shadow-xl shadow-teal-500/5 text-center relative overflow-hidden">
        <div className="space-y-6 max-w-xl mx-auto relative z-10">
          <div className="inline-flex p-4 rounded-2xl bg-teal-50 text-teal-600 mb-2 border border-teal-100">
            <Download className="w-10 h-10 animate-bounce" />
          </div>
          
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">
              Official Windows Setup • 64-Bit Native
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              DiskWarrenRecover-Setup.exe
            </h2>
            <p className="text-sm text-slate-500 mt-2 font-mono">
              Version 1.0.0 • Windows 10 &amp; 11 (x64) • Size: 63.1 MB
            </p>
          </div>

          <div className="pt-2">
            <a
              href="/downloads/DiskWarrenRecover-Setup.exe"
              download="DiskWarrenRecover-Setup.exe"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-base transition-all shadow-lg shadow-teal-600/25 active:scale-95 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>Download Free Scanner (.exe)</span>
            </a>
          </div>

          {/* Verification Hash */}
          <div className="pt-4 border-t border-slate-100 text-left space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-teal-600" />
                SHA-256 Checksum:
              </span>
              <button
                onClick={handleCopyInstaller}
                className="flex items-center gap-1 text-teal-700 hover:text-teal-900 font-semibold cursor-pointer"
              >
                {copiedInstaller ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Hash</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700 break-all select-all">
              {sha256Installer}
            </div>
          </div>
        </div>
      </div>

      {/* Safety Instructions Before Running */}
      <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Crucial Safety Guidelines Before Scanning:</span>
        </div>
        <ul className="text-xs text-amber-950 space-y-1.5 list-disc pl-5 leading-relaxed">
          <li><strong>Do not download this installer to the drive you need to recover.</strong> Save it to a separate USB drive or different disk to prevent overwriting deleted sectors.</li>
          <li><strong>Avoid web browsing, app installs, or OS updates</strong> on the affected drive until scanning and recovery are complete.</li>
          <li>If the drive is making clicking noises or showing excessive bad sectors, use the <strong>Disk Imaging</strong> workflow to take a byte-for-byte image before performing deep scans.</li>
        </ul>
      </div>

      {/* Features Included in Free Scanner */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h3 className="text-xl font-bold text-slate-900 text-center">
          What is Included in the Free Scanner?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
            <span className="font-bold text-teal-700 block">Unlimited Scanning</span>
            <p className="text-slate-600">Scan any internal NVMe/SATA SSD, external HDD, USB flash drive, or camera SD card as many times as needed.</p>
          </div>
          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
            <span className="font-bold text-teal-700 block">In-Memory Previews</span>
            <p className="text-slate-600">Preview photos, documents, and video headers inside the application before purchasing a license.</p>
          </div>
          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
            <span className="font-bold text-teal-700 block">500 MB Free Recovery</span>
            <p className="text-slate-600">Test the recovery pipeline by exporting up to 500 MB of intact files with full SHA-256 verification.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
