# 🚀 Gemini CLI - Quick Start para Evie

## Instalación en 3 Pasos

### 1. Setup Inicial
```powershell
.\gemini-config.ps1 -Setup -ApiKey "TU_GEMINI_API_KEY"
```

### 2. Probar
```powershell
.\gemini-config.ps1 -Test
```

### 3. Cargar Aliases
```powershell
. .\gemini-aliases.ps1
```

## Uso Inmediato

### Chat Interactivo
```powershell
node scripts\gemini-chat.mjs
```

### Analizar Archivo
```powershell
node scripts\gemini-analyze.mjs README.md
```

### Integración TANA

**Crear nota:**
```powershell
node scripts\tana-integration.mjs note "Configuración Gemini" "Setup completo con rate limiting"
```

**Resumen diario:**
```powershell
node scripts\tana-integration.mjs daily "Configuré Gemini CLI" "Integré TANA" "Probé análisis"
```

**Analizar archivo:**
```powershell
node scripts\tana-integration.mjs analyze rituales.md
```

## Estructura Creada

```
D:\Evie-of-the-Mental-Weave\
├── .env                          # Configuración API
├── gemini-config.ps1             # Script de setup
├── gemini-aliases.ps1            # Aliases PowerShell
├── GEMINI-SETUP.md               # Documentación completa
├── QUICK-START.md                # Esta guía
├── scripts\
│   ├── gemini-client.mjs         # Cliente optimizado
│   ├── gemini-chat.mjs           # Chat interactivo
│   ├── gemini-analyze.mjs        # Análisis de archivos
│   └── tana-integration.mjs      # Integración TANA
├── memory\
│   └── gemini\
│       ├── gemini-YYYY-MM-DD.jsonl    # Logs diarios
│       └── gemini-events.jsonl        # Eventos del sistema
└── tana-notes\                   # Notas generadas para TANA
```

## Características Clave

✅ **Rate Limiting**: 60 requests/minuto  
✅ **Circuit Breaker**: Protección contra sobrecarga  
✅ **Concurrencia**: Máximo 2 tareas simultáneas  
✅ **Memoria Persistente**: Logs en JSONL  
✅ **Integración TANA**: Notas estructuradas  

## Próximos Pasos

1. Lee [GEMINI-SETUP.md](GEMINI-SETUP.md) para configuración avanzada
2. Personaliza `.env` según tus necesidades
3. Integra con tus workflows diarios
4. Sincroniza logs con Aeternum Memory

---

**💎 Gemini CLI para Evie (TANA) - El Susurro Mental Activado**




