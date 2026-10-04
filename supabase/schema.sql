-- ==========================================
-- Kasting Kompany - Database Schema Migration
-- Compatible with Supabase PostgreSQL
-- ==========================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  whatsapp_available BOOLEAN DEFAULT TRUE,
  state TEXT NOT NULL,
  city TEXT NOT NULL,
  native_language TEXT NOT NULL,
  other_languages TEXT[] DEFAULT '{}',
  years_in_industry TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USER ROLES TABLE
CREATE TABLE IF NOT EXISTS public.user_roles (
  id VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  user_id VARCHAR(64) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ARTIST PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.artist_profiles (
  id VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  user_id VARCHAR(64) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  age INT,
  gender TEXT,
  playing_age_range TEXT,
  height TEXT,
  build TEXT,
  hair_length TEXT,
  hair_colour TEXT,
  beard BOOLEAN DEFAULT FALSE,
  beard_type TEXT,
  moustache BOOLEAN DEFAULT FALSE,
  skills TEXT[] DEFAULT '{}',
  driving_licence BOOLEAN DEFAULT FALSE,
  own_vehicle BOOLEAN DEFAULT FALSE,
  travel_availability TEXT,
  current_availability TEXT,
  portfolio_url TEXT,
  instagram_url TEXT,
  youtube_url TEXT,
  imdb_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PROFESSIONAL PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.professional_profiles (
  id VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  user_id VARCHAR(64) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  professional_role TEXT NOT NULL,
  company_name TEXT,
  years_experience TEXT,
  projects_count TEXT,
  typical_cast_size TEXT,
  casting_frequency TEXT,
  current_sourcing_methods TEXT[] DEFAULT '{}',
  current_database_method TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. VALIDATION RESPONSES TABLE
CREATE TABLE IF NOT EXISTS public.validation_responses (
  id VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  user_id VARCHAR(64) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  biggest_problems TEXT[] DEFAULT '{}',
  usefulness_score INT CHECK (usefulness_score >= 1 AND usefulness_score <= 5),
  would_use TEXT,
  preferred_payment_model TEXT,
  willingness_to_pay TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. WAITLIST TABLE
CREATE TABLE IF NOT EXISTS public.waitlist (
  id VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  user_id VARCHAR(64) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'medium',
  lead_score INT DEFAULT 0,
  lead_tier TEXT DEFAULT 'COLD',
  early_access_requested BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ADMIN NOTES TABLE
CREATE TABLE IF NOT EXISTS public.admin_notes (
  id VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  user_id VARCHAR(64) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  created_by TEXT DEFAULT 'Admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.validation_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notes ENABLE ROW LEVEL SECURITY;

-- Allow public users to insert into waitlist tables via server flow
CREATE POLICY "Public anonymous insert users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Public anonymous insert user_roles" ON public.user_roles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public anonymous insert artist_profiles" ON public.artist_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public anonymous insert professional_profiles" ON public.professional_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public anonymous insert validation_responses" ON public.validation_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Public anonymous insert waitlist" ON public.waitlist FOR INSERT WITH CHECK (true);

-- Protect read access (only authenticated service role / admins can select waitlist data)
CREATE POLICY "Admin select users" ON public.users FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "Admin select waitlist" ON public.waitlist FOR SELECT USING (auth.role() = 'service_role');

-- Create Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_state_city ON public.users(state, city);
CREATE INDEX IF NOT EXISTS idx_waitlist_lead_tier ON public.waitlist(lead_tier);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);
