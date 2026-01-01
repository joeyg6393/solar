# Vercel Postgres Setup Guide

## Step 1: Add Postgres in Vercel Dashboard

1. Go to your project: https://vercel.com/dashboard
2. Click on your **solar** project
3. Go to **Storage** tab
4. Click **Create Database** → Select **Postgres**
5. Give it a name (e.g., "solar-db") and click **Create**

## Step 2: Create the Table

After creating the database, go to the **Query** tab and run this SQL:

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
```

## Step 3: Redeploy

Vercel should auto-redeploy when you connect the database, but if not, trigger a manual redeploy so it picks up the database connection environment variables.

## Viewing Submissions

To view form submissions:
1. Go to Vercel Dashboard → Your Project → Storage
2. Click on your database
3. Go to **Browse** or **Query** tab
4. Run: `SELECT * FROM contact_submissions ORDER BY created_at DESC;`

## Environment Variables

Vercel automatically adds these environment variables when you connect Postgres:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

No manual configuration needed!
