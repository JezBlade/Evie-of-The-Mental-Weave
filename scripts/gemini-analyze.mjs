import GeminiClient from './gemini-client.mjs';
import { readFileSync } from 'fs';

const client = new GeminiClient();
const file = process.argv[2];

if (!file) {
    console.error('Uso: node gemini-analyze.mjs <archivo>');
    process.exit(1);
}

const content = readFileSync(file, 'utf8');
const prompt = `Analiza este archivo del proyecto Evie (TANA):

Archivo: ${file}
Contenido:
${content}

Proporciona:
1. Resumen conciso
2. Puntos clave
3. Sugerencias de mejora
4. Integracion con TANA`;

try {
    const response = await client.generate(prompt);
    console.log('Analisis Gemini:\n');
    console.log(response);
} catch (error) {
    console.error('ERROR:', error.message);
    process.exit(1);
}




