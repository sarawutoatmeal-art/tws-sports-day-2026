
# Parse all primary sheets (G.1 to G.6)
# G.1 is sheet3, G.2 is sheet4, G.3 is sheet5, G.4 is sheet6, G.5 is sheet7, G.6 is sheet8

[xml]$ssP = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_fresh_extracted\xl\sharedStrings.xml" -Encoding UTF8
$pStrings = @($ssP.sst.si | ForEach-Object { $_.InnerText })

[xml]$stylesP = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_fresh_extracted\xl\styles.xml" -Encoding UTF8
$xfsP = $stylesP.styleSheet.cellXfs.xf
$fillsP = $stylesP.styleSheet.fills.fill

function Get-FillColorPrimary($sId) {
    if (!$sId) { return "None" }
    $xf = $xfsP[[int]$sId]
    $fill = $fillsP[[int]$xf.fillId]
    $rgb = $fill.patternFill.fgColor.rgb
    if ($rgb -eq "FF9900FF" -or $rgb -eq "FFBD63FA") { return "Purple" }
    if ($rgb -eq "FFFF0000" -or $rgb -eq "FFFF6969" -or $rgb -eq "FFFF7265") { return "Red" }
    if ($rgb -eq "FFFFFF00") { return "Yellow" }
    if ($rgb -eq "FF00FF00" -or $rgb -eq "FF41FFB3") { return "Green" }
    return "Other($rgb)"
}

$priStudents = @()

$sheetFiles = @(
    @{ Path = "sheet3.xml"; Grade = 1 },
    @{ Path = "sheet4.xml"; Grade = 2 },
    @{ Path = "sheet5.xml"; Grade = 3 },
    @{ Path = "sheet6.xml"; Grade = 4 },
    @{ Path = "sheet7.xml"; Grade = 5 },
    @{ Path = "sheet8.xml"; Grade = 6 }
)

foreach ($sf in $sheetFiles) {
    $fullPath = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_fresh_extracted\xl\worksheets\$($sf.Path)"
    [xml]$xml = Get-Content $fullPath -Encoding UTF8
    $ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
    $ns.AddNamespace('x', 'http://schemas.openxmlformats.org/spreadsheetml/2006/main')
    
    # Class 1 is cols A-E, Class 2 is cols H-L
    $rows = $xml.SelectNodes('//x:row', $ns)
    
    # Let's get class names from Row 1
    $r1 = $rows | Where-Object { $_.r -eq "1" }
    $c1Name = ""
    $c2Name = ""
    foreach ($c in $r1.SelectNodes('.//x:c', $ns)) {
        if ($c.r -eq "A1" -and $c.v) { $c1Name = $pStrings[[int]$c.v] }
        if ($c.r -eq "H1" -and $c.v) { $c2Name = $pStrings[[int]$c.v] }
    }
    
    foreach ($row in $rows) {
        $rowNum = [int]$row.r
        if ($rowNum -lt 3) { continue }
        
        # Class 1 student (cols A, B, C, D, E)
        $cA = $row.SelectSingleNode(".//x:c[@r='A$rowNum']", $ns)
        $cB = $row.SelectSingleNode(".//x:c[@r='B$rowNum']", $ns)
        $cC = $row.SelectSingleNode(".//x:c[@r='C$rowNum']", $ns)
        $cD = $row.SelectSingleNode(".//x:c[@r='D$rowNum']", $ns)
        $cE = $row.SelectSingleNode(".//x:c[@r='E$rowNum']", $ns)
        
        if ($cB -and $cB.v) {
            $noVal = if ($cA) { $cA.v } else { "" }
            $nameVal = $pStrings[[int]$cB.v]
            $nickVal = if ($cC -and $cC.v) { $pStrings[[int]$cC.v] } else { "" }
            $colorVal = if ($cD) { Get-FillColorPrimary $cD.s } else { "None" }
            $noteVal = if ($cE -and $cE.v) { $pStrings[[int]$cE.v] } else { "" }
            
            $priStudents += [PSCustomObject]@{
                Grade = $sf.Grade
                ClassName = $c1Name
                Class = "G.$($sf.Grade)/1"
                No = $noVal
                FullName = $nameVal
                Nickname = $nickVal
                Color = $colorVal
                Note = $noteVal
            }
        }
        
        # Class 2 student (cols H, I, J, K, L)
        $cH = $row.SelectSingleNode(".//x:c[@r='H$rowNum']", $ns)
        $cI = $row.SelectSingleNode(".//x:c[@r='I$rowNum']", $ns)
        $cJ = $row.SelectSingleNode(".//x:c[@r='J$rowNum']", $ns)
        $cK = $row.SelectSingleNode(".//x:c[@r='K$rowNum']", $ns)
        $cL = $row.SelectSingleNode(".//x:c[@r='L$rowNum']", $ns)
        
        if ($cI -and $cI.v) {
            $noVal = if ($cH) { $cH.v } else { "" }
            $nameVal = $pStrings[[int]$cI.v]
            $nickVal = if ($cJ -and $cJ.v) { $pStrings[[int]$cJ.v] } else { "" }
            $colorVal = if ($cK) { Get-FillColorPrimary $cK.s } else { "None" }
            $noteVal = if ($cL -and $cL.v) { $pStrings[[int]$cL.v] } else { "" }
            
            $priStudents += [PSCustomObject]@{
                Grade = $sf.Grade
                ClassName = $c2Name
                Class = "G.$($sf.Grade)/2"
                No = $noVal
                FullName = $nameVal
                Nickname = $nickVal
                Color = $colorVal
                Note = $noteVal
            }
        }
    }
}

Write-Host "Total Primary students extracted: $($priStudents.Count)"
$priStudents | Export-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\pri_students.clixml"
$priStudents | Where-Object { $_.Note } | Select-Object Class, No, FullName, Nickname, Color, Note | Format-Table -Wrap | Out-String -Width 160 | Set-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\pri_notes_table.txt" -Encoding UTF8
Write-Host "Primary with notes: $(($priStudents | Where-Object { $_.Note }).Count)"
