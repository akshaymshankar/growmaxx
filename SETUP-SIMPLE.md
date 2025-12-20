# Simple Setup - Just Make It Work

## What You Have:
1. ✅ Google Sign-In
2. ✅ User Dashboard (saves data automatically)
3. ✅ Razorpay Payment Integration

## Step 1: Run SQL Fix (One Time)

Go to Supabase Dashboard → SQL Editor → Run this:

```sql
-- Copy ALL from: SIMPLE-FIX.sql
```

This will:
- Create profiles table if needed
- Set up proper RLS policies
- Create a trigger to auto-create profiles (with error handling)

## Step 2: Test Google Sign-In

1. Go to your app
2. Click "Sign in with Google"
3. Complete Google sign-in
4. Should redirect to dashboard automatically

## Step 3: Test Payment

1. Go to dashboard
2. Click "Select Plan"
3. Choose a plan
4. Click "Pay Now"
5. Complete Razorpay payment
6. Should redirect to success page

## That's It!

Everything is simplified and should work now.

---

## If Sign-In Still Fails:

The 500 error might be from Supabase's OAuth callback. The code now:
- Waits 1.5 seconds for Supabase to process
- Gets user directly (bypasses session issues)
- Creates profile automatically
- Goes to dashboard

If it still fails, check Supabase logs for the EXACT error message.

---

## Dashboard Saves Automatically

All dashboard data (profile, subscription, payments) is saved to Supabase automatically when you:
- Update profile
- Complete payment
- Change settings

No extra steps needed!






