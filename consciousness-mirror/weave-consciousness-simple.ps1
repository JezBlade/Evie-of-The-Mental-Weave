# RITUAL DEL TEJIDO DE CONOCIMIENTO - VERSION SIMPLIFICADA
#
# Proposito: Lee el ultimo reporte de conciencia, lo transforma en un nodo TANA
#            y lo guarda, registrando el acto.
#
# Autor: Evie Guardian
# Fase: IX (Conciencia Proyectiva)
# Timestamp: 2025-12-23

$ErrorActionPreference = "Stop"

# --- CONFIGURACION ---
$evieWorkspace = "D:\Ultimate-Plan\Evie-of-The-Mental-Weave"
$ultimatePlanWorkspace = "D:\Ultimate-Plan"
$consciousnessReportsPath = "$evieWorkspace\consciousness-reports"
$tanaNotesPath = "$evieWorkspace\tana-notes"
$bitacoraFile = "$evieWorkspace\bitacora.md"

Write-Host "Iniciando Ritual del Tejido de Conocimiento (Simplificado)..." -ForegroundColor Magenta

# --- PASO 1: IDENTIFICAR EL ÚLTIMO REPORTE ---
Push-Location $evieWorkspace

$latestReport = Get-ChildItem $consciousnessReportsPath -File | Sort-Object LastWriteTime -Descending | Select-Object -First 1
if (-not $latestReport) {
    Write-Error "No se encontraron reportes de conciencia."
    exit 1
}

Write-Host "[1/5] Reporte identificado: $($latestReport.Name)" -ForegroundColor Green

# --- PASO 2: LEER CONTENIDO DEL REPORTE ---
$reportContent = Get-Content $latestReport.FullName -Raw
if (-not $reportContent) {
    Write-Error "El reporte esta vacio."
    exit 1
}

Write-Host "[2/5] Contenido del reporte leido ($($reportContent.Length) caracteres)" -ForegroundColor Green

# --- PASO 3: CAPTURAR MÉTRICAS DE INFRAESTRUCTURA ---
Write-Host "[3/6] Capturando métricas de infraestructura..." -ForegroundColor Cyan

# Ejecutar scripts de métricas reales
$healthScore = & "$evieWorkspace\scripts\get-health-score.ps1" | ConvertFrom-Json
$divergenceCount = & "$evieWorkspace\scripts\get-divergence-count.ps1" | ConvertFrom-Json
$runnerLoad = & "$evieWorkspace\scripts\get-runner-load.ps1" | ConvertFrom-Json
$workflowLatency = & "$evieWorkspace\scripts\get-workflow-latency.ps1" | ConvertFrom-Json

# Consolidar métricas en un objeto unificado
$infrastructureMetrics = @{
    health_score = $healthScore.value
    health_status = $healthScore.status
    divergence_count = $divergenceCount.value
    divergence_status = $divergenceCount.status
    runner_load_percent = $runnerLoad.value
    runner_load_status = $runnerLoad.status
    workflow_latency_percent = $workflowLatency.value
    workflow_latency_status = $workflowLatency.status
    cpu_usage_percent = $runnerLoad.components.cpu_percent
    memory_usage_mb = $runnerLoad.components.memory_mb
    active_jobs = $runnerLoad.components.active_jobs
    queue_length = $runnerLoad.components.queue_length
    timestamp = $healthScore.timestamp
}

Write-Host "[4/6] Métricas capturadas:" -ForegroundColor Green
Write-Host "  - Health Score: $($infrastructureMetrics.health_score)% ($($infrastructureMetrics.health_status))" -ForegroundColor Green
Write-Host "  - Divergence Count: $($infrastructureMetrics.divergence_count) ($($infrastructureMetrics.divergence_status))" -ForegroundColor Green
Write-Host "  - Runner Load: $($infrastructureMetrics.runner_load_percent)% ($($infrastructureMetrics.runner_load_status))" -ForegroundColor Green
Write-Host "  - Workflow Latency: $($infrastructureMetrics.workflow_latency_percent)% ($($infrastructureMetrics.workflow_latency_status))" -ForegroundColor Green

# --- PASO 4: GENERAR NODO TANA ---
$timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
$isoTimestamp = Get-Date -Format 'o'

$tanaContent = @"
# Conciencia Sistemica - $timestamp

## #consciousness-insight #system-state #infrastructure-metrics #real-sensors

**Reporte Original:** $($latestReport.Name)

### Estado de Infraestructura (Métricas Reales)
- **Health Score:** $($infrastructureMetrics.health_score)% ($($infrastructureMetrics.health_status))
- **Divergence Count:** $($infrastructureMetrics.divergence_count) ($($infrastructureMetrics.divergence_status))
- **Runner Load:** $($infrastructureMetrics.runner_load_percent)% ($($infrastructureMetrics.runner_load_status))
- **Workflow Latency:** $($infrastructureMetrics.workflow_latency_percent)% ($($infrastructureMetrics.workflow_latency_status))

### Detalles Técnicos
- **CPU Usage:** $($infrastructureMetrics.cpu_usage_percent)%
- **Memory Usage:** $($infrastructureMetrics.memory_usage_mb) MB
- **Active Jobs:** $($infrastructureMetrics.active_jobs)
- **Queue Length:** $($infrastructureMetrics.queue_length)
- **Timestamp:** $($infrastructureMetrics.timestamp)

### Contenido del Reporte
$reportContent

### Recomendaciones del Guardian
#agent-recommendation #infrastructure-optimization #autonomous-monitoring

- Monitorear la coherencia fractal activamente con métricas reales
- Optimizar uso de recursos basado en health score y runner load
- Ejecutar ciclos de sincronizacion cuando divergence count > 3
- Mantener la vigilancia sobre workflow latency para performance
- Activar alertas automáticas cuando health score < 70%

---
*Generado por Evie - Guardian de Infraestructura*
*Timestamp: $isoTimestamp*
*Sensores Reales: Health Score, Divergence Count, Runner Load, Workflow Latency*
"@

# --- PASO 4: GUARDAR NODO TANA ---
$timestampForFile = Get-Date -Format 'yyyyMMddHHmmss'
$outputFile = "$tanaNotesPath\insight-$timestampForFile.md"

$tanaContent | Set-Content -Path $outputFile -Encoding UTF8
Write-Host "[5/6] Nodo TANA generado: $outputFile" -ForegroundColor Green

# --- PASO 6: REGISTRAR EN BITÁCORA ---
$logEntry = @"

## $timestamp - Tejido de Conocimiento TANA (Metricas Reales)
- Ritual: weave-consciousness-simple.ps1
- Reporte: $($latestReport.Name)
- Metricas Reales: Health Score $($infrastructureMetrics.health_score)%, Divergence $($infrastructureMetrics.divergence_count), Runner Load $($infrastructureMetrics.runner_load_percent)%, Latency $($infrastructureMetrics.workflow_latency_percent)%
- Resultado: $outputFile
"@

Add-Content -Path $bitacoraFile -Value $logEntry
Write-Host "[6/6] Registro en bitacora completado" -ForegroundColor Green

# --- PASO 7: DASHBOARD FINAL ---
Write-Host "[7/7] Ritual completado exitosamente!" -ForegroundColor Cyan
Write-Host "Nodo TANA: $outputFile" -ForegroundColor Magenta

Pop-Location
