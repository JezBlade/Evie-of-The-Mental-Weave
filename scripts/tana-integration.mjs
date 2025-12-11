// 🧠 Integración Gemini + TANA para Evie
// Genera notas estructuradas para TANA usando Gemini

import GeminiClient from './gemini-client.mjs';
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

const client = new GeminiClient();
const outputPath = join(process.env.EVIE_ROOT || 'D:\\Evie-of-the-Mental-Weave', 'tana-notes');

if (!existsSync(outputPath)) {
    mkdirSync(outputPath, { recursive: true });
}

async function generateTanaNote(topic, context = '') {
    const prompt = `Genera una nota estructurada para TANA sobre: ${topic}

${context ? `Contexto adicional:\n${context}\n` : ''}

Formato requerido:
- Título claro y conciso
- Tags relevantes (#tag1 #tag2)
- Secciones organizadas con bullets
- Referencias cruzadas cuando sea apropiado
- Metadata (fecha, proyecto, agente)

Proyecto: Evie Mental Weave
Agente: Evie Frye (TANA)
Fecha: ${new Date().toISOString().split('T')[0]}

Responde SOLO con la nota en formato TANA, sin explicaciones adicionales.`;

    const response = await client.generate(prompt, { temperature: 0.8, maxTokens: 4096 });
    return response;
}

async function generateDailySummary(activities) {
    const prompt = `Genera un resumen diario para TANA basado en estas actividades:

${activities.map((a, i) => `${i + 1}. ${a}`).join('\n')}

Incluye:
- Resumen ejecutivo (2-3 líneas)
- Logros principales
- Tareas pendientes
- Insights y aprendizajes
- Tags: #daily-summary #evie #${new Date().toISOString().split('T')[0]}

Formato TANA con bullets y estructura clara.`;

    const response = await client.generate(prompt, { temperature: 0.7, maxTokens: 2048 });
    return response;
}

async function analyzeFileForTana(filePath, fileContent) {
    const prompt = `Analiza este archivo y genera una nota TANA:

Archivo: ${filePath}
Contenido:
${fileContent.substring(0, 4000)}

Genera nota TANA con:
- Resumen del archivo
- Propósito y funcionalidad
- Puntos clave
- Relaciones con otros componentes
- Sugerencias de mejora
- Tags apropiados

Proyecto: Evie Mental Weave`;

    const response = await client.generate(prompt, { temperature: 0.7, maxTokens: 3072 });
    return response;
}

function saveTanaNote(note, filename) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fullPath = join(outputPath, `${filename}-${timestamp}.md`);
    
    writeFileSync(fullPath, note, 'utf8');
    console.log(`✅ Nota guardada: ${fullPath}`);
    
    return fullPath;
}

const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
    case 'note':
        if (args.length === 0) {
            console.error('❌ Uso: node tana-integration.mjs note <tema> [contexto]');
            process.exit(1);
        }
        
        const topic = args[0];
        const context = args.slice(1).join(' ');
        
        console.log(`🧠 Generando nota TANA sobre: ${topic}...`);
        const note = await generateTanaNote(topic, context);
        console.log('\n💎 Nota generada:\n');
        console.log(note);
        
        const notePath = saveTanaNote(note, topic.replace(/\s+/g, '-').toLowerCase());
        console.log(`\n📁 Importa en TANA: ${notePath}`);
        break;
        
    case 'daily':
        if (args.length === 0) {
            console.error('❌ Uso: node tana-integration.mjs daily <actividad1> <actividad2> ...');
            process.exit(1);
        }
        
        console.log('🧠 Generando resumen diario...');
        const summary = await generateDailySummary(args);
        console.log('\n💎 Resumen diario:\n');
        console.log(summary);
        
        const summaryPath = saveTanaNote(summary, 'daily-summary');
        console.log(`\n📁 Importa en TANA: ${summaryPath}`);
        break;
        
    case 'analyze':
        if (args.length === 0) {
            console.error('❌ Uso: node tana-integration.mjs analyze <archivo>');
            process.exit(1);
        }
        
        const filePath = args[0];
        
        if (!existsSync(filePath)) {
            console.error(`❌ Archivo no encontrado: ${filePath}`);
            process.exit(1);
        }
        
        const fileContent = readFileSync(filePath, 'utf8');
        console.log(`🧠 Analizando archivo: ${filePath}...`);
        
        const analysis = await analyzeFileForTana(filePath, fileContent);
        console.log('\n💎 Análisis:\n');
        console.log(analysis);
        
        const analysisPath = saveTanaNote(analysis, `analysis-${filePath.split(/[/\\]/).pop()}`);
        console.log(`\n📁 Importa en TANA: ${analysisPath}`);
        break;
        
    default:
        console.log(`
🧠 Integración Gemini + TANA para Evie

Comandos disponibles:

  note <tema> [contexto]
    Genera una nota TANA sobre un tema específico

  daily <actividad1> <actividad2> ...
    Genera un resumen diario basado en actividades

  analyze <archivo>
    Analiza un archivo y genera nota TANA

Todas las notas se guardan en: ${outputPath}
        `);
        break;
}




