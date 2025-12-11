# 🔍 Debug Payment Issue in Production

## Problem
Payment page keeps loading in production but works fine locally.

## 🔍 Debugging Steps

### Step 1: Check Browser Console
1. Open your production site
2. Press F12 to open Developer Tools
3. Go to **Console** tab
4. Click "Pay Now" button
5. Look for these logs:
   - `Creating payment order...`
   - `Calling API: https://growmaxx.vercel.app/api/create-payment`
   - `Order response status: ...`
   - Any red errors

### Step 2: Check Network Tab
1. In Developer Tools, go to **Network** tab
2. Click "Pay Now"
3. Look for request to `/api/create-payment`
4. Check:
   - **Status Code** (should be 200, not 404 or 500)
   - **Response** (should have `order_id`)
   - **Request URL** (should be correct)

### Step 3: Check Vercel Logs
1. Go to Vercel Dashboard
2. Click on your project
3. Go to **Deployments** tab
4. Click on latest deployment
5. Click **Functions** tab
6. Click on `/api/create-payment`
7. Check **Logs** for errors

## 🔴 Common Issues & Fixes

### Issue 1: 404 Not Found
**Symptom:** Network tab shows 404 for `/api/create-payment`

**Fix:**
- Check if `api/create-payment.js` exists
- Check `vercel.json` has correct rewrites
- Redeploy after fixing

### Issue 2: 500 Internal Server Error
**Symptom:** Network tab shows 500 error

**Likely Cause:** Missing environment variables

**Fix:**
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Verify these are set for **Production**:
   - `RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7`
   - `RAZORPAY_KEY_SECRET=7CjgSBmlW2rhdtWKrcJ4fH75`
3. **Redeploy** after adding variables

### Issue 3: Network Error / Timeout
**Symptom:** Console shows "Network error" or fetch fails

**Fix:**
- Check if API endpoint is accessible
- Verify Vercel deployment is successful
- Check Vercel function logs

### Issue 4: CORS Error
**Symptom:** Console shows CORS error

**Fix:**
- Already handled in API code
- Check if API is returning correct headers

## ✅ Quick Fix Checklist

- [ ] Environment variables set in Vercel (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)
- [ ] Variables set for **Production** environment
- [ ] Redeployed after setting variables
- [ ] Checked browser console for errors
- [ ] Checked Vercel function logs
- [ ] Verified API file exists: `api/create-payment.js`

## 🧪 Test After Fix

1. Clear browser cache
2. Go to payment page
3. Open browser console (F12)
4. Click "Pay Now"
5. Should see:
   - ✅ "Creating payment order..."
   - ✅ "Order created successfully"
   - ✅ Razorpay modal opens

## 📞 If Still Not Working

Share these details:
1. Browser console errors (screenshot)
2. Network tab - request/response (screenshot)
3. Vercel function logs (copy/paste)




