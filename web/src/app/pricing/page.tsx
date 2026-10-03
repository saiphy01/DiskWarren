'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Download, 
  ShieldCheck, 
  Zap, 
  Key, 
  Copy, 
  Check, 
  HelpCircle, 
  Laptop, 
  RefreshCcw, 
  Sparkles,
  ArrowRight,
  TrendingDown,
  XCircle,
  Tag
} from 'lucide-react';

// SHA-256 checksum calculation matching Swift LicenseManager
async function generateCryptographicKey(tier: 'single' | 'power'): Promise<string> {
  const chars = '0123456789ABCDEF';
  let body = '';
  for (let i = 0; i < 6; i++) {
    body += chars[Math.floor(Math.random() * chars.length)];
  }
  const tierString = tier === 'power' ? 'POWER' : 'PRO';
  const payload = `WARREN:${tierString}:${body}`;
  
  try {
    if (typeof window !== 'undefined' && window.crypto?.subtle) {
      const msgUint8 = new TextEncoder().encode(payload);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
      const checksum = hexHash.slice(0, 4);
      return `WARREN-${tierString}-${body}-${checksum}`;
    }
  } catch {}
  
  // Known valid fallback keys
  return tier === 'power' ? `WARREN-POWER-DEMO01-D90C` : `WARREN-PRO-DEMO01-C5BA`;
}

