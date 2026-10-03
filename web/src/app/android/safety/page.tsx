'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  RefreshCw, 
  Lock, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight,
  BatteryCharging,
  EyeOff
} from 'lucide-react';

export default function AndroidSafetyPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Android Safety Architecture</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Safety First on Android. 30-Day Reversible Cleanup.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Most Android cleaners require dangerous root permissions or secretly shred memories. 
          DiskWarren uses Android&apos;s native Scoped Storage and 30-day OS Trash so you never lose a precious photo.
        </p>
      </div>

      {/* Safety Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pillar 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">1. Native 30-Day OS Trash</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            On Android 11 through Android 15, DiskWarren dispatches deletions via <code className="text-slate-800 font-mono text-xs">MediaStore.createTrashRequest()</code>. 
            Items are transferred directly to your Android device&apos;s native Trash. You can restore any photo or video from Google Photos or Samsung Gallery within 30 days.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">2. Google Play Scoped Storage Compliant</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            DiskWarren strictly complies with Google&apos;s modern Scoped Storage privacy policies. We do not ask for all-files access permissions, nor do we attempt to read other applications&apos; private databases.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">3. Mandatory System Confirmation</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            By using Android&apos;s official MediaStore API, DiskWarren cannot silently erase files in the background. Whenever a cleanup is initiated, Android&apos;s official system confirmation appears: <em>&ldquo;Allow DiskWarren to move these items to Trash?&rdquo;</em> You remain in total control.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <BatteryCharging className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">4. Zero Battery Drain &amp; No Wake-Locks</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Generic cleaner apps run continuous background notification services that constantly ping your processor and drain your battery. DiskWarren does not register persistent background services or wake-locks. It consumes zero power when closed.
          </p>
        </div>
      </div>

      {/* Privacy Guarantee */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">100% On-Device Local AI</span>
          <h3 className="text-2xl sm:text-3xl font-bold">Your Media Never Leaves Your Phone</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Perceptual duplicate photo comparison and video metadata analysis run exclusively on your phone&apos;s processor using Kotlin coroutines. 
            No photos, videos, or personal chat files are ever uploaded to cloud servers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Zero Third-Party Ad Trackers</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>No Root Access Required</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>30-Day Recovery via Gallery Trash</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-2xl font-bold text-slate-900">Clean Your Android Phone with Absolute Peace of Mind</h3>
        <p className="text-sm text-slate-600">Download DiskWarren on Google Play or install the official APK.</p>
        <div>
          <Link
            href="/android/download"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition-all"
          >
            <span>Get DiskWarren for Android</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
