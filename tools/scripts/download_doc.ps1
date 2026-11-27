param()
$docId = '1YtgJjH1ALr8UXKCoVgftZMUUhPJmnTZOV7QX4cBDgGg'
$urlTxt = "https://docs.google.com/document/d/$docId/export?format=txt"
$urlHtml = "https://docs.google.com/document/d/$docId/export?format=html"
$outTxt = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\gdoc.txt"
$outHtml = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\gdoc.html"

try {
    Invoke-WebRequest -Uri $urlTxt -OutFile $outTxt
    Write-Host "Downloaded TXT successfully! Size: $((Get-Item $outTxt).Length)"
} catch {
    Write-Host "Failed to download TXT: $($_.Exception.Message)"
}

try {
    Invoke-WebRequest -Uri $urlHtml -OutFile $outHtml
    Write-Host "Downloaded HTML successfully! Size: $((Get-Item $outHtml).Length)"
} catch {
    Write-Host "Failed to download HTML: $($_.Exception.Message)"
}
