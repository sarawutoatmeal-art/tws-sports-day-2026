param()
$url = "https://docs.google.com/spreadsheets/d/1s1m8HwWhE6AO8pnEaz55VEN7gPWjN5FD4gRvFnVetPs/export?format=xlsx"
$out = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_duty_live.xlsx"
Invoke-WebRequest -Uri $url -OutFile $out
Write-Host "Downloaded size: $((Get-Item $out).Length)"
