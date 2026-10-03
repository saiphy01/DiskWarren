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
  Hammer,
  Folder,
  ArrowRight,
  FileText
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
    rebuildImpact: 'Xcode will re-index projects on next compilation.',
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
    name: 'Orphaned node_modules (3 Archived Projects)',
    category: 'developer',
    path: '~/Projects/archive-2025/*/node_modules',
    sizeGB: 6.8,
    risk: 'Review',
    selected: true,
    description: 'Stale npm/yarn/pnpm dependencies in inactive repositories.',
    rebuildImpact: 'Can be restored from Trash or re-installed with `npm install`.',
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
    rebuildImpact: 'App is uninstalled; residual support files are abandoned.',
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
    description: 'Time Machine local snapshots, sleep images, and application caches.'
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
  const [hoveredTreemapBlock, setHoveredTreemapBlock] = useState<string | null>(null);

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
    }, 750);
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
      <div className="bg-gradient-to-r from-cyan-50/90 via-slate-50 to-blue-50/90 px-6 py-3 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
        <div className="flex items-center gap-2 text-slate-800 font-medium">
          <AlertCircle className="w-4 h-4 text-cyan-600 shrink-0" />
          <span>
            <strong>Interactive Storage Demo:</strong> This demonstration uses synthetic storage data and does not access your Mac.
          </span>
        </div>
        
        {/* View Mode Toggle: Pie vs Treemap */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-xs shrink-0" role="tablist" aria-label="Visualization View Mode">
          <button
            onClick={() => setViewMode('pie')}
            role="tab"
            aria-selected={viewMode === 'pie'}
            className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'pie'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <PieChartIcon className="w-3.5 h-3.5" />
            <span>Radial Ring (Pie)</span>
          </button>

          <button
            onClick={() => setViewMode('treemap')}
            role="tab"
            aria-selected={viewMode === 'treemap'}
            className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
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
              <h3 className="text-xl font-bold text-slate-900">Macintosh HD — 500 GB Storage Simulation</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Synthetic APFS Container (`disk3s1s1`) • Native macOS Sequoia Style
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
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 320 320" aria-label="APFS Storage Distribution Donut Chart">
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
                        Storage Category
                      </span>
                      <div className="text-base font-extrabold text-slate-900 leading-tight">
                        {hoveredSlice.label}
                      </div>
                      <div className="text-xl font-extrabold font-mono text-cyan-600">
                        {(hoveredSlice.currentSize ?? hoveredSlice.sizeGB).toFixed(1)} GB
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono block">
                        {(((hoveredSlice.currentSize ?? hoveredSlice.sizeGB) / totalVolumeGB) * 100).toFixed(1)}% of Simulated Volume
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
                Hover or tap slices to inspect simulated APFS volume categories.
              </p>
            </div>

            {/* Right: Partition Breakdown Cards */}
            <div className="md:col-span-7 space-y-2.5">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Synthetic APFS Storage Breakdown</span>
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
                          {(slice.currentSize ?? slice.sizeGB).toFixed(1)} GB
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {(((slice.currentSize ?? slice.sizeGB) / totalVolumeGB) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* SQUARIFIED TREEMAP MATRIX */
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">Squarified Treemap Matrix</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 font-mono text-[11px]">Proportional 500 GB Layout</span>
              </div>
              <span className="text-cyan-700 font-mono text-[11px] font-semibold">
                {hoveredTreemapBlock ? `Inspecting: ${hoveredTreemapBlock}` : 'Hover blocks to inspect details'}
              </span>
            </div>

            {/* Nested Treemap Grid */}
            <div className="grid grid-cols-12 gap-3 h-80">
              {/* Block 1: Developer Caches (Cyan/Teal Gradient) */}
              <div 
                onMouseEnter={() => setHoveredTreemapBlock('Developer Caches (~/Library/Developer & ~/Projects)')}
                onMouseLeave={() => setHoveredTreemapBlock(null)}
                className={`col-span-4 rounded-xl border border-cyan-300 bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-teal-500/15 p-3 flex flex-col justify-between transition-all hover:shadow-md hover:border-cyan-400 relative overflow-hidden group cursor-pointer ${
                  isSimulatedClean ? 'opacity-40' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Hammer className="w-3.5 h-3.5 text-cyan-600" />
                    <span className="text-xs font-bold text-cyan-950">Developer Caches</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-100 text-cyan-800">
                    {isSimulatedClean ? '17.5 GB' : '48.4 GB'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 mt-2 flex-1">
                  <div className="bg-white/80 border border-cyan-200/80 rounded-lg p-2 flex flex-col justify-between shadow-2xs hover:bg-white transition-colors">
                    <span className="text-[11px] font-bold text-slate-800 block truncate">DerivedData</span>
                    <div className="flex items-center justify-between text-[10px] font-mono text-cyan-700">
                      <span>24.1 GB</span>
                      <span className="text-slate-400">1,420 files</span>
                    </div>
                  </div>
                  <div className="bg-white/80 border border-cyan-200/80 rounded-lg p-2 flex flex-col justify-between shadow-2xs hover:bg-white transition-colors">
                    <span className="text-[11px] font-bold text-slate-800 block truncate">Simulators</span>
                    <div className="flex items-center justify-between text-[10px] font-mono text-cyan-700">
                      <span>12.4 GB</span>
                      <span className="text-slate-400">iOS 18</span>
                    </div>
                  </div>
                  <div className="bg-white/80 border border-cyan-200/80 rounded-lg p-2 flex flex-col justify-between shadow-2xs hover:bg-white transition-colors">
                    <span className="text-[11px] font-bold text-slate-800 block truncate">node_modules</span>
                    <div className="flex items-center justify-between text-[10px] font-mono text-cyan-700">
                      <span>6.8 GB</span>
                      <span className="text-slate-400">3 projects</span>
                    </div>
                  </div>
                  <div className="bg-white/80 border border-cyan-200/80 rounded-lg p-2 flex flex-col justify-between shadow-2xs hover:bg-white transition-colors">
                    <span className="text-[11px] font-bold text-slate-800 block truncate">Cargo debug</span>
                    <div className="flex items-center justify-between text-[10px] font-mono text-cyan-700">
                      <span>5.1 GB</span>
                      <span className="text-slate-400">target/</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Block 2: Local AI Weights (Purple/Indigo Gradient) */}
              <div 
                onMouseEnter={() => setHoveredTreemapBlock('Local AI Models (~/.ollama & LM Studio GGUFs)')}
                onMouseLeave={() => setHoveredTreemapBlock(null)}
                className={`col-span-3 rounded-xl border border-purple-300 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-indigo-500/15 p-3 flex flex-col justify-between transition-all hover:shadow-md hover:border-purple-400 relative overflow-hidden group cursor-pointer ${
                  isSimulatedClean ? 'opacity-40' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-purple-600" />
                    <span className="text-xs font-bold text-purple-950">AI Models</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 text-purple-800">
                    {isSimulatedClean ? '11.2 GB' : '38.5 GB'}
                  </span>
                </div>

                <div className="space-y-1.5 mt-2 flex-1 flex flex-col justify-between">
                  <div className="bg-white/80 border border-purple-200/80 rounded-lg p-2 shadow-2xs hover:bg-white transition-colors">
                    <span className="text-[11px] font-bold text-slate-800 block truncate">Ollama Blobs</span>
                    <div className="flex items-center justify-between text-[10px] font-mono text-purple-700 mt-0.5">
                      <span>22.5 GB</span>
                      <span className="text-slate-400">Llama3 70B</span>
                    </div>
                  </div>
                  <div className="bg-white/80 border border-purple-200/80 rounded-lg p-2 shadow-2xs hover:bg-white transition-colors">
                    <span className="text-[11px] font-bold text-slate-800 block truncate">LM Studio GGUF</span>
                    <div className="flex items-center justify-between text-[10px] font-mono text-purple-700 mt-0.5">
                      <span>11.2 GB</span>
                      <span className="text-slate-400">Mistral-7B</span>
                    </div>
                  </div>
                  <div className="bg-white/80 border border-purple-200/80 rounded-lg p-1.5 shadow-2xs hover:bg-white transition-colors">
                    <span className="text-[10px] font-medium text-slate-700 block truncate">Hugging Face Hub (4.8 GB)</span>
                  </div>
                </div>
              </div>

              {/* Block 3: System Data & Applications */}
              <div className="col-span-5 grid grid-rows-2 gap-2">
                <div 
                  onMouseEnter={() => setHoveredTreemapBlock('System Data (Time Machine Local Snapshots, Logs, Caches)')}
                  onMouseLeave={() => setHoveredTreemapBlock(null)}
                  className="rounded-xl border border-slate-300 bg-gradient-to-r from-slate-100 to-slate-200/70 p-3 flex flex-col justify-between hover:border-slate-400 transition-all cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-slate-600" />
                      <span className="text-xs font-bold text-slate-900">macOS System Data</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-200 text-slate-800">
                      {isSimulatedClean ? '42.0 GB' : '78.6 GB'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-2 text-[10px] font-mono text-slate-600">
                    <span className="px-2 py-0.5 rounded bg-white/70 border border-slate-200">Snapshots: 42 GB</span>
                    <span className="px-2 py-0.5 rounded bg-white/70 border border-slate-200">Caches: 22.6 GB</span>
                    <span className="px-2 py-0.5 rounded bg-white/70 border border-slate-200">Sleep: 14 GB</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div 
                    onMouseEnter={() => setHoveredTreemapBlock('Applications & Leftover residual support folders')}
                    onMouseLeave={() => setHoveredTreemapBlock(null)}
                    className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/50 p-2.5 flex flex-col justify-between hover:border-blue-300 transition-all cursor-pointer shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-blue-900">Apps</span>
                      <span className="text-[10px] font-mono font-bold text-blue-700">52.6 GB</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Xcode &amp; Leftovers</span>
                  </div>

                  <div 
                    onMouseEnter={() => setHoveredTreemapBlock('Available Free APFS Space on SSD')}
                    onMouseLeave={() => setHoveredTreemapBlock(null)}
                    className={`rounded-xl border-2 p-2.5 flex flex-col justify-between transition-all cursor-pointer shadow-xs ${
                      isSimulatedClean
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950 scale-[1.02]'
                        : 'border-emerald-300/80 bg-emerald-50/50 text-emerald-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Available
                      </span>
                      <span className="text-[11px] font-mono font-bold text-emerald-700">
                        {isSimulatedClean ? '335.6 GB' : '193.8 GB'}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-medium">
                      {isSimulatedClean ? '+48.2 GB Reclaimed!' : 'APFS Free blocks'}
                    </span>
                  </div>
                </div>
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
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0" role="tablist" aria-label="Candidate item categories">
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
                  role="tab"
                  aria-selected={activeTab === tab.id}
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
                        aria-label={`Select ${item.name} for cleanup`}
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
                        aria-label={isExpanded ? `Collapse ${item.name} details` : `Expand ${item.name} details`}
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
                        <span>Last modified: {item.lastUsed}</span>
                        <span>•</span>
                        <span>Restorable via macOS Trash: Yes (Put Back supported)</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONFIRMATION MODAL & DELETION MANIFEST */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-150" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 id="modal-title" className="text-lg font-bold text-slate-900">
                    Confirm Move to Trash ({selectedBytes.toFixed(1)} GB)
                  </h3>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    Trash-First Protection • Native &quot;Put Back&quot; Supported
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setShowConfirmModal(false)}
                aria-label="Close confirmation dialog"
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description & Space Reclamation Equation */}
            <div className="space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                Review the exact items scheduled for recycling. Files are moved to the macOS Trash, not permanently erased.
              </p>

              {/* Space Equation Bar */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Current Free Space</span>
                  <span className="font-bold text-slate-900 font-mono">193.8 GB</span>
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-600" />
                <div>
                  <span className="text-slate-500 block text-[11px]">Reclaimed to Trash</span>
                  <span className="font-bold text-emerald-600 font-mono">+{selectedBytes.toFixed(1)} GB</span>
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-600" />
                <div>
                  <span className="text-slate-500 block text-[11px]">New Free Space</span>
                  <span className="font-bold text-cyan-700 font-mono">{(193.8 + selectedBytes).toFixed(1)} GB</span>
                </div>
              </div>
            </div>

            {/* ITEM MANIFEST BREAKDOWN */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                Scheduled Items ({selectedItems.length})
              </span>
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-100 border border-slate-200 rounded-xl p-2 bg-slate-50/50">
                {selectedItems.map(item => (
                  <div key={item.id} className="pt-1.5 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div className="min-w-0 flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <div className="truncate">
                        <span className="font-bold text-slate-900 block truncate">{item.name}</span>
                        <span className="text-[10px] font-mono text-slate-500 truncate block">{item.path}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0 flex items-center gap-2">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                        item.risk === 'Low' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.risk}
                      </span>
                      <span className="font-bold font-mono text-slate-900">{item.sizeGB} GB</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trash Put Back Guarantee Note */}
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Safety by Design:</strong> Items reside safely in your native macOS Trash. Open Trash anytime and select <span className="underline font-semibold">Put Back</span> to restore files to their exact original locations.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClean}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/25 flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
                <span>Move {selectedBytes.toFixed(1)} GB to Trash</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
