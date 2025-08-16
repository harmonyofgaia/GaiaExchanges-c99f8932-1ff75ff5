# Feature Flags (Supabase)

Create the feature_flags table to toggle UI features without code changes.

```sql
create table if not exists public.feature_flags (
  key text primary key,
  enabled boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.feature_flags (key, enabled) values
  ('car_free_on_green_investments', true)
, ('car_free_on_earn_page', true)
on conflict (key) do nothing;
```