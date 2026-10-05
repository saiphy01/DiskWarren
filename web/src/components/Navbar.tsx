'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HardDrive, 
  Download, 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  ChevronDown, 
  Laptop, 
  Smartphone,
  Check
} from 'lucide-react';

type Platform = 'mac' | 'windows' | 'android' | 'ios' | 'recovery';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformsOpen, setPlatformsOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>('mac');
  const [isSubdomain, setIsSubdomain] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      if (host.startsWith('recovery.')) {
        setPlatform('recovery');
        setIsSubdomain(true);
        return;
      }
      if (host.startsWith('windows.')) {
        setPlatform('windows');
        setIsSubdomain(true);
        return;
      }
      if (host.startsWith('android.')) {
        setPlatform('android');
        setIsSubdomain(true);
        return;
      }
      if (host.startsWith('ios.')) {
        setPlatform('ios');
        setIsSubdomain(true);
        return;
      }
    }

    if (pathname.startsWith('/recovery')) {
      setPlatform('recovery');
      setIsSubdomain(false);
    } else if (pathname.startsWith('/windows')) {
      setPlatform('windows');
      setIsSubdomain(false);
    } else if (pathname.startsWith('/android')) {
      setPlatform('android');
      setIsSubdomain(false);
    } else if (pathname.startsWith('/ios')) {
      setPlatform('ios');
      setIsSubdomain(false);
    } else {
      setPlatform('mac');
      setIsSubdomain(false);
    }
  }, [pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setPlatformsOpen(false);
  };

  // Helper to generate correct internal URLs for the active platform
  const getUrl = (subpath: string) => {
    if (platform === 'mac') {
      return subpath === '' ? '/' : `/${subpath}`;
    }
    if (isSubdomain) {
      return subpath === '' ? '/' : `/${subpath}`;
    }
    return subpath === '' ? `/${platform}` : `/${platform}/${subpath}`;
  };

  // Platform-specific styling & labels
  const getBrandDetails = () => {
    switch (platform) {
      case 'recovery':
        return {
          title: 'DiskWarren',
          badge: 'Recover',
          accentColor: 'text-teal-600',
          gradientBg: 'from-teal-600 to-emerald-600',
          shadowColor: 'shadow-teal-500/20',
          ctaBg: 'bg-teal-600 hover:bg-teal-500',
          ctaShadow: 'shadow-teal-600/25',
          ctaLabel: 'Download Scanner',
          icon: <ShieldCheck className="w-5 h-5 text-white stroke-[2.5]" />
        };
      case 'windows':
        return {
          title: 'DiskWarren',
          badge: 'Windows',
          accentColor: 'text-blue-600',
          gradientBg: 'from-blue-600 to-indigo-600',
          shadowColor: 'shadow-blue-500/20',
          ctaBg: 'bg-blue-600 hover:bg-blue-500',
          ctaShadow: 'shadow-blue-600/25',
          ctaLabel: 'Download for PC',
          icon: <HardDrive className="w-5 h-5 text-white stroke-[2.5]" />
        };
      case 'android':
        return {
          title: 'DiskWarren',
          badge: 'Android',
          accentColor: 'text-emerald-600',
          gradientBg: 'from-emerald-600 to-teal-700',
          shadowColor: 'shadow-emerald-500/20',
          ctaBg: 'bg-emerald-600 hover:bg-emerald-500',
          ctaShadow: 'shadow-emerald-600/25',
          ctaLabel: 'Google Play',
          icon: <Smartphone className="w-5 h-5 text-white stroke-[2.5]" />
        };
      case 'ios':
        return {
          title: 'DiskWarren',
          badge: 'iOS',
          accentColor: 'text-purple-600',
          gradientBg: 'from-purple-600 to-indigo-600',
          shadowColor: 'shadow-purple-500/20',
          ctaBg: 'bg-purple-600 hover:bg-purple-500',
          ctaShadow: 'shadow-purple-600/25',
          ctaLabel: 'App Store',
          icon: <Smartphone className="w-5 h-5 text-white stroke-[2.5]" />
        };
      case 'mac':
      default:
        return {
          title: 'DiskWarren',
          badge: 'Mac',
          accentColor: 'text-cyan-600',
          gradientBg: 'from-cyan-500 to-blue-600',
          shadowColor: 'shadow-cyan-500/20',
          ctaBg: 'bg-cyan-600 hover:bg-cyan-500',
          ctaShadow: 'shadow-cyan-600/25',
          ctaLabel: 'Download v1.0',
          icon: <Laptop className="w-5 h-5 text-white stroke-[2.5]" />
        };
    }
  };

  const brand = getBrandDetails();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href={getUrl('')} onClick={closeMobileMenu} className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-md shadow-cyan-900/15 group-hover:scale-105 group-hover:shadow-cyan-500/25 transition-all">
            <img src="/logo-icon.svg" alt="DiskWarren Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Disk<span className={brand.accentColor}>Warren</span>
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200`}>
              {brand.badge}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          {/* Platforms Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setPlatformsOpen(!platformsOpen)}
              className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer py-2"
            >
              <span>Platforms</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 w-64 p-2 bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-200/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 space-y-1">
              <Link
                href="https://diskwarren.com/"
                className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${platform === 'mac' ? 'bg-cyan-50/70 border border-cyan-100' : 'hover:bg-slate-50'}`}
              >
                <div className="w-8 h-8 rounded-md bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                  <Laptop className="w-4 h-4" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 block">Macintosh HD</span>
                    {platform === 'mac' && <Check className="w-3.5 h-3.5 text-cyan-600" />}
                  </div>
                  <span className="text-[11px] text-slate-500 block">macOS Monterey to Sequoia</span>
                </div>
              </Link>

              <Link
                href="https://windows.diskwarren.com/"
                className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${platform === 'windows' ? 'bg-blue-50/70 border border-blue-100' : 'hover:bg-slate-50'}`}
              >
                <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <HardDrive className="w-4 h-4" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 block">Windows PC</span>
                    {platform === 'windows' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </div>
                  <span className="text-[11px] text-slate-500 block">NTFS &amp; developer caches</span>
                </div>
              </Link>

              <Link
                href="https://android.diskwarren.com/"
                className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${platform === 'android' ? 'bg-emerald-50/70 border border-emerald-100' : 'hover:bg-slate-50'}`}
              >
                <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 block">Android Mobile</span>
                    {platform === 'android' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <span className="text-[11px] text-slate-500 block">Scoped storage &amp; 30-day trash</span>
                </div>
              </Link>

              <Link
                href="https://ios.diskwarren.com/"
                className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${platform === 'ios' ? 'bg-purple-50/70 border border-purple-100' : 'hover:bg-slate-50'}`}
              >
                <div className="w-8 h-8 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 block">iPhone &amp; iPad</span>
                    {platform === 'ios' && <Check className="w-3.5 h-3.5 text-purple-600" />}
                  </div>
                  <span className="text-[11px] text-slate-500 block">PhotoKit &amp; ProRes video</span>
                </div>
              </Link>

              <Link
                href="https://recovery.diskwarren.com/"
                className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${platform === 'recovery' ? 'bg-teal-50/70 border border-teal-100' : 'hover:bg-slate-50'}`}
              >
                <div className="w-8 h-8 rounded-md bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 block">DiskWarren Recover</span>
                    {platform === 'recovery' && <Check className="w-3.5 h-3.5 text-teal-600" />}
                  </div>
                  <span className="text-[11px] text-slate-500 block">Safe read-only data recovery</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Active Platform's Standalone Links */}
          <Link href={getUrl('features')} className="hover:text-slate-900 transition-colors">Features</Link>
          <Link href={getUrl('safety')} className="hover:text-slate-900 transition-colors">Safety</Link>
          <Link href={getUrl('pricing')} className="hover:text-slate-900 transition-colors">Pricing</Link>
          <Link href={getUrl('faq')} className="hover:text-slate-900 transition-colors">FAQ</Link>
          <Link href="/support" className="hover:text-slate-900 transition-colors">Support</Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={getUrl('download')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${brand.ctaBg} text-white text-sm font-semibold transition-all shadow-sm ${brand.ctaShadow} active:scale-95 cursor-pointer`}
          >
            <Download className="w-4 h-4" />
            <span>{brand.ctaLabel}</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href={getUrl('download')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${brand.ctaBg} text-white text-xs font-semibold shadow-xs`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Get App</span>
          </Link>

          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400/20"
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
              <Link 
                href="https://diskwarren.com/" 
                onClick={closeMobileMenu} 
                className={`p-2.5 rounded-lg text-xs font-bold flex items-center gap-2 ${platform === 'mac' ? 'bg-cyan-50 text-cyan-900 border border-cyan-200' : 'bg-slate-50 text-slate-800'}`}
              >
                <Laptop className="w-3.5 h-3.5 text-cyan-600" /> Mac
              </Link>
              <Link 
                href="https://windows.diskwarren.com/" 
                onClick={closeMobileMenu} 
                className={`p-2.5 rounded-lg text-xs font-bold flex items-center gap-2 ${platform === 'windows' ? 'bg-blue-50 text-blue-900 border border-blue-200' : 'bg-slate-50 text-slate-800'}`}
              >
                <HardDrive className="w-3.5 h-3.5 text-blue-600" /> Windows
              </Link>
              <Link 
                href="https://android.diskwarren.com/" 
                onClick={closeMobileMenu} 
                className={`p-2.5 rounded-lg text-xs font-bold flex items-center gap-2 ${platform === 'android' ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-slate-50 text-slate-800'}`}
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-600" /> Android
              </Link>
              <Link 
                href="https://ios.diskwarren.com/" 
                onClick={closeMobileMenu} 
                className={`p-2.5 rounded-lg text-xs font-bold flex items-center gap-2 ${platform === 'ios' ? 'bg-purple-50 text-purple-900 border border-purple-200' : 'bg-slate-50 text-slate-800'}`}
              >
                <Smartphone className="w-3.5 h-3.5 text-purple-600" /> iPhone
              </Link>
              <Link 
                href="https://recovery.diskwarren.com/" 
                onClick={closeMobileMenu} 
                className={`col-span-2 p-2.5 rounded-lg text-xs font-bold flex items-center gap-2 ${platform === 'recovery' ? 'bg-teal-50 text-teal-900 border border-teal-200' : 'bg-slate-50 text-slate-800'}`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> DiskWarren Recover (Safe Data Restore)
              </Link>
            </div>
          </div>

          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700 pt-2 border-t border-slate-100">
            <Link 
              href={getUrl('features')} 
              onClick={closeMobileMenu}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span>Features &amp; Architecture</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link 
              href={getUrl('safety')} 
              onClick={closeMobileMenu}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span>Safety by Design</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link 
              href={getUrl('pricing')} 
              onClick={closeMobileMenu}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span>Pricing (No Subscriptions)</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link 
              href={getUrl('faq')} 
              onClick={closeMobileMenu}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span>Frequently Asked Questions</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link 
              href="/support" 
              onClick={closeMobileMenu}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span>Support &amp; Help Center</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              href={getUrl('download')}
              onClick={closeMobileMenu}
              className={`w-full py-3 rounded-xl ${brand.ctaBg} text-white font-bold text-sm text-center shadow-md ${brand.ctaShadow} flex items-center justify-center gap-2`}
            >
              <Download className="w-4 h-4" />
              <span>{brand.ctaLabel}</span>
            </Link>
            <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Local Privacy</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-500" /> Zero Cloud Telemetry</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
