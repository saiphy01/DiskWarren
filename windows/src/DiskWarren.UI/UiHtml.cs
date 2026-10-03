namespace DiskWarren.UI;

public static class UiHtml
{
    public const string Content = @"<!DOCTYPE html>
<html lang=""en"" class=""dark"">
<head>
  <meta charset=""UTF-8"">
  <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
  <title>DiskWarren — Storage Intelligence &amp; Safe Cleanup</title>
  <style>
    :root {
      --bg: #07090E;
      --card-bg: rgba(15, 21, 36, 0.72);
      --card-border: rgba(255, 255, 255, 0.08);
      --card-border-hover: rgba(56, 189, 248, 0.35);
      --accent-cyan: #00F2FE;
      --accent-blue: #4FACFE;
      --accent-emerald: #10B981;
      --accent-violet: #8B5CF6;
      --accent-pink: #EC4899;
      --accent-amber: #F59E0B;
      --text-main: #F8FAFC;
      --text-muted: #8E9BAE;
      --text-dim: #546274;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Inter, system-ui, sans-serif; }
    
    body {
      background: var(--bg);
      background-image: 
        radial-gradient(ellipse 90% 60% at 50% -25%, rgba(0, 242, 254, 0.12), transparent 70%),
        radial-gradient(ellipse 70% 50% at 100% 100%, rgba(139, 92, 246, 0.08), transparent 60%),
        radial-gradient(ellipse 60% 40% at 0% 100%, rgba(16, 185, 129, 0.06), transparent 50%);
      color: var(--text-main);
      overflow-x: hidden;
      height: 100vh;
      display: flex;
      flex-direction: column;
      user-select: none;
    }

    /* Custom Luxury Scrollbar */
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.12); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(56, 189, 248, 0.3); }

    /* Header Chrome */
    .app-header {
      height: 60px;
      background: rgba(10, 14, 24, 0.85);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-bottom: 1px solid var(--card-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      z-index: 100;
    }

    .brand-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-logo {
      width: 32px;
      height: 32px;
      border-radius: 10px;
      background: linear-gradient(135deg, #00F2FE 0%, #4FACFE 50%, #8B5CF6 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 20px rgba(0, 242, 254, 0.4);
      animation: logoPulse 4s ease-in-out infinite;
    }
    @keyframes logoPulse {
      0%, 100% { box-shadow: 0 0 16px rgba(0, 242, 254, 0.35); }
      50% { box-shadow: 0 0 26px rgba(139, 92, 246, 0.5); }
    }

    .brand-name {
      font-size: 17px;
      font-weight: 800;
      letter-spacing: -0.6px;
      background: linear-gradient(180deg, #FFFFFF 0%, #CBD5E1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .badge-pro {
      font-size: 10px;
      padding: 2px 7px;
      border-radius: 5px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      background: rgba(56, 189, 248, 0.12);
      color: #38BDF8;
      border: 1px solid rgba(56, 189, 248, 0.25);
    }

    .airgap-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 600;
      color: #94A3B8;
      background: rgba(255, 255, 255, 0.04);
      padding: 4px 10px;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 8px #10B981;
      animation: pulseAnim 2s infinite;
    }
    @keyframes pulseAnim {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    /* Segmented Tab Navigation */
    .tab-bar {
      display: flex;
      background: rgba(13, 18, 30, 0.85);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 4px;
      gap: 2px;
    }

    .tab-item {
      padding: 7px 15px;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-muted);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      gap: 7px;
      position: relative;
    }
    .tab-item:hover {
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.04);
    }
    .tab-item.active {
      color: #F8FAFC;
      background: linear-gradient(180deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.25);
    }

    /* Layout Body */
    .app-main {
      flex: 1;
      overflow-y: auto;
      padding: 24px 28px 100px 28px; /* bottom padding accounts for collector tray */
      position: relative;
    }

    /* Typography & Titles */
    .view-header {
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .view-title {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.6px;
      color: #FFFFFF;
      margin-bottom: 4px;
    }
    .view-subtitle {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    /* Glass Cards */
    .glass-card {
      background: var(--card-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      transition: border-color 0.2s ease, transform 0.2s ease;
    }
    .glass-card:hover {
      border-color: var(--card-border-hover);
    }

    /* Primary & Danger Action Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 9px 16px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      border: none;
      outline: none;
    }
    .btn-glow {
      background: linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%);
      color: #07090E;
      box-shadow: 0 2px 14px rgba(0, 242, 254, 0.35);
    }
    .btn-glow:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 20px rgba(0, 242, 254, 0.55);
    }
    .btn-glow:active { transform: translateY(0); scale: 0.98; }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      color: #F8FAFC;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .btn-danger-pill {
      background: rgba(239, 68, 68, 0.12);
      color: #F87171;
      border: 1px solid rgba(239, 68, 68, 0.25);
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 11.5px;
    }
    .btn-danger-pill:hover {
      background: #EF4444;
      color: white;
      box-shadow: 0 0 12px rgba(239, 68, 68, 0.4);
    }

    .btn-stage {
      background: rgba(56, 189, 248, 0.1);
      color: #38BDF8;
      border: 1px solid rgba(56, 189, 248, 0.2);
      padding: 5px 12px;
      border-radius: 8px;
      font-size: 11.5px;
      font-weight: 700;
    }
    .btn-stage:hover {
      background: #38BDF8;
      color: #07090E;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
    }

    /* Radar Overview View */
    .overview-grid {
      display: grid;
      grid-template-columns: 360px 1fr;
      gap: 20px;
      margin-bottom: 24px;
    }

    .radar-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 30px 20px;
      position: relative;
      overflow: hidden;
    }

    .radar-ring {
      width: 190px;
      height: 190px;
      border-radius: 50%;
      border: 1px dashed rgba(56, 189, 248, 0.3);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    .radar-ring::before {
      content: '';
      position: absolute;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 1px solid rgba(139, 92, 246, 0.25);
    }
    .radar-ring::after {
      content: '';
      position: absolute;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 1px solid rgba(16, 185, 129, 0.35);
    }

    .radar-beam {
      position: absolute;
      width: 95px;
      height: 95px;
      top: 0;
      right: 0;
      transform-origin: bottom left;
      background: conic-gradient(from 0deg, rgba(0, 242, 254, 0.4) 0deg, transparent 60deg);
      border-radius: 100% 0 0 0;
      animation: rotateRadar 3s linear infinite;
    }
    @keyframes rotateRadar {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .radar-center-stat {
      position: absolute;
      z-index: 2;
      text-align: center;
    }
    .radar-stat-number {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #FFFFFF;
      text-shadow: 0 0 16px rgba(0, 242, 254, 0.6);
    }
    .radar-stat-label {
      font-size: 11px;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 700;
    }

    .quick-tiles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }
    .quick-tile {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 14px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.2s;
    }
    .quick-tile:hover {
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(56, 189, 248, 0.3);
      transform: translateY(-2px);
    }
    .quick-tile-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }
    .quick-tile-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .quick-tile-size {
      font-size: 18px;
      font-weight: 800;
      color: #FFFFFF;
      font-family: monospace;
    }
    .quick-tile-name {
      font-size: 13px;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 2px;
    }
    .quick-tile-desc {
      font-size: 11px;
      color: var(--text-dim);
    }

    /* Drive Gauge Cards */
    .drive-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .drive-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .drive-title {
      font-size: 15px;
      font-weight: 700;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .drive-bar-bg {
      height: 8px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    .drive-bar-fill {
      height: 100%;
      border-radius: 4px;
      background: linear-gradient(90deg, #00F2FE 0%, #4FACFE 100%);
      transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .drive-stats-row {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: var(--text-muted);
    }

    /* Sunburst Visualizer Canvas */
    .sunburst-container {
      background: rgba(12, 16, 28, 0.85);
      border: 1px solid var(--card-border);
      border-radius: 20px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      min-height: 580px;
    }
    .sunburst-toolbar {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .sunburst-breadcrumbs {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-muted);
      font-family: monospace;
    }
    .crumb-btn {
      color: #38BDF8;
      background: rgba(56, 189, 248, 0.08);
      border: 1px solid rgba(56, 189, 248, 0.2);
      padding: 3px 8px;
      border-radius: 6px;
      cursor: pointer;
    }
    .crumb-btn:hover { background: rgba(56, 189, 248, 0.2); }

    #sunburstCanvas {
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .sunburst-tooltip {
      position: absolute;
      pointer-events: none;
      background: rgba(15, 23, 42, 0.92);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(56, 189, 248, 0.4);
      padding: 10px 14px;
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
      display: none;
      z-index: 10;
    }
    .tooltip-name { font-size: 13px; font-weight: 700; color: #FFFFFF; }
    .tooltip-size { font-size: 12px; font-weight: 700; color: #38BDF8; font-family: monospace; margin-top: 2px; }
    .tooltip-meta { font-size: 11px; color: var(--text-muted); margin-top: 2px; }

    /* Treemap Visualizer */
    .treemap-box {
      background: rgba(10, 14, 25, 0.9);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 16px;
      min-height: 480px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .treemap-grid {
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
      color: white;
      cursor: pointer;
      transition: transform 0.15s ease, filter 0.15s ease;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
    }
    .treemap-tile:hover {
      filter: brightness(1.25);
      transform: scale(1.015);
      z-index: 2;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
      border-color: #38BDF8;
    }
    .treemap-tile-name { font-size: 12px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .treemap-tile-size { font-size: 11px; opacity: 0.9; font-family: monospace; font-weight: 600; }

    /* Developer Rules & Caches */
    .rule-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid var(--card-border);
      border-radius: 14px;
      margin-bottom: 10px;
      transition: all 0.2s;
    }
    .rule-card:hover {
      border-color: rgba(56, 189, 248, 0.3);
      background: rgba(20, 29, 50, 0.7);
    }
    .rule-title-text {
      font-size: 14.5px;
      font-weight: 700;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .rule-path-text {
      font-size: 11.5px;
      font-family: monospace;
      color: var(--text-dim);
      margin-top: 2px;
    }
    .rule-badge {
      font-size: 10px;
      padding: 2px 7px;
      border-radius: 4px;
      font-weight: 700;
      text-transform: uppercase;
    }
    .badge-safe { background: rgba(16, 185, 129, 0.15); color: #34D399; border: 1px solid rgba(16, 185, 129, 0.3); }
    .badge-review { background: rgba(245, 158, 11, 0.15); color: #FBBF24; border: 1px solid rgba(245, 158, 11, 0.3); }

    /* Duplicates List */
    .dup-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid var(--card-border);
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 14px;
    }
    .dup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      font-weight: 700;
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 8px;
      margin-bottom: 8px;
    }
    .dup-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      font-size: 12px;
      font-family: monospace;
      color: var(--text-muted);
    }

    /* THE DAISYDISK SIGNATURE: FLOATING COLLECTOR TRAY */
    .collector-tray {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      width: 92%;
      max-width: 1100px;
      background: rgba(15, 21, 37, 0.94);
      backdrop-filter: blur(28px);
      -webkit-backdrop-filter: blur(28px);
      border: 1px solid rgba(0, 242, 254, 0.4);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 242, 254, 0.15);
      border-radius: 18px;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 1000;
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
      opacity: 0;
      pointer-events: none;
    }
    .collector-tray.visible {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
      pointer-events: auto;
    }
    .collector-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .collector-badge {
      background: linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%);
      color: #07090E;
      font-size: 11.5px;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 20px;
      letter-spacing: 0.3px;
    }
    .collector-stat {
      font-size: 15px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.3px;
    }
    .collector-items-scroll {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      max-width: 480px;
      padding: 2px;
    }
    .collector-chip {
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 4px 10px;
      font-size: 11px;
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }
    .chip-remove {
      color: var(--text-dim);
      cursor: pointer;
      font-weight: 800;
      font-size: 13px;
    }
    .chip-remove:hover { color: #EF4444; }

    /* Modal */
    .modal-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(10px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }
    .modal-box {
      background: #0E1424;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 18px;
      width: 90%;
      max-width: 480px;
      padding: 24px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
    }

    /* Toast */
    .toast-pill {
      position: fixed;
      top: 75px;
      right: 28px;
      background: rgba(16, 24, 40, 0.95);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: #FFFFFF;
      padding: 10px 18px;
      border-radius: 30px;
      font-size: 12.5px;
      font-weight: 600;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      display: none;
      z-index: 3000;
      animation: fadeIn 0.2s ease;
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
  </style>
</head>
<body>

  <!-- Top Chrome Header -->
  <header class=""app-header"">
    <div class=""brand-group"">
      <div class=""brand-logo"">
        <svg width=""18"" height=""18"" viewBox=""0 0 24 24"" fill=""none"" stroke=""#07090E"" stroke-width=""2.5"" stroke-linecap=""round"" stroke-linejoin=""round"">
          <circle cx=""12"" cy=""12"" r=""10""/><path d=""m4.93 4.93 4.24 4.24""/><path d=""m14.83 9.17 4.24-4.24""/><path d=""m14.83 14.83 4.24 4.24""/><path d=""m9.17 14.83-4.24 4.24""/><circle cx=""12"" cy=""12"" r=""4""/>
        </svg>
      </div>
      <div>
        <div style=""display:flex; align-items:center; gap:8px;"">
          <span class=""brand-name"">DiskWarren</span>
          <span class=""badge-pro"">Pro Edition</span>
        </div>
      </div>
    </div>

    <!-- Segmented Navigation Bar -->
    <nav class=""tab-bar"">
      <button class=""tab-item active"" onclick=""switchTab('radar')"">
        <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><path d=""M12 2v20M2 12h20""/><circle cx=""12"" cy=""12"" r=""10""/></svg>
        Smart Radar
      </button>
      <button class=""tab-item"" onclick=""switchTab('sunburst')"">
        <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><circle cx=""12"" cy=""12"" r=""10""/><circle cx=""12"" cy=""12"" r=""4""/><path d=""m4.93 4.93 4.24 4.24""/></svg>
        Sunburst Map
      </button>
      <button class=""tab-item"" onclick=""switchTab('treemap')"">
        <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><rect width=""18"" height=""18"" x=""3"" y=""3"" rx=""2""/><path d=""M3 9h18M9 21V9""/></svg>
        Treemap
      </button>
      <button class=""tab-item"" onclick=""switchTab('cleaners')"">
        <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><polyline points=""16 18 22 12 16 6""/><polyline points=""8 6 2 12 8 18""/></svg>
        Toolchains
      </button>
      <button class=""tab-item"" onclick=""switchTab('duplicates')"">
        <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><rect width=""14"" height=""14"" x=""8"" y=""8"" rx=""2""/><path d=""M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2""/></svg>
        Duplicates
      </button>
      <button class=""tab-item"" onclick=""switchTab('safety')"">
        <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><path d=""M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z""/></svg>
        Safety Gate
      </button>
      <button class=""tab-item"" onclick=""switchTab('license')"">
        <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2""><circle cx=""12"" cy=""12"" r=""10""/><path d=""m9 12 2 2 4-4""/></svg>
        License
      </button>
    </nav>

    <!-- Airgap Badge & Sound -->
    <div style=""display:flex; align-items:center; gap:12px;"">
      <button class=""btn btn-secondary"" style=""padding:5px 10px; font-size:11.5px; border-radius:8px;"" onclick=""toggleSound()"" id=""soundBtn"">
        🔊 Sound On
      </button>
      <div class=""airgap-pill"">
        <div class=""pulse-dot""></div>
        <span>Air-Gapped Indexing</span>
      </div>
    </div>
  </header>

  <!-- Main Viewports -->
  <main class=""app-main"">

    <!-- 1. SMART RADAR OVERVIEW VIEW -->
    <section id=""view-radar"">
      <div class=""view-header"">
        <div>
          <h1 class=""view-title"">Storage Intelligence Radar</h1>
          <p class=""view-subtitle"">Instant system-wide analysis of developer artifacts, duplicate files, and disposable caches.</p>
        </div>
        <button class=""btn btn-glow"" onclick=""triggerSmartScan()"">
          <svg width=""15"" height=""15"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2.5""><polyline points=""23 4 23 10 17 10""/><polyline points=""1 20 1 14 7 14""/><path d=""M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15""/></svg>
          Run Smart Radar Scan
        </button>
      </div>

      <!-- Live NTFS Partitions -->
      <div class=""drive-grid"" id=""driveGridContainer"">
        <!-- Rendered from C# -->
      </div>

      <!-- Radar & Quick Target Grid -->
      <div class=""overview-grid"">
        <div class=""glass-card radar-card"">
          <div class=""radar-ring"">
            <div class=""radar-beam""></div>
            <div class=""radar-center-stat"">
              <div class=""radar-stat-number"" id=""radarReclaimableText"">10.4 GB</div>
              <div class=""radar-stat-label"">Reclaimable</div>
            </div>
          </div>
          <button class=""btn btn-glow"" style=""width:100%;"" onclick=""stageAllLowRisk()"">
            Stage All Low Risk to Collector
          </button>
        </div>

        <div class=""glass-card"">
          <h3 style=""font-size:15px; font-weight:700; color:#FFFFFF; margin-bottom:14px;"">Primary Reclamation Targets</h3>
          <div class=""quick-tiles-grid"" id=""quickTargetsGrid"">
            <!-- Dynamic -->
          </div>
        </div>
      </div>
    </section>

    <!-- 2. DAISYDISK SIGNATURE SUNBURST MAP -->
    <section id=""view-sunburst"" style=""display:none;"">
      <div class=""view-header"">
        <div>
          <h1 class=""view-title"">Interactive Sunburst Visualizer</h1>
          <p class=""view-subtitle"">Concentric multi-ring radial map. Click any sector to dive into that folder; hover to reveal footprint.</p>
        </div>
        <div style=""display:flex; gap:10px;"">
          <button class=""btn btn-secondary"" onclick=""navigateSunburst('C:\\Users\\saiph\\Downloads')"">Downloads</button>
          <button class=""btn btn-secondary"" onclick=""navigateSunburst('C:\\Users\\saiph')"">User Profile</button>
        </div>
      </div>

      <div class=""sunburst-container"">
        <div class=""sunburst-toolbar"">
          <div class=""sunburst-breadcrumbs"" id=""sunburstCrumbs"">
            <span style=""color:var(--text-dim);"">Location:</span>
            <span class=""crumb-btn"" onclick=""navigateSunburst('C:\\Users\\saiph\\Downloads')"">Downloads</span>
          </div>
          <div style=""font-size:12px; color:var(--text-muted);"" id=""sunburstStats"">
            Showing top storage consumers
          </div>
        </div>

        <canvas id=""sunburstCanvas"" width=""520"" height=""520""></canvas>

        <div class=""sunburst-tooltip"" id=""sunburstTooltip"">
          <div class=""tooltip-name"" id=""tipName"">Folder</div>
          <div class=""tooltip-size"" id=""tipSize"">0 MB</div>
          <div class=""tooltip-meta"" id=""tipMeta"">Click to drill down</div>
        </div>
      </div>
    </section>

    <!-- 3. TREEMAP VIEW -->
    <section id=""view-treemap"" style=""display:none;"">
      <div class=""view-header"">
        <div>
          <h1 class=""view-title"">Squarified Treemap Blocks</h1>
          <p class=""view-subtitle"">Volume-proportioned rectangular tiles. Click any tile to inspect or stage to collector.</p>
        </div>
        <div style=""display:flex; gap:8px;"">
          <button class=""btn btn-secondary"" onclick=""refreshTreemap('C:\\Users\\saiph\\Downloads')"">Downloads</button>
          <button class=""btn btn-secondary"" onclick=""refreshTreemap('C:\\Users\\saiph')"">User Profile</button>
        </div>
      </div>

      <div class=""treemap-box"">
        <div class=""treemap-grid"" id=""treemapTilesGrid"">
          <!-- Rendered dynamically -->
        </div>
      </div>
    </section>

    <!-- 4. DEVELOPER & TOOLCHAIN CLEANERS -->
    <section id=""view-cleaners"" style=""display:none;"">
      <div class=""view-header"">
        <div>
          <h1 class=""view-title"">Developer Toolchain &amp; AI Cache Cleaner</h1>
          <p class=""view-subtitle"">Reclaim gigabytes from NuGet packages, npm global tarballs, Gradle caches, Cargo crates, and temp build artifacts.</p>
        </div>
        <button class=""btn btn-glow"" onclick=""stageAllLowRisk()"">
          Stage All Low Risk
        </button>
      </div>

      <div id=""toolchainsList"">
        <!-- Dynamic Rules -->
      </div>
    </section>

    <!-- 5. DUPLICATE FINDER -->
    <section id=""view-duplicates"" style=""display:none;"">
      <div class=""view-header"">
        <div>
          <h1 class=""view-title"">Two-Phase SHA-256 Duplicate Finder</h1>
          <p class=""view-subtitle"">Cryptographic byte-for-byte exact matches. Preserves original copy while staging duplicates.</p>
        </div>
        <button class=""btn btn-glow"" onclick=""scanForDuplicates()"">
          <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2.5""><circle cx=""11"" cy=""11"" r=""8""/><line x1=""21"" y1=""21"" x2=""16.65"" y2=""16.65""/></svg>
          Scan Downloads for Duplicates
        </button>
      </div>

      <div id=""duplicatesListContainer"">
        <div class=""glass-card"" style=""text-align:center; padding:40px; color:var(--text-muted);"">
          Click 'Scan Downloads for Duplicates' to discover identical files.
        </div>
      </div>
    </section>

    <!-- 6. SAFETY GATE -->
    <section id=""view-safety"" style=""display:none;"">
      <div class=""view-header"">
        <div>
          <h1 class=""view-title"">Safety by Design Architecture</h1>
          <p class=""view-subtitle"">Engineered to make data loss impossible on Windows 10 &amp; 11.</p>
        </div>
      </div>

      <div class=""glass-card"" style=""margin-bottom:16px;"">
        <h3 style=""font-size:16px; font-weight:700; color:#34D399; margin-bottom:8px;"">✓ 1. Win32 Recycle Bin Reversibility</h3>
        <p style=""font-size:13.5px; color:var(--text-muted); line-height:1.6;"">
          DiskWarren never performs raw permanent unlinks by default. All file deletions route through the native Windows Shell API (<code style=""color:#38BDF8;"">SHFileOperation</code>) with <code style=""color:#38BDF8;"">FOF_ALLOWUNDO</code>. Any cleaned item can be restored from your desktop Recycle Bin at any time with 1 click.
        </p>
      </div>

      <div class=""glass-card"" style=""margin-bottom:16px;"">
        <h3 style=""font-size:16px; font-weight:700; color:#38BDF8; margin-bottom:8px;"">✓ 2. Kernel &amp; System Path Immunity</h3>
        <p style=""font-size:13.5px; color:var(--text-muted); line-height:1.6;"">
          Critical system paths (<code style=""color:#38BDF8;"">C:\Windows</code>, <code style=""color:#38BDF8;"">System32</code>, <code style=""color:#38BDF8;"">Program Files</code>, EFI partitions, and Boot configuration data) are strictly read-only and immutably blocked by the kernel safety gate.
        </p>
      </div>

      <div class=""glass-card"">
        <h3 style=""font-size:16px; font-weight:700; color:#F59E0B; margin-bottom:8px;"">✓ 3. Explicit Human Review Staging</h3>
        <p style=""font-size:13.5px; color:var(--text-muted); line-height:1.6;"">
          Items must first be placed into the DaisyDisk-style <strong>Collector Tray</strong> for inspection. Nothing is ever purged automatically in the background.
        </p>
      </div>
    </section>

    <!-- 7. LICENSE & PRO ACTIVATION -->
    <section id=""view-license"" style=""display:none;"">
      <div class=""view-header"">
        <div>
          <h1 class=""view-title"">License &amp; Perpetual Activation</h1>
          <p class=""view-subtitle"">Offline cryptographic SHA-256 signature verification. No subscription, no internet required.</p>
        </div>
      </div>

      <div class=""glass-card"" style=""margin-bottom:20px; border-color:rgba(56, 189, 248, 0.35);"">
        <div style=""display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;"">
          <div>
            <span style=""font-size:11px; text-transform:uppercase; font-weight:700; color:#38BDF8;"">License Tier</span>
            <h2 id=""activeTierHeading"" style=""font-size:22px; font-weight:800; color:#FFFFFF;"">Pro Lifetime (Single PC)</h2>
          </div>
          <span id=""licenseActiveBadge"" style=""background:rgba(16,185,129,0.2); color:#34D399; border:1px solid #10B981; padding:5px 12px; border-radius:20px; font-size:12px; font-weight:700;"">Active &amp; Verified</span>
        </div>

        <div style=""display:flex; gap:10px;"">
          <input type=""text"" id=""keyInput"" style=""flex:1; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.15); border-radius:10px; padding:10px 14px; color:#FFFFFF; font-family:monospace; font-size:13px;"" value=""DW1-WIN-PRO-LIFETIME-3151DBDA"" />
          <button class=""btn btn-glow"" onclick=""activateLicenseKey()"">Verify &amp; Activate</button>
        </div>
      </div>
    </section>

  </main>

  <!-- THE DAISYDISK FLOATING COLLECTOR TRAY (STAGING CART) -->
  <div class=""collector-tray"" id=""collectorTray"">
    <div class=""collector-info"">
      <span class=""collector-badge"">COLLECTOR TRAY</span>
      <div>
        <div class=""collector-stat"" id=""collectorStatText"">0 Items • 0 MB Staged</div>
        <div style=""font-size:11px; color:var(--text-dim);"">Safe Win32 Recycle Bin Deletion</div>
      </div>
    </div>

    <div class=""collector-items-scroll"" id=""collectorItemsScroll"">
      <!-- Chips -->
    </div>

    <div style=""display:flex; align-items:center; gap:10px;"">
      <button class=""btn btn-secondary"" style=""padding:7px 12px; font-size:12px;"" onclick=""clearCollector()"">
        Clear
      </button>
      <button class=""btn btn-glow"" style=""background:linear-gradient(135deg, #10B981 0%, #059669 100%); color:white; box-shadow:0 0 16px rgba(16,185,129,0.4);"" onclick=""confirmRecycle()"">
        <svg width=""14"" height=""14"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2.5""><polyline points=""3 6 5 6 21 6""/><path d=""M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2""/></svg>
        Recycle Staged
      </button>
    </div>
  </div>

  <!-- Confirmation Modal -->
  <div class=""modal-backdrop"" id=""recycleModal"">
    <div class=""modal-box"">
      <h3 style=""font-size:17px; font-weight:800; color:#FFFFFF; margin-bottom:8px;"">Confirm Safe Recycling</h3>
      <p style=""font-size:13px; color:var(--text-muted); line-height:1.5; margin-bottom:16px;"" id=""modalMessage"">
        The selected items will be safely moved to your Windows Recycle Bin. You can restore them at any time.
      </p>
      <div style=""display:flex; justify-content:flex-end; gap:10px;"">
        <button class=""btn btn-secondary"" onclick=""closeModal()"">Cancel</button>
        <button class=""btn btn-glow"" style=""background:#10B981; color:white;"" onclick=""executeBatchRecycle()"">
          Move to Recycle Bin
        </button>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div class=""toast-pill"" id=""appToast"">Notification</div>

  <script>
    // State
    let drives = [];
    let rules = [];
    let treemapItems = [];
    let sunburstTree = null;
    let stagedItems = []; // { name, path, sizeBytes, formattedSize }
    let soundEnabled = true;
    let audioCtx = null;

    // Procedural Web Audio Sound Synthesizer
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
          // Subtle high-tech tick
          osc.type = 'sine';
          osc.frequency.setValueAtTime(580, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.start(now);
          osc.stop(now + 0.09);
        } else if (type === 'clean') {
          // Lush completion chord
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(523.25, now); // C5
          osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
          osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
          osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
          osc.start(now);
          osc.stop(now + 0.55);
        }
      } catch (e) {}
    }

    function toggleSound() {
      soundEnabled = !soundEnabled;
      document.getElementById('soundBtn').innerText = soundEnabled ? '🔊 Sound On' : '🔇 Sound Off';
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
      const t = document.getElementById('appToast');
      t.innerText = msg;
      t.style.display = 'block';
      setTimeout(() => { t.style.display = 'none'; }, 3000);
    }

    // Collector Operations
    function stageItem(name, path, sizeBytes, formattedSize) {
      if (stagedItems.some(i => i.path === path)) {
        showToast('Already in Collector Tray: ' + name);
        return;
      }
      stagedItems.push({ name, path, sizeBytes, formattedSize });
      updateCollectorUI();
      playChime('stage');
      showToast('Staged to Collector: ' + name);
    }

    function unstageItem(path) {
      stagedItems = stagedItems.filter(i => i.path !== path);
      updateCollectorUI();
    }

    function clearCollector() {
      stagedItems = [];
      updateCollectorUI();
    }

    function updateCollectorUI() {
      const tray = document.getElementById('collectorTray');
      const count = stagedItems.length;
      if (count === 0) {
        tray.classList.remove('visible');
        return;
      }
      tray.classList.add('visible');

      const totalBytes = stagedItems.reduce((acc, i) => acc + i.sizeBytes, 0);
      const formattedTotal = formatBytes(totalBytes);
      document.getElementById('collectorStatText').innerText = `${count} ${count === 1 ? 'Item' : 'Items'} • ${formattedTotal} Staged`;

      let chipsHtml = '';
      stagedItems.forEach(i => {
        chipsHtml += `
          <div class=""collector-chip"">
            <span>${i.name}</span>
            <strong style=""color:#38BDF8;"">${i.formattedSize}</strong>
            <span class=""chip-remove"" onclick=""unstageItem('${i.path.replace(/\\/g, '\\\\')}')"">&times;</span>
          </div>`;
      });
      document.getElementById('collectorItemsScroll').innerHTML = chipsHtml;
    }

    function confirmRecycle() {
      if (stagedItems.length === 0) return;
      const count = stagedItems.length;
      const totalBytes = stagedItems.reduce((acc, i) => acc + i.sizeBytes, 0);
      document.getElementById('modalMessage').innerText = `Are you sure you want to move ${count} staged ${count === 1 ? 'item' : 'items'} (${formatBytes(totalBytes)}) to the Windows Recycle Bin?`;
      document.getElementById('recycleModal').style.display = 'flex';
    }

    function closeModal() {
      document.getElementById('recycleModal').style.display = 'none';
    }

    function executeBatchRecycle() {
      closeModal();
      const paths = stagedItems.map(i => i.path);
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'batchRecycle', paths: paths });
      }
      playChime('clean');
      showToast(`Cleaned ${stagedItems.length} items to Windows Recycle Bin!`);
      clearCollector();
    }

    function stageAllLowRisk() {
      let count = 0;
      rules.forEach(r => {
        if (r.safety === 0) { // LowRisk
          if (!stagedItems.some(i => i.path === r.path)) {
            stagedItems.push({ name: r.title, path: r.path, sizeBytes: r.sizeBytes, formattedSize: r.formattedSize });
            count++;
          }
        }
      });
      updateCollectorUI();
      playChime('stage');
      showToast(`Staged ${count} low-risk targets to Collector Tray!`);
    }

    // Callbacks from C# Bridge
    window.onInitialDataReceived = function(data) {
      drives = data.drives || [];
      rules = data.rules || [];
      treemapItems = data.treemap || [];
      if (data.sunburst) sunburstTree = data.sunburst;

      renderDrives();
      renderRadarQuickTargets();
      renderTreemap();
      renderToolchainRules();
      renderSunburst();
    };

    window.onSunburstDataReceived = function(tree) {
      sunburstTree = tree;
      renderSunburst();
    };

    window.onDuplicatesReceived = function(dups) {
      const container = document.getElementById('duplicatesListContainer');
      if (!dups || dups.length === 0) {
        container.innerHTML = '<div class=""glass-card"" style=""text-align:center; padding:40px; color:var(--text-muted);"">No duplicate files detected in Downloads.</div>';
        return;
      }
      let html = '';
      dups.forEach(g => {
        html += `
          <div class=""dup-card"">
            <div class=""dup-header"">
              <span style=""color:#38BDF8;"">${g.fileSizeFormatted} each (SHA-256: ${g.hashSha256.substring(0, 12)}...)</span>
              <span style=""color:var(--text-muted);"">${g.filePaths.length} identical copies</span>
            </div>`;
        g.filePaths.forEach((fp, idx) => {
          const fn = fp.split('\\').pop();
          html += `
            <div class=""dup-row"">
              <span style=""overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:70%;"">${fp}</span>
              ${idx > 0 ? `<button class=""btn btn-stage"" onclick=""stageItem('${fn}', '${fp.replace(/\\/g, '\\\\')}', ${g.fileSizeBytes}, '${g.fileSizeFormatted}')"">+ Stage Copy</button>` : '<span style=""font-size:11px; color:#34D399; font-weight:700;"">Original (Preserved)</span>'}
            </div>`;
        });
        html += `</div>`;
      });
      container.innerHTML = html;
      showToast(`Discovered ${dups.length} duplicate clusters!`);
    };

    window.onLicenseUpdated = function(status) {
      if (status && status.isActive && status.tier !== 0) {
        const tierName = status.tier === 1 ? 'Pro Lifetime (Single PC)' : 'PowerPack Lifetime (Family)';
        document.getElementById('activeTierHeading').innerText = tierName;
        document.getElementById('licenseActiveBadge').innerText = 'Active & Verified';
        showToast('License Key Validated: ' + status.statusMessage);
      }
    };

    // Render Drive Partitions
    function renderDrives() {
      const container = document.getElementById('driveGridContainer');
      if (drives.length === 0) return;
      let html = '';
      drives.forEach(d => {
        const usedGb = (d.totalSizeBytes - d.freeSizeBytes) / (1024*1024*1024);
        const totalGb = d.totalSizeBytes / (1024*1024*1024);
        const pct = d.usedPercent.toFixed(1);
        html += `
          <div class=""glass-card"">
            <div class=""drive-card-header"">
              <span class=""drive-title"">
                <svg width=""16"" height=""16"" viewBox=""0 0 24 24"" fill=""none"" stroke=""#38BDF8"" stroke-width=""2""><rect width=""20"" height=""8"" x=""2"" y=""14"" rx=""2""/><path d=""M6 18h.01M10 18h.01""/><path d=""M4 14V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8""/></svg>
                Drive ${d.driveName} [${d.volumeLabel || 'Local Disk'}]
              </span>
              <span style=""font-size:11px; background:rgba(255,255,255,0.06); padding:2px 8px; border-radius:4px; color:var(--text-muted);"">${d.driveFormat}</span>
            </div>
            <div class=""drive-bar-bg"">
              <div class=""drive-bar-fill"" style=""width: ${pct}%;""></div>
            </div>
            <div class=""drive-stats-row"">
              <span>Used: ${usedGb.toFixed(1)} GB (${pct}%)</span>
              <span>Free: ${d.formattedFree} of ${totalGb.toFixed(1)} GB</span>
            </div>
          </div>`;
      });
      container.innerHTML = html;
    }

    // Render Radar Quick Targets
    function renderRadarQuickTargets() {
      const grid = document.getElementById('quickTargetsGrid');
      let totalReclaimable = 0;
      let html = '';

      rules.slice(0, 4).forEach((r, idx) => {
        totalReclaimable += r.sizeBytes;
        const colors = [
          'rgba(56, 189, 248, 0.15)',
          'rgba(139, 92, 246, 0.15)',
          'rgba(236, 72, 153, 0.15)',
          'rgba(16, 185, 129, 0.15)'
        ];
        html += `
          <div class=""quick-tile"">
            <div class=""quick-tile-header"">
              <div class=""quick-tile-icon"" style=""background: ${colors[idx % colors.length]};"">
                <svg width=""18"" height=""18"" viewBox=""0 0 24 24"" fill=""none"" stroke=""#38BDF8"" stroke-width=""2""><polyline points=""22 12 18 12 15 21 9 3 6 12 2 12""/></svg>
              </div>
              <span class=""quick-tile-size"">${r.formattedSize}</span>
            </div>
            <div>
              <div class=""quick-tile-name"">${r.title}</div>
              <div class=""quick-tile-desc"">${r.path}</div>
            </div>
            <div style=""margin-top:12px; display:flex; justify-content:flex-end;"">
              <button class=""btn btn-stage"" onclick=""stageItem('${r.title}', '${r.path.replace(/\\/g, '\\\\')}', ${r.sizeBytes}, '${r.formattedSize}')"">+ Stage</button>
            </div>
          </div>`;
      });

      grid.innerHTML = html;
      document.getElementById('radarReclaimableText').innerText = formatBytes(totalReclaimable);
    }

    // Render Toolchain Rules
    function renderToolchainRules() {
      const container = document.getElementById('toolchainsList');
      let html = '';
      rules.forEach(r => {
        const isSafe = r.safety === 0;
        html += `
          <div class=""rule-card"">
            <div>
              <div class=""rule-title-text"">
                ${r.title}
                <span class=""rule-badge ${isSafe ? 'badge-safe' : 'badge-review'}"">${isSafe ? 'Safe to Clean' : 'Review Required'}</span>
              </div>
              <div class=""rule-path-text"">${r.path}</div>
              <div style=""font-size:12px; color:var(--text-dim); margin-top:4px;"">${r.description}</div>
            </div>
            <div style=""display:flex; align-items:center; gap:14px;"">
              <span style=""font-size:15px; font-weight:800; color:#38BDF8; font-family:monospace;"">${r.formattedSize}</span>
              <button class=""btn btn-stage"" onclick=""stageItem('${r.title}', '${r.path.replace(/\\/g, '\\\\')}', ${r.sizeBytes}, '${r.formattedSize}')"">+ Stage</button>
            </div>
          </div>`;
      });
      container.innerHTML = html;
    }

    // Render Treemap
    function renderTreemap() {
      const container = document.getElementById('treemapTilesGrid');
      const colors = ['#0284C7', '#0EA5E9', '#38BDF8', '#6366F1', '#8B5CF6', '#EC4899', '#10B981', '#14B8A6'];
      const total = treemapItems.reduce((acc, i) => acc + i.sizeBytes, 0) || 1;
      let html = '';

      treemapItems.slice(0, 16).forEach((item, idx) => {
        const pct = Math.max(7, (item.sizeBytes / total) * 94);
        const bg = colors[idx % colors.length];
        html += `
          <div class=""treemap-tile"" style=""width: ${pct}%; min-width: 140px; height: 95px; background: ${bg};"" onclick=""stageItem('${item.name}', '${item.path.replace(/\\/g, '\\\\')}', ${item.sizeBytes}, '${item.formattedSize}')"">
            <span class=""treemap-tile-name"">${item.name}</span>
            <div style=""display:flex; justify-content:space-between; align-items:flex-end;"">
              <span class=""treemap-tile-size"">${item.formattedSize}</span>
              <span style=""font-size:10px; opacity:0.75; font-weight:700;"">+ Stage</span>
            </div>
          </div>`;
      });
      container.innerHTML = html;
    }

    // ==========================================
    // DAISYDISK CANVAS SUNBURST ENGINE (60 FPS)
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
        ctx.fillStyle = '#64748B';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('No storage sectors to display', cx, cy);
        return;
      }

      sunburstSectors = [];
      const totalBytes = sunburstTree.children.reduce((acc, c) => acc + c.sizeBytes, 0) || 1;
      const colors = ['#00F2FE', '#4FACFE', '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', '#10B981', '#F59E0B'];

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

        ctx.fillStyle = isHovered ? '#FFFFFF' : sec.color;
        ctx.globalAlpha = isHovered ? 0.95 : (sec.level === 1 ? 0.8 : 0.6);
        ctx.fill();

        ctx.strokeStyle = '#07090E';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Center Circle Hub (DaisyDisk Navigation)
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, rInner - 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#0F172A';
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Center Text
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 15px -apple-system, sans-serif';

      if (hoveredSector) {
        ctx.fillText(hoveredSector.node.name.substring(0, 14), cx, cy - 10);
        ctx.font = '12px monospace';
        ctx.fillStyle = '#38BDF8';
        ctx.fillText(hoveredSector.node.formattedSize, cx, cy + 12);
      } else {
        ctx.fillText(sunburstTree.name.substring(0, 14), cx, cy - 10);
        ctx.font = '12px monospace';
        ctx.fillStyle = '#38BDF8';
        ctx.fillText(sunburstTree.formattedSize, cx, cy + 12);
      }
    }

    // Canvas Mouse Interaction
    const sCanvas = document.getElementById('sunburstCanvas');
    sCanvas.addEventListener('mousemove', (e) => {
      const rect = sCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left - sCanvas.width / 2;
      const y = e.clientY - rect.top - sCanvas.height / 2;
      const dist = Math.sqrt(x*x + y*y);
      let angle = Math.atan2(y, x);
      if (angle < -Math.PI / 2) angle += 2 * Math.PI;

      const found = sunburstSectors.find(s => dist >= s.r1 && dist <= s.r2 && angle >= s.a1 && angle <= s.a2);

      if (found !== hoveredSector) {
        hoveredSector = found;
        renderSunburst();

        const tip = document.getElementById('sunburstTooltip');
        if (hoveredSector) {
          tip.style.display = 'block';
          tip.style.left = (e.clientX - rect.left + 15) + 'px';
          tip.style.top = (e.clientY - rect.top + 15) + 'px';
          document.getElementById('tipName').innerText = hoveredSector.node.name;
          document.getElementById('tipSize').innerText = hoveredSector.node.formattedSize;
          document.getElementById('tipMeta').innerText = hoveredSector.node.isDirectory ? 'Click to drill down • Shift+Click to stage' : 'Click to stage to collector';
        } else {
          tip.style.display = 'none';
        }
      }
    });

    sCanvas.addEventListener('mouseleave', () => {
      hoveredSector = null;
      document.getElementById('sunburstTooltip').style.display = 'none';
      renderSunburst();
    });

    sCanvas.addEventListener('click', (e) => {
      if (!hoveredSector) {
        // Clicked center circle: navigate up
        return;
      }
      const node = hoveredSector.node;
      if (e.shiftKey || !node.isDirectory) {
        stageItem(node.name, node.path, node.sizeBytes, node.formattedSize);
      } else if (node.isDirectory) {
        // Zoom into folder as new sunburst root
        navigateSunburst(node.path);
      }
    });

    function navigateSunburst(path) {
      document.getElementById('sunburstCrumbs').innerHTML = `
        <span style=""color:var(--text-dim);"">Location:</span>
        <span class=""crumb-btn"" onclick=""navigateSunburst('${path.replace(/\\/g, '\\\\')}')"">${path.split('\\').pop() || path}</span>
      `;
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'getSunburst', path: path });
      }
      showToast('Analyzing ' + path + '...');
    }

    function refreshTreemap(path) {
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'scanDir', path: path });
      }
      showToast('Scanning ' + path + '...');
    }

    function scanForDuplicates() {
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'findDuplicates' });
      }
      showToast('Scanning Downloads for exact SHA-256 duplicate files...');
    }

    function triggerSmartScan() {
      showToast('Refreshing storage volumes and scanning system caches...');
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'refresh' });
      }
    }

    function activateLicenseKey() {
      const key = document.getElementById('keyInput').value.trim();
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

    // Inform C# that webview is ready
    window.addEventListener('DOMContentLoaded', () => {
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'ready' });
      }
    });
  </script>
</body>
</html>";
}
