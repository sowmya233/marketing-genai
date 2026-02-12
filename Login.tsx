import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const userData: User = {
        id: 'user_1',
        username: email.split('@')[0],
        email: email
      };

      onLogin(userData);

      setLoading(false);
      navigate("/", { replace: true });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-fixed">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
      <div className="w-full max-w-md glass p-10 rounded-[2rem] shadow-2xl relative z-10 animate-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6">
            <i className="fa-solid fa-rocket text-white text-3xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">MarketAI Suite</h1>
          <p className="text-slate-400 mt-2 text-center">Intelligent Sales & Marketing OS</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 ml-1">Work Email</label>
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
              <input 
                required
                type="email" 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="name@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 ml-1">Password</label>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
              <input 
                required
                type="password" 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2"
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Authenticate Access'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-slate-500">New to MarketAI? </span>
          <Link to="/register" className="text-blue-400 font-bold hover:underline">
            Create an Organization
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
