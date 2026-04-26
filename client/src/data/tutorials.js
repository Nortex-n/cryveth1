export const TUTORIALS_DB = [

  // ══════════════════════════════════════════════════════════
  //  BEGINNER
  // ══════════════════════════════════════════════════════════

  {
    id: 'nodejs-setup',
    ic: 'NODE',
    badge: 'Beginner',
    title: 'Setup Node.js + NPM dari Nol',
    time: '10 menit',
    desc: 'Install Node.js, kelola versi dengan NVM, dan pahami NPM dari awal.',
    steps: [
      {
        n: 1,
        t: 'Install NVM (Node Version Manager) — cara terbaik install Node.js:',
        code: `# Linux / macOS:\ncurl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash\n\n# Restart terminal, lalu:\nsource ~/.bashrc   # atau ~/.zshrc\n\n# Windows: download nvm-windows dari\n# https://github.com/coreybutler/nvm-windows/releases`,
      },
      {
        n: 2,
        t: 'Install dan gunakan Node.js versi LTS:',
        code: `nvm install --lts          # Install versi LTS terbaru\nnvm use --lts              # Aktifkan LTS\nnvm alias default 20       # Set default\n\nnode -v    # Cek versi Node\nnpm -v     # Cek versi NPM`,
      },
      {
        n: 3,
        t: 'Inisialisasi project baru:',
        code: `mkdir my-project && cd my-project\nnpm init -y                # Buat package.json otomatis\n\n# package.json akan berisi:\n{\n  "name": "my-project",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "node index.js",\n    "dev": "nodemon index.js"\n  }\n}`,
      },
      {
        n: 4,
        t: 'Perintah NPM yang wajib dikuasai:',
        code: `npm install express         # Install package\nnpm install -D nodemon      # Install sebagai devDependency\nnpm install                 # Install semua dari package.json\nnpm uninstall lodash        # Hapus package\nnpm update                  # Update semua package\nnpm list                    # Lihat semua installed package\nnpm run dev                 # Jalankan script "dev"\nnpm outdated                # Cek package yang outdated`,
        tip: 'Bedakan dependencies (runtime) dan devDependencies (hanya development). Gunakan -D untuk devDeps.',
      },
      {
        n: 5,
        t: 'Setup nodemon untuk auto-restart:',
        code: `npm install -D nodemon\n\n# package.json scripts:\n"scripts": {\n  "start": "node index.js",\n  "dev": "nodemon index.js",\n  "dev:debug": "nodemon --inspect index.js"\n}\n\n# nodemon.json (opsional, konfigurasi):\n{\n  "watch": ["src"],\n  "ext": "js,json",\n  "ignore": ["node_modules"],\n  "delay": "500"\n}`,
        tip: 'Jalankan dengan npm run dev. Nodemon otomatis restart setiap kali file berubah.',
      },
    ],
  },

  {
    id: 'github-token',
    ic: 'KEY',
    badge: 'Beginner',
    title: 'Cara Ambil GitHub Personal Access Token',
    time: '5 menit',
    desc: 'Buat token untuk API, automation, push kode via terminal, dan GitHub Actions.',
    steps: [
      {
        n: 1,
        t: 'Login ke github.com → klik foto profil → Settings → scroll bawah → Developer settings.',
      },
      {
        n: 2,
        t: 'Pilih Personal access tokens → Tokens (classic) → Generate new token (classic).',
        tip: 'Untuk proyek baru gunakan Fine-grained tokens — lebih aman karena bisa dibatasi per-repo.',
      },
      {
        n: 3,
        t: 'Isi Note (nama token), pilih Expiration, centang scope yang dibutuhkan:',
        code: `// Scope paling sering dipakai:\n✅ repo          — Akses penuh private & public repo\n✅ workflow       — GitHub Actions\n✅ read:user      — Baca profil\n✅ write:packages — Publish packages ke GitHub Registry\n✅ delete:repo    — Hapus repo (hati-hati!)\n\n// Untuk read-only (CI/CD aman):\n✅ repo:status\n✅ public_repo`,
      },
      {
        n: 4,
        t: 'Klik Generate token → salin token yang muncul.',
        warn: 'Token hanya muncul SEKALI! Langsung copy dan simpan di .env atau password manager. Jika hilang, harus generate ulang.',
      },
      {
        n: 5,
        t: 'Gunakan token di terminal dan file konfigurasi:',
        code: `# Satu kali pakai — clone repo private:\ngit clone https://TOKEN@github.com/user/repo.git\n\n# Simpan permanent di credential store:\ngit config --global credential.helper store\n# Lalu push sekali → masukkan username + TOKEN sebagai password\n\n# Di .env:\nGITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx\n\n# Di GitHub Actions secrets:\n# Settings → Secrets and variables → Actions → New secret`,
        tip: 'Jangan pernah commit token ke kode! Selalu di .env + .gitignore. Aktifkan 2FA GitHub untuk keamanan ekstra.',
      },
    ],
  },

  {
    id: 'env-setup',
    ic: 'ENV',
    badge: 'Beginner',
    title: 'Setup .env — Simpan API Key dengan Aman',
    time: '7 menit',
    desc: 'Cara menyimpan token dan API key agar tidak bocor ke GitHub maupun log.',
    steps: [
      {
        n: 1,
        t: 'Install dotenv:',
        code: 'npm install dotenv',
      },
      {
        n: 2,
        t: 'Buat file .env di root project:',
        code: `BOT_TOKEN=1234567890:ABCdef...\nGEMINI_API_KEY=AIzaSy...\nMONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname\nPORT=3000\nNODE_ENV=development\nJWT_SECRET=supersecretkey_minimal_32chars_panjang`,
      },
      {
        n: 3,
        t: 'Load di baris PALING ATAS file utama — sebelum require lainnya:',
        code: `require('dotenv').config(); // HARUS pertama!\n\n// Akses variabel:\nconst port = process.env.PORT || 3000;\nconst token = process.env.BOT_TOKEN;\n\n// Validasi wajib ada:\nconst required = ['BOT_TOKEN', 'MONGO_URI', 'JWT_SECRET'];\nfor (const key of required) {\n  if (!process.env[key]) throw new Error(\`Missing env: \${key}\`);\n}`,
      },
      {
        n: 4,
        t: 'Tambahkan ke .gitignore — WAJIB sebelum commit pertama:',
        code: `.env\n.env.local\n.env.*.local\n.env.production\nnode_modules/`,
        warn: 'Sudah terlanjur commit .env ke GitHub? Segera: 1) Revoke semua token, 2) git rm --cached .env, 3) git commit. History GitHub masih menyimpan data lama!',
      },
      {
        n: 5,
        t: 'Buat .env.example sebagai dokumentasi template:',
        code: `# .env.example — commit file ini ke repo!\n# Salin ke .env dan isi nilainya\n\nBOT_TOKEN=\nGEMINI_API_KEY=\nMONGO_URI=mongodb+srv://USER:PASS@CLUSTER/DBNAME\nPORT=3000\nNODE_ENV=development\nJWT_SECRET=`,
        tip: 'Kolaborator tahu variabel apa yang dibutuhkan tanpa melihat nilai aslinya. Untuk production, gunakan secret manager (Vault, AWS Secrets Manager, Railway secrets).',
      },
    ],
  },

  {
    id: 'git-workflow',
    ic: 'GIT',
    badge: 'Beginner',
    title: 'Git Workflow untuk Developer Profesional',
    time: '15 menit',
    desc: 'Perintah Git wajib dikuasai, branch strategy, dan cara undo kesalahan.',
    steps: [
      {
        n: 1,
        t: 'Setup identitas — wajib sebelum commit pertama:',
        code: `git config --global user.name "Nama Kamu"\ngit config --global user.email "email@kamu.com"\ngit config --global init.defaultBranch main\ngit config --global core.editor "code --wait"  # VS Code sebagai editor\ngit config --global pull.rebase false           # Strategi pull: merge\n\n# Cek semua config:\ngit config --list`,
      },
      {
        n: 2,
        t: 'Daily workflow — siklus kerja harian:',
        code: `git pull origin main              # Sync dulu sebelum kerja!\ngit status                        # Cek perubahan\ngit diff                          # Lihat isi perubahan\ngit add file.js                   # Stage spesifik\ngit add src/                      # Stage folder\ngit add .                         # Stage semua perubahan\ngit commit -m "feat: tambah halaman login"\ngit push origin main`,
        tip: 'Konvensi commit message: feat/fix/docs/style/refactor/test/chore: deskripsi singkat. Ini standar Conventional Commits.',
      },
      {
        n: 3,
        t: 'Branch strategy — isolasi fitur dari main:',
        code: `git checkout -b feature/login      # Buat + pindah ke branch baru\ngit checkout -b fix/bug-123\n\ngit branch                         # Lihat semua branch lokal\ngit branch -a                      # Termasuk remote\ngit checkout main                  # Kembali ke main\ngit merge feature/login            # Merge branch ke main\ngit branch -d feature/login        # Hapus branch lokal\ngit push origin --delete feature/login  # Hapus branch remote`,
      },
      {
        n: 4,
        t: 'Undo kesalahan — jangan panik:',
        code: `# Sebelum staging:\ngit restore file.js                 # Undo perubahan file\ngit restore .                       # Undo semua\n\n# Setelah git add:\ngit restore --staged file.js        # Unstage file\n\n# Setelah commit (belum push):\ngit reset HEAD~1                    # Undo commit, keep changes\ngit reset --soft HEAD~1             # Undo commit, changes staged\n\n# Sudah push:\ngit revert <hash>                   # Buat commit baru yang balik perubahan\ngit push origin main`,
        warn: 'git reset --hard <hash> menghapus commit DAN perubahan secara permanen! Hanya gunakan jika belum push. git revert lebih aman untuk kode yang sudah di-push ke shared branch.',
      },
      {
        n: 5,
        t: 'Stash — simpan pekerjaan sementara:',
        code: `git stash                     # Simpan pekerjaan belum selesai\ngit stash save "WIP: login UI"  # Stash dengan nama\ngit stash list                # Lihat daftar stash\ngit stash pop                 # Ambil stash terakhir\ngit stash apply stash@{1}     # Ambil stash spesifik\ngit stash drop stash@{0}      # Hapus stash\n\n# .gitignore essentials:\nnode_modules/\n.env\ndist/\nbuild/\n.DS_Store\n.vscode/settings.json`,
        tip: 'Stash berguna saat harus pindah branch untuk hotfix tapi pekerjaan belum siap di-commit.',
      },
    ],
  },

  {
    id: 'ssh-keygen',
    ic: 'SSH',
    badge: 'Beginner',
    title: 'Setup SSH Key untuk GitHub & Server',
    time: '8 menit',
    desc: 'Buat SSH key pair, tambahkan ke GitHub, dan login server tanpa password.',
    steps: [
      {
        n: 1,
        t: 'Generate SSH key baru (gunakan Ed25519 — lebih aman dari RSA):',
        code: `ssh-keygen -t ed25519 -C "email@kamu.com"\n\n# Ikuti prompt:\n# Enter file: tekan Enter (default ~/.ssh/id_ed25519)\n# Passphrase: isi untuk keamanan ekstra (opsional tapi direkomendasikan)\n\n# Cek hasil:\nls ~/.ssh/\n# id_ed25519      <- private key (JANGAN dibagikan!)\n# id_ed25519.pub  <- public key (aman dibagikan)`,
      },
      {
        n: 2,
        t: 'Tambahkan ke ssh-agent agar tidak perlu ketik passphrase terus:',
        code: `# Start ssh-agent:\neval "$(ssh-agent -s)"\n\n# Tambah key:\nssh-add ~/.ssh/id_ed25519\n\n# macOS — simpan di Keychain:\nssh-add --apple-use-keychain ~/.ssh/id_ed25519`,
      },
      {
        n: 3,
        t: 'Copy public key lalu tambahkan ke GitHub:',
        code: `# Tampilkan public key:\ncat ~/.ssh/id_ed25519.pub\n\n# Copy otomatis:\n# macOS:\npbcopy < ~/.ssh/id_ed25519.pub\n# Linux:\nxclip -selection clipboard < ~/.ssh/id_ed25519.pub\n# Windows:\nGet-Content ~/.ssh/id_ed25519.pub | Set-Clipboard\n\n# Di GitHub:\n# Settings → SSH and GPG keys → New SSH key → Paste`,
      },
      {
        n: 4,
        t: 'Test koneksi dan gunakan SSH untuk clone:',
        code: `# Test koneksi ke GitHub:\nssh -T git@github.com\n# Hi username! You've successfully authenticated...\n\n# Clone via SSH (bukan HTTPS):\ngit clone git@github.com:username/repo.git\n\n# Ubah repo HTTPS yang sudah ada ke SSH:\ngit remote set-url origin git@github.com:username/repo.git`,
        tip: 'SSH lebih aman dari HTTPS+token karena tidak ada credential yang bisa dicuri dari .git/config.',
      },
      {
        n: 5,
        t: 'Login ke VPS/server tanpa password:',
        code: `# Copy public key ke server:\nssh-copy-id user@IP_SERVER\n\n# Atau manual:\ncat ~/.ssh/id_ed25519.pub | ssh user@IP_SERVER "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"\n\n# Login sekarang tanpa password:\nssh user@IP_SERVER\n\n# ~/.ssh/config — shortcut koneksi:\nHost myserver\n  HostName 123.456.789.0\n  User ubuntu\n  IdentityFile ~/.ssh/id_ed25519\n  Port 22\n\n# Sekarang cukup:\nssh myserver`,
        warn: 'Simpan private key (~/.ssh/id_ed25519) dengan aman! Backup di password manager. Jika hilang, harus generate ulang dan update semua server/service.',
      },
    ],
  },

  {
    id: 'telegram-bot',
    ic: 'BOT',
    badge: 'Beginner',
    title: 'Buat Bot Telegram dari Nol sampai Production',
    time: '20 menit',
    desc: 'Dari BotFather sampai bot running 24/7 di server dengan PM2 dan fitur lengkap.',
    steps: [
      {
        n: 1,
        t: 'Buat bot di BotFather dan simpan token:',
        code: `# Di Telegram:\n# 1. Cari @BotFather\n# 2. Kirim /newbot\n# 3. Ikuti instruksi nama + username\n# 4. SIMPAN TOKEN: 123456789:ABCdef...\n\n# Command BotFather berguna:\n/setdescription  — Deskripsi bot\n/setuserpic      — Foto profil bot\n/setcommands     — Set daftar command\n/mybots          — Lihat semua bot kamu`,
        tip: 'Nama bot bebas. Username HARUS diakhiri "bot" dan unik secara global.',
      },
      {
        n: 2,
        t: 'Setup project Node.js:',
        code: `mkdir telegram-bot && cd telegram-bot\nnpm init -y\nnpm install node-telegram-bot-api dotenv\nnpm install -D nodemon\n\n# Struktur folder:\n.\n├── index.js\n├── .env\n├── .env.example\n├── .gitignore\n└── package.json`,
      },
      {
        n: 3,
        t: 'Buat .env dan .gitignore:',
        code: `# .env:\nBOT_TOKEN=123456789:ABCdef...\nADMIN_ID=123456789\n\n# .gitignore:\n.env\nnode_modules/`,
      },
      {
        n: 4,
        t: 'Buat index.js dengan fitur lengkap:',
        code: `require('dotenv').config();\nconst Bot = require('node-telegram-bot-api');\n\nconst bot = new Bot(process.env.BOT_TOKEN, { polling: true });\nconst ADMIN = Number(process.env.ADMIN_ID);\n\n// /start\nbot.onText(/\\/start/, (msg) => {\n  const name = msg.from.first_name;\n  bot.sendMessage(msg.chat.id,\n    \`Halo *\${name}*! 👋\\n\\nGunakan /help untuk melihat perintah.\`,\n    { parse_mode: 'Markdown' }\n  );\n});\n\n// /help\nbot.onText(/\\/help/, (msg) => {\n  const text = [\n    '*📋 Daftar Command:*',\n    '/start - Mulai bot',\n    '/help  - Bantuan',\n    '/info  - Info kamu',\n    '/ping  - Cek bot aktif',\n  ].join('\\n');\n  bot.sendMessage(msg.chat.id, text, { parse_mode: 'Markdown' });\n});\n\n// /info\nbot.onText(/\\/info/, (msg) => {\n  const u = msg.from;\n  bot.sendMessage(msg.chat.id,\n    \`*Info Kamu:*\\nNama: \${u.first_name}\\nID: \${u.id}\\nUsername: @\${u.username || '-'}\`,\n    { parse_mode: 'Markdown' }\n  );\n});\n\n// /ping\nbot.onText(/\\/ping/, (msg) => {\n  const start = Date.now();\n  bot.sendMessage(msg.chat.id, '🏓 Pong!').then(() => {\n    const ms = Date.now() - start;\n    bot.sendMessage(msg.chat.id, \`⚡ Latency: \${ms}ms\`);\n  });\n});\n\n// Balas pesan biasa\nbot.on('message', (msg) => {\n  if (msg.text && !msg.text.startsWith('/')) {\n    bot.sendMessage(msg.chat.id, \`Kamu bilang: \${msg.text}\`);\n  }\n});\n\n// Error handling\nbot.on('polling_error', (err) => console.error('Polling error:', err.message));\nprocess.on('unhandledRejection', (err) => console.error('Unhandled:', err));\n\nconsole.log('✅ Bot aktif!');`,
      },
      {
        n: 5,
        t: 'Jalankan dan deploy ke server production:',
        code: `# Development:\nnpm run dev\n\n# Production dengan PM2:\nnpm install -g pm2\npm2 start index.js --name "telegram-bot"\npm2 logs telegram-bot        # Lihat log realtime\npm2 status                   # Status semua process\npm2 restart telegram-bot     # Restart\npm2 stop telegram-bot        # Stop\npm2 save                     # Simpan config\npm2 startup                  # Auto-start setelah reboot\n\n# Update bot tanpa downtime:\ngit pull && pm2 restart telegram-bot`,
        tip: 'Untuk bot dengan traffic tinggi, pertimbangkan Webhook mode (bukan polling) yang lebih efisien. Butuh domain + HTTPS untuk webhook.',
      },
    ],
  },

  {
    id: 'vercel-deploy',
    ic: '▲',
    badge: 'Beginner',
    title: 'Deploy Website ke Vercel Gratis',
    time: '10 menit',
    desc: 'Deploy HTML, React, Next.js, atau Node.js ke Vercel dengan domain gratis dan HTTPS otomatis.',
    steps: [
      {
        n: 1,
        t: 'Daftar di vercel.com — login dengan GitHub (gratis forever untuk personal projects).',
        tip: 'Vercel free tier: 100 GB bandwidth/bulan, unlimited deployments, custom domain, HTTPS otomatis.',
      },
      {
        n: 2,
        t: 'Push kode ke GitHub terlebih dahulu:',
        code: `git init && git add .\ngit commit -m "initial commit"\ngit remote add origin https://github.com/user/repo.git\ngit push -u origin main`,
      },
      {
        n: 3,
        t: 'Import project di Vercel Dashboard:',
        code: `# Di vercel.com:\n# 1. Klik "Add New" → "Project"\n# 2. Import repo dari GitHub\n# 3. Vercel auto-detect framework (Next.js, React, dll)\n# 4. Set Environment Variables jika ada\n# 5. Klik Deploy\n\n# Atau pakai Vercel CLI:\nnpm install -g vercel\nvercel          # Deploy dari terminal\nvercel --prod   # Deploy ke production`,
      },
      {
        n: 4,
        t: 'Konfigurasi build dan routing (vercel.json):',
        code: `// vercel.json di root project:\n{\n  "builds": [\n    { "src": "server.js", "use": "@vercel/node" }\n  ],\n  "routes": [\n    { "src": "/api/(.*)", "dest": "server.js" },\n    { "src": "/(.*)", "dest": "/index.html" }\n  ],\n  "env": {\n    "NODE_ENV": "production"\n  }\n}`,
        tip: 'Vercel otomatis re-deploy setiap push ke branch main! Preview deploy dibuat untuk setiap Pull Request.',
      },
      {
        n: 5,
        t: 'Custom domain dan environment variables:',
        code: `// Custom domain:\n// Settings → Domains → Add Domain\n// DNS Records:\n//   CNAME: www → cname.vercel-dns.com\n//   A Record: @ → 76.76.21.21\n\n// Environment Variables per environment:\n// Settings → Environment Variables\n// Pilih: Production / Preview / Development\n\n// Akses di kode:\nconst apiKey = process.env.API_KEY; // Runtime\nconst buildTime = process.env.NEXT_PUBLIC_URL; // Build time (Next.js)`,
        warn: 'Vercel serverless functions timeout 10 detik (free tier). Untuk proses panjang seperti AI, gunakan Edge Functions atau upgrade ke Pro.',
      },
    ],
  },

  {
    id: 'mongodb-atlas',
    ic: 'DB',
    badge: 'Beginner',
    title: 'Setup MongoDB Atlas — Database Cloud Gratis',
    time: '12 menit',
    desc: 'Buat cluster MongoDB di cloud, hubungkan ke Node.js, dan operasi dasar CRUD.',
    steps: [
      {
        n: 1,
        t: 'Daftar dan buat cluster gratis di mongodb.com/atlas:',
        code: `# Langkah di website Atlas:\n# 1. Daftar gratis di mongodb.com/atlas\n# 2. Create a cluster → M0 Sandbox (FREE)\n# 3. Pilih cloud provider (AWS/GCP/Azure) dan region terdekat\n# 4. Beri nama cluster (contoh: MyCluster)\n# 5. Klik Create Cluster (~3 menit)`,
      },
      {
        n: 2,
        t: 'Setup keamanan — Network Access dan Database User:',
        code: `# Network Access:\n# Security → Network Access → Add IP Address\n# "Allow access from anywhere" → 0.0.0.0/0 (untuk development)\n# (Production: whitelist IP spesifik)\n\n# Database User:\n# Security → Database Access → Add New Database User\n# Authentication: Password\n# Username: myuser\n# Password: generate yang kuat (simpan!)\n# Role: Atlas admin (dev) / Read/Write specific DB (prod)`,
        warn: 'Jangan gunakan 0.0.0.0/0 di production! Whitelist hanya IP server yang perlu akses.',
      },
      {
        n: 3,
        t: 'Dapatkan connection string dan simpan di .env:',
        code: `# Di Atlas: Cluster → Connect → Connect your application\n# Driver: Node.js, Version: 5.x or later\n# Copy connection string:\n# mongodb+srv://myuser:<password>@mycluster.abc123.mongodb.net/\n\n# .env:\nMONGO_URI=mongodb+srv://myuser:PASS@mycluster.abc123.mongodb.net/namaDB?retryWrites=true&w=majority`,
      },
      {
        n: 4,
        t: 'Connect Node.js ke MongoDB dengan Mongoose:',
        code: `npm install mongoose\n\n// db.js:\nconst mongoose = require('mongoose');\n\nconst connectDB = async () => {\n  try {\n    await mongoose.connect(process.env.MONGO_URI);\n    console.log('✅ MongoDB connected:', mongoose.connection.host);\n  } catch (err) {\n    console.error('❌ MongoDB error:', err.message);\n    process.exit(1);\n  }\n};\n\nmodule.exports = connectDB;\n\n// Di index.js:\nrequire('dotenv').config();\nconst connectDB = require('./db');\nconnectDB();`,
      },
      {
        n: 5,
        t: 'Buat Schema dan operasi CRUD dasar:',
        code: `// models/User.js:\nconst mongoose = require('mongoose');\n\nconst UserSchema = new mongoose.Schema({\n  name:  { type: String, required: true, trim: true },\n  email: { type: String, required: true, unique: true, lowercase: true },\n  role:  { type: String, enum: ['user','admin'], default: 'user' },\n  createdAt: { type: Date, default: Date.now }\n});\n\nmodule.exports = mongoose.model('User', UserSchema);\n\n// CRUD operations:\nconst User = require('./models/User');\n\n// CREATE\nconst user = await User.create({ name: 'Budi', email: 'budi@mail.com' });\n\n// READ\nconst users = await User.find({ role: 'user' }).sort('-createdAt').limit(10);\nconst user = await User.findById(id);\nconst user = await User.findOne({ email: 'budi@mail.com' });\n\n// UPDATE\nawait User.findByIdAndUpdate(id, { name: 'Budi Baru' }, { new: true });\n\n// DELETE\nawait User.findByIdAndDelete(id);`,
        tip: 'Gunakan .lean() setelah query untuk mendapatkan plain JS object (lebih cepat) jika tidak perlu Mongoose methods.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  //  INTERMEDIATE
  // ══════════════════════════════════════════════════════════

  {
    id: 'express-crud',
    ic: 'EXP',
    badge: 'Intermediate',
    title: 'Express.js + MongoDB — REST API CRUD Lengkap',
    time: '30 menit',
    desc: 'Bangun REST API production-ready dengan Express, MongoDB, validasi, dan error handling.',
    steps: [
      {
        n: 1,
        t: 'Setup project Express.js:',
        code: `mkdir express-api && cd express-api\nnpm init -y\nnpm install express mongoose dotenv cors helmet express-validator\nnpm install -D nodemon\n\n# Struktur folder:\n.\n├── src/\n│   ├── config/     db.js\n│   ├── models/     user.js\n│   ├── routes/     users.js\n│   ├── controllers/usersController.js\n│   ├── middleware/ auth.js, validate.js, error.js\n│   └── index.js\n├── .env\n└── package.json`,
      },
      {
        n: 2,
        t: 'Buat server Express (src/index.js):',
        code: `require('dotenv').config();\nconst express = require('express');\nconst cors = require('cors');\nconst helmet = require('helmet');\nconst connectDB = require('./config/db');\n\nconst app = express();\n\n// Middleware global\napp.use(helmet());\napp.use(cors());\napp.use(express.json({ limit: '10mb' }));\napp.use(express.urlencoded({ extended: true }));\n\n// Routes\napp.use('/api/users', require('./routes/users'));\n\n// Health check\napp.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));\n\n// 404 handler\napp.use((req, res) => res.status(404).json({ error: 'Route not found' }));\n\n// Error handler\napp.use(require('./middleware/error'));\n\nconst PORT = process.env.PORT || 3000;\nconnectDB().then(() =>\n  app.listen(PORT, () => console.log(\`🚀 Server berjalan di port \${PORT}\`))\n);`,
      },
      {
        n: 3,
        t: 'Controller dengan full CRUD (src/controllers/usersController.js):',
        code: `const User = require('../models/User');\n\nexports.getAll = async (req, res, next) => {\n  try {\n    const { page = 1, limit = 10, sort = '-createdAt' } = req.query;\n    const users = await User.find()\n      .sort(sort)\n      .skip((page - 1) * limit)\n      .limit(Number(limit))\n      .lean();\n    const total = await User.countDocuments();\n    res.json({ data: users, total, page: Number(page) });\n  } catch (err) { next(err); }\n};\n\nexports.getOne = async (req, res, next) => {\n  try {\n    const user = await User.findById(req.params.id).lean();\n    if (!user) return res.status(404).json({ error: 'User not found' });\n    res.json({ data: user });\n  } catch (err) { next(err); }\n};\n\nexports.create = async (req, res, next) => {\n  try {\n    const user = await User.create(req.body);\n    res.status(201).json({ data: user, message: 'User created' });\n  } catch (err) {\n    if (err.code === 11000) return res.status(409).json({ error: 'Email already exists' });\n    next(err);\n  }\n};\n\nexports.update = async (req, res, next) => {\n  try {\n    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });\n    if (!user) return res.status(404).json({ error: 'User not found' });\n    res.json({ data: user, message: 'User updated' });\n  } catch (err) { next(err); }\n};\n\nexports.remove = async (req, res, next) => {\n  try {\n    const user = await User.findByIdAndDelete(req.params.id);\n    if (!user) return res.status(404).json({ error: 'User not found' });\n    res.status(204).send();\n  } catch (err) { next(err); }\n};`,
      },
      {
        n: 4,
        t: 'Routes dengan validasi (src/routes/users.js):',
        code: `const router = require('express').Router();\nconst { body, param } = require('express-validator');\nconst validate = require('../middleware/validate');\nconst ctrl = require('../controllers/usersController');\n\nconst mongoId = param('id').isMongoId().withMessage('Invalid ID format');\nconst userRules = [\n  body('name').notEmpty().trim().withMessage('Name required'),\n  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),\n];\n\nrouter.get('/',           ctrl.getAll);\nrouter.get('/:id',        mongoId, validate, ctrl.getOne);\nrouter.post('/',          userRules, validate, ctrl.create);\nrouter.patch('/:id',      mongoId, validate, ctrl.update);\nrouter.delete('/:id',     mongoId, validate, ctrl.remove);\n\nmodule.exports = router;`,
      },
      {
        n: 5,
        t: 'Middleware error handler dan validasi (src/middleware/):',
        code: `// error.js — global error handler:\nmodule.exports = (err, req, res, next) => {\n  console.error(err.stack);\n  const status = err.status || 500;\n  res.status(status).json({\n    error: err.message || 'Internal Server Error',\n    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })\n  });\n};\n\n// validate.js — cek hasil express-validator:\nconst { validationResult } = require('express-validator');\nmodule.exports = (req, res, next) => {\n  const errors = validationResult(req);\n  if (!errors.isEmpty())\n    return res.status(422).json({ errors: errors.array() });\n  next();\n};`,
        tip: 'Test semua endpoint dengan Thunder Client (VS Code extension) atau Postman. Export collection untuk dokumentasi tim.',
      },
    ],
  },

  {
    id: 'jwt-auth',
    ic: 'JWT',
    badge: 'Intermediate',
    title: 'Autentikasi JWT — Login, Register, Protect Route',
    time: '25 menit',
    desc: 'Implementasi sistem autentikasi lengkap dengan JWT access token dan refresh token.',
    steps: [
      {
        n: 1,
        t: 'Install dependencies:',
        code: `npm install bcryptjs jsonwebtoken\n\n# bcryptjs — hash password\n# jsonwebtoken — buat & verifikasi JWT`,
      },
      {
        n: 2,
        t: 'User model dengan password hashing (models/User.js):',
        code: `const mongoose = require('mongoose');\nconst bcrypt = require('bcryptjs');\n\nconst UserSchema = new mongoose.Schema({\n  name:     { type: String, required: true },\n  email:    { type: String, required: true, unique: true, lowercase: true },\n  password: { type: String, required: true, minlength: 6, select: false },\n  role:     { type: String, enum: ['user','admin'], default: 'user' },\n  refreshToken: { type: String, select: false },\n});\n\n// Hash password sebelum save\nUserSchema.pre('save', async function(next) {\n  if (!this.isModified('password')) return next();\n  this.password = await bcrypt.hash(this.password, 12);\n  next();\n});\n\n// Method compare password\nUserSchema.methods.comparePassword = async function(plain) {\n  return bcrypt.compare(plain, this.password);\n};\n\nmodule.exports = mongoose.model('User', UserSchema);`,
      },
      {
        n: 3,
        t: 'Auth controller — register, login, logout, refresh:',
        code: `const jwt = require('jsonwebtoken');\nconst User = require('../models/User');\n\nconst signAccess  = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });\nconst signRefresh = (id) => jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });\n\nexports.register = async (req, res, next) => {\n  try {\n    const { name, email, password } = req.body;\n    if (await User.findOne({ email })) return res.status(409).json({ error: 'Email sudah terdaftar' });\n    const user = await User.create({ name, email, password });\n    res.status(201).json({ message: 'Registrasi berhasil', userId: user._id });\n  } catch (err) { next(err); }\n};\n\nexports.login = async (req, res, next) => {\n  try {\n    const { email, password } = req.body;\n    const user = await User.findOne({ email }).select('+password');\n    if (!user || !(await user.comparePassword(password)))\n      return res.status(401).json({ error: 'Email atau password salah' });\n\n    const access  = signAccess(user._id);\n    const refresh = signRefresh(user._id);\n    user.refreshToken = refresh;\n    await user.save();\n\n    // Kirim refresh token via HTTP-only cookie (lebih aman)\n    res.cookie('refresh', refresh, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 7 * 24 * 60 * 60 * 1000 });\n    res.json({ accessToken: access, user: { id: user._id, name: user.name, role: user.role } });\n  } catch (err) { next(err); }\n};\n\nexports.logout = async (req, res) => {\n  res.clearCookie('refresh');\n  res.json({ message: 'Logout berhasil' });\n};`,
      },
      {
        n: 4,
        t: 'Middleware protect route (middleware/auth.js):',
        code: `const jwt = require('jsonwebtoken');\nconst User = require('../models/User');\n\nexports.protect = async (req, res, next) => {\n  const authHeader = req.headers.authorization;\n  if (!authHeader?.startsWith('Bearer '))\n    return res.status(401).json({ error: 'Token tidak ditemukan' });\n\n  const token = authHeader.split(' ')[1];\n  try {\n    const { id } = jwt.verify(token, process.env.JWT_SECRET);\n    req.user = await User.findById(id).lean();\n    if (!req.user) return res.status(401).json({ error: 'User tidak ditemukan' });\n    next();\n  } catch {\n    res.status(401).json({ error: 'Token tidak valid atau kadaluarsa' });\n  }\n};\n\nexports.authorize = (...roles) => (req, res, next) => {\n  if (!roles.includes(req.user.role))\n    return res.status(403).json({ error: 'Akses ditolak' });\n  next();\n};`,
        warn: 'Access token JANGAN simpan di localStorage! Gunakan memory (state) untuk access token dan HTTP-only cookie untuk refresh token.',
      },
      {
        n: 5,
        t: 'Routes dan penggunaan middleware:',
        code: `// routes/auth.js:\nconst router = require('express').Router();\nconst { protect, authorize } = require('../middleware/auth');\nconst ctrl = require('../controllers/authController');\n\nrouter.post('/register', ctrl.register);\nrouter.post('/login',    ctrl.login);\nrouter.post('/logout',   protect, ctrl.logout);\n\n// routes/users.js — protected:\nrouter.get('/me',     protect, ctrl.getMe);\nrouter.get('/admin',  protect, authorize('admin'), ctrl.adminOnly);\n\n// Cara pakai di frontend (Axios):\n// axios.defaults.headers.common['Authorization'] = \`Bearer \${accessToken}\`;`,
        tip: 'Flow refresh token: setiap request 401 → hit /auth/refresh dengan cookie → dapat access token baru → retry request asli. Implementasikan di Axios interceptor.',
      },
    ],
  },

  {
    id: 'redis-cache',
    ic: 'RDS',
    badge: 'Intermediate',
    title: 'Redis — Caching, Session & Rate Limiting',
    time: '20 menit',
    desc: 'Setup Redis untuk cache API responses, simpan session, dan implementasi rate limiting.',
    steps: [
      {
        n: 1,
        t: 'Install Redis (lokal) atau gunakan Upstash (cloud gratis):',
        code: `# Install Redis lokal:\n# macOS:\nbrew install redis && brew services start redis\n\n# Ubuntu/Debian:\nsudo apt install redis-server\nsudo systemctl start redis\n\n# Windows (WSL):\nsudo apt install redis-server\n\n# Test:\nredis-cli ping  # PONG ✅\n\n# Cloud gratis (tanpa install):\n# Upstash.com → Create Database → copy REDIS_URL`,
      },
      {
        n: 2,
        t: 'Connect Node.js ke Redis dengan ioredis:',
        code: `npm install ioredis\n\n// config/redis.js:\nconst Redis = require('ioredis');\n\nconst redis = new Redis(process.env.REDIS_URL || {\n  host: process.env.REDIS_HOST || '127.0.0.1',\n  port: process.env.REDIS_PORT || 6379,\n  password: process.env.REDIS_PASSWORD,\n  retryStrategy: (times) => Math.min(times * 50, 2000),\n});\n\nredis.on('connect',  () => console.log('✅ Redis connected'));\nredis.on('error',    (err) => console.error('Redis error:', err.message));\n\nmodule.exports = redis;`,
      },
      {
        n: 3,
        t: 'Cache middleware untuk API response:',
        code: `const redis = require('../config/redis');\n\n// Middleware cache\nconst cache = (ttl = 60) => async (req, res, next) => {\n  const key = \`cache:\${req.originalUrl}\`;\n  const cached = await redis.get(key);\n  if (cached) {\n    return res.json({ ...JSON.parse(cached), cached: true });\n  }\n\n  // Override res.json untuk intercept response\n  const originalJson = res.json.bind(res);\n  res.json = async (data) => {\n    await redis.setex(key, ttl, JSON.stringify(data));\n    return originalJson(data);\n  };\n  next();\n};\n\n// Invalidate cache\nconst invalidateCache = async (pattern) => {\n  const keys = await redis.keys(\`cache:*\${pattern}*\`);\n  if (keys.length) await redis.del(keys);\n};\n\n// Pakai di routes:\nrouter.get('/users', cache(300), ctrl.getAll);  // Cache 5 menit`,
      },
      {
        n: 4,
        t: 'Rate limiting dengan Redis (lebih akurat dari in-memory):',
        code: `// middleware/rateLimiter.js:\nconst redis = require('../config/redis');\n\nconst rateLimiter = (limit = 100, window = 60) => async (req, res, next) => {\n  const ip = req.ip;\n  const key = \`ratelimit:\${ip}:\${Math.floor(Date.now() / (window * 1000))}\`;\n\n  const requests = await redis.incr(key);\n  if (requests === 1) await redis.expire(key, window);\n\n  res.set({\n    'X-RateLimit-Limit': limit,\n    'X-RateLimit-Remaining': Math.max(0, limit - requests),\n  });\n\n  if (requests > limit) {\n    return res.status(429).json({ error: 'Terlalu banyak request. Coba lagi nanti.' });\n  }\n  next();\n};\n\n// Pakai:\napp.use('/api/', rateLimiter(100, 60));  // 100 req per menit`,
      },
      {
        n: 5,
        t: 'Operasi Redis yang sering dipakai:',
        code: `// String:\nawait redis.set('key', 'value');\nawait redis.setex('session:abc', 3600, JSON.stringify(data));  // TTL 1 jam\nawait redis.get('key');\nawait redis.del('key');\n\n// Counter:\nawait redis.incr('visits');\nawait redis.incrby('score', 10);\n\n// List:\nawait redis.lpush('queue', JSON.stringify(job));\nawait redis.rpop('queue');\n\n// Hash:\nawait redis.hset('user:123', 'name', 'Budi', 'role', 'admin');\nawait redis.hgetall('user:123');\n\n// Set TTL:\nawait redis.expire('key', 3600);  // 1 jam\nawait redis.ttl('key');            // Sisa waktu`,
        tip: 'Cache invalidation adalah masalah tersulit dalam programming. Strategi: invalidate saat data berubah (write-through) atau set TTL pendek + toleransi stale data.',
      },
    ],
  },

  {
    id: 'websocket',
    ic: 'WS',
    badge: 'Intermediate',
    title: 'WebSocket — Real-time Chat & Notifikasi',
    time: '25 menit',
    desc: 'Implementasi WebSocket dengan Socket.IO untuk fitur real-time: chat, notifikasi, live update.',
    steps: [
      {
        n: 1,
        t: 'Install Socket.IO:',
        code: `# Backend:\nnpm install socket.io\n\n# Frontend:\nnpm install socket.io-client\n# atau via CDN:\n<script src="https://cdn.socket.io/4.7.4/socket.io.min.js"></script>`,
      },
      {
        n: 2,
        t: 'Setup server Socket.IO dengan Express:',
        code: `const express = require('express');\nconst http = require('http');\nconst { Server } = require('socket.io');\n\nconst app = express();\nconst server = http.createServer(app);\nconst io = new Server(server, {\n  cors: { origin: 'http://localhost:3001', credentials: true },\n  pingTimeout: 60000,\n});\n\n// Online users tracker\nconst users = new Map(); // socketId → username\n\nio.on('connection', (socket) => {\n  console.log('User connected:', socket.id);\n\n  // Join room\n  socket.on('join', ({ username, room }) => {\n    socket.join(room);\n    users.set(socket.id, { username, room });\n    io.to(room).emit('notification', \`\${username} bergabung!\`);\n    io.to(room).emit('online-users', getOnlineUsers(room));\n  });\n\n  // Chat message\n  socket.on('message', ({ room, text }) => {\n    const user = users.get(socket.id);\n    if (!user) return;\n    io.to(room).emit('message', {\n      id: Date.now(),\n      username: user.username,\n      text,\n      time: new Date().toISOString()\n    });\n  });\n\n  // Typing indicator\n  socket.on('typing', ({ room, username }) => {\n    socket.to(room).emit('typing', username);\n  });\n\n  socket.on('disconnect', () => {\n    const user = users.get(socket.id);\n    if (user) {\n      io.to(user.room).emit('notification', \`\${user.username} keluar.\`);\n      users.delete(socket.id);\n      io.to(user.room).emit('online-users', getOnlineUsers(user.room));\n    }\n  });\n});\n\nfunction getOnlineUsers(room) {\n  return [...users.values()].filter(u => u.room === room).map(u => u.username);\n}\n\nserver.listen(3000, () => console.log('🚀 Server + WS aktif'));`,
      },
      {
        n: 3,
        t: 'Client-side JavaScript:',
        code: `const socket = io('http://localhost:3000');\n\n// Join room\nsocket.emit('join', { username: 'Budi', room: 'general' });\n\n// Kirim pesan\ndocument.getElementById('send').addEventListener('click', () => {\n  const text = document.getElementById('input').value;\n  socket.emit('message', { room: 'general', text });\n  document.getElementById('input').value = '';\n});\n\n// Typing indicator — debounce\nlet typingTimer;\ndocument.getElementById('input').addEventListener('input', () => {\n  socket.emit('typing', { room: 'general', username: 'Budi' });\n  clearTimeout(typingTimer);\n  typingTimer = setTimeout(() => socket.emit('stop-typing', 'general'), 1000);\n});\n\n// Terima pesan\nsocket.on('message', ({ username, text, time }) => {\n  appendMessage(username, text, time);\n});\n\n// Typing indicator\nsocket.on('typing', (username) => {\n  document.getElementById('typing').textContent = \`\${username} sedang mengetik...\`;\n  clearTimeout(typingTimer);\n  typingTimer = setTimeout(() => { document.getElementById('typing').textContent = ''; }, 1500);\n});\n\nsocket.on('notification', (msg) => console.log('📢', msg));\nsocket.on('disconnect', () => console.log('❌ Koneksi terputus'));`,
      },
      {
        n: 4,
        t: 'Autentikasi Socket.IO dengan JWT:',
        code: `// server — middleware auth socket:\nio.use((socket, next) => {\n  const token = socket.handshake.auth.token;\n  if (!token) return next(new Error('Authentication error'));\n  try {\n    const user = jwt.verify(token, process.env.JWT_SECRET);\n    socket.user = user;\n    next();\n  } catch {\n    next(new Error('Invalid token'));\n  }\n});\n\n// client — kirim token saat connect:\nconst socket = io('http://localhost:3000', {\n  auth: { token: localStorage.getItem('accessToken') }\n});`,
      },
      {
        n: 5,
        t: 'Scaling dengan Redis Adapter (multi-server):',
        code: `npm install @socket.io/redis-adapter\n\n// server.js:\nconst { createClient } = require('redis');\nconst { createAdapter } = require('@socket.io/redis-adapter');\n\nconst pub = createClient({ url: process.env.REDIS_URL });\nconst sub = pub.duplicate();\n\nawait Promise.all([pub.connect(), sub.connect()]);\nio.adapter(createAdapter(pub, sub));\n\n// Sekarang bisa scale ke multiple server instances!\n// Socket.IO akan broadcast antar server via Redis pub/sub`,
        tip: 'Untuk production, selalu gunakan Redis adapter jika deploy ke lebih dari 1 server instance (contoh: load balancer dengan 3 Node.js instances).',
      },
    ],
  },

  {
    id: 'nginx-setup',
    ic: 'NGX',
    badge: 'Intermediate',
    title: 'Nginx — Reverse Proxy, HTTPS & Load Balancer',
    time: '30 menit',
    desc: 'Setup Nginx sebagai reverse proxy untuk Node.js, aktifkan HTTPS dengan Let\'s Encrypt, dan load balancing.',
    steps: [
      {
        n: 1,
        t: 'Install Nginx di server Ubuntu/Debian:',
        code: `sudo apt update && sudo apt install nginx -y\nsudo systemctl start nginx\nsudo systemctl enable nginx  # Auto-start\n\n# Cek status:\nsudo systemctl status nginx\ncurl http://localhost  # Harus muncul "Welcome to nginx"\n\n# Firewall (UFW):\nsudo ufw allow 'Nginx Full'  # Port 80 + 443\nsudo ufw status`,
      },
      {
        n: 2,
        t: 'Konfigurasi Nginx sebagai reverse proxy (tanpa HTTPS dulu):',
        code: `# Buat file config:\nsudo nano /etc/nginx/sites-available/myapp\n\n# Isi konfigurasi:\nserver {\n    listen 80;\n    server_name domainmu.com www.domainmu.com;\n\n    location / {\n        proxy_pass http://localhost:3000;\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection 'upgrade';\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n        proxy_cache_bypass $http_upgrade;\n    }\n}\n\n# Aktifkan:\nsudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/\nsudo nginx -t         # Test konfigurasi\nsudo systemctl reload nginx`,
      },
      {
        n: 3,
        t: 'Install SSL/HTTPS gratis dengan Certbot (Let\'s Encrypt):',
        code: `sudo apt install certbot python3-certbot-nginx -y\n\n# Generate sertifikat:\nsudo certbot --nginx -d domainmu.com -d www.domainmu.com\n\n# Certbot otomatis modifikasi nginx.conf untuk HTTPS!\n# Sertifikat valid 90 hari, auto-renew via cron.\n\n# Test auto-renew:\nsudo certbot renew --dry-run\n\n# Cek tanggal expired:\nsudo certbot certificates`,
        tip: 'DNS domain harus sudah mengarah ke IP server sebelum generate sertifikat. Certbot gagal jika domain belum propagate.',
      },
      {
        n: 4,
        t: 'Konfigurasi lengkap dengan HTTPS, gzip, dan security headers:',
        code: `server {\n    listen 443 ssl http2;\n    server_name domainmu.com;\n\n    # SSL (diisi otomatis oleh Certbot)\n    ssl_certificate     /etc/letsencrypt/live/domainmu.com/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/domainmu.com/privkey.pem;\n    ssl_protocols TLSv1.2 TLSv1.3;\n\n    # Security headers\n    add_header Strict-Transport-Security "max-age=31536000" always;\n    add_header X-Frame-Options DENY;\n    add_header X-Content-Type-Options nosniff;\n    add_header Referrer-Policy no-referrer-when-downgrade;\n\n    # Gzip compression\n    gzip on;\n    gzip_types text/css application/javascript application/json;\n    gzip_min_length 1024;\n\n    # Rate limit\n    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;\n    location /api/ {\n        limit_req zone=api burst=20 nodelay;\n        proxy_pass http://localhost:3000;\n    }\n\n    location / { proxy_pass http://localhost:3000; }\n}\n\n# Redirect HTTP → HTTPS\nserver {\n    listen 80;\n    server_name domainmu.com;\n    return 301 https://$host$request_uri;\n}`,
      },
      {
        n: 5,
        t: 'Load balancing untuk multiple Node.js instances:',
        code: `# Jalankan 4 instance Node.js di port berbeda:\npm2 start app.js -i 4  # Atau manual: PORT=3001/3002/3003/3004\n\n# nginx.conf — upstream block:\nupstream node_app {\n    least_conn;  # Algoritma: least connections\n    server 127.0.0.1:3001;\n    server 127.0.0.1:3002;\n    server 127.0.0.1:3003;\n    server 127.0.0.1:3004;\n    keepalive 64;\n}\n\nserver {\n    listen 443 ssl http2;\n    location / {\n        proxy_pass http://node_app;\n    }\n}`,
        tip: 'Gunakan PM2 cluster mode (pm2 start app.js -i max) untuk auto-gunakan semua CPU core. Nginx upstream sebagai external load balancer jika ada multiple VPS.',
      },
    ],
  },

  {
    id: 'postgresql',
    ic: 'PG',
    badge: 'Intermediate',
    title: 'PostgreSQL + Prisma ORM — SQL Modern',
    time: '25 menit',
    desc: 'Setup PostgreSQL, gunakan Prisma ORM untuk schema, migrations, dan query type-safe.',
    steps: [
      {
        n: 1,
        t: 'Install PostgreSQL dan buat database:',
        code: `# Ubuntu:\nsudo apt install postgresql postgresql-contrib -y\nsudo systemctl start postgresql\n\n# Buat user dan database:\nsudo -u postgres psql\nCREATE USER devuser WITH PASSWORD 'devpassword';\nCREATE DATABASE devdb OWNER devuser;\nGRANT ALL PRIVILEGES ON DATABASE devdb TO devuser;\n\\q\n\n# Cloud (gratis): Supabase, Neon.tech, atau Railway\n# .env:\nDATABASE_URL="postgresql://devuser:devpassword@localhost:5432/devdb"`,
      },
      {
        n: 2,
        t: 'Setup Prisma ORM:',
        code: `npm install prisma @prisma/client\nnpx prisma init  # Buat folder prisma/ dan .env\n\n# prisma/schema.prisma:\ngenerator client {\n  provider = "prisma-client-js"\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}`,
      },
      {
        n: 3,
        t: 'Definisi schema dan relasi:',
        code: `// prisma/schema.prisma:\nmodel User {\n  id        Int      @id @default(autoincrement())\n  email     String   @unique\n  name      String\n  role      Role     @default(USER)\n  posts     Post[]\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Post {\n  id        Int      @id @default(autoincrement())\n  title     String\n  content   String?\n  published Boolean  @default(false)\n  author    User     @relation(fields: [authorId], references: [id])\n  authorId  Int\n  tags      Tag[]\n}\n\nmodel Tag {\n  id    Int    @id @default(autoincrement())\n  name  String @unique\n  posts Post[]\n}\n\nenum Role {\n  USER\n  ADMIN\n}`,
      },
      {
        n: 4,
        t: 'Migrations dan Prisma Client:',
        code: `# Buat dan jalankan migration:\nnpx prisma migrate dev --name init\n\n# Update setelah ubah schema:\nnpx prisma migrate dev --name add_tags\n\n# Generate client setelah schema berubah:\nnpx prisma generate\n\n# Prisma Studio — GUI database:\nnpx prisma studio\n\n# Reset database (dev only):\nnpx prisma migrate reset`,
      },
      {
        n: 5,
        t: 'Query dengan Prisma Client:',
        code: `const { PrismaClient } = require('@prisma/client');\nconst prisma = new PrismaClient();\n\n// CREATE\nconst user = await prisma.user.create({\n  data: { email: 'budi@mail.com', name: 'Budi' }\n});\n\n// READ dengan relasi\nconst users = await prisma.user.findMany({\n  where: { role: 'USER' },\n  include: { posts: { where: { published: true } } },\n  orderBy: { createdAt: 'desc' },\n  take: 10, skip: 0,\n});\n\n// UPDATE\nconst updated = await prisma.user.update({\n  where: { id: 1 },\n  data: { name: 'Budi Santoso' },\n});\n\n// DELETE\nawait prisma.user.delete({ where: { id: 1 } });\n\n// Transaction\nawait prisma.$transaction(async (tx) => {\n  const u = await tx.user.create({ data: {...} });\n  await tx.post.create({ data: { authorId: u.id, title: '...' } });\n});\n\n// Disconnect saat shutdown:\nprocess.on('beforeExit', async () => await prisma.$disconnect());`,
        tip: 'Prisma memberikan type-safety penuh di TypeScript. Setiap query auto-complete dan error tertangkap di waktu kompilasi, bukan runtime.',
      },
    ],
  },

  {
    id: 'docker-basics',
    ic: '🐳',
    badge: 'Intermediate',
    title: 'Docker — Containerize & Deploy Aplikasi',
    time: '25 menit',
    desc: 'Containerize aplikasi Node.js, multi-service dengan Docker Compose, dan best practices production.',
    steps: [
      {
        n: 1,
        t: 'Install Docker Desktop dari docker.com.',
        tip: 'Docker Desktop sudah include Docker Compose. Cek: docker --version && docker compose version',
      },
      {
        n: 2,
        t: 'Buat Dockerfile untuk Node.js production:',
        code: `# Dockerfile:\n# Stage 1: Install dependencies\nFROM node:20-alpine AS deps\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\n\n# Stage 2: Production image\nFROM node:20-alpine AS runner\nWORKDIR /app\n\n# Security: non-root user\nRUN addgroup -S appgroup && adduser -S appuser -G appgroup\nCOPY --from=deps /app/node_modules ./node_modules\nCOPY . .\nRUN chown -R appuser:appgroup /app\nUSER appuser\n\nEXPOSE 3000\nCMD ["node", "server.js"]`,
      },
      {
        n: 3,
        t: 'Buat .dockerignore (penting untuk image size kecil):',
        code: `node_modules\n.env\n.git\n*.log\ndist/\ncoverage/\n*.test.js\nREADME.md`,
      },
      {
        n: 4,
        t: 'Build dan run container:',
        code: `# Build image:\ndocker build -t myapp:latest .\ndocker build -t myapp:v1.0 .     # Dengan tag versi\n\n# Run container:\ndocker run -p 3000:3000 --env-file .env myapp:latest\ndocker run -d -p 3000:3000 --name myapp myapp:latest  # Background\n\n# Perintah berguna:\ndocker ps                    # Container berjalan\ndocker ps -a                 # Semua container\ndocker logs myapp            # Lihat log\ndocker logs -f myapp         # Follow log\ndocker exec -it myapp sh     # Shell ke dalam container\ndocker stop myapp\ndocker rm myapp\ndocker images                # Lihat semua image`,
      },
      {
        n: 5,
        t: 'docker-compose.yml — multi-service stack lengkap:',
        code: `version: '3.8'\nservices:\n  app:\n    build: .\n    ports:\n      - "3000:3000"\n    env_file: .env\n    depends_on:\n      db:\n        condition: service_healthy\n      redis:\n        condition: service_started\n    restart: unless-stopped\n    volumes:\n      - ./logs:/app/logs\n\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_DB: myapp\n      POSTGRES_USER: user\n      POSTGRES_PASSWORD: password\n    volumes:\n      - postgres_data:/var/lib/postgresql/data\n    healthcheck:\n      test: ["CMD", "pg_isready", "-U", "user"]\n      interval: 10s\n      retries: 5\n\n  redis:\n    image: redis:7-alpine\n    command: redis-server --requirepass redispassword\n    volumes:\n      - redis_data:/data\n\n  nginx:\n    image: nginx:alpine\n    ports:\n      - "80:80"\n      - "443:443"\n    volumes:\n      - ./nginx.conf:/etc/nginx/conf.d/default.conf\n    depends_on:\n      - app\n\nvolumes:\n  postgres_data:\n  redis_data:`,
        tip: 'docker compose up -d untuk start semua. docker compose down -v untuk stop + hapus volumes. Gunakan docker compose watch untuk hot reload di development.',
      },
    ],
  },

  {
    id: 'api-rest',
    ic: 'API',
    badge: 'Intermediate',
    title: 'REST API Best Practices — Desain yang Benar',
    time: '20 menit',
    desc: 'Cara merancang dan membangun REST API yang proper, maintainable, dan aman.',
    steps: [
      {
        n: 1,
        t: 'Naming conventions yang benar:',
        code: `# ✅ BENAR — noun, lowercase, plural\nGET    /api/v1/users            # List semua\nGET    /api/v1/users/:id        # Detail satu\nPOST   /api/v1/users            # Buat baru\nPUT    /api/v1/users/:id        # Replace full\nPATCH  /api/v1/users/:id        # Update sebagian\nDELETE /api/v1/users/:id        # Hapus\n\n# Relasi / nested:\nGET    /api/v1/users/:id/posts  # Posts milik user\nPOST   /api/v1/users/:id/posts  # Buat post untuk user\n\n# ❌ SALAH — jangan pakai verb di URL:\n/api/getUsers\n/api/createNewUser\n/api/deleteUser/1`,
      },
      {
        n: 2,
        t: 'HTTP Status codes yang tepat:',
        code: `200 OK              — GET/PATCH/PUT berhasil\n201 Created         — POST berhasil buat resource\n204 No Content      — DELETE berhasil (no body)\n400 Bad Request     — Request malformed\n401 Unauthorized    — Perlu autentikasi\n403 Forbidden       — Autentikasi ok, tapi no access\n404 Not Found       — Resource tidak ada\n409 Conflict        — Duplicate (email, dll)\n422 Unprocessable   — Validasi gagal\n429 Too Many Req.   — Rate limit tercapai\n500 Internal Error  — Unexpected server error\n503 Unavailable     — Server maintenance / overload`,
      },
      {
        n: 3,
        t: 'Response format konsisten dengan envelope:',
        code: `// Sukses — satu resource:\n{ "data": { "id": 1, "name": "Budi" }, "status": 200 }\n\n// Sukses — koleksi dengan pagination:\n{\n  "data": [...],\n  "meta": {\n    "total": 150,\n    "page": 1,\n    "perPage": 10,\n    "totalPages": 15\n  }\n}\n\n// Error:\n{\n  "error": {\n    "code": "VALIDATION_FAILED",\n    "message": "Email tidak valid",\n    "details": [{ "field": "email", "message": "Must be valid email" }]\n  },\n  "status": 422\n}`,
      },
      {
        n: 4,
        t: 'Versioning dan dokumentasi API:',
        code: `# Versioning di URL:\n/api/v1/users\n/api/v2/users\n\n# Atau header:\n# API-Version: 2\n\n# Dokumentasi otomatis dengan Swagger:\nnpm install swagger-ui-express swagger-jsdoc\n\n/**\n * @swagger\n * /api/v1/users:\n *   get:\n *     summary: Get all users\n *     tags: [Users]\n *     parameters:\n *       - in: query\n *         name: page\n *         schema: { type: integer }\n *     responses:\n *       200:\n *         description: List of users\n */\nrouter.get('/', ctrl.getAll);`,
      },
      {
        n: 5,
        t: 'Security essentials — wajib untuk production:',
        code: `npm install helmet cors express-rate-limit\n\nconst rateLimit = require('express-rate-limit');\nconst helmet = require('helmet');\nconst cors = require('cors');\n\n// Security headers\napp.use(helmet());\n\n// CORS whitelist\napp.use(cors({\n  origin: ['https://app.domainku.com'],\n  credentials: true,\n}));\n\n// Rate limiting\napp.use('/api/', rateLimit({\n  windowMs: 15 * 60 * 1000,  // 15 menit\n  max: 100,\n  standardHeaders: true,\n  message: { error: 'Terlalu banyak request' }\n}));\n\n// Lebih ketat untuk auth endpoint\napp.use('/api/auth/', rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }));`,
        tip: 'Selalu validasi dan sanitasi input dengan Joi, Zod, atau express-validator. Jangan pernah trust data dari client. Gunakan parameterized queries untuk SQL.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  //  ADVANCED
  // ══════════════════════════════════════════════════════════

  {
    id: 'github-actions',
    ic: 'CI',
    badge: 'Advanced',
    title: 'GitHub Actions — CI/CD Pipeline Lengkap',
    time: '30 menit',
    desc: 'Setup pipeline test, build Docker, push registry, dan deploy otomatis ke VPS/Vercel.',
    steps: [
      {
        n: 1,
        t: 'Konsep dasar GitHub Actions:',
        code: `# Struktur file:\n.github/\n  workflows/\n    ci.yml       ← Test + lint pada setiap PR\n    deploy.yml   ← Deploy ke production saat merge ke main\n    release.yml  ← Buat GitHub Release\n\n# Terminologi:\n# workflow  — satu file .yml = satu workflow\n# job       — unit pekerjaan (bisa parallel)\n# step      — satu perintah di dalam job\n# action    — reusable step (uses: actions/checkout@v4)\n# runner    — VM yang menjalankan job (ubuntu-latest)`,
      },
      {
        n: 2,
        t: 'Workflow CI — test setiap push/PR:',
code: `# .github/workflows/ci.yml:\nname: CI\n\non:\n  push:\n    branches: [main, develop]\n  pull_request:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    strategy:\n      matrix:\n        node-version: [18.x, 20.x]\n\n    services:\n      mongodb:\n        image: mongo:7\n        ports: ['27017:27017']\n\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Setup Node.js \${{ matrix.node-version }}\n        uses: actions/setup-node@v4\n        with:\n          node-version: \${{ matrix.node-version }}\n          cache: 'npm'\n\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test\n        env:\n          NODE_ENV: test\n          MONGO_URI: mongodb://localhost:27017/testdb`,
      },
      {
        n: 3,
        t: 'Workflow CD — build Docker dan push ke registry:',
        code: `# .github/workflows/deploy.yml:\nname: Deploy\n\non:\n  push:\n    branches: [main]\n\njobs:\n  deploy:\n    needs: test   # Tunggu CI sukses\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Login ke Docker Hub\n        uses: docker/login-action@v3\n        with:\n          username: \${{ secrets.DOCKER_USERNAME }}\n          password: \${{ secrets.DOCKER_PASSWORD }}\n\n      - name: Build dan Push Docker Image\n        uses: docker/build-push-action@v5\n        with:\n          push: true\n          tags: |\n            username/myapp:latest\n            username/myapp:\${{ github.sha }}\n\n      - name: Deploy ke VPS via SSH\n        uses: appleboy/ssh-action@v1\n        with:\n          host: \${{ secrets.SERVER_HOST }}\n          username: \${{ secrets.SERVER_USER }}\n          key: \${{ secrets.SSH_PRIVATE_KEY }}\n          script: |\n            docker pull username/myapp:latest\n            docker stop myapp || true\n            docker rm myapp || true\n            docker run -d --name myapp \\\n              -p 3000:3000 \\\n              --env-file /home/ubuntu/.env \\\n              --restart unless-stopped \\\n              username/myapp:latest\n            echo "✅ Deploy selesai!"`,
      },
      {
        n: 4,
        t: 'Secrets, caching, dan reusable workflows:',
        code: `# Simpan secrets di:\n# Repo → Settings → Secrets and variables → Actions\n# DOCKER_USERNAME, DOCKER_PASSWORD, SSH_PRIVATE_KEY, dll.\n\n# Cache dependencies (hemat waktu 1-2 menit):\n- uses: actions/cache@v4\n  with:\n    path: ~/.npm\n    key: \${​{ runner.os }}-node-\${​{ hashFiles('**/package-lock.json') }}\n    restore-keys: |\n      \${​{ runner.os }}-node-\n\n# Reusable workflow (DRY):\n# .github/workflows/reusable-test.yml:\non:\n  workflow_call:\n    inputs:\n      node-version: { required: true, type: string }\n\n# Panggil dari workflow lain:\njobs:\n  call-test:\n    uses: ./.github/workflows/reusable-test.yml\n    with:\n      node-version: '20.x'`,
        tip: 'Gunakan Environments (Settings → Environments) untuk approval manual sebelum deploy ke production.',
      },
      {
        n: 5,
        t: 'Notifikasi dan monitoring pipeline:',
        code: `# Notify Telegram jika gagal:\n- name: Notify Telegram\n  if: failure()\n  run: |\n    MSG="❌ Deploy GAGAL!%0A\\\n    Repo: \${​{ github.repository }}%0A\\\n    Branch: \${​{ github.ref }}%0A\\\n    Commit: \${​{ github.sha }}%0A\\\n    Author: \${​{ github.actor }}"\n    curl -s "https://api.telegram.org/bot\${​{ secrets.BOT_TOKEN }}/sendMessage\\\n    ?chat_id=\${​{ secrets.CHAT_ID }}&text=$MSG"\n\n# Notify sukses:\n- name: Notify Success\n  if: success()\n  run: |\n    curl -s "https://api.telegram.org/bot\${​{ secrets.BOT_TOKEN }}/sendMessage\\\n    ?chat_id=\${​{ secrets.CHAT_ID }}&text=✅+Deploy+sukses!"`,
        warn: 'Jangan commit secrets langsung di workflow file. Selalu pakai ${{ secrets.NAMA }}. Audit secrets secara berkala — revoke yang tidak terpakai.',
      },
    ],
  },

  {
    id: 'microservices',
    ic: 'SVC',
    badge: 'Advanced',
    title: 'Arsitektur Microservices dengan Node.js',
    time: '45 menit',
    desc: 'Rancang dan implementasi microservices: service discovery, API gateway, dan komunikasi async.',
    steps: [
      {
        n: 1,
        t: 'Kapan gunakan microservices? Tradeoffs:',
        code: `// ✅ Tepat untuk microservices:\n// - Tim besar (>15 dev) dengan domain berbeda\n// - Service yang punya scaling needs berbeda (payment vs chat)\n// - Kebutuhan tech stack berbeda per service\n// - Fault isolation kritis (satu service down, sisanya tetap jalan)\n\n// ❌ Jangan microservices jika:\n// - Tim kecil (<10 dev)\n// - Product belum product-market fit\n// - Deadline ketat\n// - Belum punya DevOps matang\n\n// Rule of thumb: Mulai monolith, extract service saat ada pain point nyata.\n// "Premature microservices is the root of all evil"`,
      },
      {
        n: 2,
        t: 'Struktur folder multi-service (monorepo):',
        code: `# Monorepo dengan struktur:\nservices/\n  gateway/          ← API Gateway (port 8080)\n    src/\n    Dockerfile\n  auth-service/      ← Autentikasi (port 3001)\n    src/\n    Dockerfile\n  user-service/      ← User data (port 3002)\n    src/\n    Dockerfile\n  notification-svc/  ← Email/SMS (port 3003)\n    src/\n    Dockerfile\nshared/\n  events/           ← Event schema (RabbitMQ/Kafka)\n  utils/            ← Shared utilities\ndocker-compose.yml\npackage.json        ← Workspace root (npm workspaces)`,
      },
      {
        n: 3,
        t: 'API Gateway dengan http-proxy-middleware:',
        code: `// services/gateway/src/index.js:\nconst express = require('express');\nconst { createProxyMiddleware } = require('http-proxy-middleware');\nconst rateLimit = require('express-rate-limit');\nconst jwt = require('jsonwebtoken');\n\nconst app = express();\n\n// Rate limit global\napp.use(rateLimit({ windowMs: 60000, max: 200 }));\n\n// Auth middleware — verify JWT sebelum forward\nconst authenticate = (req, res, next) => {\n  if (req.path.startsWith('/auth')) return next(); // Skip untuk /auth\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) return res.status(401).json({ error: 'Unauthorized' });\n  try {\n    req.headers['x-user'] = JSON.stringify(jwt.verify(token, process.env.JWT_SECRET));\n    next();\n  } catch { res.status(401).json({ error: 'Invalid token' }); }\n};\n\napp.use(authenticate);\n\n// Route to services:\napp.use('/auth',   createProxyMiddleware({ target: 'http://auth-service:3001',  changeOrigin: true }));\napp.use('/users',  createProxyMiddleware({ target: 'http://user-service:3002',  changeOrigin: true }));\napp.use('/notify', createProxyMiddleware({ target: 'http://notification-svc:3003', changeOrigin: true }));\n\napp.listen(8080, () => console.log('🌐 Gateway berjalan di :8080'));`,
      },
      {
        n: 4,
        t: 'Komunikasi async dengan RabbitMQ (event-driven):',
        code: `npm install amqplib\n\n// shared/events/publisher.js:\nconst amqp = require('amqplib');\nlet channel;\n\nexports.connect = async () => {\n  const conn = await amqp.connect(process.env.RABBITMQ_URL);\n  channel = await conn.createChannel();\n  console.log('✅ RabbitMQ connected');\n};\n\nexports.publish = async (exchange, event, data) => {\n  await channel.assertExchange(exchange, 'topic', { durable: true });\n  channel.publish(exchange, event, Buffer.from(JSON.stringify(data)));\n  console.log(\`📤 Published \${event}\`, data);\n};\n\n// shared/events/subscriber.js:\nexports.subscribe = async (exchange, patterns, handler) => {\n  await channel.assertExchange(exchange, 'topic', { durable: true });\n  const { queue } = await channel.assertQueue('', { exclusive: true });\n  for (const pattern of patterns) {\n    await channel.bindQueue(queue, exchange, pattern);\n  }\n  channel.consume(queue, async (msg) => {\n    if (!msg) return;\n    await handler(JSON.parse(msg.content.toString()), msg.fields.routingKey);\n    channel.ack(msg);\n  });\n};\n\n// Contoh: user-service publish event setelah register:\nawait publisher.publish('users', 'user.registered', { userId, email, name });\n\n// notification-service subscribe dan kirim welcome email:\nawait subscriber.subscribe('users', ['user.registered'], async ({ email, name }) => {\n  await sendWelcomeEmail(email, name);\n});`,
      },
      {
        n: 5,
        t: 'Health checks, service discovery, dan docker-compose multi-service:',
        code: `// Health check endpoint — setiap service WAJIB punya:\napp.get('/health', (req, res) => {\n  res.json({\n    status: 'healthy',\n    service: 'user-service',\n    version: process.env.npm_package_version,\n    uptime: process.uptime(),\n    timestamp: new Date().toISOString(),\n  });\n});\n\n// docker-compose.yml multi-service:\nversion: '3.8'\nservices:\n  gateway:\n    build: ./services/gateway\n    ports: ['8080:8080']\n    environment:\n      JWT_SECRET: \${JWT_SECRET}\n    depends_on: [auth-service, user-service]\n\n  auth-service:\n    build: ./services/auth-service\n    environment:\n      MONGO_URI: mongodb://mongo:27017/auth\n\n  user-service:\n    build: ./services/user-service\n    environment:\n      MONGO_URI: mongodb://mongo:27017/users\n\n  rabbitmq:\n    image: rabbitmq:3-management-alpine\n    ports: ['5672:5672', '15672:15672']  # 15672 = Management UI\n\n  mongo:\n    image: mongo:7`,
        tip: 'Untuk production, pertimbangkan Kubernetes untuk service discovery, scaling, dan self-healing. Gunakan distributed tracing (Jaeger/Zipkin) untuk debugging cross-service requests.',
      },
    ],
  },

  {
    id: 'graphql',
    ic: 'GQL',
    badge: 'Advanced',
    title: 'GraphQL API dengan Apollo Server',
    time: '35 menit',
    desc: 'Bangun GraphQL API modern dengan Apollo, type system, resolver, authentication, dan DataLoader.',
    steps: [
      {
        n: 1,
        t: 'Kapan pakai GraphQL vs REST? Dan setup Apollo Server:',
        code: `# GraphQL unggul saat:\n# - Frontend butuh data yang sangat bervariasi per halaman\n# - Mobile app butuh bandwidth minimal (over-fetching problem)\n# - Multiple client (web/mobile/partner) dengan kebutuhan beda\n# - Rapid product iteration\n\n# REST tetap lebih baik untuk:\n# - Simple CRUD API\n# - Public API yang mudah di-cache\n# - Team yang sudah familiar REST\n\nnpm install @apollo/server graphql graphql-tag\n\n# TypeScript (opsional tapi sangat direkomendasikan):\nnpm install -D typescript @types/node ts-node\nnpx tsc --init`,
      },
      {
        n: 2,
        t: 'Setup Apollo Server dengan Express:',
        code: `const { ApolloServer } = require('@apollo/server');\nconst { expressMiddleware } = require('@apollo/server/express4');\nconst express = require('express');\nconst { json } = require('body-parser');\n\nconst typeDefs = require('./schema');\nconst resolvers = require('./resolvers');\nconst { getUserFromToken } = require('./auth');\n\nasync function startServer() {\n  const app = express();\n  const server = new ApolloServer({ typeDefs, resolvers });\n  await server.start();\n\n  app.use('/graphql', json(), expressMiddleware(server, {\n    context: async ({ req }) => {\n      const token = req.headers.authorization?.replace('Bearer ', '');\n      const user = token ? await getUserFromToken(token) : null;\n      return { user }; // Context tersedia di semua resolver\n    },\n  }));\n\n  app.listen(4000, () => console.log('🚀 GraphQL: http://localhost:4000/graphql'));\n}\n\nstartServer();`,
      },
      {
        n: 3,
        t: 'Schema (Type Definitions):',
        code: `// schema.js:\nconst { gql } = require('graphql-tag');\n\nmodule.exports = gql\`\n  type User {\n    id: ID!\n    name: String!\n    email: String!\n    posts: [Post!]!\n    role: Role!\n  }\n\n  type Post {\n    id: ID!\n    title: String!\n    content: String\n    published: Boolean!\n    author: User!\n    createdAt: String!\n  }\n\n  enum Role { USER ADMIN }\n\n  input CreatePostInput {\n    title: String!\n    content: String\n  }\n\n  type Query {\n    me: User\n    users: [User!]!\n    user(id: ID!): User\n    posts(published: Boolean): [Post!]!\n  }\n\n  type Mutation {\n    register(name: String!, email: String!, password: String!): AuthPayload!\n    login(email: String!, password: String!): AuthPayload!\n    createPost(input: CreatePostInput!): Post!\n    publishPost(id: ID!): Post!\n    deletePost(id: ID!): Boolean!\n  }\n\n  type AuthPayload {\n    token: String!\n    user: User!\n  }\n\`;`,
      },
      {
        n: 4,
        t: 'Resolvers dengan auth dan error handling:',
        code: `const { GraphQLError } = require('graphql');\nconst User = require('./models/User');\nconst Post = require('./models/Post');\n\n// Auth guard helper:\nconst requireAuth = (user) => {\n  if (!user) throw new GraphQLError('Silakan login dulu', {\n    extensions: { code: 'UNAUTHENTICATED' }\n  });\n  return user;\n};\n\nmodule.exports = {\n  Query: {\n    me: (_, __, { user }) => user,\n    users: async (_, __, { user }) => {\n      requireAuth(user);\n      return User.find().lean();\n    },\n    posts: async (_, { published }) => {\n      const filter = published !== undefined ? { published } : {};\n      return Post.find(filter).sort('-createdAt').lean();\n    },\n  },\n\n  Mutation: {\n    login: async (_, { email, password }) => {\n      const user = await User.findOne({ email }).select('+password');\n      if (!user || !(await user.comparePassword(password)))\n        throw new GraphQLError('Kredensial tidak valid', { extensions: { code: 'UNAUTHORIZED' } });\n      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });\n      return { token, user };\n    },\n    createPost: async (_, { input }, { user }) => {\n      requireAuth(user);\n      return Post.create({ ...input, authorId: user.id });\n    },\n  },\n\n  // Field resolvers untuk relasi:\n  User: {\n    posts: (parent) => Post.find({ authorId: parent._id || parent.id }).lean(),\n  },\n  Post: {\n    author: (parent) => User.findById(parent.authorId).lean(),\n  },\n};`,
      },
      {
        n: 5,
        t: 'DataLoader — solusi N+1 query problem:',
        code: `npm install dataloader\n\n// dataloaders/userLoader.js:\nconst DataLoader = require('dataloader');\nconst User = require('../models/User');\n\n// Batch: daripada 100 query findById, jadi 1 query $in\nconst userLoader = new DataLoader(async (ids) => {\n  const users = await User.find({ _id: { $in: ids } }).lean();\n  const userMap = new Map(users.map(u => [u._id.toString(), u]));\n  return ids.map(id => userMap.get(id.toString()) || null);\n});\n\nexports.createLoaders = () => ({ userLoader: new DataLoader(...) });\n\n// Di context Apollo:\ncontext: async ({ req }) => ({\n  user: await getUserFromToken(req.headers.authorization),\n  loaders: createLoaders(),  // Baru setiap request\n}),\n\n// Di resolver:\nPost: {\n  author: (parent, _, { loaders }) =>\n    loaders.userLoader.load(parent.authorId.toString()),\n},`,
        tip: 'N+1 problem: 100 posts = 100 query user tanpa DataLoader, jadi 1 query dengan DataLoader. WAJIB pakai DataLoader di production GraphQL.',
      },
    ],
  },

  {
    id: 'security-hardening',
    ic: 'SEC',
    badge: 'Advanced',
    title: 'Security Hardening — Lindungi Aplikasi dari Serangan',
    time: '35 menit',
    desc: 'OWASP Top 10, SQL injection, XSS, CSRF, rate limiting lanjutan, dan audit keamanan.',
    steps: [
      {
        n: 1,
        t: 'OWASP Top 10 dan mitigasinya di Node.js:',
        code: `// A01: Broken Access Control\n// → Selalu verifikasi ownership: user hanya bisa akses data miliknya\nconst post = await Post.findOne({ _id: id, authorId: req.user.id });\nif (!post) return res.status(404).json({ error: 'Not found' });\n\n// A02: Cryptographic Failures\n// → Hash password dengan bcrypt (cost >= 12), JANGAN MD5/SHA1!\nconst hash = await bcrypt.hash(password, 12);\n\n// A03: Injection (SQL, NoSQL, Command)\n// → Parameterized queries / Mongoose (auto-escape)\nconst user = await User.findOne({ email: req.body.email }); // ✅ Aman\n// ❌ JANGAN: db.query(\`SELECT * FROM users WHERE email = '\${email}'\`)\n\n// A07: Auth Failures\n// → Rate limit login, bcrypt timing attack safe, no user enumeration\n// → Jangan beda pesan "email tidak ada" vs "password salah"\nreturn res.status(401).json({ error: 'Email atau password tidak valid' });`,
      },
      {
        n: 2,
        t: 'Helmet — security headers lengkap:',
        code: `const helmet = require('helmet');\n\napp.use(helmet({  // Aktifkan semua default + kustom:\n  contentSecurityPolicy: {\n    directives: {\n      defaultSrc: ["'self'"],\n      scriptSrc: ["'self'"],  // No inline scripts\n      styleSrc: ["'self'", "'unsafe-inline'"],\n      imgSrc: ["'self'", "data:", "https:"],\n      connectSrc: ["'self'", "https://api.domain.com"],\n    },\n  },\n  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },\n  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },\n}));\n\n// Headers yang diset Helmet:\n// X-Content-Type-Options: nosniff\n// X-Frame-Options: SAMEORIGIN\n// X-XSS-Protection: 0 (disable, pakai CSP)\n// Strict-Transport-Security: max-age=...\n// Content-Security-Policy: ...`,
      },
      {
        n: 3,
        t: 'Input sanitization — cegah XSS dan NoSQL injection:',
        code: `npm install express-mongo-sanitize xss-clean\n\nconst mongoSanitize = require('express-mongo-sanitize');\nconst xss = require('xss-clean');\n\n// Hapus $ dan . dari input (NoSQL injection prevention)\napp.use(mongoSanitize());\n\n// Strip HTML tags dari input (XSS prevention)\napp.use(xss());\n\n// Manual sanitize dengan DOMPurify (frontend) atau sanitize-html (backend):\nconst sanitizeHtml = require('sanitize-html');\nconst clean = sanitizeHtml(userInput, {\n  allowedTags: ['b', 'i', 'em', 'strong', 'a'],\n  allowedAttributes: { a: ['href'] },\n});\n\n// Validasi dengan Zod (type-safe):\nconst { z } = require('zod');\nconst UserSchema = z.object({\n  email: z.string().email(),\n  password: z.string().min(8).max(100),\n  name: z.string().min(2).max(50).trim(),\n});\nconst validated = UserSchema.parse(req.body); // Throw jika invalid`,
      },
      {
        n: 4,
        t: 'CSRF protection dan secure cookies:',
        code: `npm install csurf cookie-parser\n// (atau gunakan csurf-alternative yang masih maintained)\n\n// Untuk SPA: gunakan Double Submit Cookie pattern\n// atau cukup verifikasi Origin/Referer header\n\napp.use((req, res, next) => {\n  if (['POST','PUT','PATCH','DELETE'].includes(req.method)) {\n    const origin = req.headers.origin || req.headers.referer;\n    if (!origin?.startsWith('https://app.domainku.com'))\n      return res.status(403).json({ error: 'CSRF check failed' });\n  }\n  next();\n});\n\n// Secure cookies:\nres.cookie('session', token, {\n  httpOnly: true,    // Tidak bisa diakses JavaScript\n  secure: true,      // HTTPS only\n  sameSite: 'Strict',// Tidak dikirim dari site lain\n  maxAge: 7 * 24 * 60 * 60 * 1000,\n  path: '/',\n});`,
      },
      {
        n: 5,
        t: 'Audit dependencies dan secrets scanning:',
        code: `# Audit npm packages:\nnpm audit\nnpm audit fix        # Auto-fix yang bisa\nnpm audit fix --force  # Upgrade major (hati-hati breaking changes)\n\n# Cek outdated:\nnpm outdated\n\n# Snyk — advanced vulnerability scanning:\nnpx snyk test\nnpx snyk monitor     # Monitoring ongoing\n\n# Git secrets — cegah commit credential:\n# Install git-secrets:\ngit secrets --install\ngit secrets --register-aws\n\n# .env audit — pastikan .env tidak ke-commit:\ngit log --all -- .env  # Harus kosong!\ngit grep -r "password" -- '*.js'  # Cari hardcoded password\n\n# HTTPS mandatory:\n# Redirect all HTTP to HTTPS di Nginx (lihat tutorial nginx-setup)`,
        warn: 'Security bukan sekali setup lalu selesai. Jadwalkan audit rutin: npm audit mingguan, dependency update bulanan, penetration test tahunan.',
      },
    ],
  },

  {
    id: 'message-queue',
    ic: 'MQ',
    badge: 'Advanced',
    title: 'Message Queue — Bull & RabbitMQ untuk Background Jobs',
    time: '30 menit',
    desc: 'Proses tugas berat (email, resize gambar, laporan) di background tanpa block API.',
    steps: [
      {
        n: 1,
        t: 'Mengapa butuh message queue? Use cases:',
        code: `// ❌ Tanpa queue — request hang 30 detik:\napp.post('/register', async (req, res) => {\n  const user = await User.create(req.body);\n  await sendWelcomeEmail(user.email);  // Blocking! 5-30 detik\n  await generatePDF(user.id);         // Blocking! 10 detik\n  res.status(201).json({ user });     // User nunggu 40 detik!\n});\n\n// ✅ Dengan queue — response instan:\napp.post('/register', async (req, res) => {\n  const user = await User.create(req.body);\n  await emailQueue.add('welcome', { email: user.email });\n  await pdfQueue.add('generate', { userId: user.id });\n  res.status(201).json({ user });  // Langsung response!\n  // Email & PDF diproses background oleh worker\n});`,
      },
      {
        n: 2,
        t: 'Setup Bull (Redis-based queue) — simple dan powerful:',
        code: `npm install bull\n\n// queues/emailQueue.js:\nconst Bull = require('bull');\n\nconst emailQueue = new Bull('email', {\n  redis: process.env.REDIS_URL,\n  defaultJobOptions: {\n    attempts: 3,          // Retry 3x jika gagal\n    backoff: {\n      type: 'exponential',\n      delay: 2000,        // Delay naik exponential: 2s, 4s, 8s\n    },\n    removeOnComplete: 100, // Simpan 100 job terakhir yang sukses\n    removeOnFail: 200,     // Simpan 200 job terakhir yang gagal\n  }\n});\n\nmodule.exports = emailQueue;`,
      },
      {
        n: 3,
        t: 'Producer — tambah job ke queue:',
        code: `const emailQueue = require('./queues/emailQueue');\nconst pdfQueue = require('./queues/pdfQueue');\n\n// Tambah job:\nawait emailQueue.add('welcome', {\n  to: user.email,\n  name: user.name,\n});\n\n// Job dengan delay (kirim promo 1 jam setelah register):\nawait emailQueue.add('promo', { userId: user.id }, {\n  delay: 60 * 60 * 1000  // 1 jam\n});\n\n// Job berulang (laporan harian jam 08:00 WIB):\nawait emailQueue.add('daily-report', {}, {\n  repeat: { cron: '0 1 * * *' }  // 01:00 UTC = 08:00 WIB\n});\n\n// Job prioritas (0 = tertinggi):\nawait emailQueue.add('reset-password', { email }, { priority: 1 });`,
      },
      {
        n: 4,
        t: 'Worker — proses job dari queue:',
        code: `// workers/emailWorker.js:\nconst emailQueue = require('../queues/emailQueue');\nconst nodemailer = require('nodemailer');\n\nconst transporter = nodemailer.createTransport({\n  service: 'gmail',\n  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }\n});\n\n// Proses job (bisa jalankan di process terpisah!):\nemailQueue.process('welcome', async (job) => {\n  const { to, name } = job.data;\n  await transporter.sendMail({\n    from: '\"MyApp\" <no-reply@myapp.com>',\n    to,\n    subject: \`Selamat datang, \${name}!\`,\n    html: \`<h1>Halo \${name}!</h1><p>Selamat bergabung!</p>\`,\n  });\n  console.log(\`✅ Email terkirim ke \${to}\`);\n  return { sent: true };\n});\n\n// Events monitoring:\nemailQueue.on('failed',    (job, err) => console.error(\`❌ Job \${job.id} gagal:\`, err.message));\nemailQueue.on('completed', (job)      => console.log(\`✅ Job \${job.id} selesai\`));\nemailQueue.on('stalled',   (job)      => console.warn(\`⚠️ Job \${job.id} stalled\`));`,
      },
      {
        n: 5,
        t: 'Bull Board — monitoring UI untuk queue:',
        code: `npm install @bull-board/express @bull-board/api\n\n// Tambah ke server:\nconst { createBullBoard } = require('@bull-board/api');\nconst { BullAdapter } = require('@bull-board/api/bullAdapter');\nconst { ExpressAdapter } = require('@bull-board/express');\n\nconst serverAdapter = new ExpressAdapter();\nserverAdapter.setBasePath('/admin/queues');\n\ncreateBullBoard({\n  queues: [\n    new BullAdapter(emailQueue),\n    new BullAdapter(pdfQueue),\n  ],\n  serverAdapter,\n});\n\n// Protect dengan auth!\napp.use('/admin/queues', authenticate, serverAdapter.getRouter());\n\n// Akses di: http://localhost:3000/admin/queues\n// Lihat: pending, active, completed, failed jobs\n// Bisa retry job yang gagal dari UI!`,
        tip: 'Pisahkan worker di proses/container berbeda dari API server. Saat traffic tinggi, scale worker independently tanpa scale API server.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  //  EXPERT
  // ══════════════════════════════════════════════════════════

  {
    id: 'kubernetes',
    ic: 'K8S',
    badge: 'Expert',
    title: 'Kubernetes — Deploy & Scale di Production',
    time: '60 menit',
    desc: 'Konsep Kubernetes, deploy aplikasi Node.js, auto-scaling, rolling updates, dan monitoring.',
    steps: [
      {
        n: 1,
        t: 'Konsep inti Kubernetes — wajib dipahami:',
        code: `# Hierarki Kubernetes:\n# Cluster → Node → Pod → Container\n\n# Objek utama:\n# Pod          — unit terkecil, 1+ container\n# Deployment   — manage ReplicaSet, rolling update\n# Service      — network abstraction, load balancer internal\n# Ingress      — HTTP routing eksternal (kayak Nginx)\n# ConfigMap    — konfigurasi non-secret\n# Secret       — data sensitif (base64 encoded)\n# PVC          — Persistent Volume Claim (storage)\n# HPA          — Horizontal Pod Autoscaler\n# Namespace    — isolasi resource (dev/staging/prod)\n\n# Install tools:\n# kubectl (CLI)\nbrew install kubectl   # macOS\n# Minikube (lokal):\nbrew install minikube\nminikube start\nkubectl get nodes`,
      },
      {
        n: 2,
        t: 'Deployment manifest — deploy Node.js app:',
        code: `# deployment.yaml:\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: myapp\n  namespace: production\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: myapp\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0  # Zero downtime!\n  template:\n    metadata:\n      labels:\n        app: myapp\n    spec:\n      containers:\n        - name: myapp\n          image: username/myapp:v1.2.3  # Pakai tag spesifik, bukan latest!\n          ports:\n            - containerPort: 3000\n          env:\n            - name: NODE_ENV\n              value: production\n            - name: MONGO_URI\n              valueFrom:\n                secretKeyRef:\n                  name: myapp-secrets\n                  key: mongo-uri\n          resources:\n            requests:\n              memory: "128Mi"\n              cpu: "100m"\n            limits:\n              memory: "512Mi"\n              cpu: "500m"\n          readinessProbe:\n            httpGet: { path: /health, port: 3000 }\n            initialDelaySeconds: 10\n          livenessProbe:\n            httpGet: { path: /health, port: 3000 }\n            periodSeconds: 30`,
      },
      {
        n: 3,
        t: 'Service dan Ingress — expose ke internet:',
        code: `# service.yaml:\napiVersion: v1\nkind: Service\nmetadata:\n  name: myapp-svc\nspec:\n  selector:\n    app: myapp\n  ports:\n    - port: 80\n      targetPort: 3000\n  type: ClusterIP  # Internal only; Ingress handle eksternal\n\n---\n# ingress.yaml:\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: myapp-ingress\n  annotations:\n    nginx.ingress.kubernetes.io/rate-limit: "100"\n    cert-manager.io/cluster-issuer: letsencrypt-prod\nspec:\n  tls:\n    - hosts: [app.domainku.com]\n      secretName: myapp-tls\n  rules:\n    - host: app.domainku.com\n      http:\n        paths:\n          - path: /\n            pathType: Prefix\n            backend:\n              service:\n                name: myapp-svc\n                port: { number: 80 }`,
      },
      {
        n: 4,
        t: 'Horizontal Pod Autoscaler (HPA) — auto-scale:',
        code: `# hpa.yaml:\napiVersion: autoscaling/v2\nkind: HorizontalPodAutoscaler\nmetadata:\n  name: myapp-hpa\nspec:\n  scaleTargetRef:\n    apiVersion: apps/v1\n    kind: Deployment\n    name: myapp\n  minReplicas: 2\n  maxReplicas: 20\n  metrics:\n    - type: Resource\n      resource:\n        name: cpu\n        target:\n          type: Utilization\n          averageUtilization: 70  # Scale up jika CPU > 70%\n    - type: Resource\n      resource:\n        name: memory\n        target:\n          type: Utilization\n          averageUtilization: 80\n\n# Apply semua:\nkubectl apply -f deployment.yaml\nkubectl apply -f service.yaml\nkubectl apply -f ingress.yaml\nkubectl apply -f hpa.yaml`,
      },
      {
        n: 5,
        t: 'Perintah kubectl sehari-hari dan troubleshooting:',
        code: `# Lihat status:\nkubectl get pods -n production\nkubectl get deployments\nkubectl get services\nkubectl get hpa\n\n# Detail dan logs:\nkubectl describe pod myapp-xxx-yyy -n production\nkubectl logs myapp-xxx-yyy -f         # Follow log\nkubectl logs myapp-xxx-yyy --previous  # Log sebelum restart\n\n# Debug langsung masuk pod:\nkubectl exec -it myapp-xxx-yyy -- sh\n\n# Rolling update:\nkubectl set image deployment/myapp myapp=username/myapp:v1.3.0\nkubectl rollout status deployment/myapp\nkubectl rollout history deployment/myapp\nkubectl rollout undo deployment/myapp  # Rollback!\n\n# Scale manual:\nkubectl scale deployment myapp --replicas=10\n\n# Secrets:\nkubectl create secret generic myapp-secrets \\\n  --from-literal=mongo-uri='mongodb+srv://...' \\\n  --from-literal=jwt-secret='supersecret'`,
        tip: 'Gunakan Helm untuk manage Kubernetes manifests sebagai "packages". ArgoCD atau Flux untuk GitOps — deploy otomatis setiap push ke git.',
      },
    ],
  },

  {
    id: 'monitoring',
    ic: 'MON',
    badge: 'Expert',
    title: 'Monitoring & Observability — PM2, Prometheus, Grafana',
    time: '40 menit',
    desc: 'Setup sistem monitoring lengkap: metrics, logging terpusat, alerting, dan distributed tracing.',
    steps: [
      {
        n: 1,
        t: 'Tiga pilar Observability — Metrics, Logs, Traces:',
        code: `# Metrics  — "Apa yang terjadi?" → angka (CPU, req/s, error rate)\n# Logs     — "Kenapa terjadi?" → teks detail per event\n# Traces   — "Di mana terjadi?" → alur request antar service\n\n# Tools:\n# PM2           — Process management + basic metrics\n# Prometheus    — Metrics collection & storage\n# Grafana       — Visualization & alerting\n# Loki          — Log aggregation (by Grafana Labs)\n# Jaeger        — Distributed tracing\n# Winston       — Structured logging Node.js\n\n# Stack sederhana (gratis):\n# PM2 + Winston + Grafana Cloud (free tier)`,
      },
      {
        n: 2,
        t: 'Structured logging dengan Winston:',
        code: `npm install winston winston-daily-rotate-file\n\n// utils/logger.js:\nconst { createLogger, format, transports } = require('winston');\nconst DailyRotateFile = require('winston-daily-rotate-file');\n\nconst logger = createLogger({\n  level: process.env.LOG_LEVEL || 'info',\n  format: format.combine(\n    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),\n    format.errors({ stack: true }),\n    format.json()  // Structured JSON — mudah di-parse\n  ),\n  transports: [\n    new transports.Console({\n      format: format.combine(\n        format.colorize(),\n        format.simple()\n      )\n    }),\n    new DailyRotateFile({\n      filename: 'logs/app-%DATE%.log',\n      datePattern: 'YYYY-MM-DD',\n      maxSize: '20m',\n      maxFiles: '30d',  // Simpan 30 hari\n    }),\n    new DailyRotateFile({\n      filename: 'logs/error-%DATE%.log',\n      level: 'error',\n    })\n  ]\n});\n\nmodule.exports = logger;\n\n// Pakai:\nlogger.info('Server started', { port: 3000 });\nlogger.error('DB connection failed', { err: error.message, stack: error.stack });\nlogger.warn('Rate limit reached', { ip, endpoint: req.path });`,
      },
      {
        n: 3,
        t: 'Prometheus metrics untuk Node.js Express:',
        code: `npm install prom-client\n\n// middleware/metrics.js:\nconst client = require('prom-client');\n\n// Default metrics (CPU, memory, event loop lag, dll):\nclient.collectDefaultMetrics({ prefix: 'myapp_' });\n\n// Custom metrics:\nconst httpRequestsTotal = new client.Counter({\n  name: 'myapp_http_requests_total',\n  help: 'Total HTTP requests',\n  labelNames: ['method', 'route', 'status'],\n});\n\nconst httpRequestDuration = new client.Histogram({\n  name: 'myapp_http_request_duration_seconds',\n  help: 'HTTP request duration in seconds',\n  labelNames: ['method', 'route'],\n  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],\n});\n\n// Middleware:\nexports.metricsMiddleware = (req, res, next) => {\n  const start = Date.now();\n  res.on('finish', () => {\n    const duration = (Date.now() - start) / 1000;\n    const route = req.route?.path || req.path;\n    httpRequestsTotal.inc({ method: req.method, route, status: res.statusCode });\n    httpRequestDuration.observe({ method: req.method, route }, duration);\n  });\n  next();\n};\n\n// Expose metrics endpoint:\nexports.metricsHandler = async (req, res) => {\n  res.set('Content-Type', client.register.contentType);\n  res.end(await client.register.metrics());\n};`,
      },
      {
        n: 4,
        t: 'Setup Prometheus + Grafana dengan Docker Compose:',
        code: `# docker-compose.monitoring.yml:\nversion: '3.8'\nservices:\n  prometheus:\n    image: prom/prometheus:latest\n    volumes:\n      - ./prometheus.yml:/etc/prometheus/prometheus.yml\n      - prom_data:/prometheus\n    ports: ['9090:9090']\n    command:\n      - '--config.file=/etc/prometheus/prometheus.yml'\n      - '--storage.tsdb.retention.time=30d'\n\n  grafana:\n    image: grafana/grafana:latest\n    ports: ['3001:3000']\n    environment:\n      GF_SECURITY_ADMIN_PASSWORD: admin123\n    volumes:\n      - grafana_data:/var/lib/grafana\n    depends_on: [prometheus]\n\nvolumes:\n  prom_data:\n  grafana_data:\n\n# prometheus.yml:\nglobal:\n  scrape_interval: 15s\nscrape_configs:\n  - job_name: 'myapp'\n    static_configs:\n      - targets: ['host.docker.internal:3000']\n    metrics_path: '/metrics'`,
      },
      {
        n: 5,
        t: 'Alerting dan Health check dashboard:',
        code: `# prometheus-rules.yml:\ngroups:\n  - name: myapp\n    rules:\n      - alert: HighErrorRate\n        expr: rate(myapp_http_requests_total{status=~"5.."}[5m]) > 0.05\n        for: 2m\n        labels:\n          severity: critical\n        annotations:\n          summary: "Error rate > 5% selama 2 menit"\n\n      - alert: HighLatency\n        expr: histogram_quantile(0.95, myapp_http_request_duration_seconds_bucket) > 1\n        for: 5m\n        annotations:\n          summary: "P95 latency > 1 detik"\n\n      - alert: PodDown\n        expr: up{job="myapp"} == 0\n        for: 1m\n        labels:\n          severity: critical\n\n# Alertmanager — kirim ke Telegram:\nreceivers:\n  - name: telegram\n    telegram_configs:\n      - bot_token: TOKEN\n        chat_id: CHAT_ID\n        message: ||\n          🚨 Alert: {{ .GroupLabels.alertname }}\n          {{ .CommonAnnotations.summary }}`,
        tip: 'Import Grafana Dashboard ID 1860 (Node Exporter Full) untuk server metrics dan ID 14282 untuk Node.js app metrics. Setup alert ke Telegram untuk critical alerts.',
      },
    ],
  },

  {
    id: 'database-optimization',
    ic: 'OPT',
    badge: 'Expert',
    title: 'Database Optimization — Index, Query & Scaling',
    time: '40 menit',
    desc: 'Teknik optimasi database MongoDB & PostgreSQL: indexing, query analysis, sharding, dan replication.',
    steps: [
      {
        n: 1,
        t: 'MongoDB — Explain dan identifikasi slow query:',
        code: `// Cek semua query yang lambat:\n// mongodb.conf:\noperationProfiling:\n  slowOpThresholdMs: 100\n  mode: slowOp\n\n// Di shell:\ndb.setProfilingLevel(1, { slowms: 100 });\ndb.system.profile.find().sort({ ts: -1 }).limit(10).pretty();\n\n// Analyze query plan:\ndb.users.find({ email: 'test@mail.com' }).explain('executionStats');\n// Cek: executionStats.executionStages.stage\n// COLLSCAN = full scan = LAMBAT!\n// IXSCAN   = pakai index = CEPAT!\n\n// Mongoose:\nconst result = await User.find({ email }).explain('executionStats');`,
      },
      {
        n: 2,
        t: 'MongoDB Indexing strategy:',
        code: `// Single field index:\ndb.users.createIndex({ email: 1 });         // Ascending\ndb.posts.createIndex({ createdAt: -1 });    // Descending (sort)\n\n// Compound index — urutan SANGAT penting!\ndb.posts.createIndex({ authorId: 1, createdAt: -1 });\n// Bisa pakai untuk: { authorId } atau { authorId, createdAt }\n// TIDAK bisa untuk: { createdAt } saja\n\n// Text search index:\ndb.posts.createIndex({ title: 'text', content: 'text' });\ndb.posts.find({ $text: { $search: 'nodejs tutorial' } });\n\n// Partial index — hanya index sebagian dokumen:\ndb.orders.createIndex({ status: 1 }, { partialFilterExpression: { status: 'pending' } });\n\n// Unique index:\ndb.users.createIndex({ email: 1 }, { unique: true });\n\n// Mongoose schema (rekomendasi — define di schema):\nconst UserSchema = new mongoose.Schema({\n  email: { type: String, index: true, unique: true },\n  createdAt: { type: Date, index: true },\n});`,
      },
      {
        n: 3,
        t: 'PostgreSQL — EXPLAIN ANALYZE dan indexing:',
        code: `-- Analyze slow query:\nEXPLAIN ANALYZE\nSELECT u.name, COUNT(p.id) as post_count\nFROM users u\nJOIN posts p ON p.author_id = u.id\nWHERE u.created_at > NOW() - INTERVAL '30 days'\nGROUP BY u.id;\n\n-- Cek: Seq Scan = LAMBAT, Index Scan = CEPAT\n\n-- Buat index:\nCREATE INDEX idx_users_created_at ON users (created_at DESC);\nCREATE INDEX idx_posts_author_id ON posts (author_id);\n\n-- Compound index:\nCREATE INDEX idx_posts_author_published ON posts (author_id, published, created_at DESC);\n\n-- Partial index (lebih kecil, lebih cepat):\nCREATE INDEX idx_orders_pending ON orders (created_at)\nWHERE status = 'pending';\n\n-- Full text search:\nCREATE INDEX idx_posts_search ON posts USING GIN (to_tsvector('english', title || ' ' || content));\nSELECT * FROM posts WHERE to_tsvector('english', title) @@ to_tsquery('nodejs');`,
      },
      {
        n: 4,
        t: 'Query optimization patterns:',
        code: `// ❌ N+1 Problem (sangat umum!):\nconst users = await User.find();\nfor (const user of users) {\n  user.posts = await Post.find({ authorId: user._id }); // N query!\n}\n\n// ✅ Solusi: populate atau aggregate:\nconst users = await User.find().populate('posts'); // 2 query total\n\n// ✅ Aggregate pipeline untuk complex query:\nconst result = await User.aggregate([\n  { $match: { role: 'user' } },\n  { $lookup: { from: 'posts', localField: '_id', foreignField: 'authorId', as: 'posts' } },\n  { $addFields: { postCount: { $size: '$posts' } } },\n  { $project: { name: 1, email: 1, postCount: 1 } },\n  { $sort: { postCount: -1 } },\n  { $limit: 10 }\n]);\n\n// Pagination yang benar — JANGAN offset untuk data besar:\n// Cursor-based pagination (lebih cepat):\nconst posts = await Post\n  .find({ _id: { $lt: lastId } })  // Cursor\n  .sort({ _id: -1 })\n  .limit(20);`,
      },
      {
        n: 5,
        t: 'Connection pooling, replication, dan caching strategy:',
        code: `// Mongoose connection pool:\nmongoose.connect(process.env.MONGO_URI, {\n  maxPoolSize: 10,       // Max connections dalam pool\n  minPoolSize: 2,        // Min connections\n  socketTimeoutMS: 30000,\n  serverSelectionTimeoutMS: 5000,\n});\n\n// MongoDB Read Preference — baca dari replica (scale reads):\nconst users = await User.find()\n  .read('secondaryPreferred'); // Baca dari secondary replica\n\n// Caching strategy — Cache Aside:\nconst getUser = async (id) => {\n  const cacheKey = \`user:\${id}\`;\n  let user = await redis.get(cacheKey);\n  if (user) return JSON.parse(user);\n\n  user = await User.findById(id).lean();\n  if (user) await redis.setex(cacheKey, 300, JSON.stringify(user));\n  return user;\n};\n\nconst updateUser = async (id, data) => {\n  const user = await User.findByIdAndUpdate(id, data, { new: true });\n  await redis.del(\`user:\${id}\`);  // Invalidate cache!\n  return user;\n};`,
        tip: 'Rule of thumb: index field yang sering ada di WHERE, ORDER BY, dan JOIN. Terlalu banyak index memperlambat write. Monitor slow queries di production dan tambah index berdasarkan data nyata.',
      },
    ],
  },

  {
    id: 'system-design',
    ic: 'SYS',
    badge: 'Expert',
    title: 'System Design — Arsitektur untuk Skala Besar',
    time: '60 menit',
    desc: 'Prinsip-prinsip system design: CAP theorem, load balancing, caching layers, dan design real-world systems.',
    steps: [
      {
        n: 1,
        t: 'Framework berpikir system design (wajib hafal):',
        code: `// SETIAP system design interview / desain nyata, tanya dulu:\n// 1. Functional requirements — Fitur apa yang dibutuhkan?\n// 2. Non-functional requirements — Scale, latency, availability?\n// 3. Estimasi scale:\n//    - DAU (Daily Active Users)\n//    - Read/Write ratio\n//    - Storage per tahun\n//    - Bandwidth\n\n// Contoh estimasi Twitter-like:\nconst DAU = 100_000_000;          // 100 juta pengguna/hari\nconst tweetsPerDay = DAU * 5;     // 500 juta tweet/hari\nconst tps = tweetsPerDay / 86400; // ~5800 tweets/second (write)\nconst readMultiplier = 100;       // Read >> Write\nconst readTPS = tps * readMultiplier; // ~580,000 reads/second\n\nconst tweetSize = 300;            // bytes\nconst storagePerDay = tweetsPerDay * tweetSize; // ~150 GB/hari\nconst storagePerYear = storagePerDay * 365;     // ~55 TB/tahun`,
      },
      {
        n: 2,
        t: 'CAP Theorem dan pilihan database:',
        code: `// CAP Theorem:\n// C = Consistency   — Semua node lihat data yang sama\n// A = Availability  — Setiap request dapat response\n// P = Partition Tolerance — Sistem tetap jalan saat network partition\n\n// Rule: Distributed system SELALU harus toleran partisi (P).\n// Jadi pilihan adalah: CP atau AP\n\n// CP (Consistency > Availability):\n// → Zookeeper, HBase, Redis (default)\n// → Cocok: financial transactions, inventory\n\n// AP (Availability > Consistency):\n// → Cassandra, DynamoDB, CouchDB\n// → Cocok: social feed, analytics, DNS\n\n// Database berdasarkan use case:\n// Relational (ACID):   PostgreSQL, MySQL → financial, ERP\n// Document:            MongoDB → CMS, catalog\n// Key-Value:           Redis, DynamoDB → session, cache\n// Time-series:         InfluxDB, TimescaleDB → metrics, IoT\n// Search:              Elasticsearch → full-text search\n// Graph:               Neo4j → social network, recommendation`,
      },
      {
        n: 3,
        t: 'Caching strategy — multi-layer caching:',
        code: `// Layer 1: Browser/Client cache\n// Cache-Control: max-age=3600, stale-while-revalidate=60\n\n// Layer 2: CDN (Cloudflare, CloudFront)\n// Static assets, edge caching\n\n// Layer 3: Reverse proxy cache (Nginx)\nlocation /api/public {\n    proxy_cache_valid 200 5m;\n    add_header X-Cache-Status $upstream_cache_status;\n}\n\n// Layer 4: Application cache (Redis)\nasync function getTrendingPosts() {\n  const key = 'trending:posts';\n  const cached = await redis.get(key);\n  if (cached) return JSON.parse(cached);\n\n  const posts = await Post.find().sort('-views').limit(10).lean();\n  await redis.setex(key, 300, JSON.stringify(posts));\n  return posts;\n}\n\n// Layer 5: Database query cache\n// PostgreSQL: shared_buffers, pg_bouncer\n// MongoDB: WiredTiger cache (50% RAM default)\n\n// Cache invalidation strategies:\n// TTL-based:    set expire time (eventual consistency)\n// Write-through: update cache saat write (strong consistency)\n// Write-behind: buffer writes ke cache, async ke DB`,
      },
      {
        n: 4,
        t: 'URL Shortener — contoh desain nyata:',
        code: `// Requirement: Desain bit.ly clone\n// DAU: 100 juta, ratio read:write = 100:1\n\n// Key design decision: Bagaimana generate short URL?\n\n// Opsi 1: Hash (MD5) + truncate\nconst hash = crypto.createHash('md5').update(longUrl).digest('hex').slice(0, 7);\n// ❌ Collision possible!\n\n// Opsi 2: Base62 encode dari counter (recommended)\n// Counter service (atomic increment) → encode ke base62\nconst BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';\nfunction encodeBase62(num) {\n  let result = '';\n  while (num > 0) {\n    result = BASE62[num % 62] + result;\n    num = Math.floor(num / 62);\n  }\n  return result.padStart(7, '0');  // 7 chars = 62^7 = 3.5 triliun URLs\n}\n\n// Counter: Redis INCR (atomic)\nconst id = await redis.incr('url:counter');\nconst shortCode = encodeBase62(id);\nawait redis.setex(\`url:\${shortCode}\`, 365 * 24 * 3600, longUrl);\n\n// Redirect handler (harus sangat cepat!):\napp.get('/:code', async (req, res) => {\n  const longUrl = await redis.get(\`url:\${req.params.code}\`);\n  if (!longUrl) return res.status(404).send('Not found');\n  res.redirect(301, longUrl);  // 301 cache di browser\n  // Async analytics update (jangan block redirect):\n  setImmediate(() => updateAnalytics(req.params.code, req.ip));\n});`,
      },
      {
        n: 5,
        t: 'Rate limiting terdistribusi dan circuit breaker:',
        code: `// Token Bucket algorithm (distributed, Redis):\nconst tokenBucket = async (userId, capacity = 100, refillRate = 10) => {\n  const key = \`bucket:\${userId}\`;\n  const now = Date.now() / 1000;\n\n  const script = \`\n    local tokens = tonumber(redis.call('get', KEYS[1] .. ':tokens') or ARGV[1])\n    local last = tonumber(redis.call('get', KEYS[1] .. ':last') or ARGV[3])\n    local delta = math.max(0, ARGV[3] - last)\n    local newTokens = math.min(ARGV[1], tokens + delta * ARGV[2])\n    if newTokens < 1 then\n      return 0\n    end\n    redis.call('setex', KEYS[1] .. ':tokens', 3600, newTokens - 1)\n    redis.call('setex', KEYS[1] .. ':last', 3600, ARGV[3])\n    return 1\n  \`;\n  return await redis.eval(script, 1, key, capacity, refillRate, now);\n};\n\n// Circuit Breaker pattern (mencegah cascade failure):\nclass CircuitBreaker {\n  constructor(fn, threshold = 5, timeout = 60000) {\n    this.fn = fn;\n    this.failures = 0;\n    this.threshold = threshold;\n    this.state = 'CLOSED'; // CLOSED → OPEN → HALF-OPEN\n    this.nextRetry = null;\n  }\n  async call(...args) {\n    if (this.state === 'OPEN') {\n      if (Date.now() < this.nextRetry) throw new Error('Circuit breaker OPEN');\n      this.state = 'HALF-OPEN';\n    }\n    try {\n      const result = await this.fn(...args);\n      this.failures = 0;\n      this.state = 'CLOSED';\n      return result;\n    } catch (err) {\n      this.failures++;\n      if (this.failures >= this.threshold) {\n        this.state = 'OPEN';\n        this.nextRetry = Date.now() + this.timeout;\n      }\n      throw err;\n    }\n  }\n}`,
        tip: 'System design bukan tentang hafal arsitektur, tapi tentang trade-off. Selalu diskusikan mengapa pilih A bukan B, dan apa konsekuensinya. Baca: "Designing Data-Intensive Applications" oleh Martin Kleppmann.',
      },
    ],
  },

  {
    id: 'ci-cd-advanced',
    ic: 'CD',
    badge: 'Expert',
    title: 'Advanced CI/CD — GitOps, Blue-Green & Canary Deploy',
    time: '45 menit',
    desc: 'Strategi deployment lanjutan: blue-green deployment, canary release, GitOps dengan ArgoCD.',
    steps: [
      {
        n: 1,
        t: 'Deployment strategies — tradeoffs:',
        code: `// Recreate — down saat deploy:\n// Stop v1 → Start v2\n// ✅ Sederhana, tidak butuh resource ekstra\n// ❌ Downtime!\n\n// Rolling Update — default Kubernetes:\n// v1 x3 → v1 x2 + v2 x1 → v1 x1 + v2 x2 → v2 x3\n// ✅ Zero downtime, tidak butuh 2x resource\n// ❌ Sementara dua versi jalan bersamaan\n\n// Blue-Green — instant switch:\n// Blue (v1) aktif → Deploy Green (v2) → Switch traffic → Hapus Blue\n// ✅ Instant rollback, zero downtime\n// ❌ Butuh 2x resource\n\n// Canary — gradual rollout:\n// v1 100% → v1 90% + v2 10% → v1 50% + v2 50% → v2 100%\n// ✅ Test di subset user nyata, rollback mudah\n// ❌ Kompleks, butuh monitoring bagus`,
      },
      {
        n: 2,
        t: 'Blue-Green Deployment dengan Nginx:',
        code: `# Dua environment berjalan bersamaan:\n# Blue: app-blue (v1) — saat ini aktif\n# Green: app-green (v2) — baru deploy\n\n# nginx.conf:\nupstream active {\n    server app-blue:3000;  # Switch ke app-green:3000 untuk switch!\n}\n\n# Script deploy blue-green:\n#!/bin/bash\nNEW_VERSION=$1\nCURRENT=$(grep 'server app-' nginx.conf | awk '{print $2}' | cut -d: -f1)\n\nif [ "$CURRENT" = "app-blue" ]; then\n  DEPLOY_TO="app-green"\n  SWITCH_TO="app-green"\nelse\n  DEPLOY_TO="app-blue"\n  SWITCH_TO="app-blue"\nfi\n\necho "Deploying to $DEPLOY_TO..."\ndocker pull myapp:$NEW_VERSION\ndocker stop $DEPLOY_TO || true\ndocker run -d --name $DEPLOY_TO myapp:$NEW_VERSION\n\n# Health check sebelum switch:\nfor i in {1..10}; do\n  HTTP=$(curl -s -o /dev/null -w "%{http_code}" http://$DEPLOY_TO:3000/health)\n  if [ "$HTTP" = "200" ]; then\n    echo "Healthy! Switching traffic..."\n    sed -i "s/server app-.*/server $SWITCH_TO:3000;/" nginx.conf\n    nginx -s reload\n    echo "✅ Deploy selesai!"\n    exit 0\n  fi\n  sleep 5\ndone\necho "❌ Health check gagal! Rollback..."\ndocker stop $DEPLOY_TO`,
      },
      {
        n: 3,
        t: 'Canary deployment dengan Nginx weighted upstream:',
        code: `# nginx.conf — canary: 10% traffic ke v2:\nupstream backend {\n    server app-v1:3000 weight=9;  # 90% traffic\n    server app-v2:3000 weight=1;  # 10% canary\n}\n\n# Atau berdasarkan header (targeted canary):\nmap $http_x_canary $backend_pool {\n    "true"  canary_pool;\n    default stable_pool;\n}\n\nupstream stable_pool { server app-v1:3000; }\nupstream canary_pool  { server app-v2:3000; }\n\nserver {\n    location / {\n        proxy_pass http://$backend_pool;\n    }\n}\n\n# Script gradual rollout:\n# Phase 1: 10%  — monitor 30 menit\n# Phase 2: 25%  — monitor 1 jam\n# Phase 3: 50%  — monitor 2 jam\n# Phase 4: 100% — full production`,
      },
      {
        n: 4,
        t: 'GitOps dengan ArgoCD — deploy dari Git state:',
        code: `# GitOps principle:\n# Git adalah single source of truth untuk infrastructure\n# Tidak ada manual kubectl apply — semua lewat Git!\n\n# Install ArgoCD:\nkubectl create namespace argocd\nkubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml\n\n# Buat Application manifest (infra-repo/apps/myapp.yaml):\napiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: myapp\n  namespace: argocd\nspec:\n  project: default\n  source:\n    repoURL: https://github.com/username/infra-repo.git\n    path: manifests/myapp\n    targetRevision: HEAD\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: production\n  syncPolicy:\n    automated:\n      prune: true     # Hapus resource yang dihapus dari Git\n      selfHeal: true  # Auto-fix drift dari desired state`,
      },
      {
        n: 5,
        t: 'Image promotion workflow — dev → staging → production:',
        code: `# Workflow GitOps lengkap:\n# 1. Developer push ke feature branch\n# 2. CI: test + build + push image ke registry dengan tag commit SHA\n# 3. CI: update manifests di infra-repo (image tag)\n# 4. ArgoCD detect perubahan → auto-deploy ke staging\n# 5. QA approve → PR merge ke main\n# 6. Manual sync atau auto-deploy ke production\n\n# GitHub Actions — update image tag di infra-repo:\n- name: Update image tag in infra repo\n  run: |\n    git clone https://x-access-token:\${​{ secrets.INFRA_TOKEN }}@github.com/username/infra-repo\n    cd infra-repo\n    # Update image tag di manifest:\n    sed -i "s|image: username/myapp:.*|image: username/myapp:\${​{ github.sha }}|" \\\n      manifests/myapp/deployment.yaml\n    git config user.email "ci@domain.com"\n    git config user.name "CI Bot"\n    git add . && git commit -m "chore: update myapp to \${​{ github.sha }}"\n    git push\n    # ArgoCD otomatis detect dan deploy!`,
        tip: 'GitOps memberi audit trail lengkap — setiap deployment tercatat di Git history dengan author, timestamp, dan perubahan. Rollback = revert commit di Git.',
      },
    ],
  },

  {
    id: 'performance-optimization',
    ic: 'PERF',
    badge: 'Expert',
    title: 'Performance Optimization — Node.js di Production',
    time: '40 menit',
    desc: 'Profiling, memory leak detection, cluster mode, streaming, dan teknik optimasi lanjutan Node.js.',
    steps: [
      {
        n: 1,
        t: 'Profiling dan menemukan bottleneck:',
        code: `# Built-in Node.js profiler:\nnode --prof server.js\n# Jalankan load test, lalu Ctrl+C\nnode --prof-process isolate-*.log > profile.txt\ncat profile.txt  # Lihat fungsi paling banyak makan CPU\n\n# Clinic.js — visual profiling terbaik untuk Node.js:\nnpm install -g @clinic/clinic\nclinic doctor -- node server.js  # Overview: CPU, memory, event loop\nclinic flame  -- node server.js  # Flamegraph CPU profiling\nclinic bubbleprof -- node server.js  # Async bottleneck\n\n# Autocannon — HTTP load testing:\nnpm install -g autocannon\nautocannon -c 100 -d 30 http://localhost:3000/api/users\n# -c: connections, -d: durasi detik\n# Lihat: req/sec, latency P99, error rate`,
      },
      {
        n: 2,
        t: 'Deteksi dan fix memory leak:',
        code: `# Gejala memory leak:\n# - Memory terus naik, tidak pernah turun\n# - App makin lambat seiring waktu\n# - Akhirnya OOM crash\n\n# Monitoring memory:\nconst used = process.memoryUsage();\nconsole.log({\n  rss: (used.rss / 1024 / 1024).toFixed(2) + ' MB',       // Total memory\n  heapUsed: (used.heapUsed / 1024 / 1024).toFixed(2) + ' MB', // Heap yang dipakai\n  heapTotal: (used.heapTotal / 1024 / 1024).toFixed(2) + ' MB', // Total heap\n  external: (used.external / 1024 / 1024).toFixed(2) + ' MB',   // C++ objects\n});\n\n// Common causes:\n// 1. Global array/object yang terus tumbuh:\nconst cache = {};  // ❌ Tidak pernah dibersihkan!\n// ✅ Gunakan Redis dengan TTL atau LRU cache:\nconst LRU = require('lru-cache');\nconst cache = new LRU({ max: 1000, ttl: 1000 * 60 * 5 });\n\n// 2. Event listener tidak di-remove:\nconst handler = () => {};\neventEmitter.on('data', handler);\n// ✅ Cleanup:\neventEmitter.off('data', handler);  // Di akhir lifecycle\n\n// 3. Closure yang menahan reference:\n// 4. setTimeout/setInterval tidak di-clear`,
      },
      {
        n: 3,
        t: 'Cluster mode dan Worker Threads:',
        code: `// Cluster mode — gunakan semua CPU core:\n// Satu CPU core = satu Node.js thread\nconst cluster = require('cluster');\nconst numCPUs = require('os').cpus().length;\n\nif (cluster.isPrimary) {\n  console.log(\`Master \${process.pid} — Fork \${numCPUs} workers\`);\n  for (let i = 0; i < numCPUs; i++) cluster.fork();\n  cluster.on('exit', (worker) => {\n    console.log(\`Worker \${worker.process.pid} died. Respawning...\`);\n    cluster.fork(); // Auto-respawn!\n  });\n} else {\n  // Setiap worker jalankan server:\n  require('./server');\n  console.log(\`Worker \${process.pid} started\`);\n}\n\n// PM2 otomatis handle ini:\npm2 start server.js -i max  # -i max = gunakan semua CPU\n\n// Worker Threads — untuk CPU-intensive tasks:\nconst { Worker, isMainThread, parentPort, workerData } = require('worker_threads');\n\nif (isMainThread) {\n  // Main thread:\n  const worker = new Worker(__filename, { workerData: { n: 40 } });\n  worker.on('message', (result) => console.log('Fibonacci:', result));\n} else {\n  // Worker thread:\n  const fib = (n) => n <= 1 ? n : fib(n-1) + fib(n-2);\n  parentPort.postMessage(fib(workerData.n)); // Tidak block main thread!\n}`,
      },
      {
        n: 4,
        t: 'Streaming — proses data besar tanpa load ke memory:',
        code: `const fs = require('fs');\nconst { pipeline } = require('stream/promises');\nconst { createGzip } = require('zlib');\n\n// ❌ Load seluruh file ke memory (crash untuk file besar!):\napp.get('/download-bad', async (req, res) => {\n  const data = fs.readFileSync('./huge-file.csv'); // 1GB → OOM!\n  res.send(data);\n});\n\n// ✅ Stream — memory konstan berapa pun ukuran file:\napp.get('/download', async (req, res) => {\n  res.setHeader('Content-Encoding', 'gzip');\n  res.setHeader('Content-Type', 'text/csv');\n  res.setHeader('Content-Disposition', 'attachment; filename="data.csv.gz"');\n\n  await pipeline(\n    fs.createReadStream('./huge-file.csv'),\n    createGzip(),\n    res\n  );\n});\n\n// Stream database cursor (MongoDB):\napp.get('/export', async (req, res) => {\n  res.setHeader('Content-Type', 'application/json');\n  res.write('[');\n  let first = true;\n  const cursor = User.find().lean().cursor(); // Stream cursor!\n  for await (const user of cursor) {\n    if (!first) res.write(',');\n    res.write(JSON.stringify(user));\n    first = false;\n  }\n  res.end(']');\n});`,
      },
      {
        n: 5,
        t: 'Response compression, HTTP/2, dan connection pooling:',
        code: `npm install compression\n\n// Gzip/Brotli compression:\nconst compression = require('compression');\napp.use(compression({\n  level: 6,        // 1-9, default 6 (balance speed vs ratio)\n  threshold: 1024, // Hanya compress > 1KB\n  filter: (req, res) => {\n    if (req.headers['x-no-compression']) return false;\n    return compression.filter(req, res);\n  }\n}));\n// Tipically mengurangi response size 60-80%!\n\n// HTTP/2 — multiplexing, header compression:\nconst http2 = require('http2');\nconst fs = require('fs');\nconst server = http2.createSecureServer({\n  key: fs.readFileSync('server.key'),\n  cert: fs.readFileSync('server.crt'),\n});\n// Atau gunakan Nginx dengan http2 (lebih mudah)\n\n// Mongoose connection pooling (sudah built-in):\nmongoose.connect(uri, { maxPoolSize: 10 });\n\n// Axios keep-alive (reuse TCP connections):\nconst { Agent } = require('https');\nconst axios_instance = axios.create({\n  httpsAgent: new Agent({ keepAlive: true })\n});`,
        tip: 'Benchmark dulu sebelum optimize! "Premature optimization is the root of all evil". Gunakan autocannon atau k6 untuk load test. Fokus pada P99 latency dan error rate, bukan hanya average.',
      },
    ],
  },

];

// ── HELPER: filter berdasarkan badge ────────────────────────
export const getByLevel = (level) => TUTORIALS_DB.filter(t => t.badge === level);
export const getLevels = () => [...new Set(TUTORIALS_DB.map(t => t.badge))];
export const getById = (id) => TUTORIALS_DB.find(t => t.id === id);
export const search = (query) => {
  const q = query.toLowerCase();
  return TUTORIALS_DB.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.desc.toLowerCase().includes(q) ||
    t.id.toLowerCase().includes(q)
  );
};

// ── STATS ───────────────────────────────────────────────────
export const STATS = {
  total: TUTORIALS_DB.length,
  byLevel: {
    Beginner:     TUTORIALS_DB.filter(t => t.badge === 'Beginner').length,
    Intermediate: TUTORIALS_DB.filter(t => t.badge === 'Intermediate').length,
    Advanced:     TUTORIALS_DB.filter(t => t.badge === 'Advanced').length,
    Expert:       TUTORIALS_DB.filter(t => t.badge === 'Expert').length,
  },
  totalSteps: TUTORIALS_DB.reduce((sum, t) => sum + t.steps.length, 0),
};