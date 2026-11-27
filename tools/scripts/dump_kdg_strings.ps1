
# Read shared strings with UTF-8 encoding
$path = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\sharedStrings.xml"
$stream = [System.IO.File]::OpenRead($path)
$reader = [System.Xml.XmlReader]::Create($stream)

$siList = New-Object System.Collections.Generic.List[string]
$currentText = ""

while ($reader.Read()) {
    if ($reader.NodeType -eq [System.Xml.XmlNodeType]::Element -and $reader.Name -eq "si") {
        $subReader = $reader.ReadSubtree()
        $doc = New-Object System.Xml.XmlDocument
        $doc.Load($subReader)
        $txt = $doc.InnerText
        $siList.Add($txt)
        $subReader.Close()
    }
}
$stream.Close()

Write-Host "Read $($siList.Count) shared strings."

$outPath = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_strings_dump.txt"
$writer = [System.IO.StreamWriter]::new($outPath, $false, [System.Text.Encoding]::UTF8)

for ($i = 0; $i -lt $siList.Count; $i++) {
    $str = $siList[$i]
    if ($str.Length -gt 0) {
        $writer.WriteLine("[$i] $str")
    }
}
$writer.Close()
Write-Host "Dumped to $outPath"
