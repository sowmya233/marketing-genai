
import React, { useState } from 'react';
import { generateSalesPitch } from '../services/geminiService';
import { PitchData } from '../types';

const SalesPitch: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PitchData | null>(null);
  const [form, setForm] = useState({
    product: 'Managed Cybersecurity Suite',
    customProduct: '',
    persona: 'CISO (Chief Info Security Officer)',
    customPersona: '',
    industry: 'Technology & Software',
    customIndustry: '',
    companySize: 'Enterprise (2000+)',
    budget: '$50k - $250k'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const finalProduct = form.product === 'Others' ? form.customProduct : form.product;
    const finalPersona = form.persona === 'Others' ? form.customPersona : form.persona;
    const finalIndustry = form.industry === 'Others' ? form.customIndustry : form.industry;

    try {
      const data = await generateSalesPitch({
        ...form,
        product: finalProduct,
        persona: finalPersona,
        industry: finalIndustry
      });
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('Error generating pitch.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl shadow-green-500/20">
          <i className="fa-solid fa-comment-dollar"></i>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Sales Pitch Forge</h1>
          <p className="text-slate-400">Restored full-fidelity script generation for elite sales teams.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 glass p-8 rounded-[2rem] space-y-6 h-fit border-green-500/10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Offering Type</label>
              <select 
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-green-500"
                value={form.product}
                onChange={e => setForm({...form, product: e.target.value})}
              >
                <optgroup label="SaaS & Digital">
                  <option>Managed Cybersecurity Suite</option>
                  <option>Enterprise Cloud Integration</option>
                  <option>AI-Driven Customer Experience</option>
                  <option>Business Intelligence Data Moat</option>
                  <option>DevOps Efficiency Platform</option>
                </optgroup>
                <optgroup label="Consulting & High Ticket">
                  <option>Fractional C-Suite Leadership</option>
                  <option>M&A Strategic Integration</option>
                  <option>Global Digital Transformation</option>
                  <option>Supply Chain Resilience Audit</option>
                  <option>Enterprise Talent Strategy</option>
                </optgroup>
                <option value="Others">Others (Define custom...)</option>
              </select>
              {form.product === 'Others' && (
                <input required className="w-full mt-2 bg-slate-950 border border-green-500/50 rounded-xl px-4 py-3 text-white" placeholder="Type your offering..." value={form.customProduct} onChange={e => setForm({...form, customProduct: e.target.value})} />
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Decision Maker Role</label>
              <select 
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-green-500"
                value={form.persona}
                onChange={e => setForm({...form, persona: e.target.value})}
              >
                <option>CISO (Chief Info Security Officer)</option>
                <option>CTO (Chief Technology Officer)</option>
                <option>CFO (Chief Financial Officer)</option>
                <option>COO (Chief Operations Officer)</option>
                <option>CMO (Chief Marketing Officer)</option>
                <option>VP of Sales / Revenue</option>
                <option>Head of Strategic Partnerships</option>
                <option>Procurement Manager</option>
                <option value="Others">Others (Define custom...)</option>
              </select>
              {form.persona === 'Others' && (
                <input required className="w-full mt-2 bg-slate-950 border border-green-500/50 rounded-xl px-4 py-3 text-white" placeholder="Describe the role..." value={form.customPersona} onChange={e => setForm({...form, customPersona: e.target.value})} />
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Target Industry</label>
              <select 
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-green-500"
                value={form.industry}
                onChange={e => setForm({...form, industry: e.target.value})}
              >
                <option>Technology & Software</option>
                <option>Healthcare & Biotech</option>
                <option>Financial Services & Banking</option>
                <option>Manufacturing & Industrial</option>
                <option>Retail & Consumer Goods</option>
                <option>Energy & Sustainability</option>
                <option value="Others">Others (Define custom...)</option>
              </select>
              {form.industry === 'Others' && (
                <input required className="w-full mt-2 bg-slate-950 border border-green-500/50 rounded-xl px-4 py-3 text-white" placeholder="Type the industry..." value={form.customIndustry} onChange={e => setForm({...form, customIndustry: e.target.value})} />
              )}
            </div>

            <button 
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-green-900/30 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-fire"></i>}
              {loading ? 'Forging Assets...' : 'Forge Sales Script'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-8 space-y-8">
          {result ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="glass p-10 rounded-[3rem] border-l-8 border-green-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <i className="fa-solid fa-bolt-lightning text-6xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Elevator Pitch (30s)</h3>
                <p className="text-xl text-slate-300 leading-relaxed italic font-medium">"{result.pitch30s}"</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass p-8 rounded-[2rem]">
                  <h4 className="font-bold text-green-400 mb-6 flex items-center gap-2">
                    <i className="fa-solid fa-shield-halved"></i> Value Proposition
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{result.valueProp}</p>
                </div>
                <div className="glass p-8 rounded-[2rem]">
                  <h4 className="font-bold text-blue-400 mb-6 flex items-center gap-2">
                    <i className="fa-solid fa-star"></i> Differentiators
                  </h4>
                  <ul className="space-y-3">
                    {result.differentiators.map((d, i) => (
                      <li key={i} className="text-sm text-slate-400 flex gap-3">
                        <i className="fa-solid fa-circle-check text-blue-500 mt-1"></i> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="glass p-10 rounded-[3rem] space-y-12">
                <div>
                   <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Cold Outreach Email</h4>
                   <pre className="bg-slate-900/80 p-8 rounded-2xl text-sm text-slate-300 border border-slate-800 whitespace-pre-wrap font-sans leading-relaxed">
                     {result.emailTemplate}
                   </pre>
                </div>
                <div>
                   <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">LinkedIn InMail / DM</h4>
                   <pre className="bg-slate-950/80 p-8 rounded-2xl text-sm text-slate-400 border border-slate-800 whitespace-pre-wrap font-sans italic border-l-4 border-blue-600">
                     {result.linkedinTemplate}
                   </pre>
                </div>
              </div>
            </div>
          ) : (
             <div className="glass h-[600px] flex flex-col items-center justify-center p-20 text-center border-dashed border-2 border-slate-800 rounded-[3rem]">
               <i className="fa-solid fa-scroll text-slate-800 text-7xl mb-8"></i>
               <h3 className="text-2xl font-bold text-white mb-2">Ready to Forge?</h3>
               <p className="text-slate-400 max-w-sm">Define your offering and target on the left to generate high-fidelity sales scripts.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesPitch;
