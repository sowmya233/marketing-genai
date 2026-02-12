import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { User } from './types';
import { NAV_ITEMS, APP_NAME } from './constants';

// Views
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Register from './views/Register';
import CampaignGen from './views/CampaignGen';
import SalesPitch from './views/SalesPitch';
import LeadScoring from './views/LeadScoring';
import Chatbot from './views/Chatbot';
import MarketTrends from './views/MarketTrends';
import Personas from './views/Personas';
import Analytics from './views/Analytics';
import Support from './views/Support';
import ProductVision from './views/ProductVision';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('marketai_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('marketai_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('marketai_user');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
        <i className="fas fa-circle-notch fa-spin text-4xl text-blue-500"></i>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onRegister={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <Route path="/*" element={<Layout user={user} onLogout={handleLogout} />} />
        )}
      </Routes>
    </HashRouter>
  );
};

const Layout: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 glass border-r border-slate-800 flex flex-col z-20`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
            <i className="fa-solid fa-rocket text-white"></i>
          </div>
          {sidebarOpen && <span className="font-bold text-xl tracking-tight gradient-text">{APP_NAME}</span>}
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'sidebar-active text-blue-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className="text-xl w-6 flex justify-center">{item.icon}</span>
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-400/10 transition-all"
          >
            <i className="fa-solid fa-right-from-bracket text-xl w-6 flex justify-center"></i>
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 z-10 glass border-b border-slate-800 px-8 py-4 flex justify-between items-center">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-slate-400 hover:text-white">
            <i className={`fa-solid ${sidebarOpen ? 'fa-indent' : 'fa-outdent'} text-xl`}></i>
          </button>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white">{user.username}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center overflow-hidden">
              <img src={`https://picsum.photos/seed/${user.id}/100/100`} alt="Avatar" />
            </div>
          </div>
        </header>

        <div className="p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="campaign" element={<CampaignGen />} />
            <Route path="pitch" element={<SalesPitch />} />
            <Route path="lead-scoring" element={<LeadScoring />} />
            <Route path="vision" element={<ProductVision />} />
            <Route path="chatbot" element={<Chatbot />} />
            <Route path="trends" element={<MarketTrends />} />
            <Route path="personas" element={<Personas />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="support" element={<Support />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;
