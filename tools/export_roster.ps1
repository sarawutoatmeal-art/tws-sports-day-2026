# Techawit Sports Day 2026 - Roster Exporter (CSV & JSON)
# Run: powershell -ExecutionPolicy Bypass -File tools/export_roster.ps1

$baseDir = Split-Path -Parent $PSScriptRoot
if (-not $baseDir) { $baseDir = "." }

$dataFile = Join-Path $baseDir "assets/js/students-data.js"
if (-not (Test-Path $dataFile)) {
    Write-Error "Cannot find students-data.js at $dataFile"
    exit 1
}

$raw = Get-Content $dataFile -Raw -Encoding UTF8
$startIdx = $raw.IndexOf('[')
$endIdx = $raw.LastIndexOf(']')

if ($startIdx -lt 0 -or $endIdx -lt 0) {
    Write-Error "Could not locate JSON array brackets in students-data.js"
    exit 1
}

$jsonText = $raw.Substring($startIdx, ($endIdx - $startIdx + 1))

try {
    $students = $jsonText | ConvertFrom-Json
} catch {
    Write-Error "Failed to parse INITIAL_STUDENTS JSON: $_"
    exit 1
}

$outDir = Join-Path $baseDir "data"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

# Export to JSON
$jsonOut = Join-Path $outDir "students_roster.json"
$students | ConvertTo-Json -Depth 5 | Set-Content -Path $jsonOut -Encoding UTF8
Write-Host "Exported $($students.Count) students to JSON: $jsonOut" -ForegroundColor Green

# Export to CSV (with UTF8 BOM for Thai/English Excel)
$csvOut = Join-Path $outDir "students_roster.csv"
$flat = $students | Select-Object id, class, grade, no, fullName, nickname, gender, color, kingdom, sibling, @{Name="events"; Expression={ $_.events -join ", " }}
$flat | Export-Csv -Path $csvOut -NoTypeInformation -Encoding UTF8
Write-Host "Exported $($students.Count) students to CSV (Excel-ready): $csvOut" -ForegroundColor Green
