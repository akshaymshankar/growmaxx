# 🔧 Fix: Redirect to Railway Instead of Vercel

## Problem
After logging in, users are redirected to `growmaxx.vercel.app` instead of your Railway domain.

## Root Cause
Supabase OAuth redirect URLs are still configured for Vercel domain.

---

## ✅ Solution: Update Supabase Redirect URLs

### Step 1: Get Your Railway Domain
1. Go to Railway Dashboard → Your Project
2. Go to **Settings** → **Networking**
3. Copy your Railway domain (e.g., `https://your-app.up.railway.app`)

### Step 2: Update Supabase Redirect URLs

1. Go to **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** → **URL Configuration**
4. Update **Redirect URLs**:

**Remove:**
```
https://growmaxx.vercel.app/auth/callback
```

**Add:**
```
https://your-app.up.railway.app/auth/callback
https://growmaxx.in/auth/callback  (if you have custom domain)
```

5. Click **Save**

### Step 3: Update Google OAuth Redirect URIs (if using Google)

1. Go to **Google Cloud Console**: https://console.cloud.google.com
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Under **Authorized redirect URIs**, update:

**Remove:**
```
https://growmaxx.vercel.app/auth/callback
```

**Add:**
```
https://your-app.up.railway.app/auth/callback
https://growmaxx.in/auth/callback  (if you have custom domain)
```

6. Click **Save**

---

## ✅ Solution: Update Environment Variables

### In Railway:

1. Go to Railway → **Variables** tab
2. Add/Update:
   ```
   VITE_API_URL=https://your-app.up.railway.app/api
   ```

**Note**: This is optional - the code already uses `window.location.origin` which should work automatically.

---

## 🔍 Why This Happens

The code uses `window.location.origin` which should automatically use the current domain. However:
- **Supabase OAuth** uses the redirect URLs configured in Supabase dashboard
- **Google OAuth** uses the redirect URIs configured in Google Cloud Console

These need to be updated to your Railway domain.

---

## ✅ About Vercel vs Railway

**You DON'T need to stop Vercel!** You can keep both:

- **Vercel**: Keep for testing/preview deployments
- **Railway**: Use for production (growmaxx.in)

**Recommended Setup:**
- **Railway**: Production domain (growmaxx.in)
- **Vercel**: Preview/testing (growmaxx.vercel.app)

Just make sure Supabase redirect URLs include **both** domains if you want to test on both.

---

## 📋 Quick Checklist

- [ ] Get Railway domain from Railway Dashboard
- [ ] Update Supabase redirect URLs
- [ ] Update Google OAuth redirect URIs (if using Google)
- [ ] Test login on Railway domain
- [ ] Verify redirect goes to Railway, not Vercel

---

## 🧪 Test After Fix

1. Visit your Railway domain
2. Click "Sign In"
3. Complete OAuth flow
4. Should redirect to: `https://your-app.up.railway.app/dashboard`
5. Should NOT redirect to: `growmaxx.vercel.app`

---

## 💡 Pro Tip

You can add **multiple redirect URLs** in Supabase:
- `https://your-app.up.railway.app/auth/callback` (Railway)
- `https://growmaxx.vercel.app/auth/callback` (Vercel - for testing)
- `https://growmaxx.in/auth/callback` (Custom domain)

This way, both Railway and Vercel will work!

