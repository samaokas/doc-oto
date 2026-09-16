-- ============================================================================
-- Doc-OTO Database Schema
-- PostgreSQL 15+
-- Vehicle Maintenance & Fleet Management SaaS
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE user_role AS ENUM ('admin', 'particular_owner', 'company_fleet');
CREATE TYPE user_status AS ENUM ('active', 'suspended', 'pending', 'deleted');
CREATE TYPE subscription_tier AS ENUM ('free', 'commercial', 'enterprise');
CREATE TYPE subscription_status AS ENUM ('active', 'trialing', 'past_due', 'canceled', 'paused');
CREATE TYPE vehicle_type AS ENUM ('car', 'bus', 'truck');
CREATE TYPE fuel_type AS ENUM ('gasoline', 'diesel', 'lpg', 'electric', 'hybrid');
CREATE TYPE service_category AS ENUM (
    'oil_change', 'filter', 'brakes', 'suspension', 'steering',
    'tires', 'electrical', 'cooling', 'transmission', 'engine',
    'body', 'inspection', 'other'
);
CREATE TYPE tire_position AS ENUM (
    'front_left', 'front_right', 'rear_left', 'rear_right',
    'spare', 'front_inner_left', 'front_inner_right',
    'rear_inner_left', 'rear_inner_right'
);
CREATE TYPE tire_condition AS ENUM ('new', 'good', 'fair', 'worn', 'critical', 'replaced');
CREATE TYPE alert_severity AS ENUM ('info', 'warning', 'critical', 'urgent');
CREATE TYPE alert_type AS ENUM (
    'oil_change', 'technical_control', 'insurance', 
    'tire_wear', 'general_maintenance'
);
CREATE TYPE alert_status AS ENUM ('pending', 'acknowledged', 'resolved', 'dismissed');
CREATE TYPE expense_type AS ENUM (
    'fuel', 'maintenance', 'repair', 'insurance', 'toll',
    'parts', 'tires', 'inspection', 'other'
);
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE import_format AS ENUM ('json', 'csv', 'excel');
CREATE TYPE import_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE vendor_type AS ENUM ('mechanic', 'spare_parts', 'tire_shop', 'inspection_center', 'gas_station');
CREATE TYPE language AS ENUM ('fr', 'ar', 'en');

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMPTZ,
    password_hash VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'particular_owner',
    status user_status NOT NULL DEFAULT 'pending',
    language language NOT NULL DEFAULT 'fr',
    timezone VARCHAR(50) DEFAULT 'Africa/Algiers',
    
    -- OAuth providers
    github_id VARCHAR(100) UNIQUE,
    google_id VARCHAR(100) UNIQUE,
    
    -- Company info (for fleet accounts)
    company_name VARCHAR(255),
    company_nif VARCHAR(50), -- Numéro d'Identification Fiscale (Algeria)
    company_address TEXT,
    
    -- Metadata
    last_login_at TIMESTAMPTZ,
    last_login_ip INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_github_id ON users(github_id) WHERE github_id IS NOT NULL;
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);

