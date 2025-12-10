# 🚀 Deployment Checklist - GrowMaxx

## ✅ Pre-Deployment Checklist

### 1. Database Setup
- [x] Run `CREATE-OTP-TABLE.sql` in Supabase SQL Editor
- [x] Run `ADD-MISSING-COLUMNS.sql` in Supabase SQL Editor
- [x] Verify all tables exist: `profiles`, `subscriptions`, `payments`, `otp_verifications`

### 2. Environment Variables Setup

#### In Vercel Dashboard → Settings → Environment Variables:

**Backend Variables (for API routes):**
```
SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
RAZORPAY_KEY_SECRET=your_razorpay_secret
GREEN_API_ID_INSTANCE=7105416689
GREEN_API_TOKEN=e7dfed4e95dc44ddbea1ca75c547c3a4ea8eb608929042ec86
```

**Frontend Variables (for Vite):**
```
VITE_SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
```

### 3. Supabase Configuration
- [x] Authentication → Providers → Google OAuth enabled
- [x] Authentication → URL Configuration:
  - Site URL: `https://growmaxx.vercel.app`
  - Redirect URLs: `https://growmaxx.vercel.app/auth/callback`
- [x] Database → Row Level Security enabled on all tables
- [x] Database → Policies configured correctly

### 4. Google OAuth Setup
- [x] Google Cloud Console → OAuth 2.0 Client ID created
- [x] Authorized redirect URIs:
  - `https://qrwsqjztooxeziqfrmjx.supabase.co/auth/v1/callback`
- [x] Client ID and Secret added to Supabase

### 5. Razorpay Setup
- [x] Razorpay Dashboard → API Keys generated
- [x] Webhook URL configured (if needed)
- [x] Test mode vs Live mode verified

### 6. Green API Setup
- [x] Green API account created
- [x] idInstance: `7105416689`
- [x] apiTokenInstance: `e7dfed4e95dc44ddbea1ca75c547c3a4ea8eb608929042ec86`
- [x] WhatsApp number connected

## 📋 Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment: Auth, Payment, OTP all configured"
git push origin main
```

### Step 2: Deploy to Vercel
```bash
# If not logged in
vercel login

# Deploy
vercel --prod
```

OR use Vercel Dashboard:
1. Go to https://vercel.com
2. Import your GitHub repository
3. Configure environment variables
4. Deploy

### Step 3: Verify Deployment
- [ ] Visit `https://growmaxx.vercel.app`
- [ ] Test Google Sign In
- [ ] Test Phone OTP Verification
- [ ] Test Payment Flow
- [ ] Check all API endpoints

## 🧪 Post-Deployment Testing

### Test 1: Authentication
1. Go to landing page
2. Click "Get Started"
3. Sign in with Google
4. Should redirect to dashboard

### Test 2: Phone Verification
1. Go to Dashboard → Organization
2. Enter phone number
3. Click "Verify Phone Number"
4. Check WhatsApp for OTP
5. Enter OTP
6. Phone should be verified

### Test 3: Payment
1. Go to Dashboard → Billing Plans
2. Select a plan
3. Go to payment page
4. Complete payment with Razorpay
5. Should redirect to success page
6. Subscription should be active

## 🔧 Troubleshooting

### Issue: Google Sign In not working
- Check Supabase redirect URLs
- Verify Google OAuth credentials
- Check browser console for errors

### Issue: OTP not sending
- Verify Green API credentials
- Check Green API dashboard for status
- Verify phone number format (+91XXXXXXXXXX)

### Issue: Payment failing
- Check Razorpay API keys
- Verify webhook configuration
- Check Razorpay dashboard logs

### Issue: Database errors
- Verify Supabase connection
- Check RLS policies
- Verify table structure

## 📞 Support

If issues persist:
1. Check Vercel logs: Dashboard → Deployments → Logs
2. Check Supabase logs: Dashboard → Logs
3. Check browser console for frontend errors

