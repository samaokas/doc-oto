import { ArrowRight, Smartphone, Shield, TrendingUp } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Built for the Algerian Market
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Smart Vehicle</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Maintenance & Fleet
            </span>
            <br />
            <span className="text-white">Management</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Doc-OTO simplifies vehicle maintenance, expense tracking, and fleet management 
            for individual owners and commercial operators across Algeria.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-lg hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border border-slate-700 rounded-xl font-semibold text-lg text-slate-300 hover:border-emerald-500/50 hover:text-white transition-all flex items-center justify-center gap-2">
              View Documentation
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex flex-col items-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <Smartphone className="w-6 h-6 text-emerald-400 mb-2" />
              <span className="text-2xl font-bold text-white">iOS & Android</span>
              <span className="text-sm text-slate-400">Mobile First</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <Shield className="w-6 h-6 text-cyan-400 mb-2" />
              <span className="text-2xl font-bold text-white">48 Wilayas</span>
              <span className="text-sm text-slate-400">Nationwide Coverage</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <TrendingUp className="w-6 h-6 text-emerald-400 mb-2" />
              <span className="text-2xl font-bold text-white">3 Tiers</span>
              <span className="text-sm text-slate-400">Flexible Plans</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
