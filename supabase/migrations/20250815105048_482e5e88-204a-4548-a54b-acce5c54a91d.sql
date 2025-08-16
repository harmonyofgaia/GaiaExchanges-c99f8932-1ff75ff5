-- CRITICAL SECURITY FIX: Secure all admin tables from unauthorized access
-- This prevents exposure of sensitive admin data to attackers

-- 1. Clean up admin_accounts table policies
DROP POLICY IF EXISTS "Admins can view their own account" ON public.admin_accounts;
DROP POLICY IF EXISTS "Super admins can manage all admin accounts" ON public.admin_accounts;

-- Create secure policies for admin_accounts
CREATE POLICY "admin_accounts_select_super_admin_only" 
ON public.admin_accounts 
FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
    AND au.user_id = admin_accounts.user_id
  ) OR user_id = auth.uid()
);

CREATE POLICY "admin_accounts_manage_super_admin_only" 
ON public.admin_accounts 
FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
) 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
);

-- 2. Clean up admin_users table policies (CRITICAL - has public access!)
DROP POLICY IF EXISTS "Admin users can view admin accounts" ON public.admin_users;
DROP POLICY IF EXISTS "Super admins can manage admin accounts" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can manage admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can view and manage admin users" ON public.admin_users;

-- Create secure policies for admin_users
CREATE POLICY "admin_users_select_super_admin_only" 
ON public.admin_users 
FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  ) OR user_id = auth.uid()
);

CREATE POLICY "admin_users_manage_super_admin_only" 
ON public.admin_users 
FOR INSERT, UPDATE, DELETE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
) 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
);

-- 3. Clean up admin_profiles table policies (CRITICAL - has public access!)
DROP POLICY IF EXISTS "Admins can manage profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "Admin users can access admin profiles" ON public.admin_profiles;

-- Create secure policies for admin_profiles
CREATE POLICY "admin_profiles_select_secure" 
ON public.admin_profiles 
FOR SELECT 
TO authenticated 
USING (
  user_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
);

CREATE POLICY "admin_profiles_manage_super_admin_only" 
ON public.admin_profiles 
FOR INSERT, UPDATE, DELETE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
) 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
);

-- 4. Clean up admin_sessions table policies (CRITICAL - has dangerous JWT check!)
DROP POLICY IF EXISTS "Admin sessions strict access" ON public.admin_sessions;
DROP POLICY IF EXISTS "Only admins can access admin sessions" ON public.admin_sessions;

-- Create secure policies for admin_sessions
CREATE POLICY "admin_sessions_own_only" 
ON public.admin_sessions 
FOR SELECT 
TO authenticated 
USING (user_id = auth.uid());

CREATE POLICY "admin_sessions_super_admin_view_all" 
ON public.admin_sessions 
FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
);

CREATE POLICY "admin_sessions_own_manage" 
ON public.admin_sessions 
FOR INSERT, UPDATE, DELETE 
TO authenticated 
USING (user_id = auth.uid()) 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "admin_sessions_super_admin_manage" 
ON public.admin_sessions 
FOR INSERT, UPDATE, DELETE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
) 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
);

-- 5. Create secure admin access logging function
CREATE OR REPLACE FUNCTION public.log_admin_access_event()
RETURNS TRIGGER AS $$
DECLARE
    accessing_user_id uuid := auth.uid();
    is_super_admin boolean := false;
    target_user_id uuid;
BEGIN
    -- Check if accessing user is super admin
    SELECT EXISTS (
        SELECT 1 FROM public.admin_users au
        JOIN public.admin_profiles ap ON au.user_id = ap.user_id
        WHERE au.user_id = accessing_user_id 
        AND au.is_active = true 
        AND ap.role = 'super_admin'
    ) INTO is_super_admin;
    
    -- Get target user ID from the record
    target_user_id := COALESCE(NEW.user_id, OLD.user_id);
    
    -- Log all admin table access for security monitoring
    INSERT INTO public.security_monitoring (
        event_type,
        user_id,
        details,
        severity
    ) VALUES (
        'admin_table_access',
        accessing_user_id,
        jsonb_build_object(
            'table_name', TG_TABLE_NAME,
            'operation', TG_OP,
            'timestamp', NOW(),
            'is_super_admin', is_super_admin,
            'target_user_id', target_user_id,
            'is_cross_user_access', (accessing_user_id != target_user_id),
            'admin_data_exposed', true
        ),
        CASE 
            WHEN accessing_user_id != target_user_id AND NOT is_super_admin THEN 'critical'
            WHEN TG_OP IN ('UPDATE', 'DELETE') THEN 'high'
            ELSE 'medium'
        END
    );
    
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Add audit triggers to all admin tables
DROP TRIGGER IF EXISTS admin_accounts_audit ON public.admin_accounts;
CREATE TRIGGER admin_accounts_audit
    AFTER INSERT OR UPDATE OR DELETE ON public.admin_accounts
    FOR EACH ROW EXECUTE FUNCTION public.log_admin_access_event();

DROP TRIGGER IF EXISTS admin_users_audit ON public.admin_users;
CREATE TRIGGER admin_users_audit
    AFTER INSERT OR UPDATE OR DELETE ON public.admin_users
    FOR EACH ROW EXECUTE FUNCTION public.log_admin_access_event();

DROP TRIGGER IF EXISTS admin_profiles_audit ON public.admin_profiles;
CREATE TRIGGER admin_profiles_audit
    AFTER INSERT OR UPDATE OR DELETE ON public.admin_profiles
    FOR EACH ROW EXECUTE FUNCTION public.log_admin_access_event();

DROP TRIGGER IF EXISTS admin_sessions_audit ON public.admin_sessions;
CREATE TRIGGER admin_sessions_audit
    AFTER INSERT OR UPDATE OR DELETE ON public.admin_sessions
    FOR EACH ROW EXECUTE FUNCTION public.log_admin_access_event();