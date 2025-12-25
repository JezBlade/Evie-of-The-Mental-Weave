#Requires -RunAsAdministrator

Write-Host "=== Canon Técnico Sellado - Limpieza y Configuración ===" -ForegroundColor Cyan

# Paso 1: Desinstalación de runtimes no canónicos
Write-Host "`n1. Erradicando runtimes no canónicos de C:\Program Files..." -ForegroundColor Yellow

# Desinstalar Node.js usando MSI
$nodeGuid = "{5ABA83F0-49A0-42C9-A3E8-47F80193A9AD}"
Write-Host "Desinstalando Node.js..." -ForegroundColor Red
try {
  Start-Process "msiexec.exe" -ArgumentList "/x $nodeGuid /quiet /norestart" -Wait -ErrorAction Stop
  Write-Host "Node.js desinstalado exitosamente." -ForegroundColor Green
}
catch {
  $errorMsg = $_.Exception.Message
  Write-Host ('Error desinstalando Node.js: ' + $errorMsg) -ForegroundColor Red
}

# Desinstalar Python usando MSI (Core Interpreter)
$pythonGuid = "{B074012B-9B85-4049-BA01-A58A8C4C2236}"
Write-Host "Desinstalando Python 3.11..." -ForegroundColor Red
try {
  Start-Process "msiexec.exe" -ArgumentList "/x $pythonGuid /quiet /norestart" -Wait -ErrorAction Stop
  Write-Host "Python 3.11 desinstalado exitosamente." -ForegroundColor Green
}
catch {
  $errorMsg = $_.Exception.Message
  Write-Host ('Error desinstalando Python: ' + $errorMsg) -ForegroundColor Red
}

# Desinstalar PowerShell 7 usando winget
Write-Host "Desinstalando PowerShell 7..." -ForegroundColor Red
try {
  Start-Process "winget" -ArgumentList "uninstall --id Microsoft.PowerShell --source winget --silent" -Wait -ErrorAction Stop
  Write-Host "PowerShell 7 desinstalado exitosamente." -ForegroundColor Green
}
catch {
  $errorMsg = $_.Exception.Message
  Write-Host ('Error desinstalando PowerShell 7: ' + $errorMsg) -ForegroundColor Red
}

# Paso 2: Instalación canónica de Node.js en D:\
Write-Host "`n2. Instalando Node.js canónicamente en D:\..." -ForegroundColor Yellow

$nodeDir = "D:\Ultimate-Plan\Program-Files\node"
$nodeZip = "$env:TEMP\nodejs.zip"
$nodeUrl = "https://nodejs.org/dist/v20.11.1/node-v20.11.1-win-x64.zip"  # Última LTS, ajustar si necesario

if (!(Test-Path $nodeDir)) {
  try {
    Write-Host "Descargando Node.js..." -ForegroundColor Blue
    Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeZip -ErrorAction Stop

    Write-Host "Extrayendo Node.js..." -ForegroundColor Blue
    Expand-Archive -Path $nodeZip -DestinationPath "D:\Ultimate-Plan\Program-Files" -ErrorAction Stop

    # Renombrar carpeta extraída
    $extractedDir = Get-ChildItem "D:\Ultimate-Plan\Program-Files" | Where-Object { $_.Name -like "node-v*" } | Select-Object -First 1
    if ($extractedDir) {
      Rename-Item $extractedDir.FullName $nodeDir -ErrorAction Stop
    }

    Remove-Item $nodeZip -ErrorAction SilentlyContinue
    Write-Host "Node.js instalado en $nodeDir" -ForegroundColor Green
  }
  catch {
    $errorMsg = $_.Exception.Message
    Write-Host ('Error instalando Node.js: ' + $errorMsg) -ForegroundColor Red
  }
}
else {
  Write-Host "Node.js ya existe en $nodeDir" -ForegroundColor Green
}

# Verificación de instalación
if (Test-Path "$nodeDir\node.exe") {
  $version = & "$nodeDir\node.exe" --version
  Write-Host "Node.js versión: $version" -ForegroundColor Green
}
else {
  Write-Host "Error: Node.js no instalado correctamente." -ForegroundColor Red
}

