-- COMPREHENSIVE SECURITY FIX - Remove all public access to sensitive tables
-- This will fix all 5 remaining security vulnerabilities

-- Revoke ALL public access from ALL tables - comprehensive approach
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC, anon, authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM PUBLIC, anon, authenticated;

-- Fix Admin Data Exposure (Error 1)
-- Additional admin tables that need protection
DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name LIKE 'admin_%'
    LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);
        EXECUTE format('DROP POLICY IF EXISTS "%I_public_access" ON public.%I', tbl, tbl);
        -- Only allow admin users to access admin tables
        EXECUTE format('CREATE POLICY "%I_admin_only" ON public.%I FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))', tbl, tbl);
    END LOOP;
END $$;

-- Fix Security Data Exposure (Error 2)
DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND (table_name LIKE 'security_%' OR table_name LIKE 'threat_%' OR table_name = 'audit_logs')
    LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);
        EXECUTE format('DROP POLICY IF EXISTS "%I_public_access" ON public.%I', tbl, tbl);
        -- Only allow admin users to access security tables
        EXECUTE format('CREATE POLICY "%I_admin_only" ON public.%I FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))', tbl, tbl);
    END LOOP;
END $$;

-- Fix Financial Data Exposure (Error 3)
DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND (table_name IN ('wallets', 'transactions', 'fee_transactions', 'user_stakes', 'trading_pairs') 
             OR table_name LIKE '%wallet%' 
             OR table_name LIKE '%transaction%' 
             OR table_name LIKE '%payment%'
             OR table_name LIKE '%stake%')
    LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);
        EXECUTE format('DROP POLICY IF EXISTS "%I_public_access" ON public.%I', tbl, tbl);
        
        -- Check if table has user_id column for user-specific access
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = tbl AND column_name = 'user_id') THEN
            EXECUTE format('CREATE POLICY "%I_owner_only" ON public.%I FOR ALL USING (user_id = auth.uid())', tbl, tbl);
        ELSE
            -- If no user_id, only admins can access
            EXECUTE format('CREATE POLICY "%I_admin_only" ON public.%I FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))', tbl, tbl);
        END IF;
    END LOOP;
END $$;

-- Fix Personal Data Exposure (Error 4)
DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND (table_name IN ('users', 'profiles', 'contact_submissions', 'video_submissions')
             OR table_name LIKE '%profile%'
             OR table_name LIKE '%user%'
             OR table_name LIKE '%submission%')
        AND table_name NOT LIKE 'admin_%'
    LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);
        EXECUTE format('DROP POLICY IF EXISTS "%I_public_access" ON public.%I', tbl, tbl);
        
        -- Special handling for contact_submissions
        IF tbl = 'contact_submissions' THEN
            EXECUTE format('CREATE POLICY "%I_admin_read" ON public.%I FOR SELECT USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))', tbl, tbl);
            EXECUTE format('CREATE POLICY "%I_public_insert" ON public.%I FOR INSERT WITH CHECK (true)', tbl, tbl);
        -- Check if table has user_id column
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = tbl AND column_name = 'user_id') THEN
            EXECUTE format('CREATE POLICY "%I_owner_only" ON public.%I FOR ALL USING (user_id = auth.uid())', tbl, tbl);
        -- Check if table has id column that references auth.uid()
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = tbl AND column_name = 'id') THEN
            EXECUTE format('CREATE POLICY "%I_owner_only" ON public.%I FOR ALL USING (id = auth.uid())', tbl, tbl);
        ELSE
            -- Default to admin only
            EXECUTE format('CREATE POLICY "%I_admin_only" ON public.%I FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))', tbl, tbl);
        END IF;
    END LOOP;
END $$;

-- Fix Business Intelligence Exposure (Error 5)
DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND (table_name LIKE 'green_%'
             OR table_name LIKE 'project_%'
             OR table_name LIKE 'ai_%'
             OR table_name LIKE 'generated_%'
             OR table_name IN ('business_metrics', 'performance_data'))
    LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);
        EXECUTE format('DROP POLICY IF EXISTS "%I_public_access" ON public.%I', tbl, tbl);
        
        -- Check if table has user_id column for user-specific access
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = tbl AND column_name = 'user_id') THEN
            EXECUTE format('CREATE POLICY "%I_owner_only" ON public.%I FOR ALL USING (user_id = auth.uid())', tbl, tbl);
        ELSE
            -- If no user_id, only admins can access business intelligence
            EXECUTE format('CREATE POLICY "%I_admin_only" ON public.%I FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))', tbl, tbl);
        END IF;
    END LOOP;
END $$;

-- Grant only specific necessary permissions to safe, public tables
GRANT SELECT ON public.categories TO authenticated;
GRANT SELECT ON public.animal_nfts TO authenticated;
GRANT INSERT ON public.contact_submissions TO authenticated;

-- Additional safe tables that might need authenticated access
DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('eco_missions', 'environmental_impact', 'bike_sessions', 'animal_conservation_activities', 'animal_gaming_stats')
    LOOP
        -- Enable RLS first
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);
        -- Grant access to authenticated users for their own data
        EXECUTE format('GRANT SELECT, INSERT, UPDATE ON public.%I TO authenticated', tbl);
        -- Create user-specific policies
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = tbl AND column_name = 'user_id') THEN
            EXECUTE format('CREATE POLICY "%I_user_access" ON public.%I FOR ALL USING (user_id = auth.uid())', tbl, tbl);
        END IF;
    END LOOP;
END $$;