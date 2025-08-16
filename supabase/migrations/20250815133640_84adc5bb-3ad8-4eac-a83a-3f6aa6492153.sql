-- FINAL COMPREHENSIVE SECURITY FIX - All remaining vulnerabilities
-- Fix all public access issues with proper column checking

-- Remove any lingering public access
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC, anon;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM PUBLIC, anon; 
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM PUBLIC, anon;

-- Grant only necessary authenticated access to specific safe tables
GRANT SELECT ON public.categories TO authenticated;
GRANT SELECT ON public.animal_nfts TO authenticated;
GRANT INSERT ON public.contact_submissions TO authenticated;

-- Fix admin session exposure - only session owner access
CREATE POLICY IF NOT EXISTS "admin_sessions_owner_only" ON public.admin_sessions 
FOR ALL USING (user_id = auth.uid());

CREATE POLICY IF NOT EXISTS "admin_security_sessions_owner_only" ON public.admin_security_sessions 
FOR ALL USING (user_id = auth.uid());

-- Fix secure admin sessions table if it exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'secure_admin_sessions') THEN
        EXECUTE 'ALTER TABLE public.secure_admin_sessions ENABLE ROW LEVEL SECURITY';
        EXECUTE 'CREATE POLICY IF NOT EXISTS "secure_admin_sessions_owner_only" ON public.secure_admin_sessions FOR ALL USING (user_id = auth.uid())';
        EXECUTE 'REVOKE ALL ON public.secure_admin_sessions FROM PUBLIC, anon, authenticated';
    END IF;
END $$;

-- Fix user tables with proper column detection
DO $$
DECLARE
    user_col_name text;
BEGIN
    -- Check profiles table structure and create appropriate policy
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') THEN
        -- Check what user identifier column exists
        IF EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'user_id') THEN
            user_col_name := 'user_id';
        ELSIF EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'id') THEN
            user_col_name := 'id';
        ELSE
            user_col_name := NULL;
        END IF;
        
        IF user_col_name IS NOT NULL THEN
            EXECUTE format('CREATE POLICY IF NOT EXISTS "profiles_owner_only" ON public.profiles FOR ALL USING (%I = auth.uid())', user_col_name);
        END IF;
        EXECUTE 'REVOKE ALL ON public.profiles FROM PUBLIC, anon, authenticated';
    END IF;
END $$;

-- Fix financial tables with proper access control
DO $$
BEGIN
    -- Wallets table
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'wallets') THEN
        EXECUTE 'CREATE POLICY IF NOT EXISTS "wallets_owner_only" ON public.wallets FOR ALL USING (user_id = auth.uid())';
        EXECUTE 'REVOKE ALL ON public.wallets FROM PUBLIC, anon, authenticated';
    END IF;
    
    -- Transactions table
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'transactions') THEN
        EXECUTE 'CREATE POLICY IF NOT EXISTS "transactions_owner_only" ON public.transactions FOR ALL USING (user_id = auth.uid() OR from_user_id = auth.uid() OR to_user_id = auth.uid())';
        EXECUTE 'REVOKE ALL ON public.transactions FROM PUBLIC, anon, authenticated';
    END IF;
END $$;

-- Fix security tables - admin only access
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'security_events') THEN
        EXECUTE 'CREATE POLICY IF NOT EXISTS "security_events_admin_only" ON public.security_events FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))';
        EXECUTE 'REVOKE ALL ON public.security_events FROM PUBLIC, anon, authenticated';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'security_logs') THEN
        EXECUTE 'CREATE POLICY IF NOT EXISTS "security_logs_admin_only" ON public.security_logs FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))';
        EXECUTE 'REVOKE ALL ON public.security_logs FROM PUBLIC, anon, authenticated';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'security_monitoring') THEN
        EXECUTE 'CREATE POLICY IF NOT EXISTS "security_monitoring_admin_only" ON public.security_monitoring FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))';
        EXECUTE 'REVOKE ALL ON public.security_monitoring FROM PUBLIC, anon, authenticated';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'threat_intelligence') THEN
        EXECUTE 'CREATE POLICY IF NOT EXISTS "threat_intelligence_admin_only" ON public.threat_intelligence FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))';
        EXECUTE 'REVOKE ALL ON public.threat_intelligence FROM PUBLIC, anon, authenticated';
    END IF;
END $$;

-- Fix admin account access - super admin only
CREATE POLICY IF NOT EXISTS "admin_accounts_super_admin_only" ON public.admin_accounts 
FOR ALL USING (EXISTS (SELECT 1 FROM admin_users au JOIN admin_profiles ap ON au.user_id = ap.user_id WHERE au.user_id = auth.uid() AND au.is_active = true AND ap.role = 'super_admin'));

-- Contact submissions - admin read only, public insert only
DROP POLICY IF EXISTS "contact_submissions_public_read" ON public.contact_submissions;
CREATE POLICY IF NOT EXISTS "contact_submissions_admin_read" ON public.contact_submissions 
FOR SELECT USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true));

CREATE POLICY IF NOT EXISTS "contact_submissions_public_insert" ON public.contact_submissions 
FOR INSERT WITH CHECK (true);

-- Ensure RLS is enabled on all sensitive tables
ALTER TABLE public.admin_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_security_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;