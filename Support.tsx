
import React, { useState } from 'react';
import { getChatbotResponse } from '../services/geminiService';

const Support: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [aiChat, setAiChat] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [aiInput, setAiInput] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    setLoadingAi(true);
    const newChat = [...aiChat, { role: 'user' as const, text: aiInput }];
    setAiChat(newChat);
    setAiInput('');
    try {
      const resp = await getChatbotResponse(aiChat.map(c => ({ role: c.role, text: c.text })), aiInput + " (The user is asking for platform support help)");
      setAiChat([...newChat, { role: 'model' as const, text: resp }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Command Support</h1>
        <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
          Enterprise assistance for elite sales & marketing performance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Knowledge & Tickets */}
        <div className="lg:col-span-7 space-y-8">
           <div className="glass p-10 rounded-[3rem] border-slate-800 shadow-xl">
             <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
               <i className="fa-solid fa-book-open text-blue-500"></i> Core Intelligence Base
             </h3>
             <div className="space-y-6">
                {[
                  { q: "How secure is my proprietary data?", a: "MarketAI Suite uses enterprise-grade encryption. Your prompts and data are isolated to your organization and never used to train global models." },
                  { q: "Can I export data to my CRM?", a: "Yes, we support JSON and CSV exports for Salesforce, HubSpot, and Pipedrive through our Advanced Analytics module." },
                  { q: "How does the AI Lead Scoring work?", a: "Our engine uses a multi-factor logic processing budget, urgency, and authority levels relative to industry-specific benchmarks." }
                ].map((faq, i) => (
                  <div key={i} className="group cursor-default">
                    <h4 className="font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{faq.q}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
             </div>
           </div>

           <div className="glass p-10 rounded-[3rem] space-y-8 border-slate-800">
             <h3 className="text-2xl font-black text-white flex items-center gap-3">
               <i className="fa-solid fa-ticket text-purple-500"></i> Transmit Ticket
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Your Name</label>
                 <input className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500 transition-all" placeholder="John Doe" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Priority Subject</label>
                 <select className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500">
                   <option>Platform Bug / Error</option>
                   <option>Billing & Subscription</option>
                   <option>Feature Request</option>
                   <option>Other</option>
                 </select>
               </div>
               <div className="col-span-2 space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Message Details</label>
                 <textarea className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500 h-32 resize-none" placeholder="Explain your inquiry in detail..." />
               </div>
               <button className="col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-5 rounded-2xl transition-all shadow-2xl shadow-blue-600/20 uppercase tracking-widest text-sm">
                 Transmit Support Request
               </button>
             </div>
           </div>
        </div>

        {/* Right Column: AI Assistant & Contact */}
        <div className="lg:col-span-5 space-y-8">
           <div className="glass p-10 rounded-[3rem] border-blue-500/20 bg-blue-500/5 h-[600px] flex flex-col relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
               <i className="fa-solid fa-headset text-9xl"></i>
             </div>
             <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
               <i className="fa-solid fa-robot text-blue-400"></i> AI Assistant
             </h3>
             <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 scrollbar-hide">
               {aiChat.length === 0 && (
                 <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-30">
                    <i className="fa-solid fa-comments text-5xl mb-4"></i>
                    <p className="text-sm">Instant troubleshooting. Ask me about campaign settings, scoring logic, or platform features.</p>
                 </div>
               )}
               {aiChat.map((chat, i) => (
                 <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${chat.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-none'}`}>
                      {chat.text}
                    </div>
                 </div>
               ))}
               {loadingAi && (
                 <div className="flex justify-start">
                   <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl rounded-tl-none">
                     <i className="fa-solid fa-circle-notch fa-spin text-blue-500"></i>
                   </div>
                 </div>
               )}
             </div>
             <form onSubmit={handleAiAsk} className="flex gap-2">
               <input 
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                placeholder="How do I change ROI goals?"
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
               />
               <button type="submit" className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl">
                 <i className="fa-solid fa-paper-plane"></i>
               </button>
             </form>
           </div>

           <div className="glass p-10 rounded-[3rem] flex items-center gap-8 border-slate-800 group cursor-default">
              <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center text-blue-500 text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <i className="fa-solid fa-phone-volume"></i>
              </div>
              <div>
                <h4 className="font-black text-white text-xl uppercase italic">Premium Helpline</h4>
                <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest font-bold">Enterprise Concierge</p>
                <p className="text-blue-400 font-black mt-3 text-xl">+1 (888) MARKET-AI</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
