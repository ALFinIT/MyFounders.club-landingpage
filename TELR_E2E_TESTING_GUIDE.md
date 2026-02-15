# Telr Payment Flow - End-to-End Testing Guide

## Overview

This guide provides comprehensive instructions for testing the complete Telr payment integration, from payment creation through admin panel visibility.

## Prerequisites

1. **Environment Variables Setup**
   ```bash
   # .env.local
   TELR_STORE_ID=your_store_id
   TELR_AUTHKEY=your_auth_key
   TELR_API_KEY=your_api_key
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_anon_key
   
   # SMTP (for confirmation emails)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   SMTP_FROM=noreply@myfounders.club
   
   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

2. **Development Server Running**
   ```bash
   pnpm dev
   ```

3. **Supabase Database Connection**
   - Ensure you have the `subscriptions` table created
   - Ensure you have the `payment_transactions` table created

---

## Testing Scenarios

### Scenario 1: Successful Payment Flow (Sandbox)

#### Step 1: Create a Payment Transaction
```bash
curl -X POST http://localhost:3000/api/payments/telr \
  -H "Content-Type: application/json" \
  -d '{
    "tier": "founder-pass",
    "billingCycle": "monthly",
    "email": "test@example.com",
    "fullName": "Test User",
    "userId": "user-123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "reference": "MFC-founder-pass-1739629920000-abc123def",
  "subscriptionId": "sub_12345...",
  "paymentData": {
    "store": "your_store_id",
    "amount": 2500,
    "currency": "AED",
    ...
  },
  "telrPaymentUrl": "https://telr.com/gateway/process.php"
}
```

**What Happens:**
- ✓ A subscription record is created in Supabase with `payment_status = 'pending'`
- ✓ A unique payment reference is generated
- ✓ Telr signature is calculated for authentication

---

#### Step 2: Simulate Payment Success (Webhook Callback)
```bash
curl -X POST http://localhost:3000/api/payments/telr/callback \
  -H "Content-Type: application/json" \
  -d '{
    "refno": "MFC-founder-pass-1739629920000-abc123def",
    "amount": 2500,
    "currency": "AED",
    "status": "1",
    "tranref": "TELR-1739629920000"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Payment completed",
  "subscriptionId": "sub_12345..."
}
```

**What Happens:**
- ✓ Subscription status updated to `payment_status = 'completed'`
- ✓ Confirmation email sent to subscriber
- ✓ Payment transaction recorded in `payment_transactions` table
- ✓ Admin user receives notification

---

#### Step 3: Verify Database Records
```bash
# Check Supabase directly via console
curl -X GET "your_supabase_url/rest/v1/subscriptions?payment_id=eq.MFC-founder-pass-..." \
  -H "Authorization: Bearer your_anon_key"
```

**Verify these fields are populated:**
- `payment_status`: "completed"
- `subscription_status`: "active"
- `email`: test@example.com
- `amount_aed`: 25
- `created_at`: timestamp
- `updated_at`: recent timestamp
- `confirmation_email_sent`: true

---

#### Step 4: Check Admin Panel
1. Navigate to: `http://localhost:3000/admin`
2. Login with:
   - Username: `admin`
   - Password: `adminmfc26`
3. Scroll to "Payments" section
4. Verify the new payment appears in the table with:
   - ✓ Customer name
   - ✓ Email address
   - ✓ Amount (AED 25.00)
   - ✓ Payment method (Telr)
   - ✓ Status: COMPLETED (green badge)
   - ✓ Transaction ID
   - ✓ Payment date

---

### Scenario 2: Failed Payment Flow

#### Simulate Payment Failure
```bash
curl -X POST http://localhost:3000/api/payments/telr/callback \
  -H "Content-Type: application/json" \
  -d '{
    "refno": "MFC-founder-pass-1739629920000-abc123def",
    "amount": 2500,
    "currency": "AED",
    "status": "0",
    "tranref": "TELR-1739629920000"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Payment failed",
  "subscriptionId": "sub_12345..."
}
```

**Verification:**
- ✓ Subscription status: `payment_status = 'failed'`
- ✓ Payment appears in admin with status: FAILED (red badge)
- ✓ No confirmation email sent
- ✓ Subscription remains inactive

---

### Scenario 3: Admin Panel Payment Filtering

1. Go to `/admin`
2. In Payments section, use the status dropdown:
   - **All**: Shows all payment transactions
   - **Completed**: Shows only successful payments
   - **Pending**: Shows awaiting payment
   - **Failed**: Shows declined payments
   - **Refunded**: Shows refunded transactions

**Stats Dashboard Should Show:**
- Total Payments: Total count
- Completed: Count of successful payments
- Pending: Count of awaiting payments
- Revenue (AED): Sum of all completed payment amounts

---

### Scenario 4: CSV Export

1. Go to `/admin` → Payments section
2. Click "Download CSV" button
3. Verify CSV contains columns:
   - Name
   - Email
   - Plan
   - Amount (AED)
   - Payment Method
   - Status
   - Transaction ID
   - Date

---

## Automated Testing

### Using Test Utilities

Create a test script at `tests/telr-payment-flow.test.ts`:

```typescript
import { runFullEndToEndTest } from '@/lib/telr-e2e-test'

async function runTests() {
  console.log('Starting Telr Payment Flow Tests...\n')
  
  const success = await runFullEndToEndTest()
  
  if (success) {
    console.log('\n✓ All tests passed!')
    process.exit(0)
  } else {
    console.log('\n✗ Tests failed!')
    process.exit(1)
  }
}

runTests()
```

