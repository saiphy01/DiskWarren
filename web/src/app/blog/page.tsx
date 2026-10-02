import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ArrowRight, Clock } from 'lucide-react';

export const metadata = {
  title: 'Storage Guides & Engineering Articles — DiskWarren',
  description: 'In-depth tutorials on managing macOS storage, clearing developer caches, and reclaiming SSD space.',
};

const guides = [
  {
    href: '/blog/how-to-delete-xcode-deriveddata',
    title: 'How to Safely Delete Xcode DerivedData and Reclaim 30+ GB',
    excerpt: 'Xcode DerivedData caches build products, module caches, and index files that silently grow to dozens of gigabytes. Here is how to clean it without breaking your projects.',
    category: 'Developer',
    readTime: '4 min read',
    date: 'Oct 2, 2026'
  },
  {
    href: '/how-to-delete-ollama-models',
    title: 'How to Manage & Delete Local AI Models (Ollama, LM Studio & GGUF)',
    excerpt: 'Local 7B and 70B LLM weights consume huge amounts of high-speed SSD space. Learn where Ollama and LM Studio store model blobs and how to prune old checkpoints safely.',
    category: 'AI Storage',
    readTime: '5 min read',
    date: 'Oct 1, 2026'
  },
  {
    href: '/how-to-clear-system-data-mac',
    title: 'What is macOS "System Data" and How Do You Actually Clear It?',
    excerpt: 'Demystifying the mystery "System Data" bar in macOS Settings: Time Machine snapshots, sleep images, APFS purgeable space, and application support caches.',
    category: 'macOS Intelligence',
    readTime: '6 min read',
    date: 'Sep 28, 2026'
  }
];

export default function BlogIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 font-medium transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to DiskWarren</span>
      </Link>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold shadow-xs">
          <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
          <span>Engineering Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">macOS Storage Guides</h1>
        <p className="text-slate-600 text-sm max-w-xl">
          Deep-dive technical guides on clearing developer caches, managing local AI model footprints, and keeping your Mac running fast.
        </p>
      </div>

      <div className="space-y-6">
        {guides.map(guide => (
          <article 
            key={guide.href}
            className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-cyan-300 hover:shadow-md transition-all space-y-3 group"
          >
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 font-medium">{guide.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" /> {guide.readTime}</span>
              <span>•</span>
              <span>{guide.date}</span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
              <Link href={guide.href}>{guide.title}</Link>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              {guide.excerpt}
            </p>

            <Link 
              href={guide.href}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 group-hover:translate-x-1 transition-transform pt-1"
            >
              <span>Read complete tutorial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
