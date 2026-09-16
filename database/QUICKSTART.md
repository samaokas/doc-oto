# 🚀 Guide de démarrage rapide - Doc-OTO Database

## Installation en 5 minutes

### Option 1 : PostgreSQL Local (Recommandé pour développement)

```bash
# 1. Installer PostgreSQL 15+
# macOS
brew install postgresql@15

# Ubuntu/Debian
sudo apt-get install postgresql-15

# Windows : télécharger depuis https://www.postgresql.org/download/windows/

# 2. Démarrer PostgreSQL
brew services start postgresql@15  # macOS
sudo systemctl start postgresql    # Linux

# 3. Créer la base de données
psql -U postgres << EOF
CREATE DATABASE doc_oto;
CREATE USER doc_oto WITH PASSWORD 'doc_oto_2026';
GRANT ALL PRIVILEGES ON DATABASE doc_oto TO doc_oto;
EOF

# 4. Appliquer le schéma
psql -U doc_oto -d doc_oto -f database/schema.sql

# 5. Charger les données de démo
psql -U doc_oto -d doc_oto -f database/seed.sql

# 6. Vérifier l'installation
psql -U doc_oto -d doc_oto -c "SELECT COUNT(*) FROM wilayas;"
# Résultat attendu : 58
```

### Option 2 : Supabase (Recommandé pour production)

```bash
# 1. Installer Supabase CLI
npm install -g supabase

# 2. Se connecter à Supabase
npx supabase login

# 3. Lier votre projet
npx supabase link --project-ref YOUR_PROJECT_REF

# 4. Pousser le schéma
npx supabase db push

# 5. Charger les données
npx supabase db execute -f database/seed.sql
```

### Option 3 : Docker (Isolé et reproductible)

```bash
# 1. Créer un fichier docker-compose.yml
cat > docker-compose.yml << EOF
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: doc_oto
      POSTGRES_USER: doc_oto
      POSTGRES_PASSWORD: doc_oto_2026
    ports:
      - "5432:5432"
    volumes:
      - ./database/schema.sql:/docker-entrypoint-initdb.d/01-schema.sql
      - ./database/seed.sql:/docker-entrypoint-initdb.d/02-seed.sql
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
EOF

# 2. Démarrer
docker-compose up -d

# 3. Attendre que PostgreSQL soit prêt
sleep 5

# 4. Vérifier
docker-compose exec postgres psql -U doc_oto -d doc_oto -c "SELECT COUNT(*) FROM wilayas;"
```

---

## 🔑 Connexion à la base

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
# PostgreSQL
DATABASE_URL=postgresql://doc_oto:doc_oto_2026@localhost:5432/doc_oto

# Ou décomposé
DB_HOST=localhost
DB_PORT=5432
DB_NAME=doc_oto
DB_USER=doc_oto
DB_PASSWORD=doc_oto_2026

# Supabase (si utilisé)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
```

### Connexion directe

```bash
# Ligne de commande
psql -h localhost -U doc_oto -d doc_oto

# Ou avec DATABASE_URL
psql $DATABASE_URL
```

### Avec Node.js

```bash
# Installer les dépendances
npm install pg dotenv
# ou
npm install @supabase/supabase-js dotenv
```

**PostgreSQL natif :**
```typescript
// db.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Utilisation
const result = await pool.query('SELECT * FROM vehicles WHERE user_id = $1', [userId]);
```

**Supabase :**
```typescript
// db.ts
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Utilisation
const { data, error } = await supabase
  .from('vehicles')
  .select('*')
  .eq('user_id', userId);
```

---

## 📊 Requêtes utiles

### Dashboard utilisateur

```sql
-- Obtenir le résumé d'un utilisateur
SELECT * FROM user_dashboard WHERE id = 'user-uuid';

-- Compter les véhicules
SELECT COUNT(*) FROM vehicles WHERE user_id = 'user-uuid' AND deleted_at IS NULL;

