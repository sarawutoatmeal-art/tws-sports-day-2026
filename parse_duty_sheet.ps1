param()
$dest = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_duty_extracted"
[xml]$rels = Get-Content "$dest\xl\_rels\workbook.xml.rels"
$sheetRel = $rels.Relationships.Relationship | Where-Object { $_.Id -eq 'rId6' }
$target = $sheetRel.Target
Write-Host "Duty sheet target: $target"

# Read sharedStrings
[xml]$sst = Get-Content "$dest\xl\sharedStrings.xml"
$strings = @()
foreach ($si in $sst.sst.si) {
    if ($si.t) {
        $strings += $si.t
    } elseif ($si.r) {
        $tVal = ($si.r | ForEach-Object { $_.t }) -join ''
        $strings += $tVal
    } else {
        $strings += ""
    }
}
Write-Host "Total shared strings: $($strings.Count)"

# Read Duty sheet XML
[xml]$sheet = Get-Content "$dest\xl\$target"
$rows = $sheet.worksheet.sheetData.row

$output = @()
foreach ($row in $rows) {
    $rowNum = $row.r
    $cells = @()
    foreach ($c in $row.c) {
        $val = ""
        if ($c.v) {
            $idx = [int]$c.v
            if ($c.t -eq "s") {
                $val = $strings[$idx]
            } else {
                $val = $c.v
            }
        }
        $cells += "$($c.r): $val"
    }
    $output += "Row $rowNum : " + ($cells -join " | ")
}

Set-Content -Path "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\duty_sheet_live.txt" -Value $output -Encoding UTF8
Write-Host "Exported Duty sheet live! Total rows: $($output.Count)"
