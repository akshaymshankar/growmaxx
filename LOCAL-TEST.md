# 🧪 Local Testing Guide

## Quick Start

### 1. Start Both Servers
```bash
npm run dev:all
```

This will start:
- **Frontend**: http://localhost:5173 (or 5174)
- **API Server**: http://localhost:3000

### 2. Open Your Browser
Visit: **http://localhost:5173**

---

## What to Test

### ✅ Landing Page
- [ ] Homepage loads correctly
- [ ] All sections visible (Hero, Features, Pricing, etc.)
- [ ] "Get Started" button works
- [ ] Navigation works

### ✅ Authentication
- [ ] Sign up with email works
- [ ] Sign in with email works
- [ ] Google OAuth works (redirects to Google)
- [ ] Sign out works

### ✅ Plan Selection
- [ ] Can select a plan
- [ ] Monthly/Yearly toggle works
- [ ] Price calculation is correct

### ✅ Payment Flow
- [ ] Payment page loads
- [ ] Can create Razorpay order (check API: http://localhost:3000/api/health)
- [ ] Payment window opens
- [ ] Payment verification works

### ✅ Dashboard
- [ ] Dashboard loads after login
- [ ] Shows user info
- [ ] Shows subscription details
- [ ] Billing tab works

---

## Troubleshooting

### "Cannot GET /"
- Make sure both servers are running
- Check if port 5173/5174 is already in use
- Try: `npm run dev` (frontend only) and `npm run server` (API only) separately

### API Not Working
- Check: http://localhost:3000/api/health
- Should return: `{"status":"ok","message":"GrowMaxx API Server is running"}`
- Make sure Razorpay keys are set in environment variables

### Authentication Not Working
- Check Supabase credentials in `.env` file
- Make sure Supabase project is set up correctly
- Check browser console for errors

### Payment Not Working
- Check browser console for API errors
- Verify Razorpay keys are correct
- Check API server logs in terminal

---

## Environment Variables Needed

Create a `.env` file in the root directory:

```env
# Supabase
VITE_SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Razorpay
VITE_RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
RAZORPAY_KEY_SECRET=7CjgSBmlW2rhdtWKrcJ4fH75

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# App URL (for local)
VITE_APP_URL=http://localhost:5173
```

---

## Stop Servers

Press `Ctrl+C` in the terminal to stop both servers.


