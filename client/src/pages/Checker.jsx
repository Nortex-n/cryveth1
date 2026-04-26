import { useState } from 'react';
import { useToast } from '../hooks/useToast';

const LANGUAGES = [
  { value:'javascript', label:'JavaScript' },
  { value:'typescript', label:'TypeScript' },
  { value:'python',     label:'Python'     },
  { value:'html',       label:'HTML'       },
  { value:'css',        label:'CSS'        },
  { value:'nodejs',     label:'Node.js'    },
  { value:'php',        label:'PHP'        },
  { value:'go',         label:'Go'         },
  { value:'java',       label:'Java'       },
  { value:'csharp',     label:'C#'         },
  { value:'rust',       label:'Rust'       },
  { value:'cpp',        label:'C++'        },
  { value:'sql',        label:'SQL'        },
  { value:'bash',       label:'Bash'       },
  { value:'kotlin',     label:'Kotlin'     },
  { value:'swift',      label:'Swift'      },
];

const EXAMPLES = {
  javascript: `// Contoh kode bermasalah\nfunction getData() {\n  const res = fetch('/api/data') // missing await!\n  return res.json()\n}\n\nvar user = null;\nconsole.log(user.name); // TypeError!`,
  python:     `def process(items):\n  for i in range(len(items)): # bisa pakai enumerate\n      print(items[i])\n\ndef get_name():\n  user = None\n  print(user.name) # AttributeError!`,
  sql:        `SELECT * FROM users WHERE email = '` + `' + userInput + '` + `';\n-- SQL Injection!`,
};

