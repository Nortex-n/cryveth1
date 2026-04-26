import { useState } from 'react';
import { LANGS_DB } from '../data/languages';
import CodeBlock from '../components/CodeBlock';

export default function Learn() {
  const [selected, setSelected] = useState(LANGS_DB[0]);

  return (
    <div className="page-wrapper">
      <div className="section-head">
        <span className="section-tag">// Interactive Learning</span>
        <h2 className="section-title">Pilih Bahasa, Mulai Belajar</h2>
        <p className="section-desc">Materi dari basic sampai advanced, dengan contoh kode dan panduan belajar</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'240px 1fr', gap:0, maxWidth:1240, margin:'0 auto', padding:'0 24px 80px', minHeight:500 }}>
        {/* Sidebar */}
        <div style={{ background:'var(--sf)', border:'1px solid var(--b1)', borderRadius:'12px 0 0 12px', overflow:'hidden' }}>
          <div style={{ padding:'11px 14px', borderBottom:'1px solid var(--b1)', fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'var(--tx3)', letterSpacing:'1.5px', textTransform:'uppercase', background:'rgba(255,255,255,.02)' }}>
            Pilih Bahasa
          </div>
          <div style={{ overflowY:'auto', maxHeight:'calc(100vh - 250px)' }}>
            {LANGS_DB.map(lang => (
              <button key={lang.id} onClick={() => setSelected(lang)} style={{
                width:'100%', textAlign:'left', padding:'10px 14px',
                background: selected.id===lang.id ? 'rgba(0,229,255,.07)' : 'transparent',
                border:'none', borderBottom:'1px solid var(--b1)',
                borderLeft: selected.id===lang.id ? '2px solid var(--cy)' : '2px solid transparent',
                cursor:'pointer', transition:'all .15s', display:'flex', alignItems:'center', gap:9,
              }}>
                <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, fontWeight:600, color:lang.col, minWidth:30 }}>{lang.ic}</span>
                <span style={{ fontSize:12.5, color: selected.id===lang.id ? 'var(--cy)' : 'var(--tx2)', fontWeight: selected.id===lang.id ? 600 : 400 }}>{lang.nm}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div style={{ background:'var(--sf2)', border:'1px solid var(--b1)', borderLeft:'none', borderRadius:'0 12px 12px 0', padding:24, overflowY:'auto', maxHeight:'calc(100vh - 200px)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:13, fontWeight:700, padding:'5px 12px', borderRadius:7, border:'1px solid var(--b2)', background:'rgba(255,255,255,.04)', color:selected.col }}>{selected.ic}</span>
            <div>
              <h2 style={{ fontSize:22, fontWeight:700, color:'var(--tx)', letterSpacing:'-0.02em' }}>{selected.nm}</h2>
              <p style={{ fontSize:11.5, color:'var(--tx3)', fontFamily:'JetBrains Mono,monospace' }}>{selected.yr} · {selected.cat}</p>
            </div>
          </div>

          <p style={{ fontSize:14, color:'var(--tx2)', lineHeight:1.75, marginBottom:20 }}>{selected.dsc}</p>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:20 }}>
            {[['⚙️ Kegunaan', selected.use], ['📘 Cara Belajar', selected.learn]].map(([title, items]) => (
              <div key={title} style={{ background:'var(--sf)', border:'1px solid var(--b1)', borderRadius:9, padding:14 }}>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, color:'var(--cy)', letterSpacing:'1.5px', marginBottom:10, textTransform:'uppercase' }}>{title}</div>
                <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:6 }}>
                  {items.map((item,i) => (
                    <li key={i} style={{ fontSize:12.5, color:'var(--tx2)', display:'flex', gap:7, lineHeight:1.6 }}>
                      <span style={{ color:'var(--cy)', flexShrink:0 }}>›</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginBottom:16, fontSize:12, color:'var(--tx3)', fontFamily:'JetBrains Mono,monospace' }}>📎 {selected.refs}</div>

          {selected.example && <CodeBlock lang={selected.nm} code={selected.example} />}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 240px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
