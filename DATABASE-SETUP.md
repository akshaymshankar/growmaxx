# Database Setup & Verification Guide

## 🔧 Critical Database Fixes Required

### Step 1: Run Updated Schema in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `qrwsqjztooxeziqfrmjx`
3. Go to **SQL Editor**
4. Run this SQL to add the missing INSERT policy:

```sql
-- Add INSERT policy for profiles (CRITICAL FIX)
CREATE POLICY IF NOT EXISTS "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
```

### Step 2: Disable Email Confirmation (Recommended for Testing)

**Why?** Email confirmation blocks users from signing in immediately after signup.

1. Go to **Authentication** → **Settings** in Supabase Dashboard
2. Find **"Enable email confirmations"**
3. **Turn it OFF** (disable it)
4. Save changes

**OR** if you want to keep email confirmation:
- Users must click the verification link in their email before they can sign in
- Check spam folder if email doesn't arrive

### Step 3: Verify Database Tables

Run this in SQL Editor to check your tables:

```sql
-- Check if profiles table exists and has data
SELECT * FROM public.profiles LIMIT 10;

-- Check auth users
SELECT id, email, email_confirmed_at, created_at 
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 10;

-- Check subscriptions
SELECT * FROM public.subscriptions LIMIT 10;

-- Check payments
SELECT * FROM public.payments LIMIT 10;
```

---

## 📊 How to Check Database Entries

### Method 1: Supabase Dashboard (Easiest)

1. **View Users:**
   - Go to **Authentication** → **Users**
   - See all registered users
   - Check if email is confirmed (green checkmark)

2. **View Profiles:**
   - Go to **Table Editor** → **profiles**
   - See all user profiles
   - Check if data is saved correctly

3. **View Subscriptions:**
   - Go to **Table Editor** → **subscriptions**
   - See all active subscriptions

4. **View Payments:**
   - Go to **Table Editor** → **payments**
   - See all payment records

### Method 2: SQL Editor (Advanced)

```sql
-- Get user with their profile
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at,
  u.created_at as user_created,
  p.name,
  p.phone,
  p.business_name,
  p.created_at as profile_created
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
ORDER BY u.created_at DESC
LIMIT 20;

-- Check if a specific user exists
SELECT * FROM auth.users WHERE email = 'your-email@example.com';

-- Check profile for a user
SELECT * FROM public.profiles WHERE id = 'user-uuid-here';

-- Count records
SELECT 
  (SELECT COUNT(*) FROM auth.users) as total_users,
  (SELECT COUNT(*) FROM public.profiles) as total_profiles,
  (SELECT COUNT(*) FROM public.subscriptions) as total_subscriptions,
  (SELECT COUNT(*) FROM public.payments) as total_payments;
```

---

## 🐛 Troubleshooting

### Problem: "Profile save button not working"

**Check:**
1. Open browser console (F12)
2. Look for errors when clicking Save
3. Check if profile exists in database
4. Verify RLS policies allow INSERT/UPDATE

**Fix:**
- Run the INSERT policy SQL above
- Check browser console for specific error

### Problem: "Invalid credentials" after signup

**Possible causes:**
1. Email confirmation required but not done
2. User wasn't created in auth.users
3. Password wasn't saved

**Check:**
```sql
-- Check if user exists
SELECT id, email, email_confirmed_at 
FROM auth.users 
WHERE email = 'your-email@example.com';

-- If email_confirmed_at is NULL, user needs to verify email
```

**Fix:**
- Disable email confirmation in Supabase settings
- OR verify email by clicking link in inbox

### Problem: "No state getting saved"

**Check:**
1. Verify tables exist: `profiles`, `subscriptions`, `payments`
2. Check RLS policies are correct
3. Verify trigger for auto-creating profiles

**Verify trigger exists:**
```sql
-- Check if trigger exists
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- If not, create it (from schema file)
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] `profiles` table has INSERT policy
- [ ] Email confirmation is disabled (or users verify emails)
- [ ] Trigger `on_auth_user_created` exists
- [ ] Can see users in Authentication → Users
- [ ] Can see profiles in Table Editor → profiles
- [ ] Sign up creates user AND profile
- [ ] Sign in works after signup
- [ ] Profile save button works
- [ ] Data persists after refresh

---

## 🔍 Quick Debug Queries

```sql
-- Find users without profiles (shouldn't happen if trigger works)
SELECT u.id, u.email 
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL;

-- Find profiles without users (shouldn't happen)
SELECT p.* 
FROM public.profiles p
LEFT JOIN auth.users u ON p.id = u.id
WHERE u.id IS NULL;

-- Check recent signups
SELECT 
  u.email,
  u.created_at,
  u.email_confirmed_at,
  p.name,
  p.phone
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
ORDER BY u.created_at DESC
LIMIT 10;
```

---

## 📝 Important Notes

1. **Email Confirmation:** If enabled, users MUST verify email before signing in
2. **RLS Policies:** Must allow INSERT for profiles table
3. **Trigger:** Auto-creates profile when user signs up
4. **Profile Updates:** Will create profile if it doesn't exist

---

## 🆘 Still Having Issues?

1. Check browser console (F12) for errors
2. Check Supabase logs: **Logs** → **Postgres Logs**
3. Verify environment variables are set correctly
4. Test with a fresh signup and check database immediately




