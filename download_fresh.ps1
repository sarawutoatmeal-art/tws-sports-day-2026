
$primaryUrl = "https://docs.google.com/spreadsheets/d/1s1m8HwWhE6AO8pnEaz55VEN7gPWjN5FD4gRvFnVetPs/export?format=xlsx"
$kdgUrl = "https://docs.google.com/spreadsheets/d/1t8AUXvjN3OWF03M5D1vfdKTPTmbprRx0B0a0qIRw_kg/export?format=xlsx"

Write-Host "Downloading fresh Primary xlsx..."
Invoke-WebRequest -Uri $primaryUrl -OutFile "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_fresh.xlsx"
Write-Host "Downloading fresh Kindergarten xlsx..."
Invoke-WebRequest -Uri $kdgUrl -OutFile "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh.xlsx"

Write-Host "Download complete!"
