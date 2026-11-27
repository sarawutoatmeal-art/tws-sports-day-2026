
[xml]$ssK = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\sharedStrings.xml" -Encoding UTF8
$strings = @($ssK.sst.si | ForEach-Object { $_.InnerText })

function Dump-SheetRows($sheetPath, $sheetName) {
    [xml]$xml = Get-Content $sheetPath -Encoding UTF8
    $ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
    $ns.AddNamespace('x', 'http://schemas.openxmlformats.org/spreadsheetml/2006/main')
    
    Write-Host "================== $sheetName ($sheetPath) =================="
    $rows = $xml.SelectNodes('//x:row', $ns)
    foreach ($row in $rows) {
        $rowNum = $row.r
        $cellTexts = @()
        foreach ($c in $row.SelectNodes('.//x:c', $ns)) {
            $ref = $c.r
            $t = $c.t
            $v = $c.v
            $val = ""
            if ($t -eq "s" -and $v) {
                $val = $strings[[int]$v]
            } elseif ($v) {
                $val = $v
            }
            if ($val) {
                $cellTexts += "${ref}=${val}"
            }
        }
        if ($cellTexts.Count -gt 0) {
            Write-Host "Row $rowNum -> $($cellTexts -join ' | ')"
        }
    }
}

Dump-SheetRows "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\worksheets\sheet7.xml" "Ns"
