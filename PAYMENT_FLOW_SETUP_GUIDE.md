# Professional Payment Flow Setup Guide

## Overview
Your payment system has been enhanced with a professional payment flow that collects complete customer and billing information before processing payments through Telr.

## Changes Made

### 1. **Enhanced Payment Modal** 
The payment form now collects comprehensive payment details in two sections:

#### Personal Information Section
- Full Name (required)
- Email Address (required)  
- Phone Number (required)
- Business Name (optional)

#### Billing Address Section
- Country (required, defaults to UAE)
- City (required)
- Street Address (required)

All fields include:
- Professional styling matching landing page theme
- Real-time validation with clear error messages
- Focus states and visual feedback
- Support for 10+ countries (UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, Oman, USA, UK, India, Other)

### 2. **Updated Social Widget Button**
- Button now shows **+** (Plus) icon when collapsed
- Changes to **X** when expanded/opened
- Smooth rotation animation on toggle
- Professional glassmorphism styling

### 3. **Professional Payment Processing**
The updated payment flow includes:
- Complete form validation (email format, phone format, required fields)
- Detailed payment information sent to Telr gateway
- Security notice with encryption and PCI DSS Level 1 compliance badge
- Professional error handling with specific messages

## Required Environment Variables

Add these to your `.env.local` file to enable real payment processing:

```env
# Telr Payment Gateway Configuration
TELR_API_KEY=YOUR_TELR_API_KEY
TELR_STORE_ID=YOUR_TELR_STORE_ID
TELR_AUTHKEY=YOUR_TELR_AUTH_KEY

# Email Configuration (for payment notifications)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-email-password

# Supabase Configuration (for storing payment records)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-supabase-key
```

## Getting Telr API Keys

