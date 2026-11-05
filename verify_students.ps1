$js = Get-Content 'C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\assets\js\students-data.js' -Raw
$start = $js.IndexOf('[')
$end = $js.LastIndexOf(']')
$json = $js.Substring($start, $end - $start + 1)
$students = ConvertFrom-Json $json

Write-Host "Total Students: $($students.Count)"
$colors = $students | Group-Object color
foreach ($c in $colors) {
    Write-Host "$($c.Name): $($c.Count)"
}

$classes = $students | Group-Object class
foreach ($cl in $classes) {
    Write-Host "$($cl.Name): $($cl.Count)"
}

# Check for duplicate IDs or missing fields
$ids = @{}
$missing = 0
foreach ($s in $students) {
    if ($ids.ContainsKey($s.id)) {
        Write-Host "DUPLICATE ID: $($s.id) for $($s.fullName)"
    }
    $ids[$s.id] = $true
    if (-not $s.fullName -or -not $s.nickname -or -not $s.color -or -not $s.class) {
        $missing++
        Write-Host "Missing field for student: $($s.id)"
    }
}
Write-Host "Total duplicate check complete. Missing records: $missing"
