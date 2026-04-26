import { useState, useRef } from 'react';
import { uploadToCatbox } from '../services/api';
import { useToast } from '../hooks/useToast';

function fmtSize(b) {
  if (b >= 1e9) return (b/1e9).toFixed(2)+' GB';
  if (b >= 1e6) return (b/1e6).toFixed(2)+' MB';
  if (b >= 1e3) return (b/1e3).toFixed(1)+' KB';
  return b+' B';
}

export default function Catbox() {
  const toast = useToast();
  const inputRef = useRef(null);
  const [file,     setFile]     = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading,  setLoading]  = useState(false);
  const [result,   setResult]   = useState('');
  const [error,    setError]    = useState('');
  const [drag,     setDrag]     = useState(false);

  const handleFile = (f) => {
    if (!f) return;
    if (f.size > 200 * 1024 * 1024) { toast('File terlalu besar! Maks 200MB', 'er'); return; }
    setFile(f); setResult(''); setError(''); setProgress(0);
  };

  const doUpload = async () => {
    if (!file) { toast('Pilih file terlebih dahulu', 'er'); return; }
    setLoading(true); setError(''); setResult(''); setProgress(0);
    try {
      const res = await uploadToCatbox(file, p => setProgress(p));
      setResult(res.url);
      setProgress(100);
      toast('Upload berhasil!', 'ok');
    } catch (err) {
      const msg = err.response?.data?.error || 'Upload gagal. Coba lagi.';
      setError(msg); toast(msg, 'er'); setProgress(0);
    } finally { setLoading(false); }
  };

  const copy = () => { navigator.clipboard.writeText(result); toast('URL disalin!', 'ok'); };
  const reset = () => { setFile(null); setResult(''); setError(''); setProgress(0); if (inputRef.current) inputRef.current.value=''; };

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth:580 }}>
        <div className="section-head">
          <span className="section-tag">// File Hosting</span>
          <h2 className="section-title">Catbox File Upload</h2>
          <p className="section-desc">Upload ke catbox.moe — hosting gratis, link permanen, semua format</p>
        </div>

        <div style={{ background:'var(--sf)', border:'1px solid var(--b2)', borderRadius:14, overflow:'hidden' }}>
          {/* Header */}
          <div style={{ padding:'13px 18px', borderBottom:'1px solid var(--b1)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'var(--tx3)', letterSpacing:'1.5px', textTransform:'uppercase' }}>Upload via catbox.moe</span>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'var(--gn)', boxShadow:'0 0 8px var(--gn)', animation:'pulse 2s infinite' }} />
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, color:'var(--gn)' }}>catbox.moe</span>
            </div>
          </div>

          <div style={{ padding:20 }}>
            {/* Drop zone */}
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
              style={{
                border: `2px dashed ${drag ? 'var(--cy)' : 'var(--b2)'}`,
                borderRadius:10, padding:'36px 20px', textAlign:'center', cursor:'pointer',
                background: drag ? 'rgba(0,229,255,.04)' : 'var(--bg2)',
                transition:'all .2s', marginBottom:14,
              }}
            >
              <input ref={inputRef} type="file" style={{ display:'none' }} onChange={e => handleFile(e.target.files[0])} />
              <div style={{ fontSize:32, marginBottom:10 }}>📂</div>
              <div style={{ fontSize:14, fontWeight:500, color:'var(--tx)', marginBottom:5 }}>Klik atau drag & drop file</div>
              <div style={{ fontSize:12, color:'var(--tx3)' }}>Semua format · Maks 200MB per file</div>
            </div>

            {/* Selected file */}
            {file && !result && (
              <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', background:'rgba(0,229,255,.05)', border:'1px solid rgba(0,229,255,.2)', borderRadius:8, marginBottom:14 }}>
                <span style={{ fontSize:18 }}>📄</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, color:'var(--tx)', fontWeight:500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{file.name}</div>
                  <div style={{ fontSize:11, color:'var(--tx3)' }}>{fmtSize(file.size)}</div>
                </div>
                <button onClick={reset} style={{ background:'none', border:'none', color:'var(--tx3)', cursor:'pointer', fontSize:14, padding:4 }}>✕</button>
              </div>
            )}

            {/* Progress bar */}
            {loading && (
              <div style={{ marginBottom:14 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10.5, color:'var(--tx3)' }}>Uploading...</span>
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10.5, color:'var(--cy)' }}>{progress}%</span>
                </div>
                <div style={{ height:4, background:'var(--b2)', borderRadius:2, overflow:'hidden' }}>
                  <div style={{ width:`${progress}%`, height:'100%', background:'linear-gradient(90deg,var(--cy),var(--pu))', borderRadius:2, transition:'width .3s' }} />
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{ padding:'10px 14px', background:'rgba(255,58,92,.06)', border:'1px solid rgba(255,58,92,.2)', borderRadius:8, fontSize:13, color:'var(--rd)', marginBottom:14 }}>
                ⚠️ {error}
              </div>
            )}

            {/* Upload button */}
            {!result && (
              <button onClick={doUpload} disabled={!file || loading} className="btn btn-primary"
                style={{ width:'100%', justifyContent:'center', padding:12, fontSize:14, fontFamily:'Poppins,sans-serif',
                  opacity: !file || loading ? .5 : 1,
                  background:'linear-gradient(135deg,rgba(0,229,255,.14),rgba(168,85,247,.1))',
                }}>
                {loading ? <><span className="spinner" /> Uploading...</> : '📤 Upload ke Catbox'}
              </button>
            )}

            {/* Result */}
            {result && (
              <div style={{ animation:'fadeUp .3s ease' }}>
                <div style={{ padding:'12px 16px', background:'rgba(0,245,160,.05)', border:'1px solid rgba(0,245,160,.2)', borderRadius:10, marginBottom:12 }}>
                  <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, color:'var(--gn)', letterSpacing:'2px', marginBottom:8 }}>UPLOAD BERHASIL ✓</div>
                  <div style={{ fontSize:12.5, color:'var(--cy)', wordBreak:'break-all', fontFamily:'JetBrains Mono,monospace', marginBottom:12 }}>{result}</div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    <button onClick={copy} className="btn btn-primary" style={{ padding:'7px 16px', fontSize:12 }}>Salin URL</button>
                    <a href={result} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding:'7px 16px', fontSize:12 }}>Buka File ↗</a>
                    <button onClick={reset} className="btn btn-ghost" style={{ padding:'7px 16px', fontSize:12 }}>Upload Lagi</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop:14, padding:'12px 16px', background:'var(--sf)', border:'1px solid var(--b1)', borderRadius:10, fontSize:12, color:'var(--tx3)', lineHeight:1.7 }}>
          <strong style={{ color:'var(--tx2)' }}>Info:</strong> File di-upload ke <a href="https://catbox.moe" target="_blank" rel="noreferrer" style={{ color:'var(--cy)' }}>catbox.moe</a> — layanan hosting gratis publik. Jangan upload file sensitif/pribadi. File tersimpan permanen selama tidak dilaporkan.
        </div>
      </div>
    </div>
  );
}
