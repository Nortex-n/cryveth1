import { useState } from 'react';
import { TUTORIALS_DB } from '../data/tutorials';
import Modal from '../components/Modal';
import CodeBlock from '../components/CodeBlock';

const BADGE_STYLE = {
  Beginner:     { bg:'rgba(0,245,155,.1)',   color:'var(--gn)', border:'rgba(0,245,155,.2)'  },
  Intermediate: { bg:'rgba(255,209,102,.1)', color:'var(--ye)', border:'rgba(255,209,102,.2)'},
  Advanced:     { bg:'rgba(255,59,91,.1)',   color:'var(--rd)', border:'rgba(255,59,91,.2)'  },
};

export default function Tutorials() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">// Developer Guides</span>
          <h2 className="section-title">Tutorials & Panduan</h2>
          <p className="section-desc">Panduan praktis step-by-step untuk workflow developer modern</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:14, paddingBottom:80 }}>
          {TUTORIALS_DB.map(t => {
            const bs = BADGE_STYLE[t.badge] || BADGE_STYLE.Beginner;
            return (
              <div key={t.id} className="card" onClick={() => setSelected(t)} style={{ cursor:'pointer', display:'flex', flexDirection:'column' }}>
                <div style={{ padding:'16px 18px 12px', flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                    <div style={{ width:38, height:38, borderRadius:9, background:'rgba(0,229,255,.07)', border:'1px solid rgba(0,229,255,.15)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'JetBrains Mono,monospace', fontSize:11, fontWeight:600, color:'var(--cy)' }}>
                      {t.ic}
                    </div>
                    <span style={{ fontSize:10, fontFamily:'JetBrains Mono,monospace', padding:'3px 9px', borderRadius:4, background:bs.bg, color:bs.color, border:`1px solid ${bs.border}` }}>{t.badge}</span>
                  </div>
                  <h3 style={{ fontSize:14, fontWeight:600, color:'var(--tx)', marginBottom:7, lineHeight:1.45 }}>{t.title}</h3>
                  <p style={{ fontSize:12.5, color:'var(--tx3)', lineHeight:1.65 }}>{t.desc}</p>
                </div>
                <div style={{ padding:'10px 18px 14px', borderTop:'1px solid var(--b1)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontSize:11, color:'var(--tx3)', display:'flex', alignItems:'center', gap:5 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {t.time}
                  </span>
                  <span style={{ fontSize:11, color:'var(--cy)', fontFamily:'JetBrains Mono,monospace' }}>{t.steps.length} langkah →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal open={!!selected} title={selected ? `${selected.ic} — ${selected.title}` : ''} onClose={() => setSelected(null)}>
        {selected && (
          <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
            {selected.steps.map(step => (
              <div key={step.n} style={{ borderLeft:'2px solid rgba(0,229,255,.25)', paddingLeft:16 }}>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'var(--cy)', letterSpacing:'1.5px', marginBottom:7, textTransform:'uppercase' }}>LANGKAH {step.n}</div>
                <div style={{ fontSize:13.5, color:'var(--tx2)', lineHeight:1.75, marginBottom: step.code||step.warn||step.tip ? 10 : 0 }}
                     dangerouslySetInnerHTML={{ __html: step.t.replace(/`([^`]+)`/g,'<code style="font-family:JetBrains Mono,monospace;font-size:.88em;color:var(--cy);background:rgba(0,229,255,.08);padding:2px 6px;border-radius:3px">$1</code>') }} />
                {step.code && <div style={{ marginBottom: step.warn||step.tip ? 10 : 0 }}><CodeBlock lang="Code" code={step.code} /></div>}
                {step.warn && (
                  <div style={{ padding:'9px 13px', background:'rgba(255,58,92,.06)', border:'1px solid rgba(255,58,92,.2)', borderRadius:7, fontSize:12.5, color:'var(--rd)', marginBottom: step.tip ? 8 : 0 }}>
                    ⚠️ {step.warn}
                  </div>
                )}
                {step.tip && (
                  <div style={{ padding:'9px 13px', background:'rgba(0,229,255,.05)', border:'1px solid rgba(0,229,255,.15)', borderRadius:7, fontSize:12.5, color:'var(--cy)' }}>
                    💡 {step.tip}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
