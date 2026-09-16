-- ============================================================================
-- Doc-OTO Database Seed Data
-- Initial data for the Algerian market
-- ============================================================================

-- ============================================================================
-- WILAYAS (69 Algerian provinces - 58 since 2019 + 11 new in November 2025)
-- ============================================================================

INSERT INTO wilayas (code, name_fr, name_ar, name_en) VALUES
(1, 'Adrar', 'أدرار', 'Adrar'),
(2, 'Chlef', 'الشلف', 'Chlef'),
(3, 'Laghouat', 'الأغواط', 'Laghouat'),
(4, 'Oum El Bouaghi', 'أم البواقي', 'Oum El Bouaghi'),
(5, 'Batna', 'باتنة', 'Batna'),
(6, 'Béjaïa', 'بجاية', 'Bejaia'),
(7, 'Biskra', 'بسكرة', 'Biskra'),
(8, 'Béchar', 'بشار', 'Bechar'),
(9, 'Blida', 'البليدة', 'Blida'),
(10, 'Bouira', 'البويرة', 'Bouira'),
(11, 'Tamanrasset', 'تمنراست', 'Tamanrasset'),
(12, 'Tébessa', 'تبسة', 'Tebessa'),
(13, 'Tlemcen', 'تلمسان', 'Tlemcen'),
(14, 'Tiaret', 'تيارت', 'Tiaret'),
(15, 'Tizi Ouzou', 'تيزي وزو', 'Tizi Ouzou'),
(16, 'Alger', 'الجزائر', 'Algiers'),
(17, 'Djelfa', 'الجلفة', 'Djelfa'),
(18, 'Jijel', 'جيجل', 'Jijel'),
(19, 'Sétif', 'سطيف', 'Setif'),
(20, 'Saïda', 'سعيدة', 'Saida'),
(21, 'Skikda', 'سكيكدة', 'Skikda'),
(22, 'Sidi Bel Abbès', 'سيدي بلعباس', 'Sidi Bel Abbes'),
(23, 'Annaba', 'عنابة', 'Annaba'),
(24, 'Guelma', 'قالمة', 'Guelma'),
(25, 'Constantine', 'قسنطينة', 'Constantine'),
(26, 'Médéa', 'المدية', 'Medea'),
(27, 'Mostaganem', 'مستغانم', 'Mostaganem'),
(28, 'M''Sila', 'المسيلة', 'Msila'),
(29, 'Mascara', 'معسكر', 'Mascara'),
(30, 'Ouargla', 'ورقلة', 'Ouargla'),
(31, 'Oran', 'وهران', 'Oran'),
(32, 'El Bayadh', 'البيض', 'El Bayadh'),
(33, 'Illizi', 'إليزي', 'Illizi'),
(34, 'Bordj Bou Arréridj', 'برج بوعريريج', 'Bordj Bou Arreridj'),
(35, 'Boumerdès', 'بومرداس', 'Boumerdes'),
(36, 'El Tarf', 'الطارف', 'El Tarf'),
(37, 'Tindouf', 'تندوف', 'Tindouf'),
(38, 'Tissemsilt', 'تيسمسيلت', 'Tissemsilt'),
(39, 'El Oued', 'الوادي', 'El Oued'),
(40, 'Khenchela', 'خنشلة', 'Khenchela'),
(41, 'Souk Ahras', 'سوق أهراس', 'Souk Ahras'),
(42, 'Tipaza', 'تيبازة', 'Tipaza'),
(43, 'Mila', 'ميلة', 'Mila'),
(44, 'Aïn Defla', 'عين الدفلى', 'Ain Defla'),
(45, 'Naâma', 'النعامة', 'Naama'),
(46, 'Aïn Témouchent', 'عين تموشنت', 'Ain Temouchent'),
(47, 'Ghardaïa', 'غرداية', 'Ghardaia'),
(48, 'Relizane', 'غليزان', 'Relizane'),
(49, 'El M''Ghair', 'المغير', 'El Mghair'),
(50, 'El Meniaa', 'المنيعة', 'El Meniaa'),
(51, 'Ouled Djellal', 'أولاد جلال', 'Ouled Djellal'),
(52, 'Bordj Badji Mokhtar', 'برج باجي مختار', 'Bordj Badji Mokhtar'),
(53, 'Béni Abbès', 'بني عباس', 'Beni Abbes'),
(54, 'Timimoun', 'تيميمون', 'Timimoun'),
(55, 'Touggourt', 'تقرت', 'Touggourt'),
(56, 'Djanet', 'جانت', 'Djanet'),
(57, 'In Salah', 'عين صالح', 'In Salah'),
(58, 'In Guezzam', 'عين قزام', 'In Guezzam'),
-- 11 nouvelles wilayas créées en novembre 2025
(59, 'Aflou', 'أفلو', 'Aflou'),
(60, 'El Abiodh Sidi Cheikh', 'البيضح سيدي الشيخ', 'El Abiodh Sidi Cheikh'),
(61, 'El Aricha', 'العريشة', 'El Aricha'),
(62, 'El Kantara', 'القنطرة', 'El Kantara'),
(63, 'Barika', 'بريكة', 'Barika'),
(64, 'Boussaâda', 'بوسعادة', 'Boussada'),
(65, 'Bir El Ater', 'بئر العاتر', 'Bir El Ater'),
(66, 'Ksar Chellala', 'قصر الشلالة', 'Ksar Chellala'),
(67, 'Messaad', 'مسعد', 'Messaad'),
(68, 'Aïn Oussera', 'عين وسارة', 'Ain Oussera'),
(69, 'Ksar El Boukhari', 'قصر البخاري', 'Ksar El Boukhari');

