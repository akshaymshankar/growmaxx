# 🔍 Frontend Debug Guide

## ✅ Servers Are Running!

Based on port checks:
- **API Server**: ✅ Running on port 3000
- **Frontend Server**: ✅ Running on ports 5173 and 5174

---

## 🌐 Try These URLs:

1. **http://localhost:5173** (Primary)
2. **http://localhost:5174** (Alternative)

---

## 🐛 If You See Errors:

### "Cannot GET /" or Blank Page
1. **Open Browser Console** (F12)
2. Check for JavaScript errors
3. Look for network errors (red in Network tab)

### Common Issues:

#### 1. **Module Not Found Errors**
- Check if all dependencies are installed: `npm install`

#### 2. **Supabase Connection Errors**
- Check if `.env` file exists with Supabase credentials
- Create `.env` file if missing:
```env
VITE_SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyd3Nxanp0b294ZXppcWZybWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTY2MTEsImV4cCI6MjA4MDgzMjYxMX0.woX1RFTOnSN-JRdObGWsrvhCpLBNRcA4m7TTLUdvy0A
```

#### 3. **Port Already in Use**
- Kill existing processes:
```powershell
# Find process using port 5173
netstat -ano | findstr :5173
# Kill it (replace PID with actual process ID)
taskkill /PID <PID> /F
```

#### 4. **Build Errors**
- Check terminal for Vite errors
- Look for import/export errors
- Check if all files exist

---

## 🔄 Restart Frontend:

1. **Stop current server**: Press `Ctrl+C` in terminal
2. **Start fresh**:
```bash
npm run dev
```

---

## 📋 What to Check:

1. ✅ Browser console (F12) - any red errors?
2. ✅ Network tab - are files loading?
3. ✅ Terminal output - any build errors?
4. ✅ Port accessibility - can you reach http://localhost:5173?

---

## 💡 Quick Test:

Open browser and go to: **http://localhost:5173**

You should see:
- GrowMaxx landing page
- Dark theme
- "Get Started" button

If you see a blank page or error, check the browser console!







