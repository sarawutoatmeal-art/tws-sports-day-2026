param()
$raw = Get-Content 'C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\assets\js\students-data.js' -Raw -Encoding UTF8
$firstBracket = $raw.IndexOf('[')
$lastBracket = $raw.LastIndexOf(']')
$jsonPart = $raw.Substring($firstBracket, $lastBracket - $firstBracket + 1)
$students = ConvertFrom-Json $jsonPart

$classes = $students | Select-Object -ExpandProperty class -Unique
Write-Host "Unique classrooms:"
foreach ($c in $classes) {
    $count = ($students | Where-Object { $_.class -eq $c }).Count
    Write-Host "  $c ($count students)"
}
