
$encTIS = [System.Text.Encoding]::GetEncoding(874)
$encUTF8 = [System.Text.Encoding]::UTF8

function Fix-XmlEncoding($filePath) {
    if (Test-Path $filePath) {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        # Check if first few bytes look like UTF-8 or TIS-620
        $str = [System.Text.Encoding]::UTF8.GetString($bytes)
        if ($str.Contains("")) {
            $tisStr = $encTIS.GetString($bytes)
            [System.IO.File]::WriteAllText($filePath, $tisStr, $encUTF8)
            Write-Host "Fixed UTF-8 for: $filePath"
        } else {
            Write-Host "Already clean UTF-8: $filePath"
        }
    }
}

Fix-XmlEncoding "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_fresh_extracted\xl\sharedStrings.xml"
Get-ChildItem "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_fresh_extracted\xl\worksheets\*.xml" | ForEach-Object {
    Fix-XmlEncoding $_.FullName
}
