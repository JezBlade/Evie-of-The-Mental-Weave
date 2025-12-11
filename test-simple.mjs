import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyB5JuYM95ZvNwgjDiNhZUJQzIDUgGiaqn8');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

try {
    const result = await model.generateContent('Di OK si funciona');
    console.log(result.response.text());
} catch (error) {
    console.error('ERROR:', error.message);
}




