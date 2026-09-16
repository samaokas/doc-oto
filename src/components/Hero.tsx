import { ArrowRight, Smartphone, Shield, TrendingUp } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects - Subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-slate-800/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-sm mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Built for the Algerian Market
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
            <span className="text-white">Smart Vehicle</span>
            <br />
            <span className="text-blue-400">
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
            <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 text-white">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border border-slate-700 rounded-xl font-semibold text-lg text-slate-300 hover:border-slate-500 hover:text-white transition-all flex items-center justify-center gap-2">
              View Documentation
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex flex-col items-center p-5 rounded-xl bg-slate-800/40 border border-slate-700/40">
              <Smartphone className="w-6 h-6 text-blue-400 mb-2" />
              <span className="text-2xl font-bold text-white">iOS & Android</span>
              <span className="text-sm text-slate-500">Mobile First</span>
            </div>
            <div className="flex flex-col items-center p-5 rounded-xl bg-slate-800/40 border border-slate-700/40">
              <Shield className="w-6 h-6 text-blue-400 mb-2" />
              <span className="text-2xl font-bold text-white">69 Wilayas</span>
              <span className="text-sm text-slate-500">Nationwide Coverage</span>
            </div>
            <div className="flex flex-col items-center p-5 rounded-xl bg-slate-800/40 border border-slate-700/40">
              <TrendingUp className="w-6 h-6 text-blue-400 mb-2" />
              <span className="text-2xl font-bold text-white">3 Tiers</span>
              <span className="text-sm text-slate-500">Flexible Plans</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
