
-- Security Performance Patch (PR #10)
-- Fix all search path vulnerabilities and add security monitoring

-- 1. Fix search path vulnerabilities in existing functions
ALTER FUNCTION public.has_role(_user_id UUID, _role text) SET search_path = 'public';
ALTER FUNCTION public.handle_updated_at() SET search_path = 'public';
ALTER FUNCTION public.validate_admin_access(client_ip inet) SET search_path = 'public';
ALTER FUNCTION public.get_current_user_id() SET search_path = 'public';
ALTER FUNCTION public.create_admin_session(client_ip inet, client_user_agent text, client_fingerprint text) SET search_path = 'public';
ALTER FUNCTION public.add_admin_user(p_user_id uuid, p_role text) SET search_path = 'public';
ALTER FUNCTION public.insert_transaction(p_user_id uuid, p_transaction_type text, p_amount numeric, p_currency text, p_status text, p_external_reference text, p_metadata jsonb) SET search_path = 'public';

-- 2. Create security monitoring tables
CREATE TABLE IF NOT EXISTS public.security_scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_type TEXT NOT NULL,
    scan_results JSONB NOT NULL DEFAULT '{}',
    issues_found INTEGER DEFAULT 0,
    critical_issues INTEGER DEFAULT 0,
    high_issues INTEGER DEFAULT 0,
    medium_issues INTEGER DEFAULT 0,
    low_issues INTEGER DEFAULT 0,
    compliance_score NUMERIC DEFAULT 100,
    scan_duration_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_by UUID REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS public.security_remediation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_id UUID REFERENCES public.security_scans(id),
    issue_type TEXT NOT NULL,
    remediation_action TEXT NOT NULL,
    success BOOLEAN DEFAULT false,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.threat_intelligence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    threat_type TEXT NOT NULL,
    threat_data JSONB NOT NULL DEFAULT '{}',
    severity_level TEXT NOT NULL DEFAULT 'medium',
    ip_address INET,
    user_agent TEXT,
    geolocation JSONB,
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'active'
);

-- 3. Add RLS policies for security tables
ALTER TABLE public.security_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_remediation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threat_intelligence ENABLE ROW LEVEL SECURITY;

-- Admin-only access to security tables
CREATE POLICY "Admins can access security scans" ON public.security_scans
    FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can access remediation logs" ON public.security_remediation_logs
    FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can access threat intelligence" ON public.threat_intelligence
    FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

-- 4. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_security_scans_created_at ON public.security_scans(created_at);
CREATE INDEX IF NOT EXISTS idx_security_scans_scan_type ON public.security_scans(scan_type);
CREATE INDEX IF NOT EXISTS idx_threat_intelligence_detected_at ON public.threat_intelligence(detected_at);
CREATE INDEX IF NOT EXISTS idx_threat_intelligence_severity ON public.threat_intelligence(severity_level);
CREATE INDEX IF NOT EXISTS idx_threat_intelligence_ip ON public.threat_intelligence(ip_address);

-- 5. Add new project funding and impact tables for Innovation Plan v7
CREATE TABLE IF NOT EXISTS public.green_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    funding_goal NUMERIC NOT NULL DEFAULT 0,
    funding_raised NUMERIC NOT NULL DEFAULT 0,
    carbon_impact_target NUMERIC,
    biodiversity_score INTEGER DEFAULT 0,
    verification_status TEXT DEFAULT 'pending',
    project_data JSONB DEFAULT '{}',
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.eco_missions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    mission_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty_level INTEGER DEFAULT 1,
    tokens_reward NUMERIC DEFAULT 0,
    carbon_impact NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'active',
    completion_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.planet_cleaning_rewards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    activity_type TEXT NOT NULL,
    location_data JSONB DEFAULT '{}',
    verification_method TEXT NOT NULL,
    tokens_earned NUMERIC DEFAULT 0,
    environmental_impact JSONB DEFAULT '{}',
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.nft_card_collection (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    card_type TEXT NOT NULL,
    card_name TEXT NOT NULL,
    rarity TEXT NOT NULL,
    power_level INTEGER DEFAULT 1,
    biodiversity_category TEXT,
    card_metadata JSONB DEFAULT '{}',
    minted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    is_tradeable BOOLEAN DEFAULT true
);

-- Add RLS policies for new tables
ALTER TABLE public.green_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eco_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planet_cleaning_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nft_card_collection ENABLE ROW LEVEL SECURITY;

-- Public can view approved green projects
CREATE POLICY "Public can view approved green projects" ON public.green_projects
    FOR SELECT TO authenticated
    USING (verification_status = 'approved');

-- Users can manage their own data
CREATE POLICY "Users can manage their own eco missions" ON public.eco_missions
    FOR ALL TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own cleaning rewards" ON public.planet_cleaning_rewards
    FOR ALL TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own NFT cards" ON public.nft_card_collection
    FOR ALL TO authenticated
    USING (user_id = auth.uid());

-- Add performance indexes
CREATE INDEX IF NOT EXISTS idx_green_projects_category ON public.green_projects(category);
CREATE INDEX IF NOT EXISTS idx_green_projects_verification ON public.green_projects(verification_status);
CREATE INDEX IF NOT EXISTS idx_eco_missions_user_id ON public.eco_missions(user_id);
CREATE INDEX IF NOT EXISTS idx_eco_missions_status ON public.eco_missions(status);
CREATE INDEX IF NOT EXISTS idx_planet_cleaning_user_id ON public.planet_cleaning_rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_nft_cards_user_id ON public.nft_card_collection(user_id);
