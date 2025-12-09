# 🚀 GrowMaxx - Complete Deployment Ready

Professional landing page and SaaS platform for local businesses in Tamil Nadu.

## ✨ Features

- ✅ Real authentication (Email + Google OAuth) with Supabase
- ✅ Payment integration with Razorpay
- ✅ User dashboard with billing management
- ✅ Plan selection and subscription management
- ✅ Professional dark theme UI with animations
- ✅ Responsive design (mobile-first)

## 🏃 Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- Supabase account
- Razorpay account

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create `.env.local`:
   ```env
   VITE_SUPABASE_URL=https://qrwsqjztooxeziqfrmjx.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   VITE_RAZORPAY_KEY_ID=rzp_live_RpPJAYduTK0PS7
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_APP_URL=http://localhost:5174
   ```

3. **Run database schema:**
   - Go to Supabase SQL Editor
   - Run `supabase-schema.sql`

4. **Start development:**
   ```bash
   # Option 1: Run everything together
   npm run dev:all
   
   # Option 2: Run separately
   npm run server  # Terminal 1
   npm run dev      # Terminal 2
   ```

5. **Open browser:**
   - Frontend: http://localhost:5174
   - API: http://localhost:3000/api/health

## 🚀 Deployment

See **[DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)** for complete deployment instructions.

### Quick Deploy to Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## 📁 Project Structure

```
nova-local/
├── api/                    # Vercel serverless functions
│   ├── create-payment.js   # Razorpay order creation
│   └── verify-payment.js  # Payment verification
├── src/
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── context/           # React context (Auth)
│   └── lib/               # Utilities (Supabase client)
├── supabase-schema.sql    # Database schema
├── vercel.json            # Vercel configuration
└── package.json
```

## 🔑 Environment Variables

### Frontend (VITE_*)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_RAZORPAY_KEY_ID`
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_APP_URL`

### Backend (Server-only)
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `GOOGLE_CLIENT_SECRET`

## 📚 Documentation

- **[DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)** - Complete deployment guide
- **[SETUP-GUIDE.md](./SETUP-GUIDE.md)** - Initial setup instructions
- **[QUICK-START.md](./QUICK-START.md)** - Quick troubleshooting

## 🛠️ Tech Stack

- **Frontend:** React 19 + Vite + Tailwind CSS + Framer Motion
- **Backend:** Vercel Serverless Functions
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth + Google OAuth
- **Payments:** Razorpay
- **Deployment:** Vercel

## 📝 License

ISC

---

**Built with ❤️ for local businesses in Tamil Nadu**
