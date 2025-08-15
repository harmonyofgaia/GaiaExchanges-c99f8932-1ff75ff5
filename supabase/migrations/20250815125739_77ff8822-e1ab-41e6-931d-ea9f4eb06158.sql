-- Clean up overlapping policies and ensure proper security

-- 1. Clean trading_pairs policies (remove public access)
DROP POLICY IF EXISTS "trading_pairs_select" ON public.trading_pairs;
DROP POLICY IF EXISTS "Authenticated users can view trading pairs" ON public.trading_pairs;

-- 2. Clean staking_pools policies
DROP POLICY IF EXISTS "staking_pools_select" ON public.staking_pools;
DROP POLICY IF EXISTS "Authenticated users can view staking pools" ON public.staking_pools;

-- 3. Clean fee_destinations policies (remove public access)
DROP POLICY IF EXISTS "Authenticated users can view fee destinations" ON public.fee_destinations;
DROP POLICY IF EXISTS "Public can view fee destinations" ON public.fee_destinations;

-- 4. Clean transaction_types policies
DROP POLICY IF EXISTS "Transaction types are viewable by authenticated users" ON public.transaction_types;
DROP POLICY IF EXISTS "Authenticated users can view transaction types" ON public.transaction_types;

-- 5. Clean vr_animal_experiences policies
DROP POLICY IF EXISTS "Authenticated users can view VR experiences" ON public.vr_animal_experiences;

-- Now let's make sure we disable any public access entirely for these sensitive tables
-- Check if there are any public roles and remove them

-- Revoke all public access from these sensitive tables
REVOKE ALL ON public.trading_pairs FROM public;
REVOKE ALL ON public.staking_pools FROM public;
REVOKE ALL ON public.fee_destinations FROM public;
REVOKE ALL ON public.vr_animal_experiences FROM public;
REVOKE ALL ON public.animal_nfts FROM public;
REVOKE ALL ON public.transaction_types FROM public;

-- Ensure only authenticated users have appropriate access
GRANT SELECT ON public.trading_pairs TO authenticated;
GRANT SELECT ON public.staking_pools TO authenticated;
GRANT SELECT ON public.vr_animal_experiences TO authenticated;
GRANT SELECT ON public.animal_nfts TO authenticated;
GRANT SELECT ON public.transaction_types TO authenticated;

-- Fee destinations should only be accessible to admins (no grant to authenticated)

-- Log this security hardening
INSERT INTO public.audit_logs (
  action_type,
  table_name,
  user_id,
  new_values
) VALUES (
  'SECURITY_HARDENING',
  'multiple_tables',
  NULL,
  jsonb_build_object(
    'action', 'Removed overlapping policies and revoked public access',
    'tables_hardened', jsonb_build_array(
      'trading_pairs',
      'staking_pools', 
      'fee_destinations',
      'vr_animal_experiences',
      'animal_nfts',
      'transaction_types'
    ),
    'changes', 'Revoked public access, cleaned duplicate policies',
    'timestamp', now()
  )
);