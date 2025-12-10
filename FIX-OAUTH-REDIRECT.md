# Fix Google OAuth Redirect Issue

## Problem
OAuth is redirecting to `localhost:3000` instead of your deployed URL.

## Solution: Update Supabase Redirect URLs

### Step 1: Go to Supabase Dashboard
1. Visit: https://supabase.com/dashboard
2. Select your project: `qrwsqjztooxeziqfrmjx`
3. Go to **Authentication** → **URL Configuration**

### Step 2: Update Site URL
Set **Site URL** to:
```
https://growmaxx.vercel.app
```

### Step 3: Add Redirect URLs
In **Redirect URLs**, add these (one per line):
```
https://growmaxx.vercel.app/auth/callback
https://growmaxx.vercel.app/**
http://localhost:5173/auth/callback
http://localhost:5173/**
```

**Important:** The `/**` pattern allows all routes under that domain.

### Step 4: Save Changes
Click **Save** at the bottom.

---

## Also Update Google OAuth Settings

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/apis/credentials
2. Select your OAuth 2.0 Client ID

### Step 2: Add Authorized Redirect URIs
Add these redirect URIs:
```
https://qrwsqjztooxeziqfrmjx.supabase.co/auth/v1/callback
https://growmaxx.vercel.app/auth/callback
http://localhost:5173/auth/callback
```

**Note:** The first one is Supabase's callback URL (required). The others are your app URLs.

### Step 3: Save
Click **Save** at the bottom.

---

## How It Works

1. User clicks "Sign in with Google"
2. Redirects to Google OAuth
3. Google redirects to Supabase: `https://qrwsqjztooxeziqfrmjx.supabase.co/auth/v1/callback`
4. Supabase processes auth and redirects to your app: `https://growmaxx.vercel.app/auth/callback`
5. Your app handles the callback and redirects to dashboard

---

## Testing

After updating:
1. Deploy to Vercel: `vercel --prod`
2. Visit: https://growmaxx.vercel.app/signin
3. Click "Continue with Google"
4. Should redirect back to your deployed site, not localhost

---

## Troubleshooting

### Still redirecting to localhost?
- Clear browser cache
- Check Supabase redirect URLs are saved
- Verify Google OAuth redirect URIs include Supabase callback
- Check browser console for errors

### Getting "redirect_uri_mismatch"?
- Make sure Google OAuth has the Supabase callback URL
- Format: `https://[your-project].supabase.co/auth/v1/callback`

### Not redirecting at all?
- Check Supabase Site URL is set correctly
- Verify redirect URLs include your domain
- Check browser console for errors

