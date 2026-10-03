import React from 'react';
import Link from 'next/link';
import { Download, FileCheck, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Cryptographic Mac Duplicate Finder — SHA-256 Accurate | DiskWarren',
  description: 'Find identical duplicate files with 100% mathematical accuracy using multi-stage progressive SHA-256 filtering on macOS. Zero false positives.',
  alternates: { canonical: '/mac-duplicate-finder' }
};

export default function MacDuplicateFinderPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
      <div className="space-y-4 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          Duplicate Detection
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Cryptographic Duplicate File Finder for Mac
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Never risk deleting unique files based on filename alone. DiskWarren uses a three-stage progressive filter ending in full cryptographic SHA-256 byte verification to guarantee zero false positives.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/download"
            className="px-7 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-cyan-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Find Duplicates Free</span>
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">How 3-Stage Progressive Filtering Works</h2>
        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 font-bold flex items-center justify-center shrink-0">1</div>
            <div>
              <strong className="text-slate-900 text-sm block">Exact Byte Size Bucket Matching</strong>
              <p>Files that differ by even a single byte are excluded instantly without reading disk blocks.</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 font-bold flex items-center justify-center shrink-0">2</div>
            <div>
              <strong className="text-slate-900 text-sm block">Chunk Header Hashing</strong>
              <p>For candidate files with identical byte sizes, the first 4KB chunk is hashed in memory to filter out dissimilar media files quickly.</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 font-bold flex items-center justify-center shrink-0">3</div>
            <div>
              <strong className="text-slate-900 text-sm block">Full Cryptographic SHA-256 Verification</strong>
              <p>Candidates passing stages 1 and 2 undergo complete SHA-256 byte-by-byte digest calculation. If hashes match, the files are mathematically identical clones.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
