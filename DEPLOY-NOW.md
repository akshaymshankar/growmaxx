# 🚀 DEPLOY NOW - Quick Steps

## ✅ Build Test: PASSED ✓

Your code is ready to deploy!

---

## 🎯 Fastest Way to Deploy (5 minutes)

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login
```bash
vercel login
```

### 3. Deploy
```bash
cd C:\landing\nova-local
vercel --prod
```

Follow the prompts - it's that simple!

---

## 🔑 After Deployment - Add Environment Variables

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these **10 variables**:

### Copy-Paste Ready:

**Frontend (VITE_*):**
```
VITE_SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyd3Nxanp0b294ZXppcWZybWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTY2MTEsImV4cCI6MjA4MDgzMjYxMX0.woX1RFTOnSN-JRdObGWsrvhCpLBNRcA4m7TTLUdvy0A
VITE_RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
VITE_GOOGLE_CLIENT_ID=[Your Google Client ID]
VITE_APP_URL=https://your-app-name.vercel.app
```

**Backend (Server-only):**
```
SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=[Get from Supabase Dashboard → Settings → API → service_role key]
RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
RAZORPAY_KEY_SECRET=7CjgSBmlW2rhdtWKrcJ4fH75
GOOGLE_CLIENT_SECRET=[Your Google Client Secret]
```

**⚠️ Important:**
1. Replace `VITE_APP_URL` with your actual Vercel URL after deployment
2. Get `SUPABASE_SERVICE_ROLE_KEY` from Supabase Dashboard
3. After adding all variables, click **"Redeploy"** button

---

## 🌐 Update Google OAuth

1. After deployment, copy your Vercel URL
2. Go to: https://console.cloud.google.com/apis/credentials
3. Edit your OAuth Client
4. Add redirect URI: `https://your-app.vercel.app/auth/callback`
5. Save

---

## ✅ Test

1. Visit your Vercel URL
2. Test sign up
3. Test payment
4. Check dashboard

---

## 📚 Full Guide

See **DEPLOYMENT-GUIDE.md** for detailed instructions.

---

**🎉 You're ready to go live!**