-- ============================================================================
-- DEFAULT ADMIN USER (password: Admin@2026 - CHANGE IN PRODUCTION!)
-- Hash generated with: SELECT crypt('Admin@2026', gen_salt('bf'));
-- ============================================================================

INSERT INTO users (
    id,
    email,
    email_verified_at,
    password_hash,
    full_name,
    role,
    status,
    language
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'admin@doc-oto.dz',
    NOW(),
    '$2b$10$EXAMPLE_HASH_REPLACE_IN_PRODUCTION',
    'Doc-OTO Administrator',
    'admin',
    'active',
    'fr'
);

-- ============================================================================
-- SAMPLE VENDORS (Algerian mechanic shops & spare parts)
-- ============================================================================

INSERT INTO vendors (name, vendor_type, description, phone, wilaya, city, is_verified, average_rating) VALUES
('Garage Central Alger', 'mechanic', 'Garage généraliste spécialisé toutes marques', '+213 21 XX XX XX', 16, 'Alger Centre', true, 4.5),
('Auto Pièces Oran', 'spare_parts', 'Pièces détachées toutes marques - Import & local', '+213 41 XX XX XX', 31, 'Oran', true, 4.2),
('Pneus Express Constantine', 'tire_shop', 'Vente et montage de pneumatiques toutes marques', '+213 25 XX XX XX', 25, 'Constantine', true, 4.7),
('Contrôle Technique Blida', 'inspection_center', 'Centre agréé de contrôle technique', '+213 25 XX XX XX', 9, 'Blida', true, 4.0),
('Station Total Annaba', 'gas_station', 'Station service 24/7 - Carburants et services', '+213 38 XX XX XX', 23, 'Annaba', true, 4.3),
('Garage Moderne Sétif', 'mechanic', 'Mécanique générale, électricité, climatisation', '+213 36 XX XX XX', 19, 'Sétif', true, 4.4),
('Pièces Auto Tlemcen', 'spare_parts', 'Spécialiste pièces Renault, Peugeot, Citroën', '+213 43 XX XX XX', 13, 'Tlemcen', false, 3.9),
('Naftal Béjaïa', 'gas_station', 'Station service Naftal - Carburants et lubrifiants', '+213 34 XX XX XX', 6, 'Béjaïa', true, 4.1),
('Garage El Djazair', 'mechanic', 'Réparation toutes marques - Diagnostic électronique', '+213 21 XX XX XX', 16, 'Bab Ezzouar', true, 4.6),
('Center Pneumatique Batna', 'tire_shop', 'Vente et montage pneus poids lourds et légers', '+213 33 XX XX XX', 5, 'Batna', false, 4.0);

