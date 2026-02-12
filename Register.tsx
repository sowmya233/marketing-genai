
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';

interface RegisterProps {
  onRegister: (user: User) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onRegister({
        id: 'user_new',
        username: formData.name,
        email: formData.email,
        company: formData.company
      });
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-lg glass p-10 rounded-[2rem] shadow-2xl relative z-10 animate-in zoom-in-95 duration-500">
        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-slate-400 mb-8 text-sm">Join the ecosystem of high-performing marketing teams.</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1 space-y-2">
            <label className="text-sm font-medium text-slate-400">Full Name</label>
            <input 
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="col-span-2 md:col-span-1 space-y-2">
            <label className="text-sm font-medium text-slate-400">Company Name</label>
            <input 
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.company}
              onChange={e => setFormData({...formData, company: e.target.value})}
            />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium text-slate-400">Work Email</label>
            <input 
              required
              type="email"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium text-slate-400">Password</label>
            <input 
              required
              type="password"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl mt-4 transition-all"
          >
             {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Deploy Workspace'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account? <Link to="/login" className="text-blue-400 font-bold">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
