-- ============================================
-- CHECK FOR OTHER ISSUES (Trigger is gone!)
-- ============================================

-- 1. Check for any other triggers on auth.users
SELECT 
  'Other Triggers' as check_name,
  trigger_name,
  event_manipulation,
  action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'users'
AND event_object_schema = 'auth';

-- 2. Check for any functions that might be called
SELECT 
  'Functions' as check_name,
  proname as function_name,
  pronargs as num_args
FROM pg_proc 
WHERE proname LIKE '%user%' 
OR proname LIKE '%auth%'
OR proname LIKE '%profile%';

-- 3. Check RLS policies on profiles
SELECT 
  'RLS Policies' as check_name,
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'profiles';

-- 4. Check if there are any webhooks configured
-- (This can't be checked via SQL, check Supabase Dashboard → Database → Webhooks)

-- If all these return empty or normal results,
-- the issue is likely in Supabase's OAuth processing itself.

