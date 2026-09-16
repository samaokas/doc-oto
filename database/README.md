# 🗄️ Doc-OTO Database Documentation

Base de données PostgreSQL complète pour la plateforme Doc-OTO de gestion de véhicules et flottes automobiles en Algérie.

## 📋 Sommaire

- [Architecture](#architecture)
- [Schéma Entité-Relation](#schéma-entité-relation)
- [Tables Principales](#tables-principales)
- [Installation](#installation)
- [Seed Data](#seed-data)
- [API & Requêtes](#api--requêtes)
- [Sécurité](#sécurité)
- [Performance](#performance)

---

## 🏗️ Architecture

### Stack Technique
- **Database**: PostgreSQL 15+
- **Extensions**: uuid-ossp, pgcrypto, pg_trgm
- **Auth**: JWT + OAuth 2.0 (GitHub, Google)
- **Row Level Security**: Activé pour multi-tenancy
- **Soft Deletes**: Supporté via `deleted_at`
- **Audit**: Logs complets des modifications

### Diagramme de Schéma

```
┌─────────────────────────────────────────────────────────────────┐
│                         USERS                                   │
├─────────────────────────────────────────────────────────────────┤
│ • id (UUID)                                                     │
│ • email, password_hash                                          │
│ • role (admin/particular_owner/company_fleet)                   │
│ • github_id, google_id (OAuth)                                  │
│ • company_name, company_nif (pour flotte)                       │
└─────────────────────────────────────────────────────────────────┘
         │                    │                    │
         │                    │                    │
         ▼                    ▼                    ▼
┌──────────────┐   ┌──────────────────┐   ┌──────────────┐
│ SUBSCRIPTIONS│   │    VEHICLES      │   │   AUDIT_LOGS │
├──────────────┤   ├──────────────────┤   └──────────────┘
│ • tier       │   │ • brand, model   │
│ • status     │   │ • license_plate  │
│ • limits     │   │ • mileage        │
└──────────────┘   │ • fuel_type      │
                   └──────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   ALERTS     │   │   SERVICES   │   │    FUEL      │
├──────────────┤   ├──────────────┤   ├──────────────┤
│ oil_change   │   │ • category   │   │ • volume     │
│ insurance    │   │ • workshop   │   │ • cost       │
│ control_tech │   │ • cost       │   │ • L/100km    │
│ tire_wear    │   │ • mileage    │   │ • station    │
└──────────────┘   └──────────────┘   └──────────────┘
        │                   │                   │
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  INSURANCE   │   │SPARE PARTS   │   │  EXPENSES    │
├──────────────┤   ├──────────────┤   ├──────────────┤
│ • provider   │   │ • brand      │   │ • type       │
│ • expiry     │   │ • warranty   │   │ • amount     │
│ • coverage   │   │ • lifespan   │   │ • vendor     │
└──────────────┘   └──────────────┘   └──────────────┘
```

---

## 📊 Tables Principales

### Core Tables (14)
| Table | Description |
|-------|-------------|
| `users` | Utilisateurs avec rôles (admin, owner, fleet) |
| `subscriptions` | Abonnements et limites |
| `wilayas` | 69 provinces algériennes (mise à jour novembre 2025) |
| `vehicles` | Véhicules (cars, buses, trucks) |

### Maintenance Tables (6)
| Table | Description |
|-------|-------------|
| `technical_controls` | Contrôle technique (obligatoire en Algérie) |
| `insurance_policies` | Assurances véhicules |
| `oil_changes` | Vidanges et suivi kilométrique |
| `service_records` | Historique complet des services |
| `spare_parts` | Pièces de rechange utilisées |
| `tires` | Pneumatiques avec position et usure |

### Tracking Tables (3)
| Table | Description |
|-------|-------------|
| `alerts` | Système d'alertes unifié |
| `fuel_logs` | Consommation de carburant |
| `expenses` | Dépenses générales |

### Business Tables (5)
| Table | Description |
|-------|-------------|
| `vendors` | Répertoire des fournisseurs algériens |
| `vendor_reviews` | Avis et notations |
| `import_jobs` | Import de données (JSON/CSV/Excel) |
| `payments` | Historique des paiements |
| `audit_logs` | Journal d'audit complet |

**Note** : L'Algérie compte désormais **69 wilayas** depuis novembre 2025, avec la création de 11 nouvelles wilayas (Aflou, El Abiodh Sidi Cheikh, El Aricha, El Kantara, Barika, Boussaâda, Bir El Ater, Ksar Chellala, Messaad, Aïn Oussera, Ksar El Boukhari).

---

## 🚀 Installation

### Prérequis
- PostgreSQL 15+
- Node.js 18+ (pour les migrations)
- Supabase CLI (optionnel, pour RLS)

### 1. Créer la base de données

```bash
# Connectez-vous à PostgreSQL
psql -U postgres

# Créez la base
CREATE DATABASE doc_oto;
CREATE USER doc_oto_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE doc_oto TO doc_oto_user;
\q
```

### 2. Appliquer le schéma

```bash
# Appliquer le schéma
psql -U doc_oto_user -d doc_oto -f database/schema.sql

# Vérifier l'installation
psql -U doc_oto_user -d doc_oto -c "\dt"
```

### 3. Charger les données initiales

```bash
# Charger les wilayas, vendors de démo, etc.
psql -U doc_oto_user -d doc_oto -f database/seed.sql
```

### 4. Avec Supabase (recommandé)

```bash
# Installer Supabase CLI
npm install -g supabase

# Initialiser le projet
supabase init

# Démarrer en local
supabase start

# Appliquer les migrations
supabase db push

# Charger les données
psql -U postgres -p 54322 -d postgres -f database/seed.sql
```

---

## 🌱 Seed Data

Le fichier `seed.sql` contient :

- ✅ **69 wilayas** algériennes (FR/AR/EN) - incluant les 11 nouvelles wilayas créées en novembre 2025 :
  - 59: Aflou, 60: El Abiodh Sidi Cheikh, 61: El Aricha, 62: El Kantara
  - 63: Barika, 64: Boussaâda, 65: Bir El Ater, 66: Ksar Chellala
  - 67: Messaad, 68: Aïn Oussera, 69: Ksar El Boukhari
- ✅ **10 vendors** de démonstration (garages, pièces, pneus)
- ✅ **1 utilisateur admin** (`admin@doc-oto.dz`)
- ✅ **1 utilisateur démo** (`demo@doc-oto.dz`)
- ✅ **2 véhicules** de démonstration
- ✅ **Données de test** : vidanges, carburant, services, pneus, alertes

### Comptes de test

```
Admin:
  Email: admin@doc-oto.dz
  Password: Admin@2026 (CHANGEZ EN PRODUCTION!)

Utilisateur:
  Email: demo@doc-oto.dz
  Password: Demo@2026
  Véhicules: Renault Clio + Toyota Hilux
```

---

## 🔌 API & Requêtes

### Exemples de requêtes utiles

#### Dashboard utilisateur
```sql
SELECT * FROM user_dashboard WHERE id = 'user-uuid';
```

#### Résumé véhicule
```sql
SELECT * FROM vehicle_summary WHERE id = 'vehicle-uuid';
```

#### Alerte critique du jour
```sql
SELECT a.*, v.name as vehicle_name, v.license_plate
FROM alerts a
JOIN vehicles v ON v.id = a.vehicle_id
WHERE a.user_id = 'user-uuid'
  AND a.status = 'pending'
  AND a.severity IN ('critical', 'urgent')
ORDER BY a.created_at DESC;
```

#### Rapport mensuel des dépenses
```sql
SELECT * FROM generate_monthly_report('user-uuid', 2026, 3);
```

#### Consommation moyenne de carburant
```sql
SELECT calculate_fuel_consumption('vehicle-uuid') as avg_l_100km;
```

#### Prochaine vidange
```sql
SELECT * FROM get_next_oil_change('vehicle-uuid');
```

#### Vendors par wilaya
```sql
SELECT v.*, w.name_fr as wilaya_name
FROM vendors v
JOIN wilayas w ON w.code = v.wilaya
WHERE v.wilaya = 16  -- Alger
  AND v.is_active = true
ORDER BY v.average_rating DESC NULLS LAST;
```

---

## 🔒 Sécurité

### Row Level Security (RLS)

Activé sur les tables sensibles :
- `users` - Chaque utilisateur ne voit que son profil
- `vehicles` - Propriétaires voient leurs véhicules
- `service_records` - Historique personnel
- `expenses` - Dépenses personnelles
- `fuel_logs` - Via les véhicules associés
- `alerts` - Alertes personnelles

### Bonnes pratiques

1. **Ne jamais exposer** les Client Secrets côté client
2. **Utiliser HTTPS** en production
3. **Valider les tokens** JWT côté backend
4. **Limiter les requêtes** (rate limiting)
5. **Chiffrer** les données sensibles (AES-256)
6. **Auditer** toutes les actions critiques

---

## ⚡ Performance

### Index créés

- **B-tree** sur les clés étrangères et colonnes fréquemment interrogées
- **GIN** pour la recherche full-text (noms de vendors)
- **GiST** pour les requêtes géographiques (latitude/longitude)
- **Partial indexes** pour les données non-supprimées

### Optimisations

```sql
-- Vue optimisée pour le dashboard
CREATE MATERIALIZED VIEW dashboard_stats AS
SELECT ...
REFRESH MATERIALIZED VIEW CONCURRENTLY dashboard_stats;

-- Partitionnement pour les logs (future)
-- CREATE TABLE audit_logs PARTITION BY RANGE (created_at);
```

### Monitoring

```sql
-- Requêtes lentes
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Index inutilisés
SELECT schemaname, tablename, indexname
FROM pg_stat_user_indexes
WHERE idx_scan = 0;
```

---

## 📦 Structure des fichiers

```
database/
├── README.md              # Cette documentation
├── schema.sql             # Schéma complet PostgreSQL
├── seed.sql               # Données initiales (wilayas, démo)
└── types.ts               # Types TypeScript pour le frontend
```

---

## 🔧 Maintenance

### Backup

```bash
# Backup complet
pg_dump -U doc_oto_user -d doc_oto -F c -f backup_$(date +%Y%m%d).dump

# Restaurer
pg_restore -U doc_oto_user -d doc_oto backup_20260301.dump
```

### Migrations

Pour les évolutions futures, créer des fichiers de migration :

```sql
-- migrations/001_add_notifications_table.sql
-- migrations/002_add_fleet_drivers_table.sql
```

---

## 📚 Ressources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/15/)
- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL Indexes](https://www.postgresql.org/docs/15/indexes.html)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## 🤝 Support

Pour toute question sur la base de données :
- 📧 Email: support@doc-oto.dz
- 📖 Documentation: docs.doc-oto.dz
- 💬 Discord: discord.gg/doc-oto

---

**Dernière mise à jour**: Mars 2026  
**Version**: 1.0.0  
**PostgreSQL**: 15+
