'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, HardDrive, CheckCircle2, Download, Layers } from 'lucide-react';

export default function RecoverySystemRequirementsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Cpu className="w-3.5 h-3.5 text-teal-600" />
          <span>Hardware &amp; Platform Specs</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          System Requirements &amp; Media Matrix
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          DiskWarren Recover is engineered natively for 64-bit Windows systems. Check below for supported operating systems, drives, and storage formats.
        </p>
      </div>

      {/* OS Matrix */}
      <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-teal-600" />
          <span>Operating System Compatibility</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Windows 11 (64-bit)</span>
            <p className="text-slate-600">All versions: 21H2, 22H2, 23H2, and 24H2. x64 architecture supported natively.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Windows 10 (64-bit)</span>
            <p className="text-slate-600">Version 20H2 or later (Build 19042+). x64 architecture.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Memory (RAM)</span>
            <p className="text-slate-600">4 GB RAM minimum (8 GB recommended for deep carving large 2TB+ drives).</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Privileges</span>
            <p className="text-slate-600">Local Administrator elevation required for raw block device reading.</p>
          </div>
        </div>
      </div>

      {/* Storage Media & Filesystem Compatibility */}
      <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-teal-600" />
          <span>Supported Storage Hardware &amp; Filesystems</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100 space-y-2">
            <span className="font-bold text-teal-900 block">Storage Devices:</span>
            <ul className="space-y-1 text-slate-700">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Internal NVMe, SATA SSDs, &amp; HDDs</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> External USB 3.0 / USB-C Portable Drives</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> SD, MicroSD, CF, and SDHC Camera Cards</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> USB Flash Drives &amp; Thumb Sticks</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Virtual Hard Disks (.vhd, .vhdx, .raw, .dd)</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100 space-y-2">
            <span className="font-bold text-teal-900 block">Filesystems Supported:</span>
            <ul className="space-y-1 text-slate-700">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> <strong>NTFS</strong> (Windows Standard)</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> <strong>exFAT</strong> (USB Drives &amp; Modern Cameras)</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> <strong>FAT32 &amp; FAT16</strong> (Legacy Cards &amp; Firmware)</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> <strong>RAW / Unformatted</strong> (via Deep Carve)</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> <strong>Ext2/3/4</strong> (Linux volumes via raw carving)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Ready to test your drive?</h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Download DiskWarren Recover and run an immediate scan.
        </p>
        <div className="pt-2">
          <Link
            href="/recovery/download"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Free Scanner</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
