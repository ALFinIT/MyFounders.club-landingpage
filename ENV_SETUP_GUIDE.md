# Environment Setup Guide - Payment Gateways

## Overview
This guide covers configuring all environment variables for Telr (UAE AED payments), Stripe, and SMTP (email confirmations).

## Quick Setup

### 1. Copy Template
```bash
cp .env.local.example .env.local
```

### 2. Fill in Credentials
Edit `.env.local` with your actual keys (see sections below).

### 3. Test Configuration
```bash
pnpm dev
# Then navigate to /admin and check the admin panel loads
```

---

## Telr Configuration (UAE Payments - AED)

### Get Your Telr Credentials

1. **Sign Up**
   - Visit: https://telr.com
   - Create a merchant account

2. **Access Dashboard**
   - Log in to Telr Merchant Portal: https://merchant.telr.com
   - Navigate to Settings → API & Integration

3. **Copy Credentials**
   - Store ID (4-5 digit number)
   - Authentication Key
   - API Key (optional)

### Environment Variables

```bash
# TELR - UAE Payment Gateway
TELR_STORE_ID=your_4_or_5_digit_store_id
TELR_AUTHKEY=your_authentication_key_from_telr
TELR_API_KEY=your_api_key_from_telr
TELR_SANDBOX_MODE=true  # Set to false for production
```

### Testing with Telr Sandbox

Telr provides a free sandbox environment for testing:

```bash
# Sandbox credentials (for testing)
TELR_STORE_ID=1234    # Use a test Store ID
TELR_AUTHKEY=test123  # Use a test Auth Key
TELR_SANDBOX_MODE=true
```

**Sandbox Test Cards:**
- Visa: `4111111111111111`
- Mastercard: `5123456789012346`
- Expiry: Any future date (e.g., `12/25`)
- CVV: Any 3 digits (e.g., `123`)

### How Telr Integration Works

```
User → Payment Form → /api/payments/telr (POST) → Telr Gateway
                                                      ↓
                                              User completes payment
                                                      ↓
Supabase Updated ← /api/payments/telr/callback ← Telr Webhook
        ↓
  Email Sent
```

**Payment Creation Flow:**
1. User clicks "Get Access" on Founder Pass
2. Payment modal opens with AED 25 price
3. User enters name and email
4. Form submits to `/api/payments/telr` (POST)
5. API creates subscription record in Supabase (pending status)
6. Telr payment signature calculated and sent
7. User redirected to Telr payment gateway

**Payment Callback Flow:**
1. User completes payment on Telr
2. Telr sends webhook to `/api/payments/telr/callback`
3. Subscription status updated to "completed"
4. Confirmation email sent to user
5. Payment appears in admin panel

---

## Stripe Configuration (Optional - Multiple Currencies)

### Get Your Stripe Credentials

1. **Sign Up**
   - Visit: https://stripe.com
   - Create a business account

2. **Access Dashboard**
   - Log in to: https://dashboard.stripe.com
   - Navigate to Developers → API keys

3. **Copy Keys**
   - Publishable Key (safe to share)
   - Secret Key (KEEP PRIVATE)

### Environment Variables

```bash
# STRIPE - Card Payments (USD, AED, etc.)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
```

### Testing with Stripe

Stripe test cards:
- Visa: `4242 4242 4242 4242`
- Mastercard: `5555 5555 5555 4444`
- Expiry: Any future date (e.g., `12/25`)
- CVC: Any 3 digits (e.g., `123`)

---

## Email Configuration (SMTP)

### Using Gmail

1. **Enable 2-Factor Authentication**
   - Google Account → Security
   - Enable 2-Step Verification

2. **Create App Password**
   - Google Account → Security
   - App passwords
   - Select "Mail" and "Windows Computer"
   - Generate password

3. **Configure SMTP**

```bash
# SMTP - Email Confirmations
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password  # NOT your Google password!
SMTP_FROM=noreply@myfounders.club
```

### Using SendGrid

1. **Sign Up**
   - Visit: https://sendgrid.com
   - Create account (free tier available)

2. **Get API Key**
   - Settings → API Keys
   - Create new API key

3. **Configure SMTP**

```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=SG.your_api_key_here
SMTP_FROM=noreply@myfounders.club
```

### Using AWS SES

1. **Verify Email**
   - AWS SES Console
   - Verify sender email

2. **Create SMTP Credentials**
   - SMTP Settings
   - Create credential

3. **Configure SMTP**

```bash
SMTP_HOST=email-smtp.region.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_username
SMTP_PASSWORD=your_smtp_password
SMTP_FROM=verified-email@yourdomain.com
```

---

## Database Configuration

