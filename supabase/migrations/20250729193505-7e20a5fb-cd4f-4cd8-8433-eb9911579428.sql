-- Create project wallets table
CREATE TABLE public.project_investment_wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.green_projects(id) ON DELETE CASCADE,
  wallet_address text NOT NULL UNIQUE,
  wallet_type text NOT NULL DEFAULT 'project_investment',
  private_key_encrypted text, -- For automated routing (encrypted)
  is_active boolean DEFAULT true,
  total_received numeric DEFAULT 0,
  total_routed numeric DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  UNIQUE(project_id) -- One wallet per project
);

-- Create transaction tracking table
CREATE TABLE public.project_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.green_projects(id),
  project_wallet_id uuid NOT NULL REFERENCES public.project_investment_wallets(id),
  transaction_hash text NOT NULL UNIQUE,
  from_address text NOT NULL,
  to_address text NOT NULL,
  amount numeric NOT NULL,
  currency text NOT NULL DEFAULT 'GAIA',
  transaction_type text NOT NULL DEFAULT 'investment',
  status text NOT NULL DEFAULT 'pending', -- pending, confirmed, routed, failed
  block_number bigint,
  gas_fee numeric DEFAULT 0,
  routed_to_main_wallet boolean DEFAULT false,
  routing_transaction_hash text,
  metadata jsonb DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  confirmed_at timestamp with time zone,
  routed_at timestamp with time zone
);

-- Create main wallet configuration table
CREATE TABLE public.main_wallet_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_name text NOT NULL,
  wallet_address text NOT NULL,
  wallet_type text NOT NULL DEFAULT 'coral_project_main',
  is_primary boolean DEFAULT false,
  auto_routing_enabled boolean DEFAULT true,
  routing_threshold numeric DEFAULT 100, -- Route when project wallet reaches this amount
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create project investment summaries table
CREATE TABLE public.project_investment_summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.green_projects(id) UNIQUE,
  total_invested numeric DEFAULT 0,
  total_investors integer DEFAULT 0,
  last_investment_date timestamp with time zone,
  average_investment numeric DEFAULT 0,
  investment_goal_percentage numeric DEFAULT 0,
  roi_percentage numeric DEFAULT 0,
  carbon_credits_generated numeric DEFAULT 0,
  updated_at timestamp with time zone DEFAULT now()
);

-- Create transaction routing logs
CREATE TABLE public.transaction_routing_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.green_projects(id),
  from_wallet text NOT NULL,
  to_wallet text NOT NULL,
  amount_routed numeric NOT NULL,
  routing_fee numeric DEFAULT 0,
  routing_transaction_hash text,
  routing_status text NOT NULL DEFAULT 'pending',
  routed_at timestamp with time zone DEFAULT now(),
  confirmed_at timestamp with time zone,
  metadata jsonb DEFAULT '{}'
);

-- Enable Row Level Security
ALTER TABLE public.project_investment_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.main_wallet_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_investment_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transaction_routing_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- Admin can manage all project wallets
CREATE POLICY "Admins can manage project wallets" ON public.project_investment_wallets
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Public can view active project wallets (for investments)
CREATE POLICY "Public can view active project wallets" ON public.project_investment_wallets
  FOR SELECT USING (is_active = true);

-- Admin can manage all transactions
CREATE POLICY "Admins can manage project transactions" ON public.project_transactions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Admin can manage main wallet config
CREATE POLICY "Admins can manage main wallet config" ON public.main_wallet_config
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Public can view project investment summaries
CREATE POLICY "Public can view project summaries" ON public.project_investment_summaries
  FOR SELECT USING (true);

-- Admin can manage project summaries
CREATE POLICY "Admins can manage project summaries" ON public.project_investment_summaries
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Admin can view routing logs
CREATE POLICY "Admins can view routing logs" ON public.transaction_routing_logs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX idx_project_wallets_project_id ON public.project_investment_wallets(project_id);
CREATE INDEX idx_project_wallets_address ON public.project_investment_wallets(wallet_address);
CREATE INDEX idx_project_transactions_project_id ON public.project_transactions(project_id);
CREATE INDEX idx_project_transactions_status ON public.project_transactions(status);
CREATE INDEX idx_project_transactions_hash ON public.project_transactions(transaction_hash);
CREATE INDEX idx_project_transactions_routed ON public.project_transactions(routed_to_main_wallet);

