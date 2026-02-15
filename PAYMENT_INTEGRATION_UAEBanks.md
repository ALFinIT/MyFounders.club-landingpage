# Payment Integration Guide - UAE Banks & Telr Gateway

## Overview

The My Founders Club payment system is integrated with **Telr**, a UAE-based PCI DSS Level 1 certified payment gateway. All payments are processed in **AED (United Arab Emirates Dirhams)** for seamless UAE banking operations.

## Supported Payment Methods

### 1. **Credit/Debit Card (Visa, Mastercard)**
- **Method**: Card (Visa, Mastercard)
- **Processing**: Through Telr's secure payment gateway
- **Security**: PCI DSS Level 1 certified
- **Timeline**: Instant confirmation
- **Supported Banks**: All major UAE banks

### 2. **Telr Wallet**
- **Method**: Telr Pay Wallet
- **User Base**: UAE customers with existing Telr Pay accounts
- **Processing**: Direct wallet payment
- **Timeline**: Instant
- **Features**: No card details required

### 3. **Google Pay**
- **Method**: Digital wallet (Android devices)
- **Supported Cards**: Any linked card in Google Pay
- **Processing**: Through Telr gateway
- **Timeline**: Instant
- **Availability**: Android devices with Google Play Services

### 4. **Apple Pay**
- **Method**: Digital wallet (iOS devices)
- **Supported Cards**: Any linked card in Apple Pay
- **Processing**: Through Telr gateway
- **Timeline**: Instant
- **Availability**: iOS devices (iPhone, iPad)

## Payment Flow Architecture

```
User Selects Payment Method
           ↓
Form Submission (PaymentModal.tsx)
           ↓
     /api/payments/telr
           ↓
    Route by Payment Method
    ├─→ Card Payment Handler
    ├─→ Telr Wallet Handler
    ├─→ Google Pay Handler
    └─→ Apple Pay Handler
           ↓
    Generate Telr Payment Data
    + SHA256 Signature
           ↓
    Store Subscription Record
    (status: pending)
           ↓
    Redirect to Telr Gateway
           ↓
    Customer Completes Payment
           ↓
    Telr IPN Callback
           ↓
    Update Subscription Status
           ↓
    Send Confirmation Email
```

## Required Environment Variables

```env
# Telr Configuration (from your Telr merchant account)
TELR_STORE_ID=your_telr_store_id
TELR_API_KEY=your_telr_api_key
TELR_AUTHKEY=your_telr_auth_key

# Email Configuration (for payment confirmations)
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=your-email@yourdomain.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@myfounders.club

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_key

# App Configuration
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production
```

## Setting Up Your Telr Account (UAE)

### Step 1: Create Telr Merchant Account
1. Visit [https://telr.com](https://telr.com)
2. Click "Sign Up" or "Register Your Business"
3. Provide your business details:
   - Business Name: My Founders Club
   - Business Address: (Your UAE office address)
   - Contact Email
   - Phone Number

### Step 2: Verify Your Account
- Telr may request business documents:
  - Trade License (UAE Trade License)
  - Emirates ID / Passport
  - Business Bank Account Details

### Step 3: Link Your UAE Bank Account
1. Go to Telr Dashboard → Settings → Bank Accounts
2. Click "Add Bank Account"
3. Select Bank:
   - **First Abu Dhabi Bank (FAB)**
   - **Emirates NBD (ENBD)**
   - **Dubai Islamic Bank (DIB)**
   - **Mashreq Bank**
   - **Abu Dhabi Islamic Bank (ADIB)**
   - Or any other UAE bank

4. Provide account details:
   - IBAN (International Bank Account Number)
   - Account Holder Name
   - Bank Name
   - Account Type (Checking/Savings)

### Step 4: Get Your Credentials
1. From Telr Dashboard:
   - Copy **Store ID** → `TELR_STORE_ID`
   - Copy **API Key** → `TELR_API_KEY`
   - Copy **Auth Key** → `TELR_AUTHKEY`

### Step 5: Configure Return URLs
In Telr Dashboard → Settings → Merchant Details:
- **Success URL**: `https://yourdomain.com/payment-success`
- **Failure URL**: `https://yourdomain.com/payment-failed`
- **Notification URL (IPN)**: `https://yourdomain.com/api/payments/telr/callback`

## Database Schema Requirements

Your Supabase `subscriptions` table should have these columns:

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  country TEXT DEFAULT 'AE',
  city TEXT,
  address TEXT,
  tier TEXT NOT NULL,
  billing_cycle TEXT NOT NULL (monthly/annual),
  amount_aed DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'AED',
  payment_gateway TEXT DEFAULT 'telr',
  payment_method TEXT (card/telr_wallet/google_pay/apple_pay),
  payment_status TEXT DEFAULT 'pending' (pending/completed/failed),
  payment_id TEXT UNIQUE,
  subscription_status TEXT DEFAULT 'inactive' (inactive/active/cancelled),
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID REFERENCES subscriptions(id),
  transaction_type TEXT (initial/renewal),
  amount_aed DECIMAL(10, 2),
  currency TEXT DEFAULT 'AED',
  payment_gateway TEXT DEFAULT 'telr',
  gateway_transaction_id TEXT,
  gateway_response JSONB,
  status TEXT (completed/failed/pending),
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);
```

## Payment Processing Details

### Card Payment (Visa/Mastercard)
```
Amount Calculation: Amount in Fils (AED cents)
Example: AED 25.00 = 2500 fils

