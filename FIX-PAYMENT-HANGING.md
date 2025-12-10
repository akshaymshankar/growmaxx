# 🔧 Fix Payment Hanging Issue

## Problem
Payment API call is hanging - no response from `/api/create-payment` endpoint.

## Symptoms
- Console shows: "Calling API: https://growmaxx.vercel.app/api/create-payment"
- Console shows: "Request payload: Object"
- **But NO response logs** (no "API call took Xms", no "Order response status")
- Payment page stuck on "Processing..."

## Root Causes

### 1. API Endpoint Not Deployed (404)
**Check:**
- Go to Vercel Dashboard → Deployments
- Check if latest deployment succeeded
- Check if `api/create-payment.js` exists in deployment

**Fix:**
- Ensure `api/create-payment.js` exists in your repo
- Redeploy

### 2. Missing Environment Variables (500)
**Check:**
- Vercel Dashboard → Settings → Environment Variables
- Verify these are set for **Production**:
  - `RAZORPAY_KEY_ID`
  - `RAZORPAY_KEY_SECRET`

**Fix:**
1. Add missing variables
2. Set for **Production** environment
3. **Redeploy** (variables don't apply to existing deployments)

### 3. API Function Error
**Check:**
- Vercel Dashboard → Deployments → Latest → Functions
- Click on `/api/create-payment`
- Check **Logs** tab for errors

**Common Errors:**
- `Razorpay credentials not configured` → Missing env vars
- `Cannot find module 'razorpay'` → Missing dependency
- `Syntax error` → Code issue

### 4. Network/CORS Issue
**Check:**
- Browser Network tab
- Look for `/api/create-payment` request
- Check if it's:
  - Pending (hanging)
  - Failed (red)
  - CORS error

## ✅ Quick Fix Checklist

1. **Check Vercel Deployment:**
   - [ ] Latest deployment succeeded
   - [ ] No build errors
   - [ ] Function `/api/create-payment` exists

2. **Check Environment Variables:**
   - [ ] `RAZORPAY_KEY_ID` is set
   - [ ] `RAZORPAY_KEY_SECRET` is set
   - [ ] Both set for **Production** environment
   - [ ] Redeployed after setting variables

3. **Check Function Logs:**
   - [ ] Go to Vercel → Deployments → Functions
   - [ ] Click `/api/create-payment`
   - [ ] Check logs for errors
   - [ ] Look for "Razorpay credentials not configured"

4. **Test API Directly:**
   ```bash
   curl -X POST https://growmaxx.vercel.app/api/create-payment \
     -H "Content-Type: application/json" \
     -d '{"amount": 589, "currency": "INR", "plan_id": "basic", "plan_name": "Basic Plan", "billing_cycle": "monthly", "user_id": "test"}'
   ```
   
   Should return:
   - `200` with `order_id` → Working ✅
   - `500` with error message → Check logs
   - `404` → Not deployed
   - Timeout → Function issue

## 🔍 Debug Steps

### Step 1: Check Browser Network Tab
1. Open DevTools (F12)
2. Go to **Network** tab
3. Click "Pay Now"
4. Look for `/api/create-payment`:
   - **Status:** 200, 404, 500, or (pending)?
   - **Response:** What does it show?
   - **Time:** How long does it take?

### Step 2: Check Vercel Logs
1. Vercel Dashboard → Your Project
2. **Deployments** → Latest deployment
3. **Functions** tab
4. Click `/api/create-payment`
5. **Logs** tab
6. Look for:
   - `❌ Razorpay credentials not configured`
   - `✅ Razorpay order created successfully`
   - Any error messages

### Step 3: Test API Endpoint
Use curl or Postman to test:
```bash
curl -X POST https://growmaxx.vercel.app/api/create-payment \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 589,
    "currency": "INR",
    "plan_id": "basic",
    "plan_name": "Basic Plan",
    "billing_cycle": "monthly",
    "user_id": "test-user-id"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "order_id": "order_xxxxx",
  "amount": 58900,
  "currency": "INR",
  "receipt": "order_xxxxx"
}
```

## 🚀 Most Likely Fix

**90% of the time, it's missing environment variables:**

1. Go to **Vercel Dashboard**
2. **Settings** → **Environment Variables**
3. Add:
   - `RAZORPAY_KEY_ID` = `rzp_live_RpPJAYduTK0PS7`
   - `RAZORPAY_KEY_SECRET` = `7CjgSBmlW2rhdtWKrcJ4fH75`
4. Set for **Production** environment
5. **Redeploy** (or wait for auto-deploy)

## 📞 Still Not Working?

Share these details:
1. Browser Network tab screenshot (showing `/api/create-payment` request)
2. Vercel function logs (copy/paste)
3. Response from curl test (if you ran it)

