# 🚀 Quick Start - Fixed Issues

## ✅ Fixed Problems

1. **Sign Out** - Now properly redirects and clears all state
2. **Payments** - Now works with local API server

---

## 🏃 How to Run

### Option 1: Run Everything Together (Recommended)

```bash
npm run dev:all
```

This starts:
- API Server on `http://localhost:3000`
- Frontend on `http://localhost:5174`

### Option 2: Run Separately

**Terminal 1 - API Server:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

---

## ✅ Test Sign Out

1. Sign in to your account
2. Click "Sign out" in the dashboard
3. Should redirect to home page
4. Try accessing `/dashboard` - should redirect to `/signin`

---

## ✅ Test Payments

1. Sign in
2. Go to `/select-plan`
3. Choose a plan
4. Go to `/payment`
5. Fill payment details
6. Complete payment with Razorpay test card:
   - Card: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date
7. Payment should complete and redirect to success page

---

## 🐛 If Payments Still Don't Work

1. **Check API server is running:**
   - Visit `http://localhost:3000/api/health`
   - Should see: `{"status":"ok"}`

2. **Check browser console:**
   - Open DevTools (F12)
   - Look for errors in Console tab

3. **Check Razorpay keys:**
   - Make sure keys are correct in `server.js`
   - For testing, you can use Razorpay test keys

---

## 📝 Notes

- **Sign Out**: Now uses `window.location.href` to force full page reload and clear all state
- **Payments**: Uses local API server that proxies to Razorpay
- **Database**: Payments are saved directly to Supabase

---

**🎉 Both issues should now be fixed!**

