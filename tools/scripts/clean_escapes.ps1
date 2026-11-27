
$path = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\assets\js\students-data.js"
$text = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

$text = $text.Replace('\r\n', "`r`n")
[System.IO.File]::WriteAllText($path, $text, [System.Text.Encoding]::UTF8)
Write-Host "Cleaned literal escapes!"
