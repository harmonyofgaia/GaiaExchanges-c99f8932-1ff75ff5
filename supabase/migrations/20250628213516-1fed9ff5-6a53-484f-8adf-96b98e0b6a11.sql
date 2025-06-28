
-- Create fee vault table for storing collected fees
CREATE TABLE public.fee_vault (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  total_balance NUMERIC NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'GAIA',
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create fee destinations table for different project options
CREATE TABLE public.fee_destinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'vault', 'burning', 'green_projects', 'humanity'
  percentage_allocation NUMERIC DEFAULT 0,
  wallet_address TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create fee transactions table to track all fee movements
CREATE TABLE public.fee_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  transaction_id UUID REFERENCES transactions(id),
  fee_amount NUMERIC NOT NULL,
  fee_currency TEXT NOT NULL DEFAULT 'GAIA',
  destination_id UUID REFERENCES fee_destinations(id),
  destination_type TEXT NOT NULL, -- 'vault', 'burning', 'green_projects'
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create swap configurations table for user preferences
CREATE TABLE public.swap_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  default_fee_percentage NUMERIC DEFAULT 0.001,
  preferred_fee_destination TEXT DEFAULT 'vault',
  zero_fee_enabled BOOLEAN DEFAULT false,
  custom_fee_amount NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create admin vault access table for 4-step verification
CREATE TABLE public.admin_vault_access (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID REFERENCES auth.users NOT NULL,
  step_1_verified BOOLEAN DEFAULT false,
  step_2_verified BOOLEAN DEFAULT false,
  step_3_verified BOOLEAN DEFAULT false,
  step_4_verified BOOLEAN DEFAULT false,
  access_granted BOOLEAN DEFAULT false,
  session_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '1 hour'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.fee_vault ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swap_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_vault_access ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public can view fee destinations" ON public.fee_destinations FOR SELECT TO authenticated USING (is_active = true);

CREATE POLICY "Users can view their own fee transactions" ON public.fee_transactions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own fee transactions" ON public.fee_transactions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their swap configurations" ON public.swap_configurations FOR ALL TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can access vault" ON public.admin_vault_access FOR ALL TO authenticated USING (auth.uid() = admin_user_id);

-- Insert default fee destinations
INSERT INTO public.fee_destinations (name, description, category, percentage_allocation) VALUES
('Community Vault', 'Secure vault for admin-managed humanitarian projects', 'vault', 40),
('Token Burning', 'Burn tokens to increase scarcity and value', 'burning', 30),
('Green Projects', 'Environmental and sustainability initiatives', 'green_projects', 20),
('Humanity Fund', 'Global humanitarian aid and development projects', 'humanity', 10);

-- Insert initial vault balance
INSERT INTO public.fee_vault (total_balance, currency) VALUES (0, 'GAIA');

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at_swap_configurations
  BEFORE UPDATE ON public.swap_configurations
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
