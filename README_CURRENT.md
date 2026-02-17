# MyFoundersClub - Complete Platform

**A role-based ecosystem connecting founders and investors in the Gulf region.**

## 🚀 What's Implemented

### Platform Architecture
- **Role-Based System**: Founder / Investor / Both roles
- **Multi-Step Onboarding**: Guided profile completion for each role
- **Dynamic Dashboards**: Role-specific interfaces (Founder & Investor)
- **Landing Page Redesign**: "Who It's For" section with role CTAs
- **Consistent Branding**: MFC theme applied globally across all pages

### Core Features

#### 1. **Authentication & Roles**
- Sign up with role selection (Founder, Investor, or Both)
- Country selection during signup (GCC region)
- Terms & Conditions acceptance required
- Role-based redirects to appropriate dashboards

#### 2. **Founder Profile Setup** (4-Step Form)
- **Step 1**: Company Info (name, description, funding stage, industries)
- **Step 2**: Funding (amount raised, currently raising, target raise)
- **Step 3**: Growth (monthly growth rate, target markets, LinkedIn)
- **Step 4**: KYC (full name, verification status)

#### 3. **Investor Profile Setup** (4-Step Form)
- **Step 1**: Investment Profile (focus, ticket size, industries, stages)
- **Step 2**: Criteria (geography, experience, previous investments)
- **Step 3**: Value Add (expertise, value proposition, mentorship interest)
- **Step 4**: KYC & Verification

#### 4. **Role-Specific Dashboards**
- **Founder Dashboard**: Profile strength, investor matches, applications sent, KYC status, company details, quick actions
- **Investor Dashboard**: Active deals, founder matches, portfolio companies, investment profile, quick actions

#### 5. **Global Design System**
- Dark theme with MFC background image + dark overlay (80% opacity)
- Orange accents (#FF5B23) for Founders
- Blue accents for Investors
- Responsive design (mobile-first)
- Framer Motion animations
- Glass morphism cards

## 📂 Project Structure

```
app/
├── page.tsx                    # Landing page with "Who It's For" section
├── auth/
│   ├── page.tsx              # Auth router
│   └── auth-content.tsx       # Login/Signup form with role selection
├── setup-profile/
│   └── page.tsx              # Dynamic profile form router
├── dashboard/
│   ├── page.tsx              # Dashboard router (redirects by role)
│   ├── founder/
│   │   └── page.tsx          # Founder-specific dashboard
│   └── investor/
│       └── page.tsx          # Investor-specific dashboard
├── terms/
│   └── page.tsx              # Terms & Conditions
├── privacy/
│   └── privacy-policy/       # Privacy Policy
│       └── page.tsx
└── settings/
    └── page.tsx              # User settings

components/
├── sections/
│   ├── who-it-for.tsx        # "Who It's For" section
│   ├── hero.tsx
│   ├── problem.tsx
│   ├── how-it-works.tsx
│   ├── features.tsx
│   └── footer.tsx            # Links to contract pages
├── founder-profile-form.tsx  # Founder profile form component
├── investor-profile-form.tsx # Investor profile form component
└── ui/
    └── select.tsx            # Themed dropdown

context/
├── auth-context.tsx          # Auth state with role management
└── profile-context.tsx

utils/
├── localDb.ts                # Local storage utilities
└── supabase/                 # Supabase client
    └── client.ts
```

## 🔄 User Flow

### New User Sign-Up
1. **Landing Page** → Click role card (Founder/Investor)
2. **Auth Page** → Role pre-filled, enter name/email/password/country, accept terms
3. **Profile Setup** → 4-step guided form collection
4. **Dashboard** → Land on role-specific dashboard

### Data Storage
- **localStorage**: Primary storage for development
- **Supabase**: Optional backend (with fallback to localStorage)
- **Tables**: `founder_profiles`, `investor_profiles`, `profiles`

## 🎨 Design Highlights

- **Background**: MFC theme image with 80% dark overlay across all pages
- **Colors**: 
  - Orange (#FF5B23) - Primary / Founder accent
  - Blue (Investor accent)
  - White/Gray - Text hierarchy
- **Typography**: Dark backgrounds with light text + drop shadows for readability
- **Animations**: Smooth Framer Motion transitions, hover effects on cards
- **Responsive**: Mobile-first approach, fully responsive UI

## 📋 Terms & Conditions

All users must accept Terms & Conditions during signup. See `/terms` page for full legal text. The contract covers:
- User responsibilities
- Data usage and privacy
- KYC requirements
- Dispute resolution
- Service limitations

## 🔒 Security & KYC

- **Profile Verification**: Both roles have KYC fields to enable verified connections
- **Data Privacy**: See `/privacy/privacy-policy` for data handling
- **Terms Acceptance**: Required for signup completion

## 🚀 Getting Started

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for installation and environment configuration.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for technical implementation details.

---

**Last Updated**: February 17, 2026
**Status**: ✅ Production Ready
