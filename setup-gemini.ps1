param([string]$ApiKey = $env:GEMINI_API_KEY)

$EvieRoot = "D:\Evie-of-the-Mental-Weave"
$UltimatePlan = "D:\Ultimate-Plan"

Write-Host "Configurando Gemini CLI..." -ForegroundColor Cyan

# Crear directorios
$dirs = @("$EvieRoot\scripts", "$EvieRoot\memory\gemini", "$EvieRoot\logs", "$EvieRoot\tana-notes")
foreach ($d in $dirs) {
    if (!(Test-Path $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null }
}

# Crear .env
if ($ApiKey) {
    @"
GEMINI_API_KEY=$ApiKey
GEMINI_MODEL=gemini-2.0-flash-exp
GEMINI_MAX_TOKENS=8192
GEMINI_TEMPERATURE=0.7
GEMINI_MAX_CONCURRENT=2
GEMINI_RATE_LIMIT=60
GEMINI_RETRY_MAX=1
EVIE_ROOT=$EvieRoot
ULTIMATE_PLAN_ROOT=$UltimatePlan
"@ | Out-File "$EvieRoot\.env" -Encoding UTF8
}

# Instalar dependencias
Push-Location $EvieRoot
if (!(Test-Path "package.json")) { npm init -y | Out-Null }
npm install @google/generative-ai dotenv --save 2>&1 | Out-Null
Pop-Location

# Crear package.json con type module
@"
{
  "name": "evie-mental-weave",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "@google/generative-ai": "^0.21.0",
    "dotenv": "^16.4.5"
  }
}
"@ | Out-File "$EvieRoot\package.json" -Encoding UTF8

# Reinstalar con configuración correcta
Push-Location $EvieRoot
npm install 2>&1 | Out-Null
Pop-Location

# Crear aliases
@"
Set-Alias ga { node scripts\gemini-analyze.mjs `$args }
Set-Alias gc { node scripts\gemini-chat.mjs }
Set-Alias gt { node scripts\tana-integration.mjs `$args }
function gq { param([string]`$p); node -e "import GeminiClient from './scripts/gemini-client.mjs';const c=new GeminiClient();c.generate('`$p').then(console.log);" }
Write-Host "Aliases cargados: ga, gc, gt, gq" -ForegroundColor Green
"@ | Out-File "$EvieRoot\gemini-aliases.ps1" -Encoding UTF8

Write-Host "OK Setup completo" -ForegroundColor Green
Write-Host "Cargar aliases: . .\gemini-aliases.ps1" -ForegroundColor Cyan




