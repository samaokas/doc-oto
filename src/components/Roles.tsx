import { User, Building2, Shield, Check } from 'lucide-react';

const roles = [
  {
    icon: Shield,
    title: 'Admin',
    subtitle: 'System Administrator',
    description: 'Full system-wide management with complete control over the platform configuration.',
    borderColor: 'border-slate-600/40',
    hoverBorder: 'hover:border-slate-500/60',
    iconBg: 'bg-slate-700/50 border border-slate-600/50',
    iconColor: 'text-slate-300',
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
    borderColor: 'border-blue-500/30',
    hoverBorder: 'hover:border-blue-500/50',
    iconBg: 'bg-blue-600/15 border border-blue-500/20',
    iconColor: 'text-blue-400',
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
    borderColor: 'border-slate-600/40',
    hoverBorder: 'hover:border-slate-500/60',
    iconBg: 'bg-slate-700/50 border border-slate-600/50',
    iconColor: 'text-slate-300',
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
          <span className="inline-block px-3 py-1 text-sm text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
            User Roles
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Designed for
            <span className="text-blue-400"> Every User</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Three distinct user roles ensure the right experience for individual owners, 
            fleet managers, and system administrators.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl bg-slate-800/30 border ${role.borderColor} ${role.hoverBorder} transition-all duration-300`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${role.iconBg} flex items-center justify-center mb-6`}>
                <role.icon className={`w-7 h-7 ${role.iconColor}`} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-1">{role.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{role.subtitle}</p>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">{role.description}</p>

              {/* Capabilities */}
              <ul className="space-y-3">
                {role.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
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
