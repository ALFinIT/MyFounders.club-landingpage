# Payment System Testing Guide

Complete testing procedures for Stripe and Telr payment integration.

## Prerequisites

Before testing, ensure you have:

1. ✅ Database tables created (run migration SQL)
2. ✅ API routes deployed (`/api/payments/stripe/*` and `/api/payments/telr/*`)
3. ✅ Environment variables configured (`.env.local`)
4. ✅ Payment components integrated into your page

---

## Testing Stripe Payments

### Setup

1. Go to https://dashboard.stripe.com
2. Click **Developers** → **API Keys**
3. Ensure **Test Mode** is enabled (toggle in top-right)
4. Copy **Test Public Key** and **Test Secret Key**
5. Add to `.env.local`:
   ```
   STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
   STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
   ```

### Test Cards

Use these test card numbers in test mode:

| Card | Number | Expiry | CVC | Result |
|------|--------|--------|-----|--------|
| Visa (Success) | `4242 4242 4242 4242` | Any future date | Any 3 digits | ✅ Succeeds |
| Visa (Decline) | `4000 0000 0000 0002` | Any future date | Any 3 digits | ❌ Declines |
| Visa (Auth Required) | `4000 0025 0000 3155` | Any future date | Any 3 digits | ⚠️ 3D Secure |
| Visa (Invalid CVC) | `4000 0000 0000 9995` | Any future date | Any 3 digits | ❌ Invalid CVC |
| Amex (Success) | `3782 822463 10005` | Any future date | Any 3 digits | ✅ Succeeds |
| Mastercard (Success) | `5555 5555 5555 4444` | Any future date | Any 3 digits | ✅ Succeeds |

### Test Flow

1. **Navigate to pricing page**
   ```
   http://localhost:3000/pricing
   ```

2. **Select a tier** (Founder Pass, Scale Plan, or Enterprise)

3. **Choose billing cycle** (Monthly or Annual)

4. **Click "Get Started"**

5. **Fill in form**
   - Email: `test@example.com`
   - Full Name: `Test User`
   - Accept Terms checkbox

6. **Select "Stripe" payment method**

7. **Enter test card**
   - Number: `4242 4242 4242 4242`
   - Expiry: `12/25` (or any future date)
   - CVC: `123`

8. **Click "Pay AED 2,500"**

9. **Expected Results**:
   - ✅ Loading spinner appears
   - ✅ Payment processes (2-3 seconds)
   - ✅ Success page shows
   - ✅ Subscription ID displayed
   - ✅ Confirmation email sent

### Verify in Supabase

```sql
-- Check if subscription was created
SELECT * FROM subscriptions 
WHERE email = 'test@example.com' 
ORDER BY created_at DESC 
LIMIT 1;

-- Check payment transaction
SELECT * FROM payment_transactions 
WHERE payment_gateway = 'stripe' 
ORDER BY attempted_at DESC 
LIMIT 1;
```

### Test Decline Scenario

1. Repeat the flow but use card: `4000 0000 0000 0002`
2. Should see error message: "Your card was declined"
3. Check transaction in Supabase:
   ```sql
   SELECT status, error_message FROM payment_transactions 
   WHERE gateway_transaction_id = 'latest_attempt';
   ```

### Stripe Dashboard Verification

1. Go to https://dashboard.stripe.com/test/payments
2. You should see your test transaction
3. Status should be **Succeeded**
4. Scroll to see full details including metadata

---

## Testing Telr Payments

### Sandbox Setup

1. Visit https://telr.com
2. Create merchant account or use sandbox
3. Go to Settings → API Keys
4. Copy sandbox credentials
5. Add to `.env.local`:
   ```
   TELR_API_KEY=sandbox_xxxxx
   TELR_STORE_ID=xxxx
   TELR_AUTHKEY=xxxxxxxx
   TELR_SANDBOX_MODE=true
   ```

### Test Flow

1. **Navigate to pricing**
   ```
   http://localhost:3000/pricing
   ```

2. **Select a tier and billing cycle**

3. **Fill in form details**

4. **Select "Telr" payment method**

5. **Click "Proceed to Payment"**

6. **You'll be redirected to Telr gateway**

7. **Use Telr test credentials** (provided by Telr)

8. **Complete payment in Telr interface**

9. **Telr redirects back** to your success/failure page

### Verify in Supabase

