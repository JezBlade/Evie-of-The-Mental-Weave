# 💎 Gemini CLI - Configuración Optimizada para Evie (TANA)

## 🎯 Características

- **Rate Limiting Inteligente**: Máximo 60 requests/minuto (configurable)
- **Circuit Breaker**: Protección contra sobrecarga de API
- **Concurrencia Controlada**: Máximo 2 tareas simultáneas
- **Memoria Persistente**: Logs en JSONL para Aeternum Memory
- **Cola de Trabajo**: Serialización automática de requests
- **Retry con Backoff**: Máximo 1 reintento automático

## 🚀 Instalación Rápida

### 1. Configuración Inicial

```powershell
# Ejecutar setup completo
.\gemini-config.ps1 -Setup -ApiKey "TU_API_KEY_AQUI"

# O si ya tienes la API key en variable de entorno
$env:GEMINI_API_KEY = "tu-api-key"
.\gemini-config.ps1 -Setup
```

### 2. Probar Instalación

```powershell
.\gemini-config.ps1 -Test
```

### 3. Cargar Aliases

```powershell
. .\gemini-aliases.ps1
```

## 📖 Uso

### Chat Interactivo

```powershell
node scripts\gemini-chat.mjs
```

Ejemplo:
```
💎 Chat Gemini para Evie (TANA)
Escribe "salir" para terminar

Tú: ¿Cómo integro TANA con el proyecto?
💎 Gemini: [respuesta detallada]

Tú: salir
👋 ¡Hasta luego!
```

### Análisis de Archivos

```powershell
node scripts\gemini-analyze.mjs README.md
```

Analiza cualquier archivo y proporciona:
- Resumen conciso
- Puntos clave
- Sugerencias de mejora
- Integración con TANA

### Consulta Rápida (con alias)

```powershell
# Después de cargar aliases
gq "Explica el patrón Observer en 3 líneas"
```

### Uso Programático

```javascript
import GeminiClient from './scripts/gemini-client.mjs';

const client = new GeminiClient();

// Consulta simple
const response = await client.generate('Tu prompt aquí');
console.log(response);

// Con opciones personalizadas
const response2 = await client.generate('Prompt', {
    temperature: 0.9,
    maxTokens: 4096
});
```

## ⚙️ Configuración

Edita `.env` para personalizar:

```env
# Modelo (opciones: gemini-2.0-flash-exp, gemini-1.5-pro, gemini-1.5-flash)
GEMINI_MODEL=gemini-2.0-flash-exp

# Tokens máximos por respuesta
GEMINI_MAX_TOKENS=8192

# Temperatura (0.0 = determinista, 1.0 = creativo)
GEMINI_TEMPERATURE=0.7

# Rate Limiting
GEMINI_MAX_CONCURRENT=2      # Tareas simultáneas
GEMINI_RATE_LIMIT=60         # Requests por minuto
GEMINI_RETRY_MAX=1           # Reintentos automáticos
```

## 🛡️ Protecciones Implementadas

### 1. Rate Limiting
- Respeta límites de API automáticamente
- Espera entre requests para no exceder cuota
- Configurable vía `GEMINI_RATE_LIMIT`

### 2. Circuit Breaker
- Se activa ante errores 429 (quota exceeded)
- Bloquea requests por 5 minutos
- Evita cascadas de errores

### 3. Cola de Trabajo
- Serializa requests cuando hay concurrencia máxima
- FIFO (First In, First Out)
- No pierde requests

### 4. Retry con Backoff
- Máximo 1 reintento automático
- Evita bucles infinitos
- Logs detallados de errores

## 📊 Memoria y Logs

### Ubicación
```
D:\Evie-of-the-Mental-Weave\memory\gemini\
├── gemini-2025-12-05.jsonl      # Interacciones diarias
├── gemini-events.jsonl          # Eventos (errores, circuit breaker)
└── ...
```

### Formato JSONL

Cada línea es un JSON válido:

```json
{"timestamp":"2025-12-05T10:30:00.000Z","prompt":"Analiza...","response":"...","model":"gemini-2.0-flash-exp"}
{"timestamp":"2025-12-05T10:31:00.000Z","type":"CIRCUIT_OPEN","duration":300000}
```

### Integración con Aeternum Memory

Los logs se pueden sincronizar con:
```powershell
# Copiar a Aeternum Memory
Copy-Item "memory\gemini\*.jsonl" "D:\Ultimate-Plan\Aeternum-Memory\contextos\gemini-cli\"
```

## 🎯 Casos de Uso

### 1. Análisis de Código
```powershell
node scripts\gemini-analyze.mjs rituales.md
```

### 2. Generación de Documentación
```javascript
const client = new GeminiClient();
const code = readFileSync('script.js', 'utf8');
const docs = await client.generate(`Genera documentación JSDoc para:\n${code}`);
```

### 3. Revisión de Commits
```javascript
const diff = execSync('git diff HEAD~1').toString();
const review = await client.generate(`Revisa este commit:\n${diff}`);
```

### 4. Integración TANA
```javascript
const tanaNote = await client.generate(`
Crea una nota TANA para:
- Proyecto: Evie Mental Weave
- Tarea: ${taskDescription}
- Contexto: ${context}
`);
```

## 🔧 Troubleshooting

### Error: "GEMINI_API_KEY no configurada"
```powershell
# Verificar .env
Get-Content .env | Select-String "GEMINI_API_KEY"

# O configurar manualmente
$env:GEMINI_API_KEY = "tu-api-key"
```

### Error: "Circuit breaker abierto"
- Espera 5 minutos
- Verifica cuota en Google AI Studio
- Reduce `GEMINI_RATE_LIMIT` en `.env`

### Error: "Module not found"
```powershell
# Reinstalar dependencias
npm install @google/generative-ai dotenv
```

### Logs no se crean
```powershell
# Verificar permisos
Test-Path "D:\Evie-of-the-Mental-Weave\memory\gemini"

# Crear manualmente si es necesario
New-Item -ItemType Directory -Path "memory\gemini" -Force
```

## 📚 Recursos

- [Google AI Studio](https://aistudio.google.com/) - Obtener API key
- [Gemini API Docs](https://ai.google.dev/docs) - Documentación oficial
- [Ultimate Plan](https://github.com/JezBlade/Ultimate-Plan) - Proyecto principal

## 🎭 Integración con Brotherhood AI

Este cliente está diseñado para integrarse con:
- **Leonardo** (Arquitectura)
- **Ezio** (Ejecución)
- **Aya** (Análisis)
- **Evie** (TANA - Mental Weave)
- **Altaïr** (Coordinación)

### Comunicación entre Agentes

```javascript
// Delegar tarea a otro agente
const agentPath = 'D:/Ultimate-Plan/MPC-Compendio-Operativo/agent-communication';
const request = {
    id: `gemini-${Date.now()}`,
    timestamp: new Date().toISOString(),
    source: 'gemini-cli',
    target: 'evie',
    task: 'analyze-tana-integration',
    context: { /* ... */ }
};

writeFileSync(
    join(agentPath, 'evie-requests.json'),
    JSON.stringify([request], null, 2)
);
```

## 🚀 Próximos Pasos

1. **Automatización**: Crear workflows con GitHub Actions
2. **Dashboard**: Visualizar métricas de uso
3. **Plugins**: Extensiones para VS Code
4. **Multi-modelo**: Soporte para Claude, GPT-4, etc.

---

**💎 Gemini CLI para Evie (TANA) - El Susurro Mental Activado**

*Última actualización: 2025-12-05*
*Agente responsable: Evie Frye (TANA)*




