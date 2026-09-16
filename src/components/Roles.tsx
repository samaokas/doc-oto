import { User, Building2, Shield, Check } from 'lucide-react';

const roles = [
  {
    icon: Shield,
    title: 'Admin',
    subtitle: 'System Administrator',
    description: 'Full system-wide management with complete control over the platform configuration.',
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    capabilities: [
      'User management & role assignment',
      'Algerian vendor/spare-part directory configuration',
      'Platform-wide analytics & reporting',
      'Subscription tier control & billing',
      'System settings & compliance management',
      'Content moderation & data governance',
    ],
  },
  {
    icon: User,
    title: 'Particular Owner',
    subtitle: 'Free Tier',
    description: 'Individual vehicle owners managing personal vehicles with essential tracking tools.',
    color: 'from-emerald-400 to-emerald-600',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    capabilities: [
      'Manage up to 3 personal vehicles',
      'Vehicle types: Cars, Buses, Trucks',
      'Oil change distance tracking',
      'Technical control & insurance alerts',
      'Basic expense & fuel logging',
      'Personal maintenance history',
    ],
  },
  {
    icon: Building2,
    title: 'Company Fleet',
    subtitle: 'Commercial Tier',
    description: 'Business operators managing multi-vehicle fleets with advanced reporting.',
    color: 'from-cyan-400 to-cyan-600',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
    capabilities: [
      'Unlimited fleet vehicles',
      'Employee driver assignments',
      'Aggregate cost reporting per vehicle',
      'Fleet-wide analytics dashboard',
      'Bulk data import (JSON/CSV/Excel)',
      'Priority support & SLA guarantees',
    ],
  },
];

export default function Roles() {
  return (
    <section id="roles" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
            User Roles
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Designed for
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> Every User</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Three distinct user roles ensure the right experience for individual owners, 
            fleet managers, and system administrators.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl ${role.bgColor} border ${role.borderColor} hover:scale-[1.02] transition-all duration-300`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-6 shadow-lg`}>
                <role.icon className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-1">{role.title}</h3>
              <p className="text-sm text-slate-400 mb-4">{role.subtitle}</p>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">{role.description}</p>

              {/* Capabilities */}
              <ul className="space-y-3">
                {role.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
