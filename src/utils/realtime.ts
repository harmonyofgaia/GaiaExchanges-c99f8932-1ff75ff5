import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function subscribeToChannel(channel: string, callback: (payload: any) => void) {
  const subscription = supabase.channel(channel).on('postgres_changes', { event: '*', schema: 'public' }, callback).subscribe();
  return () => subscription.unsubscribe();
}

// Example usage: subscribeToChannel('messages', (payload) => { ... });
