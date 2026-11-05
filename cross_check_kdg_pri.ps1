
$pStudents = Import-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\pri_students_clean.clixml"
$kStudents = Import-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_students_clean.clixml"

$report = @()

foreach ($k in $kStudents) {
    if (!$k.Note) { continue }
    
    # Check if note mentions G. or primary grade
    if ($k.Note -match 'G\.(\d)/(\d)\s*(.*)') {
        $pGrade = $Matches[1]
        $pClass = $Matches[2]
        $pTarget = $Matches[3].Trim()
        
        # Search matching primary student
        # Can match by Class ("G.$pGrade/$pClass") and nickname / name
        $candidates = $pStudents | Where-Object { $_.Class -eq "G.$pGrade/$pClass" }
        
        $matchedPri = $null
        foreach ($c in $candidates) {
            if ($pTarget -and ($c.Nickname -like "*$pTarget*" -or $pTarget -like "*$($c.Nickname)*" -or $c.FullName -like "*$pTarget*")) {
                $matchedPri = $c
                break
            }
        }
        
        # If not matched by target nickname, let's look across that grade or class
        if (!$matchedPri) {
            foreach ($c in $candidates) {
                # Try surname match
                $kSur = ($k.FullName -split ' ')[-1]
                $pSur = ($c.FullName -split ' ')[-1]
                if ($kSur.Length -ge 4 -and $pSur.Length -ge 4 -and ($kSur -like "*$pSur*" -or $pSur -like "*$kSur*")) {
                    $matchedPri = $c
                    break
                }
            }
        }
        
        $colorMatch = if ($matchedPri) { ($k.Color -eq $matchedPri.Color) } else { "NOT_FOUND" }
        
        $report += [PSCustomObject]@{
            K_Class = $k.Class
            K_Name = $k.FullName
            K_Nick = $k.Nickname
            K_Color = $k.Color
            K_Note = $k.Note
            P_Found = if ($matchedPri) { "$($matchedPri.Class) #$($matchedPri.No) $($matchedPri.Nickname) ($($matchedPri.FullName))" } else { "NOT_FOUND" }
            P_Color = if ($matchedPri) { $matchedPri.Color } else { "N/A" }
            P_Note = if ($matchedPri) { $matchedPri.Note } else { "N/A" }
            IsSameColor = $colorMatch
        }
    }
}

$report | Export-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_pri_recheck.clixml"
Write-Host "Total Kdg->Pri pairs analyzed: $($report.Count)"

$mismatches = $report | Where-Object { $_.IsSameColor -ne $true }
Write-Host "Mismatches or Not Found: $($mismatches.Count)"
$mismatches | Format-Table -Wrap

Write-Host "=== All matches ==="
$report | Select-Object K_Class, K_Nick, K_Color, P_Found, P_Color, IsSameColor | Format-Table -Wrap
