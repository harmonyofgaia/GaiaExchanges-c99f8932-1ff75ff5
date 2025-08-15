-- Final security fixes with correct syntax
-- Remove all public access first
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC, anon;

-- Enable RLS and create restrictive policies for admin tables
ALTER TABLE public.admin_accounts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_sessions_owner_only" ON public.admin_sessions;
CREATE POLICY "admin_sessions_owner_only" ON public.admin_sessions FOR ALL USING (user_id = auth.uid());

DROP POLICY IF EXISTS "admin_security_sessions_owner_only" ON public.admin_security_sessions;  
CREATE POLICY "admin_security_sessions_owner_only" ON public.admin_security_sessions FOR ALL USING (user_id = auth.uid());

-- Fix contact submissions
DROP POLICY IF EXISTS "contact_submissions_admin_read" ON public.contact_submissions;
DROP POLICY IF EXISTS "contact_submissions_public_insert" ON public.contact_submissions;
CREATE POLICY "contact_submissions_admin_read" ON public.contact_submissions FOR SELECT USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true));
CREATE POLICY "contact_submissions_public_insert" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- Fix financial tables if they exist
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'wallets') THEN
        EXECUTE 'ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "wallets_owner_only" ON public.wallets';
        EXECUTE 'CREATE POLICY "wallets_owner_only" ON public.wallets FOR ALL USING (user_id = auth.uid())';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'transactions') THEN
        EXECUTE 'ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "transactions_owner_only" ON public.transactions';
        EXECUTE 'CREATE POLICY "transactions_owner_only" ON public.transactions FOR ALL USING (user_id = auth.uid() OR from_user_id = auth.uid() OR to_user_id = auth.uid())';
    END IF;
END $$;

-- Fix security tables
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'security_events') THEN
        EXECUTE 'ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "security_events_admin_only" ON public.security_events';
        EXECUTE 'CREATE POLICY "security_events_admin_only" ON public.security_events FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'security_logs') THEN
        EXECUTE 'ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS "security_logs_admin_only" ON public.security_logs';
        EXECUTE 'CREATE POLICY "security_logs_admin_only" ON public.security_logs FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = true))';
    END IF;
END $$;

-- Grant only necessary authenticated access to safe tables
GRANT SELECT ON public.categories TO authenticated;
GRANT SELECT ON public.animal_nfts TO authenticated;
GRANT INSERT ON public.contact_submissions TO authenticated;