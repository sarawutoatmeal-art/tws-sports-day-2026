
# Let's inspect sheets 7, 8, 9, 10
# sheet7: Ns
# sheet8: K.1
# sheet9: K.2
# sheet10: K.3

[xml]$ssK = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\sharedStrings.xml" -Encoding UTF8
$kStrings = @($ssK.sst.si | ForEach-Object { $_.InnerText })

[xml]$stylesK = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\styles.xml" -Encoding UTF8
$xfsK = $stylesK.styleSheet.cellXfs.xf
$fillsK = $stylesK.styleSheet.fills.fill

function Get-FillColorKdg($sId) {
    if (!$sId) { return "None" }
    $xf = $xfsK[[int]$sId]
    $fill = $fillsK[[int]$xf.fillId]
    $rgb = $fill.patternFill.fgColor.rgb
    if ($rgb -eq "FF9900FF" -or $rgb -eq "FFBD63FA") { return "Purple" }
    if ($rgb -eq "FFFF0000" -or $rgb -eq "FFFF6969" -or $rgb -eq "FFFF7265") { return "Red" }
    if ($rgb -eq "FFFFFF00") { return "Yellow" }
    if ($rgb -eq "FF00FF00" -or $rgb -eq "FF41FFB3") { return "Green" }
    return "Other($rgb)"
}

$kdgSheets = @("sheet7.xml", "sheet8.xml", "sheet9.xml", "sheet10.xml")
foreach ($sName in $kdgSheets) {
    $fullPath = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\worksheets\$sName"
    [xml]$xml = Get-Content $fullPath -Encoding UTF8
    $ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
    $ns.AddNamespace('x', 'http://schemas.openxmlformats.org/spreadsheetml/2006/main')
    
    $rows = $xml.SelectNodes('//x:row', $ns)
    $r1 = $rows | Where-Object { $_.r -eq "1" }
    $r2 = $rows | Where-Object { $_.r -eq "2" }
    
    $r1Texts = @()
    foreach ($c in $r1.SelectNodes('.//x:c', $ns)) {
        if ($c.v) { $r1Texts += "$($c.r): $($kStrings[[int]$c.v])" }
    }
    
    $r2Texts = @()
    foreach ($c in $r2.SelectNodes('.//x:c', $ns)) {
        if ($c.v) { $r2Texts += "$($c.r): $($kStrings[[int]$c.v])" }
    }
    
    Write-Host "=== $sName ==="
    Write-Host "Row 1: $($r1Texts -join ' | ')"
    Write-Host "Row 2: $($r2Texts -join ' | ')"
    Write-Host "Total rows: $($rows.Count)"
}
