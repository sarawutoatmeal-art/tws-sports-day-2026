
[xml]$ssK = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\sharedStrings.xml" -Encoding UTF8

$ns = New-Object System.Xml.XmlNamespaceManager($ssK.NameTable)
$ns.AddNamespace('x', 'http://schemas.openxmlformats.org/spreadsheetml/2006/main')

$siNodes = $ssK.SelectNodes('//x:si', $ns)

# List of indices from our filter:
$targetIndices = @(327, 345, 375, 387, 391, 393, 396, 399, 470, 477, 480, 485, 500, 507, 521, 536, 539, 545, 548, 549, 563, 566, 568, 577, 578, 590, 601, 604, 617, 619, 620)

foreach ($idx in $targetIndices) {
    Write-Host "=== Index $idx ==="
    Write-Host $siNodes[$idx].OuterXml
}
