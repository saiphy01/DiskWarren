'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Download, 
  ShieldCheck, 
  Smartphone, 
  Sparkles, 
  ArrowRight, 
  TrendingDown, 
  XCircle, 
  Tag, 
  Users,
  Heart
} from 'lucide-react';

export default function IOSPricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Tag className="w-3.5 h-3.5 text-purple-600" />
          <span>iOS Transparent Pricing • No Subscription Traps</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Clean Your iPhone Safely Forever
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Most iPhone cleaner apps trap you in $7.99/week auto-renewing subscriptions. 
          DiskWarren is a single $4.99 one-time purchase with Apple Family Sharing support.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Standard</span>
              <h3 className="text-2xl font-bold text-slate-900">Free Edition</h3>
              <p className="text-xs text-slate-500 mt-1">Full photo library diagnostic &amp; duplicate audit</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900">$0</span>
              <span className="text-sm font-medium text-slate-500">forever</span>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 block">Included capabilities:</span>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Full PhotoKit library audit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Identical duplicate photo discovery</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Oversized 4K and ProRes video identification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Zero advertisements • 100% private</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <XCircle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                  <span>1-Tap batch moves to Recently Deleted</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <XCircle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                  <span>Smart burst shot selection &amp; similar photo grouping</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <Link
              href="/ios/download"
              className="w-full py-3.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-bold text-sm text-center block transition-colors"
            >
              Get Free on App Store
            </Link>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="bg-white border-2 border-purple-600 rounded-3xl p-8 flex flex-col justify-between shadow-xl shadow-purple-500/10 relative">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Lifetime Ownership
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block mb-1">One-Time In-App Purchase</span>
              <h3 className="text-2xl font-bold text-slate-900">Pro Lifetime</h3>
              <p className="text-xs text-slate-500 mt-1">Full batch cleanup &amp; neural photo intelligence</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-900">$4.99</span>
                <span className="text-sm font-medium text-slate-500">one-time payment</span>
              </div>
              <p className="text-[11px] text-purple-700 font-semibold flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                Apple Family Sharing Enabled (Share with up to 5 family members)
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 block">Everything in Free, plus:</span>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span className="font-semibold text-slate-800">Smart Burst &amp; Similar Photos:</span>
                </li>
                <li className="pl-6 text-[11px] text-slate-500">
                  Neural clustering compares burst sequences, automatically picks the sharpest shot, and stages duplicates for review.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>1-Tap batch cleanup to iOS Recently Deleted</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>4K ProRes &amp; slow-motion video compression insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Universal license for iPhone and iPad</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>StoreKit 2 native Apple In-App Purchase</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 space-y-2">
            <Link
              href="/ios/download"
              className="w-full py-3.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm text-center block shadow-lg shadow-purple-600/25 transition-all cursor-pointer active:scale-95"
            >
              Get iOS Pro ($4.99)
            </Link>
            <p className="text-[11px] text-center text-slate-400">Upgraded inside the app via Apple StoreKit</p>
          </div>
        </div>
      </div>

      {/* Comparison against Competitors */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            No Subscription Traps. Ever.
          </h2>
          <p className="text-sm text-slate-600">
            Compare DiskWarren against standard utility apps on the App Store
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="pb-4 font-semibold">Criteria</th>
                <th className="pb-4 font-bold text-purple-600">DiskWarren</th>
                <th className="pb-4 font-semibold text-slate-700">Generic App Store Cleaners</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              <tr>
                <td className="py-4 font-medium text-slate-900">Price</td>
                <td className="py-4 font-bold text-purple-600">$4.99 One-Time Lifetime</td>
                <td className="py-4 text-rose-600 font-semibold">$7.99 / week or $39.99 / year</td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-slate-900">Family Sharing</td>
                <td className="py-4 font-bold text-emerald-600">Included (Up to 5 Family Members)</td>
                <td className="py-4 text-slate-600">Disabled (Requires Individual Subscriptions)</td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-slate-900">Privacy Policy</td>
                <td className="py-4 font-bold text-emerald-600">Data Not Collected (100% On-Device)</td>
                <td className="py-4 text-amber-600">Identifiers &amp; Usage Data Tracked</td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-slate-900">Safety &amp; Recovery</td>
                <td className="py-4 font-bold text-purple-600">Native iOS Recently Deleted (30 Days)</td>
                <td className="py-4 text-purple-600">Native iOS Recently Deleted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
