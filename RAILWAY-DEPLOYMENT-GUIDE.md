# 🚂 Railway Deployment Guide for GrowMaxx

## ✅ Complete Setup for growmaxx.in with Autopay

This guide will help you deploy GrowMaxx to Railway with full Razorpay autopay support.

---

## 📋 Prerequisites

1. **Railway Account**: Sign up at https://railway.app
2. **GitHub Repository**: Your code should be on GitHub
3. **Razorpay Account**: With autopay enabled
4. **Domain**: growmaxx.in (or Railway will provide a subdomain)

---

## 🚀 Step 1: Deploy to Railway

### 1.1 Create New Project

1. Go to https://railway.app
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository: `growmaxx` (or your repo name)
5. Railway will auto-detect Node.js

### 1.2 Configure Build Settings

Railway will automatically:
- Detect `package.json`
- Run `npm install`
- Run `npm run build` (from railway.json)
- Start with `npm start` (from Procfile)

**No manual configuration needed!** ✅

---

## 🔧 Step 2: Set Environment Variables

### 2.1 Go to Railway Project Settings

1. Click on your project
2. Go to **"Variables"** tab
3. Add all these environment variables:

### Required Variables:

```bash
# Node Environment
NODE_ENV=production
PORT=3000

# Frontend URL (your domain)
FRONTEND_URL=https://growmaxx.in

# Razorpay Keys
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxx

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional: OTP Services
GREEN_API_ID_INSTANCE=xxxxx
GREEN_API_TOKEN=xxxxx
TEXTLOCAL_API_KEY=xxxxx
TEXTLOCAL_SENDER=GrowMaxx
```

### 2.2 Get Razorpay Webhook Secret

1. Go to **Razorpay Dashboard** → **Settings** → **Webhooks**
2. Create webhook URL: `https://growmaxx.in/api/webhook`
3. Copy the **Webhook Secret** (starts with `whsec_`)
4. Add to Railway: `RAZORPAY_WEBHOOK_SECRET=whsec_xxxxx`

---

## 🌐 Step 3: Configure Domain (growmaxx.in)

### 3.1 Add Custom Domain in Railway

1. Go to your Railway project
2. Click **"Settings"** → **"Domains"**
3. Click **"Custom Domain"**
4. Enter: `growmaxx.in`
5. Railway will provide DNS records

### 3.2 Update DNS Records

Add these DNS records to your domain registrar:

**Type A Record:**
```
Name: @
Value: [Railway IP address]
TTL: 300
```

**Type CNAME Record (for www):**
```
Name: www
Value: [Railway domain].railway.app
TTL: 300
```

**Wait 5-10 minutes for DNS propagation**

### 3.3 SSL Certificate

Railway automatically provisions SSL certificates via Let's Encrypt. ✅

---

## 🔄 Step 4: Configure Razorpay Webhook

### 4.1 Webhook URL

In Razorpay Dashboard → Settings → Webhooks:

**Webhook URL:**
```
https://growmaxx.in/api/webhook
```

### 4.2 Enable Webhook Events

Select these events:
- ✅ `payment.captured`
- ✅ `payment_link.paid`
- ✅ `payment.failed`
- ✅ `subscription.created`
- ✅ `subscription.activated`
- ✅ `subscription.charged`
- ✅ `subscription.cancelled`
- ✅ `subscription.paused`
- ✅ `invoice.payment_failed`

### 4.3 Save Webhook Secret

Copy the webhook secret and add to Railway environment variables.

---

## ✅ Step 5: Verify Deployment

### 5.1 Check Health Endpoint

Visit: `https://growmaxx.in/api/health`

Should return:
```json
{
  "status": "ok",
  "message": "GrowMaxx API Server is running",
  "environment": "production",
  "timestamp": "2024-..."
}
```

### 5.2 Test Payment Flow

1. Visit: `https://growmaxx.in`
2. Sign up / Sign in
3. Select a plan
4. Enable autopay toggle
5. Click "Pay Now"
6. Should redirect to Razorpay subscription page
7. Complete payment
8. Verify webhook received (check Railway logs)

### 5.3 Check Railway Logs

1. Go to Railway project
2. Click **"Deployments"** → **"View Logs"**
3. Look for:
   - ✅ `🚀 GrowMaxx Server running on port 3000`
   - ✅ `🌍 Environment: production`
   - ✅ `📦 Serving frontend from /dist`

---

## 🔍 Step 6: Troubleshooting

### Issue: Payment API fails

**Solution:**
- Check Railway logs for errors
- Verify `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are correct
- Ensure webhook secret is set

### Issue: Webhook not receiving events

**Solution:**
- Verify webhook URL in Razorpay: `https://growmaxx.in/api/webhook`
- Check webhook secret matches
- Test webhook manually from Razorpay dashboard

### Issue: Frontend not loading

**Solution:**
- Ensure `npm run build` completed successfully
- Check Railway build logs
- Verify `dist/` folder exists

### Issue: CORS errors

**Solution:**
- Set `FRONTEND_URL=https://growmaxx.in` in Railway
- Check server.js CORS configuration

---

## 📊 Step 7: Monitor & Scale

### 7.1 Railway Monitoring

Railway provides:
- Real-time logs
- Deployment history
- Resource usage
- Automatic scaling

### 7.2 Set Up Alerts

1. Go to Railway project → **"Settings"** → **"Notifications"**
2. Enable email alerts for:
   - Deployment failures
   - High resource usage
   - Errors

---

## 🎉 Success Checklist

Before going live, verify:

- [ ] Railway deployment successful
- [ ] Domain (growmaxx.in) connected
- [ ] SSL certificate active
- [ ] All environment variables set
- [ ] Razorpay webhook configured
- [ ] Health endpoint working
- [ ] Payment flow tested
- [ ] Webhook receiving events
- [ ] Frontend loading correctly
- [ ] Autopay subscription working

---

## 🔄 Updating Deployment

### To update code:

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Update payment flow"
   git push origin main
   ```

2. Railway auto-deploys on push ✅

### To rebuild manually:

1. Go to Railway project
2. Click **"Deployments"** → **"Redeploy"**

---

## 📞 Support

If you encounter issues:

1. Check Railway logs
2. Check Razorpay dashboard logs
3. Verify environment variables
4. Test webhook manually

---

## 🎯 Next Steps

After deployment:

1. **Enable UPI Autopay** in Razorpay Dashboard
2. **Enable Cards** for subscriptions
3. **Test full autopay flow**
4. **Monitor first few payments**
5. **Set up email notifications**

---

**You're all set! 🚀**

Your GrowMaxx app is now live on Railway with full autopay support!

