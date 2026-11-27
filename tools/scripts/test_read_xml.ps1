
$path = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\sharedStrings.xml"
$bytes = [System.IO.File]::ReadAllBytes($path)
Write-Host "File size: $($bytes.Length) bytes"

$text = [System.Text.Encoding]::UTF8.GetString($bytes)
Write-Host "Read text length: $($text.Length)"

# Let's see some sample from the beginning
Write-Host "Sample:"
Write-Host $text.Substring(0, [Math]::Min(1000, $text.Length))
