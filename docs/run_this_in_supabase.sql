-- =========================================================================
-- Little Flower Secondary School (LFS Birgunj) — Missing Tables Migration
-- Run this in your Supabase Project -> SQL Editor -> Click "Run"
-- Project URL: https://imsvncczxpzqybwjjapx.supabase.co
-- =========================================================================

-- 1. FACILITIES TABLE
CREATE TABLE IF NOT EXISTS public.facilities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    highlights JSONB DEFAULT '[]'::jsonb,
    capacity TEXT DEFAULT '40 Students',
    block TEXT,
    floor TEXT,
    equipment JSONB DEFAULT '[]'::jsonb,
    safety_features JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. VACANCIES TABLE
CREATE TABLE IF NOT EXISTS public.vacancies (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    icon_type TEXT DEFAULT 'computer',
    type TEXT DEFAULT 'Full Time',
    description TEXT NOT NULL,
    qualification TEXT,
    experience TEXT,
    location TEXT DEFAULT 'Birgunj, Parsa',
    responsibilities JSONB DEFAULT '[]'::jsonb,
    requirements JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    deadline TEXT DEFAULT 'Rolling Basis',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. JOB APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.job_applications (
    id TEXT PRIMARY KEY,
    ref_number TEXT,
    position_title TEXT NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    qualification TEXT,
    experience TEXT,
    message TEXT,
    resume_name TEXT,
    resume_data_url TEXT,
    status TEXT DEFAULT 'Pending',
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================================
-- ENABLE ROW LEVEL SECURITY (RLS) & ALLOW PUBLIC ACCESS
-- =========================================================================

ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access for facilities" ON public.facilities FOR SELECT USING (true);
CREATE POLICY "Allow public read access for vacancies" ON public.vacancies FOR SELECT USING (true);
CREATE POLICY "Allow public read access for job_applications" ON public.job_applications FOR SELECT USING (true);

-- Allow full write/update/delete access for anon & admin
CREATE POLICY "Allow all access for facilities" ON public.facilities FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access for vacancies" ON public.vacancies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access for job_applications" ON public.job_applications FOR ALL USING (true) WITH CHECK (true);
