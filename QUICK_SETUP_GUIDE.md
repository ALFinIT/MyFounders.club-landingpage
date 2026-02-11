# SUPABASE TABLE SETUP - QUICK START GUIDE

## ✅ What You'll Do (5 Minutes)

This guide will create the 4 required tables in your Supabase database.

---

## 📋 STEP 1: Copy the SQL Below

```sql
-- Supabase schema for landing page forms

-- WhatsApp signups
create table if not exists whatsapp_signups (
  id uuid default gen_random_uuid() primary key,
  first_name text,
  phone text,
  created_at timestamptz default now()
);

-- Newsletter signups (Beehiv)
create table if not exists newsletter_signups (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  subscribed_at timestamptz default now(),
  beehiv_synced boolean default false
);

-- Applications (Secure Your Spot)
create table if not exists applications (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  company_name text not null,
  email text not null,
  phone text not null,
  one_pitch_sentence text not null,
  proof_of_work text,
  commitment_amount text default 'AED 500',
  agree_commitment boolean default false,
  created_at timestamptz default now()
);

-- Profiles table (for user profiles)
create table if not exists profiles (
  id uuid default gen_random_uuid() primary key,
  user_id text unique,
  name text,
  company text,
  email text,
  phone text,
  created_at timestamptz default now()
);
```

**👆 Copy all the SQL above (Ctrl+C)**

---

## 🌐 STEP 2: Open Supabase Dashboard

1. Go to: **https://app.supabase.com**
2. Log in (use your Supabase account)
3. Select project: **ibpqvfqhmecgyevjbtqo**

---

## 🗂️ STEP 3: Open SQL Editor

1. In the left sidebar, click **"SQL Editor"**
2. Click **"New Query"** button (top right area)
3. You'll see a blank SQL editor

---

## 📝 STEP 4: Paste the SQL

1. Click in the SQL editor (white text area)
2. Paste the SQL you copied (Ctrl+V)
3. The editor should show the CREATE TABLE statements

---

## ▶️ STEP 5: Execute the SQL

1. Look for the **"Run"** button (usually at bottom right or top right)
2. Click **"Run"** button
3. Wait 2-3 seconds for execution
4. You should see: **"Successfully executed"** message

---

## ✔️ STEP 6: Verify Tables Created

1. In left sidebar, click **"Table Editor"**
2. Scroll down the table list
3. You should see these 4 new tables:
   - ✅ `whatsapp_signups`
   - ✅ `applications`
   - ✅ `newsletter_signups`
   - ✅ `profiles`

**If you see all 4 tables → Setup Complete! ✅**

---

## 🧪 STEP 7: Verify It Works

Return to your terminal and run:

```bash
cd e:\PROJECT\landing-page-myfounder

# Test WhatsApp API
curl -X POST http://localhost:3000/api/whatsapp -H "Content-Type: application/json" -d "{\"firstName\":\"TestUser\",\"phone\":\"+971501234567\"}"

# Should return Status 200 OK with data
```

---

## ⚠️ Troubleshooting

### Error: "relation already exists"
**This is OK!** It means tables were already created. You can ignore this error.

### Error: "permission denied"
**Check:** Make sure you're using your Supabase account that owns the project.

### Tables don't appear in Table Editor
**Wait:** Refresh the page (F5) and check again.

---

## 📞 Need Help?

If you get stuck:
1. Make sure you're in the correct Supabase project (ibpqvfqhmecgyevjbtqo)
2. Make sure you're copying ALL the SQL code
3. Make sure you click the "Run" button
4. Check that the SQL editor shows no error messages

---

## Next Steps After Tables Created

Once tables are created:

1. **Run API tests again**
   ```bash
   curl -X POST http://localhost:3000/api/whatsapp ...
   ```

2. **Check admin pages**
   - Go to: http://localhost:3000/admin/applications
   - Should show submitted data

3. **Migrate local data** (if you want to sync existing test data)
   - Run migration script (see IMPLEMENTATION_GUIDE.md)

---

**Expected Time: 5 minutes**

**Status After:** All 4 tables created and ready to use ✅
