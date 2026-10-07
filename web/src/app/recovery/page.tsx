'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  HardDrive, 
  AlertTriangle, 
  FileCheck, 
  Cpu, 
  Search, 
  Layers, 
  FileText, 
  Image as ImageIcon, 
  Film, 
  Archive, 
  Lock, 
  FolderCheck, 
  Zap, 
  Info,
  Check,
  X,
  FileCode,
  Eye,
  Hash
} from 'lucide-react';

interface SimulatedCandidate {
  id: string;
  name: string;
  path: string;
  size: string;
  filesystem: string;
  category: 'image' | 'doc' | 'video' | 'archive' | 'system';
  score: number;
  quality: 'Excellent' | 'Very Good' | 'Good' | 'Partial' | 'Poor' | 'Unrecoverable';
  qualityColor: string;
  method: 'Quick Scan (MFT)' | 'Quick Scan (FAT)' | 'Deep Carve' | 'TRIM Zeroed';
  evidence: { type: 'positive' | 'negative'; text: string }[];
  previewAvailable: boolean;
}

const mockCandidates: SimulatedCandidate[] = [
  {
    id: 'c1',
    name: 'DSC_4892_Family_Vacation.jpg',
    path: '\\DCIM\\100CANON\\DSC_4892_Family_Vacation.jpg',
    size: '8.4 MB',
    filesystem: 'exFAT',
    category: 'image',
    score: 96,
    quality: 'Excellent',
    qualityColor: 'text-emerald-700 bg-emerald-50 border-emerald-300',
    method: 'Quick Scan (FAT)',
    evidence: [
      { type: 'positive', text: 'Intact exFAT directory record and original filename' },
      { type: 'positive', text: 'Valid JPEG SOI (0xFFD8) and EOI (0xFFD9) markers' },
      { type: 'positive', text: 'Contiguous cluster chain (100% unfragmented)' },
      { type: 'positive', text: 'Decoded successfully in high-resolution preview sandbox' }
    ],
    previewAvailable: true
  },
  {
    id: 'c2',
    name: 'Annual_Financial_Model_2026.xlsx',
    path: '\\Finance\\Q3\\Annual_Financial_Model_2026.xlsx',
    size: '2.1 MB',
    filesystem: 'NTFS',
    category: 'doc',
    score: 91,
    quality: 'Excellent',
    qualityColor: 'text-emerald-700 bg-emerald-50 border-emerald-300',
    method: 'Quick Scan (MFT)',
    evidence: [
      { type: 'positive', text: 'NTFS MFT record 48201 status: unallocated, zero overwrite' },
      { type: 'positive', text: 'Valid PK Zip container signature (0x504B0304)' },
      { type: 'positive', text: 'Intact [Content_Types].xml and sheet stream definitions' },
      { type: 'positive', text: 'Full extent map verified without gaps' }
    ],
    previewAvailable: true
  },
  {
    id: 'c3',
    name: 'Product_Architecture_Specification.docx',
    path: '\\Engineering\\Docs\\Product_Architecture_Specification.docx',
    size: '940 KB',
    filesystem: 'NTFS',
    category: 'doc',
    score: 82,
    quality: 'Very Good',
    qualityColor: 'text-teal-700 bg-teal-50 border-teal-300',
    method: 'Quick Scan (MFT)',
    evidence: [
      { type: 'positive', text: 'MFT record intact with original path and timestamps' },
      { type: 'positive', text: 'Valid Word document package structure' },
      { type: 'negative', text: '2 fragmented extents detected across volume clusters' }
    ],
    previewAvailable: true
  },
  {
    id: 'c4',
    name: 'Project_Launch_Keynote.mp4',
    path: '\\Videos\\Recorded\\Project_Launch_Keynote.mp4',
    size: '1.45 GB',
    filesystem: 'NTFS',
    category: 'video',
    score: 68,
    quality: 'Partial',
    qualityColor: 'text-amber-700 bg-amber-50 border-amber-300',
    method: 'Deep Carve',
    evidence: [
      { type: 'positive', text: 'Identified ftyp mp42 box at sector offset 0x4B2000' },
      { type: 'positive', text: 'Main h.264 video track headers validated' },
      { type: 'negative', text: 'MFT metadata missing; reconstructed via signature carving' },
      { type: 'negative', text: 'Trailing 15% audio frames overlap with newly allocated file' }
    ],
    previewAvailable: true
  },
  {
    id: 'c5',
    name: 'Client_Backup_Archive.zip',
    path: '\\Backups\\Client_Backup_Archive.zip',
    size: '480 MB',
    filesystem: 'FAT32',
    category: 'archive',
    score: 34,
    quality: 'Poor',
    qualityColor: 'text-rose-700 bg-rose-50 border-rose-300',
    method: 'Deep Carve',
    evidence: [
      { type: 'positive', text: 'Zip local header detected' },
      { type: 'negative', text: 'Central directory record truncated or overwritten' },
      { type: 'negative', text: 'Cluster chain broken after 120 MB' }
    ],
    previewAvailable: false
  },
  {
    id: 'c6',
    name: 'Temporary_Scratch_Cache.dat',
    path: '\\System\\Cache\\Temporary_Scratch_Cache.dat',
    size: '256 MB',
    filesystem: 'NTFS (NVMe SSD)',
    category: 'system',
    score: 0,
    quality: 'Unrecoverable',
    qualityColor: 'text-slate-600 bg-slate-100 border-slate-300',
    method: 'TRIM Zeroed',
    evidence: [
      { type: 'negative', text: 'SSD TRIM command was dispatched upon file deletion' },
      { type: 'negative', text: 'Physical LBAs unmapped by controller; sectors read all zeroes (0x00)' }
    ],
    previewAvailable: false
  }
];

