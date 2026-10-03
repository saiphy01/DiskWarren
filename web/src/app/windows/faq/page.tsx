'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, 
  ChevronDown, 
  ShieldCheck, 
  ArrowRight,
  HardDrive
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const windowsFaqs: FAQItem[] = [
  {
    question: "Does DiskWarren delete important Windows system files?",
    answer: "No. DiskWarren has hardcoded immutable safety gates built directly into its core engine that physically block deletion inside C:\\Windows\\System32, SysWOW64, WinSxS, and system pagefiles (pagefile.sys, hiberfil.sys). It is engineered exclusively to target user-reproducible caches and orphaned developer artifacts."
  },
  {
    question: "How does Windows Recycle Bin recovery work?",
    answer: "Whenever you run a cleanup in DiskWarren, items are removed using the official Win32 SHFileOperation API with the FOF_ALLOWUNDO flag enabled. This means deleted files are safely moved to your Windows desktop Recycle Bin, rather than being shredded. You can restore any item instantly with a right-click."
  },
  {
    question: "Does DiskWarren clean or modify the Windows Registry?",
    answer: "No. Unlike legacy cleaning software (such as CCleaner), DiskWarren deliberately does not touch the Windows Registry. Modern Windows systems do not benefit from registry cleaning, and modifying registry keys risks corrupting system boot files or COM CLSIDs. DiskWarren focuses 100% on disk storage reclaim."
  },
  {
    question: "Does DiskWarren support Windows 11 ARM64 and Snapdragon X Elite Copilot+ PCs?",
    answer: "Yes. DiskWarren is compiled as a native binary for both x64 (Intel/AMD) and native ARM64 (Qualcomm Snapdragon X Elite and Snapdragon X Plus). It runs at full native speed without translation overhead or battery penalty."
  },
  {
    question: "Does DiskWarren require Administrator privileges?",
    answer: "DiskWarren runs standard scans and developer cleanups entirely under standard user permissions. Administrator elevation is only requested via standard Windows UAC if you explicitly ask DiskWarren to scan privileged system directories like C:\\ProgramData or Windows delivery optimization caches."
  },
  {
    question: "How does DiskWarren reclaim space from Docker and WSL2?",
    answer: "In Windows, WSL2 and Docker Desktop allocate space dynamically in virtual disk files (ext4.vhdx) which do not shrink automatically when you delete containers or images. DiskWarren identifies these oversized VHDX files and guides you through the native PowerShell optimize-vhd compaction process to release gigabytes back to your main Windows drive."
  },
  {
    question: "Is DiskWarren built with Electron or web technologies?",
    answer: "No. DiskWarren is a 100% native .NET 8 desktop utility using modern Windows Fluent UI and WinUI/WPF. It uses less than 85MB of RAM during an active scan and launches in under 200 milliseconds."
  },
  {
    question: "Does DiskWarren collect telemetry or upload any file contents?",
    answer: "No. DiskWarren is completely air-gapped. File indexing, size computation, duplicate hashing, and path analysis occur 100% locally on your PC. No file paths, names, or metadata are ever transmitted across the network."
  },
  {
    question: "Is DiskWarren for Windows a subscription?",
    answer: "No. DiskWarren is sold as a lifetime purchase with no recurring fees. Minor updates (v1.x) are free forever. A single PC license covers 1 machine, while our Workstation Pack covers up to 3 PCs."
  },
  {
    question: "Can I transfer my license key to a new PC?",
    answer: "Yes. If you upgrade your PC or reinstall Windows, simply open Settings > Deactivate on the old machine, or enter your cryptographic license key (DW1-WIN-PRO-...) on your new computer to reactivate."
  }
];

export default function WindowsFAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Windows Help &amp; FAQ</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Frequently Asked Questions for Windows
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Everything you need to know about safety, compatibility, NTFS scanning, and licensing for DiskWarren on Windows 10 and 11.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {windowsFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <span className="text-base sm:text-lg">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
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
        <h3 className="text-xl font-bold text-slate-900">Have a question not covered here?</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Our engineering team is here to help with installation, system policies, or enterprise deployments.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/support"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
          >
            Contact Engineering Support
          </Link>
          <Link
            href="/windows/download"
            className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-bold text-xs transition-colors"
          >
            Download Free Edition
          </Link>
        </div>
      </div>
    </div>
  );
}
