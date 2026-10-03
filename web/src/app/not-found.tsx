import React from 'react';
import Link from 'next/link';
import { HardDrive, Download, Home, BookOpen, LifeBuoy, ArrowRight, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-10">
      <div className="space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center mx-auto shadow-sm">
          <HardDrive className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-semibold">
          <span>Error 404: Inode Not Found</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Lost in the Filesystem?
        </h1>

        <p className="text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
          The path you are attempting to access does not exist or has been relocated to another directory on DiskWarren.
        </p>
      </div>

      {/* Suggested Quick Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
        <Link
          href="/"
          className="p-5 rounded-xl bg-white border border-slate-200 hover:border-cyan-300 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Home className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
            Homepage
          </h3>
          <p className="text-xs text-slate-500">
            Storage intelligence &amp; interactive simulator.
          </p>
        </Link>

        <Link
          href="/download"
          className="p-5 rounded-xl bg-white border border-slate-200 hover:border-cyan-300 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Download className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
            Download App
          </h3>
          <p className="text-xs text-slate-500">
            Get the native macOS Universal 2 DMG.
          </p>
        </Link>

        <Link
          href="/blog"
          className="p-5 rounded-xl bg-white border border-slate-200 hover:border-cyan-300 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
            Storage Guides
          </h3>
          <p className="text-xs text-slate-500">
            Xcode, Docker, Ollama &amp; System Data tutorials.
          </p>
        </Link>

        <Link
          href="/support"
          className="p-5 rounded-xl bg-white border border-slate-200 hover:border-cyan-300 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <LifeBuoy className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
            Support Center
          </h3>
          <p className="text-xs text-slate-500">
            Direct tickets &amp; searchable FAQ knowledge base.
          </p>
        </Link>
      </div>

      <div className="pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all shadow-md shadow-cyan-600/25"
        >
          <span>Return to Safety</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
