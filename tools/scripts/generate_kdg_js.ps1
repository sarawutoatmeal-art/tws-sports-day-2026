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

# 1. Color map from Sheet5
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

$allKdgStudents = @()

function ParseSection($sheetXml, $className, $colName, $colNick, $colNote) {
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
            $cleanName = ($name -replace '^(เด็กชาย|เด็กหญิง)\s*', '').Trim()
            $parts = $cleanName -split '\s+'
            $surname = if ($parts.Count -ge 2) { $parts[$parts.Count - 1] } else { "" }
            $color = if ($colorMap.ContainsKey($name)) { $colorMap[$name] } else { "Unknown" }
            $note = $cells[$colNote]

            $script:allKdgStudents += [PSCustomObject]@{
                id = "KDG-" + ($script:allKdgStudents.Count + 1)
                level = "Kindergarten"
                class = $className
                fullName = $name
                cleanName = $cleanName
                surname = $surname
                nickname = $cells[$colNick]
                color = $color
                siblingNote = $note
            }
        }
    }
}

ParseSection ([xml](Get-Content "$extractDir\xl\worksheets\sheet6.xml")) "NS Rabbit" "B" "C" "E"
ParseSection ([xml](Get-Content "$extractDir\xl\worksheets\sheet7.xml")) "K.1/1 Dolphin" "B" "C" "E"
ParseSection ([xml](Get-Content "$extractDir\xl\worksheets\sheet7.xml")) "K.1/2 Puffin" "I" "J" "L"
ParseSection ([xml](Get-Content "$extractDir\xl\worksheets\sheet7.xml")) "K.1/3 Starfish" "Q" "R" "T"
ParseSection ([xml](Get-Content "$extractDir\xl\worksheets\sheet8.xml")) "K.2/1 Panda" "B" "C" "E"
ParseSection ([xml](Get-Content "$extractDir\xl\worksheets\sheet8.xml")) "K.2/2 Koala" "J" "K" "M"
ParseSection ([xml](Get-Content "$extractDir\xl\worksheets\sheet8.xml")) "K.2/3 Penguin" "R" "S" "U"
ParseSection ([xml](Get-Content "$extractDir\xl\worksheets\sheet9.xml")) "K.3/1 Seal" "B" "C" "E"
ParseSection ([xml](Get-Content "$extractDir\xl\worksheets\sheet9.xml")) "K.3/2 Whale" "J" "K" "M"

$json = $allKdgStudents | ConvertTo-Json -Depth 5
$outPath = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\assets\js\kindergarten-data.js"
"// Techawit School Kindergarten Sports Day Roster (Total: $($allKdgStudents.Count) Students)`nconst KINDERGARTEN_STUDENTS = $json;" | Set-Content $outPath -Encoding UTF8
Write-Host "Created kindergarten-data.js successfully with $($allKdgStudents.Count) students"
