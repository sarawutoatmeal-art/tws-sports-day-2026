param()
$raw = Get-Content 'C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\assets\js\students-data.js' -Raw -Encoding UTF8
$firstBracket = $raw.IndexOf('[')
$lastBracket = $raw.LastIndexOf(']')
$jsonPart = $raw.Substring($firstBracket, $lastBracket - $firstBracket + 1)
$students = ConvertFrom-Json $jsonPart

$eventsUsed = @{}
foreach ($s in $students) {
    if ($s.events) {
        foreach ($ev in $s.events) {
            $eventsUsed[$ev] = [int]$eventsUsed[$ev] + 1
        }
    }
}
Write-Host "Total unique event names in students-data.js: $($eventsUsed.Keys.Count)"
foreach ($k in $eventsUsed.Keys) {
    Write-Host "$k : $($eventsUsed[$k])"
}
