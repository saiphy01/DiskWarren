import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Mail, RefreshCcw } from 'lucide-react';

export const metadata = {
  title: 'Refund Policy — 30-Day Money-Back Guarantee | DiskWarren',
  description: 'DiskWarren offers an unconditional 30-day money-back guarantee on all Pro and Power Pack license purchases.',
  alternates: { canonical: '/refund-policy' }
};

export default function RefundPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-14 space-y-10">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 font-medium transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to DiskWarren</span>
      </Link>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <RefreshCcw className="w-3.5 h-3.5 text-emerald-600" />
          <span>Customer Guarantee</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          30-Day Money-Back Guarantee
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          We want you to be completely satisfied with DiskWarren. If DiskWarren does not reclaim gigabytes of storage or meet your expectations, we will refund your purchase in full.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">How Refunds Work</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Within 30 calendar days of purchasing a DiskWarren Pro ($9.99) or Power Pack ($14.99) license, you are eligible for an unconditional 100% refund. No hoops, no mandatory surveys.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-base font-bold text-slate-900">How to Request a Refund</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Simply email our team at <a href="mailto:support@diskwarren.com?subject=Refund%20Request" className="text-cyan-700 underline font-semibold">support@diskwarren.com</a> with:
          </p>
          <ul className="text-xs text-slate-700 space-y-2 list-disc pl-5">
            <li>Your order number (e.g. DW-XXXXXX) or the email address used during purchase.</li>
            <li>Optional: Any feedback or reason for refund (helps our engineers improve the product, but never required).</li>
          </ul>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Processing Time</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our engineering team processes all refund requests within 24 business hours. Funds will return to your original payment method within 3–5 business days depending on your bank or credit card provider.
          </p>
        </div>
      </div>
    </div>
  );
}
