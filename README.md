# ⟨ CryVeth /⟩ v1.0

Platform Belajar Programming Indonesia — rebuilt as a proper fullstack application.

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/youruser/cryveth.git
cd cryveth

# Install all dependencies
npm run install:all
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173

OPENROUTER_API_KEY=your_key_here   # https://openrouter.ai
GROQ_API_KEY=your_key_here         # https://console.groq.com
GEMINI_API_KEY=your_key_here       # https://aistudio.google.com
```

> ⚠️ At least one AI key is needed for AI Chat. The others are optional fallbacks.

### 3. Run Development

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend:  http://localhost:3001
- API docs: http://localhost:3001/api/health

---

## 📁 Project Structure

```
cryveth/
├── .env.example          ← Copy to .env, fill in keys
├── .gitignore
├── package.json          ← Root workspace
│
├── server/               ← Express backend
│   ├── config/env.js     ← Centralized env config
│   ├── services/
│   │   └── aiService.js  ← OpenRouter→Groq→Gemini fallback
│   ├── controllers/
│   │   ├── chatController.js
│   │   ├── tiktokController.js
│   │   └── catboxController.js
│   ├── routes/api.js
│   ├── middleware/errorHandler.js
│   └── server.js         ← Express app entry
│
└── client/               ← React frontend (Vite)
    ├── index.html
    ├── vite.config.js    ← Proxy /api → :3001
    └── src/
        ├── main.jsx
        ├── App.jsx       ← Router
        ├── index.css     ← Design system
        ├── data/
        │   ├── languages.js   ← 20+ languages DB
        │   ├── errors.js      ← 300+ errors DB
        │   └── tutorials.js   ← 8 tutorials
        ├── services/api.js    ← Axios API client
        ├── hooks/useToast.jsx ← Toast notifications
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Modal.jsx
        │   └── CodeBlock.jsx
        └── pages/
            ├── Home.jsx
            ├── Learn.jsx
            ├── Languages.jsx
            ├── Checker.jsx
            ├── Errors.jsx
            ├── Tutorials.jsx
            ├── AIChat.jsx
            ├── TikTok.jsx
            ├── Catbox.jsx
            └── About.jsx
```

---

## 🌐 API Endpoints

| Method | Endpoint      | Description                 |
|--------|---------------|-----------------------------|
| GET    | /api/health   | Health check + provider status |
| POST   | /api/chat     | AI chat (OpenRouter/Groq/Gemini) |
| POST   | /api/tiktok   | TikTok video info + download links |
| POST   | /api/catbox   | Upload file to catbox.moe   |

### POST /api/chat
```json
{ "messages": [{ "role": "user", "content": "Apa itu async/await?" }] }
```

### POST /api/tiktok
```json
{ "url": "https://www.tiktok.com/@user/video/..." }
```

### POST /api/catbox
```
multipart/form-data with field "file"
```

---

## 🚢 Deploy to Vercel

1. Push to GitHub
2. Import on vercel.com
3. Set **Root Directory** to blank (monorepo)
4. Add Environment Variables in Vercel dashboard
5. Set Build Command: `cd client && npm run build`
6. Set Output Directory: `client/dist`

For serverless (no Express), rename `server/` routes to `api/` and use Vercel's serverless format.

---

## 🔒 Security Improvements (vs original)

| Issue | Original | Fixed |
|-------|----------|-------|
| API keys | Hardcoded in config.js | `.env` + `.gitignore` |
| Rate limiting | None | 100 req/15min via express-rate-limit |
| CORS | Wildcard `*` | Origin-specific in production |
| Headers | None | Helmet.js security headers |
| Input validation | Minimal | Sanitized + length-limited |
| Error handling | Per-file inconsistent | Central errorHandler middleware |

---

## 🧑‍💻 Built by

[@NortexZ](https://t.me/NortexZ) · [WhatsApp](https://wa.me/6285705490463)

© 2025–2026 NortexZ · CryVeth v4.0 · Gratis Selamanya
