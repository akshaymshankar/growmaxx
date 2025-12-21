# 🐛 Railway Deployment Crash - Fix Guide

## Common Causes & Fixes

### 1. ❌ Build Failed (Most Common)

**Symptom**: Server crashes immediately, logs show "dist folder not found"

**Fix**:
1. Go to Railway → **Deployments** tab
2. Check **Build Logs**
3. Look for errors like:
   - `npm ERR!` (dependency issues)
   - `vite build` errors
   - Missing files

**Solution**:
- Ensure `railway.json` has correct build command: `npm run build`
- Check that all dependencies are in `package.json` (not just devDependencies)
- Verify `vite.config.js` is correct

---

### 2. ❌ Missing Environment Variables

**Symptom**: Server starts but crashes on first API call

**Fix**:
1. Go to Railway → **Variables** tab
2. Verify ALL required variables are set:
   ```
   NODE_ENV=production
   PORT=3000
   FRONTEND_URL=https://your-app.up.railway.app
   RAZORPAY_KEY_ID=...
   RAZORPAY_KEY_SECRET=...
   SUPABASE_URL=...
   SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```

---

### 3. ❌ Port Configuration

**Symptom**: Server can't bind to port

**Fix**:
- Railway sets `PORT` automatically
- Don't hardcode port in code
- Use: `const PORT = process.env.PORT || 3000;`

---

### 4. ❌ Missing Dependencies

**Symptom**: `Cannot find module` errors

**Fix**:
1. Check Railway **Build Logs** for missing modules
2. Ensure all production dependencies are in `dependencies` (not `devDependencies`)
3. Common missing ones:
   - `express`
   - `razorpay`
   - `@supabase/supabase-js`
   - `resend`

---

### 5. ❌ Server Startup Error

**Symptom**: Server crashes immediately after start

**Fix**:
1. Check Railway **Logs** tab
2. Look for the last error message
3. Common issues:
   - Syntax errors in `server.js`
   - Missing imports
   - Database connection failures

---

## 🔍 How to Debug

### Step 1: Check Build Logs
1. Railway → **Deployments** tab
2. Click on latest deployment
3. Check **Build Logs** section
4. Look for:
   - ✅ `Build successful`
   - ❌ Any red errors

### Step 2: Check Runtime Logs
1. Railway → **Logs** tab
2. Look for:
   - `🚀 GrowMaxx Server running on port...`
   - Any error messages
   - Stack traces

### Step 3: Check Environment Variables
1. Railway → **Variables** tab
2. Verify all required variables are present
3. Check for typos in variable names

### Step 4: Test Locally
```bash
# Build frontend
npm run build

# Start server
NODE_ENV=production npm start

# Should see:
# 🚀 GrowMaxx Server running on port 3000
# 🌍 Environment: production
# ✅ Serving frontend from /dist
```

---

## ✅ Quick Fix Checklist

- [ ] Check Railway **Build Logs** for build errors
- [ ] Check Railway **Logs** tab for runtime errors
- [ ] Verify all environment variables are set
- [ ] Ensure `railway.json` has correct build/start commands
- [ ] Verify `Procfile` exists: `web: npm start`
- [ ] Test build locally: `npm run build`
- [ ] Test server locally: `NODE_ENV=production npm start`

---

## 🚀 After Fixing

1. **Redeploy**:
   - Railway → **Deployments** → Click **Redeploy**
   - OR push a new commit to trigger auto-deploy

2. **Monitor**:
   - Watch **Logs** tab for startup messages
   - Should see: `🚀 GrowMaxx Server running on port...`

3. **Test**:
   - Visit your Railway domain
   - Should see your app homepage
   - Test API: `https://your-app.up.railway.app/api/health`

---

## 📋 Railway Configuration Check

### railway.json
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start"
  }
}
```

### Procfile
```
web: npm start
```

### package.json
```json
{
  "scripts": {
    "build": "vite build",
    "start": "node server.js"
  }
}
```

---

## 🆘 Still Crashing?

**Share these details:**
1. Railway **Build Logs** (last 50 lines)
2. Railway **Runtime Logs** (last 50 lines)
3. Screenshot of Railway **Variables** tab
4. Your `railway.json` and `Procfile` contents

---

## 💡 Pro Tips

1. **Always check logs first** - 90% of issues are visible in logs
2. **Test locally** - If it works locally, it should work on Railway
3. **Build separately** - Run `npm run build` locally to catch build errors
4. **Environment variables** - Double-check spelling and values
5. **Dependencies** - Make sure production deps are in `dependencies`, not `devDependencies`