# Paso 3: Normalización de variables de entorno
Write-Host "`n3. Normalizando variables de entorno..." -ForegroundColor Yellow

$envVars = @{
  "ULTIMATE_PLAN_PATH" = "D:\Ultimate-Plan"
  "ULTIMATE_PLAN_ENV"  = "D:\Ultimate-Plan\env"
  "ULTIMATE_PLAN_LOGS" = "D:\Ultimate-Plan\logs"
  "NODE_HOME"          = "D:\Ultimate-Plan\Program-Files\node"
  "PYTHON_HOME"        = "D:\Ultimate-Plan\Program-Files\python"
}

foreach ($key in $envVars.Keys) {
  try {
    [Environment]::SetEnvironmentVariable($key, $envVars[$key], "Machine")
    Write-Host "Variable $key configurada: $($envVars[$key])" -ForegroundColor Green
  }
  catch {
    $errorMsg = $_.Exception.Message
    Write-Host ('Error configurando ' + $key + ': ' + $errorMsg) -ForegroundColor Red
  }
}

# Paso 4: Normalización del PATH
Write-Host "`n4. Normalizando PATH..." -ForegroundColor Yellow

$currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
$pathArray = $currentPath -split ";"

# Filtrar rutas no canónicas
$filteredPath = $pathArray | Where-Object {
  $_ -notlike "C:\Program Files\nodejs*" -and
  $_ -notlike "C:\Program Files\Python311*" -and
  $_ -notlike "C:\Program Files\PowerShell*"
}

# Añadir rutas canónicas al inicio
$canonicalPaths = @(
  "D:\Ultimate-Plan\Program-Files\node",
  "D:\Ultimate-Plan\Program-Files\python",
  "D:\Ultimate-Plan\Program-Files\python\Scripts",
  "D:\Ultimate-Plan\Program-Files\npm-global"
)

$newPath = ($canonicalPaths + $filteredPath) -join ";"

try {
  [Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
  Write-Host "PATH actualizado exitosamente." -ForegroundColor Green
  Write-Host "Nuevas rutas prioritarias: $($canonicalPaths -join ', ')" -ForegroundColor Green
}
catch {
  $errorMsg = $_.Exception.Message
  Write-Host ('Error actualizando PATH: ' + $errorMsg) -ForegroundColor Red
}

# Paso 5: Auditoría final
Write-Host "`n5. Auditoría final..." -ForegroundColor Yellow

Write-Host "Verificando node_modules en C:\Users..." -ForegroundColor Blue
$nodeModulesCount = (Get-ChildItem C:\Users -Recurse -Directory -Filter node_modules -ErrorAction SilentlyContinue | Measure-Object).Count
Write-Host "Carpetas node_modules encontradas: $nodeModulesCount" -ForegroundColor $(if ($nodeModulesCount -eq 0) { "Green" } else { "Yellow" })

Write-Host "Verificando .venv en C:\Users..." -ForegroundColor Blue
$venvCount = (Get-ChildItem C:\Users -Recurse -Directory -Filter .venv -ErrorAction SilentlyContinue | Measure-Object).Count
Write-Host "Carpetas .venv encontradas: $venvCount" -ForegroundColor $(if ($venvCount -eq 0) { "Green" } else { "Yellow" })

Write-Host "Verificando comandos..." -ForegroundColor Blue
$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
$pythonCmd = Get-Command python -ErrorAction SilentlyContinue

if ($nodeCmd -and $nodeCmd.Source -like "D:\Ultimate-Plan*") {
  Write-Host "Node.js resuelve correctamente: $($nodeCmd.Source)" -ForegroundColor Green
}
else {
  Write-Host "Node.js NO resuelve a D:\ : $($nodeCmd.Source)" -ForegroundColor Red
}

if ($pythonCmd -and $pythonCmd.Source -like "D:\Ultimate-Plan*") {
  Write-Host "Python resuelve correctamente: $($pythonCmd.Source)" -ForegroundColor Green
}
else {
  Write-Host "Python NO resuelve a D:\ : $($pythonCmd.Source)" -ForegroundColor Red
}

Write-Host "`n=== Proceso completado ===" -ForegroundColor Cyan
Write-Host "Reinicia la terminal y verifica con 'where node' y 'where python'" -ForegroundColor Yellow