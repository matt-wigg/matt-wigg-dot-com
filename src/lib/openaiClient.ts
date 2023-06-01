import { Configuration, OpenAIApi } from 'openai';

if (!process.env.OPEN_AI_KEY || !process.env.OPEN_AI_ORG) {
  throw new Error('OpenAI configuration environment variables are not set');
}

const configuration = new Configuration({
  organization: process.env.OPEN_AI_ORG,
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;
