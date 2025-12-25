# RUNNER LOAD - CARGA DE RUNNERS AUTO-HOSPEDADOS
# Guardian: Evie (Infraestructura)
# Propósito: Medir carga actual de runners (CPU, memoria, cola)

$evieWorkspace = "D:\Ultimate-Plan\Evie-of-The-Mental-Weave"

# --- MÉTRICAS DE CARGA ---

# 1. CPU Load (%)
$cpuLoad = 0
try {
    $cpu = Get-Counter '\Processor(_Total)\% Processor Time' -SampleInterval 1 -MaxSamples 1
    $cpuLoad = [math]::Round($cpu.CounterSamples.CookedValue, 2)
} catch {
    $cpuLoad = -1
}

# 2. Memory Load (MB)
$memoryLoad = 0
try {
    $os = Get-CimInstance Win32_OperatingSystem
    $totalMemory = $os.TotalVisibleMemorySize
    $freeMemory = $os.FreePhysicalMemory
    $memoryLoad = [math]::Round(($totalMemory - $freeMemory) / 1024, 2)
} catch {
    $memoryLoad = -1
}

# 3. Queue Length (simulado - en producción vendría de GitHub API)
# Número de jobs esperando en cola
$queueLength = 0
try {
    # Placeholder: en producción consultar GitHub Actions API
    # Por ahora, simular basado en carga del sistema
    if ($cpuLoad -gt 80 -or $memoryLoad -gt 30000) {
        $queueLength = [math]::Round(($cpuLoad + $memoryLoad/1000) / 20, 0)
    }
} catch {
    $queueLength = -1
}

# 4. Active Jobs (simulado)
$activeJobs = 0
try {
    # Contar procesos relacionados con CI/CD
    $ciProcesses = Get-Process | Where-Object {
        $_.ProcessName -match "(node|npm|python|git|docker)" -and
        $_.CPU -gt 0
    }
    $activeJobs = $ciProcesses.Count
} catch {
    $activeJobs = -1
}

# --- CALCULAR LOAD COMPUESTO ---
$loadComponents = @{
    cpu_percent = $cpuLoad
    memory_mb = $memoryLoad
    queue_length = $queueLength
    active_jobs = $activeJobs
}

# Score compuesto (0-100, donde 100 es máxima carga)
$cpuScore = [math]::Min(100, $cpuLoad * 2)  # CPU >50% = score alto
$memoryScore = [math]::Min(100, ($memoryLoad / 32000) * 100)  # 32GB = 100%
$queueScore = [math]::Min(100, $queueLength * 20)  # Cada job en cola = +20
$jobScore = [math]::Min(100, $activeJobs * 25)  # Cada job activo = +25

$compositeLoad = [math]::Round(($cpuScore + $memoryScore + $queueScore + $jobScore) / 4, 1)

# --- OUTPUT ESTÁNDAR ---
$result = @{
    metric = "runner_load"
    value = $compositeLoad
    unit = "percent"
    timestamp = (Get-Date -Format "o")
    components = $loadComponents
    status = if ($compositeLoad -lt 30) { "light" } elseif ($compositeLoad -lt 70) { "moderate" } else { "heavy" }
}

$result | ConvertTo-Json -Depth 3
