import GeminiClient from './gemini-client.mjs';
import readline from 'readline';

const client = new GeminiClient();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Chat Gemini para Evie (TANA)');
console.log('Escribe "salir" para terminar\n');

const chat = async () => {
    rl.question('Tu: ', async (input) => {
        if (input.toLowerCase() === 'salir') {
            console.log('Hasta luego');
            rl.close();
            return;
        }
        
        try {
            const response = await client.generate(input);
            console.log(`\nGemini: ${response}\n`);
        } catch (error) {
            console.error(`ERROR: ${error.message}\n`);
        }
        
        chat();
    });
};

chat();




