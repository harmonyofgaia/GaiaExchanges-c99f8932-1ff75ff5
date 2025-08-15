-- Continue securing admin tables - Part 2

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

CREATE POLICY "admin_profiles_insert_super_admin_only" 
ON public.admin_profiles 
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

CREATE POLICY "admin_profiles_update_super_admin_only" 
ON public.admin_profiles 
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

CREATE POLICY "admin_profiles_delete_super_admin_only" 
ON public.admin_profiles 
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

-- 4. Clean up admin_sessions table policies (CRITICAL - has dangerous JWT check!)
DROP POLICY IF EXISTS "Admin sessions strict access" ON public.admin_sessions;
DROP POLICY IF EXISTS "Only admins can access admin sessions" ON public.admin_sessions;

-- Create secure policies for admin_sessions
CREATE POLICY "admin_sessions_select_own" 
ON public.admin_sessions 
FOR SELECT 
TO authenticated 
USING (user_id = auth.uid());

CREATE POLICY "admin_sessions_select_super_admin" 
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

CREATE POLICY "admin_sessions_insert_own" 
ON public.admin_sessions 
FOR INSERT 
TO authenticated 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "admin_sessions_update_own" 
ON public.admin_sessions 
FOR UPDATE 
TO authenticated 
USING (user_id = auth.uid()) 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "admin_sessions_update_super_admin" 
ON public.admin_sessions 
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

CREATE POLICY "admin_sessions_delete_own" 
ON public.admin_sessions 
FOR DELETE 
TO authenticated 
USING (user_id = auth.uid());

CREATE POLICY "admin_sessions_delete_super_admin" 
ON public.admin_sessions 
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