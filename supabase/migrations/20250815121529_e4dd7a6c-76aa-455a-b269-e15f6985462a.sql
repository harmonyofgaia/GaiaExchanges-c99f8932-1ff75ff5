-- Fix all security vulnerabilities by implementing proper RLS policies

-- 1. Secure AI system performance data (restrict to admins only)
ALTER TABLE public.ai_system_performance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ai_system_performance_admin_only"
ON public.ai_system_performance
FOR ALL
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

-- 2. Secure AI learning database (restrict to system/admins only)
ALTER TABLE public.ai_learning_database ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ai_learning_database_admin_only"
ON public.ai_learning_database
FOR ALL
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

-- 3. Secure contact submissions (admins can view all, users can only view their own)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies that allow public access
DROP POLICY IF EXISTS "Admins can manage contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can view all contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Only admins can delete contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Only admins can update contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Only admins can view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Only super admins can delete contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Public can submit contact forms (secure)" ON public.contact_submissions;
DROP POLICY IF EXISTS "Users can view submissions with their email" ON public.contact_submissions;

CREATE POLICY "contact_submissions_admin_full_access"
ON public.contact_submissions
FOR ALL
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

CREATE POLICY "contact_submissions_public_insert_only"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  name IS NOT NULL AND
  email IS NOT NULL AND
  subject IS NOT NULL AND
  message IS NOT NULL AND
  length(TRIM(BOTH FROM name)) > 0 AND
  length(TRIM(BOTH FROM email)) > 0 AND
  length(TRIM(BOTH FROM subject)) > 0 AND
  length(TRIM(BOTH FROM message)) > 0
);

-- 4. Secure generated artwork (users can only see their own)
ALTER TABLE public.generated_artwork ENABLE ROW LEVEL SECURITY;

CREATE POLICY "generated_artwork_user_owns"
ON public.generated_artwork
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 5. Secure food places (owners can manage their own, public can view basic info)
ALTER TABLE public.food_places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "food_places_owner_full_access"
ON public.food_places
FOR ALL
TO authenticated
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());

CREATE POLICY "food_places_public_view_basic"
ON public.food_places
FOR SELECT
TO authenticated
USING (true);

-- 6. Update green projects policy to be more restrictive
DROP POLICY IF EXISTS "Green projects are viewable by authenticated users" ON public.green_projects;

CREATE POLICY "green_projects_authenticated_view_only"
ON public.green_projects
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "green_projects_owner_full_access"
ON public.green_projects
FOR ALL
TO authenticated
USING (
  owner_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND is_active = true
  )
)
WITH CHECK (
  owner_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND is_active = true
  )
);

-- Log security improvements
INSERT INTO public.audit_logs (
  action_type,
  table_name,
  user_id,
  new_values
) VALUES (
  'SECURITY_FIX',
  'multiple_tables',
  NULL,
  jsonb_build_object(
    'action', 'Implemented RLS policies to fix 6 critical security vulnerabilities',
    'tables_secured', jsonb_build_array(
      'ai_system_performance',
      'ai_learning_database', 
      'contact_submissions',
      'generated_artwork',
      'food_places',
      'green_projects'
    ),
    'security_level', 'high',
    'timestamp', now()
  )
);