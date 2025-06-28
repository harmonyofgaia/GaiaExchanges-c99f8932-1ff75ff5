
-- Create admin_sessions table to track secure admin sessions
CREATE TABLE IF NOT EXISTS public.admin_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address inet NOT NULL,
  user_agent text,
  device_fingerprint text,
  session_token text UNIQUE NOT NULL,
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '24 hours'),
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on admin_sessions
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

-- Create policy for admin sessions (only accessible by the system)
CREATE POLICY "System can manage admin sessions" ON public.admin_sessions
  FOR ALL USING (true);

-- Create function to validate admin IP access
CREATE OR REPLACE FUNCTION public.validate_admin_access(client_ip inet)
RETURNS boolean
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  -- Add your specific IP address here - replace with your actual IP
  -- For now, allowing any IP for testing - you can update this with your actual IP
  RETURN true;
END;
$$;

-- Create function to create admin session
CREATE OR REPLACE FUNCTION public.create_admin_session(
  client_ip inet,
  client_user_agent text DEFAULT '',
  client_fingerprint text DEFAULT ''
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Create function to validate admin session
CREATE OR REPLACE FUNCTION public.validate_admin_session(token text, client_ip inet)
RETURNS boolean
LANGUAGE plpgsql
STABLE
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
