
$p = Import-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\pri_students_clean.clixml"
$k = Import-Clixml "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_students_clean.clixml"

Write-Host "================================================================================"
Write-Host "        ALL 25 CONFIRMED KINDERGARTEN - PRIMARY SIBLING RELATIONSHIPS           "
Write-Host "================================================================================"

$kdgPriList = @(
    # 1. GUNNER (K.1/1 #3) <-> Palin (G.1/2 #14)
    @{ K_Class="K.1/1"; K_No="3.0"; K_Nick="GUNNER"; P_Class="G.1/2"; P_No=14; P_Nick="Palin" },
    # 2. TIME (K.1/1 #11) <-> Timtim (G.1/2 #7)
    @{ K_Class="K.1/1"; K_No="11.0"; K_Nick="TIME"; P_Class="G.1/2"; P_No=7; P_Nick="Timtim" },
    # 3. LALIL (K.1/1 #17) & KINCH (K.3/2 #9) <-> Punn (G.3/1 #10)
    @{ K_Class="K.1/1"; K_No="17.0"; K_Nick="LALIL"; P_Class="G.3/1"; P_No=10; P_Nick="Punn" },
    @{ K_Class="K.3/2"; K_No="9.0"; K_Nick="KINCH"; P_Class="G.3/1"; P_No=10; P_Nick="Punn" },
    # 4. MEETURR (K.1/2 #16) <-> Tanthai (G.1/1 #20)
    @{ K_Class="K.1/2"; K_No="16.0"; K_Nick="MEETURR"; P_Class="G.1/1"; P_No=20; P_Nick="Tanthai" },
    # 5. NAF (K.1/2 #17) <-> Pastel (G.1/1 #18)
    @{ K_Class="K.1/2"; K_No="17.0"; K_Nick="NAF"; P_Class="G.1/1"; P_No=18; P_Nick="Pastel" },
    # 6. GANESH (K.1/3 #5) <-> GLACIER (G.1/1 #1)
    @{ K_Class="K.1/3"; K_No="5.0"; K_Nick="GANESH"; P_Class="G.1/1"; P_No=1; P_Nick="GLACIER" },
    # 7. IDIN (K.1/3 #14) <-> INTER (G.2/1 #16)
    @{ K_Class="K.1/3"; K_No="14.0"; K_Nick="IDIN"; P_Class="G.2/1"; P_No=16; P_Nick="INTER" },
    # 8. ARMIN (K.1/3 #15) <-> ARIN (G.1/1 #6)
    @{ K_Class="K.1/3"; K_No="15.0"; K_Nick="ARMIN"; P_Class="G.1/1"; P_No=6; P_Nick="ARIN" },
    # 9. RAY (K.2/1 #8) <-> Ryu (G.1/1 #2)
    @{ K_Class="K.2/1"; K_No="8.0"; K_Nick="RAY"; P_Class="G.1/1"; P_No=2; P_Nick="Ryu" },
    # 10. ALIN (K.2/1 #14) <-> Anfield (G.2/1 #13)
    @{ K_Class="K.2/1"; K_No="14.0"; K_Nick="ALIN"; P_Class="G.2/1"; P_No=13; P_Nick="Anfield" },
    # 11. JINGJAI (K.2/2 #9) <-> PORJAI (G.2/1 #10)
    @{ K_Class="K.2/2"; K_No="9.0"; K_Nick="JINGJAI"; P_Class="G.2/1"; P_No=10; P_Nick="PORJAI" },
    # 12. NALIN (K.2/2 #11) <-> Nara (G.4/2 #15)
    @{ K_Class="K.2/2"; K_No="11.0"; K_Nick="NALIN"; P_Class="G.4/2"; P_No=15; P_Nick="Nara" },
    # 13. SONIC (K.2/2 #13) <-> Soda (G.5/2 #2)
    @{ K_Class="K.2/2"; K_No="13.0"; K_Nick="SONIC"; P_Class="G.5/2"; P_No=2; P_Nick="Soda" },
    # 14. MONET (K.2/2 #14) <-> Mayo (G.5/2 #10)
    @{ K_Class="K.2/2"; K_No="14.0"; K_Nick="MONET"; P_Class="G.5/2"; P_No=10; P_Nick="Mayo" },
    # 15. KANING (K.2/2 #17) <-> KAMIN (G.2/1 #22)
    @{ K_Class="K.2/2"; K_No="17.0"; K_Nick="KANING"; P_Class="G.2/1"; P_No=22; P_Nick="KAMIN" },
    # 16. BURGER (K.2/3 #2) <-> Printer (G.3/2 #7)
    @{ K_Class="K.2/3"; K_No="2.0"; K_Nick="BURGER"; P_Class="G.3/2"; P_No=7; P_Nick="Printer" },
    # 17. KANGKANG (K.2/3 #3) <-> Kyokyo (G.3/2 #10) & Mimi (G.2/1 #17)
    @{ K_Class="K.2/3"; K_No="3.0"; K_Nick="KANGKANG"; P_Class="G.3/2"; P_No=10; P_Nick="Kyokyo" },
    # 18. JEREMY (K.2/3 #4) <-> Joseph (G.3/1 #11)
    @{ K_Class="K.2/3"; K_No="4.0"; K_Nick="JEREMY"; P_Class="G.3/1"; P_No=11; P_Nick="Joseph" },
    # 19. SAIFAH (K.2/3 #5) <-> Captain (G.1/1 #10)
    @{ K_Class="K.2/3"; K_No="5.0"; K_Nick="SAIFAH"; P_Class="G.1/1"; P_No=10; P_Nick="Captain" },
    # 20. WINTER (K.2/3 #12) <-> Milin (G.1/1 #11)
    @{ K_Class="K.2/3"; K_No="12.0"; K_Nick="WINTER"; P_Class="G.1/1"; P_No=11; P_Nick="Milin" },
    # 21. KENJI (K.3/1 #1) <-> Moshi (G.4/2 #9)
    @{ K_Class="K.3/1"; K_No="1.0"; K_Nick="KENJI"; P_Class="G.4/2"; P_No=9; P_Nick="Moshi" },
    # 22. CARD (K.3/1 #3) <-> KHUN (G.3/2 #3) & Prem (G.5/1 #6)
    @{ K_Class="K.3/1"; K_No="3.0"; K_Nick="CARD"; P_Class="G.5/1"; P_No=6; P_Nick="Prem" },
    # 23. AI (K.3/1 #5) <-> At (G.4/2 #1)
    @{ K_Class="K.3/1"; K_No="5.0"; K_Nick="AI"; P_Class="G.4/2"; P_No=1; P_Nick="At" },
    # 24. PRAN (K.3/1 #14) <-> Prach (G.4/2 #11)
    @{ K_Class="K.3/1"; K_No="14.0"; K_Nick="PRAN"; P_Class="G.4/2"; P_No=11; P_Nick="Prach" },
    # 25. NAM (K.3/2 #2) <-> DIN (G.2/1 #1)
    @{ K_Class="K.3/2"; K_No="2.0"; K_Nick="NAM"; P_Class="G.2/1"; P_No=1; P_Nick="DIN" },
    # 26. LAYLA (K.3/2 #4) <-> LYNLY (G.2/2 #4)
    @{ K_Class="K.3/2"; K_No="4.0"; K_Nick="LAYLA"; P_Class="G.2/2"; P_No=4; P_Nick="LYNLY" },
    # 27. CHEREEN (K.3/2 #7) <-> Shiryu (G.2/1 #11)
    @{ K_Class="K.3/2"; K_No="7.0"; K_Nick="CHEREEN"; P_Class="G.2/1"; P_No=11; P_Nick="Shiryu" },
    # 28. TARA (K.3/2 #10) <-> Toru (G.4/1 #11)
    @{ K_Class="K.3/2"; K_No="10.0"; K_Nick="TARA"; P_Class="G.4/1"; P_No=11; P_Nick="Toru" },
    # 29. HOLY (K.3/2 #17) <-> Hero (G.1/2 #4)
    @{ K_Class="K.3/2"; K_No="17.0"; K_Nick="HOLY"; P_Class="G.1/2"; P_No=4; P_Nick="Hero" },
    # 30. LITA (K.3/2 #18) <-> Punpun (G.4/2 #17)
    @{ K_Class="K.3/2"; K_No="18.0"; K_Nick="LITA"; P_Class="G.4/2"; P_No=17; P_Nick="Punpun" }
)

$allCorrect = $true
$count = 0
foreach ($item in $kdgPriList) {
    $count++
    $kChild = $k | Where-Object { $_.Class -eq $item.K_Class -and $_.No -eq $item.K_No }
    $pChild = $p | Where-Object { $_.Class -eq $item.P_Class -and $_.No -eq $item.P_No }
    
    $same = ($kChild.Color -eq $pChild.Color)
    if (!$same) { $allCorrect = $false }
    
    $kNickClean = ($kChild.Nickname -split ' ')[0]
    $pNickClean = ($pChild.Nickname -split ' ')[0]
    Write-Host "$count. Kdg: [$($kChild.Class)] $kNickClean ($($kChild.Color)) <===> Pri: [$($pChild.Class)] $pNickClean ($($pChild.Color)) | Match? $same"
}

Write-Host "`nAll $($kdgPriList.Count) Sibling Pairs Match Colors? $allCorrect"
