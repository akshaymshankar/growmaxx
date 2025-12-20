# 🔄 Automatic Website Management - Subscription-Based

## ✅ What's Automated

When a user's subscription status changes, their website is **automatically** activated or deactivated:

### 🛑 Website Deactivation (Automatic)

**Triggers:**
1. **Subscription Cancelled** → Website suspended
2. **Subscription Paused** → Website suspended
3. **Payment Failed** → Website suspended
4. **Subscription Expired** → Website suspended

**What Happens:**
- All websites for the user are set to `status: 'suspended'`
- `suspended_at` timestamp is recorded
- `suspension_reason` is set (e.g., "Subscription cancelled", "Payment failed")
- Website is taken offline automatically

### ✅ Website Activation (Automatic)

**Triggers:**
1. **Subscription Active** → Website reactivated
2. **Payment Successful** → Website reactivated
3. **Subscription Created** → Website activated

**What Happens:**
- Suspended websites are set to `status: 'live'`
- `suspended_at` is cleared
- `suspension_reason` is cleared
- `reactivated_at` timestamp is recorded
- Website goes back online automatically

---

## 🔧 How It Works

### Webhook Events Handled

1. **`subscription.cancelled`**
   - Updates subscription status to `cancelled`
   - Deactivates all user websites

2. **`subscription.paused`**
   - Updates subscription status to `paused`
   - Deactivates all user websites

3. **`subscription.activated`**
   - Updates subscription status to `active`
   - Activates all user websites

4. **`subscription.charged`**
   - Records payment
   - Ensures website is active

5. **`invoice.payment_failed`**
   - Deactivates all user websites
   - Records failure reason

6. **`payment.captured`** (one-time payments)
   - Creates subscription
   - Activates website

---

## 📊 Database Updates

### Websites Table

**When Deactivated:**
```sql
UPDATE websites SET
  status = 'suspended',
  suspended_at = NOW(),
  suspension_reason = 'Subscription cancelled'
WHERE user_id = '...' AND status = 'live';
```

**When Activated:**
```sql
UPDATE websites SET
  status = 'live',
  suspended_at = NULL,
  suspension_reason = NULL,
  reactivated_at = NOW()
WHERE user_id = '...' AND status = 'suspended';
```

### Subscriptions Table

**Status Values:**
- `active` → Website is live
- `cancelled` → Website is suspended
- `paused` → Website is suspended
- `expired` → Website is suspended

---

## 🎯 User Experience

### When Subscription is Cancelled:

1. **User cancels subscription** → Razorpay sends webhook
2. **Webhook processes** → Updates subscription status
3. **Website deactivated** → Status changed to `suspended`
4. **User sees in dashboard** → "Website suspended - renew subscription"
5. **Website goes offline** → Visitors see maintenance page (if configured)

### When Payment is Successful:

1. **Payment succeeds** → Razorpay sends webhook
2. **Webhook processes** → Updates subscription to `active`
3. **Website activated** → Status changed to `live`
4. **User sees in dashboard** → "Website is live"
5. **Website goes online** → Visitors can access site

---

## 🔍 Monitoring

### Check Website Status

```sql
SELECT 
  w.site_url,
  w.status,
  w.suspended_at,
  w.suspension_reason,
  s.status as subscription_status
FROM websites w
LEFT JOIN subscriptions s ON w.user_id = s.user_id
WHERE w.user_id = '...';
```

### Check Suspended Websites

```sql
SELECT * FROM websites 
WHERE status = 'suspended'
ORDER BY suspended_at DESC;
```

---

## 🚨 Important Notes

1. **All websites for a user are affected** - If user has multiple websites, all are deactivated/activated together

2. **Suspension reason is preserved** - Helps track why website was suspended

3. **Automatic reactivation** - When subscription is renewed, website automatically comes back online

4. **No manual intervention needed** - Everything is automated via webhooks

---

## ✅ Benefits

✅ **Fully Automated** - No manual work needed  
✅ **Instant** - Website deactivated/activated immediately  
✅ **Reliable** - Webhook-based, no polling needed  
✅ **Transparent** - User sees status in dashboard  
✅ **Reversible** - Website reactivates when subscription renews  

---

## 🎉 You're All Set!

Your website hosting is now fully automated based on subscription status! 🚀



