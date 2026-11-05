
# Test reading sharedStrings of both
[xml]$ssK = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_fresh_extracted\xl\sharedStrings.xml" -Encoding UTF8
Write-Host "KDG Shared strings count: $($ssK.sst.si.Count)"
Write-Host "KDG sample: $($ssK.sst.si[0].InnerText)"

[xml]$ssP = Get-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\primary_fresh_extracted\xl\sharedStrings.xml" -Encoding UTF8
Write-Host "PRI Shared strings count: $($ssP.sst.si.Count)"
Write-Host "PRI sample: $($ssP.sst.si[0].InnerText)"
