# Solar Solutions - Springfield, MA

A complete Next.js 14 website for solar installation services in Springfield, Massachusetts and surrounding areas.

## Features

- **378+ Service+Location Pages**: Individual pages for each service in each location
- **10 Core Services**: Residential solar, commercial solar, battery storage, and more
- **38 Locations**: Comprehensive coverage across Pioneer Valley and Northern Connecticut
- **Full SEO Optimization**:
  - Dynamic meta tags for every page
  - Schema.org LocalBusiness markup
  - FAQ structured data
  - Breadcrumb navigation
  - Sitemap generation
- **Responsive Design**: Mobile-first Tailwind CSS design
- **Contact Forms**: Integration with Prisma database via API routes
- **Image Optimization**: Next.js Image component with Unsplash images

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Build for Production

```bash
npm run build
npm start
```

### Database Setup

The site uses Prisma for form submissions. Make sure to:

1. Set up your database connection in `.env`
2. Run `npx prisma generate`
3. Run `npx prisma db push`

## Project Structure

```
├── app/
│   ├── [slug]/          # Dynamic pages (services, locations, service+location)
│   ├── api/             # API routes for contact forms
│   ├── layout.tsx       # Root layout with header/footer
│   ├── page.tsx         # Homepage
│   ├── sitemap.ts       # Dynamic sitemap generation
│   └── robots.ts        # Robots.txt
├── components/
│   ├── Header.tsx       # Site header with navigation
│   ├── Footer.tsx       # Site footer
│   └── ContactForm.tsx  # Lead capture form
├── lib/
│   ├── data.ts          # Data loading utilities
│   └── seo.ts           # SEO schema generation
└── public/              # Static assets
```

## Page Types

1. **Homepage** (`/`) - Main landing page with all services and locations
2. **Service Pages** (`/[serviceSlug]`) - Lists all locations for a service
3. **Location Pages** (`/[locationSlug]`) - Lists all services in a location
4. **Service+Location Pages** (`/[service]-[location]`) - Detailed pages with full content

## SEO Features

- **Page Title Examples**:
  - "Residential Solar Panels Springfield MA - Save 26% Today | Free Quote"
  - "Best Commercial Solar Installation in Chicopee, MA - Expert Installers"

- **Local SEO Keywords**: Each page targets service+location combinations
- **Schema Markup**: LocalBusiness, Service, FAQ, and Breadcrumb schemas
- **Image Alt Text**: Descriptive alt text for all images

## Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

### Digital Ocean App Platform

```bash
doctl apps create --spec app.yaml
```

### Docker

```bash
docker build -t solar-website .
docker run -p 3000:3000 solar-website
```

## Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/solar"
```

## Performance

- **Static Generation**: All 400+ pages are pre-rendered at build time
- **Image Optimization**: Automatic image optimization via Next.js
- **Code Splitting**: Automatic code splitting for optimal performance
- **Font Optimization**: Google Fonts loaded via Next.js font optimization

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Images**: Unsplash (via next/image)
- **Fonts**: Google Fonts (Inter, Poppins)
- **Icons**: SVG icons (no external library needed)

## License

Proprietary - All rights reserved

## Contact

For support or questions, contact: info@solarsolutions.com
