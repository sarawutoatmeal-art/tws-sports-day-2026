
$path = "C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\assets\js\students-data.js"
$text = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# Replace Chawin color from Green to Yellow
$oldChawin = '"id":  53,\r?\n\s*"class":  "G2 Zebra",\r?\n\s*"grade":  2,\r?\n\s*"no":  6,\r?\n\s*"fullName":  "MASTER CHAWIN SATTAYAPHATI",\r?\n\s*"nickname":  "Chalee",\r?\n\s*"gender":  "Boy",\r?\n\s*"color":  "Green",\r?\n\s*"kingdom":  "Jade Dynasty"'
$newChawin = '"id":  53,\r\n        "class":  "G2 Zebra",\r\n        "grade":  2,\r\n        "no":  6,\r\n        "fullName":  "MASTER CHAWIN SATTAYAPHATI",\r\n        "nickname":  "Chalee",\r\n        "gender":  "Boy",\r\n        "color":  "Yellow",\r\n        "kingdom":  "Golden Realm"'

# Replace Saharath color from Yellow to Green
$oldSaharath = '"id":  60,\r?\n\s*"class":  "G2 Zebra",\r?\n\s*"grade":  2,\r?\n\s*"no":  13,\r?\n\s*"fullName":  "MASTER SAHARATH NANTHAPOOSIT",\r?\n\s*"nickname":  "Anfield",\r?\n\s*"gender":  "Boy",\r?\n\s*"color":  "Yellow",\r?\n\s*"kingdom":  "Golden Realm"'
$newSaharath = '"id":  60,\r\n        "class":  "G2 Zebra",\r\n        "grade":  2,\r\n        "no":  13,\r\n        "fullName":  "MASTER SAHARATH NANTHAPOOSIT",\r\n        "nickname":  "Anfield",\r\n        "gender":  "Boy",\r\n        "color":  "Green",\r\n        "kingdom":  "Jade Dynasty"'

$text = $text -replace $oldChawin, $newChawin
$text = $text -replace $oldSaharath, $newSaharath

[System.IO.File]::WriteAllText($path, $text, [System.Text.Encoding]::UTF8)
Write-Host "Updated students-data.js with correct colors!"
