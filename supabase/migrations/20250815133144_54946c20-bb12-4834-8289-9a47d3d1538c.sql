-- Drop all conflicting policies first, then recreate properly
-- Fix Security Error 2: User data access
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') THEN
        EXECUTE 'ALTER TABLE public.users ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "users_own_data_only" ON public.users';
        EXECUTE 'DROP POLICY IF EXISTS "users_public_read" ON public.users';
        EXECUTE 'CREATE POLICY "users_restricted_access" ON public.users FOR ALL USING (id = auth.uid())';
        EXECUTE 'REVOKE ALL ON public.users FROM PUBLIC, anon, authenticated';
    END IF;
END $$;

-- Profiles table
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') THEN
        EXECUTE 'ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "profiles_own_data_only" ON public.profiles';
        EXECUTE 'DROP POLICY IF EXISTS "profiles_public_read" ON public.profiles';
        EXECUTE 'CREATE POLICY "profiles_restricted_access" ON public.profiles FOR ALL USING (id = auth.uid() OR user_id = auth.uid())';
        EXECUTE 'REVOKE ALL ON public.profiles FROM PUBLIC, anon, authenticated';
    END IF;
END $$;

-- Fix Security Error 3: Financial data access
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'wallets') THEN
        EXECUTE 'ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "wallets_own_data_only" ON public.wallets';
        EXECUTE 'DROP POLICY IF EXISTS "wallets_public_read" ON public.wallets';
        EXECUTE 'CREATE POLICY "wallets_restricted_access" ON public.wallets FOR ALL USING (user_id = auth.uid())';
        EXECUTE 'REVOKE ALL ON public.wallets FROM PUBLIC, anon, authenticated';
    END IF;
END $$;

DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'transactions') THEN
        EXECUTE 'ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "transactions_own_data_only" ON public.transactions';
        EXECUTE 'DROP POLICY IF EXISTS "transactions_public_read" ON public.transactions';
        EXECUTE 'CREATE POLICY "transactions_restricted_access" ON public.transactions FOR ALL USING (user_id = auth.uid() OR from_user_id = auth.uid() OR to_user_id = auth.uid())';
        EXECUTE 'REVOKE ALL ON public.transactions FROM PUBLIC, anon, authenticated';
    END IF;
END $$;

DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'fee_transactions') THEN
        EXECUTE 'ALTER TABLE public.fee_transactions ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "fee_transactions_admin_only" ON public.fee_transactions';
        EXECUTE 'DROP POLICY IF EXISTS "fee_transactions_public_read" ON public.fee_transactions';
        EXECUTE 'CREATE POLICY "fee_transactions_restricted_access" ON public.fee_transactions FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))';
        EXECUTE 'REVOKE ALL ON public.fee_transactions FROM PUBLIC, anon, authenticated';
    END IF;
END $$;

DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_stakes') THEN
        EXECUTE 'ALTER TABLE public.user_stakes ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "user_stakes_own_data_only" ON public.user_stakes';
        EXECUTE 'DROP POLICY IF EXISTS "user_stakes_public_read" ON public.user_stakes';
        EXECUTE 'CREATE POLICY "user_stakes_restricted_access" ON public.user_stakes FOR ALL USING (user_id = auth.uid())';
        EXECUTE 'REVOKE ALL ON public.user_stakes FROM PUBLIC, anon, authenticated';
    END IF;
END $$;

-- Fix Security Error 4: Security logs access
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'security_logs') THEN
        EXECUTE 'ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "security_logs_admin_only" ON public.security_logs';
        EXECUTE 'DROP POLICY IF EXISTS "security_logs_public_read" ON public.security_logs';
        EXECUTE 'CREATE POLICY "security_logs_restricted_access" ON public.security_logs FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))';
        EXECUTE 'REVOKE ALL ON public.security_logs FROM PUBLIC, anon, authenticated';
    END IF;
END $$;

DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'security_events') THEN
        EXECUTE 'ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "security_events_admin_only" ON public.security_events';
        EXECUTE 'DROP POLICY IF EXISTS "security_events_public_read" ON public.security_events';
        EXECUTE 'CREATE POLICY "security_events_restricted_access" ON public.security_events FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))';
        EXECUTE 'REVOKE ALL ON public.security_events FROM PUBLIC, anon, authenticated';
    END IF;
END $$;

DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'security_monitoring') THEN
        EXECUTE 'ALTER TABLE public.security_monitoring ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "security_monitoring_admin_only" ON public.security_monitoring';
        EXECUTE 'DROP POLICY IF EXISTS "security_monitoring_public_read" ON public.security_monitoring';
        EXECUTE 'CREATE POLICY "security_monitoring_restricted_access" ON public.security_monitoring FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))';
        EXECUTE 'REVOKE ALL ON public.security_monitoring FROM PUBLIC, anon, authenticated';
    END IF;
END $$;

DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'threat_intelligence') THEN
        EXECUTE 'ALTER TABLE public.threat_intelligence ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "threat_intelligence_admin_only" ON public.threat_intelligence';
        EXECUTE 'DROP POLICY IF EXISTS "threat_intelligence_public_read" ON public.threat_intelligence';
        EXECUTE 'CREATE POLICY "threat_intelligence_restricted_access" ON public.threat_intelligence FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))';
        EXECUTE 'REVOKE ALL ON public.threat_intelligence FROM PUBLIC, anon, authenticated';
    END IF;
END $$;