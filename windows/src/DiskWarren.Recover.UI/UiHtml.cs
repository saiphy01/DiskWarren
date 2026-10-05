namespace DiskWarren.Recover.UI;

public static class UiHtml
{
    public static string GetHtml()
    {
        return @"<!DOCTYPE html>
<html lang=""en"" class=""dark"">
<head>
<meta charset=""UTF-8"" />
<meta name=""viewport"" content=""width=device-width, initial-scale=1.0"" />
<title>DiskWarren Recover</title>
<style>
  :root {
    --bg-dark: #0b0f19;
    --surface-dark: #111827;
    --surface-card: #1e293b;
    --surface-card-hover: #334155;
    --border-color: #334155;
    --teal-primary: #0d9488;
    --teal-hover: #14b8a6;
    --teal-glow: rgba(13, 148, 136, 0.25);
    --text-primary: #f8fafc;
    --text-muted: #94a3b8;
    --text-subtle: #64748b;
    --emerald-green: #10b981;
    --amber-warning: #f59e0b;
    --red-danger: #ef4444;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; font-family: -apple-system, BlinkMacSystemFont, ""Segoe UI"", Roboto, Helvetica, Arial, sans-serif; }
  body { background-color: var(--bg-dark); color: var(--text-primary); height: 100vh; overflow: hidden; display: flex; flex-direction: column; font-size: 13px; }

  /* Title bar */
  .titlebar {
    height: 44px;
    background: var(--surface-dark);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    -webkit-app-region: drag;
  }
  .titlebar-left { display: flex; align-items: center; gap: 10px; }
  .logo-icon { width: 22px; height: 22px; color: var(--teal-hover); fill: currentColor; }
  .app-title { font-weight: 700; font-size: 14px; letter-spacing: -0.2px; color: #fff; }
  .edition-badge { background: rgba(13, 148, 136, 0.2); border: 1px solid var(--teal-primary); color: #2dd4bf; padding: 2px 8px; border-radius: 999px; font-size: 10px; font-weight: 600; text-transform: uppercase; }
  .safety-shield-pill { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--emerald-green); background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); padding: 3px 10px; border-radius: 999px; font-weight: 600; }
  
  .titlebar-controls { display: flex; align-items: center; gap: 4px; -webkit-app-region: no-drag; }
  .btn-win { width: 34px; height: 30px; display: flex; align-items: center; justify-content: center; background: transparent; border: none; color: var(--text-muted); cursor: pointer; border-radius: 6px; font-size: 12px; transition: all 0.15s; }
  .btn-win:hover { background: var(--surface-card); color: #fff; }
  .btn-win.close:hover { background: var(--red-danger); color: #fff; }

  /* Main Workspace */
  .workspace { flex: 1; overflow: hidden; display: flex; position: relative; }
  .view { position: absolute; inset: 0; display: none; flex-direction: column; }
  .view.active { display: flex; }

  /* Drive Select View */
  .drive-select-container { padding: 36px 48px; overflow-y: auto; flex: 1; max-width: 1100px; margin: 0 auto; width: 100%; }
  .view-heading { margin-bottom: 24px; }
  .view-heading h1 { font-size: 26px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
  .view-heading p { color: var(--text-muted); font-size: 14px; margin-top: 6px; }

  .drive-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 18px; margin-bottom: 32px; }
  .drive-card {
    background: var(--surface-dark);
    border: 1px solid var(--border-color);
    border-radius: 14px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    gap: 14px;
    position: relative;
    overflow: hidden;
  }
  .drive-card:hover { border-color: var(--teal-primary); transform: translateY(-2px); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5); }
  .drive-card.selected { border-color: var(--teal-hover); background: #131d2e; box-shadow: 0 0 0 2px var(--teal-primary), 0 10px 25px -5px var(--teal-glow); }
  
  .drive-card-header { display: flex; justify-content: space-between; align-items: flex-start; }
  .drive-letter-box { width: 44px; height: 44px; border-radius: 10px; background: rgba(13, 148, 136, 0.15); border: 1px solid var(--teal-primary); color: var(--teal-hover); font-size: 18px; font-weight: 800; display: flex; align-items: center; justify-content: center; }
  .drive-badges { display: flex; gap: 6px; }
  .drive-badge { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 6px; background: var(--surface-card); color: var(--text-muted); border: 1px solid var(--border-color); }
  .drive-badge.trim { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border-color: rgba(245, 158, 11, 0.3); }

  .drive-info h3 { font-size: 16px; font-weight: 700; color: #fff; }
  .drive-info p { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

  .capacity-bar-bg { width: 100%; height: 8px; background: var(--surface-card); border-radius: 999px; overflow: hidden; margin-top: 4px; }
  .capacity-bar-fill { height: 100%; background: linear-gradient(90deg, var(--teal-primary), var(--emerald-green)); border-radius: 999px; }
  .capacity-numbers { display: flex; justify-content: space-between; font-size: 11px; color: var(--text-subtle); margin-top: 4px; font-weight: 600; }

  /* Scan Config Bar */
  .scan-config-card { background: var(--surface-dark); border: 1px solid var(--border-color); border-radius: 14px; padding: 22px; display: flex; flex-direction: column; gap: 18px; }
  .scan-mode-tabs { display: flex; gap: 12px; }
  .scan-mode-btn { flex: 1; padding: 14px 18px; border-radius: 10px; background: var(--surface-card); border: 1px solid var(--border-color); color: #fff; cursor: pointer; text-align: left; transition: all 0.2s; }
  .scan-mode-btn.active { background: rgba(13, 148, 136, 0.2); border-color: var(--teal-primary); }
  .scan-mode-btn h4 { font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: space-between; }
  .scan-mode-btn p { font-size: 11px; color: var(--text-muted); margin-top: 4px; }

  .category-pills { display: flex; flex-wrap: wrap; gap: 8px; }
  .cat-pill { padding: 6px 14px; border-radius: 999px; background: var(--surface-card); border: 1px solid var(--border-color); color: var(--text-muted); font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
  .cat-pill.active { background: var(--teal-primary); color: #fff; border-color: var(--teal-primary); }

  .start-scan-action { display: flex; justify-content: flex-end; margin-top: 10px; }
  .btn-primary {
    background: linear-gradient(135deg, #0d9488, #059669);
    border: none;
    color: #fff;
    padding: 14px 28px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 15px var(--teal-glow);
    transition: all 0.2s;
  }
  .btn-primary:hover { filter: brightness(1.1); transform: translateY(-1px); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

  /* Scan Progress View */
  .scan-view-container { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; }
  .radar-spinner { width: 140px; height: 140px; border-radius: 50%; border: 2px dashed rgba(13, 148, 136, 0.4); position: relative; margin-bottom: 28px; display: flex; align-items: center; justify-content: center; animation: spin 10s linear infinite; }
  .radar-sweep { position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(from 0deg, transparent 0deg, rgba(20, 184, 166, 0.35) 90deg, transparent 91deg); animation: spin 2s linear infinite; }
  .radar-center { width: 24px; height: 24px; border-radius: 50%; background: var(--teal-hover); box-shadow: 0 0 20px var(--teal-hover); }
  @keyframes spin { 100% { transform: rotate(360deg); } }

  .scan-metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; width: 100%; max-width: 720px; margin-top: 32px; }
  .scan-metric-card { background: var(--surface-dark); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; }
  .scan-metric-card .val { font-size: 24px; font-weight: 800; color: #fff; font-mono: true; }
  .scan-metric-card .lbl { font-size: 11px; color: var(--text-muted); margin-top: 4px; text-transform: uppercase; font-weight: 600; }

  /* Results Explorer View */
  .explorer-layout { flex: 1; display: flex; height: 100%; }
  .explorer-sidebar { width: 240px; background: var(--surface-dark); border-right: 1px solid var(--border-color); display: flex; flex-direction: column; padding: 18px; gap: 20px; }
  .sidebar-section-title { font-size: 11px; font-weight: 700; color: var(--text-subtle); text-transform: uppercase; letter-spacing: 0.5px; }
  .sidebar-nav-list { display: flex; flex-direction: column; gap: 4px; }
  .sidebar-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-radius: 8px; cursor: pointer; color: var(--text-muted); font-weight: 600; transition: all 0.15s; }
  .sidebar-item:hover { background: var(--surface-card); color: #fff; }
  .sidebar-item.active { background: rgba(13, 148, 136, 0.15); color: var(--teal-hover); border-left: 3px solid var(--teal-primary); }
  .sidebar-badge { font-size: 11px; padding: 1px 6px; border-radius: 999px; background: var(--surface-card); color: var(--text-subtle); }

  .explorer-center { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .explorer-toolbar { height: 56px; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; padding: 0 20px; gap: 16px; background: var(--surface-dark); }
  .search-box { flex: 1; max-width: 360px; position: relative; }
  .search-box input { width: 100%; background: var(--bg-dark); border: 1px solid var(--border-color); border-radius: 8px; padding: 8px 12px 8px 34px; color: #fff; font-size: 12px; outline: none; }
  .search-box input:focus { border-color: var(--teal-primary); }
  .search-box svg { position: absolute; left: 10px; top: 9px; width: 14px; height: 14px; color: var(--text-subtle); }

  .candidate-table-wrapper { flex: 1; overflow-y: auto; }
  table.candidate-table { width: 100%; border-collapse: collapse; text-align: left; }
  table.candidate-table th { background: var(--surface-dark); padding: 10px 16px; font-size: 11px; font-weight: 700; color: var(--text-subtle); text-transform: uppercase; border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 10; }
  table.candidate-table td { padding: 12px 16px; border-bottom: 1px solid rgba(51, 65, 85, 0.4); font-size: 12px; color: var(--text-primary); cursor: pointer; }
  table.candidate-table tr:hover td { background: rgba(30, 41, 59, 0.5); }
  table.candidate-table tr.selected td { background: rgba(13, 148, 136, 0.12); }
  
  .health-pill { display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; border-radius: 999px; font-size: 11px; font-weight: 700; }
  
  /* Inspector Drawer */
  .inspector-drawer { width: 340px; background: var(--surface-dark); border-left: 1px solid var(--border-color); display: flex; flex-direction: column; overflow-y: auto; padding: 22px; gap: 20px; }
  .inspector-header h3 { font-size: 16px; font-weight: 700; color: #fff; word-break: break-all; }
  .inspector-header p { font-size: 11px; color: var(--text-muted); margin-top: 4px; word-break: break-all; }

  .health-gauge-card { background: var(--surface-card); border-radius: 12px; padding: 16px; text-align: center; border: 1px solid var(--border-color); }
  .gauge-score { font-size: 38px; font-weight: 900; line-height: 1; margin: 8px 0; }
  .gauge-desc { font-size: 12px; font-weight: 600; }

  .evidence-checklist { display: flex; flex-direction: column; gap: 8px; }
  .evidence-item { display: flex; align-items: flex-start; gap: 8px; font-size: 11px; line-height: 1.4; color: var(--text-muted); }
  .evidence-item.pos { color: #a7f3d0; }
  .evidence-item.neg { color: #fecaca; }
  .evidence-icon { width: 14px; height: 14px; shrink: 0; margin-top: 2px; }

  .hex-preview-box { background: #000; border: 1px solid var(--border-color); border-radius: 8px; padding: 10px; font-family: ""Cascadia Code"", Consolas, monospace; font-size: 10px; color: #38bdf8; white-space: pre; overflow-x: auto; line-height: 1.5; }

  /* Modals */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); display: none; align-items: center; justify-content: center; z-index: 100; backdrop-filter: blur(4px); }
  .modal-overlay.active { display: flex; }
  .modal-card { width: 100%; max-width: 540px; background: var(--surface-dark); border: 1px solid var(--border-color); border-radius: 16px; padding: 28px; display: flex; flex-direction: column; gap: 20px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8); }

  .safety-warning-banner { background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 10px; padding: 14px; display: flex; gap: 12px; }
  .safety-warning-banner h4 { color: #f87171; font-size: 13px; font-weight: 700; }
  .safety-warning-banner p { color: #fca5a5; font-size: 11px; margin-top: 2px; line-height: 1.4; }

  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-group label { font-size: 12px; font-weight: 700; color: var(--text-muted); }
  .form-group input { background: var(--bg-dark); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px 14px; color: #fff; font-size: 13px; outline: none; }
  .form-group input:focus { border-color: var(--teal-primary); }

  .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px; }
  .btn-secondary { background: var(--surface-card); border: 1px solid var(--border-color); color: #fff; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; }
</style>
</head>
<body>

<!-- Title Bar -->
<div class=""titlebar"">
  <div class=""titlebar-left"">
    <svg class=""logo-icon"" viewBox=""0 0 24 24"">
      <path d=""M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"" fill=""none"" stroke=""currentColor"" stroke-width=""2"" stroke-linecap=""round"" stroke-linejoin=""round""/>
      <path d=""m9 12 2 2 4-4"" fill=""none"" stroke=""currentColor"" stroke-width=""2"" stroke-linecap=""round"" stroke-linejoin=""round""/>
    </svg>
    <span class=""app-title"">DiskWarren Recover</span>
    <span class=""edition-badge"" id=""editionBadge"">Community Edition</span>
    <div class=""safety-shield-pill"">
      <span style=""width:6px;height:6px;border-radius:50%;background:#10b981;""></span>
      <span>Read-Only Source Lock</span>
    </div>
  </div>

  <div class=""titlebar-controls"">
    <button class=""btn-win"" onclick=""openLicenseModal()"">License</button>
    <button class=""btn-win"" onclick=""window.chrome.webview.postMessage({action:'minimize'})"">&#x2014;</button>
    <button class=""btn-win"" onclick=""window.chrome.webview.postMessage({action:'maximize'})"">&#x25A2;</button>
    <button class=""btn-win close"" onclick=""window.chrome.webview.postMessage({action:'close'})"">&#x2715;</button>
  </div>
</div>

<!-- Main Workspace -->
<div class=""workspace"">

  <!-- VIEW 1: DRIVE SELECTION -->
  <div class=""view active"" id=""viewDrives"">
    <div class=""drive-select-container"">
      <div class=""view-heading"">
        <h1>Select Storage Device to Recover</h1>
        <p>Connected storage drives detected in 100% read-only block mode. Zero write commands will touch the target drive.</p>
      </div>

      <div class=""drive-grid"" id=""driveGrid"">
        <!-- Rendered dynamically -->
      </div>

      <div class=""scan-config-card"">
        <div>
          <span style=""font-size:11px;font-weight:700;color:var(--text-subtle);text-transform:uppercase;"">Scan Strategy</span>
          <div class=""scan-mode-tabs"" style=""margin-top:8px;"">
            <div class=""scan-mode-btn active"" id=""btnQuickScan"" onclick=""selectScanMode('quick')"">
              <h4>Quick Scan ($MFT Traversal) <span style=""font-size:11px;color:var(--teal-hover);"">Recommended</span></h4>
              <p>Reconstructs NTFS &amp; FAT directory structures in seconds. Preserves original filenames and folder paths.</p>
            </div>
            <div class=""scan-mode-btn"" id=""btnDeepScan"" onclick=""selectScanMode('deep')"">
              <h4>Deep Sector Carve (Raw Signatures) <span style=""font-size:11px;color:#f59e0b;"">Thorough</span></h4>
              <p>Scans raw unallocated blocks for 20+ file signatures (JPEG, PNG, PDF, DOCX, ZIP, MP4). Recovers formatted partitions.</p>
            </div>
          </div>
        </div>

        <div>
          <span style=""font-size:11px;font-weight:700;color:var(--text-subtle);text-transform:uppercase;"">File Category Filters</span>
          <div class=""category-pills"" style=""margin-top:8px;"">
            <div class=""cat-pill active"" onclick=""toggleCategory(this, 'Images')"">Photos &amp; Images</div>
            <div class=""cat-pill active"" onclick=""toggleCategory(this, 'Documents')"">Documents &amp; PDFs</div>
            <div class=""cat-pill active"" onclick=""toggleCategory(this, 'AudioVideo')"">Audio &amp; Video</div>
            <div class=""cat-pill active"" onclick=""toggleCategory(this, 'Archives')"">ZIP &amp; Archives</div>
            <div class=""cat-pill active"" onclick=""toggleCategory(this, 'Code')"">Code &amp; DBs</div>
          </div>
        </div>

        <div class=""start-scan-action"">
          <button class=""btn-primary"" id=""btnStartScan"" onclick=""startScan()"" disabled>
            <svg style=""width:16px;height:16px;"" fill=""none"" stroke=""currentColor"" stroke-width=""2"" viewBox=""0 0 24 24""><path stroke-linecap=""round"" stroke-linejoin=""round"" d=""M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z""/></svg>
            <span>Start Safe Drive Scan</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- VIEW 2: ACTIVE SCAN PROGRESS -->
  <div class=""view"" id=""viewScanning"">
    <div class=""scan-view-container"">
      <div class=""radar-spinner"">
        <div class=""radar-sweep""></div>
        <div class=""radar-center""></div>
      </div>

      <h2 style=""font-size:22px;font-weight:800;color:#fff;"" id=""scanStageText"">Parsing $MFT Master File Table...</h2>
      <p style=""color:var(--text-muted);font-size:13px;margin-top:6px;"" id=""scanLbaText"">Scanning Cluster Offset: 0x004A8000</p>

      <div style=""width:100%;max-width:540px;margin-top:24px;"">
        <div class=""capacity-bar-bg"" style=""height:10px;"">
          <div class=""capacity-bar-fill"" id=""scanProgressBar"" style=""width:0%;""></div>
        </div>
        <div style=""display:flex;justify-content:space-between;font-size:11px;color:var(--text-subtle);margin-top:6px;font-weight:600;"">
          <span id=""scanPercentText"">0% Complete</span>
          <span id=""scanSpeedText"">520 MB/s</span>
          <span id=""scanEtaText"">ETA: ~12s</span>
        </div>
      </div>

      <div class=""scan-metrics-grid"">
        <div class=""scan-metric-card"">
          <div class=""val"" id=""metricCandidates"">0</div>
          <div class=""lbl"">Candidates Found</div>
        </div>
        <div class=""scan-metric-card"">
          <div class=""val"" id=""metricImages"">0</div>
          <div class=""lbl"">Photos / Images</div>
        </div>
        <div class=""scan-metric-card"">
          <div class=""val"" id=""metricDocs"">0</div>
          <div class=""lbl"">Documents</div>
        </div>
        <div class=""scan-metric-card"">
          <div class=""val"" id=""metricMedia"">0</div>
          <div class=""lbl"">Media / Other</div>
        </div>
      </div>

      <div style=""margin-top:32px;"">
        <button class=""btn-secondary"" onclick=""cancelScan()"">Stop Scan Early</button>
      </div>
    </div>
  </div>

  <!-- VIEW 3: CANDIDATE RESULTS & INSPECTOR -->
  <div class=""view"" id=""viewResults"">
    <div class=""explorer-layout"">
      
      <!-- Sidebar Filters -->
      <div class=""explorer-sidebar"">
        <div>
          <span class=""sidebar-section-title"">Categories</span>
          <div class=""sidebar-nav-list"" style=""margin-top:8px;"">
            <div class=""sidebar-item active"" onclick=""filterCategory('All')"">
              <span>All Files</span>
              <span class=""sidebar-badge"" id=""badgeAll"">0</span>
            </div>
            <div class=""sidebar-item"" onclick=""filterCategory('Images')"">
              <span>Photos &amp; Images</span>
              <span class=""sidebar-badge"" id=""badgeImages"">0</span>
            </div>
            <div class=""sidebar-item"" onclick=""filterCategory('Documents')"">
              <span>Documents</span>
              <span class=""sidebar-badge"" id=""badgeDocs"">0</span>
            </div>
            <div class=""sidebar-item"" onclick=""filterCategory('AudioVideo')"">
              <span>Audio &amp; Video</span>
              <span class=""sidebar-badge"" id=""badgeVideo"">0</span>
            </div>
            <div class=""sidebar-item"" onclick=""filterCategory('Archives')"">
              <span>Archives</span>
              <span class=""sidebar-badge"" id=""badgeArchives"">0</span>
            </div>
            <div class=""sidebar-item"" onclick=""filterCategory('Code')"">
              <span>Code &amp; Data</span>
              <span class=""sidebar-badge"" id=""badgeCode"">0</span>
            </div>
          </div>
        </div>

        <div style=""margin-top:auto;"">
          <button class=""btn-secondary"" style=""width:100%;"" onclick=""returnToDrives()"">&larr; Scan Another Drive</button>
        </div>
      </div>

      <!-- Main Candidates Table -->
      <div class=""explorer-center"">
        <div class=""explorer-toolbar"">
          <div class=""search-box"">
            <svg fill=""none"" stroke=""currentColor"" stroke-width=""2"" viewBox=""0 0 24 24""><path stroke-linecap=""round"" stroke-linejoin=""round"" d=""M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z""/></svg>
            <input type=""text"" id=""searchInput"" placeholder=""Search deleted files by name or extension..."" oninput=""handleSearch(this.value)"" />
          </div>

          <div style=""display:flex;align-items:center;gap:14px;"">
            <span style=""font-size:12px;color:var(--text-muted);"" id=""selectionSummary"">0 items selected (0 B)</span>
            <button class=""btn-primary"" onclick=""openExportModal()"">
              <svg style=""width:16px;height:16px;"" fill=""none"" stroke=""currentColor"" stroke-width=""2"" viewBox=""0 0 24 24""><path stroke-linecap=""round"" stroke-linejoin=""round"" d=""M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4""/></svg>
              <span>Recover Selected</span>
            </button>
          </div>
        </div>

        <div class=""candidate-table-wrapper"">
          <table class=""candidate-table"">
            <thead>
              <tr>
                <th style=""width:36px;""><input type=""checkbox"" id=""chkSelectAll"" onchange=""toggleSelectAll(this.checked)"" checked /></th>
                <th>File Name</th>
                <th>Detected Signature</th>
                <th>Size</th>
                <th>Recovery Confidence</th>
                <th>Cluster Offset</th>
              </tr>
            </thead>
            <tbody id=""candidateTableBody"">
              <!-- Rendered dynamically -->
            </tbody>
          </table>
        </div>
      </div>

      <!-- Inspector Panel -->
      <div class=""inspector-drawer"" id=""inspectorDrawer"">
        <div class=""inspector-header"">
          <h3 id=""inspectFileName"">Select a file to inspect</h3>
          <p id=""inspectFilePath"">Cluster offset details &amp; evidence scoring</p>
        </div>

        <div class=""health-gauge-card"" id=""inspectGaugeCard"">
          <div style=""font-size:11px;font-weight:700;color:var(--text-subtle);text-transform:uppercase;"">Evidence Confidence Score</div>
          <div class=""gauge-score"" id=""inspectScoreText"" style=""color:var(--emerald-green);"">--</div>
          <div class=""gauge-desc"" id=""inspectRatingText"">Select a file</div>
        </div>

        <div>
          <span style=""font-size:11px;font-weight:700;color:var(--text-subtle);text-transform:uppercase;"">Cryptographic Evidence Breakdown</span>
          <div class=""evidence-checklist"" id=""inspectEvidenceList"" style=""margin-top:10px;"">
            <!-- Rendered dynamically -->
          </div>
        </div>

        <div>
          <span style=""font-size:11px;font-weight:700;color:var(--text-subtle);text-transform:uppercase;"">In-Memory Sector Hex Dump</span>
          <div class=""hex-preview-box"" id=""inspectHexBox"" style=""margin-top:10px;"">0000: -- -- -- -- -- -- -- -- |........|</div>
        </div>
      </div>

    </div>
  </div>

</div>

<!-- EXPORT RECOVERY MODAL -->
<div class=""modal-overlay"" id=""exportModal"">
  <div class=""modal-card"">
    <div style=""display:flex;justify-content:space-between;align-items:center;"">
      <h3 style=""font-size:18px;font-weight:800;color:#fff;"">Safe Recovery Destination</h3>
      <button class=""btn-win"" onclick=""closeExportModal()"">&#x2715;</button>
    </div>

    <div class=""safety-warning-banner"" id=""sameDriveWarning"" style=""display:none;"">
      <svg style=""width:20px;height:20px;color:#ef4444;shrink:0;"" fill=""none"" stroke=""currentColor"" stroke-width=""2"" viewBox=""0 0 24 24""><path stroke-linecap=""round"" stroke-linejoin=""round"" d=""M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z""/></svg>
      <div>
        <h4>Destination Blocked: Same Drive Violation</h4>
        <p>Recovering files to the source drive overwrites unallocated sectors and permanently destroys remaining files. Select a different drive (e.g. secondary disk or USB drive).</p>
      </div>
    </div>

    <div class=""form-group"">
      <label>Destination Directory</label>
      <div style=""display:flex;gap:8px;"">
        <input type=""text"" id=""destPathInput"" style=""flex:1;"" placeholder=""D:\RecoveredFiles or E:\DataBackup"" oninput=""validateDestPath(this.value)"" />
        <button class=""btn-secondary"" onclick=""browseFolder()"">Browse...</button>
      </div>
      <span style=""font-size:11px;color:var(--text-subtle);margin-top:4px;"" id=""destDriveHelp"">Target must be on a separate physical or logical volume.</span>
    </div>

    <div id=""exportProgressSection"" style=""display:none;"">
      <div style=""font-size:12px;color:var(--text-muted);margin-bottom:6px;"" id=""exportCurrentFile"">Exporting files &amp; verifying SHA-256...</div>
      <div class=""capacity-bar-bg"">
        <div class=""capacity-bar-fill"" id=""exportProgressBar"" style=""width:0%;""></div>
      </div>
    </div>

    <div class=""modal-actions"">
      <button class=""btn-secondary"" onclick=""closeExportModal()"">Cancel</button>
      <button class=""btn-primary"" id=""btnConfirmExport"" onclick=""executeExport()"">
        <span>Verify &amp; Recover</span>
      </button>
    </div>
  </div>
</div>

<!-- LICENSE MODAL -->
<div class=""modal-overlay"" id=""licenseModal"">
  <div class=""modal-card"">
    <div style=""display:flex;justify-content:space-between;align-items:center;"">
      <h3 style=""font-size:18px;font-weight:800;color:#fff;"">DiskWarren Recover Licensing</h3>
      <button class=""btn-win"" onclick=""closeLicenseModal()"">&#x2715;</button>
    </div>

    <p style=""font-size:12px;color:var(--text-muted);"">Community Edition includes unlimited scanning, in-memory previews, and up to 500 MB free recovery. Activate Pro or Technician for unlimited lifetime recovery.</p>

    <div class=""form-group"">
      <label>Activation Key</label>
      <input type=""text"" id=""licenseKeyInput"" placeholder=""DWR-PRO-XXXX-XXXX-XXXX"" />
      <span style=""font-size:11px;color:var(--text-subtle);"" id=""licenseMsg"">Enter your 16 or 18 character offline key.</span>
    </div>

    <div style=""display:flex;gap:8px;"">
      <button class=""btn-secondary"" style=""font-size:11px;"" onclick=""fillDemoKey('pro')"">Demo Pro Key</button>
      <button class=""btn-secondary"" style=""font-size:11px;"" onclick=""fillDemoKey('tech')"">Demo Technician Key</button>
    </div>

    <div class=""modal-actions"">
      <button class=""btn-secondary"" onclick=""closeLicenseModal()"">Close</button>
      <button class=""btn-primary"" onclick=""activateLicense()"">Activate License</button>
    </div>
  </div>
</div>

<script>
  let drives = [];
  let selectedDrive = null;
  let scanMode = 'quick';
  let activeCategories = new Set(['Images', 'Documents', 'AudioVideo', 'Archives', 'Code']);
  let allCandidates = [];
  let activeFilterCat = 'All';
  let searchQuery = '';
  let selectedCandidate = null;

  function requestDrives() {
    try {
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'getDrives' });
      }
    } catch (e) {}
  }

  // Init
  window.addEventListener('DOMContentLoaded', () => {
    requestDrives();
    setTimeout(requestDrives, 300);
    setTimeout(requestDrives, 1000);
  });

  // Dual-channel message handler
  window.handleHostMessage = function(msg) {
    if (!msg) return;
    if (msg.type === 'drivesLoaded') {
      drives = msg.drives || [];
      renderDrives();
    } else if (msg.type === 'scanProgress') {
      updateScanProgress(msg.progress);
    } else if (msg.type === 'scanComplete') {
      allCandidates = msg.candidates;
      showResultsView();
    } else if (msg.type === 'destValidated') {
      handleDestValidationResult(msg.result);
    } else if (msg.type === 'exportProgress') {
      document.getElementById('exportProgressSection').style.display = 'block';
      document.getElementById('exportProgressBar').style.width = msg.percent + '%';
      document.getElementById('exportCurrentFile').innerText = 'Writing & SHA-256 verifying: ' + msg.file;
    } else if (msg.type === 'exportComplete') {
      alert('Recovery successfully completed!\n' + msg.report.successfulCount + ' files exported with SHA-256 verification.\nAudit report saved to destination folder.');
      closeExportModal();
    } else if (msg.type === 'licenseResult') {
      document.getElementById('licenseMsg').innerText = msg.message;
      if (msg.success) {
        document.getElementById('editionBadge').innerText = msg.tier + ' Edition';
      }
    } else if (msg.type === 'folderSelected') {
      document.getElementById('destPathInput').value = msg.path;
      validateDestPath(msg.path);
    }
  };

  function setupWebviewListener() {
    if (window.chrome && window.chrome.webview) {
      window.chrome.webview.addEventListener('message', event => {
        window.handleHostMessage(event.data);
      });
      return true;
    }
    return false;
  }

  if (!setupWebviewListener()) {
    const chkTimer = setInterval(() => {
      if (setupWebviewListener()) {
        clearInterval(chkTimer);
        requestDrives();
      }
    }, 100);
  }

  function renderDrives() {
    const grid = document.getElementById('driveGrid');
    grid.innerHTML = '';
    drives.forEach((d, idx) => {
      const card = document.createElement('div');
      card.className = 'drive-card' + (selectedDrive && selectedDrive.deviceId === d.deviceId ? ' selected' : '');
      card.onclick = () => selectDrive(d, card);

      const isSsd = d.mediaType === 0;
      card.innerHTML = `
        <div class=""drive-card-header"">
          <div class=""drive-letter-box"">${d.deviceId}</div>
          <div class=""drive-badges"">
            <span class=""drive-badge"">${d.fileSystem}</span>
            <span class=""drive-badge"">${isSsd ? 'NVMe SSD' : 'HDD / Storage'}</span>
            ${d.isTrimEnabled ? '<span class=""drive-badge trim"">TRIM Active</span>' : ''}
          </div>
        </div>
        <div class=""drive-info"">
          <h3>${d.volumeLabel} (${d.deviceId})</h3>
          <p>${d.modelName}</p>
        </div>
        <div>
          <div class=""capacity-bar-bg"">
            <div class=""capacity-bar-fill"" style=""width:${d.usedPercent}%""></div>
          </div>
          <div class=""capacity-numbers"">
            <span>${d.freeDisplay} Free</span>
            <span>${d.totalDisplay} Total</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    if (drives.length > 0 && !selectedDrive) {
      selectDrive(drives[0], grid.children[0]);
    }
  }

  function selectDrive(d, el) {
    selectedDrive = d;
    document.querySelectorAll('.drive-card').forEach(c => c.classList.remove('selected'));
    if (el) el.classList.add('selected');
    document.getElementById('btnStartScan').disabled = false;
  }

  function selectScanMode(mode) {
    scanMode = mode;
    document.getElementById('btnQuickScan').classList.toggle('active', mode === 'quick');
    document.getElementById('btnDeepScan').classList.toggle('active', mode === 'deep');
  }

  function toggleCategory(el, cat) {
    if (activeCategories.has(cat)) {
      if (activeCategories.size > 1) {
        activeCategories.delete(cat);
        el.classList.remove('active');
      }
    } else {
      activeCategories.add(cat);
      el.classList.add('active');
    }
  }

  function startScan() {
    if (!selectedDrive) return;
    document.getElementById('viewDrives').classList.remove('active');
    document.getElementById('viewScanning').classList.add('active');
    window.chrome.webview.postMessage({
      action: 'startScan',
      driveId: selectedDrive.deviceId,
      mode: scanMode,
      categories: Array.from(activeCategories)
    });
  }

  function cancelScan() {
    window.chrome.webview.postMessage({ action: 'stopScan' });
  }

  function updateScanProgress(p) {
    document.getElementById('scanStageText').innerText = p.stage;
    document.getElementById('scanLbaText').innerText = 'Cluster LBA: ' + p.currentLba;
    document.getElementById('scanProgressBar').style.width = p.percent + '%';
    document.getElementById('scanPercentText').innerText = p.percent + '% Complete';
    document.getElementById('scanSpeedText').innerText = Math.round(p.speedMBs) + ' MB/s';
    document.getElementById('scanEtaText').innerText = 'ETA: ~' + p.etaSeconds + 's';

    document.getElementById('metricCandidates').innerText = p.foundCount;
    document.getElementById('metricImages').innerText = Math.round(p.foundCount * 0.4);
    document.getElementById('metricDocs').innerText = Math.round(p.foundCount * 0.35);
    document.getElementById('metricMedia').innerText = Math.round(p.foundCount * 0.25);
  }

  function showResultsView() {
    document.getElementById('viewScanning').classList.remove('active');
    document.getElementById('viewResults').classList.add('active');
    renderCandidates();
  }

  function renderCandidates() {
    const tbody = document.getElementById('candidateTableBody');
    tbody.innerHTML = '';

    const filtered = allCandidates.filter(c => {
      if (activeFilterCat !== 'All' && getCatName(c.category) !== activeFilterCat) return false;
      if (searchQuery && !c.fileName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

    // Update Badges
    document.getElementById('badgeAll').innerText = allCandidates.length;
    document.getElementById('badgeImages').innerText = allCandidates.filter(c => c.category === 0).length;
    document.getElementById('badgeDocs').innerText = allCandidates.filter(c => c.category === 1).length;
    document.getElementById('badgeVideo').innerText = allCandidates.filter(c => c.category === 2).length;
    document.getElementById('badgeArchives').innerText = allCandidates.filter(c => c.category === 3).length;
    document.getElementById('badgeCode').innerText = allCandidates.filter(c => c.category === 4).length;

    filtered.forEach(c => {
      const tr = document.createElement('tr');
      if (selectedCandidate && selectedCandidate.id === c.id) tr.classList.add('selected');
      tr.onclick = (e) => {
        if (e.target.type !== 'checkbox') inspectCandidate(c, tr);
      };

      tr.innerHTML = `
        <td><input type=""checkbox"" ${c.isSelected ? 'checked' : ''} onchange=""toggleCandidateSelect('${c.id}', this.checked)"" /></td>
        <td style=""font-weight:600;"">${c.fileName}</td>
        <td style=""color:var(--text-muted);"">${c.detectedSignature}</td>
        <td style=""font-mono:true;"">${c.sizeDisplay}</td>
        <td>
          <span class=""health-pill"" style=""background:${c.healthColor}20;color:${c.healthColor};border:1px solid ${c.healthColor}50;"">
            ${c.confidenceScore}% • ${c.healthLabel.split(' ')[0]}
          </span>
        </td>
        <td style=""font-mono:true;color:var(--text-subtle);"">0x${c.clusterOffset.toString(16).toUpperCase()}</td>
      `;
      tbody.appendChild(tr);
    });

    updateSelectionSummary();
    if (filtered.length > 0 && !selectedCandidate) {
      inspectCandidate(filtered[0], tbody.children[0]);
    }
  }

  function getCatName(catInt) {
    const map = ['Images', 'Documents', 'AudioVideo', 'Archives', 'Code', 'Other'];
    return map[catInt] || 'Other';
  }

  function inspectCandidate(c, el) {
    selectedCandidate = c;
    document.querySelectorAll('table.candidate-table tr').forEach(r => r.classList.remove('selected'));
    if (el) el.classList.add('selected');

    document.getElementById('inspectFileName').innerText = c.fileName;
    document.getElementById('inspectFilePath').innerText = c.originalPath;
    document.getElementById('inspectScoreText').innerText = c.confidenceScore + '%';
    document.getElementById('inspectScoreText').style.color = c.healthColor;
    document.getElementById('inspectRatingText').innerText = c.healthLabel;

    const evList = document.getElementById('inspectEvidenceList');
    evList.innerHTML = '';
    (c.evidenceTokens || []).forEach(t => {
      const item = document.createElement('div');
      item.className = 'evidence-item ' + (t.isPositive ? 'pos' : 'neg');
      item.innerHTML = `
        <span class=""evidence-icon"">${t.isPositive ? '&#10003;' : '&#9888;'}</span>
        <span>${t.description} (${t.scoreDelta > 0 ? '+' : ''}${t.scoreDelta}%)</span>
      `;
      evList.appendChild(item);
    });

    document.getElementById('inspectHexBox').innerText = c.hexSnippet || '0000: -- -- -- -- -- -- -- -- |........|';
  }

  function filterCategory(cat) {
    activeFilterCat = cat;
    document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
    event.currentTarget.classList.add('active');
    renderCandidates();
  }

  function handleSearch(val) {
    searchQuery = val;
    renderCandidates();
  }

  function toggleCandidateSelect(id, checked) {
    const c = allCandidates.find(x => x.id === id);
    if (c) c.isSelected = checked;
    updateSelectionSummary();
  }

  function toggleSelectAll(checked) {
    allCandidates.forEach(c => c.isSelected = checked);
    renderCandidates();
  }

  function updateSelectionSummary() {
    const selected = allCandidates.filter(c => c.isSelected);
    const totalBytes = selected.reduce((acc, c) => acc + c.sizeBytes, 0);
    document.getElementById('selectionSummary').innerText = `${selected.length} items selected (${formatBytes(totalBytes)})`;
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  function returnToDrives() {
    document.getElementById('viewResults').classList.remove('active');
    document.getElementById('viewDrives').classList.add('active');
  }

  function openExportModal() {
    document.getElementById('exportModal').classList.add('active');
    document.getElementById('destPathInput').value = 'D:\\RecoveredFiles';
    validateDestPath('D:\\RecoveredFiles');
  }

  function closeExportModal() {
    document.getElementById('exportModal').classList.remove('active');
    document.getElementById('exportProgressSection').style.display = 'none';
  }

  function validateDestPath(path) {
    if (!selectedDrive) return;
    window.chrome.webview.postMessage({
      action: 'validateDestination',
      sourceDrive: selectedDrive.deviceId,
      destPath: path,
      requiredBytes: allCandidates.filter(c => c.isSelected).reduce((a, b) => a + b.sizeBytes, 0)
    });
  }

  function handleDestValidationResult(res) {
    const banner = document.getElementById('sameDriveWarning');
    const btn = document.getElementById('btnConfirmExport');
    const help = document.getElementById('destDriveHelp');

    if (!res.isSafe) {
      banner.style.display = 'flex';
      help.innerText = res.message;
      help.style.color = '#ef4444';
      btn.disabled = true;
    } else {
      banner.style.display = 'none';
      help.innerText = 'Destination verified safe. Source volume write-lock active.';
      help.style.color = '#10b981';
      btn.disabled = false;
    }
  }

  function browseFolder() {
    window.chrome.webview.postMessage({ action: 'browseFolder' });
  }

  function executeExport() {
    const path = document.getElementById('destPathInput').value;
    const selectedIds = allCandidates.filter(c => c.isSelected).map(c => c.id);
    window.chrome.webview.postMessage({
      action: 'exportFiles',
      sourceDrive: selectedDrive.deviceId,
      destPath: path,
      candidateIds: selectedIds
    });
  }

  function openLicenseModal() {
    document.getElementById('licenseModal').classList.add('active');
  }

  function closeLicenseModal() {
    document.getElementById('licenseModal').classList.remove('active');
  }

  function fillDemoKey(type) {
    document.getElementById('licenseKeyInput').value = type === 'tech' ? 'DWR-TECH-8892-A109' : 'DWR-PRO-4912-B772';
  }

  function activateLicense() {
    const key = document.getElementById('licenseKeyInput').value;
    window.chrome.webview.postMessage({ action: 'activateLicense', key: key });
  }
</script>

</body>
</html>";
    }
}
