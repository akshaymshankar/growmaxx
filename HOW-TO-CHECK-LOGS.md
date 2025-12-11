# How to Check Supabase Logs - Find the 500 Error

## Step-by-Step Guide

### Step 1: Open Supabase Dashboard
1. Go to: https://supabase.com/dashboard
2. Select your project: `qrwsqjztooxeziqfrmjx`

### Step 2: Navigate to Logs
1. In the left sidebar, click **"Logs"**
2. You'll see different log types:
   - **Postgres Logs** - Database errors
   - **Auth Logs** - Authentication errors
   - **API Logs** - API request errors
   - **Edge Function Logs** - Function errors

### Step 3: Check Postgres Logs (Most Important)
1. Click **"Postgres Logs"**
2. **Clear the logs** (if there's a clear button)
3. **Open your app in another tab** (keep logs tab open)
4. **Try Google sign-in**
5. **Immediately switch back to logs tab**
6. Look for **red error messages** or **500 errors**
7. **Copy the exact error message**

### Step 4: Check Auth Logs
1. Click **"Auth Logs"**
2. Look for errors during OAuth callback
3. Check for any failed authentication attempts

### Step 5: Check API Logs
1. Click **"API Logs"**
2. Filter by status code: **500**
3. Look for requests to `/auth/v1/callback`
4. Check the error details

## What to Look For

In the logs, look for:
- **Error messages** (usually in red)
- **Stack traces**
- **Database constraint violations**
- **RLS policy denials**
- **Function/webhook errors**
- **"unexpected_failure"** messages

## Example of What You Might See

```
ERROR:  duplicate key value violates unique constraint "profiles_pkey"
ERROR:  permission denied for table profiles
ERROR:  function handle_new_user() does not exist
ERROR:  new row violates row-level security policy
```

## How to Share the Error

1. **Copy the entire error message**
2. **Include the timestamp**
3. **Include any stack trace**
4. **Share it with me**

## Pro Tip

- **Keep the logs tab open** while testing
- **Clear logs before testing** to see only new errors
- **Try sign-in immediately** after clearing logs
- **Check logs within 5 seconds** of sign-in attempt

## If You Don't See Any Errors

If logs show no errors but you still get 500:
1. Check **Google Cloud Console** logs
2. Check **browser console** (F12 → Console tab)
3. The error might be in **Supabase's internal processing**

---

**Once you find the error, share it and we'll fix it!**