-- Create function to update project summaries
CREATE OR REPLACE FUNCTION public.update_project_investment_summary(p_project_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_total_invested numeric;
    v_total_investors integer;
    v_last_investment timestamp with time zone;
    v_average_investment numeric;
    v_project_goal numeric;
    v_goal_percentage numeric;
BEGIN
    -- Calculate summary statistics
    SELECT 
        COALESCE(SUM(amount), 0),
        COUNT(DISTINCT from_address),
        MAX(confirmed_at),
        CASE WHEN COUNT(*) > 0 THEN COALESCE(SUM(amount), 0) / COUNT(*) ELSE 0 END
    INTO 
        v_total_invested,
        v_total_investors,
        v_last_investment,
        v_average_investment
    FROM public.project_transactions
    WHERE project_id = p_project_id
    AND status = 'confirmed';

    -- Get project funding goal
    SELECT funding_goal INTO v_project_goal
    FROM public.green_projects
    WHERE id = p_project_id;

    -- Calculate goal percentage
    v_goal_percentage := CASE 
        WHEN v_project_goal > 0 THEN (v_total_invested / v_project_goal) * 100
        ELSE 0
    END;

    -- Insert or update summary
    INSERT INTO public.project_investment_summaries (
        project_id,
        total_invested,
        total_investors,
        last_investment_date,
        average_investment,
        investment_goal_percentage,
        updated_at
    ) VALUES (
        p_project_id,
        v_total_invested,
        v_total_investors,
        v_last_investment,
        v_average_investment,
        v_goal_percentage,
        now()
    )
    ON CONFLICT (project_id) DO UPDATE SET
        total_invested = v_total_invested,
        total_investors = v_total_investors,
        last_investment_date = v_last_investment,
        average_investment = v_average_investment,
        investment_goal_percentage = v_goal_percentage,
        updated_at = now();
END;
$$;

-- Create function to generate wallet address (placeholder - you'll implement actual wallet generation)
CREATE OR REPLACE FUNCTION public.generate_project_wallet_address(p_project_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_wallet_address text;
BEGIN
    -- Placeholder wallet generation - replace with actual wallet generation logic
    v_wallet_address := 'GAiA_PROJECT_' || REPLACE(p_project_id::text, '-', '') || '_WALLET';
    
    RETURN v_wallet_address;
END;
$$;

-- Create trigger to auto-generate wallets for new projects
CREATE OR REPLACE FUNCTION public.create_project_wallet()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_wallet_address text;
BEGIN
    -- Generate wallet address for new project
    v_wallet_address := public.generate_project_wallet_address(NEW.id);
    
    -- Create project wallet
    INSERT INTO public.project_investment_wallets (
        project_id,
        wallet_address,
        wallet_type
    ) VALUES (
        NEW.id,
        v_wallet_address,
        'project_investment'
    );
    
    -- Initialize project summary
    INSERT INTO public.project_investment_summaries (
        project_id
    ) VALUES (
        NEW.id
    );
    
    RETURN NEW;
END;
$$;

-- Create trigger on green_projects
CREATE TRIGGER create_project_wallet_trigger
    AFTER INSERT ON public.green_projects
    FOR EACH ROW
    EXECUTE FUNCTION public.create_project_wallet();

-- Create function to process transaction routing
CREATE OR REPLACE FUNCTION public.route_project_funds_to_main_wallet(p_project_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_project_wallet record;
    v_main_wallet record;
    v_routing_threshold numeric;
    v_amount_to_route numeric;
    v_routing_log_id uuid;
    v_result jsonb;
BEGIN
    -- Get project wallet info
    SELECT * INTO v_project_wallet
    FROM public.project_investment_wallets
    WHERE project_id = p_project_id AND is_active = true;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Project wallet not found');
    END IF;
    
    -- Get main wallet info
    SELECT * INTO v_main_wallet
    FROM public.main_wallet_config
    WHERE is_primary = true AND auto_routing_enabled = true;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Main wallet not configured');
    END IF;
    
    v_routing_threshold := v_main_wallet.routing_threshold;
    v_amount_to_route := v_project_wallet.total_received - v_project_wallet.total_routed;
    
    -- Check if routing is needed
    IF v_amount_to_route >= v_routing_threshold THEN
        -- Create routing log
        INSERT INTO public.transaction_routing_logs (
            project_id,
            from_wallet,
            to_wallet,
            amount_routed,
            routing_status
        ) VALUES (
            p_project_id,
            v_project_wallet.wallet_address,
            v_main_wallet.wallet_address,
            v_amount_to_route,
            'pending'
        ) RETURNING id INTO v_routing_log_id;
        
        -- Update project wallet
        UPDATE public.project_investment_wallets
        SET total_routed = total_routed + v_amount_to_route,
            updated_at = now()
        WHERE id = v_project_wallet.id;
        
        v_result := jsonb_build_object(
            'success', true,
            'amount_routed', v_amount_to_route,
            'routing_log_id', v_routing_log_id,
            'from_wallet', v_project_wallet.wallet_address,
            'to_wallet', v_main_wallet.wallet_address
        );
    ELSE
        v_result := jsonb_build_object(
            'success', false,
            'error', 'Amount below routing threshold',
            'current_amount', v_amount_to_route,
            'threshold', v_routing_threshold
        );
    END IF;
    
    RETURN v_result;
END;
$$;

-- Create function to get admin financial overview
CREATE OR REPLACE FUNCTION public.get_admin_financial_overview()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_overview jsonb;
    v_project_stats jsonb[];
    v_project record;
BEGIN
    -- Check admin access
    IF NOT EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() AND role = 'admin'
    ) THEN
        RAISE EXCEPTION 'Admin access required';
    END IF;
    
    -- Build project statistics array
    FOR v_project IN (
        SELECT 
            gp.id,
            gp.title,
            gp.funding_goal,
            pw.wallet_address,
            pw.total_received,
            pw.total_routed,
            pis.total_invested,
            pis.total_investors,
            pis.investment_goal_percentage
        FROM public.green_projects gp
        LEFT JOIN public.project_investment_wallets pw ON gp.id = pw.project_id
        LEFT JOIN public.project_investment_summaries pis ON gp.id = pis.project_id
        WHERE gp.verification_status = 'approved'
    ) LOOP
        v_project_stats := v_project_stats || jsonb_build_object(
            'project_id', v_project.id,
            'project_title', v_project.title,
            'funding_goal', v_project.funding_goal,
            'wallet_address', v_project.wallet_address,
            'total_received', COALESCE(v_project.total_received, 0),
            'total_routed', COALESCE(v_project.total_routed, 0),
            'total_invested', COALESCE(v_project.total_invested, 0),
            'total_investors', COALESCE(v_project.total_investors, 0),
            'goal_percentage', COALESCE(v_project.investment_goal_percentage, 0)
        );
    END LOOP;
    
    -- Build complete overview
    v_overview := jsonb_build_object(
        'total_projects', (SELECT COUNT(*) FROM public.green_projects WHERE verification_status = 'approved'),
        'total_invested_all_projects', (SELECT COALESCE(SUM(total_invested), 0) FROM public.project_investment_summaries),
        'total_investors_all_projects', (SELECT COALESCE(SUM(total_investors), 0) FROM public.project_investment_summaries),
        'total_pending_routing', (
            SELECT COALESCE(SUM(total_received - total_routed), 0) 
            FROM public.project_investment_wallets 
            WHERE is_active = true
        ),
        'main_wallet_address', (
            SELECT wallet_address 
            FROM public.main_wallet_config 
            WHERE is_primary = true 
            LIMIT 1
        ),
        'projects', v_project_stats,
        'generated_at', now()
    );
    
    RETURN v_overview;
END;
$$;

-- Insert default main wallet configuration (you'll update this with actual wallet)
INSERT INTO public.main_wallet_config (
    wallet_name,
    wallet_address,
    wallet_type,
    is_primary,
    auto_routing_enabled,
    routing_threshold
) VALUES (
    'Coral Project Main Wallet',
    'PLACEHOLDER_UPDATE_WITH_ACTUAL_WALLET_ADDRESS',
    'coral_project_main',
    true,
    true,
    100
) ON CONFLICT DO NOTHING;