### Supabase Setup

1. **Create Project**
   - Visit: https://supabase.com
   - Create new project

2. **Get Credentials**
   - Project Settings → API
   - Project URL
   - Anon Public Key
   - Service Role Key (for backend only)

3. **Configure Environment**

```bash
# SUPABASE - Database
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=eyJ0...
SUPABASE_SERVICE_ROLE_KEY=eyJ0...  # For backend operations only
```

4. **Create Tables**
   - Run migrations: See `supabase/migrations/`
   - Creates `subscriptions` and `payment_transactions` tables

---

## Application Configuration

### General Settings

```bash
# APPLICATION
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Or your production URL
NODE_ENV=development  # development or production
```

### Debug (Optional)

```bash
# DEBUG - Only for development
DEBUG=telr:*  # Enable Telr payment debug logs
LOG_LEVEL=debug  # debug, info, warn, error
```

---

## Complete .env.local Example

```bash
## APPLICATION
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

## TELR - UAE Payments
TELR_STORE_ID=1234
TELR_AUTHKEY=your_auth_key_here
TELR_API_KEY=your_api_key_here
TELR_SANDBOX_MODE=true

## STRIPE - Optional
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

## SMTP - Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@myfounders.club

## SUPABASE - Database
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=eyJ0xxx
SUPABASE_SERVICE_ROLE_KEY=eyJ0xxx
```

---

## Verification Checklist

After configuring environment variables:

- [ ] Development server starts: `pnpm dev`
- [ ] No "undefined" errors in browser console
- [ ] Pricing page loads: http://localhost:3000
- [ ] "Get Access" button appears on Founder Pass plan
- [ ] Clicking button opens payment modal
- [ ] Filling form works (no validation errors)
- [ ] Admin panel loads: http://localhost:3000/admin
- [ ] Can log in with `admin` / `adminmfc26`

---

## Troubleshooting

### "Missing environment variable: TELR_STORE_ID"
**Solution:**
- Check `.env.local` file exists
- Verify variable name has correct spelling
- Restart development server: `pnpm dev`
- Check terminal for error message

### Email not sending after payment
**Solution:**
- Verify SMTP credentials are correct
- Check Gmail App Password (not account password)
- Google Account → Security → App passwords → Verify
- Check spam folder
- Look at server logs for SMTP errors

### "Failed to connect to Supabase"
**Solution:**
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Verify `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` is correct
- Check database tables exist: `subscriptions`, `payment_transactions`
- Test with Supabase Studio directly

### Telr payment signature mismatch
**Solution:**
- Verify `TELR_STORE_ID` is correct
- Verify `TELR_AUTHKEY` is correct
- Signature calculation: `SHA256(store_id + amount + currency + auth_key)`
- Check no extra spaces or formatting

---

## Security Best Practices

1. **Never commit .env.local**
   - Add to .gitignore (already done)
   - Only share with team securely

2. **Production Variables**
   - Use environment management service (Vercel, Netlify, etc.)
   - Never paste keys in code
   - Use Secret Manager for sensitive keys

3. **SMTP Security**
   - Use App Password (not account password)
   - Enable 2-Factor Authentication
   - Use tLS/SSL (secure: true for port 465)

4. **API Keys**
   - Rotate keys regularly
   - Use separate keys for test/production
   - Monitor key usage in provider dashboard

5. **Webhook Security**
   - Verify Telr signature on callbacks (optional but recommended)
   - IP whitelist Telr servers (if provider supports it)
   - Log all webhook requests

---

## Production Deployment

Before deploying to production:

1. **Switch Sandbox Mode**
   ```bash
   TELR_SANDBOX_MODE=false  # IMPORTANT!
   ```

2. **Update URLs**
   ```bash
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

3. **Use Production Keys**
   - Get live Telr credentials
   - Get live Stripe credentials (if using)
   - Use Gmail account from business domain

4. **Test End-to-End**
   - Process real test payment
   - Verify confirmation email
   - Check admin panel
   - Check Supabase records

5. **Monitor**
   - Error logs for payment failures
   - Email delivery reports
   - Webhook success rates
   - Admin dashboard stats

---

## Support Resources

- **Telr Docs**: https://telr.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Gmail SMTP**: https://support.google.com/mail/answer/7126229
- **SendGrid SMTP**: https://sendgrid.com/docs/for-developers/sending-email/smtp/

---

## Questions?

For help setting up:
1. Check the TELR_E2E_TESTING_GUIDE.md for testing instructions
2. Review the payment API routes in `/app/api/payments/`
3. Check server logs: `pnpm dev` and watch terminal
4. Check browser console: F12 → Console tab
