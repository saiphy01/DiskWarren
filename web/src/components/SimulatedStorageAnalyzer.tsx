'use client';

import React, { useState } from 'react';
import { 
  HardDrive, 
  Trash2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  X, 
  ShieldAlert, 
  Check, 
  Loader2 
} from 'lucide-react';

interface SimulatedItem {
  id: string;
  name: string;
  category: 'developer' | 'ai' | 'apps' | 'caches' | 'duplicates';
  path: string;
  sizeGB: number;
  risk: 'Low' | 'Review';
  selected: boolean;
  description: string;
  rebuildImpact: string;
  lastUsed: string;
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
    description: 'Intermediate build products, module caches, and index stores from previous compilations.',
    rebuildImpact: 'Xcode will re-index projects on next launch (takes 1–2 mins).',
    lastUsed: '3 days ago'
  },
  {
    id: '2',
    name: 'Ollama Unused Model (llama3:70b-q4)',
    category: 'ai',
    path: '~/.ollama/models/blobs/sha256-a94f83...',
    sizeGB: 22.5,
    risk: 'Review',
    selected: false,
    description: 'Quantized 70B parameter model weights untouched for >90 days.',
    rebuildImpact: 'Can be re-downloaded via `ollama pull llama3:70b` if needed.',
    lastUsed: '94 days ago'
  },
  {
    id: '3',
    name: 'Orphaned node_modules (3 Client Projects)',
    category: 'developer',
    path: '~/Projects/archive-2025/*/node_modules',
    sizeGB: 6.8,
    risk: 'Review',
    selected: true,
    description: 'Stale npm/yarn/pnpm dependencies in inactive client repositories.',
    rebuildImpact: 'Can be restored instantly from Trash or re-installed with `npm install`.',
    lastUsed: '45 days ago'
  },
  {
    id: '4',
    name: 'LM Studio Mistral-7B GGUF Checkpoint',
    category: 'ai',
    path: '~/.cache/lm-studio/models/.../mistral-7b.gguf',
    sizeGB: 4.8,
    risk: 'Review',
    selected: false,
    description: 'Quantized LLM weight file duplicate across local AI tools.',
    rebuildImpact: 'Re-downloadable anytime via LM Studio model browser.',
    lastUsed: '60 days ago'
  },
  {
    id: '5',
    name: 'Homebrew Download Cache',
    category: 'caches',
    path: '~/Library/Caches/Homebrew',
    sizeGB: 3.2,
    risk: 'Low',
    selected: true,
    description: 'Downloaded bottles and source tarballs from past formula upgrades.',
    rebuildImpact: 'Homebrew re-fetches bottles if formulae are reinstalled.',
    lastUsed: '12 days ago'
  },
  {
    id: '6',
    name: 'Uninstalled App Leftovers (OldDesignApp)',
    category: 'apps',
    path: '~/Library/Application Support/OldDesignApp',
    sizeGB: 2.1,
    risk: 'Review',
    selected: true,
    description: 'Residual caches and autosaves from an app removed months ago.',
    rebuildImpact: 'App is uninstalled; files are abandoned orphans.',
    lastUsed: '110 days ago'
  }
];

