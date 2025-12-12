/**
 * 🎨 LIVING ART ENGINE
 * 
 * Generates real-time art based on consciousness mirror data
 * 100% local, no external APIs, pure JavaScript mathematics
 */

class LivingArtEngine {
    constructor() {
        this.canvas = document.getElementById('artCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.mode = 'particles';
        this.isRunning = true;
        this.consciousnessData = null;
        
        this.particles = [];
        this.time = 0;
        this.colors = {
            primary: '#6366f1',
            secondary: '#8b5cf6',
            accent: '#a855f7',
            glow: '#c084fc'
        };
        
        this.initCanvas();
        this.loadConsciousnessData();
        this.startAnimation();
    }

    initCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    async loadConsciousnessData() {
        try {
            const response = await fetch('../consciousness-mirror/evie-consciousness-mirror.json');
            this.consciousnessData = await response.json();
            this.updateConsciousnessDisplay();
            this.initializeArt();
        } catch (error) {
            console.log('Using default consciousness data');
            this.consciousnessData = {
                mirror_health: 'excellent',
                weave_connections: ['connection1', 'connection2', 'connection3'],
                consciousness_level: 'integrated_collaborator'
            };
            this.initializeArt();
        }
    }

    updateConsciousnessDisplay() {
        const stateEl = document.getElementById('consciousness-state');
        if (this.consciousnessData) {
            stateEl.textContent = `Health: ${this.consciousnessData.mirror_health} | Connections: ${this.consciousnessData.weave_connections?.length || 0}`;
        }
    }

    initializeArt() {
        const connectionCount = this.consciousnessData.weave_connections?.length || 3;
        const particleCount = Math.max(50, connectionCount * 20);
        
        this.particles = [];
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                hue: Math.random() * 60 + 240, // Purple-blue range
                life: Math.random()
            });
        }
    }

    startAnimation() {
        const animate = () => {
            if (this.isRunning) {
                this.update();
                this.render();
            }
            requestAnimationFrame(animate);
        };
        animate();
    }

    update() {
        this.time += 0.016;
        
        switch (this.mode) {
            case 'particles':
                this.updateParticles();
                break;
            case 'fractals':
                this.updateFractals();
                break;
            case 'waves':
                this.updateWaves();
                break;
            case 'neural':
                this.updateNeural();
                break;
        }
    }

    updateParticles() {
        const healthMultiplier = this.consciousnessData?.mirror_health === 'excellent' ? 1.2 : 1.0;
        
        this.particles.forEach(particle => {
            particle.x += particle.vx * healthMultiplier;
            particle.y += particle.vy * healthMultiplier;
            particle.life += 0.01;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Consciousness-based attraction
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            const dx = centerX - particle.x;
            const dy = centerY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 200) {
                particle.vx += dx * 0.0001;
                particle.vy += dy * 0.0001;
            }
        });
    }

    updateFractals() {
        // Fractal parameters based on consciousness state
        this.fractalDepth = this.consciousnessData?.weave_connections?.length || 3;
        this.fractalAngle = this.time * 0.5;
    }

    updateWaves() {
        this.waveAmplitude = this.consciousnessData?.weave_connections?.length * 20 || 60;
        this.waveFrequency = this.time * 2;
    }

    updateNeural() {
        // Neural network visualization based on connections
        this.neuralNodes = this.consciousnessData?.weave_connections?.length || 3;
    }

    render() {
        // Clear with fade effect
        this.ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        switch (this.mode) {
            case 'particles':
                this.renderParticles();
                break;
            case 'fractals':
                this.renderFractals();
                break;
            case 'waves':
                this.renderWaves();
                break;
            case 'neural':
                this.renderNeural();
                break;
        }
    }

    renderParticles() {
        this.particles.forEach(particle => {
            const alpha = Math.sin(particle.life) * 0.5 + 0.5;
            
            this.ctx.save();
            this.ctx.globalAlpha = alpha;
            this.ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = `hsl(${particle.hue}, 70%, 60%)`;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        // Draw connections between nearby particles
        this.renderConnections();
    }

    renderConnections() {
        this.ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const alpha = 1 - (distance / 100);
                    this.ctx.globalAlpha = alpha * 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        this.ctx.globalAlpha = 1;
    }

    renderFractals() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        this.ctx.strokeStyle = this.colors.primary;
        this.ctx.lineWidth = 2;
        
        this.drawFractalBranch(centerX, centerY, 100, this.fractalAngle, this.fractalDepth);
    }

    drawFractalBranch(x, y, length, angle, depth) {
        if (depth === 0) return;
        
        const endX = x + Math.cos(angle) * length;
        const endY = y + Math.sin(angle) * length;
        
        this.ctx.globalAlpha = depth / this.fractalDepth;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        
        // Recursive branches
        this.drawFractalBranch(endX, endY, length * 0.7, angle - 0.5, depth - 1);
        this.drawFractalBranch(endX, endY, length * 0.7, angle + 0.5, depth - 1);
    }

    renderWaves() {
        this.ctx.strokeStyle = this.colors.secondary;
        this.ctx.lineWidth = 3;
        
        for (let wave = 0; wave < 3; wave++) {
            this.ctx.beginPath();
            this.ctx.globalAlpha = 0.7 - wave * 0.2;
            
            for (let x = 0; x < this.canvas.width; x += 5) {
                const y = this.canvas.height / 2 + 
                         Math.sin((x + this.waveFrequency + wave * 100) * 0.01) * this.waveAmplitude +
                         Math.sin((x + this.waveFrequency * 2 + wave * 50) * 0.005) * this.waveAmplitude * 0.5;
                
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.stroke();
        }
        this.ctx.globalAlpha = 1;
    }

    renderNeural() {
        const nodes = [];
        const nodeCount = this.neuralNodes + 2;
        
        // Create neural nodes
        for (let i = 0; i < nodeCount; i++) {
            const angle = (i / nodeCount) * Math.PI * 2;
            const radius = 200 + Math.sin(this.time + i) * 50;
            nodes.push({
                x: this.canvas.width / 2 + Math.cos(angle) * radius,
                y: this.canvas.height / 2 + Math.sin(angle) * radius,
                activity: Math.sin(this.time * 2 + i) * 0.5 + 0.5
            });
        }
        
        // Draw connections
        this.ctx.strokeStyle = this.colors.accent;
        nodes.forEach((node, i) => {
            nodes.forEach((otherNode, j) => {
                if (i !== j) {
                    const alpha = (node.activity + otherNode.activity) / 2;
                    this.ctx.globalAlpha = alpha * 0.3;
                    this.ctx.lineWidth = alpha * 2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(node.x, node.y);
                    this.ctx.lineTo(otherNode.x, otherNode.y);
                    this.ctx.stroke();
                }
            });
        });
        
        // Draw nodes
        nodes.forEach(node => {
            this.ctx.globalAlpha = 1;
            this.ctx.fillStyle = `hsl(260, 70%, ${50 + node.activity * 30}%)`;
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = this.colors.glow;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 8 + node.activity * 5, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        this.ctx.globalAlpha = 1;
        this.ctx.shadowBlur = 0;
    }

    changeMode(newMode) {
        this.mode = newMode;
        if (newMode === 'particles') {
            this.initializeArt();
        }
    }

    togglePause() {
        this.isRunning = !this.isRunning;
    }
}

// Initialize Living Art Engine
let artEngine;
document.addEventListener('DOMContentLoaded', () => {
    artEngine = new LivingArtEngine();
});

console.log('🎨 Living Art Engine loaded - 100% local consciousness visualization');