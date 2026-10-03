import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, ShieldCheck, Smartphone, CheckCircle2, Trash2 } from 'lucide-react';

export default function AndroidPrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <Link 
        href="/android" 
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 font-medium transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to DiskWarren for Android</span>
      </Link>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 sm:p-12 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Root-Free Android Privacy Guarantee</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Privacy Policy for Android</h1>
          <p className="text-xs text-slate-500">Effective Date: October 2026 • Android 10.0 to Android 15.0+ Edition</p>
        </div>

        <div className="text-sm space-y-6 text-slate-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              1. 100% On-Device Local Analysis
            </h2>
            <p>
              DiskWarren for Android is built strictly for on-device privacy. All scanning operations—including WhatsApp/Telegram media cleanup, duplicate photo perceptual hashing, 4K video discovery, and APK cache inspection—are executed directly on your device’s local processor.
            </p>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium text-xs leading-relaxed">
              DiskWarren for Android never uploads, mirrors, or transmits your personal photos, videos, audio files, chat attachments, or document filenames to any remote server or third-party cloud.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              2. Android Scoped Storage &amp; Permissions
            </h2>
            <p>
              DiskWarren complies with the latest Google Play Scoped Storage standards (Android 10 through Android 15):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>No Root Required:</strong> DiskWarren operates entirely in unprivileged user space without requiring root or bootloader modifications.
              </li>
              <li>
                <strong>Media Permissions:</strong> On Android 13+, DiskWarren requests granular <code className="text-emerald-900 bg-emerald-50 px-1 py-0.5 rounded font-mono text-xs">READ_MEDIA_IMAGES</code>, <code className="text-emerald-900 bg-emerald-50 px-1 py-0.5 rounded font-mono text-xs">READ_MEDIA_VIDEO</code>, and <code className="text-emerald-900 bg-emerald-50 px-1 py-0.5 rounded font-mono text-xs">READ_MEDIA_AUDIO</code> permissions strictly to index and display storage consumers.
              </li>
              <li>
                <strong>Storage Access Framework (SAF):</strong> User-approved directory cleanups utilize standard Android Storage Access Framework dialogs, giving you complete visibility and control over accessed folders.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              3. Zero Advertising &amp; Zero Trackers
            </h2>
            <p>
              Many mobile utility cleaners monetize by harvesting personal data or embedding predatory ad SDKs. DiskWarren adheres to a zero-monetization-through-data model:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>No third-party ad networks (AdMob, Unity, etc.)</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>No advertising ID tracking</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>No Facebook / Meta SDK trackers</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>No background telemetry uploads</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-emerald-600" />
              4. Reversible 30-Day OS Trash Architecture
            </h2>
            <p>
              To protect your memories from accidental loss, DiskWarren invokes Android's native <code className="text-emerald-900 bg-emerald-50 px-1 py-0.5 rounded font-mono text-xs">MediaStore.createTrashRequest()</code> API. Cleaned photos and videos are placed into your device’s native Gallery Trash for 30 days, where they can be restored at any time before permanent deletion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">5. In-App Billing Privacy</h2>
            <p>
              Purchases of DiskWarren Pro Lifetime ($4.99) are processed exclusively by Google Play In-App Billing. DiskWarren never accesses or stores your credit card details, billing address, or payment credentials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">6. Support Contact</h2>
            <p>
              For privacy inquiries regarding DiskWarren for Android, please reach out to <a href="mailto:support@diskwarren.com" className="text-emerald-600 font-semibold hover:underline">support@diskwarren.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
