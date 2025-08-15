-- Fix security warnings by implementing proper RLS policies

-- 1. Secure trading_pairs table - restrict to authenticated users only
DROP POLICY IF EXISTS "Anyone can view trading pairs" ON public.trading_pairs;
CREATE POLICY "Authenticated users can view trading pairs"
ON public.trading_pairs
FOR SELECT
TO authenticated
USING (true);

-- 2. Secure transaction_types table - restrict to authenticated users only  
DROP POLICY IF EXISTS "Anyone can view transaction types" ON public.transaction_types;
CREATE POLICY "Authenticated users can view transaction types"
ON public.transaction_types
FOR SELECT
TO authenticated
USING (true);

-- 3. Secure staking_pools table - restrict to authenticated users only
DROP POLICY IF EXISTS "Anyone can view staking pools" ON public.staking_pools;
CREATE POLICY "Authenticated users can view staking pools"
ON public.staking_pools
FOR SELECT
TO authenticated
USING (true);

-- 4. Secure categories table - restrict to authenticated users (business intelligence)
DROP POLICY IF EXISTS "Anyone can view categories" ON public.categories;
CREATE POLICY "Authenticated users can view categories"
ON public.categories
FOR SELECT
TO authenticated
USING (true);

-- 5. Secure vr_animal_experiences table - restrict to authenticated users only
DROP POLICY IF EXISTS "Anyone can view VR experiences" ON public.vr_animal_experiences;
CREATE POLICY "Authenticated users can view VR experiences"
ON public.vr_animal_experiences
FOR SELECT
TO authenticated
USING (true);

-- 6. Secure animal_nfts table - already has proper policy for viewing, but let's ensure it's restrictive
-- Keep the existing "Anyone can view animal NFTs" policy but add note that this might need review
-- UPDATE: Actually secure it to authenticated users only to prevent NFT data exploitation
DROP POLICY IF EXISTS "Anyone can view animal NFTs" ON public.animal_nfts;
CREATE POLICY "Authenticated users can view animal NFTs"
ON public.animal_nfts
FOR SELECT
TO authenticated
USING (true);

-- 7. Secure green_projects table - restrict to authenticated users  
DROP POLICY IF EXISTS "Anyone can view green projects" ON public.green_projects;
CREATE POLICY "Authenticated users can view green projects"
ON public.green_projects
FOR SELECT
TO authenticated
USING (true);

-- 8. Secure fee_destinations table - restrict to authenticated users only
DROP POLICY IF EXISTS "Anyone can view fee destinations" ON public.fee_destinations;
CREATE POLICY "Authenticated users can view fee destinations"
ON public.fee_destinations
FOR SELECT
TO authenticated
USING (true);

-- Log security improvements
INSERT INTO public.security_audit_logs (
  action, 
  resource_type, 
  details, 
  risk_score
) VALUES (
  'security_warnings_fixed',
  'database_tables',
  jsonb_build_object(
    'status', 'completed',
    'tables_secured', ARRAY[
      'trading_pairs', 
      'transaction_types', 
      'staking_pools', 
      'categories', 
      'vr_animal_experiences', 
      'animal_nfts', 
      'green_projects', 
      'fee_destinations'
    ],
    'security_improvement', 'All sensitive tables now require authentication',
    'warnings_resolved', 8
  ),
  0
);