# Fix Supabase 500 Error During OAuth Callback

## The Problem
Supabase is returning a 500 error at `/auth/v1/callback` even though the trigger is disabled.

## Root Cause
The error is happening **on Supabase's server**, not in your code. This means:
- The OAuth callback is being processed by Supabase
- Something in Supabase's processing is failing
- The user might still be created despite the 500 error

## Solution Applied

### 1. Code Updated
- `AuthCallback.jsx` now tries multiple methods:
  - First: `getUser()` - bypasses session, works even if callback failed
  - Second: `getSession()` - retries 15 times with delays
  - Third: Final attempt after 5 second wait

### 2. Check Supabase Logs (CRITICAL)

**You MUST check Supabase logs to find the exact error:**

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to **Logs** → **Postgres Logs**
4. Try Google sign-in
5. **Immediately** check the logs
6. Look for the EXACT error message

**Also check:**
- **Logs** → **Auth Logs** - for authentication errors
- **Logs** → **API Logs** - for API errors

## Possible Causes (Check These)

### 1. RLS Policy Issue
Run this in Supabase SQL Editor:
```sql
-- Check INSERT policy
SELECT * FROM pg_policies 
WHERE tablename = 'profiles' 
AND policyname = 'Users can insert own profile';

-- If missing, create it:
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);
```

### 2. Database Constraint
Check if there's a constraint failing:
```sql
SELECT conname, contype 
FROM pg_constraint
WHERE conrelid = 'public.profiles'::regclass;
```

### 3. Supabase Configuration
- Check **Authentication** → **Providers** → **Google**
- Ensure redirect URL is correct: `https://growmaxx.vercel.app/auth/callback`
- Check **Authentication** → **URL Configuration**

### 4. Supabase Webhook/Function
- Check **Database** → **Functions** - any functions that might be failing?
- Check **Database** → **Webhooks** - any webhooks configured?

## Quick Test

Try manually inserting a profile to see if it works:
```sql
-- Get a test user ID from auth.users first
SELECT id, email FROM auth.users LIMIT 1;

-- Then try to insert (replace with actual user ID)
INSERT INTO public.profiles (id, name)
VALUES ('USER_ID_HERE', 'Test User')
ON CONFLICT (id) DO NOTHING;
```

If this fails, there's a policy or constraint issue.

## What to Share

When you check the logs, share:
1. The **exact error message** from Postgres Logs
2. Any errors from Auth Logs
3. The result of the RLS policy check above

## Temporary Workaround

The code now works even if Supabase returns 500:
- It keeps retrying to get the user/session
- User might be created despite the error
- App will proceed once user is found

But we still need to fix the root cause in Supabase!




