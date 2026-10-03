'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LifeBuoy, 
  Mail, 
  ShieldAlert, 
  Key, 
  RefreshCcw, 
  HelpCircle, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  Send, 
  Loader2, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

interface FAQ {
  id: number;
  q: string;
  a: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    category: 'Permissions',
    q: 'Why does DiskWarren require Full Disk Access (FDA)?',
    a: 'macOS sandboxing restricts apps from inspecting developer caches (such as Xcode DerivedData in ~/Library/Developer), package manager artifacts, and AI weights. Granting Full Disk Access in System Settings allows DiskWarren to index and visualize these directories locally. DiskWarren never transmits any filenames, paths, or file contents off your machine.'
  },
  {
    id: 2,
    category: 'Safety',
    q: 'Where do deleted files go? Can I undo a cleanup action?',
    a: 'DiskWarren employs a strict Trash-First safety architecture. Unless you specifically empty the macOS system trash yourself, all cleaned items are recycled to the native macOS Trash (~/.Trash or volume .Trashes). You can simply open Trash and click \u201cPut Back\u201d to restore any file instantly.'
  },
  {
    id: 3,
    category: 'Licensing',
    q: 'How do I activate or recover my Pro license key?',
    a: 'Your Pro license key was emailed immediately upon checkout from our payment processor. In DiskWarren, click Settings > License, enter your key (formatted like WARREN-PRO-XXXXXX-XXXX), and click Activate. Keys work completely offline with no network ping required. If you misplaced your key, search your email for \u201cDiskWarren License\u201d or email support@diskwarren.com.'
  },
  {
    id: 4,
    category: 'Safety',
    q: 'Does DiskWarren delete anything automatically?',
    a: 'Never. DiskWarren never performs background, automated, or stealth deletions. Every cleanup action requires explicit user confirmation with full preview of candidate files, sizes, and risk levels before anything is moved to the Trash.'
  },
  {
    id: 5,
    category: 'Privacy',
    q: 'How can I share diagnostic logs without exposing private file paths?',
    a: 'DiskWarren includes a built-in privacy-safe logger. Logs are stored locally in ~/Library/Logs/DiskWarren/audit.log with all user usernames and sensitive file paths cryptographically masked or redacted. You can safely attach this file to support emails.'
  },
  {
    id: 6,
    category: 'Billing',
    q: 'What is your refund policy?',
    a: 'We offer an unconditional 30-day money-back guarantee. If DiskWarren does not reclaim gigabytes of storage or meet your expectations, email support@diskwarren.com with your license order number for a full refund.'
  }
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(1);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [osVersion, setOsVersion] = useState('macOS 15 Sequoia');
  const [category, setCategory] = useState('General Question');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachLogs, setAttachLogs] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketNum = 'DW-' + Math.floor(10000 + Math.random() * 90000);
      setSubmittedTicketId(ticketNum);
    }, 800);
  };

  const handleResetTicket = () => {
    setSubmittedTicketId(null);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <LifeBuoy className="w-4 h-4 text-cyan-600" />
          <span>Customer &amp; Engineering Support</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          How can we help?
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Find answers to common questions regarding permissions, safety, licensing, or submit a ticket directly to our native engineering team.
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-3 hover:border-slate-300 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-slate-900">License Help</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Need to transfer your license to a new Mac or retrieve a lost key? 
          </p>
          <a
            href="mailto:support@diskwarren.com?subject=License%20Recovery%20Request"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 hover:text-cyan-600 pt-2 cursor-pointer"
          >
            <span>Recover license</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-3 hover:border-slate-300 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-slate-900">Permission Setup</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Step-by-step guidance on Full Disk Access on macOS 14 &amp; 15.
          </p>
          <Link
            href="/download"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 hover:text-cyan-600 pt-2 cursor-pointer"
          >
            <span>View permissions guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-3 hover:border-slate-300 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
            <RefreshCcw className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-slate-900">Refund Request</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Hassle-free 30-day money-back guarantee on all Pro purchases.
          </p>
          <a
            href="mailto:support@diskwarren.com?subject=Refund%20Request"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 hover:text-cyan-600 pt-2 cursor-pointer"
          >
            <span>Request refund</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Frequently Asked Questions with Search */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-600" />
            Frequently Asked Questions
          </h2>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 shadow-xs"
            />
          </div>
        </div>
        
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map(faq => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className="bg-white border border-slate-200 shadow-xs rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                        {faq.category}
                      </span>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {faq.q}
                      </h3>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-sm text-slate-500 bg-white border border-slate-200 rounded-xl">
              No matching questions found for &quot;{searchQuery}&quot;. Ask us directly using the form below!
            </div>
          )}
        </div>
      </div>

      {/* Interactive Direct Engineering Support Form */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-600" />
            Contact DiskWarren Engineering
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Have a bug report, rule suggestion for a new developer ecosystem, or specific question? 
            You will be speaking directly with the Swift developers building DiskWarren.
          </p>
        </div>

        {submittedTicketId ? (
          <div className="p-8 rounded-xl bg-white border border-emerald-200 text-center space-y-4 shadow-sm animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                Ticket #{submittedTicketId} Dispatched!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you, {name}. A receipt has been routed to <strong>{email}</strong>. Our engineering team reviews all incoming logs within 24 business hours.
              </p>
            </div>
            <button
              onClick={handleResetTicket}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Submit Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Steve Jobs"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="developer@apple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 shadow-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">macOS Version</label>
                <select
                  value={osVersion}
                  onChange={(e) => setOsVersion(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 shadow-xs cursor-pointer"
                >
                  <option>macOS 15 Sequoia</option>
                  <option>macOS 14 Sonoma</option>
                  <option>macOS 13 Ventura or earlier</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 shadow-xs cursor-pointer"
                >
                  <option>General Question</option>
                  <option>Licensing &amp; Key Recovery</option>
                  <option>Full Disk Access Permission Help</option>
                  <option>Bug Report</option>
                  <option>Request New Cleanup Rule (Ecosystem)</option>
                  <option>Refund Inquiry</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Subject *</label>
              <input
                type="text"
                required
                placeholder="e.g. Question about Xcode DerivedData or Bun Cache support"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 shadow-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Message &amp; Reproduction Steps *</label>
              <textarea
                required
                rows={4}
                placeholder="Please describe what you experienced or what feature you'd like to see..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 shadow-xs"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="logs"
                checked={attachLogs}
                onChange={(e) => setAttachLogs(e.target.checked)}
                className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
              />
              <label htmlFor="logs" className="text-xs text-slate-600 cursor-pointer select-none">
                I can provide redacted diagnostic logs from <code className="text-cyan-800 bg-cyan-50 px-1 py-0.5 rounded font-mono text-[11px] border border-cyan-200/60">~/Library/Logs/DiskWarren/audit.log</code>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-sm shadow-cyan-600/25 flex items-center gap-2 active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Routing to Engineering Queue...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Support Ticket</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 pt-2 border-t border-slate-200">
          <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs">
            <span className="text-slate-500 block mb-1">Direct Support Email</span>
            <a href="mailto:support@diskwarren.com" className="text-sm font-semibold text-cyan-700 hover:underline">
              support@diskwarren.com
            </a>
          </div>
          <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs">
            <span className="text-slate-500 block mb-1">Response Time SLA</span>
            <span className="text-sm font-semibold text-emerald-700">Within 24 Hours (Mon &ndash; Fri)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
