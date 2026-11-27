
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

[xml]$s9 = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\worksheets\sheet9.xml" -Encoding UTF8
$ns = New-Object System.Xml.XmlNamespaceManager($s9.NameTable)
$ns.AddNamespace('x', 'http://schemas.openxmlformats.org/spreadsheetml/2006/main')

Write-Host "=== Inspecting sheet9 rows ==="
foreach ($row in $s9.SelectNodes('//x:row', $ns)) {
    $r = $row.r
    if ([int]$r -ge 3) {
        # K.2/2 is I, J, K, L, M
        $cI = $row.SelectSingleNode(".//x:c[@r='I$r']", $ns)
        $cJ = $row.SelectSingleNode(".//x:c[@r='J$r']", $ns)
        $cK = $row.SelectSingleNode(".//x:c[@r='K$r']", $ns)
        $cL = $row.SelectSingleNode(".//x:c[@r='L$r']", $ns)
        $cM = $row.SelectSingleNode(".//x:c[@r='M$r']", $ns)
        
        $no2 = if ($cI -and $cI.v) { $cI.v } else { "" }
        $name2 = if ($cJ -and $cJ.v) { $kStrings[[int]$cJ.v] } else { "" }
        $nick2 = if ($cK -and $cK.v) { $kStrings[[int]$cK.v] } else { "" }
        $color2 = if ($cL) { Get-FillColorKdg $cL.s } else { "" }
        $note2 = if ($cM -and $cM.v) { $kStrings[[int]$cM.v] } else { "" }

        # K.2/3 is Q, R, S, T, U
        $cQ = $row.SelectSingleNode(".//x:c[@r='Q$r']", $ns)
        $cR = $row.SelectSingleNode(".//x:c[@r='R$r']", $ns)
        $cS = $row.SelectSingleNode(".//x:c[@r='S$r']", $ns)
        $cT = $row.SelectSingleNode(".//x:c[@r='T$r']", $ns)
        $cU = $row.SelectSingleNode(".//x:c[@r='U$r']", $ns)
        
        $no3 = if ($cQ -and $cQ.v) { $cQ.v } else { "" }
        $name3 = if ($cR -and $cR.v) { $kStrings[[int]$cR.v] } else { "" }
        $nick3 = if ($cS -and $cS.v) { $kStrings[[int]$cS.v] } else { "" }
        $color3 = if ($cT) { Get-FillColorKdg $cT.s } else { "" }
        $note3 = if ($cU -and $cU.v) { $kStrings[[int]$cU.v] } else { "" }
        
        Write-Host "Row $r | K.2/2 #$no2 $nick2 ($name2) [$color2] Note: $note2  ||  K.2/3 #$no3 $nick3 ($name3) [$color3] Note: $note3"
    }
}
