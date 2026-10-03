'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Smartphone, 
  Layers, 
  Image as ImageIcon, 
  Video, 
  MessageSquare, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu
} from 'lucide-react';

export default function AndroidFeaturesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Android Capabilities &amp; Architecture</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          The Smartest Storage Manager for Android
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Built natively in Kotlin and Jetpack Compose. DiskWarren inspects your storage safely through modern Android APIs without aggressive ads or battery-draining background services.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Feature 1 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Internal Storage &amp; MicroSD Visualizer</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Gain immediate visibility into what is occupying your phone&apos;s memory. DiskWarren categorizes photos, 4K videos, audio clips, documents, and download caches across internal storage and removable SD cards.
          </p>
          <div className="pt-2 text-xs font-mono text-emerald-700 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
            ✓ Color-coded storage partitions with free/used breakdown
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">WhatsApp &amp; Telegram Media Cleaner</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Messaging apps silently hoard gigabytes of sent videos, voice notes, sticker packs, and forwarded memes. DiskWarren separates outgoing sent media from incoming family photos so you can safely purge clutter.
          </p>
          <div className="pt-2 text-xs font-mono text-blue-700 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
            ✓ Keeps your chat messages, text history, and contacts 100% intact
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Perceptual Image Duplicate Finder</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Standard cleaners miss identical photos saved at different compressions or resolutions. DiskWarren utilizes on-device perceptual difference hashing (dHash) to identify exact duplicates and burst photo sequences.
          </p>
          <div className="pt-2 text-xs font-mono text-purple-700 bg-purple-50/50 p-3 rounded-xl border border-purple-100">
            ✓ Automatically highlights the best, sharpest shot to keep
          </div>
        </div>

        {/* Feature 4 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Video className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">4K &amp; High-Bitrate Video Inspector</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            A single 10-minute 4K 60fps recording can consume 4+ GB of storage. DiskWarren sorts your video library by size, codec, and duration, pinpointing forgotten screen recordings and mammoth clips.
          </p>
          <div className="pt-2 text-xs font-mono text-amber-700 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
            ✓ Quick in-app video previews before confirming cleanup
          </div>
        </div>

        {/* Feature 5 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Smartphone className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Obsolete APKs &amp; Download Cache Cleaner</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Old APK installation packages and forgotten PDF downloads often linger in your Downloads folder forever. DiskWarren audits downloaded items and verifies whether APKs are already installed on your system.
          </p>
          <div className="pt-2 text-xs font-mono text-rose-700 bg-rose-50/50 p-3 rounded-xl border border-rose-100">
            ✓ Identifies redundant installation packages in seconds
          </div>
        </div>

        {/* Feature 6 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Jetpack Compose &amp; Material 3 Design</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Fluid 120Hz scrolling, dynamic color theming that adapts to your phone&apos;s wallpaper (Material You), and full support for foldable screens and Android tablets.
          </p>
          <div className="pt-2 text-xs font-mono text-cyan-700 bg-cyan-50/50 p-3 rounded-xl border border-cyan-100">
            ✓ Instant cold-start with zero splash screen delays
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-3xl font-bold">Reclaim Gigabytes on Your Phone Today</h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Scan your phone in seconds. 100% free for diagnostic audits and duplicate scanning.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/android/download"
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
          >
            Get it on Google Play
          </Link>
          <Link
            href="/android/pricing"
            className="px-6 py-3.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-bold text-sm transition-all"
          >
            View Pricing ($4.99 One-Time)
          </Link>
        </div>
      </div>
    </div>
  );
}
