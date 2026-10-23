# DiskWarren Recover - Official 1-Click PowerShell Installer
# Installs directly to %LOCALAPPDATA%\Programs\DiskWarrenRecover and unblocks
$ErrorActionPreference = 'Stop'
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " DiskWarren Recover - 1-Click Windows Setup (Zero-Block)  " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$installDir = Join-Path $env:LOCALAPPDATA "Programs\DiskWarrenRecover"
if (!(Test-Path $installDir)) {
    New-Item -ItemType Directory -Path $installDir -Force | Out-Null
}

$exePath = Join-Path $installDir "DiskWarrenRecover.exe"
$downloadUrl = "https://windows.diskwarren.com/downloads/DiskWarrenRecover-Setup.exe"

Write-Host "Downloading DiskWarren Recover Engine..." -ForegroundColor Yellow
$tempSetup = Join-Path $env:TEMP "DiskWarrenRecover-Setup.exe"
Invoke-WebRequest -Uri $downloadUrl -OutFile $tempSetup -UseBasicParsing

Write-Host "Unblocking package and installing..." -ForegroundColor Yellow
Unblock-File -Path $tempSetup -ErrorAction SilentlyContinue
Copy-Item -Path $tempSetup -Destination $exePath -Force

Write-Host "Launching DiskWarren Recover..." -ForegroundColor Green
Start-Process -FilePath $exePath
