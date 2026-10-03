import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Apple, 
  Trash2, 
  ShieldCheck, 
  Download, 
  Video, 
  Camera, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  Film
} from 'lucide-react';

export const metadata: Metadata = {
  title: "DiskWarren for iPhone — Understand What's Filling Your iPhone | iPhone Storage Intelligence",
  description: "Native iPhone storage insights and photo library cleanup. Find large 4K ProRes videos, duplicate photos, and forgotten screenshots within Apple's supported access model. 30-day Recently Deleted protection.",
  alternates: {
    canonical: 'https://diskwarren.com/ios',
  },
};

export default function IOSLandingPage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-6 max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
          <span>iPhone Storage Intelligence • Swift & SwiftUI Native</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1]">
          Understand what's filling <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600">
            your iPhone.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Find removable 4K videos, duplicate photos, and heavy screen recordings within Apple's supported access model. Native 30-day Recently Deleted protection with zero sandbox bypass.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="https://github.com/saiphy01/DiskWarren/releases"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-base transition-all shadow-md shadow-cyan-600/25 flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
          >
            <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Get it on the App Store (TestFlight)</span>
          </a>
          <Link
            href="/pricing"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span>Cross-Platform Power Pack ($14.99)</span>
            <ArrowRight className="w-4 h-4 text-cyan-600" />
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 pt-4 font-medium">
          <span className="flex items-center gap-1.5">
            <Apple className="w-4 h-4 text-cyan-600" /> iOS 17 & iOS 18 (iPhone & iPad)
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <Trash2 className="w-4 h-4 text-emerald-600" /> Apple "Recently Deleted" Recovery
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" /> App Store Sandboxed • 100% On-Device
          </span>
        </div>
      </section>

      {/* iPhone Feature Highlights */}
      <section className="px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold text-cyan-700 uppercase tracking-widest">Designed for iOS Sandboxing</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">What DiskWarren Actually Does on iOS</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base">
            Apple strictly isolates apps in private sandboxes. DiskWarren does not claim to delete other apps' private files. We provide deep intelligence on authorized photos, videos, and user documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Film className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">4K & ProRes Video Inspector</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Finds heavy ProRes recordings, 4K 60fps videos, and forgotten screen recordings that consume hundreds of megabytes per minute.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> 4K & Cinematic Mode Filter</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Exact Bitrate & Duration Metrics</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Screen Recording Detection</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Duplicate Photos & Bursts</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Groups photos taken within seconds of each other, identical saved memes, and oversized burst shot series for rapid review.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Rapid Shot & Burst Analyzer</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Favorite Protection (Never Deletes Favs)</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Screenshot Filter</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">System Storage Education</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provides step-by-step guidance on clearing oversized Messages attachments, offline Spotify/Netflix downloads, and iOS System Data.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Messages Attachment Guidance</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Streaming App Cache Tips</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Deep-Links to iOS Settings</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Safety & App Store Review Compliance */}
      <section className="px-6 max-w-4xl mx-auto p-8 rounded-2xl bg-slate-900 text-white space-y-6">
        <div className="flex items-center gap-3 text-cyan-400">
          <ShieldCheck className="w-6 h-6" />
          <h2 className="text-xl font-bold">Apple App Store Review Compliant</h2>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          DiskWarren iOS strictly complies with Apple Guideline 2.3 (Accurate Representation) and 2.5 (Public APIs Only). We use official Apple PhotoKit APIs. Deleting any photo or video prompts Apple's system verification dialog, ensuring you remain in total control.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-xs font-bold text-emerald-400 block">Recently Deleted Safeguard</span>
            <p className="text-xs text-slate-300">Cleaned photos and videos move to Apple's "Recently Deleted" album, where they can be restored at any time within 30 days.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-xs font-bold text-cyan-400 block">Zero Cloud Telemetry</span>
            <p className="text-xs text-slate-300">Your photos, videos, and filenames never leave your iPhone. All analysis runs completely on-device.</p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="px-6 max-w-4xl mx-auto text-center p-10 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white space-y-6 shadow-xl shadow-cyan-600/20">
        <h2 className="text-3xl font-extrabold">Understand what's filling your iPhone.</h2>
        <p className="text-cyan-100 text-sm max-w-xl mx-auto">
          Get DiskWarren for iPhone. Native, privacy-first, and designed with modern SwiftUI.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://github.com/saiphy01/DiskWarren/releases"
            className="px-8 py-3.5 rounded-xl bg-white text-cyan-900 font-bold text-sm hover:bg-cyan-50 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Join TestFlight Beta (Free)
          </a>
          <Link
            href="/pricing"
            className="px-6 py-3.5 rounded-xl bg-cyan-700/60 hover:bg-cyan-700 text-white font-semibold text-sm border border-cyan-400/40 transition-all cursor-pointer"
          >
            Cross-Platform Power Pack ($14.99)
          </Link>
        </div>
      </section>
    </div>
  );
}
