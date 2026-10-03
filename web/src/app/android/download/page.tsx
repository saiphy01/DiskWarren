'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Info, 
  Smartphone,
  FolderArchive,
  RefreshCw,
  Cpu
} from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export default function AndroidDownloadPage() {
  const sha256Apk = "2731c26db5a1afe6c7981c9a970ad83982bd59d4f41a0deafdf505c2d87fe003";
  const [copiedApk, setCopiedApk] = useState(false);

  const handleCopyApk = () => {
    navigator.clipboard.writeText(sha256Apk);
    setCopiedApk(true);
    setTimeout(() => setCopiedApk(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Smartphone className="w-4 h-4 text-emerald-600" />
          <span>Android Official Release v1.0.0</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Download DiskWarren for Android
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Reclaim gigabytes of duplicate photos, oversized 4K videos, WhatsApp sent media, and obsolete APKs. 
          100% Google Play Scoped Storage compliant, native 30-day OS Trash, and zero battery drain.
        </p>
      </div>

      {/* Main Download Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Google Play Store Card */}
        <div className="bg-white border-2 border-emerald-600/30 rounded-2xl p-8 shadow-xl shadow-emerald-500/5 text-center relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-6">
            <div className="inline-flex p-4 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Download className="w-8 h-8 animate-bounce" />
            </div>
            
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">Recommended for all phones &amp; tablets</span>
              <h2 className="text-2xl font-bold text-slate-900">
                Google Play Store
              </h2>
            </div>
            
            <p className="text-sm text-slate-600">
              Install directly from Google Play with automatic background updates, Google Play Protect verification, and Play Family Library sharing.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-600 pt-2">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                Android 10.0 to Android 15
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                Phones, Foldables &amp; Tablets
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                App Size: ~9.8 MB
              </span>
            </div>

            <div className="pt-2">
              <a
                href="https://play.google.com/store/apps/details?id=com.diskwarren.android"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-lg transition-all active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a2.36 2.36 0 0 1-.22-.303A2.348 2.348 0 0 1 3 20.485V3.515c0-.52.164-.999.39-1.398.07-.12.146-.22.219-.303zM15.207 13.414l2.493-2.493-9.52-5.498 7.027 7.991zm0-2.828L8.18 2.595l9.52 5.498-2.493 2.493zm1.414 1.414l3.197 1.846c.928.536.928 1.408 0 1.944l-3.197 1.846-2.079-2.079 2.079-2.079z"/>
                </svg>
                <span>Get it on Google Play</span>
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified by Google Play Protect</span>
            </div>
          </div>
        </div>

        {/* Direct APK Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg shadow-slate-200/40 text-center relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-6">
            <div className="inline-flex p-4 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200">
              <FolderArchive className="w-8 h-8" />
            </div>
            
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Direct Download (F-Droid / Sideload)</span>
              <h2 className="text-2xl font-bold text-slate-900">
                Official APK (v1.0.0)
              </h2>
            </div>
            
            <p className="text-sm text-slate-600">
              Air-gapped, standalone APK package for users without Google Play Services or custom AOSP / GrapheneOS ROMs.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-600 pt-2">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                Universal APK (arm64-v8a)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                No GMS Dependency
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                Size: ~11.4 MB
              </span>
            </div>

            <div className="pt-2">
              <a
                href="/downloads/DiskWarren-v1.0.0.apk"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-600/25 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>Download Official APK</span>
              </a>
            </div>

            {/* SHA-256 Checksum */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-left">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  SHA-256 Checksum
                </span>
                <button
                  onClick={handleCopyApk}
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 transition-colors"
                >
                  {copiedApk ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="font-mono text-[11px] text-slate-600 break-all select-all bg-white p-2 rounded border border-slate-200/80">
                {sha256Apk}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Android Safety & Integrity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">30-Day OS Trash</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Integrates natively with Android 11+ <code className="text-slate-800 font-mono">MediaStore.createTrashRequest()</code>. Files are never wiped immediately; restore them anytime from your Gallery Trash within 30 days.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">Scoped Storage Compliant</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            100% compliant with modern Google Play privacy guidelines. DiskWarren never requests dangerous all-files access permissions or root privileges.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">Zero Background Battery Drain</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No persistent background services, wake locks, or hidden processes. DiskWarren only uses CPU while the app is active in your foreground.
          </p>
        </div>
      </div>

      {/* APK Sideloading Instructions */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Info className="w-5 h-5 text-emerald-600" />
          How to Install the APK on Android
        </h3>
        <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
          <li>Download the <strong className="text-slate-800">DiskWarren-v1.0.0.apk</strong> file using Chrome or your preferred browser.</li>
          <li>Tap the downloaded notification or open your Files app &gt; Downloads.</li>
          <li>If prompted, tap <strong className="text-slate-800">Settings</strong> and toggle "Allow from this source".</li>
          <li>Tap <strong className="text-slate-800">Install</strong>. Google Play Protect will scan and verify the cryptographic signature automatically.</li>
        </ol>
      </div>
    </div>
  );
}
