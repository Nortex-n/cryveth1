export const ERRORS_TABS = [
  {id:'js',        label:'JavaScript',     color:'#ffd166'},
  {id:'nodejs',    label:'Node.js',        color:'#00f5a0'},
  {id:'python',    label:'Python',         color:'#4fc3f7'},
  {id:'html',      label:'HTML',           color:'#ff8c00'},
  {id:'css',       label:'CSS',            color:'#f72585'},
  {id:'java',      label:'Java',           color:'#ff7043'},
  {id:'tgbot',     label:'Telegram Bot',   color:'#00e5ff'},
  {id:'sql',       label:'SQL',            color:'#ff9100'},
  {id:'go',        label:'Go',             color:'#00acd7'},
  {id:'rust',      label:'Rust',           color:'#dea584'},
  {id:'ts',        label:'TypeScript',     color:'#3178c6'},
  {id:'php',       label:'PHP',            color:'#8892be'},
  {id:'csharp',    label:'C#',             color:'#9b59b6'},
  {id:'cpp',       label:'C++',            color:'#00599c'},
  {id:'c',         label:'C',              color:'#a8b9cc'},
  {id:'ruby',      label:'Ruby',           color:'#cc342d'},
  {id:'swift',     label:'Swift',          color:'#f05138'},
  {id:'kotlin',    label:'Kotlin',         color:'#7f52ff'},
  {id:'dart',      label:'Dart/Flutter',   color:'#0175c2'},
  {id:'react',     label:'React',          color:'#61dafb'},
  {id:'vue',       label:'Vue.js',         color:'#42b883'},
  {id:'nextjs',    label:'Next.js',        color:'#ffffff'},
  {id:'express',   label:'Express.js',     color:'#68d391'},
  {id:'django',    label:'Django',         color:'#092e20'},
  {id:'flask',     label:'Flask',          color:'#000000'},
  {id:'spring',    label:'Spring Boot',    color:'#6db33f'},
  {id:'dotnet',    label:'.NET / ASP.NET', color:'#512bd4'},
  {id:'docker',    label:'Docker',         color:'#2496ed'},
  {id:'git',       label:'Git',            color:'#f05032'},
  {id:'bash',      label:'Bash/Shell',     color:'#89e051'},
  {id:'regex',     label:'Regex',          color:'#ff6b6b'},
  {id:'json',      label:'JSON',           color:'#fcba03'},
  {id:'yaml',      label:'YAML',           color:'#cb171e'},
  {id:'graphql',   label:'GraphQL',        color:'#e535ab'},
  {id:'rest',      label:'REST API',       color:'#ff9500'},
  {id:'waproto',   label:'WA Proto/Baileys',color:'#25d366'},
  {id:'mongodb',   label:'MongoDB',        color:'#47a248'},
  {id:'redis',     label:'Redis',          color:'#dc382d'},
  {id:'nginx',     label:'Nginx',          color:'#009900'},
  {id:'prisma',    label:'Prisma ORM',     color:'#5a67d8'},
  {id:'tailwind',  label:'Tailwind CSS',   color:'#38bdf8'},
  {id:'webpack',   label:'Webpack/Vite',   color:'#8dd6f9'},
  {id:'r',         label:'R',              color:'#276dc3'},
  {id:'scala',     label:'Scala',          color:'#dc322f'},
  {id:'haskell',   label:'Haskell',        color:'#5e5086'},
];

