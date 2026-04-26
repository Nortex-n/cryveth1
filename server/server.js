const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const env = require('./config/env');
const apiRoutes = require('./routes/api');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

app.use(cors({
  origin: env.isProd ? [env.CLIENT_URL, 'https://cryveth.vercel.app'] : true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api', rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  message: { error: 'Terlalu banyak request. Coba lagi dalam beberapa menit.' },
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.use('/api', apiRoutes);

if (env.isProd) {
  const clientBuild = path.join(__dirname, '../client/dist');
  app.use(express.static(clientBuild));
}

app.use(notFound);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`\n🚀 CryVeth Server v1.0.0`);
  console.log(`   Env: ${env.NODE_ENV}`);
  console.log(`   Port: http://localhost:${env.PORT}`);
  console.log(`   API: http://localhost:${env.PORT}/api/health\n`);
});

module.exports = app;
