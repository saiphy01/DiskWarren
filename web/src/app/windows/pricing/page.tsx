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
  HardDrive, 
  RefreshCcw, 
  Sparkles,
  ArrowRight,
  TrendingDown,
  XCircle,
  Tag,
  Laptop
} from 'lucide-react';

// Cryptographic key generation simulator matching C# WindowsLicensingService (DW1-WIN-PRO-...)
async function generateWindowsKey(tier: 'single' | 'workstation'): Promise<string> {
  const chars = '0123456789ABCDEF';
  let body = '';
  for (let i = 0; i < 8; i++) {
    body += chars[Math.floor(Math.random() * chars.length)];
  }
  const tierString = tier === 'workstation' ? 'MULTI' : 'PRO';
  const payload = `DW1:WIN:${tierString}:${body}`;
  
  try {
    if (typeof window !== 'undefined' && window.crypto?.subtle) {
      const msgUint8 = new TextEncoder().encode(payload);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
      const checksum = hexHash.slice(0, 4);
      return `DW1-WIN-${tierString}-${body}-${checksum}`;
    }
  } catch {}
  
  return tier === 'workstation' ? `DW1-WIN-MULTI-8B394AE2-92D1` : `DW1-WIN-PRO-4C10982E-73E9`;
}

export default function WindowsPricingPage() {
  const [copiedKey, setCopiedKey] = useState(false);
  const [simulatedKey, setSimulatedKey] = useState('DW1-WIN-PRO-4C10982E-73E9');
  const [orderId, setOrderId] = useState('DW-WIN-728190');
  const [selectedTier, setSelectedTier] = useState<'single' | 'workstation'>('single');
  const [showKeyGenerator, setShowKeyGenerator] = useState(false);

  const handleGenerateKey = async (tier: 'single' | 'workstation') => {
    setSelectedTier(tier);
    setOrderId(`DW-WIN-${Math.floor(100000 + Math.random() * 900000)}`);
    const newKey = await generateWindowsKey(tier);
    setSimulatedKey(newKey);
    setShowKeyGenerator(true);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(simulatedKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Tag className="w-3.5 h-3.5 text-blue-600" />
          <span>Windows Transparent Pricing • Zero Subscriptions</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Own DiskWarren for Windows Forever
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          No monthly fees, no cloud telemetry, and no lock-in. Pay once for a lifetime license with free minor updates and offline cryptographic activation.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* Free Plan */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Standard</span>
              <h3 className="text-2xl font-bold text-slate-900">Free Edition</h3>
              <p className="text-xs text-slate-500 mt-1">Complete storage audit &amp; visual partition exploration</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900">$0</span>
              <span className="text-sm font-medium text-slate-500">forever</span>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 block">Included capabilities:</span>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Full NTFS drive storage scan (C:, D:, external drives)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Interactive Squarified Treemap visualization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Large file discovery (&gt;100 MB, &gt;1 GB)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Developer cache detection (VS, NuGet, WSL2, npm)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Byte-level duplicate file identification</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <XCircle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                  <span>Batch 1-click safe cleanup</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <XCircle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                  <span>Automated WSL2 virtual disk compaction</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <Link
              href="/windows/download"
              className="w-full py-3.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-bold text-sm text-center block transition-colors"
            >
              Download Free Edition
            </Link>
          </div>
        </div>

        {/* Pro Single PC Plan */}
        <div className="bg-white border-2 border-blue-600 rounded-3xl p-8 flex flex-col justify-between shadow-xl shadow-blue-500/10 relative">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Most Popular
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Lifetime Single PC</span>
              <h3 className="text-2xl font-bold text-slate-900">Pro License</h3>
              <p className="text-xs text-slate-500 mt-1">Full developer cleanup &amp; reversible Recycle Bin automation</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-900">$9.99</span>
                <span className="text-lg text-slate-400 line-through font-semibold">$29.99</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Save 67%</span>
              </div>
              <p className="text-[11px] text-slate-500">Launch promotion price • One-time payment</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 block">Everything in Free, plus:</span>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="font-semibold text-slate-800">1-Click Developer Cache Cleanups:</span>
                </li>
                <li className="pl-6 text-[11px] text-slate-500">
                  Visual Studio (.vs), NuGet packages, npm/yarn, Cargo target, Gradle, WSL2 Docker vhdx
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Win32 Recycle Bin reversible deletion with 1-click restore</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Safe duplicate removal with hardlink optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Valid for 1 Windows PC (transferable)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Cryptographic offline key (air-gapped activation)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 space-y-2">
            <button
              onClick={() => handleGenerateKey('single')}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm text-center block shadow-lg shadow-blue-600/25 transition-all cursor-pointer active:scale-95"
            >
              Get Windows Pro ($9.99)
            </button>
            <p className="text-[11px] text-center text-slate-400">Instant offline license delivery</p>
          </div>
        </div>

        {/* Workstation Multi-PC Plan */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Developer Multi-Seat</span>
              <h3 className="text-2xl font-bold text-slate-900">Workstation Pack</h3>
              <p className="text-xs text-slate-500 mt-1">For power users with multiple desktop and laptop rigs</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-900">$19.99</span>
                <span className="text-lg text-slate-400 line-through font-semibold">$49.99</span>
              </div>
              <p className="text-[11px] text-slate-500">Up to 3 Windows PCs • Lifetime ownership</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 block">Everything in Pro, plus:</span>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="font-semibold text-slate-800">Covers up to 3 Windows PCs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Simultaneous activation on Desktop + Laptop + Home Lab</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Commercial &amp; freelance development license</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Priority engineering email support</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 space-y-2">
            <button
              onClick={() => handleGenerateKey('workstation')}
              className="w-full py-3.5 px-4 rounded-xl border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-bold text-sm text-center block transition-all cursor-pointer active:scale-95"
            >
              Get Workstation ($19.99)
            </button>
            <p className="text-[11px] text-center text-slate-400">Covers 3 machines</p>
          </div>
        </div>
      </div>

      {/* Simulated Key Generator Modal / Drawer */}
      {showKeyGenerator && (
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-blue-500/30 animate-in fade-in zoom-in-95 duration-200">
          <div className="max-w-2xl mx-auto space-y-6 text-center">
            <div className="inline-flex p-3 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Key className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Order #{orderId} • {selectedTier === 'workstation' ? 'Workstation (3 PCs)' : 'Single PC'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Your Windows Cryptographic License Key
              </h2>
              <p className="text-sm text-slate-300">
                This license key is mathematically signed for offline verification by DiskWarren for Windows. 
                Paste it into <code className="text-blue-300 bg-slate-800 px-2 py-0.5 rounded font-mono">Settings &gt; Activate Pro</code>.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">SHA-256 Validated Key</span>
                <span className="font-mono text-lg sm:text-xl font-bold tracking-wider text-blue-400 select-all">
                  {simulatedKey}
                </span>
              </div>
              <button
                onClick={handleCopyKey}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shrink-0"
              >
                {copiedKey ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Key</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Offline Activation</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><RefreshCcw className="w-4 h-4 text-blue-400" /> Transferable to New PC</span>
            </div>
          </div>
        </div>
      )}

      {/* Comparison against Competitors */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            How DiskWarren Compares on Windows
          </h2>
          <p className="text-sm text-slate-600">
            Why engineers and privacy-conscious users choose DiskWarren over legacy PC cleaners
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="pb-4 font-semibold">Feature / Attribute</th>
                <th className="pb-4 font-bold text-blue-600">DiskWarren Pro</th>
                <th className="pb-4 font-semibold text-slate-700">CCleaner Professional</th>
                <th className="pb-4 font-semibold text-slate-700">TreeSize Professional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              <tr>
                <td className="py-4 font-medium text-slate-900">Pricing Model</td>
                <td className="py-4 font-bold text-blue-600">$9.99 One-Time Lifetime</td>
                <td className="py-4 text-slate-600">$29.95 / year (Recurring)</td>
                <td className="py-4 text-slate-600">$59.95+ / license</td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-slate-900">Developer Cache Intelligence</td>
                <td className="py-4 font-bold text-emerald-600">Native (.vs, NuGet, WSL2, npm)</td>
                <td className="py-4 text-slate-400">None (Generic browser logs)</td>
                <td className="py-4 text-slate-400">None (Manual folder browsing)</td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-slate-900">Safety Architecture</td>
                <td className="py-4 font-bold text-emerald-600">Win32 Recycle Bin + System32 Block</td>
                <td className="py-4 text-amber-600">Aggressive Registry Cleaner</td>
                <td className="py-4 text-slate-600">Direct File Delete</td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-slate-900">Telemetry &amp; Ads</td>
                <td className="py-4 font-bold text-emerald-600">Zero Telemetry • Zero Ads</td>
                <td className="py-4 text-amber-600">Background Telemetry &amp; Upsells</td>
                <td className="py-4 text-slate-600">Zero Ads</td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-slate-900">Modern Windows 11 UI</td>
                <td className="py-4 font-bold text-blue-600">Modern .NET 8 / Mica</td>
                <td className="py-4 text-slate-600">Legacy Win32 Wrapper</td>
                <td className="py-4 text-slate-600">Classic Tree-View</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
