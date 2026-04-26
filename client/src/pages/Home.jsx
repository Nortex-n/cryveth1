import { useNavigate } from 'react-router-dom';

const FEATURES = [
  { to:'/learn',     icon:'📚', title:'Platform Belajar', desc:'Tutorial step-by-step untuk 40+ bahasa pemrograman', col:'#00e5ff', c:'c1' },
  { to:'/languages', icon:'⟨/⟩', title:'40+ Bahasa',      desc:'Database lengkap dari JS sampai Assembly', col:'#a855f7', c:'c2' },
  { to:'/checker',   icon:'🔍', title:'Code Analyzer',   desc:'Cek error, penyebab, dan solusi otomatis', col:'#00f5a0', c:'c3' },
  { to:'/checker',   icon:'✏️', title:'Code Fixer',      desc:'Refactor, best practices, dan optimasi kode', col:'#ffd166', c:'c4' },
  { to:'/errors',    icon:'⚠️', title:'Error Reference', desc:'300+ error dengan penyebab dan solusi lengkap', col:'#ff8c00', c:'c5' },
  { to:'/tutorials', icon:'🎓', title:'Tutorials',        desc:'Panduan praktis: Git, Deploy, API, Security', col:'#f72585', c:'c6' },
  { to:'/ai',        icon:'🤖', title:'AI Assistant',     desc:'Tanya coding pakai AI gratis — bahasa Indonesia', col:'#3b82f6', c:'c7' },
  { to:'/tiktok',    icon:'🎵', title:'TikTok DL',        desc:'Download video tanpa watermark — paste link', col:'#00e5ff', c:'c8' },
  { to:'/catbox',    icon:'📤', title:'Catbox Upload',    desc:'Upload file ke catbox.moe — hosting gratis', col:'#ff8c00', c:'c1' },
];

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="page-wrapper">
      {/* ── Hero ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '120px 24px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Ambient glows */}
        {[
          'radial-gradient(ellipse, rgba(0,229,255,.06) 0, transparent 60%)',
          'radial-gradient(ellipse, rgba(168,85,247,.07) 0, transparent 60%)',
          'radial-gradient(ellipse, rgba(0,245,160,.05) 0, transparent 60%)',
        ].map((bg, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: [800,600,400][i], height: [800,600,400][i],
            background: bg,
            top: ['50%','5%','60%'][i], left: ['50%','auto','auto'][i],
            right: [undefined,'-8%','auto'][i],
            bottom: [undefined,undefined,undefined][i],
            transform: i===0 ? 'translate(-50%,-50%)' : undefined,
            animation: `pulse ${[5,7,6][i]}s ${[0,2,1][i]}s infinite`,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Eyebrow */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10, letterSpacing: '2px',
          color: 'var(--cy)', textTransform: 'uppercase',
          marginBottom: 20,
          animation: 'fadeUp .8s .2s both',
        }}>
          <span style={{ flex:1, maxWidth:50, height:1, background:'linear-gradient(90deg,transparent,rgba(0,229,255,.6))' }} />
          Platform Belajar Programming Indonesia
          <span style={{ flex:1, maxWidth:50, height:1, background:'linear-gradient(90deg,rgba(0,229,255,.6),transparent)' }} />
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: 'clamp(36px,7vw,80px)',
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          marginBottom: 22,
          animation: 'fadeUp .8s .35s both',
        }}>
          <span style={{ display:'block', color:'var(--tx)' }}>Belajar Coding</span>
          <span style={{
            display: 'block',
            background: 'linear-gradient(120deg, var(--cy) 0%, var(--pu) 40%, var(--pk) 70%, var(--gn) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', backgroundSize: '300%',
            animation: 'gradFlow 4s ease infinite',
          }}>Gratis Selamanya</span>
        </h1>

        {/* Subheading */}
        <p style={{
          maxWidth: 560, fontSize: 'clamp(14.5px,1.15vw,16.5px)',
          color: 'var(--tx2)', lineHeight: 1.75,
          marginBottom: 36, fontWeight: 400,
          animation: 'fadeUp .8s .5s both',
        }}>
          Satu platform untuk semua developer Indonesia — belajar 40+ bahasa, analisa kode, error reference, dan AI assistant coding. Gratis tanpa batas.
        </p>

        {/* Tech chips */}
        <div style={{
          display:'flex', gap:6, flexWrap:'wrap', justifyContent:'center',
          marginBottom:40, animation:'fadeUp .8s .65s both',
        }}>
          {['JavaScript','Python','Rust','Go','TypeScript','Node.js','SQL','Flutter','C++'].map(t => (
            <span key={t} style={{
              fontFamily:'JetBrains Mono,monospace', fontSize:10,
              padding:'4px 10px', borderRadius:4,
              border:'1px solid var(--b2)', color:'var(--tx3)',
              background:'var(--sf)', letterSpacing:'.5px',
              transition:'all .2s', cursor:'default',
            }}
            onMouseEnter={e => { e.target.style.borderColor='rgba(0,229,255,.3)'; e.target.style.color='var(--cy)'; }}
            onMouseLeave={e => { e.target.style.borderColor='var(--b2)'; e.target.style.color='var(--tx3)'; }}
            >{t}</span>
          ))}
        </div>

        {/* Stats bar */}
        <div style={{
          display:'flex', flexWrap:'nowrap', justifyContent:'center',
          background:'rgba(255,255,255,.03)', border:'1px solid var(--b2)',
          borderRadius:12, padding:'16px 8px', maxWidth:440, width:'100%',
          marginBottom:36, animation:'fadeUp .8s .75s both',
          boxShadow:'0 0 40px rgba(0,0,0,.3)',
        }}>
          {[['40+','Bahasa'],['300+','Error Ref'],['15+','Tutorial'],['AI','Powered']].map(([num, lbl], i) => (
            <div key={i} style={{ flex:1, textAlign:'center', padding:'0 8px', borderRight: i<3 ? '1px solid var(--b2)' : 'none' }}>
              <div style={{
                fontFamily:'Poppins,sans-serif', fontSize:22, fontWeight:800,
                background:'linear-gradient(135deg,var(--cy),var(--pu))',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                backgroundClip:'text', lineHeight:1.1,
              }}>{num}</div>
              <div style={{
                fontSize:9, color:'var(--tx3)', textTransform:'uppercase',
                letterSpacing:'1px', fontFamily:'JetBrains Mono,monospace', marginTop:5,
              }}>{lbl}</div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center', animation:'fadeUp .8s .85s both' }}>
          <button className="btn btn-primary" onClick={() => nav('/learn')}>
            Mulai Belajar →
          </button>
          <button className="btn btn-secondary" onClick={() => nav('/ai')}>
            🤖 Tanya AI
          </button>
        </div>

        {/* Scroll hint */}
        <div style={{
          position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:6,
          animation:'fadeUp .8s 1.2s both',
        }}>
          <span style={{ fontSize:9, color:'var(--tx3)', fontFamily:'JetBrains Mono,monospace', letterSpacing:'3px' }}>SCROLL</span>
          <div style={{ width:16, height:16, borderRight:'1.5px solid var(--cy)', borderBottom:'1.5px solid var(--cy)', transform:'rotate(45deg)', animation:'bounce 1.8s infinite' }} />
        </div>
      </section>

      {/* ── Feature grid ── */}
      <section style={{ padding:'0 24px 80px', maxWidth:1240, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <span className="section-tag">// Fitur Platform</span>
          <h2 className="section-title">Semua yang Kamu Butuhkan</h2>
          <p className="section-desc">Satu platform, semua kebutuhan developer Indonesia</p>
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',
          gap:12,
        }}>
          {FEATURES.map(({ to, icon, title, desc, col }) => (
            <div key={to+title}
              className="card"
              onClick={() => nav(to)}
              style={{ cursor:'pointer', overflow:'hidden', position:'relative' }}
            >
              {/* Top accent bar */}
              <div style={{ height:2, background:col, opacity:.8 }} />
              <div style={{ padding:18 }}>
                <div style={{
                  width:36, height:36, borderRadius:8, marginBottom:12,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background:'rgba(255,255,255,.04)', border:'1px solid var(--b2)',
                  fontSize:16,
                }}>{icon}</div>
                <div style={{
                  fontFamily:'Poppins,sans-serif', fontSize:13.5, fontWeight:600,
                  color:'var(--tx)', marginBottom:5,
                }}>{title}</div>
                <div style={{ fontSize:12, color:'var(--tx3)', lineHeight:1.65 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer contact ── */}
      <footer style={{ borderTop:'1px solid var(--b1)', padding:'40px 24px', textAlign:'center' }}>
        <div style={{
          fontFamily:'Poppins,sans-serif', fontSize:20, fontWeight:800,
          color:'var(--cy)', marginBottom:6,
        }}>⟨ CryVeth /⟩</div>
        <p style={{ color:'var(--tx3)', fontFamily:'JetBrains Mono,monospace', fontSize:11, marginBottom:16 }}>
          // tools & platform belajar untuk developer Indonesia
        </p>
        <p style={{ color:'var(--tx2)', fontSize:13, marginBottom:14 }}>
          Dibuat dengan ♥ oleh <a href="https://t.me/NortexZ" target="_blank" rel="noreferrer" style={{ color:'var(--pu)' }}>@NortexZ</a>
        </p>
        <div style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap', marginBottom:20 }}>
          {['JavaScript','Python','Rust','Go','TypeScript','C++','Node.js','SQL','Kotlin','Swift','AI','Vercel'].map(t => (
            <span key={t} style={{
              fontFamily:'JetBrains Mono,monospace', fontSize:10,
              padding:'3px 8px', borderRadius:4,
              border:'1px solid var(--b1)', color:'var(--tx3)',
            }}>{t}</span>
          ))}
        </div>
        <p style={{ color:'var(--tx3)', fontSize:12 }}>© 2025–2026 NortexZ · CryVeth v4.0 · Gratis Selamanya</p>
      </footer>
    </div>
  );
}
