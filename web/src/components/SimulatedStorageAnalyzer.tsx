'use client';

import React, { useState } from 'react';
import { HardDrive, Trash2, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface SimulatedItem {
  id: string;
  name: string;
  category: 'developer' | 'ai' | 'apps' | 'caches' | 'duplicates';
  path: string;
  sizeGB: number;
  risk: 'Low' | 'Review';
  selected: boolean;
  description: string;
}

const initialItems: SimulatedItem[] = [
  {
    id: '1',
    name: 'Xcode DerivedData',
    category: 'developer',
    path: '~/Library/Developer/Xcode/DerivedData',
    sizeGB: 24.1,
    risk: 'Low',
    selected: true,
    description: 'Recompilable build caches, project indexes, and symbol stores.'
  },
  {
    id: '2',
    name: 'Ollama Unused Model (llama3:70b-q4)',
    category: 'ai',
    path: '~/.ollama/models/blobs/sha256-a94f83...',
    sizeGB: 22.5,
    risk: 'Review',
    selected: false,
    description: '70B parameter model weights untouched for >90 days.'
  },
  {
    id: '3',
    name: 'Orphaned node_modules (3 Client Projects)',
    category: 'developer',
    path: '~/Projects/archive-2025/*/node_modules',
    sizeGB: 6.8,
    risk: 'Review',
    selected: true,
    description: 'Stale npm/yarn/pnpm dependencies in inactive repositories.'
  },
  {
    id: '4',
    name: 'LM Studio Mistral-7B GGUF Checkpoint',
    category: 'ai',
    path: '~/.cache/lm-studio/models/.../mistral-7b.gguf',
    sizeGB: 4.8,
    risk: 'Review',
    selected: false,
    description: 'Quantized LLM weight file duplicate.'
  },
  {
    id: '5',
    name: 'Homebrew Download Cache',
    category: 'caches',
    path: '~/Library/Caches/Homebrew',
    sizeGB: 3.2,
    risk: 'Low',
    selected: true,
    description: 'Downloaded bottles and source tarballs from past updates.'
  },
  {
    id: '6',
    name: 'Uninstalled App Leftovers (OldDesignApp)',
    category: 'apps',
    path: '~/Library/Application Support/OldDesignApp',
    sizeGB: 2.1,
    risk: 'Review',
    selected: true,
    description: 'Residual caches and autosaves from an app uninstalled months ago.'
  }
];

export default function SimulatedStorageAnalyzer() {
  const [items, setItems] = useState<SimulatedItem[]>(initialItems);
  const [activeTab, setActiveTab] = useState<'all' | 'developer' | 'ai' | 'caches' | 'apps'>('all');
  const [isSimulatedClean, setIsSimulatedClean] = useState(false);

  const toggleSelect = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const selectedBytes = items.filter(i => i.selected).reduce((acc, curr) => acc + curr.sizeGB, 0);

  const handleSimulateClean = () => {
    setIsSimulatedClean(true);
  };

  const handleReset = () => {
    setIsSimulatedClean(false);
    setItems(initialItems);
  };

  const filteredItems = activeTab === 'all' 
    ? items 
    : items.filter(i => i.category === activeTab);

  return (
    <div id="simulator" className="w-full max-w-5xl mx-auto rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/60 overflow-hidden transition-all">
      {/* Simulation Disclaimer Banner */}
      <div className="bg-gradient-to-r from-cyan-50/90 via-slate-50 to-blue-50/90 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-cyan-800 font-medium">
          <AlertCircle className="w-4 h-4 text-cyan-600 shrink-0" />
          <span>Interactive Simulation: This demonstration uses realistic synthetic sample data to showcase DiskWarren&apos;s UI. It does not scan your computer.</span>
        </div>
        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-200 font-mono text-[11px] font-semibold">
          Mock Macintosh HD (500 GB)
        </span>
      </div>

      {/* Main App Window Frame */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Storage Bar Overview */}
        <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-cyan-600" />
                <h3 className="text-base font-bold text-slate-900">Macintosh HD Storage Analysis</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">494.38 GB Total Capacity • APFS Volume</p>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div>
                <span className="text-xs text-slate-500 block">Simulated Reclaimable</span>
                <span className="text-lg font-bold font-mono text-emerald-600">
                  {isSimulatedClean ? '0.0 GB' : `${selectedBytes.toFixed(1)} GB`}
                </span>
              </div>

              {!isSimulatedClean ? (
                <button
                  onClick={handleSimulateClean}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm shadow-emerald-600/25 active:scale-95"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Simulate Move to Trash</span>
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Demo</span>
                </button>
              )}
            </div>
          </div>

          {/* Stacked Proportional Bar */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden flex gap-1 p-0.5">
              <div className="bg-slate-500 rounded-l-full" style={{ width: '22%' }} title="System Data: 110 GB" />
              <div className="bg-blue-500" style={{ width: '13%' }} title="Applications: 64 GB" />
              <div className="bg-cyan-500 transition-all duration-500" style={{ width: isSimulatedClean ? '3%' : '10%' }} title="Developer Caches: 48 GB" />
              <div className="bg-purple-500 transition-all duration-500" style={{ width: isSimulatedClean ? '3%' : '7%' }} title="AI Models: 36 GB" />
              <div className="bg-amber-500 transition-all duration-500" style={{ width: isSimulatedClean ? '1%' : '4%' }} title="Caches: 18 GB" />
              <div className="bg-pink-500" style={{ width: '2%' }} title="Duplicates: 8 GB" />
              <div className="bg-emerald-500 rounded-r-full ml-auto transition-all duration-500" style={{ width: isSimulatedClean ? '56%' : '42%' }} title="Free Space" />
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-slate-600 pt-1">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-500 inline-block" /> System (110 GB)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Apps (64 GB)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" /> Developer (34.2 GB)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" /> AI Models (22.5 GB)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Caches (14.8 GB)</span>
              <span className="flex items-center gap-1 font-semibold text-emerald-700"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Available ({isSimulatedClean ? '206.3 GB' : '142.8 GB'})</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Candidates' },
              { id: 'developer', label: 'Developer (Xcode, Node)' },
              { id: 'ai', label: 'AI Storage (Ollama, LM Studio)' },
              { id: 'caches', label: 'System Caches' },
              { id: 'apps', label: 'App Leftovers' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-cyan-100 text-cyan-800 border border-cyan-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 hidden sm:flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Trash-First Guarantee</span>
          </div>
        </div>

        {/* Candidate Interactive List */}
        <div className="space-y-2.5">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => toggleSelect(item.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                item.selected && !isSimulatedClean
                  ? 'bg-cyan-50/60 border-cyan-300 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <input
                  type="checkbox"
                  checked={item.selected && !isSimulatedClean}
                  onChange={() => toggleSelect(item.id)}
                  className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 bg-white w-4 h-4 cursor-pointer"
                  onClick={e => e.stopPropagation()}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900 truncate">{item.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      item.risk === 'Low' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {item.risk} Risk
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-500 truncate mt-0.5">{item.path}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-sm font-bold font-mono text-slate-900 block">{item.sizeGB} GB</span>
                <span className="text-[11px] text-slate-500">
                  {item.category === 'developer' ? 'Rebuildable' : item.category === 'ai' ? 'Redownloadable' : 'Safe to recycle'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Safety Highlight */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Files are moved to the macOS Trash with full Put Back support. No opaque or permanent deletion.</span>
          </div>
          <span className="font-mono text-cyan-700 font-medium">DiskWarren Engine v1.0</span>
        </div>
      </div>
    </div>
  );
}
