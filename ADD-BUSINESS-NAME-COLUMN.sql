-- ============================================
-- ADD BUSINESS_NAME COLUMN TO PROFILES
-- ============================================

-- Add business_name column if it doesn't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS business_name TEXT;

-- Verify it was added
SELECT 
  column_name,
  data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'profiles'
AND column_name = 'business_name';

-- Done! Now the dashboard can save business_name.

