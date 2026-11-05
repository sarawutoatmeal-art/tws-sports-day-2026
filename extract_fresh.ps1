
Add-Type -AssemblyName System.IO.Compression.FileSystem

$kZip = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh.xlsx"
$kDest = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted"
if (Test-Path $kDest) { Remove-Item -Recurse -Force $kDest }
[System.IO.Compression.ZipFile]::ExtractToDirectory($kZip, $kDest)

$pZip = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_fresh.xlsx"
$pDest = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_fresh_extracted"
if (Test-Path $pDest) { Remove-Item -Recurse -Force $pDest }
[System.IO.Compression.ZipFile]::ExtractToDirectory($pZip, $pDest)

Write-Host "Unzipped both successfully!"
