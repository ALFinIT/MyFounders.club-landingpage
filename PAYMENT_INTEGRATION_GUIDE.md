# Payment Gateway Integration Guide - MyFoundersClub

Complete setup guide for Stripe and UAE payment gateways with subscriptions.

## 📋 Table of Contents

1. [Database Setup](#database-setup)
2. [Environment Variables](#environment-variables)
3. [Stripe Integration](#stripe-integration)
4. [UAE Payment Gateways](#uae-payment-gateways)
5. [Payment Components](#payment-components)
6. [Testing & Debugging](#testing--debugging)
7. [Deployment Checklist](#deployment-checklist)

---

## Database Setup

### Step 1: Create Subscriptions Tables in Supabase

1. Go to https://app.supabase.com
2. Select your project: `ibpqvfqhmecgyevjbtqo`
3. Click **SQL Editor** → **New Query**
4. Copy entire content from: `supabase/migrations/CREATE_SUBSCRIPTIONS_TABLE.sql`
5. Click **Run**
6. Verify these tables were created:
   - `subscriptions` - Main subscription records
   - `payment_transactions` - Transaction history
   - `pricing_tiers` - Pricing configuration (auto-populated with 3 tiers)

**Expected Tables:**

```sql
-- Created tables:
✅ subscriptions (with pricing: founder-pass, scale-plan, enterprise)
✅ payment_transactions (logs all payment attempts)
✅ pricing_tiers (maintains current pricing)
```

### Step 2: Verify Default Pricing Tiers

In Supabase Table Editor → `pricing_tiers`, you should see:

| Tier Name | Display Name | Monthly AED | Annual AED | Monthly USD | Annual USD |
|-----------|-------------|------------|-----------|------------|-----------|
| founder-pass | Founder Pass | 2,500 | 25,000 | 680 | 6,800 |
| scale-plan | Scale Plan | 5,000 | 50,000 | 1,360 | 13,600 |
| enterprise | Enterprise | 15,000 | 150,000 | 4,080 | 40,800 |

To modify pricing later:

```sql
UPDATE pricing_tiers 
SET price_monthly_aed = 3000 
WHERE tier_name = 'founder-pass';
```

---

## Environment Variables

### Create `.env.local` file

Add these configuration variables:

```bash
# ============================================================================
# STRIPE CONFIGURATION (International Payments)
# ============================================================================

# Get from: https://dashboard.stripe.com/apikeys
STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxx          # Public key (safe in frontend)
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxx          # Secret key (NEVER share!)
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxx        # For webhook verification

# ============================================================================
# TELR CONFIGURATION (UAE Payments - AED)
# ============================================================================

# Get from: https://telr.com/merchants
TELR_API_KEY=xxxxxxxxxxxxxxxx
TELR_STORE_ID=xxxx
TELR_AUTHKEY=xxxxxxxxxxxxxxxx

# ============================================================================
# PAYFORT CONFIGURATION (UAE Alternative)
# ============================================================================
# Optional - for AWS PayFort integration

PAYFORT_MERCHANT_IDENTIFIER=xxxxxxxx
PAYFORT_AUTHORIZATION_KEY=xxxxxxxxxxxxxxxx
PAYFORT_SANDBOX_MODE=true

# ============================================================================
# 2CHECKOUT CONFIGURATION (International Alternative)
# ============================================================================
# Optional - for 2Checkout/Verifone integration

TWOCHECKOUT_PUBLISHABLE_KEY=xxxxxxxxxxxxxxxx
TWOCHECKOUT_SECRET_KEY=xxxxxxxxxxxxxxxx

# ============================================================================
# EMAIL CONFIGURATION (For Confirmation Emails)
# ============================================================================

SMTP_HOST=smtp.gmail.com                              # Your SMTP server
SMTP_PORT=587                                         # Usually 587 or 465
SMTP_SECURE=false                                     # true for port 465, false for 587
SMTP_USER=your-email@gmail.com                        # SMTP username
SMTP_PASSWORD=your-app-password                       # Use app password, not regular password
SMTP_FROM=noreply@myfounders.club                     # Sender email address

# ============================================================================
# APP CONFIGURATION
# ============================================================================

NEXT_PUBLIC_APP_URL=http://localhost:3000             # Change to production URL
NEXT_PUBLIC_PAYMENT_CURRENCY=AED                      # Default currency (AED or USD)

# ============================================================================
# DATABASE
# ============================================================================

NEXT_PUBLIC_SUPABASE_URL=https://ibpqvfqhmecgyevjbtqo.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_m8LmfPh0IJ0g2byAa1pfSQ_WC96lNZc
```

### Get API Keys

#### Stripe

1. Go to https://dashboard.stripe.com
2. **Sign up** if you don't have an account
3. Go to **Developers** → **API Keys**
4. Copy `Publishable key` and `Secret key`
5. Enable test mode to use test cards

Test Cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Any future expiry date, any 3-digit CVC

#### Telr (UAE)

1. Visit https://telr.com
2. Create merchant account
3. Go to **Dashboard** → **Settings** → **API Keys**
4. Copy `Store ID` and `Auth Key`
5. Enable sandbox/test mode

#### Email (Gmail SMTP)

1. Go to https://myaccount.google.com
2. **Security** → **App passwords** (requires 2FA)
3. Generate app password for your email client
4. Use `yourmail@gmail.com` as SMTP_USER
5. Use generated password as SMTP_PASSWORD

---

## Stripe Integration

### Features

✅ International payments (USD, EUR, GBP, etc.)
✅ Credit/Debit card support
✅ Apple Pay, Google Pay
✅ 3D Secure authentication
✅ Recurring subscriptions
✅ Webhook support for real-time updates

### API Endpoint: Create Payment Intent

**URL**: `POST /api/payments/stripe/create-payment-intent`

**Request Body**:
```json
{
  "tier": "founder-pass",
  "billingCycle": "monthly",
  "email": "user@example.com",
  "fullName": "John Doe",
  "userId": "optional-user-id"
}
```

**Response**:
```json
{
  "clientSecret": "pi_xxxxx_secret_xxxxx",
  "paymentIntentId": "pi_xxxxx",
  "subscriptionId": "uuid"
}
```

### API Endpoint: Confirm Payment

**URL**: `POST /api/payments/stripe/confirm-payment`

**Request Body**:
```json
{
  "paymentIntentId": "pi_xxxxx",
  "subscriptionId": "uuid"
}
```

### Usage in Components

```typescript
import { loadStripe } from '@stripe/js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  
  const handlePayment = async () => {
    // Call create-payment-intent endpoint
    const response = await fetch('/api/payments/stripe/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({
        tier: 'founder-pass',
        billingCycle: 'monthly',
        email: 'user@example.com',
        fullName: 'John Doe'
      })
    });
    
    const { clientSecret } = await response.json();
    
    // Confirm payment with Stripe
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
  };
}
```

---

## UAE Payment Gateways

### Telr Integration

**Best for**: Local UAE business, easy AED transactions

#### Features
✅ AED currency support
✅ Multiple payment methods (Cards, bank transfers)
✅ Fast local processing
✅ Easy merchant setup
✅ Affordable rates

#### API Endpoints

**Create Transaction**:
```
POST /api/payments/telr/create-transaction
```

**Request**:
```json
{
  "tier": "founder-pass",
  "billingCycle": "monthly",
  "email": "user@example.com",
  "fullName": "John Doe"
}
```

**Response**:
```json
{
  "paymentData": { ... },
  "telrPaymentUrl": "https://telr.com/gateway/process.php",
  "subscriptionId": "uuid",
  "reference": "MFC-founder-pass-xxxxx"
}
```

**Webhook Callback**:
```
PUT /api/payments/telr/callback
```

Telr will POST to this endpoint when payment completes:
```json
{
  "reference": "MFC-founder-pass-xxxxx",
  "status": "0",
  "transactionId": "12345",
  "amount": "250000"
}
```

### PayFort Integration (Optional)

**Best for**: AWS ecosystem, enterprise features

- Similar to Telr but more enterprise-grade
- Higher transaction fees
- Advanced fraud detection
- Multi-currency support

*Setup guide available upon request*

### 2Checkout Integration (Optional)

**Best for**: Global coverage with local payment methods

- Support for 190+ countries
- Local payment methods per region
- PayPal integration
- Recurring billing

*Setup guide available upon request*

---

## Payment Components

### Pricing Tiers Display Component

**Location**: `components/pricing-payment-form.tsx`

Shows the three subscription tiers with:
- Monthly/Annual toggle
- Pricing in AED/USD
- Select button for each tier
- Feature list

### Payment Modal Component

**Location**: `components/payment-modal.tsx`

Displays payment form with:
- Tier/billing selection
- Email and name input
- Gateway selection (Stripe/Telr)
- Payment processing
- Loading and error states

### Success Page

**Location**: `app/payment-success/page.tsx`

Shows after successful payment:
- Confirmation message
- Subscription details
- Download invoice link
- Dashboard access button

### Failure Page

**Location**: `app/payment-failed/page.tsx`

Shows after failed payment:
- Error message
- Retry button
- Support contact info

---

## Testing & Debugging

### Test Payment Flows

#### Stripe Test Mode

1. Set `STRIPE_SECRET_KEY` to a test key (starts with `sk_test_`)
2. Use test card numbers:
   - `4242 4242 4242 4242` - success
   - `4000 0000 0000 0002` - decline
   - `4000 0025 0000 3155` - requires authentication

#### Telr Sandbox

1. Set `TELR_SANDBOX_MODE=true` in `.env.local`
2. Use test credentials from https://telr.com/sandbox
3. No real money charged

### Debug Subscription Creation

```typescript
// In browser console:
const response = await fetch('/api/payments/stripe/create-payment-intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    tier: 'founder-pass',
    billingCycle: 'monthly',
    email: 'test@example.com',
    fullName: 'Test User'
  })
});

const data = await response.json();
console.log('Payment Intent:', data);
```

### Check Supabase Records

1. Go to https://app.supabase.com
2. Select your project
3. Go to **Table Editor** → `subscriptions`
4. You should see new records after each test payment

### Monitor Transactions

In `payment_transactions` table:
- Each attempt creates a record
- Status: `pending`, `completed`, or `failed`
- `gateway_response` contains full API response

### Common Issues

**Issue**: "Pricing tier not found"
- Solution: Run the SQL migration to create `pricing_tiers` table

**Issue**: "Missing Stripe key"
- Solution: Add `STRIPE_SECRET_KEY` to `.env.local`

**Issue**: "Email not sending"
- Solution: Check SMTP credentials, enable Less Secure Apps if using Gmail

**Issue**: "Payment fails with 'currency not supported'"
- Solution: Stripe test mode requires 3-letter currency codes (USD, EUR, AED not supported in test)

---

## Deployment Checklist

### Before Going Live

- [ ] Update `.env.local` → `.env.production` with live API keys
- [ ] Disable Stripe test mode
- [ ] Disable Telr sandbox mode
- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Test payment flow end-to-end with real cards (small amount)
- [ ] Verify confirmation emails are sending
- [ ] Review Supabase backup strategy
- [ ] Set up Stripe webhook handler for live events
- [ ] Document refund process
- [ ] Set up monitoring/alerts for failed payments

### AWS Deployment (Recommended for UAE)

If using AWS (EC2, App Runner, Lambda):

1. Store secrets in **AWS Secrets Manager**
2. Reference in code: `process.env.STRIPE_SECRET_KEY`
3. IAM role grants database access
4. Use **SES** for emails instead of SMTP

```typescript
// AWS example
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const secret = await secretsClient.send(new GetSecretValueCommand({
  SecretId: 'stripe-secret-key'
}));
```

### Monitoring & Analytics

Track in Supabase:

```sql
-- Revenue report
SELECT 
  tier,
  billing_cycle,
  COUNT(*) as subscriptions,
  SUM(amount_aed) as total_aed
FROM subscriptions
WHERE payment_status = 'completed'
GROUP BY tier, billing_cycle;

-- Failed payments
SELECT *
FROM payment_transactions
WHERE status = 'failed'
ORDER BY attempted_at DESC;
```

---

## Support

For issues or questions:
- Stripe Support: https://support.stripe.com
- Telr Support: https://telr.com/support
- Email: support@myfounders.club

---

**Last Updated**: February 14, 2026
