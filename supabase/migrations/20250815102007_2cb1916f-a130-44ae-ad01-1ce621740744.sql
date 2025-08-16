-- Create secure policies for security_log (security admins can view, super admins can modify)
CREATE POLICY "Security admins can view security log"
ON public.security_log
FOR SELECT
TO authenticated
USING (public.is_security_admin());

CREATE POLICY "Super admins can modify security log"
ON public.security_log
FOR INSERT
TO authenticated
WITH CHECK (public.is_super_admin());

CREATE POLICY "Super admins can update security log"
ON public.security_log
FOR UPDATE
TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

CREATE POLICY "Super admins can delete security log"
ON public.security_log
FOR DELETE
TO authenticated
USING (public.is_super_admin());

-- Create secure policies for security_event_log (users can see their own, admins see all)
CREATE POLICY "Users can view their own security event log entries"
ON public.security_event_log
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Security admins can view all security event log entries"
ON public.security_event_log
FOR SELECT
TO authenticated
USING (public.is_security_admin());

CREATE POLICY "Super admins can modify security event log"
ON public.security_event_log
FOR INSERT
TO authenticated
WITH CHECK (public.is_super_admin());

CREATE POLICY "Super admins can update security event log"
ON public.security_event_log
FOR UPDATE
TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

CREATE POLICY "Super admins can delete security event log"
ON public.security_event_log
FOR DELETE
TO authenticated
USING (public.is_super_admin());