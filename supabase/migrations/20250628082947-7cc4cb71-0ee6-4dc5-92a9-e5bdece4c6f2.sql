
-- Create custom types for the application
CREATE TYPE public.transaction_type AS ENUM ('buy', 'sell', 'transfer', 'stake', 'unstake', 'reward', 'burn');
CREATE TYPE public.order_status AS ENUM ('pending', 'completed', 'cancelled', 'partial');
CREATE TYPE public.trading_pair_status AS ENUM ('active', 'inactive', 'maintenance');
CREATE TYPE public.user_role AS ENUM ('user', 'trader', 'admin', 'moderator');
CREATE TYPE public.security_level AS ENUM ('low', 'medium', 'high', 'maximum');

-- User profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  country TEXT,
  verified BOOLEAN DEFAULT FALSE,
  kyc_status TEXT DEFAULT 'pending',
  security_level security_level DEFAULT 'medium',
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Trading pairs table
CREATE TABLE public.trading_pairs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  base_currency TEXT NOT NULL,
  quote_currency TEXT NOT NULL,
  symbol TEXT NOT NULL UNIQUE,
  current_price DECIMAL(20,8) DEFAULT 0,
  price_change_24h DECIMAL(10,4) DEFAULT 0,
  volume_24h DECIMAL(20,8) DEFAULT 0,
  market_cap DECIMAL(20,2) DEFAULT 0,
  status trading_pair_status DEFAULT 'active',
  min_trade_amount DECIMAL(20,8) DEFAULT 0.000001,
  max_trade_amount DECIMAL(20,8) DEFAULT 1000000,
  trading_fee_percentage DECIMAL(5,4) DEFAULT 0.001,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User wallets table
CREATE TABLE public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  currency TEXT NOT NULL,
  balance DECIMAL(20,8) DEFAULT 0,
  locked_balance DECIMAL(20,8) DEFAULT 0,
  wallet_address TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, currency)
);

-- Trading orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  trading_pair_id UUID REFERENCES public.trading_pairs(id) NOT NULL,
  order_type transaction_type NOT NULL,
  amount DECIMAL(20,8) NOT NULL,
  price DECIMAL(20,8) NOT NULL,
  filled_amount DECIMAL(20,8) DEFAULT 0,
  status order_status DEFAULT 'pending',
  fee DECIMAL(20,8) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions history table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  transaction_type transaction_type NOT NULL,
  currency TEXT NOT NULL,
  amount DECIMAL(20,8) NOT NULL,
  fee DECIMAL(20,8) DEFAULT 0,
  from_address TEXT,
  to_address TEXT,
  transaction_hash TEXT,
  block_number BIGINT,
  status TEXT DEFAULT 'pending',
  order_id UUID REFERENCES public.orders(id),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Security events table
CREATE TABLE public.security_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_description TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  severity security_level DEFAULT 'low',
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staking pools table
CREATE TABLE public.staking_pools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  currency TEXT NOT NULL,
  apy_rate DECIMAL(5,2) NOT NULL,
  min_stake_amount DECIMAL(20,8) DEFAULT 1,
  max_stake_amount DECIMAL(20,8),
  total_staked DECIMAL(20,8) DEFAULT 0,
  reward_pool DECIMAL(20,8) DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User stakes table
CREATE TABLE public.user_stakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  staking_pool_id UUID REFERENCES public.staking_pools(id) NOT NULL,
  amount DECIMAL(20,8) NOT NULL,
  rewards_earned DECIMAL(20,8) DEFAULT 0,
  last_reward_calculation TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Environmental impact tracking
CREATE TABLE public.environmental_impact (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  action_type TEXT NOT NULL,
  carbon_offset DECIMAL(10,6) DEFAULT 0,
  trees_planted INTEGER DEFAULT 0,
  ocean_cleanup_contribution DECIMAL(10,2) DEFAULT 0,
  description TEXT,
  transaction_id UUID REFERENCES public.transactions(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trading_pairs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staking_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.environmental_impact ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for trading_pairs (public read, admin write)
CREATE POLICY "Anyone can view trading pairs" ON public.trading_pairs
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage trading pairs" ON public.trading_pairs
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for wallets
CREATE POLICY "Users can view their own wallets" ON public.wallets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own wallets" ON public.wallets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own wallets" ON public.wallets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON public.orders
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for transactions
CREATE POLICY "Users can view their own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions" ON public.transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for security_events
CREATE POLICY "Users can view their own security events" ON public.security_events
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert security events" ON public.security_events
  FOR INSERT WITH CHECK (true);

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);

-- RLS Policies for staking_pools (public read)
CREATE POLICY "Anyone can view staking pools" ON public.staking_pools
  FOR SELECT TO authenticated USING (active = true);

CREATE POLICY "Admins can manage staking pools" ON public.staking_pools
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_stakes
CREATE POLICY "Users can view their own stakes" ON public.user_stakes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own stakes" ON public.user_stakes
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for environmental_impact
CREATE POLICY "Users can view their own environmental impact" ON public.environmental_impact
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert environmental impact" ON public.environmental_impact
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create trigger function for updating updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_trading_pairs
  BEFORE UPDATE ON public.trading_pairs
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_wallets
  BEFORE UPDATE ON public.wallets
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_orders
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_user_stakes
  BEFORE UPDATE ON public.user_stakes
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, full_name, username)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'username'
  );
  
  -- Create default wallets
  INSERT INTO public.wallets (user_id, currency, is_primary)
  VALUES 
    (NEW.id, 'GAIA', true),
    (NEW.id, 'BTC', false),
    (NEW.id, 'ETH', false);
    
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert default trading pairs
INSERT INTO public.trading_pairs (base_currency, quote_currency, symbol, current_price, price_change_24h, volume_24h, market_cap) VALUES
  ('GAIA', 'USD', 'GAIA/USD', 3.00, 5.67, 8750000, 257250000),
  ('BTC', 'USD', 'BTC/USD', 43250.67, 2.34, 15420000000, 847000000000),
  ('ETH', 'USD', 'ETH/USD', 2543.21, -1.87, 8750000000, 305000000000),
  ('GAIA', 'BTC', 'GAIA/BTC', 0.0000694, 3.21, 2500000, 0),
  ('GAIA', 'ETH', 'GAIA/ETH', 0.001180, 4.12, 1800000, 0);

-- Insert default staking pools
INSERT INTO public.staking_pools (currency, apy_rate, min_stake_amount, total_staked, reward_pool) VALUES
  ('GAIA', 12.50, 100, 0, 1000000),
  ('BTC', 5.25, 0.001, 0, 50),
  ('ETH', 8.75, 0.1, 0, 500);

-- Enable realtime for key tables
ALTER TABLE public.trading_pairs REPLICA IDENTITY FULL;
ALTER TABLE public.orders REPLICA IDENTITY FULL;
ALTER TABLE public.transactions REPLICA IDENTITY FULL;
ALTER TABLE public.wallets REPLICA IDENTITY FULL;
ALTER TABLE public.notifications REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.trading_pairs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.wallets;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
