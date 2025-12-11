import GeminiClient from './scripts/gemini-client.mjs';

const client = new GeminiClient();
console.log('API Key cargada:', client.apiKey.substring(0, 20) + '...');
console.log('Modelo:', client.model);

try {
    const response = await client.generate('Di OK');
    console.log('Respuesta:', response);
} catch (error) {
    console.error('ERROR:', error.message);
}




