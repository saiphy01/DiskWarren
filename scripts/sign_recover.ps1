$repoRoot = Resolve-Path "$PSScriptRoot\.."
$cert = Get-Item "Cert:\CurrentUser\My\300F851BD145F6E34EF249B8AA15EC255EB2336F" -ErrorAction SilentlyContinue

if ($cert) {
    Write-Host "Found certificate: $($cert.Subject)"
    $filesToSign = @(
        "$repoRoot\windows\artifacts\recover_publish\DiskWarrenRecover.exe",
        "$repoRoot\windows\artifacts\setup_publish\DiskWarrenRecover-Setup-1.0.0.exe",
        "$repoRoot\web\public\downloads\DiskWarrenRecover-Setup.exe",
        "$repoRoot\web\public\downloads\DiskWarren-Setup-1.0.0.exe",
        "$repoRoot\web\public\downloads\DiskWarren-Setup.exe"
    )

    foreach ($file in $filesToSign) {
        if (Test-Path $file) {
            Write-Host "Signing $file..."
            try {
                $res = Set-AuthenticodeSignature -FilePath $file -Certificate $cert -HashAlgorithm SHA256
                Write-Host "  Result: $($res.Status) - $($res.StatusMessage)"
            } catch {
                Write-Warning "Failed to sign ${file}: $($_.Exception.Message)"
            }
        }
    }
} else {
    Write-Warning "Certificate not found."
}
