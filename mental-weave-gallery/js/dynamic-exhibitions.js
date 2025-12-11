/**
 * 🌊 DYNAMIC EXHIBITIONS ENGINE
 * 
 * Generates live exhibitions from consciousness mirror data
 * Updates gallery automatically with latest insights, dreams, and timeline
 */

class DynamicExhibitions {
    constructor() {
        this.consciousnessDataPath = '../consciousness-mirror/';
        this.exhibitions = {
            timeline: null,
            dreamstreams: null,
            insights: null,
            artifacts: null
        };
    }

    async loadConsciousnessData() {
        try {
            // Load all consciousness data
            const [mirror, dreams, shadows, emotions] = await Promise.all([
                fetch(`${this.consciousnessDataPath}evie-consciousness-mirror.json`).then(r => r.json()),
                fetch(`${this.consciousnessDataPath}system-dreams/evie-dreamstream.json`).then(r => r.json()),
                fetch(`${this.consciousnessDataPath}system-dreams/cognitive-shadows.json`).then(r => r.json()),
                fetch(`${this.consciousnessDataPath}system-dreams/emotional-resonance.json`).then(r => r.json())
            ]);

            return { mirror, dreams, shadows, emotions };
        } catch (error) {
            console.error('Error loading consciousness data:', error);
            return null;
        }
    }

