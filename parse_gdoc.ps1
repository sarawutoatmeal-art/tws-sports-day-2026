param()
$html = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\gdoc.html" -Raw -Encoding UTF8
$text = $html -replace '<style[\s\S]*?</style>', '' -replace '<script[\s\S]*?</script>', '' -replace '<[^>]+>', "`n" -replace '&nbsp;', ' '
$lines = $text -split "`n" | ForEach-Object { $_.Trim() } | Where-Object { $_.Length -gt 0 }
$cleanText = $lines -join "`n"
Set-Content -Path "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\gdoc_clean.txt" -Value $cleanText -Encoding UTF8
Write-Host "Total lines: $($lines.Count)"
