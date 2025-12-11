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

## 🚀 Herramientas Avanzadas Disponibles

### ✅ Extensiones VS Code Instaladas

- **GitHub Copilot & Chat**: IA para desarrollo y consultas
- **GitHub Pull Requests**: Gestiona PRs directamente desde VS Code
- **GitHub Actions**: Workflows automatizados y CI/CD
- **GitHub Repositories**: Navega repos remotos sin clonar
- **GitLens**: Historial avanzado de Git con blame y comparaciones
- **Git Graph**: Visualización gráfica del historial de Git

### 🤖 GitKraken Integration

- Proceso activo detectado: `LogiAiPromptBuilder`
- Compatible con todas las operaciones Git avanzadas
- Interfaz visual para gestión de repositorios

## 🌐 GitHub Actions Automatizados

### CI/CD Pipeline

- ✅ **Validación automática** de datos de conciencia (JSON)
- ✅ **Verificación de sintaxis** JavaScript
- ✅ **Build del dashboard** en cada push
- ✅ **Deploy automático** a GitHub Pages

### Triggers

**Agente**: Evie Frye (TANA)
**Última actualización**: 2025-12-11
**Estado**: Mental Weave Phase X.5 Active

## 📍 Versión Canónica

Esta es la versión canónica localizada en D:\Evie-of-the-Mental-Weave.
Todas las rutas están configuradas para D:\ (no E:\).

La versión portable/replica permanece en E:\ sin modificaciones.

## 🛠️ Configuración Git Global
