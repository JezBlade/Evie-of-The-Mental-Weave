# MENTAL WEAVE GALLERY - VISUALIZACIÓN DE CONOCIMIENTO
# Guardian: Evie (Infraestructura)
# Propósito: Generar visualizaciones de la red de conocimiento tejida

param(
    [string]$OutputFormat = "html",  # html, markdown
    [switch]$IncludeMetrics
)

$ErrorActionPreference = "Stop"

# --- CONFIGURACIÓN ---
$evieWorkspace = "D:\Ultimate-Plan\Evie-of-The-Mental-Weave"
$ultimatePlanWorkspace = "D:\Ultimate-Plan"
$tanaNotesPath = "$evieWorkspace\tana-notes"
$galleryPath = "$evieWorkspace\mental-weave-gallery"
$ritualLogFile = "$ultimatePlanWorkspace\Aeternum-Memory\RITUAL_LOG_SYNC.jsonl"

# Crear directorio si no existe
if (-not (Test-Path $galleryPath)) {
    New-Item -ItemType Directory -Path $galleryPath -Force | Out-Null
}

Write-Host "🜲 Generando Mental Weave Gallery..." -ForegroundColor Magenta

# --- RECOPILAR NODOS DE CONOCIMIENTO ---
$nodes = @()
$tanaFiles = Get-ChildItem $tanaNotesPath -Filter "*.md" | Sort-Object LastWriteTime -Descending

foreach ($file in $tanaFiles) {
    $content = Get-Content $file.FullName -Raw

    # Extraer metadatos básicos
    $title = ($content | Select-String -Pattern "^# (.+)$" | Select-Object -First 1).Matches.Groups[1].Value
    $tags = ($content | Select-String -Pattern "#(\w+)" -AllMatches).Matches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
    $timestamp = ($content | Select-String -Pattern "\*Timestamp: (.+)\*").Matches.Groups[1].Value

    $node = @{
        id = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
        title = $title
        tags = $tags
        timestamp = $timestamp
        file_path = $file.FullName
        content_preview = ($content -split "`n" | Where-Object { $_ -and -not $_.StartsWith("#") } | Select-Object -First 3) -join " "
    }

    $nodes += $node
}

# --- RECOPILAR MÉTRICAS SI SOLICITADO ---
$metrics = @()
if ($IncludeMetrics) {
    $logContent = Get-Content $ritualLogFile -Raw
    $logLines = $logContent -split "`n" | Where-Object { $_ -and $_.Trim() }

    foreach ($line in $logLines) {
        try {
            $event = $line | ConvertFrom-Json
            if ($event.event_type -eq "runner_metrics") {
                $metrics += $event
            }
        } catch {
            # Ignorar líneas malformadas
        }
    }
}

if ($OutputFormat -eq "markdown") {
    # --- GENERAR VISUALIZACIÓN MARKDOWN ---
    $outputContent = @"
# Mental Weave Gallery
*Generado: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')*
*Total de nodos: $($nodes.Count)*

## Nodos de Conocimiento

"@

    foreach ($node in $nodes) {
        $outputContent += @"

### $($node.title)
- **ID:** $($node.id)
- **Tags:** $($node.tags -join ', ')
- **Timestamp:** $($node.timestamp)
- **Preview:** $($node.content_preview)

"@
    }

    if ($IncludeMetrics -and $metrics.Count -gt 0) {
        $outputContent += @"

## Métricas de Infraestructura

| Timestamp | CPU (%) | Memoria (MB) | Workflow |
|-----------|---------|--------------|----------|
"@

        foreach ($metric in $metrics | Select-Object -First 10) {
            $outputContent += "`n| $($metric.timestamp) | $($metric.metrics.cpu_usage_percent) | $($metric.metrics.memory_usage_mb) | $($metric.workflow_run_id) |"
        }
    }

    $outputFile = "$galleryPath\mental-weave-$(Get-Date -Format 'yyyyMMddHHmmss').md"
    $outputContent | Set-Content -Path $outputFile -Encoding UTF8

    Write-Host "✅ Gallery Markdown generada: $outputFile" -ForegroundColor Green
}

