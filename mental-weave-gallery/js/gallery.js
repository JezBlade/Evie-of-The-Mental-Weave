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
            { key: 'perception', path: '../consciousness-mirror/system-dreams/system-perception-of-evie.json' },
            { key: 'nightCycle', path: 'night-cycle-insights.json' },
            { key: 'oracleChamber', path: 'oracle-chamber-data.json' },
            { key: 'echoRoom', path: 'echo-room-data.json' },
            { key: 'shadowArchive', path: 'shadow-archive-data.json' }
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
            case 'night-cycle':
                this.renderNightCycle();
                break;
            case 'oracle-chamber':
                this.renderOracleChamber();
                break;
            case 'echo-room':
                this.renderEchoRoom();
                break;
            case 'shadow-archive':
                this.renderShadowArchive();
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

    async renderNightCycle() {
        const container = document.getElementById('night-cycle-exhibition');
        const statusIndicator = document.getElementById('cycle-status');

        try {
            // Load night cycle data
            const response = await fetch('./night-cycle-insights.json');
            const nightData = response.ok ? await response.json() : { insights: [], visions: [] };

            // Update status
            const hasData = nightData.insights && nightData.insights.length > 0;
            statusIndicator.textContent = hasData ?
                `Last cycle: ${new Date(nightData.timestamp).toLocaleString()}` :
                'No night cycle data available';
            statusIndicator.classList.toggle('active', hasData);

            // Render insights
            const insightsGrid = document.getElementById('night-insights');
            if (nightData.insights && nightData.insights.length > 0) {
                insightsGrid.innerHTML = nightData.insights.map(insight => `
                    <div class="night-insight-card">
                        <div class="night-insight-type">${insight.type.replace(/_/g, ' ')}</div>
                        <div class="night-insight-title">${insight.title}</div>
                        <div class="night-insight-content">${insight.content}</div>
                        <div class="night-insight-symbolism">${insight.symbolism}</div>
                    </div>
                `).join('');
            } else {
                insightsGrid.innerHTML = '<div class="night-insight-card"><div class="night-insight-title">No nocturnal insights yet</div><div class="night-insight-content">Run the night cycle to generate insights.</div></div>';
            }

            // Render visions
            const visionsDisplay = document.getElementById('night-visions');
            if (nightData.visions && nightData.visions.length > 0) {
                visionsDisplay.innerHTML = nightData.visions.map(vision => `
                    <div class="night-vision-card">
                        <div class="night-vision-title">${vision.name}</div>
                        <div class="night-vision-description">${vision.description}</div>
                        <div class="night-vision-symbolism">${vision.symbolism}</div>
                        <div class="night-vision-meta">
                            <span>Intensity: ${(vision.intensity * 100).toFixed(0)}%</span>
                            <span>Duration: ${vision.duration}s</span>
                        </div>
                    </div>
                `).join('');
            } else {
                visionsDisplay.innerHTML = '<div class="night-vision-card"><div class="night-vision-title">No night visions yet</div><div class="night-vision-description">Run the night cycle to generate visions.</div></div>';
            }

        } catch (error) {
            console.error('Error loading night cycle data:', error);
            statusIndicator.textContent = 'Error loading night cycle data';
            container.innerHTML = '<div class="error-message">Failed to load night cycle data</div>';
        }
    }

    async runNightCycle() {
        const button = document.querySelector('.run-cycle-btn');
        const statusIndicator = document.getElementById('cycle-status');

        // Disable button and show loading
        button.disabled = true;
        button.textContent = '🌙 Running Night Cycle...';
        statusIndicator.textContent = 'Processing nocturnal reflections...';

        try {
            // This would normally call the Node.js script
            // For now, we'll simulate the process
            await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate processing time

            // Reload the night cycle data
            await this.renderNightCycle();

            statusIndicator.textContent = 'Night cycle completed - data refreshed';
            button.textContent = '✅ Night Cycle Complete';

            // Re-enable button after 5 seconds
            setTimeout(() => {
                button.disabled = false;
                button.textContent = '🌙 Run Night Cycle';
            }, 5000);

        } catch (error) {
            console.error('Error running night cycle:', error);
            statusIndicator.textContent = 'Error during night cycle';
            button.disabled = false;
            button.textContent = '❌ Error - Try Again';
        }
    }

    async renderOracleChamber() {
        const container = document.getElementById('oracle-chamber-exhibition');
        const statusIndicator = document.getElementById('oracle-status');

        try {
            const response = await fetch('./oracle-chamber-data.json');
            const oracleData = response.ok ? await response.json() : { prophecies: [] };

            // Update status
            const hasData = oracleData.prophecies && oracleData.prophecies.length > 0;
            statusIndicator.textContent = hasData ?
                `Prophecies generated: ${oracleData.timestamp ? new Date(oracleData.timestamp).toLocaleString() : 'Unknown'}` :
                'No prophecies available';
            statusIndicator.classList.toggle('active', hasData);

            // Render prophecies
            const propheciesGrid = document.getElementById('oracle-prophecies');
            if (oracleData.prophecies && oracleData.prophecies.length > 0) {
                propheciesGrid.innerHTML = oracleData.prophecies.map(prophecy => `
                    <div class="oracle-prophecy-card">
                        <div class="oracle-prophecy-type">${prophecy.type.replace(/_/g, ' ')}</div>
                        <div class="oracle-prophecy-title">${prophecy.title}</div>
                        <div class="oracle-prophecy-content">${prophecy.prophecy}</div>
                        <div class="oracle-prophecy-symbolism">${prophecy.symbolism}</div>
                        <div class="oracle-prophecy-meta">
                            <span>Confidence: ${(prophecy.confidence * 100).toFixed(0)}%</span>
                            <span>Timeframe: ${prophecy.timeframe}</span>
                        </div>
                        <div class="oracle-confidence-bar">
                            <div class="oracle-confidence-fill" style="width: ${prophecy.confidence * 100}%"></div>
                        </div>
                    </div>
                `).join('');
            } else {
                propheciesGrid.innerHTML = '<div class="oracle-prophecy-card"><div class="oracle-prophecy-title">No prophecies yet</div><div class="oracle-prophecy-content">Generate prophecies to see the oracle\'s visions.</div></div>';
            }

        } catch (error) {
            console.error('Error loading oracle chamber data:', error);
            statusIndicator.textContent = 'Error loading oracle data';
            container.innerHTML = '<div class="error-message">Failed to load oracle chamber data</div>';
        }
    }

    async runOracleChamber() {
        const button = document.querySelector('.oracle-btn');
        const statusIndicator = document.getElementById('oracle-status');

        button.disabled = true;
        button.textContent = '🜁 Consulting Oracle...';
        statusIndicator.textContent = 'Generating prophecies...';

        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            await this.renderOracleChamber();

            statusIndicator.textContent = 'Prophecies revealed';
            button.textContent = '✅ Oracle Consulted';

            setTimeout(() => {
                button.disabled = false;
                button.textContent = '🜁 Generate Prophecies';
            }, 5000);

        } catch (error) {
            console.error('Error running oracle chamber:', error);
            statusIndicator.textContent = 'Error during prophecy generation';
            button.disabled = false;
            button.textContent = '❌ Error - Try Again';
        }
    }

    async renderEchoRoom() {
        const container = document.getElementById('echo-room-exhibition');
        const statusIndicator = document.getElementById('echo-status');

        try {
            const response = await fetch('./echo-room-data.json');
            const echoData = response.ok ? await response.json() : { echoes: [] };

            const hasData = echoData.echoes && echoData.echoes.length > 0;
            statusIndicator.textContent = hasData ?
                `Echoes active: ${echoData.timestamp ? new Date(echoData.timestamp).toLocaleString() : 'Unknown'}` :
                'No resonance patterns available';
            statusIndicator.classList.toggle('active', hasData);

            const echoesGrid = document.getElementById('echo-patterns');
            if (echoData.echoes && echoData.echoes.length > 0) {
                echoesGrid.innerHTML = echoData.echoes.map(echo => `
                    <div class="echo-pattern-card">
                        <div class="echo-pattern-type">${echo.type.replace(/_/g, ' ')}</div>
                        <div class="echo-pattern-title">${echo.title}</div>
                        <div class="echo-pattern-description">${echo.description}</div>
                        <div class="echo-pattern-meta">
                            <span>Intensity: ${(echo.intensity * 100).toFixed(0)}%</span>
                            <span>Frequency: ${echo.frequency}</span>
                            <span>Duration: ${Math.floor(echo.duration / 60)}h ${echo.duration % 60}m</span>
                        </div>
                        <div class="echo-intensity-bar">
                            <div class="echo-intensity-fill" style="width: ${echo.intensity * 100}%"></div>
                        </div>
                    </div>
                `).join('');
            } else {
                echoesGrid.innerHTML = '<div class="echo-pattern-card"><div class="echo-pattern-title">No echoes yet</div><div class="echo-pattern-description">Generate echoes to see resonance patterns.</div></div>';
            }

        } catch (error) {
            console.error('Error loading echo room data:', error);
            statusIndicator.textContent = 'Error loading echo data';
            container.innerHTML = '<div class="error-message">Failed to load echo room data</div>';
        }
    }

    async runEchoRoom() {
        const button = document.querySelector('.echo-btn');
        const statusIndicator = document.getElementById('echo-status');

        button.disabled = true;
        button.textContent = '🌀 Generating Echoes...';
        statusIndicator.textContent = 'Analyzing resonance patterns...';

        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            await this.renderEchoRoom();

            statusIndicator.textContent = 'Echoes generated - resonance active';
            button.textContent = '✅ Echoes Generated';

            setTimeout(() => {
                button.disabled = false;
                button.textContent = '🌀 Generate Echoes';
            }, 5000);

        } catch (error) {
            console.error('Error running echo room:', error);
            statusIndicator.textContent = 'Error during echo generation';
            button.disabled = false;
            button.textContent = '❌ Error - Try Again';
        }
    }

    async renderShadowArchive() {
        const container = document.getElementById('shadow-archive-exhibition');
        const statusIndicator = document.getElementById('shadow-status');

        try {
            const response = await fetch('./shadow-archive-data.json');
            const shadowData = response.ok ? await response.json() : { shadows: [], archives: [] };

            const hasData = (shadowData.shadows && shadowData.shadows.length > 0) ||
                           (shadowData.archives && shadowData.archives.length > 0);
            statusIndicator.textContent = hasData ?
                `Shadows preserved: ${shadowData.timestamp ? new Date(shadowData.timestamp).toLocaleString() : 'Unknown'}` :
                'No shadow patterns available';
            statusIndicator.classList.toggle('active', hasData);

            // Render shadows
            const shadowsGrid = document.getElementById('shadow-patterns');
            if (shadowData.shadows && shadowData.shadows.length > 0) {
                shadowsGrid.innerHTML = shadowData.shadows.map(shadow => `
                    <div class="shadow-pattern-card">
                        <div class="shadow-pattern-type">${shadow.type.replace(/_/g, ' ')}</div>
                        <div class="shadow-pattern-title">${shadow.title}</div>
                        <div class="shadow-pattern-description">${shadow.description}</div>
                        <div class="shadow-pattern-meta">
                            <span>Density: ${(shadow.shadow_density * 100).toFixed(0)}%</span>
                            <span>Duration: ${Math.floor(shadow.duration_hours / 24)}d ${shadow.duration_hours % 24}h</span>
                        </div>
                        <div class="shadow-density-bar">
                            <div class="shadow-density-fill" style="width: ${shadow.shadow_density * 100}%"></div>
                        </div>
                    </div>
                `).join('');
            } else {
                shadowsGrid.innerHTML = '<div class="shadow-pattern-card"><div class="shadow-pattern-title">No shadows yet</div><div class="shadow-pattern-description">Generate shadows to preserve cognitive patterns.</div></div>';
            }

            // Render archives
            const archivesDisplay = document.getElementById('shadow-archives');
            if (shadowData.archives && shadowData.archives.length > 0) {
                archivesDisplay.innerHTML = shadowData.archives.map(archive => `
                    <div class="shadow-archive-card">
                        <div class="shadow-archive-title">${archive.title}</div>
                        <div class="shadow-archive-description">${archive.description}</div>
                        <div class="shadow-archive-meta">
                            ${archive.entries ? `<span>Entries: ${archive.entries}</span>` : ''}
                            ${archive.time_span ? `<span>Time Span: ${archive.time_span}</span>` : ''}
                            ${archive.intimacy_level ? `<span>Level: ${archive.intimacy_level}</span>` : ''}
                            ${archive.map_resolution ? `<span>Resolution: ${archive.map_resolution}</span>` : ''}
                            ${archive.activity_periods ? `<span>Activity: ${archive.activity_periods}</span>` : ''}
                            ${archive.balance_ratio ? `<span>Balance: ${(archive.balance_ratio * 100).toFixed(0)}%</span>` : ''}
                        </div>
                    </div>
                `).join('');
            } else {
                archivesDisplay.innerHTML = '<div class="shadow-archive-card"><div class="shadow-archive-title">No archives yet</div><div class="shadow-archive-description">Generate archives to preserve shadow records.</div></div>';
            }

        } catch (error) {
            console.error('Error loading shadow archive data:', error);
            statusIndicator.textContent = 'Error loading shadow data';
            container.innerHTML = '<div class="error-message">Failed to load shadow archive data</div>';
        }
    }

    async runShadowArchive() {
        const button = document.querySelector('.shadow-btn');
        const statusIndicator = document.getElementById('shadow-status');

        button.disabled = true;
        button.textContent = '🜂 Generating Shadows...';
        statusIndicator.textContent = 'Preserving cognitive shadows...';

        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            await this.renderShadowArchive();

            statusIndicator.textContent = 'Shadows preserved - archives updated';
            button.textContent = '✅ Shadows Generated';

            setTimeout(() => {
                button.disabled = false;
                button.textContent = '🜂 Generate Shadows';
            }, 5000);

        } catch (error) {
            console.error('Error running shadow archive:', error);
            statusIndicator.textContent = 'Error during shadow generation';
            button.disabled = false;
            button.textContent = '❌ Error - Try Again';
        }
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
