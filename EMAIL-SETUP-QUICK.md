# 📧 Quick Email Setup (5 minutes)

## Step 1: Get Resend API Key

1. Go to [resend.com](https://resend.com) and sign up (free)
2. Go to **API Keys** → **Create API Key**
3. Name: `GrowMaxx Production`
4. Copy the key (starts with `re_`)

## Step 2: Add to Environment

### Local Development

Create/update `.env` file in project root:

```env
RESEND_API_KEY=re_your_api_key_here
```

### Railway (Production)

1. Go to Railway dashboard → Your project
2. **Variables** tab → **New Variable**
3. Key: `RESEND_API_KEY`
4. Value: `re_your_api_key_here`
5. Click **Save**

## Step 3: Test Email

1. Restart server: `npm run dev:all`
2. Complete a test payment
3. Check:
   - Server logs for "✅ Email sent successfully"
   - Your inbox (founder@growmaxx.in)
   - User's inbox (welcome email)

## 📧 What Emails Are Sent?

### 1. Founder Notification (on every payment)
- **To**: `founder@growmaxx.in`
- **From**: `operations@growmaxx.in`
- **When**: Payment received
- **Content**: Customer details, plan, amount, payment ID

### 2. Welcome Email (on first payment)
- **To**: User's email
- **From**: `operations@growmaxx.in`
- **When**: First payment received
- **Content**: Welcome message, plan activation

## ⚠️ Important Notes

1. **Domain Verification**: For production, verify `growmaxx.in` domain in Resend
2. **Test Domain**: Can use `onboarding@resend.dev` for testing
3. **Free Tier**: 3,000 emails/month (enough for ~100-200 customers)

## 🔍 Troubleshooting

### Emails not sending?

1. Check `RESEND_API_KEY` is set correctly
2. Check server logs for email errors
3. Check Resend dashboard → Logs for email status

### "Resend not configured" in logs?

- API key missing or incorrect
- Restart server after adding API key

---

**That's it!** Once you add the API key, emails will send automatically on payments.

