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

# Print sample from sheet5.xml (Color faculty รายชื่อคณะสี) and sheet6,7,8,9
$kdgSheets = @("sheet5.xml", "sheet6.xml", "sheet7.xml", "sheet8.xml", "sheet9.xml")
foreach ($ws in $kdgSheets) {
    Write-Host "=================== $ws ==================="
    $xml = [xml](Get-Content "$extractDir\xl\worksheets\$ws")
    $rows = $xml.worksheet.sheetData.row | Select-Object -First 25
    foreach ($row in $rows) {
        $cells = @()
        foreach ($c in $row.c) {
            $val = ""
            if ($c.t -eq "s") {
                $idx = [int]$c.v
                $val = $sharedStrings[$idx]
            } else {
                $val = $c.v
            }
            $cells += "$($c.r): $val"
        }
        Write-Host "Row $($row.r): $($cells -join ' | ')"
    }
}
