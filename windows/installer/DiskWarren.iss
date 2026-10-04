; Inno Setup Script for DiskWarren Windows
; Production-grade high-compression Windows Executable Installer
; Automatically uninstalls previous versions before installing new version

#define MyAppName "DiskWarren"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "DiskWarren"
#define MyAppURL "https://diskwarren.com"
#define MyAppExeName "DiskWarren.exe"

[Setup]
AppId={{D37E88BC-68BF-4D2A-94B6-61D79E1A29D1}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}/support
AppUpdatesURL={#MyAppURL}/windows
DefaultDirName={localappdata}\Programs\{#MyAppName}
DisableProgramGroupPage=yes
DisableDirPage=yes
DisableWelcomePage=yes
PrivilegesRequired=lowest
OutputDir=..\..\web\public\downloads
OutputBaseFilename=DiskWarren-Setup-1.0.0
SetupIconFile=..\publish\dist\app.ico
UninstallDisplayIcon={app}\{#MyAppExeName}
Compression=lzma2/max
SolidCompression=yes
WizardStyle=modern
CloseApplications=force
RestartApplications=no
ArchitecturesInstallIn64BitMode=x64compatible

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"

[Files]
Source: "..\publish\dist\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\app.ico"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\app.ico"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

[Code]
// Helper function to find existing Inno Setup uninstaller in registry
function GetPriorInnoUninstallString(): String;
var
  sUnInstPath: String;
  sUnInstallString: String;
begin
  sUnInstPath := 'Software\Microsoft\Windows\CurrentVersion\Uninstall\{#emit SetupSetting("AppId")}_is1';
  sUnInstallString := '';
  if not RegQueryStringValue(HKCU, sUnInstPath, 'UninstallString', sUnInstallString) then
    RegQueryStringValue(HKLM, sUnInstPath, 'UninstallString', sUnInstallString);
  Result := sUnInstallString;
end;

// Helper to kill any running DiskWarren instance before setup
procedure KillRunningApp();
var
  ResultCode: Integer;
  sTaskkill: String;
begin
  sTaskkill := ExpandConstant('{sys}\taskkill.exe');
  if FileExists(sTaskkill) then
  begin
    Exec(sTaskkill, '/F /IM DiskWarren.exe /T', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
    Exec(sTaskkill, '/F /IM DiskWarren.UI.exe /T', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  end;
end;

// Silent uninstall of prior versions before installing new version
procedure UninstallPreviousVersions();
var
  sUninstallStr: String;
  sTargetFolder: String;
  sFolderUninst: String;
  sMsiexec: String;
  ResultCode: Integer;
begin
  // 1. Kill any active instance first
  KillRunningApp();

  // 2. Check standard Inno Setup registry uninstaller
  sUninstallStr := GetPriorInnoUninstallString();
  if (sUninstallStr <> '') then
  begin
    sUninstallStr := RemoveQuotes(sUninstallStr);
    Exec(sUninstallStr, '/VERYSILENT /SUPPRESSMSGBOXES /NORESTART', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  end;

  // 3. Check for previous unins000.exe or Uninstall.exe directly in install directory
  sTargetFolder := ExpandConstant('{localappdata}\Programs\{#MyAppName}');
  sFolderUninst := sTargetFolder + '\unins000.exe';
  if FileExists(sFolderUninst) then
  begin
    Exec(sFolderUninst, '/VERYSILENT /SUPPRESSMSGBOXES /NORESTART', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  end;

  sFolderUninst := sTargetFolder + '\Uninstall.exe';
  if FileExists(sFolderUninst) then
  begin
    Exec(sFolderUninst, '/silent /uninstall', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  end;

  // 4. Check if older MSI exists and silently remove it
  sMsiexec := ExpandConstant('{sys}\msiexec.exe');
  if FileExists(sMsiexec) then
  begin
    Exec(sMsiexec, '/x {B8E1B9A1-3E2A-4D78-9F1B-6A3B5C7D8E9F} /qn /norestart', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  end;
  
  // Brief pause to ensure OS releases file handles
  Sleep(300);
end;

function PrepareToInstall(var NeedsRestart: Boolean): String;
begin
  UninstallPreviousVersions();
  Result := '';
end;
