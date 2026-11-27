
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
    
    # Map merged cells
    $merges = @{}
    $mergeNodes = $xml.SelectNodes('//x:mergeCell', $ns)
    foreach ($m in $mergeNodes) {
        $parts = $m.ref -split ':'
        if ($parts.Count -eq 2) {
            $startRef = $parts[0]
            $endRef = $parts[1]
            $startCol = $startRef -replace '\d+',''
            $startRow = [int]($startRef -replace '\D+','')
            $endCol = $endRef -replace '\d+',''
            $endRow = [int]($endRef -replace '\D+','')
            
            for ($r = $startRow; $r -le $endRow; $r++) {
                $refKey = "$startCol$r"
                $merges[$refKey] = $startRef
            }
        }
    }
    
    $rows = $xml.SelectNodes('//x:row', $ns)
    
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
        $cB = $row.SelectSingleNode(".//x:c[@r='B$rowNum']", $ns)
        if ($cB -and $cB.v) {
            $cA = $row.SelectSingleNode(".//x:c[@r='A$rowNum']", $ns)
            $cC = $row.SelectSingleNode(".//x:c[@r='C$rowNum']", $ns)
            
            $dRef = "D$rowNum"
            if ($merges.ContainsKey($dRef)) { $dRef = $merges[$dRef] }
            $cD = $xml.SelectSingleNode("//x:c[@r='$dRef']", $ns)
            
            $eRef = "E$rowNum"
            if ($merges.ContainsKey($eRef)) { $eRef = $merges[$eRef] }
            $cE = $xml.SelectSingleNode("//x:c[@r='$eRef']", $ns)
            
            $priStudents += [PSCustomObject]@{
                Grade = $sf.Grade
                ClassName = $c1Name
                Class = "G.$($sf.Grade)/1"
                No = if ($cA) { [int]$cA.v } else { 0 }
                FullName = $pStrings[[int]$cB.v]
                Nickname = if ($cC -and $cC.v) { $pStrings[[int]$cC.v] } else { "" }
                Color = if ($cD) { Get-FillColorPrimary $cD.s } else { "None" }
                Note = if ($cE -and $cE.v) { $pStrings[[int]$cE.v] } else { "" }
            }
        }
        
        # Class 2 student (cols H, I, J, K, L)
        $cI = $row.SelectSingleNode(".//x:c[@r='I$rowNum']", $ns)
        if ($cI -and $cI.v) {
            $cH = $row.SelectSingleNode(".//x:c[@r='H$rowNum']", $ns)
            $cJ = $row.SelectSingleNode(".//x:c[@r='J$rowNum']", $ns)
            
            $kRef = "K$rowNum"
            if ($merges.ContainsKey($kRef)) { $kRef = $merges[$kRef] }
            $cK = $xml.SelectSingleNode("//x:c[@r='$kRef']", $ns)
            
            $lRef = "L$rowNum"
            if ($merges.ContainsKey($lRef)) { $lRef = $merges[$lRef] }
            $cL = $xml.SelectSingleNode("//x:c[@r='$lRef']", $ns)
            
            $priStudents += [PSCustomObject]@{
                Grade = $sf.Grade
                ClassName = $c2Name
                Class = "G.$($sf.Grade)/2"
                No = if ($cH) { [int]$cH.v } else { 0 }
                FullName = $pStrings[[int]$cI.v]
                Nickname = if ($cJ -and $cJ.v) { $pStrings[[int]$cJ.v] } else { "" }
                Color = if ($cK) { Get-FillColorPrimary $cK.s } else { "None" }
                Note = if ($cL -and $cL.v) { $pStrings[[int]$cL.v] } else { "" }
            }
        }
    }
}

Write-Host "Total Primary students extracted: $($priStudents.Count)"
$priStudents | Export-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\pri_students_clean.clixml"
$priStudents | Group-Object Color | Select-Object Name, Count
