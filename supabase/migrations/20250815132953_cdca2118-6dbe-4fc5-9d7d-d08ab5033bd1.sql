-- Fix Security Error 1: Restrict admin tables access
-- Admin accounts table - only super admins
ALTER TABLE public.admin_accounts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_accounts_public_read" ON public.admin_accounts;

-- Admin profiles table - only super admins and own profile
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_profiles_public_read" ON public.admin_profiles;

-- Admin users table - only super admins and own data
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_users_public_read" ON public.admin_users;

-- Admin sessions table - only own sessions
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_sessions_public_read" ON public.admin_sessions;

-- Admin security sessions - only own sessions
ALTER TABLE public.admin_security_sessions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_security_sessions_public_read" ON public.admin_security_sessions;

-- Admin vault access - only own access
ALTER TABLE public.admin_vault_access ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_vault_access_public_read" ON public.admin_vault_access;

-- Fix Security Error 2: Restrict user data access
-- Users table (if exists)
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') THEN
        EXECUTE 'ALTER TABLE public.users ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "users_public_read" ON public.users';
        EXECUTE 'CREATE POLICY "users_own_data_only" ON public.users FOR ALL USING (id = auth.uid())';
    END IF;
END $$;

-- Profiles table (if exists)
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') THEN
        EXECUTE 'ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "profiles_public_read" ON public.profiles';
        EXECUTE 'CREATE POLICY "profiles_own_data_only" ON public.profiles FOR ALL USING (id = auth.uid() OR user_id = auth.uid())';
    END IF;
END $$;

-- Fix Security Error 3: Restrict financial data access
-- Wallets table (if exists)
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'wallets') THEN
        EXECUTE 'ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "wallets_public_read" ON public.wallets';
        EXECUTE 'CREATE POLICY "wallets_own_data_only" ON public.wallets FOR ALL USING (user_id = auth.uid())';
    END IF;
END $$;

-- Transactions table (if exists)
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'transactions') THEN
        EXECUTE 'ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "transactions_public_read" ON public.transactions';
        EXECUTE 'CREATE POLICY "transactions_own_data_only" ON public.transactions FOR ALL USING (user_id = auth.uid() OR from_user_id = auth.uid() OR to_user_id = auth.uid())';
    END IF;
END $$;

-- Fee transactions table (if exists)
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'fee_transactions') THEN
        EXECUTE 'ALTER TABLE public.fee_transactions ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "fee_transactions_public_read" ON public.fee_transactions';
        EXECUTE 'CREATE POLICY "fee_transactions_admin_only" ON public.fee_transactions FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))';
    END IF;
END $$;

-- User stakes table (if exists)
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_stakes') THEN
        EXECUTE 'ALTER TABLE public.user_stakes ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "user_stakes_public_read" ON public.user_stakes';
        EXECUTE 'CREATE POLICY "user_stakes_own_data_only" ON public.user_stakes FOR ALL USING (user_id = auth.uid())';
    END IF;
END $$;

-- Fix Security Error 4: Restrict security logs access
-- Security logs table (if exists)
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'security_logs') THEN
        EXECUTE 'ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "security_logs_public_read" ON public.security_logs';
        EXECUTE 'CREATE POLICY "security_logs_admin_only" ON public.security_logs FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))';
    END IF;
END $$;

-- Security events table (if exists)
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'security_events') THEN
        EXECUTE 'ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "security_events_public_read" ON public.security_events';
        EXECUTE 'CREATE POLICY "security_events_admin_only" ON public.security_events FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))';
    END IF;
END $$;

-- Security monitoring table (if exists)
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'security_monitoring') THEN
        EXECUTE 'ALTER TABLE public.security_monitoring ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "security_monitoring_public_read" ON public.security_monitoring';
        EXECUTE 'CREATE POLICY "security_monitoring_admin_only" ON public.security_monitoring FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))';
    END IF;
END $$;

-- Threat intelligence table (if exists)
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'threat_intelligence') THEN
        EXECUTE 'ALTER TABLE public.threat_intelligence ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "threat_intelligence_public_read" ON public.threat_intelligence';
        EXECUTE 'CREATE POLICY "threat_intelligence_admin_only" ON public.threat_intelligence FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))';
    END IF;
END $$;

-- Audit logs already have policies, just ensure they're restrictive
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "audit_logs_public_read" ON public.audit_logs;

-- Fix Security Error 5: Restrict contact submissions access
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "contact_submissions_public_read" ON public.contact_submissions;

-- Revoke all public access from all sensitive tables
REVOKE ALL ON public.admin_accounts FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.admin_profiles FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.admin_users FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.admin_sessions FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.admin_security_sessions FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.admin_vault_access FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.contact_submissions FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.audit_logs FROM PUBLIC, anon, authenticated;

-- Revoke from financial tables if they exist
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'wallets') THEN
        EXECUTE 'REVOKE ALL ON public.wallets FROM PUBLIC, anon, authenticated';
    END IF;
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'transactions') THEN
        EXECUTE 'REVOKE ALL ON public.transactions FROM PUBLIC, anon, authenticated';
    END IF;
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'fee_transactions') THEN
        EXECUTE 'REVOKE ALL ON public.fee_transactions FROM PUBLIC, anon, authenticated';
    END IF;
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_stakes') THEN
        EXECUTE 'REVOKE ALL ON public.user_stakes FROM PUBLIC, anon, authenticated';
    END IF;
END $$;

-- Revoke from security tables if they exist
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'security_logs') THEN
        EXECUTE 'REVOKE ALL ON public.security_logs FROM PUBLIC, anon, authenticated';
    END IF;
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'security_events') THEN
        EXECUTE 'REVOKE ALL ON public.security_events FROM PUBLIC, anon, authenticated';
    END IF;
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'security_monitoring') THEN
        EXECUTE 'REVOKE ALL ON public.security_monitoring FROM PUBLIC, anon, authenticated';
    END IF;
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'threat_intelligence') THEN
        EXECUTE 'REVOKE ALL ON public.threat_intelligence FROM PUBLIC, anon, authenticated';
    END IF;
END $$;

-- Revoke from user tables if they exist
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') THEN
        EXECUTE 'REVOKE ALL ON public.users FROM PUBLIC, anon, authenticated';
    END IF;
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') THEN
        EXECUTE 'REVOKE ALL ON public.profiles FROM PUBLIC, anon, authenticated';
    END IF;
END $$;