```sql
-- Check Telr subscription
SELECT * FROM subscriptions 
WHERE payment_gateway = 'telr' 
ORDER BY created_at DESC 
LIMIT 1;

-- Check transaction with Telr reference
SELECT 
  gateway_transaction_id,
  status,
  gateway_response
FROM payment_transactions 
WHERE payment_gateway = 'telr' 
ORDER BY attempted_at DESC 
LIMIT 1;
```

### Telr Dashboard

1. Log in to https://telr.com/merchants
2. Go to Transactions
3. You should see your test transaction
4. Status should show **Completed**

---

## Testing Email Notifications

### Setup

Ensure email is configured:
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@myfounders.club
```

### Test Email Delivery

1. **Complete a test payment**
2. **Check inbox** at email provided during checkout
3. **Look for confirmation email** from `noreply@myfounders.club`
4. **Email should contain**:
   - Subscription confirmation
   - Plan details
   - Amount paid (AED and USD)
   - Next billing date
   - Link to dashboard
   - Support contact

### Check Email Logs

In your Next.js console, you should see:
```
[SMTP] Email sent to test@example.com
Subject: Your MyFoundersClub Subscription Confirmation
```

### Troubleshoot Email Issues

If email not received:

1. **Check spam folder**
2. **Verify SMTP credentials**:
   ```bash
   # Test SMTP connection
   npm run test:smtp
   ```
3. **Check Supabase logs**:
   - This is where errors get logged
4. **Enable less secure apps** (for Gmail):
   - https://myaccount.google.com/u/0/lesssecureapps

---

## Testing User Flows

### Happy Path (Successful Payment)

```
1. User lands on pricing page
2. Selects tier and billing cycle
3. Fills in email and name
4. Selects gateway (Stripe or Telr)
5. Completes payment
6. Redirected to success page
7. Receives confirmation email
8. Can access dashboard
9. Subscription shows in database
```

**Expected Time**: 3-5 seconds

**Success Indicators**:
- ✅ Success page displays
- ✅ Email received within 10 seconds
- ✅ Record in `subscriptions` table
- ✅ Record in `payment_transactions` table

### Failure Path (Failed Payment)

```
1. User attempts payment with declined card
2. Payment fails
3. Redirected to failure page
4. User sees error message and retry button
5. User retries with valid card
6. Payment succeeds
```

**Expected Behavior**:
- ❌ First payment shows error
- ✅ Second payment succeeds
- ✅ Both attempts logged in `payment_transactions`

### Edge Cases

#### Test 1: Duplicate Submission
- Click "Pay" twice rapidly
- Should only create one subscription
- Check: Only one record in `subscriptions` table

#### Test 2: Form Validation
- Try to submit without email
- Should see error: "Email is required"
- Try without accepting terms
- Should see error: "You must accept terms"

#### Test 3: Missing Environment Variables
- Remove `STRIPE_SECRET_KEY` from `.env.local`
- Try to make payment
- Should see error: "STRIPE_SECRET_KEY is not configured"

#### Test 4: Invalid Subscription Data
- Manually insert invalid data to test constraints:
- Try invalid tier name (not founder-pass/scale-plan/enterprise)
- Should get database constraint error

---

## Performance Testing

### Payment Processing Time

**Target**: Payment should complete in 3-5 seconds

**Test Procedure**:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Clear all requests
4. Submit payment
5. Check timing:
   - POST `/api/payments/stripe/create-payment-intent`: 500-1000ms
   - Client-side Stripe confirmation: 1000-2000ms
   - PUT `/api/payments/stripe/confirm-payment`: 500-1000ms

### Database Query Performance

**Test Procedure**:
1. Go to Supabase
2. SQL Editor → New Query
3. Run performance check:
   ```sql
   -- Check subscription creation speed
   EXPLAIN ANALYZE
   SELECT * FROM subscriptions 
   WHERE email = 'test@example.com';
   ```

### Load Testing (Optional)

For production preparation:

```bash
# Test 10 concurrent payments (approximate)
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/payments/stripe/create-payment-intent \
    -H "Content-Type: application/json" \
    -d '{"tier":"founder-pass","billingCycle":"monthly",...}' &
