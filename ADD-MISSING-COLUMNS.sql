-- ============================================
-- ADD MISSING COLUMNS TO PROFILES TABLE
-- ============================================

-- Add business_name column
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS business_name TEXT;

-- Add business_type column
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS business_type TEXT;

-- Add city column
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS city TEXT;

-- Verify all columns exist
SELECT 
  column_name,
  data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'profiles'
AND column_name IN ('business_name', 'business_type', 'city', 'phone_verified')
ORDER BY column_name;

-- Done! Now the dashboard can save all fields.

