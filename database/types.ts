// ============================================================================
// Doc-OTO Database Types
// TypeScript interfaces mirroring the PostgreSQL schema
// ============================================================================

// ============================================================================
// ENUMS
// ============================================================================

export type UserRole = 'admin' | 'particular_owner' | 'company_fleet';
export type UserStatus = 'active' | 'suspended' | 'pending' | 'deleted';
export type SubscriptionTier = 'free' | 'commercial' | 'enterprise';
export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'paused';
export type VehicleType = 'car' | 'bus' | 'truck';
export type FuelType = 'gasoline' | 'diesel' | 'lpg' | 'electric' | 'hybrid';

export type ServiceCategory =
  | 'oil_change'
  | 'filter'
  | 'brakes'
  | 'suspension'
  | 'steering'
  | 'tires'
  | 'electrical'
  | 'cooling'
  | 'transmission'
  | 'engine'
  | 'body'
  | 'inspection'
  | 'other';

export type TirePosition =
  | 'front_left'
  | 'front_right'
  | 'rear_left'
  | 'rear_right'
  | 'spare'
  | 'front_inner_left'
  | 'front_inner_right'
  | 'rear_inner_left'
  | 'rear_inner_right';

export type TireCondition = 'new' | 'good' | 'fair' | 'worn' | 'critical' | 'replaced';
export type AlertSeverity = 'info' | 'warning' | 'critical' | 'urgent';

export type AlertType =
  | 'oil_change'
  | 'technical_control'
  | 'insurance'
  | 'tire_wear'
  | 'general_maintenance';

export type AlertStatus = 'pending' | 'acknowledged' | 'resolved' | 'dismissed';

export type ExpenseType =
  | 'fuel'
  | 'maintenance'
  | 'repair'
  | 'insurance'
  | 'toll'
  | 'parts'
  | 'tires'
  | 'inspection'
  | 'other';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type ImportFormat = 'json' | 'csv' | 'excel';
export type ImportStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type VendorType = 'mechanic' | 'spare_parts' | 'tire_shop' | 'inspection_center' | 'gas_station';
export type Language = 'fr' | 'ar' | 'en';

// ============================================================================
// BASE INTERFACES
// ============================================================================

export interface BaseEntity {
  id: string; // UUID
  created_at: string; // ISO timestamp
  updated_at: string;
}

export interface SoftDeletable {
  deleted_at: string | null;
}

// ============================================================================
// CORE ENTITIES
// ============================================================================

export interface User extends BaseEntity {
  email: string;
  email_verified_at: string | null;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  status: UserStatus;
  language: Language;
  timezone: string;
  
  // OAuth
  github_id: string | null;
  google_id: string | null;
  
  // Company (for fleet accounts)
  company_name: string | null;
  company_nif: string | null;
  company_address: string | null;
  
  // Metadata
  last_login_at: string | null;
  last_login_ip: string | null;
  deleted_at: string | null;
}

export interface Subscription extends BaseEntity {
  user_id: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  vehicle_limit: number;
  current_period_start: string;
  current_period_end: string | null;
  trial_ends_at: string | null;
  canceled_at: string | null;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
}

export interface Wilaya {
  code: number;
  name_fr: string;
  name_ar: string;
  name_en: string | null;
  created_at: string;
}

export interface Vehicle extends BaseEntity, SoftDeletable {
  user_id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  vehicle_type: VehicleType;
  fuel_type: FuelType;
  license_plate: string;
  vin: string | null;
  registration_number: string | null;
  engine_capacity_cc: number | null;
  horsepower: number | null;
  mileage: number;
  oil_change_interval_km: number;
  oil_change_interval_months: number;
  assigned_driver_id: string | null;
  is_active: boolean;
}

// ============================================================================
// ALERTS & COUNTDOWNS
// ============================================================================

export interface TechnicalControl extends BaseEntity {
  vehicle_id: string;
  control_date: string; // Date
  next_control_date: string;
  result: string | null;
  center_name: string | null;
  center_wilaya: number | null;
  inspector_name: string | null;
  certificate_number: string | null;
  notes: string | null;
  document_url: string | null;
}

export interface InsurancePolicy extends BaseEntity {
  vehicle_id: string;
  provider_name: string;
  policy_number: string;
  coverage_type: string | null;
  start_date: string;
  end_date: string;
  premium_amount: number;
  currency: string;
  deductible: number | null;
  contact_phone: string | null;
  contact_email: string | null;
  document_url: string | null;
  notes: string | null;
}

export interface OilChange extends BaseEntity {
  vehicle_id: string;
  change_date: string;
  mileage_at_change: number;
  next_change_mileage: number;
  next_change_date: string | null;
  oil_brand: string | null;
  oil_type: string | null;
  oil_volume_liters: number | null;
  filter_replaced: boolean;
  filter_brand: string | null;
  workshop_name: string | null;
  workshop_wilaya: number | null;
  cost: number | null;
  notes: string | null;
  receipt_url: string | null;
}

export interface Alert extends BaseEntity {
  user_id: string;
  vehicle_id: string | null;
  alert_type: AlertType;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  message: string;
  trigger_date: string | null;
  trigger_mileage: number | null;
  threshold_value: number | null;
  current_value: number | null;
  notified_at: string | null;
  acknowledged_at: string | null;
  resolved_at: string | null;
}

// ============================================================================
// MAINTENANCE & SERVICES
// ============================================================================