export default function RecoveryLandingPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<SimulatedCandidate>(mockCandidates[0]);
  const [destinationAttempt, setDestinationAttempt] = useState<'safe' | 'blocked' | null>(null);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative pt-12 md:pt-20 px-6 max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>Windows-First Data Recovery Engine • Version 1.0</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1]">
          Recover deleted files safely. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600">
            Without risking your drive.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Professional file and partition restoration for NTFS, FAT32, and exFAT. Built on a strict 100% read-only block architecture that never writes to the source media. Explainable evidence scores and previews before you pay.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/recovery/download"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-base transition-all shadow-md shadow-teal-600/25 flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
          >
            <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Download Free Scanner (All Platforms)</span>
          </Link>
          <Link
            href="/recovery/pricing"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span>View Recovery Plans ($39)</span>
            <ArrowRight className="w-4 h-4 text-teal-600" />
          </Link>
        </div>

        {/* Core Pillars */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 pt-4 font-medium">
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-emerald-600" /> 100% Read-Only Block Engine
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-600" /> Destination Overwrite Protection
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <Hash className="w-4 h-4 text-cyan-600" /> SHA-256 Per-File Verification
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-600" /> No Subscriptions • Lifetime License
          </span>
        </div>
      </section>

      {/* 2. Interactive Recovery Engine & Evidence Score Simulator */}
      <section className="px-6 max-w-7xl mx-auto space-y-8 scroll-mt-24">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Proprietary Evidence-Based Confidence Engine</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            See Recoverable Files Before You Pay a Dime
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Unlike legacy utilities that report misleading recovery percentages, DiskWarren analyzes metadata extents, signature markers, and cluster conflicts to score each file with full transparent evidence.
          </p>
        </div>

        {/* Simulator Frame */}
        <div className="w-full max-w-6xl mx-auto rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden">
          {/* Mock App Header */}
          <div className="bg-slate-900 text-white px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs font-mono font-bold text-slate-200">
                DiskWarren Recover v1.0.0 — PhysicalDrive1 [Kingston DataTraveler 128GB exFAT]
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                READ-ONLY HANDLE: OPEN
              </span>
              <span className="text-slate-400">Scan: 100% Complete</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            {/* Left: Candidates List */}
            <div className="lg:col-span-7 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-teal-600" />
                  <span>Found Candidates ({mockCandidates.length} Items)</span>
                </h3>
                <span className="text-xs text-slate-500 font-mono">Quick Scan &amp; Signature Carving</span>
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {mockCandidates.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => setSelectedCandidate(file)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      selectedCandidate.id === file.id 
                        ? 'bg-teal-50/80 border-teal-400 shadow-xs' 
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                        {file.category === 'image' && <ImageIcon className="w-4 h-4 text-teal-600" />}
                        {file.category === 'doc' && <FileText className="w-4 h-4 text-blue-600" />}
                        {file.category === 'video' && <Film className="w-4 h-4 text-amber-600" />}
                        {file.category === 'archive' && <Archive className="w-4 h-4 text-purple-600" />}
                        {file.category === 'system' && <HardDrive className="w-4 h-4 text-slate-500" />}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-900 block truncate">{file.name}</span>
                        <span className="text-[11px] text-slate-500 font-mono block truncate">{file.path}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border block mb-1 ${file.qualityColor}`}>
                        {file.quality} ({file.score}%)
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{file.size}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Evidence & Confidence Inspector */}
            <div className="lg:col-span-5 p-6 bg-slate-50/60 space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-teal-700 uppercase tracking-widest">
                  Evidence Inspector
                </span>
                <h4 className="text-lg font-bold text-slate-900 truncate">
                  {selectedCandidate.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <span>Size: {selectedCandidate.size}</span>
                  <span>•</span>
                  <span>FS: {selectedCandidate.filesystem}</span>
                </div>
              </div>

              {/* Confidence Gauge */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Recovery Likelihood</span>
                  <span className="font-mono font-bold text-slate-900">{selectedCandidate.score}/100</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      selectedCandidate.score >= 80 ? 'bg-emerald-500' :
                      selectedCandidate.score >= 60 ? 'bg-teal-500' :
                      selectedCandidate.score >= 30 ? 'bg-amber-500' : 'bg-slate-400'
                    }`}
                    style={{ width: `${selectedCandidate.score}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 font-mono">
                  <span>Method: {selectedCandidate.method}</span>
                  <span className="font-semibold text-slate-700">{selectedCandidate.quality}</span>
                </div>
              </div>

              {/* Explainable Evidence Log */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Cryptographic &amp; Extent Evidence:</span>
                <div className="space-y-1.5 text-xs">
                  {selectedCandidate.evidence.map((ev, i) => (
                    <div 
                      key={i} 
                      className={`p-2 rounded-lg border flex items-start gap-2 ${
                        ev.type === 'positive' 
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' 
                          : 'bg-rose-50/60 border-rose-200 text-rose-900'
                      }`}
                    >
                      {ev.type === 'positive' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-rose-600 mt-0.5 shrink-0" />
                      )}
                      <span className="text-[11px] leading-relaxed">{ev.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Destination Safety Interactive Check */}
              <div className="p-3.5 rounded-xl bg-slate-100/90 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">
                  Test Destination Safety Shield:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setDestinationAttempt('blocked')}
                    className="p-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 font-semibold text-slate-700 text-left cursor-pointer"
                  >
                    Select E:\ (Same USB)
                  </button>
                  <button
                    onClick={() => setDestinationAttempt('safe')}
                    className="p-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 font-semibold text-slate-700 text-left cursor-pointer"
                  >
                    Select D:\ (External SSD)
                  </button>
                </div>

                {destinationAttempt === 'blocked' && (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[11px] flex items-start gap-2 animate-in fade-in duration-150">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Same-Device Blocked:</strong> Partition E:\ belongs to the scanned physical disk (PhysicalDrive1). Recovering to the source disk permanently overwrites deleted sectors.
                    </span>
                  </div>
                )}

                {destinationAttempt === 'safe' && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-start gap-2 animate-in fade-in duration-150">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Safe Destination:</strong> Drive D:\ resides on physical drive PhysicalDrive2. Zero risk of overwriting source data. SHA-256 verification enabled.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Honest Reality: HDD vs SSD/TRIM Comparison */}
      <section className="px-6 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-widest">Honest Data Recovery Physics</span>
          <h2 className="text-3xl font-extrabold text-slate-900">How Drive Technology Affects File Recovery</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm">
            We don&apos;t make fraudulent claims like &ldquo;100% guaranteed recovery.&rdquo; Whether a deleted file can be brought back depends strictly on write state, fragmentation, and whether your storage medium supports TRIM.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* HDD & Removable Card Card */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <HardDrive className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">HDDs, USB Flash Drives &amp; SD Cards</h3>
                <span className="text-xs text-emerald-600 font-semibold">High Recovery Likelihood</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              When a file is deleted from a mechanical hard drive, USB thumb drive, or camera SD card, Windows only marks the directory record or cluster allocation bitmap as &ldquo;unallocated.&rdquo;
            </p>

            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Physical Bytes Remain Intact
              </div>
              <p className="text-[11px] leading-relaxed">
                The actual data remains on the magnetic platters or flash blocks until another file is written over those exact clusters. DiskWarren Recover can locate and rebuild these files via MFT reconstruction or signature carving.
              </p>
            </div>
          </div>

          {/* SSD / TRIM Card */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Internal NVMe &amp; SATA SSDs (TRIM)</h3>
                <span className="text-xs text-rose-600 font-semibold">Time-Sensitive Recovery</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Modern SSDs utilize the ATA TRIM or NVMe Deallocate command to maintain sustained write performance. When a file is permanently emptied from the Recycle Bin, Windows alerts the SSD controller.
            </p>

            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                What You Must Do Immediately:
              </div>
              <p className="text-[11px] leading-relaxed">
                Once TRIM and background garbage collection execute, the SSD controller unmaps the sector addresses, returning zeros. <strong>Stop writing to the PC immediately</strong> and scan promptly before idle garbage collection runs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Non-Negotiable Safety Architecture */}
      <section className="px-6 max-w-5xl mx-auto p-8 sm:p-10 rounded-2xl bg-slate-900 text-white space-y-8 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-teal-400">
            <ShieldCheck className="w-6 h-6" />
            <h2 className="text-2xl font-bold">The Non-Negotiable Safety Contract</h2>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
            In inexperienced hands or poorly architected software, data recovery utilities can destroy the very data they seek to rescue. DiskWarren Recover is designed around 4 hardcoded safety barriers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Lock className="w-4 h-4" />
              <span>1. Zero Source Writes</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Physical drives and volumes are opened exclusively with <code className="text-teal-300 bg-slate-900 px-1 py-0.5 rounded text-[11px]">GENERIC_READ</code> handles. The recovery engine exposes no write primitives.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
              <HardDrive className="w-4 h-4" />
              <span>2. Same-Device Hard Stop</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We query Win32 <code className="text-teal-300 bg-slate-900 px-1 py-0.5 rounded text-[11px]">IOCTL_STORAGE_GET_DEVICE_NUMBER</code>. If your chosen export folder belongs to the same physical disk, recovery is blocked 100%.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Hash className="w-4 h-4" />
              <span>3. SHA-256 Hash Verification</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every written file is read back and cryptographically matched against the raw source block digest. Full audit reports verify that restored files are byte-for-byte authentic.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>4. Never Auto-Repair Filesystems</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We never run <code className="text-teal-300 bg-slate-900 px-1 py-0.5 rounded text-[11px]">chkdsk /f</code>, alter partition tables, or format drives. Data recovery extracts files outward; it never modifies the damaged volume.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Two-Tier Scan Strategy: Quick Scan & Deep Signature Carving */}
      <section className="px-6 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-widest">Dual-Engine Scanning</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Two Complementary Recovery Engines</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm">
            Whether you just emptied the Recycle Bin a minute ago or quick-formatted an SD card last week, DiskWarren automatically combines filesystem intelligence with deep block carving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Stage 1: Filesystem-Aware Quick Scan</h3>
                <span className="text-xs text-slate-500 font-mono">NTFS MFT • FAT Directory Tables • exFAT</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Traverses existing filesystem metadata structures in under 60 seconds. Recovers full original directory trees, folder hierarchies, exact file names, creation dates, and contiguous cluster extents.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Preserves full original folder path</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Restores original Unicode and long file names</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Non-resident NTFS data stream extraction</li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Stage 2: Deep Signature Carving</h3>
                <span className="text-xs text-slate-500 font-mono">Raw Sector Parsing • 20+ File Signatures</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              When partition tables or MFT metadata records are destroyed by formatting or corruption, Deep Scan reads unallocated clusters sector-by-sector, recognizing magic headers, footers, and internal container structures.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Photos: JPEG, PNG, GIF, TIFF, RAW (CR2, NEF, ARW)</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Office &amp; PDF: DOCX, XLSX, PPTX, PDF</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Media &amp; Archives: MP4, MOV, MP3, WAV, ZIP, 7Z, RAR</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Disk Imaging for Failing Hard Drives */}
      <section className="px-6 max-w-5xl mx-auto rounded-2xl bg-slate-50 border border-slate-200 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
            <HardDrive className="w-3.5 h-3.5 text-amber-700" />
            <span>Hardware Health &amp; Disk Imaging</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            Is Your Drive Clicking or Throwing Read Errors?
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Repeatedly scanning a physically degrading hard drive causes irreversible head crashes. DiskWarren allows you to create a raw byte-for-byte disk image (.raw / .dd), safely skipping damaged sectors, then perform all scans against the image file offline.
          </p>
        </div>
        <div className="shrink-0 text-center sm:text-right space-y-2">
          <Link
            href="/recovery/features#imaging"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all"
          >
            <span>Learn About Disk Imaging</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-[11px] text-slate-400 block font-mono">Included in Technician Edition</span>
        </div>
      </section>

      {/* 7. Transparent Pricing Overview */}
      <section className="px-6 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-widest">Fair Commercial Model</span>
          <h2 className="text-3xl font-extrabold text-slate-900">No Sneaky Subscriptions. Own Your License.</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm">
            Scan and preview everything completely free. Upgrade only when you are satisfied that your files are healthy and ready to export.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Free Card */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Community Edition</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">$0</span>
                <span className="text-xs text-slate-500">free forever</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scan any drive, inspect evidence confidence scores, and preview files to verify integrity before purchase.
              </p>
              <ul className="text-xs text-slate-700 space-y-2.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Unlimited Quick &amp; Deep Scanning</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Full In-Memory File Previews</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Transparent Recovery Health Scoring</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Recover up to 500 MB for free</li>
              </ul>
            </div>
            <Link
              href="/recovery/download"
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs text-center transition-all block"
            >
              Download Free Scanner
            </Link>
          </div>

          {/* Pro Card (Hero) */}
          <div className="p-8 rounded-2xl bg-white border-2 border-teal-600 shadow-xl shadow-teal-600/10 flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-teal-600 text-white text-[10px] font-bold uppercase tracking-wider">
              Most Popular • Perpetual
            </div>
            <div className="space-y-4">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">DiskWarren Recover Pro</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">$39</span>
                <span className="text-xs text-slate-500 font-medium">one-time payment</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Perpetual license for individuals and home offices. Unlimited recovery volume for all your personal drives.
              </p>
              <ul className="text-xs text-slate-700 space-y-2.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600 font-bold" /> <strong>Unlimited File Recovery Volume</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> Advanced Fragmented File Reconstruction</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> NTFS, FAT32, exFAT Lost Partitions</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> SHA-256 Audit Verification Reports</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> Lifetime License with Free v1.x Updates</li>
              </ul>
            </div>
            <Link
              href="/recovery/pricing"
              className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs text-center shadow-md shadow-teal-600/25 transition-all block"
            >
              Get Pro License ($39)
            </Link>
          </div>

          {/* Technician Card */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Technician Edition</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">$149</span>
                <span className="text-xs text-slate-500">lifetime license</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                For IT repair shops, freelancers, and managed service providers recovering client machines.
              </p>
              <ul className="text-xs text-slate-700 space-y-2.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> Multiple Client PCs &amp; Portable USB mode</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> Raw Byte-for-Byte Disk Imaging Engine</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> Virtual Image Mount &amp; Offline Scan</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> White-Label PDF Forensic Reports</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> Priority Engineering Support</li>
              </ul>
            </div>
            <Link
              href="/recovery/pricing"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center transition-all block"
            >
              Get Technician ($149)
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Technical FAQ Section */}
      <section className="px-6 max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Why does DiskWarren block recovering to the same drive?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When a file is deleted, its sectors remain on disk until overwritten. If you recover files back to the same drive, the newly written files will write directly over the very sectors you are trying to recover! DiskWarren queries physical drive geometry to guarantee that the destination is on a separate physical disk.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Does DiskWarren require Administrator elevation?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes, physical disk access and raw sector reading via Win32 <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">\\.\PhysicalDriveX</code> require Windows Administrator permissions. DiskWarren uses this privilege exclusively to open read-only handles and never installs background kernel services.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Can I recover files from a quick-formatted drive?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes. A Quick Format only rewrites the root filesystem tables (like the NTFS Master File Table or FAT allocation table) and marks the rest as empty space. It does not overwrite file clusters. Our Deep Signature Carving engine reads raw clusters to extract photos, documents, videos, and archives without needing the original filesystem table.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Are my recovered files or filenames uploaded to your servers?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never. DiskWarren operates on a strict zero-knowledge, offline-first architecture. All scanning, metadata traversal, carving, preview generation, and SHA-256 verification execute 100% locally on your PC. No filenames, folder paths, or file contents are ever transmitted over the network.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Final CTA Box */}
      <section className="px-6 max-w-4xl mx-auto text-center p-10 rounded-2xl bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 text-white space-y-6 shadow-xl shadow-teal-900/20">
        <h2 className="text-3xl font-extrabold">Ready to rescue your lost data safely?</h2>
        <p className="text-teal-100 text-sm max-w-xl mx-auto">
          Download DiskWarren Recover for Windows, macOS, Android, and iOS. Run a free scan, preview your files, and see exact recovery confidence scores.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/recovery/download"
            className="px-8 py-3.5 rounded-xl bg-white text-teal-900 font-bold text-sm hover:bg-teal-50 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Download Free Scanner
          </Link>
          <Link
            href="/recovery/pricing"
            className="px-6 py-3.5 rounded-xl bg-teal-600/60 hover:bg-teal-600 text-white font-semibold text-sm border border-teal-400/40 transition-all cursor-pointer"
          >
            View Pro License ($39)
          </Link>
        </div>
      </section>
    </div>
  );
}