export default function SimulatedStorageAnalyzer() {
  const [items, setItems] = useState<SimulatedItem[]>(initialItems);
  const [activeTab, setActiveTab] = useState<'all' | 'developer' | 'ai' | 'caches' | 'apps'>('all');
  const [isCleaning, setIsCleaning] = useState(false);
  const [isSimulatedClean, setIsSimulatedClean] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [cleanedSize, setCleanedSize] = useState<number>(0);

  const toggleSelect = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const handleSelectAll = (select: boolean) => {
    setItems(prev => prev.map(item => ({ ...item, selected: select })));
  };

  const selectedItems = items.filter(i => i.selected);
  const selectedBytes = selectedItems.reduce((acc, curr) => acc + curr.sizeGB, 0);

  const handleConfirmClean = () => {
    setShowConfirmModal(false);
    setIsCleaning(true);
    setCleanedSize(selectedBytes);

    setTimeout(() => {
      setIsCleaning(false);
      setIsSimulatedClean(true);
    }, 900);
  };

  const handleReset = () => {
    setIsSimulatedClean(false);
    setItems(initialItems);
    setCleanedSize(0);
  };

  const filteredItems = activeTab === 'all' 
    ? items 
    : items.filter(i => i.category === activeTab);

  return (
    <div id="simulator" className="w-full max-w-5xl mx-auto rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden transition-all relative">
      {/* Simulation Disclaimer Banner */}
      <div className="bg-gradient-to-r from-cyan-50/90 via-slate-50 to-blue-50/90 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-cyan-800 font-medium">
          <AlertCircle className="w-4 h-4 text-cyan-600 shrink-0" />
          <span>Interactive Simulation: Uses realistic synthetic sample data to showcase DiskWarren&apos;s UI. It does not scan your computer.</span>
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
                <span className="text-xs text-slate-500 block">Reclaimable Selected</span>
                <span className="text-lg font-bold font-mono text-emerald-600">
                  {isSimulatedClean ? '0.0 GB' : `${selectedBytes.toFixed(1)} GB`}
                </span>
              </div>

              {!isSimulatedClean ? (
                <button
                  onClick={() => setShowConfirmModal(true)}
                  disabled={selectedBytes === 0 || isCleaning}
                  className={`px-4 py-2 rounded-lg font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm ${
                    selectedBytes > 0 && !isCleaning
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25 active:scale-95 cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isCleaning ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Recycling to Trash...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Simulate Move to Trash ({selectedItems.length})</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Undo / Put Back ({cleanedSize.toFixed(1)} GB)</span>
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
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" /> Developer ({isSimulatedClean ? '4.2 GB' : '34.2 GB'})</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" /> AI Models (22.5 GB)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Caches ({isSimulatedClean ? '2.1 GB' : '14.8 GB'})</span>
              <span className="flex items-center gap-1 font-semibold text-emerald-700"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Available ({isSimulatedClean ? '206.3 GB' : '142.8 GB'})</span>
            </div>
          </div>
        </div>

        {/* Cleaned Success Banner */}
        {isSimulatedClean && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {cleanedSize.toFixed(1)} GB Safely Recycled to macOS Trash
                </h4>
                <p className="text-xs text-emerald-800">
                  All files remain recoverable via macOS Trash with native &quot;Put Back&quot; support.
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-3.5 py-1.5 rounded-lg bg-white border border-emerald-300 hover:bg-emerald-100/50 text-emerald-900 text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Put Back Items</span>
            </button>
          </div>
        )}

        {/* Filter Tabs & Selection Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
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
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-cyan-100 text-cyan-800 border border-cyan-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <button
              onClick={() => handleSelectAll(true)}
              className="hover:text-cyan-700 underline cursor-pointer"
            >
              Select All
            </button>
            <span>•</span>
            <button
              onClick={() => handleSelectAll(false)}
              className="hover:text-cyan-700 underline cursor-pointer"
            >
              Deselect All
            </button>
            <span className="hidden sm:inline">•</span>
            <div className="hidden sm:flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Trash-First Guarantee</span>
            </div>
          </div>
        </div>

        {/* Candidate Interactive List */}
        <div className="space-y-2.5">
          {filteredItems.map(item => {
            const isExpanded = expandedItemId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-all ${
                  item.selected && !isSimulatedClean
                    ? 'bg-cyan-50/60 border-cyan-300 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  onClick={() => toggleSelect(item.id)}
                  className="p-3.5 flex items-center justify-between gap-4 cursor-pointer"
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

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-sm font-bold font-mono text-slate-900 block">{item.sizeGB} GB</span>
                      <span className="text-[11px] text-slate-500">
                        {item.category === 'developer' ? 'Rebuildable' : item.category === 'ai' ? 'Redownloadable' : 'Safe to recycle'}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedItemId(isExpanded ? null : item.id);
                      }}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                      title="Inspect details"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Item Detail Accordion */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-100 text-xs text-slate-600 space-y-2 bg-slate-50/50 rounded-b-xl">
                    <p className="leading-relaxed">{item.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="p-2 rounded bg-white border border-slate-200">
                        <span className="text-slate-400 block">Recovery Impact:</span>
                        <span className="font-medium text-slate-800">{item.rebuildImpact}</span>
                      </div>
                      <div className="p-2 rounded bg-white border border-slate-200">
                        <span className="text-slate-400 block">Activity Recency:</span>
                        <span className="font-medium text-slate-800">Last accessed {item.lastUsed}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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

      {/* Realistic macOS-Style Trash Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-scale-in">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  Move {selectedItems.length} items ({selectedBytes.toFixed(1)} GB) to Trash?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  These items will be safely moved to your macOS Trash. Your operating system and active projects will remain safe, and you can Put Back items anytime.
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 max-h-36 overflow-y-auto space-y-1.5 text-xs">
              {selectedItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-[11px]">
                  <span className="font-semibold text-slate-800 truncate mr-2">{item.name}</span>
                  <span className="font-mono text-slate-600 shrink-0">{item.sizeGB} GB</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClean}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-sm shadow-emerald-600/25 flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Move to Trash ({selectedBytes.toFixed(1)} GB)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
