# 🚂 Deploy to Railway - Step by Step

## ✅ Pre-Deployment Checklist

- [x] `Procfile` exists (`web: npm start`)
- [x] `railway.json` configured
- [x] `package.json` has `start` script
- [x] `server.js` ready for production
- [x] Environment variables extracted from Vercel

---

## 🚀 Step 1: Create Railway Account & Project (2 minutes)

### 1.1 Sign Up / Login
1. Go to https://railway.app
2. Sign up with GitHub (recommended) or email
3. Click **"New Project"**

### 1.2 Connect GitHub Repository
1. Select **"Deploy from GitHub repo"**
2. Choose your repository: `growmaxx` (or your repo name)
3. Railway will detect your project automatically

---

## 🔧 Step 2: Configure Build Settings (1 minute)

Railway should auto-detect Node.js, but verify:

1. Go to your project → **Settings** tab
2. Check **Build Command**: Should be `npm run build`
3. Check **Start Command**: Should be `npm start`
4. If not set, Railway will use `railway.json` automatically

---

## 🔐 Step 3: Add Environment Variables (3 minutes)

### 3.1 Go to Variables Tab
1. In Railway project → Click **Variables** tab
2. Click **"New Variable"** for each one

### 3.2 Copy from `RAILWAY-ENV-COPY-PASTE.txt`

Copy these variables (one by one):

```
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://growmaxx.railway.app
RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
RAZORPAY_KEY_SECRET=7CjgSBmlW2rhdtWKrcJ4fH75
RAZORPAY_WEBHOOK_SECRET=AKShayMuthuSha@nkar1!2@3#4$5%6
SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyd3Nxanp0b294ZXppcWZybWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTY2MTEsImV4cCI6MjA4MDgzMjYxMX0.woX1RFTOnSN-JRdObGWsrvhCpLBNRcA4m7TTLUdvy0A
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyd3Nxanp0b294ZXppcWZybWp4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTI1NjYxMSwiZXhwIjoyMDgwODMyNjExfQ.WMLCTSAYzz-d4xASMh2igIDwwoJvs7Z31mJcOSnpKCk
GREEN_API_ID_INSTANCE=7105416689
GREEN_API_TOKEN=e7dfed4e95dc44ddbea1ca75c547c3a4ea8eb608929042ec86
RESEND_API_KEY=re_xxxxx
```

**Note**: 
- Remove quotes when pasting
- `FRONTEND_URL` will be updated after deployment
- `RESEND_API_KEY` is optional (add if you have it)

---

## 🏗️ Step 4: Deploy (Automatic)

Railway will automatically:
1. **Build**: Run `npm run build` (creates `/dist` folder)
2. **Start**: Run `npm start` (starts `server.js`)

### 4.1 Watch the Deployment
1. Go to **Deployments** tab
2. Watch the build logs
3. Wait for "Build successful" message
4. Check **Logs** tab for server startup

### 4.2 Get Your Railway Domain
1. Go to **Settings** → **Networking**
2. Railway will generate: `https://your-app.up.railway.app`
3. Copy this domain

---

## 🔄 Step 5: Update Environment Variables (2 minutes)

### 5.1 Update FRONTEND_URL
1. Go to **Variables** tab
2. Find `FRONTEND_URL`
3. Update to your Railway domain: `https://your-app.up.railway.app`
4. Railway will auto-restart

### 5.2 Update Razorpay Webhook
1. Go to **Razorpay Dashboard** → **Settings** → **Webhooks**
2. Click **"Add New Webhook"**
3. **Webhook URL**: `https://your-app.up.railway.app/api/webhook`
4. **Events**: Select all payment and subscription events:
   - `payment.captured`
   - `payment_link.paid`
   - `subscription.created`
   - `subscription.charged`
   - `subscription.cancelled`
   - `subscription.paused`
   - `invoice.payment_failed`
5. Click **"Create Webhook"**
6. Copy the **Webhook Secret** (starts with `whsec_`)
7. Update `RAZORPAY_WEBHOOK_SECRET` in Railway Variables

---

## 🌐 Step 6: Configure Custom Domain (Optional - 5 minutes)

### 6.1 Add Domain in Railway
1. Go to **Settings** → **Networking**
2. Click **"Custom Domain"**
3. Enter: `growmaxx.in`
4. Railway will show DNS records

### 6.2 Update DNS
1. Go to your domain registrar (where you bought `growmaxx.in`)
2. Add CNAME record:
   - **Type**: CNAME
   - **Name**: `@` (or `www`)
   - **Value**: Railway-provided CNAME (e.g., `xxxxx.up.railway.app`)
3. Wait 5-10 minutes for DNS propagation

### 6.3 Update FRONTEND_URL
1. After DNS is live, update `FRONTEND_URL` in Railway:
   - Change to: `https://growmaxx.in`
2. Railway will auto-restart

---

## ✅ Step 7: Verify Deployment

### 7.1 Test Your App
1. Visit your Railway domain: `https://your-app.up.railway.app`
2. Test:
   - ✅ Homepage loads
   - ✅ Sign up / Login works
   - ✅ Payment page loads
   - ✅ Razorpay integration works

### 7.2 Test Webhook
1. Make a test payment
2. Check Railway **Logs** tab for webhook events
3. Check Supabase database for payment records
4. Check email (if Resend configured)

---

## 🐛 Troubleshooting

### Build Fails
- Check **Deployments** → **Build Logs**
- Common issues:
  - Missing dependencies → Check `package.json`
  - Build errors → Check `vite.config.js`

### Server Won't Start
- Check **Logs** tab for errors
- Common issues:
  - Missing environment variables → Check **Variables** tab
  - Port conflict → Railway sets `PORT` automatically
  - Database connection → Check Supabase credentials

### 404 on Routes
- Ensure `server.js` serves `/dist` folder correctly
- Check that `npm run build` completed successfully

### Webhook Not Working
- Verify webhook URL in Razorpay matches Railway domain
- Check webhook secret matches in Railway
- Check Railway logs for webhook events

---

## 📊 Monitoring

### Railway Dashboard
- **Metrics**: CPU, Memory, Network
- **Logs**: Real-time server logs
- **Deployments**: Build history

### Check Logs
1. Go to **Logs** tab
2. Filter by:
   - `✅` for success messages
   - `❌` for errors
   - `📋` for API requests

---

## 🎉 Success!

Your app is now live on Railway! 🚀

**Next Steps:**
1. ✅ Test all payment flows
2. ✅ Monitor logs for errors
3. ✅ Set up custom domain (if needed)
4. ✅ Configure email (Resend) for production

---

## 📝 Quick Reference

**Railway Domain**: `https://your-app.up.railway.app`  
**Custom Domain**: `https://growmaxx.in` (after DNS setup)  
**Webhook URL**: `https://your-app.up.railway.app/api/webhook`  
**API Base**: `https://your-app.up.railway.app/api`

---

**Need Help?** Check Railway docs: https://docs.railway.app

