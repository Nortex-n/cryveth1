import { useState, useMemo } from 'react';
import { ERRORS_DB, ERRORS_TABS } from '../data/errors';
import CodeBlock from '../components/CodeBlock';

const SEV_STYLE = {
  critical: { border:'1px solid rgba(255,58,92,.25)', borderLeft:'3px solid var(--rd)', background:'rgba(255,58,92,.03)' },
  warning:  { border:'1px solid rgba(255,209,102,.2)', borderLeft:'3px solid var(--ye)', background:'rgba(255,209,102,.02)' },
  info:     { border:'1px solid rgba(0,229,255,.15)', borderLeft:'3px solid var(--cy)', background:'rgba(0,229,255,.02)' },
};

function ErrorCard({ err }) {
  const [open, setOpen] = useState(false);
  const sev = SEV_STYLE[err.sev] || SEV_STYLE.info;

  return (
    <div style={{ borderRadius:10, marginBottom:12, overflow:'hidden', transition:'all .2s', ...sev }}>
      <div style={{ padding:'14px 16px' }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:10, marginBottom:8 }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12.5, fontWeight:600, color:'var(--tx)', lineHeight:1.5 }}>
            {err.name}
          </div>
          <div style={{ display:'flex', gap:4, flexShrink:0, flexWrap:'wrap', justifyContent:'flex-end' }}>
            {err.badges?.map(b => (
              <span key={b} className={`badge badge-${b==='CRITICAL'?'crit':b==='WARNING'?'warn':b==='INFO'?'info':'lang'}`}>{b}</span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize:13, color:'var(--tx2)', lineHeight:1.7, marginBottom:12 }}
           dangerouslySetInnerHTML={{ __html: err.desc }} />

        {/* Cause + Fix */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:10, marginBottom: err.code ? 10 : 0 }}>
          {err.cause?.length > 0 && (
            <div>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, color:'var(--or)', letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:6 }}>⚡ Penyebab</div>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:4 }}>
                {err.cause.map((c,i) => (
                  <li key={i} style={{ fontSize:12, color:'var(--tx2)', display:'flex', gap:6, lineHeight:1.6 }}
                      dangerouslySetInnerHTML={{ __html: `<span style="color:var(--or)">›</span> ${c}` }} />
                ))}
              </ul>
            </div>
          )}
          {err.fix?.length > 0 && (
            <div>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, color:'var(--gn)', letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:6 }}>✓ Cara Fix</div>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:4 }}>
                {err.fix.map((f,i) => (
                  <li key={i} style={{ fontSize:12, color:'var(--tx2)', display:'flex', gap:6, lineHeight:1.6 }}
                      dangerouslySetInnerHTML={{ __html: `<span style="color:var(--gn)">✓</span> ${f}` }} />
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Toggle code */}
        {err.code && (
          <>
            <button onClick={() => setOpen(o => !o)} style={{
              display:'flex', alignItems:'center', gap:6,
              background:'transparent', border:'1px solid var(--b2)',
              borderRadius:6, color:'var(--tx3)', padding:'5px 12px',
              fontFamily:'JetBrains Mono,monospace', fontSize:10.5,
              cursor:'pointer', transition:'all .2s', marginTop:8,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--cy)'; e.currentTarget.style.color='var(--cy)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--b2)'; e.currentTarget.style.color='var(--tx3)'; }}
            >
              <span>{open ? 'Sembunyikan' : 'Lihat'} Contoh Kode</span>
              <span style={{ transition:'transform .2s', transform: open ? 'rotate(180deg)' : 'none' }}>▼</span>
            </button>
            {open && (
              <div style={{ marginTop:10, animation:'fadeUp .2s ease' }}>
                <CodeBlock lang={err.code.lang} code={err.code.src} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Errors() {
  const [activeTab, setActiveTab] = useState('js');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const errors = ERRORS_DB[activeTab] || [];
    if (!query) return errors;
    const q = query.toLowerCase();
    return errors.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.desc.toLowerCase().includes(q) ||
      e.cause?.some(c => c.toLowerCase().includes(q)) ||
      e.fix?.some(f => f.toLowerCase().includes(q))
    );
  }, [activeTab, query]);

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">// Error Reference</span>
          <h2 className="section-title">Database Error & Solusi</h2>
          <p className="section-desc">Error dari berbagai bahasa — penyebab, solusi, dan contoh kode</p>
        </div>

        {/* Search */}
        <div style={{ maxWidth:560, margin:'0 auto 20px' }}>
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
              placeholder="Cari error... TypeError, 401, segfault, IndentationError..."
            />
            {query && (
              <button onClick={() => setQuery('')} style={{
                position:'absolute', right:10, top:'50%', transform:'translateY(-50%)',
                background:'none', border:'none', color:'var(--tx3)', cursor:'pointer', fontSize:14,
              }}>✕</button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display:'flex', flexWrap:'wrap', gap:6, justifyContent:'center',
          padding:'0 0 20px', position:'sticky', top:'var(--nav-h)', zIndex:100,
          background:'linear-gradient(to bottom,var(--bg) 80%,transparent)',
          paddingTop:10,
        }}>
          {ERRORS_TABS.map(tab => (
            <button key={tab.id}
              onClick={() => { setActiveTab(tab.id); setQuery(''); }}
              style={{
                fontFamily:'JetBrains Mono,monospace', fontSize:10.5,
                padding:'6px 13px', borderRadius:6,
                border: '1px solid ' + (activeTab===tab.id ? tab.color : 'var(--b2)'),
                background: activeTab===tab.id ? `${tab.color}12` : 'var(--sf)',
                color: activeTab===tab.id ? tab.color : 'var(--tx2)',
                cursor:'pointer', transition:'all .18s', display:'flex', alignItems:'center', gap:5,
                boxShadow: activeTab===tab.id ? `0 0 12px ${tab.color}20` : 'none',
              }}
            >
              <span style={{ width:6, height:6, borderRadius:'50%', background:tab.color, display:'block', boxShadow:`0 0 4px ${tab.color}` }} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Error cards */}
        <div style={{ paddingBottom:80 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'60px 24px', color:'var(--tx3)' }}>
              <div style={{ fontSize:32, marginBottom:12 }}>🔍</div>
              <p>Error tidak ditemukan untuk kata kunci "{query}"</p>
            </div>
          ) : (
            filtered.map((err, i) => <ErrorCard key={i} err={err} />)
          )}
        </div>
      </div>
    </div>
  );
}
