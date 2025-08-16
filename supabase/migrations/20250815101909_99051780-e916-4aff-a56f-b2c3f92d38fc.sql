-- Create secure policies for security_events (most sensitive - super admin only)
CREATE POLICY "Super admins only access to security events"
ON public.security_events
FOR ALL
TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

-- Create secure policies for threat_intelligence (super admin only)
CREATE POLICY "Super admins only access to threat intelligence"
ON public.threat_intelligence
FOR ALL
TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

-- Create secure policies for security_alerts (security admins can view/manage)
CREATE POLICY "Security admins can manage security alerts"
ON public.security_alerts
FOR ALL
TO authenticated
USING (public.is_security_admin())
WITH CHECK (public.is_security_admin());

-- Create secure policies for security_logs (security admins can view, super admins can modify)
CREATE POLICY "Security admins can view security logs"
ON public.security_logs
FOR SELECT
TO authenticated
USING (public.is_security_admin());

CREATE POLICY "Super admins can modify security logs"
ON public.security_logs
FOR INSERT
TO authenticated
WITH CHECK (public.is_super_admin());

CREATE POLICY "Super admins can update security logs"
ON public.security_logs
FOR UPDATE
TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

CREATE POLICY "Super admins can delete security logs"
ON public.security_logs
FOR DELETE
TO authenticated
USING (public.is_super_admin());