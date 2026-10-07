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
  AlertTriangle,
  Monitor,
  Smartphone,
  Laptop,
  Cable,
  CheckCircle,
  FileCheck
} from 'lucide-react';

type PlatformId = 'windows' | 'mac' | 'android' | 'ios';

interface PlatformDetails {
  id: PlatformId;
  name: string;
  tagline: string;
  fileName: string;
  fileSize: string;
  osReqs: string;
  downloadUrl: string;
  sha256: string;
  features: string[];
  notes?: string;
}

const PLATFORM_DATA: Record<PlatformId, PlatformDetails> = {
  windows: {
    id: 'windows',
    name: 'Windows',
    tagline: 'Official 64-Bit Desktop Release',
    fileName: 'DiskWarrenRecover-Setup.exe',
    fileSize: '68.4 MB',
    osReqs: 'Windows 10 & 11 (64-bit) • .NET 8 Desktop Runtime Embedded',
    downloadUrl: '/downloads/DiskWarrenRecover-Setup.exe',
    sha256: 'e49116fa905a2a9ee552dc54646894e81f28371ee57f08bc75fb901c5b7efde8',
    features: [
      'Direct raw sector block carving for SD cards, USBs, and internal SSDs',
      'Full atom parser for MP4/MOV videos with intact moov headers',
      'Exact byte-boundary carving for JPEG, PNG, ZIP, DOCX, XLSX, and PDF',
      'Binary $I/$R Recycle Bin parser and NTFS MFT record reconstructor',
      'Non-blocking background export with real-time speed and progress reporting'
    ]
  },
  mac: {
    id: 'mac',
    name: 'macOS',
    tagline: 'Universal Binary for Apple Silicon & Intel',
    fileName: 'DiskWarrenRecover-1.0.0.dmg',
    fileSize: '2.1 MB',
    osReqs: 'macOS Sonoma, Ventura, Monterey • Apple Silicon (M1-M4) & Intel 64-bit',
    downloadUrl: '/downloads/DiskWarrenRecover-1.0.0.dmg',
    sha256: '4f3eb75bec9515973719b2df80e980a749e901e31571b32d76e417a2eff30bed',
    features: [
      'APFS Local Snapshot traversal & unallocated space scanner',
      'HFS+ Journal catalog reconstruction & deleted inode carver',
      'Read-only raw block mounting for external camera memory cards',
      'Apple Silicon hardware-accelerated signature matching',
      'Hardened runtime with Apple Developer ID signing and notarization'
    ]
  },
  android: {
    id: 'android',
    name: 'Android',
    tagline: 'Direct Storage Intelligence APK',
    fileName: 'DiskWarrenRecover-v1.0.0.apk',
    fileSize: '2.1 MB',
    osReqs: 'Android 10 through 15 (ARM64 & x86_64) • No Root Required',
    downloadUrl: '/downloads/DiskWarrenRecover-v1.0.0.apk',
    sha256: 'a4723bfe31dbb434473b4d8507c347bd7a55fcdf61ed9ec6842fb13cb5c837bd',
    features: [
      'MediaStore Trash & scoped storage bin parser',
      'Hidden .trash and .thumbnails cache reconstructor',
      'LOST.DIR recovery for corrupted MicroSD and OTG flash drives',
      'Deep carving for WhatsApp, Telegram, and camera media',
      'Zero root modification: 100% compliant with Android permission model'
    ]
  },
  ios: {
    id: 'ios',
    name: 'iOS (iPhone / iPad)',
    tagline: 'Tethered USB Desktop Carving Station',
    fileName: 'DiskWarren Recover Desktop (Tethered Engine)',
    fileSize: 'Included with Desktop App',
    osReqs: 'iOS 12 through iOS 18 (All iPhone & iPad Models)',
    downloadUrl: '/downloads/DiskWarrenRecover-Setup.exe',
    sha256: 'e49116fa905a2a9ee552dc54646894e81f28371ee57f08bc75fb901c5b7efde8',
    features: [
      'Apple AFC (Apple File Conduit) raw USB tethering protocol',
      'Recovers deleted Camera Roll photos, 4K videos, and Live Photos',
      'Extracts unencrypted iTunes & local device backup databases',
      'Restores deleted WhatsApp, iMessage, and Notes attachments',
      'Zero jailbreak required: 100% read-only connection preserves warranty'
    ]
  }
};

