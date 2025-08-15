-- Add comprehensive security logging for admin table access

-- Create secure admin access logging function
CREATE OR REPLACE FUNCTION public.log_admin_access_event()
RETURNS TRIGGER AS $$
DECLARE
    accessing_user_id uuid := auth.uid();
    is_super_admin boolean := false;
    target_user_id uuid;
BEGIN
    -- Check if accessing user is super admin
    SELECT EXISTS (
        SELECT 1 FROM public.admin_users au
        JOIN public.admin_profiles ap ON au.user_id = ap.user_id
        WHERE au.user_id = accessing_user_id 
        AND au.is_active = true 
        AND ap.role = 'super_admin'
    ) INTO is_super_admin;
    
    -- Get target user ID from the record
    target_user_id := COALESCE(NEW.user_id, OLD.user_id);
    
    -- Log all admin table access for security monitoring
    INSERT INTO public.security_monitoring (
        event_type,
        user_id,
        details,
        severity
    ) VALUES (
        'admin_table_access',
        accessing_user_id,
        jsonb_build_object(
            'table_name', TG_TABLE_NAME,
            'operation', TG_OP,
            'timestamp', NOW(),
            'is_super_admin', is_super_admin,
            'target_user_id', target_user_id,
            'is_cross_user_access', (accessing_user_id != target_user_id),
            'admin_data_exposed', true
        ),
        CASE 
            WHEN accessing_user_id != target_user_id AND NOT is_super_admin THEN 'critical'
            WHEN TG_OP IN ('UPDATE', 'DELETE') THEN 'high'
            ELSE 'medium'
        END
    );
    
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- Even if logging fails, don't block the operation
        -- but log the error for investigation
        RAISE WARNING 'Failed to log admin access event: %', SQLERRM;
        IF TG_OP = 'DELETE' THEN
            RETURN OLD;
        ELSE
            RETURN NEW;
        END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Add audit triggers to all admin tables
DROP TRIGGER IF EXISTS admin_accounts_audit ON public.admin_accounts;
CREATE TRIGGER admin_accounts_audit
    AFTER INSERT OR UPDATE OR DELETE ON public.admin_accounts
    FOR EACH ROW EXECUTE FUNCTION public.log_admin_access_event();

DROP TRIGGER IF EXISTS admin_users_audit ON public.admin_users;
CREATE TRIGGER admin_users_audit
    AFTER INSERT OR UPDATE OR DELETE ON public.admin_users
    FOR EACH ROW EXECUTE FUNCTION public.log_admin_access_event();

DROP TRIGGER IF EXISTS admin_profiles_audit ON public.admin_profiles;
CREATE TRIGGER admin_profiles_audit
    AFTER INSERT OR UPDATE OR DELETE ON public.admin_profiles
    FOR EACH ROW EXECUTE FUNCTION public.log_admin_access_event();

DROP TRIGGER IF EXISTS admin_sessions_audit ON public.admin_sessions;
CREATE TRIGGER admin_sessions_audit
    AFTER INSERT OR UPDATE OR DELETE ON public.admin_sessions
    FOR EACH ROW EXECUTE FUNCTION public.log_admin_access_event();

-- Create a function to detect potential admin account compromise
CREATE OR REPLACE FUNCTION public.detect_admin_compromise()
RETURNS void AS $$
DECLARE
    suspicious_activity record;
    alert_message text;
BEGIN
    -- Look for suspicious patterns in the last hour
    FOR suspicious_activity IN
        SELECT 
            user_id,
            COUNT(*) as access_count,
            COUNT(DISTINCT (details->>'target_user_id')) as unique_targets
        FROM public.security_monitoring
        WHERE event_type = 'admin_table_access'
        AND created_at > NOW() - INTERVAL '1 hour'
        AND severity IN ('critical', 'high')
        GROUP BY user_id
        HAVING COUNT(*) > 10 OR COUNT(DISTINCT (details->>'target_user_id')) > 5
    LOOP
        alert_message := format(
            'SECURITY ALERT: User %s has %s suspicious admin table accesses in the last hour, targeting %s different admin accounts',
            suspicious_activity.user_id,
            suspicious_activity.access_count,
            suspicious_activity.unique_targets
        );
        
        -- Log critical security alert
        INSERT INTO public.security_monitoring (
            event_type,
            user_id,
            details,
            severity
        ) VALUES (
            'admin_compromise_detected',
            suspicious_activity.user_id,
            jsonb_build_object(
                'alert_message', alert_message,
                'access_count', suspicious_activity.access_count,
                'unique_targets', suspicious_activity.unique_targets,
                'detection_time', NOW()
            ),
            'critical'
        );
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';