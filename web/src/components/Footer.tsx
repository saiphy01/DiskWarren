'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HardDrive, ShieldCheck, Lock, Laptop, Smartphone } from 'lucide-react';

type Platform = 'mac' | 'windows' | 'android' | 'ios';

export default function Footer() {
  const pathname = usePathname();
  const [platform, setPlatform] = useState<Platform>('mac');
  const [isSubdomain, setIsSubdomain] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
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

    if (pathname.startsWith('/windows')) {
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

  const getUrl = (subpath: string) => {
    if (platform === 'mac' || isSubdomain) {
      return subpath === '' ? '/' : `/${subpath}`;
    }
    return subpath === '' ? `/${platform}` : `/${platform}/${subpath}`;
  };

  const getPlatformDetails = () => {
    switch (platform) {
      case 'windows':
        return {
          title: 'DiskWarren for Windows',
          description: 'Intelligent NTFS storage analysis and reversible Win32 Recycle Bin cleanup for Windows 10 and 11. Built natively in .NET 8.',
          badge: 'Windows PC',
          features: [
            { label: 'NTFS Metadata Traversal', url: getUrl('features') },
            { label: 'Squarified Treemap (C: & D:)', url: getUrl('features') },
            { label: 'Visual Studio & NuGet Cleaner', url: getUrl('features') },
            { label: 'WSL2 Docker Compaction', url: getUrl('features') },
            { label: 'Recycle Bin Reversibility', url: getUrl('safety') },
            { label: 'Explorer Context Menu', url: getUrl('features') },
          ]
        };
      case 'android':
        return {
          title: 'DiskWarren for Android',
          description: 'Modern Scoped Storage intelligence for Android phones and tablets. Reversible cleanup via native 30-day OS Trash.',
          badge: 'Android Mobile',
          features: [
            { label: 'Internal Storage & SD Card', url: getUrl('features') },
            { label: 'WhatsApp & Telegram Cleaner', url: getUrl('features') },
            { label: 'Perceptual Duplicate Photos', url: getUrl('features') },
            { label: '4K Video Inspector', url: getUrl('features') },
            { label: '30-Day OS Trash Safety', url: getUrl('safety') },
            { label: 'Google Play Family Sharing', url: getUrl('pricing') },
          ]
        };
      case 'ios':
        return {
          title: 'DiskWarren for iOS',
          description: 'PhotoKit storage intelligence and 4K ProRes video discovery for iPhone and iPad. 100% on-device neural processing.',
          badge: 'iPhone & iPad',
          features: [
            { label: 'PhotoKit Duplicate Finder', url: getUrl('features') },
            { label: 'Similar Burst Photos Clustering', url: getUrl('features') },
            { label: '4K & ProRes Video Inspector', url: getUrl('features') },
            { label: 'iCloud Photos Optimization', url: getUrl('features') },
            { label: 'Recently Deleted 30-Day Safety', url: getUrl('safety') },
            { label: 'Apple Family Sharing', url: getUrl('pricing') },
          ]
        };
      case 'mac':
      default:
        return {
          title: 'DiskWarren for Mac',
          description: 'Native Mac storage intelligence and safe cleanup. Deep analysis for Xcode, Docker, Node.js, and local AI weights.',
          badge: 'Macintosh HD',
          features: [
            { label: 'APFS Storage Analyzer', url: '/mac-storage-analyzer' },
            { label: 'Disk Space Analyzer', url: '/mac-disk-space-analyzer' },
            { label: 'Developer Cache Cleanup', url: '/developer-cleanup-mac' },
            { label: 'Local AI Weight Cleaner', url: '/mac-ai-storage-cleaner' },
            { label: 'App Uninstaller & Leftovers', url: '/mac-app-uninstaller' },
            { label: 'APFS Duplicate Finder', url: '/mac-duplicate-finder' },
          ]
        };
    }
  };

  const details = getPlatformDetails();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-12 text-slate-600 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-sm">
                <HardDrive className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">DiskWarren</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600">
              {details.description}
            </p>
            <div className="flex flex-col gap-1 text-[11px] text-slate-500 font-medium">
              <span className="font-semibold text-slate-700">{details.badge} Edition</span>
              <span>No Subscriptions • Perpetual Licenses</span>
            </div>
          </div>

          {/* Independent Native Platforms Switcher */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Independent Platforms</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="https://diskwarren.com/" className={`transition-colors font-medium ${platform === 'mac' ? 'text-cyan-600 font-bold' : 'hover:text-slate-900'}`}>
                  macOS Storage Intelligence
                </Link>
              </li>
              <li>
                <Link href="https://windows.diskwarren.com/" className={`transition-colors font-medium ${platform === 'windows' ? 'text-blue-600 font-bold' : 'hover:text-slate-900'}`}>
                  Windows Storage Intelligence
                </Link>
              </li>
              <li>
                <Link href="https://android.diskwarren.com/" className={`transition-colors font-medium ${platform === 'android' ? 'text-emerald-600 font-bold' : 'hover:text-slate-900'}`}>
                  Android Storage Intelligence
                </Link>
              </li>
              <li>
                <Link href="https://ios.diskwarren.com/" className={`transition-colors font-medium ${platform === 'ios' ? 'text-purple-600 font-bold' : 'hover:text-slate-900'}`}>
                  iPhone &amp; iPad Intelligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Current Platform's Standalone Pages */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">{details.badge} Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href={getUrl('features')} className="hover:text-slate-900 transition-colors">Features &amp; Specs</Link></li>
              <li><Link href={getUrl('safety')} className="hover:text-slate-900 transition-colors">Safety Architecture</Link></li>
              <li><Link href={getUrl('pricing')} className="hover:text-slate-900 transition-colors">Pricing &amp; Licenses</Link></li>
              <li><Link href={getUrl('download')} className="hover:text-slate-900 transition-colors">Download {details.badge}</Link></li>
              <li><Link href={getUrl('faq')} className="hover:text-slate-900 transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href={getUrl('system-requirements')} className="hover:text-slate-900 transition-colors">System Requirements</Link></li>
            </ul>
          </div>

          {/* Platform Feature Capabilities */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">{details.badge} Capabilities</h4>
            <ul className="space-y-2 text-xs">
              {details.features.map((feat, idx) => (
                <li key={idx}>
                  <Link href={feat.url} className="hover:text-slate-900 transition-colors">
                    {feat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust, Legal & Support */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Trust &amp; Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/security" className="hover:text-slate-900 transition-colors">Security Architecture</Link></li>
              <li><Link href={getUrl('privacy')} className="hover:text-slate-900 transition-colors">Zero-Telemetry Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="hover:text-slate-900 transition-colors">30-Day Refund Policy</Link></li>
              <li><Link href="/release-notes" className="hover:text-slate-900 transition-colors">Release Notes (v1.0.0)</Link></li>
              <li><Link href="/support" className="hover:text-slate-900 transition-colors">Support &amp; Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & badges */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} DiskWarren Team. All rights reserved. {details.title}.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-emerald-600" /> 100% On-Device Local</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Reversible Safety</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
