# 🔧 Fix Payment Issues on Railway

## Problem
Payments not working after moving to Railway.

## Common Issues & Fixes

---

## ✅ Fix 1: Update Razorpay Webhook URL

### Current Issue
Razorpay webhook is still pointing to Vercel, so payment confirmations aren't reaching Railway.

### Solution

1. **Get Your Railway Domain**
   - Go to Railway Dashboard → Settings → Networking
   - Copy your Railway domain (e.g., `https://your-app.up.railway.app`)

2. **Update Razorpay Webhook**
   - Go to **Razorpay Dashboard** → **Settings** → **Webhooks**
   - Find your existing webhook (or create new)
   - Update **Webhook URL** to: `https://your-app.up.railway.app/api/webhook`
   - **Events**: Select all payment/subscription events
   - Click **Save**
   - Copy the **new Webhook Secret**

3. **Update Railway Environment Variable**
   - Go to Railway → **Variables** tab
   - Update `RAZORPAY_WEBHOOK_SECRET` with the new secret

---

## ✅ Fix 2: Verify Environment Variables

Check Railway → **Variables** tab has all these:

```
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-app.up.railway.app
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
RAZORPAY_WEBHOOK_SECRET=whsec_xxxxx  (NEW from step 1)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx
```

---

## ✅ Fix 3: Test Payment Flow

1. **Visit Railway Domain**
   - Go to: `https://your-app.up.railway.app`
   - Sign in
   - Go to payment page

2. **Check Browser Console (F12)**
   - Look for API calls
   - Should see: `Calling API: https://your-app.up.railway.app/api/...`
   - Should NOT see: `growmaxx.vercel.app`

3. **Check Railway Logs**
   - Go to Railway → **Logs** tab
   - Make a test payment
   - Should see payment creation logs
   - Should see webhook events after payment

---

## ✅ Fix 4: Update Payment Callback URLs

The code already uses `window.location.origin`, so it should work automatically. But verify:

1. **Payment Callback**
   - After payment, should redirect to: `https://your-app.up.railway.app/payment-callback`
   - Check browser URL after payment

2. **Payment Success**
   - Should redirect to: `https://your-app.up.railway.app/payment-success`

---

## 🔍 Debugging Steps

### Check 1: API Calls
1. Open browser console (F12)
2. Go to **Network** tab
3. Try to make a payment
4. Check which domain API calls go to:
   - ✅ Should be: `your-app.up.railway.app`
   - ❌ Should NOT be: `growmaxx.vercel.app`

### Check 2: Railway Logs
1. Go to Railway → **Logs** tab
2. Try to make a payment
3. Look for:
   - `📋 Subscription creation request`
   - `✅ Subscription created`
   - `📋 Payment link creation request`
   - `✅ Payment link created`

### Check 3: Webhook Events
1. Make a test payment
2. Go to Railway → **Logs** tab
3. Look for webhook events:
   - `📥 Webhook received: payment.captured`
   - `📥 Webhook received: subscription.charged`
   - `✅ Payment processed successfully`

---

## ⚠️ Common Payment Errors

### Error: "Payment server not responding"
**Fix**: Check Railway logs - server might be down or API route not working

### Error: "Webhook verification failed"
**Fix**: Update `RAZORPAY_WEBHOOK_SECRET` in Railway with new secret from Razorpay

### Error: "Payment link not created"
**Fix**: Check Railway logs for Razorpay API errors. Verify `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are correct

### Error: "Subscription authorization failed"
**Fix**: 
- Check Razorpay Dashboard → Subscriptions → Settings
- Ensure UPI Autopay and Cards are enabled
- Check Railway logs for specific error

---

## 📋 Quick Checklist

- [ ] Update Razorpay webhook URL to Railway domain
- [ ] Update `RAZORPAY_WEBHOOK_SECRET` in Railway
- [ ] Verify all environment variables are set
- [ ] Test payment on Railway domain
- [ ] Check Railway logs for errors
- [ ] Verify webhook events are received

---

## 💡 About Vercel vs Railway

**You DON'T need to stop Vercel!**

**Recommended Setup:**
- **Railway**: Production (growmaxx.in) - Main deployment
- **Vercel**: Testing/Preview - Keep for testing new features

**Just make sure:**
- Razorpay webhook points to Railway (production)
- Supabase redirect URLs include both domains
- Test payments on Railway domain

---

## 🚀 After Fixing

1. **Test Payment Flow**
   - Sign in on Railway domain
   - Select a plan
   - Complete payment
   - Check dashboard for subscription status

2. **Monitor Logs**
   - Watch Railway logs during payment
   - Verify webhook events are received
   - Check for any errors

3. **Verify Database**
   - Check Supabase → Table Editor → `payments` table
   - Should see payment records
   - Check `subscriptions` table for subscription records

---

**Need Help?** Check Railway logs first - they'll show exactly what's failing!

