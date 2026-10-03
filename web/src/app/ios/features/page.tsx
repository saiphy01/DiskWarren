'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Smartphone, 
  Layers, 
  Image as ImageIcon, 
  Video, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Cloud,
  Tablet,
  Cpu
} from 'lucide-react';

export default function IOSFeaturesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>iOS Capabilities &amp; Architecture</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Native Storage Intelligence for iPhone &amp; iPad
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Crafted exclusively in Swift and SwiftUI. DiskWarren pairs Apple PhotoKit framework performance with Apple Silicon Neural Engine vision algorithms to free up gigabytes on your device.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Feature 1 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">PhotoKit High-Speed Duplicate Detection</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Index 20,000+ photos in seconds. DiskWarren compares exact asset hashes alongside perceptual feature vectors to identify identical photos saved across multiple albums, shared photo streams, and message imports.
          </p>
          <div className="pt-2 text-xs font-mono text-purple-700 bg-purple-50/50 p-3 rounded-xl border border-purple-100">
            ✓ Groups exact matches for 1-tap review
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Similar Photos &amp; Burst Shot Grouping</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Taking 10 shots of the same pose fills your storage with almost-identical frames. DiskWarren analyzes burst clusters, evaluates sharpness, focus, and open eyes, and pre-selects the finest image to keep.
          </p>
          <div className="pt-2 text-xs font-mono text-blue-700 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
            ✓ Neural quality scoring to recommend the sharpest photo
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Video className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">4K &amp; ProRes Video Inspector</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Modern iPhone cameras capture cinematic 4K 60fps and Apple ProRes footage that consume up to 6 GB per minute. DiskWarren surfaces your largest clips, long forgotten screen recordings, and slow-motion files.
          </p>
          <div className="pt-2 text-xs font-mono text-indigo-700 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
            ✓ Built-in video player with scrubbing and file size diagnostics
          </div>
        </div>

        {/* Feature 4 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Cloud className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">iCloud Photos Storage Intelligence</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Understand the difference between local on-device original files and optimized iCloud thumbnails. DiskWarren flags local download bloat and advises you on how to safely trigger iOS purgeable space reclamation.
          </p>
          <div className="pt-2 text-xs font-mono text-cyan-700 bg-cyan-50/50 p-3 rounded-xl border border-cyan-100">
            ✓ Transparent sync status indicators for all media items
          </div>
        </div>

        {/* Feature 5 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Smartphone className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Native SwiftUI &amp; iOS 18 Design</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Built using modern Apple design patterns, smooth 120Hz ProMotion animations, haptic feedback, and dynamic dark mode styling. Zero third-party web view wrappers or lag.
          </p>
          <div className="pt-2 text-xs font-mono text-emerald-700 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
            ✓ Interactive Lock Screen &amp; Home Screen storage widgets
          </div>
        </div>

        {/* Feature 6 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Tablet className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Universal App for iPadOS</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            One single purchase works across both your iPhone and iPad. Take advantage of expansive iPad displays with Stage Manager, Split View multitasking, and external trackpad/keyboard shortcuts.
          </p>
          <div className="pt-2 text-xs font-mono text-amber-700 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
            ✓ Optimized for iPad Pro M1-M4 with Apple Pencil support
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-3xl font-bold">Free Up Space on Your iPhone Today</h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Audit your entire photo library in seconds. Free for diagnosis, duplicate detection, and large video discovery.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/ios/download"
            className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
          >
            Download on the App Store
          </Link>
          <Link
            href="/ios/pricing"
            className="px-6 py-3.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-bold text-sm transition-all"
          >
            View Pricing ($4.99 Lifetime)
          </Link>
        </div>
      </div>
    </div>
  );
}
