-- Create AI Neural Interactions table for learning
CREATE TABLE IF NOT EXISTS public.ai_neural_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  mode TEXT NOT NULL,
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  model TEXT NOT NULL DEFAULT 'gpt-4.1-2025-04-14',
  processing_time BIGINT NOT NULL,
  context TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create AI Voice Interactions table
CREATE TABLE IF NOT EXISTS public.ai_voice_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  text TEXT NOT NULL,
  voice_type TEXT NOT NULL,
  mode TEXT NOT NULL,
  voice_id TEXT NOT NULL,
  model_id TEXT NOT NULL,
  audio_duration INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create AI Generated Images table
CREATE TABLE IF NOT EXISTS public.ai_generated_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  prompt TEXT NOT NULL,
  enhanced_prompt TEXT NOT NULL,
  style TEXT NOT NULL,
  size TEXT NOT NULL DEFAULT '1024x1024',
  quality TEXT NOT NULL DEFAULT 'high',
  model TEXT NOT NULL DEFAULT 'gpt-image-1',
  image_data TEXT NOT NULL,
  generation_time BIGINT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create AI Learning Database for self-improvement
CREATE TABLE IF NOT EXISTS public.ai_learning_database (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  knowledge_type TEXT NOT NULL,
  data_source TEXT NOT NULL,
  learning_content JSONB NOT NULL,
  confidence_score NUMERIC(5,4) DEFAULT 0.9500,
  validation_status TEXT DEFAULT 'pending',
  usage_count INTEGER DEFAULT 0,
  effectiveness_score NUMERIC(5,4) DEFAULT 0.8000,
  last_accessed TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create AI System Performance table
CREATE TABLE IF NOT EXISTS public.ai_system_performance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  system_component TEXT NOT NULL,
  performance_metric TEXT NOT NULL,
  metric_value NUMERIC(10,4) NOT NULL,
  measurement_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb,
  baseline_value NUMERIC(10,4),
  improvement_percentage NUMERIC(5,2),
  status TEXT DEFAULT 'active'
);

-- Enable RLS on all tables
ALTER TABLE public.ai_neural_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_voice_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_generated_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_learning_database ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_system_performance ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for AI Neural Interactions
CREATE POLICY "Users can manage their own AI interactions" 
ON public.ai_neural_interactions 
FOR ALL 
USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- Create RLS policies for AI Voice Interactions
CREATE POLICY "Users can manage their own voice interactions" 
ON public.ai_voice_interactions 
FOR ALL 
USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- Create RLS policies for AI Generated Images
CREATE POLICY "Users can manage their own generated images" 
ON public.ai_generated_images 
FOR ALL 
USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- Create RLS policies for AI Learning Database (admin access)
CREATE POLICY "System can access AI learning database" 
ON public.ai_learning_database 
FOR ALL 
USING (true);

-- Create RLS policies for AI System Performance
CREATE POLICY "System can access performance metrics" 
ON public.ai_system_performance 
FOR ALL 
USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_ai_neural_interactions_user_mode ON public.ai_neural_interactions(user_id, mode, created_at);
CREATE INDEX IF NOT EXISTS idx_ai_voice_interactions_user ON public.ai_voice_interactions(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ai_generated_images_user ON public.ai_generated_images(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ai_learning_database_category ON public.ai_learning_database(category, knowledge_type);
CREATE INDEX IF NOT EXISTS idx_ai_system_performance_component ON public.ai_system_performance(system_component, measurement_time);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_ai_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_ai_neural_interactions_updated_at
  BEFORE UPDATE ON public.ai_neural_interactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_ai_updated_at_column();

CREATE TRIGGER update_ai_learning_database_updated_at
  BEFORE UPDATE ON public.ai_learning_database
  FOR EACH ROW
  EXECUTE FUNCTION public.update_ai_updated_at_column();