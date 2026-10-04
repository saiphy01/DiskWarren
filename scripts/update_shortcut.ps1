$wsh = New-Object -ComObject WScript.Shell
$desktopPath = [System.Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktopPath "DiskWarren.lnk"
$sc = $wsh.CreateShortcut($shortcutPath)
$sc.TargetPath = "C:\Users\saiph\AppData\Local\Programs\DiskWarren\DiskWarren.exe"
$sc.IconLocation = "C:\Users\saiph\AppData\Local\Programs\DiskWarren\app.ico,0"
$sc.WorkingDirectory = "C:\Users\saiph\AppData\Local\Programs\DiskWarren"
$sc.Save()

# Notify Explorer shell icon cache to refresh
$signature = @"
[DllImport("shell32.dll", CharSet = CharSet.Auto, SetLastError = true)]
public static extern void SHChangeNotify(int wEventId, uint uFlags, IntPtr dwItem1, IntPtr dwItem2);
"@
$shell32 = Add-Type -MemberDefinition $signature -Name "ShellNotification" -Namespace "Win32" -PassThru
$shell32::SHChangeNotify(0x08000000, 0x0000, [IntPtr]::Zero, [IntPtr]::Zero) # SHCNE_ASSOCCHANGED

Write-Host "Desktop shortcut and shell cache refreshed successfully!"
