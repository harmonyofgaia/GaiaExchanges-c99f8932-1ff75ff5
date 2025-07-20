
-- Create bike_sessions table for GPS tracking
CREATE TABLE public.bike_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  distance NUMERIC NOT NULL DEFAULT 0,
  tokens_earned NUMERIC NOT NULL DEFAULT 0,
  bike_type TEXT NOT NULL CHECK (bike_type IN ('gaia_bike', 'regular_bike')),
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  route_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bike_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own bike sessions"
ON public.bike_sessions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bike sessions"
ON public.bike_sessions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bike sessions"
ON public.bike_sessions
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create food_places table for the ecosystem
CREATE TABLE public.food_places (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location_data JSONB NOT NULL DEFAULT '{}',
  food_types TEXT[] DEFAULT '{}',
  owner_id UUID REFERENCES auth.users(id) NOT NULL,
  verified BOOLEAN DEFAULT false,
  forest_layer INTEGER CHECK (forest_layer BETWEEN 1 AND 7),
  tokens_accepted BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security for food_places
ALTER TABLE public.food_places ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for food_places
CREATE POLICY "Anyone can view active food places"
ON public.food_places
FOR SELECT
USING (is_active = true);

CREATE POLICY "Owners can manage their food places"
ON public.food_places
FOR ALL
USING (auth.uid() = owner_id);

-- Create indexes for better performance
CREATE INDEX idx_bike_sessions_user_id ON public.bike_sessions(user_id);
CREATE INDEX idx_food_places_owner_id ON public.food_places(owner_id);
CREATE INDEX idx_food_places_active ON public.food_places(is_active);
