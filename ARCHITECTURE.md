# MyFoundersClub - Technical Architecture

## System Overview

### Tech Stack
- **Framework**: Next.js 16.1.6 (Turbopack)
- **Styling**: Tailwind CSS + Framer Motion
- **Components**: Radix UI (Select, buttons, inputs)
- **State Management**: React Context (auth, profile)
- **Storage**: localStorage + Supabase (optional)
- **Deployment**: Vercel-ready

### Core Modules

#### 1. Authentication Module (`context/auth-context.tsx`)

**Type Definition**:
```typescript
interface User {
  id: string
  email: string
  name: string
  role?: 'founder' | 'investor' | 'both'
}
```

**Methods**:
- `signup(email, password, name, role)` - Create user with role
- `login(email, password)` - Authenticate user
- `logout()` - Clear session
- `deleteAccount()` - Remove user data

**Storage**: User object saved to `localStorage['user']`

#### 2. Profile Module

**Founder Profile Schema**:
```typescript
{
  user_id: string
  role: 'founder'
  company_name: string
  company_description: string
  funding_stage: 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c+'
  industries: string[]
  amount_raised: string | null
  currently_raising: boolean
  target_raise_amount: string | null
  funding_use_case: string | null
  monthly_growth_rate: string | null
  target_markets: string | null
  linkedin_profile: string | null
  full_name: string | null
  kyc_verified: boolean
  created_at: ISO8601
}
```

**Investor Profile Schema**:
```typescript
{
  user_id: string
  role: 'investor'
  investment_focus: 'angel' | 'seed' | 'growth' | 'corporate-vc' | 'fund-manager'
  ticket_size: string
  preferred_industries: string[]
  preferred_stages: string[]
  geographic_preference: string
  years_of_experience: string | null
  previous_investments: string | null
  expertise_areas: string | null
  value_proposition: string | null
  mentorship_interest: boolean
  full_name: string | null
  verification_status: 'pending' | 'verified'
  created_at: ISO8601
}
```

**Storage Locations**:
- Founders: `localStorage['founder_profiles']` or Supabase `founder_profiles` table
- Investors: `localStorage['investor_profiles']` or Supabase `investor_profiles` table

#### 3. UI Layer

**Theme System**:
- **Background**: MFC theme image (`/MFC%20theme.png`) with 80% dark overlay
- **Color Palette**:
  - Primary Orange: `#FF5B23`
  - Secondary Blue: `#3B82F6`
  - Dark Background: `#000000` with transparency overlays
  - Light Text: `#FFFFFF` with text shadows

**Component Library**:
- Radix UI Select (themed with `bg-white/5`, `border-white/10`)
- Framer Motion animations (fade, scale, slide)
- Custom glass-morphism cards with `backdrop-blur-xl`

**Responsive Breakpoints**:
- Mobile: < 640px (single column)
- Tablet: 640px - 1024px (2 columns)
- Desktop: > 1024px (3+ columns)

#### 4. Routing & Navigation

**Auth Flow**:
```
Landing Page
    ↓ (Click role card)
Auth Page?role=founder/investor
    ↓ (Signup with role)
Setup Profile
    ↓ (Complete 4-step form)
Dashboard/founder or /dashboard/investor
```

**Dashboard Routing**:
```
/dashboard
    ↓ (Check user.role)
/dashboard/founder (if founder)
or
/dashboard/investor (if investor)
```

#### 5. Data Persistence

**Primary: localStorage**
- Key: `user` - Current authenticated user
- Key: `founder_profiles` - Array of founder profiles
- Key: `investor_profiles` - Array of investor profiles
- Key: `users` - User database (for authentication)

**Secondary: Supabase (Optional)**
- Tables: `founder_profiles`, `investor_profiles`, `profiles`
- Fallback logic: Try Supabase → catch error → use localStorage

**Error Handling**:
```typescript
try {
  const supabase = createSupabaseClient()
  await supabase.from('founder_profiles').upsert(payload)
} catch (err) {
  console.warn('Supabase failed, using localStorage')
  const profiles = JSON.parse(localStorage.getItem('founder_profiles') || '[]')
  profiles.push(payload)
  localStorage.setItem('founder_profiles', JSON.stringify(profiles))
}
```

## Page Architecture

### Public Pages
- `/` - Landing page with "Who It's For" section
- `/auth` - Login/Signup with role selection
- `/terms` - Terms & Conditions
- `/privacy/privacy-policy` - Privacy Policy
- `/about/about-us` - About page
- `/events` - Events listing

### Protected Pages (Require Auth)
- `/setup-profile` - Profile completion form
- `/dashboard/founder` - Founder dashboard
- `/dashboard/investor` - Investor dashboard
- `/settings` - User settings

### Route Guards
- Check `useAuth()` hook
- Redirect to `/auth` if not authenticated
- Check role-based dashboard access

## Component Hierarchy

### Profile Forms
- **FounderProfileForm**: 4-step form with progress bar
  - Inputs: TextInput, CheckBox, Textarea, ButtonGroup
  - Validation: Required field checks
  - Submission: Supabase upsert + localStorage fallback

- **InvestorProfileForm**: 4-step form with progress bar
  - Inputs: RadioButton, MultiSelect, TextArea
  - Validation: Required field checks
  - Submission: Supabase upsert + localStorage fallback

### Dashboard Components
- **FounderDashboard**: Stats grid + Company profile + Quick actions
- **InvestorDashboard**: Stats grid + Investment profile + Quick actions

### Shared Components
- **Logo**: Branded logo component
- **Navbar**: Navigation with logout button
- **Footer**: Links to Terms, Privacy, Social
- **WhoItForSection**: Two role cards with CTAs

## API Routes (Optional Backend)

**Structure**: `/app/api/[feature]/route.ts`

Future endpoints:
- `POST /api/auth/signup` - Create user
- `POST /api/auth/signin` - Login user
- `GET /api/profiles/founder/[userId]` - Get founder profile
- `GET /api/profiles/investor/[userId]` - Get investor profile
- `GET /api/matches` - Get recommendations (matching algorithm)

## Performance Optimizations

- **Image Optimization**: Next.js Image component with `next/image`
- **Code Splitting**: Dynamic imports for heavy components
- **Caching**: Turbopack caching for faster builds
- **CSS**: Tailwind purging unused styles

## Security Considerations

- **Client-Side Only**: Currently no backend auth (proof-of-concept)
- **localStorage**: Not secure for production (use secure cookies/JWT)
- **Terms Acceptance**: Required checkbox during signup
- **KYC Fields**: Placeholder fields for future verification integration
- **HTTPS**: Required for production deployment

## Future Enhancements

1. **Backend Authentication**: Migrate to proper auth service (Auth0, Supabase Auth)
2. **Matching Algorithm**: Recommendation engine for founder-investor matching
3. **Database**: Full Supabase integration with tables
4. **Notifications**: Real-time updates for matches/messages
5. **Payments**: Payment processing for premium features
6. **Admin Dashboard**: Moderation and analytics

---

**Architecture Version**: 1.0
**Last Updated**: February 17, 2026
