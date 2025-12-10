# 🚀 Deploy to Vercel - growmaxx.vercel.app

## Quick Deployment Steps

### Step 1: Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
# From project root (C:\landing\nova-local)
vercel --prod
```

**OR** use the npm script:
```bash
npm run deploy
```

---

## Environment Variables Setup

### Before deploying, set these in Vercel Dashboard:

1. Go to: https://vercel.com/dashboard
2. Select your project (or create new)
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

#### Frontend Variables (VITE_*)
```
VITE_SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyd3Nxanp0b294ZXppcWZybWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTY2MTEsImV4cCI6MjA4MDgzMjYxMX0.woX1RFTOnSN-JRdObGWsrvhCpLBNRcA4m7TTLUdvy0A
VITE_RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
```

#### Backend Variables (for API functions)
```
RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
RAZORPAY_KEY_SECRET=7CjgSBmlW2rhdtWKrcJ4fH75
SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

**Note:** Get `SUPABASE_SERVICE_ROLE_KEY` from Supabase Dashboard → Settings → API

---

## Deployment Checklist

### Before Deploying:
- [ ] All environment variables set in Vercel
- [ ] Database schema updated (phone_verified column added)
- [ ] Google OAuth redirect URL updated in Google Console
- [ ] Test build locally: `npm run build`

### After Deploying:
- [ ] Test Google sign-in
- [ ] Test dashboard loads
- [ ] Test payment flow
- [ ] Check API endpoints work
- [ ] Verify website URL: https://growmaxx.vercel.app

---

## Google OAuth Setup

### Update Redirect URLs in Google Console:

1. Go to: https://console.cloud.google.com/apis/credentials
2. Select your OAuth 2.0 Client ID
3. Add these Authorized redirect URIs:
   - `https://growmaxx.vercel.app/auth/callback`
   - `https://growmaxx.vercel.app/api/auth/google/callback` (if using)

---

## Project Configuration

### vercel.json
- ✅ Framework: Vite
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ API functions: Node.js 18.x
- ✅ SPA routing: All routes → `/index.html`

### Build Output
- Frontend: `dist/` folder
- API functions: `api/` folder (serverless functions)

---

## Troubleshooting

### Issue: Build fails
**Solution:** 
- Check Node.js version (should be 18+)
- Run `npm run build` locally to see errors
- Check for missing dependencies

### Issue: API functions not working
**Solution:**
- Verify environment variables are set
- Check function logs in Vercel Dashboard
- Ensure `api/` folder structure is correct

### Issue: Google OAuth redirect error
**Solution:**
- Update redirect URLs in Google Console
- Check `VITE_SUPABASE_URL` is correct
- Verify Supabase OAuth settings

### Issue: Payment not working
**Solution:**
- Check Razorpay keys are set correctly
- Verify API functions are deployed
- Check browser console for errors

---

## Custom Domain (Optional)

To use a custom domain instead of `growmaxx.vercel.app`:

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Update Google OAuth redirect URLs with new domain

---

## Post-Deployment

### 1. Test Everything:
```bash
# Test these URLs:
- https://growmaxx.vercel.app (Landing page)
- https://growmaxx.vercel.app/signin (Sign in)
- https://growmaxx.vercel.app/dashboard (After sign in)
- https://growmaxx.vercel.app/api/create-payment (API test)
```

### 2. Monitor:
- Vercel Dashboard → Functions (check API logs)
- Supabase Dashboard → Logs (check database queries)
- Browser Console (check for frontend errors)

### 3. Update Documentation:
- Update any hardcoded URLs to use `growmaxx.vercel.app`
- Update Google OAuth settings
- Share the live URL with team

---

## Quick Commands

```bash
# Deploy to production
npm run deploy

# Deploy to preview
vercel

# View deployment logs
vercel logs

# Open deployment in browser
vercel open
```

---

## Support

If deployment fails:
1. Check Vercel Dashboard → Deployments for error logs
2. Check Function logs for API errors
3. Verify all environment variables are set
4. Test build locally first: `npm run build`

---

## Success! 🎉

Once deployed, your app will be live at:
**https://growmaxx.vercel.app**

