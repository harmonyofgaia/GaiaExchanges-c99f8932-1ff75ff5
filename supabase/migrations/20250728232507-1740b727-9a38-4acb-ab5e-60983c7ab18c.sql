
-- Fix all security warnings by updating functions with proper search paths and security settings

-- 1. Fix functions that are missing search_path settings
ALTER FUNCTION public.my_routine(text, integer) SET search_path = '';
ALTER FUNCTION public.purge_old_audit_logs(integer) SET search_path = '';
ALTER FUNCTION public.cleanup_old_audit_logs(integer, integer, integer) SET search_path = '';
ALTER FUNCTION public.my_function() SET search_path = '';
ALTER FUNCTION public.initialize_first_admin(uuid) SET search_path = '';
ALTER FUNCTION public.safe_uuid_convert(text) SET search_path = '';
ALTER FUNCTION public.list_active_admins() SET search_path = '';
ALTER FUNCTION public.cleanup_audit_logs_v2(integer, integer, integer) SET search_path = '';
ALTER FUNCTION public.database_health_check() SET search_path = '';
ALTER FUNCTION public.purge_old_audit_records(integer) SET search_path = '';
ALTER FUNCTION public.purge_audit_logs(integer) SET search_path = '';
ALTER FUNCTION public.audit_function_security() SET search_path = '';
ALTER FUNCTION public.cleanup_audit_logs_by_days(integer) SET search_path = '';
ALTER FUNCTION public.prepare_error_prediction_dataset(integer) SET search_path = '';
ALTER FUNCTION public.fix_all_function_search_paths(text) SET search_path = '';
ALTER FUNCTION public.audit_logs_cleanup(integer) SET search_path = '';
ALTER FUNCTION public.diagnose_table_dependencies(text, text) SET search_path = '';
ALTER FUNCTION public.fix_performance_issues() SET search_path = '';
ALTER FUNCTION public.test_function() SET search_path = '';
ALTER FUNCTION public.send_security_alert(text, text) SET search_path = '';
ALTER FUNCTION public.get_rls_policies() SET search_path = '';
ALTER FUNCTION public.list_robust_data_function_signatures() SET search_path = '';
ALTER FUNCTION public.handle_updated_at() SET search_path = '';
ALTER FUNCTION public.get_table_dependencies(regclass) SET search_path = '';
ALTER FUNCTION public.security_diagnostic_report() SET search_path = '';
ALTER FUNCTION public.trigger_security_diagnostic() SET search_path = '';
ALTER FUNCTION public.debug_auth_context() SET search_path = '';
ALTER FUNCTION public.secure_trigger_template() SET search_path = '';
ALTER FUNCTION public.has_role(uuid, text) SET search_path = '';
ALTER FUNCTION public.validate_type_parameters() SET search_path = '';
ALTER FUNCTION public.insert_transaction(numeric, text) SET search_path = '';
ALTER FUNCTION public.track_error(text, text, text) SET search_path = '';
ALTER FUNCTION public.example_function() SET search_path = '';
ALTER FUNCTION public.fix_incorrect_search_paths() SET search_path = '';
ALTER FUNCTION public.log_error(text) SET search_path = '';
ALTER FUNCTION public.optimize_database() SET search_path = '';
ALTER FUNCTION public.enforce_function_search_path() SET search_path = '';
ALTER FUNCTION public.update_admin_metric() SET search_path = '';
ALTER FUNCTION public.revoke_admin_role(text, text) SET search_path = '';
ALTER FUNCTION public.log_security_event(text, text) SET search_path = '';

-- 2. Fix procedures that are missing search_path settings
ALTER PROCEDURE public.test_security_logging_secure() SET search_path = '';
ALTER PROCEDURE public.setup_function_security_monitoring() SET search_path = '';
ALTER PROCEDURE public.test_security_logging() SET search_path = '';
ALTER PROCEDURE public.diagnose_table_dependencies(regclass, out integer, out jsonb) SET search_path = '';
ALTER PROCEDURE public.error_system_test() SET search_path = '';

