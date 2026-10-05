$cert = Get-Item "Cert:\CurrentUser\My\300F851BD145F6E34EF249B8AA15EC255EB2336F"
if ($cert) {
    if (Test-Path "windows\artifacts\recover_publish\DiskWarrenRecover.exe") {
        Set-AuthenticodeSignature -FilePath "windows\artifacts\recover_publish\DiskWarrenRecover.exe" -Certificate $cert -TimestampServer "http://timestamp.digicert.com" -HashAlgorithm SHA256
    }
    if (Test-Path "web\public\downloads\DiskWarrenRecover-Setup.exe") {
        Set-AuthenticodeSignature -FilePath "web\public\downloads\DiskWarrenRecover-Setup.exe" -Certificate $cert -TimestampServer "http://timestamp.digicert.com" -HashAlgorithm SHA256
    }
}
