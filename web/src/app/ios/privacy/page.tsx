import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, ShieldCheck, Smartphone, CheckCircle2, Cpu } from 'lucide-react';

export default function IosPrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <Link 
        href="/ios" 
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-purple-600 font-medium transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to DiskWarren for iPhone</span>
      </Link>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 sm:p-12 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-purple-600" />
            <span>100% On-Device Apple Neural Engine Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Privacy Policy for iOS</h1>
          <p className="text-xs text-slate-500">Effective Date: October 2026 • iOS 17.0+ &amp; iPadOS 17.0+ Edition</p>
        </div>

        <div className="text-sm space-y-6 text-slate-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-600" />
              1. 100% On-Device Machine Learning
            </h2>
            <p>
              DiskWarren for iPhone and iPad is built from the ground up to respect user privacy. All photo indexing, perceptual visual hash generation, duplicate clustering, and 4K ProRes video discovery run entirely on-device using the Apple Silicon Neural Engine (A12 Bionic through M4 chips).
            </p>
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 font-medium text-xs leading-relaxed">
              Your photos, videos, album names, facial data, location tags, and iCloud metadata never leave your iPhone. DiskWarren does not maintain remote servers, databases, or cloud sync backends.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-purple-600" />
              2. Apple PhotoKit &amp; Sandboxing
            </h2>
            <p>
              DiskWarren operates within Apple’s strict iOS Application Sandbox. Access to your photo library is granted via Apple&apos;s native PhotoKit framework:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>Limited Photo Library Access:</strong> You can grant access to your entire library or select specific albums using iOS 17/18 limited library selection.
              </li>
              <li>
                <strong>Local-Only Metadata:</strong> DiskWarren reads file sizes, codec formats (HEIC, ProRes, spatial video), and creation timestamps strictly to identify oversized storage consumers.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-600" />
              3. Zero Tracking &amp; No App Tracking Transparency Required
            </h2>
            <p>
              Because DiskWarren does not track users or share data with data brokers, it does not require an App Tracking Transparency (ATT) permission prompt:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Zero analytics SDKs (no Firebase, no Mixpanel)</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Zero IDFA (Identifier for Advertisers) access</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Zero cross-app tracking</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Zero remote crash-dump logs containing file paths</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              4. Apple Photos &ldquo;Recently Deleted&rdquo; 30-Day Safety
            </h2>
            <p>
              DiskWarren never permanently deletes photos directly. When you confirm cleanup of duplicate or burst photos, DiskWarren invokes <code className="text-purple-900 bg-purple-50 px-1 py-0.5 rounded font-mono text-xs">PHPhotoLibrary.shared().performChanges()</code>. The OS displays Apple&apos;s standard confirmation sheet and moves media into your Photos app&apos;s <strong>Recently Deleted</strong> album. You retain 30 days to recover any item.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">5. StoreKit 2 &amp; Apple Family Sharing Privacy</h2>
            <p>
              In-app purchases for DiskWarren Pro Lifetime ($4.99) are handled by Apple StoreKit 2. All payment transactions, receipts, and Family Sharing verifications are handled by Apple. DiskWarren does not collect or process your Apple ID credentials, credit card details, or billing addresses.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">6. Contact Us</h2>
            <p>
              If you have any questions or feedback regarding privacy in DiskWarren for iOS, contact our privacy officer at <a href="mailto:support@diskwarren.com" className="text-purple-600 font-semibold hover:underline">support@diskwarren.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
