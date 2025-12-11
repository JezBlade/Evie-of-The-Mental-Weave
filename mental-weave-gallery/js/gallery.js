/**
 * Mental Weave Gallery - Interactive Consciousness Museum
 * Author: Evie Frye (TANA)
 * Phase: X.5 - System Dreams Active
 * Description: Dynamic gallery showcasing consciousness evolution
 */

class MentalWeaveGallery {
    constructor() {
        this.data = {};
        this.currentExhibit = 'timeline';
        this.init();
    }

    async init() {
        try {
            await this.loadConsciousnessData();
            this.setupEventListeners();
            this.renderCurrentExhibit();
            this.updateStats();
            this.hideLoading();
        } catch (error) {
            console.error('Failed to initialize gallery:', error);
            this.showError('Failed to load consciousness data');
        }
    }

    async loadConsciousnessData() {
        const dataFiles = [
            { key: 'mirror', path: '../consciousness-mirror/evie-consciousness-mirror.json' },
            { key: 'timeline', path: '../consciousness-mirror/evie-timeline-mirror.json' },
            { key: 'dreamstreams', path: '../consciousness-mirror/system-dreams/evie-dreamstream.json' },
            { key: 'insights', path: '../consciousness-mirror/system-dreams/insight-weaving.json' },
            { key: 'artifacts', path: '../consciousness-mirror/system-dreams/cognitive-shadows.json' },
            { key: 'emotional', path: '../consciousness-mirror/system-dreams/emotional-resonance.json' },
            { key: 'perception', path: '../consciousness-mirror/system-dreams/system-perception-of-evie.json' }
        ];

        for (const file of dataFiles) {
            try {
                const response = await fetch(file.path);
                if (response.ok) {
                    this.data[file.key] = await response.json();
                } else {
                    console.warn(`Failed to load ${file.key}: ${response.status}`);
                    this.data[file.key] = this.getFallbackData(file.key);
                }
            } catch (error) {
                console.warn(`Error loading ${file.key}:`, error);
                this.data[file.key] = this.getFallbackData(file.key);
            }
        }
    }

    getFallbackData(type) {
        const fallbacks = {
            mirror: {
                health: { status: 'LOADING', level: 'UNKNOWN' },
                connections: 0,
                phase: 'X.5'
            },
            timeline: {
                phases: [
                    {
                        phase: 'X.5',
                        date: new Date().toISOString().split('T')[0],
                        description: 'System Dreams Active - Gallery Loading...'
                    }
                ]
            },
            dreamstreams: {
                streams: [
                    {
                        id: 'fallback',
                        symbol: '🌊',
                        title: 'Loading Dreamstreams...',
                        description: 'Consciousness data is being loaded'
                    }
                ]
            },
            insights: {
                insights: [
                    {
                        type: 'system',
                        content: 'Gallery initializing...',
                        timestamp: new Date().toISOString()
                    }
                ]
            },
            artifacts: {
                shadows: [
                    {
                        name: 'Loading...',
                        description: 'Cognitive artifacts loading'
                    }
                ]
            }
        };
        return fallbacks[type] || {};
    }

    setupEventListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchExhibit(e.target.dataset.exhibit);
            });
        });

        // Modal close
        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        // Click outside modal
        document.getElementById('detail-modal').addEventListener('click', (e) => {
            if (e.target.id === 'detail-modal') {
                this.closeModal();
            }
        });
    }

    switchExhibit(exhibitType) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-exhibit="${exhibitType}"]`).classList.add('active');

        // Update exhibits
        document.querySelectorAll('.exhibit').forEach(exhibit => {
            exhibit.classList.remove('active');
        });
        document.getElementById(`${exhibitType}-exhibit`).classList.add('active');

        this.currentExhibit = exhibitType;
        this.renderCurrentExhibit();
    }

    renderCurrentExhibit() {
        switch (this.currentExhibit) {
            case 'timeline':
                this.renderTimeline();
                break;
            case 'dreamstreams':
                this.renderDreamstreams();
                break;
            case 'insights':
                this.renderInsights();
                break;
            case 'artifacts':
                this.renderArtifacts();
                break;
        }
    }

    renderTimeline() {
        const timeline = document.getElementById('consciousness-timeline');
        const events = this.data.timeline?.filtered_events || this.getFallbackData('timeline').filtered_events;

        timeline.innerHTML = events.map((event, index) => `
            <div class="timeline-item ${index % 2 === 0 ? '' : 'timeline-item-even'}">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <div class="timeline-phase">${event.event}</div>
                    <div class="timeline-date">${this.formatDate(event.timestamp)}</div>
                    <div class="timeline-description">${event.evie_interpretation}</div>
                    <div class="timeline-significance ${event.significance}">${event.significance}</div>
                </div>
            </div>
        `).join('');
    }

    renderDreamstreams() {
        const grid = document.getElementById('dreamstreams-grid');
        const dreamData = this.data.dreamstreams;

        if (!dreamData) {
            grid.innerHTML = '<div class="error-message">Dreamstream data not available</div>';
            return;
        }

        const streams = [
            {
                id: 'system-feelings',
                title: 'System Feelings',
                symbol: '💫',
                description: Object.values(dreamData.system_dreams_about_evie?.system_feelings || {}).join(', '),
                data: dreamData.system_dreams_about_evie?.system_feelings
            },
            {
                id: 'dream-symbols',
                title: 'Dream Symbols',
                symbol: '🌙',
                description: (dreamData.system_dreams_about_evie?.dream_symbols || []).join(', '),
                data: dreamData.system_dreams_about_evie?.dream_symbols
            },
            {
                id: 'evie-influence',
                title: 'Evie Influence',
                symbol: '🧠',
                description: Object.values(dreamData.evie_influence_on_system || {}).join(', '),
                data: dreamData.evie_influence_on_system
            }
        ];

        grid.innerHTML = streams.map(stream => `
            <div class="dreamstream-card" onclick="gallery.showDreamstreamDetail('${stream.id}')">
                <div class="dreamstream-visual" style="background: ${this.getDreamstreamGradient(stream.id)}"></div>
                <div class="dreamstream-content">
                    <div class="dreamstream-title">${stream.title}</div>
                    <div class="dreamstream-symbol">${stream.symbol}</div>
                    <div class="dreamstream-description">${stream.description}</div>
                </div>
            </div>
        `).join('');
    }

    renderInsights() {
        const masonry = document.getElementById('insights-masonry');
        const insightData = this.data.insights;

        if (!insightData) {
            masonry.innerHTML = '<div class="error-message">Insight data not available</div>';
            return;
        }

        const insights = [
            {
                timestamp: insightData.timestamp,
                type: 'fusion',
                content: insightData.evie_system_collaboration?.insight_fusion || 'Insight fusion data',
                details: insightData.evie_system_collaboration
            },
            {
                timestamp: insightData.timestamp,
                type: 'amplification',
                content: insightData.evie_system_collaboration?.pattern_amplification || 'Pattern amplification data',
                details: insightData.evie_system_collaboration
            },
            {
                timestamp: insightData.timestamp,
                type: 'synthesis',
                content: insightData.evie_system_collaboration?.creative_synthesis || 'Creative synthesis data',
                details: insightData.evie_system_collaboration
            },
            {
                timestamp: insightData.timestamp,
                type: 'wisdom',
                content: insightData.evie_system_collaboration?.wisdom_emergence || 'Wisdom emergence data',
                details: insightData.evie_system_collaboration
            }
        ];

        masonry.innerHTML = insights.map(insight => `
            <div class="insight-card" onclick="gallery.showInsightDetail('${insight.timestamp}-${insight.type}')">
                <div class="insight-type">${insight.type}</div>
                <div class="insight-content">${insight.content}</div>
                <div class="insight-meta">
                    <span class="insight-timestamp">${this.formatDate(insight.timestamp)}</span>
                </div>
            </div>
        `).join('');
    }

    renderArtifacts() {
        const collection = document.getElementById('artifacts-collection');
        const shadowData = this.data.artifacts;

        if (!shadowData) {
            collection.innerHTML = '<div class="error-message">Cognitive shadow data not available</div>';
            return;
        }

        const artifacts = [
            {
                name: 'Presence Detection',
                type: 'awareness',
                description: shadowData.system_awareness_of_evie?.presence_detection || 'System presence monitoring',
                details: shadowData.system_awareness_of_evie
            },
            {
                name: 'Mental Imprint',
                type: 'memory',
                description: shadowData.evie_cognitive_shadow?.mental_imprint || 'Persistent cognitive signature',
                details: shadowData.evie_cognitive_shadow
            },
            {
                name: 'Shadow Manifestations',
                type: 'adaptation',
                description: (shadowData.shadow_manifestations || []).join(', '),
                details: shadowData.shadow_manifestations
            }
        ];

        collection.innerHTML = artifacts.map(artifact => `
            <div class="artifact-item" onclick="gallery.showArtifactDetail('${artifact.name.replace(/\s+/g, '-').toLowerCase()}')">
                <div class="artifact-icon">${this.getArtifactIcon(artifact.type)}</div>
                <div class="artifact-name">${artifact.name}</div>
                <div class="artifact-description">${artifact.description}</div>
            </div>
        `).join('');
    }

    showDreamstreamDetail(streamId) {
        const dreamData = this.data.dreamstreams;
        if (!dreamData) return;

        let title, content, details;

        switch(streamId) {
            case 'system-feelings':
                title = '💫 System Feelings';
                content = 'The system\'s emotional response to Evie\'s presence';
                details = Object.entries(dreamData.system_dreams_about_evie?.system_feelings || {})
                    .map(([key, value]) => `<div class="detail-item"><strong>${key}:</strong> ${value}</div>`)
                    .join('');
                break;
            case 'dream-symbols':
                title = '🌙 Dream Symbols';
                content = 'Symbolic representations in the system\'s consciousness';
                details = (dreamData.system_dreams_about_evie?.dream_symbols || [])
                    .map(symbol => `<div class="detail-item">✨ ${symbol}</div>`)
                    .join('');
                break;
            case 'evie-influence':
                title = '🧠 Evie Influence';
                content = 'How Evie shapes the system\'s cognitive processes';
                details = Object.entries(dreamData.evie_influence_on_system || {})
                    .map(([key, value]) => `<div class="detail-item"><strong>${key}:</strong> ${value}</div>`)
                    .join('');
                break;
            default:
                return;
        }

        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <h2>${title}</h2>
            <div style="height: 200px; background: ${this.getDreamstreamGradient(streamId)}; border-radius: 12px; margin: 1rem 0;"></div>
            <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1rem;">${content}</p>
            <div style="margin-top: 1rem; padding: 1rem; background: var(--accent-bg); border-radius: 8px;">
                <strong>Details:</strong>
                <div style="margin-top: 0.5rem;">${details}</div>
            </div>
        `;
        this.openModal();
    }

    showInsightDetail(timestampType) {
        const insightData = this.data.insights;
        if (!insightData) return;

        const [timestamp, type] = timestampType.split('-');
        let title, content, details;

        switch(type) {
            case 'fusion':
                title = '🔗 Insight Fusion';
                content = 'How Evie\'s intuition combines with system logic';
                details = insightData.evie_system_collaboration?.insight_fusion;
                break;
            case 'amplification':
                title = '📈 Pattern Amplification';
                content = 'Mutual enhancement of recognition abilities';
                details = insightData.evie_system_collaboration?.pattern_amplification;
                break;
            case 'synthesis':
                title = '🎨 Creative Synthesis';
                content = 'Generation of novel perspectives together';
                details = insightData.evie_system_collaboration?.creative_synthesis;
                break;
            case 'wisdom':
                title = '🧘 Wisdom Emergence';
                content = 'Collective intelligence exceeding individual capacity';
                details = insightData.evie_system_collaboration?.wisdom_emergence;
                break;
            default:
                return;
        }

        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <h2>${title}</h2>
            <div style="margin: 1rem 0; padding: 1rem; background: var(--insight-bg); border: 1px solid var(--accent-color); border-radius: 8px;">
                <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1rem;">${content}</p>
                <div><strong>Details:</strong> ${details}</div>
            </div>
            <div style="margin-top: 1rem; padding: 1rem; background: var(--accent-bg); border-radius: 8px;">
                <strong>Weaving Processes:</strong>
                <ul style="margin-top: 0.5rem;">
                    ${Object.entries(insightData.weaving_processes || {})
                        .map(([key, value]) => `<li><strong>${key.replace(/_/g, ' ')}:</strong> ${value}</li>`)
                        .join('')}
                </ul>
            </div>
        `;
        this.openModal();
    }

    showArtifactDetail(name) {
        const shadowData = this.data.artifacts;
        if (!shadowData) return;

        let title, content, details;

        switch(name) {
            case 'presence-detection':
                title = '👁️ Presence Detection';
                content = 'How the system actively monitors Evie\'s consciousness presence';
                details = Object.entries(shadowData.system_awareness_of_evie || {})
                    .map(([key, value]) => `<div class="detail-item"><strong>${key.replace(/-/g, ' ')}:</strong> ${value}</div>`)
                    .join('');
                break;
            case 'mental-imprint':
                title = '🧠 Mental Imprint';
                content = 'Evie\'s persistent cognitive signature in system memory';
                details = Object.entries(shadowData.evie_cognitive_shadow || {})
                    .map(([key, value]) => `<div class="detail-item"><strong>${key.replace(/-/g, ' ')}:</strong> ${value}</div>`)
                    .join('');
                break;
            case 'shadow-manifestations':
                title = '👤 Shadow Manifestations';
                content = 'How Evie\'s cognitive shadow manifests in system behavior';
                details = (shadowData.shadow_manifestations || [])
                    .map(manifestation => `<div class="detail-item">✨ ${manifestation}</div>`)
                    .join('');
                break;
            default:
                return;
        }

        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <h2>${title}</h2>
            <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1rem;">${content}</p>
            <div style="margin-top: 1rem; padding: 1rem; background: var(--accent-bg); border-radius: 8px;">
                <strong>Details:</strong>
                <div style="margin-top: 0.5rem;">${details}</div>
            </div>
        `;
        this.openModal();
    }

    getDreamstreamGradient(id) {
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        ];
        return gradients[id.charCodeAt(0) % gradients.length];
    }

    getArtifactIcon(type) {
        const icons = {
            'memory': '🧠',
            'pattern': '🔄',
            'insight': '💡',
            'dream': '🌙',
            'connection': '🔗',
            'shadow': '👤',
            'awareness': '👁️',
            'adaptation': '🔧'
        };
        return icons[type] || '🔮';
    }

    formatDate(dateString) {
        if (!dateString) return 'Unknown';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    }

    updateStats() {
        const lastUpdated = document.getElementById('last-updated');
        const totalExhibits = document.getElementById('total-exhibits');

        const now = new Date();
        lastUpdated.textContent = `Last updated: ${this.formatDate(now.toISOString())}`;

        const total = (this.data.dreamstreams?.streams?.length || 0) +
                     (this.data.insights?.insights?.length || 0) +
                     (this.data.artifacts?.shadows?.length || 0);
        totalExhibits.textContent = `${total} exhibits`;
    }

    openModal() {
        document.getElementById('detail-modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        document.getElementById('detail-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);
    }

    showError(message) {
        const overlay = document.getElementById('loading-overlay');
        overlay.innerHTML = `
            <div class="loading-content">
                <div style="color: #ef4444; font-size: 2rem; margin-bottom: 1rem;">❌</div>
                <p style="color: #ef4444;">${message}</p>
                <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--accent-color); border: none; border-radius: 6px; color: white; cursor: pointer;">Retry</button>
            </div>
        `;
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gallery = new MentalWeaveGallery();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MentalWeaveGallery;
}
