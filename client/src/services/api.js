import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
});

// ── AI Chat ───────────────────────────────────────────────────
export const sendChatMessage = (messages) =>
  api.post('/chat', { messages }).then(r => r.data);

// ── TikTok ────────────────────────────────────────────────────
export const fetchTikTok = (url) =>
  api.post('/tiktok', { url }).then(r => r.data);

// ── Catbox ────────────────────────────────────────────────────
export const uploadToCatbox = (file, onProgress) => {
  const form = new FormData();
  form.append('file', file);
  return api.post('/catbox', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: e => {
      if (onProgress) onProgress(Math.round((e.loaded * 100) / e.total));
    },
    timeout: 120_000,
  }).then(r => r.data);
};

// ── Health ────────────────────────────────────────────────────
export const getHealth = () => api.get('/health').then(r => r.data);

export default api;