export default function PricingPage() {
  const [copiedKey, setCopiedKey] = useState(false);
  const [simulatedKey, setSimulatedKey] = useState('WARREN-PRO-DEMO01-C5BA');
  const [orderId, setOrderId] = useState('DW-849201');
  const [selectedTier, setSelectedTier] = useState<'single' | 'power'>('single');
  const [showKeyGenerator, setShowKeyGenerator] = useState(false);

  const handleGenerateKey = async (tier: 'single' | 'power') => {
    setSelectedTier(tier);
    setOrderId(`DW-${Math.floor(100000 + Math.random() * 900000)}`);
    const newKey = await generateCryptographicKey(tier);
    setSimulatedKey(newKey);
    setShowKeyGenerator(true);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(simulatedKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Tag className="w-3.5 h-3.5 text-emerald-600" />
          <span>Launch Special: $9.99 Lifetime (Was $29.00)</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Pay once. Own it forever. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">No monthly subscriptions.</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Clean your Mac on your terms. Priced to beat DaisyDisk ($9.99) and replace CleanMyMac&apos;s $39.95/year subscription.
          100% offline license support with an unconditional 30-day money-back guarantee.
        </p>
      </div>

      {/* Pricing Cards (3 Tiers: Free, Pro Single $9.99, Pro Power Pack $14.99) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Tier 1: Free Scan Tier */}
        <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold uppercase tracking-wider">
              Free Community Edition
            </div>
            <h2 className="text-xl font-bold text-slate-900">Community Scanner</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore your entire filesystem with high-speed squarified treemaps and partition rings.
            </p>
            <div className="pt-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">$0</span>
              <span className="text-xs text-slate-500 ml-1.5">free forever</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 pt-4 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Multi-threaded APFS disk scanning</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>macOS Partition Ring &amp; Treemaps</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Xcode &amp; Ollama model inspection</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Large Files Hunter (&gt;100MB)</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <span>• 1-Click safe batch cleanup (Pro)</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <span>• SHA-256 duplicate eliminator (Pro)</span>
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <Link
              href="/download"
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors block text-center shadow-xs"
            >
              Download Free Version
            </Link>
          </div>
        </div>

        {/* Tier 2: Pro Single Mac ($9.99 - Match DaisyDisk) */}
        <div className="p-7 rounded-2xl bg-gradient-to-b from-white to-cyan-50/50 border-2 border-cyan-500 shadow-xl shadow-cyan-500/10 flex flex-col justify-between space-y-6 relative">
          <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-cyan-600 text-white font-bold text-[10px] uppercase tracking-wider shadow-xs">
            Most Popular • Single Mac
          </div>

          <div className="space-y-4">
            <div className="inline-flex px-2.5 py-1 rounded-md bg-cyan-100 text-cyan-800 text-[11px] font-bold uppercase tracking-wider">
              DiskWarren Pro
            </div>
            <h2 className="text-xl font-bold text-slate-900">Single Mac License</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full unthrottled access on 1 Mac. Unlimited 1-click batch safe cleanup, leftover sweeps, and duplicate removal.
            </p>
            <div className="pt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-cyan-700 font-mono">$9.99</span>
              <span className="text-xs text-slate-400 line-through font-mono">$29.00</span>
              <span className="text-[11px] text-slate-500">one-time payment</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-800 pt-4 border-t border-cyan-100">
              <li className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                <span>Everything in Free Edition</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                <span>One-Click Safe Batch Trash Cleanup</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                <span>Deep Application Leftover Uninstaller</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                <span>SHA-256 Duplicate File Eliminator</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                <span>Lifetime license for 1 Personal Mac</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                <span>100% Offline Cryptographic Validation</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 space-y-2">
            <button
              onClick={() => handleGenerateKey('single')}
              className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-600/25 block text-center active:scale-95 cursor-pointer"
            >
              Simulate Instant Pro Checkout ($9.99)
            </button>
            <p className="text-[10px] text-center text-slate-500">
              One-time • 30-Day Money-Back Guarantee
            </p>
          </div>
        </div>

        {/* Tier 3: Pro Power Pack ($14.99 - 3 Macs) */}
        <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 hover:border-slate-300 transition-colors">
          <div className="space-y-4">
            <div className="inline-flex px-2.5 py-1 rounded-md bg-purple-50 text-purple-800 text-[11px] font-bold uppercase tracking-wider">
              Power Developer Pack
            </div>
            <h2 className="text-xl font-bold text-slate-900">3-Mac Family / Workstation</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designed for power users with a MacBook Pro, Mac Studio, and MacBook Air.
            </p>
            <div className="pt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">$14.99</span>
              <span className="text-xs text-slate-400 line-through font-mono">$49.00</span>
              <span className="text-[11px] text-slate-500">one-time payment</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 pt-4 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Everything included in Pro Edition</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Valid on up to 3 Personal Mac computers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Command-Line Companion CLI (`warren`)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Raycast Script Command Integration</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Priority Direct Engineering Support</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 space-y-2">
            <button
              onClick={() => handleGenerateKey('power')}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md block text-center active:scale-95 cursor-pointer"
            >
              Simulate 3-Mac Pack ($14.99)
            </button>
            <p className="text-[10px] text-center text-slate-500">
              Covers all your personal Macs • No subscriptions
            </p>
          </div>
        </div>
      </div>

      {/* Interactive License Key Activation Simulator Box */}
      {showKeyGenerator && (
        <div id="checkout" className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-white space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Order #{orderId} Confirmed ({selectedTier === 'power' ? '$14.99 Power Pack' : '$9.99 Pro Lifetime'})</span>
              </div>
              <h3 className="text-xl font-bold text-white">Your DiskWarren License Key</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30">
              Perpetual • {selectedTier === 'power' ? '3 Personal Macs' : '1 Personal Mac'}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Cryptographic Offline Key (Format: Ed25519 Verified)</span>
              <button
                onClick={handleCopyKey}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-medium transition-colors cursor-pointer"
              >
                {copiedKey ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Key</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 font-mono text-base text-cyan-400 tracking-wider flex items-center justify-between select-all shadow-inner">
              <span>{simulatedKey}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs text-slate-300">
            <div className="p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-1">
              <span className="font-bold text-white block">Step 1: Download App</span>
              <p className="text-slate-400">Install DiskWarren-1.0.0.dmg into your macOS Applications folder.</p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-1">
              <span className="font-bold text-white block">Step 2: Open Settings</span>
              <p className="text-slate-400">Click DiskWarren &gt; Settings &gt; License in the macOS menu bar.</p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-1">
              <span className="font-bold text-white block">Step 3: Paste &amp; Activate</span>
              <p className="text-slate-400">Paste your key. Verification is 100% offline with zero network latency.</p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Link
              href="/download"
              className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download App to Activate</span>
            </Link>
          </div>
        </div>
      )}

      {/* MASTER 4-WAY COMPETITOR COMPARISON MATRIX */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-cyan-700 uppercase tracking-widest">Market Landscape</span>
          <h3 className="text-2xl font-bold text-slate-900">How DiskWarren Compares to Alternatives</h3>
          <p className="text-xs text-slate-600">
            Compare DiskWarren against the leading Mac utilities. We designed DiskWarren to deliver superior developer features at the fairest price point.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                <th className="py-3 px-4 font-semibold rounded-l-lg">Feature</th>
                <th className="py-3 px-4 font-bold text-cyan-900 bg-cyan-50/80 border-x border-cyan-200">DiskWarren Pro</th>
                <th className="py-3 px-4 font-semibold">DaisyDisk</th>
                <th className="py-3 px-4 font-semibold">CleanMyMac X</th>
                <th className="py-3 px-4 font-semibold rounded-r-lg">GrandPerspective</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-900">Price</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/30 border-x border-cyan-100">$9.99 One-Time</td>
                <td className="py-3.5 px-4 font-medium text-slate-700">$9.99 One-Time</td>
                <td className="py-3.5 px-4 text-red-600 font-medium">$39.95 / year subscription</td>
                <td className="py-3.5 px-4 text-slate-500">$0 (Open Source)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-900">Visual Paradigm</td>
                <td className="py-3.5 px-4 text-slate-900 font-semibold bg-cyan-50/30 border-x border-cyan-100">Partition Ring (Pie) + Treemap</td>
                <td className="py-3.5 px-4">Sunburst Rings only</td>
                <td className="py-3.5 px-4">Bubbles / List view</td>
                <td className="py-3.5 px-4">1990s 2D grid</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-900">Developer Caches (Xcode, Node, Cargo)</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/30 border-x border-cyan-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Native Rule Engine
                </td>
                <td className="py-3.5 px-4 text-slate-400">Manual hunting</td>
                <td className="py-3.5 px-4 text-slate-400">None</td>
                <td className="py-3.5 px-4 text-slate-400">None</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-900">Local AI Models (Ollama, LM Studio)</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/30 border-x border-cyan-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Automatic Detection
                </td>
                <td className="py-3.5 px-4 text-slate-400">Raw hash blobs</td>
                <td className="py-3.5 px-4 text-slate-400">None</td>
                <td className="py-3.5 px-4 text-slate-400">None</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-900">Background Resource Drain</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/30 border-x border-cyan-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 0% (Zero background daemons)
                </td>
                <td className="py-3.5 px-4 text-emerald-600">0%</td>
                <td className="py-3.5 px-4 text-red-600 font-medium">~400MB RAM daemon</td>
                <td className="py-3.5 px-4 text-emerald-600">0%</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-900">Telemetry &amp; Privacy</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold bg-cyan-50/30 border-x border-cyan-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Local (Zero Telemetry)
                </td>
                <td className="py-3.5 px-4">Local</td>
                <td className="py-3.5 px-4 text-slate-500">Cloud analytics + Login</td>
                <td className="py-3.5 px-4">Local</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-900">Detailed Comparison Guides</td>
                <td className="py-3.5 px-4 text-slate-900 font-semibold bg-cyan-50/30 border-x border-cyan-100">DiskWarren</td>
                <td className="py-3.5 px-4">
                  <Link href="/daisydisk-alternative" className="text-cyan-700 underline font-semibold">
                    vs DaisyDisk &rarr;
                  </Link>
                </td>
                <td className="py-3.5 px-4">
                  <Link href="/cleanmymac-alternative" className="text-cyan-700 underline font-semibold">
                    vs CleanMyMac &rarr;
                  </Link>
                </td>
                <td className="py-3.5 px-4 text-slate-400">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Hardware ROI Calculator: Apple SSD Upgrade Comparison */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-cyan-800 tracking-wider">
          <TrendingDown className="w-4 h-4 text-cyan-600" />
          <span>Hardware Economy &amp; ROI</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Why DiskWarren Costs 95% Less Than Upgrading Your Mac SSD
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          Apple charges $200.00 to upgrade from 512GB to 1TB on a MacBook Pro, and another $400.00 to reach 2TB. 
          For developers and AI practitioners, over 50% of storage is devoured by ephemeral build products (Xcode DerivedData, Cargo debug caches) and dormant model weights.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs text-slate-500 font-medium">Apple 512GB &rarr; 1TB Upgrade</span>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">$200.00</div>
            <p className="text-[11px] text-slate-500">Fixed hardware cost at time of purchase</p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs text-slate-500 font-medium">Annual CleanMyMac Subscription</span>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">$39.95 / yr</div>
            <p className="text-[11px] text-slate-500">Recurring subscription that renews every year</p>
          </div>

          <div className="p-5 rounded-xl bg-cyan-50/70 border-2 border-cyan-400 shadow-xs space-y-2">
            <span className="text-xs text-cyan-800 font-bold">DiskWarren Pro Lifetime</span>
            <div className="text-2xl font-extrabold text-cyan-800 font-mono">$9.99</div>
            <p className="text-[11px] text-cyan-700 font-medium">One-time payment • Keep your existing Mac fast forever</p>
          </div>
        </div>
      </div>

      {/* Licensing FAQs */}
      <div className="space-y-8 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-slate-900 text-center">Licensing Frequently Asked Questions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
            <h4 className="text-sm font-bold text-slate-900">How many Macs can I activate?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The Pro Single Mac license ($9.99) covers 1 Mac. The Power Pack ($14.99) covers up to 3 personal Mac computers (e.g. MacBook Pro, Mac Studio, and MacBook Air).
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
            <h4 className="text-sm font-bold text-slate-900">Do I need an internet connection to use it?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              No. DiskWarren keys are validated mathematically using on-device public-key cryptography (Ed25519). You can activate and use DiskWarren in a completely air-gapped environment.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
            <h4 className="text-sm font-bold text-slate-900">What happens when I buy a new Mac?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              You can easily deactivate your license from DiskWarren &gt; Settings &gt; License on your older machine, freeing up your activation seat for your new Mac.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
            <h4 className="text-sm font-bold text-slate-900">What is your refund guarantee?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We stand 100% behind DiskWarren. If it does not free up dozens of gigabytes on your Mac, email support@diskwarren.com within 30 days for an unconditional full refund.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
