-- ============================================
-- CREATE OTP VERIFICATIONS TABLE
-- ============================================

-- Create table to store OTPs with expiry
CREATE TABLE IF NOT EXISTS public.otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  otp TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_otp_phone ON public.otp_verifications(phone);
CREATE INDEX IF NOT EXISTS idx_otp_expires ON public.otp_verifications(expires_at);

-- Enable RLS
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert OTP (for verification)
CREATE POLICY "Allow OTP creation" ON public.otp_verifications
  FOR INSERT
  WITH CHECK (true);

-- Policy: Anyone can read OTP (for verification)
CREATE POLICY "Allow OTP read" ON public.otp_verifications
  FOR SELECT
  USING (expires_at > NOW() AND verified = false);

-- Policy: Anyone can update OTP (to mark as verified)
CREATE POLICY "Allow OTP update" ON public.otp_verifications
  FOR UPDATE
  USING (true);

-- Function to clean up expired OTPs (optional)
CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS void AS $$
BEGIN
  DELETE FROM public.otp_verifications
  WHERE expires_at < NOW() - INTERVAL '1 day';
END;
$$ LANGUAGE plpgsql;

-- Done! Now OTPs can be stored securely.






