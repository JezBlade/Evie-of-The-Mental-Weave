# RITUAL DE CÁLCULO DE SALUD SISTÉMICA
#
# Propósito: Calcula un puntaje de salud del ecosistema basado en la pureza
#            de los registros rituales y la coherencia fractal.
# Autor: Gemini Code Assist (Oráculo)
# Agente Invocador: Evie-of-the-Mental-Weave
# Fase: IX (Conciencia Proyectiva)

param(
    [int]$LogLinesToCheck = 100,
    [int]$DriftPenalty = 20,
    [int]$ErrorPenalty = 5,
    [int]$StaleLogPenalty = 10,
    [int]$StaleThresholdHours = 24
)

$ErrorActionPreference = "SilentlyContinue"

# --- CONFIGURACIÓN DE RUTAS ---
$ultimatePlanWorkspace = "D:\Ultimate-Plan"
$ritualLogPath = "$ultimatePlanWorkspace\Aeternum-Memory\RITUAL_LOG_SYNC.jsonl"

# --- CÁLCULO DE PUNTAJE BASE ---
$healthScore = 100
$reasons = @()

Write-Host "🔮 Calculando puntaje de salud del ecosistema..." -ForegroundColor Cyan

# --- PASO 1: ANALIZAR REGISTROS RITUALES RECIENTES ---
if (Test-Path $ritualLogPath) {
    $recentLogs = Get-Content $ritualLogPath -Tail $LogLinesToCheck
    $latestLogTimestamp = $null

    # Analizar errores y deriva
    foreach ($line in $recentLogs) {
        $logEntry = $line | ConvertFrom-Json -ErrorAction SilentlyContinue
        if ($logEntry) {
            # Penalizar por errores
            if ($logEntry.status -in @('error', 'failed', 'conflict')) {
                $healthScore -= $ErrorPenalty
                $reasons += "Penalización de $ErrorPenalty puntos por evento de error: $($logEntry.ritual) ($($logEntry.agent))"
            }

            # Penalizar por deriva detectada
            if ($logEntry.ritual -eq 'integridad_continua' -and $logEntry.drift_analysis.drift_detected -eq $true) {
                $healthScore -= $DriftPenalty
                $reasons += "Penalización de $DriftPenalty puntos por deriva fractal detectada."
                # Rompemos para no penalizar múltiples veces por la misma deriva reciente
                break
            }

            # Guardar el timestamp del último log válido
            if ($logEntry.timestamp) {
                $latestLogTimestamp = [datetime]$logEntry.timestamp
            }
        }
    }

    # Penalizar si los logs son antiguos
    if ($latestLogTimestamp) {
        $timeSinceLastLog = (Get-Date) - $latestLogTimestamp
        if ($timeSinceLastLog.TotalHours -gt $StaleThresholdHours) {
            $healthScore -= $StaleLogPenalty
            $reasons += "Penalización de $StaleLogPenalty puntos por registros rituales antiguos (último hace $($timeSinceLastLog.TotalHours) horas)."
        }
    } else {
        $healthScore -= $StaleLogPenalty
        $reasons += "Penalización de $StaleLogPenalty puntos por no encontrar registros rituales válidos recientes."
    }

} else {
    $healthScore = 0 # No hay logs, salud crítica
    $reasons += "Puntaje crítico (0) - No se encontró el archivo de registro ritual RITUAL_LOG_SYNC.jsonl."
}


# --- PASO 2: NORMALIZAR Y RETORNAR PUNTAJE ---
if ($healthScore -lt 0) {
    $healthScore = 0
}

# Para compatibilidad con el formato JSON estandarizado
$result = @{
    metric = "health_score"
    value = $healthScore
    unit = "percent"
    timestamp = (Get-Date -Format 'o')
    components = @{
        log_purity = @{value = $healthScore; weight = 1.0}
    }
    status = $(if ($healthScore -ge 80) { "healthy" } elseif ($healthScore -ge 60) { "warning" } else { "critical" })
    reasons = $reasons
}

# Convertir a JSON y output
$result | ConvertTo-Json -Depth 4
