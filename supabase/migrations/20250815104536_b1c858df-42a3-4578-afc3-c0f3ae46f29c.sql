-- CRITICAL SECURITY FIX: Remove dangerous public access to trading orders
-- This prevents front-running attacks and market manipulation

-- Drop the vulnerable policy that exposes all orders
DROP POLICY IF EXISTS "rls_order_select" ON public.orders_table;

-- Check if orders_table has user_id column for proper ownership
DO $$
DECLARE
    user_id_exists boolean;
BEGIN
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders_table' 
        AND table_schema = 'public' 
        AND column_name = 'user_id'
    ) INTO user_id_exists;
    
    IF NOT user_id_exists THEN
        RAISE NOTICE 'Adding user_id column to orders_table for proper ownership';
        ALTER TABLE public.orders_table ADD COLUMN user_id uuid REFERENCES auth.users(id);
        
        -- Set a default for existing records (should be updated by application)
        UPDATE public.orders_table SET user_id = auth.uid() WHERE user_id IS NULL;
        
        -- Make user_id NOT NULL after setting defaults
        ALTER TABLE public.orders_table ALTER COLUMN user_id SET NOT NULL;
    END IF;
END $$;

-- Create secure RLS policies for trading orders
-- Policy 1: Users can only view their own orders
CREATE POLICY "orders_table_select_own_only" 
ON public.orders_table 
FOR SELECT 
TO authenticated 
USING (user_id = auth.uid());

-- Policy 2: Authorized admins can view all orders (for compliance/support)
CREATE POLICY "orders_table_select_admin" 
ON public.orders_table 
FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

-- Policy 3: Users can only insert their own orders
CREATE POLICY "orders_table_insert_own_only" 
ON public.orders_table 
FOR INSERT 
TO authenticated 
WITH CHECK (user_id = auth.uid());

-- Policy 4: Users can only update their own orders (before execution)
CREATE POLICY "orders_table_update_own_only" 
ON public.orders_table 
FOR UPDATE 
TO authenticated 
USING (
  user_id = auth.uid() 
  AND (status IS NULL OR status NOT IN ('executed', 'filled', 'settled'))
) 
WITH CHECK (user_id = auth.uid());

-- Policy 5: Admin can update any order (for system operations)
CREATE POLICY "orders_table_update_admin" 
ON public.orders_table 
FOR UPDATE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
) 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

-- Policy 6: Users can only cancel their own orders
CREATE POLICY "orders_table_delete_own_only" 
ON public.orders_table 
FOR DELETE 
TO authenticated 
USING (
  user_id = auth.uid() 
  AND (status IS NULL OR status IN ('pending', 'open'))
);

-- Create security logging for sensitive order operations
CREATE OR REPLACE FUNCTION public.log_order_security_event()
RETURNS TRIGGER AS $$
DECLARE
    is_sensitive_access boolean := false;
    accessing_user_id uuid := auth.uid();
    order_user_id uuid;
BEGIN
    -- Get the order's user_id
    order_user_id := COALESCE(NEW.user_id, OLD.user_id);
    
    -- Check if this is cross-user access (potential security concern)
    is_sensitive_access := (accessing_user_id != order_user_id);
    
    -- Log sensitive order access
    IF is_sensitive_access OR TG_OP = 'DELETE' THEN
        INSERT INTO public.security_monitoring (
            event_type,
            user_id,
            details,
            severity
        ) VALUES (
            'order_access_security',
            accessing_user_id,
            jsonb_build_object(
                'operation', TG_OP,
                'order_id', COALESCE(NEW.id, OLD.id),
                'order_user_id', order_user_id,
                'accessing_user_id', accessing_user_id,
                'is_cross_user_access', is_sensitive_access,
                'timestamp', NOW(),
                'order_amount', COALESCE(NEW.amount, OLD.amount),
                'order_price', COALESCE(NEW.price, OLD.price)
            ),
            CASE 
                WHEN is_sensitive_access THEN 'high'
                WHEN TG_OP = 'DELETE' THEN 'medium'
                ELSE 'low'
            END
        );
    END IF;
    
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Create trigger for order security logging
DROP TRIGGER IF EXISTS order_security_logger ON public.orders_table;
CREATE TRIGGER order_security_logger
    AFTER INSERT OR UPDATE OR DELETE ON public.orders_table
    FOR EACH ROW EXECUTE FUNCTION public.log_order_security_event();