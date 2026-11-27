
[xml]$wbP = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_fresh_extracted\xl\workbook.xml" -Encoding UTF8
[xml]$relsP = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_fresh_extracted\xl\_rels\workbook.xml.rels" -Encoding UTF8

$pSheetMap = @{}
foreach ($s in $wbP.workbook.sheets.sheet) {
    $rId = $s.'r:id'
    $rel = $relsP.Relationships.Relationship | Where-Object { $_.Id -eq $rId }
    $pSheetMap[$s.name] = $rel.Target
    Write-Host "$($s.name) -> $($rel.Target)"
}
