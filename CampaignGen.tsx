
import React, { useState } from 'react';
import { generateCampaign } from '../services/geminiService';
import { CampaignData } from '../types';

const CampaignGen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CampaignData | null>(null);
  const [form, setForm] = useState({
    product: 'SaaS: Enterprise AI Automation',
    customProduct: '',
    audience: 'Tech: CTOs & Engineering VPs',
    customAudience: '',
    platform: 'Multi-Channel',
    budget: '$10,000 - $50,000',
    goal: 'Lead Generation: High-Intent MQLs',
    customGoal: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const finalProduct = form.product === 'Others' ? form.customProduct : form.product;
    const finalAudience = form.audience === 'Others' ? form.customAudience : form.audience;
    const finalGoal = form.goal === 'Others' ? form.customGoal : form.goal;
    
    try {
      const data = await generateCampaign({
        ...form,
        product: finalProduct,
        audience: finalAudience,
        goal: finalGoal
      });
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('Error generating campaign.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl shadow-blue-500/20">
          <i className="fa-solid fa-bullhorn"></i>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Campaign Architect</h1>
          <p className="text-slate-400">Enterprise strategic engine with multi-output generation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-4 glass p-8 rounded-[2rem] space-y-6 h-fit sticky top-24 border-blue-500/10">
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Product / Vertical</label>
            <select
              className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3.5 text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={form.product}
              onChange={e => setForm({...form, product: e.target.value})}
            >
              <optgroup label="Software & SaaS">
                <option>SaaS: Enterprise AI Automation</option>
                <option>SaaS: Cybersecurity Zero-Trust</option>
                <option>SaaS: Fintech Payment Rails</option>
                <option>SaaS: HRTech & Talent Systems</option>
                <option>SaaS: MarTech Attribution</option>
                <option>SaaS: DevOps Observability</option>
                <option>SaaS: EdTech LMS</option>
                <option>SaaS: PropTech & Real Estate</option>
              </optgroup>
              <optgroup label="DeepTech & Industry">
                <option>DeepTech: Quantum Computing</option>
                <option>Industry: AgriTech Autonomous</option>
                <option>Industry: BioTech Drug Discovery</option>
                <option>Industry: Aerospace Logistics</option>
                <option>Industry: Green Energy Storage</option>
                <option>Industry: Smart Manufacturing (Industry 4.0)</option>
              </optgroup>
              <optgroup label="Professional Services">
                <option>Services: Global M&A Advisory</option>
                <option>Services: Change Management</option>
                <option>Services: ESG Compliance Retainer</option>
                <option>Services: Fractional Leadership</option>
              </optgroup>
              <option value="Others">Others (Define custom...)</option>
            </select>
            {form.product === 'Others' && (
              <input 
                required
                className="w-full mt-2 bg-slate-950 border border-blue-500/50 rounded-xl px-4 py-3 text-white placeholder-slate-600 animate-in slide-in-from-top-2"
                placeholder="Type your specific product..."
                value={form.customProduct}
                onChange={e => setForm({...form, customProduct: e.target.value})}
              />
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Target Audience</label>
            <select
              className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3.5 text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={form.audience}
              onChange={e => setForm({...form, audience: e.target.value})}
            >
              <option>Tech: CTOs & VPs of Engineering</option>
              <option>Finance: CFOs & Finance Directors</option>
              <option>Ops: Supply Chain & Ops Heads</option>
              <option>People: CHROs & HR Leads</option>
              <option>Marketing: CMOs & Growth VPs</option>
              <option>Founder: Venture-Backed Series B+</option>
              <option>Government: Procurement Officers</option>
              <option>SMB: Independent Retail Owners</option>
              <option>Non-Profit: Executive Directors</option>
              <option value="Others">Others (Define custom...)</option>
            </select>
            {form.audience === 'Others' && (
              <input 
                required
                className="w-full mt-2 bg-slate-950 border border-blue-500/50 rounded-xl px-4 py-3 text-white placeholder-slate-600 animate-in slide-in-from-top-2"
                placeholder="Describe your ideal persona..."
                value={form.customAudience}
                onChange={e => setForm({...form, customAudience: e.target.value})}
              />
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Campaign Goal</label>
            <select
              className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3.5 text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={form.goal}
              onChange={e => setForm({...form, goal: e.target.value})}
            >
              <option>Lead Generation: High-Intent MQLs</option>
              <option>Brand Awareness: Thought Leadership</option>
              <option>Market Entry: Disruptive Launch</option>
              <option>Retention: Churn Mitigation</option>
              <option>Expansion: Upsell/Cross-sell</option>
              <option>Direct Sales: High Ticket Conversion</option>
              <option value="Others">Others (Define custom...)</option>
            </select>
            {form.goal === 'Others' && (
              <input 
                required
                className="w-full mt-2 bg-slate-950 border border-blue-500/50 rounded-xl px-4 py-3 text-white placeholder-slate-600 animate-in slide-in-from-top-2"
                placeholder="Specify your unique goal..."
                value={form.customGoal}
                onChange={e => setForm({...form, customGoal: e.target.value})}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-900/40 flex items-center justify-center gap-2"
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
            {loading ? 'Synthesizing Blueprint...' : 'Generate Full Campaign'}
          </button>
        </form>

        <div className="lg:col-span-8">
          {!result && !loading && (
            <div className="glass h-[600px] rounded-[3rem] flex flex-col items-center justify-center text-center p-12 border-dashed border-2 border-slate-800">
               <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 text-slate-600 text-3xl">
                 <i className="fa-solid fa-layer-group"></i>
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">Architect Your Future</h3>
               <p className="text-slate-400 max-w-sm">Configure your parameters on the left to see Gemini forge a complete multi-asset marketing strategy.</p>
            </div>
          )}

          {loading && (
            <div className="glass h-[600px] rounded-[3rem] flex flex-col items-center justify-center p-12 space-y-6">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-slate-800 rounded-full"></div>
                <div className="w-24 h-24 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full absolute top-0 animate-spin"></div>
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-xl mb-1">Strategizing...</p>
                <p className="text-slate-500 text-sm animate-pulse tracking-widest uppercase">Consulting Global Market Intelligence</p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="glass p-10 rounded-[3rem] border-l-8 border-blue-600">
                <h3 className="text-2xl font-bold text-white mb-6">Strategic Framework</h3>
                <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-lg">
                  {result.strategy}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass p-8 rounded-[2rem]">
                  <h4 className="font-bold text-blue-400 flex items-center gap-3 mb-6 text-xl">
                    <i className="fa-solid fa-check-double"></i> Objectives
                  </h4>
                  <ul className="space-y-4">
                    {result.objectives.map((obj, i) => (
                      <li key={i} className="flex gap-4 text-slate-300">
                        <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-[10px] shrink-0 font-bold">{i+1}</span>
                        <span className="text-sm">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass p-8 rounded-[2rem] bg-green-500/5 border-green-500/10">
                  <h4 className="font-bold text-green-400 flex items-center gap-3 mb-6 text-xl">
                    <i className="fa-solid fa-chart-line"></i> ROI Forecast
                  </h4>
                  <p className="text-slate-300 leading-relaxed italic">"{result.estimatedROI}"</p>
                </div>
              </div>

              <div className="glass p-10 rounded-[3rem] space-y-12">
                <div>
                   <h5 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                     <i className="fa-solid fa-pencil"></i> Creative Concepts
                   </h5>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {result.contentIdeas.map((idea, i) => (
                       <div key={i} className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-sm text-slate-300 hover:border-blue-500/30 transition-colors">
                         {idea}
                       </div>
                     ))}
                   </div>
                </div>

                <div>
                   <h5 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                     <i className="fa-solid fa-rectangle-ad"></i> High-Conversion Ad Copy
                   </h5>
                   <div className="space-y-4">
                     {result.adCopies.map((copy, i) => (
                       <div key={i} className="bg-blue-600/5 border-l-4 border-blue-600 p-6 rounded-r-2xl text-md font-medium text-slate-200 italic">
                         "{copy}"
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignGen;
