import { Check, Zap, Building } from 'lucide-react';

const plans = [
  {
    name: 'Particular',
    subtitle: 'Free Tier',
    price: '0',
    period: 'forever',
    description: 'Perfect for individual vehicle owners managing personal cars.',
    icon: Zap,
    borderColor: 'border-slate-700/40',
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
    borderColor: 'border-blue-500/40',
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
    borderColor: 'border-slate-700/40',
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
          <span className="inline-block px-3 py-1 text-sm text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Simple, Transparent
            <span className="text-blue-400"> Pricing</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All prices in Algerian Dinar (DZD). 
            Start free and upgrade as your fleet grows.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl bg-slate-800/30 border ${plan.borderColor} ${
                plan.popular ? 'ring-1 ring-blue-500/40 scale-[1.02]' : ''
              } hover:scale-[1.03] transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 rounded-full text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <div className={`w-12 h-12 rounded-xl ${plan.popular ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-slate-700/50 border border-slate-600/50'} flex items-center justify-center mb-4`}>
                  <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-blue-400' : 'text-slate-300'}`} />
                </div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-sm text-slate-500">{plan.subtitle}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  {plan.price !== 'Custom' && <span className="text-sm text-slate-500">DZD</span>}
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-sm text-slate-500">{plan.period}</span>}
                  {plan.price === 'Custom' && <span className="text-sm text-slate-500 ml-2">{plan.period}</span>}
                </div>
                <p className="text-sm text-slate-400 mt-2">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/15'
                    : 'border border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white'
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
