
# Let's inspect workbook.xml.rels to find sheet files
[xml]$relsK = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\_rels\workbook.xml.rels" -Encoding UTF8
[xml]$wbK = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\workbook.xml" -Encoding UTF8

$sheetMap = @{}
foreach ($s in $wbK.workbook.sheets.sheet) {
    $rId = $s.'r:id'
    $rel = $relsK.Relationships.Relationship | Where-Object { $_.Id -eq $rId }
    $target = $rel.Target
    $sheetMap[$s.name] = $target
    Write-Host "$($s.name) -> $target"
}
