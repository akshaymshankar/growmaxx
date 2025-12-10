# OTP Integration Guide

## Current Status

✅ OTP endpoints created (`/api/send-otp` and `/api/verify-otp`)
✅ Frontend integrated with OTP verification
✅ Development mode: OTP shown in console/alert

## For Production - Integrate Real SMS Service

### Option 1: Twilio (Recommended)
1. Sign up at https://www.twilio.com
2. Get Account SID and Auth Token
3. Get a phone number
4. Update `api/send-otp.js`:

```javascript
const twilio = require('twilio');
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

await client.messages.create({
  body: `Your GrowMaxx verification code is: ${otp}`,
  from: process.env.TWILIO_PHONE_NUMBER,
  to: phone
});

// Store OTP in Redis/database with 10-minute expiry
// Don't return OTP in response
```

### Option 2: AWS SNS
1. Set up AWS SNS
2. Configure SMS settings
3. Use AWS SDK to send SMS

### Option 3: TextLocal (India)
1. Sign up at https://www.textlocal.in
2. Get API key
3. Use their API to send SMS

## OTP Storage

For production, store OTPs in:
- **Redis** (recommended) - fast, auto-expiry
- **Supabase** - create `otp_verifications` table
- **Database** - with expiry timestamp

Example Redis:
```javascript
// Store
await redis.setex(`otp:${phone}`, 600, otp); // 10 minutes

// Verify
const storedOtp = await redis.get(`otp:${phone}`);
if (storedOtp === otp) {
  await redis.del(`otp:${phone}`); // Delete after use
  return true;
}
```

## Security Notes

- ⚠️ **Never return OTP in API response** (current code does for dev)
- ⚠️ **Set OTP expiry** (5-10 minutes)
- ⚠️ **Rate limit OTP requests** (prevent abuse)
- ⚠️ **Delete OTP after verification**
- ⚠️ **Log OTP attempts** (for security)

## Environment Variables

Add to `.env`:
```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

Or for other services:
```
AWS_SNS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
```

