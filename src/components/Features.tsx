import { 
  Gauge, Calendar, ShieldCheck, Wrench, Fuel, 
  BarChart3, FileJson, CircleDot, AlertTriangle, MapPin 
} from 'lucide-react';

const features = [
  {
    icon: Gauge,
    title: 'Oil Change Tracking',
    description: 'Distance-based countdown gauge tracking oil change interval progress in km. Configurable thresholds per vehicle type.',
    color: 'from-emerald-400 to-emerald-600',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
  {
    icon: Calendar,
    title: 'Technical Control Alerts',
    description: 'Date-based countdown for Contrôle Technique configured for Algerian legal timelines. Automated renewal reminders.',
    color: 'from-cyan-400 to-cyan-600',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    icon: ShieldCheck,
    title: 'Insurance Expiry',
    description: 'Comprehensive Assurance expiry alert system for policy renewal. Never miss a coverage deadline.',
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    icon: Wrench,
    title: 'Service Records',
    description: 'Log service date, location (workshop name, city), mileage, and category. Full Algerian vendor directory integration.',
    color: 'from-orange-400 to-orange-600',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
  },
  {
    icon: CircleDot,
    title: 'Pneumatic Management',
    description: 'Track tire position, wear patterns, and pressure readings. Replace schedules and brand-specific lifecycle data.',
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
  {
    icon: Fuel,
    title: 'Fuel Mileage Tracking',
    description: 'Log refills with volume, cost per liter (DZD), and auto-calculated fuel efficiency in L/100km format.',
    color: 'from-yellow-400 to-yellow-600',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Charts',
    description: 'Interactive graphs for cumulative costs, monthly maintenance trends, and fuel economy fluctuations over time.',
    color: 'from-pink-400 to-pink-600',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/20',
  },
  {
    icon: FileJson,
    title: 'Data Import',
    description: 'Support for JSON, CSV, and Excel imports to migrate data from legacy apps or spreadsheets seamlessly.',
    color: 'from-teal-400 to-teal-600',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/20',
  },
  {
    icon: AlertTriangle,
    title: 'Countdown Alerts',
    description: 'Smart notification system with escalating urgency levels. Push notifications for critical maintenance deadlines.',
    color: 'from-red-400 to-red-600',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
  },
  {
    icon: MapPin,
    title: 'Vendor Directory',
    description: 'Algerian spare-part and mechanic directory by wilaya. Rate and review service providers across 48 provinces.',
    color: 'from-indigo-400 to-indigo-600',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
            Core Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Everything You Need to
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> Manage Your Fleet</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Comprehensive vehicle management tools designed specifically for the Algerian market, 
            from individual car owners to large commercial fleet operators.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-6 rounded-2xl ${feature.bgColor} border ${feature.borderColor} hover:scale-[1.02] transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
