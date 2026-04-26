const express  = require('express');
const multer   = require('multer');
const { chat }           = require('../controllers/chatController');
const { downloadTikTok } = require('../controllers/tiktokController');
const { uploadCatbox }   = require('../controllers/catboxController');

const router = express.Router();

// Multer — memory storage for catbox uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB
});

// ── AI Chat ──────────────────────────────────────────────────
router.post('/chat', chat);

// ── TikTok Downloader ────────────────────────────────────────
router.post('/tiktok', downloadTikTok);

// ── Catbox File Upload ───────────────────────────────────────
router.post('/catbox', upload.single('file'), uploadCatbox);

// ── Health Check ─────────────────────────────────────────────
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '4.0.0',
    timestamp: new Date().toISOString(),
    providers: {
      openrouter: !!process.env.OPENROUTER_API_KEY,
      groq:       !!process.env.GROQ_API_KEY,
      gemini:     !!process.env.GEMINI_API_KEY,
    },
  });
});

module.exports = router;
