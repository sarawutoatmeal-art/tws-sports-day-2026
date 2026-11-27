param()
$raw = Get-Content 'C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\assets\js\students-data.js' -Raw -Encoding UTF8
$firstBracket = $raw.IndexOf('[')
$lastBracket = $raw.LastIndexOf(']')
$jsonPart = $raw.Substring($firstBracket, $lastBracket - $firstBracket + 1)
$students = ConvertFrom-Json $jsonPart

Write-Host "Total Primary Students: $($students.Count)"
$pur = @($students | Where-Object { $_.color -eq 'Purple' }).Count
$red = @($students | Where-Object { $_.color -eq 'Red' }).Count
$yel = @($students | Where-Object { $_.color -eq 'Yellow' }).Count
$grn = @($students | Where-Object { $_.color -eq 'Green' }).Count

Write-Host "Purple: $pur, Red: $red, Yellow: $yel, Green: $grn"
