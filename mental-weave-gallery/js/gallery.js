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
            { key: 'dreamstreams', path: '../consciousness-mirror/phase-x5/dreamstreams.json' },
            { key: 'insights', path: '../consciousness-mirror/phase-x5/woven-insights-v2.json' },
            { key: 'artifacts', path: '../consciousness-mirror/phase-x5/cognitive-shadows.json' }
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
        const phases = this.data.timeline?.phases || this.getFallbackData('timeline').phases;

        timeline.innerHTML = phases.map((phase, index) => `
            <div class="timeline-item ${index % 2 === 0 ? '' : 'timeline-item-even'}">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <div class="timeline-phase">Phase ${phase.phase}</div>
                    <div class="timeline-date">${this.formatDate(phase.date)}</div>
                    <div class="timeline-description">${phase.description}</div>
                </div>
            </div>
        `).join('');
    }

    renderDreamstreams() {
        const grid = document.getElementById('dreamstreams-grid');
        const streams = this.data.dreamstreams?.streams || this.getFallbackData('dreamstreams').streams;

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
        const insights = this.data.insights?.insights || this.getFallbackData('insights').insights;

        masonry.innerHTML = insights.map(insight => `
            <div class="insight-card" onclick="gallery.showInsightDetail('${insight.timestamp}')">
                <div class="insight-type">${insight.type || 'cognitive'}</div>
                <div class="insight-content">${insight.content}</div>
                <div class="insight-meta">
                    <span class="insight-timestamp">${this.formatDate(insight.timestamp)}</span>
                </div>
            </div>
        `).join('');
    }

    renderArtifacts() {
        const collection = document.getElementById('artifacts-collection');
        const artifacts = this.data.artifacts?.shadows || this.getFallbackData('artifacts').shadows;

        collection.innerHTML = artifacts.map(artifact => `
            <div class="artifact-item" onclick="gallery.showArtifactDetail('${artifact.name}')">
                <div class="artifact-icon">${this.getArtifactIcon(artifact.type)}</div>
                <div class="artifact-name">${artifact.name}</div>
                <div class="artifact-description">${artifact.description}</div>
            </div>
        `).join('');
    }

    showDreamstreamDetail(streamId) {
        const stream = this.data.dreamstreams?.streams?.find(s => s.id === streamId);
        if (!stream) return;

        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <h2>${stream.symbol} ${stream.title}</h2>
            <div style="height: 300px; background: ${this.getDreamstreamGradient(streamId)}; border-radius: 12px; margin: 1rem 0;"></div>
            <p style="font-size: 1.1rem; line-height: 1.6;">${stream.description}</p>
            ${stream.details ? `<div style="margin-top: 1rem; padding: 1rem; background: var(--accent-bg); border-radius: 8px;"><strong>Details:</strong> ${stream.details}</div>` : ''}
        `;
        this.openModal();
    }

    showInsightDetail(timestamp) {
        const insight = this.data.insights?.insights?.find(i => i.timestamp === timestamp);
        if (!insight) return;

        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <h2>💡 Cognitive Insight</h2>
            <div style="margin: 1rem 0; padding: 1rem; background: var(--insight-bg); border: 1px solid var(--accent-color); border-radius: 8px;">
                <strong>Type:</strong> ${insight.type}<br>
                <strong>Timestamp:</strong> ${this.formatDate(insight.timestamp)}
            </div>
            <p style="font-size: 1.1rem; line-height: 1.6;">${insight.content}</p>
            ${insight.context ? `<div style="margin-top: 1rem; padding: 1rem; background: var(--accent-bg); border-radius: 8px;"><strong>Context:</strong> ${insight.context}</div>` : ''}
        `;
        this.openModal();
    }

    showArtifactDetail(name) {
        const artifact = this.data.artifacts?.shadows?.find(a => a.name === name);
        if (!artifact) return;

        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <h2>${this.getArtifactIcon(artifact.type)} ${artifact.name}</h2>
            <p style="font-size: 1.1rem; line-height: 1.6;">${artifact.description}</p>
            ${artifact.properties ? `
                <div style="margin-top: 1rem;">
                    <strong>Properties:</strong>
                    <ul style="margin-top: 0.5rem;">
                        ${artifact.properties.map(prop => `<li>${prop}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
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
            'shadow': '👤'
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