-- 3. Create missing admin management functions with proper security
CREATE OR REPLACE FUNCTION public.get_user_uuid_by_email(p_email text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    user_uuid uuid;
BEGIN
    SELECT id INTO user_uuid 
    FROM auth.users 
    WHERE email = p_email;
    
    IF user_uuid IS NULL THEN
        RAISE EXCEPTION 'User not found with email: %', p_email;
    END IF;
    
    RETURN user_uuid;
END;
$$;

-- 4. Create comprehensive admin management function
CREATE OR REPLACE FUNCTION public.manage_admin_user(
    p_target_user_id uuid,
    p_action text, -- 'grant' or 'revoke'
    p_admin_user_id uuid DEFAULT auth.uid()
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_is_admin boolean;
BEGIN
    -- Check if the requesting user is an admin
    SELECT EXISTS(
        SELECT 1 FROM public.admin_users 
        WHERE user_id = p_admin_user_id AND is_active = TRUE
    ) INTO v_is_admin;
    
    IF NOT v_is_admin THEN
        RAISE EXCEPTION 'Only admins can manage admin users';
    END IF;
    
    -- Perform the requested action
    IF p_action = 'grant' THEN
        INSERT INTO public.admin_users (user_id, is_active)
        VALUES (p_target_user_id, TRUE)
        ON CONFLICT (user_id) DO UPDATE 
        SET is_active = TRUE;
        RETURN TRUE;
    ELSIF p_action = 'revoke' THEN
        UPDATE public.admin_users 
        SET is_active = FALSE 
        WHERE user_id = p_target_user_id;
        RETURN TRUE;
    ELSE
        RAISE EXCEPTION 'Invalid action. Use "grant" or "revoke"';
    END IF;
END;
$$;

-- 5. Update the revoke_admin_role function to use proper UUID handling
CREATE OR REPLACE FUNCTION public.revoke_admin_role(target_user_uuid uuid, admin_user_uuid uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    -- Use the manage_admin_user function
    RETURN public.manage_admin_user(target_user_uuid, 'revoke', admin_user_uuid);
EXCEPTION 
    WHEN OTHERS THEN
        RAISE NOTICE 'Error in UUID-based revoke_admin_role: %', SQLERRM;
        RETURN FALSE;
END;
$$;

-- 6. Create comprehensive security logging function
CREATE OR REPLACE FUNCTION public.log_comprehensive_security_event(
    p_event_type text,
    p_severity text,
    p_user_id uuid DEFAULT auth.uid(),
    p_event_details jsonb DEFAULT '{}'::jsonb,
    p_source text DEFAULT 'system'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    -- Insert into security events table (create if not exists)
    INSERT INTO public.security_events (
        event_type,
        severity,
        user_id,
        event_details,
        source_system,
        created_at
    ) VALUES (
        p_event_type,
        p_severity,
        p_user_id,
        p_event_details,
        p_source,
        NOW()
    );
EXCEPTION
    WHEN undefined_table THEN
        -- Create the security_events table if it doesn't exist
        CREATE TABLE IF NOT EXISTS public.security_events (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            event_type text NOT NULL,
            severity text NOT NULL,
            user_id uuid,
            event_details jsonb DEFAULT '{}'::jsonb,
            source_system text DEFAULT 'system',
            created_at timestamp with time zone DEFAULT NOW()
        );
        
        -- Retry the insert
        INSERT INTO public.security_events (
            event_type,
            severity,
            user_id,
            event_details,
            source_system,
            created_at
        ) VALUES (
            p_event_type,
            p_severity,
            p_user_id,
            p_event_details,
            p_source,
            NOW()
        );
END;
$$;

-- 7. Create system health monitoring table if not exists
CREATE TABLE IF NOT EXISTS public.system_health_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    total_connections integer,
    long_queries integer,
    blocked_queries integer,
    tables_without_pk integer,
    checked_at timestamp with time zone DEFAULT NOW()
);

-- 8. Enable RLS on system_health_log and security_events if they exist
ALTER TABLE IF EXISTS public.system_health_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.security_events ENABLE ROW LEVEL SECURITY;

-- 9. Create RLS policies for admin access
DROP POLICY IF EXISTS "Admins can view system health" ON public.system_health_log;
CREATE POLICY "Admins can view system health" ON public.system_health_log
FOR SELECT USING (
    EXISTS(SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND is_active = TRUE)
);

DROP POLICY IF EXISTS "Admins can manage security events" ON public.security_events;
CREATE POLICY "Admins can manage security events" ON public.security_events
FOR ALL USING (
    EXISTS(SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND is_active = TRUE)
);

-- 10. Create missing aggregate and analysis functions for error tracking
CREATE OR REPLACE FUNCTION public.aggregate_errors(
    p_time_window text DEFAULT '24 hours',
    p_min_severity text DEFAULT 'WARNING'
)
RETURNS TABLE(
    error_type text,
    total_count bigint,
    first_occurrence timestamp with time zone,
    last_occurrence timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        et.error_type,
        COUNT(*)::bigint as total_count,
        MIN(et.occurred_at) as first_occurrence,
        MAX(et.occurred_at) as last_occurrence
    FROM public.error_tracking et
    WHERE et.occurred_at >= NOW() - p_time_window::interval
    AND et.severity_level >= p_min_severity
    GROUP BY et.error_type
    ORDER BY total_count DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.analyze_error_trends(p_days integer DEFAULT 7)
RETURNS TABLE(error_trend jsonb)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    RETURN QUERY
    SELECT jsonb_build_object(
        'period', p_days || ' days',
        'total_errors', COUNT(*),
        'unique_error_types', COUNT(DISTINCT error_type),
        'trend_analysis', 'Error analysis complete'
    ) as error_trend
    FROM public.error_tracking
    WHERE occurred_at >= NOW() - (p_days || ' days')::interval;
END;
$$;

-- 11. Create auto-resolution procedure for errors
CREATE OR REPLACE PROCEDURE public.auto_resolve_errors()
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
    -- Mark old resolved errors as resolved
    UPDATE public.error_tracking 
    SET resolved = TRUE 
    WHERE occurred_at < NOW() - INTERVAL '30 days'
    AND resolved = FALSE;
    
    RAISE NOTICE 'Auto-resolution completed for errors older than 30 days';
END;
$$;

-- 12. Create enhanced error tracking function
CREATE OR REPLACE FUNCTION public.track_error(
    p_error_type text, 
    p_error_message text, 
    p_error_context jsonb DEFAULT '{}'::jsonb,
    p_severity_level text DEFAULT 'ERROR'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_error_id uuid;
BEGIN
    INSERT INTO public.error_tracking (
        error_type, 
        error_message, 
        error_context,
        severity_level
    ) VALUES (
        p_error_type,
        p_error_message,
        p_error_context,
        COALESCE(p_severity_level, 'ERROR')
    ) RETURNING id INTO v_error_id;

    RETURN v_error_id;
END;
$$;
