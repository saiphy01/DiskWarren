'use client';

import React from 'react';
import Link from 'next/link';
import { HelpCircle, Download, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RecoveryFaqPage() {
  const faqs = [
    {
      q: "Can DiskWarren Recover retrieve files deleted weeks or months ago?",
      a: "Yes, provided the physical clusters containing those files have not been overwritten by new data. On mechanical hard drives, USB flash drives, and camera SD cards, deleted files remain intact indefinitely until new writes occur. On modern NVMe SSDs with TRIM enabled, recovery is more time-sensitive because the SSD controller may unmap and zero unallocated sectors during background garbage collection."
    },
    {
      q: "Why does DiskWarren refuse to save recovered files to the drive being scanned?",
      a: "This is a hardcoded safety barrier. When files are written to a drive, the operating system assigns free clusters. If you save files back to the very drive you are recovering, Windows may allocate the exact sectors where your deleted files reside, permanently destroying them before they can be retrieved. DiskWarren queries physical disk geometry to prevent this disaster."
    },
    {
      q: "Can I recover files from a quick-formatted drive or camera SD card?",
      a: "Yes. Quick Formatting re-initializes filesystem headers (such as the NTFS Master File Table or FAT allocation tables) but leaves the underlying data clusters untouched. DiskWarren uses Deep Signature Carving to scan raw sectors and reconstruct photos, videos, documents, and archives even when the directory index is gone."
    },
    {
      q: "How does DiskWarren handle BitLocker encrypted partitions?",
      a: "If your drive was encrypted with Windows BitLocker, DiskWarren can recover deleted files from it once the volume is unlocked in Windows using your BitLocker password or 48-digit recovery key. We do not attempt to bypass or crack BitLocker encryption without credentials."
    },
    {
      q: "Does DiskWarren require Administrator privileges?",
      a: "Yes. Accessing raw physical disk sectors (via \\\\.\\PhysicalDriveX) requires elevated Windows Administrator privileges. DiskWarren uses this authority strictly to open read-only handles and never modifies system registry hives or boot files."
    },
    {
      q: "How does the evidence-based recovery score work?",
      a: "Instead of generating random or misleading recovery percentages, DiskWarren inspects five concrete technical parameters: 1) directory record integrity, 2) magic header presence, 3) terminator/footer markers, 4) cluster fragmentation extents, and 5) conflicting cluster allocations. This produces an explainable confidence score from Unrecoverable to Excellent."
    },
    {
      q: "Is an internet connection required to scan or recover files?",
      a: "No. DiskWarren Recover operates 100% offline. All scanning, parsing, hex previews, and file exports execute locally on your PC. Even Pro and Technician license keys can be activated offline using our Ed25519 cryptographic signature verification."
    },
    {
      q: "What is your refund policy?",
      a: "Because DiskWarren offers unlimited free scanning, in-memory previews, and a 500 MB recovery allowance before purchase, you can verify that your files are intact and recoverable prior to buying a license. If our support team is unable to resolve a verified technical defect, we provide a 30-day money-back guarantee."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
          <span>Support &amp; Answers</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Honest answers about data recovery physics, drive safety, file fragmentation, and licensing.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2.5">
            <h2 className="text-base font-bold text-slate-900">
              {faq.q}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Have a specific drive problem?</h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Download DiskWarren Recover and run a free scan. You will see immediately what can be recovered.
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
