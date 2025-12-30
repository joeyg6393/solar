# Database Deployment Guide

## Recommended: Vercel + Vercel Postgres

**Easiest all-in-one solution**

```bash
# 1. Deploy to Vercel
cd solar-website
npx vercel

# 2. Add Vercel Postgres from dashboard
# Go to: vercel.com → Your Project → Storage → Create Database → Postgres

# 3. Run Prisma migrations
npx vercel env pull .env.local
npx prisma db push
```

**Cost**: Free tier includes 256MB storage, 60 compute hours/month

---

## Alternative Options

| Option | Pros | Cost |
|--------|------|------|
| **Vercel + Supabase** | Generous free tier, built-in dashboard to view submissions | Free (500MB) |
| **Vercel + Neon** | Serverless Postgres, auto-scaling | Free (512MB) |
| **Railway** | One-click deploy, Postgres included | $5/month |
| **Digital Ocean App Platform** | Already configured in your project | $12/month |

---

## Quick Setup with Supabase (Free)

```bash
# 1. Create Supabase project at supabase.com
# 2. Get your connection string from Settings → Database

# 3. Update .env.local
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"

# 4. Push schema
npx prisma db push

# 5. Deploy to Vercel
npx vercel --env DATABASE_URL="your-connection-string"
```

---

## Quick Setup with Neon (Free)

```bash
# 1. Create account at neon.tech
# 2. Create new project, get connection string

# 3. Update .env.local
DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]/[DATABASE]?sslmode=require"

# 4. Push schema
npx prisma db push

# 5. Deploy to Vercel
npx vercel --env DATABASE_URL="your-connection-string"
```

---

## Quick Setup with Vercel Postgres

```bash
# 1. Deploy to Vercel first
npx vercel

# 2. Go to Vercel Dashboard → Your Project → Storage
# 3. Click "Create Database" → Select "Postgres"
# 4. Follow prompts to create database

# 5. Vercel auto-adds env vars. Pull them locally:
npx vercel env pull .env.local

# 6. Push Prisma schema
npx prisma db push

# 7. Redeploy
npx vercel --prod
```

---

## What You'll Get

Once deployed with a database, your forms will save to:

| Table | Purpose |
|-------|---------|
| `ContactForm` | General contact form submissions |
| `QuoteRequest` | Solar quote requests with property details |
| `CallbackRequest` | Callback request submissions |
| `PageView` | Analytics - page view tracking |
| `EmailSubscriber` | Newsletter signups |
| `IncentiveInquiry` | Incentive-related inquiries |
| `ServiceArea` | Service area management |
| `LeadSource` | Lead source tracking |

---

## Viewing Form Submissions

### Option 1: Prisma Studio (Local)
```bash
npx prisma studio
# Opens browser at localhost:5555
```

### Option 2: Supabase Dashboard
- Built-in table viewer at supabase.com
- Real-time updates
- SQL editor included

### Option 3: Vercel Postgres Dashboard
- Query editor in Vercel dashboard
- View tables and run SQL

### Option 4: Build Admin Dashboard
Create `/app/admin/page.tsx` to view submissions (requires auth)

---

## Environment Variables Needed

```env
# Database connection
DATABASE_URL="postgresql://..."

# Optional: For production
DATABASE_URL_UNPOOLED="postgresql://..." # For migrations
```

---

## Database Schema (Already Configured)

Your Prisma schema at `prisma/schema.prisma` includes:

- Contact forms with name, email, phone, message
- Quote requests with property type, electric bill, roof type
- Callback requests with preferred time
- Page view analytics
- Newsletter subscriptions
- Lead source tracking

---

## Recommended Flow

1. **Development**: Use local PostgreSQL (Docker)
2. **Staging**: Use Supabase or Neon free tier
3. **Production**: Use Vercel Postgres or upgrade Supabase

---

## Support

- Prisma Docs: https://prisma.io/docs
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
- Supabase: https://supabase.com/docs
- Neon: https://neon.tech/docs
