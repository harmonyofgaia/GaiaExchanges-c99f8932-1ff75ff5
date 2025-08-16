-- Fix security vulnerability: Consolidate profiles RLS policies to prevent data exposure
-- Drop all existing overlapping policies
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view profiles for support" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can only view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "profiles_delete_consolidated" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_consolidated" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_consolidated" ON public.profiles;

-- Create consolidated, secure RLS policies
-- Policy 1: Users can only view their own profile data
CREATE POLICY "profiles_select_own_only" 
ON public.profiles 
FOR SELECT 
TO authenticated 
USING (id = auth.uid());

-- Policy 2: Admin users can view all profiles (using secure function)
CREATE POLICY "profiles_select_admin" 
ON public.profiles 
FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

-- Policy 3: Users can insert only their own profile
CREATE POLICY "profiles_insert_own_only" 
ON public.profiles 
FOR INSERT 
TO authenticated 
WITH CHECK (id = auth.uid());

-- Policy 4: Users can update only their own profile
CREATE POLICY "profiles_update_own_only" 
ON public.profiles 
FOR UPDATE 
TO authenticated 
USING (id = auth.uid()) 
WITH CHECK (id = auth.uid());

-- Policy 5: Admin users can update any profile
CREATE POLICY "profiles_update_admin" 
ON public.profiles 
FOR UPDATE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
) 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

-- Policy 6: No deletion allowed (profiles should be kept for audit purposes)
CREATE POLICY "profiles_no_delete" 
ON public.profiles 
FOR DELETE 
TO authenticated 
USING (false);

-- Add security logging for profile access
CREATE OR REPLACE FUNCTION public.log_profile_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log sensitive profile access
  INSERT INTO public.security_monitoring (
    event_type,
    user_id,
    details,
    severity
  ) VALUES (
    'profile_access',
    auth.uid(),
    jsonb_build_object(
      'accessed_profile_id', COALESCE(NEW.id, OLD.id),
      'operation', TG_OP,
      'timestamp', NOW()
    ),
    CASE 
      WHEN auth.uid() != COALESCE(NEW.id, OLD.id) THEN 'medium'
      ELSE 'low'
    END
  );
  
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Create trigger for profile access logging
DROP TRIGGER IF EXISTS profile_access_logger ON public.profiles;
CREATE TRIGGER profile_access_logger
  AFTER INSERT OR UPDATE OR DELETE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.log_profile_access();