# Fix Redirect URL - Remove Leading Spaces

## The Problem

The error shows:
```
"error":"parse \"   https://growmaxx.vercel.app\": first path segment in URL cannot contain colon"
"referer":"   https://growmaxx.vercel.app"
```

**There are 3 SPACES before the URL!** This is causing the 500 error.

## The Fix

### Step 1: Fix in Supabase Dashboard

1. Go to **Supabase Dashboard**
2. **Authentication → URL Configuration**
3. Find **"Redirect URLs"**
4. Look for: `   https://growmaxx.vercel.app/auth/callback` (with spaces)
5. **Delete it**
6. Add: `https://growmaxx.vercel.app/auth/callback` (NO SPACES)
7. Also add: `http://localhost:5173/auth/callback` (for local dev)
8. **Save**

### Step 2: Fix in Code (if needed)

Check `src/context/AuthContext.jsx` - make sure the redirect URL has no spaces:
```javascript
redirectTo: `${window.location.origin}/auth/callback`
```

Should be clean, no spaces.

### Step 3: Fix in Google Cloud Console

1. Go to **Google Cloud Console**
2. **APIs & Services → Credentials**
3. Edit your OAuth 2.0 Client ID
4. Check **"Authorized redirect URIs"**
5. Make sure there are NO SPACES:
   - ✅ `https://qrwsqjztooxeziqfrmjx.supabase.co/auth/v1/callback`
   - ❌ `   https://qrwsqjztooxeziqfrmjx.supabase.co/auth/v1/callback`

## That's It!

The 500 error is just from **leading spaces in the redirect URL**. Remove them and it will work!




