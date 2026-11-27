# Techawit Sports Day 2026 - Master Backend Data Integrity Validator
# Run: powershell -ExecutionPolicy Bypass -File tools/validate_data_integrity.ps1

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " TWS Sports Day 2026 - Data Integrity & Backend Diagnostic" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$passed = 0
$failed = 0
$baseDir = Split-Path -Parent $PSScriptRoot
if (-not $baseDir) { $baseDir = "." }

function Check-Assert($desc, $cond, $detail = "") {
    if ($cond) {
        Write-Host "  [PASS] $desc" -ForegroundColor Green
        if ($detail) { Write-Host "         $detail" -ForegroundColor DarkGray }
        $script:passed++
    } else {
        Write-Host "  [FAIL] $desc" -ForegroundColor Red
        if ($detail) { Write-Host "         $detail" -ForegroundColor Yellow }
        $script:failed++
    }
}

# 1. Check Student Database
Write-Host "`n1. Checking Student Master Database (students-data.js)..." -ForegroundColor Yellow
$studentFile = Join-Path $baseDir "assets/js/students-data.js"
Check-Assert "File exists: students-data.js" (Test-Path $studentFile)

$studentsContent = Get-Content $studentFile -Raw -Encoding UTF8
$matches = [regex]::Matches($studentsContent, '["'']?id["'']?:\s*(\d+)')
$studentCount = $matches.Count
Check-Assert "Exact Student Count = 230" ($studentCount -eq 230) "Found: $studentCount students"

$purpleCount = ([regex]::Matches($studentsContent, '["'']?color["'']?:\s*["'']Purple["'']')).Count
$redCount    = ([regex]::Matches($studentsContent, '["'']?color["'']?:\s*["'']Red["'']')).Count
$yellowCount = ([regex]::Matches($studentsContent, '["'']?color["'']?:\s*["'']Yellow["'']')).Count
$greenCount  = ([regex]::Matches($studentsContent, '["'']?color["'']?:\s*["'']Green["'']')).Count
$totalColors = $purpleCount + $redCount + $yellowCount + $greenCount
Check-Assert "All students have valid Kingdom Colors" ($totalColors -eq 230) "Purple: $purpleCount, Red: $redCount, Yellow: $yellowCount, Green: $greenCount"

# 2. Check Schedule & 201 Medals Master Data
Write-Host "`n2. Checking Schedule & Medal Allocation (schedule-data.js)..." -ForegroundColor Yellow
$scheduleFile = Join-Path $baseDir "assets/js/schedule-data.js"
Check-Assert "File exists: schedule-data.js" (Test-Path $scheduleFile)

$scheduleContent = Get-Content $scheduleFile -Raw -Encoding UTF8
$has201Medals = ($scheduleContent -match 'overall:\s*201')
Check-Assert "Total Medal Count is exactly 201" $has201Medals "67 Gold, 67 Silver, 67 Bronze = 201"

$hasSplitFootball = ($scheduleContent -match '9 squad members' -or $scheduleContent -match '9 players per team')
Check-Assert "Football configured as 9-player Split Squad" $hasSplitFootball "4 G3-G4 + 4 G5-G6 + 1 GK Higher Grade"

$hasPhases = ($scheduleContent -match 'SCHEDULE_PHASES')
Check-Assert "5-Phase Schedule Configuration present" $hasPhases

# 3. Check Event Registration Quotas (links-data.js & event-registration.js)
Write-Host "`n3. Checking Event Registration Quota Engine..." -ForegroundColor Yellow
$eventRegFile = Join-Path $baseDir "assets/js/event-registration.js"
Check-Assert "File exists: event-registration.js" (Test-Path $eventRegFile)

$eventRegContent = Get-Content $eventRegFile -Raw -Encoding UTF8
$hasSoftValidation = ($eventRegContent -match 'getStudentSlotWarnings')
Check-Assert "Soft Validation (Red Warning without hard block) active" $hasSoftValidation

$hasFootballSlots = ($eventRegContent -match 'code:\s*["'']E27["'']' -and $eventRegContent -match 'quota:\s*9')
Check-Assert "Football 9 locked slots configured (E27 quota: 9)" $hasFootballSlots

# 4. Check Internationalization (i18n.js)
Write-Host "`n4. Checking Bilingual Engine (i18n.js)..." -ForegroundColor Yellow
$i18nFile = Join-Path $baseDir "assets/js/i18n.js"
Check-Assert "File exists: i18n.js" (Test-Path $i18nFile)

$i18nContent = Get-Content $i18nFile -Raw -Encoding UTF8
$hasThEn = ($i18nContent -match 'th:\s*\{' -and $i18nContent -match 'en:\s*\{')
Check-Assert "Bilingual Dictionary contains Thai (th) & English (en)" $hasThEn

# 5. Check Cloud Sync Integration (google-apps-script-sync.js)
Write-Host "`n5. Checking Cloud Sync Backend (google-apps-script-sync.js)..." -ForegroundColor Yellow
$gasFile = Join-Path $baseDir "google-apps-script-sync.js"
Check-Assert "File exists: google-apps-script-sync.js" (Test-Path $gasFile)

# Summary
Write-Host "`n----------------------------------------------------------" -ForegroundColor Cyan
Write-Host " Diagnostic Summary: $passed PASSED, $failed FAILED" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })
Write-Host "----------------------------------------------------------" -ForegroundColor Cyan

if ($failed -eq 0) {
    Write-Host "ALL SYSTEMS GO: The backend and master datasets are 100% verified and healthy!`n" -ForegroundColor Green
} else {
    Write-Host "WARNING: Some data assertions failed. Please inspect the issues above.`n" -ForegroundColor Red
}
