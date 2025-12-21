# 🚂 Railway Setup - Quick Guide (10 minutes)

## ✅ About Vercel vs Railway

**You DON'T need to stop Vercel!** You can keep both running:
- **Vercel**: Keep for frontend preview/testing
- **Railway**: Use for production (backend + frontend together)

**Recommended**: Use Railway for production (growmaxx.in) because:
- ✅ No serverless timeout issues
- ✅ Persistent server (better for webhooks)
- ✅ Full control over environment

---

## 🚀 Step 1: Deploy to Railway (5 minutes)

### 1.1 Sign Up & Create Project

1. Go to https://railway.app
2. Sign up with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose: `growmaxx` (your repo)
6. Railway auto-detects Node.js ✅

### 1.2 Railway Auto-Configures

Railway will automatically:
- ✅ Detect `package.json`
- ✅ Run `npm install`
- ✅ Build frontend (`npm run build`)
- ✅ Start server (`npm start` from Procfile)

**No manual build config needed!**

---

## 🔧 Step 2: Add Environment Variables (3 minutes)

### Go to Railway → Your Project → Variables Tab

Add these **required** variables:

```bash
# Node Environment
NODE_ENV=production
PORT=3000

# Frontend URL (use Railway domain first, then custom domain)
FRONTEND_URL=https://your-app.up.railway.app
# Later change to: https://growmaxx.in

# Razorpay (from your existing setup)
RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
RAZORPAY_KEY_SECRET=7CjgSBmlW2rhdtWKrcJ4fH75
RAZORPAY_WEBHOOK_SECRET=whsec_xxxxx

# Supabase (from your existing setup)
SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyd3Nxanp0b294ZXppcWZybWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTY2MTEsImV4cCI6MjA4MDgzMjYxMX0.woX1RFTOnSN-JRdObGWsrvhCpLBNRcA4m7TTLUdvy0A
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Email (Resend - optional for now)
RESEND_API_KEY=re_xxxxx
```

### Get Webhook Secret:

1. Go to **Razorpay Dashboard** → **Settings** → **Webhooks**
2. Create webhook: `https://your-app.up.railway.app/api/webhook`
3. Copy **Webhook Secret** (starts with `whsec_`)
4. Add to Railway: `RAZORPAY_WEBHOOK_SECRET=whsec_xxxxx`

---

## 🌐 Step 3: Configure Custom Domain (2 minutes)

### 3.1 Add Domain in Railway

1. Railway project → **Settings** → **Domains**
2. Click **"Custom Domain"**
3. Enter: `growmaxx.in`
4. Railway shows DNS records

### 3.2 Update DNS

Add to your domain registrar:

**Type CNAME:**
```
Name: @
Value: your-app.up.railway.app
```

**OR Type A Record** (if CNAME not supported):
```
Name: @
Value: [IP from Railway]
```

**Wait 5-10 minutes** for DNS propagation.

---

## ✅ Step 4: Update Razorpay Webhook

After Railway is live:

1. Go to **Razorpay Dashboard** → **Settings** → **Webhooks**
2. Update webhook URL to: `https://growmaxx.in/api/webhook`
3. Copy new webhook secret
4. Update in Railway: `RAZORPAY_WEBHOOK_SECRET`

---

## 🧪 Step 5: Test Everything

1. Visit: `https://growmaxx.in` (or Railway domain)
2. Test signup
3. Test payment flow
4. Check Railway logs for webhook events

---

## 📊 Railway vs Vercel

| Feature | Vercel | Railway |
|---------|--------|---------|
| **Serverless** | ✅ Yes | ❌ No (persistent) |
| **Timeout** | ❌ 300s limit | ✅ No limit |
| **Webhooks** | ⚠️ Can timeout | ✅ Reliable |
| **Cost** | Free tier | Free tier + usage |
| **Best For** | Frontend only | Full-stack apps |

**Recommendation**: Use Railway for production (growmaxx.in)

---

## 🔍 Troubleshooting

### Build fails?

- Check Railway logs
- Ensure `package.json` has `start` script
- Check `Procfile` exists

### Webhook not working?

- Check webhook URL in Razorpay matches Railway domain
- Verify `RAZORPAY_WEBHOOK_SECRET` is correct
- Check Railway logs for webhook errors

### Domain not working?

- Wait 10-15 minutes for DNS propagation
- Check DNS records are correct
- Verify domain in Railway settings

---

## ✅ Checklist

- [ ] Railway project created
- [ ] Environment variables added
- [ ] Custom domain configured
- [ ] Razorpay webhook updated
- [ ] Test payment flow
- [ ] Check Railway logs

---

**That's it!** Your app should be live on Railway. 🚀

