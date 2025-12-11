# 🚀 QUICK DEPLOY - 3 Steps

## ✅ Step 1: Run SQL Scripts (2 minutes)

Go to **Supabase Dashboard** → **SQL Editor**

Run these 2 scripts (one at a time):

1. **CREATE-OTP-TABLE.sql** - Creates OTP storage table
2. **ADD-MISSING-COLUMNS.sql** - Adds missing profile columns

✅ Done when both scripts run without errors.

---

## ✅ Step 2: Set Environment Variables in Vercel (3 minutes)

Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

Click **Add New** and add these **one by one**:

### Backend Variables (for API):
```
SUPABASE_URL
Value: https://qrwsqjztooxeziqfrmjx.supabase.co

SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyd3Nxanp0b294ZXppcWZybWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTY2MTEsImV4cCI6MjA4MDgzMjYxMX0.woX1RFTOnSN-JRdObGWsrvhCpLBNRcA4m7TTLUdvy0A

RAZORPAY_KEY_ID
Value: rzp_live_RpPJAYduTK0PS7

RAZORPAY_KEY_SECRET
Value: 7CjgSBmlW2rhdtWKrcJ4fH75

GREEN_API_ID_INSTANCE
Value: 7105416689

GREEN_API_TOKEN
Value: e7dfed4e95dc44ddbea1ca75c547c3a4ea8eb608929042ec86
```

### Frontend Variables (for Vite):
```
VITE_SUPABASE_URL
Value: https://qrwsqjztooxeziqfrmjx.supabase.co

VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyd3Nxanp0b294ZXppcWZybWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTY2MTEsImV4cCI6MjA4MDgzMjYxMX0.woX1RFTOnSN-JRdObGWsrvhCpLBNRcA4m7TTLUdvy0A

VITE_RAZORPAY_KEY_ID
Value: rzp_live_RpPJAYduTK0PS7
```

**Important:** 
- Select **Production** environment for all
- Click **Save** after each variable

✅ Done when all 9 variables are added.

---

## ✅ Step 3: Deploy (1 minute)

### Option A: Via Vercel CLI
```bash
cd C:\landing\nova-local
vercel --prod
```

### Option B: Via GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```
(Vercel will auto-deploy)

✅ Done when deployment completes!

---

## 🧪 Test Everything (5 minutes)

After deployment, visit your site and test:

1. **Google Sign In**
   - Click "Get Started"
   - Sign in with Google
   - Should redirect to dashboard ✅

2. **Phone OTP**
   - Go to Dashboard → Organization
   - Enter phone number (with country code: +91XXXXXXXXXX)
   - Click "Verify Phone Number"
   - Check WhatsApp for OTP ✅
   - Enter OTP
   - Phone verified ✅

3. **Payment**
   - Go to Dashboard → Billing Plans
   - Select a plan
   - Complete payment
   - Should redirect to success page ✅

---

## 🎉 That's It!

Your app is now live with:
- ✅ Google Authentication
- ✅ WhatsApp OTP Verification  
- ✅ Razorpay Payments
- ✅ All working seamlessly!

---

## ❌ If Something Doesn't Work

1. **Check Vercel Logs**: Dashboard → Deployments → Click latest → Logs
2. **Check Browser Console**: F12 → Console tab
3. **Verify Environment Variables**: Make sure all 9 are set
4. **Check Supabase**: Make sure SQL scripts ran successfully

---

## 📞 Need More Help?

See `DEPLOYMENT-CHECKLIST.md` for detailed troubleshooting.




