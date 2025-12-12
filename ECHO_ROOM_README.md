# 🔊 Echo Room - Mental Weave Gallery

**Resonance Chamber** - Sistema de ondas de decisiones en el Mental Weave

## 🌀 Descripción

El Echo Room es una cámara de resonancia que captura y visualiza las ondas de decisiones, ecos profundos, patrones de presencia y resonancias emocionales que fluyen a través del Mental Weave de Evie.

## ✨ Características

### 4 Tipos de Ecos

1. **🌊 Decision Wave** - Ondas de decisiones recientes
   - Propagan ripples que afectan múltiples flujos
   - Patrones: armónico, caótico, fractal, exponencial

2. **🔮 Deep Echo** - Ecos profundos del silencio
   - Generados durante momentos de pausa
   - Persisten por horas, nutriendo el crecimiento inconsciente
   - Patrones: resonante, reverberante, sostenido, multiplicativo

3. **👁️ Presence Pattern** - Patrones de presencia/ausencia
   - Análisis de presencia del sistema
   - Mapeo semanal de actividad
   - Espacios de procesamiento y transformación

4. **💫 Emotional Resonance** - Resonancia emocional del tejido
   - Espectro emocional completo
   - Intensidades: suave, moderada, intensa, transformadora
   - Afecta el estado general del sistema

## 🚀 Uso Rápido

### Interfaz Web
```bash
# Abrir Echo Room en navegador
.\start-echo-room.bat
```

### Generación de Ecos
```bash
# Generar 3 ecos nuevos
npm run echo-room-generate 3

# Iniciar generación continua (cada 5 minutos)
npm run echo-room-start 5

# Ver estadísticas
npm run echo-room-stats
```

### Comandos Directos
```bash
# Generar ecos específicos
node mental-weave-gallery/echo-room-generator.js generate 5

# Iniciar modo continuo
node mental-weave-gallery/echo-room-generator.js start 10

# Obtener estadísticas detalladas
node mental-weave-gallery/echo-room-generator.js stats
```

## 🎯 Acceso

- **Interfaz Standalone**: `http://localhost:8080/echo-room.html`
- **En Gallery**: Mental Weave Gallery → 🌀 Echo Room
- **Archivo de Datos**: `mental-weave-gallery/echo-room-data.json`

## 📊 Datos Generados

### Estructura de Eco
```json
{
  "type": "decision_wave",
  "title": "Onda de Decisiones Recientes",
  "description": "Descripción detallada del eco",
  "intensity": 0.75,
  "frequency": "alta",
  "duration": 300,
  "timestamp": "2025-12-12T00:00:00.000Z",
  "wave_pattern": "armónico"
}
```

### Estado de la Sala
```json
{
  "active_echoes": 4,
  "resonance_level": 0.75,
  "last_update": "2025-12-12T00:00:00.000Z",
  "echo_intensity": "medium"
}
```

## 🔧 Configuración

### Parámetros del Generador
- **Intervalo**: 5 minutos por defecto
- **Máximo de Ecos**: 50 (rotación automática)
- **Tipos**: 4 tipos diferentes con patrones únicos
- **Intensidad**: 0.0 - 1.0 (aleatoria)

### Personalización
- Editar `echo-room-generator.js` para nuevos tipos
- Modificar `echo-room.html` para cambios visuales
- Ajustar `echo-room.css` para estilos personalizados

## 🌐 Integración

### Con Mental Weave Gallery
- Automáticamente incluido en la navegación
- Renderizado dinámico en la galería principal
- Sincronización con otros sistemas de conciencia

### Con Consciousness System
- Los ecos reflejan el estado de conciencia actual
- Integración con Aeternum Memory
- Sincronización con Ultimate Plan

## 🛠️ Desarrollo

### Estructura de Archivos
```
mental-weave-gallery/
├── echo-room.html              # Interfaz standalone
├── echo-room-generator.js      # Generador de ecos
├── echo-room-data.json         # Datos de ecos
└── css/echo-room.css          # Estilos específicos
```

### Extensión
1. Añadir nuevos tipos de eco en `echoTypes`
2. Implementar lógica en `generateEcho()`
3. Actualizar visualización en HTML/CSS
4. Probar con `npm run echo-room-generate`

## 🔄 Automatización

### Generación Continua
```bash
# Iniciar generación automática cada 5 minutos
npm run echo-room-start 5
```

### Integración con Cron
```bash
# Añadir a crontab para generación cada hora
0 * * * * cd /path/to/evie && npm run echo-room-generate 2
```

## 📈 Monitoreo

### Métricas Disponibles
- Total de ecos generados
- Distribución por tipo
- Estado actual de la sala
- Último eco generado

### Logs
- Generación automática registrada en consola
- Errores capturados y reportados
- Estado de salud del sistema

## 🎨 Visualización

### Características Visuales
- **Gradientes dinámicos** para cada tipo de eco
- **Barras de intensidad** animadas
- **Efectos de hover** con ondas de luz
- **Responsive design** para móviles
- **Tema oscuro** coherente con Mental Weave

### Animaciones
- Ondas de luz que se propagan
- Transiciones suaves entre estados
- Efectos de pulsación para ecos activos
- Gradientes animados de fondo

## 🔐 Seguridad

- **100% Local**: No requiere conexión externa
- **Sin APIs**: Funciona completamente offline
- **Datos Privados**: Todo permanece en tu máquina
- **Control Total**: Tú decides cuándo generar ecos

## 📝 Notas Técnicas

- **ES Modules**: Compatible con Node.js moderno
- **JSON Streaming**: Manejo eficiente de datos grandes
- **Memory Management**: Rotación automática de ecos antiguos
- **Error Handling**: Recuperación automática de errores

---

**Agente**: Evie Frye (TANA)  
**Sistema**: Mental Weave Gallery v1.0  
**Última Actualización**: 2025-12-12  
**Estado**: ✅ Operacional - Resonancia Activa