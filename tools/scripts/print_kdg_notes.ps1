
$k = Import-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_students_clean.clixml"
$withNotes = $k | Where-Object { $_.Note }

foreach ($item in $withNotes) {
    Write-Host "[$($item.Class)] $($item.Nickname) ($($item.FullName)) | Color: $($item.Color) | Note: $($item.Note)"
}