-- Subscriptions
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tier subscription_tier NOT NULL DEFAULT 'free',
    status subscription_status NOT NULL DEFAULT 'active',
    vehicle_limit INTEGER NOT NULL DEFAULT 3,
    current_period_start TIMESTAMPTZ NOT NULL,
    current_period_end TIMESTAMPTZ,
    trial_ends_at TIMESTAMPTZ,
    canceled_at TIMESTAMPTZ,
    stripe_subscription_id VARCHAR(255) UNIQUE,
    stripe_customer_id VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(user_id)
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- Wilayas (Algerian provinces - 69 since November 2025, 58 since 2019, previously 48)
CREATE TABLE wilayas (
    code INTEGER PRIMARY KEY,
    name_fr VARCHAR(100) NOT NULL,
    name_ar VARCHAR(100) NOT NULL,
    name_en VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Vehicles
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Basic info
    name VARCHAR(100) NOT NULL, -- User-given name (e.g., "Ma Clio")
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM NOW()) + 1),
    vehicle_type vehicle_type NOT NULL,
    fuel_type fuel_type NOT NULL,
    
    -- Identification
    license_plate VARCHAR(20) NOT NULL,
    vin VARCHAR(17) UNIQUE, -- Vehicle Identification Number
    registration_number VARCHAR(50), -- Carte grise number
    
    -- Specs
    engine_capacity_cc INTEGER,
    horsepower INTEGER,
    mileage INTEGER NOT NULL DEFAULT 0 CHECK (mileage >= 0),
    
    -- Configuration
    oil_change_interval_km INTEGER NOT NULL DEFAULT 10000,
    oil_change_interval_months INTEGER NOT NULL DEFAULT 12,
    
    -- Assignment (for fleet)
    assigned_driver_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Status
    is_active BOOLEAN NOT NULL DEFAULT true,
    
    -- Metadata
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_vehicles_user_id ON vehicles(user_id);
CREATE INDEX idx_vehicles_license_plate ON vehicles(license_plate);
CREATE INDEX idx_vehicles_vin ON vehicles(vin) WHERE vin IS NOT NULL;
CREATE INDEX idx_vehicles_assigned_driver ON vehicles(assigned_driver_id);

-- ============================================================================
-- ALERTS & COUNTDOWNS
-- ============================================================================

-- Technical control (Contrôle Technique)
CREATE TABLE technical_controls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    
    control_date DATE NOT NULL,
    next_control_date DATE NOT NULL,
    result VARCHAR(50), -- "favorable", "défavorable", "contre-visite"
    center_name VARCHAR(255),
    center_wilaya INTEGER REFERENCES wilayas(code),
    inspector_name VARCHAR(255),
    certificate_number VARCHAR(100),
    notes TEXT,
    document_url TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_technical_controls_vehicle ON technical_controls(vehicle_id);
CREATE INDEX idx_technical_controls_next_date ON technical_controls(next_control_date);

