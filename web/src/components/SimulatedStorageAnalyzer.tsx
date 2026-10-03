'use client';

import React, { useState } from 'react';
import { 
  HardDrive, 
  Trash2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  X, 
  ShieldAlert, 
  Check, 
  Loader2,
  PieChart as PieChartIcon,
  Layers,
  Sparkles,
  Lock,
  Cpu,
  Hammer
} from 'lucide-react';

interface SimulatedItem {
  id: string;
  name: string;
  category: 'developer' | 'ai' | 'apps' | 'caches' | 'system';
  path: string;
  sizeGB: number;
  risk: 'Low' | 'Review' | 'Restricted';
  selected: boolean;
  description: string;
  rebuildImpact: string;
  lastUsed: string;
}

interface PartitionSlice {
  id: string;
  label: string;
  sizeGB: number;
  cleanedSizeGB: number;
  currentSize?: number;
  color: string;
  hoverColor: string;
  icon: string;
  canClean: boolean;
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

const partitionDefinitions: PartitionSlice[] = [
  {
    id: 'system_data',
    label: 'System Data',
    sizeGB: 78.6,
    cleanedSizeGB: 42.0,
    color: '#64748b', // slate-500
    hoverColor: '#475569',
    icon: 'HardDrive',
    canClean: true,
    description: 'Time Machine local snapshots, sleep images, and hidden application caches.'
  },
  {
    id: 'developer',
    label: 'Developer Caches',
    sizeGB: 48.4,
    cleanedSizeGB: 17.5,
    color: '#06b6d4', // cyan-500
    hoverColor: '#0891b2',
    icon: 'Hammer',
    canClean: true,
    description: 'Xcode DerivedData, archived simulators, and stale node_modules dependencies.'
  },
  {
    id: 'ai',
    label: 'Local AI Weights',
    sizeGB: 38.5,
    cleanedSizeGB: 11.2,
    color: '#a855f7', // purple-500
    hoverColor: '#9333ea',
    icon: 'Cpu',
    canClean: true,
    description: 'Ollama model layer blobs, LM Studio GGUF weights, and Hugging Face snapshots.'
  },
  {
    id: 'apps',
    label: 'Applications',
    sizeGB: 52.6,
    cleanedSizeGB: 50.5,
    color: '#3b82f6', // blue-500
    hoverColor: '#2563eb',
    icon: 'Layers',
    canClean: true,
    description: 'Installed macOS application bundles and residual leftover support files.'
  },
  {
    id: 'macos_sealed',
    label: 'macOS Sealed System',
    sizeGB: 24.1,
    cleanedSizeGB: 24.1,
    color: '#94a3b8', // slate-400
    hoverColor: '#64748b',
    icon: 'Lock',
    canClean: false,
    description: 'Cryptographically sealed read-only APFS system volume. Protected by Apple SIP.'
  },
  {
    id: 'documents',
    label: 'Documents & Media',
    sizeGB: 64.0,
    cleanedSizeGB: 64.0,
    color: '#f59e0b', // amber-500
    hoverColor: '#d97706',
    icon: 'Info',
    canClean: false,
    description: 'User photos, movies, music, and personal document folders.'
  },
  {
    id: 'available',
    label: 'Available Free Space',
    sizeGB: 193.8,
    cleanedSizeGB: 290.7,
    color: '#10b981', // emerald-500
    hoverColor: '#059669',
    icon: 'CheckCircle2',
    canClean: false,
    description: 'Free and APFS purgeable space ready for high-speed SSD writes.'
  }
];

export default function SimulatedStorageAnalyzer() {
  const [items, setItems] = useState<SimulatedItem[]>(initialItems);
  const [activeTab, setActiveTab] = useState<'all' | 'developer' | 'ai' | 'caches' | 'apps'>('all');
  const [viewMode, setViewMode] = useState<'pie' | 'treemap'>('pie');
  const [isCleaning, setIsCleaning] = useState(false);
  const [isSimulatedClean, setIsSimulatedClean] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [cleanedSize, setCleanedSize] = useState<number>(0);
  const [hoveredSlice, setHoveredSlice] = useState<PartitionSlice | null>(null);

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
    }, 850);
  };

  const handleReset = () => {
    setIsSimulatedClean(false);
    setItems(initialItems);
    setCleanedSize(0);
  };

  const filteredItems = activeTab === 'all' 
    ? items 
    : items.filter(i => i.category === activeTab);

  // SVG Radial Donut Chart calculations
  const totalVolumeGB = 500.0;
  const radius = 114;
  const circumference = 2 * Math.PI * radius; // ~716.28

  // Calculate slice angles
  let cumulativeOffset = 0;
  const renderedSlices = partitionDefinitions.map(slice => {
    const currentSize = isSimulatedClean ? slice.cleanedSizeGB : slice.sizeGB;
    const ratio = currentSize / totalVolumeGB;
    const strokeDash = ratio * circumference;
    const offset = cumulativeOffset;
    cumulativeOffset += strokeDash;
    return {
      ...slice,
      currentSize,
      ratio,
      strokeDash,
      offset
    };
  });

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden transition-all relative">
      {/* Simulation Disclaimer Banner */}
      <div className="bg-gradient-to-r from-cyan-50/90 via-slate-50 to-blue-50/90 px-6 py-2.5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-2 text-cyan-900 font-medium">
          <AlertCircle className="w-4 h-4 text-cyan-600 shrink-0" />
          <span>Interactive CDO Simulation: Experience DiskWarren&apos;s real-time partition visualizer without scanning your local device.</span>
        </div>
        
        {/* View Mode Toggle: Pie / Donut vs Treemap */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-xs shrink-0">
          <button
            onClick={() => setViewMode('pie')}
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'pie'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <PieChartIcon className="w-3.5 h-3.5" />
            <span>macOS Partition Ring (Pie)</span>
          </button>

          <button
            onClick={() => setViewMode('treemap')}
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'treemap'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Treemap Matrix</span>
          </button>
        </div>
      </div>

      {/* Main App Window */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-sm">
                <HardDrive className="w-4 h-4 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Macintosh HD — 500 GB Storage Intelligence</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Apple Silicon Internal SSD (APFS Container `disk3s1s1`) • macOS 15 Sequoia
            </p>
          </div>

          {/* Action Trigger / Status */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[11px] text-slate-500 block uppercase font-medium">Reclaimable Selected</span>
              <span className="text-lg font-bold font-mono text-emerald-600">
                {isSimulatedClean ? '0.0 GB' : `${selectedBytes.toFixed(1)} GB`}
              </span>
            </div>

            {!isSimulatedClean ? (
              <button
                onClick={() => setShowConfirmModal(true)}
                disabled={selectedBytes === 0 || isCleaning}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-sm ${
                  selectedBytes > 0 && !isCleaning
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25 active:scale-95 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isCleaning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Recycling to Trash...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Simulate Move to Trash ({selectedItems.length})</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span>Undo / Put Back ({cleanedSize.toFixed(1)} GB)</span>
              </button>
            )}
          </div>
        </div>

        {/* PRIMARY VISUALIZATION: PIE / PARTITION DONUT OR TREEMAP */}
        {viewMode === 'pie' ? (
          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Radial Donut SVG */}
            <div className="md:col-span-5 flex flex-col items-center justify-center relative">
              <div className="w-64 h-64 relative flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 320 320">
                  {/* Background Track */}
                  <circle
                    cx="160"
                    cy="160"
                    r={radius}
                    fill="transparent"
                    stroke="#e2e8f0"
                    strokeWidth="38"
                  />

                  {/* Rendered Partition Slices */}
                  {renderedSlices.map((slice) => (
                    <circle
                      key={slice.id}
                      cx="160"
                      cy="160"
                      r={radius}
                      fill="transparent"
                      stroke={hoveredSlice?.id === slice.id ? slice.hoverColor : slice.color}
                      strokeWidth={hoveredSlice?.id === slice.id ? "42" : "38"}
                      strokeDasharray={`${slice.strokeDash} ${circumference - slice.strokeDash}`}
                      strokeDashoffset={-slice.offset}
                      strokeLinecap="butt"
                      className="transition-all duration-700 cursor-pointer hover:opacity-90"
                      onMouseEnter={() => setHoveredSlice(slice)}
                      onMouseLeave={() => setHoveredSlice(null)}
                    />
                  ))}
                </svg>

                {/* Center Core Information */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
                  {hoveredSlice ? (
                    <div className="animate-in fade-in duration-150 space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                        Partition Slice
                      </span>
                      <div className="text-base font-extrabold text-slate-900 leading-tight">
                        {hoveredSlice.label}
                      </div>
                      <div className="text-xl font-extrabold font-mono text-cyan-600">
                        {(hoveredSlice.currentSize ?? hoveredSlice.sizeGB).toFixed(1)} GB
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono block">
                        {(((hoveredSlice.currentSize ?? hoveredSlice.sizeGB) / totalVolumeGB) * 100).toFixed(1)}% of Mac SSD
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="w-7 h-7 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center mx-auto mb-1">
                        <HardDrive className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                        500 GB APFS
                      </span>
                      <div className="text-lg font-black text-slate-900">
                        Macintosh HD
                      </div>
                      <span className="text-xs font-semibold text-emerald-600 block">
                        {isSimulatedClean ? '335.6 GB Available' : '193.8 GB Available'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 text-center mt-3">
                Hover or tap slices to inspect APFS partition blocks.
              </p>
            </div>

            {/* Right: Partition Breakdown Cards */}
            <div className="md:col-span-7 space-y-2.5">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Mac APFS Volume Breakdown</span>
                <span className="text-slate-500 font-mono text-[11px]">Total: 500.0 GB</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {renderedSlices.map(slice => {
                  const isHovered = hoveredSlice?.id === slice.id;
                  return (
                    <div
                      key={slice.id}
                      onMouseEnter={() => setHoveredSlice(slice)}
                      onMouseLeave={() => setHoveredSlice(null)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isHovered 
                          ? 'bg-white border-cyan-400 shadow-md scale-[1.01]' 
                          : 'bg-white/80 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div 
                          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs" 
                          style={{ backgroundColor: slice.color }} 
                        />
                        <div className="truncate">
                          <span className="text-xs font-bold text-slate-900 block truncate">
                            {slice.label}
                          </span>
                          <span className="text-[10px] text-slate-500 truncate block">
                            {slice.canClean ? 'Reclaimable with Pro' : 'Protected Volume'}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold font-mono text-slate-900 block">
                          {slice.currentSize.toFixed(1)} GB
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {((slice.currentSize / totalVolumeGB) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* TREEMAP MATRIX VIEW */
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white space-y-4">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800 font-mono">
              <span className="text-cyan-400">Squarified Proportional Matrix</span>
              <span className="text-slate-400">Total: 500.0 GB</span>
            </div>

            <div className="grid grid-cols-12 gap-2 h-64">
              {/* System Data */}
              <div className="col-span-4 bg-slate-800/80 border border-slate-700 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-300 block">System Data</span>
                  <span className="text-[11px] font-mono text-slate-400">Caches &amp; Snapshots</span>
                </div>
                <span className="text-sm font-bold font-mono text-slate-200">
                  {isSimulatedClean ? '42.0 GB' : '78.6 GB'}
                </span>
              </div>

              {/* Developer Caches */}
              <div className="col-span-3 bg-cyan-950/70 border border-cyan-500/50 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-cyan-300 block">Developer Caches</span>
                  <span className="text-[11px] font-mono text-cyan-400">DerivedData &amp; node_modules</span>
                </div>
                <span className="text-sm font-bold font-mono text-cyan-300">
                  {isSimulatedClean ? '17.5 GB' : '48.4 GB'}
                </span>
              </div>

              {/* AI Models */}
              <div className="col-span-3 bg-purple-950/70 border border-purple-500/50 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-purple-300 block">AI Models</span>
                  <span className="text-[11px] font-mono text-purple-400">Ollama &amp; LM Studio GGUFs</span>
                </div>
                <span className="text-sm font-bold font-mono text-purple-300">
                  {isSimulatedClean ? '11.2 GB' : '38.5 GB'}
                </span>
              </div>

              {/* Applications */}
              <div className="col-span-2 bg-blue-950/70 border border-blue-500/50 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-300 block">Apps</span>
                  <span className="text-[11px] font-mono text-blue-400">Applications</span>
                </div>
                <span className="text-sm font-bold font-mono text-blue-300">52.6 GB</span>
              </div>
            </div>
          </div>
        )}

        {/* Cleaned Success Banner with Instant Undo */}
        {isSimulatedClean && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {cleanedSize.toFixed(1)} GB Safely Recycled to macOS Trash
                </h4>
                <p className="text-xs text-emerald-800">
                  Available space expanded! All files remain recoverable via macOS Trash with native &quot;Put Back&quot; support.
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

        {/* CANDIDATE ITEMS SECTION */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'developer', label: 'Developer (Xcode, Node)' },
                { id: 'ai', label: 'AI Models (Ollama, LM Studio)' },
                { id: 'caches', label: 'Caches & Temp' },
                { id: 'apps', label: 'App Leftovers' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-cyan-50 border border-cyan-200 text-cyan-800 font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Select All Controls */}
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => handleSelectAll(true)}
                className="text-cyan-700 hover:text-cyan-600 font-semibold cursor-pointer"
              >
                Select All
              </button>
              <span className="text-slate-300">•</span>
              <button
                onClick={() => handleSelectAll(false)}
                className="text-slate-500 hover:text-slate-700 cursor-pointer"
              >
                Deselect All
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-2">
            {filteredItems.map(item => {
              const isExpanded = expandedItemId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-xl border transition-all ${
                    item.selected
                      ? 'bg-white border-cyan-300 shadow-sm'
                      : 'bg-slate-50/70 border-slate-200 opacity-80'
                  }`}
                >
                  <div className="p-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleSelect(item.id)}
                        className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 border-slate-300 cursor-pointer"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900 truncate">{item.name}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            item.risk === 'Low'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}>
                            {item.risk} Risk
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 truncate block">
                          {item.path}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-sm font-bold font-mono text-slate-900">
                        {item.sizeGB} GB
                      </span>
                      <button
                        onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                        className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Inspection Drawer */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-slate-100 bg-slate-50/40 text-xs text-slate-600 space-y-2 animate-in fade-in duration-150">
                      <p className="leading-relaxed">{item.description}</p>
                      <div className="p-2.5 rounded-lg bg-cyan-50/80 border border-cyan-100 text-cyan-950 space-y-1">
                        <span className="font-bold block text-[11px]">Safe Rebuild Consequence:</span>
                        <p>{item.rebuildImpact}</p>
                      </div>
                      <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                        <span>Last modified/accessed: {item.lastUsed}</span>
                        <span>•</span>
                        <span>Restorable via macOS Trash: Yes</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Confirm Move to Trash</h3>
                <span className="text-xs text-slate-500">Trash-First Safety Architecture</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed space-y-2">
              <p>
                You are about to simulate moving <strong className="text-slate-900 font-bold">{selectedItems.length} candidate items ({selectedBytes.toFixed(1)} GB)</strong> to the native macOS Trash.
              </p>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Zero permanent deletion:
                </span>
                <p>All items remain in your macOS Trash until you choose to empty it. You can restore any item instantly using &quot;Put Back&quot;.</p>
              </div>
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
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/25 cursor-pointer"
              >
                Proceed to Trash ({selectedBytes.toFixed(1)} GB)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