Payment Flow:
1. User enters card details in form
2. Form data sent to /api/payments/telr with paymentMethod: 'card'
3. Backend creates Telr payment request
4. Signature generated: SHA256(Store#Amount#Currency#AuthKey)
5. Form submitted to Telr gateway
6. User enters OTP/3D Secure (if required)
7. Payment confirmed/declined
8. Telr redirects to success/failed URL
9. IPN callback updates database
```

### Telr Wallet Payment
```
Advantage: Faster checkout for existing Telr Pay users
No card details needed
Instant confirmation possible

Configuration: tpay parameter set to 1 in payment data
```

### Google Pay & Apple Pay
```
These work as digital wallets that tokenize card information
Payment data automatically encrypted
User authentication through biometric/PIN
Faster than traditional card entry
```

## Testing Payment Integration

### Step 1: Enable Test Mode
```env
NODE_ENV=development
```

With `development` environment, Telr accepts test card numbers.

### Step 2: Test Card Numbers (Telr)
```
Visa Success:       4111 1111 1111 1111
Visa Failed:        4012 1111 1111 1111
Mastercard Success: 5555 5555 5555 4444
Mastercard Failed:  5105 1051 0510 5100
```

### Step 3: Test CVV & Expiry
- **CVV**: Any 3-4 digits
- **Expiry**: Any future date

### Step 4: Test OTP
Telr usually auto-confirms test transactions or uses a test OTP (check Telr docs).

### Step 5: Verify in Dashboard
1. Go to `/api/payments/telr` POST request
2. Check Supabase → subscriptions table for pending record
3. Complete payment with test card
4. Verify IPN callback updated status to 'completed'
5. Check payment_transactions table for transaction log

## Security Features

✅ **PCI DSS Level 1 Compliance**: Telr handles all card data
✅ **SHA256 Signature Authentication**: Prevents payment tampering
✅ **HTTPS Only**: All communication encrypted
✅ **IPN Verification**: Callbacks verified from Telr
✅ **No Card Storage**: Card details never touch your servers
✅ **User Verification**: OTP/3D Secure when required by bank

## UAE Bank Account Settlement

### Typical Settlement Timeline
- **Credit Cards**: 2-3 business days
- **Debit Cards**: 1-2 business days
- **Digital Wallets**: 1-2 business days
- **Telr Wallet**: 1 business day

### Settlement Details
1. Telr deposits payments into your linked UAE bank account
2. Settlements appear as:
   - **Merchant ID**: Your Telr Store ID
   - **Description**: "Telr Payment Gateway - My Founders Club"
3. Telr charges processing fees:
   - Typical: 1.99%-2.99% per transaction
   - Volume discounts available

### Bank Details in Your Supabase
Store bank details securely:
```sql
INSERT INTO merchant_settings (key, value) VALUES
('bank_account_iban', 'AE1234567890123456'),
('bank_name', 'First Abu Dhabi Bank'),
('bank_account_holder', 'My Founders Club'),
('telr_settlement_currency', 'AED');
```

## Troubleshooting

### Payment Fails with "Invalid Signature"
- Verify TELR_AUTHKEY is correct
- Ensure TELR_STORE_ID matches Telr dashboard
- Check SHA256 signature generation

### IPN Callback Not Working
- Verify callback URL in Telr dashboard matches `/api/payments/telr/callback`
- Check server can receive POST requests
- Review Supabase error logs

### Amount Mismatch
- Remembered amounts must be in fils (cents)
- AED 25.00 = 2500 fils
- Check pricing_tiers table has correct AED amounts

### Email Not Sending
- Verify SMTP credentials are correct
- Check SMTP provider allows nodemailer
- Review email logs in API response

## API Response Format

### Success Response
```json
{
  "success": true,
  "paymentMethod": "card",
  "reference": "MFC-founder-pass-1708002341-a9b8c7d6",
  "subscriptionId": "123e4567-e89b-12d3-a456-426614174000",
  "telrPaymentUrl": "https://telr.com/gateway/process.php",
  "paymentData": {
    "store": "12345",
    "amount": 2500,
    "currency": "AED",
    ...
  }
}
```

### Error Response
```json
{
  "error": "Payment processing failed",
  "details": "Invalid pricing tier"
}
```

## Subscription Lifecycle

```
Order Placed
    ↓
Redirected to Telr Gateway
    ↓
Payment Pending (in DB)
    ↓
Customer Completes Payment
    ↓
Telr Sends IPN Callback
    ↓
Status Updated to Completed
    ↓
Confirmation Email Sent
    ↓
Subscription Status: Active
    ↓
User Gains Access to Features
```

## Contact Information

### Telr Support
- **Website**: https://telr.com
- **Support Email**: support@telr.com
- **Phone**: Available in your Telr dashboard
- **Hours**: 24/7 for merchant support

### My Founders Club Support
- **Payment Issues**: support@myfounders.club
- **Telr Integration**: Check Telr merchant dashboard

## Compliance & Regulations

✅ UAE Central Bank Guidelines
✅ DFS (Dubai Financial Services) Approved
✅ PCI DSS Level 1 (Telr)
✅ Data Protection Privacy Policy
✅ AML/CFT Compliance

## Future Enhancements

Potential payment method integrations:
- [ ] BNPL (Bank Now Pay Later) - Telr Flex
- [ ] Cryptocurrency payments - Telr Crypto
- [ ] Invoice/Bill payments
- [ ] Automatic renewal/subscription management
- [ ] Multi-currency support

---

**Last Updated**: February 2026
**Version**: 1.0
**Status**: Production Ready
