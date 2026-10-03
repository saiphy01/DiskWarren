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
      --border: rgba(226, 232, 240, 0.9);
      --border-hover: rgba(2, 132, 199, 0.35);
      --text-main: #0F172A;
      --text-body: #334155;
      --text-muted: #64748B;
      --text-dim: #94A3B8;
      --accent-primary: #0284C7;
      --accent-primary-hover: #0369A1;
      --accent-emerald: #059669;
      --accent-amber: #D97706;
      --accent-rose: #E11D48;
      --accent-indigo: #4F46E5;
      --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.05);
      --shadow-md: 0 4px 12px -2px rgba(15, 23, 42, 0.06), 0 2px 4px -1px rgba(15, 23, 42, 0.03);
      --shadow-lg: 0 12px 28px -6px rgba(15, 23, 42, 0.08), 0 4px 8px -2px rgba(15, 23, 42, 0.03);
      --tray-bg: rgba(255, 255, 255, 0.94);
      --tray-border: rgba(2, 132, 199, 0.3);
    }

    html.dark {
      --bg: #07090E;
      --surface: rgba(15, 21, 36, 0.72);
      --surface-subtle: rgba(255, 255, 255, 0.03);
      --border: rgba(255, 255, 255, 0.08);
      --border-hover: rgba(56, 189, 248, 0.35);
      --text-main: #F8FAFC;
      --text-body: #CBD5E1;
      --text-muted: #8E9BAE;
      --text-dim: #546274;
      --accent-primary: #38BDF8;
      --accent-primary-hover: #0284C7;
      --accent-emerald: #10B981;
      --accent-amber: #F59E0B;
      --accent-rose: #F43F5E;
      --accent-indigo: #818CF8;
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
      --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3);
      --shadow-lg: 0 16px 36px rgba(0, 0, 0, 0.5);
      --tray-bg: rgba(15, 21, 37, 0.94);
      --tray-border: rgba(56, 189, 248, 0.4);
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

    /* Scrollbars */
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.35); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(2, 132, 199, 0.45); }

    /* Header Bar */
    .app-header {
      height: 62px;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      z-index: 100;
      box-shadow: var(--shadow-sm);
    }

    .brand-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-logo {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      background: linear-gradient(135deg, #0284C7 0%, #2563EB 50%, #4F46E5 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 3px 10px rgba(2, 132, 199, 0.3);
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
      border-radius: 5px;
      font-weight: 700;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      background: rgba(2, 132, 199, 0.08);
      color: var(--accent-primary);
      border: 1px solid rgba(2, 132, 199, 0.2);
    }

    .airgap-indicator {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 11px;
      font-weight: 600;
      color: var(--text-muted);
      background: var(--surface-subtle);
      padding: 5px 12px;
      border-radius: 20px;
      border: 1px solid var(--border);
    }

    .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--accent-emerald);
      box-shadow: 0 0 6px var(--accent-emerald);
      animation: pulseAnim 2s infinite;
    }
    @keyframes pulseAnim {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    /* Segmented Navigation Bar (Cupertino Light / Fluent Hybrid) */
    .tab-bar {
      display: flex;
      background: var(--surface-subtle);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 3px;
      gap: 2px;
    }

    .tab-item {
      padding: 6px 14px;
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
      gap: 6px;
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

    /* Viewport Area */
    .app-main {
      flex: 1;
      overflow-y: auto;
      padding: 24px 32px 100px 32px; /* space for collector tray */
      position: relative;
    }

    .view-header {
      margin-bottom: 22px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .view-title {
      font-size: 21px;
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

    /* Cards */
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 20px;
      box-shadow: var(--shadow-sm);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .card:hover {
      border-color: var(--border-hover);
      box-shadow: var(--shadow-md);
    }

    /* Action Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 9px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
      border: none;
      outline: none;
    }
    .btn-primary {
      background: var(--accent-primary);
      color: #FFFFFF;
      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
    }
    .btn-primary:hover {
      background: var(--accent-primary-hover);
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
      border: 1px solid rgba(2, 132, 199, 0.22);
      padding: 5px 12px;
      border-radius: 7px;
      font-size: 11.5px;
      font-weight: 700;
    }
    .btn-stage:hover {
      background: var(--accent-primary);
      color: #FFFFFF;
      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.3);
    }

    /* Diagnostics Overview */
    .drive-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 16px;
      margin-bottom: 22px;
    }
    .drive-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .drive-name {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .drive-format-tag {
      font-size: 11px;
      background: var(--surface-subtle);
      border: 1px solid var(--border);
      padding: 2px 7px;
      border-radius: 4px;
      color: var(--text-muted);
      font-weight: 600;
    }
    .drive-bar-bg {
      height: 7px;
      background: var(--surface-subtle);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 8px;
      border: 1px solid var(--border);
    }
    .drive-bar-fill {
      height: 100%;
      border-radius: 4px;
      background: linear-gradient(90deg, #0284C7 0%, #2563EB 100%);
      transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .drive-stats {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: var(--text-muted);
    }

    .overview-grid {
      display: grid;
      grid-template-columns: 350px 1fr;
      gap: 20px;
    }

    /* CleanMyMac Diagnostic Ring */
    .diagnostic-panel {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 28px 20px;
    }
    .radar-circle {
      width: 170px;
      height: 170px;
      border-radius: 50%;
      border: 1px dashed rgba(2, 132, 199, 0.35);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 18px;
    }
    .radar-circle::before {
      content: '';
      position: absolute;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 1px solid rgba(79, 70, 229, 0.2);
    }
    .radar-circle::after {
      content: '';
      position: absolute;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 1px solid rgba(5, 150, 105, 0.25);
    }
    .radar-sweep-hand {
      position: absolute;
      width: 85px;
      height: 85px;
      top: 0;
      right: 0;
      transform-origin: bottom left;
      background: conic-gradient(from 0deg, rgba(2, 132, 199, 0.3) 0deg, transparent 50deg);
      border-radius: 100% 0 0 0;
      animation: sweepAnim 3s linear infinite;
    }
    @keyframes sweepAnim {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .diagnostic-stat-box {
      position: absolute;
      z-index: 2;
      text-align: center;
    }
    .diagnostic-number {
      font-size: 26px;
      font-weight: 800;
      color: var(--text-main);
      letter-spacing: -0.6px;
    }
    .diagnostic-label {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--text-muted);
      letter-spacing: 0.5px;
    }

    .tiles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 14px;
    }
    .diagnostic-tile {
      background: var(--surface-subtle);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.18s;
    }
    .diagnostic-tile:hover {
      background: var(--surface);
      border-color: var(--border-hover);
      transform: translateY(-1px);
      box-shadow: var(--shadow-sm);
    }
    .tile-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 10px;
    }
    .tile-icon {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tile-size {
      font-size: 16.5px;
      font-weight: 800;
      font-family: monospace;
      color: var(--accent-primary);
    }
    .tile-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 2px;
    }
    .tile-desc {
      font-size: 11px;
      color: var(--text-muted);
      line-height: 1.4;
    }

    /* DAISYDISK SUNBURST VISUALIZER (LIGHT LUXURY) */
    .sunburst-box {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      min-height: 580px;
      box-shadow: var(--shadow-sm);
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
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-muted);
      font-family: monospace;
    }
    .crumb-chip {
      color: var(--accent-primary);
      background: rgba(2, 132, 199, 0.08);
      border: 1px solid rgba(2, 132, 199, 0.2);
      padding: 3px 8px;
      border-radius: 6px;
      cursor: pointer;
    }
    .crumb-chip:hover { background: rgba(2, 132, 199, 0.15); }

    #sunburstCanvas {
      cursor: pointer;
    }

    .sunburst-tooltip {
      position: absolute;
      pointer-events: none;
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 10px 14px;
      border-radius: 10px;
      box-shadow: var(--shadow-lg);
      display: none;
      z-index: 10;
    }
    .tip-title { font-size: 13px; font-weight: 700; color: var(--text-main); }
    .tip-size { font-size: 12px; font-weight: 700; color: var(--accent-primary); font-family: monospace; margin-top: 2px; }
    .tip-sub { font-size: 11px; color: var(--text-muted); margin-top: 2px; }

    /* Treemap Explorer */
    .treemap-wrapper {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 16px;
      min-height: 480px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: var(--shadow-sm);
    }
    .treemap-tiles {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      height: 420px;
      width: 100%;
      align-content: flex-start;
      border-radius: 10px;
      overflow: hidden;
    }
    .treemap-tile {
      border-radius: 8px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #FFFFFF;
      cursor: pointer;
      transition: transform 0.15s ease, filter 0.15s ease;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .treemap-tile:hover {
      filter: brightness(1.15);
      transform: scale(1.015);
      z-index: 2;
      box-shadow: var(--shadow-md);
    }
    .tile-name { font-size: 12px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .tile-val { font-size: 11px; opacity: 0.95; font-family: monospace; font-weight: 600; }

    /* Toolchain & Developer Registry Rules */
    .registry-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      margin-bottom: 10px;
      box-shadow: var(--shadow-sm);
      transition: all 0.18s;
    }
    .registry-item:hover {
      border-color: var(--border-hover);
      box-shadow: var(--shadow-md);
    }
    .reg-title {
      font-size: 14.5px;
      font-weight: 700;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .reg-path {
      font-size: 11.5px;
      font-family: monospace;
      color: var(--text-muted);
      margin-top: 2px;
    }
    .reg-desc {
      font-size: 12px;
      color: var(--text-body);
      margin-top: 4px;
      line-height: 1.4;
    }
    .badge-safe { background: rgba(5, 150, 105, 0.08); color: var(--accent-emerald); border: 1px solid rgba(5, 150, 105, 0.25); font-size: 10px; padding: 2px 7px; border-radius: 4px; font-weight: 700; }
    .badge-review { background: rgba(217, 119, 6, 0.08); color: var(--accent-amber); border: 1px solid rgba(217, 119, 6, 0.25); font-size: 10px; padding: 2px 7px; border-radius: 4px; font-weight: 700; }

    /* Duplicate Clusters */
    .dup-cluster {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
      box-shadow: var(--shadow-sm);
    }
    .cluster-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      font-weight: 700;
      border-bottom: 1px solid var(--border);
      padding-bottom: 8px;
      margin-bottom: 8px;
    }
    .cluster-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      font-size: 12px;
      font-family: monospace;
      color: var(--text-body);
    }

    /* THE DAISYDISK FLOATING COLLECTOR TRAY */
    .collector-dock {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(120px);
      width: 92%;
      max-width: 1100px;
      background: var(--tray-bg);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--tray-border);
      box-shadow: 0 16px 36px -8px rgba(15, 23, 42, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.05);
      border-radius: 18px;
      padding: 12px 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 1000;
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
      opacity: 0;
      pointer-events: none;
    }
    .collector-dock.active {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
      pointer-events: auto;
    }
    .dock-meta {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .dock-badge {
      background: var(--accent-primary);
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 20px;
      letter-spacing: 0.3px;
    }
    .dock-headline {
      font-size: 15px;
      font-weight: 800;
      color: var(--text-main);
      letter-spacing: -0.3px;
    }
    .dock-scroll {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      max-width: 480px;
      padding: 2px;
    }
    .dock-chip {
      background: var(--surface-subtle);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 4px 10px;
      font-size: 11.5px;
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }
    .chip-del {
      color: var(--text-muted);
      cursor: pointer;
      font-weight: 800;
      font-size: 13px;
    }
    .chip-del:hover { color: var(--accent-rose); }

    /* Modal Backdrop */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.5);
      backdrop-filter: blur(8px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }
    .modal-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      width: 90%;
      max-width: 480px;
      padding: 24px;
      box-shadow: var(--shadow-lg);
    }

    /* Toast Notification */
    .toast-box {
      position: fixed;
      top: 75px;
      right: 28px;
      background: var(--surface);
      border: 1px solid var(--accent-primary);
      color: var(--text-main);
      padding: 10px 18px;
      border-radius: 30px;
      font-size: 12.5px;
      font-weight: 600;
      box-shadow: var(--shadow-lg);
      display: none;
      z-index: 3000;
    }
  </style>
