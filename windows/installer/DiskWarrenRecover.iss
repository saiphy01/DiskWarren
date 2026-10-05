; Inno Setup Script for DiskWarren Recover Windows
; Production-grade high-compression Windows Executable Installer
; Automatically uninstalls previous versions before installing new version

#define MyAppName "DiskWarren Recover"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "DiskWarren Software"
#define MyAppURL "https://recovery.diskwarren.com"
#define MyAppExeName "DiskWarrenRecover.exe"

[Setup]
AppId={{E82F41AA-518D-4C92-A238-95384B6F0C92}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}/faq
AppUpdatesURL={#MyAppURL}/download
DefaultDirName={localappdata}\Programs\DiskWarrenRecover
DisableProgramGroupPage=yes
DisableDirPage=yes
DisableWelcomePage=yes
PrivilegesRequired=lowest
OutputDir=..\..\web\public\downloads
OutputBaseFilename=DiskWarrenRecover-Setup
SetupIconFile=..\artifacts\recover_publish\app.ico
UninstallDisplayIcon={app}\{#MyAppExeName}
Compression=lzma2/max
SolidCompression=yes
WizardStyle=modern
CloseApplications=force
RestartApplications=no
ArchitecturesInstallIn64BitMode=x64compatible
VersionInfoCompany=DiskWarren Software
VersionInfoDescription=DiskWarren Recover — Safe, Read-Only Data Recovery
VersionInfoVersion=1.0.0.0
VersionInfoCopyright=Copyright (C) 2026 DiskWarren Software

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"

[Files]
Source: "..\artifacts\recover_publish\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

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

// Helper to kill any running DiskWarren Recover instance before setup
procedure KillRunningApp();
var
  ResultCode: Integer;
  sTaskkill: String;
begin
  sTaskkill := ExpandConstant('{sys}\taskkill.exe');
  if FileExists(sTaskkill) then
  begin
    Exec(sTaskkill, '/F /IM DiskWarrenRecover.exe /T', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  end;
end;

// Silent uninstall of prior versions before installing new version
procedure UninstallPreviousVersions();
var
  sUninstallStr: String;
  sTargetFolder: String;
  sFolderUninst: String;
  ResultCode: Integer;
begin
  KillRunningApp();

  sUninstallStr := GetPriorInnoUninstallString();
  if (sUninstallStr <> '') then
  begin
    sUninstallStr := RemoveQuotes(sUninstallStr);
    Exec(sUninstallStr, '/VERYSILENT /SUPPRESSMSGBOXES /NORESTART', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  end;

  sTargetFolder := ExpandConstant('{localappdata}\Programs\DiskWarrenRecover');
  sFolderUninst := sTargetFolder + '\unins000.exe';
  if FileExists(sFolderUninst) then
  begin
    Exec(sFolderUninst, '/VERYSILENT /SUPPRESSMSGBOXES /NORESTART', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  end;
  
  Sleep(300);
end;

function PrepareToInstall(var NeedsRestart: Boolean): String;
begin
  UninstallPreviousVersions();
  Result := '';
end;
