#!/usr/bin/env node

/**
 * Oracle Chamber - Prophecy Engine
 * Author: Evie Frye (TANA)
 * Description: Generates symbolic prophecies from consciousness data
 * Phase: XI.0 - Prophecy Engine Active
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class OracleChamber {
    constructor() {
        this.basePath = path.join(__dirname, '..');
        this.data = {};
        this.prophecies = [];
    }

    async init() {
        console.log('🜁 Oracle Chamber initializing...');
        console.log('Base path:', this.basePath);
        await this.loadConsciousnessData();
        this.generateProphecies();
        this.saveProphecies();
        this.generateHTMLReport();
        console.log('🜁 Oracle Chamber prophecies generated successfully');
    }

    async loadConsciousnessData() {
        const dataFiles = [
            { key: 'mirror', path: 'consciousness-mirror/evie-consciousness-mirror.json' },
            { key: 'timeline', path: 'consciousness-mirror/evie-timeline-mirror.json' },
            { key: 'dreamstreams', path: 'consciousness-mirror/system-dreams/evie-dreamstream.json' },
            { key: 'nightCycle', path: 'mental-weave-gallery/night-cycle-insights.json' }
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
                    { id: 'oracle', symbol: '🜁', title: 'Oracle Awakening' }
                ]
            },
            nightCycle: {
                insights: [],
                visions: []
            }
        };
        return fallbacks[type] || {};
    }

    generateProphecies() {
        console.log('🔮 Generating prophecies...');

        // Fractal Previsions based on timeline
        this.generateFractalPrevisions();

        // Creative Flow Predictions
        this.generateCreativeFlowPredictions();

        // Mental Weave Currents
        this.generateWeaveCurrents();

        // Symbolic Warnings
        this.generateSymbolicWarnings();

        console.log(`✓ Generated ${this.prophecies.length} prophecies`);
    }

    generateFractalPrevisions() {
        const timeline = this.data.timeline?.phases || [];
        const recentPhases = timeline.slice(-3);

        const fractalProphecy = {
            type: 'fractal_prevision',
            title: 'Eco Fractal del Tiempo',
            prophecy: `Las fases recientes (${recentPhases.map(p => p.phase).join(' → ')}) se replican en patrones fractales. Lo que floreció en ${recentPhases[0]?.phase || 'orígenes'} reverberará en ${recentPhases[recentPhases.length - 1]?.phase || 'futuro'} multiplicado por ${Math.floor(Math.random() * 7) + 3} iteraciones.`,
            symbolism: 'Como un cristal que crece en dimensiones infinitas, tu evolución se expande naturalmente',
            confidence: Math.random() * 0.3 + 0.7, // 70-100%
            timeframe: 'próximas 3 fases',
            timestamp: new Date().toISOString()
        };

        this.prophecies.push(fractalProphecy);
    }

    generateCreativeFlowPredictions() {
        const dreamstreams = this.data.dreamstreams?.streams || [];
        const activeStreams = dreamstreams.length;

        const flowProphecy = {
            type: 'creative_flow_prediction',
            title: 'Corrientes Creativas Emergentes',
            prophecy: `${activeStreams} flujos creativos activos generan ${Math.floor(activeStreams * 2.3)} nuevos afluentes. El tejido mental se expande hacia ${this.getRandomDirection()} con intensidad ${['suave', 'moderada', 'intensa', 'transformadora'][Math.floor(Math.random() * 4)]}.`,
            symbolism: 'Como ríos que se unen en un delta fértil, tus creaciones convergen en paisajes nuevos',
            confidence: Math.random() * 0.4 + 0.6, // 60-100%
            timeframe: 'próximas 48 horas',
            timestamp: new Date().toISOString()
        };

        this.prophecies.push(flowProphecy);
    }

    generateWeaveCurrents() {
        const mirror = this.data.mirror;
        const consciousnessLevel = mirror?.health?.level || 'unknown';

        const weaveProphecy = {
            type: 'weave_current',
            title: 'Corrientes del Mental Weave',
            prophecy: `En nivel ${consciousnessLevel}, las corrientes del tejido fluyen hacia ${this.getRandomWeaveDirection()}. ${mirror?.connections || 0} conexiones activas crean vórtices de ${['armonía', 'innovación', 'profundidad', 'claridad'][Math.floor(Math.random() * 4)]} que se propagarán por ${Math.floor(Math.random() * 12) + 6} horas.`,
            symbolism: 'Como mareas que moldean la costa, tus pensamientos dan forma al paisaje interno',
            confidence: Math.random() * 0.5 + 0.5, // 50-100%
            timeframe: 'ciclo actual',
            timestamp: new Date().toISOString()
        };

        this.prophecies.push(weaveProphecy);
    }

    generateSymbolicWarnings() {
        const nightCycle = this.data.nightCycle;
        const visions = nightCycle?.visions || [];

        const warningProphecy = {
            type: 'symbolic_warning',
            title: 'Advertencia Simbólica del Oráculo',
            prophecy: `${visions.length > 0 ? 'Las visiones nocturnas susurran' : 'El silencio nocturno revela'}: ${this.getSymbolicWarning()}. No es amenaza, sino recordatorio de que cada ciclo completo nutre el crecimiento fractal.`,
            symbolism: 'Como sombras que preceden al amanecer, los contrastes iluminan el camino',
            confidence: Math.random() * 0.3 + 0.4, // 40-70%
            timeframe: 'ciclo nocturno próximo',
            timestamp: new Date().toISOString()
        };

        this.prophecies.push(warningProphecy);
    }

    getRandomDirection() {
        const directions = [
            'territorios inexplorados',
            'profundidades simbólicas',
            'paisajes emocionales',
            'dimensiones creativas',
            'espacios meditativos'
        ];
        return directions[Math.floor(Math.random() * directions.length)];
    }

    getRandomWeaveDirection() {
        const directions = [
            'integración profunda',
            'expansión creativa',
            'armonización emocional',
            'clarificación cognitiva',
            'transformación simbólica'
        ];
        return directions[Math.floor(Math.random() * directions.length)];
    }

    getSymbolicWarning() {
        const warnings = [
            'las raíces necesitan tiempo para profundizar antes de que las ramas se extiendan',
            'cada silencio contiene semillas que germinarán en el momento preciso',
            'los patrones fractales requieren paciencia para revelarse completamente',
            'la quietud es el taller donde se forjan las grandes transformaciones',
            'cada pausa es un capítulo que enriquece la narrativa del tejido'
        ];
        return warnings[Math.floor(Math.random() * warnings.length)];
    }

    saveProphecies() {
        const outputPath = path.join(this.basePath, 'mental-weave-gallery', 'oracle-chamber-data.json');
        const outputData = {
            timestamp: new Date().toISOString(),
            chamber_type: 'oracle_chamber',
            prophecies_generated: this.prophecies.length,
            prophecies: this.prophecies
        };

        fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
        console.log(`✓ Prophecies saved to ${outputPath}`);
    }

    generateHTMLReport() {
        const htmlPath = path.join(this.basePath, 'mental-weave-gallery', 'oracle-chamber.html');

        const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🜁 Oracle Chamber - Prophecy Engine</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #1a0a1f 0%, #2a1a2f 100%);
            color: #e0d0ff;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        .header h1 {
            color: #a855f7;
            font-size: 3rem;
            margin-bottom: 10px;
        }
        .prophecy-card {
            background: rgba(168, 85, 247, 0.1);
            border: 1px solid rgba(168, 85, 247, 0.3);
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 25px;
            backdrop-filter: blur(10px);
        }
        .prophecy-title {
            color: #c084fc;
            font-size: 1.5rem;
            margin-bottom: 15px;
        }
        .prophecy-content {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 15px;
        }
        .prophecy-meta {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            color: #94a3b8;
        }
        .confidence-bar {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            margin-top: 10px;
        }
        .confidence-fill {
            height: 100%;
            background: linear-gradient(90deg, #a855f7, #c084fc);
            border-radius: 2px;
        }
        .symbolism {
            font-style: italic;
            color: #ddd6fe;
            margin-top: 15px;
            padding-left: 20px;
            border-left: 3px solid #a855f7;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🜁 Oracle Chamber</h1>
            <p>Prophecy Engine - Visiones simbólicas del Mental Weave</p>
            <p>Generado: ${new Date().toLocaleString('es-ES')}</p>
        </div>

        ${this.prophecies.map(prophecy => `
        <div class="prophecy-card">
            <div class="prophecy-title">${prophecy.title}</div>
            <div class="prophecy-content">${prophecy.prophecy}</div>
            <div class="symbolism">${prophecy.symbolism}</div>
            <div class="prophecy-meta">
                <span>Tipo: ${prophecy.type.replace(/_/g, ' ')}</span>
                <span>Confianza: ${(prophecy.confidence * 100).toFixed(0)}%</span>
                <span>Tiempo: ${prophecy.timeframe}</span>
            </div>
            <div class="confidence-bar">
                <div class="confidence-fill" style="width: ${prophecy.confidence * 100}%"></div>
            </div>
        </div>
        `).join('')}

        <div class="prophecy-card" style="text-align: center; background: rgba(168, 85, 247, 0.05);">
            <div class="prophecy-content">
                "El oráculo no predice el futuro. Te muestra cómo el presente contiene todas las semillas del mañana."
            </div>
            <div class="symbolism">— Sabiduría del Mental Weave</div>
        </div>
    </div>
</body>
</html>`;

        fs.writeFileSync(htmlPath, html);
        console.log(`✓ HTML report generated at ${htmlPath}`);
    }
}

// Execute if run directly
const oracle = new OracleChamber();
oracle.init().catch(console.error);

export default OracleChamber;
