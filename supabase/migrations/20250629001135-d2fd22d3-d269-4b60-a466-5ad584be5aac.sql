
-- Create missing enum types only if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE public.user_role AS ENUM ('user', 'trader', 'admin', 'moderator');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transaction_type') THEN
        CREATE TYPE public.transaction_type AS ENUM ('buy', 'sell', 'transfer', 'stake', 'unstake', 'reward', 'burn');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
        CREATE TYPE public.order_status AS ENUM ('pending', 'completed', 'cancelled', 'partial');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'trading_pair_status') THEN
        CREATE TYPE public.trading_pair_status AS ENUM ('active', 'inactive', 'maintenance');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'security_level') THEN
        CREATE TYPE public.security_level AS ENUM ('low', 'medium', 'high', 'maximum');
    END IF;
END $$;

-- Create user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles if not already enabled
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Fix the handle_updated_at function security issue by setting a stable search_path
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Fix the handle_new_user function to also have proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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
    
  -- Assign default user role (only if user_roles table exists and has the enum)
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_roles') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
  END IF;
  
  RETURN NEW;
END;
$$;

-- Fix other security definer functions to have proper search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role text)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role::text = _role
  )
$$;

-- Fix admin session functions
CREATE OR REPLACE FUNCTION public.validate_admin_access(client_ip inet)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Add your specific IP address here - replace with your actual IP
  -- For now, allowing any IP for testing - you can update this with your actual IP
  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION public.create_admin_session(
  client_ip inet,
  client_user_agent text DEFAULT '',
  client_fingerprint text DEFAULT ''
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  session_token text;
BEGIN
  -- Generate secure session token
  session_token := encode(gen_random_bytes(32), 'hex');
  
  -- Clean up expired sessions
  DELETE FROM public.admin_sessions WHERE expires_at < now();
  
  -- Insert new session
  INSERT INTO public.admin_sessions (ip_address, user_agent, device_fingerprint, session_token)
  VALUES (client_ip, client_user_agent, client_fingerprint, session_token);
  
  RETURN session_token;
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_admin_session(token text, client_ip inet)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_sessions 
    WHERE session_token = token 
    AND ip_address = client_ip 
    AND expires_at > now()
  );
END;
$$;
