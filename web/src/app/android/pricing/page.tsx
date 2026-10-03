'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Download, 
  ShieldCheck, 
  Zap, 
  Copy, 
  Check, 
  HelpCircle, 
  Smartphone, 
  RefreshCcw, 
  Sparkles,
  ArrowRight,
  TrendingDown,
  XCircle,
  Tag,
  Users
} from 'lucide-react';

export default function AndroidPricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Tag className="w-3.5 h-3.5 text-emerald-600" />
          <span>Android Pricing • Zero Subscriptions • Zero Ads</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Clean Your Android Phone Safely Forever
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          No invasive full-screen ads, no background battery drain, and no recurring monthly fees. Upgrade once via Google Play In-App Purchase and share with your entire family.
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
              <p className="text-xs text-slate-500 mt-1">Full storage diagnostic &amp; media discovery</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900">$0</span>
              <span className="text-sm font-medium text-slate-500">forever</span>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 block">Included capabilities:</span>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Full internal &amp; SD card storage analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Duplicate photo detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Oversized 4K video discovery</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Download folder &amp; leftover APK auditing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Zero advertisements • 100% private</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <XCircle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                  <span>1-Click WhatsApp &amp; Telegram cleaner</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <XCircle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                  <span>Automated 30-day OS Trash batch moves</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <Link
              href="/android/download"
              className="w-full py-3.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-bold text-sm text-center block transition-colors"
            >
              Get Free on Google Play
            </Link>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="bg-white border-2 border-emerald-600 rounded-3xl p-8 flex flex-col justify-between shadow-xl shadow-emerald-500/10 relative">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Lifetime Ownership
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">One-Time In-App Purchase</span>
              <h3 className="text-2xl font-bold text-slate-900">Pro Lifetime</h3>
              <p className="text-xs text-slate-500 mt-1">Full automated cleanup &amp; chat media optimization</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-900">$4.99</span>
                <span className="text-sm font-medium text-slate-500">one-time payment</span>
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                Google Play Family Library Eligible (Up to 5 devices)
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 block">Everything in Free, plus:</span>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-semibold text-slate-800">WhatsApp &amp; Telegram Media Cleaner:</span>
                </li>
                <li className="pl-6 text-[11px] text-slate-500">
                  Clean sent videos, voice notes, sticker packs, and forwarded memes without losing personal chats.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Batch moves to Android 30-day OS Trash with 1 tap</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Perceptual image burst cleaner (keeps the sharpest photo)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Family sharing across all your Android devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Zero recurring subscription charges forever</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 space-y-2">
            <Link
              href="/android/download"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm text-center block shadow-lg shadow-emerald-600/25 transition-all cursor-pointer active:scale-95"
            >
              Get Android Pro ($4.99)
            </Link>
            <p className="text-[11px] text-center text-slate-400">Upgraded inside the app via Google Play</p>
          </div>
        </div>
      </div>

      {/* Comparison against Competitors */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Why Android Users Are Switching to DiskWarren
          </h2>
          <p className="text-sm text-slate-600">
            Compare DiskWarren against standard cleaning apps on Google Play
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="pb-4 font-semibold">Criteria</th>
                <th className="pb-4 font-bold text-emerald-600">DiskWarren</th>
                <th className="pb-4 font-semibold text-slate-700">Generic Android Cleaners</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              <tr>
                <td className="py-4 font-medium text-slate-900">Price</td>
                <td className="py-4 font-bold text-emerald-600">$4.99 One-Time Lifetime</td>
                <td className="py-4 text-slate-600">$19.99 - $39.99 / year (Recurring)</td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-slate-900">In-App Advertising</td>
                <td className="py-4 font-bold text-emerald-600">Zero Ads (Completely Ad-Free)</td>
                <td className="py-4 text-rose-600 font-semibold">Aggressive Full-Screen Video Ads</td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-slate-900">Battery &amp; Background Services</td>
                <td className="py-4 font-bold text-emerald-600">Zero Background Drain (No Daemons)</td>
                <td className="py-4 text-rose-600">Persistent Notification Daemons</td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-slate-900">Safety &amp; Recovery</td>
                <td className="py-4 font-bold text-emerald-600">Native 30-Day OS Trash (Reversible)</td>
                <td className="py-4 text-slate-600">Direct Irreversible File Shredding</td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-slate-900">Privacy &amp; Telemetry</td>
                <td className="py-4 font-bold text-emerald-600">100% On-Device Local Processing</td>
                <td className="py-4 text-amber-600">Ad Trackers &amp; Behavioral SDKs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
