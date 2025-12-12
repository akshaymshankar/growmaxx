# 🔄 Razorpay Autopay Setup Guide - UPI & Cards

## ✅ Enable Automatic Monthly Debits (Like Netflix)

This guide will help you set up **UPI Autopay** and **Card-based recurring payments** so that users' payments are automatically debited every month.

---

## 📋 Step 1: Enable Payment Methods in Razorpay Dashboard

### Enable UPI Autopay & Cards for Subscriptions:

1. **Login to Razorpay Dashboard**
   - Go to: https://dashboard.razorpay.com
   - Login with your credentials

2. **Navigate to Subscriptions Settings**
   - Click: **Settings** → **Subscriptions** → **Settings**
   - Or: **Products** → **Subscriptions** → **Settings**

3. **Enable Payment Methods**
   - ✅ **Enable Cards** - For credit/debit card autopay
   - ✅ **Enable UPI Autopay** - For UPI-based automatic payments
   - ✅ **Enable eMandate** - For bank account debits (optional)

4. **Save Settings**
   - Click **Save** to apply changes

---

## 📋 Step 2: Configure Webhook Events

### Enable Subscription Webhooks:

1. **Go to Webhooks**
   - Click: **Settings** → **Webhooks**

2. **Add Webhook URL**
   - URL: `https://your-domain.com/api/webhook`
   - Or for Vercel: `https://your-app.vercel.app/api/webhook`

3. **Select Events to Listen**
   - ✅ `subscription.created`
   - ✅ `subscription.activated`
   - ✅ `subscription.charged`
   - ✅ `subscription.cancelled`
   - ✅ `subscription.paused`
   - ✅ `invoice.payment_failed`
   - ✅ `payment.captured`

4. **Save Webhook**

---

## 📋 Step 3: How It Works

### For Users (UPI Autopay):

1. **User selects plan** → Clicks "Pay Now"
2. **Subscription created** → Razorpay generates subscription
3. **User redirected** → To Razorpay payment page
4. **User selects UPI** → Chooses their UPI app (GPay, PhonePe, etc.)
5. **User authorizes mandate** → Approves automatic debits in UPI app
6. **First payment charged** → Immediately
7. **Future payments** → Automatically debited every month/year

### For Users (Card Autopay):

1. **User selects plan** → Clicks "Pay Now"
2. **Subscription created** → Razorpay generates subscription
3. **User redirected** → To Razorpay payment page
4. **User enters card details** → Card number, expiry, CVV
5. **User authenticates** → OTP/SMS verification (first time only)
6. **Card authorized** → For recurring payments
7. **First payment charged** → Immediately
8. **Future payments** → Automatically debited (no OTP needed)

---

## 📋 Step 4: What Happens After Setup

### Automatic Monthly Debits:

- ✅ **First Payment**: Charged immediately after mandate setup
- ✅ **Recurring Payments**: Automatically debited on billing date
- ✅ **No User Action**: User doesn't need to do anything
- ✅ **Email Notifications**: User receives payment receipts
- ✅ **Failed Payments**: Webhook notifies you, website auto-suspended

### Payment Flow:

```
Month 1: User subscribes → Mandate setup → First payment charged
Month 2: Auto-debit → Payment successful → Website active
Month 3: Auto-debit → Payment successful → Website active
...
User cancels → Subscription ends → Website deactivated
```

---

## 📋 Step 5: Testing

### Test UPI Autopay:

1. Use **Test Mode** in Razorpay Dashboard
2. Create test subscription
3. Use test UPI ID: `success@razorpay`
4. Verify mandate setup
5. Check webhook receives events

### Test Card Autopay:

1. Use **Test Mode**
2. Use test card: `4111 1111 1111 1111`
3. Enter any future expiry date
4. Enter any CVV
5. Verify authorization
6. Check recurring charges

---

## 🔧 Technical Details

### Subscription Creation Includes:

```javascript
{
  plan: {
    period: 'monthly',
    interval: 1,
    item: {
      name: 'Plan Name',
      amount: 49900, // in paise
      currency: 'INR'
    }
  },
  customer: {
    name: 'Customer Name',
    email: 'customer@email.com',
    contact: '9876543210'
  },
  customer_notify: 1,
  total_count: 999, // Infinite recurring
  start_at: timestamp,
  notes: {
    user_id: '...',
    autopay_enabled: 'true'
  }
}
```

### Webhook Events:

- `subscription.activated` → Subscription active, website activated
- `subscription.charged` → Payment successful, website active
- `invoice.payment_failed` → Payment failed, website suspended
- `subscription.cancelled` → Subscription cancelled, website suspended

---

## ✅ Checklist

Before going live:

- [ ] UPI Autopay enabled in Razorpay Dashboard
- [ ] Cards enabled for subscriptions
- [ ] Webhook URL configured
- [ ] Webhook events selected
- [ ] Test subscription created
- [ ] Test UPI mandate setup
- [ ] Test card authorization
- [ ] Webhook receiving events
- [ ] Database updating correctly
- [ ] Website activation/deactivation working

---

## 🎉 You're All Set!

Once configured, your users can:
- ✅ Set up UPI Autopay (like Netflix)
- ✅ Set up Card autopay
- ✅ Automatic monthly debits
- ✅ No manual payment needed
- ✅ Cancel anytime

**Just like Netflix!** 🚀

