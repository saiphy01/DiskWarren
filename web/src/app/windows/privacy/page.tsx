import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, ShieldCheck, HardDrive, FileText, CheckCircle2 } from 'lucide-react';

export default function WindowsPrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <Link 
        href="/windows" 
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-medium transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to DiskWarren for Windows</span>
      </Link>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 sm:p-12 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>Zero-Telemetry Windows Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Privacy Policy for Windows</h1>
          <p className="text-xs text-slate-500">Effective Date: October 2026 • Windows 10 (20H2+) &amp; Windows 11 Edition</p>
        </div>

        <div className="text-sm space-y-6 text-slate-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-blue-600" />
              1. 100% On-Device Local Processing
            </h2>
            <p>
              DiskWarren for Windows is built with privacy as a foundational principle. All storage analysis, NTFS Master File Table (MFT) records parsing, directory traversals, file hash computations, duplicate detection, and visual treemap generation run exclusively on your PC’s local hardware (Intel, AMD x64, or ARM64 Snapdragon Copilot+ PC).
            </p>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 font-medium text-xs leading-relaxed">
              DiskWarren for Windows never uploads, mirrors, shares, or transmits your filenames, disk paths, directory hierarchy, document metadata, or file contents to any remote server, cloud storage provider, or third-party analytics vendor.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              2. User Account Control (UAC) &amp; Administrator Permissions
            </h2>
            <p>
              DiskWarren runs with standard user privileges for indexing personal user folders (<code className="text-blue-900 bg-blue-50 px-1 py-0.5 rounded font-mono text-xs">%USERPROFILE%</code>, AppData caches, Visual Studio build artifacts, and NuGet packages). 
            </p>
            <p>
              When analyzing entire system volumes or system-level caches (such as Windows Update Delivery Optimization or WSL2 virtual hard disks), DiskWarren may prompt for standard Windows User Account Control (UAC) elevation. Administrator rights are utilized strictly for read-only volume metadata traversal and user-initiated Recycle Bin recycling. We never modify security policies, inject background services, or access user credentials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              3. Strict Zero-Telemetry Protocol
            </h2>
            <p>
              Unlike legacy PC cleanup utilities that bundle telemetry frameworks, crash analytics collectors, or adware, DiskWarren has zero telemetry code compiled into its binaries:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Zero telemetry or analytics SDKs</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Zero background daemons or resident memory hooks</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Zero cross-site trackers or ad IDs</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Zero device fingerprinting</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              4. Network Activity Scenarios
            </h2>
            <p>
              The desktop executable makes outbound HTTPS connections strictly in these two voluntary scenarios:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>Software Version Checks:</strong> Verifying our static version manifest to notify you when a new version is available. Can be toggled off entirely in Preferences.
              </li>
              <li>
                <strong>License Key Validation:</strong> Validating your perpetual Pro key using an offline cryptographic signature algorithm (<code className="text-blue-900 bg-blue-50 px-1 py-0.5 rounded font-mono text-xs">DW1-WIN-PRO-...</code>). No hardware hashes or personal identities are transmitted.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">5. Windows Recycle Bin Safety</h2>
            <p>
              All user-approved file deletions route through the native Windows Recycle Bin via the Win32 <code className="text-blue-900 bg-blue-50 px-1 py-0.5 rounded font-mono text-xs">SHFileOperation</code> API with <code className="text-blue-900 bg-blue-50 px-1 py-0.5 rounded font-mono text-xs">FOF_ALLOWUNDO</code>. DiskWarren never performs permanent bypass deletions unless explicitly configured by the user on non-recyclable removable storage.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">6. Contact &amp; Questions</h2>
            <p>
              If you have questions regarding privacy in DiskWarren for Windows, contact our technical team at <a href="mailto:support@diskwarren.com" className="text-blue-600 font-semibold hover:underline">support@diskwarren.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