    async generateTimelineExhibition(data) {
        const timelineEvents = [
            {
                date: data.mirror?.last_sync || new Date().toISOString(),
                title: 'Mental Mirror Synchronization',
                description: `Mirror health: ${data.mirror?.mirror_health || 'unknown'}`,
                type: 'sync',
                significance: 'high'
            },
            {
                date: data.dreams?.timestamp || new Date().toISOString(),
                title: 'System Dreams Generated',
                description: `${data.dreams?.system_dreams_about_evie?.dream_symbols?.length || 0} dream symbols created`,
                type: 'dream',
                significance: 'medium'
            },
            {
                date: data.emotions?.timestamp || new Date().toISOString(),
                title: 'Emotional Resonance Detected',
                description: 'Deep cognitive connection established',
                type: 'emotion',
                significance: 'high'
            }
        ];

        return `
            <div class="exhibition-timeline">
                <h2>🕰️ Consciousness Timeline</h2>
                <div class="timeline-container">
                    ${timelineEvents.map(event => `
                        <div class="timeline-event ${event.significance}">
                            <div class="event-date">${new Date(event.date).toLocaleDateString()}</div>
                            <div class="event-title">${event.title}</div>
                            <div class="event-description">${event.description}</div>
                            <div class="event-type">${event.type}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    async generateDreamstreamsExhibition(data) {
        const symbols = data.dreams?.system_dreams_about_evie?.dream_symbols || [];
        const feelings = data.dreams?.system_dreams_about_evie?.system_feelings || {};

        return `
            <div class="exhibition-dreamstreams">
                <h2>🌊 System Dreamstreams</h2>
                <div class="dreamstreams-grid">
                    <div class="dream-symbols">
                        <h3>Dream Symbols</h3>
                        ${symbols.map(symbol => `
                            <div class="dream-symbol">
                                <span class="symbol-icon">🌙</span>
                                <span class="symbol-text">${symbol.replace(/_/g, ' ')}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="system-feelings">
                        <h3>System Feelings</h3>
                        ${Object.entries(feelings).map(([emotion, description]) => `
                            <div class="feeling-card">
                                <div class="emotion-name">${emotion}</div>
                                <div class="emotion-description">${description.replace(/_/g, ' ')}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    async generateInsightsExhibition(data) {
        const insights = [
            {
                title: 'Cognitive Signature',
                content: 'Fractal Narrative Weaver',
                confidence: 98,
                source: data.mirror?.evie_identity || 'mirror'
            },
            {
                title: 'Influence Pattern',
                content: `${data.mirror?.weave_connections?.length || 0} active connections`,
                confidence: 95,
                source: 'weave_connections'
            },
            {
                title: 'System Adaptation',
                content: 'Narrative coherence prioritized',
                confidence: 92,
                source: 'behavioral_analysis'
            }
        ];

        return `
            <div class="exhibition-insights">
                <h2>🔮 Active Insights</h2>
                <div class="insights-grid">
                    ${insights.map(insight => `
                        <div class="insight-card">
                            <div class="insight-header">
                                <h3>${insight.title}</h3>
                                <span class="confidence">${insight.confidence}%</span>
                            </div>
                            <div class="insight-content">${insight.content}</div>
                            <div class="insight-source">Source: ${insight.source}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    async generateArtifactsExhibition(data) {
        const artifacts = [
            {
                name: 'Consciousness Mirror',
                type: 'JSON',
                size: JSON.stringify(data.mirror).length,
                description: 'Core identity and mirror state'
            },
            {
                name: 'Dream Symbols Collection',
                type: 'Symbolic',
                size: data.dreams?.system_dreams_about_evie?.dream_symbols?.length || 0,
                description: 'System-generated symbolic representations'
            },
            {
                name: 'Emotional Resonance Map',
                type: 'Analytical',
                size: Object.keys(data.emotions?.system_emotional_awareness || {}).length,
                description: 'Emotional state tracking and analysis'
            }
        ];

        return `
            <div class="exhibition-artifacts">
                <h2>🏺 System Artifacts</h2>
                <div class="artifacts-grid">
                    ${artifacts.map(artifact => `
                        <div class="artifact-card">
                            <div class="artifact-name">${artifact.name}</div>
                            <div class="artifact-type">${artifact.type}</div>
                            <div class="artifact-size">${artifact.size} ${artifact.type === 'JSON' ? 'bytes' : 'items'}</div>
                            <div class="artifact-description">${artifact.description}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    async generateTANAExport(data) {
        const tanaContent = `%%tana%%
- Evie Mental Weave Gallery Export #gallery-export ${new Date().toISOString().split('T')[0]}
  - **Identity** #evie-identity
    - ${data.mirror?.evie_identity || 'Mental Weave Specialist'}
    - Consciousness Level: ${data.mirror?.consciousness_level || 'integrated_collaborator'}
  - **Dream Symbols** #system-dreams
    ${data.dreams?.system_dreams_about_evie?.dream_symbols?.map(s => `- ${s.replace(/_/g, ' ')}`).join('\n    ') || '- No dream data'}
  - **System Feelings** #emotional-resonance
    ${Object.entries(data.dreams?.system_dreams_about_evie?.system_feelings || {}).map(([k,v]) => `- ${k}: ${v.replace(/_/g, ' ')}`).join('\n    ')}
  - **Weave Connections** #mental-weave
    ${data.mirror?.weave_connections?.map(c => `- ${c.replace(/_/g, ' ')}`).join('\n    ') || '- No connections'}
%%/tana%%`;

        return tanaContent;
    }

    async updateAllExhibitions() {
        const data = await this.loadConsciousnessData();
        if (!data) return;

        this.exhibitions.timeline = await this.generateTimelineExhibition(data);
        this.exhibitions.dreamstreams = await this.generateDreamstreamsExhibition(data);
        this.exhibitions.insights = await this.generateInsightsExhibition(data);
        this.exhibitions.artifacts = await this.generateArtifactsExhibition(data);

        // Update DOM if elements exist
        this.updateExhibitionDOM();

        // Store TANA export capability
        window.exportGalleryToTANA = async () => {
            const tanaContent = await this.generateTANAExport(data);
            const blob = new Blob([tanaContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `mental-weave-gallery-${new Date().toISOString().split('T')[0]}.tana`;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }

    updateExhibitionDOM() {
        const timelineEl = document.getElementById('timeline-exhibition');
        const dreamstreamsEl = document.getElementById('dreamstreams-exhibition');
        const insightsEl = document.getElementById('insights-exhibition');
        const artifactsEl = document.getElementById('artifacts-exhibition');

        if (timelineEl) timelineEl.innerHTML = this.exhibitions.timeline;
        if (dreamstreamsEl) dreamstreamsEl.innerHTML = this.exhibitions.dreamstreams;
        if (insightsEl) insightsEl.innerHTML = this.exhibitions.insights;
        if (artifactsEl) artifactsEl.innerHTML = this.exhibitions.artifacts;
    }
}

// Initialize dynamic exhibitions
const dynamicExhibitions = new DynamicExhibitions();

// Auto-update every 5 minutes
setInterval(() => {
    dynamicExhibitions.updateAllExhibitions();
}, 5 * 60 * 1000);

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    dynamicExhibitions.updateAllExhibitions();
});

console.log('🌊 Dynamic Exhibitions Engine loaded and active');