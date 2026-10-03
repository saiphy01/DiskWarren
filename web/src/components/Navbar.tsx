'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HardDrive, Download, Menu, X, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
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
        <div className="md:hidden bg-white border-b border-slate-200 px-6 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 text-sm font-medium text-slate-700">
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
              <span>macOS Storage Guides</span>
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
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-500" /> macOS 14 &amp; 15+</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
