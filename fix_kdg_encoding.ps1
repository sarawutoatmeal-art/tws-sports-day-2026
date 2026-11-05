
$encTIS = [System.Text.Encoding]::GetEncoding(874)
$encUTF8 = [System.Text.Encoding]::UTF8

function Fix-XmlEncoding($filePath) {
    if (Test-Path $filePath) {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $tisStr = $encTIS.GetString($bytes)
        [System.IO.File]::WriteAllText($filePath, $tisStr, $encUTF8)
        Write-Host "Fixed UTF-8 for: $filePath"
    }
}

# Fix sharedStrings and all sheet XMLs
Fix-XmlEncoding "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\sharedStrings.xml"

Get-ChildItem "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\worksheets\*.xml" | ForEach-Object {
    Fix-XmlEncoding $_.FullName
}

Write-Host "All Kindergarten XMLs fixed to proper UTF-8!"
