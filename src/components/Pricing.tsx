import { Check, Zap, Building } from 'lucide-react';

const plans = [
  {
    name: 'Particular',
    subtitle: 'Free Tier',
    price: '0',
    period: 'forever',
    description: 'Perfect for individual vehicle owners managing personal cars.',
    icon: Zap,
    color: 'from-emerald-400 to-emerald-600',
    borderColor: 'border-emerald-500/30',
    popular: false,
    features: [
      'Up to 3 vehicles',
      'Cars, Buses & Trucks support',
      'Oil change km tracking',
      'Technical control alerts',
      'Insurance expiry reminders',
      'Basic expense logging',
      'Fuel consumption tracking',
      'Personal maintenance history',
      'Community vendor directory',
    ],
    cta: 'Start Free',
  },
  {
    name: 'Commercial',
    subtitle: 'Fleet Management',
    price: '4,900',
    period: '/month',
    description: 'For businesses managing multi-vehicle fleets with employees.',
    icon: Building,
    color: 'from-cyan-400 to-cyan-600',
    borderColor: 'border-cyan-500/30',
    popular: true,
    features: [
      'Unlimited fleet vehicles',
      'Employee driver assignments',
      'Aggregate cost reporting',
      'Fleet analytics dashboard',
      'Bulk data import (JSON/CSV/Excel)',
      'Advanced spare parts tracking',
      'Pneumatic management system',
      'Priority vendor directory access',
      'Dedicated account manager',
      'API access & integrations',
    ],
    cta: 'Start 14-Day Trial',
  },
  {
    name: 'Enterprise',
    subtitle: 'Custom Solution',
    price: 'Custom',
    period: 'contact us',
    description: 'Tailored solution for large fleet operators and transport companies.',
    icon: Building,
    color: 'from-purple-400 to-purple-600',
    borderColor: 'border-purple-500/30',
    popular: false,
    features: [
      'Everything in Commercial',
      'Custom integrations & APIs',
      'White-label options',
      'Multi-branch management',
      'Advanced compliance tools',
      'Custom reporting & exports',
      'SLA guarantees (99.9%)',
      'On-premise deployment option',
      'Training & onboarding',
      '24/7 priority support',
    ],
    cta: 'Contact Sales',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Simple, Transparent
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> Pricing</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All prices in Algerian Dinar (DZD). 
            Start free and upgrade as your fleet grows.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl bg-slate-800/30 border ${plan.borderColor} ${
                plan.popular ? 'ring-2 ring-cyan-500/50 scale-105' : ''
              } hover:scale-[1.02] transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-sm text-slate-400">{plan.subtitle}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  {plan.price !== 'Custom' && <span className="text-sm text-slate-400">DZD</span>}
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-sm text-slate-400">{plan.period}</span>}
                  {plan.price === 'Custom' && <span className="text-sm text-slate-400 ml-2">{plan.period}</span>}
                </div>
                <p className="text-sm text-slate-400 mt-2">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:from-cyan-400 hover:to-emerald-400 shadow-lg shadow-cyan-500/20'
                    : 'border border-slate-600 text-slate-300 hover:border-emerald-500/50 hover:text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
