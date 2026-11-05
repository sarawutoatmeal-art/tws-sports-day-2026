
[xml]$stylesP = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_fresh_extracted\xl\styles.xml" -Encoding UTF8

$xfs = $stylesP.styleSheet.cellXfs.xf
$fills = $stylesP.styleSheet.fills.fill

Write-Host "Total cellXfs: $($xfs.Count), Total fills: $($fills.Count)"

foreach ($sId in @(17, 19, 24, 26, 42, 59)) {
    $xf = $xfs[$sId]
    $fillId = $xf.fillId
    $fill = $fills[[int]$fillId]
    $fg = $fill.patternFill.fgColor
    Write-Host "Primary Style $sId -> fillId: $fillId, rgb: $($fg.rgb), theme: $($fg.theme)"
}
