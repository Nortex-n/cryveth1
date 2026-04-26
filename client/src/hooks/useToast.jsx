import { createContext, useContext, useState, useCallback } from 'react';

const ToastCtx = createContext(null);

let id = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((message, type = 'in', duration = 3500) => {
    const current = ++id;
    setToasts(p => [...p, { id: current, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== current)), duration);
  }, []);

  const icons = { ok: '✓', er: '✕', in: 'ℹ' };

  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span style={{ fontSize: 14 }}>{icons[t.type] ?? 'ℹ'}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error('useToast must be inside ToastProvider');
  return ctx;
};
