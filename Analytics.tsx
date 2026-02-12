
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { getChatbotResponse } from '../services/geminiService';

const data = [
  { name: 'Campaign Alpha', leads: 40, conversion: 24, roi: 2400 },
  { name: 'Campaign Beta', leads: 30, conversion: 13, roi: 3500 },
  { name: 'Campaign Gamma', leads: 65, conversion: 98, roi: 5200 },
  { name: 'Campaign Delta', leads: 27, conversion: 39, roi: 2000 },
  { name: 'Campaign Epsilon', leads: 18, conversion: 48, roi: 1200 },
];

const Analytics: React.FC = () => {
  const [query, setQuery] = useState('');
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const resp = await getChatbotResponse([], `Based on my current campaign analytics (Alpha, Beta, Gamma, Delta, Epsilon), please answer this tactical inquiry: ${query}`);
      setAiInsight(resp);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Advanced Analytics</h1>
          <p className="text-slate-400 mt-2">Multi-dimensional performance orchestration and AI auditing.</p>
        </div>
        <div className="hidden md:flex gap-4">
           <div className="glass px-6 py-3 rounded-2xl text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Pipeline Value</p>
              <p className="text-xl font-black text-white">$1.2M</p>
           </div>
           <div className="glass px-6 py-3 rounded-2xl text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Avg Conversion</p>
              <p className="text-xl font-black text-green-400">12.4%</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="glass p-10 rounded-[3rem] border border-slate-800">
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
            <i className="fa-solid fa-chart-column text-blue-500"></i> Channel Efficacy Matrix
          </h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip cursor={{fill: '#1e293b50'}} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', color: '#fff' }} />
                <Bar dataKey="leads" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="conversion" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-10 rounded-[3rem] border border-slate-800">
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
            <i className="fa-solid fa-money-bill-trend-up text-green-500"></i> Predictive Revenue Velocity
          </h3>
          <div className="h-96">
             <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px' }} />
                <Area type="monotone" dataKey="roi" stroke="#10b981" fillOpacity={1} fill="url(#roiGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass p-10 rounded-[3rem] border border-blue-500/20 bg-blue-500/5 space-y-8">
         <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <i className="fa-solid fa-wand-magic-sparkles text-blue-400"></i> AI Tactical Inquiry (Others)
              </h3>
              <p className="text-slate-400">Ask Gemini deep strategic questions about your current performance metrics.</p>
            </div>
         </div>

         <form onSubmit={handleInquiry} className="flex gap-4">
           <input 
            className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-600"
            placeholder="e.g. Which campaign should I double budget on next week?"
            value={query}
            onChange={e => setQuery(e.target.value)}
           />
           <button disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-xl shadow-blue-500/20">
             {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Consult AI'}
           </button>
         </form>

         {aiInsight && (
           <div className="p-8 bg-slate-950/80 rounded-[2rem] border border-blue-500/30 animate-in slide-in-from-bottom-4 duration-500">
             <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">Strategic Advisory Insight</h4>
             <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed italic">
               "{aiInsight}"
             </div>
           </div>
         )}
      </div>
    </div>
  );
};

export default Analytics;
