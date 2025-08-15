-- SECURITY FIX: Phase 2 - User Profiles, Rate Limiting & Advanced Monitoring (Fixed)

-- 1. Create secure user profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_login TIMESTAMP WITH TIME ZONE,
  login_count INTEGER DEFAULT 0,
  is_email_verified BOOLEAN DEFAULT false,
  security_level TEXT DEFAULT 'standard',
  two_factor_enabled BOOLEAN DEFAULT false
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create secure RLS policies for profiles
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING (public.get_current_user_admin_status());

-- 2. Create profile auto-creation trigger (only if not exists)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name,
    is_email_verified
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.email_confirmed_at IS NOT NULL, false)
  );
  
  -- Log new user creation
  PERFORM public.log_admin_action(
    'new_user_registered',
    jsonb_build_object(
      'user_id', NEW.id,
      'email', NEW.email,
      'timestamp', now(),
      'verification_status', CASE WHEN NEW.email_confirmed_at IS NOT NULL THEN 'verified' ELSE 'pending' END
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Create trigger for auto profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Create rate limiting table for authentication attempts
CREATE TABLE IF NOT EXISTS public.auth_rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier TEXT NOT NULL, -- email or IP address
  attempt_type TEXT NOT NULL, -- 'login', 'signup', 'password_reset'
  attempts INTEGER NOT NULL DEFAULT 1,
  first_attempt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_attempt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  blocked_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for rate limiting
CREATE INDEX IF NOT EXISTS idx_auth_rate_limits_identifier ON public.auth_rate_limits(identifier);
CREATE INDEX IF NOT EXISTS idx_auth_rate_limits_type_time ON public.auth_rate_limits(attempt_type, last_attempt);

-- 4. Create security monitoring table
CREATE TABLE IF NOT EXISTS public.security_monitoring (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info', -- 'info', 'warning', 'error', 'critical'
  user_id UUID,
  ip_address INET,
  user_agent TEXT,
  event_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved BOOLEAN DEFAULT false
);

-- Create indexes for security monitoring
CREATE INDEX IF NOT EXISTS idx_security_monitoring_type ON public.security_monitoring(event_type);
CREATE INDEX IF NOT EXISTS idx_security_monitoring_severity ON public.security_monitoring(severity);
CREATE INDEX IF NOT EXISTS idx_security_monitoring_time ON public.security_monitoring(created_at);
CREATE INDEX IF NOT EXISTS idx_security_monitoring_user ON public.security_monitoring(user_id);

-- 5. Create security event logging function
CREATE OR REPLACE FUNCTION public.log_security_event(
  p_event_type TEXT,
  p_severity TEXT,
  p_user_id UUID DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_event_data JSONB DEFAULT '{}'
) RETURNS VOID AS $$
BEGIN
  INSERT INTO public.security_monitoring (
    event_type,
    severity,
    user_id,
    ip_address,
    user_agent,
    event_data
  ) VALUES (
    p_event_type,
    p_severity,
    COALESCE(p_user_id, auth.uid()),
    COALESCE(p_ip_address, inet_client_addr()),
    p_user_agent,
    p_event_data
  );
  
  -- Also log to admin activity for critical events
  IF p_severity IN ('error', 'critical') THEN
    PERFORM public.log_admin_action(
      'security_event_' || p_event_type,
      jsonb_build_object(
        'severity', p_severity,
        'event_data', p_event_data,
        'timestamp', now()
      )
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';