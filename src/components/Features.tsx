import { 
  Gauge, Calendar, ShieldCheck, Wrench, Fuel, 
  BarChart3, FileJson, CircleDot, AlertTriangle, MapPin 
} from 'lucide-react';

const features = [
  {
    icon: Gauge,
    title: 'Oil Change Tracking',
    description: 'Distance-based countdown gauge tracking oil change interval progress in km. Configurable thresholds per vehicle type.',
  },
  {
    icon: Calendar,
    title: 'Technical Control Alerts',
    description: 'Date-based countdown for Contrôle Technique configured for Algerian legal timelines. Automated renewal reminders.',
  },
  {
    icon: ShieldCheck,
    title: 'Insurance Expiry',
    description: 'Comprehensive Assurance expiry alert system for policy renewal. Never miss a coverage deadline.',
  },
  {
    icon: Wrench,
    title: 'Service Records',
    description: 'Log service date, location (workshop name, city), mileage, and category. Full Algerian vendor directory integration.',
  },
  {
    icon: CircleDot,
    title: 'Pneumatic Management',
    description: 'Track tire position, wear patterns, and pressure readings. Replace schedules and brand-specific lifecycle data.',
  },
  {
    icon: Fuel,
    title: 'Fuel Mileage Tracking',
    description: 'Log refills with volume, cost per liter (DZD), and auto-calculated fuel efficiency in L/100km format.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Charts',
    description: 'Interactive graphs for cumulative costs, monthly maintenance trends, and fuel economy fluctuations over time.',
  },
  {
    icon: FileJson,
    title: 'Data Import',
    description: 'Support for JSON, CSV, and Excel imports to migrate data from legacy apps or spreadsheets seamlessly.',
  },
  {
    icon: AlertTriangle,
    title: 'Countdown Alerts',
    description: 'Smart notification system with escalating urgency levels. Push notifications for critical maintenance deadlines.',
  },
  {
    icon: MapPin,
    title: 'Vendor Directory',
    description: 'Algerian spare-part and mechanic directory by wilaya. Rate and review service providers across 48 provinces.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
            Core Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Everything You Need to
            <span className="text-blue-400"> Manage Your Fleet</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Comprehensive vehicle management tools designed specifically for the Algerian market, 
            from individual car owners to large commercial fleet operators.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-slate-800/30 border border-slate-700/40 hover:border-blue-500/30 hover:bg-slate-800/50 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-lg bg-blue-600/15 border border-blue-500/20 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
