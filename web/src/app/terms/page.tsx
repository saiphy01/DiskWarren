import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service & Refund Policy — DiskWarren',
  description: 'Simple, customer-first terms of service with a 30-day full refund guarantee.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 font-medium transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to DiskWarren</span>
      </Link>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 sm:p-12 space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Terms of Service &amp; Refund Policy</h1>
          <p className="text-xs text-slate-500">Effective: October 2026</p>
        </div>

        <div className="text-sm space-y-6 text-slate-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Software License</h2>
            <p>
              DiskWarren is licensed, not sold. A Pro license grants you a perpetual, non-exclusive right to install and run DiskWarren on up to three (3) personal Mac computers owned or controlled by you.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. 30-Day Money-Back Guarantee</h2>
            <p>
              If you are unsatisfied with DiskWarren for any reason within 30 days of purchase, email <a href="mailto:support@diskwarren.com" className="text-cyan-700 underline font-semibold">support@diskwarren.com</a> with your order number, and we will issue a full 100% refund promptly without hassle.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Safety &amp; User Responsibility</h2>
            <p>
              DiskWarren provides granular controls and defaults to moving files to the macOS Trash. While DiskWarren applies strict safety heuristics and guards critical system folders, you retain final responsibility for reviewing and confirming which items you choose to recycle or purge.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Updates &amp; Support</h2>
            <p>
              All Pro license purchases include free minor updates and bug fixes for the major version lifecycle (v1.x). Support is provided directly by our engineering team via email.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
