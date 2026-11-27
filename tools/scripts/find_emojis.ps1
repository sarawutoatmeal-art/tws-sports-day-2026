param()
$raw = Get-Content 'C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\index.html' -Raw -Encoding UTF8

# Replace emoji swords and shields with clean modern SVG icons or clean unicode
# Let's inspect where emojis are in index.html
$emojiRegex = '[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u27BF]'
$matches = [regex]::Matches($raw, $emojiRegex)
Write-Host "Total emoji characters: $($matches.Count)"

$lines = $raw -split "`n"
for ($i=0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '⚔|👑|🦁|☀️|🐉|💎|🏰|🏆|📢|👥|🖨️|📋|⏱️|🏅|🔗|📥|💾|📤|🔄|✏️|🔍|🎨|⚠️|✓|⚡') {
        Write-Host "Line $($i+1): $($lines[$i].Trim())"
    }
}
