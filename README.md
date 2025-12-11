# Evie-of-the-Mental-Weave

Workspace exclusivo para la agente Evie Frye (TANA) con integración completa de Gemini CLI.

## Setup Completo

```powershell
# 1. Configurar API key en .env
# Editar .env y agregar: GEMINI_API_KEY=tu-api-key

# 2. Cargar aliases
. .\gemini-aliases.ps1

# 3. Probar
node test-gemini.mjs
```

## Comandos Rápidos

```powershell
gc              # Chat interactivo
ga archivo.md   # Analizar archivo
gt note "tema"  # Crear nota TANA
gq "pregunta"   # Consulta rápida
```

## Estructura

```text
D:\Evie-of-the-Mental-Weave\
├── scripts\          # Scripts de Gemini
├── memory\gemini\    # Logs persistentes
├── tana-notes\       # Notas generadas
├── rituales.md       # Rituales diarios
└── bitacora.md       # Registro de actividades
```

## Sincronización

```powershell
# Sincronizar con Aeternum Memory
D:\Ultimate-Plan\scripts\sync-gemini-evie.ps1
```

## Características

- Rate limiting: 60 req/min
- Circuit breaker automático
- Memoria persistente en JSONL
- Integración TANA
- Sincronización con Aeternum Memory

---

**Agente**: Evie Frye (TANA)
**Última actualización**: 2025-12-05

## 📍 Versión Canónica

Esta es la versión canónica localizada en D:\Evie-of-the-Mental-Weave.
Todas las rutas están configuradas para D:\ (no E:\).

La versión portable/replica permanece en E:\ sin modificaciones.

## 🛠️ Configuración Git Global
