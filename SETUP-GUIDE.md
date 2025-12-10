# 🚀 GrowMaxx Setup Guide

Complete setup instructions for deploying GrowMaxx with real authentication and payments.

---

## 📋 Prerequisites Checklist

- [x] Supabase account created
- [x] Supabase project URL and keys
- [x] Google OAuth credentials
- [x] Razorpay account with API keys
- [ ] Supabase database schema run
- [ ] Google OAuth redirect URI configured
- [ ] Environment variables set

---

## 1️⃣ Database Setup (Supabase)

### Step 1: Run Database Schema

1. Go to your Supabase project: https://supabase.com/dashboard/project/qrwsqjztooxeziqfrmjx
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the entire contents of `supabase-schema.sql`
5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

### Step 2: Enable Google OAuth

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Find **Google** and click to expand
3. Toggle **Enable Sign in with Google** to ON
4. Enter:
   - **Client ID:** `[Your Google Client ID]`
   - **Client Secret:** `[Your Google Client Secret]`
5. Copy the **Redirect URL** shown (something like `https://qrwsqjztooxeziqfrmjx.supabase.co/auth/v1/callback`)
6. Click **Save**

### Step 3: Add Redirect URI to Google Console

1. Go to https://console.cloud.google.com/apis/credentials
2. Find your OAuth 2.0 Client ID
3. Click **Edit**
4. Under **Authorized redirect URIs**, click **Add URI**
5. Paste the Supabase redirect URL from Step 2
6. Also add: `http://localhost:5174/auth/callback` (for local dev)
7. Click **Save**

---

## 2️⃣ Environment Variables

### For Local Development

Create a `.env.local` file in the root directory:

```env
# Supabase
VITE_SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyd3Nxanp0b294ZXppcWZybWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTY2MTEsImV4cCI6MjA4MDgzMjYxMX0.woX1RFTOnSN-JRdObGWsrvhCpLBNRcA4m7TTLUdvy0A

# Razorpay (Frontend - Key ID only)
VITE_RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7

# Google OAuth (Frontend - Client ID only)
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# App URL
VITE_APP_URL=http://localhost:5174
```

### For Vercel Deployment

1. Go to your Vercel project settings
2. Click **Environment Variables**
3. Add these variables:

**For Production:**
```
VITE_SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
VITE_APP_URL=https://yourdomain.com

# Backend only (Server-side)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
RAZORPAY_KEY_SECRET=7CjgSBmlW2rhdtWKrcJ4fH75
GOOGLE_CLIENT_SECRET=[Your Google Client Secret]
JWT_SECRET=generate_a_random_string_here
```

**⚠️ Important:** Get your Supabase Service Role Key:
1. Go to Supabase Dashboard → Project Settings → API
2. Copy the **service_role** key (NOT the anon key)
3. Add it as `SUPABASE_SERVICE_ROLE_KEY` in Vercel

---

## 3️⃣ Vercel Deployment

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Deploy

```bash
cd C:\landing\nova-local
vercel
```

Follow the prompts:
- Link to existing project or create new
- Set environment variables (or add them in dashboard later)

### Step 3: Update Google OAuth Redirect URI

After deployment, add your production callback URL to Google Console:
- `https://yourdomain.vercel.app/auth/callback`

---

## 4️⃣ Testing the Flow

### Test Email Sign Up:
1. Go to `/signin`
2. Click "Sign up"
3. Fill in name, email, phone, password
4. Submit
5. Check Supabase → Authentication → Users (should see new user)
6. Check Supabase → Table Editor → profiles (should see profile)

### Test Google Sign In:
1. Go to `/signin`
2. Click "Continue with Google"
3. Select Google account
4. Should redirect to `/dashboard`

### Test Payment:
1. Sign in
2. Go to `/select-plan`
3. Select a plan
4. Go to `/payment`
5. Fill payment details
6. Complete payment
7. Check Supabase → payments table

---

## 5️⃣ Troubleshooting

### "Invalid redirect URI" error
- Make sure Google Console has the correct redirect URIs
- Check Supabase Auth settings

### "Payment verification failed"
- Check Razorpay webhook is configured
- Verify API keys are correct
- Check server logs in Vercel

### "User not found" after Google sign in
- Check Supabase → Authentication → Users
- Verify the trigger function created the profile

### Database connection errors
- Verify Supabase URL and keys
- Check RLS policies are correct
- Ensure tables exist (run schema again)

---

## 6️⃣ Next Steps

1. ✅ Set up email templates in Supabase (optional)
2. ✅ Configure Razorpay webhooks for subscription renewals
3. ✅ Set up monitoring/analytics
4. ✅ Add custom domain
5. ✅ Set up backup strategy

---

## 📞 Support

If you encounter issues:
1. Check Supabase logs: Dashboard → Logs
2. Check Vercel logs: Dashboard → Functions → Logs
3. Check browser console for frontend errors

---

**🎉 You're all set! Your GrowMaxx app is ready to go live!**

