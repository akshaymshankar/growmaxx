# 🚀 GrowMaxx Deployment Guide - Vercel

Complete step-by-step guide to deploy GrowMaxx to production.

---

## 📋 Pre-Deployment Checklist

- [ ] Database schema run in Supabase
- [ ] Google OAuth configured in Supabase
- [ ] Supabase Service Role Key ready
- [ ] Razorpay keys ready
- [ ] Domain name ready (optional)

---

## 🎯 Step 1: Prepare Your Code

### 1.1 Update Environment Variables

Make sure your `.env.local` has all variables (for reference):

```env
VITE_SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
VITE_GOOGLE_CLIENT_ID=842356384486-t9mhke9r4mvcvfo871udk6trp5r7coup.apps.googleusercontent.com
VITE_APP_URL=http://localhost:5174
```

**⚠️ Note:** `.env.local` is gitignored - you'll add these in Vercel dashboard.

---

## 🎯 Step 2: Get Supabase Service Role Key

1. Go to: https://supabase.com/dashboard/project/qrwsqjztooxeziqfrmjx/settings/api
2. Scroll to **Project API keys**
3. Copy the **service_role** key (the secret one, NOT anon key)
4. **Save it securely** - you'll need it for Vercel

---

## 🎯 Step 3: Update Google OAuth Redirect URI

1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your OAuth 2.0 Client ID
3. Click **Edit**
4. Under **Authorized redirect URIs**, add:
   - `https://your-app-name.vercel.app/auth/callback`
   - (You'll update this after deployment with your actual Vercel URL)

---

## 🎯 Step 4: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - GrowMaxx ready for deployment"
   git branch -M main
   git remote add origin https://github.com/yourusername/growmaxx.git
   git push -u origin main
   ```

2. **Go to Vercel:**
   - Visit: https://vercel.com/new
   - Click **Import Git Repository**
   - Select your GitHub repo
   - Click **Import**

3. **Configure Project:**
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)
   - Click **Deploy**

### Option B: Deploy via CLI (Faster)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd C:\landing\nova-local
   vercel
   ```
   
   Follow prompts:
   - Link to existing project? **No** (first time)
   - Project name: `growmaxx` (or your choice)
   - Directory: `./`
   - Override settings? **No**

4. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

---

## 🎯 Step 5: Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:

### For Production:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://qrwsqjztooxeziqfrmjx.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Production, Preview, Development |
| `VITE_RAZORPAY_KEY_ID` | `rzp_live_RpPJAYduTK0PS7` | Production, Preview, Development |
| `VITE_GOOGLE_CLIENT_ID` | `842356384486-t9mhke9r4mvcvfo871udk6trp5r7coup.apps.googleusercontent.com` | Production, Preview, Development |
| `VITE_APP_URL` | `https://your-app.vercel.app` | Production |
| `SUPABASE_URL` | `https://qrwsqjztooxeziqfrmjx.supabase.co` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `[Your service role key]` | Production, Preview, Development |
| `RAZORPAY_KEY_ID` | `rzp_live_RpPJAYduTK0PS7` | Production, Preview, Development |
| `RAZORPAY_KEY_SECRET` | `7CjgSBmlW2rhdtWKrcJ4fH75` | Production, Preview, Development |
| `GOOGLE_CLIENT_SECRET` | `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` | Production, Preview, Development |

**⚠️ Important:**
- `VITE_*` variables are exposed to frontend
- `SUPABASE_SERVICE_ROLE_KEY` and `RAZORPAY_KEY_SECRET` are **server-only** (not VITE_)
- After adding, **redeploy** for changes to take effect

---

## 🎯 Step 6: Update Google OAuth Redirect URI

1. After deployment, copy your Vercel URL (e.g., `https://growmaxx.vercel.app`)
2. Go to Google Console → OAuth Client
3. Add redirect URI: `https://your-app.vercel.app/auth/callback`
4. Also add: `https://qrwsqjztooxeziqfrmjx.supabase.co/auth/v1/callback` (if not already added)

---

## 🎯 Step 7: Test Deployment

1. Visit your Vercel URL
2. Test sign up with email
3. Test Google sign in
4. Test payment flow (use test card)
5. Check dashboard loads correctly

---

## 🎯 Step 8: Custom Domain (Optional)

1. In Vercel Dashboard → **Settings** → **Domains**
2. Add your domain (e.g., `growmaxx.com`)
3. Follow DNS configuration instructions
4. Update `VITE_APP_URL` environment variable
5. Update Google OAuth redirect URI with new domain

---

## 🐛 Troubleshooting

### "API route not found"
- Check `vercel.json` is correct
- Ensure API files are in `/api` folder
- Redeploy after changes

### "Payment creation failed"
- Check Razorpay keys are correct in Vercel env vars
- Check Vercel function logs: Dashboard → Functions → Logs

### "Google OAuth redirect mismatch"
- Verify redirect URI in Google Console matches exactly
- Check Supabase Auth settings

### "Database connection error"
- Verify Supabase URL and keys
- Check RLS policies allow access
- Check Supabase service role key is correct

### "Build failed"
- Check build logs in Vercel
- Ensure all dependencies are in `package.json`
- Try `npm run build` locally first

---

## 📊 Post-Deployment

### Monitor:
- Vercel Dashboard → Analytics
- Supabase Dashboard → Logs
- Razorpay Dashboard → Payments

### Set Up:
- [ ] Google Analytics (optional)
- [ ] Error tracking (Sentry, optional)
- [ ] Email notifications for payments
- [ ] Backup strategy

---

## 🎉 You're Live!

Your GrowMaxx app is now deployed and ready for customers!

**Next Steps:**
1. Share your Vercel URL
2. Test all features
3. Monitor first few payments
4. Set up customer support

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Supabase logs
3. Check browser console
4. Review this guide again

**Good luck! 🚀**

