import { useState } from 'react';

export default function CodeBlock({ lang = 'Code', code = '' }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="code-block">
      <div className="code-header">
        <div className="code-dots">
          {['#ff5f57','#ffbd2e','#28c940'].map(c => (
            <div key={c} className="code-dot" style={{ background: c }} />
          ))}
        </div>
        <span className="code-lang">{lang}</span>
        <button className="code-copy" onClick={copy}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <div className="code-content">{code}</div>
    </div>
  );
}
