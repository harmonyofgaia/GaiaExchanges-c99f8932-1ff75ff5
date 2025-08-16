-- SECURITY FIX: Phase 2 - User Profiles, Rate Limiting & Advanced Monitoring

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

-- 2. Create profile auto-creation trigger
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
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
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

-- 5. Create rate limiting function
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_identifier TEXT,
  p_attempt_type TEXT,
  p_max_attempts INTEGER DEFAULT 5,
  p_window_minutes INTEGER DEFAULT 15
) RETURNS BOOLEAN AS $$
DECLARE
  current_attempts INTEGER := 0;
  window_start TIMESTAMP WITH TIME ZONE;
BEGIN
  window_start := now() - (p_window_minutes || ' minutes')::INTERVAL;
  
  -- Get current attempts in window
  SELECT COALESCE(SUM(attempts), 0) INTO current_attempts
  FROM public.auth_rate_limits
  WHERE identifier = p_identifier
    AND attempt_type = p_attempt_type
    AND last_attempt > window_start
    AND (blocked_until IS NULL OR blocked_until < now());
  
  -- Check if rate limit exceeded
  IF current_attempts >= p_max_attempts THEN
    -- Update or insert blocked status
    INSERT INTO public.auth_rate_limits (identifier, attempt_type, attempts, blocked_until)
    VALUES (p_identifier, p_attempt_type, 1, now() + '1 hour'::INTERVAL)
    ON CONFLICT (identifier, attempt_type) DO UPDATE SET
      attempts = auth_rate_limits.attempts + 1,
      last_attempt = now(),
      blocked_until = CASE 
        WHEN auth_rate_limits.blocked_until IS NULL OR auth_rate_limits.blocked_until < now()
        THEN now() + '1 hour'::INTERVAL
        ELSE auth_rate_limits.blocked_until + '30 minutes'::INTERVAL
      END;
      
    -- Log security event
    PERFORM public.log_security_event(
      'rate_limit_exceeded',
      'warning',
      NULL,
      inet_client_addr(),
      NULL,
      jsonb_build_object(
        'identifier', p_identifier,
        'attempt_type', p_attempt_type,
        'attempts', current_attempts,
        'max_attempts', p_max_attempts
      )
    );
    
    RETURN FALSE;
  END IF;
  
  -- Record attempt
  INSERT INTO public.auth_rate_limits (identifier, attempt_type, attempts)
  VALUES (p_identifier, p_attempt_type, 1)
  ON CONFLICT (identifier, attempt_type) DO UPDATE SET
    attempts = auth_rate_limits.attempts + 1,
    last_attempt = now();
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- 6. Create security event logging function
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

-- 7. Create function to get security dashboard data
CREATE OR REPLACE FUNCTION public.get_security_dashboard_stats()
RETURNS JSONB AS $$
DECLARE
  stats JSONB;
BEGIN
  -- Only allow admins to access this
  IF NOT public.get_current_user_admin_status() THEN
    RAISE EXCEPTION 'Access denied: Admin privileges required';
  END IF;
  
  SELECT jsonb_build_object(
    'total_users', (SELECT COUNT(*) FROM public.profiles),
    'verified_users', (SELECT COUNT(*) FROM public.profiles WHERE is_email_verified = true),
    'admin_users', (SELECT COUNT(*) FROM public.admin_users WHERE is_active = true),
    'recent_logins', (SELECT COUNT(*) FROM public.profiles WHERE last_login > now() - '24 hours'::INTERVAL),
    'security_events_today', (SELECT COUNT(*) FROM public.security_monitoring WHERE created_at > now() - '24 hours'::INTERVAL),
    'critical_events_today', (SELECT COUNT(*) FROM public.security_monitoring WHERE severity = 'critical' AND created_at > now() - '24 hours'::INTERVAL),
    'rate_limited_today', (SELECT COUNT(*) FROM public.auth_rate_limits WHERE last_attempt > now() - '24 hours'::INTERVAL AND blocked_until IS NOT NULL)
  ) INTO stats;
  
  RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- 8. Add unique constraint for rate limiting
ALTER TABLE public.auth_rate_limits 
ADD CONSTRAINT unique_identifier_type 
UNIQUE (identifier, attempt_type);

-- 9. Log Phase 2 completion
SELECT public.log_security_event(
  'security_phase_2_completed',
  'info',
  auth.uid(),
  inet_client_addr(),
  NULL,
  jsonb_build_object(
    'phase', 'user_profiles_rate_limiting_monitoring',
    'features_added', ARRAY[
      'user_profiles_table',
      'auto_profile_creation',
      'rate_limiting_system',
      'security_monitoring',
      'security_dashboard_stats'
    ],
    'timestamp', now()
  )
);