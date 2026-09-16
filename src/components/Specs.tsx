import { Database, Globe, Lock, Smartphone, Server, Code } from 'lucide-react';

const techSpecs = [
  {
    category: 'Platform Architecture',
    icon: Server,
    specs: [
      { label: 'Architecture', value: 'Microservices (API Gateway + Domain Services)' },
      { label: 'Backend', value: 'Node.js / NestJS with TypeScript' },
      { label: 'Database', value: 'PostgreSQL + Redis Cache' },
      { label: 'Mobile', value: 'React Native (iOS & Android)' },
      { label: 'Web', value: 'React + Vite SPA' },
      { label: 'Hosting', value: 'Cloud-native with auto-scaling' },
    ],
  },
  {
    category: 'Data & Integrations',
    icon: Database,
    specs: [
      { label: 'Import Formats', value: 'JSON, CSV, Excel (.xlsx)' },
      { label: 'API Version', value: 'RESTful API v1 with OpenAPI docs' },
      { label: 'Authentication', value: 'JWT + OAuth 2.0' },
      { label: 'Notifications', value: 'Push (FCM/APNs) + Email + SMS' },
      { label: 'Currency', value: 'Algerian Dinar (DZD)' },
      { label: 'Localization', value: 'French, Arabic, English' },
    ],
  },
  {
    category: 'Security & Compliance',
    icon: Lock,
    specs: [
      { label: 'Encryption', value: 'AES-256 at rest, TLS 1.3 in transit' },
      { label: 'Data Residency', value: 'EU-compliant with Algerian data laws' },
      { label: 'Backup', value: 'Automated daily backups (30-day retention)' },
      { label: 'Audit', value: 'Complete activity logging' },
      { label: 'GDPR', value: 'Full compliance with data portability' },
      { label: 'Uptime SLA', value: '99.9% (Enterprise tier)' },
    ],
  },
];

const vehicleTypes = [
  { type: 'Cars', icon: '🚗', count: 'Sedans, SUVs, Hatchbacks' },
  { type: 'Buses', icon: '🚌', count: 'Minibuses, Coaches' },
  { type: 'Trucks', icon: '🚛', count: 'Light, Medium, Heavy' },
];

const maintenanceCategories = [
  'Engine Oil & Filters',
  'Brake System',
  'Suspension & Steering',
  'Tires & Pneumatics',
  'Electrical System',
  'Cooling System',
  'Transmission',
  'Body & Chassis',
];

export default function Specs() {
  return (
    <section id="specs" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm text-teal-400 bg-teal-500/10 border border-teal-500/20 rounded-full mb-4">
            Technical Specifications
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Built with
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> Modern Technology</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Enterprise-grade infrastructure designed for reliability, security, and scalability 
            across the Algerian market.
          </p>
        </div>

        {/* Tech Specs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {techSpecs.map((section, index) => (
            <div key={index} className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-teal-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">{section.category}</h3>
              </div>
              <div className="space-y-3">
                {section.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between items-start gap-4">
                    <span className="text-sm text-slate-400 whitespace-nowrap">{spec.label}</span>
                    <span className="text-sm text-slate-200 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Vehicle Types & Maintenance Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vehicle Types */}
          <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" />
              Supported Vehicle Types
            </h3>
            <div className="space-y-4">
              {vehicleTypes.map((vehicle, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/50 border border-slate-700/30">
                  <span className="text-3xl">{vehicle.icon}</span>
                  <div>
                    <p className="font-medium text-white">{vehicle.type}</p>
                    <p className="text-sm text-slate-400">{vehicle.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Categories */}
          <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Code className="w-5 h-5 text-cyan-400" />
              Maintenance Categories
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {maintenanceCategories.map((cat, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/50 border border-slate-700/30">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
                  <span className="text-sm text-slate-300">{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Import Section */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">Seamless Data Migration</h3>
              <p className="text-sm text-slate-400">
                Import your existing vehicle data from any source. Our intelligent import engine supports 
                multiple formats and automatically maps fields to our schema.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-700/50 text-center">
                <span className="text-xs text-slate-400 block">Format</span>
                <span className="text-sm font-semibold text-emerald-400">JSON</span>
              </div>
              <div className="px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-700/50 text-center">
                <span className="text-xs text-slate-400 block">Format</span>
                <span className="text-sm font-semibold text-cyan-400">CSV</span>
              </div>
              <div className="px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-700/50 text-center">
                <span className="text-xs text-slate-400 block">Format</span>
                <span className="text-sm font-semibold text-purple-400">Excel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
