'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Info, 
  Smartphone,
  Tablet,
  RefreshCw,
  Cpu,
  Layers
} from 'lucide-react';

export default function IOSDownloadPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Smartphone className="w-4 h-4 text-purple-600" />
          <span>iOS &amp; iPadOS Universal Release v1.0.0</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Download DiskWarren for iPhone &amp; iPad
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Reclaim gigabytes of duplicate photos, similar burst shots, and massive 4K ProRes videos. 
          100% native SwiftUI, Apple Neural Engine on-device clustering, and zero cloud uploads.
        </p>
      </div>

      {/* Main Download Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Apple App Store Card */}
        <div className="bg-white border-2 border-purple-600/30 rounded-2xl p-8 shadow-xl shadow-purple-500/5 text-center relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-6">
            <div className="inline-flex p-4 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100">
              <Download className="w-8 h-8 animate-bounce" />
            </div>
            
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block mb-1">Official App Store Release</span>
              <h2 className="text-2xl font-bold text-slate-900">
                Apple App Store
              </h2>
            </div>
            
            <p className="text-sm text-slate-600">
              Install directly from the App Store with automatic updates, iCloud Family Sharing, and Apple StoreKit security.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-600 pt-2">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                iOS 17.0+ &amp; iPadOS 17.0+
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                iPhone &amp; iPad Universal
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                Size: ~8.4 MB
              </span>
            </div>

            <div className="pt-2">
              <a
                href="https://apps.apple.com/app/diskwarren/id6478912345"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-lg transition-all active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.4c.66-.82 1.11-1.96.99-3.1-.96.04-2.13.64-2.81 1.44-.6.69-1.12 1.84-.98 2.96 1.07.08 2.16-.54 2.8-1.3"/>
                </svg>
                <span>Download on the App Store</span>
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>Apple App Store Privacy Verified • Data Not Collected</span>
            </div>
          </div>
        </div>

        {/* TestFlight Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg shadow-slate-200/40 text-center relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-6">
            <div className="inline-flex p-4 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100">
              <Sparkles className="w-8 h-8" />
            </div>
            
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Public Beta Channel</span>
              <h2 className="text-2xl font-bold text-slate-900">
                Apple TestFlight Beta
              </h2>
            </div>
            
            <p className="text-sm text-slate-600">
              Test upcoming features early, including iOS 18 Control Center widgets, Lock Screen storage meters, and Apple Vision Pro previews.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-600 pt-2">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                TestFlight App Required
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                Free Early Access
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                Build 1.0 (42)
              </span>
            </div>

            <div className="pt-2">
              <a
                href="https://testflight.apple.com/join/diskwarren-beta"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-base shadow-lg shadow-purple-600/25 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Smartphone className="w-5 h-5" />
                <span>Join TestFlight Public Beta</span>
              </a>
            </div>

            <div className="text-xs text-slate-500 pt-1">
              <span>Automatic beta builds dispatched weekly</span>
            </div>
          </div>
        </div>
      </div>

      {/* iOS Safety & Architecture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">Recently Deleted Safety</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every photo or video cleanup moves items directly to your Apple Photos <strong>&ldquo;Recently Deleted&rdquo;</strong> album. You have 30 days to review and restore anything at will.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">Apple Sandbox Isolation</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            iOS strictly isolates applications. DiskWarren operates exclusively through the official PhotoKit framework. It cannot modify other apps or damage iOS system files.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">Apple Neural Engine AI</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Perceptual photo duplicate detection runs locally on your iPhone&apos;s Apple Silicon Neural Engine. 100% private, instantaneous, and operates completely offline.
          </p>
        </div>
      </div>

      {/* Privacy Nutrition Label */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Info className="w-5 h-5 text-purple-600" />
          Apple App Store Privacy Nutrition Label
        </h3>
        <p className="text-sm text-slate-600">
          DiskWarren does not collect any data. As certified on our App Store privacy card:
        </p>
        <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span><strong>Data Not Collected:</strong> The developer does not collect any data from this app. Zero analytics, zero ad trackers, and zero contact sharing.</span>
        </div>
      </div>
    </div>
  );
}
