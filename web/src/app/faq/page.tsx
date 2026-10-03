'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, 
  ChevronDown, 
  Laptop, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const macFaqs: FAQItem[] = [
  {
    question: "Does DiskWarren request Full Disk Access?",
    answer: "Yes, Full Disk Access (FDA) is optional but recommended. On modern macOS (Sonoma, Sequoia), Apple restricts apps from reading directory sizes inside ~/Library/Application Support, Xcode developer directories, and Docker storage. Granting FDA in System Settings > Privacy & Security > Full Disk Access allows DiskWarren to calculate exact folder sizes across your entire Mac. You remain in total control and can revoke FDA at any time."
  },
  {
    question: "Can DiskWarren delete important system files?",
    answer: "No. DiskWarren is architected with strict, immutable safety gates. It will never touch Apple System Integrity Protection (SIP) partitions (/System, /usr/bin), core macOS frameworks, or user documents. All cleanups are restricted to reproducible build caches, uninstalled app leftovers, and local AI model weights. Furthermore, you must review and confirm every item before it is moved."
  },
  {
    question: "Which Macs and macOS versions are supported?",
    answer: "DiskWarren is compiled as a Universal 2 binary supporting both Apple Silicon (M1, M2, M3, M4) and 64-bit Intel Macs. It is compatible with macOS 12 Monterey, macOS 13 Ventura, macOS 14 Sonoma, and macOS 15 Sequoia."
  },
  {
    question: "Does DiskWarren upload my files or send analytics?",
    answer: "No. DiskWarren is 100% air-gapped. All directory indexing, file size calculations, and duplicate hashing occur entirely in memory on your Mac. DiskWarren does not collect telemetry, personal identifiers, file names, or code paths."
  },
  {
    question: "Does DiskWarren scan the contents of my files?",
    answer: "No. DiskWarren scans file system metadata (path, size, modification date, and file attributes). It does not parse or read the contents of your source code, documents, or personal data. The only exception is cryptographic duplicate checking, where read-only chunk hashes are calculated on-device to verify identical files."
  },
  {
    question: "Can I undo a cleanup action?",
    answer: "Yes. DiskWarren uses macOS Trash-first deletion (via NSFileManager.trashItem). Cleaned files and directories are moved to your Mac's Dock Trash rather than being instantly erased. You can open the Trash, right-click any item, and select 'Put Back' to restore it to its original location."
  },
  {
    question: "Is DiskWarren a subscription?",
    answer: "No. DiskWarren is sold as a lifetime purchase with no recurring fees. Pay once for a single Mac license ($9.99 launch promotion / $29.99 regular) or a Power Pack for up to 3 Macs. Minor updates within version 1.x are included for free."
  },
  {
    question: "Does DiskWarren work offline?",
    answer: "Yes. DiskWarren is a completely native Swift application that does not require an active internet connection to scan, visualize, or clean storage. License keys are cryptographically verified offline."
  },
  {
    question: "Does DiskWarren support both Apple Silicon and Intel?",
    answer: "Yes. The DiskWarren DMG contains a true Universal binary with native ARM64 slices for M1-M4 Macs and x86_64 slices for Intel Macs. It runs with zero Rosetta translation overhead."
  },
  {
    question: "Why does DiskWarren need Full Disk Access?",
    answer: "macOS sandbox privacy rules prevent standard applications from measuring the contents of other apps' containers and caches (such as Xcode DerivedData or Docker VM virtual disks). Without Full Disk Access, macOS reports those folders as having 0 bytes, creating misleading storage reports. FDA gives DiskWarren read-only access to accurately calculate disk space."
  }
];

export default function MacFAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <HelpCircle className="w-4 h-4 text-cyan-600" />
          <span>Mac Help &amp; FAQ</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Frequently Asked Questions for Mac
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Everything you need to know about Full Disk Access, Trash-first safety, APFS storage scanning, and developer cache intelligence.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {macFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-cyan-600 transition-colors cursor-pointer"
              >
                <span className="text-base sm:text-lg">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-cyan-600' : ''
                  }`} 
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Help Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Have a question not listed here?</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Our engineering team is happy to help with Full Disk Access setup, developer rules, or enterprise licenses.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/support"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
          >
            Contact Mac Support
          </Link>
          <Link
            href="/download"
            className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-bold text-xs transition-colors"
          >
            Download Free Universal DMG
          </Link>
        </div>
      </div>
    </div>
  );
}
