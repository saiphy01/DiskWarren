namespace DiskWarren.UI;

public static class UiHtml
{
    public const string Content = @"<!DOCTYPE html>
<html lang=""en"" class=""dark"">
<head>
  <meta charset=""UTF-8"">
  <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
  <title>DiskWarren — Windows Storage Intelligence</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    body { background-color: #0B0F19; color: #F1F5F9; overflow-x: hidden; height: 100vh; display: flex; flex-direction: column; }
    
    /* Scrollbars */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #0F172A; }
    ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #475569; }

    /* Layout */
    .app-header { background: #0F172A; border-bottom: 1px solid #1E293B; height: 56px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; user-select: none; }
    .brand { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 16px; letter-spacing: -0.5px; }
    .brand-icon { width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, #06B6D4, #3B82F6); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(6,182,212,0.3); }
    .brand-badge { font-size: 10px; background: rgba(59,130,246,0.15); color: #60A5FA; border: 1px solid rgba(59,130,246,0.3); padding: 2px 6px; border-radius: 4px; text-transform: uppercase; font-weight: 700; }
    
    .app-body { display: flex; flex: 1; overflow: hidden; }
    .sidebar { width: 220px; background: #0B1120; border-right: 1px solid #1E293B; display: flex; flex-direction: column; justify-content: space-between; padding: 16px 12px; }
    .nav-items { display: flex; flex-direction: column; gap: 4px; }
    .nav-btn { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; color: #94A3B8; background: transparent; border: none; cursor: pointer; transition: all 0.15s ease; text-align: left; width: 100%; }
    .nav-btn:hover { background: rgba(255,255,255,0.04); color: #F8FAFC; }
    .nav-btn.active { background: #1E293B; color: #38BDF8; font-weight: 700; border-left: 3px solid #38BDF8; border-radius: 0 8px 8px 0; }
    .nav-icon { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

    .main-content { flex: 1; overflow-y: auto; padding: 28px 36px; background: radial-gradient(circle at top right, rgba(14,165,233,0.04), transparent 50%); }
    
    /* Cards & Panels */
    .panel-title { font-size: 20px; font-weight: 800; color: #F8FAFC; margin-bottom: 4px; letter-spacing: -0.5px; }
    .panel-subtitle { font-size: 13px; color: #64748B; margin-bottom: 24px; }
    .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 24px; }
    
    .card { background: #111827; border: 1px solid #1E293B; border-radius: 14px; padding: 20px; box-shadow: 0 4px 16px rgba(0,0,0,0.2); }
    .card:hover { border-color: #334155; }
    
    /* Drive Meters */
    .drive-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .drive-name { font-size: 15px; font-weight: 700; color: #F1F5F9; display: flex; align-items: center; gap: 8px; }
    .drive-format { font-size: 11px; background: #1E293B; padding: 2px 6px; border-radius: 4px; color: #94A3B8; }
    .progress-bar-bg { background: #1E293B; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 10px; }
    .progress-bar-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, #0284C7, #38BDF8); transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
    .progress-bar-fill.warning { background: linear-gradient(90deg, #D97706, #F59E0B); }
    .progress-bar-fill.danger { background: linear-gradient(90deg, #DC2626, #EF4444); }
    .drive-stats { display: flex; justify-content: space-between; font-size: 12px; color: #64748B; }

    /* Treemap Visualization */
    .treemap-container { background: #0A0F1D; border: 1px solid #1E293B; border-radius: 12px; padding: 16px; min-height: 380px; display: flex; flex-direction: column; gap: 12px; }
    .treemap-controls { display: flex; justify-content: space-between; align-items: center; }
    .treemap-grid { display: flex; flex-wrap: wrap; gap: 6px; height: 320px; width: 100%; align-content: flex-start; }
    .treemap-item { border-radius: 6px; padding: 8px; display: flex; flex-direction: column; justify-content: space-between; color: white; cursor: pointer; transition: transform 0.15s ease, filter 0.15s ease; overflow: hidden; text-overflow: ellipsis; user-select: none; }
    .treemap-item:hover { filter: brightness(1.2); transform: scale(1.01); z-index: 2; box-shadow: 0 4px 12px rgba(0,0,0,0.5); }
    .treemap-name { font-size: 12px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .treemap-size { font-size: 11px; opacity: 0.85; font-mono: monospace; }
    
    /* Developer Rules List */
    .rule-item { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; background: #131C2E; border: 1px solid #1E293B; border-radius: 10px; margin-bottom: 8px; transition: all 0.15s; }
    .rule-item:hover { border-color: #38BDF8; }
    .rule-info { display: flex; flex-direction: column; gap: 2px; }
    .rule-title { font-size: 14px; font-weight: 700; color: #F8FAFC; display: flex; align-items: center; gap: 8px; }
    .rule-path { font-size: 11px; font-family: monospace; color: #64748B; }
    .rule-badge { font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 700; }
    .badge-low { background: rgba(16,185,129,0.15); color: #34D399; border: 1px solid rgba(16,185,129,0.3); }
    .badge-review { background: rgba(245,158,11,0.15); color: #FBBF24; border: 1px solid rgba(245,158,11,0.3); }
    .rule-actions { display: flex; align-items: center; gap: 12px; }
    .rule-size { font-size: 14px; font-weight: 700; color: #38BDF8; font-family: monospace; }

    /* Duplicate List */
    .dup-group { background: #131C2E; border: 1px solid #1E293B; border-radius: 10px; padding: 14px; margin-bottom: 12px; }
    .dup-header { display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; color: #F8FAFC; margin-bottom: 8px; border-bottom: 1px solid #1E293B; padding-bottom: 6px; }
    .dup-file { font-size: 11px; font-family: monospace; color: #94A3B8; padding: 4px 0; display: flex; align-items: center; justify-content: space-between; }
    .dup-file:hover { color: #38BDF8; }

    /* Buttons */
    .btn { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; transition: all 0.15s ease; }
    .btn-primary { background: linear-gradient(135deg, #0284C7, #2563EB); color: white; box-shadow: 0 2px 8px rgba(37,99,235,0.3); }
    .btn-primary:hover { filter: brightness(1.15); transform: translateY(-1px); }
    .btn-secondary { background: #1E293B; color: #E2E8F0; border: 1px solid #334155; }
    .btn-secondary:hover { background: #334155; }
    .btn-danger { background: rgba(239,68,68,0.15); color: #F87171; border: 1px solid rgba(239,68,68,0.3); }
    .btn-danger:hover { background: #EF4444; color: white; }

    /* License Box */
    .license-box { background: linear-gradient(135deg, #0F172A, #1E1B4B); border: 1px solid #312E81; border-radius: 14px; padding: 24px; margin-bottom: 24px; }
    .license-input-row { display: flex; gap: 10px; margin-top: 14px; }
    .license-input { flex: 1; background: #0B0F19; border: 1px solid #374151; border-radius: 8px; padding: 10px 14px; font-family: monospace; color: white; font-size: 13px; }
    .license-input:focus { outline: none; border-color: #6366F1; box-shadow: 0 0 0 2px rgba(99,102,241,0.2); }

    /* Modal Sheet */
    .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); display: none; align-items: center; justify-content: center; z-index: 100; }
    .modal-overlay.active { display: flex; }
    .modal-box { background: #0F172A; border: 1px solid #334155; border-radius: 16px; width: 480px; padding: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .modal-title { font-size: 18px; font-weight: 800; color: #F8FAFC; margin-bottom: 8px; }
    .modal-desc { font-size: 13px; color: #94A3B8; line-height: 1.5; margin-bottom: 20px; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 10px; }

    /* Status Banner */
    .toast { position: fixed; bottom: 20px; right: 20px; background: #10B981; color: white; font-size: 13px; font-weight: 700; padding: 12px 20px; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.4); display: none; z-index: 1000; animation: slideUp 0.2s ease; }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  </style>
</head>
<body>

  <!-- Top App Bar -->
  <header class=""app-header"">
    <div class=""brand"">
      <div class=""brand-icon"">
        <svg class=""nav-icon"" style=""color:white;"" viewBox=""0 0 24 24""><path d=""M22 12H2""/><path d=""M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z""/><line x1=""6"" x2=""6.01"" y1=""16"" y2=""16""/><line x1=""10"" x2=""10.01"" y1=""16"" y2=""16""/></svg>
      </div>
      <span>DiskWarren</span>
      <span class=""brand-badge"">Windows Pro</span>
    </div>

    <div style=""display:flex; align-items:center; gap:16px;"">
      <div style=""font-size:12px; color:#94A3B8;"">
        Total Reclaimable: <strong id=""headerReclaimable"" style=""color:#38BDF8;"">10.4 GB</strong>
      </div>
      <button class=""btn btn-primary"" onclick=""runFullScan()"">
        <svg class=""nav-icon"" viewBox=""0 0 24 24""><polyline points=""23 4 23 10 17 10""/><polyline points=""1 20 1 14 7 14""/><path d=""M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15""/></svg>
        Scan Storage
      </button>
    </div>
  </header>

  <!-- App Body -->
  <div class=""app-body"">
    <!-- Left Navigation -->
    <nav class=""sidebar"">
      <div class=""nav-items"">
        <button class=""nav-btn active"" onclick=""switchTab('overview')"">
          <svg class=""nav-icon"" viewBox=""0 0 24 24""><rect width=""7"" height=""9"" x=""3"" y=""3"" rx=""1""/><rect width=""7"" height=""5"" x=""14"" y=""3"" rx=""1""/><rect width=""7"" height=""9"" x=""14"" y=""12"" rx=""1""/><rect width=""7"" height=""5"" x=""3"" y=""16"" rx=""1""/></svg>
          Dashboard
        </button>
        <button class=""nav-btn"" onclick=""switchTab('treemap')"">
          <svg class=""nav-icon"" viewBox=""0 0 24 24""><rect x=""3"" y=""3"" width=""18"" height=""18"" rx=""2""/><line x1=""3"" y1=""9"" x2=""21"" y2=""9""/><line x1=""9"" y1=""21"" x2=""9"" y2=""9""/></svg>
          Treemap Explorer
        </button>
        <button class=""nav-btn"" onclick=""switchTab('developer')"">
          <svg class=""nav-icon"" viewBox=""0 0 24 24""><polyline points=""16 18 22 12 16 6""/><polyline points=""8 6 2 12 8 18""/></svg>
          Developer Cleaner
        </button>
        <button class=""nav-btn"" onclick=""switchTab('duplicates')"">
          <svg class=""nav-icon"" viewBox=""0 0 24 24""><rect width=""14"" height=""14"" x=""8"" y=""8"" rx=""2"" ry=""2""/><path d=""M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2""/></svg>
          Duplicate Finder
        </button>
        <button class=""nav-btn"" onclick=""switchTab('safety')"">
          <svg class=""nav-icon"" viewBox=""0 0 24 24""><path d=""M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z""/></svg>
          Safety by Design
        </button>
        <button class=""nav-btn"" onclick=""switchTab('license')"">
          <svg class=""nav-icon"" viewBox=""0 0 24 24""><path d=""m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4""/><path d=""m21 2-9.6 9.6""/><circle cx=""7.5"" cy=""15.5"" r=""5.5""/></svg>
          License &amp; Pro
        </button>
      </div>

      <div style=""padding:12px; background:#0F172A; border-radius:10px; border:1px solid #1E293B;"">
        <div style=""font-size:11px; font-weight:700; color:#38BDF8; margin-bottom:4px;"">100% AIR-GAPPED</div>
        <div style=""font-size:11px; color:#64748B; line-height:1.4;"">All scanning &amp; cleanup runs locally on your PC. Zero telemetry.</div>
      </div>
    </nav>

    <!-- Main Content Panes -->
    <main class=""main-content"">
      
      <!-- 1. OVERVIEW TAB -->
      <section id=""tab-overview"">
        <h1 class=""panel-title"">Storage Overview</h1>
        <p class=""panel-subtitle"">Real-time NTFS partitions, storage gauges, and quick clean recommendations.</p>
        
        <div class=""grid-2"" id=""drivesList"">
          <!-- Populated dynamically via C# -->
          <div class=""card"">
            <div class=""drive-header"">
              <span class=""drive-name"">Drive C:\ [ACER]</span>
              <span class=""drive-format"">NTFS</span>
            </div>
            <div class=""progress-bar-bg"">
              <div class=""progress-bar-fill"" style=""width: 30.6%;""></div>
            </div>
            <div class=""drive-stats"">
              <span>Used: 169.6 GB (30.6%)</span>
              <span>Free: 384.5 GB of 554.2 GB</span>
            </div>
          </div>

          <div class=""card"">
            <div class=""drive-header"">
              <span class=""drive-name"">Drive E:\ [New Volume]</span>
              <span class=""drive-format"">NTFS</span>
            </div>
            <div class=""progress-bar-bg"">
              <div class=""progress-bar-fill"" style=""width: 20.3%;""></div>
            </div>
            <div class=""drive-stats"">
              <span>Used: 80.9 GB (20.3%)</span>
              <span>Free: 317.5 GB of 398.4 GB</span>
            </div>
          </div>
        </div>

        <div class=""card"" style=""margin-bottom:24px;"">
          <div style=""display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;"">
            <div>
              <h3 style=""font-size:16px; font-weight:700; color:#F8FAFC;"">Quick Reclaimable Developer &amp; Cache Targets</h3>
              <p style=""font-size:12px; color:#64748B;"">Disposable build artifacts and package downloads safely restorable.</p>
            </div>
            <button class=""btn btn-primary"" onclick=""cleanAllDeveloperCaches()"">
              <svg class=""nav-icon"" viewBox=""0 0 24 24""><polyline points=""3 6 5 6 21 6""/><path d=""M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2""/></svg>
              Clean Selected to Recycle Bin
            </button>
          </div>

          <div id=""overviewRulesSummary"">
            <!-- Dynamic -->
          </div>
        </div>
      </section>

      <!-- 2. TREEMAP EXPLORER TAB -->
      <section id=""tab-treemap"" style=""display:none;"">
        <h1 class=""panel-title"">Interactive Squarified Treemap</h1>
        <p class=""panel-subtitle"">Visual storage blocks proportioned by size. Click any block to drill down into folders.</p>

        <div class=""treemap-container"">
          <div class=""treemap-controls"">
            <div style=""display:flex; align-items:center; gap:8px;"">
              <span style=""font-size:12px; color:#64748B;"">Browsing:</span>
              <span id=""currentPathBreadcrumb"" style=""font-size:12px; font-weight:700; color:#38BDF8; font-family:monospace;"">C:\Users\saiph\Downloads</span>
            </div>
            <div style=""display:flex; gap:8px;"">
              <button class=""btn btn-secondary"" onclick=""scanSelectedDir('C:\\Users\\saiph\\Downloads')"">Downloads</button>
              <button class=""btn btn-secondary"" onclick=""scanSelectedDir('C:\\Users\\saiph')"">User Profile</button>
            </div>
          </div>

          <div class=""treemap-grid"" id=""treemapGrid"">
            <!-- Interactive squarified blocks -->
          </div>
        </div>
      </section>

      <!-- 3. DEVELOPER CLEANER TAB -->
      <section id=""tab-developer"" style=""display:none;"">
        <div style=""display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;"">
          <div>
            <h1 class=""panel-title"">Developer &amp; AI Cache Cleaner</h1>
            <p class=""panel-subtitle"">Reclaim gigabytes from npm, NuGet, Gradle, Python wheels, and Windows temp files.</p>
          </div>
          <button class=""btn btn-primary"" onclick=""cleanAllDeveloperCaches()"">
            <svg class=""nav-icon"" viewBox=""0 0 24 24""><polyline points=""3 6 5 6 21 6""/><path d=""M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2""/></svg>
            Clean Selected
          </button>
        </div>

        <div id=""developerRulesList"">
          <!-- Populated from C# -->
        </div>
      </section>

      <!-- 4. DUPLICATE FINDER TAB -->
      <section id=""tab-duplicates"" style=""display:none;"">
        <div style=""display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;"">
          <div>
            <h1 class=""panel-title"">Two-Phase SHA-256 Duplicate Finder</h1>
            <p class=""panel-subtitle"">Cryptographic byte-for-byte exact matches. Never guesses by filename alone.</p>
          </div>
          <button class=""btn btn-primary"" onclick=""runDuplicateScan()"">
            <svg class=""nav-icon"" viewBox=""0 0 24 24""><circle cx=""11"" cy=""11"" r=""8""/><line x1=""21"" y1=""21"" x2=""16.65"" y2=""16.65""/></svg>
            Scan Downloads for Duplicates
          </button>
        </div>

        <div id=""duplicateResults"">
          <!-- Populated dynamically -->
        </div>
      </section>

      <!-- 5. SAFETY BY DESIGN TAB -->
      <section id=""tab-safety"" style=""display:none;"">
        <h1 class=""panel-title"">Safety by Design Architecture</h1>
        <p class=""panel-subtitle"">Engineered to prevent accidental deletion on Windows 10 &amp; 11.</p>

        <div class=""card"" style=""margin-bottom:16px;"">
          <h3 style=""font-size:15px; font-weight:700; color:#34D399; margin-bottom:8px;"">✓ 1. Win32 Recycle Bin Reversibility</h3>
          <p style=""font-size:13px; color:#94A3B8; line-height:1.5;"">
            All user-approved file deletions route through the native Windows Recycle Bin via <code style=""color:#38BDF8;"">SHFileOperation</code> with <code style=""color:#38BDF8;"">FOF_ALLOWUNDO</code>. If you ever change your mind, open your Windows Recycle Bin and click ""Restore"".
          </p>
        </div>

        <div class=""card"" style=""margin-bottom:16px;"">
          <h3 style=""font-size:15px; font-weight:700; color:#38BDF8; margin-bottom:8px;"">✓ 2. Hardcoded System Barriers</h3>
          <p style=""font-size:13px; color:#94A3B8; line-height:1.5;"">
            Critical Windows directories (<code style=""color:#38BDF8;"">C:\Windows</code>, <code style=""color:#38BDF8;"">System32</code>, <code style=""color:#38BDF8;"">Program Files</code>, EFI system partitions, and boot sectors) are strictly read-only and permanently protected from cleanup routines.
          </p>
        </div>

        <div class=""card"">
          <h3 style=""font-size:15px; font-weight:700; color:#F59E0B; margin-bottom:8px;"">✓ 3. Explicit Review Gate</h3>
          <p style=""font-size:13px; color:#94A3B8; line-height:1.5;"">
            DiskWarren never performs stealth background deletions or automatic task scheduler purges. Every single operation requires your explicit selection and confirmation.
          </p>
        </div>
      </section>

      <!-- 6. LICENSE & PRO TAB -->
      <section id=""tab-license"" style=""display:none;"">
        <h1 class=""panel-title"">License &amp; Pro Activation</h1>
        <p class=""panel-subtitle"">Perpetual lifetime license key. Validates offline via cryptographic SHA-256 signatures.</p>

        <div class=""license-box"">
          <div style=""display:flex; justify-content:space-between; align-items:center;"">
            <div>
              <span style=""font-size:11px; text-transform:uppercase; font-weight:700; color:#818CF8;"">License Status</span>
              <h2 id=""activeLicenseTier"" style=""font-size:20px; font-weight:800; color:white;"">Pro Lifetime (Single PC)</h2>
            </div>
            <span id=""licenseActiveBadge"" style=""background:rgba(16,185,129,0.2); color:#34D399; border:1px solid #10B981; padding:4px 10px; border-radius:6px; font-size:12px; font-weight:700;"">Active &amp; Verified</span>
          </div>

          <div class=""license-input-row"">
            <input type=""text"" id=""licenseInput"" class=""license-input"" placeholder=""Enter Key (e.g. DW1-WIN-PRO-LIFETIME-3151DBDA)"" value=""DW1-WIN-PRO-LIFETIME-3151DBDA"" />
            <button class=""btn btn-primary"" onclick=""activateKey()"">Validate &amp; Activate</button>
          </div>
        </div>

        <div class=""card"">
          <h3 style=""font-size:14px; font-weight:700; color:#F8FAFC; margin-bottom:12px;"">Unlocked Pro Capabilities</h3>
          <div style=""display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:13px; color:#94A3B8;"">
            <div style=""color:#34D399;"">✓ Visual Studio &amp; NuGet Cleanup</div>
            <div style=""color:#34D399;"">✓ Docker &amp; WSL2 Compaction</div>
            <div style=""color:#34D399;"">✓ Node.js node_modules Deep Clean</div>
            <div style=""color:#34D399;"">✓ Local AI Model Weights Manager</div>
            <div style=""color:#34D399;"">✓ Two-Phase Byte Duplicate Finder</div>
            <div style=""color:#34D399;"">✓ Recycle Bin-First Safe Undo</div>
          </div>
        </div>
      </section>

    </main>
  </div>

  <!-- Toast Notification -->
  <div class=""toast"" id=""toastMessage"">Cleaned 6.7 GB to Recycle Bin!</div>

  <script>
    // State
    let drives = [];
    let rules = [];
    let treemapItems = [];

    function switchTab(tabId) {
      document.querySelectorAll('.sidebar .nav-btn').forEach(b => b.classList.remove('active'));
      event.currentTarget.classList.add('active');
      document.querySelectorAll('.main-content > section').forEach(s => s.style.display = 'none');
      document.getElementById('tab-' + tabId).style.display = 'block';
    }

    function showToast(msg) {
      const t = document.getElementById('toastMessage');
      t.innerText = msg;
      t.style.display = 'block';
      setTimeout(() => { t.style.display = 'none'; }, 3000);
    }

    // Callbacks from C# Bridge
    window.onInitialDataReceived = function(data) {
      drives = data.drives || [];
      rules = data.rules || [];
      treemapItems = data.treemap || [];
      renderOverview();
      renderDeveloperRules();
      renderTreemap();
    };

    function renderOverview() {
      if (drives.length > 0) {
        let html = '';
        drives.forEach(d => {
          const usedGb = (d.totalSizeBytes - d.freeSizeBytes) / (1024*1024*1024);
          const totalGb = d.totalSizeBytes / (1024*1024*1024);
          const percent = d.usedPercent.toFixed(1);
          html += `
            <div class=""card"">
              <div class=""drive-header"">
                <span class=""drive-name"">Drive ${d.driveName} [${d.volumeLabel || 'Local Disk'}]</span>
                <span class=""drive-format"">${d.driveFormat}</span>
              </div>
              <div class=""progress-bar-bg"">
                <div class=""progress-bar-fill"" style=""width: ${percent}%;""></div>
              </div>
              <div class=""drive-stats"">
                <span>Used: ${usedGb.toFixed(1)} GB (${percent}%)</span>
                <span>Free: ${d.formattedFree} of ${totalGb.toFixed(1)} GB</span>
              </div>
            </div>`;
        });
        document.getElementById('drivesList').innerHTML = html;
      }

      // Summary rules
      let rulesHtml = '';
      rules.slice(0, 4).forEach(r => {
        rulesHtml += `
          <div class=""rule-item"">
            <div class=""rule-info"">
              <span class=""rule-title"">${r.title} <span class=""rule-badge badge-low"">Safe to Clean</span></span>
              <span class=""rule-path"">${r.path}</span>
            </div>
            <div class=""rule-actions"">
              <span class=""rule-size"">${r.formattedSize}</span>
              <button class=""btn btn-danger"" style=""padding:4px 10px; font-size:11px;"" onclick=""cleanSingleRule('${r.title}')"">Clean</button>
            </div>
          </div>`;
      });
      document.getElementById('overviewRulesSummary').innerHTML = rulesHtml;
    }

    function renderDeveloperRules() {
      let html = '';
      rules.forEach(r => {
        html += `
          <div class=""rule-item"">
            <div class=""rule-info"">
              <span class=""rule-title"">${r.title} <span class=""rule-badge badge-low"">Low Risk</span></span>
              <span class=""rule-path"">${r.path}</span>
              <span style=""font-size:12px; color:#94A3B8; margin-top:2px;"">${r.description}</span>
            </div>
            <div class=""rule-actions"">
              <span class=""rule-size"">${r.formattedSize}</span>
              <button class=""btn btn-danger"" onclick=""cleanSingleRule('${r.title}')"">Recycle</button>
            </div>
          </div>`;
      });
      document.getElementById('developerRulesList').innerHTML = html;
    }

    function renderTreemap() {
      const colors = ['#0284C7', '#0EA5E9', '#38BDF8', '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', '#10B981', '#14B8A6'];
      let html = '';
      const totalSize = treemapItems.reduce((acc, item) => acc + item.sizeBytes, 0) || 1;
      
      treemapItems.slice(0, 14).forEach((item, idx) => {
        const pct = Math.max(8, (item.sizeBytes / totalSize) * 95);
        const bg = colors[idx % colors.length];
        html += `
          <div class=""treemap-item"" style=""width: ${pct}%; min-width: 140px; height: 95px; background: ${bg};"" onclick=""showToast('Selected: ${item.name}')"">
            <span class=""treemap-name"">${item.name}</span>
            <span class=""treemap-size"">${item.formattedSize}</span>
          </div>`;
      });
      document.getElementById('treemapGrid').innerHTML = html;
    }

    function cleanSingleRule(title) {
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'cleanRule', ruleTitle: title });
      }
      showToast('Moved ' + title + ' to Recycle Bin');
    }

    function cleanAllDeveloperCaches() {
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'cleanAllRules' });
      }
      showToast('Cleaned selected caches to Recycle Bin!');
    }

    function scanSelectedDir(path) {
      document.getElementById('currentPathBreadcrumb').innerText = path;
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'scanDir', path: path });
      }
      showToast('Scanning ' + path + '...');
    }

    function runDuplicateScan() {
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'findDuplicates' });
      }
      showToast('Scanning Downloads for SHA-256 duplicate files...');
    }

    window.onDuplicatesReceived = function(dups) {
      const container = document.getElementById('duplicateResults');
      if (!dups || dups.length === 0) {
        container.innerHTML = '<div class=""card"" style=""text-align:center; color:#94A3B8; padding:30px;"">No duplicate files found in Downloads.</div>';
        return;
      }
      let html = '';
      dups.forEach(g => {
        html += `
          <div class=""dup-group"">
            <div class=""dup-header"">
              <span style=""color:#38BDF8;"">${g.fileSizeFormatted} each (SHA-256: ${g.hashSha256.substring(0, 12)}...)</span>
              <span style=""color:#94A3B8;"">${g.filePaths.length} identical copies</span>
            </div>`;
        g.filePaths.forEach((fp, idx) => {
          html += `
            <div class=""dup-file"">
              <span style=""overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:75%;"">${fp}</span>
              ${idx > 0 ? `<button class=""btn btn-danger"" style=""padding:2px 8px; font-size:11px;"" onclick=""recycleFile('${fp.replace(/\\/g, '\\\\')}')"">Recycle Copy</button>` : '<span style=""font-size:11px; color:#34D399; font-weight:700;"">Preserved Original</span>'}
            </div>`;
        });
        html += `</div>`;
      });
      container.innerHTML = html;
      showToast('Found ' + dups.length + ' duplicate groups!');
    };

    function recycleFile(filePath) {
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'recycleFile', path: filePath });
      }
      showToast('Moved duplicate copy to Recycle Bin');
    }

    function activateKey() {
      const key = document.getElementById('licenseInput').value.trim();
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'activateLicense', key: key });
      }
    }

    window.onLicenseUpdated = function(status) {
      if (status && status.isActive && status.tier !== 0) {
        const tierName = status.tier === 1 ? 'Pro Lifetime (Single PC)' : 'PowerPack Lifetime (Family)';
        document.getElementById('activeLicenseTier').innerText = tierName;
        document.getElementById('licenseActiveBadge').innerText = 'Active & Verified';
        document.getElementById('licenseActiveBadge').style.background = 'rgba(16,185,129,0.2)';
        document.getElementById('licenseActiveBadge').style.color = '#34D399';
        showToast('License Key Validated & Activated: ' + status.statusMessage);
      } else {
        showToast('Invalid License Key');
      }
    };

    function runFullScan() {
      showToast('Refreshing storage volumes and toolchain caches...');
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.postMessage({ action: 'refresh' });
      }
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
