param()
Add-Type -AssemblyName System.Web
$html = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\gdoc.html" -Raw -Encoding UTF8
$text = [System.Web.HttpUtility]::HtmlDecode($html)
$text = $text -replace '<style[\s\S]*?</style>', '' -replace '<script[\s\S]*?</script>', '' -replace '<[^>]+>', "`n" -replace '&nbsp;', ' '
$lines = $text -split "`n" | ForEach-Object { $_.Trim() } | Where-Object { $_.Length -gt 0 }
$cleanText = $lines -join "`n"
Set-Content -Path "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\gdoc_thai.txt" -Value $cleanText -Encoding UTF8
Write-Host "Decoded successfully! Total lines: $($lines.Count)"
