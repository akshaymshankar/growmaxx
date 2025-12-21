# 📧 Resend Email Setup Guide

## ✅ Why Resend?

- **Free Tier**: 3,000 emails/month (perfect for startups!)
- **Easy Integration**: Simple API, great developer experience
- **Reliable**: High deliverability rates
- **Modern**: Built for developers

## 🚀 Step 1: Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for free account
3. Verify your email address

## 🔑 Step 2: Get API Key

1. Go to **API Keys** in Resend dashboard
2. Click **Create API Key**
3. Name it: `GrowMaxx Production`
4. Copy the API key (starts with `re_`)
5. **Important**: Save it immediately - you can't see it again!

## 📧 Step 3: Verify Domain (Optional but Recommended)

For production, verify your domain to send from `operations@growmaxx.in`:

1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter: `growmaxx.in`
4. Add DNS records to your domain:
   - **SPF Record**: `v=spf1 include:resend.com ~all`
   - **DKIM Record**: (provided by Resend)
   - **DMARC Record**: (optional, for better deliverability)
5. Wait for verification (usually 5-10 minutes)

**Note**: For testing, you can use Resend's test domain: `onboarding@resend.dev`

## ⚙️ Step 4: Add API Key to Environment Variables

### Local Development (.env file)

Add to your `.env` file:

```env
RESEND_API_KEY=re_your_api_key_here
```

### Railway Deployment

1. Go to Railway dashboard
2. Select your project
3. Go to **Variables** tab
4. Add new variable:
   - **Key**: `RESEND_API_KEY`
   - **Value**: `re_your_api_key_here`
5. Click **Save**

### Vercel Deployment (if using)

1. Go to Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Key**: `RESEND_API_KEY`
   - **Value**: `re_your_api_key_here`
5. Click **Save**

## ✅ Step 5: Test Email Sending

1. Restart your server: `npm run dev:all`
2. Complete a test payment
3. Check:
   - Server logs for "✅ Email sent successfully"
   - Your inbox (founder@growmaxx.in)
   - User's inbox (welcome email)

## 📋 What Emails Are Sent?

### 1. **Founder Notification** (on every payment)
- **To**: `founder@growmaxx.in`
- **From**: `operations@growmaxx.in`
- **Subject**: `New Payment Received - [Plan Name] Plan`
- **Content**: Customer details, plan, amount, payment ID

### 2. **Welcome Email** (on first payment only)
- **To**: User's email
- **From**: `operations@growmaxx.in`
- **Subject**: `Welcome to GrowMaxx - [Plan Name] Plan`
- **Content**: Welcome message, plan activation confirmation

## 🔍 Troubleshooting

### Emails not sending?

1. **Check API Key**: Make sure `RESEND_API_KEY` is set correctly
2. **Check Logs**: Look for "Resend email error" in server logs
3. **Check Resend Dashboard**: Go to **Logs** to see email status
4. **Domain Verification**: If using custom domain, ensure DNS records are correct

### "Resend not configured" in logs?

- API key is missing or incorrect
- Check environment variable is set
- Restart server after adding API key

### Emails going to spam?

1. **Verify Domain**: Complete domain verification in Resend
2. **Add SPF/DKIM Records**: Required for good deliverability
3. **Warm Up Domain**: Send a few test emails first
4. **Check Content**: Avoid spam trigger words

## 💰 Pricing

- **Free**: 3,000 emails/month
- **Pro**: $20/month for 50,000 emails
- **Enterprise**: Custom pricing

**For GrowMaxx**: Free tier should be enough for first 100-200 customers!

## 📚 Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend Node.js SDK](https://resend.com/docs/send-with-nodejs)
- [Domain Verification Guide](https://resend.com/docs/dashboard/domains/introduction)

## ✅ Checklist

- [ ] Resend account created
- [ ] API key generated
- [ ] API key added to environment variables
- [ ] Domain verified (optional, for production)
- [ ] Test payment completed
- [ ] Emails received successfully

---

**Need Help?** Check Resend dashboard → Logs for detailed email status and errors.

