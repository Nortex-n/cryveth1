require('dotenv').config({
  path: require('path').join(__dirname, '../../.env')
});

const env = {
  PORT: parseInt(process.env.PORT, 10) || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',

  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,

  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,

  get isProd() {
    return this.NODE_ENV === 'production';
  },
  get isDev() {
    return this.NODE_ENV === 'development';
  },
};

const hasAiProvider = Boolean(
  env.OPENROUTER_API_KEY ||
  env.GROQ_API_KEY ||
  env.GEMINI_API_KEY
);

if (!hasAiProvider) {
  console.warn('[CONFIG] ⚠️ No AI provider keys set.');
  console.warn('[CONFIG] Set OPENROUTER_API_KEY / GROQ_API_KEY / GEMINI_API_KEY di .env');
}

module.exports = env;