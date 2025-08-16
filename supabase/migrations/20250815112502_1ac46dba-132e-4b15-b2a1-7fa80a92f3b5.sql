-- SECURITY FIX: Restrict admin_accounts table access to super admins only
-- Remove existing permissive policies that allow regular admins to see their own data

-- Drop existing policies
DROP POLICY IF EXISTS "admin_accounts_select_super_admin_only" ON public.admin_accounts;
DROP POLICY IF EXISTS "admin_accounts_insert_super_admin_only" ON public.admin_accounts;
DROP POLICY IF EXISTS "admin_accounts_update_super_admin_only" ON public.admin_accounts;
DROP POLICY IF EXISTS "admin_accounts_delete_super_admin_only" ON public.admin_accounts;

-- Create new strict super admin only policies
-- These policies ensure ONLY super admins can access admin account information

-- SELECT policy: Only super admins can view admin accounts
CREATE POLICY "admin_accounts_super_admin_select_only" ON public.admin_accounts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 
      FROM public.admin_users au
      JOIN public.admin_profiles ap ON au.user_id = ap.user_id
      WHERE au.user_id = auth.uid() 
      AND au.is_active = true 
      AND ap.role = 'super_admin'
    )
  );

-- INSERT policy: Only super admins can create admin accounts
CREATE POLICY "admin_accounts_super_admin_insert_only" ON public.admin_accounts
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 
      FROM public.admin_users au
      JOIN public.admin_profiles ap ON au.user_id = ap.user_id
      WHERE au.user_id = auth.uid() 
      AND au.is_active = true 
      AND ap.role = 'super_admin'
    )
  );

-- UPDATE policy: Only super admins can modify admin accounts
CREATE POLICY "admin_accounts_super_admin_update_only" ON public.admin_accounts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 
      FROM public.admin_users au
      JOIN public.admin_profiles ap ON au.user_id = ap.user_id
      WHERE au.user_id = auth.uid() 
      AND au.is_active = true 
      AND ap.role = 'super_admin'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 
      FROM public.admin_users au
      JOIN public.admin_profiles ap ON au.user_id = ap.user_id
      WHERE au.user_id = auth.uid() 
      AND au.is_active = true 
      AND ap.role = 'super_admin'
    )
  );

-- DELETE policy: Only super admins can delete admin accounts
CREATE POLICY "admin_accounts_super_admin_delete_only" ON public.admin_accounts
  FOR DELETE USING (
    EXISTS (
      SELECT 1 
      FROM public.admin_users au
      JOIN public.admin_profiles ap ON au.user_id = ap.user_id
      WHERE au.user_id = auth.uid() 
      AND au.is_active = true 
      AND ap.role = 'super_admin'
    )
  );

-- Create audit log for this security fix
INSERT INTO public.security_audit_logs (
  action, 
  resource_type, 
  details, 
  risk_score
) VALUES (
  'security_policy_hardening',
  'admin_accounts_table',
  jsonb_build_object(
    'fix', 'restricted_admin_accounts_access_to_super_admins_only',
    'previous_policy', 'allowed_regular_admins_to_see_own_data',
    'new_policy', 'super_admin_only_access'
  ),
  8
);

-- Create security function to safely check if current user can manage admin accounts
-- This provides a secure way for the application to check permissions
CREATE OR REPLACE FUNCTION public.can_manage_admin_accounts()
RETURNS BOOLEAN
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

-- Log this security enhancement
INSERT INTO public.security_incidents (
  incident_type,
  severity,
  details,
  resolved,
  resolved_at,
  resolved_by
) VALUES (
  'admin_data_exposure_vulnerability',
  'high',
  jsonb_build_object(
    'vulnerability', 'admin_accounts_table_exposed_to_regular_admins',
    'fix_applied', 'restricted_access_to_super_admins_only',
    'timestamp', now()
  ),
  true,
  now(),
  auth.uid()
);