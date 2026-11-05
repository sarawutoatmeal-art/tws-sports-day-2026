
$p = Import-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\pri_students_clean.clixml"
$pWithNotes = $p | Where-Object { $_.Note }

foreach ($item in $pWithNotes) {
    Write-Host "[$($item.Class)] #$($item.No) $($item.Nickname) ($($item.FullName)) | Color: $($item.Color) | Note: $($item.Note)"
}
