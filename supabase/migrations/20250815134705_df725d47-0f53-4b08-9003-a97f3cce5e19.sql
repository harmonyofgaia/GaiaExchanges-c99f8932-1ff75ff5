-- FINAL COMPREHENSIVE SECURITY FIX - Handle policy conflicts properly
-- Drop ALL existing policies first, then recreate with proper access control

-- Complete security lockdown - revoke all public access
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC, anon, authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM PUBLIC, anon, authenticated;

-- Fix Admin Data Exposure (Error 1) - Drop and recreate policies
DO $$
DECLARE
    tbl text;
    pol text;
BEGIN
    FOR tbl IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name LIKE 'admin_%'
    LOOP
        -- Drop all existing policies
        FOR pol IN 
            SELECT policyname 
            FROM pg_policies 
            WHERE schemaname = 'public' 
            AND tablename = tbl
        LOOP
            EXECUTE format('DROP POLICY IF EXISTS "%s" ON public.%I', pol, tbl);
        END LOOP;
        
        -- Enable RLS and create single restrictive policy
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);
        EXECUTE format('CREATE POLICY "%I_secure_access" ON public.%I FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))', tbl, tbl);
    END LOOP;
END $$;

-- Fix Security Data Exposure (Error 2)
DO $$
DECLARE
    tbl text;
    pol text;
BEGIN
    FOR tbl IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND (table_name LIKE 'security_%' OR table_name LIKE 'threat_%' OR table_name = 'audit_logs')
    LOOP
        -- Drop all existing policies
        FOR pol IN 
            SELECT policyname 
            FROM pg_policies 
            WHERE schemaname = 'public' 
            AND tablename = tbl
        LOOP
            EXECUTE format('DROP POLICY IF EXISTS "%s" ON public.%I', pol, tbl);
        END LOOP;
        
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);
        EXECUTE format('CREATE POLICY "%I_secure_access" ON public.%I FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))', tbl, tbl);
    END LOOP;
END $$;

-- Fix Financial Data Exposure (Error 3)
DO $$
DECLARE
    tbl text;
    pol text;
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
        -- Drop all existing policies
        FOR pol IN 
            SELECT policyname 
            FROM pg_policies 
            WHERE schemaname = 'public' 
            AND tablename = tbl
        LOOP
            EXECUTE format('DROP POLICY IF EXISTS "%s" ON public.%I', pol, tbl);
        END LOOP;
        
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);
        
        -- Create appropriate policy based on table structure
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = tbl AND column_name = 'user_id') THEN
            EXECUTE format('CREATE POLICY "%I_secure_access" ON public.%I FOR ALL USING (user_id = auth.uid())', tbl, tbl);
        ELSE
            EXECUTE format('CREATE POLICY "%I_secure_access" ON public.%I FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))', tbl, tbl);
        END IF;
    END LOOP;
END $$;

-- Fix Personal Data Exposure (Error 4)
DO $$
DECLARE
    tbl text;
    pol text;
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
        -- Drop all existing policies
        FOR pol IN 
            SELECT policyname 
            FROM pg_policies 
            WHERE schemaname = 'public' 
            AND tablename = tbl
        LOOP
            EXECUTE format('DROP POLICY IF EXISTS "%s" ON public.%I', pol, tbl);
        END LOOP;
        
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);
        
        -- Special handling for contact_submissions
        IF tbl = 'contact_submissions' THEN
            EXECUTE format('CREATE POLICY "%I_admin_read" ON public.%I FOR SELECT USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))', tbl, tbl);
            EXECUTE format('CREATE POLICY "%I_public_insert" ON public.%I FOR INSERT WITH CHECK (true)', tbl, tbl);
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = tbl AND column_name = 'user_id') THEN
            EXECUTE format('CREATE POLICY "%I_secure_access" ON public.%I FOR ALL USING (user_id = auth.uid())', tbl, tbl);
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = tbl AND column_name = 'id') THEN
            EXECUTE format('CREATE POLICY "%I_secure_access" ON public.%I FOR ALL USING (id = auth.uid())', tbl, tbl);
        ELSE
            EXECUTE format('CREATE POLICY "%I_secure_access" ON public.%I FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))', tbl, tbl);
        END IF;
    END LOOP;
END $$;

-- Fix Business Intelligence Exposure (Error 5)
DO $$
DECLARE
    tbl text;
    pol text;
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
        -- Drop all existing policies
        FOR pol IN 
            SELECT policyname 
            FROM pg_policies 
            WHERE schemaname = 'public' 
            AND tablename = tbl
        LOOP
            EXECUTE format('DROP POLICY IF EXISTS "%s" ON public.%I', pol, tbl);
        END LOOP;
        
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);
        
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = tbl AND column_name = 'user_id') THEN
            EXECUTE format('CREATE POLICY "%I_secure_access" ON public.%I FOR ALL USING (user_id = auth.uid())', tbl, tbl);
        ELSE
            EXECUTE format('CREATE POLICY "%I_secure_access" ON public.%I FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))', tbl, tbl);
        END IF;
    END LOOP;
END $$;

-- Grant minimal necessary permissions for safe tables
GRANT SELECT ON public.categories TO authenticated;
GRANT SELECT ON public.animal_nfts TO authenticated;
GRANT INSERT ON public.contact_submissions TO authenticated;