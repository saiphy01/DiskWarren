import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service & Refund Policy — DiskWarren',
  description: 'Simple, customer-first terms of service with a 14-day full refund guarantee.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to DiskWarren</span>
      </Link>

      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-white">Terms of Service & Refund Policy</h1>
        <p className="text-xs text-slate-400">Effective: October 2026</p>
      </div>

      <div className="prose prose-invert prose-slate text-sm space-y-6 text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">1. Software License</h2>
          <p>
            DiskWarren is licensed, not sold. A Pro license grants you a perpetual, non-exclusive right to install and run DiskWarren on up to three (3) personal Mac computers owned or controlled by you.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">2. 14-Day Money-Back Guarantee</h2>
          <p>
            If you are unsatisfied with DiskWarren for any reason within 14 days of purchase, email <a href="mailto:support@diskwarren.com" className="text-cyan-400 underline">support@diskwarren.com</a> with your order number, and we will issue a full 100% refund promptly without hassle.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">3. Safety & User Responsibility</h2>
          <p>
            DiskWarren provides granular controls and defaults to moving files to the macOS Trash. While DiskWarren applies strict safety heuristics and guards critical system folders, you retain final responsibility for reviewing and confirming which items you choose to recycle or purge.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">4. Updates & Support</h2>
          <p>
            All Pro license purchases include free minor updates and bug fixes for the major version lifecycle (v1.x). Support is provided directly by our engineering team via email.
          </p>
        </section>
      </div>
    </div>
  );
}
