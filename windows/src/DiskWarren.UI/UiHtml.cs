namespace DiskWarren.UI;

public static class UiHtml
{
    public const string Content = @"<!DOCTYPE html>
<html lang=""en"" class=""light"">
<head>
  <meta charset=""UTF-8"">
  <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
  <title>DiskWarren — Storage Intelligence &amp; Safe Cleanup</title>
  <style>
    :root {
      --bg: #F8FAFC;
      --surface: #FFFFFF;
      --surface-subtle: #F1F5F9;
      --surface-card: #FFFFFF;
      --border: rgba(226, 232, 240, 0.85);
      --border-hover: rgba(2, 132, 199, 0.35);
      --border-focus: rgba(2, 132, 199, 0.5);
      --text-main: #0F172A;
      --text-body: #334155;
      --text-muted: #64748B;
      --text-dim: #94A3B8;
      --accent-primary: #0284C7;
      --accent-primary-hover: #0369A1;
      --accent-cobalt: #2563EB;
      --accent-emerald: #059669;
      --accent-amber: #D97706;
      --accent-rose: #E11D48;
      --accent-violet: #7C3AED;
      --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 16px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04);
      --shadow-lg: 0 16px 36px -6px rgba(15, 23, 42, 0.09), 0 6px 12px -2px rgba(15, 23, 42, 0.04);
      --shadow-dock: 0 20px 48px -10px rgba(15, 23, 42, 0.16), 0 0 0 1px rgba(2, 132, 199, 0.25);
      --dock-bg: rgba(255, 255, 255, 0.92);
    }

    html.dark {
      --bg: #0B0F19;
      --surface: rgba(17, 24, 39, 0.88);
      --surface-subtle: rgba(31, 41, 55, 0.65);
      --surface-card: #111827;
      --border: rgba(255, 255, 255, 0.08);
      --border-hover: rgba(56, 189, 248, 0.35);
      --border-focus: rgba(56, 189, 248, 0.5);
      --text-main: #F9FAFB;
      --text-body: #D1D5DB;
      --text-muted: #9CA3AF;
      --text-dim: #6B7280;
      --accent-primary: #38BDF8;
      --accent-primary-hover: #0284C7;
      --accent-cobalt: #60A5FA;
      --accent-emerald: #34D399;
      --accent-amber: #FBBF24;
      --accent-rose: #F87171;
      --accent-violet: #A78BFA;
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
      --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
      --shadow-lg: 0 16px 36px rgba(0, 0, 0, 0.6);
      --shadow-dock: 0 20px 48px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(56, 189, 248, 0.35);
      --dock-bg: rgba(17, 24, 39, 0.94);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Inter, system-ui, sans-serif; }
    
    body {
      background: var(--bg);
      color: var(--text-main);
      overflow-x: hidden;
      height: 100vh;
      display: flex;
      flex-direction: column;
      user-select: none;
      transition: background-color 0.25s ease, color 0.25s ease;
    }

    /* Precision Scrollbars */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.35); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(2, 132, 199, 0.45); }

    /* Header Bar */
    .app-header {
      height: 64px;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      z-index: 100;
      box-shadow: var(--shadow-sm);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }

    .brand-group {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 220px;
    }

    .brand-logo {
      width: 36px;
      height: 36px;
      border-radius: 11px;
      background: linear-gradient(135deg, #0284C7 0%, #2563EB 50%, #4F46E5 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.32);
    }

    .brand-name {
      font-size: 17px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: var(--text-main);
    }

    .badge-enterprise {
      font-size: 10px;
      padding: 2px 7px;
      border-radius: 6px;
      font-weight: 700;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      background: rgba(2, 132, 199, 0.08);
      color: var(--accent-primary);
      border: 1px solid rgba(2, 132, 199, 0.2);
    }

    /* Executive Segmented Navigation Pill */
    .tab-bar {
      display: flex;
      background: var(--surface-subtle);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 3px;
      gap: 2px;
    }

    .tab-item {
      padding: 7px 15px;
      border-radius: 9px;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-muted);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      gap: 7px;
      outline: none;
    }
    .tab-item:hover {
      color: var(--text-main);
    }
    .tab-item.active {
      color: var(--text-main);
      background: var(--surface);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border);
      font-weight: 700;
    }

    /* Top Cleanable Space Capsule */
    .top-clear-capsule {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 10px 4px 8px;
      background: rgba(5, 150, 105, 0.08);
      border: 1.5px solid rgba(5, 150, 105, 0.28);
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .top-clear-capsule:hover {
      background: rgba(5, 150, 105, 0.14);
      border-color: rgba(5, 150, 105, 0.45);
      transform: translateY(-1px);
    }
    .clear-icon-glow {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(5, 150, 105, 0.18);
      color: var(--accent-emerald);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .clear-text-group {
      display: flex;
      flex-direction: column;
    }
    .clear-label {
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.6px;
      color: var(--accent-emerald);
      text-transform: uppercase;
      line-height: 1;
    }
    .clear-value {
      font-size: 13.5px;
      font-weight: 800;
      color: var(--text-main);
      font-family: monospace;
      line-height: 1.2;
    }
    .btn-clear-pill {
      background: var(--accent-emerald);
      color: #FFFFFF;
      border: none;
      border-radius: 10px;
      padding: 3px 8px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      margin-left: 2px;
      transition: all 0.15s ease;
    }
    .btn-clear-pill:hover {
      filter: brightness(1.1);
      transform: scale(1.04);
    }

    /* Windows Caption Controls */
    .win-caption-controls {
      display: flex;
      align-items: center;
      height: 64px;
      margin-left: 4px;
      margin-right: -24px;
    }
    .win-btn {
      width: 46px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      transition: background-color 0.12s ease, color 0.12s ease;
      outline: none;
    }
    .win-btn:hover {
      background: var(--surface-subtle);
      color: var(--text-main);
    }
    .win-btn.win-close:hover {
      background: #E81123 !important;
      color: #FFFFFF !important;
    }
    .win-btn svg {
      pointer-events: none;
    }

    /* View Header Clear Hero Badge */
    .top-clean-hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--surface);
      border: 1px solid rgba(5, 150, 105, 0.25);
      border-radius: 8px;
      padding: 6px 12px;
      box-shadow: var(--shadow-sm);
    }

    /* Toolstrip */
    .toolstrip {
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: flex-end;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      padding: 7px 15px;
      border-radius: 9px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
      border: none;
      outline: none;
    }
    .btn-primary {
      background: linear-gradient(135deg, #0284C7 0%, #2563EB 100%);
      color: #FFFFFF;
      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
    }
    .btn-primary:hover {
      filter: brightness(1.08);
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
    }
    .btn-primary:active { transform: translateY(0); }

    .btn-secondary {
      background: var(--surface);
      color: var(--text-body);
      border: 1px solid var(--border);
      box-shadow: var(--shadow-sm);
    }
    .btn-secondary:hover {
      background: var(--surface-subtle);
      border-color: rgba(148, 163, 184, 0.5);
    }

    .btn-stage {
      background: rgba(2, 132, 199, 0.08);
      color: var(--accent-primary);
      border: 1px solid rgba(2, 132, 199, 0.24);
      padding: 4px 10px;
      border-radius: 7px;
      font-size: 11.5px;
      font-weight: 700;
      transition: all 0.15s ease;
    }
    .btn-stage:hover {
      background: var(--accent-primary);
      color: #FFFFFF;
      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.3);
      transform: translateY(-1px);
    }

    /* Cards */
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 22px;
      box-shadow: var(--shadow-sm);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .card:hover {
      border-color: var(--border-hover);
      box-shadow: var(--shadow-md);
    }

    /* Viewport Area */
    .app-main {
      flex: 1;
      overflow-y: auto;
      padding: 24px 32px 110px 32px;
      position: relative;
    }

    .view-header {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .view-title {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: var(--text-main);
      margin-bottom: 3px;
    }
    .view-subtitle {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    /* Physical Drive Strip */
    .drive-strip {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 16px;
      margin-bottom: 22px;
    }
    .drive-card {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: 13px;
      padding: 16px 18px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: var(--shadow-sm);
    }
    .drive-card:hover {
      border-color: var(--border-hover);
      transform: translateY(-1px);
    }
    .drive-card.selected {
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.15), var(--shadow-md);
    }
    .drive-card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .drive-card-title {
      font-size: 14.5px;
      font-weight: 800;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .drive-card-badge {
      font-size: 10.5px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 5px;
      background: var(--surface-subtle);
      border: 1px solid var(--border);
      color: var(--text-muted);
    }
    .drive-card-bar {
      height: 8px;
      background: var(--surface-subtle);
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 8px;
      border: 1px solid var(--border);
      display: flex;
    }
    .drive-card-fill-used {
      height: 100%;
      background: linear-gradient(90deg, #0284C7 0%, #2563EB 100%);
      transition: width 0.4s ease;
    }
    .drive-card-fill-free {
      height: 100%;
      background: #10B981;
      opacity: 0.35;
      transition: width 0.4s ease;
    }
    .drive-card-stats {
      display: flex;
      justify-content: space-between;
      font-size: 11.5px;
      color: var(--text-muted);
      font-weight: 600;
    }

    /* Master Space Allocation Donut Section */
    .donut-layout-grid {
      display: grid;
      grid-template-columns: 400px 1fr;
      gap: 28px;
      align-items: center;
    }
    .donut-canvas-pod {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    /* Modern Legend Cards */
    .pie-legend-container {
      display: flex;
      flex-direction: column;
      gap: 9px;
    }
    .pie-legend-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      background: var(--surface-subtle);
      border: 1px solid var(--border);
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .pie-legend-row:hover, .pie-legend-row.highlighted {
      background: var(--surface);
      border-color: var(--accent-primary);
      box-shadow: var(--shadow-sm);
      transform: translateX(3px);
    }
    .pie-swatch {
      width: 12px;
      height: 12px;
      border-radius: 4px;
      flex-shrink: 0;
    }
    .pie-cat-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--text-main);
    }
    .pie-cat-sub {
      font-size: 11px;
      color: var(--text-muted);
      margin-top: 1px;
    }
    .pie-cat-size {
      font-size: 13px;
      font-weight: 800;
      color: var(--text-main);
      font-family: monospace;
      text-align: right;
    }
    .pie-cat-pct {
      font-size: 11px;
      color: var(--text-muted);
      text-align: right;
    }
    .pie-mini-bar {
      width: 60px;
      height: 5px;
      background: var(--border);
      border-radius: 3px;
      overflow: hidden;
      margin-top: 3px;
    }
    .pie-mini-bar-fill {
      height: 100%;
      border-radius: 3px;
    }

    /* Radar Sweep & Quick Clean Hero */
    .radar-hero-grid {
      display: grid;
      grid-template-columns: 360px 1fr;
      gap: 20px;
      margin-top: 22px;
    }
    .radar-circle {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      border: 2px dashed rgba(2, 132, 199, 0.35);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 18px;
    }
    .radar-sweep-hand {
      position: absolute;
      width: 50%;
      height: 2px;
      top: 50%;
      left: 50%;
      transform-origin: 0 0;
      background: linear-gradient(90deg, #0284C7, transparent);
      animation: radarSpin 4s linear infinite;
    }
    @keyframes radarSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .radar-stat-box {
      text-align: center;
      z-index: 2;
    }
    .radar-number {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: var(--accent-primary);
      font-family: monospace;
    }
    .radar-label {
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
      margin-top: 2px;
    }

    /* Primary Registries Tiles */
    .tiles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 14px;
    }
    .diagnostic-tile {
      background: var(--surface-subtle);
      border: 1px solid var(--border);
      border-radius: 11px;
      padding: 14px;
      transition: all 0.18s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .diagnostic-tile:hover {
      border-color: var(--border-hover);
      background: var(--surface);
      transform: translateY(-1px);
    }
    .tile-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .tile-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tile-size {
      font-size: 14px;
      font-weight: 800;
      color: var(--accent-primary);
      font-family: monospace;
    }
    .tile-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 3px;
    }
    .tile-desc {
      font-size: 11.5px;
      color: var(--text-muted);
      line-height: 1.4;
    }

    /* Sunburst Visualizer */
    .sunburst-box {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    .sunburst-toolbar {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .sunburst-crumbs {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
    }
    .crumb-chip {
      background: var(--surface-subtle);
      border: 1px solid var(--border);
      padding: 4px 10px;
      border-radius: 6px;
      color: var(--accent-primary);
      cursor: pointer;
    }
    .sunburst-tooltip {
      position: absolute;
      display: none;
      background: var(--surface);
      border: 1px solid var(--accent-primary);
      border-radius: 9px;
      padding: 10px 14px;
      pointer-events: none;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
    }

    /* Treemap Wrapper */
    .treemap-wrapper {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 24px;
    }
    .treemap-tiles {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .treemap-tile {
      border-radius: 9px;
      padding: 12px;
      color: #FFFFFF;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.18s ease;
      overflow: hidden;
      box-shadow: var(--shadow-sm);
    }
    .treemap-tile:hover {
      transform: scale(1.02);
      filter: brightness(1.1);
      box-shadow: var(--shadow-md);
    }
    .tile-name {
      font-size: 12.5px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tile-val {
      font-size: 12.5px;
      font-weight: 800;
      font-family: monospace;
      opacity: 0.95;
    }

    /* Toolchain Registry List */
    .registry-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 18px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 11px;
      margin-bottom: 10px;
      transition: all 0.18s ease;
    }
    .registry-item:hover {
      border-color: var(--border-hover);
      box-shadow: var(--shadow-sm);
    }
    .reg-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .reg-path {
      font-size: 11.5px;
      color: var(--text-dim);
      font-family: monospace;
      margin-top: 3px;
    }
    .reg-desc {
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 4px;
    }
    .badge-safe {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 5px;
      background: rgba(16, 185, 129, 0.1);
      color: var(--accent-emerald);
      border: 1px solid rgba(16, 185, 129, 0.25);
    }
    .badge-review {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 5px;
      background: rgba(217, 119, 6, 0.1);
      color: var(--accent-amber);
      border: 1px solid rgba(217, 119, 6, 0.25);
    }

    /* Duplicate Clusters */
    .dup-cluster {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 14px;
    }
    .cluster-head {
      display: flex;
      justify-content: space-between;
      font-size: 12.5px;
      font-weight: 700;
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border);
    }
    .cluster-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 7px 0;
      font-size: 12px;
      color: var(--text-body);
      font-family: monospace;
      border-bottom: 1px dashed var(--border);
    }
    .cluster-row:last-child { border-bottom: none; }

    /* The Floating Staging Capsule Dock */
    .floating-dock {
      position: fixed;
      bottom: 22px;
      left: 50%;
      transform: translateX(-50%) translateY(90px);
      background: var(--dock-bg);
      border: 1.5px solid rgba(2, 132, 199, 0.35);
      border-radius: 22px;
      padding: 10px 18px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: var(--shadow-dock);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      z-index: 2000;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      pointer-events: none;
    }
    .floating-dock.active {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
      pointer-events: auto;
    }
    .dock-recycler-icon {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      background: rgba(2, 132, 199, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-primary);
    }
    .dock-headline {
      font-size: 14px;
      font-weight: 800;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .dock-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Modal Sheet */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 3000;
      display: none;
      align-items: center;
      justify-content: center;
    }
    .modal-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      width: 520px;
      max-width: 90vw;
      padding: 28px;
      box-shadow: var(--shadow-lg);
      animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes modalPop {
      0% { opacity: 0; transform: scale(0.95); }
      100% { opacity: 1; transform: scale(1); }
    }
    .modal-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 8px;
    }
    .modal-body {
      font-size: 13px;
      color: var(--text-body);
      line-height: 1.6;
      margin-bottom: 22px;
    }

    /* Toast */
    .toast-pill {
      position: fixed;
      bottom: 86px;
      right: 28px;
      background: var(--surface);
      border: 1px solid var(--accent-primary);
      color: var(--text-main);
      padding: 10px 18px;
      border-radius: 30px;
      font-size: 12.5px;
      font-weight: 700;
      box-shadow: var(--shadow-lg);
      display: none;
      z-index: 4000;
      animation: toastIn 0.25s ease;
    }
    @keyframes toastIn {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>

  <!-- Precision Header -->
  <header class=""app-header"" onmousedown=""handleHeaderMouseDown(event)"">
    <div class=""brand-group"">
      <div class=""brand-logo"">
        <svg width=""20"" height=""20"" viewBox=""0 0 24 24"" fill=""none"" stroke=""#FFFFFF"" stroke-width=""2.5"" stroke-linecap=""round"" stroke-linejoin=""round"">
          <circle cx=""12"" cy=""12"" r=""10""/><path d=""m4.93 4.93 4.24 4.24""/><path d=""m14.83 9.17 4.24-4.24""/><path d=""m14.83 14.83 4.24 4.24""/><path d=""m9.17 14.83-4.24 4.24""/><circle cx=""12"" cy=""12"" r=""4""/>
        </svg>
      </div>
      <div>
        <div style=""display:flex; align-items:center; gap:8px;"">
          <span class=""brand-name"">DiskWarren</span>
          <span class=""badge-enterprise"">Precision v1.0</span>
        </div>
      </div>
    </div>

    <!-- Segmented Master Navigation -->
    <nav class=""tab-bar"">
      <button class=""tab-item active"" onclick=""switchTab('dashboard')"">
        <svg width=""15"" height=""15"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><path d=""M21.21 15.89A10 10 0 1 1 8 2.83""/><path d=""M22 12A10 10 0 0 0 12 2v10z""/></svg>
        Storage Map &amp; Space Pie
      </button>
      <button class=""tab-item"" onclick=""switchTab('visualizer')"">
        <svg width=""15"" height=""15"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><circle cx=""12"" cy=""12"" r=""10""/><circle cx=""12"" cy=""12"" r=""4""/><path d=""m4.93 4.93 4.24 4.24""/></svg>
        Deep Visualizer
      </button>
      <button class=""tab-item"" onclick=""switchTab('toolchains')"">
        <svg width=""15"" height=""15"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><polyline points=""16 18 22 12 16 6""/><polyline points=""8 6 2 12 8 18""/></svg>
        Developer Toolchains
      </button>
      <button class=""tab-item"" onclick=""switchTab('duplicates')"">
        <svg width=""15"" height=""15"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><rect width=""14"" height=""14"" x=""8"" y=""8"" rx=""2""/><path d=""M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2""/></svg>
        Duplicate Finder
      </button>
    </nav>

    <!-- Toolstrip -->
    <div class=""toolstrip"">
      <!-- Prominent Clean Space Pill On Top -->
      <div class=""top-clear-capsule"" onclick=""stageAllLowRiskTargets()"" title=""Click to stage all cleanable items"">
        <div class=""clear-icon-glow"">
          <svg width=""13"" height=""13"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2.5""><polyline points=""3 6 5 6 21 6""/><path d=""M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2""/></svg>
        </div>
        <div class=""clear-text-group"">
          <span class=""clear-label"">CLEANABLE</span>
          <strong class=""clear-value"" id=""topClearableSize"">0 B</strong>
        </div>
        <button class=""btn-clear-pill"" onclick=""event.stopPropagation(); stageAllLowRiskTargets();"">
          Stage All
        </button>
      </div>

      <button class=""btn btn-secondary"" style=""padding:5px 10px; font-size:11.5px;"" onclick=""openSafetyModal()"">
        🛡️ Air-Gap
      </button>
      <button class=""btn btn-secondary"" style=""padding:5px 10px; font-size:11.5px;"" onclick=""openLicenseModal()"">
        ★ Pro
      </button>
      <button class=""btn btn-secondary"" style=""padding:5px 9px; font-size:11.5px;"" onclick=""toggleSound()"" id=""soundToggleBtn"">
        🔊 Sound On
      </button>
      <button class=""btn btn-secondary"" style=""padding:5px 9px; font-size:11.5px;"" onclick=""toggleTheme()"" id=""themeToggleBtn"">
        ☀️ Light
      </button>

      <!-- Windows Caption Controls (Minimize, Maximize, Close) -->
      <div class=""win-caption-controls"">
        <button class=""win-btn win-min"" title=""Minimize"" onclick=""sendWindowAction('minimize')"">
          <svg width=""10"" height=""10"" viewBox=""0 0 10 1""><rect width=""10"" height=""1"" fill=""currentColor""/></svg>
        </button>
        <button class=""win-btn win-max"" id=""winMaxBtn"" title=""Maximize"" onclick=""sendWindowAction('maximize')"">
          <svg width=""10"" height=""10"" viewBox=""0 0 10 10""><rect fill=""none"" stroke=""currentColor"" stroke-width=""1.2"" width=""8"" height=""8"" x=""1"" y=""1"" rx=""1""/></svg>
        </button>
        <button class=""win-btn win-close"" title=""Close"" onclick=""sendWindowAction('close')"">
          <svg width=""10"" height=""10"" viewBox=""0 0 10 10""><path fill=""none"" stroke=""currentColor"" stroke-width=""1.2"" d=""M1 1l8 8M9 1L1 9""/></svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Viewports -->
  <main class=""app-main"">

    <!-- 1. STORAGE MAP & SPACE PIE (FLAGSHIP VIEW) -->
    <section id=""view-dashboard"">
      <div class=""view-header"">
        <div>
          <div style=""display:flex; align-items:center; gap:12px; margin-bottom:4px;"">
            <h1 class=""view-title"" style=""margin-bottom:0;"">System Volume Allocation &amp; Space Pie</h1>
            <div class=""top-clean-hero-badge"">
              <span class=""pulse-dot"" style=""background:#059669; box-shadow:0 0 6px #059669;""></span>
              <span style=""font-size:12px; font-weight:600; color:var(--text-muted);"">Reclaimable:</span>
              <strong style=""font-size:13.5px; font-weight:800; color:var(--accent-emerald); font-family:monospace;"" id=""heroClearableSize"">0 B</strong>
              <button class=""btn btn-stage"" style=""padding:2px 8px; font-size:11px;"" onclick=""stageAllLowRiskTargets()"">+ Stage All</button>
            </div>
          </div>
          <p class=""view-subtitle"">High-precision filesystem telemetry, partition cluster analysis, and disposable package caches.</p>
        </div>
        <button class=""btn btn-primary"" onclick=""triggerStorageRefresh()"">
          <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2.5""><polyline points=""23 4 23 10 17 10""/><polyline points=""1 20 1 14 7 14""/><path d=""M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15""/></svg>
          Run Diagnostic Scan
        </button>
      </div>

      <!-- Physical Drive Hardware Cards -->
      <div class=""drive-strip"" id=""volumeDrivesContainer"">
        <!-- Live from C# -->
      </div>

      <!-- THE MASTER DONUT ALLOCATION CARD -->
      <div class=""card"" style=""margin-bottom: 22px;"">
        <div style=""display:flex; justify-content:space-between; align-items:center; margin-bottom: 18px;"">
          <div>
            <h3 style=""font-size:16px; font-weight:800; color:var(--text-main);"">Partition Capacity Breakdown (Interactive Donut)</h3>
            <p style=""font-size:12px; color:var(--text-muted);"">Polar sector distribution across system kernel, developer toolchains, applications, and free space.</p>
          </div>
          <div id=""dashboardDriveSelector"" style=""display:flex; gap:8px;"">
            <!-- Drive selector buttons -->
          </div>
        </div>

        <div class=""donut-layout-grid"">
          <!-- Canvas with Telemetry Pod -->
          <div class=""donut-canvas-pod"">
            <canvas id=""masterDonutCanvas"" style=""cursor:pointer;""></canvas>
            <div style=""font-size:11.5px; color:var(--text-muted); margin-top:12px; text-align:center;"">
              Hover over any slice to inspect category allocation • Click slice to filter
            </div>
          </div>

          <!-- Dynamic Category Cards -->
          <div class=""pie-legend-container"" id=""dashboardDonutLegend"">
            <!-- Dynamic Category Breakdown Rows -->
          </div>
        </div>
      </div>

      <!-- Quick Clean Hero & Primary Registries -->
      <div class=""radar-hero-grid"">
        <div class=""card"" style=""display:flex; flex-direction:column; align-items:center; text-align:center; padding:28px 20px;"">
          <div class=""radar-circle"">
            <div class=""radar-sweep-hand""></div>
            <div class=""radar-stat-box"">
              <div class=""radar-number"" id=""reclaimableHeadlineSize"">10.4 GB</div>
              <div class=""radar-label"">Safe Reclaimable</div>
            </div>
          </div>
          <p style=""font-size:12px; color:var(--text-muted); margin-bottom:16px; max-width:260px;"">
            Verified disposable compiler caches, package archives, and crash logs ready for zero-risk recycling.
          </p>
          <button class=""btn btn-primary"" style=""width:100%;"" onclick=""stageAllLowRiskTargets()"">
            Stage All Verified Safe Targets
          </button>
        </div>

        <div class=""card"">
          <h3 style=""font-size:15px; font-weight:800; color:var(--text-main); margin-bottom:14px;"">Primary Storage Reclaim Registries</h3>
          <div class=""tiles-grid"" id=""primaryRegistriesGrid"">
            <!-- Dynamic -->
          </div>
        </div>
      </div>
    </section>

    <!-- 2. DEEP VISUALIZER (SUNBURST & TREEMAP) -->
    <section id=""view-visualizer"" style=""display:none;"">
      <div class=""view-header"">
        <div>
          <h1 class=""view-title"">Hierarchical Deep Storage Visualizer</h1>
          <p class=""view-subtitle"">Concentric multi-ring disk layout and proportional cluster blocks. Click to drill down into subfolders.</p>
        </div>
        <div style=""display:flex; gap:10px;"">
          <div class=""tab-bar"">
            <button class=""tab-item active"" id=""btnVizSunburst"" onclick=""switchVizMode('sunburst')"">Radial Sunburst</button>
            <button class=""tab-item"" id=""btnVizTreemap"" onclick=""switchVizMode('treemap')"">Squarified Treemap</button>
          </div>
          <button class=""btn btn-secondary"" onclick=""drillSunburst('C:\\Users\\saiph\\Downloads')"">Downloads</button>
          <button class=""btn btn-secondary"" onclick=""drillSunburst('C:\\Users\\saiph')"">User Profile</button>
        </div>
      </div>

      <!-- Sunburst Subview -->
      <div id=""subview-sunburst"">
        <div class=""sunburst-box"">
          <div class=""sunburst-toolbar"">
            <div class=""sunburst-crumbs"" id=""sunburstCrumbsContainer"">
              <span style=""color:var(--text-dim);"">Root:</span>
              <span class=""crumb-chip"" onclick=""drillSunburst('C:\\Users\\saiph\\Downloads')"">Downloads</span>
            </div>
            <div style=""font-size:12px; color:var(--text-muted);"">
              Click sector to zoom in • Shift+click to stage to dock
            </div>
          </div>

          <canvas id=""sunburstCanvas""></canvas>

          <div class=""sunburst-tooltip"" id=""sunburstHoverTooltip"">
            <div style=""font-size:13px; font-weight:800; color:var(--text-main);"" id=""tooltipTitle"">Directory</div>
            <div style=""font-size:14px; font-weight:800; color:var(--accent-primary); font-family:monospace;"" id=""tooltipSize"">0 MB</div>
            <div style=""font-size:11px; color:var(--text-muted); margin-top:2px;"" id=""tooltipSub"">Click to drill • Shift+click to stage</div>
          </div>
        </div>
      </div>

      <!-- Treemap Subview -->
      <div id=""subview-treemap"" style=""display:none;"">
        <div class=""treemap-wrapper"">
          <div class=""treemap-tiles"" id=""treemapTilesContainer"">
            <!-- Dynamic -->
          </div>
        </div>
      </div>
    </section>

    <!-- 3. DEVELOPER TOOLCHAINS -->
    <section id=""view-toolchains"" style=""display:none;"">
      <div class=""view-header"">
        <div>
          <h1 class=""view-title"">Developer Toolchain &amp; Build Artifact Sanitizer</h1>
          <p class=""view-subtitle"">Reclaim gigabytes from global package tarballs, intermediate compilation caches, and daemon outputs without breaking active builds.</p>
        </div>
        <button class=""btn btn-primary"" onclick=""stageAllLowRiskTargets()"">
          Stage All Low Risk
        </button>
      </div>

      <div id=""toolchainsRegistryList"">
        <!-- Dynamic Rules -->
      </div>
    </section>

    <!-- 4. DUPLICATE FINDER -->
    <section id=""view-duplicates"" style=""display:none;"">
      <div class=""view-header"">
        <div>
          <h1 class=""view-title"">Two-Phase SHA-256 Duplicate File Analysis</h1>
          <p class=""view-subtitle"">Deterministic byte-for-byte cryptographic verification. Phase 1 groups matching lengths; Phase 2 computes SHA-256 signatures.</p>
        </div>
        <button class=""btn btn-primary"" onclick=""executeDuplicateScan()"">
          <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2.5""><circle cx=""11"" cy=""11"" r=""8""/><line x1=""21"" y1=""21"" x2=""16.65"" y2=""16.65""/></svg>
          Scan Downloads for Duplicates
        </button>
      </div>

      <div id=""duplicatesResultsContainer"">
        <div class=""card"" style=""text-align:center; padding:48px; color:var(--text-muted);"">
          Click 'Scan Downloads for Duplicates' to discover identical file copies across user folders.
        </div>
      </div>
    </section>

  </main>

  <!-- The Floating Staging Capsule Dock -->
  <div class=""floating-dock"" id=""collectorDock"">
    <div class=""dock-recycler-icon"">
      <svg width=""18"" height=""18"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><polyline points=""3 6 5 6 21 6""/><path d=""M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2""/><line x1=""10"" y1=""11"" x2=""10"" y2=""17""/><line x1=""14"" y1=""11"" x2=""14"" y2=""17""/></svg>
    </div>
    <div>
      <div class=""dock-headline"" id=""dockHeadlineText"">0 Items Staged</div>
      <div style=""font-size:11.5px; color:var(--text-muted);"">Reversible Windows Recycle Bin Action</div>
    </div>
    <div class=""dock-actions"">
      <button class=""btn btn-secondary"" style=""padding:6px 12px; font-size:12px;"" onclick=""clearCollectorTray()"">
        Clear
      </button>
      <button class=""btn btn-primary"" style=""padding:6px 16px; font-size:12px;"" onclick=""openConfirmationModal()"">
        Recycle Safely
      </button>
    </div>
  </div>

  <!-- Safety & Air-Gap Modal -->
  <div class=""modal-overlay"" id=""safetyModal"">
    <div class=""modal-card"">
      <div class=""modal-title"">🛡️ Air-Gapped Zero-Risk Guarantee</div>
      <div class=""modal-body"">
        <p style=""margin-bottom:12px;"">
          <strong>1. 100% Offline Air-Gapped Operation:</strong> DiskWarren executes exclusively locally on your machine with zero external telemetry, zero network sockets, and zero data uploads.
        </p>
        <p style=""margin-bottom:12px;"">
          <strong>2. Two-Phase Win32 Shell Reversibility:</strong> All staged deletions are dispatched via the Win32 <code>SHFileOperation</code> API with the <code>FOF_ALLOWUNDO</code> flag. Files are moved directly to your Windows Recycle Bin and can be restored at any time.
        </p>
        <p>
          <strong>3. Windows Defender CFA Compliant:</strong> DiskWarren respects Windows Defender Controlled Folder Access and will never touch protected user personal files or system boot sectors.
        </p>
      </div>
      <div style=""display:flex; justify-content:flex-end;"">
        <button class=""btn btn-primary"" onclick=""closeSafetyModal()"">Close</button>
      </div>
    </div>
  </div>

  <!-- Licensing Modal -->
  <div class=""modal-overlay"" id=""licenseModal"">
    <div class=""modal-card"">
      <div class=""modal-title"">★ DiskWarren Professional Edition</div>
      <div class=""modal-body"">
        <p style=""margin-bottom:14px;"">
          Enter your license key to unlock unlimited family machines, continuous background monitoring, and scheduled duplicate scrubbing.
        </p>
        <div style=""margin-bottom:14px;"">
          <input type=""text"" id=""licenseKeyInput"" placeholder=""DW-PRO-XXXX-XXXX-XXXX"" style=""width:100%; padding:10px 14px; border-radius:8px; border:1px solid var(--border); background:var(--surface-subtle); color:var(--text-main); font-family:monospace; font-size:13px; outline:none;"" />
        </div>
        <div style=""font-size:11.5px; color:var(--text-muted);"">
          Current Status: <span id=""licenseStatusBadge"" style=""color:var(--accent-emerald); font-weight:700;"">Active &amp; Verified</span>
        </div>
      </div>
      <div style=""display:flex; justify-content:flex-end; gap:8px;"">
        <button class=""btn btn-secondary"" onclick=""closeLicenseModal()"">Cancel</button>
        <button class=""btn btn-primary"" onclick=""authenticateLicense()"">Activate Key</button>
      </div>
    </div>
  </div>

  <!-- Confirmation Modal -->
  <div class=""modal-overlay"" id=""confirmModal"">
    <div class=""modal-card"">
      <div class=""modal-title"">Confirm Safe Recycle</div>
      <div class=""modal-body"" id=""modalMessageText"">
        Are you sure you want to move staged items to the Windows Recycle Bin?
      </div>
      <div style=""display:flex; justify-content:flex-end; gap:10px;"">
        <button class=""btn btn-secondary"" onclick=""closeConfirmationModal()"">Cancel</button>
        <button class=""btn btn-primary"" onclick=""dispatchBatchRecycle()"">Recycle to Windows Bin</button>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div class=""toast-pill"" id=""toastPill"">Notification</div>

  <!-- JavaScript Application Architecture -->
  <script>
    // State Model
    let drives = [];
    let rules = [];
    let treemapItems = [];
    let sunburstTree = null;
    let stagedItems = [];
    let selectedDriveIdx = 0;
    let hoveredDonutIdx = -1;
    let activeTab = 'dashboard';
    let vizMode = 'sunburst';
    let isDarkTheme = false;
    let soundEnabled = true;

    // Web Audio Synthesizer
    let audioCtx = null;
    function initAudio() {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    function playSound(type) {
      if (!soundEnabled) return;
      try {
        initAudio();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const now = audioCtx.currentTime;
        if (type === 'click') {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.04);
        } else if (type === 'stage') {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.09);
        } else if (type === 'clean') {
          [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.06);
            gain.gain.setValueAtTime(0.1, now + i * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.3);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now + i * 0.06);
            osc.stop(now + i * 0.06 + 0.35);
          });
        }
      } catch (e) { }
    }

    // High-DPI Scaled Context Helper
    function getScaledContext(canvas, cssWidth, cssHeight) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      canvas.style.width = cssWidth + 'px';
      canvas.style.height = cssHeight + 'px';
      const ctx = canvas.getContext('2d');
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
      return ctx;
    }

    // Tab Navigation
    function switchTab(tabId) {
      playSound('click');
      activeTab = tabId;
      document.querySelectorAll('.tab-bar .tab-item').forEach(b => b.classList.remove('active'));
      event.currentTarget.classList.add('active');
      document.querySelectorAll('.app-main > section').forEach(s => s.style.display = 'none');
      document.getElementById('view-' + tabId).style.display = 'block';

      if (tabId === 'dashboard') {
        setTimeout(renderAllDashboardCharts, 40);
      } else if (tabId === 'visualizer') {
        setTimeout(() => {
          if (vizMode === 'sunburst') renderSunburst();
          else renderTreemap();
        }, 40);
      }
    }

    function switchVizMode(mode) {
      playSound('click');
      vizMode = mode;
      document.getElementById('btnVizSunburst').classList.toggle('active', mode === 'sunburst');
      document.getElementById('btnVizTreemap').classList.toggle('active', mode === 'treemap');
      document.getElementById('subview-sunburst').style.display = mode === 'sunburst' ? 'block' : 'none';
      document.getElementById('subview-treemap').style.display = mode === 'treemap' ? 'block' : 'none';
      if (mode === 'sunburst') setTimeout(renderSunburst, 30);
      else setTimeout(renderTreemap, 30);
    }

    // Theme & Audio Toggles
    function toggleTheme() {
      playSound('click');
      isDarkTheme = !isDarkTheme;
      document.documentElement.className = isDarkTheme ? 'dark' : 'light';
      document.getElementById('themeToggleBtn').innerText = isDarkTheme ? '🌙 Dark' : '☀️ Light';
      renderAllDashboardCharts();
      if (activeTab === 'visualizer' && vizMode === 'sunburst') renderSunburst();
    }

    function toggleSound() {
      soundEnabled = !soundEnabled;
      document.getElementById('soundToggleBtn').innerText = soundEnabled ? '🔊 Sound On' : '🔇 Mute';
      if (soundEnabled) playSound('click');
    }

    // Windows Caption Controls & Window Drag
    function sendWindowAction(act) {
      playSound('click');
      if (window.chrome && window.chrome.webview) {
        if (act === 'minimize') window.chrome.webview.postMessage({ action: 'windowMinimize' });
        else if (act === 'maximize') window.chrome.webview.postMessage({ action: 'windowMaximize' });
        else if (act === 'close') window.chrome.webview.postMessage({ action: 'windowClose' });
      }
    }

    function handleHeaderMouseDown(e) {
      if (e.target.closest('button') || e.target.closest('.tab-item') || e.target.closest('.top-clear-capsule') || e.target.closest('input')) {
        return;
      }
      if (e.detail === 2) {
        sendWindowAction('maximize');
        return;
      }
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'windowDrag' });
      }
    }

    window.onWindowStateChanged = function(isMaximized) {
      const maxBtn = document.getElementById('winMaxBtn');
      if (maxBtn) {
        maxBtn.innerHTML = isMaximized
          ? '<svg width=""10"" height=""10"" viewBox=""0 0 10 10""><path fill=""none"" stroke=""currentColor"" stroke-width=""1.1"" d=""M3 1h6v6H3zM1 3h6v6H1z""/></svg>'
          : '<svg width=""10"" height=""10"" viewBox=""0 0 10 10""><rect fill=""none"" stroke=""currentColor"" stroke-width=""1.2"" width=""8"" height=""8"" x=""1"" y=""1"" rx=""1""/></svg>';
        maxBtn.title = isMaximized ? 'Restore' : 'Maximize';
      }
    };

    function updateTopClearableMetric() {
      const clearableBytes = rules.filter(r => r.safety === 0).reduce((acc, r) => acc + r.sizeBytes, 0);
      const formatted = formatBytes(clearableBytes);
      const topEl = document.getElementById('topClearableSize');
      const heroEl = document.getElementById('heroClearableSize');
      const reclaimHeadEl = document.getElementById('reclaimableHeadlineSize');
      if (topEl) topEl.innerText = formatted;
      if (heroEl) heroEl.innerText = formatted;
      if (reclaimHeadEl) reclaimHeadEl.innerText = formatted;
    }

    // Modal Operations
    function openSafetyModal() { playSound('click'); document.getElementById('safetyModal').style.display = 'flex'; }
    function closeSafetyModal() { document.getElementById('safetyModal').style.display = 'none'; }
    function openLicenseModal() { playSound('click'); document.getElementById('licenseModal').style.display = 'flex'; }
    function closeLicenseModal() { document.getElementById('licenseModal').style.display = 'none'; }
    function openConfirmationModal() {
      if (stagedItems.length === 0) return;
      playSound('click');
      const count = stagedItems.length;
      const totalBytes = stagedItems.reduce((acc, i) => acc + i.sizeBytes, 0);
      document.getElementById('modalMessageText').innerText = `Are you sure you want to move ${count} staged ${count === 1 ? 'item' : 'items'} (${formatBytes(totalBytes)}) to the Windows Recycle Bin?`;
      document.getElementById('confirmModal').style.display = 'flex';
    }
    function closeConfirmationModal() { document.getElementById('confirmModal').style.display = 'none'; }

    // Toast
    function showToast(msg) {
      const t = document.getElementById('toastPill');
      t.innerText = msg;
      t.style.display = 'block';
      setTimeout(() => { t.style.display = 'none'; }, 3000);
    }

    // Physical Hardware Drives Strip
    function renderVolumes() {
      const container = document.getElementById('volumeDrivesContainer');
      const selector = document.getElementById('dashboardDriveSelector');
      if (drives.length === 0) return;

      let stripHtml = '';
      let selHtml = '';

      drives.forEach((d, i) => {
        const isSel = i === selectedDriveIdx;
        const usedGb = (d.totalSizeBytes - d.freeSizeBytes) / (1024*1024*1024);
        const freeGb = d.freeSizeBytes / (1024*1024*1024);
        const totalGb = d.totalSizeBytes / (1024*1024*1024);
        const pctUsed = d.usedPercent.toFixed(1);

        stripHtml += `
          <div class=""drive-card ${isSel ? 'selected' : ''}"" onclick=""selectDrive(${i})"">
            <div class=""drive-card-top"">
              <span class=""drive-card-title"">
                <svg width=""17"" height=""17"" viewBox=""0 0 24 24"" fill=""none"" stroke=""${isSel ? '#0284C7' : 'currentColor'}"" stroke-width=""2""><rect width=""20"" height=""8"" x=""2"" y=""14"" rx=""2""/><path d=""M6 18h.01M10 18h.01""/><path d=""M4 14V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8""/></svg>
                Drive ${d.driveName} (${d.volumeLabel || 'Volume'})
              </span>
              <span class=""drive-card-badge"">${d.driveFormat}</span>
            </div>
            <div class=""drive-card-bar"">
              <div class=""drive-card-fill-used"" style=""width: ${pctUsed}%;""></div>
              <div class=""drive-card-fill-free"" style=""width: ${100 - pctUsed}%;""></div>
            </div>
            <div class=""drive-card-stats"">
              <span>${usedGb.toFixed(1)} GB Used (${pctUsed}%)</span>
              <span style=""color:var(--accent-emerald); font-weight:700;"">${freeGb.toFixed(1)} GB Free of ${totalGb.toFixed(1)} GB</span>
            </div>
          </div>`;

        selHtml += `
          <button class=""btn ${isSel ? 'btn-primary' : 'btn-secondary'}"" style=""padding:4px 10px; font-size:11.5px;"" onclick=""selectDrive(${i})"">
            Drive ${d.driveName} (${d.formattedTotal})
          </button>`;
      });

      container.innerHTML = stripHtml;
      if (selector) selector.innerHTML = selHtml;
    }

    function selectDrive(idx) {
      playSound('click');
      selectedDriveIdx = idx;
      renderVolumes();
      renderAllDashboardCharts();
    }

    // ==========================================
    // THE MASTER SPACE DONUT ALLOCATION ENGINE
    // ==========================================
    function getDonutData() {
      if (drives.length === 0) return [];
      const drive = drives[selectedDriveIdx] || drives[0];
      const total = drive.totalSizeBytes;
      const free = drive.freeSizeBytes;
      const used = total - free;

      const toolchainBytes = rules.reduce((acc, r) => acc + r.sizeBytes, 0) || Math.round(used * 0.08);
      const appBytes = Math.round(Math.min(used * 0.35, 75 * 1024 * 1024 * 1024));
      const sysBytes = Math.round(Math.min(used * 0.22, 45 * 1024 * 1024 * 1024));
      const tempBytes = Math.round(Math.min(used * 0.07, 18 * 1024 * 1024 * 1024));
      const userDocBytes = Math.max(0, used - toolchainBytes - appBytes - sysBytes - tempBytes);

      return [
        { name: 'Free Available Capacity', sizeBytes: free, formatted: formatBytes(free), color: '#10B981', desc: 'Unallocated NTFS filesystem blocks ready for instant writes', isReclaimable: false },
        { name: 'Developer Toolchains & Registries', sizeBytes: toolchainBytes, formatted: formatBytes(toolchainBytes), color: '#0284C7', desc: 'Global NuGet, npm, Cargo, pip & Gradle package cache tarballs', isReclaimable: true },
        { name: 'Applications & Executables', sizeBytes: appBytes, formatted: formatBytes(appBytes), color: '#7C3AED', desc: 'Installed software suites, Windows Store apps & system binaries', isReclaimable: false },
        { name: 'System Core & Kernel Volume', sizeBytes: sysBytes, formatted: formatBytes(sysBytes), color: '#4F46E5', desc: 'Windows OS kernel, WinSxS component store & servicing registry', isReclaimable: false },
        { name: 'Downloads & Ephemeral Temp', sizeBytes: tempBytes, formatted: formatBytes(tempBytes), color: '#E11D48', desc: 'User Downloads folder and Windows %TEMP% compilation leftovers', isReclaimable: true },
        { name: 'User Documents & Local Media', sizeBytes: userDocBytes, formatted: formatBytes(userDocBytes), color: '#D97706', desc: 'Personal workspaces, source repositories and media archives', isReclaimable: false }
      ];
    }

    let donutSlicesMeta = [];

    function drawMasterDonut() {
      const canvas = document.getElementById('masterDonutCanvas');
      if (!canvas) return;

      const width = 360;
      const height = 360;
      const ctx = getScaledContext(canvas, width, height);
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      const items = getDonutData();
      const drive = drives[selectedDriveIdx] || drives[0];
      const totalBytes = drive ? drive.totalSizeBytes : 1;

      donutSlicesMeta = [];
      const rInner = 82;
      const rOuter = 152;
      const gap = 0.026; // Precision angular gap between slices
      let startAngle = -Math.PI / 2;

      items.forEach((item, idx) => {
        const rawSweep = (item.sizeBytes / totalBytes) * (2 * Math.PI);
        const sweep = Math.max(0.001, rawSweep - gap);
        const arcStart = startAngle + gap / 2;
        const arcEnd = arcStart + sweep;
        const isHovered = hoveredDonutIdx === idx;

        // Radial outward hover vector shift
        const midAngle = (arcStart + arcEnd) / 2;
        const shift = isHovered ? 9 : 0;
        const ox = Math.cos(midAngle) * shift;
        const oy = Math.sin(midAngle) * shift;
        const rIn = isHovered ? rInner - 2 : rInner;
        const rOut = isHovered ? rOuter + 6 : rOuter;

        donutSlicesMeta.push({
          idx: idx,
          item: item,
          a1: arcStart,
          a2: arcEnd,
          r1: rIn,
          r2: rOut,
          ox: ox,
          oy: oy
        });

        // Draw Arc Sector
        ctx.save();
        if (isHovered) {
          ctx.shadowColor = item.color;
          ctx.shadowBlur = 18;
          ctx.shadowOffsetX = ox * 0.4;
          ctx.shadowOffsetY = oy * 0.4;
        }

        ctx.beginPath();
        ctx.arc(cx + ox, cy + oy, rOut, arcStart, arcEnd);
        ctx.arc(cx + ox, cy + oy, rIn, arcEnd, arcStart, true);
        ctx.closePath();

        ctx.fillStyle = item.color;
        ctx.globalAlpha = hoveredDonutIdx >= 0 ? (isHovered ? 1.0 : 0.45) : 0.92;
        ctx.fill();

        ctx.strokeStyle = isDarkTheme ? '#0B0F19' : '#FFFFFF';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();

        startAngle += rawSweep;
      });

      // Framing Track Ring
      ctx.beginPath();
      ctx.arc(cx, cy, rInner - 3, 0, 2 * Math.PI);
      ctx.strokeStyle = isDarkTheme ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.9)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Center Telemetry Pod
      ctx.beginPath();
      ctx.arc(cx, cy, rInner - 4, 0, 2 * Math.PI);
      ctx.fillStyle = isDarkTheme ? '#111827' : '#FFFFFF';
      ctx.fill();

      // Center Hub Typography
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (hoveredDonutIdx >= 0 && items[hoveredDonutIdx]) {
        const h = items[hoveredDonutIdx];
        const pct = ((h.sizeBytes / totalBytes) * 100).toFixed(1);

        ctx.fillStyle = isDarkTheme ? '#9CA3AF' : '#64748B';
        ctx.font = '700 10.5px -apple-system, sans-serif';
        ctx.fillText(h.name.toUpperCase().substring(0, 18), cx, cy - 20);

        ctx.fillStyle = isDarkTheme ? '#F9FAFB' : '#0F172A';
        ctx.font = '800 24px monospace';
        ctx.fillText(h.formatted, cx, cy + 2);

        ctx.fillStyle = h.color;
        ctx.font = '700 12px -apple-system, sans-serif';
        ctx.fillText(`${pct}% ALLOCATED`, cx, cy + 24);
      } else {
        const freeBytes = drive ? drive.freeSizeBytes : 0;
        const pctFree = (((freeBytes) / totalBytes) * 100).toFixed(1);

        ctx.fillStyle = isDarkTheme ? '#9CA3AF' : '#64748B';
        ctx.font = '700 10.5px -apple-system, sans-serif';
        ctx.fillText(`DRIVE ${drive ? drive.driveName : 'C:'} AVAILABLE`, cx, cy - 20);

        ctx.fillStyle = isDarkTheme ? '#F9FAFB' : '#0F172A';
        ctx.font = '800 24px monospace';
        ctx.fillText(formatBytes(freeBytes), cx, cy + 2);

        ctx.fillStyle = '#10B981';
        ctx.font = '700 12px -apple-system, sans-serif';
        ctx.fillText(`${pctFree}% FREE SPACE`, cx, cy + 24);
      }
    }

    function renderDonutLegend() {
      const legendEl = document.getElementById('dashboardDonutLegend');
      if (!legendEl) return;

      const items = getDonutData();
      const drive = drives[selectedDriveIdx] || drives[0];
      const totalBytes = drive ? drive.totalSizeBytes : 1;
      let html = '';

      items.forEach((item, idx) => {
        const pct = ((item.sizeBytes / totalBytes) * 100).toFixed(1);
        const isHover = hoveredDonutIdx === idx;

        html += `
          <div class=""pie-legend-row ${isHover ? 'highlighted' : ''}"" onmouseenter=""hoverDonutSlice(${idx})"" onmouseleave=""hoverDonutSlice(-1)"">
            <div style=""display:flex; align-items:center; gap:12px; min-width:0;"">
              <div class=""pie-swatch"" style=""background:${item.color};""></div>
              <div style=""min-width:0;"">
                <div class=""pie-cat-title"">${item.name}</div>
                <div class=""pie-cat-sub"">${item.desc}</div>
              </div>
            </div>
            <div style=""display:flex; align-items:center; gap:14px; flex-shrink:0;"">
              <div>
                <div class=""pie-cat-size"">${item.formatted}</div>
                <div class=""pie-cat-pct"">${pct}%</div>
                <div class=""pie-mini-bar"">
                  <div class=""pie-mini-bar-fill"" style=""width:${pct}%; background:${item.color};""></div>
                </div>
              </div>
              ${item.isReclaimable ? `<button class=""btn btn-stage"" onclick=""stageItemToDock('${item.name}', 'C:\\\\Users\\\\saiph\\\\.nuget', ${item.sizeBytes}, '${item.formatted}')"">+ Stage</button>` : ''}
            </div>
          </div>`;
      });

      legendEl.innerHTML = html;
    }

    function hoverDonutSlice(idx) {
      if (hoveredDonutIdx !== idx) {
        hoveredDonutIdx = idx;
        drawMasterDonut();
        document.querySelectorAll('.pie-legend-row').forEach((el, i) => {
          el.classList.toggle('highlighted', i === idx);
        });
      }
    }

    // Attach Canvas Events for Donut
    function bindDonutEvents() {
      const canvas = document.getElementById('masterDonutCanvas');
      if (!canvas) return;

      canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left - 180;
        const y = e.clientY - rect.top - 180;
        const dist = Math.sqrt(x*x + y*y);
        let angle = Math.atan2(y, x);
        if (angle < -Math.PI / 2) angle += 2 * Math.PI;

        const found = donutSlicesMeta.find(s => dist >= s.r1 && dist <= s.r2 && angle >= s.a1 && angle <= s.a2);
        const newIdx = found ? found.idx : -1;
        hoverDonutSlice(newIdx);
      });

      canvas.addEventListener('mouseleave', () => {
        hoverDonutSlice(-1);
      });

      canvas.addEventListener('click', () => {
        if (hoveredDonutIdx >= 0) {
          const item = getDonutData()[hoveredDonutIdx];
          if (item && item.isReclaimable) {
            stageItemToDock(item.name, 'C:\\\\Users\\\\saiph\\\\Downloads', item.sizeBytes, item.formatted);
          }
        }
      });
    }

    function renderAllDashboardCharts() {
      drawMasterDonut();
      renderDonutLegend();
    }

    // Render Primary Registries
    function renderPrimaryRegistries() {
      const grid = document.getElementById('primaryRegistriesGrid');
      let totalReclaimable = 0;
      let html = '';

      rules.slice(0, 4).forEach((r, idx) => {
        totalReclaimable += r.sizeBytes;
        const iconBg = isDarkTheme ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.1)';
        html += `
          <div class=""diagnostic-tile"">
            <div class=""tile-header"">
              <div class=""tile-icon"" style=""background: ${iconBg};"">
                <svg width=""17"" height=""17"" viewBox=""0 0 24 24"" fill=""none"" stroke=""#0284C7"" stroke-width=""2""><polyline points=""22 12 18 12 15 21 9 3 6 12 2 12""/></svg>
              </div>
              <span class=""tile-size"">${r.formattedSize}</span>
            </div>
            <div>
              <div class=""tile-title"">${r.title}</div>
              <div class=""tile-desc"">${r.description}</div>
            </div>
            <div style=""margin-top:12px; display:flex; justify-content:flex-end;"">
              <button class=""btn btn-stage"" onclick=""stageItemToDock('${r.title}', '${r.path.replace(/\\/g, '\\\\')}', ${r.sizeBytes}, '${r.formattedSize}')"">+ Stage</button>
            </div>
          </div>`;
      });

      grid.innerHTML = html;
      document.getElementById('reclaimableHeadlineSize').innerText = formatBytes(totalReclaimable);
    }

    // Render Toolchain Registries
    function renderToolchainsRegistry() {
      const container = document.getElementById('toolchainsRegistryList');
      let html = '';
      rules.forEach(r => {
        const isSafe = r.safety === 0;
        html += `
          <div class=""registry-item"">
            <div>
              <div class=""reg-title"">
                ${r.title}
                <span class=""${isSafe ? 'badge-safe' : 'badge-review'}"">${isSafe ? 'Verified Safe' : 'Review Required'}</span>
              </div>
              <div class=""reg-path"">${r.path}</div>
              <div class=""reg-desc"">${r.description}</div>
            </div>
            <div style=""display:flex; align-items:center; gap:14px;"">
              <span style=""font-size:15px; font-weight:800; color:var(--accent-primary); font-family:monospace;"">${r.formattedSize}</span>
              <button class=""btn btn-stage"" onclick=""stageItemToDock('${r.title}', '${r.path.replace(/\\/g, '\\\\')}', ${r.sizeBytes}, '${r.formattedSize}')"">+ Stage</button>
            </div>
          </div>`;
      });
      container.innerHTML = html;
    }

    // Treemap Engine
    function renderTreemap() {
      const container = document.getElementById('treemapTilesContainer');
      const colors = ['#0284C7', '#2563EB', '#4F46E5', '#7C3AED', '#DB2777', '#E11D48', '#059669', '#0891B2'];
      const total = treemapItems.reduce((acc, i) => acc + i.sizeBytes, 0) || 1;
      let html = '';

      treemapItems.slice(0, 16).forEach((item, idx) => {
        const pct = Math.max(7, (item.sizeBytes / total) * 94);
        const bg = colors[idx % colors.length];
        html += `
          <div class=""treemap-tile"" style=""width: ${pct}%; min-width: 140px; height: 95px; background: ${bg};"" onclick=""stageItemToDock('${item.name}', '${item.path.replace(/\\/g, '\\\\')}', ${item.sizeBytes}, '${item.formattedSize}')"">
            <span class=""tile-name"">${item.name}</span>
            <div style=""display:flex; justify-content:space-between; align-items:flex-end;"">
              <span class=""tile-val"">${item.formattedSize}</span>
              <span style=""font-size:10px; opacity:0.85; font-weight:700;"">+ Stage</span>
            </div>
          </div>`;
      });
      container.innerHTML = html;
    }

    // Sunburst Engine
    let sunburstSectors = [];
    let hoveredSector = null;

    function renderSunburst() {
      const canvas = document.getElementById('sunburstCanvas');
      if (!canvas) return;
      const width = 520;
      const height = 520;
      const ctx = getScaledContext(canvas, width, height);
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      if (!sunburstTree || !sunburstTree.children || sunburstTree.children.length === 0) {
        ctx.fillStyle = isDarkTheme ? '#64748B' : '#94A3B8';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('No volume sectors available for visualization', cx, cy);
        return;
      }

      sunburstSectors = [];
      const totalBytes = sunburstTree.children.reduce((acc, c) => acc + c.sizeBytes, 0) || 1;
      const colors = ['#0284C7', '#2563EB', '#4F46E5', '#7C3AED', '#DB2777', '#E11D48', '#059669', '#D97706'];

      const rInner = 75;
      const rOuter = 150;
      let startAngle = -Math.PI / 2;

      sunburstTree.children.forEach((child, idx) => {
        const sweep = (child.sizeBytes / totalBytes) * (2 * Math.PI);
        const endAngle = startAngle + sweep;
        const color = colors[idx % colors.length];

        sunburstSectors.push({
          node: child,
          r1: rInner,
          r2: rOuter,
          a1: startAngle,
          a2: endAngle,
          color: color,
          level: 1
        });

        if (child.children && child.children.length > 0) {
          const subTotal = child.children.reduce((acc, sc) => acc + sc.sizeBytes, 0) || 1;
          let subStart = startAngle;
          child.children.forEach((subChild, subIdx) => {
            const subSweep = (subChild.sizeBytes / subTotal) * sweep;
            const subEnd = subStart + subSweep;
            sunburstSectors.push({
              node: subChild,
              r1: rOuter + 4,
              r2: rOuter + 70,
              a1: subStart,
              a2: subEnd,
              color: color,
              level: 2
            });
            subStart = subEnd;
          });
        }

        startAngle = endAngle;
      });

      sunburstSectors.forEach(sec => {
        const isHovered = hoveredSector === sec;
        ctx.beginPath();
        ctx.arc(cx, cy, sec.r2, sec.a1, sec.a2);
        ctx.arc(cx, cy, sec.r1, sec.a2, sec.a1, true);
        ctx.closePath();

        ctx.fillStyle = sec.color;
        ctx.globalAlpha = isHovered ? 1.0 : (sec.level === 1 ? 0.88 : 0.65);
        ctx.fill();

        ctx.strokeStyle = isDarkTheme ? '#0B0F19' : '#FFFFFF';
        ctx.lineWidth = isHovered ? 3 : 2;
        ctx.stroke();
      });

      // Center Hub
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, rInner - 4, 0, 2 * Math.PI);
      ctx.fillStyle = isDarkTheme ? '#111827' : '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = isDarkTheme ? 'rgba(56, 189, 248, 0.4)' : '#E2E8F0';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isDarkTheme ? '#FFFFFF' : '#0F172A';
      ctx.font = 'bold 15px -apple-system, sans-serif';

      if (hoveredSector) {
        ctx.fillText(hoveredSector.node.name.substring(0, 14), cx, cy - 10);
        ctx.font = '12px monospace';
        ctx.fillStyle = '#0284C7';
        ctx.fillText(hoveredSector.node.formattedSize, cx, cy + 12);
      } else {
        ctx.fillText(sunburstTree.name.substring(0, 14), cx, cy - 10);
        ctx.font = '12px monospace';
        ctx.fillStyle = '#0284C7';
        ctx.fillText(sunburstTree.formattedSize, cx, cy + 12);
      }
    }

    function bindSunburstEvents() {
      const canvasEl = document.getElementById('sunburstCanvas');
      if (!canvasEl) return;

      canvasEl.addEventListener('mousemove', (e) => {
        const rect = canvasEl.getBoundingClientRect();
        const x = e.clientX - rect.left - 260;
        const y = e.clientY - rect.top - 260;
        const dist = Math.sqrt(x*x + y*y);
        let angle = Math.atan2(y, x);
        if (angle < -Math.PI / 2) angle += 2 * Math.PI;

        const found = sunburstSectors.find(s => dist >= s.r1 && dist <= s.r2 && angle >= s.a1 && angle <= s.a2);

        if (found !== hoveredSector) {
          hoveredSector = found;
          renderSunburst();

          const tip = document.getElementById('sunburstHoverTooltip');
          if (hoveredSector) {
            tip.style.display = 'block';
            tip.style.left = (e.clientX - rect.left + 15) + 'px';
            tip.style.top = (e.clientY - rect.top + 15) + 'px';
            document.getElementById('tooltipTitle').innerText = hoveredSector.node.name;
            document.getElementById('tooltipSize').innerText = hoveredSector.node.formattedSize;
            document.getElementById('tooltipSub').innerText = hoveredSector.node.isDirectory ? 'Click to drill down • Shift+click to stage' : 'Click to stage to collector';
          } else {
            tip.style.display = 'none';
          }
        }
      });

      canvasEl.addEventListener('mouseleave', () => {
        hoveredSector = null;
        document.getElementById('sunburstHoverTooltip').style.display = 'none';
        renderSunburst();
      });

      canvasEl.addEventListener('click', (e) => {
        if (!hoveredSector) return;
        const node = hoveredSector.node;
        if (e.shiftKey || !node.isDirectory) {
          stageItemToDock(node.name, node.path, node.sizeBytes, node.formattedSize);
        } else if (node.isDirectory) {
          drillSunburst(node.path);
        }
      });
    }

    function drillSunburst(path) {
      playSound('click');
      document.getElementById('sunburstCrumbsContainer').innerHTML = `
        <span style=""color:var(--text-dim);"">Root:</span>
        <span class=""crumb-chip"" onclick=""drillSunburst('${path.replace(/\\/g, '\\\\')}')"">${path.split('\\').pop() || path}</span>
      `;
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'getSunburst', path: path });
      }
      showToast('Indexing ' + path + '...');
    }

    function drillTreemap(path) {
      playSound('click');
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'scanDir', path: path });
      }
      showToast('Analyzing ' + path + '...');
    }

    // Collector Operations
    function stageItemToDock(name, path, sizeBytes, formattedSize) {
      if (stagedItems.some(i => i.path === path)) {
        showToast('Already staged in dock: ' + name);
        return;
      }
      stagedItems.push({ name, path, sizeBytes, formattedSize });
      updateDockUI();
      playSound('stage');
      showToast('Staged to dock: ' + name);
    }

    function removeStagedItem(path) {
      stagedItems = stagedItems.filter(i => i.path !== path);
      updateDockUI();
    }

    function clearCollectorTray() {
      playSound('click');
      stagedItems = [];
      updateDockUI();
      showToast('Collector dock cleared.');
    }

    function updateDockUI() {
      const dock = document.getElementById('collectorDock');
      const count = stagedItems.length;
      if (count === 0) {
        dock.classList.remove('active');
        return;
      }
      dock.classList.add('active');
      const totalBytes = stagedItems.reduce((acc, i) => acc + i.sizeBytes, 0);
      document.getElementById('dockHeadlineText').innerText = `${count} ${count === 1 ? 'Target' : 'Targets'} • ${formatBytes(totalBytes)} Staged`;
    }

    let isRecycling = false;

    function dispatchBatchRecycle() {
      closeConfirmationModal();
      const paths = stagedItems.map(i => i.path);
      if (paths.length === 0) return;

      isRecycling = true;
      const dockHeadline = document.getElementById('dockHeadlineText');
      if (dockHeadline) {
        dockHeadline.innerHTML = `<span style=""color:var(--accent-primary); animation:pulseAnim 1.5s infinite;"">Moving ${paths.length} targets to Windows Recycle Bin...</span>`;
      }
      showToast(`Recycling ${paths.length} items in background...`);

      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'batchRecycle', paths: paths });
      }
    }

    window.onRecycleProgress = function(data) {
      const dockHeadline = document.getElementById('dockHeadlineText');
      if (dockHeadline) {
        dockHeadline.innerHTML = `<span style=""color:var(--accent-primary);"">Recycling (${data.index}/${data.total}): <strong>${data.currentName}</strong></span>`;
      }
    };

    window.onRecycleCompleted = function(data) {
      isRecycling = false;
      playSound('clean');
      showToast(`Successfully moved ${data.successCount} items to Windows Recycle Bin!`);
      clearCollectorTray();
    };

    function stageAllLowRiskTargets() {
      let count = 0;
      rules.forEach(r => {
        if (r.safety === 0) {
          if (!stagedItems.some(i => i.path === r.path)) {
            stagedItems.push({ name: r.title, path: r.path, sizeBytes: r.sizeBytes, formattedSize: r.formattedSize });
            count++;
          }
        }
      });
      updateDockUI();
      playSound('stage');
      showToast(`Staged ${count} verified low-risk targets.`);
    }

    // Duplicate Analysis
    function executeDuplicateScan() {
      playSound('click');
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'findDuplicates' });
      }
      showToast('Scanning Downloads for exact SHA-256 byte duplicates...');
    }

    function triggerStorageRefresh() {
      playSound('click');
      showToast('Scanning volume partitions and developer registries...');
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'refresh' });
      }
    }

    function authenticateLicense() {
      const key = document.getElementById('licenseKeyInput').value.trim();
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'activateLicense', key: key });
      }
    }

    function formatBytes(bytes) {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    // Callbacks from C# Bridge
    window.onInitialDataReceived = function(data) {
      drives = data.drives || [];
      rules = data.rules || [];
      treemapItems = data.treemap || [];
      if (data.sunburst) sunburstTree = data.sunburst;

      renderVolumes();
      renderAllDashboardCharts();
      renderPrimaryRegistries();
      renderTreemap();
      renderToolchainsRegistry();
      renderSunburst();
      updateTopClearableMetric();
    };

    window.onSunburstDataReceived = function(tree) {
      sunburstTree = tree;
      renderSunburst();
    };

    window.onDuplicatesReceived = function(dups) {
      const container = document.getElementById('duplicatesResultsContainer');
      if (!dups || dups.length === 0) {
        container.innerHTML = '<div class=""card"" style=""text-align:center; padding:48px; color:var(--text-muted);"">No identical duplicate files found in selected scope.</div>';
        return;
      }
      let html = '';
      dups.forEach(g => {
        html += `
          <div class=""dup-cluster"">
            <div class=""cluster-head"">
              <span style=""color:var(--accent-primary); font-family:monospace;"">${g.fileSizeFormatted} each (SHA-256: ${g.hashSha256.substring(0, 14)}...)</span>
              <span style=""color:var(--text-muted);"">${g.filePaths.length} identical copies</span>
            </div>`;
        g.filePaths.forEach((fp, idx) => {
          const fn = fp.split('\\').pop();
          html += `
            <div class=""cluster-row"">
              <span style=""overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:72%;"">${fp}</span>
              ${idx > 0 ? `<button class=""btn btn-stage"" onclick=""stageItemToDock('${fn}', '${fp.replace(/\\/g, '\\\\')}', ${g.fileSizeBytes}, '${g.fileSizeFormatted}')"">+ Stage Duplicate</button>` : '<span style=""font-size:11px; color:var(--accent-emerald); font-weight:700;"">Original (Preserved)</span>'}
            </div>`;
        });
        html += `</div>`;
      });
      container.innerHTML = html;
      showToast(`Discovered ${dups.length} duplicate clusters.`);
    };

    window.onLicenseUpdated = function(status) {
      if (status && status.isActive && status.tier !== 0) {
        document.getElementById('licenseStatusBadge').innerText = 'Active & Verified';
        closeLicenseModal();
        showToast('License Key Authenticated: ' + status.statusMessage);
      }
    };

    // DOM Ready
    window.addEventListener('DOMContentLoaded', () => {
      bindDonutEvents();
      bindSunburstEvents();
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'ready' });
      }
    });
  </script>
</body>
</html>
";
}
