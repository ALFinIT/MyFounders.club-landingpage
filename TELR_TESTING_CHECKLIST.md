# Telr Payment Implementation - Complete Testing Checklist

## Pre-Testing Requirements

### Environment Setup
- [ ] `.env.local` file created with all required variables
- [ ] `TELR_STORE_ID` set
- [ ] `TELR_AUTHKEY` set
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set
- [ ] `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` set
- [ ] `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD` configured (for email testing)
- [ ] `NEXT_PUBLIC_APP_URL=http://localhost:3000` set

### Database Verification
- [ ] `subscriptions` table exists in Supabase
- [ ] `payment_transactions` table exists in Supabase
- [ ] Tables have required columns (see schema)
- [ ] Database has no permission errors

### Server Status
- [ ] Development server running: `pnpm dev`
- [ ] No TypeScript errors shown
- [ ] Application accessible at `http://localhost:3000`

---

## Phase 1: Frontend Integration Testing

### 1.1 Pricing Page Load
- [ ] Navigate to `http://localhost:3000`
- [ ] Pricing section visible
- [ ] "Founder Access Pass" plan shows AED 25/month
- [ ] "Get Access" button visible and clickable

### 1.2 Payment Modal Opening
- [ ] Click "Get Access" button on Founder Pass
- [ ] Payment modal opens with fade animation
- [ ] Modal shows:
  - [ ] Plan: "founder-pass"
  - [ ] Billing: "monthly"
  - [ ] Amount: "AED 25.00"
  - [ ] Full Name input field
  - [ ] Email input field
  - [ ] Pay button

### 1.3 Form Validation
- [ ] Click Pay with empty form → Shows error message
- [ ] Enter name, leave email empty → Shows error
- [ ] Enter email, leave name empty → Shows error
- [ ] Enter both fields → No error

### 1.4 Modal Close
- [ ] Click X button → Modal closes
- [ ] Click outside modal (backdrop) → Modal closes
- [ ] Click "Get Access" again → Modal reopens

---

## Phase 2: Payment Creation API Testing

### 2.1 Manual API Test (cURL)
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

- [ ] Response includes `success: true`
- [ ] Response includes `reference` (e.g., "MFC-founder-pass-...")
- [ ] Response includes `subscriptionId`
- [ ] Response includes `paymentData` object
- [ ] `paymentData` includes `amount: 2500` (AED 25 in fils)
- [ ] `paymentData` includes `store: YOUR_STORE_ID`
- [ ] `paymentData` includes `signature` (authentication hash)

### 2.2 Supabase Record Creation
After API call:
- [ ] New subscription record appears in Supabase `subscriptions` table
- [ ] `payment_status` = "pending"
- [ ] `subscription_status` = "active"
- [ ] `payment_id` matches the reference from API response
- [ ] `email` = "test@example.com"
- [ ] `amount_aed` = 25
- [ ] `created_at` is current timestamp

### 2.3 Error Handling
Test with invalid data:
- [ ] Missing `tier` → Returns 400 with error message
- [ ] Missing `email` → Returns 400 with error message
- [ ] Invalid `billingCycle` → Returns 400 with error message
- [ ] Invalid Supabase URL → Returns 500 with error

---

## Phase 3: Payment Callback (Webhook) Testing

### 3.1 Successful Payment Callback
```bash
curl -X POST http://localhost:3000/api/payments/telr/callback \
  -H "Content-Type: application/json" \
  -d '{
    "refno": "MFC-founder-pass-1739629920000-abc",
    "amount": 2500,
    "currency": "AED",
    "status": "1",
    "tranref": "TELR-1739629920000"
  }'
```

- [ ] Response includes `success: true`
- [ ] Response includes `message: "Payment completed"`
- [ ] HTTP status = 200

### 3.2 Subscription Update After Callback
Check Supabase for updated subscription:
- [ ] `payment_status` changed from "pending" to "completed"
- [ ] `subscription_status` = "active"
- [ ] `updated_at` is recent timestamp
- [ ] `confirmation_email_sent` = true

### 3.3 Transaction Record Creation
Check Supabase `payment_transactions` table:
- [ ] New transaction record created
- [ ] `subscription_id` = subscription's ID
- [ ] `status` = "completed"
- [ ] `payment_gateway` = "telr"
- [ ] `amount_aed` = 25
- [ ] `gateway_transaction_id` = "TELR-1739629920000"

### 3.4 Failed Payment Callback
```bash
curl -X POST http://localhost:3000/api/payments/telr/callback \
  -H "Content-Type: application/json" \
  -d '{
    "refno": "MFC-founder-pass-different-ref",
    "amount": 2500,
    "currency": "AED",
    "status": "0"
  }'
```

