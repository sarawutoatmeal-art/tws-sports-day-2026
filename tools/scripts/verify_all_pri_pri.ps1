
$p = Import-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\pri_students_clean.clixml"
$k = Import-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_students_clean.clixml"

Write-Host "================================================================================"
Write-Host "                PART 1: PRIMARY WITH PRIMARY SIBLINGS CHECK                     "
Write-Host "================================================================================"

$priPriPairs = @(
    @{ S1_Class="G.1/2"; S1_No=1; S1_Nick="FREEN"; S2_Class="G.4/1"; S2_No=5; S2_Nick="FORTH" },
    @{ S1_Class="G.1/2"; S1_No=2; S1_Nick="Marty"; S2_Class="G.4/2"; S2_No=12; S2_Nick="Mata" },
    @{ S1_Class="G.1/1"; S1_No=3; S1_Nick="Brabus"; S2_Class="G.4/2"; S2_No=7; S2_Nick="BRING"; S3_Class="G.4/2"; S3_No=8; S3_Nick="BRIGHT" },
    @{ S1_Class="G.1/1"; S1_No=8; S1_Nick="Jasmine"; S2_Class="G.2/2"; S2_No=11; S2_Nick="Machine"; S3_Class="G.5/1"; S3_No=8; S3_Nick="Captain" },
    @{ S1_Class="G.1/2"; S1_No=13; S1_Nick="Yuki"; S2_Class="G.4/1"; S2_No=13; S2_Nick="Ikkyu" },
    @{ S1_Class="G.1/2"; S1_No=16; S1_Nick="Kira"; S2_Class="G.3/2"; S2_No=21; S2_Nick="August" },
    @{ S1_Class="G.1/2"; S1_No=20; S1_Nick="Peach"; S2_Class="G.4/1"; S2_No=14; S2_Nick="Phat (PROM)" },
    @{ S1_Class="G.1/1"; S1_No=22; S1_Nick="Whanwhan"; S2_Class="G.3/2"; S2_No=4; S2_Nick="Wawa" },
    @{ S1_Class="G.2/1"; S1_No=2; S1_Nick="Pakin"; S2_Class="G.5/2"; S2_No=7; S2_Nick="Nitcha" },
    @{ S1_Class="G.2/2"; S1_No=10; S1_Nick="Rainny"; S2_Class="G.5/1"; S2_No=7; S2_Nick="Summer" },
    @{ S1_Class="G.2/1"; S1_No=14; S1_Nick="Munich"; S2_Class="G.5/2"; S2_No=5; S2_Nick="Nana" },
    @{ S1_Class="G.2/2"; S1_No=16; S1_Nick="Putter"; S2_Class="G.4/2"; S2_No=23; S2_Nick="Pream" },
    @{ S1_Class="G.2/1"; S1_No=18; S1_Nick="Pope"; S2_Class="G.4/1"; S2_No=14; S2_Nick="PROM" },
    @{ S1_Class="G.3/2"; S1_No=1; S1_Nick="Yoshi"; S2_Class="G.6/1"; S2_No=8; S2_Nick="Mari" },
    @{ S1_Class="G.3/2"; S1_No=2; S1_Nick="Richa"; S2_Class="G.6/1"; S2_No=3; S2_Nick="Nara" },
    @{ S1_Class="G.3/1"; S1_No=3; S1_Nick="JEEDA"; S2_Class="G.6/1"; S2_No=6; S2_Nick="JJ" },
    @{ S1_Class="G.3/2"; S1_No=3; S1_Nick="KHUN"; S2_Class="G.5/1"; S2_No=6; S2_Nick="Prem" },
    @{ S1_Class="G.3/2"; S1_No=15; S1_Nick="Thee"; S2_Class="G.5/2"; S2_No=11; S2_Nick="THAM" },
    @{ S1_Class="G.4/1"; S1_No=2; S1_Nick="Tin"; S2_Class="G.6/1"; S2_No=13; S2_Nick="KAOTANG" },
    @{ S1_Class="G.4/1"; S1_No=6; S1_Nick="NARM"; S2_Class="G.6/1"; S2_No=1; S2_Nick="Nymph" },
    @{ S1_Class="G.4/1"; S1_No=7; S1_Nick="Nicha"; S2_Class="G.6/1"; S2_No=17; S2_Nick="Preeya" },
    @{ S1_Class="G.4/1"; S1_No=8; S1_Nick="TEYA"; S2_Class="G.6/1"; S2_No=9; S2_Nick="TEIN" },
    @{ S1_Class="G.4/1"; S1_No=16; S1_Nick="Ririn"; S2_Class="G.6/1"; S2_No=24; S2_Nick="Hammer" },
    @{ S1_Class="G.5/1"; S1_No=2; S1_Nick="Tonkaew"; S2_Class="G.6/1"; S2_No=15; S2_Nick="TONMAI" },
    @{ S1_Class="G.5/2"; S1_No=4; S1_Nick="Endoo"; S2_Class="G.6/1"; S2_No=2; S2_Nick="KONPROD" }
)

foreach ($pair in $priPriPairs) {
    $st1 = $p | Where-Object { $_.Class -eq $pair.S1_Class -and $_.No -eq $pair.S1_No }
    $st2 = $p | Where-Object { $_.Class -eq $pair.S2_Class -and $_.No -eq $pair.S2_No }
    $st3 = if ($pair.S3_Class) { $p | Where-Object { $_.Class -eq $pair.S3_Class -and $_.No -eq $pair.S3_No } } else { $null }
    
    $same = ($st1.Color -eq $st2.Color)
    if ($st3) { $same = $same -and ($st1.Color -eq $st3.Color) }
    
    $s3Str = if ($st3) { ", $($st3.Class) #$($st3.No) $($st3.Nickname) ($($st3.Color))" } else { "" }
    Write-Host "Pair: $($st1.Class) #$($st1.No) $($st1.Nickname) ($($st1.Color)) <-> $($st2.Class) #$($st2.No) $($st2.Nickname) ($($st2.Color))$s3Str => Same Color? $same"
}
