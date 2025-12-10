# 📋 Vercel Environment Variables Import Guide

## ✅ Complete .env File

All environment variables are in: **`vercel.env`**

## 🚀 How to Import into Vercel

### Method 1: Import File (Recommended)

1. Go to **Vercel Dashboard**
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Import** button (top right)
5. Select the `vercel.env` file
6. Select **Production** environment
7. Click **Import**

### Method 2: Manual Entry

1. Go to **Vercel Dashboard** → **Settings** → **Environment Variables**
2. For each variable below, click **Add New**:
   - Name: (variable name)
   - Value: (variable value)
   - Environment: **Production** ✅
   - Click **Save**

## 📝 All Variables (9 total)

### Backend Variables (6)

```
SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co

SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyd3Nxanp0b294ZXppcWZybWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTY2MTEsImV4cCI6MjA4MDgzMjYxMX0.woX1RFTOnSN-JRdObGWsrvhCpLBNRcA4m7TTLUdvy0A

RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7

RAZORPAY_KEY_SECRET=7CjgSBmlW2rhdtWKrcJ4fH75

GREEN_API_ID_INSTANCE=7105416689

GREEN_API_TOKEN=e7dfed4e95dc44ddbea1ca75c547c3a4ea8eb608929042ec86
```

### Frontend Variables (3)

```
VITE_SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co

VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyd3Nxanp0b294ZXppcWZybWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTY2MTEsImV4cCI6MjA4MDgzMjYxMX0.woX1RFTOnSN-JRdObGWsrvhCpLBNRcA4m7TTLUdvy0A

VITE_RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
```

## ⚠️ Important Notes

1. **Environment**: Select **Production** for all variables
2. **After Import**: Redeploy your project for changes to take effect
3. **Security**: These are production keys - keep them secure
4. **Verification**: After import, check that all 9 variables are listed

## ✅ After Import

1. Go to **Deployments** tab
2. Click **Redeploy** on latest deployment
3. Wait for deployment to complete
4. Test your app:
   - ✅ Google Sign In
   - ✅ Phone OTP (WhatsApp)
   - ✅ Payment (Razorpay)

## 🔍 Verify Import

After importing, you should see:
- ✅ 9 environment variables listed
- ✅ All marked as "Production"
- ✅ No errors or warnings

## 📞 Troubleshooting

**If import fails:**
- Check file format (should be `.env` format)
- Make sure no extra spaces or quotes
- Try manual entry instead

**If variables not working:**
- Make sure environment is set to "Production"
- Redeploy after setting variables
- Check Vercel logs for errors

