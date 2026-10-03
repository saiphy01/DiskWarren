'use client';

import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ code, language = 'bash', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-md my-4">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] font-mono text-slate-400">
            {title || (language === 'bash' ? 'Terminal' : language)}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 font-mono text-xs text-cyan-300 overflow-x-auto select-all leading-relaxed whitespace-pre">
        {code}
      </div>
    </div>
  );
}
