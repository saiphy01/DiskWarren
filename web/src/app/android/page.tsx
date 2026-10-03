import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Smartphone, 
  Trash2, 
  ShieldCheck, 
  Download, 
  Image as ImageIcon, 
  Video, 
  FolderSearch, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  HardDrive
} from 'lucide-react';

export const metadata: Metadata = {
  title: "DiskWarren for Android — Take Control of Your Phone's Storage | Android Storage Intelligence",
  description: "Smart storage manager for Android. Find large 4K videos, duplicate photos, abandoned download archives, and app caches using Google Play-compliant Scoped Storage APIs. Trash-first reversible cleanup.",
  alternates: {
    canonical: 'https://diskwarren.com/android',
  },
};

export default function AndroidLandingPage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-6 max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
          <span>Android Storage Intelligence • Scoped Storage &amp; Jetpack Compose</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1]">
          Take control of your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600">
            phone&apos;s storage.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Find massive 4K videos, duplicate photos, forgotten screenshots, and orphaned downloads. Built strictly for Android 10+ Scoped Storage with 30-day OS Trash recovery.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/android/download"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-base transition-all shadow-md shadow-cyan-600/25 flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
          >
            <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Download for Android</span>
          </Link>
          <Link
            href="/android/pricing"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span>View Android Pro Pricing</span>
            <ArrowRight className="w-4 h-4 text-cyan-600" />
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 pt-4 font-medium">
          <span className="flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-cyan-600" /> Android 10 to Android 15
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <Trash2 className="w-4 h-4 text-emerald-600" /> 30-Day OS Trash Recovery
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" /> Scoped Storage Compliant
          </span>
        </div>
      </section>

      {/* Android Feature Highlights */}
      <section className="px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold text-cyan-700 uppercase tracking-widest">Built for Modern Android Devices</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">What DiskWarren Does on Android</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base">
            We don&apos;t make unrealistic promises about cleaning internal app sandboxes. We use official Android MediaStore and Storage Access Framework APIs to solve real space problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Large Videos &amp; 4K Captures</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Discovers 60fps 4K video recordings, large WhatsApp forwarded videos, and long screen recordings that silently consume 20+ GB.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> 4K 60fps &amp; 8K Video Filter</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Screen Recording Identification</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Duration &amp; Bitrate Insights</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Duplicate Photos &amp; Screenshots</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Finds duplicate photos saved from messaging apps, burst shots, and forgotten receipt screenshots that clutter your gallery.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Fast Byte &amp; Size Matching</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Screenshot Sweeper</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Side-by-Side Review Mode</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FolderSearch className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Public Downloads &amp; SAF Folders</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Scans your public Downloads directory for old APK installers, extracted ZIP files, and user-selected custom folders via Storage Access Framework.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Abandoned APKs and ZIPs</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> User-Granted Folder Cleaning</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Zero Invasive Root Permissions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Safety & Policy Notice */}
      <section className="px-6 max-w-4xl mx-auto p-8 rounded-2xl bg-slate-900 text-white space-y-6">
        <div className="flex items-center gap-3 text-cyan-400">
          <ShieldCheck className="w-6 h-6" />
          <h2 className="text-xl font-bold">100% Google Play Policy Compliant</h2>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          Google Play strictly regulates storage cleaner utilities. DiskWarren does not use the restricted <code className="text-cyan-300 bg-slate-800 px-1 py-0.5 rounded text-xs">MANAGE_EXTERNAL_STORAGE</code> permission. We never access private app sandboxes or pretend to &ldquo;boost phone speed.&rdquo;
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-xs font-bold text-emerald-400 block">30-Day Trash Reversibility</span>
            <p className="text-xs text-slate-300">On Android 11+, deleted media items move to the OS Trash. You can easily recover any file within 30 days.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-xs font-bold text-cyan-400 block">100% On-Device Processing</span>
            <p className="text-xs text-slate-300">All photo scanning and duplicate detection happens entirely on your phone&apos;s processor. Zero uploads.</p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="px-6 max-w-4xl mx-auto text-center p-10 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white space-y-6 shadow-xl shadow-cyan-600/20">
        <h2 className="text-3xl font-extrabold">Ready to take control of your phone&apos;s space?</h2>
        <p className="text-cyan-100 text-sm max-w-xl mx-auto">
          Download DiskWarren for Android. Native, transparent, and built with modern Jetpack Compose.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/android/download"
            className="px-8 py-3.5 rounded-xl bg-white text-cyan-900 font-bold text-sm hover:bg-cyan-50 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Download Android APK (v1.0-alpha)
          </Link>
          <Link
            href="/android/pricing"
            className="px-6 py-3.5 rounded-xl bg-cyan-700/60 hover:bg-cyan-700 text-white font-semibold text-sm border border-cyan-400/40 transition-all cursor-pointer"
          >
            Get Multi-Device Power Pack ($14.99)
          </Link>
        </div>
      </section>
    </div>
  );
}
