'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, 
  ChevronDown, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const iosFaqs: FAQItem[] = [
  {
    question: "Can DiskWarren clear 'System Data' or 'Other' storage on iPhone?",
    answer: "We believe in complete technical honesty: Apple's iOS security sandbox strictly forbids any third-party app from directly wiping system-level cache partitions. However, by safely identifying and removing gigabytes of redundant local media and duplicate videos, DiskWarren signals iOS that storage pressure has changed, allowing the operating system to automatically flush purgeable system caches and optimize local indexes."
  },
  {
    question: "Where do deleted photos and videos go?",
    answer: "Every item removed through DiskWarren moves directly to your Apple Photos 'Recently Deleted' album. Apple preserves these items for 30 days, so you can easily review and restore any photo or video with a single tap if you ever change your mind."
  },
  {
    question: "Can DiskWarren delete photos without my knowledge?",
    answer: "No. Apple enforces strict security protections in iOS: no app can delete or trash media without displaying the official iOS confirmation modal ('Allow DiskWarren to delete X items?'). You must approve every single cleanup action."
  },
  {
    question: "Are my photos or videos uploaded to any cloud servers?",
    answer: "No. All perceptual image hashing, duplicate detection, and video metadata indexing occur 100% locally on your iPhone using the Apple Silicon Neural Engine. DiskWarren operates completely offline and transmits zero media to external servers."
  },
  {
    question: "Is DiskWarren a subscription?",
    answer: "No. While most cleaner apps on the App Store trap users into predatory $7.99/week auto-renewing subscriptions, DiskWarren is a single $4.99 one-time lifetime purchase. You own it forever with no recurring fees."
  },
  {
    question: "Does DiskWarren support Apple Family Sharing?",
    answer: "Yes. Our Pro in-app purchase supports Apple Family Sharing out of the box. Up to 5 family members connected to your Apple ID Family group can unlock and use Pro features on their own iPhones and iPads at no additional cost."
  },
  {
    question: "Does it support iPad and iPadOS?",
    answer: "Yes. DiskWarren is a Universal Apple binary compiled for both iOS and iPadOS. It includes native support for iPad multitasking, Split View, Stage Manager, and keyboard shortcuts."
  },
  {
    question: "Which iOS versions are supported?",
    answer: "DiskWarren supports iOS 17.0 through iOS 18+ and iPadOS 17.0+. It requires an iPhone or iPad powered by an Apple Silicon chip (A12 Bionic or newer, or M1-M4 Apple Silicon)."
  },
  {
    question: "Does DiskWarren compress or reduce the resolution of my photos?",
    answer: "No. DiskWarren never alters, re-encodes, or modifies your original media files or their EXIF metadata. It simply identifies redundant duplicate assets and helps you remove unwanted extras."
  },
  {
    question: "How does DiskWarren handle iCloud Photos?",
    answer: "If you have 'Optimize iPhone Storage' enabled in iCloud Photos, DiskWarren distinguishes between full-resolution photos stored locally on your device and low-resolution iCloud thumbnails. It focuses on removing local duplicates that are actively occupying physical storage."
  }
];

export default function IOSFAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <HelpCircle className="w-4 h-4 text-purple-600" />
          <span>iOS Help &amp; FAQ</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Frequently Asked Questions for iOS
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Everything you need to know about Apple Photos safety, sandboxing, 30-day Recently Deleted recovery, and Family Sharing on iPhone &amp; iPad.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {iosFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-purple-600 transition-colors cursor-pointer"
              >
                <span className="text-base sm:text-lg">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-purple-600' : ''
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
        <h3 className="text-xl font-bold text-slate-900">Need help with iCloud or StoreKit purchases?</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Our Apple development team is available to assist with Family Sharing configuration or technical questions.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/support"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
          >
            Contact Apple Support Team
          </Link>
          <Link
            href="/ios/download"
            className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-bold text-xs transition-colors"
          >
            Download on App Store
          </Link>
        </div>
      </div>
    </div>
  );
}
