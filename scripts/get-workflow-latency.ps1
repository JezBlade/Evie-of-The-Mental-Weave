# WORKFLOW LATENCY - LATENCIA DE WORKFLOWS
# Guardian: Evie (Infraestructura)
# Propósito: Medir tiempo real vs esperado en workflows

$evieWorkspace = "D:\Ultimate-Plan\Evie-of-The-Mental-Weave"
$ritualLogFile = "$evieWorkspace\RITUAL_LOG_SYNC.jsonl"

# --- MÉTRICAS DE LATENCIA ---

# 1. Ritual Execution Time - Tiempo de ejecución de rituals
$ritualLatency = @{
    last_execution_time = 0
    average_execution_time = 0
    expected_duration = 300  # 5 minutos esperado
    deviation_percent = 0
}

try {
    # Leer últimos 10 rituals para calcular promedio
    $recentRituals = Get-Content $ritualLogFile -Tail 20 -ErrorAction SilentlyContinue |
        ForEach-Object {
            try { $_ | ConvertFrom-Json } catch { $null }
        } |
        Where-Object { $_.event_type -eq "consciousness_ritual" -or $_.ritual_type -eq "tejido" } |
        Sort-Object { [DateTime]::Parse($_.timestamp) } -Descending |
        Select-Object -First 10

    if ($recentRituals.Count -gt 0) {
        $executionTimes = @()
        $lastRitual = $recentRituals[0]

        # Calcular tiempo entre rituals consecutivos
        for ($i = 0; $i -lt ($recentRituals.Count - 1); $i++) {
            $current = [DateTime]::Parse($recentRituals[$i].timestamp)
            $previous = [DateTime]::Parse($recentRituals[$i + 1].timestamp)
            $executionTimes += ($current - $previous).TotalSeconds
        }

        if ($executionTimes.Count -gt 0) {
            $ritualLatency.last_execution_time = [math]::Round($executionTimes[0], 1)
            $ritualLatency.average_execution_time = [math]::Round(($executionTimes | Measure-Object -Average).Average, 1)
            $ritualLatency.deviation_percent = [math]::Round((($ritualLatency.average_execution_time - $ritualLatency.expected_duration) / $ritualLatency.expected_duration) * 100, 1)
        }
    }
} catch {
    # Valores por defecto si falla
}

# 2. System Response Time - Tiempo de respuesta del sistema
$systemLatency = @{
    average_response_time = 0
    last_response_time = 0
    expected_response = 5  # 5 segundos esperado
}

try {
    # Medir tiempo de respuesta de operaciones críticas
    $startTime = Get-Date

    # Operación de prueba: listar directorio
    $testOperation = Get-ChildItem $evieWorkspace -Directory | Select-Object -First 1
    $endTime = Get-Date

    $responseTime = ($endTime - $startTime).TotalSeconds
    $systemLatency.last_response_time = [math]::Round($responseTime, 3)
    $systemLatency.average_response_time = [math]::Round($responseTime, 3)  # Simplificado

} catch {
    $systemLatency.last_response_time = -1
    $systemLatency.average_response_time = -1
}

# 3. Network Latency (simulado)
$networkLatency = @{
    average_latency = 0
    last_check = (Get-Date -Format "o")
}

try {
    # Test de conectividad básica
    $testConnection = Test-NetConnection -ComputerName "8.8.8.8" -Port 53 -InformationLevel Quiet
    if ($testConnection) {
        $networkLatency.average_latency = 50  # ms, estimado
    } else {
        $networkLatency.average_latency = -1
    }
} catch {
    $networkLatency.average_latency = -1
}

# --- CALCULAR LATENCIA COMPUESTA ---
$latencyComponents = @{
    ritual_execution_seconds = $ritualLatency.last_execution_time
    system_response_seconds = $systemLatency.last_response_time
    network_latency_ms = $networkLatency.average_latency
    deviation_percent = $ritualLatency.deviation_percent
}

# Score de latencia (0-100, donde 100 es máxima latencia/crítica)
$ritualScore = [math]::Min(100, [math]::Max(0, [math]::Abs($ritualLatency.deviation_percent)))
$systemScore = if ($systemLatency.last_response_time -gt 10) { 100 } elseif ($systemLatency.last_response_time -gt 5) { 50 } else { 0 }
$networkScore = if ($networkLatency.average_latency -eq -1) { 100 } elseif ($networkLatency.average_latency -gt 100) { 75 } else { 0 }

$compositeLatency = [math]::Round(($ritualScore + $systemScore + $networkScore) / 3, 1)

# --- OUTPUT ESTÁNDAR ---
$result = @{
    metric = "workflow_latency"
    value = $compositeLatency
    unit = "percent"
    timestamp = (Get-Date -Format "o")
    components = $latencyComponents
    status = if ($compositeLatency -lt 20) { "optimal" } elseif ($compositeLatency -lt 50) { "acceptable" } else { "concerning" }
}

$result | ConvertTo-Json -Depth 3
