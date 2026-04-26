// CryVeth Languages Database
// 45 languages with full metadata — by @NortexZ
// Fixed version — bugs patched by Claude

export const LANGS_DB = [
  // ─── WEB / FRONTEND & BACKEND ───────────────────────────────────────────────
  {
    id: 'javascript', ic: 'JS', nm: 'JavaScript', yr: '1995 — Brendan Eich', col: '#ffe066',
    cat: 'Web / Frontend & Backend', dif: 2,
    tgs: ['Web', 'Backend', 'Mobile', 'Bot'],
    dsc: 'Bahasa paling populer di dunia 12 tahun berturut-turut. Awalnya hanya berjalan di browser, kini hadir di server (Node.js), mobile (React Native), desktop (Electron), dan IoT. JavaScript adalah satu-satunya bahasa yang secara native dijalankan oleh semua browser — menjadikannya bahasa wajib bagi setiap web developer. Ekosistemnya sangat luas dengan npm sebagai manajer package terbesar di dunia (2 juta+ package). Credits: @NortexZ',
    use: [
      'Website interaktif dan Single Page App (SPA)',
      'REST API & GraphQL server (Node.js)',
      'Bot Telegram, WhatsApp, Discord',
      'Game berbasis browser (Phaser.js)',
      'Desktop app lintas platform (Electron)',
      'Mobile app (React Native, Ionic)',
    ],
    learn: [
      'Variabel (var/let/const), tipe data primitif, operator',
      'Kondisi (if/else, switch), loop (for, while, forEach)',
      'ES6+: arrow function, destructuring, spread/rest, template literal',
      'async/await, Promise, fetch API untuk pemrograman asinkronus',
      'DOM manipulation: querySelector, addEventListener, innerHTML',
      'Module system: import/export (ESM)',
      'Framework: React, Vue.js, atau Svelte untuk UI',
      'Backend: Node.js + Express atau Fastify',
    ],
    refs: 'javascript.info · MDN Web Docs · nodejs.org · tc39.es',
    example: `// Modern JavaScript — ES2024
const fetchUsers = async (page = 1, limit = 10) => {
  try {
    const res = await fetch(\`/api/users?page=\${page}&limit=\${limit}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
    const { data, total, pages } = await res.json();
    return { data, total, pages };
  } catch (err) {
    console.error('Fetch failed:', err.message);
    throw err;
  }
};

// Optional chaining & nullish coalescing
const user = await fetchUsers();
const name = user?.data?.[0]?.name ?? 'Anonymous';
const avatar = user?.data?.[0]?.profile?.avatar ?? '/default.png';

// Array methods chaining
const activeAdmins = user.data
  .filter(u => u.isActive && u.role === 'admin')
  .map(u => ({ id: u.id, name: u.name }))
  .slice(0, 5);`,
  },

  {
    id: 'typescript', ic: 'TS', nm: 'TypeScript', yr: '2012 — Microsoft', col: '#2979ff',
    cat: 'Web / Frontend & Backend', dif: 2,
    tgs: ['Web', 'Backend', 'Type-safe', 'Enterprise'],
    dsc: 'Superset JavaScript dengan static typing yang dikembangkan Microsoft. TypeScript menambahkan sistem tipe yang kuat sehingga bug tertangkap saat kompilasi sebelum kode dijalankan. Auto-complete lebih cerdas di editor, refactoring lebih aman, dan dokumentasi kode otomatis lewat tipe. Wajib dipakai di proyek tim besar atau enterprise. Semua kode JavaScript valid adalah kode TypeScript — migrasi bisa bertahap.',
    use: [
      'Large-scale web app dengan tim besar',
      'API backend yang maintainable jangka panjang',
      'Library dan framework open source',
      'Monorepo enterprise (NX, Turborepo)',
    ],
    learn: [
      'Kuasai JavaScript ES6+ terlebih dahulu',
      'Install: npm install -g typescript, lalu tsc --init',
      'Tipe dasar: string, number, boolean, null, undefined, any, unknown',
      'Array, tuple, union (A | B), intersection (A & B)',
      'Interface vs type alias — kapan pakai yang mana',
      'Generics: fungsi dan class yang reusable dengan tipe dinamis',
      'Utility types: Partial, Required, Pick, Omit, Record',
      'Integrasi dengan React (tsx), Node.js, atau Deno',
    ],
    refs: 'typescriptlang.org · Total TypeScript (Matt Pocock) · TypeScript Deep Dive',
    example: `// TypeScript — Strict typing & generics
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
  profile?: {
    avatar: string;
    bio: string;
  };
}

type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pages: number;
};

async function getUsers(
  page = 1,
  role?: User['role']
): Promise<PaginatedResponse<User>> {
  const params = new URLSearchParams({ page: String(page) });
  if (role) params.set('role', role);
  const res = await fetch(\`/api/users?\${params}\`);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json() as Promise<PaginatedResponse<User>>;
}

// Mapped type — buat semua field optional tapi tetap typed
type UserDraft = Partial<Omit<User, 'id' | 'createdAt'>>;`,
  },

  {
    id: 'python', ic: 'PY', nm: 'Python', yr: '1991 — Guido van Rossum', col: '#3b82f6',
    cat: 'Backend / AI / Data', dif: 1,
    tgs: ['AI/ML', 'Backend', 'Data', 'Script', 'Bot'],
    dsc: 'Bahasa termudah untuk dipelajari namun sangat powerful di berbagai domain. Python adalah pilihan utama untuk AI/ML, data science, dan automation karena memiliki ekosistem library paling lengkap — mulai dari NumPy, Pandas, hingga PyTorch dan TensorFlow. Sintaksnya bersih dan mudah dibaca, sehingga cocok untuk pemula sekaligus profesional. Python menganut filosofi "batteries included" — banyak fitur sudah tersedia tanpa perlu install library tambahan.',
    use: [
      'Machine learning dan AI (PyTorch, TensorFlow, scikit-learn)',
      'Data science dan analisis data (Pandas, NumPy, Matplotlib)',
      'Web API (FastAPI, Django, Flask)',
      'Automation dan scripting system',
      'Bot Telegram, Discord, dan WhatsApp',
      'Computer vision (OpenCV) dan NLP',
    ],
    learn: [
      'Sintaks dasar: variabel, kondisi, loop, fungsi',
      'Struktur data: list, dict, tuple, set dan operasinya',
      'OOP: class, inheritance, dunder methods',
      'pip dan virtual environment (venv / conda)',
      'File I/O, exception handling, context manager (with)',
      'NumPy & Pandas untuk manipulasi data',
      'Requests/httpx untuk HTTP, BeautifulSoup untuk scraping',
      'FastAPI atau Django REST Framework untuk web API',
    ],
    refs: 'python.org · realpython.com · fastapi.tiangolo.com · docs.python.org',
    example: `# Python 3.12 — Modern & clean
from dataclasses import dataclass, field
from typing import Optional
import asyncio
import aiohttp

@dataclass
class User:
    id: int
    name: str
    email: str
    role: str = 'user'
    tags: list[str] = field(default_factory=list)

    @property
    def is_admin(self) -> bool:
        return self.role == 'admin'

    def __repr__(self) -> str:
        return f"User({self.name!r}, role={self.role!r})"

async def fetch_users(page: int = 1) -> list[User]:
    async with aiohttp.ClientSession() as session:
        async with session.get(f'/api/users?page={page}') as resp:
            resp.raise_for_status()
            data = await resp.json()
            return [User(**item) for item in data['users']]

async def main():
    users = await fetch_users()
    admins = [u for u in users if u.is_admin]
    print(f"Found {len(admins)} admin(s): {admins}")

asyncio.run(main())`,
  },

  {
    id: 'nodejs', ic: 'NODE', nm: 'Node.js', yr: '2009 — Ryan Dahl', col: '#00ff94',
    cat: 'Backend / Server', dif: 2,
    tgs: ['Backend', 'API', 'Real-time', 'Bot', 'CLI'],
    dsc: 'Runtime JavaScript di server menggunakan V8 engine milik Chrome. Arsitektur event-driven dan non-blocking I/O menjadikannya sangat efisien untuk menangani ribuan koneksi bersamaan tanpa memblokir thread. npm memiliki lebih dari 2 juta package — ekosistem terbesar untuk bahasa apapun. Node.js dipakai oleh Netflix, LinkedIn, Uber, dan PayPal untuk meningkatkan performa backend mereka secara signifikan.',
    use: [
      'REST API dan GraphQL server (Express, Fastify, Hono)',
      'Bot Telegram, WhatsApp, Discord (node-telegram-bot-api, Baileys)',
      'Real-time aplikasi dengan WebSocket (Socket.IO)',
      'CLI tools dan tooling developer',
      'Microservices dan serverless functions',
    ],
    learn: [
      'Kuasai JavaScript ES6+ dan konsep async/await dulu',
      'Install dari nodejs.org — selalu pilih versi LTS',
      'Built-in module: fs, path, http, crypto, stream, events',
      'npm/yarn/pnpm untuk manajemen package',
      'Express.js untuk web server dasar, Fastify untuk performa tinggi',
      'Prisma atau Sequelize untuk ORM database',
      'PM2 untuk process management di production',
      'Docker untuk containerisasi deployment',
    ],
    refs: 'nodejs.org · npmjs.com · expressjs.com · fastify.dev',
    example: `// Node.js — REST API dengan Express + middleware
require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

// Rate limiter: maks 100 req/15 menit per IP
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Middleware auth sederhana
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  req.user = verifyToken(token); // implementasi sendiri
  next();
};

app.get('/api/users', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, role } = req.query;
    const filter = role ? { role } : {};
    const [users, total] = await Promise.all([
      User.find(filter).skip((page - 1) * limit).limit(+limit).lean(),
      User.countDocuments(filter),
    ]);
    res.json({ data: users, total, page: +page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT ?? 3000, () =>
  console.log(\`Server running on port \${process.env.PORT ?? 3000}\`));`,
  },

  {
    id: 'html', ic: 'HTML', nm: 'HTML', yr: '1991 — Tim Berners-Lee', col: '#ff7043',
    cat: 'Web / Frontend', dif: 1,
    tgs: ['Web', 'Frontend', 'SEO', 'Structure'],
    dsc: 'HyperText Markup Language adalah fondasi dan tulang punggung setiap halaman web. HTML bukan bahasa pemrograman, melainkan markup language yang mendefinisikan struktur dan semantik konten. Jika website adalah sebuah bangunan, HTML adalah rangka dan struktur bangunannya. HTML5 modern membawa semantic elements, multimedia native, canvas, SVG, dan form validation. Setiap browser di dunia memahami HTML.',
    use: [
      'Struktur dan kerangka setiap halaman web',
      'Template email HTML responsif',
      'Progressive Web App (PWA) foundation',
      'Dokumen digital dan laporan online',
      'Canvas untuk grafik 2D dan game sederhana',
    ],
    learn: [
      'Tag fundamental: div, span, p, h1–h6, a, img, button',
      'Semantic HTML5: header, nav, main, article, section, aside, footer',
      'Form dan input: text, email, password, select, checkbox, radio',
      'Tabel: table, thead, tbody, tr, th, td',
      'Multimedia: audio, video, picture, source',
      'Accessibility: alt text, aria-label, role, tabindex',
      'Meta tags untuk SEO: title, description, og:image',
      'Validasi HTML: validator.w3.org',
    ],
    refs: 'developer.mozilla.org/HTML · web.dev/learn/html · html.spec.whatwg.org',
    example: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Platform belajar coding gratis untuk developer Indonesia">
  <meta property="og:title" content="CryVeth — Belajar Coding">
  <title>CryVeth — Platform Coding Indonesia</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header role="banner">
    <nav aria-label="Navigasi utama">
      <a href="/" aria-current="page">Home</a>
      <a href="/learn">Belajar</a>
      <a href="/community">Komunitas</a>
    </nav>
  </header>

  <main id="main-content">
    <section class="hero" aria-labelledby="hero-heading">
      <h1 id="hero-heading">Belajar Coding Gratis</h1>
      <p>Platform <strong>terlengkap</strong> untuk developer Indonesia.</p>
      <a href="/start" class="btn-primary" role="button">Mulai Sekarang</a>
    </section>

    <section aria-label="Daftar bahasa pemrograman">
      <article class="card">
        <h2>JavaScript</h2>
        <p>Bahasa web paling populer di dunia.</p>
      </article>
    </section>
  </main>

  <footer role="contentinfo">
    <p>© 2025 CryVeth — by <a href="https://t.me/NortexZ">@NortexZ</a></p>
  </footer>
</body>
</html>`,
  },

  {
    id: 'css', ic: 'CSS', nm: 'CSS', yr: '1996 — Håkon Wium Lie', col: '#f72585',
    cat: 'Web / Frontend', dif: 2,
    tgs: ['Styling', 'Animation', 'Responsive', 'Layout'],
    dsc: 'Cascading Style Sheets mengatur seluruh tampilan visual halaman HTML — warna, font, layout, spacing, animasi, hingga efek 3D. Dengan Flexbox dan CSS Grid, membangun layout kompleks jadi mudah tanpa JavaScript. CSS Custom Properties (variabel) memungkinkan theming dinamis. CSS modern sangat powerful: kamu bisa buat animasi halus, dark mode otomatis, dan desain responsif murni dengan CSS saja.',
    use: [
      'Desain dan layout responsif website',
      'Animasi dan transisi UI yang halus',
      'Dark mode dan sistem theming',
      'Print stylesheet untuk PDF',
      'CSS art dan ilustrasi pure CSS',
    ],
    learn: [
      'Box model: content, padding, border, margin',
      'Selector: class, id, pseudo-class (:hover, :nth-child), pseudo-element (::before)',
      'Flexbox: flex-direction, justify-content, align-items, flex-wrap',
      'CSS Grid: grid-template-columns/rows, grid-area, auto-fill/auto-fit',
      'Responsive design: @media query, clamp(), min(), max()',
      'CSS Custom Properties (variabel): --color-primary: #fff',
      'Animasi: @keyframes, transition, transform (translate, rotate, scale)',
      'Modern: container queries, :has(), cascade layers (@layer)',
    ],
    refs: 'developer.mozilla.org/CSS · flexboxfroggy.com · cssgridgarden.com · csstricks.com',
    example: `/* Modern CSS — Custom Properties + Flexbox + Grid + Animation */
:root {
  --primary: #00e5ff;
  --secondary: #f72585;
  --bg: #06080d;
  --surface: #0d1117;
  --text: #e8eaf6;
  --radius: 12px;
  --shadow: 0 4px 24px rgba(0, 229, 255, 0.15);
}

/* Dark mode otomatis via prefers-color-scheme */
@media (prefers-color-scheme: light) {
  :root { --bg: #f0f4ff; --surface: #fff; --text: #1a1a2e; }
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  padding: clamp(1rem, 5vw, 4rem);
  text-align: center;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.card {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 229, 255, 0.25);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-in { animation: fadeInUp 0.5s ease both; }`,
  },

  // ─── WEB / BACKEND ──────────────────────────────────────────────────────────
  {
    id: 'php', ic: 'PHP', nm: 'PHP', yr: '1994 — Rasmus Lerdorf', col: '#a855f7',
    cat: 'Web / Backend', dif: 2,
    tgs: ['Web', 'CMS', 'WordPress', 'Laravel'],
    dsc: 'PHP mengtenagai lebih dari 77% website di seluruh dunia — termasuk Wikipedia, WordPress, dan awal Facebook. Stigma lama PHP sudah tidak relevan; PHP modern (versi 8.x) sangat ekspresif dengan JIT compiler, fitur OOP penuh, named arguments, enum, dan fibers. Framework Laravel menjadikan PHP salah satu framework web paling produktif dan elegan yang pernah ada. Ekosistem WordPress menjadikan PHP pilihan wajib bagi ribuan developer.',
    use: [
      'Website dinamis dan CMS custom',
      'WordPress, WooCommerce, dan ekosistem plugin',
      'REST API backend dengan Laravel/Lumen',
      'E-commerce dan payment gateway integration',
      'Server-side rendering untuk SEO',
    ],
    learn: [
      'Install XAMPP, Laragon, atau Docker untuk environment lokal',
      'Sintaks dasar: variabel ($var), echo, string, array, kondisi, loop',
      'Superglobals: $_GET, $_POST, $_SESSION, $_SERVER',
      'OOP modern: class, interface, abstract, trait',
      'PDO dan prepared statement untuk database aman (SQL injection prevention)',
      'Composer untuk manajemen dependency',
      'Laravel: routing, Eloquent ORM, Blade template, Artisan CLI',
      'Security: CSRF protection, input validation, password_hash()',
    ],
    refs: 'php.net · laravel.com · laracasts.com · phptherightway.com',
    example: `<?php
// Modern PHP 8.3 — Enums, readonly, named args, match
declare(strict_types=1);

enum UserRole: string {
    case Admin = 'admin';
    case User  = 'user';
    case Guest = 'guest';

    public function label(): string {
        return match($this) {
            self::Admin => 'Administrator',
            self::User  => 'Pengguna',
            self::Guest => 'Tamu',
        };
    }

    public function canPost(): bool {
        return $this !== self::Guest;
    }
}

readonly class User {
    public function __construct(
        public readonly int      $id,
        public readonly string   $name,
        public readonly string   $email,
        public readonly UserRole $role = UserRole::User,
        public readonly \\DateTimeImmutable $createdAt = new \\DateTimeImmutable(),
    ) {}

    public function isAdmin(): bool {
        return $this->role === UserRole::Admin;
    }

    public function toArray(): array {
        return [
            'id'    => $this->id,
            'name'  => $this->name,
            'email' => $this->email,
            'role'  => $this->role->value,
        ];
    }
}

// Pakai named arguments
$user = new User(id: 1, name: 'Alice', email: 'alice@example.com', role: UserRole::Admin);
echo $user->role->label(); // "Administrator"`,
  },

  {
    id: 'ruby', ic: 'RB', nm: 'Ruby', yr: '1995 — Yukihiro Matsumoto', col: '#cc342d',
    cat: 'Web / Backend', dif: 2,
    tgs: ['Web', 'Rails', 'Scripting', 'Elegant'],
    dsc: "Ruby dirancang dengan filosofi utama: kebahagiaan developer. Semuanya adalah objek, sintaksnya sangat ekspresif dan mudah dibaca layaknya bahasa Inggris. Ruby on Rails, framework web yang dibangun di atas Ruby, merevolusi web development dengan konsep \"Convention over Configuration\" dan \"Don't Repeat Yourself (DRY)\". Rails dipakai oleh GitHub, Shopify, Airbnb, dan Basecamp.",
    use: [
      'Web app full-stack dengan Ruby on Rails',
      'REST API backend yang cepat dibangun',
      'Scripting dan task automation dengan Rake',
      'Rapid prototyping produk MVP',
      'Testing: RSpec untuk unit dan integration test',
    ],
    learn: [
      'Sintaks Ruby yang ekspresif: everything is an object',
      'String interpolation: "Hello, #{name}!"',
      'Blocks, Procs, dan Lambdas — perbedaan dan penggunaannya',
      'Symbol vs String, Hash dengan symbol key',
      'OOP: class, inheritance, module (mixin)',
      'Bundler dan Gemfile untuk manajemen dependency',
      'Ruby on Rails: MVC, scaffolding, routes',
      'ActiveRecord: ORM yang powerful dan ekspresif',
    ],
    refs: 'ruby-lang.org · guides.rubyonrails.org · rubygems.org',
    example: `# Ruby — Elegant OOP + Rails-style
class User
  attr_accessor :id, :name, :email, :role, :created_at

  ROLES = %i[admin moderator user guest].freeze

  def initialize(id:, name:, email:, role: :user)
    @id         = id
    @name       = name
    @email      = email
    @role       = role.to_sym.then { ROLES.include?(_1) ? _1 : :user }
    @created_at = Time.now
  end

  def admin?     = role == :admin
  def moderator? = role == :moderator
  def active?    = !email.nil? && !email.empty?

  def to_s = "#{name} <#{email}> [#{role}]"

  def to_h
    { id: id, name: name, email: email, role: role,
      created_at: created_at.iso8601 }
  end
end

# Enumerable + block
users = [
  User.new(id: 1, name: "Alice", email: "a@x.com", role: :admin),
  User.new(id: 2, name: "Bob",   email: "b@x.com"),
]

admins    = users.select(&:admin?)
user_list = users.map(&:to_s).join(", ")
puts "Admins: #{admins.map(&:name).join(', ')}"`,
  },

  // ─── BACKEND / ENTERPRISE ───────────────────────────────────────────────────
  {
    id: 'java', ic: 'JAVA', nm: 'Java', yr: '1995 — James Gosling (Sun Microsystems)', col: '#ff7043',
    cat: 'Backend / Enterprise', dif: 3,
    tgs: ['Enterprise', 'Android', 'Backend', 'OOP'],
    dsc: '"Write once, run anywhere." Java adalah pilihan utama untuk sistem enterprise skala besar karena stabilitasnya yang terbukti selama 30 tahun. JVM (Java Virtual Machine) memungkinkan kode berjalan di platform apapun tanpa modifikasi. Dipakai oleh bank, institusi keuangan, dan perusahaan Fortune 500. Spring Boot menjadikan Java framework backend yang modern dan produktif. Java juga fondasi awal Android.',
    use: [
      'Enterprise backend dengan Spring Boot',
      'Microservices dan service mesh',
      'Android development (legacy dan modern)',
      'Big data: Apache Hadoop, Apache Spark',
      'Banking system dan financial technology',
    ],
    learn: [
      'OOP fundamental: class, object, inheritance, polymorphism, encapsulation',
      'Interface, abstract class, dan kapan menggunakannya',
      'Java Collections: List, Set, Map, Queue',
      'Generics untuk type safety',
      'Stream API dan lambda (Java 8+): filter, map, collect',
      'Exception handling: try-catch-finally, custom exception',
      'Concurrency: Thread, ExecutorService, CompletableFuture',
      'Spring Boot: REST API, dependency injection, JPA/Hibernate',
    ],
    refs: 'docs.oracle.com · spring.io · baeldung.com · dev.java',
    example: `// Java 21 — Records, Sealed classes, Pattern matching
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

// Record — immutable data class otomatis
record User(int id, String name, String email, Role role) {}

sealed interface Role permits AdminRole, UserRole, GuestRole {}
record AdminRole() implements Role {}
record UserRole(String department) implements Role {}
record GuestRole() implements Role {}

public class UserService {
    private final List<User> users;

    public UserService(List<User> users) {
        this.users = users;
    }

    public Optional<User> findById(int id) {
        return users.stream()
            .filter(u -> u.id() == id)
            .findFirst();
    }

    public List<User> findByRole(Class<? extends Role> roleType) {
        return users.stream()
            .filter(u -> roleType.isInstance(u.role()))
            .collect(Collectors.toList());
    }

    // Pattern matching for switch (Java 21)
    public String describeRole(User user) {
        return switch (user.role()) {
            case AdminRole a          -> "Administrator";
            case UserRole u           -> "User di " + u.department();
            case GuestRole g          -> "Tamu";
        };
    }
}`,
  },

  {
    id: 'csharp', ic: 'C#', nm: 'C#', yr: '2000 — Anders Hejlsberg (Microsoft)', col: '#9b59b6',
    cat: 'Backend / Enterprise', dif: 3,
    tgs: ['Microsoft', 'Unity', 'ASP.NET', 'Enterprise'],
    dsc: 'C# adalah bahasa utama ekosistem Microsoft .NET. Dipakai untuk ASP.NET Core (backend web berkinerja tinggi), Unity (engine game terpopuler di dunia), Windows desktop, dan Blazor (web app dengan C#). C# modern (versi 12) sangat ekspresif dengan primary constructor, collection expression, pattern matching canggih, dan LINQ. Performa .NET 8+ bisa menandingi Go dan bahkan Rust dalam beberapa benchmark.',
    use: [
      'ASP.NET Core backend — REST API dan gRPC',
      'Unity game development (2D dan 3D)',
      'Windows desktop app (WPF, WinUI)',
      'Enterprise sistem dengan .NET ecosystem',
      'Blazor — web app full-stack dengan C#',
    ],
    learn: [
      'OOP: class, interface, abstract class, inheritance',
      'LINQ: Where, Select, OrderBy, GroupBy, Join — query data elegan',
      'async/await dan Task untuk pemrograman asinkronus',
      'Pattern matching: switch expression, is keyword',
      'Nullable reference types untuk null safety',
      'Dependency Injection bawaan ASP.NET Core',
      'Entity Framework Core untuk ORM database',
      'NuGet untuk package management',
    ],
    refs: 'learn.microsoft.com · dotnet.microsoft.com · unity.com',
    example: `// C# 12 — Primary constructor, collection expression, LINQ
using System.Text.Json.Serialization;

[JsonConverter(typeof(JsonStringEnumConverter))]
enum UserRole { Admin, User, Guest }

// Primary constructor (C# 12)
record User(int Id, string Name, string Email, UserRole Role = UserRole.User) {
    public bool IsAdmin => Role == UserRole.Admin;
    public string Initials => string.Concat(Name.Split(' ').Select(w => w[0]));
}

public class UserService {
    // Collection expression (C# 12)
    private readonly List<User> _users = [];

    public async Task<User?> GetByIdAsync(int id, CancellationToken ct = default) {
        await Task.Delay(10, ct); // simulasi async DB call
        return _users.FirstOrDefault(u => u.Id == id);
    }

    // LINQ — filter + transform
    public IEnumerable<string> GetAdminNames() =>
        _users
            .Where(u => u.IsAdmin)
            .OrderBy(u => u.Name)
            .Select(u => \`\${u.Name} (\${u.Initials})\`);

    public Dictionary<UserRole, int> GetRoleStats() =>
        _users.GroupBy(u => u.Role)
              .ToDictionary(g => g.Key, g => g.Count());
}`,
  },

  // ─── BACKEND / SYSTEM ───────────────────────────────────────────────────────
  {
    id: 'go', ic: 'GO', nm: 'Go', yr: '2007 — Google (Rob Pike, Ken Thompson)', col: '#00acd7',
    cat: 'Backend / System', dif: 3,
    tgs: ['Backend', 'Microservices', 'Cloud', 'CLI', 'Performance'],
    dsc: 'Go lahir dari frustrasi engineers Google terhadap kompleksitas C++ dan lambatnya Python. Hasilnya: bahasa yang sederhana, kompilasi ultrafast, dan concurrency kelas dunia via goroutines. Satu program Go bisa menjalankan jutaan goroutine secara bersamaan dengan overhead sangat kecil. Docker, Kubernetes, Terraform, dan Prometheus semua ditulis dalam Go. Ideal untuk backend yang butuh throughput tinggi.',
    use: [
      'Microservices high-performance (Gin, Echo, Fiber)',
      'CLI tools dan developer tooling',
      'Cloud-native apps dan Kubernetes operator',
      'Proxy dan infrastructure tools',
      'Concurrent system dan streaming data',
    ],
    learn: [
      'golang.org/tour — tour interaktif resmi, wajib ditamatkan',
      'Variabel, fungsi, struct, method, pointer',
      'Interface — cara Go menerapkan polymorphism',
      'Error handling idiomatis: if err != nil { ... }',
      'Goroutines: go func() {} — concurrency mudah',
      'Channel: komunikasi antar goroutine secara aman',
      'go mod dan go.sum untuk dependency management',
      'Testing bawaan: testing package + go test',
    ],
    refs: 'golang.org · gobyexample.com · go.dev/doc · awesome-go.com',
    example: `// Go — Goroutines + channels + context
package main

import (
    "context"
    "encoding/json"
    "fmt"
    "net/http"
    "time"
)

type User struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

// Fetch dengan timeout via context
func getUser(ctx context.Context, id int) (*User, error) {
    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel()

    req, err := http.NewRequestWithContext(ctx, http.MethodGet,
        fmt.Sprintf("https://api.example.com/users/%d", id), nil)
    if err != nil {
        return nil, fmt.Errorf("buat request: %w", err)
    }

    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return nil, fmt.Errorf("kirim request: %w", err)
    }
    defer resp.Body.Close()

    var u User
    if err := json.NewDecoder(resp.Body).Decode(&u); err != nil {
        return nil, fmt.Errorf("decode JSON: %w", err)
    }
    return &u, nil
}

// Fetch banyak user secara concurrent
func getUsers(ids []int) []User {
    ch := make(chan User, len(ids))
    for _, id := range ids {
        go func(id int) {
            if u, err := getUser(context.Background(), id); err == nil {
                ch <- *u
            }
        }(id)
    }
    results := make([]User, 0, len(ids))
    for range ids {
        results = append(results, <-ch)
    }
    return results
}`,
  },

  {
    id: 'rust', ic: 'RS', nm: 'Rust', yr: '2010 — Mozilla Research (Graydon Hoare)', col: '#dea584',
    cat: 'System / Low Level', dif: 5,
    tgs: ['System', 'WebAssembly', 'Memory-safe', 'Performance'],
    dsc: 'Rust adalah bahasa sistem yang menjamin memory safety tanpa garbage collector. Ownership system Rust mencegah null pointer dereference, buffer overflow, dan data race secara statis saat kompilasi — bukan runtime. Hasilnya: performa setara C/C++ tapi dengan keamanan yang jauh lebih tinggi. Stack Overflow "most admired language" selama 9 tahun berturut-turut. Dipakai oleh Microsoft, Google, Amazon, Mozilla, dan Cloudflare.',
    use: [
      'System programming dan OS (Linux kernel sudah support Rust)',
      'WebAssembly untuk performa browser-level',
      'Browser engine (Servo oleh Mozilla)',
      'Blockchain dan smart contract (Solana, Near)',
      'Game engine (Bevy)',
      'CLI tools ultra-fast (ripgrep, fd, bat, exa)',
    ],
    learn: [
      'Ownership: setiap nilai punya satu owner, drop otomatis',
      'Borrowing: &reference (immutable) dan &mut reference (mutable)',
      'Lifetime: memastikan referensi tidak outlive data-nya',
      'Struct, enum, dan pattern matching yang powerful',
      'Result<T, E> dan Option<T> sebagai pengganti exception dan null',
      'Traits: polymorphism ala interface tapi lebih powerful',
      'Generics untuk kode yang reusable dan type-safe',
      'Cargo: build system + package manager bawaan',
    ],
    refs: 'doc.rust-lang.org/book · rustlings · exercism.io/tracks/rust · crates.io',
    example: `// Rust — Ownership, generics, traits
use std::collections::HashMap;
use std::fmt;

#[derive(Debug, Clone, PartialEq)]
enum Role { Admin, User, Guest }

impl fmt::Display for Role {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Role::Admin => write!(f, "Administrator"),
            Role::User  => write!(f, "Pengguna"),
            Role::Guest => write!(f, "Tamu"),
        }
    }
}

#[derive(Debug, Clone)]
struct User {
    id:    u32,
    name:  String,
    email: String,
    role:  Role,
}

struct UserStore {
    users:   HashMap<u32, User>,
    next_id: u32,
}

impl UserStore {
    fn new() -> Self {
        Self { users: HashMap::new(), next_id: 1 }
    }

    fn add(&mut self, name: impl Into<String>, email: impl Into<String>) -> u32 {
        let id = self.next_id;
        self.users.insert(id, User {
            id,
            name:  name.into(),
            email: email.into(),
            role:  Role::User,
        });
        self.next_id += 1;
        id
    }

    fn get(&self, id: u32) -> Option<&User> {
        self.users.get(&id)
    }

    fn admins(&self) -> Vec<&User> {
        self.users.values().filter(|u| u.role == Role::Admin).collect()
    }
}`,
  },

  // ─── MOBILE ─────────────────────────────────────────────────────────────────
  {
    id: 'kotlin', ic: 'KT', nm: 'Kotlin', yr: '2011 — JetBrains', col: '#a97bff',
    cat: 'Mobile / Backend', dif: 3,
    tgs: ['Android', 'JVM', 'Backend', 'Multiplatform'],
    dsc: 'Kotlin adalah bahasa modern untuk JVM yang 100% interoperable dengan Java. Jauh lebih concise (40–50% kode lebih sedikit), null-safe, dan ekspresif. Google menjadikan Kotlin sebagai bahasa resmi Android development sejak 2017. Kotlin Coroutines menjadikan async programming elegan. Kotlin Multiplatform memungkinkan berbagi logika bisnis antara iOS dan Android tanpa framework yang berat.',
    use: [
      'Android app development (standar industri)',
      'Backend dengan Ktor atau Spring Boot',
      'Kotlin Multiplatform Mobile (KMM) — iOS + Android',
      'CLI tools dan scripting JVM',
      'Jetpack Compose untuk UI deklaratif Android',
    ],
    learn: [
      'Null safety: tipe nullable (String?) vs non-null (String)',
      'Safe call (?.), Elvis operator (?:), dan non-null assertion (!!)',
      'Data class, sealed class, dan enum class',
      'Extension function: tambah fungsi ke class tanpa inheritance',
      'Scope functions: let, run, apply, also, with',
      'Coroutines: suspend fun, launch, async, Flow',
      'Android: Activity, Fragment, ViewModel, LiveData/StateFlow',
      'Jetpack Compose: @Composable, State, remember, LaunchedEffect',
    ],
    refs: 'kotlinlang.org · developer.android.com · ktor.io',
    example: `// Kotlin — Coroutines + sealed class + Jetpack Compose
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

sealed class UiState<out T> {
    object Loading : UiState<Nothing>()
    data class Success<T>(val data: T) : UiState<T>()
    data class Error(val message: String) : UiState<Nothing>()
}

data class User(
    val id: Int,
    val name: String,
    val email: String,
    val role: String = "user"
) {
    val isAdmin get() = role == "admin"
    val initials get() = name.split(" ").mapNotNull { it.firstOrNull() }.joinToString("")
}

class UserViewModel(private val repo: UserRepository) : ViewModel() {
    private val _state = MutableStateFlow<UiState<List<User>>>(UiState.Loading)
    val state: StateFlow<UiState<List<User>>> = _state.asStateFlow()

    fun loadUsers() {
        viewModelScope.launch {
            _state.value = UiState.Loading
            _state.value = runCatching { repo.getUsers() }
                .fold(
                    onSuccess = { UiState.Success(it) },
                    onFailure = { UiState.Error(it.message ?: "Unknown error") }
                )
        }
    }
}`,
  },

  {
    id: 'swift', ic: 'SWIFT', nm: 'Swift', yr: '2014 — Apple (Chris Lattner)', col: '#ff5823',
    cat: 'Mobile', dif: 3,
    tgs: ['iOS', 'macOS', 'Apple', 'Mobile'],
    dsc: 'Swift adalah bahasa modern Apple yang dirancang untuk menggantikan Objective-C dengan sintaks yang jauh lebih bersih dan aman. Swift menggabungkan performa C dengan keamanan type-safe, optionals untuk mencegah null crash, dan error handling yang eksplisit. SwiftUI merevolusi cara membangun UI Apple dengan paradigma deklaratif. Swift juga bisa dipakai untuk server-side dengan framework Vapor.',
    use: [
      'iOS dan iPadOS native app (App Store)',
      'macOS desktop application',
      'watchOS (Apple Watch) dan tvOS',
      'SwiftUI untuk UI deklaratif lintas platform Apple',
      'Server-side Swift dengan Vapor',
    ],
    learn: [
      'Optionals: var name: String? dan cara unwrap yang aman (if let, guard let)',
      'Struct vs Class — value type vs reference type',
      'Enum dengan associated values dan raw values',
      'Protocol-oriented programming (POP)',
      'Closures — anonymous function dengan capture list',
      'async/await dan structured concurrency dengan Swift Concurrency',
      'SwiftUI: View, State, Binding, ObservableObject, @StateObject',
      'Core Data atau SwiftData untuk persistent storage',
    ],
    refs: 'swift.org · developer.apple.com · hackingwithswift.com · swiftwithmajid.com',
    example: `// Swift — SwiftUI + async/await + @Observable
import SwiftUI

struct User: Codable, Identifiable {
    let id: Int
    let name: String
    let email: String
    var role: String = "user"

    var isAdmin: Bool { role == "admin" }
    var initials: String {
        name.split(separator: " ").compactMap { $0.first }.map(String.init).joined()
    }
}

@Observable
class UserViewModel {
    var users: [User] = []
    var isLoading = false
    var errorMessage: String?

    func loadUsers() async {
        isLoading = true
        defer { isLoading = false }
        do {
            let (data, _) = try await URLSession.shared.data(from: URL(string: "/api/users")!)
            users = try JSONDecoder().decode([User].self, from: data)
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}

struct UserListView: View {
    @State private var vm = UserViewModel()

    var body: some View {
        NavigationStack {
            Group {
                if vm.isLoading { ProgressView() }
                else {
                    List(vm.users) { user in
                        HStack {
                            Text(user.initials)
                                .font(.headline)
                                .foregroundStyle(.white)
                                .frame(width: 40, height: 40)
                                .background(user.isAdmin ? .purple : .blue)
                                .clipShape(Circle())
                            VStack(alignment: .leading) {
                                Text(user.name).font(.headline)
                                Text(user.email).font(.caption).foregroundStyle(.secondary)
                            }
                        }
                    }
                }
            }
            .navigationTitle("Users")
            .task { await vm.loadUsers() }
        }
    }
}`,
  },

  {
    id: 'dart', ic: 'DART', nm: 'Dart (Flutter)', yr: '2011 — Google', col: '#00b4d8',
    cat: 'Mobile', dif: 2,
    tgs: ['Flutter', 'Cross-platform', 'Mobile', 'Web', 'Desktop'],
    dsc: 'Dart adalah bahasa yang dioptimalkan Google untuk UI, dan fondasi dari Flutter. Flutter memungkinkan satu codebase menghasilkan app native untuk iOS, Android, web, Windows, macOS, dan Linux — dengan performa tinggi karena dikompilasi ke native code dan menggunakan rendering engine sendiri (Skia/Impeller). Flutter kini jadi framework cross-platform mobile terpopuler mengalahkan React Native.',
    use: [
      'Flutter mobile app (iOS + Android dari satu kodebase)',
      'Flutter web app (deploy ke browser)',
      'Flutter desktop (Windows, macOS, Linux)',
      'Backend Dart dengan Dart Frog atau Shelf',
    ],
    learn: [
      'Install Flutter SDK dari flutter.dev — jalankan flutter doctor',
      'Dart: variabel, tipe data, fungsi, class, null safety',
      'Widget tree: semua UI di Flutter adalah widget yang bersarang',
      'StatelessWidget (UI statis) vs StatefulWidget (UI dengan state)',
      'setState(), InheritedWidget, dan state management',
      'State management modern: Riverpod, Bloc, atau Provider',
      'Navigator 2.0 dan Go Router untuk navigasi',
      'pub.dev untuk package management',
    ],
    refs: 'flutter.dev · dart.dev · pub.dev · riverpod.dev',
    example: `// Dart + Flutter — Riverpod + async data fetching
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class User {
  final int id;
  final String name;
  final String email;

  const User({required this.id, required this.name, required this.email});

  factory User.fromJson(Map<String, dynamic> json) =>
      User(id: json['id'], name: json['name'], email: json['email']);
}

// Provider — auto-dispose setelah tidak dipakai
final usersProvider = FutureProvider.autoDispose<List<User>>((ref) async {
  final res = await http.get(Uri.parse('https://api.example.com/users'));
  if (res.statusCode != 200) throw Exception('Gagal memuat user');
  final List data = jsonDecode(res.body);
  return data.map(User.fromJson).toList();
});

class UserListPage extends ConsumerWidget {
  const UserListPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final usersAsync = ref.watch(usersProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Daftar User')),
      body: usersAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('Error: \$e')),
        data: (users) => ListView.builder(
          itemCount: users.length,
          itemBuilder: (ctx, i) => ListTile(
            leading: CircleAvatar(child: Text(users[i].name[0])),
            title: Text(users[i].name),
            subtitle: Text(users[i].email),
          ),
        ),
      ),
    );
  }
}`,
  },

  // ─── DATABASE ───────────────────────────────────────────────────────────────
  {
    id: 'sql', ic: 'SQL', nm: 'SQL', yr: '1974 — IBM (Donald Chamberlin & Raymond Boyce)', col: '#ff9100',
    cat: 'Database / Query', dif: 2,
    tgs: ['Database', 'PostgreSQL', 'MySQL', 'SQLite', 'Query'],
    dsc: 'Structured Query Language adalah standar universal untuk berinteraksi dengan database relasional. Dikembangkan pertama kali oleh IBM pada 1974 dan hingga kini tetap menjadi keterampilan wajib setiap developer. PostgreSQL, MySQL, SQLite, Microsoft SQL Server, dan Oracle semua menggunakan SQL. SQL bukan hanya untuk query data, tapi juga untuk mendefinisikan struktur, mengelola akses, dan mengoptimalkan performa database.',
    use: [
      'Query, filter, dan agregasi data',
      'Desain dan normalisasi struktur database',
      'Reporting, dashboard, dan business intelligence',
      'Data migration dan ETL pipeline',
      'Stored procedure dan trigger',
    ],
    learn: [
      'SELECT, WHERE, ORDER BY, LIMIT, OFFSET',
      'Filtering: AND, OR, NOT, IN, BETWEEN, LIKE, IS NULL',
      'JOIN: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, SELF JOIN',
      'Agregasi: COUNT, SUM, AVG, MIN, MAX + GROUP BY + HAVING',
      'Subquery: subquery di WHERE, FROM, dan SELECT',
      'CTE (Common Table Expression): WITH nama AS (SELECT...)',
      'Window function: ROW_NUMBER, RANK, LAG, LEAD, SUM OVER',
      'Index: cara kerja, kapan buat, kapan tidak perlu',
    ],
    refs: 'postgresql.org · sqlzoo.net · mode.com/sql-tutorial · pgexercises.com',
    example: `-- SQL Modern — CTE + Window Function + CASE
-- Analisis pembelian user: tier, ranking, pertumbuhan

WITH user_stats AS (
    SELECT
        u.id,
        u.name,
        u.email,
        COUNT(o.id)                         AS total_orders,
        COALESCE(SUM(o.total_price), 0)     AS total_spent,
        MAX(o.created_at)                   AS last_order_at,
        AVG(o.total_price)                  AS avg_order_value
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id
        AND o.status = 'completed'
    GROUP BY u.id, u.name, u.email
),
ranked AS (
    SELECT *,
        CASE
            WHEN total_spent >= 10000000 THEN 'Platinum'
            WHEN total_spent >=  5000000 THEN 'Gold'
            WHEN total_spent >=  1000000 THEN 'Silver'
            ELSE                               'Bronze'
        END AS tier,
        RANK() OVER (ORDER BY total_spent DESC)          AS spending_rank,
        NTILE(10) OVER (ORDER BY total_spent DESC)       AS spending_decile
    FROM user_stats
)
SELECT
    name,
    email,
    total_orders,
    ROUND(total_spent / 1000, 0)    AS spent_k,
    ROUND(avg_order_value / 1000, 0) AS avg_order_k,
    tier,
    spending_rank
FROM ranked
WHERE last_order_at >= NOW() - INTERVAL '90 days'
ORDER BY total_spent DESC
LIMIT 20;`,
  },

  // ─── SYSTEM / GAME ──────────────────────────────────────────────────────────
  {
    id: 'cpp', ic: 'C++', nm: 'C++', yr: '1983 — Bjarne Stroustrup', col: '#ff3d57',
    cat: 'System / Game', dif: 5,
    tgs: ['System', 'Game', 'Embedded', 'Performance', 'OS'],
    dsc: 'C++ adalah bahasa yang memberi kontrol penuh atas hardware tanpa ada safety net. Kamu kelola memori sendiri dengan new/delete atau smart pointer. Sangat powerful, sangat cepat, dan sangat sulit dikuasai. Digunakan untuk Unreal Engine, sistem operasi, compiler (GCC, Clang), database engine (MySQL, PostgreSQL ditulis sebagian dalam C++), dan sistem embedded. Bahasa yang dipakai ketika performa adalah segalanya.',
    use: [
      'Game engine AAA (Unreal Engine)',
      'Operating system dan kernel',
      'Compiler dan interpreter',
      'Embedded system dan firmware',
      'High-frequency trading (HFT)',
      'Database engine dan browser engine',
    ],
    learn: [
      'Pointer, reference, dan perbedaan fundamentalnya',
      'Stack vs Heap memory, new/delete',
      'OOP: class, virtual function, inheritance, abstract class',
      'Smart pointer: unique_ptr, shared_ptr, weak_ptr',
      'STL: vector, map, unordered_map, algorithm header',
      'Template: generic programming tanpa overhead runtime',
      'Modern C++17/20/23: structured bindings, ranges, concepts, coroutines',
      'Build system: CMake + Ninja',
    ],
    refs: 'learncpp.com · cppreference.com · isocpp.org · cppcon.org',
    example: `// C++20 — Smart pointers, ranges, concepts
#include <vector>
#include <memory>
#include <ranges>
#include <string>
#include <algorithm>
#include <print> // C++23

struct User {
    int id;
    std::string name;
    std::string email;
    enum class Role { Admin, User, Guest } role = Role::User;
};

// Concept: tipe T harus punya member .id berjenis integral
template<typename T>
concept HasIntId = requires(T t) {
    { t.id } -> std::integral;
};

class UserRepository {
    std::vector<std::unique_ptr<User>> users_;
    int next_id_ = 1;

public:
    void add(std::string name, std::string email) {
        users_.push_back(std::make_unique<User>(User{
            .id    = next_id_++,
            .name  = std::move(name),
            .email = std::move(email),
        }));
    }

    // Ranges view — lazy evaluation, zero-copy
    auto admins() const {
        return users_
            | std::views::transform([](const auto& u) -> const User& { return *u; })
            | std::views::filter([](const User& u) { return u.role == User::Role::Admin; });
    }

    template<HasIntId T>
    const User* findById(int id) const {
        auto it = std::ranges::find_if(users_, [id](const auto& u) { return u->id == id; });
        return it != users_.end() ? it->get() : nullptr;
    }
};`,
  },

  // ─── SCRIPTING ──────────────────────────────────────────────────────────────
  {
    id: 'bash', ic: 'BASH', nm: 'Bash', yr: '1989 — Brian Fox (GNU Project)', col: '#4eaa25',
    cat: 'Scripting / DevOps', dif: 3,
    tgs: ['Scripting', 'Linux', 'Automation', 'DevOps', 'CLI'],
    dsc: 'Bash (Bourne Again Shell) adalah shell default hampir semua distro Linux dan macOS. Wajib dikuasai untuk DevOps, sysadmin, dan setiap developer yang bekerja di lingkungan server. Dengan Bash kamu bisa mengotomatisasi hampir segalanya: deployment, monitoring, backup, dan CI/CD pipeline. Script Bash yang baik bisa menghemat puluhan jam kerja manual setiap minggu.',
    use: [
      'Automation dan scripting sistem',
      'CI/CD pipeline (GitHub Actions, GitLab CI)',
      'Server provisioning dan management',
      'File processing massal',
      'Cron job terjadwal',
      'Docker dan container orchestration helper',
    ],
    learn: [
      'Navigasi: ls, cd, pwd, mkdir, rm, cp, mv, find, locate',
      'Variabel: VAR=value, echo $VAR, ${VAR:-default}',
      'Kondisi: if/elif/else, test [[ ]], operator: -f, -d, -z, -n',
      'Loop: for item in list; do ...; done | while read line; do ...; done',
      'Fungsi: function name() {} dan parameter $1, $2, $@, $#',
      'Pipe dan redirect: |, >, >>, 2>&1, tee',
      'Text processing: grep, sed, awk, cut, sort, uniq',
      'Process management: &, wait, trap, kill, ps, jobs',
    ],
    refs: 'tldp.org · linuxcommand.org · explainshell.com · shellcheck.net',
    example: `#!/usr/bin/env bash
# Deployment script — production-grade
set -euo pipefail   # exit on error, unset var, pipe fail
IFS=$'\\n\\t'         # safer word splitting

# ── Helpers ────────────────────────────────────────────────
readonly LOG_FILE="/var/log/deploy.log"
log()   { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
error() { log "ERROR: $*"; exit 1; }
info()  { log "INFO:  $*"; }

# ── Preflight checks ────────────────────────────────────────
for cmd in git node npm pm2; do
    command -v "$cmd" &>/dev/null || error "'$cmd' tidak ditemukan di PATH"
done

readonly APP_DIR="/var/www/cryveth"
readonly BRANCH="\${1:-main}"

# ── Deployment ──────────────────────────────────────────────
info "Mulai deploy branch '$BRANCH'..."

cd "$APP_DIR" || error "Direktori $APP_DIR tidak ditemukan"

# Backup sebelum deploy
BACKUP_DIR="/tmp/backup-$(date +%s)"
cp -r . "$BACKUP_DIR" && info "Backup disimpan di $BACKUP_DIR"

git fetch --all --prune                  || error "git fetch gagal"
git checkout "$BRANCH"                   || error "git checkout gagal"
git pull origin "$BRANCH"               || error "git pull gagal"

npm ci --omit=dev                        || error "npm install gagal"
npm run build                            || error "Build gagal"

pm2 reload cryveth --update-env          || error "PM2 reload gagal"

info "Deploy selesai! Versi: $(git rev-parse --short HEAD)"`,
  },

  // ─── DATA / AI / SCIENCE ────────────────────────────────────────────────────
  {
    id: 'r', ic: 'R', nm: 'R', yr: '1993 — Ross Ihaka & Robert Gentleman', col: '#276dc3',
    cat: 'Data / AI / Science', dif: 3,
    tgs: ['Statistics', 'Data Science', 'Visualization', 'Research'],
    dsc: 'R adalah bahasa yang lahir dari dunia akademia untuk analisis statistik dan riset ilmiah. Dengan 20.000+ package di CRAN dan ekosistem tidyverse yang elegan, R menjadi alat utama data scientist, biostatistician, dan peneliti. ggplot2 adalah library visualisasi data paling ekspresif yang pernah ada — mengikuti Grammar of Graphics. R Markdown dan Quarto memungkinkan laporan ilmiah yang reproducible.',
    use: [
      'Analisis statistik dan hypothesis testing',
      'Data visualization dengan ggplot2',
      'Research akademis dan publikasi ilmiah',
      'Bioinformatika dan analisis genomik',
      'Machine learning (caret, tidymodels)',
      'Shiny web app interaktif dari R',
    ],
    learn: [
      'Install R dari r-project.org dan RStudio (IDE terbaik)',
      'Vektor, list, data frame — struktur data fundamental R',
      'tidyverse: dplyr (manipulasi), tidyr (reshape), readr (import)',
      'Pipe modern: |> (native) atau %>% (magrittr)',
      'ggplot2: aes(), geom_*, facet_wrap, theme, scale',
      'Statistik dasar: t.test, cor, lm (regresi linier)',
      'R Markdown atau Quarto untuk laporan reproducible',
      'Shiny untuk web app interaktif',
    ],
    refs: 'r-project.org · tidyverse.org · ggplot2.tidyverse.org · shiny.posit.co',
    example: `# R — Analisis data modern dengan tidyverse
library(tidyverse)
library(lubridate)
library(scales)

# Import dan bersihkan data
users <- read_csv("users.csv", show_col_types = FALSE) |>
  mutate(
    created_at = ymd_hms(created_at),
    age        = as.integer(difftime(Sys.time(), birthdate, units = "days") / 365),
    age_group  = cut(age, breaks = c(0,18,25,35,50,Inf),
                     labels = c("<18","18-25","25-35","35-50","50+"))
  ) |>
  filter(!is.na(email), age >= 13)

# Agregasi per role dan age group
summary_tbl <- users |>
  group_by(role, age_group) |>
  summarise(
    count    = n(),
    avg_age  = round(mean(age, na.rm = TRUE), 1),
    .groups  = "drop"
  ) |>
  arrange(desc(count))

print(summary_tbl)

# Visualisasi distribusi umur
ggplot(users, aes(x = age, fill = role)) +
  geom_histogram(binwidth = 2, alpha = 0.75, position = "identity") +
  facet_wrap(~role, scales = "free_y") +
  scale_x_continuous(breaks = seq(10, 80, 10)) +
  scale_y_continuous(labels = comma) +
  scale_fill_brewer(palette = "Set2") +
  labs(
    title    = "Distribusi Usia per Role",
    subtitle = glue::glue("Total: {nrow(users)} pengguna aktif"),
    x = "Usia (tahun)", y = "Jumlah Pengguna", fill = "Role"
  ) +
  theme_minimal(base_size = 13) +
  theme(legend.position = "bottom")`,
  },

  // ─── SCRIPTING / GAME ───────────────────────────────────────────────────────
  {
    id: 'lua', ic: 'LUA', nm: 'Lua', yr: '1993 — PUC-Rio (Lua team)', col: '#000080',
    cat: 'Scripting / Game', dif: 2,
    tgs: ['Game', 'Scripting', 'Embedding', 'Roblox'],
    dsc: "Lua adalah bahasa scripting ringan yang dirancang untuk di-embed ke dalam aplikasi lain. Dengan hanya 300KB, Lua adalah bahasa yang sangat kompak namun tetap powerful. Digunakan oleh Roblox (game platform terbesar dengan 70+ juta pengguna harian), World of Warcraft untuk addon, Adobe Lightroom, Neovim, dan Redis untuk scripting. Luakit, Nginx (OpenResty), dan banyak game mobile menggunakan Lua sebagai bahasa scripting.",
    use: [
      'Game scripting di Roblox (Luau)',
      "Game modding: World of Warcraft, Garry's Mod",
      'Neovim configuration dan plugin',
      'Embedded scripting dalam aplikasi C/C++',
      'Redis scripting dengan EVAL',
      'OpenResty (Nginx + Lua) untuk backend',
    ],
    learn: [
      'Variabel global vs local — selalu pakai local!',
      'Tipe data: nil, boolean, number, string, function, table',
      'Table: struktur data serba bisa (array, dict, dan object)',
      'Function sebagai first-class value',
      'Coroutines untuk concurrency kooperatif',
      'Metatables dan metamethods untuk OOP di Lua',
      'Module system: require() dan module pattern',
      'Luau (Roblox): strict typing opsional, task library',
    ],
    refs: 'lua.org · luarocks.org · create.roblox.com/docs · neovim.io',
    example: `-- Lua — OOP dengan metatables + coroutines
local User = {}
User.__index = User

-- Constructor
function User.new(name, level)
    local self = setmetatable({}, User)
    self.name   = name
    self.level  = level or 1
    self.xp     = 0
    self.badges = {}
    return self
end

-- Methods
function User:addXP(amount)
    self.xp = self.xp + amount
    print(string.format("[%s] +%d XP (total: %d)", self.name, amount, self.xp))
    while self.xp >= self:xpNeeded() do
        self.xp = self.xp - self:xpNeeded()
        self:levelUp()
    end
end

function User:xpNeeded() return self.level * 100 end

function User:levelUp()
    self.level = self.level + 1
    print(string.format("🎉 %s naik ke Level %d!", self.name, self.level))
    if self.level % 5 == 0 then
        self:addBadge("Veteran Lv." .. self.level)
    end
end

function User:addBadge(name)
    table.insert(self.badges, name)
    print(string.format("🏅 %s mendapat badge: %s", self.name, name))
end

function User:__tostring()
    return string.format("User(%s, Lv.%d, %d XP)", self.name, self.level, self.xp)
end

-- Pakai coroutine untuk simulasi battle async
local function battleSimulator(user, enemy)
    return coroutine.create(function()
        for round = 1, 5 do
            print(string.format("Round %d: %s vs %s", round, user.name, enemy.name))
            user:addXP(math.random(20, 60))
            coroutine.yield(round)
        end
    end)
end

local hero = User.new("Nortex", 1)
hero:addXP(250) -- akan level up 2x`,
  },

  // ─── FUNCTIONAL / BACKEND ───────────────────────────────────────────────────
  {
    id: 'elixir', ic: 'EX', nm: 'Elixir', yr: '2011 — José Valim', col: '#6e4a7e',
    cat: 'Functional / Backend', dif: 4,
    tgs: ['Functional', 'Concurrent', 'Real-time', 'Phoenix'],
    dsc: 'Elixir berjalan di atas Erlang VM (BEAM) yang telah terbukti di telekomunikasi selama 30 tahun. WhatsApp dibangun di atas Erlang dan mampu menangani 2 juta koneksi bersamaan dengan hanya 50 engineer. Elixir mewarisi ketangguhan Erlang dengan sintaks modern yang terinspirasi Ruby. Fault-tolerant by design: supervisor tree memastikan proses yang crash otomatis di-restart. Phoenix LiveView memungkinkan web real-time tanpa menulis JavaScript.',
    use: [
      'Real-time app: chat, collaboration tool, multiplayer game',
      'High-concurrency dan high-availability system',
      'Distributed system lintas node',
      'Phoenix LiveView untuk web real-time tanpa JS',
      'IoT data pipeline',
    ],
    learn: [
      'Functional thinking: immutable data, pure function',
      'Pattern matching yang sangat powerful di Elixir',
      'Pipe operator |> — chaining fungsi yang elegan',
      'Process ringan: spawn, send, receive',
      'OTP: GenServer (state + behaviour), Supervisor (fault tolerance)',
      'Phoenix untuk web framework: router, controller, LiveView',
      'Ecto untuk database query yang type-safe',
      'Mix untuk build tool dan task management',
    ],
    refs: 'elixir-lang.org · phoenixframework.org · hexdocs.pm · elixirschool.com',
    example: `# Elixir — GenServer + pipeline + pattern matching
defmodule UserStore do
  use GenServer
  require Logger

  # ── Client API ──────────────────────────────────────────
  def start_link(opts \\\\ []),
    do: GenServer.start_link(__MODULE__, %{users: %{}, next_id: 1}, name: __MODULE__)

  def add_user(name, email),
    do: GenServer.call(__MODULE__, {:add, name, email})

  def get_user(id),
    do: GenServer.call(__MODULE__, {:get, id})

  def all_users(),
    do: GenServer.call(__MODULE__, :all)

  def find_by_email(email),
    do: GenServer.call(__MODULE__, {:find_email, email})

  # ── Server Callbacks ────────────────────────────────────
  @impl true
  def init(state), do: {:ok, state}

  @impl true
  def handle_call({:add, name, email}, _from, %{users: users, next_id: id} = state) do
    user = %{id: id, name: name, email: email, inserted_at: DateTime.utc_now()}
    new_state = %{state | users: Map.put(users, id, user), next_id: id + 1}
    Logger.info("User ditambahkan: #{name} (id=#{id})")
    {:reply, {:ok, user}, new_state}
  end

  def handle_call({:get, id}, _from, %{users: users} = state) do
    reply = case Map.get(users, id) do
      nil  -> {:error, :not_found}
      user -> {:ok, user}
    end
    {:reply, reply, state}
  end

  def handle_call(:all, _from, %{users: users} = state) do
    {:reply, Map.values(users), state}
  end

  def handle_call({:find_email, email}, _from, %{users: users} = state) do
    result = users |> Map.values() |> Enum.find(&(&1.email == email))
    {:reply, result, state}
  end
end`,
  },

  {
    id: 'haskell', ic: 'HS', nm: 'Haskell', yr: "1990 — Research Committee (FPCA '87)", col: '#5c4a8b',
    cat: 'Functional / Advanced', dif: 5,
    tgs: ['Functional', 'Academic', 'Type-safe', 'Pure'],
    dsc: 'Haskell adalah bahasa functional murni dengan lazy evaluation dan type system paling canggih di antara bahasa mainstream. Pure functions menjamin tidak ada side effect tersembunyi — setiap fungsi menghasilkan output yang sama untuk input yang sama. Mempelajari Haskell secara fundamental mengubah cara berpikir tentang pemrograman. Cardano blockchain ditulis dalam Haskell. GHC (Glasgow Haskell Compiler) adalah compiler paling canggih yang pernah dibuat.',
    use: [
      'Research akademis dan language theory',
      'Compiler dan interpreter development',
      'Sistem keuangan yang membutuhkan correctness tinggi',
      'Blockchain (Cardano / Plutus smart contract)',
      'Domain-specific language (DSL) development',
    ],
    learn: [
      'Haskell Platform atau GHCup untuk instalasi',
      'Tipe dasar: Int, Integer, Float, Double, Char, String, Bool',
      'Type class: Eq, Ord, Show, Read, Num, Foldable, Traversable',
      'Algebraic Data Type (ADT): data Shape = Circle | Rectangle',
      'Pattern matching dan guards',
      'Maybe, Either, List sebagai Functor dan Monad',
      'IO Monad: cara Haskell menangani side effect',
      'Cabal atau Stack untuk manajemen project',
    ],
    refs: 'haskell.org · learnyouahaskell.com · wiki.haskell.org · hoogle.haskell.org',
    example: `-- Haskell — ADT + Type class + Monad
{-# LANGUAGE OverloadedStrings #-}
module UserDomain where

import Data.List (find, sortBy)
import Data.Ord  (comparing, Down(..))

-- Algebraic Data Type
data Role = Admin | Moderator | User | Guest
  deriving (Show, Eq, Ord, Enum, Bounded)

data User = User
  { userId    :: Int
  , userName  :: String
  , userEmail :: String
  , userRole  :: Role
  } deriving (Show, Eq)

-- Type class instance untuk deskripsi
class Describable a where
    describe :: a -> String

instance Describable Role where
    describe Admin     = "Administrator dengan akses penuh"
    describe Moderator = "Moderator konten"
    describe User      = "Pengguna biasa"
    describe Guest     = "Tamu tanpa akses khusus"

instance Describable User where
    describe u = userName u ++ " (" ++ show (userRole u) ++ ")"

-- Pure functions
isAdmin :: User -> Bool
isAdmin = (== Admin) . userRole

filterByRole :: Role -> [User] -> [User]
filterByRole role = filter ((== role) . userRole)

sortByRole :: [User] -> [User]
sortByRole = sortBy (comparing userRole)

findByEmail :: String -> [User] -> Maybe User
findByEmail email = find ((== email) . userEmail)

-- Monad Either untuk error handling
data UserError = NotFound String | InvalidEmail | Unauthorized
  deriving Show

validateEmail :: String -> Either UserError String
validateEmail email
  | '@' \`elem\` email = Right email
  | otherwise        = Left InvalidEmail

getAdminByEmail :: String -> [User] -> Either UserError User
getAdminByEmail email users = do
  validEmail <- validateEmail email
  user       <- maybe (Left $ NotFound validEmail) Right (findByEmail validEmail users)
  if isAdmin user
    then Right user
    else Left Unauthorized`,
  },

  // ─── NEW LANGUAGES ──────────────────────────────────────────────────────────
  {
    id: 'scala', ic: 'SC', nm: 'Scala', yr: '2003 — Martin Odersky (EPFL)', col: '#dc322f',
    cat: 'Functional / Backend', dif: 4,
    tgs: ['JVM', 'Functional', 'Big Data', 'Spark', 'Concurrent'],
    dsc: 'Scala menggabungkan OOP dan functional programming di atas JVM dalam satu bahasa yang kohesif. Sintaks yang ekspresif, type inference yang kuat, dan immutability by default menjadikannya pilihan utama untuk Big Data (Apache Spark ditulis dalam Scala), stream processing (Kafka, Akka), dan sistem backend yang membutuhkan correctness tinggi. Scala 3 (Dotty) membawa syntax yang lebih bersih dan type system yang lebih powerful.',
    use: [
      'Apache Spark untuk Big Data processing',
      'Stream processing dengan Apache Kafka (Akka Streams)',
      'Backend API dengan Play Framework atau Http4s',
      'Distributed system dengan Akka Actor Model',
      'Compilers dan language tools',
    ],
    learn: [
      'Install: coursier.io — universal Scala installer',
      'Val (immutable) vs var (mutable) — lebih banyak val',
      'Case class: immutable data class dengan pattern matching',
      'Pattern matching: match/case yang sangat powerful',
      'Option[T], Either[L, R], Try[T] untuk error handling',
      'Higher-order function: map, flatMap, filter, fold',
      'Trait sebagai interface + mixin',
      'For comprehension sebagai syntactic sugar Monad',
    ],
    refs: 'scala-lang.org · docs.scala-lang.org · spark.apache.org',
    example: `// Scala 3 — Case class + pattern matching + for comprehension
enum Role:
  case Admin, Moderator, User, Guest

case class User(
  id:    Int,
  name:  String,
  email: String,
  role:  Role = Role.User
):
  def isAdmin: Boolean = role == Role.Admin
  def initials: String = name.split(" ").flatMap(_.headOption.map(_.toString)).mkString

object UserService:
  def findById(users: List[User], id: Int): Option[User] =
    users.find(_.id == id)

  def validateEmail(email: String): Either[String, String] =
    if email.contains('@') then Right(email)
    else Left(s"Email tidak valid: $email")

  def createUser(
    name:  String,
    email: String,
    users: List[User]
  ): Either[String, User] =
    for
      validEmail <- validateEmail(email)
      _          <- Either.cond(
                      !users.exists(_.email == validEmail),
                      (),
                      s"Email $validEmail sudah terdaftar"
                    )
    yield User(id = users.length + 1, name = name, email = validEmail)

  def describeRole(user: User): String =
    user.role match
      case Role.Admin     => s"\${user.name} adalah administrator"
      case Role.Moderator => s"\${user.name} adalah moderator"
      case Role.User      => s"\${user.name} adalah pengguna biasa"
      case Role.Guest     => s"\${user.name} adalah tamu"`,
  },

  {
    // FIX BUG #1: Added forward declaration for user_free before user_create
    id: 'clang', ic: 'C', nm: 'C', yr: '1972 — Dennis Ritchie (Bell Labs)', col: '#a8b9cc',
    cat: 'System / Low Level', dif: 4,
    tgs: ['System', 'Embedded', 'OS', 'Compiler', 'Performance'],
    dsc: 'C adalah bahasa yang mengubah dunia komputasi — Unix, Linux kernel, Python interpreter, Git, dan hampir semua bahasa modern ditulis dalam C atau terinspirasi darinya. Bahasa yang paling dekat dengan hardware tanpa menjadi assembly. Tidak ada garbage collector, tidak ada abstraksi yang tidak kamu inginkan — kamu kontrol segalanya. Setiap developer yang serius memahami C akan memahami komputer lebih dalam.',
    use: [
      'Operating system dan kernel (Linux, BSD)',
      'Embedded system dan firmware (Arduino, STM32)',
      'Compiler dan interpreter (CPython, GCC)',
      'Device driver dan sistem operasi real-time (RTOS)',
      'Library performa tinggi yang di-wrap bahasa lain',
    ],
    learn: [
      'Tipe data: int, char, float, double, void',
      'Pointer: deklarasi, dereferencing (*), address-of (&)',
      'Array dan string (char array null-terminated)',
      'Struct dan union — mendefinisikan tipe data sendiri',
      'Fungsi: parameter by value, return value, pointer to function',
      'Manual memory management: malloc, calloc, realloc, free',
      'Header file (.h) dan compilation unit (.c)',
      'Makefile dan GCC/Clang untuk kompilasi',
    ],
    refs: 'cppreference.com · beej.us/guide/bgc · cs50.harvard.edu',
    example: `/* C — Pointer, struct, dynamic memory */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef enum { ROLE_ADMIN, ROLE_USER, ROLE_GUEST } Role;

typedef struct {
    int   id;
    char *name;
    char *email;
    Role  role;
} User;

/* Forward declaration — FIX: diperlukan agar user_create bisa memanggil user_free */
void user_free(User *u);

/* Buat user baru di heap — caller bertanggung jawab free() */
User *user_create(int id, const char *name, const char *email, Role role) {
    User *u = malloc(sizeof(User));
    if (!u) return NULL;

    u->id    = id;
    u->role  = role;
    u->name  = strdup(name);
    u->email = strdup(email);

    if (!u->name || !u->email) {
        user_free(u);
        return NULL;
    }
    return u;
}

void user_free(User *u) {
    if (!u) return;
    free(u->name);
    free(u->email);
    free(u);
}

void user_print(const User *u) {
    const char *roles[] = {"Admin", "User", "Guest"};
    printf("User{id=%d, name='%s', email='%s', role=%s}\\n",
           u->id, u->name, u->email, roles[u->role]);
}

int main(void) {
    User *alice = user_create(1, "Alice", "alice@example.com", ROLE_ADMIN);
    if (!alice) { fprintf(stderr, "Gagal alokasi user\\n"); return EXIT_FAILURE; }

    user_print(alice);
    user_free(alice);
    return EXIT_SUCCESS;
}`,
  },

  {
    id: 'zig', ic: 'ZIG', nm: 'Zig', yr: '2016 — Andrew Kelley', col: '#f7a41d',
    cat: 'System / Low Level', dif: 5,
    tgs: ['System', 'Embedded', 'WebAssembly', 'C-interop', 'Performance'],
    dsc: 'Zig adalah bahasa sistem modern yang berambisi menggantikan C. Tidak ada hidden control flow, tidak ada hidden memory allocation, tidak ada preprocessor macro yang membingungkan — apa yang kamu tulis adalah apa yang dieksekusi. Zig bisa compile C dan C++ secara langsung, menjadikannya C compiler terbaik yang juga bisa menulis Zig. Bun (JavaScript runtime) dan berbagai proyek performa tinggi ditulis dalam Zig.',
    use: [
      'System programming sebagai alternatif C',
      'Embedded system tanpa runtime overhead',
      'Cross-compilation untuk berbagai target platform',
      'WebAssembly untuk performa browser',
      'Menggantikan atau berinterop dengan kode C',
    ],
    learn: [
      'Install dari ziglang.org — satu binary, tidak ada dependency',
      'Tidak ada implicit control flow: error harus dihandle eksplisit',
      'Comptime: generic dan meta-programming saat kompilasi',
      'Optional type: ?T sebagai pengganti null pointer yang aman',
      'Error union: !T untuk error handling tanpa exception',
      'Allocator pattern: explicit memory management',
      'Build system bawaan: build.zig',
      'C interop: @cImport untuk pakai library C langsung',
    ],
    refs: 'ziglang.org · ziglearn.org · zig.news',
    example: `// Zig — Comptime generics + error union + allocator
const std = @import("std");
const Allocator = std.mem.Allocator;

const Role = enum { admin, user, guest };

const User = struct {
    id:    u32,
    name:  []const u8,
    email: []const u8,
    role:  Role = .user,

    pub fn isAdmin(self: User) bool {
        return self.role == .admin;
    }
};

// Generic ArrayList dengan comptime type parameter
fn UserList(comptime T: type) type {
    return struct {
        items: []T,
        len:   usize,
        alloc: Allocator,

        const Self = @This();

        pub fn init(alloc: Allocator) Self {
            return .{ .items = &.{}, .len = 0, .alloc = alloc };
        }

        pub fn append(self: *Self, item: T) !void {
            const new_items = try self.alloc.realloc(self.items, self.len + 1);
            self.items = new_items;
            self.items[self.len] = item;
            self.len += 1;
        }

        pub fn deinit(self: *Self) void {
            self.alloc.free(self.items);
        }
    };
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    var users = UserList(User).init(alloc);
    defer users.deinit();

    try users.append(.{ .id = 1, .name = "Alice", .email = "a@x.com", .role = .admin });
    try users.append(.{ .id = 2, .name = "Bob",   .email = "b@x.com" });

    for (users.items[0..users.len]) |u| {
        std.debug.print("User: {s} (admin={})\\n", .{ u.name, u.isAdmin() });
    }
}`,
  },

  {
    id: 'solidity', ic: 'SOL', nm: 'Solidity', yr: '2014 — Gavin Wood (Ethereum)', col: '#363636',
    cat: 'Blockchain / Web3', dif: 4,
    tgs: ['Blockchain', 'Ethereum', 'Smart Contract', 'Web3', 'DeFi'],
    dsc: 'Solidity adalah bahasa untuk menulis smart contract di Ethereum dan blockchain kompatibel EVM (Polygon, BNB Chain, Avalanche). Smart contract adalah kode yang berjalan di blockchain — immutable, transparent, dan trustless tanpa perantara. DeFi (Decentralized Finance) dengan total nilai terkunci miliaran dolar semua dibangun dengan Solidity. Setiap bug bisa kehilangan dana nyata — security adalah prioritas utama.',
    use: [
      'DeFi: DEX, lending protocol, yield farming',
      'NFT: ERC-721 dan ERC-1155 token standard',
      'DAO (Decentralized Autonomous Organization)',
      'Token ERC-20 dan tokenomics',
      'Blockchain gaming dan GameFi',
    ],
    learn: [
      'Pelajari Ethereum basics dan cara kerja blockchain',
      'Remix IDE — browser IDE untuk Solidity (remix.ethereum.org)',
      'Tipe data: uint, int, bool, address, bytes, string',
      'Visibility: public, private, internal, external',
      'Modifier: payable, view, pure, dan custom modifier',
      'Event dan emit untuk logging di blockchain',
      'Storage vs Memory vs Calldata — perbedaan gas cost',
      'OpenZeppelin Contracts — library smart contract yang sudah diaudit',
    ],
    refs: 'docs.soliditylang.org · openzeppelin.com · hardhat.org · foundry-rs',
    example: `// Solidity 0.8.24 — ERC-20 Token dengan staking
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract CryToken is ERC20, Ownable, ReentrancyGuard {
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10**18; // 100 juta token
    uint256 public constant STAKE_APR  = 12; // 12% per tahun

    struct StakeInfo {
        uint256 amount;
        uint256 since;
    }

    mapping(address => StakeInfo) public stakes;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount, uint256 reward);

    constructor() ERC20("CryVeth Token", "CRY") Ownable(msg.sender) {
        _mint(msg.sender, 10_000_000 * 10**18); // mint 10 juta ke deployer
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Melebihi max supply");
        _mint(to, amount);
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount harus > 0");
        require(balanceOf(msg.sender) >= amount, "Saldo tidak cukup");
        _transfer(msg.sender, address(this), amount);
        stakes[msg.sender] = StakeInfo({ amount: amount, since: block.timestamp });
        emit Staked(msg.sender, amount);
    }

    function unstake() external nonReentrant {
        StakeInfo memory info = stakes[msg.sender];
        require(info.amount > 0, "Tidak ada stake aktif");
        uint256 reward = calculateReward(msg.sender);
        delete stakes[msg.sender];
        _transfer(address(this), msg.sender, info.amount);
        if (reward > 0) _mint(msg.sender, reward);
        emit Unstaked(msg.sender, info.amount, reward);
    }

    function calculateReward(address user) public view returns (uint256) {
        StakeInfo memory info = stakes[user];
        if (info.amount == 0) return 0;
        uint256 elapsed = block.timestamp - info.since;
        return (info.amount * STAKE_APR * elapsed) / (100 * 365 days);
    }
}`,
  },

  {
    id: 'graphql', ic: 'GQL', nm: 'GraphQL', yr: '2012 — Facebook (open source 2015)', col: '#e535ab',
    cat: 'API / Query Language', dif: 3,
    tgs: ['API', 'Query', 'Facebook', 'REST-alternative', 'Schema'],
    dsc: 'GraphQL adalah query language untuk API yang dikembangkan Facebook sebagai pengganti REST. Dengan GraphQL, client menentukan persis data apa yang diinginkan — tidak lebih, tidak kurang. Menghilangkan masalah over-fetching (data terlalu banyak) dan under-fetching (harus hit API berkali-kali). Schema yang strongly-typed menjadi kontrak antara frontend dan backend. Dipakai oleh GitHub, Shopify, Twitter, dan Airbnb.',
    use: [
      'API untuk mobile app (hemat bandwidth)',
      'BFF (Backend for Frontend) pattern',
      'Microservices federation dengan Apollo Router',
      'Real-time dengan GraphQL Subscription',
      'Headless CMS (Contentful, Strapi, Sanity)',
    ],
    learn: [
      'Pelajari REST API terlebih dahulu untuk perbandingan',
      'SDL: Schema Definition Language — type, query, mutation, subscription',
      'Scalar types: Int, Float, String, Boolean, ID',
      'Resolver function: cara data di-fetch untuk tiap field',
      'Apollo Server untuk backend, Apollo Client untuk frontend',
      'DataLoader untuk mengatasi N+1 query problem',
      'Fragments, variables, dan directives (@include, @skip)',
      'Introspection dan GraphQL Playground / GraphiQL',
    ],
    refs: 'graphql.org · apollographql.com · the-guild.dev · graphqlcode.com',
    example: `# GraphQL Schema + Resolver (Node.js Apollo Server)

# schema.graphql
type User {
  id:        ID!
  name:      String!
  email:     String!
  role:      Role!
  posts:     [Post!]!
  createdAt: String!
}

enum Role { ADMIN USER GUEST }

type Post {
  id:      ID!
  title:   String!
  body:    String!
  author:  User!
  tags:    [String!]!
}

type Query {
  users(role: Role, limit: Int = 10, offset: Int = 0): [User!]!
  user(id: ID!): User
  me: User
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateRole(userId: ID!, role: Role!): User!
}

input CreateUserInput {
  name:  String!
  email: String!
  role:  Role = USER
}

# resolvers.js
const resolvers = {
  Query: {
    users: async (_, { role, limit, offset }, { db }) => {
      const where = role ? { role } : {};
      return db.user.findMany({ where, take: limit, skip: offset });
    },
    user: (_, { id }, { db }) => db.user.findUnique({ where: { id } }),
    me:   (_, __, { user }) => user ?? null,
  },
  User: {
    // DataLoader untuk menghindari N+1 query
    posts: ({ id }, _, { loaders }) => loaders.postsByUser.load(id),
  },
  Mutation: {
    createUser: async (_, { input }, { db }) => {
      return db.user.create({ data: input });
    },
  },
};`,
  },

  {
    id: 'docker', ic: 'DOC', nm: 'Docker', yr: '2013 — Solomon Hykes (dotCloud)', col: '#2496ed',
    cat: 'DevOps / Container', dif: 2,
    tgs: ['DevOps', 'Container', 'Deployment', 'Microservices', 'Cloud'],
    dsc: 'Docker merevolusi cara software dideploy dengan containerisasi — membungkus aplikasi beserta semua dependensinya dalam satu unit yang bisa berjalan identik di mana pun, dari laptop developer sampai server production. "Works on my machine" bukan alasan lagi. Docker Compose untuk multi-container apps, Docker Swarm dan Kubernetes untuk orchestration. Hampir semua workflow deployment modern menggunakan Docker.',
    use: [
      'Packaging dan deployment aplikasi yang konsisten',
      'Development environment yang identik antar developer',
      'Microservices isolasi antar service',
      'CI/CD pipeline: build, test, deploy dalam container',
      'Database lokal tanpa instalasi (postgres, redis, mongo)',
    ],
    learn: [
      'Konsep: image (template) vs container (instance running)',
      'Perintah dasar: docker pull, run, ps, stop, rm, logs, exec',
      'Dockerfile: FROM, RUN, COPY, WORKDIR, EXPOSE, CMD, ENTRYPOINT',
      'Layer caching — urutan instruksi mempengaruhi build speed',
      'Docker Compose: docker-compose.yml untuk multi-container',
      'Volume untuk persistent data dan bind mount untuk development',
      'Network: bridge, host, overlay — komunikasi antar container',
      '.dockerignore untuk exclude file dari build context',
    ],
    refs: 'docs.docker.com · hub.docker.com · composerize.com',
    example: `# Dockerfile — Node.js production-grade multi-stage build
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 3: Runner (minimal image)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Security: jalankan sebagai non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=deps    --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/dist        ./dist
COPY --chown=appuser:appgroup package.json .

USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/index.js"]

---
# docker-compose.yml — Full stack local development
version: "3.9"
services:
  api:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgresql://user:pass@db:5432/cryveth
      REDIS_URL:    redis://cache:6379
    depends_on:
      db:    { condition: service_healthy }
      cache: { condition: service_started }
    volumes:
      - ./src:/app/src  # hot reload saat development

  db:
    image: postgres:16-alpine
    environment: { POSTGRES_USER: user, POSTGRES_PASSWORD: pass, POSTGRES_DB: cryveth }
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d cryveth"]
      interval: 5s

  cache:
    image: redis:7-alpine
    command: redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru

volumes:
  pgdata:`,
  },

  {
    id: 'yaml', ic: 'YAML', nm: 'YAML', yr: '2001 — Clark Evans & Ingy döt Net', col: '#cb171e',
    cat: 'Config / Data Format', dif: 1,
    tgs: ['Config', 'DevOps', 'CI/CD', 'Kubernetes', 'Serialization'],
    dsc: "YAML (YAML Ain't Markup Language) adalah format data yang sangat mudah dibaca manusia, menggunakan indentasi sebagai struktur. Menjadi standar de-facto untuk file konfigurasi: Docker Compose, Kubernetes, GitHub Actions, Ansible, dan Helm Charts semua menggunakan YAML. Lebih expressif dari JSON untuk konfigurasi, tapi sangat sensitif terhadap indentasi dan whitespace.",
    use: [
      'Konfigurasi Docker Compose dan Kubernetes',
      'CI/CD pipeline: GitHub Actions, GitLab CI, CircleCI',
      'Infrastructure as Code dengan Ansible dan Helm',
      'Konfigurasi aplikasi (config.yml)',
      'Data serialization antar sistem',
    ],
    learn: [
      'Struktur: key: value — spasi setelah titik dua wajib',
      'String: dengan atau tanpa kutip, multiline dengan | atau >',
      'List: - item atau [item1, item2] inline',
      'Nested: gunakan indentasi konsisten (2 atau 4 spasi, BUKAN tab)',
      'Anchor (&) dan alias (*) untuk menghindari duplikasi',
      'Merge key (<<:) untuk extend config',
      'Validasi: yamllint untuk deteksi error',
      'Hati-hati: Norway problem (NO diparse sebagai false)',
    ],
    refs: 'yaml.org · yaml-multiline.info · yamllint.com',
    example: `# YAML — GitHub Actions CI/CD Pipeline
name: Deploy CryVeth

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: "20"
  REGISTRY: ghcr.io
  IMAGE: \${{ github.repository }}

jobs:
  test:
    name: Test & Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm test -- --coverage
        env:
          DATABASE_URL: postgresql://user:pass@localhost:5432/test_db

  deploy:
    name: Build & Deploy
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - name: Login to Container Registry
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build & Push Docker image
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: \${{ env.REGISTRY }}/\${{ env.IMAGE }}:latest

      - name: Deploy to server
        run: |
          ssh \${{ secrets.DEPLOY_USER }}@\${{ secrets.DEPLOY_HOST }} \\
            "cd /var/www/cryveth && docker compose pull && docker compose up -d"`,
  },

  {
    id: 'prisma', ic: 'PRS', nm: 'Prisma ORM', yr: '2019 — Prisma (Soren Bramer Schmidt)', col: '#0c344b',
    cat: 'Database / ORM', dif: 2,
    tgs: ['ORM', 'TypeScript', 'Database', 'PostgreSQL', 'Node.js'],
    dsc: 'Prisma adalah ORM (Object-Relational Mapper) generasi terbaru untuk Node.js dan TypeScript. Schema-first approach dengan Prisma Schema Language menjadi single source of truth untuk database dan TypeScript types. Auto-generated type-safe client membuat query database tidak akan pernah typo lagi. Prisma Migrate untuk database migration yang declarative. Dipakai oleh Vercel, Shopify, dan ribuan startup.',
    use: [
      'Database access type-safe di Node.js/TypeScript',
      'Database migration yang declarative dan version-controlled',
      'Multi-database: PostgreSQL, MySQL, SQLite, MongoDB, CockroachDB',
      'Prisma Studio — GUI untuk inspeksi database',
      'Seeder dan data generation untuk development',
    ],
    learn: [
      'npm install prisma @prisma/client',
      'npx prisma init — buat schema.prisma dan .env',
      'Prisma Schema Language: model, field, relation',
      'npx prisma migrate dev — buat dan apply migration',
      'npx prisma generate — generate Prisma Client',
      'CRUD operations: findUnique, findMany, create, update, delete',
      'Relasi: @relation, include untuk eager loading',
      'Transaction: prisma.$transaction([...]) untuk atomic operations',
    ],
    refs: 'prisma.io · prisma.io/docs · github.com/prisma/prisma',
    example: `// Prisma — Schema + Type-safe queries
// schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@map("users")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  tags      Tag[]
  createdAt DateTime @default(now())
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]
}

enum Role { ADMIN USER GUEST }

// ─── queries.ts ────────────────────────────────────────────
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function getDashboard(userId: number) {
  return db.user.findUniqueOrThrow({
    where:  { id: userId },
    select: {
      id:    true,
      name:  true,
      email: true,
      role:  true,
      posts: {
        where:   { published: true },
        orderBy: { createdAt: 'desc' },
        take:    5,
        include: { tags: true },
      },
      _count: { select: { posts: true } },
    },
  });
}

async function createPostWithTags(
  authorId: number,
  title: string,
  body: string,
  tagNames: string[]
) {
  return db.post.create({
    data: {
      title,
      body,
      author: { connect: { id: authorId } },
      tags: {
        connectOrCreate: tagNames.map(name => ({
          where:  { name },
          create: { name },
        })),
      },
    },
    include: { tags: true, author: { select: { name: true } } },
  });
}`,
  },

  {
    id: 'assembly', ic: 'ASM', nm: 'Assembly', yr: '1947 — Kathleen Booth', col: '#6e750e',
    cat: 'System / Low Level', dif: 5,
    tgs: ['Low Level', 'OS', 'Embedded', 'Reverse Engineering', 'Performance'],
    dsc: 'Assembly adalah bahasa yang paling dekat dengan instruksi mesin — satu langkah di atas binary. Setiap instruksi Assembly langsung dieksekusi oleh CPU. Memahami Assembly berarti memahami bagaimana komputer benar-benar bekerja: register, stack, heap, interrupt, system call. Dipakai untuk reverse engineering, exploit development, firmware, dan bagian kritis performa ekstrem. Skill yang langka dan sangat dihargai.',
    use: [
      'Reverse engineering dan malware analysis',
      'Bootloader dan firmware bare-metal',
      'SIMD optimization (AVX, SSE) untuk performa ekstrem',
      'Exploit development dan security research',
      'OS kernel bagian tertentu yang butuh kontrol penuh',
    ],
    learn: [
      'Arsitektur CPU: register (rax, rbx, rcx, rsp, rip), flags',
      'x86-64 AT&T syntax vs Intel syntax',
      'MOV, ADD, SUB, MUL, DIV, CMP, JMP, JE, JNE, CALL, RET',
      'Stack: PUSH, POP, calling convention (System V AMD64 ABI)',
      'NASM atau GAS assembler untuk kompilasi',
      'GDB/LLDB untuk debugging level assembly',
      'Belajar dari C: kompilasi dengan -O0 dan baca outputnya (gcc -S)',
    ],
    refs: 'cs.lmu.edu/~ray/notes/x86assembly · nasm.us · godbolt.org (Compiler Explorer)',
    example: `; NASM x86-64 — "Hello, World!" + fungsi dengan stack frame
section .data
    msg     db "Hello, CryVeth!", 0x0A
    msg_len equ $ - msg

section .bss
    result resq 1       ; 8 byte untuk hasil

section .text
    global _start

; Fungsi: hitung faktorial n (rekursif)
; Parameter: rdi = n
; Return: rax = n!
factorial:
    push rbp            ; simpan base pointer lama
    mov  rbp, rsp       ; set base pointer baru

    cmp  rdi, 1         ; base case: n <= 1
    jle  .base_case

    push rdi            ; simpan n di stack
    dec  rdi            ; n - 1
    call factorial      ; rekursi: factorial(n-1)
    pop  rdi            ; restore n
    imul rax, rdi       ; rax = n * factorial(n-1)
    jmp  .done

.base_case:
    mov  rax, 1         ; return 1

.done:
    pop  rbp
    ret

_start:
    ; Print "Hello, CryVeth!"
    mov  rax, 1         ; syscall: write
    mov  rdi, 1         ; fd: stdout
    mov  rsi, msg       ; buffer
    mov  rdx, msg_len   ; panjang
    syscall

    ; Hitung 10! = 3628800
    mov  rdi, 10
    call factorial
    mov  [result], rax  ; simpan hasil

    ; Exit
    mov  rax, 60        ; syscall: exit
    xor  rdi, rdi       ; exit code 0
    syscall`,
  },

  {
    id: 'powershell', ic: 'PS', nm: 'PowerShell', yr: '2006 — Jeffrey Snover (Microsoft)', col: '#012456',
    cat: 'Scripting / DevOps', dif: 2,
    tgs: ['Windows', 'Automation', 'DevOps', 'Admin', 'Microsoft'],
    dsc: 'PowerShell adalah shell dan scripting language dari Microsoft yang berbasis .NET. Berbeda dari Bash yang bekerja dengan teks, PowerShell bekerja dengan objek .NET — hasilnya bisa di-filter, di-sort, dan di-pipe dengan cara yang sangat powerful. PowerShell Core (v6+) berjalan di Windows, Linux, dan macOS. Wajib untuk Windows sysadmin, Azure DevOps, dan manajemen Microsoft 365.',
    use: [
      'Windows system administration',
      'Azure dan Microsoft 365 automation',
      'Active Directory management',
      'CI/CD pipeline di lingkungan Windows',
      'Reporting dan monitoring otomatis',
    ],
    learn: [
      'Cmdlet pattern: Verb-Noun (Get-Process, Set-Item, New-Object)',
      'Pipeline: | meneruskan objek, bukan teks',
      'Variabel: $var, $env:PATH, $null, $true, $false',
      "String: \"interpolasi $var\" vs 'literal tanpa interpolasi'",
      'Kondisi: if/elseif/else, switch, ternary ($x ? a : b)',
      'Loop: foreach, for, while, do-while',
      'Error handling: try/catch/finally, $ErrorActionPreference',
      'Modul: Import-Module, PowerShellGet, PSGallery',
    ],
    refs: 'learn.microsoft.com/PowerShell · powershellgallery.com · ss64.com/ps',
    example: `# PowerShell — Modern scripting dengan error handling
#Requires -Version 7.0

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# Logging helper
function Write-Log {
    param([string]$Level, [string]$Message)
    $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    $color = @{ INFO='Cyan'; WARN='Yellow'; ERROR='Red' }[$Level] ?? 'White'
    Write-Host "[$timestamp] [$Level] $Message" -ForegroundColor $color
}

# Fungsi ambil user dari API
function Get-ApiUsers {
    param(
        [string] $BaseUrl  = 'https://api.example.com',
        [string] $Role,
        [int]    $Limit    = 50
    )

    $params = @{ limit = $Limit }
    if ($Role) { $params['role'] = $Role }

    try {
        $response = Invoke-RestMethod -Uri "$BaseUrl/users" -Body $params -Method GET
        Write-Log INFO "Berhasil ambil $($response.Count) user"
        return $response
    }
    catch {
        Write-Log ERROR "Gagal ambil user: $_"
        throw
    }
}

# Main script
$users = Get-ApiUsers -Role 'admin'

# PowerShell pipeline dengan objek
$report = $users
    | Where-Object { $_.isActive -eq $true }
    | Sort-Object name
    | Select-Object id, name, email, @{
        Name       = 'CreatedDate'
        Expression = { [datetime]$_.createdAt | Get-Date -Format 'dd/MM/yyyy' }
      }

# Export ke CSV
$reportPath = ".\\report-$(Get-Date -Format 'yyyyMMdd').csv"
$report | Export-Csv -Path $reportPath -NoTypeInformation -Encoding UTF8
Write-Log INFO "Report disimpan: $reportPath"

# Output ke console sebagai tabel
$report | Format-Table -AutoSize`,
  },

  {
    id: 'terraform', ic: 'TF', nm: 'Terraform', yr: '2014 — HashiCorp (Mitchell Hashimoto)', col: '#844fba',
    cat: 'DevOps / IaC', dif: 3,
    tgs: ['Infrastructure as Code', 'DevOps', 'Cloud', 'AWS', 'GCP', 'Azure'],
    dsc: 'Terraform adalah tool Infrastructure as Code (IaC) paling populer dari HashiCorp. Dengan Terraform, infrastruktur cloud (VM, database, load balancer, DNS, dll) didefinisikan sebagai kode dalam HCL (HashiCorp Configuration Language) — bisa di-version control, di-review, dan di-reproduce. Mendukung 1000+ provider: AWS, GCP, Azure, Cloudflare, GitHub, dan lainnya. "Plan before apply" memungkinkan preview perubahan sebelum eksekusi.',
    use: [
      'Provisioning cloud infrastructure (AWS, GCP, Azure)',
      'Multi-cloud dan hybrid cloud management',
      'Kubernetes cluster management (EKS, GKE, AKS)',
      'Database, load balancer, CDN, DNS otomatis',
      'Environment replication: staging identik dengan production',
    ],
    learn: [
      'Install Terraform dari terraform.io',
      'HCL syntax: resource, variable, output, data, locals',
      'terraform init, plan, apply, destroy — workflow dasar',
      'State file: cara Terraform track infrastruktur yang ada',
      'Remote state: simpan di S3/GCS untuk kolaborasi tim',
      'Module: reusable infrastructure component',
      'Workspace: manage multiple environment (dev/staging/prod)',
      'Provider authentication: AWS credentials, GCP service account',
    ],
    refs: 'developer.hashicorp.com/terraform · registry.terraform.io · spacelift.io/blog',
    example: `# Terraform — AWS infrastructure dengan modules
terraform {
  required_version = ">= 1.7"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
  backend "s3" {
    bucket = "cryveth-terraform-state"
    key    = "production/terraform.tfstate"
    region = "ap-southeast-1"
  }
}

provider "aws" {
  region = var.aws_region
  default_tags { tags = local.common_tags }
}

locals {
  common_tags = {
    Project     = "CryVeth"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# VPC
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "cryveth-\${var.environment}"
  cidr = "10.0.0.0/16"
  azs  = ["ap-southeast-1a", "ap-southeast-1b", "ap-southeast-1c"]

  private_subnets  = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets   = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = var.environment != "production"
}

# RDS PostgreSQL
resource "aws_db_instance" "main" {
  identifier     = "cryveth-\${var.environment}"
  engine         = "postgres"
  engine_version = "16.2"
  instance_class = var.db_instance_class

  allocated_storage     = 20
  max_allocated_storage = 100
  storage_encrypted     = true

  db_name  = "cryveth"
  username = "dbadmin"
  password = var.db_password

  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name

  backup_retention_period = 7
  deletion_protection     = var.environment == "production"
  skip_final_snapshot     = var.environment != "production"

  tags = { Name = "cryveth-db-\${var.environment}" }
}

output "db_endpoint" { value = aws_db_instance.main.endpoint }
output "vpc_id"      { value = module.vpc.vpc_id }`,
  },

  {
    id: 'matlab', ic: 'MAT', nm: 'MATLAB', yr: '1984 — Cleve Moler (MathWorks)', col: '#e16737',
    cat: 'Data / Engineering / Science', dif: 3,
    tgs: ['Engineering', 'Math', 'Signal Processing', 'Simulation', 'Academic'],
    dsc: 'MATLAB (Matrix Laboratory) adalah bahasa dan environment komputasi numerik dari MathWorks. Dirancang untuk komputasi matriks dan linear algebra, MATLAB menjadi standar industri di engineering, signal processing, control system, dan penelitian ilmiah. Simulink untuk model dan simulasi sistem dinamik. Toolbox untuk hampir setiap domain: Deep Learning, Computer Vision, Signal Processing, hingga Robotics.',
    use: [
      'Komputasi numerik dan simulasi engineering',
      'Signal dan image processing',
      'Control system design (PID, LQR)',
      'Machine learning dan deep learning (toolbox)',
      'Penelitian akademis dan prototyping algoritma',
      'Simulink untuk model sistem fisik',
    ],
    learn: [
      'Matriks adalah tipe data fundamental: A = [1 2; 3 4]',
      'Operasi elemen-wise: .* ./ .^ vs operasi matriks: * / ^',
      'Plot: plot, scatter, histogram, imagesc, surf',
      'Fungsi: function [out1, out2] = myFunc(in1, in2)',
      'Control flow: if, for, while, switch',
      'Cell array dan struct untuk data heterogen',
      'Toolbox: Signal Processing, Statistics, Deep Learning',
      'Simulink untuk model grafis sistem dinamik',
    ],
    refs: 'mathworks.com · mathworks.com/help/matlab · courseera (MATLAB programming courses)',
    example: `% MATLAB — Signal Processing + Visualization
% Analisis sinyal audio dengan FFT

Fs = 44100;         % Sampling frequency (Hz)
T  = 1 / Fs;        % Sampling period
t  = 0:T:1-T;       % Time vector (1 detik)

% Buat sinyal komposit: 440 Hz (A4) + 880 Hz (A5) + noise
signal = 0.8 * sin(2*pi*440*t) + ...
         0.4 * sin(2*pi*880*t) + ...
         0.1 * randn(size(t));

% FFT Analysis
N   = length(signal);
Y   = fft(signal);
P2  = abs(Y/N);
P1  = P2(1:N/2+1);
P1(2:end-1) = 2 * P1(2:end-1);
f   = Fs * (0:(N/2)) / N;

% Filtering: low-pass Butterworth filter (cutoff 1kHz)
[b, a]      = butter(6, 1000/(Fs/2), 'low');
filtered    = filter(b, a, signal);

% Visualisasi
figure('Name', 'CryVeth Signal Analysis', 'Position', [100 100 1200 600]);

subplot(3,1,1);
plot(t(1:1000), signal(1:1000));
title('Sinyal Original (25ms pertama)');
xlabel('Waktu (s)'); ylabel('Amplitudo');
grid on;

subplot(3,1,2);
plot(f, P1);
title('Spektrum Frekuensi (FFT)');
xlabel('Frekuensi (Hz)'); ylabel('|P1(f)|');
xlim([0 2000]); grid on;

subplot(3,1,3);
plot(t(1:1000), filtered(1:1000));
title('Sinyal Setelah Low-pass Filter (1kHz)');
xlabel('Waktu (s)'); ylabel('Amplitudo');
grid on;

% Statistik
fprintf('SNR estimasi: %.2f dB\\n', snr(signal));
fprintf('Frekuensi dominan: %.1f Hz\\n', f(P1 == max(P1)));`,
  },

  {
    id: 'julia', ic: 'JL', nm: 'Julia', yr: '2012 — Jeff Bezanson, Alan Edelman, et al. (MIT)', col: '#9558b2',
    cat: 'Data / AI / Science', dif: 3,
    tgs: ['Scientific Computing', 'Performance', 'Math', 'Data Science', 'AI'],
    dsc: 'Julia dirancang untuk menyelesaikan "two-language problem" — ilmuwan menulis prototyping di Python/MATLAB tapi harus reimplementasi ke C/Fortran untuk performa. Julia menjawab: satu bahasa yang semudah Python tapi secepat C. JIT compilation via LLVM menghasilkan performa setara C. Dipakai di NASA, bank sentral, dan laboratorium riset untuk komputasi saintifik berskala besar.',
    use: [
      'Scientific computing dan simulasi numerik',
      'Machine learning dan AI research (Flux.jl)',
      'Komputasi keuangan dan quantitative finance',
      'Bioinformatika dan genomik',
      'Diferential equation dan physical modeling',
    ],
    learn: [
      'Install dari julialang.org — REPL interaktif',
      'Tipe data: Int64, Float64, Complex, BigInt, String',
      'Array: 1-indexed, column-major (seperti Fortran/MATLAB)',
      'Multiple dispatch: fungsi berbeda untuk tipe berbeda',
      'Broadcasting: f.(x) untuk elemen-wise operation',
      'Package manager Pkg dan Jupyter (IJulia)',
      'Parallelism: @threads, @distributed, GPU (CUDA.jl)',
      'Metaprogramming dengan macros (@time, @simd, @turbo)',
    ],
    refs: 'julialang.org · docs.julialang.org · juliahub.com',
    example: `# Julia — Multiple dispatch + broadcasting + performance
using LinearAlgebra, Statistics, Plots

# Struct dengan type parameter (generic)
struct User{T<:AbstractString}
    id::Int
    name::T
    score::Float64
end

# Multiple dispatch: fungsi berbeda untuk tipe berbeda
describe(u::User) = "$(u.name) (score: $(round(u.score, digits=2)))"
describe(users::Vector{<:User}) = join(describe.(users), "\\n")  # broadcasting

# Benchmark: Julia vs naive Python speed
function monte_carlo_pi(n::Int)
    count = 0
    for _ in 1:n
        x, y = rand(), rand()
        count += (x^2 + y^2) <= 1.0
    end
    return 4.0 * count / n
end

# @time untuk profiling
@time pi_est = monte_carlo_pi(10_000_000)
println("pi estimasi: $pi_est (error: $(abs(pi_est - pi)))")

# Visualisasi: scatter plot Monte Carlo
n = 50_000
points = rand(2, n)
inside = vec(sum(points.^2, dims=1) .<= 1.0)

scatter(points[1, inside],  points[2, inside],
        markersize=1, color=:blue, alpha=0.5, label="Dalam lingkaran")
scatter!(points[1, .!inside], points[2, .!inside],
         markersize=1, color=:red, alpha=0.5, label="Luar lingkaran")
title!("Monte Carlo: pi ≈ $(round(pi_est, digits=5))")
savefig("monte_carlo.png")`,
  },

  {
    id: 'perl', ic: 'PL', nm: 'Perl', yr: '1987 — Larry Wall', col: '#39457e',
    cat: 'Scripting / Backend', dif: 3,
    tgs: ['Scripting', 'Text Processing', 'Bioinformatics', 'CGI', 'Regex'],
    dsc: "Perl adalah bahasa scripting yang sangat powerful untuk text processing, dengan regex yang paling expressif di antara semua bahasa. Dikenal dengan motto \"There's more than one way to do it\" (TIMTOWTDI). Meski popularitasnya menurun, Perl masih dominan di bioinformatika (BioPerl), administrasi sistem legacy, dan text processing kompleks. CPAN memiliki 200.000+ module — salah satu ekosistem terbesar.",
    use: [
      'Text processing dan data extraction kompleks',
      'Bioinformatika dan analisis sekuens (BioPerl)',
      'System administration dan log analysis',
      'Web scraping dengan regex canggih',
      'Legacy system maintenance',
    ],
    learn: [
      'Variabel: $scalar, @array, %hash',
      'Regex: m//, s///, tr/// — paling powerful di semua bahasa',
      'Context: list vs scalar context mempengaruhi behaviour',
      'References dan data struktur kompleks',
      'Module: use strict, use warnings (WAJIB selalu)',
      'CPAN dan cpanm untuk install module',
      'Moose atau Moo untuk OOP modern',
    ],
    refs: 'perl.org · metacpan.org · perlmonks.org · learn.perl.org',
    example: `#!/usr/bin/perl
# Perl — Text processing + regex + hash
use strict;
use warnings;
use 5.034;

# Parse log file dan agregasi error
sub parse_logs {
    my ($filename) = @_;
    open(my $fh, '<', $filename) or die "Tidak bisa buka $filename: $!";

    my %stats = (errors => 0, warnings => 0, by_endpoint => {});

    while (my $line = <$fh>) {
        chomp $line;

        # Named capture groups dalam regex
        if ($line =~ m{
            \\[(?<ts>\\d{4}-\\d{2}-\\d{2}\\s\\d{2}:\\d{2}:\\d{2})\\]
            \\s+(?<level>ERROR|WARN|INFO)
            \\s+(?<endpoint>/\\S+)
            \\s+(?<status>\\d{3})
        }x) {
            my %m = %+;
            $stats{errors}++   if $m{level} eq 'ERROR';
            $stats{warnings}++ if $m{level} eq 'WARN';
            $stats{by_endpoint}{$m{endpoint}}{$m{level}}++;
        }
    }
    close($fh);
    return %stats;
}

my %results = parse_logs('/var/log/cryveth.log');
say "Total errors:   $results{errors}";
say "Total warnings: $results{warnings}";

# Sort endpoint by error count, print top 5
my @top = sort {
    ($results{by_endpoint}{$b}{ERROR} // 0)
    <=>
    ($results{by_endpoint}{$a}{ERROR} // 0)
} keys %{$results{by_endpoint}};

say "\\nTop 5 endpoint dengan error:";
for my $ep (@top[0..4]) {
    my $count = $results{by_endpoint}{$ep}{ERROR} // 0;
    printf "  %-30s %d errors\\n", $ep, $count;
}`,
  },

  {
    id: 'coffeescript', ic: 'COFFEE', nm: 'CoffeeScript', yr: '2009 — Jeremy Ashkenas', col: '#c0a05c',
    cat: 'Web / Frontend', dif: 2,
    tgs: ['JavaScript', 'Transpiled', 'Ruby-like', 'Legacy'],
    dsc: 'CoffeeScript adalah bahasa yang dikompilasi menjadi JavaScript, terinspirasi sintaks Python dan Ruby. Lahir sebelum ES6, CoffeeScript memperkenalkan arrow function, destructuring, dan class ke ekosistem JavaScript. Setelah ES6+ hadir dengan fitur serupa, popularitasnya menurun drastis. Namun CoffeeScript meninggalkan warisan besar — banyak fitur ES6 terinspirasi darinya. Masih ada di beberapa proyek legacy.',
    use: [
      'Proyek legacy yang masih menggunakan CoffeeScript',
      'Belajar sejarah evolusi JavaScript',
      'Ruby/Python developer yang belajar JavaScript',
    ],
    learn: [
      'Whitespace-significant: indentasi menggantikan {} dan ;',
      '-> (return implicit) vs => (bound this)',
      'String interpolation: "Hello, #{name}"',
      'Existential operator: ?, ?.',
      'List comprehension: [x*2 for x in list when x > 0]',
      'Compile: coffee -c file.coffee',
    ],
    refs: 'coffeescript.org · js2.coffee (converter)',
    example: `# CoffeeScript — Kompak dan elegan (compile ke JavaScript)
class User
  constructor: (@id, @name, @email, @role = 'user') ->
    @createdAt = new Date()

  isAdmin: -> @role is 'admin'

  toString: -> "#{@name} <#{@email}> [#{@role}]"

  toJSON: ->
    id:        @id
    name:      @name
    email:     @email
    role:      @role
    createdAt: @createdAt.toISOString()

class UserService
  constructor: ->
    @users = []

  add: (name, email, role = 'user') ->
    user = new User(@users.length + 1, name, email, role)
    @users.push user
    user

  findById: (id) ->
    @users.find (u) -> u.id is id

  admins: ->
    user for user in @users when user.isAdmin()

  fetchFromApi: (url) ->
    try
      res = await fetch url
      data = await res.json()
      @add(item.name, item.email, item.role) for item in data
    catch err
      console.error "Fetch gagal:", err.message

service = new UserService()
service.add "Alice", "alice@x.com", "admin"
service.add "Bob",   "bob@x.com"

console.log "Admins:", service.admins().map (u) -> u.toString()`,
  },

  {
    id: 'fsharp', ic: 'F#', nm: 'F#', yr: '2005 — Don Syme (Microsoft Research)', col: '#378bba',
    cat: 'Functional / Backend', dif: 4,
    tgs: ['Functional', '.NET', 'Data', 'Type-safe', 'Microsoft'],
    dsc: 'F# adalah bahasa functional-first di ekosistem .NET — cousin dari OCaml yang berjalan di CLR. Menggabungkan kekuatan functional programming (immutability, type inference, discriminated union) dengan akses penuh ke .NET ecosystem. F# dipakai di financial domain (Jet.com, seluruh Microsoft Finance), data science, dan domain modeling. Type system yang sangat kuat memungkinkan "making illegal states unrepresentable".',
    use: [
      'Domain modeling dan business logic yang kompleks',
      'Financial system dan quantitative finance',
      'Data pipeline dan ETL dengan FAKE/Paket',
      'Script dan automation di ekosistem .NET',
      'Machine learning dengan ML.NET',
    ],
    learn: [
      'Install .NET SDK, gunakan dotnet fsi untuk REPL',
      'Immutable by default: let x = 5 (tidak bisa diubah)',
      'Type inference: tidak perlu tulis tipe di mana-mana',
      'Discriminated Union (DU): tipe yang paling powerful di F#',
      'Pattern matching yang exhaustive',
      'Railway-oriented programming dengan Result<T,E>',
      'Computation expression: async { ... }, seq { ... }',
      'Pipe operator |> untuk chaining yang elegan',
    ],
    refs: 'fsharp.org · fsharpforfunandprofit.com · docs.microsoft.com/fsharp',
    example: `// F# — Discriminated Union + Railway + Pipeline
module UserDomain

type Role =
    | Admin
    | Moderator
    | User
    | Guest

type ValidationError =
    | EmptyName
    | InvalidEmail of string
    | EmailAlreadyExists of string

type User = {
    Id        : int
    Name      : string
    Email     : string
    Role      : Role
    CreatedAt : System.DateTime
}

module User =
    let validate name email existingEmails =
        let validateName n =
            if System.String.IsNullOrWhiteSpace n then Error EmptyName
            else Ok n

        let validateEmail e =
            if not (e |> Seq.exists ((=) '@')) then Error (InvalidEmail e)
            elif existingEmails |> List.contains e then Error (EmailAlreadyExists e)
            else Ok e

        result {
            let! validName  = validateName name
            let! validEmail = validateEmail email
            return {
                Id        = System.Random.Shared.Next(1, 9999)
                Name      = validName
                Email     = validEmail
                Role      = User
                CreatedAt = System.DateTime.UtcNow
            }
        }

    let describe u =
        let roleStr =
            match u.Role with
            | Admin     -> "Administrator"
            | Moderator -> "Moderator"
            | User      -> "Pengguna"
            | Guest     -> "Tamu"
        sprintf "%s <%s> [%s]" u.Name u.Email roleStr

let existingEmails = ["alice@x.com"; "bob@x.com"]

["Alice", "alice@x.com"; "Charlie", "charlie@x.com"; "Dave", "invalid-email"]
|> List.map (fun (name, email) -> User.validate name email existingEmails)
|> List.iter (function
    | Ok user    -> printfn "OK: %s" (User.describe user)
    | Error err  ->
        match err with
        | EmptyName              -> printfn "Nama tidak boleh kosong"
        | InvalidEmail e         -> printfn "Email tidak valid: %s" e
        | EmailAlreadyExists e   -> printfn "Email sudah terdaftar: %s" e)`,
  },

  {
    id: 'ocaml', ic: 'ML', nm: 'OCaml', yr: '1996 — INRIA (Xavier Leroy et al.)', col: '#ee6a1a',
    cat: 'Functional / System', dif: 5,
    tgs: ['Functional', 'Type-safe', 'Compiler', 'Academic', 'System'],
    dsc: 'OCaml adalah bahasa functional dengan type inference yang sangat kuat, GC yang efisien, dan native compilation yang cepat. Ancestor dari F# dan terinspirasi ML. Dipakai oleh Jane Street (firma trading HFT terbesar) yang menggunakannya untuk hampir semua sistem kritis mereka. Facebook Flow (type checker JavaScript) dan Hack ditulis dalam OCaml. Rust dan Haskell terinspirasi banyak dari OCaml.',
    use: [
      'Compiler dan language tool development',
      'High-frequency trading (Jane Street)',
      'Formal verification dan proof assistant',
      'Static analysis tool',
      'Research sistem tipe dan PL theory',
    ],
    learn: [
      'Install: opam (OCaml Package Manager)',
      'Immutable by default, ref untuk mutable',
      'Pattern matching yang exhaustive dan sangat powerful',
      'Algebraic Data Type (ADT) dengan variant',
      'Option dan Result untuk error handling',
      'Functor dan module system yang powerful',
      'Dune untuk build system',
      'Jane Street Core library sebagai stdlib alternatif',
    ],
    refs: 'ocaml.org · cs3110.github.io · v2.ocaml.org/learn',
    example: `(* OCaml — ADT + pattern matching + modules *)
type role = Admin | Moderator | User | Guest

type user = {
  id:         int;
  name:       string;
  email:      string;
  role:       role;
  created_at: float;
}

type error = EmptyName | InvalidEmail of string | DuplicateEmail of string

let create_user ~id ~name ~email ~role =
  if String.length (String.trim name) = 0 then
    Error EmptyName
  else if not (String.contains email '@') then
    Error (InvalidEmail email)
  else
    Ok { id; name; email; role; created_at = Unix.gettimeofday () }

let describe_role = function
  | Admin     -> "Administrator"
  | Moderator -> "Moderator"
  | User      -> "Pengguna"
  | Guest     -> "Tamu"

let describe u =
  Printf.sprintf "%s <%s> [%s]" u.name u.email (describe_role u.role)

let filter_by_role role users =
  List.filter (fun u -> u.role = role) users

let find_by_email email users =
  List.find_opt (fun u -> u.email = email) users

let () =
  let users = [
    create_user ~id:1 ~name:"Alice" ~email:"alice@x.com" ~role:Admin;
    create_user ~id:2 ~name:""      ~email:"b@x.com"     ~role:User;
    create_user ~id:3 ~name:"Carol" ~email:"invalid"      ~role:User;
  ] in
  List.iter (function
    | Ok u    -> Printf.printf "OK: %s\\n" (describe u)
    | Error e ->
      (match e with
       | EmptyName       -> print_endline "ERROR: Nama kosong"
       | InvalidEmail s  -> Printf.printf "ERROR: Email tidak valid: %s\\n" s
       | DuplicateEmail s -> Printf.printf "ERROR: Email duplikat: %s\\n" s)
  ) users`,
  },

  {
    id: 'gleam', ic: 'GL', nm: 'Gleam', yr: '2019 — Louis Pilfold', col: '#ffaff3',
    cat: 'Functional / Backend', dif: 3,
    tgs: ['Erlang', 'BEAM', 'Functional', 'Type-safe', 'Concurrent'],
    dsc: 'Gleam adalah bahasa functional modern yang berjalan di atas Erlang VM (BEAM) sekaligus bisa dikompilasi ke JavaScript. Membawa type safety ala Rust/Haskell ke dunia BEAM — semua error adalah compile-time errors, tidak ada runtime type error. Sintaks bersih yang terinspirasi Rust. Cocok untuk developer yang ingin concurrency BEAM dengan keamanan tipe penuh. Ekosistem masih kecil tapi berkembang cepat.',
    use: [
      'Backend concurrent yang type-safe di BEAM VM',
      'Interoperasi dengan kode Erlang dan Elixir',
      'Full-stack dengan compile ke JavaScript (Lustre)',
      'Sistem distributed fault-tolerant',
    ],
    learn: [
      'Install dari gleam.run',
      'Tipe statis: Int, Float, String, Bool, List, Option, Result',
      'Pattern matching dengan case expression',
      'Custom type (mirip Rust enum / Haskell ADT)',
      'Pipe operator |> untuk chaining',
      'gleam new untuk buat project, gleam run untuk jalankan',
      'Hex untuk package management (sama dengan Elixir)',
    ],
    refs: 'gleam.run · hexdocs.pm/gleam_stdlib · tour.gleam.run',
    example: `// Gleam — Custom types + Result + pipeline
import gleam/io
import gleam/list
import gleam/string
import gleam/result
import gleam/int

pub type Role {
  Admin
  Moderator
  User
  Guest
}

pub type User {
  User(
    id:    Int,
    name:  String,
    email: String,
    role:  Role,
  )
}

pub type UserError {
  EmptyName
  InvalidEmail(String)
  NotFound(Int)
}

pub fn create_user(id: Int, name: String, email: String) -> Result(User, UserError) {
  use _ <- result.try(case string.is_empty(string.trim(name)) {
    True  -> Error(EmptyName)
    False -> Ok(Nil)
  })
  use _ <- result.try(case string.contains(email, "@") {
    False -> Error(InvalidEmail(email))
    True  -> Ok(Nil)
  })
  Ok(User(id: id, name: name, email: email, role: User))
}

pub fn describe_role(role: Role) -> String {
  case role {
    Admin     -> "Administrator"
    Moderator -> "Moderator"
    User      -> "Pengguna"
    Guest     -> "Tamu"
  }
}

pub fn describe(user: User) -> String {
  user.name
  |> string.append(" <")
  |> string.append(user.email)
  |> string.append("> [")
  |> string.append(describe_role(user.role))
  |> string.append("]")
}

pub fn main() {
  let candidates = [
    #(1, "Alice",   "alice@x.com"),
    #(2, "",        "b@x.com"),
    #(3, "Charlie", "invalid"),
  ]

  candidates
  |> list.map(fn(t) { create_user(t.0, t.1, t.2) })
  |> list.each(fn(r) {
    case r {
      Ok(user)                 -> io.println("OK: " <> describe(user))
      Error(EmptyName)         -> io.println("Nama tidak boleh kosong")
      Error(InvalidEmail(e))   -> io.println("Email tidak valid: " <> e)
      Error(NotFound(id))      -> io.println("User tidak ditemukan: " <> int.to_string(id))
    }
  })
}`,
  },

  {
    id: 'nim', ic: 'NIM', nm: 'Nim', yr: '2008 — Andreas Rumpf', col: '#ffe953',
    cat: 'System / Scripting', dif: 3,
    tgs: ['System', 'Scripting', 'Performance', 'Compiled', 'Python-like'],
    dsc: 'Nim adalah bahasa compiled dengan sintaks seperti Python yang menghasilkan performa setara C. Compile ke C, C++, atau JavaScript. Macro system yang sangat powerful memungkinkan kamu mengubah bahasa itu sendiri. Zero-cost abstraction, optional GC, dan interop mulus dengan library C/C++. Menarik bagi developer yang suka Python tapi butuh performa native compilation.',
    use: [
      'System programming dengan sintaks Python-like',
      'Game development (Nim has game frameworks)',
      'Compile ke JavaScript untuk web frontend',
      'CLI tools berkinerja tinggi',
      'Scripting dengan performa C',
    ],
    learn: [
      'Install dari nim-lang.org',
      'Sintaks berbasis indentasi seperti Python',
      'Tipe: int, float, string, bool, seq, array, tuple',
      'Prosedur (proc) dan fungsi',
      'Macro dan template untuk metaprogramming',
      'GC modes: refc, arc, orc (Rust-like reference counting)',
      'nimble untuk package management',
    ],
    refs: 'nim-lang.org · nimble.directory · status.im/nim-in-action',
    example: `# Nim — Python-like syntax + C-level performance
import std/[strformat, sequtils, algorithm, times]

type
  Role* = enum
    rGuest = "guest"
    rUser  = "user"
    rAdmin = "admin"

  User* = object
    id*:        int
    name*:      string
    email*:     string
    role*:      Role
    createdAt*: DateTime

proc newUser*(id: int, name, email: string, role = rUser): User =
  User(id: id, name: name, email: email, role: role, createdAt: now())

proc isAdmin*(u: User): bool = u.role == rAdmin

proc describe*(u: User): string =
  fmt"{u.name} <{u.email}> [{u.role}]"

proc filterByRole*[T](users: seq[T], role: Role): seq[T] =
  users.filterIt(it.role == role)

template log(msg: string) =
  when defined(debug):
    echo "[DEBUG] " & msg

import std/json

proc toJson*(u: User): JsonNode =
  %* { "id": u.id, "name": u.name, "email": u.email, "role": $u.role }

when isMainModule:
  var users = @[
    newUser(1, "Alice", "alice@x.com", rAdmin),
    newUser(2, "Bob",   "bob@x.com"),
    newUser(3, "Carol", "carol@x.com", rAdmin),
  ]

  users.sort(proc(a, b: User): int = cmp(a.name, b.name))

  let admins = users.filterByRole(rAdmin)
  echo fmt"Total admin: {admins.len}"

  for u in admins:
    log u.describe()
    echo u.toJson().pretty()`,
  },
];

// ─── Language categories for filtering ──────────────────────────────────────
export const LANG_CATS = [
  { id: 'all',        label: 'Semua' },
  { id: 'web',        label: 'Web' },
  { id: 'backend',    label: 'Backend' },
  { id: 'mobile',     label: 'Mobile' },
  { id: 'system',     label: 'System' },
  { id: 'data',       label: 'Data / AI' },
  { id: 'game',       label: 'Game' },
  { id: 'database',   label: 'Database' },
  { id: 'devops',     label: 'DevOps' },
  { id: 'blockchain', label: 'Blockchain' },
  { id: 'functional', label: 'Functional' },
];

// ─── Filter utility ─────────────────────────────────────────────────────────
// FIX BUG #3: Tag matching sekarang exact match untuk menghindari false positives
// e.g. cat='web' tidak akan lagi match tag 'WebAssembly'
export const filterLangs = (query = '', cat = 'all') => {
  let result = LANGS_DB;

  if (cat && cat !== 'all') {
    const catLower = cat.toLowerCase();
    result = result.filter(l =>
      l.cat.toLowerCase().includes(catLower) ||
      l.tgs.some(t => t.toLowerCase() === catLower)
    );
  }

  if (query.trim()) {
    const q = query.toLowerCase().trim();
    result = result.filter(l =>
      l.nm.toLowerCase().includes(q) ||
      l.id.toLowerCase().includes(q) ||
      l.cat.toLowerCase().includes(q) ||
      l.tgs.some(t => t.toLowerCase().includes(q)) ||
      l.dsc.toLowerCase().includes(q)
    );
  }

  return result;
};

// ─── Sort utility ────────────────────────────────────────────────────────────
// FIX BUG #4: Year parsing sekarang robust dengan regex, tidak bergantung pada
// parseInt yang kebetulan berhenti di non-digit character
export const sortLangs = (langs, by = 'name') => {
  const sorted = [...langs];
  switch (by) {
    case 'name':
      return sorted.sort((a, b) => a.nm.localeCompare(b.nm));
    case 'difficulty':
      return sorted.sort((a, b) => a.dif - b.dif);
    case 'year':
      return sorted.sort((a, b) => {
        const ya = parseInt(a.yr.match(/\d{4}/)?.[0] ?? '0', 10);
        const yb = parseInt(b.yr.match(/\d{4}/)?.[0] ?? '0', 10);
        return ya - yb;
      });
    default:
      return sorted;
  }
};

// ─── Stats ───────────────────────────────────────────────────────────────────
// FIX BUG #5: Tambahkan guard untuk dif out-of-range agar tidak silent miss
export const DB_STATS = {
  total:      LANGS_DB.length,
  byDifficulty: {
    beginner:     LANGS_DB.filter(l => l.dif === 1).length,
    intermediate: LANGS_DB.filter(l => l.dif === 2).length,
    advanced:     LANGS_DB.filter(l => l.dif === 3).length,
    expert:       LANGS_DB.filter(l => l.dif === 4).length,
    master:       LANGS_DB.filter(l => l.dif === 5).length,
    // Guard: deteksi data entry dengan dif di luar range 1-5
    unknown:      LANGS_DB.filter(l => l.dif < 1 || l.dif > 5 || !Number.isInteger(l.dif)).length,
  },
  categories: [...new Set(LANGS_DB.map(l => l.cat))],
  allTags:    [...new Set(LANGS_DB.flatMap(l => l.tgs))].sort(),
};