# My Founders Club - Project Architecture & Integration Guide

## 📋 Overview
This is a Next.js 16 (Turbopack) landing page for My Founders Club with integrated Supabase backend, AI chat assistance, and form submissions.

**Tech Stack:**
- Frontend: Next.js 16.1.6 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion
- Backend: Supabase (PostgreSQL), Next.js API Routes
- AI: Local LLM with optional OpenAI integration
- Images: High-quality optimization with `HighQualityImage` wrapper

---

## 🗄️ Database Architecture (Supabase)

### Database Schema

#### 1. **whatsapp_signups** Table
Stores WhatsApp Circle signup requests.

```sql
CREATE TABLE whatsapp_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields:**
- `id`: Unique identifier
- `first_name`: User's first name (required)
- `phone_number`: WhatsApp-enabled phone number (required)
- `email`: User's email (optional)
- `created_at`: Record creation timestamp
- `updated_at`: Last update timestamp

**API Endpoint:** `POST /api/whatsapp`

**Request Example:**
```json
{
  "first_name": "Ahmed",
  "phone_number": "+966501234567",
  "email": "ahmed@email.com"
}
```

---

#### 2. **applications** Table
Stores "Secure Your Spot" application form submissions for the accelerator program.

```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  stage VARCHAR(50),
  funding_raised VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields:**
- `first_name`, `last_name`: Applicant name
- `email`: Contact email (unique)
- `phone`: Contact number
- `company_name`: Startup/company name
- `industry`: Business sector
- `stage`: Funding stage (Pre-seed, Seed, Series A, etc.)
- `funding_raised`: Amount raised to date
- `description`: Business description/pitch
- `created_at`, `updated_at`: Timestamps

**API Endpoint:** `POST /api/applications`

**Request Example:**
```json
{
  "first_name": "Fatima",
  "last_name": "Al-Zahra",
  "email": "fatima@venture.com",
  "phone": "+966551234567",
  "company_name": "TechFlow AI",
  "industry": "AI/ML",
  "stage": "Seed",
  "funding_raised": "$500K",
  "description": "Building AI-powered supply chain optimization"
}
```

---

#### 3. **profiles** Table
Stores user profile information (post-signup/registration).

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  avatar_url VARCHAR(255),
  role VARCHAR(50),
  bio TEXT,
  phone VARCHAR(20),
  company VARCHAR(255),
  linkedin_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields:**
- `id`: Links to Supabase Auth user
- `email`: User email
- `first_name`, `last_name`: Full name
- `avatar_url`: Profile picture URL or local blob reference
- `role`: User role (founder, investor, etc.)
- `bio`: User biography
- `phone`: Contact number
- `company`: Associated company
- `linkedin_url`: LinkedIn profile link

---

### Database Setup & Migration

**File:** `supabase/init.sql`

The schema is initialized in Supabase. To migrate data from localStorage:

**File:** `lib/migrations/migrateLocalStorageToSupabase.ts`

**Usage:**
```typescript
import { migrateLocalStorageToSupabase } from '@/lib/migrations/migrateLocalStorageToSupabase'

// Call during user setup/dashboard load
await migrateLocalStorageToSupabase()
```

**What it does:**
- Reads localStorage keys: `users`, `profiles`, `applications`, `whatsapp_signups`
- Migrates data to corresponding Supabase tables
- Removes localStorage entries after successful migration
- Provides feedback on migration status

---

## 🤖 AI Assistance & LLM Integration

### Chat API Overview

**File:** `app/api/chat/route.ts`

The chat API provides an intelligent assistant with:
1. **Local Knowledge Base** - Built-in responses for My Founders Club topics
2. **Optional OpenAI Integration** - GPT-3.5/GPT-4 fallback for advanced queries
3. **Conversation History** - Context-aware responses

### Request/Response Format

**Endpoint:** `POST /api/chat`

**Request:**
```json
{
  "message": "How do I join the founders circle?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Hello"
    },
    {
      "role": "assistant",
      "content": "Hello! Welcome to My Founders Club..."
    }
  ]
}
```

