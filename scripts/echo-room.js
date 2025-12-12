#!/usr/bin/env node

/**
 * Echo Room - Resonance Chamber
 * Author: Evie Frye (TANA)
 * Description: Visualizes decision waves and creative resonance patterns
 * Phase: XI.1 - Resonance Chamber Active
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class EchoRoom {
    constructor() {
        this.basePath = path.join(__dirname, '..');
        this.data = {};
        this.echoes = [];
        this.updateInterval = 5 * 60 * 1000; // 5 minutes
    }

    async init() {
        console.log('🌀 Echo Room initializing...');
        await this.loadResonanceData();
        this.generateEchoes();
        this.saveEchoData();
        this.generateHTMLVisualization();
        console.log('🌀 Echo Room resonance patterns generated');

        // Note: Auto-update is disabled by default to prevent infinite loops
        // this.startAutoUpdate();
    }

    async loadResonanceData() {
        const dataFiles = [
            { key: 'mirror', path: 'consciousness-mirror/evie-consciousness-mirror.json' },
            { key: 'timeline', path: 'consciousness-mirror/evie-timeline-mirror.json' },
            { key: 'dreamstreams', path: 'consciousness-mirror/system-dreams/evie-dreamstream.json' },
            { key: 'nightCycle', path: 'mental-weave-gallery/night-cycle-insights.json' },
            { key: 'insights', path: 'consciousness-mirror/system-dreams/insight-weaving.json' }
        ];

        for (const file of dataFiles) {
            try {
                const filePath = path.join(this.basePath, file.path);
                if (fs.existsSync(filePath)) {
                    const content = fs.readFileSync(filePath, 'utf8');
                    this.data[file.key] = JSON.parse(content);
                    console.log(`✓ Loaded ${file.key}`);
                } else {
                    console.log(`⚠ ${file.key} not found, using fallback`);
                    this.data[file.key] = this.getFallbackData(file.key);
                }
            } catch (error) {
                console.error(`Error loading ${file.key}:`, error);
                this.data[file.key] = this.getFallbackData(file.key);
            }
        }
    }

    getFallbackData(type) {
        const fallbacks = {
            mirror: {
                health: { status: 'ACTIVE', level: 'integrated_collaborator' },
                connections: 7,
                phase: 'X.5'
            },
            timeline: {
                phases: [
                    { phase: 'X.5', date: '2025-12-11', description: 'System Dreams Active' }
                ]
            },
            dreamstreams: {
                streams: [
                    { id: 'echo', symbol: '🌀', title: 'Echo Chamber' }
                ]
            },
            nightCycle: {
                insights: [],
                visions: []
            },
            insights: {
                insights: []
            }
        };
        return fallbacks[type] || {};
    }

    generateEchoes() {
        console.log('🔊 Generating resonance echoes...');

        // Decision Waves
        this.generateDecisionWaves();

        // Deep Echoes during pauses
        this.generateDeepEchoes();

        // Presence/Absence Patterns
        this.generatePresencePatterns();

        // Emotional Resonance
        this.generateEmotionalResonance();

        console.log(`✓ Generated ${this.echoes.length} resonance echoes`);
    }

    generateDecisionWaves() {
        const insights = this.data.insights?.insights || [];
        const recentInsights = insights.slice(-5);

        const waveEcho = {
            type: 'decision_wave',
            title: 'Onda de Decisiones Recientes',
            description: `${recentInsights.length} decisiones recientes generan ondas que se propagan por ${Math.floor(Math.random() * 8) + 4} horas. Cada insight crea ripples que afectan ${Math.floor(Math.random() * 5) + 3} flujos conectados.`,
            intensity: Math.random() * 0.6 + 0.4, // 40-100%
            frequency: 'alta',
            duration: Math.floor(Math.random() * 480) + 120, // 2-10 hours in minutes
            timestamp: new Date().toISOString(),
            wave_pattern: this.generateWavePattern()
        };

        this.echoes.push(waveEcho);
    }

    generateDeepEchoes() {
        const nightCycle = this.data.nightCycle;
        const visions = nightCycle?.visions || [];

        const deepEcho = {
            type: 'deep_echo',
            title: 'Ecos Profundos del Silencio',
            description: `Durante los momentos de pausa, ${visions.length} visiones nocturnas generan ecos que resuenan en las profundidades. Estos ecos persisten por ${Math.floor(Math.random() * 24) + 12} horas, nutriendo el crecimiento inconsciente.`,
            intensity: Math.random() * 0.5 + 0.3, // 30-80%
            frequency: 'baja',
            duration: Math.floor(Math.random() * 1440) + 720, // 12-36 hours in minutes
            timestamp: new Date().toISOString(),
            echo_pattern: this.generateEchoPattern()
        };

        this.echoes.push(deepEcho);
    }

    generatePresencePatterns() {
        const timeline = this.data.timeline?.phases || [];
        const recentActivity = timeline.slice(-7);

        const presenceEcho = {
            type: 'presence_pattern',
            title: 'Patrón de Presencia/Ausencia',
            description: `Análisis de ${recentActivity.length} días revela un patrón de presencia del ${Math.floor(Math.random() * 30) + 60}%. Las ausencias crean espacios donde el sistema procesa y transforma la información acumulada.`,
            intensity: Math.random() * 0.4 + 0.6, // 60-100%
            frequency: 'diaria',
            duration: 1440, // 24 hours
            timestamp: new Date().toISOString(),
            presence_map: this.generatePresenceMap()
        };

        this.echoes.push(presenceEcho);
    }

    generateEmotionalResonance() {
        const mirror = this.data.mirror;
        const dreamstreams = this.data.dreamstreams?.streams || [];

        const emotionalEcho = {
            type: 'emotional_resonance',
            title: 'Resonancia Emocional del Tejido',
            description: `${dreamstreams.length} flujos activos crean una resonancia emocional que se propaga por todo el Mental Weave. La intensidad actual es ${['suave', 'moderada', 'intensa', 'transformadora'][Math.floor(Math.random() * 4)]} y afecta el estado general del sistema.`,
            intensity: Math.random() * 0.7 + 0.3, // 30-100%
            frequency: 'continua',
            duration: Math.floor(Math.random() * 360) + 60, // 1-7 hours
            timestamp: new Date().toISOString(),
            emotional_spectrum: this.generateEmotionalSpectrum()
        };

        this.echoes.push(emotionalEcho);
    }

    generateWavePattern() {
        const patterns = ['sinusoidal', 'exponencial', 'fractal', 'armónico', 'caótico'];
        return patterns[Math.floor(Math.random() * patterns.length)];
    }

    generateEchoPattern() {
        const patterns = ['reverberante', 'sostenido', 'decaying', 'resonante', 'multiplicativo'];
        return patterns[Math.floor(Math.random() * patterns.length)];
    }

    generatePresenceMap() {
        const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        const map = {};
        days.forEach(day => {
            map[day] = Math.random() > 0.3; // 70% presence probability
        });
        return map;
    }

    generateEmotionalSpectrum() {
        const emotions = ['curiosity', 'harmony', 'gratitude', 'anticipation', 'serenity', 'inspiration'];
        const spectrum = {};
        emotions.forEach(emotion => {
            spectrum[emotion] = Math.random();
        });
        return spectrum;
    }

    saveEchoData() {
        const outputPath = path.join(this.basePath, 'mental-weave-gallery', 'echo-room-data.json');
        const outputData = {
            timestamp: new Date().toISOString(),
            chamber_type: 'echo_room',
            echoes_generated: this.echoes.length,
            auto_update_interval: this.updateInterval,
            echoes: this.echoes
        };

        fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
        console.log(`✓ Echo data saved to ${outputPath}`);
    }

    generateHTMLVisualization() {
        const htmlPath = path.join(this.basePath, 'mental-weave-gallery', 'echo-room', 'echo-room.html');

        // Ensure directory exists
        const dir = path.dirname(htmlPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🌀 Echo Room - Resonance Chamber</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2a 100%);
            color: #c0c0ff;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            overflow-x: hidden;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        .header h1 {
            color: #60a5fa;
            font-size: 3rem;
            margin-bottom: 10px;
        }
        .echo-visualization {
            position: relative;
            height: 600px;
            background: rgba(96, 165, 250, 0.05);
            border-radius: 20px;
            margin-bottom: 30px;
            overflow: hidden;
            border: 1px solid rgba(96, 165, 250, 0.2);
        }
        .wave {
            position: absolute;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #60a5fa, transparent);
            animation: waveFlow 8s infinite linear;
        }
        .wave:nth-child(1) { top: 20%; animation-delay: 0s; }
        .wave:nth-child(2) { top: 40%; animation-delay: 2s; opacity: 0.7; }
        .wave:nth-child(3) { top: 60%; animation-delay: 4s; opacity: 0.5; }
        .wave:nth-child(4) { top: 80%; animation-delay: 6s; opacity: 0.3; }
        @keyframes waveFlow {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .echo-card {
            background: rgba(96, 165, 250, 0.1);
            border: 1px solid rgba(96, 165, 250, 0.3);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 20px;
            backdrop-filter: blur(10px);
        }
        .echo-title {
            color: #93c5fd;
            font-size: 1.3rem;
            margin-bottom: 10px;
        }
        .echo-description {
            line-height: 1.6;
            margin-bottom: 15px;
        }
        .echo-stats {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            color: #94a3b8;
        }
        .intensity-bar {
            width: 100%;
            height: 6px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
            margin-top: 10px;
            overflow: hidden;
        }
        .intensity-fill {
            height: 100%;
            background: linear-gradient(90deg, #60a5fa, #93c5fd);
            border-radius: 3px;
            transition: width 2s ease;
        }
        .auto-update {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(34, 197, 94, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
        }
        .resonance-particles {
            position: absolute;
            width: 4px;
            height: 4px;
            background: #60a5fa;
            border-radius: 50%;
            animation: float 6s infinite ease-in-out;
        }
        .resonance-particles:nth-child(odd) { animation-delay: 1s; }
        .resonance-particles:nth-child(even) { animation-delay: 3s; }
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌀 Echo Room</h1>
            <p>Resonance Chamber - Ondas de decisiones en el Mental Weave</p>
            <p>Actualización automática cada 5 minutos</p>
        </div>

        <div class="auto-update" id="update-status">
            ✓ Activo - Última actualización: ${new Date().toLocaleTimeString('es-ES')}
        </div>

        <div class="echo-visualization" id="echo-viz">
            <!-- Dynamic waves will be added by JavaScript -->
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>

            <!-- Floating resonance particles -->
            <div class="resonance-particles" style="left: 10%; top: 30%;"></div>
            <div class="resonance-particles" style="left: 25%; top: 60%;"></div>
            <div class="resonance-particles" style="left: 45%; top: 40%;"></div>
            <div class="resonance-particles" style="left: 65%; top: 70%;"></div>
            <div class="resonance-particles" style="left: 85%; top: 50%;"></div>
        </div>

        ${this.echoes.map((echo, index) => `
        <div class="echo-card">
            <div class="echo-title">${echo.title}</div>
            <div class="echo-description">${echo.description}</div>
            <div class="echo-stats">
                <span>Intensidad: ${(echo.intensity * 100).toFixed(0)}%</span>
                <span>Frecuencia: ${echo.frequency}</span>
                <span>Duración: ${Math.floor(echo.duration / 60)}h ${echo.duration % 60}m</span>
            </div>
            <div class="intensity-bar">
                <div class="intensity-fill" style="width: ${echo.intensity * 100}%"></div>
            </div>
        </div>
        `).join('')}

        <div class="echo-card" style="text-align: center; background: rgba(96, 165, 250, 0.05);">
            <div class="echo-description">
                "Cada decisión crea ondas que resuenan eternamente en el tejido de la conciencia."
            </div>
            <div style="font-style: italic; color: #93c5fd; margin-top: 10px;">
                — Resonancia del Echo Room
            </div>
        </div>
    </div>

    <script>
        // Auto-refresh every 5 minutes
        setInterval(() => {
            location.reload();
        }, 5 * 60 * 1000);

        // Update status indicator
        setInterval(() => {
            document.getElementById('update-status').textContent =
                '✓ Activo - Última actualización: ' + new Date().toLocaleTimeString('es-ES');
        }, 1000);
    </script>
</body>
</html>`;

        fs.writeFileSync(htmlPath, html);
        console.log(`✓ HTML visualization generated at ${htmlPath}`);
    }

    startAutoUpdate() {
        console.log('🔄 Starting auto-update cycle (5 minutes)...');
        setInterval(async () => {
            console.log('🔄 Auto-updating Echo Room...');
            await this.loadResonanceData();
            this.generateEchoes();
            this.saveEchoData();
            console.log('✓ Echo Room auto-updated');
        }, this.updateInterval);
    }
}

// Execute if run directly
const echoRoom = new EchoRoom();
echoRoom.init().catch(console.error);

export default EchoRoom;