</head>
<body>

  <!-- Top Header Navigation -->
  <header class=""app-header"">
    <div class=""brand-group"">
      <div class=""brand-logo"">
        <svg width=""18"" height=""18"" viewBox=""0 0 24 24"" fill=""none"" stroke=""#FFFFFF"" stroke-width=""2.5"" stroke-linecap=""round"" stroke-linejoin=""round"">
          <circle cx=""12"" cy=""12"" r=""10""/><path d=""m4.93 4.93 4.24 4.24""/><path d=""m14.83 9.17 4.24-4.24""/><path d=""m14.83 14.83 4.24 4.24""/><path d=""m9.17 14.83-4.24 4.24""/><circle cx=""12"" cy=""12"" r=""4""/>
        </svg>
      </div>
      <div>
        <div style=""display:flex; align-items:center; gap:8px;"">
          <span class=""brand-name"">DiskWarren</span>
          <span class=""badge-enterprise"">Professional Edition</span>
        </div>
      </div>
    </div>

    <!-- Cupertino / Fluent Segmented Tabs -->
    <nav class=""tab-bar"">
      <button class=""tab-item active"" onclick=""switchTab('diagnostics')"">
        <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><path d=""M12 2v20M2 12h20""/><circle cx=""12"" cy=""12"" r=""10""/></svg>
        Storage Diagnostics
      </button>
      <button class=""tab-item"" onclick=""switchTab('sunburst')"">
        <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><circle cx=""12"" cy=""12"" r=""10""/><circle cx=""12"" cy=""12"" r=""4""/><path d=""m4.93 4.93 4.24 4.24""/></svg>
        Radial Sunburst
      </button>
      <button class=""tab-item"" onclick=""switchTab('treemap')"">
        <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><rect width=""18"" height=""18"" x=""3"" y=""3"" rx=""2""/><path d=""M3 9h18M9 21V9""/></svg>
        Treemap
      </button>
      <button class=""tab-item"" onclick=""switchTab('toolchains')"">
        <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><polyline points=""16 18 22 12 16 6""/><polyline points=""8 6 2 12 8 18""/></svg>
        Toolchain Artifacts
      </button>
      <button class=""tab-item"" onclick=""switchTab('duplicates')"">
        <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><rect width=""14"" height=""14"" x=""8"" y=""8"" rx=""2""/><path d=""M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2""/></svg>
        Byte Duplicates
      </button>
      <button class=""tab-item"" onclick=""switchTab('safety')"">
        <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><path d=""M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z""/></svg>
        Safety Architecture
      </button>
      <button class=""tab-item"" onclick=""switchTab('license')"">
        <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><circle cx=""12"" cy=""12"" r=""10""/><path d=""m9 12 2 2 4-4""/></svg>
        Licensing
      </button>
    </nav>

    <!-- Controls: Theme Toggle & Airgap -->
    <div style=""display:flex; align-items:center; gap:10px;"">
      <button class=""btn btn-secondary"" style=""padding:5px 11px; font-size:11.5px;"" onclick=""toggleTheme()"" id=""themeToggleBtn"">
        ☀️ Light
      </button>
      <button class=""btn btn-secondary"" style=""padding:5px 11px; font-size:11.5px;"" onclick=""toggleSound()"" id=""soundToggleBtn"">
        🔊 Audio On
      </button>
      <div class=""airgap-indicator"">
        <div class=""pulse-dot""></div>
        <span>Air-Gapped Engine</span>
      </div>
    </div>
  </header>

  <!-- Viewports Content -->
  <main class=""app-main"">

    <!-- 1. STORAGE DIAGNOSTICS & VOLUME ALLOCATION -->
    <section id=""view-diagnostics"">
      <div class=""view-header"">
        <div>
          <h1 class=""view-title"">System Volume Allocation &amp; Storage Health</h1>
          <p class=""view-subtitle"">Deterministic filesystem analysis of partition structures, cluster allocations, and disposable toolchain registries.</p>
        </div>
        <button class=""btn btn-primary"" onclick=""triggerStorageRefresh()"">
          <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2.5""><polyline points=""23 4 23 10 17 10""/><polyline points=""1 20 1 14 7 14""/><path d=""M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15""/></svg>
          Run Diagnostic Scan
        </button>
      </div>

      <!-- NTFS Volume Partitions -->
      <div class=""drive-grid"" id=""volumeDrivesContainer"">
        <!-- Live from C# -->
      </div>

      <!-- CleanMyMac Diagnostic Ring & Primary Reclaim Targets -->
      <div class=""overview-grid"">
        <div class=""card diagnostic-panel"">
          <div class=""radar-circle"">
            <div class=""radar-sweep-hand""></div>
            <div class=""diagnostic-stat-box"">
              <div class=""diagnostic-number"" id=""reclaimableHeadlineSize"">10.4 GB</div>
              <div class=""diagnostic-label"">Reclaimable</div>
            </div>
          </div>
          <p style=""font-size:12px; color:var(--text-muted); margin-bottom:14px; max-width:240px;"">
            Safely disposable package archives and compiler caches ready for collector staging.
          </p>
          <button class=""btn btn-primary"" style=""width:100%;"" onclick=""stageAllLowRiskTargets()"">
            Stage All Verified Safe Targets
          </button>
        </div>

        <div class=""card"">
          <h3 style=""font-size:15px; font-weight:700; color:var(--text-main); margin-bottom:14px;"">Primary Storage Reclaim Registries</h3>
          <div class=""tiles-grid"" id=""primaryRegistriesGrid"">
            <!-- Dynamic -->
          </div>
        </div>
      </div>
    </section>

    <!-- 2. DAISYDISK RADIAL SUNBURST MAP -->
    <section id=""view-sunburst"" style=""display:none;"">
      <div class=""view-header"">
        <div>
          <h1 class=""view-title"">Hierarchical Radial Sunburst Visualizer</h1>
          <p class=""view-subtitle"">Concentric multi-ring disk layout. Click any sector to drill into subdirectories; hover to inspect exact allocation.</p>
        </div>
        <div style=""display:flex; gap:8px;"">
          <button class=""btn btn-secondary"" onclick=""drillSunburst('C:\\Users\\saiph\\Downloads')"">Downloads</button>
          <button class=""btn btn-secondary"" onclick=""drillSunburst('C:\\Users\\saiph')"">User Profile</button>
        </div>
      </div>

      <div class=""sunburst-box"">
        <div class=""sunburst-toolbar"">
          <div class=""sunburst-crumbs"" id=""sunburstCrumbsContainer"">
            <span style=""color:var(--text-dim);"">Root:</span>
            <span class=""crumb-chip"" onclick=""drillSunburst('C:\\Users\\saiph\\Downloads')"">Downloads</span>
          </div>
          <div style=""font-size:12px; color:var(--text-muted);"">
            Double-click or click sector to zoom in • Shift+click to stage
          </div>
        </div>

        <canvas id=""sunburstCanvas"" width=""520"" height=""520""></canvas>

        <div class=""sunburst-tooltip"" id=""sunburstHoverTooltip"">
          <div class=""tip-title"" id=""tooltipTitle"">Directory</div>
          <div class=""tip-size"" id=""tooltipSize"">0 MB</div>
          <div class=""tip-sub"" id=""tooltipSub"">Click to drill down • Shift+click to stage</div>
        </div>
      </div>
    </section>

    <!-- 3. TREEMAP VIEW -->
    <section id=""view-treemap"" style=""display:none;"">
      <div class=""view-header"">
        <div>
          <h1 class=""view-title"">Proportional Squarified Treemap</h1>
          <p class=""view-subtitle"">Capacity blocks scaled to filesystem cluster consumption. Click any block to add to collector tray.</p>
        </div>
        <div style=""display:flex; gap:8px;"">
          <button class=""btn btn-secondary"" onclick=""drillTreemap('C:\\Users\\saiph\\Downloads')"">Downloads</button>
          <button class=""btn btn-secondary"" onclick=""drillTreemap('C:\\Users\\saiph')"">User Profile</button>
        </div>
      </div>

      <div class=""treemap-wrapper"">
        <div class=""treemap-tiles"" id=""treemapTilesContainer"">
          <!-- Dynamic -->
        </div>
      </div>
    </section>

    <!-- 4. TOOLCHAIN ARTIFACTS & DEVELOPER REGISTRIES -->
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

    <!-- 5. CRYPTOGRAPHIC BYTE DUPLICATES -->
    <section id=""view-duplicates"" style=""display:none;"">
      <div class=""view-header"">
        <div>
          <h1 class=""view-title"">Two-Phase SHA-256 Duplicate Analysis</h1>
          <p class=""view-subtitle"">Deterministic byte-for-byte verification. Phase 1 groups matching lengths; Phase 2 computes full SHA-256 cryptographic signatures.</p>
        </div>
        <button class=""btn btn-primary"" onclick=""executeDuplicateScan()"">
          <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2.5""><circle cx=""11"" cy=""11"" r=""8""/><line x1=""21"" y1=""21"" x2=""16.65"" y2=""16.65""/></svg>
          Scan Downloads for Duplicates
        </button>
      </div>

      <div id=""duplicatesResultsContainer"">
        <div class=""card"" style=""text-align:center; padding:48px; color:var(--text-muted);"">
          Click 'Scan Downloads for Duplicates' to discover identical file copies.
        </div>
      </div>
    </section>

    <!-- 6. SAFETY ARCHITECTURE & REVERSIBILITY -->
    <section id=""view-safety"" style=""display:none;"">
      <div class=""view-header"">
        <div>
          <h1 class=""view-title"">Safety by Design &amp; Win32 Reversibility</h1>
          <p class=""view-subtitle"">Enterprise safeguard protocols preventing destructive accidental deletion.</p>
        </div>
      </div>

      <div class=""card"" style=""margin-bottom:16px;"">
        <h3 style=""font-size:15px; font-weight:700; color:var(--accent-emerald); margin-bottom:6px;"">✓ 1. Native Win32 Recycle Bin Reversibility</h3>
        <p style=""font-size:13.5px; color:var(--text-body); line-height:1.6;"">
          DiskWarren dispatches all deletion operations exclusively through the official Windows Shell API (<code style=""color:var(--accent-primary);"">SHFileOperation</code>) with the <code style=""color:var(--accent-primary);"">FOF_ALLOWUNDO</code> flag. Cleaned files reside in your desktop Recycle Bin and can be restored immediately at any time.
        </p>
      </div>

      <div class=""card"" style=""margin-bottom:16px;"">
        <h3 style=""font-size:15px; font-weight:700; color:var(--accent-primary); margin-bottom:6px;"">✓ 2. Kernel-Enforced System Directory Immunity</h3>
        <p style=""font-size:13.5px; color:var(--text-body); line-height:1.6;"">
          Critical Windows infrastructure (<code style=""color:var(--accent-primary);"">C:\Windows</code>, <code style=""color:var(--accent-primary);"">System32</code>, <code style=""color:var(--accent-primary);"">Program Files</code>, EFI boot partitions, and registry hives) are hardcoded as immutable and protected from modification or indexing by the safety barrier.
        </p>
      </div>

      <div class=""card"">
        <h3 style=""font-size:15px; font-weight:700; color:var(--accent-amber); margin-bottom:6px;"">✓ 3. Explicit Collector Staging Verification</h3>
        <p style=""font-size:13.5px; color:var(--text-body); line-height:1.6;"">
          No automated background tasks or silent purges occur. Candidate files must be explicitly placed into the <strong>Collector Tray</strong>, reviewed by the user, and confirmed before execution.
        </p>
      </div>
    </section>

    <!-- 7. LICENSING & CRYPTOGRAPHIC VERIFICATION -->
    <section id=""view-license"" style=""display:none;"">
      <div class=""view-header"">
        <div>
          <h1 class=""view-title"">Cryptographic License &amp; Enterprise Activation</h1>
          <p class=""view-subtitle"">Offline signature verification for secure, air-gapped environments. Perpetual lifetime ownership.</p>
        </div>
      </div>

      <div class=""card"" style=""margin-bottom:20px; border-color:rgba(2, 132, 199, 0.4);"">
        <div style=""display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;"">
          <div>
            <span style=""font-size:11px; text-transform:uppercase; font-weight:700; color:var(--accent-primary);"">License Authentication Status</span>
            <h2 id=""licenseTierHeader"" style=""font-size:22px; font-weight:800; color:var(--text-main);"">Pro Lifetime (Single PC)</h2>
          </div>
          <span id=""licenseStatusBadge"" style=""background:rgba(5, 150, 105, 0.1); color:var(--accent-emerald); border:1px solid rgba(5, 150, 105, 0.3); padding:5px 12px; border-radius:20px; font-size:12px; font-weight:700;"">Active &amp; Verified</span>
        </div>

        <div style=""display:flex; gap:10px;"">
          <input type=""text"" id=""licenseKeyInput"" style=""flex:1; background:var(--surface-subtle); border:1px solid var(--border); border-radius:9px; padding:10px 14px; color:var(--text-main); font-family:monospace; font-size:13px;"" value=""DW1-WIN-PRO-LIFETIME-3151DBDA"" />
          <button class=""btn btn-primary"" onclick=""authenticateLicense()"">Verify Cryptographic Key</button>
        </div>
      </div>
    </section>

  </main>

  <!-- THE DAISYDISK FLOATING COLLECTOR TRAY (STAGING DOCK) -->
  <div class=""collector-dock"" id=""collectorDock"">
    <div class=""dock-meta"">
      <span class=""dock-badge"">COLLECTOR TRAY</span>
      <div>
        <div class=""dock-headline"" id=""dockHeadlineText"">0 Items • 0 MB Staged</div>
        <div style=""font-size:11px; color:var(--text-muted);"">Reversible Win32 Recycle Bin Execution</div>
      </div>
    </div>

    <div class=""dock-scroll"" id=""dockScrollContainer"">
      <!-- Staged Chips -->
    </div>

    <div style=""display:flex; align-items:center; gap:10px;"">
      <button class=""btn btn-secondary"" style=""padding:7px 12px; font-size:12px;"" onclick=""clearCollectorTray()"">
        Clear
      </button>
      <button class=""btn btn-primary"" style=""background:#059669; box-shadow:0 2px 10px rgba(5,150,105,0.3);"" onclick=""openConfirmationModal()"">
        <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2.5""><polyline points=""3 6 5 6 21 6""/><path d=""M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2""/></svg>
        Recycle Staged Items
      </button>
    </div>
  </div>

  <!-- Reversible Deletion Modal -->
  <div class=""modal-overlay"" id=""confirmModal"">
    <div class=""modal-card"">
      <h3 style=""font-size:17px; font-weight:800; color:var(--text-main); margin-bottom:8px;"">Confirm Safe Recycling</h3>
      <p style=""font-size:13.5px; color:var(--text-muted); line-height:1.5; margin-bottom:18px;"" id=""modalMessageText"">
        The selected items will be safely moved to your Windows Recycle Bin. You can restore them at any time.
      </p>
      <div style=""display:flex; justify-content:flex-end; gap:10px;"">
        <button class=""btn btn-secondary"" onclick=""closeConfirmationModal()"">Cancel</button>
        <button class=""btn btn-primary"" style=""background:#059669;"" onclick=""dispatchBatchRecycle()"">
          Move to Recycle Bin
        </button>
      </div>
    </div>
  </div>

  <!-- Toast Box -->
  <div class=""toast-box"" id=""toastPill"">Notification</div>

  <script>
    // State
    let drives = [];
    let rules = [];
    let treemapItems = [];
    let sunburstTree = null;
    let stagedItems = []; // { name, path, sizeBytes, formattedSize }
    let soundEnabled = true;
    let isDarkTheme = false;
    let audioCtx = null;

    // Theme Switcher
    function toggleTheme() {
      isDarkTheme = !isDarkTheme;
      document.documentElement.className = isDarkTheme ? 'dark' : 'light';
      document.getElementById('themeToggleBtn').innerText = isDarkTheme ? '🌙 Dark' : '☀️ Light';
      renderSunburst();
    }

    // Procedural Audio Synthesizer
    function playChime(type) {
      if (!soundEnabled) return;
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const now = audioCtx.currentTime;
        if (type === 'stage') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(580, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.start(now);
          osc.stop(now + 0.09);
        } else if (type === 'clean') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(523.25, now);
          osc.frequency.setValueAtTime(659.25, now + 0.08);
          osc.frequency.setValueAtTime(783.99, now + 0.16);
          osc.frequency.setValueAtTime(1046.50, now + 0.24);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
          osc.start(now);
          osc.stop(now + 0.55);
        }
      } catch (e) {}
    }

    function toggleSound() {
      soundEnabled = !soundEnabled;
      document.getElementById('soundToggleBtn').innerText = soundEnabled ? '🔊 Audio On' : '🔇 Audio Off';
    }

    function switchTab(viewId) {
      document.querySelectorAll('.tab-bar .tab-item').forEach(b => b.classList.remove('active'));
      event.currentTarget.classList.add('active');
      document.querySelectorAll('.app-main > section').forEach(s => s.style.display = 'none');
      document.getElementById('view-' + viewId).style.display = 'block';

      if (viewId === 'sunburst') {
        setTimeout(renderSunburst, 50);
      }
    }

    function showToast(msg) {
      const t = document.getElementById('toastPill');
      t.innerText = msg;
      t.style.display = 'block';
      setTimeout(() => { t.style.display = 'none'; }, 3000);
    }

    // Collector Operations
    function stageItemToDock(name, path, sizeBytes, formattedSize) {
      if (stagedItems.some(i => i.path === path)) {
        showToast('Already in Collector Tray: ' + name);
        return;
      }
      stagedItems.push({ name, path, sizeBytes, formattedSize });
      updateDockUI();
      playChime('stage');
      showToast('Staged to Collector Tray: ' + name);
    }

    function removeStagedItem(path) {
      stagedItems = stagedItems.filter(i => i.path !== path);
      updateDockUI();
    }

    function clearCollectorTray() {
      stagedItems = [];
      updateDockUI();
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
      document.getElementById('dockHeadlineText').innerText = `${count} ${count === 1 ? 'Item' : 'Items'} • ${formatBytes(totalBytes)} Staged`;

      let chips = '';
      stagedItems.forEach(i => {
        chips += `
          <div class=""dock-chip"">
            <span>${i.name}</span>
            <strong style=""color:var(--accent-primary);"">${i.formattedSize}</strong>
            <span class=""chip-del"" onclick=""removeStagedItem('${i.path.replace(/\\/g, '\\\\')}')"">&times;</span>
          </div>`;
      });
      document.getElementById('dockScrollContainer').innerHTML = chips;
    }

    function openConfirmationModal() {
      if (stagedItems.length === 0) return;
      const count = stagedItems.length;
      const totalBytes = stagedItems.reduce((acc, i) => acc + i.sizeBytes, 0);
      document.getElementById('modalMessageText').innerText = `Are you sure you want to move ${count} staged ${count === 1 ? 'item' : 'items'} (${formatBytes(totalBytes)}) to the Windows Recycle Bin?`;
      document.getElementById('confirmModal').style.display = 'flex';
    }

    function closeConfirmationModal() {
      document.getElementById('confirmModal').style.display = 'none';
    }

    function dispatchBatchRecycle() {
      closeConfirmationModal();
      const paths = stagedItems.map(i => i.path);
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'batchRecycle', paths: paths });
      }
      playChime('clean');
      showToast(`Cleaned ${stagedItems.length} items to Windows Recycle Bin!`);
      clearCollectorTray();
    }

    function stageAllLowRiskTargets() {
      let count = 0;
      rules.forEach(r => {
        if (r.safety === 0) { // LowRisk
          if (!stagedItems.some(i => i.path === r.path)) {
            stagedItems.push({ name: r.title, path: r.path, sizeBytes: r.sizeBytes, formattedSize: r.formattedSize });
            count++;
          }
        }
      });
      updateDockUI();
      playChime('stage');
      showToast(`Staged ${count} verified low-risk targets to Collector Tray.`);
    }

    // Callbacks from C# Bridge
    window.onInitialDataReceived = function(data) {
      drives = data.drives || [];
      rules = data.rules || [];
      treemapItems = data.treemap || [];
      if (data.sunburst) sunburstTree = data.sunburst;

      renderVolumes();
      renderPrimaryRegistries();
      renderTreemap();
      renderToolchainsRegistry();
      renderSunburst();
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
              <span style=""color:var(--accent-primary);"">${g.fileSizeFormatted} each (SHA-256: ${g.hashSha256.substring(0, 12)}...)</span>
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
        const tierName = status.tier === 1 ? 'Pro Lifetime (Single PC)' : 'PowerPack Lifetime (Family)';
        document.getElementById('licenseTierHeader').innerText = tierName;
        document.getElementById('licenseStatusBadge').innerText = 'Active & Verified';
        showToast('License Key Authenticated: ' + status.statusMessage);
      }
    };

    // Render NTFS Volume Partitions
    function renderVolumes() {
      const container = document.getElementById('volumeDrivesContainer');
      if (drives.length === 0) return;
      let html = '';
      drives.forEach(d => {
        const usedGb = (d.totalSizeBytes - d.freeSizeBytes) / (1024*1024*1024);
        const totalGb = d.totalSizeBytes / (1024*1024*1024);
        const pct = d.usedPercent.toFixed(1);
        html += `
          <div class=""card"">
            <div class=""drive-header"">
              <span class=""drive-name"">
                <svg width=""16"" height=""16"" viewBox=""0 0 24 24"" fill=""none"" stroke=""#0284C7"" stroke-width=""2""><rect width=""20"" height=""8"" x=""2"" y=""14"" rx=""2""/><path d=""M6 18h.01M10 18h.01""/><path d=""M4 14V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8""/></svg>
                Drive ${d.driveName} [${d.volumeLabel || 'Local Volume'}]
              </span>
              <span class=""drive-format-tag"">${d.driveFormat}</span>
            </div>
            <div class=""drive-bar-bg"">
              <div class=""drive-bar-fill"" style=""width: ${pct}%;""></div>
            </div>
            <div class=""drive-stats"">
              <span>Used: ${usedGb.toFixed(1)} GB (${pct}%)</span>
              <span>Free: ${d.formattedFree} of ${totalGb.toFixed(1)} GB</span>
            </div>
          </div>`;
      });
      container.innerHTML = html;
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

    // Render Treemap
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

    // ==========================================
    // DAISYDISK SUNBURST ENGINE (LIGHT/DARK SOPHISTICATED)
    // ==========================================
    let sunburstSectors = [];
    let hoveredSector = null;

    function renderSunburst() {
      const canvas = document.getElementById('sunburstCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
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

      // Ring 1 (Inner Ring)
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

        // Ring 2 (Outer Sub-Ring)
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

      // Draw All Sectors
      sunburstSectors.forEach(sec => {
        const isHovered = hoveredSector === sec;
        ctx.beginPath();
        ctx.arc(cx, cy, sec.r2, sec.a1, sec.a2);
        ctx.arc(cx, cy, sec.r1, sec.a2, sec.a1, true);
        ctx.closePath();

        ctx.fillStyle = sec.color;
        ctx.globalAlpha = isHovered ? 1.0 : (sec.level === 1 ? 0.88 : 0.65);
        ctx.fill();

        ctx.strokeStyle = isDarkTheme ? '#07090E' : '#FFFFFF';
        ctx.lineWidth = isHovered ? 3 : 2;
        ctx.stroke();
      });

      // Center Hub
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, rInner - 4, 0, 2 * Math.PI);
      ctx.fillStyle = isDarkTheme ? '#0F172A' : '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = isDarkTheme ? 'rgba(56, 189, 248, 0.4)' : '#E2E8F0';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Center Hub Text
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

    // Canvas Events
    const canvasEl = document.getElementById('sunburstCanvas');
    canvasEl.addEventListener('mousemove', (e) => {
      const rect = canvasEl.getBoundingClientRect();
      const x = e.clientX - rect.left - canvasEl.width / 2;
      const y = e.clientY - rect.top - canvasEl.height / 2;
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

    function drillSunburst(path) {
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
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'scanDir', path: path });
      }
      showToast('Analyzing ' + path + '...');
    }

    function executeDuplicateScan() {
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'findDuplicates' });
      }
      showToast('Scanning Downloads for exact SHA-256 byte duplicates...');
    }

    function triggerStorageRefresh() {
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

    window.addEventListener('DOMContentLoaded', () => {
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'ready' });
      }
    });
  </script>
</body>
</html>";
}
