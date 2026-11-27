
# Read students-data.js from our web portal
$jsText = [System.IO.File]::ReadAllText("C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\assets\js\students-data.js", [System.Text.Encoding]::UTF8)

# Strip "const INITIAL_STUDENTS = " and ";"
$jsonText = $jsText -replace 'const INITIAL_STUDENTS\s*=\s*', ''
$jsonText = $jsonText.TrimEnd(';').Trim()

$portalStudents = ConvertFrom-Json $jsonText
Write-Host "Total students in web portal: $($portalStudents.Count)"

$pFresh = Import-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\pri_students_clean.clixml"

$diffs = @()

foreach ($fresh in $pFresh) {
    # Match by Class and No
    $web = $portalStudents | Where-Object { $_.class -eq $fresh.Class -and $_.no -eq $fresh.No }
    
    if (!$web) {
        # Try match by FullName
        $web = $portalStudents | Where-Object { $_.fullName.Trim() -eq $fresh.FullName.Trim() }
    }
    
    if (!$web) {
        $diffs += [PSCustomObject]@{
            Type = "MISSING_IN_WEB"
            Class = $fresh.Class
            No = $fresh.No
            Name = $fresh.FullName
            FreshColor = $fresh.Color
            WebColor = "N/A"
        }
    } else {
        if ($web.color -ne $fresh.Color) {
            $diffs += [PSCustomObject]@{
                Type = "COLOR_MISMATCH"
                Class = $fresh.Class
                No = $fresh.No
                Name = $fresh.FullName
                FreshColor = $fresh.Color
                WebColor = $web.color
            }
        }
    }
}

Write-Host "Total differences found between Fresh Primary Sheet and Web Portal: $($diffs.Count)"
if ($diffs.Count -gt 0) {
    $diffs | Format-Table -Wrap
} else {
    Write-Host "PERFECT! Every single student's color in the web portal matches the official Google Sheet 100%!"
}
