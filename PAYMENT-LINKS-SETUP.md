# 🔗 Razorpay Payment Links Setup - Complete Guide

## ✅ What Changed?

**Before:** Using Razorpay API orders (causing timeout issues)  
**Now:** Using Razorpay.me payment links (instant, reliable, no timeouts!)

---

## 🎯 Your Payment Link

**Your Razorpay.me link:** `https://razorpay.me/@gandhiraajanakshaymuthushanka`

This link is already integrated in the code! ✅

---

## 📋 How It Works

1. **User clicks "Pay Now"** → Redirects to your Razorpay.me link with amount
2. **User pays on Razorpay** → Secure payment page hosted by Razorpay
3. **Razorpay sends webhook** → To `/api/webhook` with payment confirmation
4. **Webhook updates database** → Creates subscription, marks payment as success
5. **User redirected back** → To success page or dashboard

---

## 🔧 Setup Steps

### Step 1: Configure Webhook in Razorpay Dashboard

1. **Go to:** https://dashboard.razorpay.com
2. **Navigate to:** Settings → Webhooks
3. **Add Webhook URL:** `https://growmaxx.vercel.app/api/webhook`
4. **Enable Events:**
   - ✅ `payment.captured`
   - ✅ `payment.failed`
   - ✅ `payment_link.paid`
5. **Copy Webhook Secret** (you'll need this)

### Step 2: Add Webhook Secret to Vercel

1. **Go to:** Vercel Dashboard → Your Project → Settings → Environment Variables
2. **Add:**
   ```
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_from_razorpay
   ```
3. **Redeploy** your application

### Step 3: Test Payment Flow

1. **Select a plan** → Go to payment page
2. **Click "Pay Now"** → Should redirect to Razorpay.me
3. **Complete payment** → Use Razorpay test mode or real payment
4. **Check webhook** → Should update database automatically
5. **Verify subscription** → Check dashboard for active subscription

---

## 🔍 How Payment Links Work

### Payment Link Format

```
https://razorpay.me/@gandhiraajanakshaymuthushanka/{amount}?name={name}&email={email}&contact={phone}
```

**Example:**
```
https://razorpay.me/@gandhiraajanakshaymuthushanka/589?name=John%20Doe&email=john@example.com&contact=1234567890
```

### What Gets Passed

- **Amount:** Total amount (including GST)
- **Name:** User's name (prefilled)
- **Email:** User's email (prefilled)
- **Contact:** User's phone (prefilled)
- **Notes:** JSON with user_id, plan_id, billing_cycle (for webhook matching)

---

## 🛠️ Webhook Handler

The webhook handler (`/api/webhook`) does:

1. **Verifies signature** → Ensures request is from Razorpay
2. **Extracts payment data** → Payment ID, amount, user info from notes
3. **Updates payment record** → Marks as success in database
4. **Creates subscription** → If not one-time plan
5. **Returns success** → Acknowledges to Razorpay

---

## 📊 Database Updates

When payment is successful:

### Payments Table
- `status` → `'success'`
- `razorpay_payment_id` → Payment ID from Razorpay
- `razorpay_order_id` → Order ID (if available)

### Subscriptions Table
- `status` → `'active'`
- `start_date` → Current date
- `end_date` → Based on billing cycle (monthly/yearly)
- `next_billing_date` → Same as end_date

---

## 🐛 Troubleshooting

### Payment not updating in database?

1. **Check webhook URL** → Must be `https://growmaxx.vercel.app/api/webhook`
2. **Check webhook secret** → Must match in Vercel env vars
3. **Check Vercel logs** → Look for webhook errors
4. **Check Razorpay webhook logs** → See if webhook was sent

### Webhook not receiving events?

1. **Verify webhook URL** → Test with curl or Postman
2. **Check firewall** → Vercel should allow Razorpay IPs
3. **Check webhook secret** → Must be correct
4. **Check event types** → Must enable correct events

### Payment link not working?

1. **Check link format** → Must be correct Razorpay.me link
2. **Check amount** → Must be valid number
3. **Check Razorpay account** → Must be active

---

## ✅ Benefits of Payment Links

✅ **No timeout issues** - No API calls in serverless functions  
✅ **Instant redirect** - Just redirect, no waiting  
✅ **Reliable** - Razorpay handles everything  
✅ **Better UX** - Razorpay's optimized payment page  
✅ **Multiple payment methods** - UPI, Cards, Net Banking, Wallets  
✅ **Automatic retries** - Razorpay handles payment retries  
✅ **Webhook-based** - Payment confirmed asynchronously  

---

## 🚀 Next Steps

1. ✅ Configure webhook in Razorpay dashboard
2. ✅ Add webhook secret to Vercel
3. ✅ Test payment flow
4. ✅ Deploy to production
5. ✅ Monitor webhook logs

---

## 📝 Notes

- **Payment links are dynamic** - Amount is added to URL
- **User info is prefilled** - From profile data
- **Webhook handles confirmation** - No need for callback page
- **Database is updated automatically** - Via webhook handler

---

## 🎉 You're All Set!

The payment system is now using Razorpay Payment Links. No more timeout issues! 🚀