export interface ServiceRecord extends BaseEntity, SoftDeletable {
  vehicle_id: string;
  user_id: string;
  service_date: string;
  mileage_at_service: number;
  category: ServiceCategory;
  workshop_name: string | null;
  workshop_wilaya: number | null;
  workshop_address: string | null;
  mechanic_name: string | null;
  description: string;
  labor_cost: number;
  parts_cost: number;
  total_cost: number;
  currency: string;
  next_service_mileage: number | null;
  next_service_date: string | null;
  invoice_number: string | null;
  receipt_url: string | null;
  photos: string[];
  notes: string | null;
}

export interface SparePart extends BaseEntity {
  vehicle_id: string;
  service_record_id: string | null;
  part_name: string;
  part_number: string | null;
  brand: string | null;
  category: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  currency: string;
  supplier_name: string | null;
  supplier_wilaya: number | null;
  installed_at: string | null;
  installed_mileage: number | null;
  expected_lifespan_km: number | null;
  warranty_until: string | null;
  notes: string | null;
}

export interface Tire extends BaseEntity {
  vehicle_id: string;
  position: TirePosition;
  brand: string;
  model: string;
  size: string;
  condition: TireCondition;
  tread_depth_mm: number | null;
  pressure_psi: number | null;
  installed_date: string;
  installed_mileage: number;
  expected_lifespan_km: number | null;
  replaced_date: string | null;
  replaced_mileage: number | null;
  purchase_price: number | null;
  currency: string;
  supplier_name: string | null;
  supplier_wilaya: number | null;
  notes: string | null;
}

// ============================================================================
// FUEL & EXPENSES
// ============================================================================

export interface FuelLog extends BaseEntity {
  vehicle_id: string;
  fill_date: string;
  mileage: number;
  fuel_type: FuelType;
  volume_liters: number;
  price_per_liter: number;
  total_cost: number;
  currency: string;
  consumption_l_per_100km: number | null;
  station_name: string | null;
  station_wilaya: number | null;
  tank_level_percent: number | null;
  full_tank: boolean;
  notes: string | null;
  receipt_url: string | null;
}

export interface Expense extends BaseEntity, SoftDeletable {
  vehicle_id: string;
  user_id: string;
  expense_date: string;
  expense_type: ExpenseType;
  description: string;
  amount: number;
  currency: string;
  service_record_id: string | null;
  vendor_name: string | null;
  vendor_wilaya: number | null;
  invoice_number: string | null;
  receipt_url: string | null;
  photos: string[];
  notes: string | null;
}

// ============================================================================
// VENDORS
// ============================================================================

export interface Vendor extends BaseEntity, SoftDeletable {
  name: string;
  vendor_type: VendorType;
  description: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  wilaya: number;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  opening_hours: Record<string, string> | null;
  average_rating: number | null;
  total_reviews: number;
  is_verified: boolean;
  verified_at: string | null;
  is_active: boolean;
}

export interface VendorReview extends BaseEntity {
  vendor_id: string;
  user_id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  service_date: string | null;
  vehicle_id: string | null;
  is_approved: boolean;
  approved_at: string | null;
}

// ============================================================================
// DATA IMPORTS
// ============================================================================

export interface ImportJob extends BaseEntity {
  user_id: string;
  format: ImportFormat;
  status: ImportStatus;
  original_filename: string;
  file_size_bytes: number | null;
  file_url: string | null;
  total_rows: number | null;
  processed_rows: number;
  successful_rows: number;
  failed_rows: number;
  error_log: any | null;
  mapping_config: any | null;
  started_at: string | null;
  completed_at: string | null;
}

// ============================================================================
// PAYMENTS
// ============================================================================

export interface Payment extends BaseEntity {
  user_id: string;
  subscription_id: string | null;
  amount: number;
  currency: string;
  status: PaymentStatus;
  payment_method: string | null;
  transaction_id: string | null;
  paid_at: string | null;
  invoice_number: string | null;
  invoice_url: string | null;
  notes: string | null;
}

// ============================================================================
// AUDIT
// ============================================================================

export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  old_values: any | null;
  new_values: any | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

// ============================================================================
// VIEW TYPES (Aggregated data)
// ============================================================================

export interface VehicleSummary {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  vehicle_type: VehicleType;
  mileage: number;
  license_plate: string;
  owner_id: string;
  owner_name: string;
  owner_email: string;
  last_oil_change_date: string | null;
  next_oil_change_mileage: number | null;
  insurance_expiry: string | null;
  next_technical_control: string | null;
  yearly_expenses: number;
  avg_consumption_l_100km: number | null;
}

export interface UserDashboard {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  subscription_tier: SubscriptionTier | null;
  subscription_status: SubscriptionStatus | null;
  vehicle_count: number;
  active_alerts_count: number;
  critical_alerts_count: number;
  monthly_expenses: number;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

// ============================================================================
// COUNTDOWN CALCULATION HELPERS
// ============================================================================

export interface CountdownInfo {
  type: AlertType;
  label: string;
  currentValue: number; // remaining days or km
  thresholdValue: number; // total interval
  percentage: number; // 0-100
  severity: AlertSeverity;
  dueDate?: string;
}

export function calculateCountdownPercentage(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.max(0, Math.min(100, ((total - current) / total) * 100));
}

export function getSeverityFromCountdown(remaining: number, total: number): AlertSeverity {
  const percentage = (remaining / total) * 100;
  if (percentage <= 10) return 'urgent';
  if (percentage <= 25) return 'critical';
  if (percentage <= 50) return 'warning';
  return 'info';
}
