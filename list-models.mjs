import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyB5JuYM95ZvNwgjDiNhZUJQzIDUgGiaqn8');

try {
    const models = await genAI.listModels();
    console.log('Modelos disponibles:');
    for await (const model of models) {
        console.log(`- ${model.name}`);
    }
} catch (error) {
    console.error('ERROR:', error.message);
}




