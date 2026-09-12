import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const testGroq = async () => {
  const apiKey = process.env.GROQ_API_KEY;
  const modelsToTry = [
    process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
    'llama-3.3-70b-versatile',
    'llama-3.1-70b-versatile',
    'llama3-70b-8192',
    'mixtral-8x7b-32768',
  ];

  console.log('Testing Groq API connection with key:', apiKey ? apiKey.slice(0, 10) + '...' : 'NONE');

  for (const model of modelsToTry) {
    console.log(`\nAttempting model: ${model}...`);
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content: 'You are an AI assistant. Return a short JSON object {"status": "ok", "model": "' + model + '"}',
            },
            {
              role: 'user',
              content: 'Ping',
            },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.2,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(` SUCCESS with model: ${model}!`);
        console.log('Response:', data.choices[0]?.message?.content);
        return model;
      } else {
        const errorText = await response.text();
        console.warn(` Model ${model} failed with status ${response.status}:`, errorText);
      }
    } catch (err) {
      console.error(` Error connecting with ${model}:`, err.message);
    }
  }
};

testGroq();