export const ERRORS_DB = {
  // ─────────────────────────────────────────────
  // JAVASCRIPT
  // ─────────────────────────────────────────────
  js: [
    {
      name: "TypeError: Cannot read properties of null/undefined",
      sev: 'critical', badges: ['CRITICAL','RUNTIME'],
      desc: 'Error paling umum di JavaScript. Mencoba mengakses properti dari null atau undefined.',
      cause: ['Variabel belum diinisialisasi','API response berbeda dari ekspektasi','Race condition — data belum ready','Salah path/typo nama properti'],
      fix: ['Optional chaining: obj?.property?.nested','Nullish coalescing: obj?.name ?? "default"','Guard clause: if (!user) return;','Console.log objek sebelum akses properti'],
      code: {lang:'JavaScript', src:
`// ❌ SALAH — crash jika user null
const name = user.profile.name;

// ✅ Optional chaining
const name = user?.profile?.name ?? 'Anonymous';

// ✅ Guard clause
async function getUser(id) {
  const user = await db.find(id);
  if (!user) throw new Error('User tidak ditemukan');
  return user.name;
}`}
    },
    {
      name: "SyntaxError: await is only valid in async functions",
      sev: 'critical', badges: ['CRITICAL','SYNTAX','ASYNC'],
      desc: 'await hanya bisa dipakai di dalam fungsi yang di-declare dengan async.',
      cause: ['Lupa tambah keyword async','Pakai await di top-level di environment non-ESM'],
      fix: ['Tambah async sebelum fungsi','Arrow: const foo = async () => {}','Top-level: (async () => { await ... })()'],
      code: {lang:'JavaScript', src:
`// ❌ SALAH
function getData() {
  const res = await fetch('/api'); // SyntaxError!
  return res.json();
}

// ✅ BENAR
async function getData() {
  const res = await fetch('/api');
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
}`}
    },
    {
      name: "ReferenceError: X is not defined",
      sev: 'warning', badges: ['WARNING','SCOPE'],
      desc: 'Variabel atau fungsi tidak ditemukan di scope yang aktif.',
      cause: ['Typo nama variabel (JS case-sensitive!)','Belum dideklarasi sebelum dipakai','Lupa import module'],
      fix: ['Cek ejaan — JS case-sensitive!','Deklarasi sebelum penggunaan','Tambah import yang diperlukan']
    },
    {
      name: "UnhandledPromiseRejection — App Crash",
      sev: 'critical', badges: ['CRITICAL','ASYNC'],
      desc: 'Promise yang di-reject tidak ada handler. Di Node.js 15+, langsung crash process.',
      cause: ['Floating promise tanpa await','Chain tanpa .catch()','Async handler tanpa try/catch'],
      fix: ['Selalu await atau .catch()','Global handler: process.on("unhandledRejection", r => ...)','Wrap async handler dengan try/catch'],
      code: {lang:'JavaScript', src:
`process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

// ❌ Floating promise
fetchData(); // tidak ada await!

// ✅ Benar
await fetchData();
fetchData().catch(console.error);

// ✅ Async handler aman
bot.on('message', async (msg) => {
  try {
    await processMessage(msg);
  } catch (err) {
    console.error('Handler error:', err);
  }
});`}
    },
    {
      name: "CORS Error — Access-Control-Allow-Origin",
      sev: 'warning', badges: ['WARNING','NETWORK'],
      desc: 'Browser memblokir request ke server berbeda domain karena CORS policy.',
      cause: ['Backend tidak set header CORS','Request dari origin tidak diizinkan','Method atau header tidak diizinkan'],
      fix: ['npm install cors + app.use(cors())','Set origin spesifik untuk production','Jangan gunakan * untuk API dengan authentication'],
      code: {lang:'JavaScript', src:
`const cors = require('cors');

// Development
app.use(cors());

// Production
app.use(cors({
  origin: ['https://cryveth.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));`}
    },
    {
      name: "Maximum call stack size exceeded",
      sev: 'critical', badges: ['CRITICAL','RUNTIME'],
      desc: 'Rekursi tak terbatas — fungsi memanggil dirinya sendiri tanpa base case yang benar.',
      cause: ['Fungsi rekursif tanpa base case','Event listener yang memanggil dirinya sendiri','Circular reference di object'],
      fix: ['Tambahkan base case di awal fungsi rekursif','Gunakan iterasi (loop) sebagai alternatif','Cek apakah ada circular reference'],
      code: {lang:'JavaScript', src:
`// ❌ SALAH — tanpa base case
function factorial(n) {
  return n * factorial(n - 1); // infinite recursion!
}

// ✅ BENAR — dengan base case
function factorial(n) {
  if (n <= 1) return 1; // base case!
  return n * factorial(n - 1);
}

// ✅ Iteratif (lebih aman untuk n besar)
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}`}
    },
  ],

  // ─────────────────────────────────────────────
  // NODE.JS
  // ─────────────────────────────────────────────
  nodejs: [
    {
      name: "Cannot find module",
      sev: 'critical', badges: ['CRITICAL','MODULE'],
      desc: 'Node.js tidak bisa menemukan module yang di-require/import.',
      cause: ['Package belum di-install','Typo nama package','Path relatif salah (lupa ./)','Package tidak ada di package.json'],
      fix: ['Jalankan npm install','Install: npm install nama-package','Path lokal: require("./utils")','Cek package.json'],
      code: {lang:'Terminal', src:
`# Install semua dari package.json
npm install

# Install package baru
npm install express dotenv

# Path yang benar:
const utils   = require('./utils');    // file lokal
const express = require('express');    // npm package`}
    },
    {
      name: "ERR_REQUIRE_ESM",
      sev: 'critical', badges: ['CRITICAL','MODULE'],
      desc: 'Package sudah ESM tapi kode masih pakai CommonJS require().',
      cause: ['chalk@5, node-fetch@3, nanoid v4+ adalah ESM','Project belum set "type": "module"'],
      fix: ['Downgrade: chalk@4, node-fetch@2','Atau convert ke ESM: tambah "type":"module"','Dynamic import: const mod = await import("module")'],
      code: {lang:'JavaScript', src:
`// Solusi 1 — downgrade
npm install chalk@4
npm install node-fetch@2

// Solusi 2 — dynamic import
const chalk = await import('chalk');

// Solusi 3 — ubah ke ESM
// package.json: "type": "module"
import chalk from 'chalk';
import fetch from 'node-fetch';`}
    },
    {
      name: "EADDRINUSE: address already in use",
      sev: 'warning', badges: ['WARNING','SERVER'],
      desc: 'Port yang ingin dipakai sudah digunakan proses lain.',
      cause: ['Server sebelumnya tidak di-stop dengan benar','Port default 3000 dipakai app lain'],
      fix: ['Kill proses di port tersebut','Ganti port di .env','lsof -i :3000 untuk cek proses'],
      code: {lang:'Terminal', src:
`# macOS/Linux — kill proses di port 3000
lsof -ti:3000 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Atau ganti port di .env
PORT=3002`}
    },
    {
      name: "process.env.TOKEN is undefined",
      sev: 'critical', badges: ['CRITICAL','ENV'],
      desc: '.env tidak dimuat sebelum dipakai, atau variabel salah nama.',
      cause: ['require("dotenv").config() tidak di baris paling atas','File .env tidak ada / tidak di folder yang benar','Nama variabel typo (case-sensitive)'],
      fix: ['Pastikan dotenv.config() adalah baris PERTAMA di entry file','Cek nama variabel di .env persis sama','Deploy ke Vercel: set env di dashboard, bukan .env'],
      code: {lang:'JavaScript', src:
`// ✅ HARUS di baris paling atas
require('dotenv').config();

// Baru boleh require lainnya
const express = require('express');

// Debug: lihat semua env
console.log(process.env); // Hapus sebelum commit!

// Guard untuk env wajib
if (!process.env.BOT_TOKEN) {
  console.error('BOT_TOKEN tidak ada di .env!');
  process.exit(1);
}`}
    },
    {
      name: "ENOENT: no such file or directory",
      sev: 'warning', badges: ['WARNING','FILESYSTEM'],
      desc: 'File atau direktori yang dicoba diakses tidak ada.',
      cause: ['Path salah atau typo','File belum dibuat/di-upload','Working directory berbeda dari yang dikira'],
      fix: ['Gunakan path.join(__dirname, "file.txt") untuk path absolut','Cek cwd: console.log(process.cwd())','Buat file terlebih dahulu dengan fs.writeFileSync'],
      code: {lang:'JavaScript', src:
`const path = require('path');
const fs = require('fs');

// ❌ Relative path rawan masalah
const data = fs.readFileSync('data.json');

// ✅ Absolut path dengan __dirname
const filePath = path.join(__dirname, 'data.json');

// ✅ Cek file ada dulu
if (fs.existsSync(filePath)) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
} else {
  console.error('File tidak ditemukan:', filePath);
}`}
    },
  ],

  // ─────────────────────────────────────────────
  // PYTHON
  // ─────────────────────────────────────────────
  python: [
    {
      name: "IndentationError: expected an indented block",
      sev: 'critical', badges: ['CRITICAL','SYNTAX'],
      desc: 'Python menggunakan indentasi sebagai struktur kode. Indentasi salah = error.',
      cause: ['Mix tabs dan spaces','Blok kosong setelah if/for/def/class','Copy-paste dari sumber berbeda'],
      fix: ['Gunakan HANYA 4 spaces (bukan tab)','Tambahkan pass jika blok memang kosong','Set editor: "insert spaces" bukan tabs'],
      code: {lang:'Python', src:
`# ❌ SALAH
if condition:
print("hello")  # IndentationError!

# ✅ BENAR
if condition:
    print("hello")  # 4 spaces

# ✅ Blok kosong — gunakan pass
class EmptyClass:
    pass

def todo_later():
    pass`}
    },
    {
      name: "ModuleNotFoundError: No module named 'X'",
      sev: 'critical', badges: ['CRITICAL','MODULE'],
      desc: 'Module/library tidak ter-install di environment Python aktif.',
      cause: ['Library belum di-install','Menjalankan di virtualenv yang salah','Typo nama module'],
      fix: ['pip install nama-library','Aktifkan venv yang benar','Cek typo: requests bukan request'],
      code: {lang:'Terminal', src:
`# Install library
pip install requests fastapi uvicorn

# Atau dari requirements.txt
pip install -r requirements.txt

# Buat virtualenv
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows`}
    },
    {
      name: "TypeError: 'NoneType' object is not subscriptable",
      sev: 'critical', badges: ['CRITICAL','RUNTIME'],
      desc: 'Mencoba subscript (indexing) pada None — hasil fungsi yang return None.',
      cause: ['Fungsi tidak return nilai eksplisit','API/DB query tidak menemukan data','Lupa return di fungsi'],
      fix: ['Cek return value sebelum dipakai','Guard: if result is None: return','Gunakan Optional[T] type hint'],
      code: {lang:'Python', src:
`# ❌ SALAH
def find_user(id):
    if id == 1:
        return {'name': 'Alice'}
    # Lupa return — implisit None!

user = find_user(99)
print(user['name'])  # TypeError!

# ✅ BENAR
def find_user(id: int) -> dict | None:
    if id == 1:
        return {'name': 'Alice'}
    return None  # Eksplisit

user = find_user(99)
if user is None:
    print("User tidak ditemukan")
else:
    print(user['name'])`}
    },
    {
      name: "KeyError: 'key'",
      sev: 'warning', badges: ['WARNING','RUNTIME'],
      desc: 'Mengakses key di dictionary yang tidak ada.',
      cause: ['Key tidak ada di dict','Typo nama key','Data dari API berbeda dari ekspektasi'],
      fix: ['Gunakan dict.get("key", default)','Cek dulu: if "key" in dict','Gunakan .get() selalu untuk data eksternal'],
      code: {lang:'Python', src:
`data = {'name': 'Alice'}

# ❌ SALAH
print(data['age'])  # KeyError: 'age'

# ✅ .get() dengan default
print(data.get('age', 0))        # 0
print(data.get('name', 'Unknown'))  # 'Alice'

# ✅ Cek sebelum akses
if 'age' in data:
    print(data['age'])

# ✅ try/except untuk data eksternal
try:
    age = data['age']
except KeyError:
    age = 0`}
    },
    {
      name: "RecursionError: maximum recursion depth exceeded",
      sev: 'critical', badges: ['CRITICAL','RUNTIME'],
      desc: 'Rekursi melebihi batas default Python (1000). Mirip stack overflow.',
      cause: ['Rekursi tanpa base case','Data tree/graph yang sangat dalam'],
      fix: ['Tambah base case yang benar','Naikkan limit: sys.setrecursionlimit(5000)','Ganti dengan iterasi + stack eksplisit'],
      code: {lang:'Python', src:
`import sys

# Naikkan limit jika memang diperlukan
sys.setrecursionlimit(5000)

# ✅ Iteratif lebih baik untuk tree traversal
def traverse_iterative(node):
    stack = [node]
    result = []
    while stack:
        current = stack.pop()
        result.append(current.val)
        if current.right: stack.append(current.right)
        if current.left:  stack.append(current.left)
    return result`}
    },
    {
      name: "FileNotFoundError: [Errno 2] No such file or directory",
      sev: 'warning', badges: ['WARNING','FILESYSTEM'],
      desc: 'File yang dicoba dibuka tidak ditemukan di path yang diberikan.',
      cause: ['Path salah atau relatif terhadap working directory','Ekstensi file salah','File belum dibuat'],
      fix: ['Gunakan os.path.join untuk path yang aman','Cek os.getcwd() untuk working directory saat ini','Gunakan Path dari pathlib'],
      code: {lang:'Python', src:
`from pathlib import Path
import os

# ✅ Pathlib (Python 3.4+)
base = Path(__file__).parent
config = base / 'config.json'

if config.exists():
    data = config.read_text(encoding='utf-8')
else:
    print(f"File tidak ada: {config}")

# ✅ try/except
try:
    with open('data.json', 'r') as f:
        data = f.read()
except FileNotFoundError as e:
    print(f"Error: {e}")`}
    },
  ],

  // ─────────────────────────────────────────────
  // HTML
  // ─────────────────────────────────────────────
  html: [
    {
      name: "Gambar tidak tampil (broken image)",
      sev: 'warning', badges: ['WARNING','ASSET'],
      desc: 'Tag <img> menampilkan ikon broken karena src salah atau file tidak ada.',
      cause: ['Path file salah (case-sensitive di server Linux)','File belum di-upload','Typo nama file atau ekstensi'],
      fix: ['Cek path: ./images/foto.jpg bukan /images/foto.jpg untuk relative','Pastikan ekstensi benar: .jpg bukan .JPG','Tambahkan alt text untuk accessibility'],
      code: {lang:'HTML', src:
`<!-- ❌ SALAH -->
<img src="Images/foto.JPG">  <!-- case-sensitive! -->
<img src="/foto.jpg">         <!-- absolute path salah -->

<!-- ✅ BENAR -->
<img src="./images/foto.jpg"
     alt="Deskripsi gambar"
     width="400"
     height="300"
     loading="lazy">`}
    },
    {
      name: "Form tidak submit / action tidak berjalan",
      sev: 'warning', badges: ['WARNING','FORM'],
      desc: 'Form HTML tidak mengirim data ke server dengan benar.',
      cause: ['Tidak ada attribute action atau method','Input tidak punya name attribute','Button bukan type="submit"'],
      fix: ['Tambahkan action="/endpoint" dan method="POST"','Setiap input harus punya name','Gunakan type="submit" pada button'],
      code: {lang:'HTML', src:
`<!-- ❌ SALAH -->
<form>
  <input type="text" placeholder="Nama">
  <button>Kirim</button>
</form>

<!-- ✅ BENAR -->
<form action="/register" method="POST">
  <input type="text" name="username" required placeholder="Username">
  <input type="email" name="email" required placeholder="Email">
  <button type="submit">Daftar</button>
</form>`}
    },
    {
      name: "Script tidak berjalan — ReferenceError di console",
      sev: 'warning', badges: ['WARNING','SCRIPT'],
      desc: 'JavaScript di-load sebelum elemen DOM siap, sehingga querySelector mengembalikan null.',
      cause: ['Tag <script> di <head> tanpa defer/async','DOM belum dirender saat JS dieksekusi'],
      fix: ['Pindah script ke bawah </body>','Atau tambahkan attribute defer','Gunakan DOMContentLoaded event'],
      code: {lang:'HTML', src:
`<!-- ❌ SALAH — script di head, DOM belum ready -->
<head>
  <script src="app.js"></script>
</head>

<!-- ✅ Cara 1: pindah ke bawah body -->
<body>
  ...konten...
  <script src="app.js"></script>
</body>

<!-- ✅ Cara 2: defer (best practice) -->
<head>
  <script src="app.js" defer></script>
</head>`}
    },
    {
      name: "Halaman tidak responsive di mobile",
      sev: 'info', badges: ['INFO','RESPONSIVE'],
      desc: 'Halaman tampak zoom out / kecil di perangkat mobile karena tidak ada viewport meta.',
      cause: ['Tidak ada meta viewport','Width fixed dalam px bukan % atau vw'],
      fix: ['Tambahkan meta viewport di <head>','Gunakan CSS max-width dan % untuk layout'],
      code: {lang:'HTML', src:
`<!-- ✅ Wajib ada di setiap halaman -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Judul Halaman</title>
</head>`}
    },
  ],

  // ─────────────────────────────────────────────
  // CSS
  // ─────────────────────────────────────────────
  css: [
    {
      name: "CSS tidak berpengaruh / tidak muncul",
      sev: 'warning', badges: ['WARNING','CASCADE'],
      desc: 'Style CSS ditulis benar tapi tidak berpengaruh pada elemen.',
      cause: ['Selector terlalu spesifik di tempat lain (specificity)','Cache browser belum refresh','Typo nama class atau id','File CSS tidak ter-load'],
      fix: ['Buka DevTools → inspect elemen → lihat computed styles','Ctrl+Shift+R untuk hard refresh','Cek urutan link CSS di HTML'],
      code: {lang:'CSS', src:
`/* Debug dengan border merah */
* { outline: 1px solid red; }

/* Cek specificity:
   0-0-1: tag
   0-1-0: class
   1-0-0: id (lebih kuat)
*/

/* ❌ Ini kalah melawan ID */
.button { color: blue; }

/* ✅ Paksa dengan !important (gunakan seperlunya) */
.button { color: blue !important; }

/* ✅ Lebih baik: tingkatkan specificity */
nav .button { color: blue; }`}
    },
    {
      name: "Flexbox / Grid tidak bekerja seperti diharapkan",
      sev: 'info', badges: ['INFO','LAYOUT'],
      desc: 'Layout dengan flexbox atau grid tidak menghasilkan tampilan yang diinginkan.',
      cause: ['display: flex ditaruh di child, bukan parent','justify-content dan align-items tertukar','Lupa set height untuk vertical centering'],
      fix: ['display: flex harus di parent container','justify-content: main axis (horizontal default)','align-items: cross axis (vertical default)'],
      code: {lang:'CSS', src:
`/* Center content dalam container */
.container {
  display: flex;
  justify-content: center;  /* horizontal */
  align-items: center;      /* vertical */
  min-height: 100vh;
}

/* Grid responsive */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}`}
    },
    {
      name: "z-index tidak bekerja",
      sev: 'info', badges: ['INFO','STACKING'],
      desc: 'Elemen tidak muncul di atas elemen lain meskipun z-index sudah di-set tinggi.',
      cause: ['Elemen tidak punya position (relative/absolute/fixed/sticky)','Stacking context terisolasi dari parent','Parent punya z-index rendah'],
      fix: ['z-index hanya bekerja dengan position selain static','Cek parent apakah membuat stacking context baru','Gunakan DevTools → Layers panel'],
      code: {lang:'CSS', src:
`/* ❌ z-index tidak bekerja tanpa position */
.modal {
  z-index: 9999; /* tidak berefek! */
}

/* ✅ Harus ada position */
.modal {
  position: fixed;
  z-index: 9999;
  top: 0; left: 0;
  width: 100%; height: 100%;
}

/* ✅ Stacking context — cek parent */
.parent {
  position: relative;
  z-index: 1; /* Ini membatasi child! */
}`}
    },
    {
      name: "Font tidak tampil / fallback ke default",
      sev: 'info', badges: ['INFO','FONT'],
      desc: 'Custom font tidak muncul, browser fallback ke Times New Roman atau serif.',
      cause: ['@font-face path salah','Google Fonts link tidak dipasang sebelum CSS','Format font tidak didukung browser'],
      fix: ['Cek link Google Fonts di <head> sebelum stylesheet','Gunakan font-display: swap untuk performa','Selalu sertakan fallback font stack'],
      code: {lang:'CSS', src:
`/* ✅ Google Fonts — wajib di HTML head sebelum style.css */
/* <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"> */

/* ✅ Self-hosted dengan font-display */
@font-face {
  font-family: 'MyFont';
  src: url('./fonts/myfont.woff2') format('woff2'),
       url('./fonts/myfont.woff')  format('woff');
  font-display: swap; /* Tampilkan fallback dulu, ganti setelah load */
}

body {
  font-family: 'MyFont', 'Segoe UI', sans-serif; /* Selalu ada fallback */
}`}
    },
  ],

  // ─────────────────────────────────────────────
  // JAVA
  // ─────────────────────────────────────────────
  java: [
    {
      name: "NullPointerException (NPE)",
      sev: 'critical', badges: ['CRITICAL','RUNTIME'],
      desc: 'Error paling umum di Java — mengakses method atau field dari reference yang null.',
      cause: ['Object tidak diinisialisasi','Method mengembalikan null tapi tidak di-cek','Array element yang null'],
      fix: ['Selalu cek null sebelum akses: if (obj != null)','Gunakan Optional<T> untuk return yang bisa null','Gunakan Objects.requireNonNull() untuk parameter'],
      code: {lang:'Java', src:
`// ❌ SALAH
String name = user.getName().toUpperCase(); // NPE jika user null!

// ✅ Gunakan Optional
Optional<User> user = userRepo.findById(id);
String name = user.map(User::getName)
                   .map(String::toUpperCase)
                   .orElse("Unknown");

// ✅ Guard
if (user != null && user.getName() != null) {
    System.out.println(user.getName().toUpperCase());
}`}
    },
    {
      name: "ClassCastException",
      sev: 'critical', badges: ['CRITICAL','RUNTIME'],
      desc: 'Mencoba cast object ke tipe yang tidak kompatibel.',
      cause: ['Cast paksa tanpa pengecekan tipe','Generics dihapus saat runtime (type erasure)'],
      fix: ['Gunakan instanceof sebelum cast','Gunakan generics dengan benar','Pattern matching instanceof (Java 16+)'],
      code: {lang:'Java', src:
`// ❌ SALAH
Object obj = "Hello";
Integer num = (Integer) obj; // ClassCastException!

// ✅ Cek instanceof dulu
if (obj instanceof String s) {   // Java 16+ pattern matching
    System.out.println(s.length());
}

// ✅ Cara lama
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}`}
    },
    {
      name: "StackOverflowError",
      sev: 'critical', badges: ['CRITICAL','RUNTIME'],
      desc: 'Stack call terlalu dalam, biasanya karena rekursi tanpa batas.',
      cause: ['Rekursi tanpa base case','toString() yang memanggil dirinya sendiri di Lombok/JPA'],
      fix: ['Tambah base case yang jelas','Hindari toString() circular di Entity dengan @Data Lombok','Gunakan iterasi untuk traversal dalam'],
      code: {lang:'Java', src:
`// ❌ Lombok @Data dengan circular reference
@Data
@Entity
class User {
    @ManyToOne
    private Department dept; // dan Department punya List<User>
    // toString() akan loop tak terbatas!
}

// ✅ Exclude field circular
@ToString(exclude = "dept")
@EqualsAndHashCode(exclude = "dept")
@Entity
class User {
    @ManyToOne
    private Department dept;
}`}
    },
    {
      name: "ConcurrentModificationException",
      sev: 'critical', badges: ['CRITICAL','COLLECTION'],
      desc: 'Memodifikasi Collection (List/Map) saat sedang di-iterate.',
      cause: ['Hapus elemen dari List saat iterasi for-each','Modifikasi Map dalam loop'],
      fix: ['Gunakan Iterator.remove() untuk hapus saat iterasi','Atau kumpulkan dulu, hapus setelah loop','Gunakan CopyOnWriteArrayList untuk multithreading'],
      code: {lang:'Java', src:
`List<String> names = new ArrayList<>(List.of("A", "B", "C"));

// ❌ SALAH — ConcurrentModificationException!
for (String name : names) {
    if (name.equals("B")) names.remove(name);
}

// ✅ Iterator.remove()
Iterator<String> it = names.iterator();
while (it.hasNext()) {
    if (it.next().equals("B")) it.remove();
}

// ✅ removeIf (Java 8+)
names.removeIf(name -> name.equals("B"));`}
    },
  ],

  // ─────────────────────────────────────────────
  // TELEGRAM BOT
  // ─────────────────────────────────────────────
  tgbot: [
    {
      name: "Error: ETELEGRAM: 401 Unauthorized",
      sev: 'critical', badges: ['CRITICAL','AUTH'],
      desc: 'Token bot tidak valid atau salah.',
      cause: ['Token copy-paste tidak lengkap','Bot sudah di-delete dari BotFather','Whitespace di awal/akhir token'],
      fix: ['Ambil token baru dari @BotFather dengan /token','Pastikan tidak ada spasi: token.trim()','Cek .env: BOT_TOKEN=1234:ABC (tanpa quotes)'],
      code: {lang:'JavaScript', src:
`// Fix: trim token
const token = process.env.BOT_TOKEN?.trim();
if (!token) { console.error('TOKEN TIDAK ADA!'); process.exit(1); }

const bot = new TelegramBot(token, { polling: true });

// Test token valid:
bot.getMe().then(info => console.log('Bot:', info.username));`}
    },
    {
      name: "Bot tidak merespons pesan",
      sev: 'warning', badges: ['WARNING','POLLING'],
      desc: 'Bot jalan tapi tidak ada respons sama sekali.',
      cause: ['Polling tidak aktif','Handler event salah','Bot kena flood limit','Error silently swallowed'],
      fix: ['Pastikan polling: true saat inisialisasi','Tambahkan global error handler','Cek di BotFather apakah bot masih aktif'],
      code: {lang:'JavaScript', src:
`// ✅ Polling dengan error handling
const bot = new TelegramBot(token, { polling: true });

// Global error handler
bot.on('polling_error', (err) => {
  console.error('Polling error:', err.code, err.message);
});

// Log semua pesan masuk dulu untuk debug
bot.on('message', (msg) => {
  console.log('Pesan masuk:', msg.chat.id, msg.text);
});`}
    },
    {
      name: "409 Conflict — Webhook dan Polling aktif bersamaan",
      sev: 'critical', badges: ['CRITICAL','CONFLICT'],
      desc: 'Dua instance bot berjalan atau webhook aktif saat memakai polling.',
      cause: ['Bot di-deploy di server dengan webhook, tapi lokal juga polling','Menjalankan dua script bot yang sama'],
      fix: ['Hapus webhook: bot.deleteWebHook()','Pastikan hanya satu instance yang aktif','Cek Telegram API: getWebhookInfo'],
      code: {lang:'JavaScript', src:
`// Hapus webhook sebelum polling
const bot = new TelegramBot(token, { polling: false });

bot.deleteWebHook().then(() => {
  console.log('Webhook dihapus');
  bot.startPolling();
});

// Atau via URL langsung:
// https://api.telegram.org/bot<TOKEN>/deleteWebhook`}
    },
    {
      name: "Error: ETELEGRAM: 429 Too Many Requests",
      sev: 'warning', badges: ['WARNING','RATELIMIT'],
      desc: 'Bot mengirim pesan terlalu cepat dan kena rate limit Telegram.',
      cause: ['Blast pesan ke banyak user sekaligus','Loop kirim tanpa delay'],
      fix: ['Tambahkan delay antara pesan (1 detik per pesan)','Gunakan queue system untuk blast','Telegram limit: 30 msg/detik global, 1 msg/detik per chat'],
      code: {lang:'JavaScript', src:
`// ✅ Kirim dengan delay
async function broadcastMessage(users, text) {
  for (const userId of users) {
    try {
      await bot.sendMessage(userId, text);
      await new Promise(r => setTimeout(r, 1000)); // delay 1 detik
    } catch (err) {
      if (err.code === 'ETELEGRAM' && err.response?.statusCode === 429) {
        const retryAfter = err.response.body.parameters?.retry_after || 5;
        console.log(\`Rate limit, tunggu \${retryAfter}s\`);
        await new Promise(r => setTimeout(r, retryAfter * 1000));
      }
    }
  }
}`}
    },
    {
      name: "ctx.reply is not a function (Telegraf.js)",
      sev: 'critical', badges: ['CRITICAL','TELEGRAF'],
      desc: 'Menggunakan ctx.reply di luar context Telegraf yang benar.',
      cause: ['Memanggil ctx di luar middleware scope','Menggunakan bot.telegram.sendMessage tanpa chat ID','Salah destructure context'],
      fix: ['Pastikan handler menerima ctx sebagai parameter','Gunakan ctx.chat.id untuk sendMessage manual','await ctx.reply() bukan ctx.reply()'],
      code: {lang:'JavaScript', src:
`const { Telegraf } = require('telegraf');
const bot = new Telegraf(token);

// ❌ SALAH
bot.on('message', (msg) => {
  msg.reply('Hello'); // msg bukan ctx!
});

// ✅ BENAR — Telegraf style
bot.on('message', async (ctx) => {
  await ctx.reply('Hello!');
  // Atau
  await ctx.telegram.sendMessage(ctx.chat.id, 'Hello!');
});

bot.launch();`}
    },
  ],

  // ─────────────────────────────────────────────
  // SQL
  // ─────────────────────────────────────────────
  sql: [
    {
      name: "SQL Injection Vulnerability",
      sev: 'critical', badges: ['CRITICAL','SECURITY'],
      desc: 'Membangun query dengan string concatenation memungkinkan penyerang inject SQL berbahaya.',
      cause: ['Langsung memasukkan input user ke query string','Tidak menggunakan parameterized query / prepared statement'],
      fix: ['Selalu gunakan parameterized query','Gunakan ORM (Sequelize, Prisma, TypeORM)','Validasi dan sanitasi input sebelum query'],
      code: {lang:'JavaScript', src:
`// ❌ SANGAT BERBAHAYA — SQL Injection!
const query = "SELECT * FROM users WHERE email = '" + email + "'";
// Hacker bisa kirim: ' OR 1=1 --

// ✅ Parameterized query
const result = await db.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);

// ✅ Dengan Prisma ORM
const user = await prisma.user.findUnique({
  where: { email: email } // Auto-escaped
});`}
    },
    {
      name: "Query berjalan lambat (slow query)",
      sev: 'warning', badges: ['WARNING','PERFORMANCE'],
      desc: 'Query membutuhkan waktu lama karena full table scan tanpa index.',
      cause: ['Tidak ada index pada kolom WHERE','SELECT * mengambil kolom tidak perlu','N+1 query problem','Missing LIMIT pada large dataset'],
      fix: ['Tambah index: CREATE INDEX idx_email ON users(email)','Pilih kolom yang dibutuhkan saja','Gunakan JOIN daripada loop query','Selalu EXPLAIN ANALYZE query lambat'],
      code: {lang:'SQL', src:
`-- Cek query plan
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'a@example.com';

-- Tambah index
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Hindari SELECT *
SELECT id, name, email FROM users WHERE active = true LIMIT 100;`}
    },
    {
      name: "Deadlock detected",
      sev: 'critical', badges: ['CRITICAL','TRANSACTION'],
      desc: 'Dua transaksi saling menunggu lock satu sama lain — tidak bisa dilanjutkan.',
      cause: ['Dua transaksi mengakses tabel yang sama dengan urutan berbeda','Lock yang tidak dilepas dengan benar'],
      fix: ['Selalu akses tabel dalam urutan yang sama','Gunakan SELECT ... FOR UPDATE dengan ORDER BY','Retry logic untuk deadlock'],
      code: {lang:'SQL', src:
`-- Selalu akses tabel A dulu, baru B (konsisten!)
BEGIN;
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;
SELECT * FROM accounts WHERE id = 2 FOR UPDATE;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

-- Cek deadlock di PostgreSQL
SELECT * FROM pg_stat_activity WHERE wait_event_type = 'Lock';`}
    },
    {
      name: "ERROR: column must appear in GROUP BY or aggregate",
      sev: 'critical', badges: ['CRITICAL','SYNTAX'],
      desc: 'SELECT kolom non-aggregate yang tidak ada di GROUP BY.',
      cause: ['Kolom di SELECT tidak masuk GROUP BY','Pakai SELECT * dengan GROUP BY'],
      fix: ['Tambahkan semua kolom non-aggregate ke GROUP BY','Atau bungkus dalam fungsi aggregate (MAX, MIN, etc.)'],
      code: {lang:'SQL', src:
`-- ❌ SALAH
SELECT name, department, COUNT(*) FROM employees GROUP BY department;
-- Error: 'name' harus ada di GROUP BY!

-- ✅ BENAR
SELECT department, COUNT(*) as total
FROM employees
GROUP BY department;

-- ✅ Jika ingin nama, gunakan aggregate
SELECT department, MAX(name) as sample_name, COUNT(*) as total
FROM employees
GROUP BY department;`}
    },
  ],

  // ─────────────────────────────────────────────
  // GO
  // ─────────────────────────────────────────────
  go: [
    {
      name: "goroutine leak — Go routine tidak pernah selesai",
      sev: 'critical', badges: ['CRITICAL','CONCURRENCY'],
      desc: 'Goroutine yang dibuat tidak pernah exit, menyebabkan memory leak seiring waktu.',
      cause: ['Channel tidak pernah di-close','Context tidak di-cancel','Blocking operasi tanpa timeout'],
      fix: ['Selalu gunakan context dengan timeout','Gunakan defer cancel() setelah context.WithCancel','Tutup channel saat selesai mengirim'],
      code: {lang:'Go', src:
`// ✅ Context dengan timeout
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel() // WAJIB!

result, err := fetchData(ctx)
if err != nil {
    if errors.Is(err, context.DeadlineExceeded) {
        log.Println("Request timeout")
    }
    return err
}`}
    },
    {
      name: "panic: runtime error: index out of range",
      sev: 'critical', badges: ['CRITICAL','RUNTIME'],
      desc: 'Mengakses slice/array dengan index di luar batas.',
      cause: ['Loop melebihi panjang slice','Slice kosong tapi diakses index 0','Off-by-one error'],
      fix: ['Cek len(slice) sebelum akses','Gunakan range untuk iterasi slice','Tambahkan bounds check'],
      code: {lang:'Go', src:
`items := []string{"a", "b", "c"}

// ❌ SALAH
fmt.Println(items[5]) // panic: index out of range [5] with length 3

// ✅ Cek panjang
if len(items) > 0 {
    fmt.Println(items[0])
}

// ✅ Akses aman dengan index
func safeGet(s []string, i int) (string, bool) {
    if i < 0 || i >= len(s) {
        return "", false
    }
    return s[i], true
}`}
    },
    {
      name: "nil pointer dereference",
      sev: 'critical', badges: ['CRITICAL','RUNTIME'],
      desc: 'Mengakses method atau field dari pointer yang nil.',
      cause: ['Struct pointer tidak diinisialisasi','Fungsi mengembalikan nil pointer','Interface yang nil'],
      fix: ['Selalu cek nil sebelum dereference','Inisialisasi struct: &MyStruct{}','Gunakan pointer receiver dengan hati-hati'],
      code: {lang:'Go', src:
`type User struct{ Name string }

// ❌ SALAH
var u *User
fmt.Println(u.Name) // panic: nil pointer dereference

// ✅ Cek nil
if u != nil {
    fmt.Println(u.Name)
}

// ✅ Inisialisasi
u := &User{Name: "Alice"}
fmt.Println(u.Name)`}
    },
    {
      name: "declared but not used",
      sev: 'critical', badges: ['CRITICAL','SYNTAX'],
      desc: 'Go tidak memperbolehkan variabel atau import yang tidak digunakan.',
      cause: ['Deklarasi variabel tapi tidak dipakai','Import package tapi tidak dipakai'],
      fix: ['Hapus variabel/import yang tidak dipakai','Gunakan _ untuk nilai yang sengaja diabaikan','Gunakan goimports untuk auto-fix'],
      code: {lang:'Go', src:
`// ❌ SALAH — kompilasi gagal!
import "fmt"    // dipakai
import "os"     // tidak dipakai — error!

x := 5          // tidak dipakai — error!

// ✅ Gunakan _ untuk abaikan
_, err := someFunc()
if err != nil { log.Fatal(err) }

// ✅ Blank import untuk side effect
import _ "github.com/lib/pq"  // register PostgreSQL driver`}
    },
  ],

  // ─────────────────────────────────────────────
  // RUST
  // ─────────────────────────────────────────────
  rust: [
    {
      name: "borrow checker: cannot borrow as mutable",
      sev: 'critical', badges: ['CRITICAL','OWNERSHIP'],
      desc: 'Rust borrow checker mencegah multiple mutable reference atau mutable + immutable reference bersamaan.',
      cause: ['Mencoba mutate data yang sudah di-borrow immutably','Multiple mutable borrow dalam satu scope'],
      fix: ['Batasi scope borrow','Gunakan clone() jika perlu dua referensi','RefCell<T> untuk interior mutability'],
      code: {lang:'Rust', src:
`// ❌ SALAH
let mut v = vec![1, 2, 3];
let first = &v[0];   // immutable borrow
v.push(4);           // mutable borrow — error!
println!("{}", first);

// ✅ BENAR — borrow selesai sebelum mutasi
let mut v = vec![1, 2, 3];
{
    let first = &v[0];
    println!("{}", first);
} // first di-drop di sini
v.push(4); // aman sekarang`}
    },
    {
      name: "use of moved value",
      sev: 'critical', badges: ['CRITICAL','OWNERSHIP'],
      desc: 'Value sudah di-move ke owner lain dan tidak bisa dipakai lagi.',
      cause: ['Passing value ke fungsi tanpa reference','Assign value ke variabel baru (move semantics)'],
      fix: ['Pass referensi: &value','Gunakan .clone() jika perlu copy','Implementasi Copy trait untuk tipe kecil'],
      code: {lang:'Rust', src:
`// ❌ SALAH
let s = String::from("hello");
let s2 = s;       // s di-move ke s2!
println!("{}", s); // error: value borrowed after move

// ✅ Clone
let s = String::from("hello");
let s2 = s.clone();
println!("{} {}", s, s2); // keduanya valid

// ✅ Borrow dengan &
fn print_len(s: &String) {
    println!("{}", s.len());
}
let s = String::from("hello");
print_len(&s); // borrow, tidak move
println!("{}", s); // masih valid`}
    },
    {
      name: "Result/Option not handled — must use",
      sev: 'warning', badges: ['WARNING','ERRORHANDLING'],
      desc: 'Rust memaksa Result dan Option harus di-handle secara eksplisit.',
      cause: ['Mengabaikan return value Result atau Option','Tidak match semua kemungkinan'],
      fix: ['Gunakan ? operator untuk propagate error','match atau if let untuk handle Option','unwrap_or_else() untuk default value'],
      code: {lang:'Rust', src:
`use std::fs;

// ❌ Panik jika error
let content = fs::read_to_string("file.txt").unwrap();

// ✅ ? operator (dalam fungsi yang return Result)
fn read_file() -> Result<String, std::io::Error> {
    let content = fs::read_to_string("file.txt")?;
    Ok(content)
}

// ✅ unwrap_or_else
let content = fs::read_to_string("file.txt")
    .unwrap_or_else(|e| {
        eprintln!("Error: {}", e);
        String::new()
    });`}
    },
  ],

  // ─────────────────────────────────────────────
  // TYPESCRIPT
  // ─────────────────────────────────────────────
  ts: [
    {
      name: "Type 'X' is not assignable to type 'Y'",
      sev: 'critical', badges: ['CRITICAL','TYPE'],
      desc: 'TypeScript mendeteksi ketidakcocokan tipe — nilai yang di-assign tidak sesuai tipe yang diharapkan.',
      cause: ['Memasukkan string ke variabel bertipe number','Return tipe berbeda dari deklarasi fungsi','Union type tidak di-narrow dengan benar'],
      fix: ['Perbaiki tipe data yang di-assign','Gunakan type assertion hanya jika yakin','Narrow type dengan typeof, instanceof, atau type guard'],
      code: {lang:'TypeScript', src:
`// ❌ SALAH
let age: number = "25"; // Error!

function greet(name: string): string {
  return 42; // Error: number bukan string!
}

// ✅ BENAR
let age: number = 25;

// ✅ Type guard
function process(val: string | number) {
  if (typeof val === 'string') {
    return val.toUpperCase(); // aman, TypeScript tahu val adalah string
  }
  return val * 2;
}`}
    },
    {
      name: "Object is possibly 'null' or 'undefined'",
      sev: 'warning', badges: ['WARNING','NULLSAFETY'],
      desc: 'Dengan strictNullChecks aktif, TypeScript tidak memperbolehkan akses langsung pada nilai yang mungkin null.',
      cause: ['strictNullChecks: true di tsconfig.json','Type API response tidak include null/undefined','querySelector mengembalikan Element | null'],
      fix: ['Optional chaining: element?.value','Non-null assertion: element! (hati-hati)','Type narrowing: if (element !== null)'],
      code: {lang:'TypeScript', src:
`const btn = document.getElementById('myBtn');

// ❌ SALAH — btn bisa null
btn.addEventListener('click', handler); // Error!

// ✅ Optional chaining
btn?.addEventListener('click', handler);

// ✅ Type narrowing
if (btn !== null) {
  btn.addEventListener('click', handler);
}

// ✅ Non-null assertion (hanya jika YAKIN ada)
const btn2 = document.getElementById('myBtn')!;`}
    },
    {
      name: "Property does not exist on type",
      sev: 'critical', badges: ['CRITICAL','TYPE'],
      desc: 'Mengakses properti yang tidak ada di definisi tipe/interface.',
      cause: ['Typo nama properti','Interface tidak di-update setelah perubahan data','Menggunakan tipe yang terlalu generic (any)'],
      fix: ['Update interface untuk tambah properti baru','Gunakan type assertion sementara','Hindari any — gunakan unknown lalu narrow'],
      code: {lang:'TypeScript', src:
`interface User {
  id: number;
  name: string;
}

const user: User = { id: 1, name: 'Alice' };
console.log(user.email); // Error: Property 'email' does not exist!

// ✅ Update interface
interface User {
  id: number;
  name: string;
  email?: string; // optional
}

// ✅ Atau gunakan type yang lebih lebar
type FlexUser = User & { [key: string]: unknown };`}
    },
    {
      name: "Cannot find module or its corresponding type declarations",
      sev: 'warning', badges: ['WARNING','MODULE'],
      desc: 'Import module yang tidak punya type declarations (file .d.ts).',
      cause: ['Package tidak include TypeScript types','@types/package-name belum di-install'],
      fix: ['Install @types: npm install -D @types/express','Buat deklarasi manual di declarations.d.ts','Gunakan require dengan ts-ignore jika terpaksa'],
      code: {lang:'TypeScript', src:
`// Install types
// npm install -D @types/node @types/express

// Atau buat file declarations.d.ts:
declare module 'nama-module-tanpa-types' {
  const value: any;
  export default value;
}

// tsconfig.json
{
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types", "./types"]
  }
}`}
    },
  ],

  // ─────────────────────────────────────────────
  // PHP
  // ─────────────────────────────────────────────
  php: [
    {
      name: "Undefined variable / Undefined index",
      sev: 'warning', badges: ['WARNING','RUNTIME'],
      desc: 'Mengakses variabel atau array key yang tidak didefinisikan.',
      cause: ['Variabel belum di-set','Key array tidak ada','Typo nama variabel'],
      fix: ['Gunakan isset() sebelum akses','Null coalescing: $_GET["key"] ?? "default"','Inisialisasi variabel di awal'],
      code: {lang:'PHP', src:
`<?php
// ❌ SALAH
echo $nama;            // Warning: Undefined variable
echo $_POST['email'];  // Warning: Undefined index

// ✅ Null coalescing operator (??)
$nama  = $data['nama'] ?? 'Anonymous';
$email = $_POST['email'] ?? '';

// ✅ isset() check
if (isset($_POST['email'])) {
    $email = $_POST['email'];
}`}
    },
    {
      name: "Fatal error: Call to undefined function",
      sev: 'critical', badges: ['CRITICAL','RUNTIME'],
      desc: 'Memanggil fungsi yang tidak ada atau belum di-include.',
      cause: ['Typo nama fungsi','File yang berisi fungsi belum di-include','Extension PHP belum di-aktifkan'],
      fix: ['Cek typo nama fungsi','require_once file yang berisi fungsi','Aktifkan extension di php.ini'],
      code: {lang:'PHP', src:
`<?php
// ❌ SALAH
$hash = bcrypts($password); // Typo! bcrypt → password_hash

// ✅ BENAR
$hash = password_hash($password, PASSWORD_BCRYPT);
$valid = password_verify($input, $hash);

// Jika fungsi di file lain:
require_once __DIR__ . '/functions.php';`}
    },
    {
      name: "PHP: Headers already sent",
      sev: 'critical', badges: ['CRITICAL','OUTPUT'],
      desc: 'Mencoba set header HTTP setelah output sudah dikirim ke browser.',
      cause: ['echo/print sebelum header()','Whitespace atau BOM di awal file','Output buffering tidak aktif'],
      fix: ['Pindahkan semua header() sebelum output apapun','Pastikan tidak ada whitespace sebelum <?php','Aktifkan output_buffering di php.ini'],
      code: {lang:'PHP', src:
`<?php
// ❌ SALAH — ada output sebelum header!
echo "Loading...";
header('Location: /dashboard'); // Error!

// ✅ Header SEBELUM output apapun
<?php
session_start();
if (!isset($_SESSION['user'])) {
    header('Location: /login');
    exit(); // WAJIB exit setelah redirect!
}
?>`}
    },
    {
      name: "PDO: SQLSTATE — Database Connection Error",
      sev: 'critical', badges: ['CRITICAL','DATABASE'],
      desc: 'Koneksi ke database gagal.',
      cause: ['Kredensial salah (host, user, password, dbname)','MySQL/PostgreSQL service tidak berjalan','Firewall memblokir koneksi'],
      fix: ['Cek konfigurasi di .env atau config.php','Pastikan service database running','Gunakan try/catch untuk PDO exception'],
      code: {lang:'PHP', src:
`<?php
// ✅ PDO dengan proper error handling
try {
    $pdo = new PDO(
        "mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_NAME']};charset=utf8mb4",
        $_ENV['DB_USER'],
        $_ENV['DB_PASS'],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    error_log($e->getMessage());
    die('Database connection failed');
}`}
    },
  ],

  // ─────────────────────────────────────────────
  // C#
  // ─────────────────────────────────────────────
  csharp: [
    {
      name: "NullReferenceException",
      sev: 'critical', badges: ['CRITICAL','RUNTIME'],
      desc: 'Mengakses member dari object yang null — versi C# dari NullPointerException.',
      cause: ['Object tidak diinisialisasi','Dependency injection gagal','LINQ FirstOrDefault() mengembalikan null'],
      fix: ['Gunakan null-conditional operator: obj?.Method()','Null coalescing: obj ?? defaultValue','C# 8+ Nullable Reference Types untuk deteksi compile-time'],
      code: {lang:'C#', src:
`// ❌ SALAH
User user = userRepo.GetById(id);
string name = user.Name.ToUpper(); // NRE jika user null!

// ✅ Null-conditional operator
string name = user?.Name?.ToUpper() ?? "Unknown";

// ✅ Pattern matching (C# 7+)
if (user is null)
    throw new InvalidOperationException("User tidak ditemukan");

// ✅ LINQ aman
var user = users.FirstOrDefault(u => u.Id == id)
    ?? throw new KeyNotFoundException($"User {id} tidak ada");`}
    },
    {
      name: "InvalidOperationException: Sequence contains no elements",
      sev: 'critical', badges: ['CRITICAL','LINQ'],
      desc: 'LINQ .First() atau .Single() dipanggil pada koleksi kosong.',
      cause: ['Data tidak ditemukan di database','Filter terlalu ketat','Asumsi data selalu ada'],
      fix: ['Ganti First() dengan FirstOrDefault()','Cek koleksi tidak kosong sebelum akses','Single() → SingleOrDefault() dengan null check'],
      code: {lang:'C#', src:
`// ❌ SALAH — throw jika tidak ada data
var user = users.First(u => u.Email == email);

// ✅ FirstOrDefault + null check
var user = users.FirstOrDefault(u => u.Email == email);
if (user == null)
    return NotFound($"Email {email} tidak terdaftar");

// ✅ EF Core / async
var user = await context.Users
    .FirstOrDefaultAsync(u => u.Email == email)
    ?? throw new NotFoundException("User tidak ditemukan");`}
    },
    {
      name: "Object reference not set — Dependency Injection",
      sev: 'critical', badges: ['CRITICAL','DI'],
      desc: 'Service tidak ter-register di DI container sehingga null saat diinjeksi.',
      cause: ['Service tidak di-register di Program.cs/Startup.cs','Salah lifetime (Singleton vs Scoped vs Transient)','Interface tidak dipetakan ke implementasi'],
      fix: ['Register service di builder.Services','Cek apakah interface dan implementasi sudah dipasangkan','Gunakan constructor injection, bukan new'],
      code: {lang:'C#', src:
`// Program.cs — register services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddSingleton<ICacheService, RedisCacheService>();
builder.Services.AddTransient<IEmailSender, SmtpEmailSender>();

// ✅ Constructor injection
public class UserController : ControllerBase {
    private readonly IUserService _userService;

    public UserController(IUserService userService) {
        _userService = userService; // DI akan inject otomatis
    }
}`}
    },
  ],

  // ─────────────────────────────────────────────
  // C++
  // ─────────────────────────────────────────────
  cpp: [
    {
      name: "Segmentation Fault (SIGSEGV)",
      sev: 'critical', badges: ['CRITICAL','MEMORY'],
      desc: 'Program mencoba akses memori yang tidak diizinkan — crash paling umum di C++.',
      cause: ['Null pointer dereference','Array out of bounds','Use after free (akses memori yang sudah di-delete)','Stack overflow (rekursi terlalu dalam)'],
      fix: ['Selalu cek pointer sebelum akses','Gunakan smart pointer: std::unique_ptr, std::shared_ptr','Gunakan std::vector daripada raw array','Aktifkan AddressSanitizer untuk debug'],
      code: {lang:'C++', src:
`// ❌ SALAH — raw pointer berbahaya
int* ptr = nullptr;
*ptr = 5; // Segfault!

int arr[3] = {1, 2, 3};
arr[10] = 42; // Out of bounds!

// ✅ Smart pointer
#include <memory>
auto ptr = std::make_unique<int>(5);
*ptr = 10; // Aman, auto-delete saat keluar scope

// ✅ std::vector
#include <vector>
std::vector<int> v = {1, 2, 3};
v.at(10); // throws std::out_of_range, bukan crash`}
    },
    {
      name: "Memory Leak",
      sev: 'warning', badges: ['WARNING','MEMORY'],
      desc: 'Memori yang di-allocate dengan new tidak pernah di-delete.',
      cause: ['new tanpa delete yang pasangan','Early return sebelum delete','Exception melewati delete'],
      fix: ['Gunakan RAII — smart pointer','unique_ptr untuk single ownership','shared_ptr untuk shared ownership'],
      code: {lang:'C++', src:
`// ❌ SALAH — memory leak!
void process() {
    int* data = new int[1000];
    if (error) return; // data tidak di-delete!
    delete[] data;
}

// ✅ unique_ptr — auto-delete
#include <memory>
void process() {
    auto data = std::make_unique<int[]>(1000);
    if (error) return; // auto-delete saat scope keluar
    // tidak perlu delete manual
}

// Cek leak dengan Valgrind:
// valgrind --leak-check=full ./program`}
    },
    {
      name: "Undefined Behavior — signed integer overflow",
      sev: 'warning', badges: ['WARNING','UB'],
      desc: 'Integer overflow pada signed int adalah Undefined Behavior di C++.',
      cause: ['Loop counter overflow','Arithmetic tanpa overflow check'],
      fix: ['Gunakan unsigned untuk kalkulasi besar','Cek overflow sebelum operasi','Gunakan __int128 atau library big integer'],
      code: {lang:'C++', src:
`// ❌ Undefined Behavior!
int x = INT_MAX;
int y = x + 1; // UB — bisa apa saja!

// ✅ Gunakan unsigned untuk wrap-around yang terdefinisi
unsigned int x = UINT_MAX;
unsigned int y = x + 1; // = 0 (terdefinisi)

// ✅ Cek overflow manual
#include <limits>
if (a > std::numeric_limits<int>::max() - b) {
    // overflow akan terjadi!
}`}
    },
  ],

  // ─────────────────────────────────────────────
  // C
  // ─────────────────────────────────────────────
  c: [
    {
      name: "Segmentation Fault — null/invalid pointer",
      sev: 'critical', badges: ['CRITICAL','MEMORY'],
      desc: 'Program mengakses alamat memori yang tidak valid.',
      cause: ['Pointer NULL di-dereference','Buffer overflow','Use after free'],
      fix: ['Selalu cek pointer != NULL','Malloc return value harus dicek','Gunakan Valgrind atau AddressSanitizer'],
      code: {lang:'C', src:
`// ❌ SALAH
char *str = NULL;
strcpy(str, "hello"); // Segfault!

// ✅ Cek NULL dan alokasi
char *str = malloc(100);
if (str == NULL) {
    perror("malloc gagal");
    exit(EXIT_FAILURE);
}
strcpy(str, "hello");
// ... gunakan str ...
free(str);   // WAJIB bebaskan memori
str = NULL;  // Hindari dangling pointer`}
    },
    {
      name: "Buffer Overflow",
      sev: 'critical', badges: ['CRITICAL','SECURITY'],
      desc: 'Menulis data melebihi batas buffer — kerentanan keamanan serius.',
      cause: ['Fungsi unsafe: gets(), strcpy(), sprintf()','Tidak validasi panjang input'],
      fix: ['Ganti dengan fungsi safe: fgets(), strncpy(), snprintf()','Selalu validasi panjang input','Gunakan -fstack-protector flag kompiler'],
      code: {lang:'C', src:
`char buf[10];

// ❌ SANGAT BERBAHAYA
gets(buf);           // tidak ada batas!
strcpy(buf, input);  // bisa overflow!

// ✅ Fungsi safe dengan batas
fgets(buf, sizeof(buf), stdin);
strncpy(buf, input, sizeof(buf) - 1);
buf[sizeof(buf) - 1] = '\0'; // null terminate

// ✅ snprintf untuk format string
char result[64];
snprintf(result, sizeof(result), "Hello, %s!", name);`}
    },
  ],

  // ─────────────────────────────────────────────
  // RUBY
  // ─────────────────────────────────────────────
  ruby: [
    {
      name: "NoMethodError: undefined method for nil:NilClass",
      sev: 'critical', badges: ['CRITICAL','RUNTIME'],
      desc: 'Memanggil method pada objek yang nil — sama seperti NPE di bahasa lain.',
      cause: ['ActiveRecord find_by mengembalikan nil','Chaining method pada nilai yang mungkin nil'],
      fix: ['Gunakan &. (safe navigation): user&.name','try() di Rails: user.try(:name)','Gunakan find vs find_by (find raise exception)'],
      code: {lang:'Ruby', src:
`# ❌ SALAH
user = User.find_by(email: email)
puts user.name  # NoMethodError jika user nil!

# ✅ Safe navigation operator (&.)
puts user&.name  # nil jika user nil

# ✅ Guard clause
user = User.find_by(email: email)
return render json: { error: 'Not found' } unless user
puts user.name

# ✅ find (raise RecordNotFound jika tidak ada)
user = User.find(id)  # auto-raise exception`}
    },
    {
      name: "LoadError: cannot load such file",
      sev: 'critical', badges: ['CRITICAL','MODULE'],
      desc: 'Gem atau file Ruby tidak bisa di-load.',
      cause: ['Gem belum di-install','Tidak menjalankan bundle install','Gemfile.lock tidak di-commit'],
      fix: ['bundle install','Pastikan Gemfile include gem tersebut','Gunakan require_relative untuk file lokal'],
      code: {lang:'Ruby', src:
`# Install gems
bundle install

# Tambah ke Gemfile
gem 'devise'
gem 'sidekiq'

# Gunakan require_relative untuk file lokal
require_relative '../models/user'
require_relative './helper'`}
    },
    {
      name: "ActionController::InvalidAuthenticityToken",
      sev: 'critical', badges: ['CRITICAL','RAILS','SECURITY'],
      desc: 'Token CSRF tidak valid atau tidak ada saat POST/PATCH/DELETE.',
      cause: ['Tidak include CSRF token di AJAX request','API endpoint butuh token tapi tidak dikirim'],
      fix: ['Sertakan meta CSRF token di request header untuk AJAX','Gunakan protect_from_forgery except untuk API','Atau gunakan JWT untuk API auth'],
      code: {lang:'Ruby', src:
`# Untuk API — nonaktifkan CSRF
class ApiController < ApplicationController
  protect_from_forgery with: :null_session
end

# Untuk AJAX — kirim token di header
# JavaScript:
# headers: { 'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content }`}
    },
  ],

  // ─────────────────────────────────────────────
  // SWIFT
  // ─────────────────────────────────────────────
  swift: [
    {
      name: "Fatal error: unexpectedly found nil while unwrapping",
      sev: 'critical', badges: ['CRITICAL','OPTIONAL'],
      desc: 'Force unwrap (!) pada Optional yang bernilai nil.',
      cause: ['Menggunakan ! tanpa yakin nilai bukan nil','IBOutlet belum ter-connect','Data dari API belum dimuat'],
      fix: ['Ganti ! dengan guard let atau if let','Optional chaining: obj?.property','Provide default: value ?? "default"'],
      code: {lang:'Swift', src:
`// ❌ SALAH — crash jika nil
let name: String? = nil
print(name!) // Fatal error!

// ✅ if let (optional binding)
if let name = name {
    print(name)
} else {
    print("Tidak ada nama")
}

// ✅ guard let (early exit)
guard let name = name else {
    print("Nama tidak ada")
    return
}
print(name)

// ✅ nil coalescing
let displayName = name ?? "Anonymous"`}
    },
    {
      name: "EXC_BAD_ACCESS (SIGSEGV/SIGBUS)",
      sev: 'critical', badges: ['CRITICAL','MEMORY'],
      desc: 'Akses memori yang tidak valid — sering terjadi karena retain cycle atau akses di thread salah.',
      cause: ['Retain cycle menyebabkan deallocated object diakses','Akses UI dari background thread','Zombie object'],
      fix: ['Gunakan [weak self] atau [unowned self] di closure','Dispatch UI update ke main thread','Enable Zombie Objects di Instruments'],
      code: {lang:'Swift', src:
`// ❌ Retain cycle
class ViewController: UIViewController {
    var onComplete: (() -> Void)?
    func setup() {
        onComplete = {
            self.doSomething() // Strong reference cycle!
        }
    }
}

// ✅ weak self
func setup() {
    onComplete = { [weak self] in
        self?.doSomething()
    }
}

// ✅ UI selalu di main thread
DispatchQueue.main.async {
    self.tableView.reloadData()
}`}
    },
  ],

  // ─────────────────────────────────────────────
  // KOTLIN
  // ─────────────────────────────────────────────
  kotlin: [
    {
      name: "KotlinNullPointerException / NullPointerException",
      sev: 'critical', badges: ['CRITICAL','NULL_SAFETY'],
      desc: 'Kotlin punya null safety bawaan, tapi !! (force-unwrap) bisa menyebabkan NPE.',
      cause: ['Menggunakan !! operator tanpa yakin non-null','Interop dengan Java yang bisa return null','lateinit var diakses sebelum diinisialisasi'],
      fix: ['Ganti !! dengan ?. (safe call)','Elvis operator: val x = y ?: default','Cek isInitialized sebelum akses lateinit'],
      code: {lang:'Kotlin', src:
`// ❌ SALAH — crash jika null
val name: String? = null
println(name!!.length) // KotlinNPE!

// ✅ Safe call ?.
println(name?.length) // null, tidak crash

// ✅ Elvis operator ?:
val length = name?.length ?: 0

// ✅ lateinit check
if (::myProperty.isInitialized) {
    println(myProperty)
}`}
    },
    {
      name: "ClassCastException di Android — Context",
      sev: 'warning', badges: ['WARNING','ANDROID'],
      desc: 'Salah cast Context atau View di Android.',
      cause: ['Cast Activity ke interface yang tidak diimplementasi','getContext() mengembalikan ApplicationContext, bukan Activity'],
      fix: ['Cek dengan is operator sebelum cast','Pastikan Activity mengimplementasi interface yang dicasting'],
      code: {lang:'Kotlin', src:
`// ❌ Salah cast
val activity = context as MainActivity // ClassCastException!

// ✅ Safe cast as?
val activity = context as? MainActivity
activity?.doSomething()

// ✅ is check
if (context is MainActivity) {
    (context as MainActivity).doSomething()
}`}
    },
    {
      name: "Coroutine: JobCancelledException / CancellationException",
      sev: 'warning', badges: ['WARNING','COROUTINE'],
      desc: 'Coroutine dibatalkan, tapi CancellationException harus di-rethrow, bukan di-catch.',
      cause: ['Catch semua Exception termasuk CancellationException','ViewModel di-clear saat coroutine masih berjalan'],
      fix: ['Jangan catch CancellationException','Gunakan catch (e: Exception) if (e !is CancellationException)','Gunakan viewModelScope di Android ViewModel'],
      code: {lang:'Kotlin', src:
`// ❌ SALAH — menelan CancellationException!
try {
    delay(1000)
    fetchData()
} catch (e: Exception) {
    // Ini juga catch CancellationException!
    Log.e("TAG", e.message.toString())
}

// ✅ BENAR
try {
    delay(1000)
    fetchData()
} catch (e: CancellationException) {
    throw e  // Harus di-rethrow!
} catch (e: Exception) {
    Log.e("TAG", e.message.toString())
}

// ✅ viewModelScope auto-cancel saat ViewModel destroyed
viewModelScope.launch {
    fetchData()
}`}
    },
  ],

  // ─────────────────────────────────────────────
  // DART / FLUTTER
  // ─────────────────────────────────────────────
  dart: [
    {
      name: "Null check operator used on a null value",
      sev: 'critical', badges: ['CRITICAL','NULL_SAFETY'],
      desc: 'Operator ! digunakan pada nilai null — crash saat runtime.',
      cause: ['Menggunakan ! pada variabel nullable tanpa yakin','State tidak ter-init saat widget build pertama kali'],
      fix: ['Gunakan ?. safe navigation','Provide default dengan ??','Null check sebelum pakai dengan if/guard'],
      code: {lang:'Dart', src:
`// ❌ SALAH
String? name = null;
print(name!.length); // Crash!

// ✅ Safe navigation
print(name?.length ?? 0);

// ✅ Conditional
if (name != null) {
  print(name.length); // Dart tahu name non-null di sini
}

// ✅ di Widget
Text(user?.name ?? 'Loading...')`}
    },
    {
      name: "setState called after dispose",
      sev: 'critical', badges: ['CRITICAL','FLUTTER'],
      desc: 'setState dipanggil setelah widget di-dispose — sering terjadi di async operation.',
      cause: ['Async operasi selesai setelah widget di-remove','Timer atau stream tidak di-cancel saat dispose'],
      fix: ['Cek mounted sebelum setState','Cancel timer/subscription di dispose()','Gunakan mounted check di async gap'],
      code: {lang:'Dart', src:
`// ❌ SALAH
Future<void> fetchData() async {
  final data = await api.getData();
  setState(() { _data = data; }); // Crash jika widget sudah dispose!
}

// ✅ Cek mounted
Future<void> fetchData() async {
  final data = await api.getData();
  if (!mounted) return; // Widget masih ada?
  setState(() { _data = data; });
}

// ✅ Cancel subscription di dispose
@override
void dispose() {
  _subscription?.cancel();
  _timer?.cancel();
  super.dispose();
}`}
    },
    {
      name: "RenderFlex overflowed by N pixels",
      sev: 'warning', badges: ['WARNING','LAYOUT'],
      desc: 'Widget melebihi batas ukuran parent — layout overflow.',
      cause: ['Column/Row tanpa expanded di dalam fixed container','Text panjang tanpa overflow handling','Nested Flex tanpa bounded constraints'],
      fix: ['Bungkus child dengan Expanded atau Flexible','SingleChildScrollView untuk konten panjang','Gunakan overflow: TextOverflow.ellipsis'],
      code: {lang:'Dart', src:
`// ❌ SALAH — Column dalam Row terbatas
Row(
  children: [
    Column( // Column butuh constraints!
      children: [Text('Long text...')],
    )
  ]
)

// ✅ Gunakan Expanded
Row(
  children: [
    Expanded(
      child: Column(
        children: [
          Text('Long text', overflow: TextOverflow.ellipsis),
        ],
      ),
    ),
  ],
)`}
    },
  ],

  // ─────────────────────────────────────────────
  // REACT
  // ─────────────────────────────────────────────
  react: [
    {
      name: "Too many re-renders — React limits the number",
      sev: 'critical', badges: ['CRITICAL','HOOKS'],
      desc: 'setState dipanggil langsung di body komponen tanpa kondisi, menyebabkan render loop tak terbatas.',
      cause: ['setState di body komponen tanpa useEffect','Event handler langsung dipanggil: onClick={setCount(1)}','useEffect dependencies menyebabkan infinite loop'],
      fix: ['Bungkus setState dalam useEffect dengan dependency yang benar','Event handler: onClick={() => setCount(1)} bukan onClick={setCount(1)}','Cek dependency array useEffect'],
      code: {lang:'JavaScript', src:
`// ❌ SALAH — render loop!
function Counter() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // Dipanggil setiap render!
  return <div>{count}</div>;
}

// ✅ Dalam event handler
<button onClick={() => setCount(c => c + 1)}>+</button>

// ✅ useEffect dengan dependency benar
useEffect(() => {
  fetchData(id); // hanya jalan saat id berubah
}, [id]); // dependency array!`}
    },
    {
      name: "Warning: Each child should have a unique key",
      sev: 'warning', badges: ['WARNING','LIST'],
      desc: 'React butuh key unik saat render list untuk optimasi reconciliation.',
      cause: ['Map() tanpa key prop','Menggunakan index sebagai key (rawan bug)'],
      fix: ['Gunakan ID unik dari data sebagai key','Hindari array index sebagai key jika list bisa berubah urutan'],
      code: {lang:'JavaScript', src:
`// ❌ SALAH
{users.map(user => <UserCard user={user} />)}

// ❌ Kurang baik — index sebagai key
{users.map((user, index) => <UserCard key={index} user={user} />)}

// ✅ ID unik dari data
{users.map(user => (
  <UserCard
    key={user.id}  // ID dari database
    user={user}
  />
))}`}
    },
    {
      name: "Cannot update during an existing state transition",
      sev: 'critical', badges: ['CRITICAL','STATE'],
      desc: 'setState dipanggil di render komponen lain saat masih dalam proses rendering.',
      cause: ['setState di useEffect tanpa conditional','Parent setState saat child render'],
      fix: ['Tambahkan kondisi di useEffect','Gunakan queueMicrotask atau setTimeout jika perlu delay'],
      code: {lang:'JavaScript', src:
`// ❌ SALAH — setState tanpa kondisi
useEffect(() => {
  setIsLoading(false); // Dipanggil setiap render!
});

// ✅ Dependency array yang benar
useEffect(() => {
  setIsLoading(true);
  fetchData().then(data => {
    setData(data);
    setIsLoading(false);
  });
}, []); // [] = hanya sekali saat mount`}
    },
    {
      name: "useEffect missing dependencies (React Hooks)",
      sev: 'warning', badges: ['WARNING','HOOKS'],
      desc: 'useEffect menggunakan variabel dari scope tapi tidak masuk dependency array — stale closure.',
      cause: ['Variabel berubah tapi useEffect tidak tahu','Lupa tambah dependency'],
      fix: ['Ikuti eslint-plugin-react-hooks exhaustive-deps','Atau gunakan useCallback/useMemo untuk stabilkan fungsi'],
      code: {lang:'JavaScript', src:
`// ❌ SALAH — stale closure
const [userId, setUserId] = useState(1);
useEffect(() => {
  fetchUser(userId); // userId di sini selalu 1!
}, []); // userId tidak ada di deps!

// ✅ Tambahkan ke dependency
useEffect(() => {
  fetchUser(userId);
}, [userId]); // fetch ulang saat userId berubah

// ✅ Stabilkan fungsi dengan useCallback
const fetchUserStable = useCallback(() => {
  fetchUser(userId);
}, [userId]);`}
    },
  ],

  // ─────────────────────────────────────────────
  // VUE.JS
  // ─────────────────────────────────────────────
  vue: [
    {
      name: "Property or method is not defined on the instance",
      sev: 'critical', badges: ['CRITICAL','COMPONENT'],
      desc: 'Mengakses variabel/method di template yang tidak didefinisikan di Options API.',
      cause: ['Typo nama variabel','Variabel ada di data() tapi template pakai nama berbeda','Method tidak ada di methods object'],
      fix: ['Cek nama di data() dan methods','Gunakan Vue DevTools untuk inspect component state'],
      code: {lang:'JavaScript', src:
`// ❌ SALAH
export default {
  data() {
    return { userName: 'Alice' }
  },
  template: '<p>{{ username }}</p>' // Typo! userName vs username
}

// ✅ Nama konsisten
export default {
  data() {
    return { userName: 'Alice' }
  },
  template: '<p>{{ userName }}</p>'
}

// ✅ Composition API (Vue 3) — lebih explicit
const userName = ref('Alice');`}
    },
    {
      name: "v-for dan v-if tidak boleh pada elemen yang sama",
      sev: 'warning', badges: ['WARNING','DIRECTIVE'],
      desc: 'v-if dan v-for pada elemen yang sama menyebabkan masalah precedence.',
      cause: ['Mencoba filter list langsung di v-for dengan v-if','Tidak tahu aturan precedence Vue'],
      fix: ['Gunakan computed property untuk filter data','Atau pindah v-if ke elemen wrapper','Vue 3: v-if lebih prioritas dari v-for'],
      code: {lang:'HTML', src:
`<!-- ❌ SALAH — v-if dan v-for bersamaan -->
<li v-for="user in users" v-if="user.active" :key="user.id">
  {{ user.name }}
</li>

<!-- ✅ Gunakan computed property -->
<li v-for="user in activeUsers" :key="user.id">
  {{ user.name }}
</li>

<!-- JS: computed: { activeUsers() { return this.users.filter(u => u.active) } } -->

<!-- ✅ Atau wrapper template -->
<template v-for="user in users" :key="user.id">
  <li v-if="user.active">{{ user.name }}</li>
</template>`}
    },
  ],

  // ─────────────────────────────────────────────
  // NEXT.JS
  // ─────────────────────────────────────────────
  nextjs: [
    {
      name: "Error: Hydration failed — server/client mismatch",
      sev: 'critical', badges: ['CRITICAL','SSR'],
      desc: 'HTML yang di-render server berbeda dengan yang di-render client (hydration mismatch).',
      cause: ['Math.random() atau Date.now() di render','localStorage atau window diakses saat SSR','Conditional render berdasarkan browser-only state'],
      fix: ['Gunakan useEffect untuk kode browser-only','Dynamic import dengan ssr: false','State yang di-init di client saja'],
      code: {lang:'JavaScript', src:
`// ❌ SALAH — window tidak ada di server
function Component() {
  return <div>{window.innerWidth}px</div>;
}

// ✅ useEffect — hanya di client
import { useState, useEffect } from 'react';
function Component() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return <div>{width}px</div>;
}

// ✅ Dynamic import no-SSR
import dynamic from 'next/dynamic';
const MapComponent = dynamic(() => import('./Map'), { ssr: false });`}
    },
    {
      name: "Error: getServerSideProps / getStaticProps not working",
      sev: 'warning', badges: ['WARNING','DATA_FETCHING'],
      desc: 'Data fetching di Next.js Pages Router tidak mengembalikan props dengan benar.',
      cause: ['Lupa return { props: { ... } }','Export nama yang salah','Pakai di App Router tapi kode Pages Router'],
      fix: ['Selalu return { props: {} } dari getServerSideProps','Pastikan export default untuk page component','Di App Router pakai Server Components langsung'],
      code: {lang:'JavaScript', src:
`// ✅ Pages Router — getServerSideProps
export async function getServerSideProps(context) {
  const data = await fetchData(context.params.id);
  if (!data) {
    return { notFound: true }; // Tampilkan 404
  }
  return {
    props: { data }, // HARUS return { props }
  };
}

// ✅ App Router — Server Component (Next.js 13+)
export default async function Page({ params }) {
  const data = await fetchData(params.id);
  return <div>{data.name}</div>;
}`}
    },
    {
      name: "Module not found: Can't resolve '@/components/X'",
      sev: 'warning', badges: ['WARNING','IMPORT'],
      desc: 'Path alias @ tidak ter-konfigurasi atau path salah.',
      cause: ['tsconfig.json atau jsconfig.json belum set paths','Typo nama file atau folder','File belum dibuat'],
      fix: ['Set paths di tsconfig.json','Restart dev server setelah perubahan config'],
      code: {lang:'JSON', src:
`// tsconfig.json — tambahkan paths
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"]
    }
  }
}

// next.config.js (jika perlu)
module.exports = {
  experimental: {
    appDir: true,
  }
}`}
    },
  ],

  // ─────────────────────────────────────────────
  // EXPRESS.JS
  // ─────────────────────────────────────────────
  express: [
    {
      name: "Cannot set headers after they are sent",
      sev: 'critical', badges: ['CRITICAL','RESPONSE'],
      desc: 'res.json() atau res.send() dipanggil lebih dari sekali untuk satu request.',
      cause: ['Lupa return setelah res.send()','Async error handler mengirim response dua kali','Middleware melanjutkan setelah response'],
      fix: ['Selalu return setelah res.send/json/redirect','Cek semua code path hanya kirim satu response'],
      code: {lang:'JavaScript', src:
`// ❌ SALAH — dua kali kirim response!
app.get('/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ error: 'Not found' });
    // Lupa return! Kode terus jalan
  }
  res.json(user); // Error: headers already sent!
});

// ✅ Return setelah setiap response
app.get('/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  return res.json(user);
});`}
    },
    {
      name: "Route tidak ditemukan — 404 padahal route ada",
      sev: 'warning', badges: ['WARNING','ROUTING'],
      desc: 'Route sudah didefinisikan tapi selalu 404.',
      cause: ['Urutan middleware salah','Route didefinisikan setelah catch-all 404 handler','Method HTTP salah (GET vs POST)'],
      fix: ['Pastikan route spesifik sebelum catch-all','Cek method HTTP yang digunakan','Log semua request untuk debug'],
      code: {lang:'JavaScript', src:
`// ❌ SALAH — catch-all sebelum routes spesifik!
app.use((req, res) => res.status(404).send('Not Found'));
app.get('/api/users', handler); // Tidak pernah terpanggil!

// ✅ Urutan yang benar:
app.use(express.json());
app.use(cors());

// Routes dulu
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// 404 handler PALING AKHIR
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

// Error handler TERAKHIR
app.use((err, req, res, next) => res.status(500).json({ error: err.message }));`}
    },
  ],

  // ─────────────────────────────────────────────
  // DJANGO
  // ─────────────────────────────────────────────
  django: [
    {
      name: "django.db.utils.OperationalError: no such table",
      sev: 'critical', badges: ['CRITICAL','DATABASE'],
      desc: 'Model sudah dibuat tapi table belum ada di database karena belum migrasi.',
      cause: ['Belum jalankan makemigrations dan migrate','Migration file tidak di-commit','Database berbeda dengan development'],
      fix: ['python manage.py makemigrations','python manage.py migrate','Cek dengan showmigrations'],
      code: {lang:'Terminal', src:
`# Urutan yang benar setelah ubah models.py:
python manage.py makemigrations    # Buat migration file
python manage.py migrate           # Terapkan ke database

# Cek status migration
python manage.py showmigrations

# Jika mau reset (HATI-HATI di production!)
python manage.py migrate app_name zero
python manage.py migrate`}
    },
    {
      name: "ImproperlyConfigured: SECRET_KEY tidak di-set",
      sev: 'critical', badges: ['CRITICAL','CONFIG'],
      desc: 'SECRET_KEY Django tidak di-set atau menggunakan default yang tidak aman.',
      cause: ['SECRET_KEY di-hardcode dan di-commit ke git','settings.py menggunakan nilai placeholder'],
      fix: ['Pindahkan SECRET_KEY ke environment variable','Gunakan python-decouple atau django-environ','Jangan commit .env ke git'],
      code: {lang:'Python', src:
`# settings.py — gunakan environment variable
import os
from decouple import config

SECRET_KEY = config('DJANGO_SECRET_KEY')  # Wajib ada di .env
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='').split(',')

# .env (jangan commit!)
# DJANGO_SECRET_KEY=django-insecure-random-string-here
# DEBUG=True
# ALLOWED_HOSTS=localhost,127.0.0.1`}
    },
    {
      name: "CSRF verification failed",
      sev: 'critical', badges: ['CRITICAL','SECURITY'],
      desc: 'CSRF token tidak valid saat submit form.',
      cause: ['Lupa {% csrf_token %} di form','AJAX request tanpa CSRF header','Cookie tidak dikirim'],
      fix: ['Tambahkan {% csrf_token %} di setiap form Django','Untuk AJAX: sertakan X-CSRFToken header','Gunakan @csrf_exempt hanya untuk API endpoint'],
      code: {lang:'HTML', src:
`<!-- ✅ Selalu tambahkan di form -->
<form method="post" action="/submit/">
  {% csrf_token %}
  <input type="text" name="data">
  <button type="submit">Submit</button>
</form>

<!-- ✅ AJAX dengan fetch -->
<script>
const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
fetch('/api/data/', {
  method: 'POST',
  headers: { 'X-CSRFToken': csrfToken, 'Content-Type': 'application/json' },
  body: JSON.stringify({ data: 'value' })
});
</script>`}
    },
  ],

  // ─────────────────────────────────────────────
  // FLASK
  // ─────────────────────────────────────────────
  flask: [
    {
      name: "RuntimeError: Working outside of application context",
      sev: 'critical', badges: ['CRITICAL','CONTEXT'],
      desc: 'Mengakses g, request, atau current_app di luar request context.',
      cause: ['Mengakses Flask context di thread lain','Menjalankan kode di luar app.run()'],
      fix: ['Gunakan app.app_context() untuk push context manual','Simpan data yang dibutuhkan sebelum masuk thread'],
      code: {lang:'Python', src:
`from flask import Flask, g
app = Flask(__name__)

# ❌ SALAH — di luar context
with app.app_context():
    # ✅ Gunakan app_context() untuk operasi di luar request
    db.create_all()

# ✅ Di dalam route — context sudah ada otomatis
@app.route('/users')
def get_users():
    users = db.session.query(User).all()
    return jsonify([u.to_dict() for u in users])`}
    },
    {
      name: "TemplateNotFound",
      sev: 'critical', badges: ['CRITICAL','TEMPLATE'],
      desc: 'Jinja2 tidak menemukan template yang dicari.',
      cause: ['File template bukan di folder /templates','Typo nama file','Subfolder tidak dimasukkan di path'],
      fix: ['Pastikan folder templates ada di root project','Gunakan subfolder: render_template("users/list.html")','Cek template_folder jika custom'],
      code: {lang:'Python', src:
`# Struktur folder yang benar:
# project/
# ├── app.py
# └── templates/        ← Harus nama ini
#     ├── index.html
#     └── users/
#         └── list.html

# ✅ render_template dengan path benar
from flask import render_template

@app.route('/')
def index():
    return render_template('index.html', title='Home')

@app.route('/users')
def users():
    return render_template('users/list.html')`}
    },
  ],

  // ─────────────────────────────────────────────
  // SPRING BOOT
  // ─────────────────────────────────────────────
  spring: [
    {
      name: "BeanCreationException / NoSuchBeanDefinitionException",
      sev: 'critical', badges: ['CRITICAL','DI'],
      desc: 'Spring tidak bisa membuat atau menemukan Bean yang diperlukan.',
      cause: ['Kelas tidak diberi @Component / @Service / @Repository','Interface tidak punya implementasi yang di-annotasi','Circular dependency'],
      fix: ['Tambahkan @Service, @Component, atau @Repository','Cek @ComponentScan sudah cover package yang benar','Gunakan @Lazy atau setter injection untuk circular dep'],
      code: {lang:'Java', src:
`// ❌ SALAH — tidak ada annotation
class UserService {
    public User findById(Long id) { ... }
}

// ✅ BENAR
@Service
public class UserService {
    private final UserRepository userRepo;

    // Constructor injection (best practice)
    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public User findById(Long id) {
        return userRepo.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("User " + id));
    }
}`}
    },
    {
      name: "DataIntegrityViolationException",
      sev: 'critical', badges: ['CRITICAL','DATABASE'],
      desc: 'Operasi database melanggar constraint (unique, not null, foreign key).',
      cause: ['Duplicate entry pada kolom UNIQUE','Insert null pada kolom NOT NULL','Foreign key constraint violation'],
      fix: ['Cek data sebelum insert','Handle exception di service layer','Return response yang informatif ke client'],
      code: {lang:'Java', src:
`@Service
public class UserService {
    public User createUser(CreateUserRequest req) {
        // Cek dulu sebelum insert
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new DuplicateEmailException("Email sudah terdaftar");
        }
        User user = new User(req.getName(), req.getEmail());
        return userRepo.save(user);
    }
}

// ✅ Global exception handler
@ExceptionHandler(DataIntegrityViolationException.class)
public ResponseEntity<ErrorResponse> handleDbError(DataIntegrityViolationException e) {
    return ResponseEntity.conflict().body(new ErrorResponse("Data conflict: " + e.getMessage()));
}`}
    },
  ],

  // ─────────────────────────────────────────────
  // .NET / ASP.NET
  // ─────────────────────────────────────────────
  dotnet: [
    {
      name: "System.NullReferenceException",
      sev: 'critical', badges: ['CRITICAL','RUNTIME'],
      desc: 'Sama seperti NullPointerException — mengakses member dari object null.',
      cause: ['Object tidak diinisialisasi','Return null dari repository','Nullable tidak di-handle'],
      fix: ['Aktifkan Nullable Reference Types di .csproj','Gunakan null-conditional operator ?.','Guard with ArgumentNullException.ThrowIfNull()'],
      code: {lang:'C#', src:
`// ✅ Aktifkan nullable reference types di .csproj
// <Nullable>enable</Nullable>

// ✅ ArgumentNullException.ThrowIfNull (NET 6+)
public void Process(User user) {
    ArgumentNullException.ThrowIfNull(user);
    Console.WriteLine(user.Name);
}

// ✅ Null-conditional + null-coalescing
string name = user?.Profile?.Name ?? "Unknown";

// ✅ Pattern matching
if (user is { Name: not null } u) {
    Console.WriteLine(u.Name);
}`}
    },
    {
      name: "Entity Framework: 'Include' missing — lazy loading",
      sev: 'warning', badges: ['WARNING','ORM'],
      desc: 'Navigation property null karena tidak di-Include saat query (N+1 problem).',
      cause: ['Lupa .Include() untuk eager loading','Lazy loading tidak dikonfigurasi','DbContext sudah di-dispose'],
      fix: ['Tambahkan .Include() untuk property yang dibutuhkan','Atau aktifkan lazy loading (hati-hati performa)','Gunakan projection (Select) untuk query spesifik'],
      code: {lang:'C#', src:
`// ❌ SALAH — Orders null karena tidak di-include
var user = await context.Users.FirstAsync(u => u.Id == id);
Console.WriteLine(user.Orders.Count); // NullReferenceException!

// ✅ Eager loading dengan Include
var user = await context.Users
    .Include(u => u.Orders)
        .ThenInclude(o => o.Items)
    .FirstOrDefaultAsync(u => u.Id == id);

// ✅ Projection — ambil hanya yang dibutuhkan
var userDto = await context.Users
    .Where(u => u.Id == id)
    .Select(u => new { u.Name, OrderCount = u.Orders.Count })
    .FirstOrDefaultAsync();`}
    },
  ],

  // ─────────────────────────────────────────────
  // DOCKER
  // ─────────────────────────────────────────────
  docker: [
    {
      name: "Error: Cannot connect to Docker daemon",
      sev: 'critical', badges: ['CRITICAL','DAEMON'],
      desc: 'Docker CLI tidak bisa terhubung ke Docker daemon.',
      cause: ['Docker Desktop tidak berjalan','Permission user tidak ada di grup docker','Docker service tidak aktif di Linux'],
      fix: ['Start Docker Desktop','Linux: sudo usermod -aG docker $USER lalu logout-login','sudo systemctl start docker'],
      code: {lang:'Terminal', src:
`# Linux: tambah user ke group docker
sudo usermod -aG docker $USER
newgrp docker  # Apply tanpa logout

# Mulai service
sudo systemctl start docker
sudo systemctl enable docker  # Auto-start saat boot

# Cek status
docker info
docker version`}
    },
    {
      name: "Container exits immediately (Exited 0 / Exited 1)",
      sev: 'critical', badges: ['CRITICAL','CONTAINER'],
      desc: 'Container langsung exit setelah start.',
      cause: ['CMD tidak ada atau salah','Proses foreground tidak berjalan','Entrypoint error'],
      fix: ['Cek logs: docker logs container-name','Pastikan CMD menjalankan proses foreground','Gunakan tail -f /dev/null untuk debug'],
      code: {lang:'Docker', src:
`# Cek apa yang terjadi
docker logs mycontainer
docker logs mycontainer --tail 50

# ❌ SALAH Dockerfile — process langsung selesai
CMD ["echo", "Hello"]

# ✅ Proses foreground untuk server
CMD ["node", "server.js"]
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0"]

# Debug: jalankan interaktif
docker run -it --entrypoint /bin/bash myimage`}
    },
    {
      name: "No space left on device — Docker disk full",
      sev: 'warning', badges: ['WARNING','DISK'],
      desc: 'Docker menggunakan terlalu banyak disk space dari image, container, dan volume lama.',
      cause: ['Build image berkali-kali tanpa cleanup','Volume dan container lama menumpuk','Layer cache membengkak'],
      fix: ['docker system prune untuk bersihkan semua','docker image prune -a untuk hapus image tidak terpakai','Buat .dockerignore untuk kurangi build context'],
      code: {lang:'Terminal', src:
`# Lihat penggunaan disk Docker
docker system df

# Hapus semua yang tidak terpakai (aman)
docker system prune

# Hapus SEMUA termasuk volume (HATI-HATI!)
docker system prune -a --volumes

# Hapus image tidak terpakai saja
docker image prune -a

# .dockerignore — excludes dari build context
node_modules
.git
.env
*.log`}
    },
  ],

  // ─────────────────────────────────────────────
  // GIT
  // ─────────────────────────────────────────────
  git: [
    {
      name: "CONFLICT — Merge conflict",
      sev: 'critical', badges: ['CRITICAL','MERGE'],
      desc: 'Dua branch mengubah bagian yang sama dari file — Git tidak bisa auto-merge.',
      cause: ['Dua developer edit file yang sama','Rebase pada branch yang lama'],
      fix: ['Buka file yang conflict, pilih perubahan yang diinginkan','Hapus marker <<<<<<, ======, >>>>>>','git add, lalu git commit'],
      code: {lang:'Terminal', src:
`# Conflict marker di file:
<<<<<<< HEAD (perubahan kamu)
const port = 3000;
=======
const port = 8080;
>>>>>>> feature-branch (perubahan mereka)

# Setelah edit file, resolve:
git add src/config.js
git commit -m "Resolve conflict: gunakan port 3000"

# Jika mau batalkan merge
git merge --abort

# Gunakan visual tool
git mergetool`}
    },
    {
      name: "fatal: 'origin' does not appear to be a git repository",
      sev: 'critical', badges: ['CRITICAL','REMOTE'],
      desc: 'Remote origin belum dikonfigurasi atau URL salah.',
      cause: ['Belum set remote origin','URL salah (https vs ssh)','Repository dihapus dari GitHub'],
      fix: ['git remote add origin URL','Cek dengan git remote -v','Pastikan URL repository benar'],
      code: {lang:'Terminal', src:
`# Cek remote yang ada
git remote -v

# Tambah remote origin
git remote add origin https://github.com/user/repo.git

# Ganti URL origin yang salah
git remote set-url origin https://github.com/user/repo.git

# Push pertama kali
git push -u origin main`}
    },
    {
      name: "Accidentally committed secrets / .env to git",
      sev: 'critical', badges: ['CRITICAL','SECURITY'],
      desc: 'File .env atau API key ter-commit ke repository — ini darurat keamanan!',
      cause: ['Lupa buat .gitignore sebelum commit','git add . tanpa cek file'],
      fix: ['SEGERA rotate/revoke semua API key yang ter-expose','Hapus file dari history dengan git filter-branch','Tambahkan ke .gitignore'],
      code: {lang:'Terminal', src:
`# 1. SEGERA revoke API key yang ter-expose!

# 2. Hapus file dari semua history git
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch .env' \
  --prune-empty --tag-name-filter cat -- --all

# 3. Force push (koordinasi dengan tim dulu!)
git push origin --force --all

# 4. Buat .gitignore yang benar
echo ".env" >> .gitignore
echo ".env.*" >> .gitignore
echo "!.env.example" >> .gitignore
git add .gitignore && git commit -m "Add .gitignore"`}
    },
  ],

  // ─────────────────────────────────────────────
  // BASH / SHELL
  // ─────────────────────────────────────────────
  bash: [
    {
      name: "Permission denied / Command not found",
      sev: 'critical', badges: ['CRITICAL','PERMISSION'],
      desc: 'Script tidak bisa dijalankan karena izin atau path yang salah.',
      cause: ['Script tidak punya execute permission','Shebang salah atau tidak ada','PATH tidak include lokasi binary'],
      fix: ['chmod +x script.sh untuk beri execute permission','Tambahkan shebang: #!/bin/bash di baris pertama','Gunakan ./script.sh atau bash script.sh'],
      code: {lang:'Bash', src:
`# ❌ Permission denied
script.sh  # Error!

# ✅ Beri permission dulu
chmod +x script.sh
./script.sh

# ✅ Atau jalankan langsung dengan bash
bash script.sh

# ✅ Shebang di baris pertama script
#!/bin/bash
set -euo pipefail  # Best practice: exit on error, unset var, pipe fail`}
    },
    {
      name: "Variable tidak expand — salah quote",
      sev: 'warning', badges: ['WARNING','QUOTING'],
      desc: 'Variable tidak di-expand karena menggunakan single quote (bukan double quote).',
      cause: ["Single quote '' mencegah expansion","Lupa $ di depan nama variabel"],
      fix: ['Gunakan double quote untuk variable expansion','Single quote hanya untuk string literal','Gunakan \${VAR} untuk kejelasan'],
      code: {lang:'Bash', src:
`NAME="Alice"

# ❌ Single quote — tidak di-expand
echo 'Hello $NAME'  # Output: Hello $NAME

# ✅ Double quote — di-expand
echo "Hello $NAME"  # Output: Hello Alice

# ✅ Gunakan curly braces untuk kejelasan
echo "File: \${NAME}_report.txt"

# ✅ Best practice — quote semua variable
if [ -f "\${FILE_PATH}" ]; then
    echo "File ada"
fi`}
    },
    {
      name: "set -e : script berhenti tiba-tiba",
      sev: 'warning', badges: ['WARNING','EXITCODE'],
      desc: 'set -e membuat script exit saat ada command yang return non-zero exit code.',
      cause: ['Command yang expected gagal (grep tanpa hasil, dll)','set -e aktif tapi tidak ada error handling'],
      fix: ['Tambahkan || true untuk command yang boleh gagal','Gunakan if untuk conditional check','Tambahkan trap untuk cleanup saat exit'],
      code: {lang:'Bash', src:
`#!/bin/bash
set -euo pipefail

# Trap untuk cleanup
trap 'echo "Script gagal di baris $LINENO"' ERR

# ✅ Command yang boleh gagal — tambahkan || true
grep "pattern" file.txt || true

# ✅ Conditional check
if grep -q "pattern" file.txt; then
    echo "Ditemukan"
fi

# ✅ Exit code check manual
command_that_might_fail
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
    echo "Gagal dengan code: $EXIT_CODE"
fi`}
    },
  ],

  // ─────────────────────────────────────────────
  // REGEX
  // ─────────────────────────────────────────────
  regex: [
    {
      name: "Regex tidak match padahal sepertinya benar",
      sev: 'warning', badges: ['WARNING','PATTERN'],
      desc: 'Pattern regex tidak bekerja sesuai ekspektasi.',
      cause: ['Karakter spesial tidak di-escape: . * + ? ( ) [ ] { } ^ $ |','Flag tidak di-set (case insensitive, multiline)','Greedy vs lazy quantifier'],
      fix: ['Escape karakter spesial dengan backslash','Gunakan regex tester: regex101.com','Tambahkan flag yang diperlukan: /pattern/gi'],
      code: {lang:'JavaScript', src:
`// ❌ SALAH — titik match karakter apapun!
const emailRegex = /user.email@domain.com/;

// ✅ Escape titik
const emailRegex = /user\\.email@domain\\.com/;

// ✅ Regex email yang benar
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Greedy vs Lazy
const html = '<b>Bold</b> dan <b>Tebal</b>';
html.match(/<b>.*<\/b>/)[0];   // Greedy: '<b>Bold</b> dan <b>Tebal</b>'
html.match(/<b>.*?<\/b>/)[0];  // Lazy: '<b>Bold</b>' ✅`}
    },
    {
      name: "ReDoS — Catastrophic Backtracking",
      sev: 'critical', badges: ['CRITICAL','SECURITY','PERFORMANCE'],
      desc: 'Regex tertentu menyebabkan exponential backtracking yang membekukan server.',
      cause: ['Nested quantifiers: (a+)+','Alternation dengan overlap: (a|aa)+','Input user yang tidak divalidasi panjangnya'],
      fix: ['Hindari nested quantifiers','Batasi panjang input sebelum apply regex','Gunakan regex yang atomic atau possessive'],
      code: {lang:'JavaScript', src:
`// ❌ SANGAT BERBAHAYA — ReDoS vulnerability!
const badRegex = /^(a+)+$/;  // Exponential backtracking!
badRegex.test("aaaaaaaaaaaaaaaaaaaX"); // Hang!

// ❌ Juga berbahaya
const emailRegex = /^([a-zA-Z0-9])(([\\-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-zA-Z0-9]+[.]{1}(([a-zA-Z]{2,3})|([a-zA-Z]{2,3}[.]{1}[a-zA-Z]{2,3}))$/;

// ✅ Batasi panjang input dulu
function safeTest(input) {
  if (input.length > 200) return false; // Guard!
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input);
}`}
    },
  ],

  // ─────────────────────────────────────────────
  // JSON
  // ─────────────────────────────────────────────
  json: [
    {
      name: "SyntaxError: Unexpected token in JSON",
      sev: 'critical', badges: ['CRITICAL','SYNTAX'],
      desc: 'JSON tidak valid — tidak bisa di-parse.',
      cause: ['Trailing comma: {"a":1,}','Single quote bukan double quote','Komentar di JSON (tidak diperbolehkan)','Undefined atau function di JSON'],
      fix: ['Validasi di jsonlint.com','Gunakan JSON.stringify() bukan manual tulis','Trailing comma tidak valid di JSON'],
      code: {lang:'JavaScript', src:
`// ❌ SALAH — JSON tidak valid
{
  "name": "Alice",    // Komentar tidak boleh!
  "age": 25,          // Trailing comma!
  'city': 'Jakarta'   // Single quote tidak boleh!
}

// ✅ JSON yang valid
{
  "name": "Alice",
  "age": 25,
  "city": "Jakarta"
}

// ✅ Parse dengan error handling
try {
  const data = JSON.parse(jsonString);
} catch (err) {
  console.error('JSON invalid:', err.message);
}`}
    },
    {
      name: "JSON.stringify menghilangkan undefined dan function",
      sev: 'warning', badges: ['WARNING','SERIALIZATION'],
      desc: 'JSON.stringify() secara diam-diam mengabaikan undefined, Function, dan Symbol.',
      cause: ['Value undefined di-pass ke JSON.stringify','Mengharapkan semua property ter-serialize'],
      fix: ['Konversi undefined ke null sebelum stringify','Cek hasil stringify sebelum kirim','Gunakan replacer function untuk kontrol lebih'],
      code: {lang:'JavaScript', src:
`const obj = {
  name: "Alice",
  age: undefined,      // ← Hilang!
  greet: () => "Hi",   // ← Hilang!
  score: null,         // ← Tetap ada (null valid JSON)
};

console.log(JSON.stringify(obj));
// Output: {"name":"Alice","score":null}  ← age dan greet hilang!

// ✅ Handle undefined eksplisit
const safe = {
  name: obj.name,
  age: obj.age ?? null,  // undefined → null
};`}
    },
  ],

  // ─────────────────────────────────────────────
  // YAML
  // ─────────────────────────────────────────────
  yaml: [
    {
      name: "YAML parsing error — indentasi tidak konsisten",
      sev: 'critical', badges: ['CRITICAL','SYNTAX'],
      desc: 'YAML sangat sensitif terhadap indentasi dan spasi.',
      cause: ['Mix tab dan spasi','Indentasi tidak konsisten','Karakter spesial tidak di-quote'],
      fix: ['Gunakan HANYA spasi (tidak pernah tab) di YAML','Validasi di yaml-online.com','Quote string yang mengandung karakter spesial'],
      code: {lang:'YAML', src:
`# ❌ SALAH — Tab akan menyebabkan error
name: Alice
	age: 25    # Tab di sini = error!

# ❌ String dengan : harus di-quote
message: Hello: World  # Error! Titik dua tanpa spasi

# ✅ BENAR — konsisten 2 spasi
name: Alice
age: 25
address:
  city: Jakarta      # 2 spasi
  country: Indonesia # 2 spasi

# ✅ Quote string dengan karakter spesial
message: "Hello: World"
password: "pass:word#123!"`}
    },
    {
      name: "YAML boolean gotcha — nilai tidak terduga",
      sev: 'warning', badges: ['WARNING','PARSING'],
      desc: 'Beberapa nilai di YAML 1.1 di-parse sebagai boolean tanpa tanda kutip.',
      cause: ['yes, no, on, off, true, false di-parse sebagai boolean','Versi YAML lama (1.1) lebih agresif parse boolean'],
      fix: ['Selalu quote string yang mirip boolean','Gunakan YAML 1.2 (lebih ketat)','Tambahkan quotes: "yes", "no", "on", "off"'],
      code: {lang:'YAML', src:
`# ❌ Jebakan boolean di YAML 1.1
enabled: yes     # → true (bukan string "yes"!)
mode: on         # → true
status: off      # → false
debug: no        # → false
flag: true       # → true

# Country codes yang jadi boolean:
country: NO      # → false (Norwegia!)
country: YES     # → true

# ✅ Gunakan quotes
enabled: "yes"
country: "NO"
mode: "on"`}
    },
  ],

  // ─────────────────────────────────────────────
  // GRAPHQL
  // ─────────────────────────────────────────────
  graphql: [
    {
      name: "Cannot query field X on type Y",
      sev: 'critical', badges: ['CRITICAL','SCHEMA'],
      desc: 'Field yang di-query tidak ada di schema GraphQL.',
      cause: ['Typo nama field','Field belum ditambahkan ke schema','Mengakses field dari tipe yang salah'],
      fix: ['Cek schema dengan introspection','Gunakan GraphQL Playground atau Apollo Studio','Regenerate types jika pakai codegen'],
      code: {lang:'GraphQL', src:
`# ❌ SALAH — field 'username' tidak ada
query {
  user(id: "1") {
    username  # Error! Seharusnya 'name'
    email
  }
}

# ✅ Cek schema dulu
query IntrospectUser {
  __type(name: "User") {
    fields { name type { name } }
  }
}

# ✅ Query yang benar
query {
  user(id: "1") {
    name    # Field yang ada di schema
    email
  }
}`}
    },
    {
      name: "N+1 Query Problem di GraphQL resolver",
      sev: 'warning', badges: ['WARNING','PERFORMANCE'],
      desc: 'Resolver melakukan query database untuk setiap item — sangat lambat dengan data banyak.',
      cause: ['Resolver memanggil DB langsung tanpa batching','Tidak menggunakan DataLoader'],
      fix: ['Implementasi DataLoader untuk batch query','Satu query untuk semua item, bukan satu per item'],
      code: {lang:'JavaScript', src:
`// ❌ N+1 — 1 query untuk users + N query untuk setiap post author
const resolvers = {
  Post: {
    author: (post) => User.findById(post.authorId) // Dipanggil N kali!
  }
};

// ✅ DataLoader — batch semua user dalam satu query
const DataLoader = require('dataloader');
const userLoader = new DataLoader(async (ids) => {
  const users = await User.findByIds(ids); // Satu query!
  return ids.map(id => users.find(u => u.id === id));
});

const resolvers = {
  Post: {
    author: (post) => userLoader.load(post.authorId) // Auto-batched!
  }
};`}
    },
  ],

  // ─────────────────────────────────────────────
  // REST API
  // ─────────────────────────────────────────────
  rest: [
    {
      name: "401 Unauthorized vs 403 Forbidden — salah status code",
      sev: 'info', badges: ['INFO','HTTP'],
      desc: '401 dan 403 sering tertukar — keduanya berbeda maknanya.',
      cause: ['401: Belum autentikasi (siapa kamu?)','403: Sudah autentikasi tapi tidak punya izin (kamu tidak boleh)'],
      fix: ['401 → kirim token / login dulu','403 → akses ditolak meskipun sudah login','Gunakan status code yang semantically benar'],
      code: {lang:'JavaScript', src:
`// ✅ Status code yang tepat
app.get('/admin', authenticate, (req, res) => {
  // Belum login
  if (!req.user) return res.status(401).json({ error: 'Login required' });

  // Sudah login tapi bukan admin
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });

  res.json({ data: 'Admin panel' });
});

// HTTP Status Code cheatsheet:
// 200 OK, 201 Created, 204 No Content
// 400 Bad Request, 401 Unauth, 403 Forbidden, 404 Not Found
// 409 Conflict, 422 Unprocessable, 429 Too Many Requests
// 500 Internal Error, 503 Service Unavailable`}
    },
    {
      name: "API rate limit — 429 Too Many Requests",
      sev: 'warning', badges: ['WARNING','RATELIMIT'],
      desc: 'Terlalu banyak request ke API eksternal dalam waktu singkat.',
      cause: ['Loop request tanpa delay','Retry tanpa exponential backoff','Cache tidak digunakan'],
      fix: ['Implementasi exponential backoff','Cache response agar tidak request ulang','Respect Retry-After header'],
      code: {lang:'JavaScript', src:
`// ✅ Exponential backoff retry
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const res = await fetch(url, options);
      if (res.status === 429) {
        const retryAfter = res.headers.get('Retry-After') || (2 ** attempt);
        console.log(\`Rate limited, retry in \${retryAfter}s\`);
        await new Promise(r => setTimeout(r, retryAfter * 1000));
        continue;
      }
      return res.json();
    } catch (err) {
      if (attempt === maxRetries - 1) throw err;
    }
  }
}`}
    },
  ],

  // ─────────────────────────────────────────────
  // WHATSAPP PROTO / BAILEYS
  // ─────────────────────────────────────────────
  waproto: [
    {
      name: "Connection Closed / Stream Errored",
      sev: 'critical', badges: ['CRITICAL','CONNECTION'],
      desc: 'Koneksi WebSocket ke server WhatsApp terputus.',
      cause: ['Session invalid atau expired','IP di-rate limit oleh WhatsApp','QR code tidak di-scan dalam waktu','Server restart tanpa save session'],
      fix: ['Simpan dan load session dengan benar','Implementasi auto-reconnect','Gunakan Baileys dengan persistent auth state'],
      code: {lang:'JavaScript', src:
`const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth_info');

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on('creds.update', saveCreds); // WAJIB simpan session!

  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'close') {
      const statusCode = (lastDisconnect?.error as Boom)?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

      console.log('Disconnected. Reason:', statusCode);

      if (shouldReconnect) {
        setTimeout(connectToWhatsApp, 3000); // Reconnect setelah 3 detik
      } else {
        console.log('Logged out — hapus folder auth_info dan scan QR ulang');
      }
    } else if (connection === 'open') {
      console.log('WhatsApp terhubung!');
    }
  });

  return sock;
}`}
    },
    {
      name: "Error sending message — jid format salah",
      sev: 'critical', badges: ['CRITICAL','MESSAGING'],
      desc: 'Format JID (WhatsApp ID) salah menyebabkan pesan gagal dikirim.',
      cause: ['Nomor tanpa kode negara','Menggunakan format nomor lokal (0812xxx)','Lupa suffix @s.whatsapp.net atau @g.us untuk grup'],
      fix: ['Nomor pribadi: 628xxxxxxxx@s.whatsapp.net','Grup: id_grup@g.us','Gunakan fungsi helper untuk format JID'],
      code: {lang:'JavaScript', src:
`// ❌ SALAH — format JID yang salah
await sock.sendMessage('08123456789', { text: 'Hello' }); // Error!
await sock.sendMessage('62812345678', { text: 'Hello' });  // Kurang suffix!

// ✅ Format JID yang benar
const jid = '628123456789@s.whatsapp.net'; // Pribadi
const groupJid = '120363xxxxxx@g.us';       // Grup

await sock.sendMessage(jid, { text: 'Hello!' });

// ✅ Helper untuk format nomor
function formatJID(number) {
  // Hapus +, 0, dan karakter non-digit
  const cleaned = number.replace(/[^0-9]/g, '');
  // Ganti awalan 0 dengan kode negara 62 (Indonesia)
  const normalized = cleaned.startsWith('0')
    ? '62' + cleaned.slice(1)
    : cleaned;
  return normalized + '@s.whatsapp.net';
}

const jid = formatJID('+62 812-3456-789'); // → 628123456789@s.whatsapp.net`}
    },
    {
      name: "Baileys: rate limit / banned risk — terlalu cepat kirim",
      sev: 'critical', badges: ['CRITICAL','RATELIMIT','BAN'],
      desc: 'Mengirim pesan terlalu cepat ke banyak nomor berisiko ban akun WhatsApp.',
      cause: ['Loop kirim tanpa delay','Bulk message ke nomor yang belum simpan kontak','Konten yang terdeteksi spam'],
      fix: ['Delay minimal 1-3 detik antar pesan','Jangan kirim ke lebih 50 nomor per jam','Gunakan akun yang aktif dan punya riwayat normal'],
      code: {lang:'JavaScript', src:
`// ❌ BERBAHAYA — kirim massal tanpa delay
for (const number of contacts) {
  await sock.sendMessage(number + '@s.whatsapp.net', { text: msg });
  // Kirim secepat kilat = risiko ban!
}

// ✅ Kirim dengan delay aman
async function sendBulk(contacts, message, delayMs = 3000) {
  for (let i = 0; i < contacts.length; i++) {
    const jid = formatJID(contacts[i]);
    try {
      await sock.sendMessage(jid, { text: message });
      console.log(\`[\${i+1}/\${contacts.length}] Terkirim ke \${jid}\`);
    } catch (err) {
      console.error(\`Gagal kirim ke \${jid}:\`, err.message);
    }
    // Delay acak 2-5 detik agar lebih natural
    const delay = delayMs + Math.random() * 2000;
    await new Promise(r => setTimeout(r, delay));
  }
}`}
    },
    {
      name: "Proto encode error — message structure salah",
      sev: 'critical', badges: ['CRITICAL','PROTO'],
      desc: 'Struktur pesan WhatsApp Proto tidak valid saat coba kirim message type tertentu.',
      cause: ['Field proto yang salah atau tidak lengkap','Menggunakan field yang deprecated','Versi Baileys tidak kompatibel dengan struktur pesan'],
      fix: ['Cek dokumentasi Baileys terbaru untuk message structure','Update Baileys ke versi terbaru','Log protobuf object sebelum kirim'],
      code: {lang:'JavaScript', src:
`// ✅ Berbagai tipe pesan Baileys yang benar

// Kirim gambar
await sock.sendMessage(jid, {
  image: { url: './gambar.jpg' },
  caption: 'Ini caption'
});

// Kirim dokumen
await sock.sendMessage(jid, {
  document: fs.readFileSync('./file.pdf'),
  mimetype: 'application/pdf',
  fileName: 'dokumen.pdf'
});

// Kirim dengan button (WABiz)
await sock.sendMessage(jid, {
  text: 'Pilih opsi:',
  buttons: [
    { buttonId: 'btn1', buttonText: { displayText: 'Opsi 1' }, type: 1 },
    { buttonId: 'btn2', buttonText: { displayText: 'Opsi 2' }, type: 1 },
  ],
  headerType: 1
});

// Reply to message
await sock.sendMessage(jid, {
  text: 'Ini balasan',
}, { quoted: msg }); // msg adalah pesan yang di-quote`}
    },
    {
      name: "sock.ev.on tidak menerima pesan (message handler tidak jalan)",
      sev: 'warning', badges: ['WARNING','EVENTS'],
      desc: 'Event listener messages.upsert tidak menerima pesan masuk.',
      cause: ['Event name salah','Message dari bot sendiri (self-message)','Filter yang terlalu ketat','messages.update vs messages.upsert tertukar'],
      fix: ['Gunakan messages.upsert untuk pesan masuk baru','Filter key.fromMe untuk skip pesan sendiri','Log semua event untuk debug'],
      code: {lang:'JavaScript', src:
`// ✅ Handler pesan yang benar
sock.ev.on('messages.upsert', async ({ messages, type }) => {
  if (type !== 'notify') return; // Hanya pesan notifikasi baru

  for (const msg of messages) {
    // Skip pesan dari bot sendiri
    if (msg.key.fromMe) continue;

    // Skip jika bukan pesan text
    if (!msg.message) continue;

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      '';

    const from = msg.key.remoteJid;

    console.log(\`Pesan dari \${from}: \${text}\`);

    if (text.toLowerCase() === 'ping') {
      await sock.sendMessage(from, { text: 'Pong! 🏓' });
    }
  }
});`}
    },
  ],

  // ─────────────────────────────────────────────
  // MONGODB
  // ─────────────────────────────────────────────
  mongodb: [
    {
      name: "MongoServerError: E11000 duplicate key error",
      sev: 'critical', badges: ['CRITICAL','DUPLICATE'],
      desc: 'Insert/update melanggar unique index.',
      cause: ['Email atau field unik lainnya sudah ada','Race condition saat concurrent insert'],
      fix: ['Cek dulu sebelum insert','Gunakan upsert untuk insert-or-update','Handle duplicate key error di try/catch'],
      code: {lang:'JavaScript', src:
`// ❌ Tanpa error handling
await User.create({ email: 'a@b.com' }); // Crash jika duplikat!

// ✅ Handle duplicate key
try {
  await User.create({ email, name });
} catch (err) {
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    throw new Error(\`\${field} sudah terdaftar\`);
  }
  throw err;
}

// ✅ Upsert — insert jika belum ada, update jika ada
await User.findOneAndUpdate(
  { email },
  { $setOnInsert: { name, createdAt: new Date() } },
  { upsert: true, new: true }
);`}
    },
    {
      name: "MongoNetworkError — connection refused",
      sev: 'critical', badges: ['CRITICAL','CONNECTION'],
      desc: 'Tidak bisa terhubung ke MongoDB.',
      cause: ['MongoDB service tidak berjalan','URI connection string salah','Network/firewall memblokir port 27017','IP whitelist di Atlas tidak include server kamu'],
      fix: ['Cek MongoDB service: sudo systemctl status mongod','Verifikasi URI di .env','Di Atlas: tambahkan IP ke Network Access'],
      code: {lang:'JavaScript', src:
`const mongoose = require('mongoose');

// ✅ Connect dengan error handling dan retry
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB terhubung');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

// Event listener
mongoose.connection.on('error', err => console.error('DB error:', err));
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected, reconnecting...');
  connectDB();
});`}
    },
  ],

  // ─────────────────────────────────────────────
  // REDIS
  // ─────────────────────────────────────────────
  redis: [
    {
      name: "ECONNREFUSED — Redis tidak bisa terhubung",
      sev: 'critical', badges: ['CRITICAL','CONNECTION'],
      desc: 'Client Redis tidak bisa terhubung ke server Redis.',
      cause: ['Redis server tidak berjalan','Host/port salah di config','Firewall memblokir koneksi'],
      fix: ['Start Redis: redis-server atau sudo systemctl start redis','Cek config: REDIS_URL=redis://localhost:6379','Verifikasi dengan redis-cli ping'],
      code: {lang:'JavaScript', src:
`const { createClient } = require('redis');

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', (err) => console.error('Redis error:', err));
client.on('connect', () => console.log('Redis terhubung'));
client.on('reconnecting', () => console.log('Redis reconnecting...'));

await client.connect();

// Test koneksi
const pong = await client.ping();
console.log(pong); // PONG`}
    },
    {
      name: "Redis key expired / data tidak konsisten",
      sev: 'warning', badges: ['WARNING','CACHE'],
      desc: 'Cache miss setelah TTL expired — pattern cache harus diperhatikan.',
      cause: ['TTL terlalu pendek','Race condition saat cache miss (thundering herd)','Lupa set TTL sehingga memori penuh'],
      fix: ['Set TTL yang tepat: SETEX key 3600 value','Implementasi cache-aside pattern','Gunakan mutex untuk prevent thundering herd'],
      code: {lang:'JavaScript', src:
`// ✅ Cache-aside pattern
async function getUserWithCache(userId) {
  const cacheKey = \`user:\${userId}\`;

  // 1. Cek cache dulu
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // 2. Ambil dari DB
  const user = await db.findUser(userId);
  if (!user) return null;

  // 3. Simpan di cache dengan TTL 1 jam
  await redis.setEx(cacheKey, 3600, JSON.stringify(user));

  return user;
}

// Invalidate cache saat data berubah
async function updateUser(userId, data) {
  await db.updateUser(userId, data);
  await redis.del(\`user:\${userId}\`); // Hapus cache lama
}`}
    },
  ],

  // ─────────────────────────────────────────────
  // NGINX
  // ─────────────────────────────────────────────
  nginx: [
    {
      name: "502 Bad Gateway",
      sev: 'critical', badges: ['CRITICAL','PROXY'],
      desc: 'Nginx tidak bisa terhubung ke backend server (upstream).',
      cause: ['Backend server tidak berjalan','Port di proxy_pass salah','Unix socket tidak ada'],
      fix: ['Cek backend server running: pm2 status, systemctl status','Verifikasi port di proxy_pass sama dengan yang backend listen','Cek log: /var/log/nginx/error.log'],
      code: {lang:'Nginx', src:
`# ✅ Konfigurasi reverse proxy yang benar
server {
    listen 80;
    server_name domain.com;

    location / {
        proxy_pass http://localhost:3000;  # Port harus sama dengan backend!
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Cek konfigurasi sebelum reload
# nginx -t
# systemctl reload nginx`}
    },
    {
      name: "413 Request Entity Too Large",
      sev: 'warning', badges: ['WARNING','UPLOAD'],
      desc: 'File yang di-upload melebihi batas ukuran Nginx.',
      cause: ['client_max_body_size terlalu kecil (default 1MB)','Upload file besar ke API'],
      fix: ['Naikkan client_max_body_size di nginx.conf','Set juga di location block untuk upload endpoint'],
      code: {lang:'Nginx', src:
`# nginx.conf atau di dalam server/location block
http {
    client_max_body_size 50M;  # Izinkan upload sampai 50MB
}

# Atau spesifik untuk endpoint upload saja
server {
    location /api/upload {
        client_max_body_size 100M;
        proxy_pass http://localhost:3000;
        proxy_read_timeout 300s;  # Timeout lebih lama untuk upload besar
    }
}`}
    },
  ],

  // ─────────────────────────────────────────────
  // PRISMA ORM
  // ─────────────────────────────────────────────
  prisma: [
    {
      name: "PrismaClientKnownRequestError — Record not found (P2025)",
      sev: 'critical', badges: ['CRITICAL','ORM'],
      desc: 'Operasi Prisma gagal karena record yang dicari tidak ada.',
      cause: ['findUnique/findFirst pada data yang tidak ada','update/delete pada record yang sudah dihapus'],
      fix: ['Gunakan findFirst + null check','Catch P2025 error secara spesifik','Atau gunakan findUniqueOrThrow untuk auto-throw'],
      code: {lang:'JavaScript', src:
`import { Prisma } from '@prisma/client';

// ❌ Crash jika tidak ditemukan
const user = await prisma.user.findUnique({ where: { id } });
console.log(user.name); // Error jika user null!

// ✅ Null check
const user = await prisma.user.findUnique({ where: { id } });
if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// ✅ findUniqueOrThrow (Prisma 3.x+)
try {
  const user = await prisma.user.findUniqueOrThrow({ where: { id } });
} catch (err) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }
  }
  throw err;
}`}
    },
    {
      name: "PrismaClientInitializationError — DATABASE_URL tidak valid",
      sev: 'critical', badges: ['CRITICAL','CONFIG'],
      desc: 'Prisma tidak bisa terhubung ke database karena connection string salah.',
      cause: ['DATABASE_URL tidak di-set di .env','Format URL salah untuk database yang digunakan','Prisma generate belum dijalankan'],
      fix: ['Set DATABASE_URL di .env','Format: postgresql://user:pass@host:5432/dbname','Jalankan npx prisma generate setelah schema berubah'],
      code: {lang:'Terminal', src:
`# .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"
# atau MySQL:
DATABASE_URL="mysql://root:password@localhost:3306/mydb"

# Setelah ubah schema.prisma:
npx prisma generate     # Generate Prisma Client
npx prisma migrate dev  # Buat dan apply migration
npx prisma db push      # Push schema tanpa migration (dev only)

# Cek koneksi database
npx prisma db pull`}
    },
  ],

  // ─────────────────────────────────────────────
  // TAILWIND CSS
  // ─────────────────────────────────────────────
  tailwind: [
    {
      name: "Class Tailwind tidak berefek / tidak muncul di CSS",
      sev: 'critical', badges: ['CRITICAL','PURGE'],
      desc: 'Kelas Tailwind ada di HTML tapi tidak muncul di CSS final karena di-purge.',
      cause: ['Path di content config tidak mencakup file yang menggunakan class','Class di-generate secara dinamis (string concatenation)','Tailwind belum di-setup dengan benar'],
      fix: ['Update path content di tailwind.config.js','Jangan build class dinamis — gunakan class lengkap','Restart dev server setelah perubahan config'],
      code: {lang:'JavaScript', src:
`// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // ← Pastikan path cover semua file!
    './public/index.html',
    './components/**/*.{js,jsx}',
  ],
  // ...
}

// ❌ SALAH — class dinamis, tidak bisa di-detect!
const color = 'red';
<div className={\`text-\${color}-500\`}> // text-red-500 tidak ter-include!

// ✅ BENAR — class lengkap, bisa di-detect
const colorClass = 'text-red-500'; // Atau object mapping
<div className={colorClass}>`}
    },
    {
      name: "Conflict dengan CSS lain / class ter-override",
      sev: 'warning', badges: ['WARNING','SPECIFICITY'],
      desc: 'Utility Tailwind di-override oleh CSS lain yang lebih spesifik.',
      cause: ['CSS global atau komponen library override Tailwind','Urutan import CSS berpengaruh','Base styles dari library lain konflik dengan Tailwind reset'],
      fix: ['Tambahkan ! prefix untuk !important: !text-red-500','Atur urutan import CSS','Cek di DevTools → Computed styles'],
      code: {lang:'HTML', src:
`<!-- ✅ Important modifier untuk override -->
<p class="!text-red-500 !font-bold">
  Teks ini pasti merah meskipun ada CSS lain
</p>

<!-- ✅ Tambahkan layer di CSS sendiri jika perlu -->
<style>
@layer base {
  /* Reset default browser */
}
@layer components {
  .btn { @apply px-4 py-2 rounded font-medium; }
}
@layer utilities {
  /* Custom utilities */
}
</style>`}
    },
  ],

  // ─────────────────────────────────────────────
  // WEBPACK / VITE
  // ─────────────────────────────────────────────
  webpack: [
    {
      name: "Module parse failed: Unexpected token",
      sev: 'critical', badges: ['CRITICAL','BUILD'],
      desc: 'Webpack/Vite tidak bisa parse file karena loader yang sesuai belum dikonfigurasi.',
      cause: ['JSX tanpa Babel loader','TypeScript tanpa ts-loader atau esbuild','CSS/image import tanpa loader'],
      fix: ['Install dan konfigurasi loader yang sesuai','Vite: biasanya sudah handle otomatis','Cek babel.config.js atau vite.config.js'],
      code: {lang:'JavaScript', src:
`// webpack.config.js — konfigurasi loader
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  }
};`}
    },
    {
      name: "Vite: Cannot find module / EPERM saat build",
      sev: 'warning', badges: ['WARNING','BUILD'],
      desc: 'Vite gagal menemukan module atau error permission saat build.',
      cause: ['Path alias tidak dikonfigurasi','node_modules corrupt','File di-lock oleh antivirus di Windows'],
      fix: ['Set resolve.alias di vite.config.js','Hapus node_modules dan install ulang','Disable real-time protection antivirus sementara'],
      code: {lang:'JavaScript', src:
`// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Pisah vendor bundle
        }
      }
    }
  }
});`}
    },
  ],

  // ─────────────────────────────────────────────
  // R
  // ─────────────────────────────────────────────
  r: [
    {
      name: "Error: object of type 'closure' is not subsettable",
      sev: 'critical', badges: ['CRITICAL','SYNTAX'],
      desc: 'Mencoba subset sebuah fungsi (closure) menggunakan [ ] — biasanya typo.',
      cause: ['Lupa tanda kurung () saat panggil fungsi','Nama variabel sama dengan nama fungsi bawaan (c, t, q, dll)'],
      fix: ['Ganti nama variabel yang bentrok dengan fungsi bawaan','Pastikan memanggil fungsi dengan ()'],
      code: {lang:'R', src:
`# ❌ SALAH — 'c' adalah fungsi, bukan vector!
c[1]  # Error: object of type closure is not subsettable

# ❌ Nama variabel bertabrakan dengan fungsi
c <- c(1, 2, 3)  # Menimpa fungsi c()!
t <- matrix(1:4, 2)  # Menimpa fungsi t() (transpose)

# ✅ Gunakan nama yang tidak konflik
my_vec <- c(1, 2, 3)
my_vec[1]  # Mengakses elemen pertama

# ✅ Panggil fungsi dengan benar
result <- mean(my_vec)  # Bukan mean[my_vec]`}
    },
    {
      name: "Warning: NAs introduced by coercion",
      sev: 'warning', badges: ['WARNING','COERCION'],
      desc: 'Konversi tipe data menghasilkan NA karena nilai tidak bisa dikonversi.',
      cause: ['as.numeric() pada string non-angka','Kolom mixed type di dataframe'],
      fix: ['Bersihkan data sebelum konversi','Cek unique(column) untuk lihat nilai yang bermasalah','Gunakan is.na() setelah konversi untuk cek'],
      code: {lang:'R', src:
`x <- c("1", "2", "tiga", "4")
as.numeric(x)  # Warning: NAs introduced by coercion
# [1]  1  2 NA  4

# ✅ Cek sebelum konversi
problematic <- x[is.na(suppressWarnings(as.numeric(x)))]
cat("Nilai yang bermasalah:", problematic, "\n")

# ✅ Bersihkan dan konversi
library(dplyr)
df <- df %>%
  mutate(nilai = as.numeric(nilai)) %>%
  filter(!is.na(nilai))`}
    },
  ],

  // ─────────────────────────────────────────────
  // SCALA
  // ─────────────────────────────────────────────
  scala: [
    {
      name: "MatchError: tidak ada case yang cocok",
      sev: 'critical', badges: ['CRITICAL','PATTERN'],
      desc: 'Pattern matching tidak memiliki case untuk semua kemungkinan nilai.',
      cause: ['Sealed trait tidak handle semua subclass','Wildcard case (_) tidak ada'],
      fix: ['Tambahkan case _ untuk default','Gunakan sealed trait/class untuk exhaustive check','Compiler akan warn jika sealed class tidak lengkap'],
      code: {lang:'Scala', src:
`sealed trait Shape
case class Circle(r: Double) extends Shape
case class Square(s: Double) extends Shape

// ❌ SALAH — MatchError jika ada Rectangle
def area(shape: Shape): Double = shape match {
  case Circle(r) => math.Pi * r * r
  // Lupa Square! MatchError jika dipanggil dengan Square
}

// ✅ Handle semua case
def area(shape: Shape): Double = shape match {
  case Circle(r)  => math.Pi * r * r
  case Square(s)  => s * s
  case _          => throw new IllegalArgumentException("Unknown shape")
}`}
    },
  ],

  // ─────────────────────────────────────────────
  // HASKELL
  // ─────────────────────────────────────────────
  haskell: [
    {
      name: "Non-exhaustive patterns in function",
      sev: 'critical', badges: ['CRITICAL','PATTERN'],
      desc: 'Fungsi tidak handle semua kemungkinan input — runtime error.',
      cause: ['Pattern matching tidak lengkap','Maybe/Either tidak di-handle semua case'],
      fix: ['Tambahkan wildcard pattern: _ -> ...','Gunakan -Wall flag untuk warning exhaustiveness','Handle Nothing/Left secara eksplisit'],
      code: {lang:'Haskell', src:
`-- ❌ SALAH — non-exhaustive!
head' :: [a] -> a
head' (x:_) = x
-- Apa yang terjadi dengan list kosong?

-- ✅ Handle semua case
head' :: [a] -> Maybe a
head' []    = Nothing
head' (x:_) = Just x

-- ✅ Penggunaan yang aman
case head' myList of
  Nothing -> putStrLn "List kosong"
  Just x  -> print x`}
    },
  ],
};