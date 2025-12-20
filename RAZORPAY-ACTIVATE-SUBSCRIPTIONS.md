# 🚀 How to Activate Your Razorpay Subscriptions

## ✅ Current Status

You have **2 subscriptions created** but they're in **"Created"** status. They need customer authorization to activate autopay.

---

## 📋 Step 1: Enable Payment Methods (CRITICAL!)

### Enable UPI Autopay & Cards:

1. **In Razorpay Dashboard:**
   - Click on **"Settings"** tab (top navigation)
   - Go to **"Subscriptions"** → **"Settings"**
   - Or: **"Products"** → **"Subscriptions"** → **"Settings"** tab

2. **Enable These Payment Methods:**
   - ✅ **Enable Cards** - For credit/debit card autopay
   - ✅ **Enable UPI Autopay** - For UPI-based automatic payments (GPay, PhonePe, etc.)
   - ✅ **Enable eMandate** (optional) - For bank account debits

3. **Click "Save"**

**⚠️ Without this, customers CANNOT authorize autopay!**

---

## 📋 Step 2: Configure Webhook (For Automatic Updates)

### Set Up Webhook URL:

1. **Go to:** Settings → **Webhooks**

2. **Add Webhook:**
   - **Webhook URL:** 
     - If using Railway: `https://growmaxx.in/api/webhook`
     - If using Vercel: `https://your-app.vercel.app/api/webhook`
     - If local testing: Use ngrok: `https://xxxxx.ngrok.io/api/webhook`

3. **Select Events:**
   - ✅ `subscription.created`
   - ✅ `subscription.activated`
   - ✅ `subscription.charged`
   - ✅ `subscription.cancelled`
   - ✅ `subscription.paused`
   - ✅ `invoice.payment_failed`
   - ✅ `payment.captured`
   - ✅ `payment_link.paid`

4. **Copy Webhook Secret:**
   - After saving, copy the **Webhook Secret** (starts with `whsec_`)
   - Add to your environment variables: `RAZORPAY_WEBHOOK_SECRET=whsec_xxxxx`

5. **Click "Save"**

---

## 📋 Step 3: How Subscriptions Get Activated

### Current Flow:

1. **Your App Creates Subscription:**
   - User clicks "Pay Now" with autopay enabled
   - Your app calls `/api/create-subscription`
   - Razorpay creates subscription (status: "Created")
   - Returns `subscription.short_url` (e.g., `https://rzp.io/rzp/We6esWyd`)

2. **User Redirected to Subscription Link:**
   - User is redirected to Razorpay payment page
   - User sees subscription details and payment options

3. **User Authorizes Mandate:**
   - **For UPI:** User selects UPI app → Authorizes mandate in GPay/PhonePe
   - **For Card:** User enters card → Authenticates with OTP → Card authorized

4. **Subscription Activated:**
   - Status changes from "Created" → "Active"
   - First payment charged immediately
   - Future payments auto-debited monthly

---

## 📋 Step 4: Test Your Setup

### Test Subscription Flow:

1. **Start Your App:**
   ```bash
   npm run dev:all
   ```

2. **Go to Payment Page:**
   - Sign in to your app
   - Select a plan
   - **Enable autopay toggle** ✅
   - Click "Pay Now"

3. **You Should See:**
   - Subscription created in Razorpay
   - Redirect to Razorpay payment page
   - Options for UPI Autopay and Cards

4. **Test Payment:**
   - **Test UPI:** Use test UPI ID: `success@razorpay`
   - **Test Card:** Use test card: `4111 1111 1111 1111`
   - Complete authorization
   - Check subscription status changes to "Active"

5. **Verify Webhook:**
   - Check your server logs for webhook events
   - Subscription should update in your database

---

## 🔍 Understanding Subscription Status

### Status Meanings:

- **"Created"** → Subscription created, waiting for customer authorization
- **"Active"** → Customer authorized, autopay enabled, recurring payments active
- **"Paused"** → Temporarily paused (customer or admin paused)
- **"Cancelled"** → Subscription cancelled, no more payments
- **"Expired"** → Subscription expired (reached end date)

**Your subscriptions are in "Created" because customers haven't authorized yet!**

---

## 🎯 Quick Fix Checklist

Before testing, ensure:

- [ ] **UPI Autopay enabled** in Settings → Subscriptions → Settings
- [ ] **Cards enabled** for subscriptions
- [ ] **Webhook URL configured** in Settings → Webhooks
- [ ] **Webhook events selected** (all subscription events)
- [ ] **Webhook secret** added to environment variables
- [ ] **Your app is running** and can create subscriptions
- [ ] **Test payment flow** end-to-end

---

## 🚨 Common Issues & Fixes

### Issue 1: Subscriptions stuck in "Created" status

**Cause:** Customer hasn't authorized mandate yet

**Fix:**
- Make sure customer is redirected to `subscription.short_url`
- Customer must complete authorization in Razorpay page
- Check if payment methods are enabled in Settings

### Issue 2: UPI Autopay not showing

**Cause:** UPI Autopay not enabled in Settings

**Fix:**
- Go to Settings → Subscriptions → Settings
- Enable "UPI Autopay"
- Save and retry

### Issue 3: Webhook not receiving events

**Cause:** Webhook URL incorrect or secret mismatch

**Fix:**
- Verify webhook URL is accessible (test with curl)
- Check webhook secret matches in environment variables
- Ensure webhook events are selected in Razorpay dashboard

### Issue 4: Subscription created but not in database

**Cause:** Webhook not processing correctly

**Fix:**
- Check server logs for webhook errors
- Verify Supabase credentials
- Test webhook manually from Razorpay dashboard

---

## 📊 Your Current Subscriptions

From your dashboard, you have:

1. **Subscription:** `sub_RtvKVfxy4tgJU5`
   - **Plan:** `plan_RtvGMQWkz0tNGQ`
   - **Link:** `https://rzp.io/rzp/We6esWyd`
   - **Status:** Created (needs authorization)

2. **Subscription:** `sub_RtvJq6bkhoGJcW`
   - **Plan:** `plan_RtvFhoYT8PWGAP`
   - **Link:** `https://rzp.io/rzp/6Jfy8np`
   - **Status:** Created (needs authorization)

**To activate these:**
- Share the subscription links with customers
- Or have customers go through your app's payment flow
- Customers authorize → Status changes to "Active"

---

## 🎉 Next Steps

1. **Enable payment methods** (Step 1) - **DO THIS FIRST!**
2. **Configure webhook** (Step 2)
3. **Test subscription flow** (Step 4)
4. **Monitor subscriptions** in Razorpay dashboard
5. **Check webhook logs** for events

---

**Once payment methods are enabled, your subscriptions will work!** 🚀

