'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HardDrive, Download, Menu, X, ArrowRight, ShieldCheck, Zap, ChevronDown, Laptop, Smartphone } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformsOpen, setPlatformsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setPlatformsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <HardDrive className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Disk<span className="text-cyan-600">Warren</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          {/* Platforms Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setPlatformsOpen(!platformsOpen)}
              className="flex items-center gap-1 hover:text-cyan-600 transition-colors cursor-pointer py-2"
            >
              <span>Platforms</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 w-64 p-2 bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-200/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 space-y-1">
              <Link
                href="/"
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-md bg-cyan-50 text-cyan-600 flex items-center justify-center">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Macintosh HD</span>
                  <span className="text-[11px] text-slate-500 block">macOS Monterey to Sequoia</span>
                </div>
              </Link>

              <Link
                href="/windows"
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                  <HardDrive className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Windows PC</span>
                  <span className="text-[11px] text-slate-500 block">Drive analysis &amp; developer caches</span>
                </div>
              </Link>

              <Link
                href="/android"
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Android Mobile</span>
                  <span className="text-[11px] text-slate-500 block">Scoped storage &amp; large media</span>
                </div>
              </Link>

              <Link
                href="/ios"
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">iPhone &amp; iPad</span>
                  <span className="text-[11px] text-slate-500 block">4K videos &amp; photo duplicates</span>
                </div>
              </Link>
            </div>
          </div>

          <Link href="/#simulator" className="hover:text-cyan-600 transition-colors">Interactive Demo</Link>
          <Link href="/#developer-ai" className="hover:text-cyan-600 transition-colors">Developer &amp; AI</Link>
          <Link href="/#safety" className="hover:text-cyan-600 transition-colors">Safety by Design</Link>
          <Link href="/pricing" className="hover:text-cyan-600 transition-colors">Pricing</Link>
          <Link href="/blog" className="hover:text-cyan-600 transition-colors">Guides</Link>
          <Link href="/support" className="hover:text-cyan-600 transition-colors">Support</Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/download"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold transition-all shadow-sm shadow-cyan-600/25 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download v1.0</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/download"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 text-white text-xs font-semibold shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Get App</span>
          </Link>

          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 block">Platforms</span>
            <div className="grid grid-cols-2 gap-2 pt-1 pb-2">
              <Link href="/" onClick={closeMobileMenu} className="p-2.5 rounded-lg bg-slate-50 text-xs font-bold text-slate-800 flex items-center gap-2">
                <Laptop className="w-3.5 h-3.5 text-cyan-600" /> Mac
              </Link>
              <Link href="/windows" onClick={closeMobileMenu} className="p-2.5 rounded-lg bg-slate-50 text-xs font-bold text-slate-800 flex items-center gap-2">
                <HardDrive className="w-3.5 h-3.5 text-blue-600" /> Windows
              </Link>
              <Link href="/android" onClick={closeMobileMenu} className="p-2.5 rounded-lg bg-slate-50 text-xs font-bold text-slate-800 flex items-center gap-2">
                <Smartphone className="w-3.5 h-3.5 text-emerald-600" /> Android
              </Link>
              <Link href="/ios" onClick={closeMobileMenu} className="p-2.5 rounded-lg bg-slate-50 text-xs font-bold text-slate-800 flex items-center gap-2">
                <Smartphone className="w-3.5 h-3.5 text-purple-600" /> iPhone
              </Link>
            </div>
          </div>

          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700 pt-2 border-t border-slate-100">
            <Link 
              href="/#simulator" 
              onClick={closeMobileMenu}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-cyan-600 transition-colors flex items-center justify-between"
            >
              <span>Interactive Storage Demo</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link 
              href="/#developer-ai" 
              onClick={closeMobileMenu}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-cyan-600 transition-colors flex items-center justify-between"
            >
              <span>Developer &amp; AI Storage</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link 
              href="/#safety" 
              onClick={closeMobileMenu}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-cyan-600 transition-colors flex items-center justify-between"
            >
              <span>Safety by Design</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link 
              href="/pricing" 
              onClick={closeMobileMenu}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-cyan-600 transition-colors flex items-center justify-between"
            >
              <span>Pricing (No Subscriptions)</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link 
              href="/blog" 
              onClick={closeMobileMenu}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-cyan-600 transition-colors flex items-center justify-between"
            >
              <span>Storage Guides</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link 
              href="/support" 
              onClick={closeMobileMenu}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-cyan-600 transition-colors flex items-center justify-between"
            >
              <span>Support &amp; Help Center</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              href="/download"
              onClick={closeMobileMenu}
              className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm text-center shadow-md shadow-cyan-600/25 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download DiskWarren Universal DMG</span>
            </Link>
            <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-cyan-600" /> 100% Local Privacy</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-500" /> Mac • Windows • Mobile</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
