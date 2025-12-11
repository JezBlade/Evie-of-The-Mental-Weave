import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env');
config({ path: envPath });

class GeminiClient {
    constructor() {
        this.apiKey = 'AIzaSyB5JuYM95ZvNwgjDiNhZUJQzIDUgGiaqn8';
        this.model = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';
        this.maxConcurrent = parseInt(process.env.GEMINI_MAX_CONCURRENT || '2');
        this.rateLimit = parseInt(process.env.GEMINI_RATE_LIMIT || '60');
        this.activeTasks = 0;
        this.requestQueue = [];
        this.lastRequestTime = 0;
        this.circuitOpen = false;
        this.circuitOpenUntil = 0;
        
        if (!this.apiKey) throw new Error('GEMINI_API_KEY no configurada');
        
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        this.memoryPath = join(process.env.EVIE_ROOT || 'D:\\Evie-of-the-Mental-Weave', 'memory', 'gemini');
        
        if (!existsSync(this.memoryPath)) mkdirSync(this.memoryPath, { recursive: true });
    }
    
    async waitForRateLimit() {
        const now = Date.now();
        const minInterval = (60 * 1000) / this.rateLimit;
        const timeSinceLastRequest = now - this.lastRequestTime;
        
        if (timeSinceLastRequest < minInterval) {
            await new Promise(resolve => setTimeout(resolve, minInterval - timeSinceLastRequest));
        }
        
        this.lastRequestTime = Date.now();
    }
    
    checkCircuit() {
        if (this.circuitOpen && Date.now() < this.circuitOpenUntil) {
            throw new Error('Circuit breaker abierto. Reintenta en unos minutos.');
        }
        this.circuitOpen = false;
    }
    
    openCircuit(durationMs = 300000) {
        this.circuitOpen = true;
        this.circuitOpenUntil = Date.now() + durationMs;
        this.logEvent('CIRCUIT_OPEN', { duration: durationMs });
    }
    
    async generate(prompt, options = {}) {
        this.checkCircuit();
        
        if (this.activeTasks >= this.maxConcurrent) {
            return new Promise((resolve, reject) => {
                this.requestQueue.push({ prompt, options, resolve, reject });
            });
        }
        
        this.activeTasks++;
        
        try {
            await this.waitForRateLimit();
            
            const model = this.genAI.getGenerativeModel({ model: this.model });
            const result = await model.generateContent({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: options.temperature || parseFloat(process.env.GEMINI_TEMPERATURE || '0.7'),
                    maxOutputTokens: options.maxTokens || parseInt(process.env.GEMINI_MAX_TOKENS || '8192'),
                }
            });
            
            const response = result.response.text();
            this.logInteraction(prompt, response);
            
            return response;
            
        } catch (error) {
            if (error.message.includes('429') || error.message.includes('quota')) {
                this.openCircuit();
            }
            
            this.logEvent('ERROR', { error: error.message, prompt: prompt.substring(0, 100) });
            throw error;
            
        } finally {
            this.activeTasks--;
            
            if (this.requestQueue.length > 0) {
                const next = this.requestQueue.shift();
                this.generate(next.prompt, next.options)
                    .then(next.resolve)
                    .catch(next.reject);
            }
        }
    }
    
    logInteraction(prompt, response) {
        const logFile = join(this.memoryPath, `gemini-${new Date().toISOString().split('T')[0]}.jsonl`);
        const entry = {
            timestamp: new Date().toISOString(),
            prompt: prompt.substring(0, 200),
            response: response.substring(0, 500),
            model: this.model
        };
        
        writeFileSync(logFile, JSON.stringify(entry) + '\n', { flag: 'a' });
    }
    
    logEvent(type, data) {
        const logFile = join(this.memoryPath, 'gemini-events.jsonl');
        const entry = {
            timestamp: new Date().toISOString(),
            type,
            ...data
        };
        
        writeFileSync(logFile, JSON.stringify(entry) + '\n', { flag: 'a' });
    }
}

export default GeminiClient;




