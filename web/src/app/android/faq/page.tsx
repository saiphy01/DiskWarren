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

const androidFaqs: FAQItem[] = [
  {
    question: "Does DiskWarren require root access?",
    answer: "No. DiskWarren never requires root access or custom ROM modifications. It operates strictly within standard Android operating system permissions using modern MediaStore and Storage Access Framework APIs."
  },
  {
    question: "Can DiskWarren delete important system files or my other apps' data?",
    answer: "No. The Android security sandbox physically prevents third-party apps from touching or modifying other applications' private databases or operating system files. DiskWarren focuses exclusively on media, downloads, and redundant caches."
  },
  {
    question: "Where do deleted photos and videos go?",
    answer: "On Android 11 through Android 15, DiskWarren sends files to the native Android OS Trash via MediaStore.createTrashRequest(). This means your media is not shredded immediately; you can restore any item within 30 days directly from Google Photos or Samsung Gallery."
  },
  {
    question: "Why doesn't DiskWarren request 'All Files Access' (MANAGE_EXTERNAL_STORAGE)?",
    answer: "Many aggressive cleaner apps ask for broad 'All Files Access' to scan your entire storage and collect telemetry. DiskWarren intentionally respects Google's Scoped Storage guidelines, requesting only the precise media permissions necessary to audit images, videos, and downloads."
  },
  {
    question: "Can DiskWarren clean WhatsApp without deleting my chat history?",
    answer: "Yes. DiskWarren specifically scans media subfolders (such as WhatsApp Sent Videos, Voice Notes, and Animated Stickers). Your chat messages, text databases, contacts, and personal photos received from family remain completely untouched."
  },
  {
    question: "Does DiskWarren run in the background and drain my battery?",
    answer: "No. DiskWarren does not register persistent background services, notification alarms, or wake-locks. It consumes zero CPU cycles and zero battery power when you are not actively using the app."
  },
  {
    question: "Are my photos or files uploaded to any servers?",
    answer: "No. All perceptual hashing, duplicate detection, and file indexing occur 100% on your phone's processor. No images, file paths, or private information are ever uploaded to cloud servers or third parties."
  },
  {
    question: "Is DiskWarren for Android a subscription?",
    answer: "No. DiskWarren is a one-time lifetime purchase of $4.99 on Google Play. There are no recurring monthly or annual subscription fees."
  },
  {
    question: "Can I share the Pro purchase with my family?",
    answer: "Yes. DiskWarren is eligible for the Google Play Family Library. Up to 5 family members on your Google account can download and enjoy Pro features without paying again."
  },
  {
    question: "Which phone brands are supported?",
    answer: "DiskWarren supports all major Android smartphones, foldables, and tablets running Android 10 or later, including Samsung Galaxy (One UI), Google Pixel, Xiaomi / Redmi (HyperOS), OnePlus (OxygenOS), Motorola, and Sony Xperia."
  }
];

export default function AndroidFAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>Android Help &amp; FAQ</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Frequently Asked Questions for Android
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Everything you need to know about Scoped Storage, 30-day OS Trash recovery, permissions, and family licensing on Android.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {androidFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-emerald-600 transition-colors cursor-pointer"
              >
                <span className="text-base sm:text-lg">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-emerald-600' : ''
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
        <h3 className="text-xl font-bold text-slate-900">Have questions about your specific device?</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Our team is available to assist with device compatibility, SD card formatting, or Play Billing inquiries.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/support"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
          >
            Contact Support
          </Link>
          <Link
            href="/android/download"
            className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-bold text-xs transition-colors"
          >
            Get Free on Google Play
          </Link>
        </div>
      </div>
    </div>
  );
}
