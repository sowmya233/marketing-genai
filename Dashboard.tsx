
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Mon', usage: 400 },
  { name: 'Tue', usage: 300 },
  { name: 'Wed', usage: 600 },
  { name: 'Thu', usage: 800 },
  { name: 'Fri', usage: 500 },
  { name: 'Sat', usage: 200 },
  { name: 'Sun', usage: 100 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Market Intelligence Command</h1>
          <p className="text-slate-400 mt-1">Ready to scale your reach? Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/campaign" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-blue-900/20">
            <i className="fa-solid fa-plus mr-2"></i> New Campaign
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'AI Operations', value: '1,284', change: '+12%', icon: 'fa-microchip', color: 'blue' },
          { label: 'Hot Leads', value: '42', change: '+5%', icon: 'fa-fire', color: 'orange' },
          { label: 'Conversion Rate', value: '3.4%', change: '+0.2%', icon: 'fa-chart-pie', color: 'green' },
          { label: 'Campaigns', value: '18', change: 'Stable', icon: 'fa-bullhorn', color: 'purple' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-2xl relative overflow-hidden group">
            <div className={`absolute -right-4 -top-4 w-20 h-20 bg-${stat.color}-500/10 rounded-full group-hover:scale-110 transition-transform`}></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.label}</span>
              <i className={`fa-solid ${stat.icon} text-${stat.color}-400`}></i>
            </div>
            <div className="flex items-baseline gap-3">
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-slate-400'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Usage Chart */}
        <div className="lg:col-span-2 glass p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">System Activity</h3>
            <select className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="usage" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsage)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Real-time Insights</h3>
          <div className="space-y-6 flex-1">
            {[
              { title: 'New Lead Scored', time: '2 mins ago', desc: 'Enterprise client scored 92% (Hot)', icon: 'fa-bolt', color: 'blue' },
              { title: 'Campaign Drafted', time: '1 hour ago', desc: 'Summer SaaS Blast campaign generated', icon: 'fa-file-lines', color: 'purple' },
              { title: 'Market Trend Alert', time: '4 hours ago', desc: 'Shift detected in B2B buyer behavior', icon: 'fa-triangle-exclamation', color: 'amber' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className={`w-10 h-10 shrink-0 rounded-xl bg-${activity.color}-500/10 flex items-center justify-center text-${activity.color}-400`}>
                  <i className={`fa-solid ${activity.icon}`}></i>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white leading-tight">{activity.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{activity.desc}</p>
                  <span className="text-[10px] text-slate-500 uppercase mt-2 block">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