- [ ] Response includes `message: "Payment failed"`
- [ ] HTTP status = 200 (callback processed)
- [ ] Subscription updated to `payment_status` = "failed"
- [ ] Transaction record has `status` = "failed"

### 3.5 Callback Error Handling
- [ ] Missing `refno` → Returns 400
- [ ] Invalid `refno` → Returns 404 with "Subscription not found"
- [ ] Database connection error → Returns 500

---

## Phase 4: Email Confirmation Testing

### 4.1 Email Sent Flag
After successful callback:
- [ ] Check subscription record: `confirmation_email_sent` = true
- [ ] `confirmation_email_sent_at` = recent timestamp

### 4.2 Email Content
(If SMTP is configured correctly)
- [ ] Email received at test@example.com
- [ ] Subject: "Payment Confirmed - Welcome to My Founders Club"
- [ ] Email includes:
  - [ ] Greeting with customer name
  - [ ] Plan details (Founder Pass)
  - [ ] Amount (AED 25.00)
  - [ ] Billing cycle (Monthly)
  - [ ] Status: Active
  - [ ] Link to dashboard

### 4.3 Failed Email Handling
If SMTP fails:
- [ ] Callback still succeeds (payment processed)
- [ ] Error logged in server console
- [ ] Payment still appears in admin panel

---

## Phase 5: Admin Panel Integration Testing

### 5.1 Admin Panel Access
- [ ] Navigate to `http://localhost:3000/admin`
- [ ] Multiple login attempts with wrong password → Access denied
- [ ] Login with admin / adminmfc26 → Granted access

### 5.2 Payments Section Visibility
After login:
- [ ] Three main sections visible: Applications, WhatsApp Signups, Payments
- [ ] Payments section has:
  - [ ] Stats cards (Total, Completed, Pending, Revenue)
  - [ ] Status filter dropdown
  - [ ] Payments table
  - [ ] Download CSV button

### 5.3 Payment Data Display
From successful payment test:
- [ ] Payment appears in the table with:
  - [ ] Customer name: "Test User"
  - [ ] Email: "test@example.com"
  - [ ] Plan: "founder-pass"
  - [ ] Amount: "AED 25.00"
  - [ ] Payment Method: "Telr" (in cyan/blue badge)
  - [ ] Status: "COMPLETED" (green badge)
  - [ ] Transaction ID: "TELR-..." or reference
  - [ ] Date: Current date

### 5.4 Stats Calculations
- [ ] Total Payments: At least 1
- [ ] Completed: 1 (from successful test)
- [ ] Pending: 0 (or from earlier pending test)
- [ ] Revenue (AED): 25 (or sum of completed payments)

### 5.5 Filter Functionality
Click status dropdown and test each filter:
- [ ] "All" → Shows all payment records
- [ ] "Completed" → Shows only completed payments
- [ ] "Pending" → Shows only pending payments
- [ ] "Failed" → Shows only failed payments (if any)
- [ ] "Refunded" → Shows only refunded payments (if any)

### 5.6 CSV Export
- [ ] Click "Download CSV" button
- [ ] File downloads as "payments_[timestamp].csv"
- [ ] Open CSV file and verify:
  - [ ] Headers present: Name, Email, Plan, Amount, etc.
  - [ ] Data rows contain payment records
  - [ ] All columns properly populated

### 5.7 Real-Time Updates
With two browser windows:
- [ ] Window 1: Admin panel with Payments tab open
- [ ] Window 2: Test payment creation/callback
- [ ] Window 1: Observe payment appears or updates in real-time

---

## Phase 6: Failed Scenarios Testing

### 6.1 Missing Environment Variables
Before testing, comment out one variable in .env.local, then:
- [ ] Error appears in browser console
- [ ] Error message is clear and helpful
- [ ] Server logs error to console

### 6.2 Invalid Telr Credentials
Set `TELR_STORE_ID=invalid`, then:
- [ ] Payment modal works (frontend)
- [ ] API returns error (invalid signature)
- [ ] Subscription not created in database

### 6.3 Supabase Connection Error
Disconnect from internet, then:
- [ ] Payment form accepts submission
- [ ] API returns "Failed to connect to Supabase"
- [ ] Clear error message in browser console

### 6.4 Webhook Signature Mismatch
(Advanced) Edit callback request with wrong signature:
- [ ] Callback still processes (no signature validation yet)
- [ ] Payment proceeds as normal
- [ ] (Note: Signature validation can be added for security)

---

## Phase 7: Browser Console Validation

