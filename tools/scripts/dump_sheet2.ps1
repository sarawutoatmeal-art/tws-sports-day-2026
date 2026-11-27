$extractDir = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\xlsx_extracted"
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

$sheet2Xml = [xml](Get-Content "$extractDir\xl\worksheets\sheet2.xml")
$rows = $sheet2Xml.worksheet.sheetData.row
foreach ($row in $rows) {
    $rNum = $row.r
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
    Write-Host "Row $rNum : $($cells -join ' | ')"
}
