#!/usr/bin/env node

/**
 * QUICK START: Supabase Table Creation
 * 
 * This file contains the SQL needed to create all required tables in Supabase.
 * Copy the SQL below and paste it into your Supabase SQL Editor.
 * 
 * Steps:
 * 1. Go to https://app.supabase.com
 * 2. Select your project: ibpqvfqhmecgyevjbtqo
 * 3. Click "SQL Editor" in the sidebar
 * 4. Click "New Query"
 * 5. Paste the SQL below
 * 6. Click "Run" button
 * 7. Verify tables appear in "Table Editor"
 */

// ============================================================================
// COPY AND PASTE THIS SQL INTO SUPABASE SQL EDITOR
// ============================================================================

/*
-- WhatsApp Community Signups
CREATE TABLE IF NOT EXISTS whatsapp_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Applications (Secure Your Spot)
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  one_pitch_sentence TEXT NOT NULL,
  proof_of_work TEXT,
  commitment_amount TEXT DEFAULT 'AED 500',
  agree_commitment BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter Signups (Beehiv)
CREATE TABLE IF NOT EXISTS newsletter_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  beehiv_synced BOOLEAN DEFAULT FALSE
);

-- User Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT UNIQUE,
  name TEXT,
  company TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
CREATE INDEX IF NOT EXISTS idx_whatsapp_signups_phone ON whatsapp_signups(phone);
CREATE INDEX IF NOT EXISTS idx_newsletter_signups_email ON newsletter_signups(email);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
*/

// ============================================================================
// VERIFICATION CHECKLIST
// ============================================================================

/*
After pasting the SQL above and clicking "Run", verify:

1. ✅ No error messages appear
2. ✅ Success message shown ("Query executed")
3. ✅ Go to "Table Editor" in left sidebar
4. ✅ Scroll down and see these tables:
   - whatsapp_signups
   - applications
   - newsletter_signups
   - profiles

If you see these tables, setup is complete! 🎉

You can now:
1. Test form submissions on your landing page
2. Check data appears in Supabase Table Editor
3. Verify admin pages show the data

*/

// ============================================================================
// TROUBLESHOOTING
// ============================================================================

/*
Q: I see an error "relation already exists"
A: The tables were already created. You can safely ignore this error.
   Tables are working correctly.

Q: Tables created but API still returns errors
A: Clear your browser cache and restart the dev server:
   1. Kill the running dev server (Ctrl+C)
   2. Run: npm run dev
   3. Try submitting a form again

Q: I accidentally deleted a table
A: Run the SQL again to recreate it. Existing data will be preserved.

Q: Can I modify the schema later?
A: Yes! You can add columns or indexes anytime. 
   To modify existing columns, use ALTER TABLE in Supabase SQL Editor.

*/