-- ============================================================================
-- SAMPLE USER (for testing)
-- ============================================================================

INSERT INTO users (
    id,
    email,
    email_verified_at,
    password_hash,
    full_name,
    phone,
    role,
    status,
    language
) VALUES (
    '00000000-0000-0000-0000-000000000002',
    'demo@doc-oto.dz',
    NOW(),
    '$2b$10$EXAMPLE_HASH_REPLACE_IN_PRODUCTION',
    'Mohamed Benali',
    '+213 555 123 456',
    'particular_owner',
    'active',
    'fr'
);

-- Sample subscription
INSERT INTO subscriptions (
    user_id,
    tier,
    status,
    vehicle_limit,
    current_period_start,
    current_period_end
) VALUES (
    '00000000-0000-0000-0000-000000000002',
    'free',
    'active',
    3,
    NOW(),
    NOW() + INTERVAL '1 year'
);

-- Sample vehicles
INSERT INTO vehicles (
    id,
    user_id,
    name,
    brand,
    model,
    year,
    vehicle_type,
    fuel_type,
    license_plate,
    mileage,
    oil_change_interval_km,
    oil_change_interval_months
) VALUES
(
    '00000000-0000-0000-0000-000000000010',
    '00000000-0000-0000-0000-000000000002',
    'Ma Clio',
    'Renault',
    'Clio 4',
    2018,
    'car',
    'gasoline',
    '12345-100-16',
    85000,
    10000,
    12
),
(
    '00000000-0000-0000-0000-000000000011',
    '00000000-0000-0000-0000-000000000002',
    'Pick-up Travail',
    'Toyota',
    'Hilux',
    2020,
    'truck',
    'diesel',
    '67890-101-16',
    120000,
    15000,
    12
);

-- Sample oil changes
INSERT INTO oil_changes (
    vehicle_id, change_date, mileage_at_change, next_change_mileage,
    oil_brand, oil_type, oil_volume_liters, filter_replaced,
    workshop_name, workshop_wilaya, cost
) VALUES
(
    '00000000-0000-0000-0000-000000000010',
    NOW() - INTERVAL '6 months',
    75000,
    85000,
    'Total',
    '5W-30',
    4.5,
    true,
    'Garage Central Alger',
    16,
    8500
);

-- Sample fuel logs
INSERT INTO fuel_logs (
    vehicle_id, fill_date, mileage, fuel_type,
    volume_liters, price_per_liter, total_cost,
    consumption_l_per_100km, station_name, station_wilaya, full_tank
) VALUES
(
    '00000000-0000-0000-0000-000000000010',
    NOW() - INTERVAL '30 days',
    82000,
    'gasoline',
    40.00,
    65.50,
    2620.00,
    7.8,
    'Naftal Alger',
    16,
    true
),
(
    '00000000-0000-0000-0000-000000000010',
    NOW() - INTERVAL '15 days',
    83500,
    'gasoline',
    38.50,
    65.50,
    2521.75,
    8.1,
    'Total Bab Ezzouar',
    16,
    true
),
(
    '00000000-0000-0000-0000-000000000010',
    NOW() - INTERVAL '5 days',
    85000,
    'gasoline',
    42.00,
    65.50,
    2751.00,
    7.9,
    'Naftal Alger',
    16,
    true
);

-- Sample technical control
INSERT INTO technical_controls (
    vehicle_id, control_date, next_control_date, result,
    center_name, center_wilaya, certificate_number
) VALUES (
    '00000000-0000-0000-0000-000000000010',
    NOW() - INTERVAL '1 year',
    NOW() + INTERVAL '45 days',
    'favorable',
    'Contrôle Technique Blida',
    9,
    'CT-2025-001234'
);

-- Sample insurance
INSERT INTO insurance_policies (
    vehicle_id, provider_name, policy_number, coverage_type,
    start_date, end_date, premium_amount
) VALUES (
    '00000000-0000-0000-0000-000000000010',
    'SAA Assurances',
    'POL-2025-ALG-789',
    'tous risques',
    NOW() - INTERVAL '6 months',
    NOW() + INTERVAL '6 months',
    45000.00
);