**Response:**
```json
{
  "message": "You can join by clicking the 'Join the Ecosystem' button on our homepage. You'll complete a quick signup form...",
  "source": "local"
}
```

or

```json
{
  "message": "Response from OpenAI...",
  "source": "openai"
}
```

### Local Knowledge Base Topics

The chat handles queries about:
- **Enrollment/Joining** - How to join the program
- **Program Details** - What the founders circle offers
- **Events** - Upcoming events and gatherings
- **Opportunities** - Networking, mentorship, funding
- **Support** - Contact information, help resources
- **Pricing** - Membership tiers and costs
- **General AI/LLM** - About AI capabilities and limitations

**Example Query Response (Local):**
```
User: "What is the My Founders Club?"
Assistant: "The My Founders Club is a vibrant community platform designed to support founders 
and entrepreneurs across the Gulf region. We provide networking opportunities, access to mentors, 
potential investors, and exclusive events. Our goal is to Build Locally, Champion Regionally, 
and Scale Globally. Would you like to know more about membership tiers or how to join?"
```

### ChatWidget Component

**File:** `components/ChatWidget.tsx`

Features:
- Floating chat interface (bottom-right of screen)
- Message input and display
- Conversation history
- AI icon in navbar/social buttons
- Toggle open/close animation

**Usage in Components:**
```tsx
import ChatWidget from '@/components/ChatWidget'

export default function Page() {
  return (
    <>
      {/* Page content */}
      <ChatWidget />
    </>
  )
}
```

### OpenAI Integration (Optional)

**Environment Variable:**
```
OPENAI_API_KEY=sk-your-openai-key
```

**How It Works:**
1. When `OPENAI_API_KEY` is set in `.env.local`, chat requests fall back to OpenAI
2. First attempts local knowledge base responses
3. Falls back to OpenAI GPT-3.5 for complex/unknown queries
4. Cost: ~$0.0015 per message (GPT-3.5)

**Cost Estimation:**
- 1,000 messages ≈ $1.50 USD
- 10,000 messages ≈ $15 USD

**To Enable:**
1. Get API key from [OpenAI Dashboard](https://platform.openai.com/account/api-keys)
2. Add to `.env.local`:
   ```
   OPENAI_API_KEY=sk-xxx
   ```
3. Restart dev server
4. Chat will now use OpenAI for unknown questions

---

## 📋 Form Integration

### Forms Connected to Database

#### 1. **WhatsApp Circle Signup Form**
Located in: `components/sections/hero.tsx` (CTA button)

**Form Data Captured:**
- First Name
- Phone Number (WhatsApp)
- Email (optional)

**Submission Flow:**
```
Form → /api/whatsapp → Supabase whatsapp_signups table
```

**Example:**
```typescript
// Frontend
const response = await fetch('/api/whatsapp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    first_name: 'Ahmed',
    phone_number: '+966501234567',
    email: 'ahmed@email.com'
  })
})
```

---

#### 2. **Application Form (Secure Your Spot)**
Located in: `components/sections/application-form.tsx`

**Form Data Captured:**
- First & Last Name
- Email
- Phone Number
- Company Name
- Industry
- Funding Stage
- Amount Raised
- Company Description

**Submission Flow:**
```
Form → /api/applications → Supabase applications table
```

**Validation:**
- Email must be unique
- All required fields mandatory
- Phone number validation

**Example Response:**
```json
{
  "success": true,
  "message": "Application received! We'll review and contact you soon.",
  "data": {
    "id": "uuid-123",
    "email": "founder@company.com",
    "created_at": "2024-02-09T10:30:00Z"
  }
}
```

---

### API Routes Overview

#### `/api/whatsapp`
**File:** `app/api/whatsapp/route.ts`

```typescript
export async function POST(request: Request) {
  const { first_name, phone_number, email } = await request.json()
  
  // Validate
  if (!first_name || !phone_number) {
    return Response.json({ error: 'Missing fields' }, { status: 400 })
  }
  
  // Insert to Supabase
  const { data, error } = await supabase
    .from('whatsapp_signups')
    .insert([{ first_name, phone_number, email }])
  
  if (error) throw error
  return Response.json({ success: true, data })
}
```

#### `/api/applications`
**File:** `app/api/applications/route.ts`

```typescript
export async function POST(request: Request) {
  const formData = await request.json()
  
  // Validate required fields
  if (!formData.email || !formData.company_name) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }
  
  // Insert to Supabase
  const { data, error } = await supabase
    .from('applications')
    .insert([formData])
  
  if (error) throw error
  return Response.json({ success: true, data })
}
```

#### `/api/chat`
**File:** `app/api/chat/route.ts`

Returns AI-generated responses based on message and conversation history.

---

## 🔌 Supabase Integration

### Server-Side Helper
**File:** `utils/supabase/server.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

export function createSupabaseServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
```

### Client-Side Helper
**File:** `utils/supabase/client.ts`

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### Environment Variables Required

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Optional: OpenAI
OPENAI_API_KEY=sk-...
```

---

## 🖼️ Image Optimization

### HighQualityImage Component
**File:** `components/HighQualityImage.tsx`

Ensures high-quality image delivery across all platforms:

```typescript
interface HighQualityImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down'
  quality?: number // Default: 100
  priority?: boolean
  onLoad?: () => void
}
```

**Usage:**
```tsx
import HighQualityImage from '@/components/HighQualityImage'

