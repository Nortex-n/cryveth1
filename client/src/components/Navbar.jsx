import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/',           label: 'Home'      },
  { to: '/learn',      label: 'Belajar'   },
  { to: '/languages',  label: 'Bahasa'    },
  { to: '/checker',    label: 'Analyzer'  },
  { to: '/errors',     label: 'Errors'    },
  { to: '/tutorials',  label: 'Tutorials' },
  { to: '/ai',         label: 'AI Chat'   },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 'var(--nav-h)',
        padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(4,6,12,.96)' : 'rgba(4,6,12,.85)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(0,229,255,.1)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,.5)' : 'none',
        transition: 'background .3s, box-shadow .3s',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
          <span style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 17,
            fontWeight: 800,
            color: 'var(--cy)',
            letterSpacing: '-0.02em',
            textShadow: '0 0 20px rgba(0,229,255,.35)',
          }}>⟨ CryVeth /⟩</span>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 9,
            padding: '2px 7px',
            background: 'rgba(0,229,255,.07)',
            border: '1px solid rgba(0,229,255,.18)',
            borderRadius: 4,
            color: 'var(--tx3)',
          }}>v1.0</span>
        </Link>

        {/* Desktop links */}
        <div style={{ display:'flex', alignItems:'center', gap:4 }} className="nav-links-desktop">
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              padding: '5px 11px',
              borderRadius: 6,
              border: '1px solid transparent',
              color: pathname === to ? 'var(--cy)' : 'var(--tx3)',
              background: pathname === to ? 'rgba(0,229,255,.07)' : 'transparent',
              borderColor: pathname === to ? 'rgba(0,229,255,.25)' : 'transparent',
              transition: 'all .2s',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { if (pathname !== to) { e.target.style.color='var(--cy)'; e.target.style.borderColor='rgba(0,229,255,.2)'; } }}
            onMouseLeave={e => { if (pathname !== to) { e.target.style.color='var(--tx3)'; e.target.style.borderColor='transparent'; } }}
            >
              {label}
            </Link>
          ))}
          {/* Tools dropdown area */}
          <div style={{ display:'flex', gap:4, marginLeft:4, borderLeft:'1px solid var(--b2)', paddingLeft:8 }}>
            <Link to="/tiktok" style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10.5, padding: '5px 11px', borderRadius: 6,
              border: '1px solid rgba(168,85,247,.3)',
              background: 'rgba(168,85,247,.08)',
              color: 'var(--pu)', textDecoration: 'none',
              transition: 'all .2s', whiteSpace: 'nowrap',
            }}>Tools</Link>
          </div>
        </div>

        {/* Live indicator */}
        <div style={{ display:'flex', alignItems:'center', gap:5, marginLeft:8 }}>
          <div style={{
            width:5, height:5, borderRadius:'50%',
            background:'var(--gn)',
            boxShadow:'0 0 8px var(--gn)',
            animation:'pulse 2s infinite',
          }} />
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'var(--gn)' }}>LIVE</span>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          className="nav-hamburger"
          style={{
            display:'none', flexDirection:'column', gap:4,
            background:'none', border:'none', padding:6, cursor:'pointer',
          }}
          aria-label="Menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              width:20, height:1.5, background:'var(--tx2)',
              borderRadius:1, display:'block', transition:'all .3s',
              transform: open
                ? i===0 ? 'rotate(45deg) translate(4px,4px)'
                : i===1 ? 'scaleX(0)'
                : 'rotate(-45deg) translate(4px,-4px)'
                : 'none',
              opacity: open && i===1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position:'fixed', top:'var(--nav-h)', left:0, right:0,
          background:'rgba(4,6,12,.97)', backdropFilter:'blur(24px)',
          borderBottom:'1px solid var(--b2)', zIndex:999,
          padding:12, display:'flex', flexDirection:'column', gap:4,
          animation:'slideDown .2s ease',
        }}>
          {[...NAV_LINKS, { to:'/tiktok', label:'TikTok DL' }, { to:'/catbox', label:'Catbox Upload' }].map(({ to, label }) => (
            <Link key={to} to={to} style={{
              fontFamily:'JetBrains Mono,monospace', fontSize:12,
              padding:'10px 14px', borderRadius:7,
              color: pathname === to ? 'var(--cy)' : 'var(--tx2)',
              background: pathname === to ? 'rgba(0,229,255,.06)' : 'transparent',
              textDecoration:'none', transition:'all .2s',
              border: '1px solid ' + (pathname === to ? 'rgba(0,229,255,.2)' : 'transparent'),
            }}>
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
