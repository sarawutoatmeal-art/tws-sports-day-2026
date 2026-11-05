param()
$c = Get-Content 'C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\index.html' -Raw -Encoding UTF8
$m = [regex]::Matches($c, '[\uFFFD]')
Write-Host "FFFD count: $($m.Count)"
foreach ($item in $m) {
    Write-Host "Index: $($item.Index)"
}
