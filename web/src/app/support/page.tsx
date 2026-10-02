import type { Metadata } from 'next';
import Link from 'next/link';
import { LifeBuoy, Mail, ShieldAlert, Key, RefreshCcw, HelpCircle, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Support & Help Center — DiskWarren',
  description: 'Get help with DiskWarren. FAQs on Full Disk Access, Trash-first file safety, license recovery, and direct engineering support.',
  alternates: {
    canonical: '/support',
  },
};

export default function SupportPage() {
  const faqs = [
    {
      q: 'Why does DiskWarren require Full Disk Access (FDA)?',
      a: 'macOS sandboxing restricts apps from inspecting developer caches (such as Xcode DerivedData in ~/Library/Developer), package manager artifacts, and AI weights. Granting Full Disk Access in System Settings allows DiskWarren to index and visualize these directories locally. DiskWarren never transmits any filenames, paths, or file contents off your machine.'
    },
    {
      q: 'Where do deleted files go? Can I undo a cleanup action?',
      a: 'DiskWarren employs a strict Trash-First safety architecture. Unless you specifically empty the macOS system trash yourself, all cleaned items are recycled to the native macOS Trash (~/.Trash or volume .Trashes). You can simply open Trash and click "Put Back" to restore any file instantly.'
    },
    {
      q: 'How do I activate or recover my Pro license key?',
      a: 'Your Pro license key was emailed immediately upon checkout from our payment processor. In DiskWarren, click Settings > License, enter your key (formatted like WARREN-PRO-XXXXXX-XXXX), and click Activate. Keys work completely offline with no network ping required. If you misplaced your key, search your email for "DiskWarren License" or email support@diskwarren.com.'
    },
    {
      q: 'Does DiskWarren delete anything automatically?',
      a: 'Never. DiskWarren never performs background, automated, or stealth deletions. Every cleanup action requires explicit user confirmation with full preview of candidate files, sizes, and risk levels before anything is moved to the Trash.'
    },
    {
      q: 'How can I share diagnostic logs without exposing private file paths?',
      a: 'DiskWarren includes a built-in privacy-safe logger. Logs are stored locally in ~/Library/Logs/DiskWarren/audit.log with all user usernames and sensitive file paths cryptographically masked or redacted. You can safely attach this file to support emails.'
    },
    {
      q: 'What is your refund policy?',
      a: 'We offer an unconditional 30-day money-back guarantee. If DiskWarren does not reclaim gigabytes of storage or meet your expectations, email support@diskwarren.com with your license order number for a full refund.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <LifeBuoy className="w-4 h-4 text-cyan-400" />
          <span>Customer &amp; Engineering Support</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          How can we help?
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Find answers to common questions regarding permissions, safety, licensing, or reach our native engineering team directly.
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#10141D] border border-[#222A38] rounded-xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-white">License Help</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Need to transfer your license to a new Mac or retrieve a lost key? 
          </p>
          <a
            href="mailto:support@diskwarren.com?subject=License%20Recovery%20Request"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 pt-2"
          >
            <span>Recover license</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="bg-[#10141D] border border-[#222A38] rounded-xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-white">Permission Setup</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Step-by-step guidance on Full Disk Access on macOS 14 &amp; 15.
          </p>
          <Link
            href="/download#instructions"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 pt-2"
          >
            <span>View permissions guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-[#10141D] border border-[#222A38] rounded-xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <RefreshCcw className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-white">Refund Request</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Hassle-free 30-day money-back guarantee on all Pro purchases.
          </p>
          <a
            href="mailto:support@diskwarren.com?subject=Refund%20Request"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 pt-2"
          >
            <span>Request refund</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#0E121A] border border-[#1E2634] rounded-xl p-6 space-y-2">
              <h3 className="text-base font-semibold text-white">
                {faq.q}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Direct Engineering Form / Card */}
      <div className="bg-[#101520] border border-cyan-500/30 rounded-2xl p-8 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            Contact DiskWarren Engineering
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Have a bug report, rule suggestion for a new developer ecosystem, or specific question? 
            You will be speaking directly with the Swift developers building DiskWarren.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-lg bg-[#0A0D12] border border-[#222A36]">
            <span className="text-slate-500 block mb-1">Direct Support Email</span>
            <a href="mailto:support@diskwarren.com" className="text-sm font-semibold text-cyan-400 hover:underline">
              support@diskwarren.com
            </a>
          </div>
          <div className="p-4 rounded-lg bg-[#0A0D12] border border-[#222A36]">
            <span className="text-slate-500 block mb-1">Response Time SLA</span>
            <span className="text-sm font-semibold text-emerald-400">Within 24 Hours (Mon – Fri)</span>
          </div>
        </div>

        <div className="pt-2 text-xs text-slate-500">
          Tip: When reporting an issue, please include your macOS version (Sonoma/Sequoia), Mac architecture (M1/M2/M3/M4 or Intel), and your redacted local log file from <code className="text-cyan-300 bg-[#0A0D12] px-1 py-0.5 rounded">~/Library/Logs/DiskWarren/</code>.
        </div>
      </div>
    </div>
  );
}
