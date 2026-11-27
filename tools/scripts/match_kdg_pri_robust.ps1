
$pStudents = Import-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\pri_students_clean.clixml"
$kStudents = Import-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_students_clean.clixml"

$kdgPriNotes = $kStudents | Where-Object { $_.Note -match 'G\.' }

$verifiedList = @()

foreach ($k in $kdgPriNotes) {
    # Extract grade, class, and target name from Note
    # Note formats: "G.1/2 Palin", "Timtim G.1/2", "G.1/1 การ์เซีย", "K.3/1 , G.3/1 ปัณ", "G.3/1 ปัณ K.1/1 ลลิล"
    $gMatch = [regex]::Match($k.Note, 'G\.(\d)/(\d)')
    $gGrade = $gMatch.Groups[1].Value
    $gRoom = $gMatch.Groups[2].Value
    $targetClass = "G.$gGrade/$gRoom"
    
    # Target search string: remove "G.x/x" and K.x/x parts
    $cleanTarget = $k.Note -replace 'G\.\d/\d','' -replace 'K\.\d/\d','' -replace '[,/:]',''
    $cleanTarget = $cleanTarget.Trim()
    
    # Find matching student in primary
    $priMatches = $pStudents | Where-Object { $_.Class -eq $targetClass }
    
    $pFound = $null
    # 1. Match by nickname or Thai name in primary
    foreach ($p in $priMatches) {
        if ($cleanTarget) {
            # Check nickname contains
            if ($p.Nickname -and ($cleanTarget -like "*$($p.Nickname)*" -or $p.Nickname -like "*$cleanTarget*")) {
                $pFound = $p
                break
            }
        }
    }
    
    # 2. If not found by nickname, check surname
    if (!$pFound) {
        $kSurname = ($k.FullName -split ' ')[-1]
        foreach ($p in $priMatches) {
            $pSurname = ($p.FullName -split ' ')[-1]
            if ($kSurname.Length -ge 4 -and $pSurname.Length -ge 4 -and ($kSurname -like "*$pSurname*" -or $pSurname -like "*$kSurname*")) {
                $pFound = $p
                break
            }
        }
    }
    
    # 3. If still not found, check across all students in that grade or primary
    if (!$pFound) {
        foreach ($p in $pStudents) {
            if ($cleanTarget -and $p.Nickname -and ($cleanTarget -like "*$($p.Nickname)*" -or $p.Nickname -like "*$cleanTarget*")) {
                $pFound = $p
                break
            }
        }
    }

    $isColorMatch = if ($pFound) { ($k.Color -eq $pFound.Color) } else { $false }

    $verifiedList += [PSCustomObject]@{
        K_Class = $k.Class
        K_No = $k.No
        K_Name = $k.FullName
        K_Nick = $k.Nickname
        K_Color = $k.Color
        K_Note = $k.Note
        P_Class = if ($pFound) { $pFound.Class } else { "NOT FOUND" }
        P_No = if ($pFound) { $pFound.No } else { 0 }
        P_Name = if ($pFound) { $pFound.FullName } else { "" }
        P_Nick = if ($pFound) { $pFound.Nickname } else { "" }
        P_Color = if ($pFound) { $pFound.Color } else { "" }
        P_Note = if ($pFound) { $pFound.Note } else { "" }
        ColorMatch = $isColorMatch
    }
}

$verifiedList | Export-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_pri_verified_pairs.clixml"
Write-Host "Total verified pairs: $($verifiedList.Count)"
$verifiedList | Select-Object K_Class, K_Nick, K_Color, P_Class, P_Nick, P_Color, ColorMatch | Format-Table -Wrap
