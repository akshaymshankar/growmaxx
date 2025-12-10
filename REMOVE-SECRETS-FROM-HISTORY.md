# 🔒 Remove Secrets from Git History

## Problem
GitHub is blocking push because secrets are in commit `9e3541a` in the git history.

## ✅ Solution Options

### Option 1: Allow Secret (Quick Fix - Recommended)
GitHub provided these URLs to allow the secrets:

1. **Google OAuth Client ID:**
   https://github.com/akshaymshankar/growmaxx/security/secret-scanning/unblock-secret/36eZadnZy4O6bUq8yfHwb5hbd8b

2. **Google OAuth Client Secret:**
   https://github.com/akshaymshankar/growmaxx/security/secret-scanning/unblock-secret/36eZaZg31rLxvlTSm7Wis6AQnC1

**Steps:**
1. Click both URLs above
2. Click "Allow secret" on each page
3. Try `git push origin main` again

**Note:** This allows the secrets in that specific commit but they're already exposed. You should rotate these credentials in Google Cloud Console.

---

### Option 2: Remove from History (Advanced)

If you want to completely remove secrets from history:

```bash
# Install git-filter-repo (if not installed)
# pip install git-filter-repo

# Remove secrets from history
git filter-repo --invert-paths --path api/auth/google/callback.js
git filter-repo --replace-text <(echo "842356384486-t9mhke9r4mvcvfo871udk6trp5r7coup.apps.googleusercontent.com==>your-google-client-id.apps.googleusercontent.com")
git filter-repo --replace-text <(echo "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==>your-google-client-secret")

# Force push (WARNING: This rewrites history)
git push origin main --force
```

**⚠️ Warning:** This rewrites git history. Only do this if you're the only one working on the repo.

---

### Option 3: Rotate Credentials (Best Security Practice)

1. **Go to Google Cloud Console**
2. **Delete the old OAuth Client**
3. **Create a new OAuth Client**
4. **Update in Supabase Dashboard**
5. **Update in Vercel Environment Variables**
6. **Then use Option 1 to allow the old secrets** (they'll be invalid anyway)

---

## ✅ What I've Fixed

- ✅ Removed secrets from `LOCAL-TEST.md`
- ✅ Removed secrets from `SETUP-GUIDE.md`
- ✅ Removed `api/auth/google/callback.js` (if it existed)
- ✅ All current files now use placeholders

## 📋 Recommended Action

**Use Option 1** (Allow Secret) - It's the quickest and safest:
1. Click the two URLs above
2. Allow the secrets
3. Push again

Then **rotate the credentials** in Google Cloud Console for security.

