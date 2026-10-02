'use client';

import React, { useState } from 'react';
import { HardDrive, Hammer, Cpu, Trash2, ShieldCheck, CheckCircle2, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';

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
    setTimeout(() => {
      // Keep state clean for 4 seconds then offer reset
    }, 4000);
  };

  const handleReset = () => {
    setIsSimulatedClean(false);
    setItems(initialItems);
  };

  const filteredItems = activeTab === 'all' 
    ? items 
    : items.filter(i => i.category === activeTab);

  return (
    <div id="simulator" className="w-full max-w-5xl mx-auto rounded-2xl bg-[#0F141C] border border-[#232B39] shadow-2xl overflow-hidden">
      {/* Simulation Disclaimer Banner */}
      <div className="bg-gradient-to-r from-cyan-950/70 via-slate-900 to-indigo-950/70 px-6 py-2.5 border-b border-[#232B39] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-cyan-300 font-medium">
          <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Interactive Simulation: This demonstration uses realistic synthetic sample data to showcase DiskWarren&apos;s UI. It does not scan your computer.</span>
        </div>
        <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
          Mock Macintosh HD (500 GB)
        </span>
      </div>

      {/* Main App Window Frame */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Storage Bar Overview */}
        <div className="bg-[#151C27] rounded-xl p-5 border border-[#2A3445] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Macintosh HD Storage Analysis</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">494.38 GB Total Capacity • APFS Volume</p>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div>
                <span className="text-xs text-slate-400 block">Simulated Reclaimable</span>
                <span className="text-lg font-bold font-mono text-emerald-400">
                  {isSimulatedClean ? '0.0 GB' : `${selectedBytes.toFixed(1)} GB`}
                </span>
              </div>

              {!isSimulatedClean ? (
                <button
                  onClick={handleSimulateClean}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Simulate Move to Trash</span>
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-[#2A3445] hover:bg-[#344155] text-white font-semibold text-xs transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Demo</span>
                </button>
              )}
            </div>
          </div>

          {/* Stacked Proportional Bar */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-[#0C1017] rounded-full overflow-hidden flex gap-1 p-0.5">
              <div className="bg-slate-600 rounded-l-full" style={{ width: '22%' }} title="System Data: 110 GB" />
              <div className="bg-blue-500" style={{ width: '13%' }} title="Applications: 64 GB" />
              <div className="bg-cyan-400 transition-all duration-500" style={{ width: isSimulatedClean ? '3%' : '10%' }} title="Developer Caches: 48 GB" />
              <div className="bg-purple-500 transition-all duration-500" style={{ width: isSimulatedClean ? '3%' : '7%' }} title="AI Models: 36 GB" />
              <div className="bg-amber-400 transition-all duration-500" style={{ width: isSimulatedClean ? '1%' : '4%' }} title="Caches: 18 GB" />
              <div className="bg-pink-500" style={{ width: '2%' }} title="Duplicates: 8 GB" />
              <div className="bg-emerald-500/80 rounded-r-full ml-auto transition-all duration-500" style={{ width: isSimulatedClean ? '56%' : '42%' }} title="Free Space" />
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" /> System (110 GB)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Apps (64 GB)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" /> Developer (34.2 GB)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" /> AI Models (22.5 GB)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Caches (14.8 GB)</span>
              <span className="flex items-center gap-1 font-semibold text-emerald-400"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Available ({isSimulatedClean ? '206.3 GB' : '142.8 GB'})</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between border-b border-[#232B39] pb-3">
          <div className="flex items-center gap-2">
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
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-[#1A212D]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
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
                  ? 'bg-[#151D2A] border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                  : 'bg-[#111620] border-[#1E2635] hover:border-slate-700 opacity-80'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <input
                  type="checkbox"
                  checked={item.selected && !isSimulatedClean}
                  onChange={() => toggleSelect(item.id)}
                  className="rounded border-[#2A3445] text-cyan-500 focus:ring-cyan-500 bg-[#0C1017] w-4 h-4"
                  onClick={e => e.stopPropagation()}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white truncate">{item.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                      item.risk === 'Low' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    }`}>
                      {item.risk} Risk
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-400 truncate mt-0.5">{item.path}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-sm font-bold font-mono text-white block">{item.sizeGB} GB</span>
                <span className="text-[11px] text-slate-500">
                  {item.category === 'developer' ? 'Rebuildable' : item.category === 'ai' ? 'Redownloadable' : 'Safe to recycle'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Safety Highlight */}
        <div className="p-4 rounded-xl bg-[#0B1017] border border-[#1C2534] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Files are moved to the macOS Trash with full Put Back support. No opaque or permanent deletion.</span>
          </div>
          <span className="font-mono text-cyan-400">DiskWarren Engine v1.0</span>
        </div>
      </div>
    </div>
  );
}
