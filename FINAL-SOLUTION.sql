-- ============================================
-- FINAL SOLUTION - DISABLE TRIGGER
-- Handle profile creation in frontend (MORE RELIABLE)
-- ============================================

-- Step 1: Drop trigger and function completely
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Step 2: Ensure RLS policy allows frontend to create profiles
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Step 3: Verify trigger is gone
SELECT 
  CASE 
    WHEN COUNT(*) = 0 THEN '✅ Trigger disabled - Frontend will handle profile creation'
    ELSE '❌ Trigger still exists'
  END as status
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- Done! 
-- Now the frontend code will create profiles when users sign in.
-- This eliminates the 500 error completely.