done
```

---

## Security Testing

### Test 1: Verify Secret Keys Not Exposed

- Open browser Network tab
- Make payment request
- Expand JSON payload
- Should NOT see `STRIPE_SECRET_KEY` or `TELR_AUTHKEY`
- These should only exist on backend (.env.local)

### Test 2: HTTPS Requirement (Production)

- Payment routes should reject HTTP (test in production only)
- All payment data transmitted over HTTPS

### Test 3: API Key Rotation

- Rotate Stripe keys in dashboard
- Old keys should stop working
- New keys should work immediately
- Update `.env.local` and restart server

### Test 4: Webhook Signature Validation

**For Telr Callbacks**:
- Telr sends POST to `/api/payments/telr/callback`
- Signature must be validated
- Test with invalid signature:
  ```bash
  curl -X PUT http://localhost:3000/api/payments/telr/callback \
    -H "Content-Type: application/json" \
    -d '{"reference":"test","signature":"invalid"}'
  ```
- Should fail with signature error

---

## Testing Checklist

Before going live, verify all items:

### Functionality
- [ ] Stripe payment succeeds with valid card
- [ ] Stripe payment fails gracefully with declined card
- [ ] Telr payment redirects to gateway
- [ ] Telr callback updates subscription status
- [ ] Email confirmations sent after payment
- [ ] Success page displays subscription details
- [ ] Failure page shows error message

### Data Integrity
- [ ] Subscription created in database
- [ ] Payment transaction logged
- [ ] Pricing calculated correctly (AED and USD)
- [ ] No duplicate subscriptions created
- [ ] Failed transactions marked as failed

### User Experience
- [ ] Loading states visible during processing
- [ ] Error messages clear and helpful
- [ ] Form validation prevents invalid submissions
- [ ] Retry functionality works
- [ ] User can cancel mid-payment

### Security
- [ ] Secret keys not exposed in frontend
- [ ] API keys stored in .env.local only
- [ ] HTTPS enforced (production)
- [ ] Webhook signatures validated
- [ ] User data encrypted in transit

### Performance
- [ ] Payment completes in <5 seconds
- [ ] No UI freezing during processing
- [ ] Database queries efficient
- [ ] Error responses fast (<1 second)

### Email
- [ ] Confirmation email sent
- [ ] Email arrives in inbox (not spam)
- [ ] Email contains correct details
- [ ] Email templates properly formatted

---

## Debugging Guide

### Common Issues

**Issue**: "STRIPE_SECRET_KEY is missing"
```
Solution: Add STRIPE_SECRET_KEY to .env.local
Restart: npm run dev
```

**Issue**: "Payment intent not found"
```
Solution: Check if CREATE payment-intent endpoint was called first
Verify: subscription_id exists in database
```

**Issue**: "Email not sending"
```
Solution 1: Verify SMTP credentials are correct
Solution 2: Check Gmail "Less Secure Apps" is enabled
Solution 3: Look for error in server console
```

**Issue**: "Duplicate subscription created"
```
Solution: Add unique constraint on (user_id, tier) or (email, tier)
Or: Implement idempotency keys
```

**Issue**: "Telr callback not received"
```
Solution: Verify webhook URL is publicly accessible
Solution 2: Check if Telr can reach your domain
Solution 3: Verify callback signature validation logic
```

### Enable Debug Logging

Add this to your API routes:

```typescript
console.log('[PAYMENT DEBUG] Starting payment intent creation');
console.log('[PAYMENT DEBUG] Tier:', tier);
console.log('[PAYMENT DEBUG] Amount:', amount);
console.log('[PAYMENT DEBUG] Stripe key exists:', !!process.env.STRIPE_SECRET_KEY);
```

---

## Post-Launch Monitoring

### Metrics to Track

1. **Conversion Rate**
   - Visitors to pricing → Completed payments

2. **Payment Success Rate**
   - Should target >95% success rate

3. **Failed Payment Reasons**
   - Track which error codes appear most
   - AdjustUI/messaging accordingly

4. **Email Delivery Rate**
   - Should be >98% delivery rate

5. **Customer Support Issues**
   - Track payment-related support tickets

### SQL Queries for Monitoring

```sql
-- Daily revenue
SELECT 
  DATE(created_at) as date,
  SUM(amount_aed) as revenue_aed
FROM subscriptions
WHERE payment_status = 'completed'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Payment success rate
SELECT 
  COUNT(*) as total_attempts,
  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as successful,
  ROUND(100.0 * SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) / COUNT(*), 2) as success_rate
FROM payment_transactions;

-- Top error reasons
SELECT 
  error_message,
  COUNT(*) as occurrences
FROM payment_transactions
WHERE status = 'failed'
GROUP BY error_message
ORDER BY occurrences DESC;
```

---

## Support

For testing issues:
- **Stripe Docs**: https://stripe.com/docs/testing
- **Telr Docs**: https://telr.com/developers
- **Project Support**: support@myfounders.club

---

**Last Updated**: February 14, 2026
