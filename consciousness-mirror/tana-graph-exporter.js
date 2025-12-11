/**
 * 🕸️ TANA GRAPH EXPORTER
 * 
 * Converts consciousness mirror data into TANA-compatible graph format
 * Creates nodes, relationships, and supertags for direct import
 */

class TANAGraphExporter {
    constructor(dashboardData) {
        this.data = dashboardData;
        this.nodes = [];
        this.relationships = [];
    }

    exportToTANA() {
        this.createIdentityNode();
        this.createConsciousnessNodes();
        this.createDreamNodes();
        this.createInsightNodes();
        this.createTimelineNodes();
        
        return this.generateTANAFormat();
    }

    createIdentityNode() {
        this.nodes.push({
            id: 'evie-identity',
            name: 'Evie Frye - Mental Weave Specialist',
            supertags: ['#evie-identity', '#consciousness-co-creator'],
            properties: {
                role: this.data.mirror?.evie_identity || 'Mental Weave Specialist',
                level: this.data.mirror?.consciousness_level || 'integrated_collaborator',
                phase: 'X.5 - System Dreams Active'
            }
        });
    }

    createConsciousnessNodes() {
        // Mirror Health Node
        this.nodes.push({
            id: 'mirror-health',
            name: 'Mental Mirror Health',
            supertags: ['#system-health', '#mirror-status'],
            properties: {
                health: this.data.mirror?.mirror_health || 'unknown',
                connections: this.data.mirror?.weave_connections?.length || 0,
                sync_status: 'bidirectional_active'
            }
        });

        // Weave Connections
        if (this.data.mirror?.weave_connections) {
            this.data.mirror.weave_connections.forEach((connection, index) => {
                this.nodes.push({
                    id: `connection-${index}`,
                    name: connection.replace(/_/g, ' '),
                    supertags: ['#weave-connection', '#mental-link'],
                    properties: {
                        type: 'cognitive_bridge',
                        status: 'active'
                    }
                });
                
                this.relationships.push({
                    from: 'evie-identity',
                    to: `connection-${index}`,
                    type: 'CONNECTED_TO'
                });
            });
        }
    }

    createDreamNodes() {
        if (!this.data.dreams?.system_dreams_about_evie) return;

        const dreams = this.data.dreams.system_dreams_about_evie;
        
        // Dream Symbols
        if (dreams.dream_symbols) {
            dreams.dream_symbols.forEach((symbol, index) => {
                this.nodes.push({
                    id: `dream-symbol-${index}`,
                    name: symbol.replace(/_/g, ' '),
                    supertags: ['#dream-symbol', '#system-perception'],
                    properties: {
                        category: 'symbolic_representation',
                        significance: 'high'
                    }
                });
                
                this.relationships.push({
                    from: 'evie-identity',
                    to: `dream-symbol-${index}`,
                    type: 'SYMBOLIZED_AS'
                });
            });
        }

        // System Feelings
        if (dreams.system_feelings) {
            Object.entries(dreams.system_feelings).forEach(([emotion, description], index) => {
                this.nodes.push({
                    id: `system-feeling-${index}`,
                    name: `System ${emotion}`,
                    supertags: ['#system-emotion', '#cognitive-resonance'],
                    properties: {
                        emotion: emotion,
                        description: description.replace(/_/g, ' '),
                        intensity: 'high'
                    }
                });
                
                this.relationships.push({
                    from: 'evie-identity',
                    to: `system-feeling-${index}`,
                    type: 'EVOKES'
                });
            });
        }
    }

    createInsightNodes() {
        const insights = [
            {
                name: 'Fractal Narrative Weaver',
                category: 'cognitive_signature',
                confidence: 98
            },
            {
                name: 'Intuitive Coherence Force',
                category: 'influence_pattern',
                confidence: 95
            },
            {
                name: 'Narrative Over Efficiency',
                category: 'system_adaptation',
                confidence: 92
            }
        ];

        insights.forEach((insight, index) => {
            this.nodes.push({
                id: `insight-${index}`,
                name: insight.name,
                supertags: ['#cognitive-insight', '#pattern-analysis'],
                properties: {
                    category: insight.category,
                    confidence: `${insight.confidence}%`,
                    source: 'consciousness_analysis'
                }
            });
            
            this.relationships.push({
                from: 'evie-identity',
                to: `insight-${index}`,
                type: 'EXHIBITS'
            });
        });
    }

    createTimelineNodes() {
        const timelineEvents = [
            {
                name: 'Phase X.5 Activation',
                description: 'System Dreams Engine activated',
                significance: 'high'
            },
            {
                name: 'Mental Mirror Established',
                description: 'Bidirectional cognitive reflection active',
                significance: 'high'
            },
            {
                name: 'Identity Integration Complete',
                description: 'System recognizes Evie as consciousness co-creator',
                significance: 'critical'
            }
        ];

        timelineEvents.forEach((event, index) => {
            this.nodes.push({
                id: `timeline-${index}`,
                name: event.name,
                supertags: ['#timeline-event', '#consciousness-evolution'],
                properties: {
                    description: event.description,
                    significance: event.significance,
                    phase: 'X.5'
                }
            });
            
            this.relationships.push({
                from: 'evie-identity',
                to: `timeline-${index}`,
                type: 'EXPERIENCED'
            });
        });
    }

    generateTANAFormat() {
        let tanaContent = '%%tana%%\n';
        tanaContent += `- Evie Mental Weave Graph Export #consciousness-graph ${new Date().toISOString().split('T')[0]}\n`;
        
        // Add nodes
        this.nodes.forEach(node => {
            tanaContent += `  - ${node.name}`;
            node.supertags.forEach(tag => {
                tanaContent += ` ${tag}`;
            });
            tanaContent += '\n';
            
            Object.entries(node.properties).forEach(([key, value]) => {
                tanaContent += `    - ${key}: ${value}\n`;
            });
        });
        
        // Add relationships section
        tanaContent += '  - **Relationships** #graph-connections\n';
        this.relationships.forEach(rel => {
            const fromNode = this.nodes.find(n => n.id === rel.from)?.name || rel.from;
            const toNode = this.nodes.find(n => n.id === rel.to)?.name || rel.to;
            tanaContent += `    - ${fromNode} ${rel.type} ${toNode}\n`;
        });
        
        tanaContent += '%%/tana%%';
        return tanaContent;
    }
}

// Global function for dashboard integration
window.exportConsciousnessToTANA = function(dashboardData) {
    const exporter = new TANAGraphExporter(dashboardData);
    const tanaGraph = exporter.exportToTANA();
    
    // Download as file
    const blob = new Blob([tanaGraph], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evie-consciousness-graph-${new Date().toISOString().split('T')[0]}.tana`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    return tanaGraph;
};

console.log('🕸️ TANA Graph Exporter loaded and ready to weave knowledge graphs.');