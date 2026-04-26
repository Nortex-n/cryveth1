import { useState, useRef, useEffect } from 'react';
import { sendChatMessage, getHealth } from '../services/api';
import { useToast } from '../hooks/useToast';

const QUICK = [
  'Apa perbedaan async/await dan Promise?',
  'Cara fix CORS error di Express',
  'Jelaskan Docker dalam bahasa sederhana',
  'Tips belajar JavaScript untuk pemula',
  'Apa itu REST API?',
  'Cara deploy Node.js ke Vercel',
];

function Bubble({ msg }) {
  const isAI = msg.role === 'assistant';
  return (
    <div style={{ display:'flex', justifyContent: isAI ? 'flex-start' : 'flex-end', marginBottom:14, animation:'fadeUp .3s ease' }}>
      {isAI && (
        <div style={{ width:30, height:30, borderRadius:8, background:'linear-gradient(135deg,rgba(0,229,255,.15),rgba(168,85,247,.15))', border:'1px solid rgba(0,229,255,.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, marginRight:10, flexShrink:0, marginTop:2 }}>🤖</div>
      )}
      <div style={{
        maxWidth:'75%', padding:'11px 15px', borderRadius: isAI ? '4px 12px 12px 12px' : '12px 4px 12px 12px',
        background: isAI ? 'var(--sf2)' : 'linear-gradient(135deg,rgba(0,229,255,.12),rgba(168,85,247,.1))',
        border: isAI ? '1px solid var(--b2)' : '1px solid rgba(0,229,255,.3)',
        color:'var(--tx)', fontSize:13.5, lineHeight:1.75,
        whiteSpace:'pre-wrap', wordBreak:'break-word',
      }}>
        {msg.content}
        {msg.provider && (
          <div style={{ marginTop:6, fontFamily:'JetBrains Mono,monospace', fontSize:9.5, color:'var(--tx3)' }}>
            via {msg.provider}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AIChat() {
  const toast = useToast();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [inited, setInited] = useState(false);
  const [aiReady, setAiReady] = useState(null);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!inited) {
      setInited(true);
      setMessages([{ role:'assistant', content:'Halo! Saya CryVeth AI siap bantu kamu coding! 🚀\n\nTanya soal JavaScript, Python, Node.js, bug, deploy, atau apa pun seputar programming — saya jawab dalam bahasa Indonesia.\n\nKlik salah satu pertanyaan di bawah atau ketik langsung.' }]);
    }
  }, [inited]);

  useEffect(() => {
    let active = true;

    getHealth()
      .then((data) => {
        if (!active) return;
        const providers = data?.providers || {};
        setAiReady(Boolean(providers.openrouter || providers.groq || providers.gemini));
      })
      .catch(() => {
        if (active) setAiReady(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages, loading]);

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    if (aiReady === false) {
      const notice = 'AI Chat belum aktif. Isi minimal satu API key di file .env (OPENROUTER_API_KEY, GROQ_API_KEY, atau GEMINI_API_KEY), lalu restart server.';
      toast(notice, 'wr');
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && last?.content === notice) return prev;
        return [...prev, { role:'assistant', content: notice }];
      });
      setInput('');
      return;
    }

    setInput('');
    const newUser = { role:'user', content:msg };
    const history = [...messages, newUser];
    setMessages(history);
    setLoading(true);
    try {
      const apiMessages = history.filter(m => m.role !== 'system').map(({ role, content }) => ({ role, content }));
      const { reply, provider } = await sendChatMessage(apiMessages);
      setMessages(p => [...p, { role:'assistant', content:reply, provider }]);
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message || 'Gagal terhubung ke AI. Coba lagi.';
      toast(errMsg, 'er');
      setMessages(p => [...p, { role:'assistant', content:`⚠️ ${errMsg}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const statusText = aiReady === null
    ? 'Mengecek provider AI...'
    : aiReady
      ? 'OpenRouter → Groq → Gemini fallback · Bahasa Indonesia'
      : 'AI belum aktif — isi salah satu API key di .env lalu restart server';

  const statusColor = aiReady === null
    ? 'var(--tx3)'
    : aiReady
      ? 'var(--tx3)'
      : 'var(--ye)';

  return (
    <div className="page-wrapper" style={{ display:'flex', flexDirection:'column', height:'100vh' }}>
      {/* Header */}
      <div style={{ padding:'20px 24px 16px', borderBottom:'1px solid var(--b1)', background:'rgba(4,6,12,.9)', backdropFilter:'blur(12px)', position:'sticky', top:'var(--nav-h)', zIndex:10 }}>
        <div style={{ maxWidth:820, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
          <div>
            <h1 style={{ fontSize:18, fontWeight:700, marginBottom:3, letterSpacing:'-0.02em' }}>
              🤖 CryVeth AI Assistant
            </h1>
            <p style={{ fontSize:12, color:statusColor, fontFamily:'JetBrains Mono,monospace' }}>
              {statusText}
            </p>
          </div>
          {messages.length > 1 && (
            <button className="btn btn-ghost" onClick={() => setMessages([messages[0]])}>
              Bersihkan
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'20px 24px' }}>
        <div style={{ maxWidth:820, margin:'0 auto' }}>
          {messages.map((m, i) => <Bubble key={i} msg={m} />)}
          {loading && (
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
              <div style={{ width:30, height:30, borderRadius:8, background:'linear-gradient(135deg,rgba(0,229,255,.15),rgba(168,85,247,.15))', border:'1px solid rgba(0,229,255,.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>🤖</div>
              <div style={{ display:'flex', gap:5, padding:'12px 16px', background:'var(--sf2)', border:'1px solid var(--b2)', borderRadius:'4px 12px 12px 12px' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width:7, height:7, borderRadius:'50%', background:'var(--cy)', animation:`bounce .9s ${i*0.2}s infinite`, opacity:.6 }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Quick prompts */}
      {messages.length <= 1 && (
        <div style={{ padding:'0 24px 12px' }}>
          <div style={{ maxWidth:820, margin:'0 auto', display:'flex', flexWrap:'wrap', gap:6 }}>
            {QUICK.map(q => (
              <button key={q} onClick={() => send(q)} style={{
                fontFamily:'JetBrains Mono,monospace', fontSize:10.5,
                padding:'6px 12px', borderRadius:6,
                border:'1px solid var(--b2)', background:'var(--sf)',
                color:'var(--tx3)', cursor:'pointer', transition:'all .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(0,229,255,.3)'; e.currentTarget.style.color='var(--cy)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--b2)'; e.currentTarget.style.color='var(--tx3)'; }}
              >{q}</button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div style={{ padding:'12px 24px 20px', borderTop:'1px solid var(--b1)', background:'rgba(4,6,12,.9)', backdropFilter:'blur(12px)' }}>
        <div style={{ maxWidth:820, margin:'0 auto', display:'flex', gap:10, alignItems:'flex-end' }}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => { setInput(e.target.value); e.target.style.height='auto'; e.target.style.height=Math.min(e.target.scrollHeight,120)+'px'; }}
            onKeyDown={handleKey}
            placeholder="Tanya soal coding... (Enter kirim, Shift+Enter baris baru)"
            rows={1}
            style={{
              flex:1, padding:'11px 16px', background:'var(--sf)', border:'1px solid var(--b2)',
              borderRadius:10, color:'var(--tx)', fontFamily:'Poppins,sans-serif',
              fontSize:14, lineHeight:1.6, resize:'none', outline:'none', maxHeight:120,
              transition:'border-color .2s',
            }}
            onFocus={e => e.target.style.borderColor='var(--cy)'}
            onBlur={e => e.target.style.borderColor='var(--b2)'}
            disabled={loading}
          />
          <button onClick={() => send()} disabled={loading || !input.trim()} style={{
            width:44, height:44, borderRadius:10,
            background: loading || !input.trim() ? 'var(--sf)' : 'linear-gradient(135deg,rgba(0,229,255,.2),rgba(168,85,247,.2))',
            border: '1px solid ' + (loading || !input.trim() ? 'var(--b2)' : 'rgba(0,229,255,.4)'),
            color: loading || !input.trim() ? 'var(--tx3)' : 'var(--cy)',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all .2s', flexShrink:0,
          }}>
            {loading ? <span className="spinner" /> : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
