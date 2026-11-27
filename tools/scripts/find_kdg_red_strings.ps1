
[xml]$ssK = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\sharedStrings.xml" -Encoding UTF8

$ns = New-Object System.Xml.XmlNamespaceManager($ssK.NameTable)
$ns.AddNamespace('x', 'http://schemas.openxmlformats.org/spreadsheetml/2006/main')

$siNodes = $ssK.SelectNodes('//x:si', $ns)

$out = @()
for ($i = 0; $i -lt $siNodes.Count; $i++) {
    $node = $siNodes[$i]
    $fullText = $node.InnerText
    
    $redParts = @()
    $rNodes = $node.SelectNodes('.//x:r', $ns)
    foreach ($r in $rNodes) {
        $color = $r.SelectSingleNode('.//x:color', $ns)
        if ($color -and ($color.rgb -match 'FF0000|ED1C24|C00000' -or $color.theme -eq '6')) {
            $redParts += $r.InnerText
        }
    }
    
    if ($redParts.Count -gt 0 -or $fullText -match 'G\.|K\.|ป\.|อ\.|พี่|น้อง|ฝาแฝด') {
        $cleanedFull = $fullText.Replace("`r", ' ').Replace("`n", ' ')
        $cleanedRed = ($redParts -join ' ').Replace("`r", ' ').Replace("`n", ' ')
        $out += [PSCustomObject]@{
            Index = $i
            FullText = $cleanedFull
            RedText = $cleanedRed
        }
    }
}

Write-Host "Total matched strings in Kindergarten: $($out.Count)"
$out | Format-Table -Wrap | Out-String -Width 160 | Set-Content 'C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_sibling_strings.txt' -Encoding UTF8
$out | Select-Object -First 30 | Format-Table -Wrap
