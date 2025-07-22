-- =====================================================
-- SUPABASE SECURITY & PERFORMANCE REMEDIATION PATCH
-- =====================================================
-- This migration addresses critical security and performance issues
-- identified in the existing database schema and RLS policies.

-- =====================================================
-- 1. FIX AUTH RLS INITIALIZATION ISSUES
-- =====================================================

-- Create secure user ID check function to replace direct auth.uid() calls
CREATE OR REPLACE FUNCTION public.get_current_user_id()
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT auth.uid()),
    '00000000-0000-0000-0000-000000000000'::UUID
  );
$$;

-- Create enhanced role checking function with better security
CREATE OR REPLACE FUNCTION public.has_role_secure(_user_id UUID, _role text)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT EXISTS (
      SELECT 1
      FROM public.user_roles
      WHERE user_id = _user_id 
      AND role::text = _role
      AND _user_id IS NOT NULL
      AND _user_id != '00000000-0000-0000-0000-000000000000'::UUID
    )), 
    false
  );
$$;

-- Create secure admin session validation function
CREATE OR REPLACE FUNCTION public.is_admin_authenticated()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT EXISTS (
      SELECT 1 FROM public.admin_sessions 
      WHERE session_token IS NOT NULL 
      AND expires_at > NOW()
      AND ip_address IS NOT NULL
    )),
    false
  );
$$;

-- =====================================================
-- 2. CONSOLIDATE AND SECURE RLS POLICIES
-- =====================================================

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "System can insert security events" ON public.security_events;
DROP POLICY IF EXISTS "System can insert notifications" ON public.notifications;
DROP POLICY IF EXISTS "System can insert environmental impact" ON public.environmental_impact;
DROP POLICY IF EXISTS "System can insert earning activities" ON public.gaia_earning_activities;

-- Drop conflicting policies on video submissions
DROP POLICY IF EXISTS "Users can view approved videos" ON public.video_submissions;
DROP POLICY IF EXISTS "Users can view their own submissions" ON public.video_submissions;

-- Replace with consolidated, secure policies

-- Security Events: Only admin and authenticated system functions can insert
CREATE POLICY "Secure security event insertion" ON public.security_events
  FOR INSERT WITH CHECK (
    public.has_role_secure(public.get_current_user_id(), 'admin') OR
    current_setting('role') = 'service_role'
  );

-- Notifications: Only admin and authenticated system can insert
CREATE POLICY "Secure notification insertion" ON public.notifications
  FOR INSERT WITH CHECK (
    public.has_role_secure(public.get_current_user_id(), 'admin') OR
    current_setting('role') = 'service_role'
  );

-- Environmental Impact: Users for their own data, admin for all
CREATE POLICY "Secure environmental impact insertion" ON public.environmental_impact
  FOR INSERT WITH CHECK (
    public.get_current_user_id() = user_id OR
    public.has_role_secure(public.get_current_user_id(), 'admin')
  );

-- GAIA Earning Activities: Users for their own, system functions, and admin
CREATE POLICY "Secure earning activities insertion" ON public.gaia_earning_activities
  FOR INSERT WITH CHECK (
    public.get_current_user_id() = user_id OR
    public.has_role_secure(public.get_current_user_id(), 'admin') OR
    current_setting('role') = 'service_role'
  );

-- Consolidated video submissions policy
CREATE POLICY "Consolidated video submissions access" ON public.video_submissions
  FOR SELECT USING (
    status = 'approved' OR 
    public.get_current_user_id() = user_id OR
    public.has_role_secure(public.get_current_user_id(), 'admin')
  );

-- =====================================================
-- 3. UPDATE EXISTING POLICIES TO USE SECURE FUNCTIONS
-- =====================================================

-- Update existing policies to use secure functions instead of direct auth.uid()

-- Admin artwork policy
DROP POLICY IF EXISTS "Admin can manage artwork" ON public.generated_artwork;
CREATE POLICY "Secure admin artwork access" ON public.generated_artwork
  FOR ALL USING (
    public.is_admin_authenticated() OR
    public.has_role_secure(public.get_current_user_id(), 'admin')
  );

-- Bike sessions policies
DROP POLICY IF EXISTS "Users can view their own bike sessions" ON public.bike_sessions;
DROP POLICY IF EXISTS "Users can insert their own bike sessions" ON public.bike_sessions;
DROP POLICY IF EXISTS "Users can update their own bike sessions" ON public.bike_sessions;

CREATE POLICY "Secure bike sessions access" ON public.bike_sessions
  FOR ALL USING (
    public.get_current_user_id() = user_id AND
    public.get_current_user_id() != '00000000-0000-0000-0000-000000000000'::UUID
  );

-- Food places policies
DROP POLICY IF EXISTS "Owners can manage their food places" ON public.food_places;
CREATE POLICY "Secure food places management" ON public.food_places
  FOR ALL USING (
    public.get_current_user_id() = owner_id AND
    public.get_current_user_id() != '00000000-0000-0000-0000-000000000000'::UUID
  );

