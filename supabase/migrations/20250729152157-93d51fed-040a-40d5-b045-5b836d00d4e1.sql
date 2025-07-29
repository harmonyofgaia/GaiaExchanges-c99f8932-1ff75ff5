
-- Update any legacy GAIA token references in the database
-- First, let's update fee_transactions table to ensure it uses GAiA
UPDATE fee_transactions 
SET fee_currency = 'GAiA' 
WHERE fee_currency = 'GAIA' OR fee_currency = 'legacy_gaia';

-- Update fee_vault table currency references
UPDATE fee_vault 
SET currency = 'GAiA' 
WHERE currency = 'GAIA' OR currency = 'legacy_gaia';

-- Update any token symbol references in gaia_earning_activities metadata
UPDATE gaia_earning_activities 
SET metadata = jsonb_set(
  COALESCE(metadata, '{}'), 
  '{token_symbol}', 
  '"GAiA"'
)
WHERE metadata->>'token_symbol' = 'GAIA' OR metadata->>'token_symbol' = 'legacy_gaia';

-- Update any token references in environmental_impact table if they exist
UPDATE environmental_impact 
SET description = REPLACE(description, 'GAIA token', 'GAiA token')
WHERE description LIKE '%GAIA token%';

-- Update green_projects funding currency references
UPDATE green_projects 
SET project_data = jsonb_set(
  COALESCE(project_data, '{}'), 
  '{funding_currency}', 
  '"GAiA"'
)
WHERE project_data->>'funding_currency' = 'GAIA';

-- Update any NFT card collection metadata
UPDATE nft_card_collection 
SET card_metadata = jsonb_set(
  COALESCE(card_metadata, '{}'), 
  '{token_type}', 
  '"GAiA"'
)
WHERE card_metadata->>'token_type' = 'GAIA';

-- Update bike_sessions token references
UPDATE bike_sessions 
SET route_data = jsonb_set(
  COALESCE(route_data, '{}'), 
  '{token_earned_type}', 
  '"GAiA"'
)
WHERE route_data->>'token_earned_type' = 'GAIA';

-- Update eco_missions token references
UPDATE eco_missions 
SET completion_data = jsonb_set(
  COALESCE(completion_data, '{}'), 
  '{reward_token}', 
  '"GAiA"'
)
WHERE completion_data->>'reward_token' = 'GAIA';