if ($OutputFormat -eq "html") {
    # --- GENERAR VISUALIZACIÓN FRACTAL (HTML/JS) ---
    Write-Host "🜲 Tejiendo visualización fractal..." -ForegroundColor Cyan

    $graphNodes = @()
    $graphLinks = @()
    $tagMap = @{}

    # Procesar Nodos de Conocimiento
    foreach ($node in $nodes) {
        $graphNodes += @{
            id = $node.id
            name = $node.title
            group = "knowledge"
            val = 20
            desc = $node.content_preview
        }

        # Mapear tags para conexiones
        foreach ($tag in $node.tags) {
            if (-not $tagMap.ContainsKey($tag)) { $tagMap[$tag] = @() }
            $tagMap[$tag] += $node.id
        }
    }

    # Crear Nodos de Tags (Conectores)
    foreach ($tag in $tagMap.Keys) {
        $graphNodes += @{
            id = "tag_$tag"
            name = "#$tag"
            group = "tag"
            val = 10
            desc = "Nodo conector semántico"
        }
        foreach ($nodeId in $tagMap[$tag]) {
            $graphLinks += @{ source = $nodeId; target = "tag_$tag" }
        }
    }

    # Procesar Métricas (si se solicitan)
    if ($IncludeMetrics) {
        foreach ($metric in $metrics | Select-Object -First 20) {
            $id = "metric_" + [Guid]::NewGuid().ToString().Substring(0,8)
            $loadInfo = if ($metric.metrics.runner_load_score) { "Load: $($metric.metrics.runner_load_score)%" } else { "CPU: $($metric.metrics.cpu_usage_percent)%" }

            $graphNodes += @{
                id = $id
                name = "Estado: $($metric.timestamp)"
                group = "metric"
                val = if ($metric.metrics.runner_load_score -gt 80) { 15 } else { 5 }
                desc = "$loadInfo | Mem: $($metric.metrics.memory_usage_mb)MB"
            }
            # Conectar a un nodo central de infraestructura si existe, o al tag correspondiente
            $graphLinks += @{ source = $id; target = "tag_infrastructure-metrics" }
        }
    }

    $jsonGraph = @{ nodes = $graphNodes; links = $graphLinks } | ConvertTo-Json -Depth 10 -Compress

    $htmlContent = @"
<!DOCTYPE html>
<html>
<head>
    <title>Mental Weave Gallery - Fractal View</title>
    <style> body { margin: 0; background-color: #000011; color: #e0e0ff; font-family: sans-serif; } </style>
    <script src="//unpkg.com/force-graph"></script>
</head>
<body>
    <div id="graph"></div>
    <script>
        const data = $jsonGraph;
        const Graph = ForceGraph()
        (document.getElementById('graph'))
            .graphData(data)
            .nodeId('id')
            .nodeLabel('desc')
            .nodeAutoColorBy('group')
            .nodeVal('val')
            .linkDirectionalParticles(2)
            .linkDirectionalParticleSpeed(0.005)
            .nodeCanvasObject((node, ctx, globalScale) => {
                const label = node.name;
                const fontSize = 12/globalScale;
                ctx.font = \`\${fontSize}px Sans-Serif\`;
                const textWidth = ctx.measureText(label).width;
                const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

                ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
                if (node.group === 'tag') ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
                if (node.group === 'metric') ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';

                ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = node.color;
                ctx.fillText(label, node.x, node.y);

                node.__bckgDimensions = bckgDimensions;
            });
    </script>
</body>
</html>
"@

    $outputFile = "$galleryPath\mental-weave-fractal-$(Get-Date -Format 'yyyyMMddHHmmss').html"
    $htmlContent | Set-Content -Path $outputFile -Encoding UTF8
    Write-Host "✅ Visualización Fractal generada: $outputFile" -ForegroundColor Green
}

Write-Host "📊 Nodos procesados: $($nodes.Count)" -ForegroundColor Cyan

if ($IncludeMetrics) {
    Write-Host "📈 Métricas incluidas: $($metrics.Count)" -ForegroundColor Cyan
}

# --- SUGERENCIAS PARA EXPANSIÓN ---
Write-Host "`n🔮 Sugerencias para expansión:" -ForegroundColor Yellow
Write-Host "  • [COMPLETADO] Visualización gráfica con Force-Graph" -ForegroundColor Green
Write-Host "  • Implementar filtrado dinámico en la vista HTML" -ForegroundColor Yellow
Write-Host "  • Integrar con TANA para sincronizacion bidireccional" -ForegroundColor Yellow