<HighQualityImage
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  quality={100}
  objectFit="cover"
/>
```

**Features:**
- Quality: 100 by default (no compression)
- Loading skeleton indicator
- Error fallback with gradient
- Responsive sizing
- Vercel CDN optimization

---

## 🔐 Authentication

**File:** `context/auth-context.tsx`

Handles user authentication and state management:

```typescript
interface User {
  id: string
  email: string
  name?: string
}

// Usage
const { user, logout, loading } = useAuth()
```

**Auth Flow:**
1. User signs up via `/auth` page
2. Supabase Auth creates user account
3. User profile created in `profiles` table
4. LocalStorage stores session (avatar image)
5. On return, session restored from localStorage/Supabase

---

## 📊 Pages & Routing

| Route | Purpose | Auth Required |
|-------|---------|:-------------:|
| `/` | Homepage with hero, features, pricing | No |
| `/auth` | Login/Signup | No |
| `/events` | Events gallery (Luma + custom) | No |
| `/dashboard` | User dashboard (founder/investor) | Yes |
| `/settings` | User profile settings | Yes |
| `/admin` | Admin panel | Yes (Admin) |
| `/setup-profile` | Profile setup after signup | Yes |
| `/accepted` | Application accepted page | Yes |

---

## 🚀 Deployment Checklist

- [ ] Set Supabase environment variables in Vercel
- [ ] Enable CORS in Supabase for production domain
- [ ] Configure OpenAI API key (optional)
- [ ] Set up email notifications for form submissions
- [ ] Test all forms on production
- [ ] Verify image delivery on CDN
- [ ] Monitor chat API usage if using OpenAI
- [ ] Set up error tracking (Sentry recommended)
- [ ] Clear browser cache after deployment

---

## 🔧 Local Development

**Setup:**
```bash
# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase keys

# Start dev server
pnpm run dev

# Open http://localhost:3000
```

**Database:**
```bash
# Run migrations manually if needed
pnpm supabase db push
```

**Build:**
```bash
pnpm run build  # Test production build locally
pnpm run dev    # Start dev server after build
```

---

## 📞 Support & Contact

- **Email:** [support@myfoundersclub.global](mailto:support@myfoundersclub.global)
- **WhatsApp:** +966501234567
- **LinkedIn:** [My Founders Club](https://linkedin.com/company/myfoundersclub-global)
- **Instagram:** [@myfoundersclub.global](https://instagram.com/myfoundersclub.global)
- **YouTube:** [My Founders Club](https://youtube.com/@myfoundersclub.global)

---

**Last Updated:** February 9, 2026  
**Version:** 1.0
