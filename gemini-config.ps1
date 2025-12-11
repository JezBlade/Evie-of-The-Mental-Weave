# 💎 GEMINI CLI - CONFIGURACIÓN OPTIMIZADA PARA EVIE (TANA)
# Integración eficiente con Ultimate Plan y Aeternum Memory

param(
    [string]$ApiKey = $env:GEMINI_API_KEY,
    [switch]$Setup,
    [switch]$Test,
    [switch]$CreateAliases
)

$ErrorActionPreference = "Stop"

# 📍 Rutas del proyecto
$EvieRoot = "D:\Evie-of-the-Mental-Weave"
$UltimatePlanRoot = "D:\Ultimate-Plan"
$ConfigFile = "$EvieRoot\.env"
$MemoryPath = "$EvieRoot\memory\gemini"
$ScriptsPath = "$EvieRoot\scripts"

Write-Host "💎 Configurando Gemini CLI para Evie (TANA)..." -ForegroundColor Cyan

# 🔧 Setup completo
if ($Setup) {
    Write-Host "`n📦 Instalando dependencias..." -ForegroundColor Yellow
    
    # Crear estructura de directorios
    $dirs = @($MemoryPath, $ScriptsPath, "$EvieRoot\logs")
    foreach ($dir in $dirs) {
        if (!(Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
            Write-Host "OK Creado: $dir" -ForegroundColor Green
        }
    }
    
    # Instalar @google/generative-ai
    Push-Location $EvieRoot
    if (!(Test-Path "package.json")) {
        npm init -y | Out-Null
    }
    npm install @google/generative-ai dotenv --save | Out-Null
    Write-Host "OK Dependencias instaladas" -ForegroundColor Green
    Pop-Location
    
    # Configurar .env
    if ($ApiKey) {
        $envContent = @"
# Gemini API Configuration
GEMINI_API_KEY=$ApiKey
GEMINI_MODEL=gemini-2.0-flash-exp
GEMINI_MAX_TOKENS=8192
GEMINI_TEMPERATURE=0.7

# Rate Limiting
GEMINI_MAX_CONCURRENT=2
GEMINI_RATE_LIMIT=60
GEMINI_RETRY_MAX=1

# Paths
EVIE_ROOT=$EvieRoot
ULTIMATE_PLAN_ROOT=$UltimatePlanRoot
"@
        Set-Content -Path $ConfigFile -Value $envContent -Encoding UTF8
        Write-Host "OK Archivo .env configurado" -ForegroundColor Green
    }
}

# 🎯 Crear scripts optimizados
if ($Setup -or $CreateAliases) {
    Write-Host "`n🎯 Creando scripts de integración..." -ForegroundColor Yellow
    
    # Cliente Gemini optimizado con rate limiting
    $clientScript = @'
// 💎 Cliente Gemini Optimizado con Rate Limiting y Circuit Breaker
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';
import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'fs';
import { join } from 'path';

config();

class GeminiClient {
    constructor() {
        this.apiKey = process.env.GEMINI_API_KEY;
        this.model = process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp';
        this.maxConcurrent = parseInt(process.env.GEMINI_MAX_CONCURRENT || '2');
        this.rateLimit = parseInt(process.env.GEMINI_RATE_LIMIT || '60');
        this.retryMax = parseInt(process.env.GEMINI_RETRY_MAX || '1');
        
        this.activeTasks = 0;
        this.requestQueue = [];
        this.lastRequestTime = 0;
        this.circuitOpen = false;
        this.circuitOpenUntil = 0;
        
        if (!this.apiKey) {
            throw new Error('GEMINI_API_KEY no configurada');
        }
        
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        this.memoryPath = join(process.env.EVIE_ROOT || 'D:\\Evie-of-the-Mental-Weave', 'memory', 'gemini');
        
        if (!existsSync(this.memoryPath)) {
            mkdirSync(this.memoryPath, { recursive: true });
        }
    }
    
    async waitForRateLimit() {
        const now = Date.now();
        const minInterval = (60 * 1000) / this.rateLimit;
        const timeSinceLastRequest = now - this.lastRequestTime;
        
        if (timeSinceLastRequest < minInterval) {
            await new Promise(resolve => setTimeout(resolve, minInterval - timeSinceLastRequest));
        }
        
        this.lastRequestTime = Date.now();
    }
    
    checkCircuit() {
        if (this.circuitOpen && Date.now() < this.circuitOpenUntil) {
            throw new Error('Circuit breaker abierto. Reintenta en unos minutos.');
        }
        this.circuitOpen = false;
    }
    
    openCircuit(durationMs = 300000) {
        this.circuitOpen = true;
        this.circuitOpenUntil = Date.now() + durationMs;
        this.logEvent('CIRCUIT_OPEN', { duration: durationMs });
    }
    
    async generate(prompt, options = {}) {
        this.checkCircuit();
        
        if (this.activeTasks >= this.maxConcurrent) {
            return new Promise((resolve, reject) => {
                this.requestQueue.push({ prompt, options, resolve, reject });
            });
        }
        
        this.activeTasks++;
        
        try {
            await this.waitForRateLimit();
            
            const model = this.genAI.getGenerativeModel({ model: this.model });
            const result = await model.generateContent({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: options.temperature || parseFloat(process.env.GEMINI_TEMPERATURE || '0.7'),
                    maxOutputTokens: options.maxTokens || parseInt(process.env.GEMINI_MAX_TOKENS || '8192'),
                }
            });
            
            const response = result.response.text();
            this.logInteraction(prompt, response);
            
            return response;
            
        } catch (error) {
            if (error.message.includes('429') || error.message.includes('quota')) {
                this.openCircuit();
            }
            
            this.logEvent('ERROR', { error: error.message, prompt: prompt.substring(0, 100) });
            throw error;
            
        } finally {
            this.activeTasks--;
            
            if (this.requestQueue.length > 0) {
                const next = this.requestQueue.shift();
                this.generate(next.prompt, next.options)
                    .then(next.resolve)
                    .catch(next.reject);
            }
        }
    }
    
    logInteraction(prompt, response) {
        const logFile = join(this.memoryPath, `gemini-${new Date().toISOString().split('T')[0]}.jsonl`);
        const entry = {
            timestamp: new Date().toISOString(),
            prompt: prompt.substring(0, 200),
            response: response.substring(0, 500),
            model: this.model
        };
        
        writeFileSync(logFile, JSON.stringify(entry) + '\n', { flag: 'a' });
    }
    
    logEvent(type, data) {
        const logFile = join(this.memoryPath, 'gemini-events.jsonl');
        const entry = {
            timestamp: new Date().toISOString(),
            type,
            ...data
        };
        
        writeFileSync(logFile, JSON.stringify(entry) + '\n', { flag: 'a' });
    }
}

export default GeminiClient;
'@
    
    Set-Content -Path "$ScriptsPath\gemini-client.mjs" -Value $clientScript -Encoding UTF8
    Write-Host "OK Cliente Gemini creado" -ForegroundColor Green
    
    # Script de análisis rápido
    $analyzeScript = @'
// 🔍 Análisis rápido con Gemini
import GeminiClient from './gemini-client.mjs';
import { readFileSync } from 'fs';

const client = new GeminiClient();
const file = process.argv[2];

if (!file) {
    console.error('❌ Uso: node gemini-analyze.mjs <archivo>');
    process.exit(1);
}

const content = readFileSync(file, 'utf8');
const prompt = `Analiza este archivo del proyecto Evie (TANA):

Archivo: ${file}
Contenido:
${content}

Proporciona:
1. Resumen conciso
2. Puntos clave
3. Sugerencias de mejora
4. Integración con TANA`;

try {
    const response = await client.generate(prompt);
    console.log('💎 Análisis Gemini:\n');
    console.log(response);
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
'@
    
    Set-Content -Path "$ScriptsPath\gemini-analyze.mjs" -Value $analyzeScript -Encoding UTF8
    Write-Host "OK Script de analisis creado" -ForegroundColor Green
    
    # Script de chat interactivo
    $chatScript = @'
// 💬 Chat interactivo con Gemini
import GeminiClient from './gemini-client.mjs';
import readline from 'readline';

const client = new GeminiClient();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('💎 Chat Gemini para Evie (TANA)');
console.log('Escribe "salir" para terminar\n');

const chat = async () => {
    rl.question('Tú: ', async (input) => {
        if (input.toLowerCase() === 'salir') {
            console.log('👋 ¡Hasta luego!');
            rl.close();
            return;
        }
        
        try {
            const response = await client.generate(input);
            console.log(`\n💎 Gemini: ${response}\n`);
        } catch (error) {
            console.error(`❌ Error: ${error.message}\n`);
        }
        
        chat();
    });
};

chat();
'@
    
    Set-Content -Path "$ScriptsPath\gemini-chat.mjs" -Value $chatScript -Encoding UTF8
    Write-Host "OK Script de chat creado" -ForegroundColor Green
    
    # Aliases de PowerShell
    $aliasScript = @"
# 💎 Aliases de Gemini para PowerShell
Set-Alias -Name gemini-analyze -Value { node `"$ScriptsPath\gemini-analyze.mjs`" `$args }
Set-Alias -Name gemini-chat -Value { node `"$ScriptsPath\gemini-chat.mjs`" }

function Invoke-GeminiQuick {
    param([string]`$prompt)
    node -e "import GeminiClient from '$ScriptsPath/gemini-client.mjs'; const c = new GeminiClient(); c.generate('`$prompt').then(r => console.log(r));"
}
Set-Alias -Name gq -Value Invoke-GeminiQuick

Write-Host '💎 Aliases de Gemini cargados' -ForegroundColor Cyan
Write-Host '  gemini-analyze <archivo> - Analizar archivo' -ForegroundColor White
Write-Host '  gemini-chat - Chat interactivo' -ForegroundColor White
Write-Host '  gq <prompt> - Consulta rápida' -ForegroundColor White
"@
    
    Set-Content -Path "$EvieRoot\gemini-aliases.ps1" -Value $aliasScript -Encoding UTF8
    Write-Host "OK Aliases creados en gemini-aliases.ps1" -ForegroundColor Green
}

# 🧪 Test de configuración
if ($Test) {
    Write-Host "`n🧪 Probando configuración..." -ForegroundColor Yellow
    
    if (!(Test-Path $ConfigFile)) {
        Write-Host "❌ Archivo .env no encontrado. Ejecuta con -Setup primero" -ForegroundColor Red
        exit 1
    }
    
    # Test simple
    $testScript = @'
import GeminiClient from './scripts/gemini-client.mjs';

const client = new GeminiClient();
const response = await client.generate('Responde con "OK" si estás funcionando correctamente.');
console.log('✅ Test exitoso:', response);
'@
    
    $testFile = "$EvieRoot\test-gemini.mjs"
    Set-Content -Path $testFile -Value $testScript -Encoding UTF8
    
    Push-Location $EvieRoot
    node $testFile
    Pop-Location
    
    Remove-Item $testFile
}

# 📋 Resumen
Write-Host "`n📋 CONFIGURACIÓN COMPLETADA" -ForegroundColor Magenta
Write-Host "================================" -ForegroundColor Magenta
Write-Host "✅ Gemini CLI configurado para Evie (TANA)" -ForegroundColor Green
Write-Host "`n🎯 PRÓXIMOS PASOS:" -ForegroundColor Cyan
Write-Host "1. Cargar aliases: . .\gemini-aliases.ps1" -ForegroundColor White
Write-Host "2. Probar: node scripts\gemini-chat.mjs" -ForegroundColor White
Write-Host "3. Analizar archivo: node scripts\gemini-analyze.mjs <archivo>" -ForegroundColor White
Write-Host "`n💎 Gemini integrado con Evie - ¡El Susurro Mental Activado!" -ForegroundColor Green




