
-- First, drop the existing multiple permissive policies on user_stakes table
DROP POLICY IF EXISTS "Users can manage their own stakes" ON public.user_stakes;
DROP POLICY IF EXISTS "Users can view their own stakes" ON public.user_stakes;

-- Create a single optimized policy for SELECT operations
CREATE POLICY "Users can access their own stakes" 
ON public.user_stakes 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Create separate policies for other operations to maintain security
CREATE POLICY "Users can insert their own stakes" 
ON public.user_stakes 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stakes" 
ON public.user_stakes 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stakes" 
ON public.user_stakes 
FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);
