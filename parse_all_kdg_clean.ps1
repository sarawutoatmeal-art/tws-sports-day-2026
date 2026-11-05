
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

$kdgStudents = @()

# Definition of sections per sheet
$kdgConfigs = @(
    @{
        File = "sheet7.xml"
        Sections = @(
            @{ ClassName = "NS"; Class = "NS"; NoCol = "A"; NameCol = "B"; NickCol = "C"; ColorCol = "D"; NoteCol = "E" }
        )
    },
    @{
        File = "sheet8.xml"
        Sections = @(
            @{ ClassName = "K.1/1 Dolphin"; Class = "K.1/1"; NoCol = "A"; NameCol = "B"; NickCol = "C"; ColorCol = "D"; NoteCol = "E" },
            @{ ClassName = "K.1/2 Puffin"; Class = "K.1/2"; NoCol = "H"; NameCol = "I"; NickCol = "J"; ColorCol = "K"; NoteCol = "L" },
            @{ ClassName = "K.1/3 Starfish"; Class = "K.1/3"; NoCol = "P"; NameCol = "Q"; NickCol = "R"; ColorCol = "S"; NoteCol = "T" }
        )
    },
    @{
        File = "sheet9.xml"
        Sections = @(
            @{ ClassName = "K.2/1 Panda"; Class = "K.2/1"; NoCol = "A"; NameCol = "B"; NickCol = "C"; ColorCol = "D"; NoteCol = "E" },
            @{ ClassName = "K.2/2 Koala"; Class = "K.2/2"; NoCol = "I"; NameCol = "J"; NickCol = "K"; ColorCol = "L"; NoteCol = "M" },
            @{ ClassName = "K.2/3 Penguin"; Class = "K.2/3"; NoCol = "Q"; NameCol = "R"; NickCol = "S"; ColorCol = "T"; NoteCol = "U" }
        )
    },
    @{
        File = "sheet10.xml"
        Sections = @(
            @{ ClassName = "K.3/1 Seal"; Class = "K.3/1"; NoCol = "A"; NameCol = "B"; NickCol = "C"; ColorCol = "D"; NoteCol = "E" },
            @{ ClassName = "K.3/2 Whale"; Class = "K.3/2"; NoCol = "I"; NameCol = "J"; NickCol = "K"; ColorCol = "L"; NoteCol = "M" }
        )
    }
)

foreach ($cfg in $kdgConfigs) {
    $fullPath = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\worksheets\$($cfg.File)"
    [xml]$xml = Get-Content $fullPath -Encoding UTF8
    $ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
    $ns.AddNamespace('x', 'http://schemas.openxmlformats.org/spreadsheetml/2006/main')
    
    # Map merges
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
    
    foreach ($sec in $cfg.Sections) {
        foreach ($row in $rows) {
            $rowNum = [int]$row.r
            if ($rowNum -lt 3) { continue }
            
            $nameCellRef = "$($sec.NameCol)$rowNum"
            $cName = $row.SelectSingleNode(".//x:c[@r='$nameCellRef']", $ns)
            if ($cName -and $cName.v) {
                $noCellRef = "$($sec.NoCol)$rowNum"
                $cNo = $row.SelectSingleNode(".//x:c[@r='$noCellRef']", $ns)
                
                $nickCellRef = "$($sec.NickCol)$rowNum"
                $cNick = $row.SelectSingleNode(".//x:c[@r='$nickCellRef']", $ns)
                
                $colorCellRef = "$($sec.ColorCol)$rowNum"
                if ($merges.ContainsKey($colorCellRef)) { $colorCellRef = $merges[$colorCellRef] }
                $cColor = $xml.SelectSingleNode("//x:c[@r='$colorCellRef']", $ns)
                
                $noteCellRef = "$($sec.NoteCol)$rowNum"
                if ($merges.ContainsKey($noteCellRef)) { $noteCellRef = $merges[$noteCellRef] }
                $cNote = $xml.SelectSingleNode("//x:c[@r='$noteCellRef']", $ns)
                
                $kdgStudents += [PSCustomObject]@{
                    Class = $sec.Class
                    ClassName = $sec.ClassName
                    No = if ($cNo) { $cNo.v } else { "" }
                    FullName = $kStrings[[int]$cName.v]
                    Nickname = if ($cNick -and $cNick.v) { $kStrings[[int]$cNick.v] } else { "" }
                    Color = if ($cColor) { Get-FillColorKdg $cColor.s } else { "None" }
                    Note = if ($cNote -and $cNote.v) { $kStrings[[int]$cNote.v] } else { "" }
                }
            }
        }
    }
}

Write-Host "Total Kindergarten students extracted: $($kdgStudents.Count)"
$kdgStudents | Group-Object Color | Select-Object Name, Count
$kdgStudents | Export-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_students_clean.clixml"
$kdgStudents | Where-Object { $_.Note } | Select-Object Class, No, FullName, Nickname, Color, Note | Format-Table -Wrap | Out-String -Width 160 | Set-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_notes_table.txt" -Encoding UTF8
Write-Host "Kindergarten with notes: $(($kdgStudents | Where-Object { $_.Note }).Count)"
