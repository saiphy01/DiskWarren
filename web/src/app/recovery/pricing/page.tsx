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
  HardDrive, 
  Sparkles,
  ArrowRight,
  Tag,
  Lock,
  Layers,
  FileCheck,
  Hash
} from 'lucide-react';

async function generateRecoveryKey(tier: 'pro' | 'technician'): Promise<string> {
  if (tier === 'technician') {
    return 'DWR1-TECH-LIFETIME-8902FA1C';
  }
  return 'DWR1-PRO-LIFETIME-4521CE99';
}

export default function RecoveryPricingPage() {
  const [copiedKey, setCopiedKey] = useState(false);
  const [simulatedKey, setSimulatedKey] = useState('DWR1-PRO-LIFETIME-4521CE99');
  const [orderId, setOrderId] = useState('DWR-94821');
  const [selectedTier, setSelectedTier] = useState<'pro' | 'technician'>('pro');
  const [showKeyGenerator, setShowKeyGenerator] = useState(false);

  const handleGenerateKey = async (tier: 'pro' | 'technician') => {
    setSelectedTier(tier);
    setOrderId(`DWR-${Math.floor(10000 + Math.random() * 90000)}`);
    const newKey = await generateRecoveryKey(tier);
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Tag className="w-3.5 h-3.5 text-teal-600" />
          <span>Transparent Pricing • Zero Subscriptions</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Own DiskWarren Recover Forever
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          No monthly charges, no per-recovery fees, and no cloud dependencies. Pay once for a lifetime license with free minor updates and offline cryptographic activation.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* Free Plan */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Community Edition</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900">$0</span>
              <span className="text-xs text-slate-500">free scanner</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Verify your drive and preview lost files in memory before spending a dollar.
            </p>
            <ul className="text-xs text-slate-700 space-y-2.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Unlimited Quick &amp; Deep Scans</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Full In-Memory Hex &amp; Image Preview</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Evidence-based Recovery Scoring</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Recover up to 500 MB for free</li>
              <li className="flex items-center gap-2 text-slate-400"><span className="w-4 text-center">—</span> No RAW disk imaging</li>
            </ul>
          </div>
          <Link
            href="/recovery/download"
            className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs text-center transition-all block"
          >
            Download Free Scanner
          </Link>
        </div>

        {/* Pro Lifetime */}
        <div className="p-8 rounded-2xl bg-white border-2 border-teal-600 shadow-xl shadow-teal-600/10 flex flex-col justify-between space-y-6 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-teal-600 text-white text-[10px] font-bold uppercase tracking-wider">
            Most Popular • Single PC
          </div>
          <div className="space-y-4">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">Recover Pro Lifetime</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900">$39</span>
              <span className="text-xs text-slate-500 font-medium">one-time perpetual</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete recovery for personal hard drives, SSDs, SD cards, and USB thumb drives.
            </p>
            <ul className="text-xs text-slate-700 space-y-2.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600 font-bold" /> <strong>Unlimited Recovery Volume</strong></li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> Advanced Fragmented File Reconstruction</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> Deep Signature Carving (20+ formats)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> Lost / Formatted Partition Recovery</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> SHA-256 Audit Verification Reports</li>
            </ul>
          </div>
          <button
            onClick={() => handleGenerateKey('pro')}
            className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs text-center shadow-md shadow-teal-600/25 transition-all cursor-pointer"
          >
            Buy Pro License ($39)
          </button>
        </div>

        {/* Technician Lifetime */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Technician Edition</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900">$149</span>
              <span className="text-xs text-slate-500">commercial perpetual</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              For computer repair shops, forensic technicians, and IT service providers.
            </p>
            <ul className="text-xs text-slate-700 space-y-2.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> <strong>Commercial Use &amp; Unlimited Client Drives</strong></li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> Raw Byte-for-Byte Disk Imaging (.raw/.dd)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> Virtual Image Mount &amp; Offline Scan</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> Bad-Sector Retries &amp; Skipping Engine</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-600" /> White-Label PDF Audit Reports</li>
            </ul>
          </div>
          <button
            onClick={() => handleGenerateKey('technician')}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center transition-all cursor-pointer"
          >
            Buy Technician License ($149)
          </button>
        </div>
      </div>

      {/* Interactive Offline License Simulator */}
      {showKeyGenerator && (
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-teal-50/70 border-2 border-teal-500/40 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
              <Key className="w-4 h-4 text-teal-600" />
              <span>Offline Cryptographic License Generated</span>
            </div>
            <span className="text-xs font-mono text-teal-700">Order: {orderId}</span>
          </div>

          <p className="text-xs text-teal-950 leading-relaxed">
            DiskWarren uses Ed25519 asymmetric cryptography. The desktop application contains only the public verification key. Your license key activates 100% offline without requiring continuous internet checks.
          </p>

          <div className="p-3 bg-white rounded-xl border border-teal-200 flex items-center justify-between gap-4 font-mono text-xs">
            <span className="font-bold text-slate-800 select-all">{simulatedKey}</span>
            <button
              onClick={handleCopyKey}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-sans font-semibold cursor-pointer"
            >
              {copiedKey ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey ? 'Copied' : 'Copy Key'}</span>
            </button>
          </div>

          <div className="text-[11px] text-teal-800 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>To activate, open DiskWarren Recover → Settings → Enter License Key.</span>
          </div>
        </div>
      )}

      {/* Feature Comparison Matrix */}
      <div className="max-w-4xl mx-auto space-y-6 pt-8">
        <h3 className="text-2xl font-bold text-slate-900 text-center">
          Compare Editions
        </h3>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
              <tr>
                <th className="p-4 font-bold">Feature</th>
                <th className="p-4 font-bold text-center">Community (Free)</th>
                <th className="p-4 font-bold text-center text-teal-700">Pro ($39)</th>
                <th className="p-4 font-bold text-center">Technician ($149)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="p-4 font-semibold text-slate-900">Read-Only Block Engine (Zero Source Writes)</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900">Filesystem Metadata Traversal (NTFS / FAT / exFAT)</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900">Deep Signature Carving (20+ Formats)</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900">In-Memory Previews (Images, Documents, Media)</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900">Recovery Allowance</td>
                <td className="p-4 text-center text-slate-500 font-mono">500 MB</td>
                <td className="p-4 text-center text-teal-700 font-bold">Unlimited</td>
                <td className="p-4 text-center font-bold">Unlimited</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900">SHA-256 Per-File Verification Manifests</td>
                <td className="p-4 text-center text-slate-300">—</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900">Raw Disk Image (.raw / .dd) Creation &amp; Scanning</td>
                <td className="p-4 text-center text-slate-300">—</td>
                <td className="p-4 text-center text-slate-300">—</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900">Commercial Client Machine Entitlement</td>
                <td className="p-4 text-center text-slate-300">—</td>
                <td className="p-4 text-center text-slate-300">—</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
