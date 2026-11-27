
[xml]$xml = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_fresh_extracted\xl\worksheets\sheet3.xml" -Encoding UTF8
$ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$ns.AddNamespace('x', 'http://schemas.openxmlformats.org/spreadsheetml/2006/main')

$row24 = $xml.SelectSingleNode("//x:row[@r='24']", $ns)
$row25 = $xml.SelectSingleNode("//x:row[@r='25']", $ns)

Write-Host "Row 24 outer:" $row24.OuterXml
Write-Host "Row 25 outer:" $row25.OuterXml

Write-Host "MergeCells:"
$xml.SelectNodes("//x:mergeCell", $ns) | ForEach-Object { Write-Host $_.ref }
