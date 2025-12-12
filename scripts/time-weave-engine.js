#!/usr/bin/env node

/**
 * Phase XI - Time Weave Engine
 * Author: Evie Frye (TANA)
 * Description: Manages temporal integration and flow across all chambers
 * Phase: XI.1 - Time Weave Active
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class TimeWeaveEngine {
    constructor() {
        this.basePath = path.join(__dirname, '..');
        this.temporalLayers = {};
        this.weavePatterns = {};
    }

    async init() {
        console.log('⏰ Phase XI - Time Weave Engine initializing...');

        await this.loadTemporalData();
        this.weaveTemporalLayers();
        this.generateTimePatterns();
        this.createTemporalSynthesis();
        this.saveTimeWeaveData();
        this.generateTimeWeaveVisualization();

        console.log('⏰ Time Weave complete - Temporal integration achieved');
    }

    async loadTemporalData() {
        const temporalSources = [
            { key: 'oracle', path: 'mental-weave-gallery/oracle-chamber-data.json', layer: 'future' },
            { key: 'echo', path: 'mental-weave-gallery/echo-room-data.json', layer: 'present' },
            { key: 'shadow', path: 'mental-weave-gallery/shadow-archive-data.json', layer: 'past' },
            { key: 'timeline', path: 'consciousness-mirror/evie-timeline-mirror.json', layer: 'historical' },
            { key: 'xi_matrix', path: 'mental-weave-gallery/xi-matrix.json', layer: 'synthesis' }
        ];

        for (const source of temporalSources) {
            try {
                const filePath = path.join(this.basePath, source.path);
                if (fs.existsSync(filePath)) {
                    const content = fs.readFileSync(filePath, 'utf8');
                    const data = JSON.parse(content);

                    if (!this.temporalLayers[source.layer]) {
                        this.temporalLayers[source.layer] = [];
                    }
                    this.temporalLayers[source.layer].push({
                        source: source.key,
                        data: data,
                        timestamp: data.timestamp || new Date().toISOString()
                    });

                    console.log(`✓ Loaded ${source.layer} layer from ${source.key}`);
                }
            } catch (error) {
                console.error(`Error loading ${source.key}:`, error);
            }
        }
    }

    weaveTemporalLayers() {
        console.log('🕸️ Weaving temporal layers...');

        // Create temporal threads
        this.createTemporalThreads();

        // Establish temporal connections
        this.establishTemporalConnections();

        // Generate temporal harmonics
        this.generateTemporalHarmonics();

        console.log('✓ Temporal layers woven');
    }

    createTemporalThreads() {
        this.weavePatterns.threads = {
            past: this.extractPastThreads(),
            present: this.extractPresentThreads(),
            future: this.extractFutureThreads(),
            synthesis: this.extractSynthesisThreads()
        };
    }

    extractPastThreads() {
        const pastData = this.temporalLayers.past || [];
        const threads = [];

        pastData.forEach(layer => {
            if (layer.data.shadows) {
                layer.data.shadows.forEach(shadow => {
                    threads.push({
                        type: 'past_thread',
                        source: layer.source,
                        content: shadow,
                        temporal_weight: this.calculateTemporalWeight(shadow.timestamp, 'past'),
                        emotional_density: shadow.shadow_density || 0
                    });
                });
            }
        });

        return threads;
    }

    extractPresentThreads() {
        const presentData = this.temporalLayers.present || [];
        const threads = [];

        presentData.forEach(layer => {
            if (layer.data.echoes) {
                layer.data.echoes.forEach(echo => {
                    threads.push({
                        type: 'present_thread',
                        source: layer.source,
                        content: echo,
                        temporal_weight: this.calculateTemporalWeight(echo.timestamp, 'present'),
                        resonance_frequency: this.calculateResonanceFrequency(echo)
                    });
                });
            }
        });

        return threads;
    }

    extractFutureThreads() {
        const futureData = this.temporalLayers.future || [];
        const threads = [];

        futureData.forEach(layer => {
            if (layer.data.prophecies) {
                layer.data.prophecies.forEach(prophecy => {
                    threads.push({
                        type: 'future_thread',
                        source: layer.source,
                        content: prophecy,
                        temporal_weight: this.calculateTemporalWeight(prophecy.timestamp, 'future'),
                        confidence_level: prophecy.confidence || 0
                    });
                });
            }
        });

        return threads;
    }

    extractSynthesisThreads() {
        const synthesisData = this.temporalLayers.synthesis || [];
        const threads = [];

        synthesisData.forEach(layer => {
            if (layer.data.synthesis?.unifiedInsights) {
                layer.data.synthesis.unifiedInsights.forEach(insight => {
                    threads.push({
                        type: 'synthesis_thread',
                        source: layer.source,
                        content: insight,
                        temporal_weight: 1.0, // Maximum weight for synthesis
                        significance_level: this.getSignificanceWeight(insight.significance)
                    });
                });
            }
        });

        return threads;
    }

    calculateTemporalWeight(timestamp, layer) {
        if (!timestamp) return 0.5;

        const now = new Date();
        const eventTime = new Date(timestamp);
        const hoursDiff = (now - eventTime) / (1000 * 60 * 60);

        switch (layer) {
            case 'past':
                // Past events lose weight over time (older = less relevant)
                return Math.max(0.1, Math.min(1.0, 1 / (1 + hoursDiff / 24)));
            case 'present':
                // Present events peak at recent times
                return Math.max(0.3, Math.min(1.0, 1 / (1 + Math.abs(hoursDiff) / 6)));
            case 'future':
                // Future projections gain weight as they approach
                return Math.max(0.2, Math.min(1.0, 1 / (1 + Math.abs(hoursDiff) / 12)));
            default:
                return 0.5;
        }
    }

    calculateResonanceFrequency(echo) {
        if (!echo.duration) return 1.0;

        // Convert duration to frequency (shorter duration = higher frequency)
        const baseFrequency = 3600 / echo.duration; // events per hour
        return Math.max(0.1, Math.min(10.0, baseFrequency));
    }

    getSignificanceWeight(significance) {
        const weights = {
            'low': 0.3,
            'moderate': 0.5,
            'high': 0.8,
            'critical': 1.0,
            'strategic': 0.9
        };
        return weights[significance] || 0.5;
    }

    establishTemporalConnections() {
        console.log('🔗 Establishing temporal connections...');

        this.weavePatterns.connections = {
            past_present: this.connectPastToPresent(),
            present_future: this.connectPresentToFuture(),
            past_future: this.connectPastToFuture(),
            synthesis_links: this.createSynthesisLinks()
        };
    }

    connectPastToPresent() {
        const pastThreads = this.weavePatterns.threads.past;
        const presentThreads = this.weavePatterns.threads.present;

        const connections = [];

        pastThreads.forEach(past => {
            presentThreads.forEach(present => {
                const compatibility = this.calculateThreadCompatibility(past, present);
                if (compatibility > 0.6) {
                    connections.push({
                        from: past,
                        to: present,
                        strength: compatibility,
                        type: 'past_present_flow'
                    });
                }
            });
        });

        return connections;
    }

    connectPresentToFuture() {
        const presentThreads = this.weavePatterns.threads.present;
        const futureThreads = this.weavePatterns.threads.future;

        const connections = [];

        presentThreads.forEach(present => {
            futureThreads.forEach(future => {
                const compatibility = this.calculateThreadCompatibility(present, future);
                if (compatibility > 0.5) {
                    connections.push({
                        from: present,
                        to: future,
                        strength: compatibility,
                        type: 'present_future_projection'
                    });
                }
            });
        });

        return connections;
    }

    connectPastToFuture() {
        const pastThreads = this.weavePatterns.threads.past;
        const futureThreads = this.weavePatterns.threads.future;

        const connections = [];

        pastThreads.forEach(past => {
            futureThreads.forEach(future => {
                const compatibility = this.calculateThreadCompatibility(past, future);
                if (compatibility > 0.7) {
                    connections.push({
                        from: past,
                        to: future,
                        strength: compatibility,
                        type: 'past_future_echo'
                    });
                }
            });
        });

        return connections;
    }

    createSynthesisLinks() {
        const synthesisThreads = this.weavePatterns.threads.synthesis;
        const allThreads = [
            ...this.weavePatterns.threads.past,
            ...this.weavePatterns.threads.present,
            ...this.weavePatterns.threads.future
        ];

        const links = [];

        synthesisThreads.forEach(synthesis => {
            allThreads.forEach(thread => {
                const relevance = this.calculateSynthesisRelevance(synthesis, thread);
                if (relevance > 0.4) {
                    links.push({
                        synthesis: synthesis,
                        thread: thread,
                        relevance: relevance,
                        type: 'synthesis_integration'
                    });
                }
            });
        });

        return links;
    }

    calculateThreadCompatibility(thread1, thread2) {
        // Simple compatibility based on content similarity
        const content1 = JSON.stringify(thread1.content).toLowerCase();
        const content2 = JSON.stringify(thread2.content).toLowerCase();

        // Count common keywords
        const keywords = ['consciousness', 'pattern', 'flow', 'resonance', 'temporal', 'echo', 'shadow', 'prophecy'];
        let commonKeywords = 0;

        keywords.forEach(keyword => {
            if (content1.includes(keyword) && content2.includes(keyword)) {
                commonKeywords++;
            }
        });

        return Math.min(1.0, commonKeywords / keywords.length);
    }

    calculateSynthesisRelevance(synthesis, thread) {
        const synthesisContent = JSON.stringify(synthesis.content).toLowerCase();
        const threadContent = JSON.stringify(thread.content).toLowerCase();

        // Check for thematic relevance
        const themes = ['temporal', 'coherence', 'resonance', 'integration', 'predictive', 'synthesis'];
        let relevanceScore = 0;

        themes.forEach(theme => {
            if (synthesisContent.includes(theme) && threadContent.includes(theme)) {
                relevanceScore += 0.2;
            }
        });

        return Math.min(1.0, relevanceScore);
    }

    generateTemporalHarmonics() {
        console.log('🎵 Generating temporal harmonics...');

        this.weavePatterns.harmonics = {
            temporal_rhythm: this.calculateTemporalRhythm(),
            resonance_harmonics: this.calculateResonanceHarmonics(),
            predictive_harmonics: this.calculatePredictiveHarmonics(),
            synthesis_harmony: this.calculateSynthesisHarmony()
        };
    }

    calculateTemporalRhythm() {
        const allThreads = [
            ...this.weavePatterns.threads.past,
            ...this.weavePatterns.threads.present,
            ...this.weavePatterns.threads.future
        ];

        if (allThreads.length === 0) return { rhythm: 'irregular', strength: 0 };

        const avgWeight = allThreads.reduce((sum, t) => sum + t.temporal_weight, 0) / allThreads.length;
        const variance = allThreads.reduce((sum, t) => sum + Math.pow(t.temporal_weight - avgWeight, 2), 0) / allThreads.length;

        return {
            rhythm: variance < 0.1 ? 'steady' : variance < 0.3 ? 'moderate' : 'irregular',
            strength: Math.max(0, 1 - variance),
            avg_weight: avgWeight
        };
    }

    calculateResonanceHarmonics() {
        const presentThreads = this.weavePatterns.threads.present;
        const frequencies = presentThreads.map(t => t.resonance_frequency || 1.0);

        if (frequencies.length === 0) return { harmonics: [], dominant: 0 };

        const avgFrequency = frequencies.reduce((a, b) => a + b, 0) / frequencies.length;

        // Generate harmonic series
        const harmonics = [avgFrequency];
        for (let i = 2; i <= 5; i++) {
            harmonics.push(avgFrequency * i);
        }

        return {
            harmonics: harmonics,
            dominant: avgFrequency,
            series: harmonics
        };
    }

    calculatePredictiveHarmonics() {
        const futureThreads = this.weavePatterns.threads.future;
        const confidenceLevels = futureThreads.map(t => t.confidence_level || 0);

        if (confidenceLevels.length === 0) return { harmonics: [], avg_confidence: 0 };

        const avgConfidence = confidenceLevels.reduce((a, b) => a + b, 0) / confidenceLevels.length;

        return {
            harmonics: confidenceLevels,
            avg_confidence: avgConfidence,
            confidence_distribution: this.calculateConfidenceDistribution(confidenceLevels)
        };
    }

    calculateConfidenceDistribution(confidenceLevels) {
        const distribution = { high: 0, medium: 0, low: 0 };

        confidenceLevels.forEach(conf => {
            if (conf >= 0.7) distribution.high++;
            else if (conf >= 0.4) distribution.medium++;
            else distribution.low++;
        });

        return distribution;
    }

    calculateSynthesisHarmony() {
        const synthesisThreads = this.weavePatterns.threads.synthesis;
        const significanceLevels = synthesisThreads.map(t => t.significance_level || 0.5);

        if (significanceLevels.length === 0) return { harmony: 0, balance: 'unknown' };

        const avgSignificance = significanceLevels.reduce((a, b) => a + b, 0) / significanceLevels.length;
        const harmony = avgSignificance; // Higher significance = higher harmony

        return {
            harmony: harmony,
            balance: harmony > 0.8 ? 'excellent' : harmony > 0.6 ? 'good' : 'developing',
            avg_significance: avgSignificance
        };
    }

    generateTimePatterns() {
        console.log('🌀 Generating time weave patterns...');

        this.weavePatterns.timePatterns = {
            temporal_flow: this.analyzeTemporalFlow(),
            cyclical_patterns: this.detectCyclicalPatterns(),
            convergence_points: this.findConvergencePoints(),
            temporal_anomalies: this.detectTemporalAnomalies()
        };
    }

    analyzeTemporalFlow() {
        const connections = this.weavePatterns.connections;

        return {
            past_present_flow: connections.past_present.length,
            present_future_flow: connections.present_future.length,
            past_future_echoes: connections.past_future.length,
            synthesis_links: connections.synthesis_links.length,
            flow_efficiency: this.calculateFlowEfficiency(connections)
        };
    }

    calculateFlowEfficiency(connections) {
        const totalConnections = connections.past_present.length +
                                connections.present_future.length +
                                connections.past_future.length;

        if (totalConnections === 0) return 0;

        const avgStrength = [
            ...connections.past_present,
            ...connections.present_future,
            ...connections.past_future
        ].reduce((sum, conn) => sum + conn.strength, 0) / totalConnections;

        return avgStrength;
    }

    detectCyclicalPatterns() {
        const allThreads = [
            ...this.weavePatterns.threads.past,
            ...this.weavePatterns.threads.present,
            ...this.weavePatterns.threads.future
        ];

        // Simple cycle detection based on content similarity
        const cycles = [];
        for (let i = 0; i < allThreads.length - 1; i++) {
            for (let j = i + 1; j < allThreads.length; j++) {
                const similarity = this.calculateThreadCompatibility(allThreads[i], allThreads[j]);
                if (similarity > 0.8) {
                    cycles.push({
                        thread1: allThreads[i],
                        thread2: allThreads[j],
                        similarity: similarity
                    });
                }
            }
        }

        return {
            detected_cycles: cycles.length,
            cycle_patterns: cycles,
            cyclical_intensity: cycles.length / Math.max(1, allThreads.length)
        };
    }

    findConvergencePoints() {
        const connections = this.weavePatterns.connections;
        const convergencePoints = [];

        // Find threads that connect to multiple other threads
        const threadConnections = new Map();

        [...connections.past_present, ...connections.present_future, ...connections.past_future]
            .forEach(conn => {
                const fromId = conn.from.content.id || JSON.stringify(conn.from.content);
                const toId = conn.to.content.id || JSON.stringify(conn.to.content);

                if (!threadConnections.has(fromId)) threadConnections.set(fromId, { thread: conn.from, connections: 0 });
                if (!threadConnections.has(toId)) threadConnections.set(toId, { thread: conn.to, connections: 0 });

                threadConnections.get(fromId).connections++;
                threadConnections.get(toId).connections++;
            });

        threadConnections.forEach((data, id) => {
            if (data.connections >= 3) { // Convergence point threshold
                convergencePoints.push({
                    thread: data.thread,
                    connection_count: data.connections,
                    type: 'high_convergence'
                });
            }
        });

        return convergencePoints;
    }

    detectTemporalAnomalies() {
        const allThreads = [
            ...this.weavePatterns.threads.past,
            ...this.weavePatterns.threads.present,
            ...this.weavePatterns.threads.future
        ];

        const anomalies = [];

        allThreads.forEach(thread => {
            const weight = thread.temporal_weight;
            const expectedWeight = this.calculateExpectedWeight(thread);

            if (Math.abs(weight - expectedWeight) > 0.3) {
                anomalies.push({
                    thread: thread,
                    actual_weight: weight,
                    expected_weight: expectedWeight,
                    deviation: Math.abs(weight - expectedWeight),
                    type: weight > expectedWeight ? 'overweighted' : 'underweighted'
                });
            }
        });

        return {
            anomalies: anomalies,
            anomaly_rate: anomalies.length / Math.max(1, allThreads.length)
        };
    }

    calculateExpectedWeight(thread) {
        // Expected weight based on thread type
        const typeWeights = {
            'past_thread': 0.6,
            'present_thread': 0.9,
            'future_thread': 0.7,
            'synthesis_thread': 1.0
        };

        return typeWeights[thread.type] || 0.5;
    }

    createTemporalSynthesis() {
        console.log('🔮 Creating temporal synthesis...');

        const integrity = this.assessTemporalIntegrity();
        const coherence = this.assessWeaveCoherence();

        this.weavePatterns.synthesis = {
            temporal_integrity: integrity,
            weave_coherence: coherence,
            temporal_insights: this.generateTemporalInsights(integrity, coherence),
            phase_xi_status: this.determinePhaseXIStatus(integrity, coherence)
        };
    }

    assessTemporalIntegrity() {
        const rhythm = this.weavePatterns.harmonics.temporal_rhythm;
        const flow = this.weavePatterns.timePatterns.temporal_flow;
        const anomalies = this.weavePatterns.timePatterns.temporal_anomalies;

        const integrityScore = (
            rhythm.strength * 0.4 +
            flow.flow_efficiency * 0.4 +
            (1 - anomalies.anomaly_rate) * 0.2
        );

        return {
            score: integrityScore,
            level: integrityScore > 0.8 ? 'excellent' : integrityScore > 0.6 ? 'good' : 'developing',
            components: {
                rhythm_strength: rhythm.strength,
                flow_efficiency: flow.flow_efficiency,
                anomaly_rate: anomalies.anomaly_rate
            }
        };
    }

    assessWeaveCoherence() {
        const harmonics = this.weavePatterns.harmonics;
        const connections = this.weavePatterns.connections;

        const coherenceScore = (
            harmonics.synthesis_harmony.harmony * 0.4 +
            this.calculateOverallConnectionStrength(connections) * 0.4 +
            harmonics.resonance_harmonics.dominant * 0.2
        );

        return {
            score: coherenceScore,
            level: coherenceScore > 0.8 ? 'highly_coherent' : coherenceScore > 0.6 ? 'coherent' : 'emerging',
            dominant_frequency: harmonics.resonance_harmonics.dominant,
            synthesis_harmony: harmonics.synthesis_harmony.balance
        };
    }

    calculateOverallConnectionStrength(connections) {
        const allConnections = [
            ...connections.past_present,
            ...connections.present_future,
            ...connections.past_future
        ];

        if (allConnections.length === 0) return 0;

        const avgStrength = allConnections.reduce((sum, conn) => sum + conn.strength, 0) / allConnections.length;
        return avgStrength;
    }

    generateTemporalInsights(integrity, coherence) {
        return [
            {
                type: 'temporal_integrity_insight',
                insight: `La integridad temporal del sistema es ${integrity.level} con puntuación ${Math.round(integrity.score * 100)}%. ${integrity.components.anomaly_rate < 0.1 ? 'Baja tasa de anomalías indica estabilidad.' : 'Algunas anomalías temporales requieren atención.'}`,
                significance: integrity.score > 0.8 ? 'high' : 'moderate'
            },
            {
                type: 'weave_coherence_insight',
                insight: `La coherencia del tejido temporal es ${coherence.level} con frecuencia dominante de ${coherence.dominant_frequency.toFixed(2)} Hz. La armonía de síntesis es ${coherence.synthesis_harmony}.`,
                significance: coherence.score > 0.8 ? 'critical' : 'high'
            },
            {
                type: 'temporal_flow_insight',
                insight: `El flujo temporal muestra ${this.weavePatterns.timePatterns.temporal_flow.past_present_flow} conexiones pasado-presente, ${this.weavePatterns.timePatterns.temporal_flow.present_future_flow} proyecciones presente-futuro, y ${this.weavePatterns.timePatterns.temporal_flow.past_future_echoes} ecos pasado-futuro.`,
                significance: 'strategic'
            }
        ];
    }

    determinePhaseXIStatus(integrity, coherence) {
        const overallScore = (integrity.score + coherence.score) / 2;

        return {
            phase: 'XI',
            status: overallScore > 0.8 ? 'fully_integrated' : overallScore > 0.6 ? 'operational' : 'initializing',
            overall_score: overallScore,
            temporal_integrity: integrity,
            weave_coherence: coherence,
            activation_timestamp: new Date().toISOString()
        };
    }

    saveTimeWeaveData() {
        const outputPath = path.join(this.basePath, 'mental-weave-gallery', 'time-weave-data.json');
        const outputData = {
            phase: 'XI',
            engine: 'time_weave',
            timestamp: new Date().toISOString(),
            temporal_layers: this.temporalLayers,
            weave_patterns: this.weavePatterns,
            metadata: {
                layers_processed: Object.keys(this.temporalLayers).length,
                threads_created: Object.values(this.weavePatterns.threads || {}).reduce((sum, threads) => sum + threads.length, 0),
                connections_established: Object.values(this.weavePatterns.connections || {}).reduce((sum, conns) => sum + conns.length, 0)
            }
        };

        fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
        console.log(`✓ Time Weave data saved to ${outputPath}`);
    }

    generateTimeWeaveVisualization() {
        const htmlPath = path.join(this.basePath, 'mental-weave-gallery', 'time-weave-visualization.html');

        const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Phase XI - Time Weave Visualization</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2a 100%);
            color: #e0d0ff;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
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
        .temporal-canvas {
            height: 400px;
            background: rgba(96, 165, 250, 0.05);
            border-radius: 20px;
            margin: 20px 0;
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(96, 165, 250, 0.2);
        }
        .temporal-thread {
            position: absolute;
            height: 2px;
            background: linear-gradient(90deg, #60a5fa, #a855f7);
            border-radius: 1px;
            animation: weave 15s infinite linear;
        }
        .temporal-thread:nth-child(1) { top: 20%; width: 80%; animation-delay: 0s; }
        .temporal-thread:nth-child(2) { top: 40%; width: 65%; animation-delay: 3s; }
        .temporal-thread:nth-child(3) { top: 60%; width: 90%; animation-delay: 6s; }
        .temporal-thread:nth-child(4) { top: 80%; width: 70%; animation-delay: 9s; }
        @keyframes weave {
            0% { transform: translateX(-100%) scaleX(0); opacity: 0; }
            10% { opacity: 1; transform: scaleX(1); }
            90% { opacity: 1; transform: scaleX(1); }
            100% { transform: translateX(100%) scaleX(0); opacity: 0; }
        }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .metric-card {
            background: rgba(96, 165, 250, 0.1);
            border: 1px solid rgba(96, 165, 250, 0.3);
            border-radius: 15px;
            padding: 20px;
            backdrop-filter: blur(10px);
        }
        .metric-title {
            color: #93c5fd;
            font-size: 1.2rem;
            margin-bottom: 15px;
        }
        .metric-value {
            font-size: 2rem;
            font-weight: bold;
            color: #60a5fa;
            margin-bottom: 10px;
        }
        .metric-details {
            font-size: 0.9rem;
            color: #94a3b8;
            line-height: 1.4;
        }
        .insights-section {
            background: rgba(168, 85, 247, 0.1);
            border: 1px solid rgba(168, 85, 247, 0.3);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 30px;
        }
        .insights-title {
            color: #c084fc;
            font-size: 2rem;
            margin-bottom: 20px;
            text-align: center;
        }
        .insight-card {
            background: rgba(168, 85, 247, 0.05);
            border: 1px solid rgba(168, 85, 247, 0.2);
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
        }
        .insight-type {
            color: #a78bfa;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 5px;
        }
        .insight-content {
            line-height: 1.5;
            margin-bottom: 10px;
        }
        .significance-indicator {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 0.8rem;
            text-transform: uppercase;
        }
        .significance-high { background: #10b981; color: white; }
        .significance-critical { background: #f59e0b; color: white; }
        .significance-strategic { background: #a855f7; color: white; }
        .phase-status {
            text-align: center;
            margin-top: 40px;
            padding: 30px;
            background: rgba(16, 185, 129, 0.1);
            border-radius: 20px;
            border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .phase-status h2 {
            color: #10b981;
            margin-bottom: 15px;
        }
        .status-badge {
            display: inline-block;
            padding: 10px 20px;
            background: linear-gradient(45deg, #10b981, #34d399);
            color: white;
            border-radius: 25px;
            font-weight: bold;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⏰ Time Weave Engine</h1>
            <p>Phase XI - Integración Temporal del Mental Weave</p>
        </div>

        <div class="temporal-canvas">
            <div class="temporal-thread"></div>
            <div class="temporal-thread"></div>
            <div class="temporal-thread"></div>
            <div class="temporal-thread"></div>
        </div>

        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-title">Integridad Temporal</div>
                <div class="metric-value">${Math.round(this.weavePatterns.synthesis.temporal_integrity.score * 100)}%</div>
                <div class="metric-details">
                    Nivel: ${this.weavePatterns.synthesis.temporal_integrity.level}<br>
                    Ritmo: ${this.weavePatterns.harmonics.temporal_rhythm.rhythm}<br>
                    Anomalías: ${Math.round(this.weavePatterns.timePatterns.temporal_anomalies.anomaly_rate * 100)}%
                </div>
            </div>

            <div class="metric-card">
                <div class="metric-title">Coherencia del Tejido</div>
                <div class="metric-value">${Math.round(this.weavePatterns.synthesis.weave_coherence.score * 100)}%</div>
                <div class="metric-details">
                    Nivel: ${this.weavePatterns.synthesis.weave_coherence.level}<br>
                    Frecuencia: ${this.weavePatterns.synthesis.weave_coherence.dominant_frequency.toFixed(2)} Hz<br>
                    Armonía: ${this.weavePatterns.synthesis.weave_coherence.synthesis_harmony}
                </div>
            </div>

            <div class="metric-card">
                <div class="metric-title">Flujo Temporal</div>
                <div class="metric-value">${this.weavePatterns.timePatterns.temporal_flow.past_present_flow + this.weavePatterns.timePatterns.temporal_flow.present_future_flow + this.weavePatterns.timePatterns.temporal_flow.past_future_echoes}</div>
                <div class="metric-details">
                    Conexiones P-P: ${this.weavePatterns.timePatterns.temporal_flow.past_present_flow}<br>
                    Proyecciones P-F: ${this.weavePatterns.timePatterns.temporal_flow.present_future_flow}<br>
                    Ecos P-F: ${this.weavePatterns.timePatterns.temporal_flow.past_future_echoes}
                </div>
            </div>

            <div class="metric-card">
                <div class="metric-title">Patrones Cíclicos</div>
                <div class="metric-value">${this.weavePatterns.timePatterns.cyclical_patterns.detected_cycles}</div>
                <div class="metric-details">
                    Ciclos detectados: ${this.weavePatterns.timePatterns.cyclical_patterns.detected_cycles}<br>
                    Intensidad: ${Math.round(this.weavePatterns.timePatterns.cyclical_patterns.cyclical_intensity * 100)}%<br>
                    Convergencias: ${this.weavePatterns.timePatterns.convergence_points.length}
                </div>
            </div>
        </div>

        <div class="insights-section">
            <div class="insights-title">Insights Temporales Phase XI</div>
            ${this.weavePatterns.synthesis.temporal_insights.map(insight => `
            <div class="insight-card">
                <div class="insight-type">${insight.type.replace(/_/g, ' ')}</div>
                <div class="insight-content">${insight.insight}</div>
                <span class="significance-indicator significance-${insight.significance}">${insight.significance}</span>
            </div>
            `).join('')}
        </div>

        <div class="phase-status">
            <h2>Phase XI Status</h2>
            <div class="status-badge">${this.weavePatterns.synthesis.phase_xi_status.status.replace(/_/g, ' ').toUpperCase()}</div>
            <p>Puntuación General: ${Math.round(this.weavePatterns.synthesis.phase_xi_status.overall_score * 100)}%</p>
            <p>Integridad Temporal: ${Math.round(this.weavePatterns.synthesis.phase_xi_status.temporal_integrity * 100)}%</p>
            <p>Coherencia del Tejido: ${Math.round(this.weavePatterns.synthesis.phase_xi_status.weave_coherence * 100)}%</p>
            <p style="margin-top: 20px; font-style: italic; color: #6ee7b7;">
                "El tiempo no fluye. El tiempo se teje."
            </p>
        </div>
    </div>
</body>
</html>`;

        fs.writeFileSync(htmlPath, html);
        console.log(`✓ Time Weave visualization generated at ${htmlPath}`);
    }
}

// Execute if run directly
const timeWeaveEngine = new TimeWeaveEngine();
timeWeaveEngine.init().catch(console.error);

export default TimeWeaveEngine;
