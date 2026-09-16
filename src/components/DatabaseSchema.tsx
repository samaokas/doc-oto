import { useState } from 'react';
import { Database, Table, Key, Link2, Shield, Zap, ChevronDown, ChevronRight } from 'lucide-react';

interface TableInfo {
  name: string;
  description: string;
  category: string;
  columns: { name: string; type: string; isPrimary?: boolean; isForeign?: boolean }[];
}

const tables: TableInfo[] = [
  {
    name: 'users',
    description: 'Utilisateurs avec rôles (admin, owner, fleet)',
    category: 'Core',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true },
      { name: 'email', type: 'VARCHAR(255)' },
      { name: 'full_name', type: 'VARCHAR(255)' },
      { name: 'role', type: 'user_role' },
      { name: 'github_id', type: 'VARCHAR(100)' },
      { name: 'status', type: 'user_status' },
    ],
  },
  {
    name: 'vehicles',
    description: 'Véhicules (cars, buses, trucks)',
    category: 'Core',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true },
      { name: 'user_id', type: 'UUID', isForeign: true },
      { name: 'brand', type: 'VARCHAR(100)' },
      { name: 'model', type: 'VARCHAR(100)' },
      { name: 'license_plate', type: 'VARCHAR(20)' },
      { name: 'mileage', type: 'INTEGER' },
      { name: 'vehicle_type', type: 'vehicle_type' },
    ],
  },
  {
    name: 'subscriptions',
    description: 'Abonnements et limites',
    category: 'Core',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true },
      { name: 'user_id', type: 'UUID', isForeign: true },
      { name: 'tier', type: 'subscription_tier' },
      { name: 'status', type: 'subscription_status' },
      { name: 'vehicle_limit', type: 'INTEGER' },
    ],
  },
  {
    name: 'oil_changes',
    description: 'Vidanges et suivi kilométrique',
    category: 'Maintenance',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true },
      { name: 'vehicle_id', type: 'UUID', isForeign: true },
      { name: 'change_date', type: 'DATE' },
      { name: 'mileage_at_change', type: 'INTEGER' },
      { name: 'next_change_mileage', type: 'INTEGER' },
      { name: 'cost', type: 'DECIMAL(10,2)' },
    ],
  },
  {
    name: 'technical_controls',
    description: 'Contrôle technique algérien',
    category: 'Maintenance',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true },
      { name: 'vehicle_id', type: 'UUID', isForeign: true },
      { name: 'next_control_date', type: 'DATE' },
      { name: 'result', type: 'VARCHAR(50)' },
      { name: 'center_wilaya', type: 'INTEGER', isForeign: true },
    ],
  },
  {
    name: 'insurance_policies',
    description: 'Assurances véhicules',
    category: 'Maintenance',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true },
      { name: 'vehicle_id', type: 'UUID', isForeign: true },
      { name: 'provider_name', type: 'VARCHAR(255)' },
      { name: 'end_date', type: 'DATE' },
      { name: 'premium_amount', type: 'DECIMAL(10,2)' },
    ],
  },
  {
    name: 'service_records',
    description: 'Historique complet des services',
    category: 'Maintenance',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true },
      { name: 'vehicle_id', type: 'UUID', isForeign: true },
      { name: 'service_date', type: 'DATE' },
      { name: 'category', type: 'service_category' },
      { name: 'total_cost', type: 'DECIMAL(10,2)' },
      { name: 'workshop_wilaya', type: 'INTEGER', isForeign: true },
    ],
  },
  {
    name: 'fuel_logs',
    description: 'Consommation de carburant',
    category: 'Tracking',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true },
      { name: 'vehicle_id', type: 'UUID', isForeign: true },
      { name: 'fill_date', type: 'DATE' },
      { name: 'volume_liters', type: 'DECIMAL(6,2)' },
      { name: 'consumption_l_per_100km', type: 'DECIMAL(5,2)' },
      { name: 'total_cost', type: 'DECIMAL(10,2)' },
    ],
  },
  {
    name: 'expenses',
    description: 'Dépenses générales',
    category: 'Tracking',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true },
      { name: 'vehicle_id', type: 'UUID', isForeign: true },
      { name: 'expense_type', type: 'expense_type' },
      { name: 'amount', type: 'DECIMAL(10,2)' },
      { name: 'expense_date', type: 'DATE' },
    ],
  },
  {
    name: 'alerts',
    description: 'Système d\'alertes unifié',
    category: 'Tracking',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true },
      { name: 'user_id', type: 'UUID', isForeign: true },
      { name: 'vehicle_id', type: 'UUID', isForeign: true },
      { name: 'alert_type', type: 'alert_type' },
      { name: 'severity', type: 'alert_severity' },
      { name: 'status', type: 'alert_status' },
    ],
  },
  {
    name: 'vendors',
    description: 'Répertoire des fournisseurs algériens',
    category: 'Business',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true },
      { name: 'name', type: 'VARCHAR(255)' },
      { name: 'vendor_type', type: 'vendor_type' },
      { name: 'wilaya', type: 'INTEGER', isForeign: true },
      { name: 'average_rating', type: 'DECIMAL(2,1)' },
    ],
  },
  {
    name: 'wilayas',
    description: '58 provinces algériennes',
    category: 'Business',
    columns: [
      { name: 'code', type: 'INTEGER', isPrimary: true },
      { name: 'name_fr', type: 'VARCHAR(100)' },
      { name: 'name_ar', type: 'VARCHAR(100)' },
      { name: 'name_en', type: 'VARCHAR(100)' },
    ],
  },
];

