export default function About() {
  const cards = [
    { icon:'ℹ️', color:'var(--cy)', title:'Tentang CryVeth',
      content:'CryVeth adalah platform edukasi programming komprehensif untuk developer Indonesia. Dari pemula yang baru belajar "Hello World" sampai senior yang butuh referensi teknis — semua tersedia di satu tempat, gratis selamanya.',
      stats:[['40+','Bahasa Pemrograman'],['300+','Error Reference'],['15+','Tutorial'],['AI','Powered']]
    },
    { icon:'⚙️', color:'var(--pu)', title:'Fitur Utama',
      items:[
        { col:'var(--cy)',  label:'Platform Belajar', desc:'Materi step-by-step untuk semua bahasa dari web sampai sistem level.' },
        { col:'var(--gn)',  label:'Code Analyzer',    desc:'Analisa kode rule-based untuk deteksi error, saran perbaikan, dan optimasi.' },
        { col:'var(--ye)',  label:'Error Reference',  desc:'Database error 300+ lengkap dengan penyebab dan solusi detail.' },
        { col:'var(--bl)',  label:'AI Assistant',     desc:'Chat dengan AI gratis untuk tanya coding, debug, dan konsultasi teknis.' },
        { col:'var(--pk)',  label:'TikTok DL',        desc:'Download video TikTok tanpa watermark menggunakan TikWM API.' },
        { col:'var(--or)',  label:'Catbox Upload',    desc:'Upload file ke catbox.moe untuk hosting gratis dan link permanen.' },
      ]
    },
    { icon:'🛠️', color:'var(--gn)', title:'Tech Stack',
      stack:[
        { label:'Frontend', value:'React 18 + Vite + React Router' },
        { label:'Backend',  value:'Node.js 20 + Express.js' },
        { label:'AI',       value:'OpenRouter → Groq → Gemini (fallback)' },
        { label:'Style',    value:'Pure CSS, Poppins + JetBrains Mono' },
        { label:'Deploy',   value:'Vercel (gratis tier)' },
        { label:'Security', value:'Helmet, CORS, Rate Limiting, .env' },
      ]
    },
    { icon:'👤', color:'var(--or)', title:'Developer & Kontak',
      contact:true
    },
  ];

  return (
    <div className="page-wrapper">
      <div style={{ maxWidth:800, margin:'0 auto', padding:'0 24px 80px' }}>
        {/* Hero */}
        <div style={{ textAlign:'center', padding:'60px 0 40px' }}>
          <div style={{ fontFamily:'Poppins,sans-serif', fontSize:42, fontWeight:800, color:'var(--cy)', textShadow:'0 0 30px rgba(0,229,255,.35)', marginBottom:10 }}>⟨ CV /⟩</div>
          <p style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'var(--tx3)', letterSpacing:'2px' }}>// Platform Belajar Programming Indonesia</p>
        </div>

        {/* Cards */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {cards.map((card, i) => (
            <div key={i} style={{ background:'var(--sf)', border:'1px solid var(--b1)', borderRadius:12, overflow:'hidden' }}>
              <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--b1)', display:'flex', alignItems:'center', gap:10 }}>
                <span>{card.icon}</span>
                <h3 style={{ fontSize:15, fontWeight:600, color:'var(--tx)' }}>{card.title}</h3>
              </div>
              <div style={{ padding:20 }}>
                {card.content && (
                  <>
                    <p style={{ fontSize:13.5, color:'var(--tx2)', lineHeight:1.75, marginBottom:18 }}>{card.content}</p>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
                      {card.stats.map(([n,l]) => (
                        <div key={n} style={{ textAlign:'center', padding:'12px 8px', background:'var(--bg2)', border:'1px solid var(--b1)', borderRadius:9 }}>
                          <div style={{ fontFamily:'Poppins,sans-serif', fontSize:22, fontWeight:800, color:'var(--cy)' }}>{n}</div>
                          <div style={{ fontSize:10, color:'var(--tx3)', fontFamily:'JetBrains Mono,monospace', marginTop:4, lineHeight:1.4 }}>{l}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {card.items && (
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                    {card.items.map(item => (
                      <div key={item.label} style={{ padding:'10px 14px', background:'var(--bg2)', border:'1px solid var(--b1)', borderRadius:8, borderLeft:`3px solid ${item.col}` }}>
                        <div style={{ fontSize:12.5, fontWeight:600, color:item.col, marginBottom:4 }}>{item.label}</div>
                        <div style={{ fontSize:12, color:'var(--tx3)', lineHeight:1.6 }}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
                {card.stack && (
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {card.stack.map(({label,value}) => (
                      <div key={label} style={{ display:'flex', gap:16, padding:'8px 0', borderBottom:'1px solid var(--b1)' }}>
                        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'var(--tx3)', minWidth:90 }}>{label}</span>
                        <span style={{ fontSize:13, color:'var(--tx2)' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}
                {card.contact && (
                  <>
                    <p style={{ fontSize:13.5, color:'var(--tx2)', lineHeight:1.75, marginBottom:16 }}>
                      Dibuat dengan ♥ oleh <strong style={{ color:'var(--cy)' }}>@NortexZ</strong> untuk komunitas developer Indonesia. Open untuk feedback, bug report, dan kolaborasi.
                    </p>
                    <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                      <a href="https://t.me/NortexZ" target="_blank" rel="noreferrer" style={{ padding:'10px 20px', borderRadius:8, background:'rgba(0,136,204,.1)', border:'1px solid rgba(0,136,204,.3)', color:'#29b6f6', textDecoration:'none', fontSize:13, fontWeight:500, transition:'all .2s' }}>Telegram @NortexZ</a>
                      <a href="https://wa.me/6285705490463" target="_blank" rel="noreferrer" style={{ padding:'10px 20px', borderRadius:8, background:'rgba(37,211,102,.1)', border:'1px solid rgba(37,211,102,.3)', color:'#25d366', textDecoration:'none', fontSize:13, fontWeight:500, transition:'all .2s' }}>WhatsApp Official</a>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign:'center', color:'var(--tx3)', fontSize:12, marginTop:30 }}>© 2025–2026 NortexZ · CryVeth (CV) · Gratis Selamanya</p>
      </div>
    </div>
  );
}
