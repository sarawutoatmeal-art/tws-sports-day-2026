$extractDir = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_extracted"
$ssXml = [xml](Get-Content "$extractDir\xl\sharedStrings.xml")
$sharedStrings = @()
foreach ($si in $ssXml.sst.si) {
    $t = ""
    if ($si.t) { 
        $t = $si.t.'#text'
        if (-not $t) { $t = $si.t }
    }
    elseif ($si.r) { 
        foreach ($r in $si.r) { 
            if ($r.t.'#text') { $t += $r.t.'#text' }
            elseif ($r.t) { $t += $r.t }
        }
    }
    $sharedStrings += $t
}

# 1. First build color map from Sheet5 (Name -> Color)
$xml5 = [xml](Get-Content "$extractDir\xl\worksheets\sheet5.xml")
$colorMap = @{}

foreach ($r in $xml5.worksheet.sheetData.row) {
    if ([int]$r.r -le 2) { continue }
    $cells = @{}
    foreach ($c in $r.c) {
        $val = if ($c.t -eq "s") { $sharedStrings[[int]$c.v] } else { $c.v }
        $col = [regex]::Match($c.r, '^[A-Z]+').Value
        $cells[$col] = if ($val) { $val.ToString().Trim() } else { "" }
    }
    if ($cells['B']) { $colorMap[$cells['B']] = "Red" }
    if ($cells['H']) { $colorMap[$cells['H']] = "Yellow" }
    if ($cells['N']) { $colorMap[$cells['N']] = "Green" }
    if ($cells['T']) { $colorMap[$cells['T']] = "Purple" }
}

Write-Host "Mapped $($colorMap.Count) Kindergarten students to colors"

# 2. Parse all classrooms
$allKdgStudents = @()

function ParseSection($sheetXml, $className, $colNo, $colName, $colNick, $colNote) {
    foreach ($r in $sheetXml.worksheet.sheetData.row) {
        if ([int]$r.r -le 2) { continue }
        $cells = @{}
        foreach ($c in $r.c) {
            $val = if ($c.t -eq "s") { $sharedStrings[[int]$c.v] } else { $c.v }
            $col = [regex]::Match($c.r, '^[A-Z]+').Value
            $cells[$col] = if ($val) { $val.ToString().Trim() } else { "" }
        }
        $name = $cells[$colName]
        if ($name -and $name -ne "NAME") {
            # Extract surname from name
            $parts = $name -split '\s+'
            $surname = if ($parts.Count -ge 2) { $parts[$parts.Count - 1] } else { "" }
            $color = if ($colorMap.ContainsKey($name)) { $colorMap[$name] } else { "Unknown" }
            $note = $cells[$colNote]

            $script:allKdgStudents += [PSCustomObject]@{
                level = "Kindergarten"
                class = $className
                name = $name
                surname = $surname
                nickname = $cells[$colNick]
                color = $color
                siblingNote = $note
            }
        }
    }
}

# Sheet6: NS (Rabbit) -> A:No, B:Name, C:Nick, E:Note
$s6 = [xml](Get-Content "$extractDir\xl\worksheets\sheet6.xml")
ParseSection $s6 "NS Rabbit" "A" "B" "C" "E"

# Sheet7: K.1/1 (A-E), K.1/2 (H-L), K.1/3 (P-T)
$s7 = [xml](Get-Content "$extractDir\xl\worksheets\sheet7.xml")
ParseSection $s7 "K.1/1 Dolphin" "A" "B" "C" "E"
ParseSection $s7 "K.1/2 Puffin" "H" "I" "J" "L"
ParseSection $s7 "K.1/3 Starfish" "P" "Q" "R" "T"

# Sheet8: K.2/1 (A-E), K.2/2 (I-M), K.2/3 (Q-U)
$s8 = [xml](Get-Content "$extractDir\xl\worksheets\sheet8.xml")
ParseSection $s8 "K.2/1 Panda" "A" "B" "C" "E"
ParseSection $s8 "K.2/2 Koala" "I" "J" "K" "M"
ParseSection $s8 "K.2/3 Penguin" "Q" "R" "S" "U"

# Sheet9: K.3/1 (A-E), K.3/2 (I-M)
$s9 = [xml](Get-Content "$extractDir\xl\worksheets\sheet9.xml")
ParseSection $s9 "K.3/1 Seal" "A" "B" "C" "E"
ParseSection $s9 "K.3/2 Whale" "I" "J" "K" "M"

Write-Host "Total extracted Kindergarten students: $($allKdgStudents.Count)"

# Output sample with notes
$withNotes = $allKdgStudents | Where-Object { $_.siblingNote }
Write-Host "Found $($withNotes.Count) kindergarten students with sibling notes!"
$withNotes | Select-Object -First 15 | Format-Table class, name, nickname, color, siblingNote -AutoSize
