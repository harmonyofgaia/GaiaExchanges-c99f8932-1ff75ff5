-- Security Fix: Restrict access to sensitive security tables
-- This migration enhances security for tables containing sensitive threat intelligence,
-- security events, alerts, and logs to prevent unauthorized access.

-- First, create a dedicated security role checking function to avoid JWT issues
CREATE OR REPLACE FUNCTION public.is_security_admin()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Check if the current user is an admin through the admin_users table
  RETURN EXISTS (
    SELECT 1 
    FROM public.admin_users au
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true
  );
END;
$$;

-- Create a function to check if user is a super admin for the most sensitive operations
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  );
END;
$$;

-- Drop existing insecure policies
DROP POLICY IF EXISTS "Deny all access by default" ON public.security_events;
DROP POLICY IF EXISTS "Only admins can access security events" ON public.security_events;
DROP POLICY IF EXISTS "Users can only see their own security events" ON public.security_event_log;
DROP POLICY IF EXISTS "Only admins can access security event log" ON public.security_event_log;
DROP POLICY IF EXISTS "Only admins can access security logs" ON public.security_logs;
DROP POLICY IF EXISTS "Admins can view all logs" ON public.security_logs;
DROP POLICY IF EXISTS "Combined security log policy" ON public.security_log;
DROP POLICY IF EXISTS "Security alerts access" ON public.security_alerts;
DROP POLICY IF EXISTS "Admins can access threat intelligence" ON public.threat_intelligence;