# 🔧 Fix Node.js Version for Railway

## Problem
Railway was using Node.js 18 (deprecated). Supabase requires Node.js 20+.

## ✅ Fix Applied

I've added multiple configuration files to ensure Railway uses Node.js 20:

1. **`.nvmrc`** - Specifies Node.js 20
2. **`.node-version`** - Alternative version file
3. **`package.json`** - Added `engines` field
4. **`railway.json`** - Added `NODE_VERSION` variable

## 🚀 Next Steps

### Option 1: Automatic (Recommended)
Railway will auto-detect Node.js 20 from these files on next deploy.

1. **Commit and push** these changes
2. Railway will **auto-redeploy**
3. Check **Build Logs** - should show Node.js 20

### Option 2: Manual (If needed)
If Railway still uses Node.js 18:

1. Go to Railway → **Settings** → **Variables**
2. Add: `NODE_VERSION=20`
3. Go to **Deployments** → Click **Redeploy**

## ✅ Verification

After redeploy, check Railway **Build Logs**:
- Should see: `Using Node.js 20.x.x`
- Should NOT see: `Node.js 18 and below are deprecated`

## 📋 Files Changed

- ✅ `.nvmrc` (created)
- ✅ `.node-version` (created)
- ✅ `package.json` (added engines field)
- ✅ `railway.json` (added NODE_VERSION)

---

**Note**: Railway's NIXPACKS builder will detect Node.js version from:
1. `.nvmrc` file (highest priority)
2. `.node-version` file
3. `package.json` engines field
4. `railway.json` variables

All of these are now set to Node.js 20! 🎉

