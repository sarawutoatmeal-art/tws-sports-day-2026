param()
$xlsx = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_duty_live.xlsx"
$zip = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_duty_live.zip"
Copy-Item $xlsx $zip -Force
$dest = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_duty_extracted"
if (Test-Path $dest) { Remove-Item -Recurse -Force $dest }
Expand-Archive -Path $zip -DestinationPath $dest -Force

[xml]$wb = Get-Content "$dest\xl\workbook.xml"
$sheets = $wb.workbook.sheets.sheet
foreach ($s in $sheets) {
    Write-Host "Sheet: $($s.name) -> id=$($s.id) sheetId=$($s.sheetId)"
}
