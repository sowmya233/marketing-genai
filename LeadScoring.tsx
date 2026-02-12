import React, { useState, useEffect } from 'react';
import { scoreLead } from '../services/geminiService';
import { Lead } from '../types';
import {
  PieChart, Pie, Cell,
  ResponsiveContainer,
  BarChart, Bar,
  XAxis, YAxis,
  Tooltip, CartesianGrid
} from 'recharts';

const LeadScoring: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [form, setForm] = useState<any>({
    name: '',
    budget: 0,
    need: '',
    customNeed: '',
    urgency: '',
    customUrgency: '',
    authority: '',
    customAuthority: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('marketai_leads');
    if (saved) setLeads(JSON.parse(saved));
  }, []);

  const normalizeCategory = (cat?: string) => {
    const c = cat?.toLowerCase() || '';
    if (c.includes('hot')) return 'Hot';
    if (c.includes('warm') && !c.includes('lukewarm')) return 'Warm';
    if (c.includes('cold')) return 'Cold';
    return 'Lukewarm';
  };

  const handleScore = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const finalNeed = form.need === "Others" ? form.customNeed : form.need;
    const finalUrgency = form.urgency === "Others" ? form.customUrgency : form.urgency;
    const finalAuthority = form.authority === "Others" ? form.customAuthority : form.authority;

    try {
      const aiData = await scoreLead({
        ...form,
        need: finalNeed,
        urgency: finalUrgency,
        authority: finalAuthority
      });

      const probString = aiData.probability || '0%';
      const probValue = parseInt(probString.replace('%', '')) || 0;

      const newLead: Lead = {
        ...form,
        need: finalNeed,
        urgency: finalUrgency,
        authority: finalAuthority,
        id: Date.now().toString(),
        createdAt: new Date().toLocaleDateString(),
        score: Number(aiData.score) || 0,
        category: normalizeCategory(aiData.category),
        reasoning: aiData.reasoning || '',
        probability: probString,
        probValue
      };

      const updated = [newLead, ...leads];
      setLeads(updated);
      localStorage.setItem('marketai_leads', JSON.stringify(updated));

      setForm({
        name: '',
        budget: 0,
        need: '',
        customNeed: '',
        urgency: '',
        customUrgency: '',
        authority: '',
        customAuthority: ''
      });

    } catch (err) {
      console.error(err);
      alert("Error scoring lead.");
    } finally {
      setLoading(false);
    }
  };

  const getColor = (cat: string) => {
    switch (cat) {
      case 'Hot': return '#f87171';
      case 'Warm': return '#fb923c';
      case 'Lukewarm': return '#60a5fa';
      case 'Cold': return '#94a3b8';
      default: return '#94a3b8';
    }
  };

  const categoryData = ['Hot','Warm','Lukewarm','Cold'].map(cat => ({
    name: cat,
    value: leads.filter(l => l.category === cat).length,
    color: getColor(cat)
  }));

  return (
    <div className="space-y-10">

      <div>
        <h1 className="text-3xl font-bold text-white">Lead Intelligence Engine</h1>
        <p className="text-slate-400">
          AI-Driven BANT Qualification, Revenue Forecasting & Strategic Targeting
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* FORM */}
        <div className="lg:col-span-4">
          <form onSubmit={handleScore} className="glass p-8 rounded-[2rem] space-y-6">

            {/* Name */}
            <div>
              <label className="text-xs uppercase text-slate-400 mb-2 block">
                Company / Lead Name
              </label>
              <input
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Budget */}
            <div>
              <label className="text-xs uppercase text-slate-400 mb-2 block">
                Budget Allocation ($)
              </label>
              <input
                type="number"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
                value={form.budget}
                onChange={e => setForm({ ...form, budget: parseInt(e.target.value) })}
              />
            </div>

            {/* Business Need */}
            <div>
              <label className="text-xs uppercase text-slate-400 mb-2 block">
                Business Need
              </label>
              <select
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
                value={form.need}
                onChange={e => setForm({ ...form, need: e.target.value })}
              >
                <option value="">Select Need</option>
                <option>Revenue Growth</option>
                <option>Cost Optimization</option>
                <option>Automation</option>
                <option>Compliance</option>
                <option>Market Expansion</option>
                <option value="Others">Others</option>
              </select>

              {form.need === "Others" && (
                <input
                  required
                  placeholder="Specify custom need"
                  className="mt-3 w-full bg-slate-950 border border-blue-500 rounded-xl px-4 py-3 text-white"
                  value={form.customNeed}
                  onChange={e => setForm({ ...form, customNeed: e.target.value })}
                />
              )}
            </div>

            {/* Timeline */}
            <div>
              <label className="text-xs uppercase text-slate-400 mb-2 block">
                Timeline / Urgency
              </label>
              <select
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
                value={form.urgency}
                onChange={e => setForm({ ...form, urgency: e.target.value })}
              >
                <option value="">Select Timeline</option>
                <option>Immediate (0-1 Month)</option>
                <option>Short Term (1-3 Months)</option>
                <option>Medium Term (3-6 Months)</option>
                <option>Long Term (6+ Months)</option>
                <option value="Others">Others</option>
              </select>

              {form.urgency === "Others" && (
                <input
                  required
                  placeholder="Specify custom timeline"
                  className="mt-3 w-full bg-slate-950 border border-blue-500 rounded-xl px-4 py-3 text-white"
                  value={form.customUrgency}
                  onChange={e => setForm({ ...form, customUrgency: e.target.value })}
                />
              )}
            </div>

            {/* Authority */}
            <div>
              <label className="text-xs uppercase text-slate-400 mb-2 block">
                Decision Authority Level
              </label>
              <select
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
                value={form.authority}
                onChange={e => setForm({ ...form, authority: e.target.value })}
              >
                <option value="">Select Authority</option>
                <option>Primary Decision Maker</option>
                <option>Influencer</option>
                <option>Technical Evaluator</option>
                <option>Executive Sponsor</option>
                <option value="Others">Others</option>
              </select>

              {form.authority === "Others" && (
                <input
                  required
                  placeholder="Specify authority level"
                  className="mt-3 w-full bg-slate-950 border border-blue-500 rounded-xl px-4 py-3 text-white"
                  value={form.customAuthority}
                  onChange={e => setForm({ ...form, customAuthority: e.target.value })}
                />
              )}
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl"
            >
              {loading ? "Evaluating Intelligence..." : "Score Prospect"}
            </button>

          </form>
        </div>

        {/* RESULTS — COMPLETELY UNCHANGED */}
        {leads.length > 0 && (
          <div className="lg:col-span-8 space-y-8">

            <div className="glass p-6 rounded-[2rem] h-[280px]">
              <h3 className="text-sm text-slate-400 uppercase mb-4">
                Category Distribution
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" innerRadius={60} outerRadius={90}>
                    {categoryData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="glass p-6 rounded-[2rem] h-[280px]">
              <h3 className="text-sm text-slate-400 uppercase mb-4">
                Lead Score Distribution
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leads}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Bar dataKey="score" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="glass p-6 rounded-[2rem] h-[280px]">
              <h3 className="text-sm text-slate-400 uppercase mb-4">
                Budget vs Probability
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leads}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Bar dataKey="budget" fill="#f59e0b" />
                  <Bar dataKey="probValue" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="glass p-8 rounded-[2rem] border-l-4 border-blue-600 bg-gradient-to-r from-blue-600/5 to-transparent">

              <h3 className="text-xl font-bold text-white mb-6">
                AI Strategic Sales Intelligence
              </h3>

              <p className="text-slate-300 mb-6 italic">
                {leads[0].reasoning}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-300">
                <div>
                  <p>Score: {leads[0].score}/100</p>
                  <p>Category: {leads[0].category}</p>
                  <p>Conversion Probability: {leads[0].probability}</p>
                </div>
                <div>
                  <p>Budget: ${leads[0].budget}</p>
                  <p>Expected Revenue: ${(leads[0].budget * leads[0].probValue / 100).toFixed(0)}</p>
                </div>
                <div>
                  <p>{leads[0].score > 75 ? "Immediate Executive Outreach" : "Nurture Campaign Required"}</p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default LeadScoring;
