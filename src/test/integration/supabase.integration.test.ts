import { createClient } from '@supabase/supabase-js';

test('Supabase client initializes', () => {
  const client = createClient('https://test.supabase.co', 'public-anon-key');
  expect(client).toBeDefined();
});
