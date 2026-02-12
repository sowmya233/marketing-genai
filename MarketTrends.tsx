
import React, { useState } from 'react';
import { generateTrends } from '../services/geminiService';

const MarketTrends: React.FC = () => {
  const [industry, setIndustry] = useState('Artificial Intelligence');
  const [customIndustry, setCustomIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [trends, setTrends] = useState<string | null>(null);

  const handleAnalyze = async () => {
    const finalIndustry = industry === 'Others' ? customIndustry : industry;
    if (!finalIndustry) return;
    setLoading(true);
    try {
      const result = await generateTrends(finalIndustry);
      setTrends(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">Market Sentinel</h1>
        <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Deep-scan global market shifts, emerging consumer behaviors, and disruptive strategic patterns across any industry vertical.
        </p>
      </div>

      <div className="glass p-10 rounded-[3rem] space-y-10 border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <select 
              className="flex-1 bg-slate-900 border border-slate-700 rounded-[1.5rem] px-8 py-5 text-xl text-white outline-none focus:ring-4 focus:ring-purple-500/20 transition-all shadow-inner font-bold"
              value={industry}
              onChange={e => setIndustry(e.target.value)}
            >
              <optgroup label="Technology Dominance">
                <option>Artificial Intelligence & ML</option>
                <option>Cybersecurity Posture</option>
                <option>Web3 & Decentralized Finance</option>
                <option>Cloud Infrastructure & Edge</option>
                <option>Quantum Computing Readiness</option>
              </optgroup>
              <optgroup label="Industrial Verticals">
                <option>Bio-Medical & Genomics</option>
                <option>Smart Manufacturing (IIoT)</option>
                <option>Renewable Infrastructure</option>
                <option>AgriTech & Food Supply</option>
                <option>Logistics & Automated Freight</option>
              </optgroup>
              <optgroup label="Consumer Markets">
                <option>E-commerce Personalization</option>
                <option>Luxury Goods & Re-commerce</option>
                <option>EdTech & Future of Work</option>
                <option>Travel & Hospitality Tech</option>
              </optgroup>
              <option value="Others">Others (Define Custom Sector...)</option>
            </select>
            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-gradient-to-tr from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black px-12 py-5 rounded-[1.5rem] shadow-2xl shadow-blue-500/20 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-3"
            >
              {loading ? <i className="fa-solid fa-satellite fa-spin text-xl"></i> : <i className="fa-solid fa-radar text-xl"></i>}
              {loading ? 'Scanning...' : 'Scan Market'}
            </button>
          </div>

          {industry === 'Others' && (
            <div className="relative animate-in slide-in-from-top-4 duration-300">
               <input 
                className="w-full bg-slate-950 border-2 border-purple-500/30 rounded-[1.5rem] px-8 py-5 text-white focus:outline-none focus:border-purple-500 text-lg placeholder-slate-700 shadow-xl"
                placeholder="Enter custom industry vertical (e.g. Deep Sea Mining Tech)"
                value={customIndustry}
                onChange={e => setCustomIndustry(e.target.value)}
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-purple-500/40 text-sm font-bold uppercase tracking-widest">Manual Entry Mode</div>
            </div>
          )}
        </div>

        {trends && (
          <div className="animate-in slide-in-from-bottom-12 duration-1000">
            <div className="bg-slate-950/60 rounded-[2.5rem] p-12 border border-slate-800 shadow-inner prose prose-invert max-w-none text-slate-300 leading-relaxed font-light text-lg">
              <div dangerouslySetInnerHTML={{ __html: trends.replace(/\n/g, '<br/>') }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketTrends;
