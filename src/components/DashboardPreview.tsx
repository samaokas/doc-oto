import { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { Gauge, Calendar, Fuel, AlertTriangle, Droplets, Wrench } from 'lucide-react';

const costData = [
  { month: 'Jan', maintenance: 15000, fuel: 28000, insurance: 5000 },
  { month: 'Feb', maintenance: 8000, fuel: 32000, insurance: 0 },
  { month: 'Mar', maintenance: 22000, fuel: 29000, insurance: 0 },
  { month: 'Apr', maintenance: 12000, fuel: 31000, insurance: 8000 },
  { month: 'May', maintenance: 35000, fuel: 27000, insurance: 0 },
  { month: 'Jun', maintenance: 18000, fuel: 33000, insurance: 0 },
];

const fuelData = [
  { week: 'W1', consumption: 8.2 },
  { week: 'W2', consumption: 7.9 },
  { week: 'W3', consumption: 8.5 },
  { week: 'W4', consumption: 7.6 },
  { week: 'W5', consumption: 8.1 },
  { week: 'W6', consumption: 7.4 },
  { week: 'W7', consumption: 7.8 },
  { week: 'W8', consumption: 8.0 },
];

const expenseBreakdown = [
  { name: 'Fuel', value: 45, color: '#3b82f6' },
  { name: 'Maintenance', value: 25, color: '#64748b' },
  { name: 'Insurance', value: 15, color: '#1e40af' },
  { name: 'Parts', value: 10, color: '#94a3b8' },
  { name: 'Other', value: 5, color: '#475569' },
];

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<'overview' | 'fuel' | 'maintenance'>('overview');

  return (
    <section id="dashboard" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
            Live Dashboard
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Real-Time
            <span className="text-blue-400"> Vehicle Intelligence</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Monitor your vehicles with interactive dashboards, countdown gauges, and comprehensive analytics.
          </p>
        </div>

        {/* Dashboard Container */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-700/50 overflow-hidden shadow-2xl">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-600" />
                <div className="w-3 h-3 rounded-full bg-slate-600" />
                <div className="w-3 h-3 rounded-full bg-slate-600" />
              </div>
              <span className="text-sm text-slate-400 ml-2">Doc-OTO Dashboard</span>
            </div>
            <div className="flex gap-2">
              {['overview', 'fuel', 'maintenance'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-3 py-1 text-xs rounded-lg transition-all ${
                    activeTab === tab
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            {/* Countdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/40">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/15 border border-blue-500/20 flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Oil Change</p>
                    <p className="text-lg font-bold text-white">2,450 km</p>
                  </div>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }} />
                </div>
                <p className="text-xs text-slate-500 mt-1">65% of 5,000 km interval</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/40">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/15 border border-blue-500/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Contrôle Technique</p>
                    <p className="text-lg font-bold text-white">45 days</p>
                  </div>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }} />
                </div>
                <p className="text-xs text-slate-500 mt-1">Due: March 15, 2026</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/40">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/15 border border-blue-500/20 flex items-center justify-center">
                    <Gauge className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Insurance</p>
                    <p className="text-lg font-bold text-white">120 days</p>
                  </div>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '33%' }} />
                </div>
                <p className="text-xs text-slate-500 mt-1">Expires: June 2026</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/40">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-600/15 border border-amber-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Alerts</p>
                    <p className="text-lg font-bold text-white">3 Active</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-2">
                  <span className="px-2 py-0.5 text-xs bg-red-900/30 text-red-400 border border-red-500/20 rounded">1 Critical</span>
                  <span className="px-2 py-0.5 text-xs bg-amber-900/30 text-amber-400 border border-amber-500/20 rounded">2 Warning</span>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cost Chart */}
              <div className="lg:col-span-2 p-4 rounded-xl bg-slate-800/50 border border-slate-700/40">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">Monthly Expenses (DZD)</h3>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full" /> Maintenance</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-slate-400 rounded-full" /> Fuel</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-800 rounded-full" /> Insurance</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={costData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                    <Area type="monotone" dataKey="fuel" stackId="1" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="maintenance" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="insurance" stackId="1" stroke="#1e40af" fill="#1e40af" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Expense Breakdown Pie */}
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/40">
                <h3 className="text-sm font-semibold text-white mb-4">Expense Breakdown</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={expenseBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {expenseBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {expenseBreakdown.map((item, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs text-slate-400">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Fuel Chart */}
            <div className="mt-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700/40">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Fuel Efficiency (L/100km)</h3>
                <div className="flex items-center gap-2">
                  <Fuel className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-slate-400">Average: 7.9 L/100km</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={fuelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} domain={[6, 10]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                  <Bar dataKey="consumption" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
