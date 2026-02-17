# My Founders Club (MFC) - Landing Page Project Documentation

**Project Name:** My Founders Club Landing Page  
**Current Date:** February 6, 2026  
**Status:** Active Development - Phase 1 Complete

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Completed Features](#completed-features)
3. [Technical Stack](#technical-stack)
4. [Project Structure](#project-structure)
5. [Design System](#design-system)
6. [Authentication & User Management](#authentication--user-management)
7. [Data Management](#data-management)
8. [Features by Section](#features-by-section)
9. [Future Modifications & Enhancements](#future-modifications--enhancements)
10. [Known Issues & To-Do Items](#known-issues--to-do-items)

---

## 🎯 Project Overview

**My Founders Club (MFC)** is a comprehensive platform connecting founders, investors, and mentors across the Gulf startup ecosystem. The landing page serves as the primary entry point, showcasing the platform's value proposition and guiding users through signup, profile setup, and dashboard access.

**Key Objectives:**
- Connect 500+ founders with investors and mentors
- Provide curated market insights for Gulf startups
- Enable seamless networking and collaboration
- Support both Founder and Investor user types with role-based experiences

---

## ✅ Completed Features

### 1. **Authentication System**
- ✅ Complete signup/login flow at `/auth`
- ✅ Email validation and password matching
- ✅ User credential storage in localStorage
- ✅ Persistent login state across sessions
- ✅ Logout functionality with data cleanup
- ✅ Auth context for global user state management

### 2. **Landing Page UI**
- ✅ Responsive navbar with user authentication UI
- ✅ Avatar circle display (when logged in) with dropdown menu
- ✅ "Join" button (when not logged in)
- ✅ User dropdown menu with Settings, Logout, and social icons
- ✅ Fixed navbar positioning with smooth transitions
- ✅ Mobile responsive hamburger menu

### 3. **Hero Section**
- ✅ Headline: "Build Locally. Champion Regionally. Scale Globally."
- ✅ Tagline about Gulf startup ecosystem
- ✅ Two CTA buttons: "Join the Ecosystem" & "Explore the Platform"
- ✅ Social proof with 500+ founders avatar circles
- ✅ Smooth animations with Framer Motion
- ✅ Left-aligned content layout
- ✅ Removed dark overlay - pure MFC theme background

### 4. **Post-Signup Profile Form** (`/setup-profile`)
- ✅ Role selection (Founder/Investor) with visual cards
- ✅ Dynamic form fields based on selected role
- ✅ Founder fields: name, email, company, stage, sector, location, co-founder needed, description, LinkedIn, Twitter
- ✅ Investor fields: name, email, fund name, investment stage, sector focus (multi-select), geography focus (multi-select), check size, portfolio companies, LinkedIn, website
- ✅ Dropdown styling (black background, white text)
- ✅ localStorage persistence
- ✅ Home button with back navigation
- ✅ Social media icons (X, LinkedIn, Instagram, Home)

### 5. **AI-Powered Chatbot**
- ✅ OpenAI GPT-3.5-turbo integration (optional)
- ✅ Built-in knowledge base fallback with keyword matching
- ✅ Conversation history tracking
- ✅ Real-time message UI with typing indicators
- ✅ Input validation and error handling
- ✅ Integrated into setup-profile page

### 6. **User Settings Page** (`/settings`)
- ✅ Profile picture upload and display
- ✅ Camera icon button in edit mode
- ✅ Base64 image storage in localStorage
- ✅ Name editing (editable)
- ✅ Email display (read-only)
- ✅ Role display (Founder/Investor badge)
- ✅ Edit/Save/Cancel functionality
- ✅ Role-specific profile fields display:
  - **Founder:** Company, Stage, Sector, Location, Co-founder needed, Description, LinkedIn, Twitter
  - **Investor:** Fund Name, Investment Stage, Check Size, Portfolio Companies, LinkedIn, Website
- ✅ Account deletion with confirmation modal
- ✅ Back button to landing page

### 7. **Landing Page Sections**
- ✅ **Problem Section** - 3 key challenges: Fragmented Ecosystem, Limited Capital Access, Knowledge Gaps
- ✅ **How It Works** - 3 step process: Connect, Collaborate, Scale
- ✅ **Features Section** - 6 feature cards: Founder Network, Investor Directory, Market Insights, Growth Tools, Mentorship Hub, Global Expansion
- ✅ **Social Proof** - Carousel of trusted Gulf companies (Zain, Aramco, ADIB, Noon, Careem, etc.)
- ✅ **Community Showcase** - Statistics and testimonials from founders
- ✅ **WhatsApp CTA** - Email signup form with benefits list
- ✅ **Stats Section** - Key metrics: 500+ Active Founders, 150+ Angel Investors, 25+ Venture Funds, 1000+ Monthly Opportunities
- ✅ **Pricing Section** - 3 tiers: Founder (Free), Scale ($49/month), Enterprise (Custom)
- ✅ **Footer** - Company links, contact info, social media

### 8. **Styling & Design**
- ✅ **MFC Theme Background** - Fixed image background across all pages
- ✅ **Light black gradient overlay** - Semi-transparent (20-30% opacity) for text readability
- ✅ **Matte black cards** - `bg-black/60` with subtle shine effects
- ✅ **Shimmer effects** - Gradient overlays creating luxurious sheen
- ✅ **Tailwind CSS** - Utility-first styling
- ✅ **Framer Motion** - Smooth animations and interactions
- ✅ **Glass morphism effects** - Backdrop blur with transparency
- ✅ **Orange gradient theme** - Primary: #FF5B23, Secondary: #3E5C5E (Teal)

### 9. **Navigation & Scrolling**
- ✅ **Smooth scrolling** - `scroll-behavior: smooth` enabled
- ✅ **Hidden scrollbar** - Clean appearance across all browsers
- ✅ **Fixed navbar** - Stays visible during scroll
- ✅ **Mobile responsive** - Hamburger menu for small screens

### 10. **Data Persistence**
- ✅ **localStorage implementation** for:
  - User data (users array)
  - Profile data (profiles array - Founder/Investor specific)
  - User images (base64 encoded)
  - Auth state

---

## 🛠️ Technical Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |
| **State Management** | React Context API |
| **Data Storage** | localStorage (temporary) |
| **API Integration** | OpenAI (optional) |
| **Image Handling** | Next.js Image component |
| **Build Tool** | Next.js with pnpm |

---

## 📁 Project Structure

```
landing-page-myfounder/
├── app/
│   ├── globals.css              # Global styles, backgrounds, scrollbar hiding
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Landing page
│   ├── auth/
│   │   └── page.tsx             # Authentication (signup/login)
│   ├── settings/
│   │   └── page.tsx             # User profile & settings management
│   ├── setup-profile/
│   │   └── page.tsx             # Post-signup profile completion form
│   └── api/
│       └── chat/
│           └── route.ts         # Chatbot API endpoint
├── components/
│   ├── navbar.tsx               # Main navigation bar
│   ├── logo.tsx                 # MFC logo component
│   ├── theme-provider.tsx        # Theme configuration
│   ├── sections/
│   │   ├── hero.tsx             # Hero section (left-aligned)
│   │   ├── problem.tsx          # Problem/challenge section
│   │   ├── how-it-works.tsx      # 3-step process
│   │   ├── features.tsx         # 6 feature cards
│   │   ├── social-proof.tsx      # Company logos carousel
│   │   ├── community-showcase.tsx # Community stats & testimonials
│   │   ├── whatsapp-cta.tsx      # WhatsApp signup section
│   │   ├── stats.tsx            # Key metrics section
│   │   ├── pricing.tsx          # 3-tier pricing table
│   │   └── footer.tsx           # Footer (black background)
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       ├── form.tsx
│       ├── accordion.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       └── [40+ other UI components]
├── context/
│   ├── auth-context.tsx         # Authentication state
│   └── profile-context.tsx      # User profile data (Founder/Investor)
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   ├── animations.ts
│   └── utils.ts
├── providers/
│   └── smooth-scroll.tsx        # Smooth scrolling provider
├── public/
│   ├── MFC theme.png            # Background image
│   ├── App Icon Orange.svg
│   ├── Main Logo Icon White.png
│   └── [other assets]
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
├── package.json
└── pnpm-lock.yaml
```

---

## 🎨 Design System

### Color Palette
- **Primary Orange:** `#FF5B23` (CTA buttons, highlights)
- **Secondary Teal:** `#3E5C5E` (Accents, secondary text)
- **Dark Background:** `#050505` - `#0a0a0a` (With MFC theme overlay)
- **Card Background:** `rgba(0, 0, 0, 0.6)` (Matte black with shine)
- **Text Colors:** White for primary, gray-400 for secondary

### Typography
- **Font Family:** Inter (default), Space Mono (code/special)
- **Headings:** Bold, tracking-tight
- **Body:** Regular weight, 16px base

### Components
- **Buttons:** Gradient fills, smooth hover effects, shadow effects
- **Cards:** Glass morphism + matte black + subtle shine
- **Forms:** Black input fields, orange focus states
- **Badges:** Orange gradients for highlights
- **Borders:** White with 10-15% opacity

### Animations
- **Smooth Scroll:** CSS scroll-behavior
- **Framer Motion:** Scale, opacity, Y-position transforms
- **Hover Effects:** 1.05 scale, slight elevation
- **Loading States:** "Thinking..." indicator, disabled states

---

## 🔐 Authentication & User Management

### Auth Flow
1. **Signup:** User enters email + password → validation → created in localStorage
2. **Login:** Email + password validation → set active user
3. **Logout:** Clear user session → redirect to home
4. **Profile Setup:** After signup → role selection → form completion

### User Data Structure
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  password: string; // hashed in production
}
```

### Auth Context
- **`useAuth()` hook** - Access current user and auth functions
- **`signup(email, password, name)`** - Create new user
- **`login(email, password)`** - Authenticate user
- **`logout()`** - Clear session
- **Persistent state** - Saved to localStorage

---

## 💾 Data Management

### Profile Context
Manages role-specific user profiles with two types:

#### Founder Profile
```typescript
interface FounderProfile {
  userId: string;
  type: 'founder';
  name: string;
  email: string;
  company: string;
  stage: string;
  sector: string;
  location: string;
  cofounderNeeded: boolean;
  description: string;
  socialLinks: { linkedin?: string; twitter?: string };
}
```

#### Investor Profile
```typescript
interface InvestorProfile {
  userId: string;
  type: 'investor';
  name: string;
  email: string;
  fundName: string;
  investmentStage: string;
  sectorFocus: string[];
  geographyFocus: string[];
  checkSize: string;
  portfolioCompanies: string;
  linkedin?: string;
  website?: string;
}
```

### Data Storage
- **User credentials:** `localStorage['users']` (JSON array)
- **Profiles:** `localStorage['profiles']` (JSON array)
- **User images:** `localStorage['user_image_${userId}']` (Base64)
- **Current user:** `localStorage['user']` (Current session)

### Supabase Integration
**Setup & Configuration:**
- Environment variables (see `.env.example`):
  - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL (public)
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` - Anon/publishable key (safe for browser)
  - `SUPABASE_SERVICE_ROLE_KEY` - Service role key (private, server-only, for enhanced security)

**Supabase Client Utilities:**
- `utils/supabase/server.ts` - Server-side Supabase client for API routes and server components
- `utils/supabase/client.ts` - Browser-side Supabase client for client components
- `utils/supabase/middleware.ts` - Middleware for session refresh and cookie management
- `middleware.ts` - Root middleware that handles user session persistence

**API Routes (Form Submissions):**
-- `POST /api/whatsapp` - receives `{ firstName, phone }` and inserts into `whatsapp_signups` table
-- `POST /api/applications` - receives application form data and inserts into `applications` table
- Both routes use the server-side Supabase client for secure database operations

**Database Schema:**
- Tables created in `supabase/init.sql`:
  - `whatsapp_signups` - Stores WhatsApp circle signup attempts
  - `applications` - Stores "Secure Your Spot" form submissions
  - `profiles` - Stores user profile data (future use)
- To apply: Copy SQL from `supabase/init.sql` into Supabase SQL editor

**Security Best Practices:**
- Publishable key is safe in environment variables (sent to browser)
- Service role key is private; store only in `.env.local` (development) or platform secrets (production)
- Middleware automatically refreshes user sessions via cookies
- Row-level policies can be added in Supabase to restrict unauthorized access

> ⚠️ **Important:** Never commit `.env.local` or service role keys to the repository. Use `.env.example` as a template.

---

## 📄 Features by Section

### Navbar
- Logo with text "My Founders Club"
- Navigation links (responsive)
- User avatar (when logged in) with dropdown
- Join button (when not logged in)
- Mobile hamburger menu

### Hero Section
- **Left-aligned content** (changed from center)
- Headline: "Build Locally. Champion Regionally. Scale Globally."
- Tagline about Gulf ecosystem
- Two CTA buttons
- Social proof avatars (1, 2, 3, 4) + "Join 500+ founders"
- Scroll indicator at bottom
- Framer Motion animations

### Problem Section
- Title: "The Challenge"
- Description text
- 3 problem cards:
  1. Fragmented Ecosystem
  2. Limited Capital Access
  3. Knowledge Gaps

### How It Works
- Title: "How It Works"
- 3-step process with icons:
  1. Connect
  2. Collaborate
  3. Scale

### Features Section
- Title: "Everything You Need to Succeed"
- 6 feature cards with icons:
  1. Founder Network
  2. Investor Directory
  3. Market Insights
  4. Growth Tools
  5. Mentorship Hub
  6. Global Expansion

### Social Proof
- Carousel of 8 company logos (auto-scrolling)
- Zain, Aramco, ADIB, Noon, Careem, Talabat, Namshi, Fetchr

### Community Showcase
- Large image + stats on right
- 500+ Active Founders
- 150+ Investors Connected
- 50+ Countries Reached
- Testimonial cards carousel

### WhatsApp CTA
- Title: "Join the 500+ Community Today"
- Description about WhatsApp benefits
- Email + phone input form
- "Join WhatsApp Community" button
- 4 benefits listed
- "No spam" assurance

### Stats Section
- Title: "By the Numbers"
- 4 stat cards:
  - 500+ Active Founders
  - 150+ Angel Investors
  - 25+ Venture Funds
  - 1000+ Monthly Opportunities
- CTA button

### Pricing Section
- Title: "Simple, Transparent Pricing"
- 3 pricing tiers:
  1. **Founder** - Free (most basic)
  2. **Scale** - $49/month (most popular)
  3. **Enterprise** - Custom (for established players)
- Feature lists per tier
- "Get Started" buttons
- Note about WhatsApp community inclusion

### Footer
- **Black gradient background** (different from rest of page)
- Top CTA section: "Your Ecosystem Awaits"
- 4 link columns: Product, Company, Resources, Legal
- Contact info: Email, address, phone
- Social media icons: GitHub, LinkedIn, Twitter
- Copyright notice

---

## 🚀 Future Modifications & Enhancements

### Phase 2: Backend Integration
- [ ] Replace localStorage with database (PostgreSQL/MongoDB)
- [ ] Implement real authentication (JWT tokens)
- [ ] Create REST API endpoints for all operations
- [ ] Add email verification for signup
- [ ] Implement password reset functionality
- [ ] Add OAuth2 (Google, LinkedIn, etc.)

### Phase 3: Advanced Features
- [ ] WhatsApp Business API integration (CRM)
- [ ] Video/image upload to cloud storage (AWS S3/Cloudinary)
- [ ] Email notifications system
- [ ] Real-time notifications
- [ ] Search & filter functionality
- [ ] Advanced analytics dashboard

### Phase 4: User Experience
- [ ] Personalized onboarding flow
- [ ] User preferences/settings page (expanded)
- [ ] Dark/light mode toggle
- [ ] Multi-language support (Arabic, English)
- [ ] Accessibility improvements (WCAG 2.1)
- [ ] Progressive web app (PWA) features

### Phase 5: Community Features
- [ ] Direct messaging between users
- [ ] Notification system
- [ ] User profiles with bios/achievements
- [ ] Follow/connection system
- [ ] Event creation and management
- [ ] Resource library with downloads

### Phase 6: Analytics & Admin
- [ ] Admin dashboard
- [ ] User analytics
- [ ] Performance monitoring
- [ ] Email campaign system
- [ ] User segmentation
- [ ] A/B testing framework

---

## 🎯 Possible Modifications by Component

### Navbar
**Can Modify:**
- Logo style/text
- Navigation links and order
- Dropdown menu items
- Color scheme
- Mobile breakpoint
- Avatar size and style

### Hero Section
**Can Modify:**
- Headline text and styling
- Button text, colors, and actions
- Social proof avatars count
- Animations and timing
- Background image/overlay intensity
- Content alignment (currently left)

### Cards & Components
**Can Modify:**
- Card styling (currently matte black with shine)
- Border radius values
- Shadow intensity
- Hover animations
- Icon styles and colors
- Text content and formatting

### Sections
**Can Modify:**
- Section titles and descriptions
- Card layouts (grid columns)
- Animation timings
- Spacing and padding
- Icon choices
- Feature lists

### Forms
**Can Modify:**
- Input field styling
- Validation rules
- Form layout
- Button text and styles
- Error message styling
- Required fields

---

## ⚠️ Known Issues & To-Do Items

### Current Issues
- [ ] **Scrollbar:** Hidden successfully, but scroll behavior could be enhanced with custom scroll progress indicator
- [ ] **Mobile Responsiveness:** Some sections need padding adjustments for mobile
- [ ] **Performance:** Large image background may need optimization for slow connections
- [ ] **localStorage Limits:** 5-10MB limit - needs DB for production

### Security Considerations
- [ ] Password hashing (currently stored in plain text - security risk!)
- [ ] HTTPS enforcement
- [ ] CSRF protection
- [ ] XSS prevention
- [ ] Rate limiting on forms
- [ ] Input sanitization

### Data Validation
- [ ] Email format validation
- [ ] Phone number validation
- [ ] URL validation for social links
- [ ] File size limits for image upload
- [ ] Form field required checks

### To-Do Items
- [ ] Add user avatar image upload validation
- [ ] Implement form validation messages
- [ ] Add success/error toast notifications
- [ ] Create 404 page for invalid routes
- [ ] Add loading skeletons for images
- [ ] Optimize images for different screen sizes
- [ ] Add breadcrumb navigation
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Implement SEO meta tags

---

## 📞 Contact & Support

**Project Owner:** My Founders Club Team  
**Last Updated:** February 6, 2026  
**Current Phase:** Phase 1 - MVP Complete  
**Next Milestone:** Backend Integration Planning

---

## 📝 Notes

- All changes should maintain the MFC color scheme (Orange #FF5B23 + Teal #3E5C5E)
- Keep animations smooth but not distracting
- Maintain accessibility standards
- Test on multiple devices before deployment
- Update this documentation with each major change

---

**This document should be updated as the project evolves. Last updated: February 6, 2026**
