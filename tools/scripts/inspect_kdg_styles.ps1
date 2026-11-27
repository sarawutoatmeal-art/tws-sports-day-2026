
[xml]$stylesK = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\styles.xml" -Encoding UTF8

$xfs = $stylesK.styleSheet.cellXfs.xf
Write-Host "Total cellXfs: $($xfs.Count)"

$fills = $stylesK.styleSheet.fills.fill
Write-Host "Total fills: $($fills.Count)"

for ($i = 0; $i -lt $fills.Count; $i++) {
    $fill = $fills[$i]
    $fg = $fill.patternFill.fgColor
    $rgb = $fg.rgb
    $theme = $fg.theme
    Write-Host "Fill $i -> rgb: $rgb, theme: $theme"
}

# Let's inspect style 79, 80, 82, 86
foreach ($sId in @(79, 80, 82, 86, 104, 106, 107)) {
    $xf = $xfs[$sId]
    $fillId = $xf.fillId
    $fill = $fills[[int]$fillId]
    $fg = $fill.patternFill.fgColor
    Write-Host "Style $sId -> fillId: $fillId, rgb: $($fg.rgb), theme: $($fg.theme)"
}