### 7.1 No JavaScript Errors
- [ ] Open DevTools (F12 → Console)
- [ ] No red error messages while:
  - [ ] Loading pricing page
  - [ ] Opening payment modal
  - [ ] Filling form
  - [ ] Navigating to admin
  - [ ] Loading payments table

### 7.2 Network Requests
Check Network tab:
- [ ] Payment creation: `POST /api/payments/telr` → 200
- [ ] Callback: `POST /api/payments/telr/callback` → 200
- [ ] Admin data: `GET /api/subscriptions` or similar → 200

### 7.3 Console Logs
Server logs should show:
```
📥 Telr Callback Received: { ... }
✓ Payment creation successful
📊 Processing payment: { ... }
✉️ Confirmation email sent to test@example.com
✅ Callback processed successfully
```

---

## Phase 8: Performance & Stress Testing

### 8.1 Multiple Payments
- [ ] Create 5 test payments
- [ ] All appear in admin panel
- [ ] Stats calculations are accurate
- [ ] CSV export includes all records
- [ ] No database errors

### 8.2 Concurrent Requests
(Using separate terminals or tools like Apache Bench):
- [ ] Send 10 simultaneous payment creation requests
- [ ] All create subscriptions without duplicates
- [ ] Database handles concurrency correctly

### 8.3 Large Data Export
- [ ] Admin with 100+ payments
- [ ] CSV export completes without error
- [ ] File size reasonable (< 1MB)
- [ ] Data integrity maintained

---

## Phase 9: Security Testing

### 9.1 Protected Admin Routes
- [ ] Direct access to `/admin` without login → Redirects to login
- [ ] Cannot access payment data in API without proper auth
- [ ] Payment references cannot be guessed (randomized)

### 9.2 Injection Prevention
- [ ] Special characters in name/email → Properly escaped
- [ ] SQL injection attempts → No errors, data handled safely
- [ ] XSS attempts in data → Content escaped in admin display

### 9.3 CORS & API Security
- [ ] API works from same domain
- [ ] Requests from external domains properly protected
- [ ] No sensitive data exposed in error messages

---

## Phase 10: Cross-Browser Testing

Test on:
- [ ] Chrome/Edge (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (if available)
- [ ] Mobile (iPhone Safari or Chrome)
- [ ] Mobile (Android Chrome)

For each browser verify:
- [ ] Pricing page renders correctly
- [ ] Payment modal displays properly
- [ ] Form inputs work
- [ ] Admin panel is responsive

---

## Post-Testing Documentation

### 10.1 Create Test Report
Document:
- [ ] Date of testing
- [ ] Environment (sandbox/test)
- [ ] All tests passed/failed
- [ ] Screenshots of key flows
- [ ] Any issues encountered

### 10.2 Configuration Verification
- [ ] All required .env variables documented
- [ ] Telr credentials verified
- [ ] Supabase tables confirmed
- [ ] Email configuration tested

### 10.3 Production Readiness Checklist
- [ ] Switch `TELR_SANDBOX_MODE=false`
- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Use production API keys
- [ ] Test one real payment
- [ ] Verify webhook URLs are correct
- [ ] Monitor first 24 hours of transactions

---

## Troubleshooting Reference

| Issue | Solution |
|-------|----------|
| PaymentModal doesn't open | Check browser console for errors, verify PaymentModal imported |
| API returns 404 on subscription | Verify table names in Supabase match |
| Callback not updating database | Check Supabase connection, verify payment_id matches |
| Email not sending | Verify SMTP credentials, check spam folder |
| Admin payments not showing | Check admin authentication, clear browser cache |
| Signature mismatch error | Verify TELR_STORE_ID and TELR_AUTHKEY are correct |

---

## Test Data Reference

**Standard Test User:**
- Name: Test User
- Email: test-[timestamp]@example.com (unique each time)
- Plan: founder-pass
- Amount: AED 25
- Billing Cycle: monthly

**Test References:**
- Created reference: MFC-founder-pass-[timestamp]-[random]
- Payment status after callback: completed or failed

---

## Sign-Off

- [ ] All phases completed
- [ ] All critical tests passed
- [ ] Payment flow end-to-end working
- [ ] Admin panel displays payments correctly
- [ ] Email confirmations sending
- [ ] Documentation complete

**Date Completed:** _______________
**Tester Name:** _______________
**Sign-Off:** _______________

---

## Next Steps

1. ✅ Complete all tests above
2. ✅ Document any issues in troubleshooting
3. ✅ Update configuration for production
4. ✅ Perform final E2E test with real payment (sandbox)
5. ✅ Deploy to production
6. ✅ Monitor first 24 hours of transactions
7. ✅ Set up payment alerts/notifications
