import GeminiClient from './scripts/gemini-client.mjs';

console.log('Probando Gemini CLI...');

try {
    const client = new GeminiClient();
    const response = await client.generate('Responde con OK si estas funcionando');
    console.log('Respuesta:', response);
    console.log('\nOK Test exitoso');
} catch (error) {
    console.error('ERROR:', error.message);
    process.exit(1);
}