export default function RecoveryDownloadPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>('windows');
  const [copiedHash, setCopiedHash] = useState(false);

  const active = PLATFORM_DATA[selectedPlatform];

  const handleCopyHash = () => {
    navigator.clipboard.writeText(active.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Official Cross-Platform Release v1.0.0</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Download DiskWarren Recover
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Deep block-level data recovery engine with PhotoRec-grade signature carving. 
          Choose your operating system below for 1-click direct download.
        </p>
      </div>

      {/* 1-Click Platform Selector Bar */}
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200">
          <button
            onClick={() => { setSelectedPlatform('windows'); setCopiedHash(false); }}
            className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              selectedPlatform === 'windows'
                ? 'bg-white text-teal-700 shadow-md shadow-slate-200/80 border border-teal-500/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Windows</span>
          </button>

          <button
            onClick={() => { setSelectedPlatform('mac'); setCopiedHash(false); }}
            className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              selectedPlatform === 'mac'
                ? 'bg-white text-teal-700 shadow-md shadow-slate-200/80 border border-teal-500/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>macOS</span>
          </button>

          <button
            onClick={() => { setSelectedPlatform('android'); setCopiedHash(false); }}
            className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              selectedPlatform === 'android'
                ? 'bg-white text-teal-700 shadow-md shadow-slate-200/80 border border-teal-500/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Android</span>
          </button>

          <button
            onClick={() => { setSelectedPlatform('ios'); setCopiedHash(false); }}
            className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              selectedPlatform === 'ios'
                ? 'bg-white text-teal-700 shadow-md shadow-slate-200/80 border border-teal-500/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Cable className="w-4 h-4" />
            <span>iOS (iPhone)</span>
          </button>
        </div>
      </div>

      {/* Main Download Card */}
      {selectedPlatform !== 'ios' ? (
        <div className="max-w-2xl mx-auto bg-white border-2 border-teal-600/30 rounded-2xl p-8 sm:p-10 shadow-xl shadow-teal-500/5 text-center relative overflow-hidden transition-all">
          <div className="space-y-6 max-w-xl mx-auto relative z-10">
            <div className="inline-flex p-4 rounded-2xl bg-teal-50 text-teal-600 mb-1 border border-teal-100">
              <Download className="w-10 h-10 animate-bounce" />
            </div>
            
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">
                {active.tagline}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {active.fileName}
              </h2>
              <p className="text-sm text-slate-500 mt-2 font-mono">
                {active.osReqs} • Size: {active.fileSize}
              </p>
            </div>

            <div className="pt-2">
              <a
                href={active.downloadUrl}
                download={active.fileName}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-base transition-all shadow-lg shadow-teal-600/25 active:scale-95 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>Download for {active.name}</span>
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
                  onClick={handleCopyHash}
                  className="flex items-center gap-1 text-teal-700 hover:text-teal-900 font-semibold cursor-pointer"
                >
                  {copiedHash ? (
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
                {active.sha256}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* iOS Station Card */
        <div className="max-w-3xl mx-auto bg-white border-2 border-teal-600/30 rounded-2xl p-8 sm:p-10 shadow-xl shadow-teal-500/5 text-left relative overflow-hidden transition-all space-y-8">
          <div className="text-center sm:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200">
              <Cable className="w-4 h-4" />
              <span>Apple Hardware Security &amp; Sandbox Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              iPhone &amp; iPad Data Recovery via USB Tethering
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Due to Apple iOS Sandbox enforcement and hardware File-Based Encryption (FBE), 
              third-party apps cannot access or carve raw flash storage directly on an iOS device. 
              Like all leading recovery tools (Disk Drill, PhotoRec, Tenorshare), DiskWarren recovers 
              iOS devices by connecting your iPhone to a Windows PC or Mac via USB.
            </p>
          </div>

          {/* 1-Click Action Buttons for iOS Recovery */}
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Download className="w-4 h-4 text-teal-600" />
              <span>Step 1: Download the Desktop Recovery Station for Your Computer:</span>
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="/downloads/DiskWarrenRecover-Setup.exe"
                download="DiskWarrenRecover-Setup.exe"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Monitor className="w-4 h-4" />
                <span>Download Windows App (for iPhone)</span>
              </a>
              <a
                href="/downloads/DiskWarrenRecover-1.0.0.dmg"
                download="DiskWarrenRecover-1.0.0.dmg"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Laptop className="w-4 h-4" />
                <span>Download macOS App (for iPhone)</span>
              </a>
            </div>
          </div>

          {/* 3-Step Tethering Walkthrough */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              Step 2: Connect and Recover in 3 Easy Steps:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                <span className="font-bold text-teal-700 block text-sm">1. Connect via Cable</span>
                <p className="text-slate-600">Attach your iPhone or iPad to your computer using a genuine Lightning or USB-C cable.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                <span className="font-bold text-teal-700 block text-sm">2. Trust Computer</span>
                <p className="text-slate-600">Unlock your iPhone and tap <strong>Trust This Computer</strong> when prompted on your screen.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                <span className="font-bold text-teal-700 block text-sm">3. Deep Carve Media</span>
                <p className="text-slate-600">Select your iPhone in DiskWarren Recover to preview and restore deleted photos, 4K videos, and messages.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Platform Feature Capabilities Matrix */}
      <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-teal-600" />
          <span>{active.name} Recovery Capabilities:</span>
        </h3>
        <ul className="space-y-2.5">
          {active.features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pre-Recovery Safety Guardrails */}
      <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Essential Data Safety Rules Before Scanning:</span>
        </div>
        <ul className="text-xs text-amber-950 space-y-1.5 list-disc pl-5 leading-relaxed">
          <li><strong>Never download or save recovered files onto the affected drive.</strong> Always specify a separate secondary disk, external drive, or USB thumbdrive to avoid sector overwrites.</li>
          <li><strong>Halt background writes:</strong> Close web browsers, torrents, and cloud sync tools (OneDrive, Google Drive, iCloud) on the source drive during the scan.</li>
          <li><strong>100% Read-Only Safety Shield:</strong> DiskWarren opens physical devices in read-only mode, guaranteeing zero write operations on the original media.</li>
        </ul>
      </div>

      {/* Free Scanner Inclusions */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h3 className="text-xl font-bold text-slate-900 text-center">
          Included in the Free Evaluation Tier
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
            <span className="font-bold text-teal-700 block text-sm">Unlimited Scanning</span>
            <p className="text-slate-600">Scan any internal NVMe/SATA SSD, external HDD, USB flash drive, or camera SD card as many times as needed.</p>
          </div>
          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
            <span className="font-bold text-teal-700 block text-sm">In-Memory Previews</span>
            <p className="text-slate-600">Preview photos, documents, and video headers inside the application before committing to full recovery.</p>
          </div>
          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
            <span className="font-bold text-teal-700 block text-sm">500 MB Free Recovery</span>
            <p className="text-slate-600">Test the complete end-to-end recovery pipeline by exporting up to 500 MB of intact files with full SHA-256 verification.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
