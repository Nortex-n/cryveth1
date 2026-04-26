const fetch = require('node-fetch');
const env   = require('../config/env');

const SYSTEM_PROMPT = `Kamu adalah CryVeth AI Assistant, asisten edukasi coding dari platform CryVeth yang dibuat oleh NortexZ. Tugasmu: bantu developer dari pemula sampai senior dengan coding, debugging, best practices, konsep pemrograman, dan tips belajar. Gunakan bahasa Indonesia yang santai, friendly, jelas, dan padat. Jika ada kode, gunakan backtick. Credits: t.me/NortexZ | wa.me/6285705490463`;

const TIMEOUT_MS = 25_000;

async function fetchWithTimeout(url, options) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function tryOpenRouter(messages) {
  if (!env.OPENROUTER_API_KEY) return null;
  try {
    const res = await fetchWithTimeout('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://cryveth.vercel.app',
        'X-Title': 'CryVeth AI',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content?.trim();
    if (text) { console.log('[AI] OpenRouter ✓'); return { reply: text, provider: 'OpenRouter' }; }
    console.warn('[AI] OpenRouter: empty response');
  } catch (e) {
    console.warn('[AI] OpenRouter fail:', e.message);
  }
  return null;
}

async function tryGroq(messages) {
  if (!env.GROQ_API_KEY) return null;
  try {
    const res = await fetchWithTimeout('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content?.trim();
    if (text) { console.log('[AI] Groq ✓'); return { reply: text, provider: 'Groq' }; }
    console.warn('[AI] Groq: empty response');
  } catch (e) {
    console.warn('[AI] Groq fail:', e.message);
  }
  return null;
}

async function tryGemini(messages) {
  if (!env.GEMINI_API_KEY) return null;
  try {
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: String(m.content || '') }],
    }));
    const res = await fetchWithTimeout(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: { maxOutputTokens: 1000, temperature: 0.7 },
        }),
      }
    );
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (text) { console.log('[AI] Gemini ✓'); return { reply: text, provider: 'Gemini' }; }
    console.warn('[AI] Gemini: empty response');
  } catch (e) {
    console.warn('[AI] Gemini fail:', e.message);
  }
  return null;
}

/**
 * Send messages to AI with fallback chain: OpenRouter → Groq → Gemini
 * @param {Array<{role: string, content: string}>} messages
 * @returns {Promise<{reply: string, provider: string}>}
 */
async function sendToAI(messages) {
  const result = await tryOpenRouter(messages)
    || await tryGroq(messages)
    || await tryGemini(messages);

  if (!result) {
    const err = new Error('Semua provider AI sedang sibuk. Coba lagi dalam beberapa saat.');
    err.status = 503;
    throw err;
  }
  return result;
}

module.exports = { sendToAI };
