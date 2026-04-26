import { useState } from 'react';
import { fetchTikTok } from '../services/api';
import { useToast } from '../hooks/useToast';

function Stat({ label, value }) {
  return (
    <div style={{ textAlign:'center' }}>
      <div style={{ fontFamily:'Poppins,sans-serif', fontSize:18, fontWeight:700, color:'var(--tx)' }}>{value}</div>
      <div style={{ fontSize:11, color:'var(--tx3)', fontFamily:'JetBrains Mono,monospace', marginTop:2 }}>{label}</div>
    </div>
  );
}

function fmtNum(n) { return n >= 1e6 ? (n/1e6).toFixed(1)+'M' : n >= 1e3 ? (n/1e3).toFixed(1)+'K' : String(n); }

export default function TikTok() {
  const toast = useToast();
  const [url,     setUrl]     = useState('');
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const doFetch = async () => {
    if (!url.trim()) { toast('Paste link TikTok dulu', 'er'); return; }
    setLoading(true); setError(''); setData(null);
    try {
      const res = await fetchTikTok(url.trim());
      setData(res);
    } catch (err) {
      const msg = err.response?.data?.error || 'Gagal mengambil video. Pastikan link valid dan akun tidak private.';
      setError(msg); toast(msg, 'er');
    } finally { setLoading(false); }
  };

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth:680 }}>
        <div className="section-head">
          <span className="section-tag">// TikTok Downloader</span>
          <h2 className="section-title">Download Video TikTok</h2>
          <p className="section-desc">Tanpa watermark · HD quality · Gratis</p>
        </div>

        {/* Input */}
        <div style={{ background:'var(--sf)', border:'1px solid var(--b2)', borderRadius:14, padding:20, marginBottom:20 }}>
          <label style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'var(--tx3)', letterSpacing:'1.5px', textTransform:'uppercase', display:'block', marginBottom:8 }}>
            Link TikTok
          </label>
          <div style={{ display:'flex', gap:10 }}>
            <input
              className="input"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && doFetch()}
              placeholder="https://www.tiktok.com/@user/video/..."
              style={{ flex:1 }}
            />
            <button onClick={doFetch} disabled={loading} className="btn btn-primary" style={{ flexShrink:0 }}>
              {loading ? <span className="spinner" /> : '⬇ Download'}
            </button>
          </div>
          {error && (
            <div style={{ marginTop:12, padding:'10px 14px', background:'rgba(255,58,92,.06)', border:'1px solid rgba(255,58,92,.2)', borderRadius:8, fontSize:13, color:'var(--rd)' }}>
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Result */}
        {data && (
          <div style={{ background:'var(--sf)', border:'1px solid var(--b2)', borderRadius:14, overflow:'hidden', animation:'fadeUp .3s ease' }}>
            {/* Cover */}
            {data.cover && (
              <div style={{ position:'relative', height:240, overflow:'hidden', background:'var(--bg2)' }}>
                <img src={data.cover} alt="cover" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:.85 }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(4,6,12,.9),transparent)' }} />
                <div style={{ position:'absolute', bottom:16, left:16, right:16 }}>
                  <p style={{ fontSize:13.5, fontWeight:500, lineHeight:1.5, color:'#fff', textShadow:'0 1px 4px rgba(0,0,0,.8)' }}>{data.title}</p>
                  <p style={{ fontSize:12, color:'rgba(255,255,255,.7)', marginTop:4 }}>@{data.author}</p>
                </div>
              </div>
            )}

            <div style={{ padding:20 }}>
              {/* Stats */}
              <div style={{ display:'flex', justifyContent:'space-around', padding:'14px 0', borderBottom:'1px solid var(--b1)', marginBottom:18 }}>
                <Stat label="VIEWS"    value={fmtNum(data.views)} />
                <Stat label="LIKES"    value={fmtNum(data.likes)} />
                <Stat label="COMMENTS" value={fmtNum(data.comments)} />
                <Stat label="DURASI"   value={`${data.duration}s`} />
              </div>

              {/* Download buttons */}
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {data.no_watermark && (
                  <a href={data.no_watermark} target="_blank" rel="noreferrer" style={{
                    display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 18px',
                    borderRadius:10, background:'linear-gradient(135deg,rgba(0,229,255,.1),rgba(0,245,160,.08))',
                    border:'1px solid rgba(0,229,255,.3)', textDecoration:'none', transition:'all .2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform=''}
                  >
                    <div>
                      <div style={{ fontSize:14, fontWeight:600, color:'var(--cy)' }}>⬇ Video Tanpa Watermark</div>
                      <div style={{ fontSize:11, color:'var(--tx3)', marginTop:2 }}>HD · Tanpa logo TikTok</div>
                    </div>
                    <span style={{ fontSize:11, fontFamily:'JetBrains Mono,monospace', color:'var(--gn)', padding:'3px 8px', borderRadius:4, background:'rgba(0,245,160,.1)', border:'1px solid rgba(0,245,160,.2)' }}>NO WATERMARK</span>
                  </a>
                )}
                {data.watermark && (
                  <a href={data.watermark} target="_blank" rel="noreferrer" style={{
                    display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 18px',
                    borderRadius:10, background:'var(--sf2)', border:'1px solid var(--b2)', textDecoration:'none', transition:'all .2s',
                  }}>
                    <div>
                      <div style={{ fontSize:14, fontWeight:500, color:'var(--tx)' }}>⬇ Video dengan Watermark</div>
                      <div style={{ fontSize:11, color:'var(--tx3)', marginTop:2 }}>Original · Dengan logo TikTok</div>
                    </div>
                    <span style={{ fontSize:11, fontFamily:'JetBrains Mono,monospace', color:'var(--tx3)' }}>WATERMARK</span>
                  </a>
                )}
                {data.music && (
                  <a href={data.music} target="_blank" rel="noreferrer" style={{
                    display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 18px',
                    borderRadius:10, background:'rgba(168,85,247,.06)', border:'1px solid rgba(168,85,247,.2)', textDecoration:'none', transition:'all .2s',
                  }}>
                    <div>
                      <div style={{ fontSize:14, fontWeight:500, color:'var(--pu)' }}>🎵 Audio Only (MP3)</div>
                      <div style={{ fontSize:11, color:'var(--tx3)', marginTop:2 }}>Download musik/audio saja</div>
                    </div>
                    <span style={{ fontSize:11, fontFamily:'JetBrains Mono,monospace', color:'var(--pu)', padding:'3px 8px', borderRadius:4, background:'rgba(168,85,247,.1)', border:'1px solid rgba(168,85,247,.2)' }}>AUDIO</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div style={{ marginTop:16, padding:'12px 16px', background:'var(--sf)', border:'1px solid var(--b1)', borderRadius:10, fontSize:12, color:'var(--tx3)', lineHeight:1.7 }}>
          <strong style={{ color:'var(--tx2)' }}>Info:</strong> Video diunduh via <a href="https://tikwm.com" target="_blank" rel="noreferrer" style={{ color:'var(--cy)' }}>TikWM API</a>. Hanya untuk penggunaan pribadi. Jangan upload ulang tanpa izin kreator.
        </div>
      </div>
    </div>
  );
}
