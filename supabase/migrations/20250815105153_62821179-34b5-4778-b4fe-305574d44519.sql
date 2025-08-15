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
  user_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
);

CREATE POLICY "admin_accounts_insert_super_admin_only" 
ON public.admin_accounts 
FOR INSERT 
TO authenticated 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
);

CREATE POLICY "admin_accounts_update_super_admin_only" 
ON public.admin_accounts 
FOR UPDATE 
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

CREATE POLICY "admin_accounts_delete_super_admin_only" 
ON public.admin_accounts 
FOR DELETE 
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

-- 2. Clean up admin_users table policies (CRITICAL - has public access!)
DROP POLICY IF EXISTS "Admin users can view admin accounts" ON public.admin_users;
DROP POLICY IF EXISTS "Super admins can manage admin accounts" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can manage admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can view and manage admin users" ON public.admin_users;

-- Create secure policies for admin_users
CREATE POLICY "admin_users_select_secure" 
ON public.admin_users 
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

CREATE POLICY "admin_users_insert_super_admin_only" 
ON public.admin_users 
FOR INSERT 
TO authenticated 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
);

CREATE POLICY "admin_users_update_super_admin_only" 
ON public.admin_users 
FOR UPDATE 
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

CREATE POLICY "admin_users_delete_super_admin_only" 
ON public.admin_users 
FOR DELETE 
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