# 🔄 Razorpay Autopay/Subscriptions Setup Guide

## ✅ Why Razorpay (Not Stripe)?

**For Indian Market:**
- ✅ **UPI Autopay** - Most popular payment method in India
- ✅ **Lower fees** - Better rates for Indian transactions
- ✅ **UPI Mandates** - Easy recurring payments via UPI apps
- ✅ **Already integrated** - No need to switch gateways
- ✅ **Better support** - Indian company, better local support

**Stripe:**
- ❌ Higher fees for Indian transactions
- ❌ Limited UPI support
- ❌ More complex setup
- ❌ Would need to switch entire payment gateway

## 🎯 Recommendation: **STICK WITH RAZORPAY** ✅

---

## 📋 Step 1: Create Subscription Plans in Razorpay Dashboard

1. **Go to:** https://dashboard.razorpay.com
2. **Navigate to:** Products → Subscriptions → Plans
3. **Create Plans:**

### Basic Plan (Monthly)
- **Name:** Basic Plan - Monthly
- **Amount:** ₹589 (₹499 + 18% GST)
- **Billing Period:** Monthly
- **Save Plan ID** (e.g., `plan_xxxxxxxxxxxxx`)

### Basic Plan (Yearly)
- **Name:** Basic Plan - Yearly
- **Amount:** ₹5,890 (₹4,990 + 18% GST)
- **Billing Period:** Monthly (billed 12 times)
- **Save Plan ID**

### Growth Plan (Monthly)
- **Name:** Growth Plan - Monthly
- **Amount:** ₹1,179 (₹999 + 18% GST)
- **Billing Period:** Monthly
- **Save Plan ID**

### Growth Plan (Yearly)
- **Name:** Growth Plan - Yearly
- **Amount:** ₹11,790 (₹9,990 + 18% GST)
- **Billing Period:** Monthly (billed 12 times)
- **Save Plan ID**

---

## 📋 Step 2: Enable Payment Methods

1. **Go to:** Settings → Subscriptions
2. **Enable:**
   - ✅ **Cards** (for recurring payments)
   - ✅ **UPI Autopay** (for UPI mandates)
   - ✅ **eMandate** (for amounts > ₹5,000)

---

## 📋 Step 3: Configure Webhooks

1. **Go to:** Settings → Webhooks
2. **Add Webhook URL:** `https://growmaxx.vercel.app/api/webhook`
3. **Enable Subscription Events:**
   - ✅ `subscription.created`
   - ✅ `subscription.activated`
   - ✅ `subscription.charged`
   - ✅ `subscription.pending`
   - ✅ `subscription.halted`
   - ✅ `subscription.cancelled`
   - ✅ `subscription.completed`
   - ✅ `subscription.updated`
   - ✅ `invoice.paid`
   - ✅ `invoice.payment_failed`

---

## 🔧 How It Works

### Flow:
1. **User selects plan** → Goes to payment page
2. **API creates subscription** → Returns subscription link
3. **User authorizes payment** → Completes UPI mandate or card authorization
4. **First payment charged** → Subscription activated
5. **Auto-renewal** → Razorpay charges automatically every month
6. **Webhook events** → Updates database on each charge/failure

### Benefits:
- ✅ **Automatic billing** - No manual payment links needed
- ✅ **UPI Autopay** - Works with GPay, PhonePe, Paytm
- ✅ **Card recurring** - Works with credit/debit cards
- ✅ **Failure handling** - Webhooks notify on payment failures
- ✅ **Customer portal** - Users can manage subscriptions

---

## 💰 Pricing Comparison

| Feature | Razorpay | Stripe |
|---------|----------|--------|
| **Transaction Fee** | 2% + ₹2 | 2% + ₹2 (similar) |
| **UPI Autopay** | ✅ Native support | ❌ Limited |
| **Setup Time** | ✅ Already integrated | ❌ Need to switch |
| **Indian Support** | ✅ Better | ⚠️ Good but not local |
| **Mandate Support** | ✅ UPI + eMandate | ⚠️ Limited |

**Verdict:** Razorpay is better for your use case! ✅

---

## 🚀 Next Steps

1. ✅ Create subscription plans in Razorpay dashboard
2. ✅ Enable UPI Autopay and Cards
3. ✅ Configure webhooks
4. ✅ Update code to use subscriptions (I'll do this)
5. ✅ Test subscription flow
6. ✅ Deploy

---

## 📝 Notes

- **UPI Autopay Limit:** ₹5,000 per transaction
- **Card Recurring:** No limit
- **eMandate:** For amounts > ₹5,000
- **First Payment:** Always charged immediately
- **Subsequent Payments:** Auto-debited based on billing cycle

---

## 🎉 You're All Set!

Razorpay Subscriptions will handle all autopay automatically! 🚀

