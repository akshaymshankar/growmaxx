# 🚀 DEPLOY NOW - Quick Guide

## ✅ Everything is Ready!

Your Green API credentials are configured:
- **idInstance**: `7105416689`
- **apiTokenInstance**: `e7dfed4e95dc44ddbea1ca75c547c3a4ea8eb608929042ec86`

## 📋 Quick Deployment Steps

### 1. Set Environment Variables in Vercel

Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

Add these:

**For Production:**
```
SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyd3Nxanp0b294ZXppcWZybWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTY2MTEsImV4cCI6MjA4MDgzMjYxMX0.woX1RFTOnSN-JRdObGWsrvhCpLBNRcA4m7TTLUdvy0A
RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
RAZORPAY_KEY_SECRET=7CjgSBmlW2rhdtWKrcJ4fH75
GREEN_API_ID_INSTANCE=7105416689
GREEN_API_TOKEN=e7dfed4e95dc44ddbea1ca75c547c3a4ea8eb608929042ec86
VITE_SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyd3Nxanp0b294ZXppcWZybWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTY2MTEsImV4cCI6MjA4MDgzMjYxMX0.woX1RFTOnSN-JRdObGWsrvhCpLBNRcA4m7TTLUdvy0A
VITE_RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
```

### 2. Run SQL Scripts in Supabase

Go to **Supabase Dashboard** → **SQL Editor**

Run these in order:
1. `CREATE-OTP-TABLE.sql` (creates OTP storage table)
2. `ADD-MISSING-COLUMNS.sql` (adds business_name, business_type, city columns)

### 3. Deploy to Vercel

**Option A: Via CLI**
```bash
cd C:\landing\nova-local
vercel --prod
```

**Option B: Via GitHub**
1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```
2. Vercel will auto-deploy from GitHub

### 4. Test Everything

After deployment, test:
- ✅ Google Sign In → Should go to dashboard
- ✅ Phone OTP → Should receive WhatsApp message
- ✅ Payment → Should work with Razorpay

## 🎯 That's It!

Your app is now live with:
- ✅ Google Authentication
- ✅ WhatsApp OTP Verification
- ✅ Razorpay Payments
- ✅ All working seamlessly!

## 📞 Need Help?

Check `DEPLOYMENT-CHECKLIST.md` for detailed troubleshooting.
