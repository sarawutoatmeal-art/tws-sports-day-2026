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

# Sheets: 6=Ns, 7=K.1, 8=K.2, 9=K.3
$classSheets = @(
    @{ file="sheet6.xml"; class="Nursery" },
    @{ file="sheet7.xml"; class="K.1" },
    @{ file="sheet8.xml"; class="K.2" },
    @{ file="sheet9.xml"; class="K.3" }
)

foreach ($item in $classSheets) {
    Write-Host "`n=================== Class: $($item.class) ($($item.file)) ==================="
    $xml = [xml](Get-Content "$extractDir\xl\worksheets\$($item.file)")
    $rows = $xml.worksheet.sheetData.row
    foreach ($r in $rows) {
        $cells = @{}
        foreach ($c in $r.c) {
            $val = ""
            if ($c.t -eq "s") { $val = $sharedStrings[[int]$c.v] }
            else { $val = $c.v }
            $col = [regex]::Match($c.r, '^[A-Z]+').Value
            $cells[$col] = $val
        }
        # Check any cell containing text like G., K., Ns, or sibling notes
        $allText = ($cells.Values -join ' ')
        if ($allText -match 'G\.|K\.|พี่|น้อง') {
            Write-Host "Row $($r.r): $allText"
        }
    }
}
