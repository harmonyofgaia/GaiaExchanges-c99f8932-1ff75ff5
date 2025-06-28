
-- First, drop all the policies that depend on the has_role function
DROP POLICY IF EXISTS "Admins can manage trading pairs" ON public.trading_pairs;
DROP POLICY IF EXISTS "Admins can manage staking pools" ON public.staking_pools;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all wallets" ON public.wallets;
DROP POLICY IF EXISTS "Admins can manage all transactions" ON public.transactions;
DROP POLICY IF EXISTS "Admins can manage all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all security events" ON public.security_events;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- Drop the trigger BEFORE dropping the function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Now we can safely remove the admin role functionality
DROP FUNCTION IF EXISTS public.grant_admin_role(text);
DROP FUNCTION IF EXISTS public.has_role(uuid, user_role);

-- Drop the user_roles table
DROP TABLE IF EXISTS public.user_roles;

-- Drop the user_role enum type
DROP TYPE IF EXISTS user_role;

-- Remove the handle_new_user function
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create a simpler handle_new_user function without roles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, full_name, username)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'username'
  );
  
  -- Create default wallets
  INSERT INTO public.wallets (user_id, currency, is_primary)
  VALUES 
    (NEW.id, 'GAIA', true),
    (NEW.id, 'BTC', false),
    (NEW.id, 'ETH', false);
    
  RETURN NEW;
END;
$$;

-- Recreate the trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
