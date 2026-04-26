import { useState, useMemo } from 'react';
import { LANGS_DB, filterLangs } from '../data/languages';
import Modal from '../components/Modal';
import CodeBlock from '../components/CodeBlock';

const DIFF_LABELS = ['','Pemula','Mudah','Menengah','Sulit','Expert'];
const DIFF_COLS   = ['','#00f5a0','#a8e6cf','#ffd166','#ff8c00','#ff3a5c'];

export default function Languages() {
  const [query,    setQuery]    = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => filterLangs(query, ''), [query]);

  return (
    <div className="page-wrapper">
      <div className="section-head">
        <span className="section-tag">// Database Bahasa Pemrograman</span>
        <h2 className="section-title">Semua Bahasa Pemrograman</h2>
        <p className="section-desc">Klik untuk detail lengkap: sejarah, kegunaan, contoh kode, cara belajar</p>
      </div>

      {/* Search */}
      <div style={{ padding:'0 24px 20px', maxWidth:560, margin:'0 auto' }}>
        <div className="search-wrap">
          <div className="search-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <input
            className="search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cari bahasa... JavaScript, Rust, Go..."
          />
          {query && (
            <button onClick={() => setQuery('')} style={{
              position:'absolute', right:10, top:'50%', transform:'translateY(-50%)',
              background:'none', border:'none', color:'var(--tx3)', cursor:'pointer', fontSize:14,
            }}>✕</button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr))',
        gap: 10, padding: '0 24px 80px', maxWidth: 1240, margin: '0 auto',
      }}>
        {filtered.map(lang => (
          <div
            key={lang.id}
            className="card"
            onClick={() => setSelected(lang)}
            style={{ cursor:'pointer', padding:0, overflow:'hidden' }}
          >
            <div style={{ height:3, background:lang.col, opacity:.85 }} />
            <div style={{ padding:'14px 16px' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{
                  fontFamily:'JetBrains Mono,monospace', fontSize:11, fontWeight:600,
                  padding:'2px 7px', borderRadius:4,
                  background:'rgba(255,255,255,.04)', border:'1px solid var(--b2)',
                  color: lang.col,
                }}>{lang.ic}</span>
                <span style={{
                  fontSize:9, fontFamily:'JetBrains Mono,monospace',
                  color: DIFF_COLS[lang.dif] || 'var(--tx3)',
                }}>{DIFF_LABELS[lang.dif]}</span>
              </div>
              <div style={{ fontWeight:600, fontSize:13.5, color:'var(--tx)', marginBottom:4 }}>{lang.nm}</div>
              <div style={{ fontSize:11, color:'var(--tx3)', marginBottom:6, lineHeight:1.5 }}>{lang.yr.split(' — ')[0]}</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:3 }}>
                {lang.tgs.slice(0,3).map(t => (
                  <span key={t} style={{
                    fontSize:9, fontFamily:'JetBrains Mono,monospace',
                    padding:'1px 5px', borderRadius:3,
                    background:'rgba(0,229,255,.06)', border:'1px solid rgba(0,229,255,.12)',
                    color:'var(--cy)',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal detail */}
      <Modal
        open={!!selected}
        title={selected ? `${selected.nm} — ${selected.yr}` : ''}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            {/* Description */}
            <p style={{ color:'var(--tx2)', lineHeight:1.75, fontSize:13.5 }}>{selected.dsc}</p>

            {/* Tags */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
              {selected.tgs.map(t => (
                <span key={t} className="badge badge-lang">{t}</span>
              ))}
              <span style={{ fontSize:11, color:DIFF_COLS[selected.dif], fontFamily:'JetBrains Mono,monospace', padding:'2px 8px', borderRadius:4, border:`1px solid ${DIFF_COLS[selected.dif]}33`, background:`${DIFF_COLS[selected.dif]}11` }}>
                Level: {DIFF_LABELS[selected.dif]}
              </span>
            </div>

            {/* Use cases + Learn path */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:12 }}>
              {[['⚙️ Kegunaan', selected.use], ['📘 Cara Belajar', selected.learn]].map(([ttl, items]) => (
<div key={ttl} style={{ background:'var(--sf2)', border:'1px solid var(--b1)', borderRadius:8, padding:14 }}>
                  <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'var(--cy)', letterSpacing:'1.5px', marginBottom:8, textTransform:'uppercase' }}>{ttl}</div>
                  <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:5 }}>
                    {items.map((item, i) => (
                      <li key={i} style={{ fontSize:12, color:'var(--tx2)', lineHeight:1.6, display:'flex', gap:7, alignItems:'flex-start' }}>
                        <span style={{ color:'var(--cy)', flexShrink:0 }}>›</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* References */}
            <div style={{ fontSize:12, color:'var(--tx3)', fontFamily:'JetBrains Mono,monospace' }}>
              📎 Referensi: {selected.refs}
            </div>

            {/* Code example */}
            {selected.example && (
              <div>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'var(--gn)', letterSpacing:'1.5px', marginBottom:8, textTransform:'uppercase' }}>Contoh Kode</div>
                <CodeBlock lang={selected.nm} code={selected.example} />
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
