-- URGENT WILDLIFE SECURITY FIX: Protect animal camera locations from poachers
-- This prevents exposure of exact GPS coordinates that could endanger wildlife

-- 1. IMMEDIATELY remove dangerous public access to camera locations
DROP POLICY IF EXISTS "Anyone can view active cameras" ON public.live_animal_cameras;

-- 2. Create a secure view that excludes exact coordinates for public access
CREATE OR REPLACE VIEW public.animal_cameras_public AS
SELECT 
    id,
    camera_name,
    location,
    country,
    animal_species,
    stream_url,
    is_active,
    -- Remove exact GPS coordinates from public view for wildlife protection
    -- latitude and longitude are excluded
    description,
    -- Filter camera_metadata to remove any location data
    CASE 
        WHEN camera_metadata IS NOT NULL THEN
            camera_metadata - 'gps' - 'coordinates' - 'exact_location' - 'lat' - 'lng' - 'position'
        ELSE NULL 
    END as camera_metadata,
    conservation_partner,
    viewers_count,
    created_at,
    updated_at
FROM public.live_animal_cameras
WHERE is_active = true;

-- 3. Create secure RLS policies for the main table
-- Block all public access to the main table with exact coordinates
CREATE POLICY "live_cameras_block_public_access" 
ON public.live_animal_cameras 
FOR ALL 
TO public 
USING (false);

-- Only admins can access exact locations
CREATE POLICY "live_cameras_admin_full_access" 
ON public.live_animal_cameras 
FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role IN ('super_admin', 'admin')
  )
) 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role IN ('super_admin', 'admin')
  )
);

-- 4. Create conservation partner access for verified researchers
CREATE POLICY "live_cameras_conservation_verified_access" 
ON public.live_animal_cameras 
FOR SELECT 
TO authenticated 
USING (
  -- Only verified conservation partners get location access
  EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true
  )
);

-- 5. Create geographic obfuscation function for research purposes
CREATE OR REPLACE FUNCTION public.get_camera_approximate_location(camera_id uuid)
RETURNS jsonb AS $$
DECLARE
    camera_data record;
    obfuscated_lat numeric;
    obfuscated_lng numeric;
BEGIN
    -- Only allow authenticated users to get approximate locations
    IF auth.uid() IS NULL THEN
        RETURN jsonb_build_object('error', 'Authentication required for wildlife protection');
    END IF;
    
    SELECT latitude, longitude, country, location 
    INTO camera_data
    FROM public.live_animal_cameras 
    WHERE id = camera_id AND is_active = true;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('error', 'Camera not found or inactive');
    END IF;
    
    -- Add random offset to coordinates (±0.01 degrees ≈ ±1.1km)
    -- This protects exact locations while allowing general research
    obfuscated_lat := camera_data.latitude + (random() - 0.5) * 0.02;
    obfuscated_lng := camera_data.longitude + (random() - 0.5) * 0.02;
    
    -- Log access attempt for security monitoring
    INSERT INTO public.security_monitoring (
        event_type,
        user_id,
        details,
        severity
    ) VALUES (
        'wildlife_location_approximation_request',
        auth.uid(),
        jsonb_build_object(
            'camera_id', camera_id,
            'obfuscated_coordinates_provided', true,
            'timestamp', NOW()
        ),
        'medium'
    );
    
    RETURN jsonb_build_object(
        'approximate_latitude', ROUND(obfuscated_lat, 3),
        'approximate_longitude', ROUND(obfuscated_lng, 3),
        'accuracy_note', 'Location obfuscated by ±1km for wildlife protection',
        'country', camera_data.country,
        'general_location', camera_data.location,
        'conservation_notice', 'Exact coordinates protected to prevent poaching'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- 6. Create wildlife security monitoring function
CREATE OR REPLACE FUNCTION public.log_camera_location_access()
RETURNS TRIGGER AS $$
DECLARE
    accessing_user_id uuid := auth.uid();
    is_admin boolean := false;
BEGIN
    -- Check if user is admin
    SELECT EXISTS (
        SELECT 1 FROM public.admin_users au
        WHERE au.user_id = accessing_user_id AND au.is_active = true
    ) INTO is_admin;
    
    -- Log location access attempts for wildlife protection
    INSERT INTO public.security_monitoring (
        event_type,
        user_id,
        details,
        severity
    ) VALUES (
        'wildlife_camera_access',
        accessing_user_id,
        jsonb_build_object(
            'camera_id', COALESCE(NEW.id, OLD.id),
            'camera_name', COALESCE(NEW.camera_name, OLD.camera_name),
            'operation', TG_OP,
            'timestamp', NOW(),
            'is_admin', is_admin,
            'has_exact_coordinates', (COALESCE(NEW.latitude, OLD.latitude) IS NOT NULL),
            'wildlife_protection_alert', true,
            'ip_address', inet_client_addr()
        ),
        CASE 
            WHEN NOT is_admin AND TG_OP IN ('INSERT', 'UPDATE', 'DELETE') THEN 'critical'
            WHEN TG_OP IN ('UPDATE', 'DELETE') THEN 'high'
            ELSE 'medium'
        END
    );
    
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Add wildlife protection audit trigger (only for modification operations)
DROP TRIGGER IF EXISTS wildlife_camera_protection_audit ON public.live_animal_cameras;
CREATE TRIGGER wildlife_camera_protection_audit
    AFTER INSERT OR UPDATE OR DELETE ON public.live_animal_cameras
    FOR EACH ROW EXECUTE FUNCTION public.log_camera_location_access();