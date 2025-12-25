# MÉTRICAS DE RUNNERS AUTO-HOSPEDADOS
# Guardian: Evie (Infraestructura)
# Propósito: Capturar métricas de rendimiento de runners para optimización autónoma

param(
    [string]$WorkflowRunId,
    [string]$JobName = "default-job"
)

$ErrorActionPreference = "Stop"

# --- CONFIGURACIÓN ---
$evieWorkspace = "D:\Ultimate-Plan\Evie-of-The-Mental-Weave"
$ultimatePlanWorkspace = "D:\Ultimate-Plan"
$ritualLogFile = "$ultimatePlanWorkspace\Aeternum-Memory\RITUAL_LOG_SYNC.jsonl"
$bitacoraFile = "$evieWorkspace\bitacora.md"

# --- CAPTURAR MÉTRICAS DEL SISTEMA ---
$timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"

# Duración del trabajo (simulado - en producción vendría de GitHub Actions API)
$jobDuration = 0  # Segundos - se actualizaría con datos reales

# Tiempo en cola (simulado)
$queueTime = 0  # Segundos

# --- INTEGRACIÓN DE SENSOR DE CARGA (Propiocepción) ---
$loadScript = "$evieWorkspace\scripts\get-runner-load.ps1"
$loadMetrics = if (Test-Path $loadScript) {
    & $loadScript | ConvertFrom-Json
} catch {
    $null
}

$cpuUsage = if ($loadMetrics) { $loadMetrics.components.cpu_percent } else { 0 }
$memoryUsage = if ($loadMetrics) { $loadMetrics.components.memory_mb } else { 0 }
$runnerLoadScore = if ($loadMetrics) { $loadMetrics.value } else { 0 }
$runnerLoadStatus = if ($loadMetrics) { $loadMetrics.status } else { "unknown" }

# --- CREAR EVENTO DE TELEMETRÍA ---
$telemetryEvent = @{
    timestamp = $timestamp
    agent = "Evie"
    event_type = "runner_metrics"
    workflow_run_id = $WorkflowRunId
    job_name = $JobName
    metrics = @{
        job_duration_seconds = $jobDuration
        queue_time_seconds = $queueTime
        cpu_usage_percent = $cpuUsage
        memory_usage_mb = $memoryUsage
        runner_load_score = $runnerLoadScore
        runner_load_status = $runnerLoadStatus
    }
    status = "captured"
    phase = "infrastructure_optimization"
}

# --- REGISTRAR EN RITUAL_LOG_SYNC.jsonl ---
$jsonEvent = $telemetryEvent | ConvertTo-Json -Compress
Add-Content -Path $ritualLogFile -Value $jsonEvent -Encoding UTF8

# --- REGISTRAR EN BITÁCORA LOCAL ---
$logEntry = @"

## $timestamp - Métricas de Runner Capturadas
- **Workflow:** $WorkflowRunId
- **Job:** $JobName
- **CPU:** $cpuUsage%
- **Memoria:** $memoryUsage MB
- **Duración:** $jobDuration s
- **Tiempo en Cola:** $queueTime s
"@

Add-Content -Path $bitacoraFile -Value $logEntry

# --- OUTPUT PARA INTEGRACIÓN ---
Write-Host "Métricas capturadas para workflow $WorkflowRunId" -ForegroundColor Green
Write-Host "Carga: $runnerLoadScore% ($runnerLoadStatus) | CPU: $cpuUsage% | Mem: $memoryUsage MB" -ForegroundColor Cyan

# Devolver métricas como objeto para uso programático
return $telemetryEvent.metrics
