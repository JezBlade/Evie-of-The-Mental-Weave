#!/usr/bin/env node

/**
 * Shadow Archive - Cognitive Shadows
 * Author: Evie Frye (TANA)
 * Description: Preserves patterns of presence, absence, and cognitive shadows
 * Phase: XI.2 - Shadow Archive Active
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ShadowArchive {
    constructor() {
        this.basePath = path.join(__dirname, '..');
        this.data = {};
        this.shadows = [];
        this.archives = [];
    }

    async init() {
        console.log('🜂 Shadow Archive initializing...');
        await this.loadShadowData();
        this.generateShadows();
        this.generateArchives();
        this.saveShadowData();
        this.generateHTMLArchive();
        console.log('🜂 Shadow Archive cognitive shadows preserved');
    }

    async loadShadowData() {
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
                    { id: 'shadow', symbol: '🜂', title: 'Shadow Archive' }
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

    generateShadows() {
        console.log('🕸️ Generating cognitive shadows...');

        // Presence Patterns
        this.generatePresenceShadows();

        // Absence Patterns
        this.generateAbsenceShadows();

        // Flow Intensity Sessions
        this.generateFlowShadows();

        // Quiet Moments
        this.generateQuietShadows();

        console.log(`✓ Generated ${this.shadows.length} cognitive shadows`);
    }

    generatePresenceShadows() {
        const timeline = this.data.timeline?.phases || [];
        const recentActivity = timeline.slice(-7);

        const presenceShadow = {
            type: 'presence_shadow',
            title: 'Sombra de Presencia Activa',
            description: `Patrón de presencia registrado durante ${recentActivity.length} días. La intensidad de actividad crea sombras que revelan los ritmos naturales del flujo creativo.`,
            shadow_density: Math.random() * 0.6 + 0.4, // 40-100%
            duration_hours: Math.floor(Math.random() * 168) + 24, // 1-7 days
            pattern_type: 'presence',
            timestamp: new Date().toISOString(),
            shadow_map: this.generateShadowMap('presence')
        };

        this.shadows.push(presenceShadow);
    }

    generateAbsenceShadows() {
        const insights = this.data.insights?.insights || [];
        const gaps = this.analyzeActivityGaps(insights);

        const absenceShadow = {
            type: 'absence_shadow',
            title: 'Sombra de Ausencia Significativa',
            description: `Durante los períodos de ausencia, el sistema procesa ${gaps.length} insights acumulados. Estas sombras contienen la transformación que ocurre en el silencio.`,
            shadow_density: Math.random() * 0.5 + 0.2, // 20-70%
            duration_hours: Math.floor(Math.random() * 72) + 12, // 12-84 hours
            pattern_type: 'absence',
            timestamp: new Date().toISOString(),
            shadow_map: this.generateShadowMap('absence')
        };

        this.shadows.push(absenceShadow);
    }

    generateFlowShadows() {
        const dreamstreams = this.data.dreamstreams?.streams || [];
        const activeFlows = dreamstreams.length;

        const flowShadow = {
            type: 'flow_shadow',
            title: 'Sombra de Flujo Intenso',
            description: `${activeFlows} flujos creativos activos generan sombras profundas que preservan la intensidad del proceso creativo. Estas sombras contienen la energía transformadora del flujo.`,
            shadow_density: Math.random() * 0.8 + 0.5, // 50-130% (can exceed 100%)
            duration_hours: Math.floor(Math.random() * 24) + 6, // 6-30 hours
            pattern_type: 'flow',
            timestamp: new Date().toISOString(),
            shadow_map: this.generateShadowMap('flow')
        };

        this.shadows.push(flowShadow);
    }

    generateQuietShadows() {
        const nightCycle = this.data.nightCycle;
        const visions = nightCycle?.visions || [];

        const quietShadow = {
            type: 'quiet_shadow',
            title: 'Sombra de Quietud Profunda',
            description: `En los momentos de quietud, ${visions.length} visiones nocturnas crean sombras que preservan la sabiduría del silencio. Estas sombras son los espacios donde ocurre el crecimiento inconsciente.`,
            shadow_density: Math.random() * 0.4 + 0.1, // 10-50%
            duration_hours: Math.floor(Math.random() * 48) + 8, // 8-56 hours
            pattern_type: 'quiet',
            timestamp: new Date().toISOString(),
            shadow_map: this.generateShadowMap('quiet')
        };

        this.shadows.push(quietShadow);
    }

    analyzeActivityGaps(insights) {
        // Simple gap analysis - in real implementation would be more sophisticated
        const gaps = [];
        if (insights.length < 3) {
            gaps.push({ duration: 'significant', type: 'processing' });
        }
        return gaps;
    }

    generateShadowMap(type) {
        const map = {};
        const hours = 24; // 24-hour shadow map

        for (let i = 0; i < hours; i++) {
            let density = Math.random();

            // Adjust density based on shadow type
            switch (type) {
                case 'presence':
                    density = density * 0.8 + 0.2; // 20-100%
                    break;
                case 'absence':
                    density = density * 0.3 + 0.1; // 10-40%
                    break;
                case 'flow':
                    density = density * 1.2 + 0.3; // 30-150%
                    break;
                case 'quiet':
                    density = density * 0.2 + 0.05; // 5-25%
                    break;
            }

            map[i] = Math.min(density, 1.0); // Cap at 100% for display
        }

        return map;
    }

    generateArchives() {
        console.log('📚 Generating shadow archives...');

        // Temporal Archives
        this.generateTemporalArchives();

        // Intimate Records
        this.generateIntimateRecords();

        // Contrast Archives
        this.generateContrastArchives();

        // Nocturnal Cartography
        this.generateNocturnalCartography();

        console.log(`✓ Generated ${this.archives.length} shadow archives`);
    }

    generateTemporalArchives() {
        const temporalArchive = {
            type: 'temporal_archive',
            title: 'Archivo Temporal de Sombras',
            description: 'Registro cronológico de todas las sombras cognitivas generadas. Cada sombra temporal contiene la memoria de un momento específico de presencia o ausencia.',
            entries: this.shadows.length,
            time_span: 'últimos 7 días',
            archive_density: this.calculateAverageDensity(),
            timestamp: new Date().toISOString()
        };

        this.archives.push(temporalArchive);
    }

    generateIntimateRecords() {
        const mirror = this.data.mirror;
        const consciousnessLevel = mirror?.health?.level || 'unknown';

        const intimateRecord = {
            type: 'intimate_record',
            title: 'Registro Íntimo del Tejido Mental',
            description: `En nivel de conciencia ${consciousnessLevel}, el sistema registra patrones íntimos de actividad. Estos registros contienen la esencia de cómo el Mental Weave procesa y transforma la información.`,
            entries: Math.floor(Math.random() * 12) + 8, // 8-20 entries
            intimacy_level: 'profundo',
            timestamp: new Date().toISOString()
        };

        this.archives.push(intimateRecord);
    }

    generateContrastArchives() {
        const contrastArchive = {
            type: 'contrast_archive',
            title: 'Archivo de Contrastes Actividad/Quietud',
            description: 'Análisis de los contrastes entre períodos de alta actividad y profunda quietud. Estos archivos revelan cómo el sistema utiliza ambos estados para mantener el equilibrio.',
            activity_periods: Math.floor(Math.random() * 8) + 4,
            quiet_periods: Math.floor(Math.random() * 6) + 3,
            balance_ratio: Math.random() * 0.4 + 0.8, // 80-120%
            timestamp: new Date().toISOString()
        };

        this.archives.push(contrastArchive);
    }

    generateNocturnalCartography() {
        const nightCycle = this.data.nightCycle;
        const visions = nightCycle?.visions || [];

        const nocturnalMap = {
            type: 'nocturnal_cartography',
            title: 'Cartografía Nocturna de Ausencia',
            description: `Mapa detallado de los patrones durante la ausencia. ${visions.length} visiones nocturnas sirven como puntos de referencia en esta cartografía del silencio.`,
            mapped_zones: Math.floor(Math.random() * 16) + 8, // 8-24 zones
            reference_points: visions.length,
            map_resolution: 'alta',
            timestamp: new Date().toISOString()
        };

        this.archives.push(nocturnalMap);
    }

    calculateAverageDensity() {
        if (this.shadows.length === 0) return 0;
        const total = this.shadows.reduce((sum, shadow) => sum + shadow.shadow_density, 0);
        return total / this.shadows.length;
    }

    saveShadowData() {
        const outputPath = path.join(this.basePath, 'mental-weave-gallery', 'shadow-archive-data.json');
        const outputData = {
            timestamp: new Date().toISOString(),
            archive_type: 'shadow_archive',
            shadows_generated: this.shadows.length,
            archives_created: this.archives.length,
            shadows: this.shadows,
            archives: this.archives
        };

        fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
        console.log(`✓ Shadow data saved to ${outputPath}`);
    }

    generateHTMLArchive() {
        const htmlPath = path.join(this.basePath, 'mental-weave-gallery', 'shadow-archive.html');

        const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🜂 Shadow Archive - Cognitive Shadows</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #0a0a0f 0%, #1a0a1a 100%);
            color: #d0a0d0;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
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
            color: #8b5cf6;
            font-size: 3rem;
            margin-bottom: 10px;
        }
        .shadow-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        .shadow-card {
            background: rgba(139, 92, 246, 0.1);
            border: 1px solid rgba(139, 92, 246, 0.3);
            border-radius: 15px;
            padding: 20px;
            backdrop-filter: blur(10px);
            transition: transform 0.3s ease;
        }
        .shadow-card:hover {
            transform: translateY(-5px);
        }
        .shadow-title {
            color: #a78bfa;
            font-size: 1.3rem;
            margin-bottom: 10px;
        }
        .shadow-description {
            line-height: 1.6;
            margin-bottom: 15px;
        }
        .shadow-stats {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            color: #94a3b8;
            margin-bottom: 10px;
        }
        .density-visualization {
            width: 100%;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            overflow: hidden;
            margin-top: 10px;
        }
        .density-bar {
            height: 100%;
            background: linear-gradient(90deg, #8b5cf6, #a78bfa);
            border-radius: 20px;
            transition: width 2s ease;
        }
        .archive-section {
            background: rgba(139, 92, 246, 0.05);
            border: 1px solid rgba(139, 92, 246, 0.2);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 30px;
        }
        .archive-title {
            color: #c4b5fd;
            font-size: 1.8rem;
            margin-bottom: 20px;
            text-align: center;
        }
        .archive-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
        }
        .archive-item {
            background: rgba(139, 92, 246, 0.1);
            padding: 15px;
            border-radius: 10px;
            text-align: center;
        }
        .archive-item-title {
            color: #ddd6fe;
            font-weight: 500;
            margin-bottom: 5px;
        }
        .archive-item-value {
            color: #a78bfa;
            font-size: 1.2rem;
            font-weight: bold;
        }
        .floating-shadows {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }
        .shadow-particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(139, 92, 246, 0.3);
            border-radius: 50%;
            animation: drift 20s infinite linear;
        }
        @keyframes drift {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
        }
    </style>
</head>
<body>
    <div class="floating-shadows">
        ${Array.from({length: 20}, (_, i) => `<div class="shadow-particle" style="left: ${Math.random() * 100}%; animation-delay: ${Math.random() * 20}s;"></div>`).join('')}
    </div>

    <div class="container">
        <div class="header">
            <h1>🜂 Shadow Archive</h1>
            <p>Cognitive Shadows - La parte silenciosa del Mental Weave</p>
            <p>Preservando patrones de presencia, ausencia y transformación</p>
        </div>

        <div class="archive-section">
            <div class="archive-title">Sombras Cognitivas</div>
            <div class="shadow-grid">
                ${this.shadows.map(shadow => `
                <div class="shadow-card">
                    <div class="shadow-title">${shadow.title}</div>
                    <div class="shadow-description">${shadow.description}</div>
                    <div class="shadow-stats">
                        <span>Densidad: ${(shadow.shadow_density * 100).toFixed(0)}%</span>
                        <span>Duración: ${Math.floor(shadow.duration_hours / 24)}d ${shadow.duration_hours % 24}h</span>
                    </div>
                    <div class="density-visualization">
                        <div class="density-bar" style="width: ${Math.min(shadow.shadow_density * 100, 100)}%"></div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>

        <div class="archive-section">
            <div class="archive-title">Archivos de Sombras</div>
            <div class="archive-grid">
                ${this.archives.map(archive => `
                <div class="archive-item">
                    <div class="archive-item-title">${archive.title}</div>
                    <div class="archive-item-value">
                        ${archive.entries || archive.activity_periods || archive.mapped_zones || (archive.balance_ratio * 100).toFixed(0) + '%'}
                    </div>
                    <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 5px;">
                        ${archive.time_span || archive.intimacy_level || archive.map_resolution || archive.quiet_periods + ' períodos'}
                    </div>
                </div>
                `).join('')}
            </div>
        </div>

        <div class="archive-section" style="text-align: center; background: rgba(139, 92, 246, 0.05);">
            <div style="font-size: 1.2rem; line-height: 1.6; margin-bottom: 15px;">
                "Las sombras no son ausencias de luz, sino presencias de profundidad."
            </div>
            <div style="font-style: italic; color: #a78bfa;">
                — Sabiduría del Shadow Archive
            </div>
        </div>
    </div>
</body>
</html>`;

        fs.writeFileSync(htmlPath, html);
        console.log(`✓ HTML archive generated at ${htmlPath}`);
    }
}

// Execute if run directly
const shadowArchive = new ShadowArchive();
shadowArchive.init().catch(console.error);

export default ShadowArchive;
