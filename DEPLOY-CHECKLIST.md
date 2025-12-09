# ✅ Pre-Deployment Checklist

Use this checklist before deploying to ensure everything is ready.

---

## 🔐 Step 1: Get Supabase Service Role Key (2 min)

- [ ] Go to: https://supabase.com/dashboard/project/qrwsqjztooxeziqfrmjx/settings/api
- [ ] Scroll to **Project API keys**
- [ ] Copy the **service_role** key (secret, long one)
- [ ] Save it - you'll add it to Vercel

---

## 🌐 Step 2: Update Google OAuth (3 min)

- [ ] Go to: https://console.cloud.google.com/apis/credentials
- [ ] Find OAuth 2.0 Client ID
- [ ] Click **Edit**
- [ ] Add redirect URI: `https://qrwsqjztooxeziqfrmjx.supabase.co/auth/v1/callback`
- [ ] (You'll add Vercel URL after deployment)

---

## 📦 Step 3: Prepare Code (1 min)

- [ ] All files committed to git
- [ ] `.env.local` is NOT committed (should be in .gitignore)
- [ ] `server.js` is NOT needed for Vercel (it's local dev only)

---

## 🚀 Step 4: Deploy to Vercel (5 min)

### Option A: Via GitHub (Recommended)

- [ ] Push code to GitHub:
  ```bash
  git init
  git add .
  git commit -m "Ready for deployment"
  git remote add origin https://github.com/yourusername/growmaxx.git
  git push -u origin main
  ```

- [ ] Go to: https://vercel.com/new
- [ ] Import your GitHub repo
- [ ] Framework: **Vite** (auto-detected)
- [ ] Click **Deploy**

### Option B: Via CLI

- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login: `vercel login`
- [ ] Deploy: `vercel --prod`

---

## 🔑 Step 5: Add Environment Variables (5 min)

In Vercel Dashboard → Settings → Environment Variables, add:

### Frontend Variables (VITE_*)
- [ ] `VITE_SUPABASE_URL` = `https://qrwsqjztooxeziqfrmjx.supabase.co`
- [ ] `VITE_SUPABASE_ANON_KEY` = `[Your anon key]`
- [ ] `VITE_RAZORPAY_KEY_ID` = `rzp_live_RpPJAYduTK0PS7`
- [ ] `VITE_GOOGLE_CLIENT_ID` = `[Your Google Client ID]`
- [ ] `VITE_APP_URL` = `https://your-app.vercel.app` (update after deployment)

### Backend Variables (Server-only)
- [ ] `SUPABASE_URL` = `https://qrwsqjztooxeziqfrmjx.supabase.co`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` = `[Your service role key from Step 1]`
- [ ] `RAZORPAY_KEY_ID` = `rzp_live_RpPJAYduTK0PS7`
- [ ] `RAZORPAY_KEY_SECRET` = `7CjgSBmlW2rhdtWKrcJ4fH75`
- [ ] `GOOGLE_CLIENT_SECRET` = `[Your Google Client Secret]`

**⚠️ Important:** After adding variables, click **Redeploy**!

---

## 🔄 Step 6: Update Google OAuth Redirect (2 min)

- [ ] Copy your Vercel URL (e.g., `https://growmaxx.vercel.app`)
- [ ] Go to Google Console → OAuth Client → Edit
- [ ] Add redirect URI: `https://your-app.vercel.app/auth/callback`
- [ ] Save

---

## ✅ Step 7: Test Everything (5 min)

- [ ] Visit your Vercel URL
- [ ] Test sign up with email
- [ ] Test Google sign in
- [ ] Test plan selection
- [ ] Test payment (use test card: 4111 1111 1111 1111)
- [ ] Test dashboard loads
- [ ] Test sign out

---

## 🎉 Done!

Your app is live! Share your Vercel URL with customers.

---

## 📞 Need Help?

- Check **DEPLOYMENT-GUIDE.md** for detailed instructions
- Check Vercel logs: Dashboard → Functions → Logs
- Check Supabase logs: Dashboard → Logs