### Step 1: Create Telr Account
1. Go to [Telr.com](https://telr.com)
2. Sign up for a merchant account
3. Complete KYC/business verification

### Step 2: Access Dashboard
1. Login to Telr Merchant Dashboard
2. Navigate to **Settings** → **API Keys** or **Integration**

### Step 3: Retrieve Your Keys
- **TELR_STORE_ID**: Your merchant/store ID (usually a numeric ID)
- **TELR_API_KEY**: API key for programmatic access
- **TELR_AUTHKEY**: Authentication key for signature generation (keep secret!)

### Step 4: Configure Return URLs
In Telr Dashboard:
1. Set Success URL: `https://yourdomain.com/payment-success`
2. Set Failure URL: `https://yourdomain.com/payment-failed`
3. Set Callback URL: `https://yourdomain.com/api/payments/telr/callback`

## Database Schema Updates

Ensure your `subscriptions` table includes these columns:

```sql
-- Customer Information
email VARCHAR(255)
full_name VARCHAR(255)
phone_number VARCHAR(20)
business_name VARCHAR(255)
country VARCHAR(2)
city VARCHAR(100)
address VARCHAR(255)

-- Payment Information
payment_gateway VARCHAR(50) -- 'telr'
payment_status VARCHAR(50) -- 'pending', 'completed', 'failed'
payment_id VARCHAR(255) -- Telr reference/transaction ID
amount_aed DECIMAL(10, 2)
amount_usd DECIMAL(10, 2)
currency VARCHAR(3) -- 'AED'

-- Subscription Details
tier VARCHAR(100)
billing_cycle VARCHAR(20) -- 'monthly', 'annual'
subscription_status VARCHAR(50) -- 'active', 'canceled', 'suspended'
start_date TIMESTAMP
ip_address VARCHAR(45)
```

## Payment Flow Diagram

```
1. User clicks "Pay" on pricing page
   ↓
2. Payment modal opens with professional form
   ↓
3. User fills in all payment details
   ↓
4. Frontend validates all fields locally
   ↓
5. Submit to /api/payments/telr endpoint
   ↓
6. Backend validates fields
   ↓
7. Extract pricing from database
   ↓
8. Generate Telr signature (SHA256 hash)
   ↓
9. Save subscription record (status: pending)
   ↓
10. Return payment form data to frontend
    ↓
11. Frontend submits form to Telr gateway
    ↓
12. User completes payment with Telr
    ↓
13. Telr redirects to success/failure page
    ↓
14. Telr webhook sends callback to /api/payments/telr/callback
    ↓
15. Backend updates subscription status (completed/failed)
    ↓
16. Send confirmation email to user
```

## Testing Payment Flow

### Development (Test Mode)
1. Telr provides test credentials in dashboard
2. Use test card numbers:
   - **Visa**: 4111 1111 1111 1111
   - **Mastercard**: 5555 5555 5555 4444
   - **CVV**: Any 3 digits
   - **Expiry**: Any future date

### Production (Live Mode)
1. Switch to live API keys
2. Replace test credentials with real ones
3. Test with small amounts first
4. Monitor transactions in Telr dashboard

## API Endpoints

### Create Payment
```
POST /api/payments/telr
Content-Type: application/json

{
  "tier": "founder-pass",
  "billingCycle": "monthly",
  "email": "user@example.com",
  "fullName": "John Doe",
  "phoneNumber": "+971501234567",
  "country": "AE",
  "city": "Dubai",
  "address": "123 Business Street",
  "businessName": "Acme Corp"
}

Response:
{
  "success": true,
  "paymentData": { ... },
  "telrPaymentUrl": "https://telr.com/gateway/process.php",
  "subscriptionId": "uuid",
  "reference": "MFC-founder-pass-1234567890-abc123"
}
```

### Payment Callback (Webhook)
Telr sends automatic POST to `/api/payments/telr/callback` with:
- `reference`: Payment reference ID
- `status`: "1" (success), "0" (failed), "A" (pending)
- `transactionId`: Telr transaction ID
- `amount`: Amount in fils (hundredths of AED)

## Security Features

✅ **Implemented**
- SSL/TLS encryption for all data transmission
- Telr PCI DSS Level 1 compliance (industry highest)
- No card details stored on your servers
- Signature-based authentication with Telr
- Secure webhook callback verification
- Input validation and sanitization
- Environment variables for sensitive data

## Monitoring & Troubleshooting

### Check Payment Status
1. Telr Dashboard → Transactions
2. Search by reference ID or email
3. View transaction details and status

### Common Issues

**Issue**: "Missing required fields" error
- **Solution**: Ensure all required fields in form are filled

**Issue**: "Payment initialization failed"
- **Solution**: 
  - Check API keys are correct
  - Verify Telr account is active
  - Check internet connection

**Issue**: "Signature mismatch"
- **Solution**:
  - Verify TELR_AUTHKEY is correct
  - Ensure TELR_STORE_ID matches your account
  - Check system time is synchronized

**Issue**: Payment redirects to Telr but doesn't complete
- **Solution**:
  - Check return/callback URLs in Telr settings
  - Verify domain is whitelisted
  - Check browser console for CORS errors

## Email Configuration

Set up SMTP for payment confirmation emails:

```env
SMTP_HOST=smtp.gmail.com          # or your email provider
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=noreply@yourdomain.com
SMTP_PASSWORD=your-app-password
```

For Gmail:
1. Create app-specific password
2. Enable 2FA on account
3. Use app password in SMTP_PASSWORD

## Next Steps

1. **Add API Keys** - Update `.env.local` with Telr credentials
2. **Configure SMTP** - Set up email notifications
3. **Test Payment Flow** - Use test credentials
4. **Review Database** - Ensure schema has all fields
5. **Monitor Webhooks** - Check callback logs
6. **Go Live** - Switch to production keys

## Support

For Telr support:
- Visit: https://telr.com/support
- Email: support@telr.com
- Phone: +971 4 xxx xxxx (check Telr website)

For application issues:
- Check console logs for detailed error messages
- Review Telr transaction history
- Verify all environment variables are set
