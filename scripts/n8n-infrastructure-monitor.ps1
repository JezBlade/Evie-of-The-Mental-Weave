# WORKFLOW N8N - MONITOREO DE INFRAESTRUCTURA EVIE
# Propósito: Workflow automatizado para monitoreo continuo de métricas de runners
# Integración: Se ejecuta periódicamente para capturar y analizar métricas

param(
    [switch]$Continuous,
    [int]$IntervalMinutes = 5
)

$ErrorActionPreference = "Stop"

# --- CONFIGURACIÓN ---
$evieWorkspace = "D:\Ultimate-Plan\Evie-of-The-Mental-Weave"
$metricsScript = "$evieWorkspace\scripts\get-runner-metrics.ps1"
$n8nWebhookUrl = "http://localhost:5678/webhook/evie-infrastructure-monitor"  # Configurar según instalación n8n

Write-Host "🜲 Iniciando Workflow de Monitoreo de Infraestructura Evie" -ForegroundColor Magenta

function Invoke-MonitoringCycle {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "`n[$timestamp] Ejecutando ciclo de monitoreo..." -ForegroundColor Cyan

    try {
        # Capturar métricas
        $metrics = & $metricsScript -WorkflowRunId "n8n-monitor-$(Get-Date -Format 'yyyyMMddHHmmss')" -JobName "infrastructure-monitor"

        # Evaluar umbrales de alerta
        $alerts = @()
        if ($metrics.cpu_usage_percent -gt 80) {
            $alerts += "CPU alta: $($metrics.cpu_usage_percent)%"
        }
        if ($metrics.memory_usage_mb -gt 32000) {  # 32GB threshold
            $alerts += "Memoria alta: $($metrics.memory_usage_mb) MB"
        }
        if ($metrics.runner_load_score -gt 80) {
            $alerts += "Carga del Runner CRÍTICA: $($metrics.runner_load_score)% ($($metrics.runner_load_status))"
        }

        # Preparar payload para n8n
        $payload = @{
            timestamp = (Get-Date -Format "o")
            agent = "Evie"
            workflow = "infrastructure_monitor"
            metrics = $metrics
            alerts = $alerts
            recommendations = if ($alerts.Count -gt 0) {
                @(
                    "Considerar escalado de recursos",
                    "Revisar procesos de alto consumo",
                    "Optimizar workflows de CI/CD"
                )
            } else {
                @("Infraestructura funcionando optimalmente")
            }
        }

        # Enviar a n8n (si está configurado)
        if ($n8nWebhookUrl -and (Test-NetConnection -ComputerName "localhost" -Port 5678 -InformationLevel Quiet)) {
            Invoke-RestMethod -Uri $n8nWebhookUrl -Method Post -Body ($payload | ConvertTo-Json) -ContentType "application/json"
            Write-Host "   ✅ Datos enviados a n8n workflow" -ForegroundColor Green
        } else {
            Write-Host "   ⚠️ n8n no disponible, datos registrados localmente" -ForegroundColor Yellow
        }

        # Logging local
        Write-Host "   📊 Carga: $($metrics.runner_load_score)% | CPU: $($metrics.cpu_usage_percent)% | Mem: $($metrics.memory_usage_mb) MB" -ForegroundColor Cyan
        if ($alerts.Count -gt 0) {
            Write-Host "   🚨 Alertas: $($alerts -join ', ')" -ForegroundColor Red
        }

    } catch {
        Write-Error "Error en ciclo de monitoreo: $($_.Exception.Message)"
    }
}

# --- EJECUCIÓN ---
if ($Continuous) {
    Write-Host "Modo continuo activado - Intervalo: $IntervalMinutes minutos" -ForegroundColor Yellow
    Write-Host "Presiona Ctrl+C para detener..." -ForegroundColor Yellow

    while ($true) {
        Invoke-MonitoringCycle
        Start-Sleep -Seconds ($IntervalMinutes * 60)
    }
} else {
    # Ciclo único
    Invoke-MonitoringCycle
    Write-Host "`n✅ Ciclo de monitoreo completado" -ForegroundColor Green
}

# ====================================================================
# INSTRUCCIONES PARA N8N:
# 1. Crear webhook trigger con ruta /webhook/evie-infrastructure-monitor
# 2. Conectar a nodos de análisis de métricas
# 3. Configurar alertas basadas en umbrales
# 4. Integrar con dashboards de monitoreo
# ====================================================================
