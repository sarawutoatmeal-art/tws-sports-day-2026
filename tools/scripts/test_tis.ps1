
$path = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\sharedStrings.xml"
$bytes = [System.IO.File]::ReadAllBytes($path)

# Windows-874 encoding
$encTIS = [System.Text.Encoding]::GetEncoding(874)
$textTIS = $encTIS.GetString($bytes)

Write-Host "Sample with Windows-874:"
Write-Host $textTIS.Substring(0, [Math]::Min(1000, $textTIS.Length))
