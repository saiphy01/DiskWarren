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
  TrendingDown
} from 'lucide-react';

export default function PricingPage() {
  const [copiedKey, setCopiedKey] = useState(false);
  const [simulatedKey, setSimulatedKey] = useState('WARREN-PRO-9F82A4-7C1E');
  const [licenseType, setLicenseType] = useState<'single' | 'team'>('single');
  const [showKeyGenerator, setShowKeyGenerator] = useState(false);

  const handleGenerateKey = () => {
    const chars = '0123456789ABCDEF';
    let part1 = '';
    let part2 = '';
    for (let i = 0; i < 6; i++) part1 += chars[Math.floor(Math.random() * chars.length)];
    for (let i = 0; i < 4; i++) part2 += chars[Math.floor(Math.random() * chars.length)];
    const newKey = `WARREN-PRO-${part1}-${part2}`;
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-4 h-4 text-cyan-600" />
          <span>Transparent, Honest Pricing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Pay once. Own it forever. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">No monthly subscriptions.</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Clean your Mac on your terms. All licenses work 100% offline, include free v1.x updates, and are protected by an unconditional 30-day money-back guarantee.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Free Scan Tier */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              Free Scan Edition
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Community Scanner</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Explore your entire filesystem, drill down with high-speed squarified treemaps, and inspect bloated developer or AI model directories with zero cost.
            </p>
            <div className="pt-2">
              <span className="text-4xl font-extrabold text-slate-900 font-mono">$0</span>
              <span className="text-xs text-slate-500 ml-2">free forever</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-700 pt-4 border-t border-slate-100">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Multi-threaded APFS filesystem scanning (12,000+ files/sec)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Interactive Squarified Treemap navigation</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full inspection of Xcode DerivedData &amp; Ollama model weights</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Large Files Hunter (&gt;100MB) with in-memory search</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <span>• One-click safe batch cleanup (Requires Pro)</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <span>• SHA-256 duplicate eliminator (Requires Pro)</span>
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <Link
              href="/download"
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-colors block text-center shadow-xs"
            >
              Download Free Version
            </Link>
          </div>
        </div>

        {/* Pro Lifetime Tier */}
        <div className="p-8 rounded-2xl bg-gradient-to-b from-white to-cyan-50/50 border-2 border-cyan-500 shadow-xl shadow-cyan-500/10 flex flex-col justify-between space-y-6 relative">
          <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm">
            Most Popular • Lifetime
          </div>

          <div className="space-y-4">
            <div className="inline-flex px-3 py-1 rounded-md bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider">
              DiskWarren Pro
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Perpetual License</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Unlock one-click batch safe cleanup, leftover app sweeps, duplicate detection, and full offline cryptographic validation on up to 3 personal Macs.
            </p>
            <div className="pt-2">
              <span className="text-4xl font-extrabold text-cyan-700 font-mono">$29</span>
              <span className="text-xs text-slate-500 ml-2">one-time payment • no renewal fees</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-800 pt-4 border-t border-cyan-100">
              <li className="flex items-center gap-2.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Everything included in Free Edition</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>One-Click Safe Batch Trash Cleanup with Put Back</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Deep Application Uninstaller (sweeps ~/Library leftovers)</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Block-level SHA-256 Duplicate File Eliminator</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Valid on up to 3 Personal Mac computers</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>100% Offline Activation &amp; Zero Cloud Telemetry</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 space-y-3">
            <button
              onClick={handleGenerateKey}
              className="w-full py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold transition-all shadow-md shadow-cyan-600/25 block text-center active:scale-95 cursor-pointer"
            >
              Simulate Instant Pro Checkout ($29)
            </button>
            <p className="text-[11px] text-center text-slate-500">
              Secure 256-bit checkout • Instant key delivery • 30-Day Money-Back Guarantee
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
                <span>Order #DW-{Math.floor(100000 + Math.random() * 900000)} Confirmed</span>
              </div>
              <h3 className="text-xl font-bold text-white">Your DiskWarren Pro License Key</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30">
              Perpetual • 3 Macs
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

      {/* Hardware ROI Calculator: Apple SSD Upgrade Comparison */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-cyan-800 tracking-wider">
          <TrendingDown className="w-4 h-4 text-cyan-600" />
          <span>Hardware Economy &amp; ROI</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Why DiskWarren Costs 90% Less Than Upgrading Your Mac SSD
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          Apple charges $200.00 to upgrade from 512GB to 1TB on a MacBook Pro, and another $400.00 to reach 2TB. 
          For developers and AI practitioners, over 50% of storage is taken by ephemeral build products (Xcode DerivedData, Cargo debug caches) and dormant model weights.
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
            <div className="text-2xl font-extrabold text-cyan-800 font-mono">$29.00</div>
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
              A single Pro license key can be activated on up to 3 personal Mac computers owned and operated by you (e.g., your MacBook Pro, Mac Studio, and MacBook Air).
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
            <h4 className="text-sm font-bold text-slate-900">Do I need an internet connection to use it?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              No. DiskWarren keys are validated mathematically using on-device public-key cryptography. You can activate and use DiskWarren in a completely air-gapped environment.
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
