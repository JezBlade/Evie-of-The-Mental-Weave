import { config } from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '.env') });

console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY);
console.log('GEMINI_MODEL:', process.env.GEMINI_MODEL);




