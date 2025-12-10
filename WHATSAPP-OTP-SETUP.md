# WhatsApp OTP Setup Guide

## Free Options for WhatsApp OTP

### Option 1: Green API (Recommended - Free WhatsApp)
- **Website**: https://green-api.com/
- **Free Tier**: 100 messages/day
- **Setup**:
  1. Sign up at https://green-api.com/
  2. Get `idInstance` and `apiTokenInstance`
  3. Add to `.env`:
     ```
     GREEN_API_ID_INSTANCE=your_id
     GREEN_API_TOKEN=your_token
     ```

### Option 2: TextLocal (Free SMS - India)
- **Website**: https://www.textlocal.in/
- **Free Tier**: 100 SMS/day
- **Setup**:
  1. Sign up at https://www.textlocal.in/
  2. Get API Key
  3. Add to `.env`:
     ```
     TEXTLOCAL_API_KEY=your_api_key
     TEXTLOCAL_SENDER=GrowMaxx
     ```

### Option 3: WhatsApp Cloud API (Meta - Free)
- Requires Meta Business Account
- More complex setup
- Best for production

## Current Implementation

The code uses **Green API** by default. To switch to TextLocal, update `api/send-otp.js`.

## Environment Variables

Add to `.env`:
```
# Green API (WhatsApp)
GREEN_API_ID_INSTANCE=your_id
GREEN_API_TOKEN=your_token

# OR TextLocal (SMS)
TEXTLOCAL_API_KEY=your_api_key
TEXTLOCAL_SENDER=GrowMaxx

# Supabase (for OTP storage)
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
```