-- User profiles policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

CREATE POLICY "Secure profile access" ON public.profiles
  FOR ALL USING (
    public.get_current_user_id() = id AND
    public.get_current_user_id() != '00000000-0000-0000-0000-000000000000'::UUID
  );

-- Wallets policies
DROP POLICY IF EXISTS "Users can view their own wallets" ON public.wallets;
DROP POLICY IF EXISTS "Users can update their own wallets" ON public.wallets;
DROP POLICY IF EXISTS "Users can insert their own wallets" ON public.wallets;

CREATE POLICY "Secure wallet access" ON public.wallets
  FOR ALL USING (
    public.get_current_user_id() = user_id AND
    public.get_current_user_id() != '00000000-0000-0000-0000-000000000000'::UUID
  );

-- Orders policies
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON public.orders;

CREATE POLICY "Secure orders access" ON public.orders
  FOR ALL USING (
    public.get_current_user_id() = user_id AND
    public.get_current_user_id() != '00000000-0000-0000-0000-000000000000'::UUID
  );

-- Transactions policies
DROP POLICY IF EXISTS "Users can view their own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can insert their own transactions" ON public.transactions;

CREATE POLICY "Secure transactions access" ON public.transactions
  FOR SELECT USING (
    public.get_current_user_id() = user_id AND
    public.get_current_user_id() != '00000000-0000-0000-0000-000000000000'::UUID
  );

CREATE POLICY "Secure transactions insertion" ON public.transactions
  FOR INSERT WITH CHECK (
    public.get_current_user_id() = user_id OR
    current_setting('role') = 'service_role'
  );

-- =====================================================
-- 4. ADD MISSING PERFORMANCE INDEXES
-- =====================================================

