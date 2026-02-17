# MyFoundersClub - Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Git

### Installation Steps

#### 1. Clone & Install
```bash
git clone <repo-url>
cd landing-page-myfounder
npm install
# or
pnpm install
```

#### 2. Environment Setup
Create `.env.local` in project root:

```bash
# Optional: Supabase Configuration (leave empty for localStorage-only mode)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: Email Service
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

#### 3. Start Development Server
```bash
npm run dev
```

Server starts on `http://localhost:3000`

#### 4. Build for Production
```bash
npm run build
npm start
```

## Features by Mode

### Mode 1: Development (localStorage only)
- **Auth**: Username/password stored in localStorage
- **Profiles**: Stored in browser localStorage
- **No Backend**: Fully client-side (for testing/demo)
- **Data Persistence**: Lost on browser cache clear

**Use Case**: Local development, prototyping, demos

### Mode 2: Production (with Supabase)
- **Auth**: Supabase authentication
- **Profiles**: Persisted to Supabase database
- **Backend**: RESTful API for data operations
- **Data Persistence**: Permanent storage

**Setup Supabase**:
1. Create account at supabase.com
2. Create new project
3. Copy URL and keys to `.env.local`
4. Create tables (see SUPABASE_SETUP_CHECKLIST.md for schema)

## Project Configuration Files

### `package.json`
- Dependencies: Next.js, React, Tailwind, Framer Motion, Radix UI
- Scripts: `dev`, `build`, `start`, `lint`

### `next.config.mjs`
- Image optimization with remote patterns
- TypeScript strict mode
- Turbopack settings

### `tailwind.config.ts`
- Custom color palette
- Component defaults
- Animation utilities

### `tsconfig.json`
- Path aliases: `@/*` for easy imports
- Build target settings

## Directory Structure

```
project/
├── app/                    # Next.js App Router
├── components/             # React components
├── context/               # React Context (auth, profile)
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities
├── public/                # Static assets
├── styles/                # Global styles
├── utils/                 # Helper functions
├── .env.local             # Environment variables
├── next.config.mjs        # Next.js config
├── tailwind.config.ts     # Tailwind config
├── tsconfig.json          # TypeScript config
└── package.json           # Dependencies
```

## Common Tasks

### Add New Page
```bash
# Create route folder
mkdir -p app/new-page

# Create page.tsx
touch app/new-page/page.tsx

# Add content:
export default function NewPage() {
  return <div>New Page</div>
}
```

### Add New Component
```bash
# Create in components/
touch components/my-component.tsx

# Import in page:
import MyComponent from '@/components/my-component'
```

### Style a Component
```typescript
// Use Tailwind classes
<div className="rounded-lg p-6 bg-white/5 border border-white/10">
  Content
</div>
```

### Add Animation
```typescript
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## Troubleshooting

### Port Already in Use
```bash
# Kill existing process
Get-Process node | Stop-Process -Force

# Start fresh
npm run dev
```

### Build Errors
```bash
# Clear build cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### localStorage Not Working
- Check browser DevTools → Application → localStorage
- Clear cache and restart

### Supabase Connection Failed
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check internet connection
- Confirm API keys in `.env.local`

## Deployment

### Deploy to Vercel
```bash
vercel
```

### Deploy to Other Platforms
1. Build: `npm run build`
2. Start: `npm start`
3. Environment: Set same `.env.local` variables in platform

## Testing Accounts (Development)

**Founder Account**:
- Email: founder@test.com
- Password: TestPassword123!
- Role: Founder

**Investor Account**:
- Email: investor@test.com
- Password: TestPassword123!
- Role: Investor

## Support & Documentation

- **README_CURRENT.md**: Feature overview
- **ARCHITECTURE.md**: Technical details
- **terms/page.tsx**: Terms of Service
- **privacy/privacy-policy/page.tsx**: Privacy Policy

---

**Setup Version**: 1.0
**Last Updated**: February 17, 2026
