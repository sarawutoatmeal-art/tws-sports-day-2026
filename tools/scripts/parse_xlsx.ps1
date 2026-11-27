Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipPath = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\sheet_duties_update.xlsx"
$extractDir = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\xlsx_extracted"
if (Test-Path $extractDir) { Remove-Item -Recurse -Force $extractDir }
[System.IO.Compression.ZipFile]::ExtractToDirectory($zipPath, $extractDir)

# Read workbook.xml to get sheet names and ids
$wbXml = [xml](Get-Content "$extractDir\xl\workbook.xml")
$sheets = $wbXml.workbook.sheets.sheet
foreach ($s in $sheets) {
    Write-Host "Sheet Name: $($s.name), sheetId: $($s.sheetId), r:id: $($s.'id')"
}

# Read sharedStrings.xml
$sharedStrings = @()
if (Test-Path "$extractDir\xl\sharedStrings.xml") {
    $ssXml = [xml](Get-Content "$extractDir\xl\sharedStrings.xml")
    foreach ($si in $ssXml.sst.si) {
        $t = ""
        if ($si.t) { $t = $si.t.'#text' }
        elseif ($si.r) { 
            foreach ($r in $si.r) { $t += $r.t.'#text' }
        }
        $sharedStrings += $t
    }
}
Write-Host "Total shared strings: $($sharedStrings.Count)"

# Look at sheet files
Get-ChildItem "$extractDir\xl\worksheets\*.xml" | ForEach-Object {
    Write-Host "Worksheet file: $($_.Name)"
}
