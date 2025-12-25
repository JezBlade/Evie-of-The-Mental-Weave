# DIVERGENCE COUNT - DRIFT ENTRE INTENCIÓN Y EJECUCIÓN
# Guardian: Evie (Infraestructura)
# Propósito: Medir desviaciones entre lo planeado y lo ejecutado

$evieWorkspace = "D:\Ultimate-Plan\Evie-of-The-Mental-Weave"
$ritualLogFile = "$evieWorkspace\RITUAL_LOG_SYNC.jsonl"
$ultimatePlanWorkspace = "D:\Ultimate-Plan"

# --- MÉTRICAS DE DIVERGENCIA ---

# 1. Repository Drift - Archivos modificados vs commits
$repoDrift = 0
try {
    # Contar archivos modificados no commited
    $gitStatus = git -C $ultimatePlanWorkspace status --porcelain 2>$null
    if ($gitStatus) {
        $repoDrift = ($gitStatus | Measure-Object).Count
    }
} catch {
    $repoDrift = -1  # No se pudo determinar
}

# 2. Configuration Drift - Cambios en configuración vs aplicada
$configDrift = 0
try {
    # Verificar si hay cambios en archivos de configuración críticos
    $configFiles = @(
        "$ultimatePlanWorkspace\package.json",
        "$ultimatePlanWorkspace\pyproject.toml",
        "$ultimatePlanWorkspace\docker-compose.yml"
    )

    foreach ($file in $configFiles) {
        if (Test-Path $file) {
            $gitDiff = git -C $ultimatePlanWorkspace diff --name-only $file 2>$null
            if ($gitDiff) {
                $configDrift++
            }
        }
    }
} catch {
    $configDrift = -1
}

# 3. Process Drift - Procesos corriendo vs esperados
$processDrift = 0
try {
    # Verificar procesos críticos
    $expectedProcesses = @("node", "python", "git")
    $runningProcesses = Get-Process | Select-Object -ExpandProperty ProcessName -Unique

    foreach ($process in $expectedProcesses) {
        if ($process -notin $runningProcesses) {
            $processDrift++
        }
    }
} catch {
    $processDrift = -1
}

# 4. Time Drift - Desviación temporal en schedules
$timeDrift = 0
try {
    # Verificar último ritual vs schedule esperado (cada 4 horas)
    $lastRitual = Get-Content $ritualLogFile -Tail 1 -ErrorAction SilentlyContinue
    if ($lastRitual) {
        $lastEvent = $lastRitual | ConvertFrom-Json
        $lastTimestamp = [DateTime]::Parse($lastEvent.timestamp)
        $hoursSinceLast = ((Get-Date) - $lastTimestamp).TotalHours

        if ($hoursSinceLast -gt 6) {  # Más de 6 horas sin ritual
            $timeDrift = [math]::Round($hoursSinceLast / 24, 1)  # Días de drift
        }
    } else {
        $timeDrift = 1  # No hay rituals registrados
    }
} catch {
    $timeDrift = -1
}

# --- CALCULAR TOTAL DE DIVERGENCIAS ---
$totalDrift = 0
$driftComponents = @{
    repository_drift = $repoDrift
    configuration_drift = $configDrift
    process_drift = $processDrift
    time_drift = $timeDrift
}

foreach ($value in $driftComponents.Values) {
    if ($value -gt 0) {
        $totalDrift += $value
    }
}

# --- OUTPUT ESTÁNDAR ---
$result = @{
    metric = "divergence_count"
    value = $totalDrift
    unit = "count"
    timestamp = (Get-Date -Format "o")
    components = $driftComponents
    status = if ($totalDrift -eq 0) { "aligned" } elseif ($totalDrift -le 3) { "minor_drift" } else { "significant_drift" }
}

$result | ConvertTo-Json -Depth 3
