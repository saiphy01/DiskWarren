'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Layers, 
  Search, 
  HardDrive, 
  FileCheck, 
  Cpu, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  FolderTree, 
  Eye, 
  Hash, 
  ShieldCheck,
  FileText,
  Image as ImageIcon,
  Film,
  Archive
} from 'lucide-react';

export default function RecoveryFeaturesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Layers className="w-3.5 h-3.5 text-teal-600" />
          <span>Technical Architecture &amp; Engines</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Engineered for True Recovery Precision
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          DiskWarren Recover pairs deep filesystem metadata reconstruction with raw sector signature carving. 
          Discover how our dual-engine architecture rescues lost files across internal and external media.
        </p>
      </div>

      {/* Feature Block 1: Filesystem Engine */}
      <section className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <FolderTree className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Filesystem-Aware Quick Scan Engine</h2>
            <span className="text-xs text-teal-700 font-mono font-semibold">NTFS • FAT12/16/32 • exFAT</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          When files are deleted, Windows doesn&apos;t erase the data sectors immediately. Instead, it marks directory records or cluster allocation tables as unallocated. Our filesystem engine reads these structures directly from disk without OS interference.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-900 block">NTFS Master File Table (MFT)</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Parses <code className="bg-white px-1 py-0.5 rounded border text-[10px]">$MFT</code> records, extracting <code className="bg-white px-1 py-0.5 rounded border text-[10px]">$FILE_NAME</code>, resident data streams, non-resident cluster runs, and orphan parent folder linkages.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-900 block">exFAT Directory Traversal</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Traverses exFAT File and Stream Extension entries. Follows contiguous allocation flags to immediately recover unfragmented camera files without cluster walk latency.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-900 block">FAT12/16/32 Cluster Chains</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Decodes 8.3 and Long File Name (LFN) directory entries. Traces cluster chains through the File Allocation Table while testing for cluster reuse by active files.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Block 2: Deep Signature Carving */}
      <section className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Deep Signature Carving Engine</h2>
            <span className="text-xs text-cyan-700 font-mono font-semibold">Raw Sector Scanning • 20+ Validated Signatures</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          When a partition has been formatted or the filesystem directory tables are severely corrupted, our carving engine scans raw sectors sequentially, matching magic byte headers, footers, and internal container structures.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 text-teal-700 font-bold">
              <ImageIcon className="w-4 h-4" />
              <span>Photos &amp; RAW</span>
            </div>
            <p className="text-[11px] text-slate-600">JPEG, PNG, GIF, TIFF, BMP, WebP, and camera RAW (Canon CR2/CR3, Nikon NEF, Sony ARW).</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 text-blue-700 font-bold">
              <FileText className="w-4 h-4" />
              <span>Documents &amp; PDF</span>
            </div>
            <p className="text-[11px] text-slate-600">Microsoft Office (DOCX, XLSX, PPTX), Adobe PDF, RTF, and plain text UTF-8/UTF-16.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 text-amber-700 font-bold">
              <Film className="w-4 h-4" />
              <span>Video &amp; Audio</span>
            </div>
            <p className="text-[11px] text-slate-600">MP4, MOV, MKV, AVI, MP3, WAV, FLAC, and AAC container structures.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 text-purple-700 font-bold">
              <Archive className="w-4 h-4" />
              <span>Archives &amp; Data</span>
            </div>
            <p className="text-[11px] text-slate-600">ZIP, 7Z, RAR, TAR, GZ, and SQLite database file headers.</p>
          </div>
        </div>
      </section>

      {/* Feature Block 3: Disk Imaging */}
      <section id="imaging" className="p-8 sm:p-10 rounded-2xl bg-slate-900 text-white space-y-6 shadow-xl scroll-mt-24">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-800 text-teal-400 flex items-center justify-center">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Raw Byte-for-Byte Disk Imaging</h2>
            <span className="text-xs text-teal-400 font-mono">Forensic .RAW / .DD Disk Cloning</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Designed specifically for drives with degrading physical media. Instead of stressing unstable read heads with repetitive random seeks during deep scans, DiskWarren clones the drive into an exact raw image in a single pass.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
            <span className="font-bold text-teal-400 block">Bad-Sector Skipping</span>
            <p className="text-slate-300 text-[11px]">Skips unreadable blocks after configurable timeouts, maintaining imaging forward progress.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
            <span className="font-bold text-teal-400 block">Virtual Image Scanning</span>
            <p className="text-slate-300 text-[11px]">Mount and scan .raw / .dd files identically to physical media without keeping the failing drive connected.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
            <span className="font-bold text-teal-400 block">Sector Defect Map</span>
            <p className="text-slate-300 text-[11px]">Records a forensic bad-sector map, highlighting which file clusters were affected by physical damage.</p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="text-center space-y-4 pt-8 border-t border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900">Try Our Recovery Engine Free</h3>
        <p className="text-xs text-slate-600 max-w-lg mx-auto">
          Download DiskWarren Recover for Windows. Fast, safe, and transparent.
        </p>
        <div className="pt-2">
          <Link
            href="/recovery/download"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Free Scanner</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
