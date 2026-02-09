# Supabase Database Setup Checklist

## ✅ QUICK START (Follow these 5 steps)

### Step 1: Create Tables in Supabase ⚙️
- [ ] Go to https://app.supabase.com and log in
- [ ] Select your project: `ibpqvfqhmecgyevjbtqo`
- [ ] Click **SQL Editor** (left sidebar)
- [ ] Click **New Query**
- [ ] Copy entire content from: `supabase/init.sql`
- [ ] Paste into the SQL editor
- [ ] Click **Run** button
- [ ] Verify: You should see 3 tables created:
  - `whatsapp_signups`
  - `applications`
  - `profiles`

### Step 2: Verify Environment Configuration ✓
- [ ] Check `.env.local` in project root
- [ ] Should contain:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://ibpqvfqhmecgyevjbtqo.supabase.co
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_m8LmfPh0IJ0g2byAa1pfSQ_WC96lNZc
  ```
- [ ] ✅ Already added! File updated with Supabase config

### Step 3: Test Form Submission 🧪
- [ ] Run development server: `pnpm dev`
- [ ] Visit homepage: http://localhost:3000
- [ ] Scroll to "Join the Founders WhatsApp Circle" section
- [ ] Fill out and submit the WhatsApp form
- [ ] Go to Supabase Dashboard → **whatsapp_signups** table
- [ ] ✅ Verify new row appears with your data

### Step 4: Test Application Form 📋
- [ ] Scroll to "Secure Your Spot" section
- [ ] Fill out and submit the application form
- [ ] Go to Supabase Dashboard → **applications** table
- [ ] ✅ Verify new row appears with all your form data

### Step 5 (Optional): Migrate Existing localStorage Data 📲
If you have **existing data in localStorage**, run this in browser console:

```javascript
// Open browser console (F12 → Console tab)
// Paste this:
import { migrateLocalStorageToSupabase, verifyMigration } from '@/lib/migrations/migrateLocalStorageToSupabase'

// Run migration
await migrateLocalStorageToSupabase()

// Verify it worked
const result = await verifyMigration()
console.log(result)
```

---

## 📊 Database Schema Reference

### Table 1: `whatsapp_signups`
```
- id (UUID, auto-generated)
- first_name (text)
- phone (text)
- created_at (timestamp, auto)
```

### Table 2: `applications`
```
- id (UUID, auto-generated)
- full_name (text, required)
- company_name (text, required)
- email (text, required)
- phone (text, required)
- one_pitch_sentence (text, required)
- proof_of_work (text, optional)
- commitment_amount (text, default: 'AED 500')
- agree_commitment (boolean, default: false)
- created_at (timestamp, auto)
```

### Table 3: `profiles`
```
- id (UUID, auto-generated)
- user_id (text, unique)
- name (text)
- company (text)
- email (text)
- phone (text)
- created_at (timestamp, auto)
```

---

## 🔗 Connection Status

✅ **Supabase Package**: Installed
- `@supabase/ssr` - v0.8.0
- `@supabase/supabase-js` - v2.95.3

✅ **Client Files**: Ready
- `utils/supabase/server.ts` - Server-side client
- `utils/supabase/client.ts` - Browser client
- `utils/supabase/middleware.ts` - Session refresh
- `middleware.ts` - Next.js middleware

✅ **API Routes**: Ready
- `app/api/whatsapp/route.ts` - WhatsApp form endpoint
- `app/api/applications/route.ts` - Applications form endpoint

✅ **Environment Variables**: Configured in `.env.local`

---

## 🆘 Troubleshooting

### Forms not submitting?
1. Check browser console for errors (F12)
2. Verify `.env.local` has Supabase URL & key
3. Verify tables exist in Supabase Dashboard
4. Check Supabase project is active

### Data not appearing in Supabase?
1. Submit form again and watch console
2. Check for error messages in browser console
3. Verify row-level policies allow INSERT (usually they do by default)
4. Try refreshing Supabase Dashboard table view

### Migration script not working?
1. Make sure you're logged in (app has user session)
2. Check localStorage has data: `localStorage.getItem('whatsapp_signups')`
3. Check browser console for error details
4. Verify Supabase key permissions

---

## 📞 Quick Links

- **Supabase Dashboard**: https://app.supabase.com
- **Project URL**: https://ibpqvfqhmecgyevjbtqo.supabase.co
- **Docs**: https://supabase.com/docs
- **Setup Guide**: `lib/SUPABASE_SETUP_GUIDE.ts`
- **Migration Utility**: `lib/migrations/migrateLocalStorageToSupabase.ts`

---

## ✨ Status: READY TO USE

Your project is now **fully connected to Supabase**! 🎉

All forms automatically save to the database when users submit them.