-- Alertes actives
SELECT * FROM alerts 
WHERE user_id = 'user-uuid' 
  AND status = 'pending' 
ORDER BY severity DESC, created_at DESC;
```

### Véhicules

```sql
-- Liste des véhicules avec résumé
SELECT * FROM vehicle_summary WHERE owner_id = 'user-uuid';

-- Prochaine vidange
SELECT * FROM get_next_oil_change('vehicle-uuid');

-- Consommation moyenne
SELECT calculate_fuel_consumption('vehicle-uuid') as avg_l_100km;
```

### Rapports

```sql
-- Rapport mensuel
SELECT * FROM generate_monthly_report('user-uuid', 2026, 3);

-- Dépenses par type (année en cours)
SELECT 
  expense_type,
  SUM(amount) as total,
  COUNT(*) as count
FROM expenses e
JOIN vehicles v ON v.id = e.vehicle_id
WHERE v.user_id = 'user-uuid'
  AND EXTRACT(YEAR FROM expense_date) = EXTRACT(YEAR FROM NOW())
GROUP BY expense_type
ORDER BY total DESC;
```

### Vendors

```sql
-- Vendors par wilaya avec notation
SELECT 
  v.name,
  v.vendor_type,
  v.average_rating,
  v.total_reviews,
  w.name_fr as wilaya
FROM vendors v
JOIN wilayas w ON w.code = v.wilaya
WHERE v.wilaya = 16  -- Alger
  AND v.is_active = true
ORDER BY v.average_rating DESC NULLS LAST;
```

---

## 🧪 Données de test

### Comptes disponibles

```
Admin:
  Email: admin@doc-oto.dz
  Password: Admin@2026
  Rôle: admin

Utilisateur démo:
  Email: demo@doc-oto.dz
  Password: Demo@2026
  Rôle: particular_owner
  Véhicules: 2 (Renault Clio + Toyota Hilux)
```

### Vérifier les données

```sql
-- Compter les enregistrements
SELECT 
  (SELECT COUNT(*) FROM wilayas) as wilayas,
  (SELECT COUNT(*) FROM users) as users,
  (SELECT COUNT(*) FROM vehicles) as vehicles,
  (SELECT COUNT(*) FROM vendors) as vendors,
  (SELECT COUNT(*) FROM alerts) as alerts;

-- Voir les véhicules de démo
SELECT 
  v.name,
  v.brand || ' ' || v.model as vehicle,
  v.license_plate,
  v.mileage || ' km' as mileage
FROM vehicles v
WHERE v.user_id = '00000000-0000-0000-0000-000000000002';
```

---

## 🔧 Dépannage

### Erreur : "database does not exist"
```bash
# Créer la base
createdb doc_oto
```

### Erreur : "permission denied"
```bash
# Donner les permissions
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE doc_oto TO doc_oto;"
psql -U postgres -d doc_oto -c "GRANT ALL ON ALL TABLES IN SCHEMA public TO doc_oto;"
```

### Erreur : "extension uuid-ossp does not exist"
```bash
# Installer les extensions contrib
# Ubuntu/Debian
sudo apt-get install postgresql-contrib

# macOS
brew install postgresql  # inclut contrib
```

### Reset complet

```bash
# Supprimer et recréer
psql -U postgres << EOF
DROP DATABASE IF EXISTS doc_oto;
CREATE DATABASE doc_oto;
GRANT ALL PRIVILEGES ON DATABASE doc_oto TO doc_oto;
EOF

# Réappliquer
psql -U doc_oto -d doc_oto -f database/schema.sql
psql -U doc_oto -d doc_oto -f database/seed.sql
```

---

## 📚 Ressources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/15/)
- [Supabase Docs](https://supabase.com/docs)
- [pgAdmin (GUI)](https://www.pgadmin.org/)
- [TablePlus (GUI)](https://tableplus.com/)

---

**Besoin d'aide ?** support@doc-oto.dz
