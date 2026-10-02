import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ArrowRight, Clock } from 'lucide-react';

export const metadata = {
  title: 'Storage Guides & Engineering Articles — DiskWarren',
  description: 'In-depth tutorials on managing macOS storage, clearing developer caches, and reclaiming SSD space.',
};

const guides = [
  {
    slug: 'how-to-delete-xcode-deriveddata',
    title: 'How to Safely Delete Xcode DerivedData and Reclaim 30+ GB',
    excerpt: 'Xcode DerivedData caches build products, module caches, and index files that silently grow to dozens of gigabytes. Here is how to clean it without breaking your projects.',
    category: 'Developer',
    readTime: '4 min read',
    date: 'Oct 2, 2026'
  },
  {
    slug: 'how-to-delete-ollama-models',
    title: 'How to Manage & Delete Local AI Models (Ollama, LM Studio & GGUF)',
    excerpt: 'Local 7B and 70B LLM weights consume huge amounts of high-speed SSD space. Learn where Ollama and LM Studio store model blobs and how to prune old checkpoints safely.',
    category: 'AI Storage',
    readTime: '5 min read',
    date: 'Oct 1, 2026'
  },
  {
    slug: 'how-to-clear-mac-system-data',
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
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to DiskWarren</span>
      </Link>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Engineering Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">macOS Storage Guides</h1>
        <p className="text-slate-400 text-sm max-w-xl">
          Deep-dive technical guides on clearing developer caches, managing local AI model footprints, and keeping your Mac running fast.
        </p>
      </div>

      <div className="space-y-6">
        {guides.map(guide => (
          <article 
            key={guide.slug}
            className="p-6 rounded-2xl bg-[#111622] border border-[#20293A] hover:border-cyan-500/40 transition-colors space-y-3 group"
          >
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-medium">{guide.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {guide.readTime}</span>
              <span>•</span>
              <span>{guide.date}</span>
            </div>

            <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              <Link href={`/blog/${guide.slug}`}>{guide.title}</Link>
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              {guide.excerpt}
            </p>

            <Link 
              href={`/blog/${guide.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform pt-1"
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
