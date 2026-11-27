$url = "https://docs.google.com/spreadsheets/d/1s1m8HwWhE6AO8pnEaz55VEN7gPWjN5FD4gRvFnVetPs/export?format=xlsx"
$out = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\sheet_duties_update.xlsx"
Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing
Write-Host "File size: " (Get-Item $out).Length
