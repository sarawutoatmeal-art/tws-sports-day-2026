
$lines = Get-Content 'C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\kdg_sibling_strings.txt' -Encoding UTF8
$lines | Where-Object { $_ -match 'พี่|น้อง|ป\.|G\.|อยู่อนุบาล|อยู่ประถม' }