Run with:
```bash
pnpm node -r esbuild-register tests/telr-payment-flow.test.ts
```

### Expected Test Output
```
=== TELR PAYMENT FLOW - END-TO-END TEST ===

ℹ Test User Email: test-1739629920000@example.com
ℹ Test Plan: founder-pass (monthly)

=== Testing Payment Creation ===
✓ Payment creation successful
Payment Data:
{
  "reference": "MFC-founder-pass-1739629920000-xyz",
  "subscriptionId": "...",
  "amount": 2500,
  "currency": "AED"
}

=== Testing Telr Callback (Webhook) ===
ℹ Simulating payment success
✓ Callback processed successfully: Payment completed

=== Verifying Database Records ===
✓ Subscription record found in database
Subscription Data:
{
  "email": "test-1739629920000@example.com",
  "tier": "founder-pass",
  "amount_aed": 25,
  "payment_status": "completed",
  "subscription_status": "active"
}

=== Verifying Admin Panel Visibility ===
✓ Payment record is visible in admin panel
ℹ Payment Status: completed
ℹ Customer: test-1739629920000@example.com
ℹ Plan: founder-pass

=== ✓ ALL TESTS PASSED ===
✓ Complete Telr payment flow is working correctly!
ℹ Test payment reference: MFC-founder-pass-1739629920000-xyz
ℹ Next: Check admin panel at /admin to see the payment transaction
```

---

## Troubleshooting

### Problem: "Missing Supabase config"
**Solution:**
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` are set
- Check `.env.local` file

### Problem: "Subscription not found" in callback
**Solution:**
- Ensure the `refno` in callback matches the `payment_id` from creation
- Check that subscription was actually created in Supabase
- Verify table name is `subscriptions`

### Problem: Payment doesn't appear in admin panel
**Solution:**
- Verify admin is logged in (username: admin, password: adminmfc26)
- Check that subscription has `payment_status` and `email` populated
- Clear browser cache and refresh
- Check browser console for errors

### Problem: Confirmation email not sending
**Solution:**
- Verify SMTP credentials in `.env.local`
- Check Gmail App Password is used (not account password)
- Enable "Less secure app access" if needed
- Check app logs for email errors

### Problem: Telr signature mismatch
**Solution:**
- Verify `TELR_STORE_ID` and `TELR_AUTHKEY` are correct
- Signature is calculated as: `SHA256(store_id + amount + currency + auth_key)`
- Ensure no extra spaces or formatting

---

## Manual Testing with Telr Sandbox

### Get Sandbox Credentials

1. Visit: https://telr.com/merchants
2. Sign up for a test account
3. Go to Merchant Dashboard
4. Find API credentials:
   - Store ID
   - Authentication Key
   - API Key

### Test Card Numbers (Sandbox)

- **Mastercard**: 5123456789012346
- **Visa**: 4111111111111111
- **Expiry**: Any future date (e.g., 12/25)
- **CVV**: Any 3 digits (e.g., 123)

### Testing Flow in Sandbox

1. Start payment from pricing page
2. Enter test card details when prompted
3. Payment should be processed
4. Callback simulates success
5. Check admin panel for transaction

---

## Integration with Stripe (Optional)

Stripe API routes are at `/api/payments/stripe`:

```typescript
POST /api/payments/stripe/create-payment-intent
POST /api/payments/stripe/confirm-payment
```

Test Stripe with:
```bash
curl -X POST http://localhost:3000/api/payments/stripe/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{
    "tier": "founder-pass",
    "billingCycle": "monthly",
    "email": "test@example.com"
  }'
```

---

## Monitoring Production

### Webhook Health Check

Telr webhooks to: `https://yourdomain.com/api/payments/telr/callback`

Ensure:
- ✓ HTTPS enabled
- ✓ Endpoint is publicly accessible
- ✓ No authentication required (or IP whitelist Telr)
- ✓ Logs in database/monitoring service

### Admin Dashboard Checks (Daily)

- [ ] All payments visible in admin
- [ ] Stats calculations correct
- [ ] CSV export working
- [ ] Status filtering working
- [ ] Email confirmations sent

### Auditing

Query payment history:
```sql
SELECT 
  id, email, tier, amount_aed, payment_status, 
  created_at, updated_at 
FROM subscriptions 
ORDER BY created_at DESC 
LIMIT 50;
```

---

## Checklist Before Production

- [ ] Telr live API credentials configured
- [ ] Email sending verified (test email)
- [ ] Database backups configured
- [ ] Admin authentication working
- [ ] Payment success/failure pages styled
- [ ] SMS notifications (optional) configured
- [ ] Tax calculations verified (if applicable)
- [ ] Currency conversion rates correct
- [ ] Return URLs correct (success/failure pages)
- [ ] Terms & Conditions updated for payments
- [ ] Webhook IP whitelist (if applicable)
- [ ] Logging/audit trail working
- [ ] Error handling for failed payments
- [ ] Customer support contact email configured

---

## Support

For Telr issues:
- Documentation: https://telr.com/docs
- Support: support@telr.com

For system issues:
- Check `/admin` for payment logs
- Review server logs for API errors
- Verify Supabase connection
- Test with curl commands above
