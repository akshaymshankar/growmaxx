# Environment Variables for Vercel

## Required Environment Variables

Copy these to Vercel Dashboard → Settings → Environment Variables

### Frontend Variables (VITE_*)
These are exposed to the browser, so they're safe to use in client-side code.

```bash
VITE_SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyd3Nxanp0b294ZXppcWZybWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTY2MTEsImV4cCI6MjA4MDgzMjYxMX0.woX1RFTOnSN-JRdObGWsrvhCpLBNRcA4m7TTLUdvy0A
VITE_RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
```

### Backend Variables (Server-side only)
These are only available in API functions (serverless functions).

```bash
RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
RAZORPAY_KEY_SECRET=7CjgSBmlW2rhdtWKrcJ4fH75
SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<get-from-supabase-dashboard>
```

**How to get SUPABASE_SERVICE_ROLE_KEY:**
1. Go to Supabase Dashboard
2. Settings → API
3. Copy "service_role" key (NOT the anon key)

---

## Setting Variables in Vercel

### Method 1: Via Dashboard (Recommended)
1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add each variable:
   - **Key:** Variable name (e.g., `VITE_SUPABASE_URL`)
   - **Value:** Variable value
   - **Environment:** Select "Production", "Preview", and "Development"
5. Click "Save"

### Method 2: Via CLI
```bash
vercel env add VITE_SUPABASE_URL
# Enter value when prompted
# Select environments: production, preview, development
```

---

## Environment-Specific Values

You can set different values for:
- **Production:** Live site (growmaxx.vercel.app)
- **Preview:** Pull request previews
- **Development:** Local development

For now, use the same values for all environments.

---

## Verification

After setting variables, redeploy:
```bash
vercel --prod
```

Check if variables are loaded:
- Frontend: Check browser console for any missing env errors
- Backend: Check Vercel Function logs

---

## Security Notes

✅ **Safe to expose (VITE_*):**
- Supabase URL and anon key (public)
- Razorpay key ID (public)

🔒 **Never expose:**
- Razorpay key secret
- Supabase service role key
- Any API secrets

These are automatically kept server-side only by Vercel.






