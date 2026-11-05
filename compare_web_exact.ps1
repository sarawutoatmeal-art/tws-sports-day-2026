
$raw = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\assets\js\students-data.js" -Raw -Encoding UTF8

# Find first '[' and last ']'
$firstBracket = $raw.IndexOf('[')
$lastBracket = $raw.LastIndexOf(']')

$jsonPart = $raw.Substring($firstBracket, $lastBracket - $firstBracket + 1)
$portalStudents = ConvertFrom-Json $jsonPart
Write-Host "Parsed $($portalStudents.Count) students from students-data.js"

$pFresh = Import-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\pri_students_clean.clixml"

$diffs = @()

foreach ($fresh in $pFresh) {
    # Match by FullName
    $web = $portalStudents | Where-Object { $_.fullName.Trim() -eq $fresh.FullName.Trim() }
    
    if (!$web) {
        $diffs += [PSCustomObject]@{
            Status = "NOT_IN_WEB"
            FreshClass = $fresh.Class
            FreshNo = $fresh.No
            FullName = $fresh.FullName
            FreshColor = $fresh.Color
            WebColor = "MISSING"
        }
    } else {
        if ($web.color -ne $fresh.Color) {
            $diffs += [PSCustomObject]@{
                Status = "COLOR_MISMATCH"
                FreshClass = $fresh.Class
                FreshNo = $fresh.No
                FullName = $fresh.FullName
                FreshColor = $fresh.Color
                WebColor = $web.color
            }
        }
    }
}

Write-Host "Total differences: $($diffs.Count)"
if ($diffs.Count -gt 0) {
    $diffs | Format-Table -Wrap
} else {
    Write-Host ">>> PERFECT MATCH! ALL 232 PRIMARY STUDENTS MATCH COLORS EXACTLY 100% WITH GOOGLE SHEETS! <<<"
}
