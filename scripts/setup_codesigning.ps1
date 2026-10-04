$ErrorActionPreference = "Stop"

Write-Host "Creating Authenticode Code Signing Certificate for DiskWarren Software..."
$cert = New-SelfSignedCertificate `
    -Type CodeSigningCert `
    -Subject "CN=DiskWarren Software, O=DiskWarren, C=US" `
    -KeyUsage DigitalSignature `
    -FriendlyName "DiskWarren Official Authenticode Certificate" `
    -CertStoreLocation "Cert:\CurrentUser\My" `
    -NotAfter (Get-Date).AddYears(10)

Write-Host "Thumbprint: $($cert.Thumbprint)"

# Add to CurrentUser\Root (Trusted Root Certification Authorities)
$rootStore = New-Object System.Security.Cryptography.X509Certificates.X509Store("Root", "CurrentUser")
$rootStore.Open("ReadWrite")
$rootStore.Add($cert)
$rootStore.Close()
Write-Host "Added certificate to Cert:\CurrentUser\Root"

# Add to CurrentUser\TrustedPublisher
$pubStore = New-Object System.Security.Cryptography.X509Certificates.X509Store("TrustedPublisher", "CurrentUser")
$pubStore.Open("ReadWrite")
$pubStore.Add($cert)
$pubStore.Close()
Write-Host "Added certificate to Cert:\CurrentUser\TrustedPublisher"

# Save thumbprint to file
$cert.Thumbprint | Out-File -FilePath "$PSScriptRoot\codesign_thumbprint.txt" -Encoding ascii
Write-Host "Saved thumbprint to codesign_thumbprint.txt"
