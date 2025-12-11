# 🔗 Razorpay Payment Links Setup Guide

## Why Payment Links?

✅ **No serverless timeout issues** - No API calls in Vercel functions  
✅ **Instant redirect** - Just redirect user to payment link  
✅ **Webhook-based confirmation** - Payment confirmed asynchronously  
✅ **Works reliably** - No network/timeout issues  

---

## Step 1: Create Payment Links in Razorpay Dashboard

1. **Go to Razorpay Dashboard:** https://dashboard.razorpay.com
2. **Navigate to:** Products → Payment Links
3. **Create Payment Links for each plan:**

### Basic Plan (Monthly)
- **Amount:** ₹589 (₹499 + 18% GST)
- **Description:** "GrowMaxx Basic Plan - Monthly Subscription"
- **Customer Details:** Enable (to capture email/phone)
- **Expiry:** 7 days
- **Copy the Payment Link URL** (e.g., `https://rzp.io/l/xxxxx`)

### Basic Plan (Yearly)
- **Amount:** ₹5,890 (₹4,990 + 18% GST)
- **Description:** "GrowMaxx Basic Plan - Yearly Subscription"
- **Customer Details:** Enable
- **Expiry:** 7 days
- **Copy the Payment Link URL**

### Growth Plan (Monthly)
- **Amount:** ₹1,179 (₹999 + 18% GST)
- **Description:** "GrowMaxx Growth Plan - Monthly Subscription"
- **Customer Details:** Enable
- **Expiry:** 7 days
- **Copy the Payment Link URL**

### Growth Plan (Yearly)
- **Amount:** ₹11,790 (₹9,990 + 18% GST)
- **Description:** "GrowMaxx Growth Plan - Yearly Subscription"
- **Customer Details:** Enable
- **Expiry:** 7 days
- **Copy the Payment Link URL**

### One-Time E2E Plan
- **Amount:** ₹17,699 (₹14,999 + 18% GST)
- **Description:** "GrowMaxx One-Time E2E Plan"
- **Customer Details:** Enable
- **Expiry:** 7 days
- **Copy the Payment Link URL**

---

## Step 2: Add Payment Links to Environment Variables

Add these to **Vercel Dashboard → Environment Variables**:

```
RAZORPAY_PAYMENT_LINK_BASIC_MONTHLY=https://rzp.io/l/xxxxx
RAZORPAY_PAYMENT_LINK_BASIC_YEARLY=https://rzp.io/l/xxxxx
RAZORPAY_PAYMENT_LINK_GROWTH_MONTHLY=https://rzp.io/l/xxxxx
RAZORPAY_PAYMENT_LINK_GROWTH_YEARLY=https://rzp.io/l/xxxxx
RAZORPAY_PAYMENT_LINK_ONETIME=https://rzp.io/l/xxxxx
```

**Also add to frontend (Vite):**
```
VITE_RAZORPAY_PAYMENT_LINK_BASIC_MONTHLY=https://rzp.io/l/xxxxx
VITE_RAZORPAY_PAYMENT_LINK_BASIC_YEARLY=https://rzp.io/l/xxxxx
VITE_RAZORPAY_PAYMENT_LINK_GROWTH_MONTHLY=https://rzp.io/l/xxxxx
VITE_RAZORPAY_PAYMENT_LINK_GROWTH_YEARLY=https://rzp.io/l/xxxxx
VITE_RAZORPAY_PAYMENT_LINK_ONETIME=https://rzp.io/l/xxxxx
```

---

## Step 3: Configure Webhook in Razorpay

1. **Go to:** Razorpay Dashboard → Settings → Webhooks
2. **Add Webhook URL:** `https://growmaxx.vercel.app/api/webhook`
3. **Enable Events:**
   - `payment.captured`
   - `payment.failed`
   - `payment_link.paid`
4. **Copy Webhook Secret** (you'll need this for verification)

Add to Vercel Environment Variables:
```
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
```

---

## Step 4: How It Works

1. **User selects plan** → Goes to payment page
2. **Payment page** → Redirects to Razorpay Payment Link
3. **User pays** → On Razorpay's hosted page
4. **Razorpay sends webhook** → To `/api/webhook`
5. **Webhook handler** → Updates database, creates subscription
6. **User redirected back** → To success page

---

## Benefits

✅ **No timeout issues** - No API calls in serverless function  
✅ **Reliable** - Razorpay handles the payment flow  
✅ **Better UX** - Razorpay's optimized payment page  
✅ **Automatic retries** - Razorpay handles payment retries  
✅ **Multiple payment methods** - UPI, Cards, Net Banking, Wallets  

---

## Next Steps

1. Create payment links in Razorpay dashboard
2. Add links to environment variables
3. Configure webhook
4. Deploy updated code
5. Test payment flow