-- Insurance policies
CREATE TABLE insurance_policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    
    provider_name VARCHAR(255) NOT NULL,
    policy_number VARCHAR(100) NOT NULL,
    coverage_type VARCHAR(100), -- "tiers", "tous risques", etc.
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    premium_amount DECIMAL(10, 2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'DZD',
    deductible DECIMAL(10, 2),
    
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    document_url TEXT,
    notes TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_insurance_vehicle ON insurance_policies(vehicle_id);
CREATE INDEX idx_insurance_end_date ON insurance_policies(end_date);

-- Oil change tracking
CREATE TABLE oil_changes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    
    change_date DATE NOT NULL,
    mileage_at_change INTEGER NOT NULL CHECK (mileage_at_change >= 0),
    next_change_mileage INTEGER NOT NULL,
    next_change_date DATE,
    
    oil_brand VARCHAR(100),
    oil_type VARCHAR(50), -- "5W-30", "10W-40", etc.
    oil_volume_liters DECIMAL(4, 2),
    filter_replaced BOOLEAN NOT NULL DEFAULT false,
    filter_brand VARCHAR(100),
    
    workshop_name VARCHAR(255),
    workshop_wilaya INTEGER REFERENCES wilayas(code),
    cost DECIMAL(10, 2),
    
    notes TEXT,
    receipt_url TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_oil_changes_vehicle ON oil_changes(vehicle_id);
CREATE INDEX idx_oil_changes_next_mileage ON oil_changes(next_change_mileage);

-- Unified alerts system
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
    
    alert_type alert_type NOT NULL,
    severity alert_severity NOT NULL DEFAULT 'info',
    status alert_status NOT NULL DEFAULT 'pending',
    
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    
    -- Countdown data
    trigger_date DATE,
    trigger_mileage INTEGER,
    threshold_value INTEGER, -- days or km
    current_value INTEGER, -- remaining days or km
    
    -- Notification tracking
    notified_at TIMESTAMPTZ,
    acknowledged_at TIMESTAMPTZ,
    resolved_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_alerts_user ON alerts(user_id);
CREATE INDEX idx_alerts_vehicle ON alerts(vehicle_id);
CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_alerts_severity ON alerts(severity);
CREATE INDEX idx_alerts_trigger_date ON alerts(trigger_date);

-- ============================================================================
-- MAINTENANCE & SERVICES
-- ============================================================================

-- Service records
CREATE TABLE service_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    service_date DATE NOT NULL,
    mileage_at_service INTEGER NOT NULL CHECK (mileage_at_service >= 0),
    category service_category NOT NULL,
    
    -- Location
    workshop_name VARCHAR(255),
    workshop_wilaya INTEGER REFERENCES wilayas(code),
    workshop_address TEXT,
    mechanic_name VARCHAR(255),
    
    -- Service details
    description TEXT NOT NULL,
    labor_cost DECIMAL(10, 2) DEFAULT 0,
    parts_cost DECIMAL(10, 2) DEFAULT 0,
    total_cost DECIMAL(10, 2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'DZD',
    
    -- Next service prediction
    next_service_mileage INTEGER,
    next_service_date DATE,
    
    -- Documentation
    invoice_number VARCHAR(100),
    receipt_url TEXT,
    photos TEXT[], -- Array of photo URLs
    
    notes TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_service_records_vehicle ON service_records(vehicle_id);
CREATE INDEX idx_service_records_user ON service_records(user_id);
CREATE INDEX idx_service_records_date ON service_records(service_date);
CREATE INDEX idx_service_records_category ON service_records(category);

-- Spare parts inventory/log
CREATE TABLE spare_parts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    service_record_id UUID REFERENCES service_records(id) ON DELETE SET NULL,
    
    part_name VARCHAR(255) NOT NULL,
    part_number VARCHAR(100), -- OEM reference
    brand VARCHAR(100),
    category VARCHAR(100),
    
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'DZD',
    
    -- Supplier
    supplier_name VARCHAR(255),
    supplier_wilaya INTEGER REFERENCES wilayas(code),
    
    -- Installation
    installed_at TIMESTAMPTZ,
    installed_mileage INTEGER,
    expected_lifespan_km INTEGER,
    warranty_until DATE,
    
    notes TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_spare_parts_vehicle ON spare_parts(vehicle_id);
CREATE INDEX idx_spare_parts_service ON spare_parts(service_record_id);

-- Tires / Pneumatics
CREATE TABLE tires (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    
    position tire_position NOT NULL,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    size VARCHAR(50) NOT NULL, -- e.g., "205/55 R16"
    
    -- Status
    condition tire_condition NOT NULL DEFAULT 'new',
    tread_depth_mm DECIMAL(4, 2),
    pressure_psi DECIMAL(5, 2),
    
    -- Lifecycle
    installed_date DATE NOT NULL,
    installed_mileage INTEGER NOT NULL,
    expected_lifespan_km INTEGER,
    replaced_date DATE,
    replaced_mileage INTEGER,
    
    -- Costs
    purchase_price DECIMAL(10, 2),
    currency CHAR(3) NOT NULL DEFAULT 'DZD',
    
    -- Supplier
    supplier_name VARCHAR(255),
    supplier_wilaya INTEGER REFERENCES wilayas(code),
    
    notes TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tires_vehicle ON tires(vehicle_id);
CREATE INDEX idx_tires_position ON tires(vehicle_id, position);
CREATE INDEX idx_tires_condition ON tires(condition);

-- ============================================================================
-- FUEL & EXPENSES
-- ============================================================================

-- Fuel logs
CREATE TABLE fuel_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    
    fill_date DATE NOT NULL,
    mileage INTEGER NOT NULL CHECK (mileage >= 0),
    
    -- Fuel details
    fuel_type fuel_type NOT NULL,
    volume_liters DECIMAL(6, 2) NOT NULL CHECK (volume_liters > 0),
    price_per_liter DECIMAL(6, 2) NOT NULL CHECK (price_per_liter > 0),
    total_cost DECIMAL(10, 2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'DZD',
    
    -- Calculated
    consumption_l_per_100km DECIMAL(5, 2), -- Auto-calculated
    
    -- Location
    station_name VARCHAR(255),
    station_wilaya INTEGER REFERENCES wilayas(code),
    
    -- Tank status
    tank_level_percent INTEGER CHECK (tank_level_percent >= 0 AND tank_level_percent <= 100),
    full_tank BOOLEAN NOT NULL DEFAULT true,
    
    notes TEXT,
    receipt_url TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_fuel_logs_vehicle ON fuel_logs(vehicle_id);
CREATE INDEX idx_fuel_logs_date ON fuel_logs(fill_date);
CREATE INDEX idx_fuel_logs_mileage ON fuel_logs(mileage);

-- General expenses
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    expense_date DATE NOT NULL,
    expense_type expense_type NOT NULL,
    
    description TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
    currency CHAR(3) NOT NULL DEFAULT 'DZD',
    
    -- Optional link to service record
    service_record_id UUID REFERENCES service_records(id) ON DELETE SET NULL,
    
    -- Vendor
    vendor_name VARCHAR(255),
    vendor_wilaya INTEGER REFERENCES wilayas(code),
    
    -- Documentation
    invoice_number VARCHAR(100),
    receipt_url TEXT,
    photos TEXT[],
    
    notes TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_expenses_vehicle ON expenses(vehicle_id);
CREATE INDEX idx_expenses_user ON expenses(user_id);
CREATE INDEX idx_expenses_date ON expenses(expense_date);
CREATE INDEX idx_expenses_type ON expenses(expense_type);

-- ============================================================================
-- VENDORS DIRECTORY
-- ============================================================================

-- Vendors (mechanics, spare parts shops, etc.)
CREATE TABLE vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    name VARCHAR(255) NOT NULL,
    vendor_type vendor_type NOT NULL,
    description TEXT,
    
    -- Contact
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    
    -- Location
    address TEXT,
    wilaya INTEGER NOT NULL REFERENCES wilayas(code),
    city VARCHAR(100),
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    
    -- Business hours
    opening_hours JSONB, -- e.g., {"monday": "08:00-18:00", ...}
    
    -- Rating
    average_rating DECIMAL(2, 1) CHECK (average_rating >= 0 AND average_rating <= 5),
    total_reviews INTEGER NOT NULL DEFAULT 0,
    
    -- Verification
    is_verified BOOLEAN NOT NULL DEFAULT false,
    verified_at TIMESTAMPTZ,
    
    -- Status
    is_active BOOLEAN NOT NULL DEFAULT true,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_vendors_type ON vendors(vendor_type);
CREATE INDEX idx_vendors_wilaya ON vendors(wilaya);
CREATE INDEX idx_vendors_location ON vendors USING gist (
    ll_to_earth(latitude, longitude)
) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;
CREATE INDEX idx_vendors_name_trgm ON vendors USING gin (name gin_trgm_ops);

-- Vendor reviews
CREATE TABLE vendor_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    
    -- Service details
    service_date DATE,
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
    
    -- Moderation
    is_approved BOOLEAN NOT NULL DEFAULT false,
    approved_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(user_id, vendor_id)
);

CREATE INDEX idx_vendor_reviews_vendor ON vendor_reviews(vendor_id);
CREATE INDEX idx_vendor_reviews_user ON vendor_reviews(user_id);

-- ============================================================================
-- DATA IMPORTS
-- ============================================================================

-- Import jobs
CREATE TABLE import_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    format import_format NOT NULL,
    status import_status NOT NULL DEFAULT 'pending',
    
    -- File info
    original_filename VARCHAR(255) NOT NULL,
    file_size_bytes BIGINT,
    file_url TEXT,
    
    -- Processing
    total_rows INTEGER,
    processed_rows INTEGER DEFAULT 0,
    successful_rows INTEGER DEFAULT 0,
    failed_rows INTEGER DEFAULT 0,
    
    -- Results
    error_log JSONB,
    mapping_config JSONB, -- Column mapping configuration
    
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_import_jobs_user ON import_jobs(user_id);
CREATE INDEX idx_import_jobs_status ON import_jobs(status);

-- ============================================================================
-- PAYMENTS & BILLING
-- ============================================================================

-- Payment history
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
    
    amount DECIMAL(10, 2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'DZD',
    status payment_status NOT NULL DEFAULT 'pending',
    
    -- Payment method
    payment_method VARCHAR(50), -- "stripe", "ccp", "baridimob", etc.
    transaction_id VARCHAR(255),
    
    -- Dates
    paid_at TIMESTAMPTZ,
    
    -- Invoice
    invoice_number VARCHAR(100),
    invoice_url TEXT,
    
    notes TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_date ON payments(created_at);

-- ============================================================================
-- AUDIT & ACTIVITY LOG
-- ============================================================================

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id UUID,
    
    -- Changes
    old_values JSONB,
    new_values JSONB,
    
    -- Context
    ip_address INET,
    user_agent TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
DO $$ 
DECLARE
    t TEXT;
BEGIN
    FOR t IN 
        SELECT table_name 
        FROM information_schema.columns 
        WHERE column_name = 'updated_at' 
        AND table_schema = 'public'
    LOOP
        EXECUTE format('
            CREATE TRIGGER update_%I_updated_at
            BEFORE UPDATE ON %I
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column()
        ', t, t);
    END LOOP;
END;
$$;

-- ============================================================================
-- VIEWS
-- ============================================================================

-- Vehicle summary view
CREATE VIEW vehicle_summary AS
SELECT 
    v.id,
    v.name,
    v.brand,
    v.model,
    v.year,
    v.vehicle_type,
    v.mileage,
    v.license_plate,
    u.id as owner_id,
    u.full_name as owner_name,
    u.email as owner_email,
    
    -- Last oil change
    (SELECT change_date FROM oil_changes 
     WHERE vehicle_id = v.id 
     ORDER BY change_date DESC LIMIT 1) as last_oil_change_date,
    
    -- Next oil change
    (SELECT next_change_mileage FROM oil_changes 
     WHERE vehicle_id = v.id 
     ORDER BY change_date DESC LIMIT 1) as next_oil_change_mileage,
    
    -- Insurance expiry
    (SELECT end_date FROM insurance_policies 
     WHERE vehicle_id = v.id 
     ORDER BY end_date DESC LIMIT 1) as insurance_expiry,
    
    -- Technical control
    (SELECT next_control_date FROM technical_controls 
     WHERE vehicle_id = v.id 
     ORDER BY next_control_date DESC LIMIT 1) as next_technical_control,
    
    -- Total expenses this year
    (SELECT COALESCE(SUM(total_cost), 0) FROM expenses 
     WHERE vehicle_id = v.id 
     AND EXTRACT(YEAR FROM expense_date) = EXTRACT(YEAR FROM NOW())) as yearly_expenses,
    
    -- Average fuel consumption
    (SELECT AVG(consumption_l_per_100km) FROM fuel_logs 
     WHERE vehicle_id = v.id 
     AND consumption_l_per_100km IS NOT NULL
     AND fill_date >= NOW() - INTERVAL '3 months') as avg_consumption_l_100km

FROM vehicles v
JOIN users u ON v.user_id = u.id
WHERE v.deleted_at IS NULL;

-- User dashboard view
CREATE VIEW user_dashboard AS
SELECT 
    u.id,
    u.full_name,
    u.email,
    u.role,
    s.tier as subscription_tier,
    s.status as subscription_status,
    
    -- Vehicle count
    (SELECT COUNT(*) FROM vehicles 
     WHERE user_id = u.id AND deleted_at IS NULL) as vehicle_count,
    
    -- Active alerts
    (SELECT COUNT(*) FROM alerts 
     WHERE user_id = u.id AND status = 'pending') as active_alerts_count,
    
    -- Critical alerts
    (SELECT COUNT(*) FROM alerts 
     WHERE user_id = u.id AND status = 'pending' AND severity = 'critical') as critical_alerts_count,
    
    -- Total expenses this month
    (SELECT COALESCE(SUM(amount), 0) FROM expenses 
     WHERE user_id = u.id 
     AND expense_date >= DATE_TRUNC('month', NOW())) as monthly_expenses

FROM users u
LEFT JOIN subscriptions s ON s.user_id = u.id
WHERE u.deleted_at IS NULL;

-- ============================================================================
-- ROW LEVEL SECURITY (for Supabase compatibility)
-- ============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE fuel_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY users_self_policy ON users
    FOR ALL USING (auth.uid() = id);

-- Users can manage their own vehicles
CREATE POLICY vehicles_owner_policy ON vehicles
    FOR ALL USING (auth.uid() = user_id);

-- Users can manage their own service records
CREATE POLICY service_records_owner_policy ON service_records
    FOR ALL USING (auth.uid() = user_id);

-- Users can manage their own expenses
CREATE POLICY expenses_owner_policy ON expenses
    FOR ALL USING (auth.uid() = user_id);

-- Users can manage their own fuel logs
CREATE POLICY fuel_logs_owner_policy ON fuel_logs
    FOR ALL USING (
        vehicle_id IN (
            SELECT id FROM vehicles WHERE user_id = auth.uid()
        )
    );

-- Users can see their own alerts
CREATE POLICY alerts_owner_policy ON alerts
    FOR ALL USING (auth.uid() = user_id);

-- Admins can see everything
CREATE POLICY admin_all_users ON users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Calculate fuel consumption
CREATE OR REPLACE FUNCTION calculate_fuel_consumption(p_vehicle_id UUID)
RETURNS DECIMAL(5, 2) AS $$
DECLARE
    result DECIMAL(5, 2);
BEGIN
    SELECT AVG(consumption_l_per_100km) INTO result
    FROM fuel_logs
    WHERE vehicle_id = p_vehicle_id
    AND consumption_l_per_100km IS NOT NULL
    AND fill_date >= NOW() - INTERVAL '3 months';
    
    RETURN COALESCE(result, 0);
END;
$$ LANGUAGE plpgsql;

-- Get next oil change info
CREATE OR REPLACE FUNCTION get_next_oil_change(p_vehicle_id UUID)
RETURNS TABLE (
    next_mileage INTEGER,
    next_date DATE,
    remaining_km INTEGER,
    remaining_days INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        oc.next_change_mileage,
        oc.next_change_date,
        GREATEST(0, oc.next_change_mileage - v.mileage) as remaining_km,
        GREATEST(0, oc.next_change_date - CURRENT_DATE) as remaining_days
    FROM oil_changes oc
    JOIN vehicles v ON v.id = oc.vehicle_id
    WHERE oc.vehicle_id = p_vehicle_id
    ORDER BY oc.change_date DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Generate monthly expense report
CREATE OR REPLACE FUNCTION generate_monthly_report(
    p_user_id UUID,
    p_year INTEGER,
    p_month INTEGER
)
RETURNS TABLE (
    expense_type TEXT,
    total_amount DECIMAL,
    transaction_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e.expense_type::TEXT,
        SUM(e.amount) as total_amount,
        COUNT(*) as transaction_count
    FROM expenses e
    JOIN vehicles v ON v.id = e.vehicle_id
    WHERE v.user_id = p_user_id
    AND EXTRACT(YEAR FROM e.expense_date) = p_year
    AND EXTRACT(MONTH FROM e.expense_date) = p_month
    AND e.deleted_at IS NULL
    GROUP BY e.expense_type;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE users IS 'Platform users with different roles';
COMMENT ON TABLE vehicles IS 'Vehicles owned by users';
COMMENT ON TABLE technical_controls IS 'Algerian mandatory vehicle inspections';
COMMENT ON TABLE insurance_policies IS 'Vehicle insurance policies';
COMMENT ON TABLE oil_changes IS 'Oil change maintenance records';
COMMENT ON TABLE alerts IS 'Unified alert system for all countdowns';
COMMENT ON TABLE service_records IS 'General maintenance and service records';
COMMENT ON TABLE spare_parts IS 'Spare parts used in services';
COMMENT ON TABLE tires IS 'Tire tracking with position and wear';
COMMENT ON TABLE fuel_logs IS 'Fuel refill records with consumption calculation';
COMMENT ON TABLE expenses IS 'General vehicle expenses';
COMMENT ON TABLE vendors IS 'Algerian vendor directory';
COMMENT ON TABLE wilayas IS 'Algerian provinces (69 wilayas - updated November 2025)';