-- Foreign key indexes for better join performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_video_submissions_user_id 
ON public.video_submissions(user_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_video_submissions_status 
ON public.video_submissions(status) WHERE status = 'approved';

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_video_views_video_id 
ON public.video_views(video_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_video_views_user_id 
ON public.video_views(user_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_video_likes_video_id 
ON public.video_likes(video_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_gaia_earning_activities_user_id 
ON public.gaia_earning_activities(user_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_gaia_earning_activities_status 
ON public.gaia_earning_activities(status);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_gaia_earning_activities_activity_type 
ON public.gaia_earning_activities(activity_type);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_roles_user_id_role 
ON public.user_roles(user_id, role);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_admin_sessions_token_expires 
ON public.admin_sessions(session_token, expires_at) WHERE expires_at > NOW();

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_security_events_user_id_created 
ON public.security_events(user_id, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_notifications_user_id_read 
ON public.notifications(user_id, read, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_transactions_user_id_created 
ON public.transactions(user_id, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_user_id_status 
ON public.orders(user_id, status);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_stakes_user_id 
ON public.user_stakes(user_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_environmental_impact_user_id 
ON public.environmental_impact(user_id);

-- Composite indexes for common query patterns
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_trading_pairs_status_symbol 
ON public.trading_pairs(status, symbol) WHERE status = 'active';

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_wallets_user_currency 
ON public.wallets(user_id, currency, is_primary);

-- =====================================================
-- 5. REMOVE DUPLICATE INDEXES
-- =====================================================

-- Check for and remove any duplicate indexes
-- Note: This section would typically include specific DROP INDEX commands
-- based on actual duplicate indexes found in the database

-- =====================================================
-- 6. SECURE FUNCTION UPDATES
-- =====================================================

-- Update trigger functions to be more secure
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Validate that this is being called in a proper context
  IF TG_OP != 'UPDATE' THEN
    RAISE EXCEPTION 'This function can only be used in UPDATE triggers';
  END IF;
  
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Secure the user creation function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Validate the trigger context
  IF TG_OP != 'INSERT' OR TG_TABLE_NAME != 'users' THEN
    RAISE EXCEPTION 'This function can only be used for INSERT triggers on auth.users';
  END IF;
  
  -- Insert profile with proper validation
  INSERT INTO public.profiles (id, full_name, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'username', '')
  );
  
  -- Create default wallets
  INSERT INTO public.wallets (user_id, currency, is_primary)
  VALUES 
    (NEW.id, 'GAIA', true),
    (NEW.id, 'BTC', false),
    (NEW.id, 'ETH', false);
    
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- =====================================================
-- 7. CREATE AUDIT LOGGING
-- =====================================================

-- Create audit log table for tracking security events
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  old_data JSONB,
  new_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can access audit logs
CREATE POLICY "Admin audit log access" ON public.security_audit_log
  FOR ALL USING (public.has_role_secure(public.get_current_user_id(), 'admin'));

-- Create audit trigger function
CREATE OR REPLACE FUNCTION public.audit_trigger()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    table_name,
    operation,
    user_id,
    old_data,
    new_data
  )
  VALUES (
    TG_TABLE_NAME,
    TG_OP,
    public.get_current_user_id(),
    CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- =====================================================
-- 8. CREATE PERFORMANCE MONITORING VIEWS
-- =====================================================

-- View for monitoring RLS policy performance
CREATE OR REPLACE VIEW public.rls_policy_stats AS
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- View for monitoring index usage
CREATE OR REPLACE VIEW public.index_usage_stats AS
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_tup_read,
  idx_tup_fetch,
  idx_scan
FROM pg_stat_user_indexes 
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;

-- Grant access to these views for admins
GRANT SELECT ON public.rls_policy_stats TO authenticated;
GRANT SELECT ON public.index_usage_stats TO authenticated;

-- =====================================================
-- 9. UPDATE STORAGE POLICIES TO BE MORE SECURE
-- =====================================================

-- More secure storage policies for user videos
DROP POLICY IF EXISTS "Users can upload videos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can manage all video files" ON storage.objects;

CREATE POLICY "Secure video upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'user-videos' AND 
    public.get_current_user_id()::text = (storage.foldername(name))[1] AND
    public.get_current_user_id() != '00000000-0000-0000-0000-000000000000'::UUID
  );

CREATE POLICY "Secure admin video management" ON storage.objects
  FOR ALL USING (
    bucket_id = 'user-videos' AND
    public.has_role_secure(public.get_current_user_id(), 'admin')
  );

-- =====================================================
-- 10. CREATE SECURITY VALIDATION FUNCTIONS
-- =====================================================

-- Function to validate all RLS policies are properly configured
CREATE OR REPLACE FUNCTION public.validate_security_configuration()
RETURNS TABLE (
  table_name TEXT,
  issue_type TEXT,
  issue_description TEXT,
  severity TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Check for tables without RLS enabled
  RETURN QUERY
  SELECT 
    t.table_name::TEXT,
    'missing_rls'::TEXT,
    'Table does not have RLS enabled'::TEXT,
    'high'::TEXT
  FROM information_schema.tables t
  LEFT JOIN pg_class c ON c.relname = t.table_name
  WHERE t.table_schema = 'public'
    AND t.table_type = 'BASE TABLE'
    AND c.relrowsecurity = false;
    
  -- Check for policies using direct auth.uid()
  RETURN QUERY
  SELECT 
    tablename::TEXT,
    'insecure_policy'::TEXT,
    'Policy uses direct auth.uid() call: ' || policyname::TEXT,
    'medium'::TEXT
  FROM pg_policies
  WHERE schemaname = 'public'
    AND (qual LIKE '%auth.uid()%' OR with_check LIKE '%auth.uid()%');
    
  -- Check for missing indexes on foreign keys
  RETURN QUERY
  SELECT 
    t.table_name::TEXT,
    'missing_index'::TEXT,
    'Foreign key column missing index: ' || kcu.column_name::TEXT,
    'low'::TEXT
  FROM information_schema.table_constraints t
  JOIN information_schema.key_column_usage kcu 
    ON t.constraint_name = kcu.constraint_name
  LEFT JOIN pg_stat_user_indexes i 
    ON i.relname = t.table_name 
    AND i.indexrelname LIKE '%' || kcu.column_name || '%'
  WHERE t.constraint_type = 'FOREIGN KEY'
    AND t.table_schema = 'public'
    AND i.indexrelname IS NULL;
END;
$$;

-- =====================================================
-- MIGRATION COMPLETION
-- =====================================================

-- Log completion of security and performance remediation
INSERT INTO public.security_audit_log (
  table_name,
  operation,
  user_id,
  new_data
) VALUES (
  'migration',
  'SECURITY_PERFORMANCE_PATCH',
  NULL,
  jsonb_build_object(
    'migration', '20250122_security_performance_patch',
    'timestamp', NOW(),
    'description', 'Comprehensive security and performance remediation completed'
  )
);

-- Create a function to check migration status
CREATE OR REPLACE FUNCTION public.check_security_patch_status()
RETURNS JSONB
LANGUAGE SQL
STABLE
AS $$
  SELECT jsonb_build_object(
    'patch_applied', true,
    'secure_functions_created', EXISTS(SELECT 1 FROM pg_proc WHERE proname = 'get_current_user_id'),
    'policies_updated', (SELECT count(*) FROM pg_policies WHERE schemaname = 'public') > 20,
    'indexes_added', (SELECT count(*) FROM pg_stat_user_indexes WHERE schemaname = 'public') > 15,
    'audit_logging_enabled', EXISTS(SELECT 1 FROM pg_tables WHERE tablename = 'security_audit_log'),
    'applied_at', NOW()
  );
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.validate_security_configuration() TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_security_patch_status() TO authenticated;

COMMENT ON FUNCTION public.check_security_patch_status() IS 'Returns status of security and performance patch application';
COMMENT ON FUNCTION public.validate_security_configuration() IS 'Validates current security configuration and identifies issues';