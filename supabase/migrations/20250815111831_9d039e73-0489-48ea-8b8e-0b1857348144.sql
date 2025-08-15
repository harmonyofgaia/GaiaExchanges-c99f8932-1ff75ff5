-- Phase 2: Enhanced Security Infrastructure

-- 1. Create comprehensive admin session management
CREATE TABLE IF NOT EXISTS public.admin_security_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  session_token TEXT NOT NULL UNIQUE,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + INTERVAL '8 hours'),
  is_active BOOLEAN DEFAULT true,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT now(),
  failed_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.admin_security_sessions ENABLE ROW LEVEL SECURITY;

-- Admin security sessions policies
CREATE POLICY "admin_security_sessions_select" ON public.admin_security_sessions
  FOR SELECT USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND is_active = true)
  );

CREATE POLICY "admin_security_sessions_insert" ON public.admin_security_sessions
  FOR INSERT WITH CHECK (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND is_active = true)
  );

CREATE POLICY "admin_security_sessions_update" ON public.admin_security_sessions
  FOR UPDATE USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND is_active = true)
  );

-- 2. Create security incident tracking
CREATE TABLE IF NOT EXISTS public.security_incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_type TEXT NOT NULL,
  severity TEXT DEFAULT 'medium',
  user_id UUID,
  ip_address INET,
  user_agent TEXT,
  details JSONB DEFAULT '{}',
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID
);

-- Enable RLS
ALTER TABLE public.security_incidents ENABLE ROW LEVEL SECURITY;

-- Security incidents policies (admin only)
CREATE POLICY "security_incidents_admin_access" ON public.security_incidents
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND is_active = true)
  );

-- 3. Create rate limiting table
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL, -- IP or user_id
  action_type TEXT NOT NULL,
  attempts INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT now(),
  blocked_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(identifier, action_type)
);

-- Enable RLS
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Rate limits policies (system access only)
CREATE POLICY "rate_limits_system_access" ON public.rate_limits
  FOR ALL USING (true); -- System needs access for rate limiting

-- 4. Enhanced audit logging
CREATE TABLE IF NOT EXISTS public.security_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  ip_address INET,
  user_agent TEXT,
  success BOOLEAN DEFAULT true,
  details JSONB DEFAULT '{}',
  risk_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;

-- Security audit logs policies
CREATE POLICY "security_audit_logs_admin_read" ON public.security_audit_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND is_active = true)
  );

CREATE POLICY "security_audit_logs_system_write" ON public.security_audit_logs
  FOR INSERT WITH CHECK (true); -- System needs to write audit logs

-- 5. Create security functions

-- Function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  p_user_id UUID,
  p_action TEXT,
  p_details JSONB DEFAULT '{}',
  p_ip_address INET DEFAULT NULL,
  p_risk_score INTEGER DEFAULT 0
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  audit_id UUID;
BEGIN
  INSERT INTO public.security_audit_logs (
    user_id, action, ip_address, details, risk_score
  ) VALUES (
    p_user_id, p_action, p_ip_address, p_details, p_risk_score
  ) RETURNING id INTO audit_id;
  
  RETURN audit_id;
END;
$$;

-- Function to check rate limits
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_identifier TEXT,
  p_action_type TEXT,
  p_max_attempts INTEGER DEFAULT 5,
  p_window_minutes INTEGER DEFAULT 60
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  current_attempts INTEGER := 0;
  window_start TIMESTAMP WITH TIME ZONE;
  is_blocked BOOLEAN := false;
BEGIN
  -- Check if currently blocked
  SELECT blocked_until > now() INTO is_blocked
  FROM public.rate_limits
  WHERE identifier = p_identifier AND action_type = p_action_type;
  
  IF is_blocked THEN
    RETURN false;
  END IF;
  
  -- Get or create rate limit record
  INSERT INTO public.rate_limits (identifier, action_type, attempts, window_start)
  VALUES (p_identifier, p_action_type, 1, now())
  ON CONFLICT (identifier, action_type) DO UPDATE SET
    attempts = CASE 
      WHEN rate_limits.window_start < now() - (p_window_minutes * INTERVAL '1 minute')
      THEN 1
      ELSE rate_limits.attempts + 1
    END,
    window_start = CASE
      WHEN rate_limits.window_start < now() - (p_window_minutes * INTERVAL '1 minute')
      THEN now()
      ELSE rate_limits.window_start
    END,
    updated_at = now()
  RETURNING attempts, window_start INTO current_attempts, window_start;
  
  -- Block if limit exceeded
  IF current_attempts > p_max_attempts THEN
    UPDATE public.rate_limits
    SET blocked_until = now() + INTERVAL '1 hour'
    WHERE identifier = p_identifier AND action_type = p_action_type;
    
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;

-- Function to validate admin session
CREATE OR REPLACE FUNCTION public.validate_admin_session_security()
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.admin_users au
    JOIN public.admin_security_sessions ass ON au.user_id = ass.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true
    AND ass.is_active = true
    AND ass.expires_at > now()
  );
END;
$$;

-- 6. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_admin_security_sessions_user_id ON public.admin_security_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_security_sessions_token ON public.admin_security_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_admin_security_sessions_expires ON public.admin_security_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_security_incidents_type ON public.security_incidents(incident_type);
CREATE INDEX IF NOT EXISTS idx_security_incidents_created ON public.security_incidents(created_at);
CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier ON public.rate_limits(identifier, action_type);
CREATE INDEX IF NOT EXISTS idx_security_audit_logs_user ON public.security_audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_security_audit_logs_created ON public.security_audit_logs(created_at);

-- 7. Create cleanup function for old records
CREATE OR REPLACE FUNCTION public.cleanup_security_tables()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  cleaned_count INTEGER := 0;
BEGIN
  -- Clean expired sessions
  DELETE FROM public.admin_security_sessions 
  WHERE expires_at < now() - INTERVAL '24 hours';
  
  GET DIAGNOSTICS cleaned_count = ROW_COUNT;
  
  -- Clean old rate limit records
  DELETE FROM public.rate_limits 
  WHERE updated_at < now() - INTERVAL '24 hours';
  
  -- Clean resolved incidents older than 30 days
  DELETE FROM public.security_incidents 
  WHERE resolved = true AND resolved_at < now() - INTERVAL '30 days';
  
  -- Clean old audit logs (keep 90 days)
  DELETE FROM public.security_audit_logs 
  WHERE created_at < now() - INTERVAL '90 days';
  
  RETURN cleaned_count;
END;
$$;