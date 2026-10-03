'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, 
  ChevronDown, 
  ShieldCheck, 
  ArrowRight,
  Download
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const macFaqs: FAQItem[] = [
  {
    question: "Why does macOS show so much mystery 'System Data'?",
    answer: "Whenever macOS doesn't recognize a file as Music, Photos, or Apps, it lumps it into 'System Data'. In practice, on developer machines this is almost entirely Xcode DerivedData (~/Library/Developer), local Time Machine snapshots, Docker.raw virtual disks, and node_modules trees. DiskWarren indexes these exact directories so you can see the real items behind the vague label."
  },
  {
    question: "Why does DiskWarren recommend Full Disk Access?",
    answer: "Starting in macOS Sonoma and Sequoia, Apple's Privacy & Security protections prevent ordinary apps from reading the size of folders in other application containers (like ~/Library/Developer or Docker's VM disk). Without Full Disk Access, any disk utility is forced to report those directories as 0 bytes. Giving DiskWarren Full Disk Access lets it accurately calculate folder sizes. DiskWarren operates 100% locally and you can revoke the permission anytime in System Settings."
  },
  {
    question: "How is DiskWarren different from DaisyDisk or GrandPerspective?",
    answer: "DaisyDisk and GrandPerspective show you raw file sizes, but leave you guessing whether an 18GB folder is safe to delete. DiskWarren pairs visual treemaps with domain intelligence: it knows what DerivedData, Cargo targets, and Ollama model blobs are, marks them with safe risk ratings, and lets you recycle them cleanly to the macOS Trash with a single click."
  },
  {
    question: "Can DiskWarren accidentally delete important operating system files?",
    answer: "No. The engine has hardcoded blocklists protecting Apple SIP volumes (/System, /usr, /bin), user keychains, and sealed APFS snapshots. It literally refuses to modify them. Furthermore, DiskWarren never runs automatic background deletions—every action requires your explicit confirmation."
  },
  {
    question: "Will deleting DerivedData or node_modules break my projects?",
    answer: "No. DerivedData consists entirely of intermediate compilation caches and index files; Xcode will automatically rebuild whatever it needs on your next compile. Deleting node_modules from dormant projects is equally safe because you can always run 'npm install' or 'pnpm install' whenever you revisit that project."
  },
  {
    question: "Can I undo a cleanup action if I make a mistake?",
    answer: "Yes! DiskWarren routes cleaned items through the native macOS Trash (using NSFileManager.trashItem). If you delete something and realize you needed it, simply open the Trash from your Dock, right-click the item, and click 'Put Back' to restore it to its original path."
  },
  {
    question: "How does the license key work if I get a new Mac or reinstall macOS?",
    answer: "DiskWarren uses offline cryptographic license keys (Ed25519) with zero server activation calls. If you migrate to a new Mac, simply copy your key or enter it in DiskWarren > Settings > License. If you ever lose your license key, our self-service recovery page can look it up instantly using your purchase email."
  },
  {
    question: "Does DiskWarren scan external SSDs, USB drives, or SD cards?",
    answer: "Yes. DiskWarren scans any mounted APFS, HFS+, or exFAT storage volume attached to your Mac, including external Thunderbolt drives, USB-C SSDs, and SD cards."
  },
  {
    question: "Does DiskWarren send any telemetry or code filenames off my Mac?",
    answer: "Never. DiskWarren has zero analytics SDKs, zero telemetry servers, and zero cloud dependencies. It runs completely air-gapped. Your repository names, personal filenames, and drive structure never leave your machine's memory."
  },
  {
    question: "Is DiskWarren really a one-time purchase, or is there an annual fee?",
    answer: "DiskWarren is strictly a one-time purchase of $9.99 for a lifetime license on your Mac. We do not do subscriptions. Free edition includes full drive scanning and treemap exploration for $0 forever."
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
          Frequently Asked Questions
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Clear, straightforward answers about Full Disk Access, Trash-first safety, APFS storage scanning, and developer cache intelligence.
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
                <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Have a specific question about your setup?</h3>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Need help with a custom developer toolchain or enterprise Mac deployment? Our engineering team responds directly.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Link
            href="/support"
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
          >
            Contact Engineering Support
          </Link>
          <Link
            href="/download"
            className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors"
          >
            Download Free Scanner
          </Link>
        </div>
      </div>
    </div>
  );
}
