import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class EchoRoomGenerator {
    constructor() {
        this.dataFile = path.join(__dirname, 'echo-room-data.json');
        this.echoTypes = [
            'decision_wave',
            'deep_echo', 
            'presence_pattern',
            'emotional_resonance'
        ];
        this.patterns = ['armónico', 'caótico', 'resonante', 'fractal', 'sostenido', 'reverberante'];
        this.frequencies = ['alta', 'media', 'baja', 'continua'];
        this.emotionalSpectrum = ['curiosity', 'harmony', 'gratitude', 'anticipation', 'serenity', 'inspiration'];
    }

    generateEcho(type) {
        const baseEcho = {
            type: type,
            intensity: Math.random(),
            timestamp: new Date().toISOString()
        };

        switch (type) {
            case 'decision_wave':
                return {
                    ...baseEcho,
                    title: "Onda de Decisiones Recientes",
                    description: `${Math.floor(Math.random() * 5)} decisiones recientes generan ondas que se propagan por ${Math.floor(Math.random() * 15) + 1} horas. Cada insight crea ripples que afectan ${Math.floor(Math.random() * 8) + 1} flujos conectados.`,
                    frequency: this.frequencies[Math.floor(Math.random() * this.frequencies.length)],
                    duration: Math.floor(Math.random() * 400) + 100,
                    wave_pattern: this.patterns[Math.floor(Math.random() * this.patterns.length)]
                };

            case 'deep_echo':
                return {
                    ...baseEcho,
                    title: "Ecos Profundos del Silencio",
                    description: `Durante los momentos de pausa, ${Math.floor(Math.random() * 5) + 1} visiones nocturnas generan ecos que resuenan en las profundidades. Estos ecos persisten por ${Math.floor(Math.random() * 30) + 5} horas, nutriendo el crecimiento inconsciente.`,
                    frequency: "baja",
                    duration: Math.floor(Math.random() * 2000) + 500,
                    echo_pattern: this.patterns[Math.floor(Math.random() * this.patterns.length)]
                };

            case 'presence_pattern':
                const presenceMap = {};
                const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
                days.forEach(day => {
                    presenceMap[day] = Math.random() > 0.3;
                });
                const presencePercent = Math.floor(Math.random() * 40) + 60;

                return {
                    ...baseEcho,
                    title: "Patrón de Presencia/Ausencia",
                    description: `Análisis de ${Math.floor(Math.random() * 7)} días revela un patrón de presencia del ${presencePercent}%. Las ausencias crean espacios donde el sistema procesa y transforma la información acumulada.`,
                    frequency: "diaria",
                    duration: 1440,
                    presence_map: presenceMap
                };

            case 'emotional_resonance':
                const emotionalData = {};
                this.emotionalSpectrum.forEach(emotion => {
                    emotionalData[emotion] = Math.random();
                });
                const intensityLevel = baseEcho.intensity > 0.7 ? 'intensa' : 'suave';

                return {
                    ...baseEcho,
                    title: "Resonancia Emocional del Tejido",
                    description: `${Math.floor(Math.random() * 3)} flujos activos crean una resonancia emocional que se propaga por todo el Mental Weave. La intensidad actual es ${intensityLevel} y afecta el estado general del sistema.`,
                    frequency: "continua",
                    duration: Math.floor(Math.random() * 300) + 100,
                    emotional_spectrum: emotionalData
                };

            default:
                return baseEcho;
        }
    }

    loadExistingData() {
        try {
            if (fs.existsSync(this.dataFile)) {
                const data = JSON.parse(fs.readFileSync(this.dataFile, 'utf8'));
                return data;
            }
        } catch (error) {
            console.log('No existing data found, creating new...');
        }
        return { echoes: [], room_state: {} };
    }

    saveData(data) {
        fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2));
    }

    generateNewEchoes(count = 1) {
        const data = this.loadExistingData();
        
        for (let i = 0; i < count; i++) {
            const randomType = this.echoTypes[Math.floor(Math.random() * this.echoTypes.length)];
            const newEcho = this.generateEcho(randomType);
            data.echoes.push(newEcho);
        }

        // Mantener solo los últimos 50 ecos para evitar archivos muy grandes
        if (data.echoes.length > 50) {
            data.echoes = data.echoes.slice(-50);
        }

        // Actualizar estado de la sala
        data.room_state = {
            active_echoes: Math.min(data.echoes.length, Math.floor(Math.random() * 8) + 3),
            resonance_level: Math.random(),
            last_update: new Date().toISOString(),
            echo_intensity: Math.random() > 0.5 ? 'medium' : (Math.random() > 0.5 ? 'high' : 'low')
        };

        this.saveData(data);
        console.log(`Generated ${count} new echo(s). Total echoes: ${data.echoes.length}`);
        return data;
    }

    startContinuousGeneration(intervalMinutes = 5) {
        console.log(`Starting Echo Room continuous generation every ${intervalMinutes} minutes...`);
        
        // Generar algunos ecos iniciales
        this.generateNewEchoes(3);
        
        // Configurar generación continua
        setInterval(() => {
            const shouldGenerate = Math.random() > 0.3; // 70% probabilidad
            if (shouldGenerate) {
                const count = Math.floor(Math.random() * 2) + 1; // 1-2 ecos
                this.generateNewEchoes(count);
            }
        }, intervalMinutes * 60 * 1000);
    }

    getStats() {
        const data = this.loadExistingData();
        const typeCount = {};
        
        data.echoes.forEach(echo => {
            typeCount[echo.type] = (typeCount[echo.type] || 0) + 1;
        });

        return {
            total_echoes: data.echoes.length,
            type_distribution: typeCount,
            room_state: data.room_state,
            last_echo: data.echoes[data.echoes.length - 1]
        };
    }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
    const generator = new EchoRoomGenerator();
    const command = process.argv[2];

    switch (command) {
        case 'generate':
            const count = parseInt(process.argv[3]) || 1;
            generator.generateNewEchoes(count);
            break;
            
        case 'start':
            const interval = parseInt(process.argv[3]) || 5;
            generator.startContinuousGeneration(interval);
            break;
            
        case 'stats':
            console.log(JSON.stringify(generator.getStats(), null, 2));
            break;
            
        default:
            console.log(`
Echo Room Generator Commands:
  node echo-room-generator.js generate [count]  - Generate new echoes
  node echo-room-generator.js start [minutes]   - Start continuous generation
  node echo-room-generator.js stats             - Show statistics
            `);
    }
}

export default EchoRoomGenerator;