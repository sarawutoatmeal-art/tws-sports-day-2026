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

# In sheet5.xml, read all rows and map columns:
# Col A-E: RED (A:NO, B:NAME, C:NICKNAME, D:CLASS, E:OTHER)
# Col G-K: YELLOW (G:NO, H:NAME, I:NICKNAME, J:CLASS, K:OTHER)
# Col M-Q: GREEN (M:NO, N:NAME, O:NICKNAME, P:CLASS, Q:OTHER)
# Col S-W: PURPLE (S:NO, T:NAME, U:NICKNAME, V:CLASS, W:OTHER)

$xml = [xml](Get-Content "$extractDir\xl\worksheets\sheet5.xml")
$rows = $xml.worksheet.sheetData.row

$kdgStudents = @()

foreach ($r in $rows) {
    if ([int]$r.r -le 2) { continue } # skip headers
    $cells = @{}
    foreach ($c in $r.c) {
        $val = ""
        if ($c.t -eq "s") { $val = $sharedStrings[[int]$c.v] }
        else { $val = $c.v }
        $col = [regex]::Match($c.r, '^[A-Z]+').Value
        $cells[$col] = $val.Trim()
    }

    # Red
    if ($cells['B']) {
        $kdgStudents += [PSCustomObject]@{
            color = "Red"
            name = $cells['B']
            nickname = $cells['C']
            class = $cells['D']
            note = $cells['E']
        }
    }
    # Yellow
    if ($cells['H']) {
        $kdgStudents += [PSCustomObject]@{
            color = "Yellow"
            name = $cells['H']
            nickname = $cells['I']
            class = $cells['J']
            note = $cells['K']
        }
    }
    # Green
    if ($cells['N']) {
        $kdgStudents += [PSCustomObject]@{
            color = "Green"
            name = $cells['N']
            nickname = $cells['O']
            class = $cells['P']
            note = $cells['Q']
        }
    }
    # Purple
    if ($cells['T']) {
        $kdgStudents += [PSCustomObject]@{
            color = "Purple"
            name = $cells['T']
            nickname = $cells['U']
            class = $cells['V']
            note = $cells['W']
        }
    }
}

Write-Host "Total Kindergarten students in Sheet5: $($kdgStudents.Count)"
$byColor = $kdgStudents | Group-Object color
foreach ($bc in $byColor) {
    Write-Host "$($bc.Name): $($bc.Count)"
}

# Display students who have sibling notes or matching classes
$withNotes = $kdgStudents | Where-Object { $_.note }
Write-Host "Students with notes in Sheet5: $($withNotes.Count)"
foreach ($wn in $withNotes) {
    Write-Host "$($wn.color) - $($wn.name) ($($wn.nickname)) -> $($wn.note)"
}
