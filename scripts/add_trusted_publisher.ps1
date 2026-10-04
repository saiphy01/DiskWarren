$cert = Get-Item Cert:\CurrentUser\My\300F851BD145F6E34EF249B8AA15EC255EB2336F
$pubStore = New-Object System.Security.Cryptography.X509Certificates.X509Store("TrustedPublisher", "CurrentUser")
$pubStore.Open("ReadWrite")
$pubStore.Add($cert)
$pubStore.Close()
Write-Host "Added to TrustedPublisher successfully!"
