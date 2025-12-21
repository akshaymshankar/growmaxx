# 📋 Export Environment Variables from Vercel

## Method 1: Vercel Dashboard (Easiest)

1. Go to https://vercel.com/dashboard
2. Select your project: `growmaxx` (or your project name)
3. Go to **Settings** → **Environment Variables**
4. Copy each variable one by one:
   - Click on the variable name/value
   - Copy the value
   - Paste into Railway

## Method 2: Vercel CLI (Faster)

### Install Vercel CLI (if not installed):
```bash
npm install -g vercel
```

### Login to Vercel:
```bash
vercel login
```

### List all environment variables:
```bash
vercel env ls
```

### Pull environment variables:
```bash
vercel env pull .env.vercel
```

This creates a `.env.vercel` file with all your variables.

---

## 📋 Environment Variables Checklist

Copy these from Vercel to Railway:

### Required:
- [ ] `NODE_ENV` → Set to `production` in Railway
- [ ] `PORT` → Set to `3000` in Railway
- [ ] `FRONTEND_URL` → Update to Railway domain
- [ ] `RAZORPAY_KEY_ID`
- [ ] `RAZORPAY_KEY_SECRET`
- [ ] `RAZORPAY_WEBHOOK_SECRET`
- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`

### Optional:
- [ ] `RESEND_API_KEY` (if you set it up)
- [ ] `GREEN_API_ID_INSTANCE` (if using WhatsApp OTP)
- [ ] `GREEN_API_TOKEN`
- [ ] `TEXTLOCAL_API_KEY` (if using SMS OTP)

---

## ⚠️ Important Notes

1. **FRONTEND_URL**: Update to Railway domain:
   - First: `https://your-app.up.railway.app`
   - Later: `https://growmaxx.in`

2. **RAZORPAY_WEBHOOK_SECRET**: 
   - Update webhook URL in Razorpay to Railway domain
   - Get new webhook secret
   - Update in Railway

3. **SUPABASE_SERVICE_ROLE_KEY**: 
   - Make sure you have this (needed for webhooks)
   - Get from Supabase Dashboard → Settings → API

---

## 🚀 Quick Copy-Paste Format

After getting values from Vercel, format for Railway:

```
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-app.up.railway.app
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
RAZORPAY_WEBHOOK_SECRET=whsec_xxxxx
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
RESEND_API_KEY=re_xxxxx
```