-- Sample service records
INSERT INTO service_records (
    vehicle_id, user_id, service_date, mileage_at_service,
    category, workshop_name, workshop_wilaya,
    description, labor_cost, parts_cost, total_cost
) VALUES
(
    '00000000-0000-0000-0000-000000000010',
    '00000000-0000-0000-0000-000000000002',
    NOW() - INTERVAL '3 months',
    80000,
    'brakes',
    'Garage Central Alger',
    16,
    'Remplacement plaquettes de frein avant + disques',
    5000,
    12000,
    17000
),
(
    '00000000-0000-0000-0000-000000000010',
    '00000000-0000-0000-0000-000000000002',
    NOW() - INTERVAL '1 month',
    83000,
    'tires',
    'Pneus Express Alger',
    16,
    'Remplacement 2 pneus avant Michelin',
    2000,
    28000,
    30000
);

-- Sample expenses
INSERT INTO expenses (
    vehicle_id, user_id, expense_date, expense_type,
    description, amount, vendor_name, vendor_wilaya
) VALUES
(
    '00000000-0000-0000-0000-000000000010',
    '00000000-0000-0000-0000-000000000002',
    NOW() - INTERVAL '2 months',
    'toll',
    'Péage autoroute Est-Ouest',
    400,
    'ANTR',
    16
),
(
    '00000000-0000-0000-0000-000000000010',
    '00000000-0000-0000-0000-000000000002',
    NOW() - INTERVAL '20 days',
    'inspection',
    'Vignette annuelle',
    4000,
    'Wilaya d''Alger',
    16
);

-- Sample tires
INSERT INTO tires (
    vehicle_id, position, brand, model, size,
    condition, tread_depth_mm, pressure_psi,
    installed_date, installed_mileage, expected_lifespan_km,
    purchase_price, supplier_name, supplier_wilaya
) VALUES
(
    '00000000-0000-0000-0000-000000000010',
    'front_left',
    'Michelin',
    'Energy Saver',
    '185/65 R15',
    'good',
    6.5,
    33,
    NOW() - INTERVAL '1 month',
    83000,
    50000,
    14000,
    'Pneus Express Alger',
    16
),
(
    '00000000-0000-0000-0000-000000000010',
    'front_right',
    'Michelin',
    'Energy Saver',
    '185/65 R15',
    'good',
    6.5,
    33,
    NOW() - INTERVAL '1 month',
    83000,
    50000,
    14000,
    'Pneus Express Alger',
    16
),
(
    '00000000-0000-0000-0000-000000000010',
    'rear_left',
    'Michelin',
    'Energy Saver',
    '185/65 R15',
    'fair',
    4.2,
    32,
    NOW() - INTERVAL '8 months',
    72000,
    50000,
    14000,
    'Pneus Express Alger',
    16
),
(
    '00000000-0000-0000-0000-000000000010',
    'rear_right',
    'Michelin',
    'Energy Saver',
    '185/65 R15',
    'fair',
    4.0,
    32,
    NOW() - INTERVAL '8 months',
    72000,
    50000,
    14000,
    'Pneus Express Alger',
    16
);

-- Sample alerts
INSERT INTO alerts (
    user_id, vehicle_id, alert_type, severity, status,
    title, message, trigger_date, threshold_value, current_value
) VALUES
(
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000010',
    'technical_control',
    'warning',
    'pending',
    'Contrôle Technique à planifier',
    'Votre contrôle technique expire dans 45 jours. Prenez rendez-vous rapidement.',
    NOW() + INTERVAL '45 days',
    45,
    45
),
(
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000010',
    'oil_change',
    'info',
    'pending',
    'Vidange à prévoir',
    'Prochaine vidange prévue dans 2 450 km.',
    NULL,
    10000,
    2450
),
(
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000010',
    'insurance',
    'info',
    'pending',
    'Assurance - Renouvellement',
    'Votre assurance expire dans 120 jours.',
    NOW() + INTERVAL '120 days',
    180,
    120
);
