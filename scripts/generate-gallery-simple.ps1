# MENTAL WEAVE GALLERY - VISUALIZACIÓN SIMPLE
# Guardian: Evie (Infraestructura)

$evieWorkspace = "D:\Ultimate-Plan\Evie-of-The-Mental-Weave"
$tanaNotesPath = "$evieWorkspace\tana-notes"
$galleryPath = "$evieWorkspace\mental-weave-gallery"
$ritualLogFile = "$evieWorkspace\RITUAL_LOG_SYNC.jsonl"

if (-not (Test-Path $galleryPath)) {
    New-Item -ItemType Directory -Path $galleryPath -Force | Out-Null
}

Write-Host "🜲 Generando Mental Weave Gallery..." -ForegroundColor Magenta

# Recopilar nodos
$nodes = Get-ChildItem $tanaNotesPath -Filter "*.md" | Sort-Object LastWriteTime -Descending

$outputContent = "# Mental Weave Gallery`n*Generado: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')*`n*Total de nodos: $($nodes.Count)*`n`n## Nodos de Conocimiento`n"

foreach ($file in $nodes) {
    $content = Get-Content $file.FullName -Raw
    $title = ($content | Select-String -Pattern "^# (.+)$" | Select-Object -First 1).Matches.Groups[1].Value
    $tags = ($content | Select-String -Pattern "#(\w+)" -AllMatches).Matches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique

    $outputContent += "`n### $title`n"
    $outputContent += "- **ID:** $([System.IO.Path]::GetFileNameWithoutExtension($file.Name))`n"
    $outputContent += "- **Tags:** $($tags -join ', ')`n"
}

$outputFile = "$galleryPath\mental-weave-$(Get-Date -Format 'yyyyMMddHHmmss').md"
$outputContent | Set-Content -Path $outputFile -Encoding UTF8

Write-Host "✅ Gallery generada: $outputFile" -ForegroundColor Green
