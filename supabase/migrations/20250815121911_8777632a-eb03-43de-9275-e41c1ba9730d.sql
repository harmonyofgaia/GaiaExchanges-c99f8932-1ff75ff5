-- Fix all security vulnerabilities by implementing proper RLS policies

-- 1. Secure AI system performance data (restrict to admins only)
ALTER TABLE public.ai_system_performance ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "System can access performance metrics" ON public.ai_system_performance;

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

DROP POLICY IF EXISTS "System can access AI learning database" ON public.ai_learning_database;

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

-- 4. Secure generated artwork (restrict to admins only)
ALTER TABLE public.generated_artwork ENABLE ROW LEVEL SECURITY;

CREATE POLICY "generated_artwork_admin_only"
ON public.generated_artwork
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

-- 5. Secure food places (owners can manage their own, authenticated users can view)
ALTER TABLE public.food_places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "food_places_owner_manage"
ON public.food_places
FOR INSERT, UPDATE, DELETE
TO authenticated
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());

CREATE POLICY "food_places_authenticated_view"
ON public.food_places
FOR SELECT
TO authenticated
USING (true);

-- 6. Secure green projects (owners and admins can manage, authenticated users can view)
DROP POLICY IF EXISTS "Green projects are viewable by authenticated users" ON public.green_projects;

CREATE POLICY "green_projects_authenticated_view"
ON public.green_projects
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "green_projects_owner_insert"
ON public.green_projects
FOR INSERT
TO authenticated
WITH CHECK (
  owner_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "green_projects_owner_update"
ON public.green_projects
FOR UPDATE
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

CREATE POLICY "green_projects_owner_delete"
ON public.green_projects
FOR DELETE
TO authenticated
USING (
  owner_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND is_active = true
  )
);