const categories = ['Core', 'Maintenance', 'Tracking', 'Business'];
const categoryColors: Record<string, string> = {
  Core: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
  Maintenance: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
  Tracking: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
  Business: 'bg-purple-500/15 border-purple-500/30 text-purple-400',
};

export default function DatabaseSchema() {
  const [expandedTable, setExpandedTable] = useState<string | null>('users');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTables = selectedCategory
    ? tables.filter(t => t.category === selectedCategory)
    : tables;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
            <Database className="w-3 h-3 inline mr-1" />
            Database Schema
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            PostgreSQL
            <span className="text-blue-400"> Database Design</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            28 tables, 14 types ENUM, Row Level Security, et des données optimisées 
            pour le marché algérien avec les 58 wilayas.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/40 text-center">
            <div className="text-2xl font-bold text-white">28</div>
            <div className="text-xs text-slate-500">Tables</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/40 text-center">
            <div className="text-2xl font-bold text-white">14</div>
            <div className="text-xs text-slate-500">ENUM Types</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/40 text-center">
            <div className="text-2xl font-bold text-white">58</div>
            <div className="text-xs text-slate-500">Wilayas</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/40 text-center">
            <div className="text-2xl font-bold text-white">RLS</div>
            <div className="text-xs text-slate-500">Security</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
              !selectedCategory
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/30'
                : 'bg-slate-800/30 text-slate-400 border-slate-700/40 hover:border-slate-600'
            }`}
          >
            All Tables
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                selectedCategory === cat
                  ? categoryColors[cat]
                  : 'bg-slate-800/30 text-slate-400 border-slate-700/40 hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tables List */}
        <div className="space-y-3">
          {filteredTables.map((table) => (
            <div
              key={table.name}
              className="rounded-xl bg-slate-800/30 border border-slate-700/40 overflow-hidden"
            >
              {/* Table Header */}
              <button
                onClick={() => setExpandedTable(expandedTable === table.name ? null : table.name)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Table className="w-4 h-4 text-blue-400" />
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-semibold text-white">{table.name}</span>
                      <span className={`px-2 py-0.5 text-xs rounded border ${categoryColors[table.category]}`}>
                        {table.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{table.description}</p>
                  </div>
                </div>
                {expandedTable === table.name ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {/* Table Columns */}
              {expandedTable === table.name && (
                <div className="border-t border-slate-700/40 p-4 bg-slate-900/30">
                  <div className="space-y-1.5">
                    {table.columns.map((col, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-slate-800/50"
                      >
                        {col.isPrimary && <Key className="w-3 h-3 text-amber-400" />}
                        {col.isForeign && <Link2 className="w-3 h-3 text-blue-400" />}
                        {!col.isPrimary && !col.isForeign && <div className="w-3" />}
                        <span className="font-mono text-xs text-slate-300">{col.name}</span>
                        <span className="font-mono text-xs text-slate-500 ml-auto">{col.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-5 rounded-xl bg-slate-800/30 border border-slate-700/40">
            <Shield className="w-5 h-5 text-blue-400 mb-2" />
            <h4 className="font-semibold text-white text-sm mb-1">Row Level Security</h4>
            <p className="text-xs text-slate-400">
              Chaque utilisateur ne voit que ses propres données. Multi-tenancy sécurisé natif.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-slate-800/30 border border-slate-700/40">
            <Zap className="w-5 h-5 text-blue-400 mb-2" />
            <h4 className="font-semibold text-white text-sm mb-1">Optimisé Performance</h4>
            <p className="text-xs text-slate-400">
              Index B-tree, GIN, GiST. Vues matérialisées et requêtes optimisées.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-slate-800/30 border border-slate-700/40">
            <Database className="w-5 h-5 text-blue-400 mb-2" />
            <h4 className="font-semibold text-white text-sm mb-1">Audit Complet</h4>
            <p className="text-xs text-slate-400">
              Triggers auto-update, soft deletes, et journal d'activité détaillé.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
