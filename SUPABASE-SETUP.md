# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New Project**
3. Give it a name (e.g., "solar-website")
4. Set a database password (save this somewhere safe)
5. Choose a region close to your users
6. Click **Create new project**

## Step 2: Create the Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Run this SQL:

```sql
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address VARCHAR(500) NOT NULL,
  property_type VARCHAR(50) NOT NULL,
  electric_bill VARCHAR(50) NOT NULL,
  timeline VARCHAR(50) NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (recommended)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anonymous users
CREATE POLICY "Allow anonymous inserts" ON contact_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create policy to allow reading (for admin dashboard later)
CREATE POLICY "Allow authenticated reads" ON contact_submissions
  FOR SELECT TO authenticated
  USING (true);
```

## Step 3: Get Your API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (safe to use in browser)

## Step 4: Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add these two variables:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon public key |

4. Click **Save**
5. **Redeploy** your site for changes to take effect

## Step 5: Test the Form

1. After redeploying, submit a test form on your site
2. Go to Supabase dashboard → **Table Editor** → **contact_submissions**
3. You should see your test submission!

## Viewing Submissions

**Option 1: Supabase Dashboard**
- Go to Table Editor → contact_submissions
- View, filter, and export data directly

**Option 2: SQL Query**
```sql
SELECT * FROM contact_submissions ORDER BY created_at DESC;
```

## Local Development

For local development, create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Why Supabase?

- **Free tier**: 500 MB database, 50,000 monthly active users
- **Built-in dashboard**: View submissions without code
- **Real-time**: Can add live notifications later
- **Auth ready**: Easy to add admin login if needed
- **REST API**: Auto-generated from your tables
