-- Fix all critical security issues by implementing proper RLS policies

-- 1. Fix contact_submissions table (no user_id column - anonymous submissions)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Only admins can view contact submissions" ON public.contact_submissions;

-- Allow anyone to submit contact forms (anonymous)
CREATE POLICY "Allow public contact submissions"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);

-- Only admins can view contact submissions
CREATE POLICY "Only admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
USING (auth.jwt() ->> 'role' = 'admin');

-- Admins can manage submissions
CREATE POLICY "Admins can manage contact submissions"
ON public.contact_submissions
FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- 2. Fix admin_sessions table - CRITICAL
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Only admins can access admin sessions" ON public.admin_sessions;

CREATE POLICY "Only admins can access admin sessions"
ON public.admin_sessions
FOR ALL
USING (auth.jwt() ->> 'role' = 'admin' OR auth.uid()::text = user_id::text);

-- 3. Fix security logs tables - CRITICAL
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_event_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Only admins can access security logs" ON public.security_logs;
DROP POLICY IF EXISTS "Only admins can access security events" ON public.security_events;
DROP POLICY IF EXISTS "Only admins can access security event log" ON public.security_event_log;

CREATE POLICY "Only admins can access security logs"
ON public.security_logs
FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can access security events"
ON public.security_events
FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can access security event log"
ON public.security_event_log
FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- 4. Fix admin audit logs - CRITICAL
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Only admins can access audit logs" ON public.admin_audit_logs;
DROP POLICY IF EXISTS "Only admins can access activity logs" ON public.admin_activity_logs;

CREATE POLICY "Only admins can access audit logs"
ON public.admin_audit_logs
FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can access activity logs"
ON public.admin_activity_logs
FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- 5. Fix wallets table - CRITICAL financial data
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own wallets" ON public.wallets;
DROP POLICY IF EXISTS "Users can update their own wallets" ON public.wallets;
DROP POLICY IF EXISTS "Users can insert their own wallets" ON public.wallets;

CREATE POLICY "Users can view their own wallets"
ON public.wallets
FOR SELECT
USING (auth.uid() = user_id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can update their own wallets"
ON public.wallets
FOR UPDATE
USING (auth.uid() = user_id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can insert their own wallets"
ON public.wallets
FOR INSERT
WITH CHECK (auth.uid() = user_id OR auth.jwt() ->> 'role' = 'admin');

-- 6. Fix profiles table (no user_id, using id instead)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin');

-- 7. Fix transactions table - CRITICAL financial data
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can insert their own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Admins can manage all transactions" ON public.transactions;

CREATE POLICY "Users can view their own transactions"
ON public.transactions
FOR SELECT
USING (auth.uid() = user_id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can insert their own transactions"
ON public.transactions
FOR INSERT
WITH CHECK (auth.uid() = user_id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage all transactions"
ON public.transactions
FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');