function getAnalysisRules(lang) {
  const common = [
    { sev:'info', weight:3, msg:'Pertimbangkan menambahkan komentar/dokumentasi', fix:'Tambahkan komentar untuk logika yang kompleks', test:c => c.length > 200 && !c.includes('//') && !c.includes('#') },
  ];
  const rules = {
    javascript: [
      { sev:'critical', weight:25, msg:'fetch() tanpa await — Promise tidak di-await', fix:'Tambahkan await: const res = await fetch(...)', test:c => /(?<!await\s)fetch\(/.test(c) },
      { sev:'critical', weight:20, msg:'var digunakan — lebih baik const/let', fix:'Ganti var dengan const (atau let jika perlu reassign)', test:c => /\bvar\b/.test(c) },
      { sev:'critical', weight:30, msg:'Potensi TypeError — akses properti tanpa null check', fix:'Gunakan optional chaining: obj?.prop ?? "default"', test:c => /\.\w+\s*[^?]$/.test(c) && /null|undefined/.test(c) },
      { sev:'warning', weight:15, msg:'console.log tersisa — hapus sebelum production', fix:'Hapus console.log atau ganti dengan proper logging', test:c => /console\.log/.test(c) },
      { sev:'critical', weight:20, msg:'async function tanpa try/catch', fix:'Wrap async operations dalam try/catch', test:c => /async\s/.test(c) && !c.includes('try') },
      { sev:'warning', weight:10, msg:'== digunakan — lebih baik === (strict equality)', fix:'Ganti == dengan === untuk perbandingan yang aman', test:c => /[^=!]==[^=]/.test(c) },
    ],
    python: [
      { sev:'warning', weight:10, msg:'range(len(x)) — lebih baik enumerate()', fix:'Ganti range(len(items)) dengan enumerate(items)', test:c => /range\(len\(/.test(c) },
      { sev:'warning', weight:10, msg:'print() — gunakan logging module di production', fix:'from logging import getLogger; logger = getLogger(__name__)', test:c => /\bprint\(/.test(c) },
      { sev:'critical', weight:20, msg:'Exception terlalu broad (bare except)', fix:'Tangkap exception spesifik: except ValueError as e:', test:c => /except\s*:/.test(c) || /except\s+Exception\s*:/.test(c) },
      { sev:'warning', weight:12, msg:'Tidak ada type hints', fix:'Tambahkan type hints: def func(name: str) -> int:', test:c => /def\s+\w+\(/.test(c) && !/:\s*(str|int|float|bool|list|dict|None|Optional)/.test(c) },
    ],
    sql: [
      { sev:'critical', weight:30, msg:'SELECT * — ambil semua kolom, tidak efisien', fix:'Sebutkan kolom: SELECT id, name, email FROM ...', test:c => /SELECT\s+\*/i.test(c) },
      { sev:'critical', weight:35, msg:'Potensi SQL Injection — string concatenation', fix:'Gunakan parameterized query / prepared statement', test:c => /\+\s*\w+\s*\+/.test(c) || /\$\{/.test(c) },
      { sev:'warning', weight:15, msg:'Query tanpa LIMIT — bisa return data sangat banyak', fix:'Tambahkan LIMIT untuk paginasi', test:c => /SELECT/i.test(c) && !/LIMIT/i.test(c) },
    ],
    java: [
      { sev:'critical', weight:25, msg:'Potensi NullPointerException tanpa null check', fix:'Cek null atau gunakan Optional<T>', test:c => /\.\w+\(\)\.\w/.test(c) && !c.includes('Optional') && !c.includes('!= null') },
      { sev:'warning', weight:10, msg:'printStackTrace() — gunakan proper logger', fix:'Gunakan SLF4J: logger.error("message", e)', test:c => /\.printStackTrace\(\)/.test(c) },
    ],
    bash: [
      { sev:'critical', weight:20, msg:'rm -rf dengan variabel tanpa quote', fix:'Quote variable: rm -rf "$directory"', test:c => /rm\s+-rf?\s+\$[^"{]/.test(c) },
      { sev:'warning', weight:12, msg:'set -euo pipefail tidak ada', fix:'Tambahkan di baris awal script untuk strict mode', test:c => !c.includes('set -e') && c.length > 50 },
    ],
  };
  return [...(rules[lang] || []), ...common];
}

function runAnalysis(code, lang) {
  const rules = getAnalysisRules(lang);
  const lines = code.split('\n').length;
  const chars = code.length;
  const issues = rules.filter(r => r.test(code)).map(({ sev, msg, fix }) => ({ sev, msg, fix }));
  const penaltyTotal = issues.reduce((acc, i) => {
    const r = rules.find(r => r.msg === i.msg);
    return acc + (r ? (r.weight || 10) : 10);
  }, 0);
  const score = Math.max(0, Math.min(100, 100 - penaltyTotal));
  const suggestions = [];
  if (!issues.some(i => i.sev === 'critical')) suggestions.push('Tidak ada masalah kritis ditemukan');
  if (code.includes('async') && code.includes('try')) suggestions.push('Error handling async sudah ada');
  if (code.includes('const') && !code.includes('var')) suggestions.push('Penggunaan const/let sudah benar');
  return { score, lines, chars, lang, issues, suggestions };
}

export default function Checker() {
  const toast = useToast();
  const [code,    setCode]    = useState('');
  const [lang,    setLang]    = useState('javascript');
  const [result,  setResult]  = useState(null);
  const [mode,    setMode]    = useState(null); // 'analyze' | 'fix'
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    if (!code.trim()) { toast('Paste kode terlebih dahulu', 'er'); return; }
    setLoading(true);
    setTimeout(() => {
      const r = runAnalysis(code, lang);
      setResult({ type:'analyze', ...r });
      setMode('analyze');
      setLoading(false);
    }, 400);
  };

  const fix = () => {
    if (!code.trim()) { toast('Paste kode terlebih dahulu', 'er'); return; }
    setLoading(true);
    setTimeout(() => {
      const analysis = runAnalysis(code, lang);
      let fixed = code;
      const improvements = [];
      if (lang === 'javascript') {
        if (/\bvar\b/.test(fixed)) { fixed = fixed.replace(/\bvar\b/g,'const'); improvements.push('var → const'); }
        improvements.push('Tambahkan try/catch di async operations');
        improvements.push('Gunakan optional chaining: obj?.prop');
        improvements.push('Hapus console.log sebelum production');
      } else if (lang === 'python') {
        if (/range\(len\(/.test(fixed)) improvements.push('Ganti range(len(x)) dengan enumerate(x)');
        improvements.push('Tambahkan type hints');
        improvements.push('Gunakan logging module daripada print()');
      } else if (lang === 'sql') {
        if (/SELECT\s+\*/i.test(fixed)) improvements.push('Ganti SELECT * dengan kolom spesifik');
        improvements.push('Gunakan parameterized query untuk keamanan');
        improvements.push('Tambahkan LIMIT untuk paginasi');
      } else {
        improvements.push('Tambahkan proper error handling');
        improvements.push('Validasi semua input dari user');
        improvements.push('Tambahkan komentar untuk logika kompleks');
      }
      const refactored = `// ✅ Kode yang diperbaiki — review dan sesuaikan\n${fixed.trim()}\n\n// 💡 Saran perbaikan:\n${improvements.map((imp,i) => `// ${i+1}. ${imp}`).join('\n')}`;
      setResult({ type:'fix', analysis, improvements, refactored });
      setMode('fix');
      setLoading(false);
    }, 400);
  };

  const copyResult = async () => {
    const text = result?.refactored || result?.issues?.map(i => `[${i.sev.toUpperCase()}] ${i.msg}: ${i.fix}`).join('\n') || '';
    if (!text) return;
    await navigator.clipboard.writeText(text);
    toast('Hasil disalin!', 'ok');
  };

  const scoreColor = result?.score >= 80 ? 'var(--gn)' : result?.score >= 60 ? 'var(--ye)' : 'var(--rd)';
  const scoreLabel = result?.score >= 80 ? 'Bagus' : result?.score >= 60 ? 'Perlu Perbaikan' : 'Ada Masalah';

  return (
    <div className="page-wrapper">
      <div className="section-head">
        <span className="section-tag">// Code Analyzer & Fixer</span>
        <h2 className="section-title">Analisa & Perbaiki Kode</h2>
        <p className="section-desc">Paste kode, pilih bahasa, dan dapatkan analisa detail + solusi perbaikan</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, padding:'0 24px 80px', maxWidth:1240, margin:'0 auto' }}>
        {/* Input panel */}
        <div style={{ background:'var(--sf)', border:'1px solid var(--b1)', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 14px', borderBottom:'1px solid var(--b1)', background:'rgba(255,255,255,.02)' }}>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10.5, color:'var(--cy)', letterSpacing:'1.5px' }}>INPUT CODE</span>
            <div style={{ display:'flex', gap:6, alignItems:'center' }}>
              <select className="select" value={lang} onChange={e => setLang(e.target.value)}>
                {LANGUAGES.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
              <button className="btn-ghost btn" onClick={() => { setCode(''); setResult(null); }}>Clear</button>
              <button className="btn-ghost btn" onClick={() => setCode(EXAMPLES[lang] || EXAMPLES.javascript)}>Example</button>
            </div>
          </div>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder={`// Paste kode kamu di sini...\n// Pilih bahasa yang sesuai di kanan atas`}
            spellCheck={false}
            style={{
              flex:1, minHeight:320, padding:16,
              background:'transparent', border:'none', outline:'none',
              color:'var(--tx)', fontFamily:'JetBrains Mono,monospace',
              fontSize:12.5, lineHeight:1.7, resize:'none',
            }}
          />
          <div style={{ padding:'11px 14px', borderTop:'1px solid var(--b1)', display:'flex', gap:8 }}>
            <button onClick={analyze} disabled={loading}
              style={{ flex:1, padding:'10px', borderRadius:8, cursor:'pointer', fontFamily:'JetBrains Mono,monospace', fontSize:11.5, fontWeight:600, border:'1px solid rgba(0,229,255,.35)', background:'rgba(0,229,255,.08)', color:'var(--cy)', transition:'all .2s', display:'flex', alignItems:'center', justifyContent:'center', gap:7 }}>
              {loading && mode==='analyze' ? <span className="spinner" /> : '🔍'} Analyze Code
            </button>
            <button onClick={fix} disabled={loading}
              style={{ flex:1, padding:'10px', borderRadius:8, cursor:'pointer', fontFamily:'JetBrains Mono,monospace', fontSize:11.5, fontWeight:600, border:'1px solid rgba(0,245,160,.3)', background:'rgba(0,245,160,.07)', color:'var(--gn)', transition:'all .2s', display:'flex', alignItems:'center', justifyContent:'center', gap:7 }}>
              {loading && mode==='fix' ? <span className="spinner" /> : '✏️'} Fix & Improve
            </button>
          </div>
        </div>

        {/* Output panel */}
        <div style={{ background:'var(--sf)', border:'1px solid var(--b1)', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 14px', borderBottom:'1px solid var(--b1)', background:'rgba(255,255,255,.02)' }}>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10.5, color:'var(--gn)', letterSpacing:'1.5px' }}>ANALYSIS RESULT</span>
            {result && <button className="btn-ghost btn" onClick={copyResult}>Copy</button>}
          </div>
          <div style={{ flex:1, padding:16, overflowY:'auto', minHeight:320 }}>
            {loading ? (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:12, color:'var(--tx3)' }}>
                <span className="spinner" style={{ width:28, height:28, borderWidth:3 }} />
                <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11 }}>Analyzing...</span>
              </div>
            ) : !result ? (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:8, color:'var(--tx3)', textAlign:'center' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".3"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <p style={{ fontSize:13 }}>Hasil analisa akan muncul di sini</p>
                <small>Paste kode dan klik Analyze</small>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {/* Score */}
                <div style={{ display:'flex', alignItems:'center', gap:16, padding:'14px 16px', background:'rgba(255,255,255,.02)', borderRadius:8, border:'1px solid var(--b1)' }}>
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontFamily:'Poppins,sans-serif', fontSize:36, fontWeight:800, color:scoreColor, lineHeight:1 }}>{result.score}</div>
                    <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'var(--tx3)' }}>/ 100</div>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ height:6, background:'var(--b2)', borderRadius:3, marginBottom:6, overflow:'hidden' }}>
                      <div style={{ width:`${result.score}%`, height:'100%', background:scoreColor, borderRadius:3, transition:'width 1s ease' }} />
                    </div>
                    <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10.5, color:'var(--tx2)' }}>
                      {scoreLabel} · {result.lines} baris · {result.chars} karakter
                    </div>
                  </div>
                </div>

                {/* Issues */}
                {['critical','warning','info'].map(sev => {
                  const items = result.issues?.filter(i => i.sev === sev) || [];
                  if (!items.length) return null;
                  const labels = { critical:'⛔ Masalah Kritis', warning:'⚠️ Peringatan', info:'ℹ️ Saran' };
                  const cols   = { critical:'var(--rd)', warning:'var(--ye)', info:'var(--cy)' };
                  return (
                    <div key={sev}>
                      <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:cols[sev], letterSpacing:'1px', textTransform:'uppercase', marginBottom:7 }}>
                        {labels[sev]} ({items.length})
                      </div>
                      {items.map((item, i) => (
                        <div key={i} style={{ padding:'10px 12px', borderRadius:7, marginBottom:7, background:sev==='critical'?'rgba(255,58,92,.05)':sev==='warning'?'rgba(255,209,102,.04)':'rgba(0,229,255,.03)', border:`1px solid ${cols[sev]}22` }}>
                          <div style={{ fontSize:12.5, color:'var(--tx)', fontWeight:500, marginBottom:4, lineHeight:1.5 }}>{item.msg}</div>
                          <div style={{ fontSize:11.5, color:'var(--gn)' }}>✓ {item.fix}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}

                {/* Suggestions (things done right) */}
                {result.suggestions?.length > 0 && (
                  <div>
                    <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'var(--gn)', letterSpacing:'1px', textTransform:'uppercase', marginBottom:7 }}>✅ Yang Sudah Benar</div>
                    {result.suggestions.map((s,i) => (
                      <div key={i} style={{ padding:'8px 12px', borderRadius:6, marginBottom:5, background:'rgba(0,245,160,.04)', border:'1px solid rgba(0,245,160,.15)', fontSize:12.5, color:'var(--tx2)' }}>✓ {s}</div>
                    ))}
                  </div>
                )}

                {/* Refactored code */}
                {result.refactored && (
                  <div>
                    <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'var(--pu)', letterSpacing:'1px', textTransform:'uppercase', marginBottom:7 }}>📝 Kode Diperbaiki</div>
                    <div className="code-block">
                      <div className="code-header">
                        <div className="code-dots">{['#ff5f57','#ffbd2e','#28c940'].map(c=><div key={c} className="code-dot" style={{background:c}}/>)}</div>
                        <span className="code-lang">Refactored {lang}</span>
                        <button className="code-copy" onClick={() => { navigator.clipboard.writeText(result.refactored); toast('Disalin!','ok'); }}>Copy</button>
                      </div>
                      <div className="code-content" style={{ maxHeight:250, overflowY:'auto' }}>{result.refactored}</div>
                    </div>
                  </div>
                )}

                {result.issues?.length === 0 && (
                  <div style={{ textAlign:'center', padding:'20px', color:'var(--gn)', fontSize:14 }}>
                    🎉 Tidak ada masalah terdeteksi! Kode terlihat bagus.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
