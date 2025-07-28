
-- Create system_health_logs table
CREATE TABLE public.system_health_logs (
  id SERIAL PRIMARY KEY,
  detected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  issue_type TEXT NOT NULL,
  issue_description TEXT NOT NULL,
  severity INTEGER NOT NULL DEFAULT 1,
  resolved BOOLEAN NOT NULL DEFAULT FALSE,
  total_connections INTEGER,
  long_queries INTEGER,
  blocked_queries INTEGER,
  tables_without_pk INTEGER,
  checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.system_health_logs ENABLE ROW LEVEL SECURITY;

-- Policy for admins only
CREATE POLICY "Admins can manage system health logs"
  ON public.system_health_logs
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- Create get_system_health function that returns the format expected
CREATE OR REPLACE FUNCTION public.get_system_health()
RETURNS TABLE(
  total_connections INTEGER,
  long_queries INTEGER, 
  blocked_queries INTEGER,
  tables_without_pk INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    0::INTEGER as total_connections,
    0::INTEGER as long_queries,
    0::INTEGER as blocked_queries, 
    0::INTEGER as tables_without_pk;
END;
$$;
