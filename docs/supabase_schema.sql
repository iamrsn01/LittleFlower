-- =========================================================================
-- Little Flower Secondary School (LFS Birgunj) — Supabase Database Schema
-- Run this in your Supabase Project -> SQL Editor -> Run
-- =========================================================================

-- 1. HERO SLIDES TABLE
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id TEXT PRIMARY KEY,
    image TEXT NOT NULL,
    caption TEXT NOT NULL,
    location TEXT DEFAULT 'Birgunj-21, Parwanipur, Parsa',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. GALLERY ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    featured BOOLEAN DEFAULT FALSE,
    aspect TEXT DEFAULT 'landscape',
    tag TEXT DEFAULT 'Campus View',
    year TEXT DEFAULT '2026',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. SCHOOL NOTICES TABLE
CREATE TABLE IF NOT EXISTS public.school_notices (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    is_urgent BOOLEAN DEFAULT FALSE,
    summary TEXT,
    details TEXT,
    file_size TEXT DEFAULT 'Online Notice',
    download_url TEXT DEFAULT '#',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. FACULTY MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.faculty_members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    department TEXT NOT NULL,
    qualification TEXT,
    experience TEXT,
    email TEXT,
    bio TEXT,
    avatar_url TEXT,
    achievements JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================================
-- ENABLE ROW LEVEL SECURITY (RLS) & ALLOW PUBLIC READ / WRITE
-- =========================================================================

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty_members ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view public content
CREATE POLICY "Allow public read access for hero_slides" ON public.hero_slides FOR SELECT USING (true);
CREATE POLICY "Allow public read access for gallery_items" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access for school_notices" ON public.school_notices FOR SELECT USING (true);
CREATE POLICY "Allow public read access for faculty_members" ON public.faculty_members FOR SELECT USING (true);

-- Allow full access for insert/update/delete (anon key / authenticated)
CREATE POLICY "Allow all access for hero_slides" ON public.hero_slides FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access for gallery_items" ON public.gallery_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access for school_notices" ON public.school_notices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access for faculty_members" ON public.faculty_members FOR ALL USING (true) WITH CHECK (true);
