import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './hooks/useToast.jsx';
import Navbar from './components/Navbar.jsx';
import Home       from './pages/Home.jsx';
import Learn      from './pages/Learn.jsx';
import Languages  from './pages/Languages.jsx';
import Checker    from './pages/Checker.jsx';
import Errors     from './pages/Errors.jsx';
import Tutorials  from './pages/Tutorials.jsx';
import AIChat     from './pages/AIChat.jsx';
import TikTok     from './pages/TikTok.jsx';
import Catbox     from './pages/Catbox.jsx';
import About      from './pages/About.jsx';

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ToastProvider>
        <Navbar />
        <Routes>
          <Route path="/"          element={<Home />}      />
          <Route path="/learn"     element={<Learn />}     />
          <Route path="/languages" element={<Languages />} />
          <Route path="/checker"   element={<Checker />}   />
          <Route path="/errors"    element={<Errors />}    />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/ai"        element={<AIChat />}    />
          <Route path="/tiktok"    element={<TikTok />}    />
          <Route path="/catbox"    element={<Catbox />}    />
          <Route path="/about"     element={<About />}     />
          <Route path="*"          element={<Home />}      />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
