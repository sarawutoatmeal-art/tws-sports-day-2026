
[xml]$wbP = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_fresh_extracted\xl\workbook.xml"
Write-Host "=== Primary Sheets ==="
foreach ($s in $wbP.workbook.sheets.sheet) {
    Write-Host "$($s.name) (r:id: $($s.'r:id'), sheetId: $($s.sheetId))"
}

[xml]$wbK = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\workbook.xml"
Write-Host "=== Kindergarten Sheets ==="
foreach ($s in $wbK.workbook.sheets.sheet) {
    Write-Host "$($s.name) (r:id: $($s.'r:id'), sheetId: $($s.sheetId))"
}
