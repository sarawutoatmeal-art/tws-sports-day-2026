
$pStudents = Import-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\pri_students_clean.clixml"
$kStudents = Import-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_students_clean.clixml"

Write-Host "Primary count: $($pStudents.Count)"
Write-Host "Kdg count: $($kStudents.Count)"

$outList = @()

foreach ($k in $kStudents) {
    if ($k.Note -and $k.Note -match 'G\.') {
        $outList += [PSCustomObject]@{
            K_Class = $k.Class
            K_No = $k.No
            K_Name = $k.FullName
            K_Nick = $k.Nickname
            K_Color = $k.Color
            K_Note = $k.Note
        }
    }
}

$outList | Format-Table -Wrap | Out-String -Width 160 | Set-Content "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_with_g_notes.txt" -Encoding UTF8
Write-Host "Found $($outList.Count) kindergarten students with G. notes"
$outList | Select-Object -First 35 | Format-Table -Wrap
